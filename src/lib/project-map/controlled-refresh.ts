import { copyFile, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

import { resolveProjectMapStorageRoot } from "../project-brain/metadata";
import { writeProjectMapCanonicalMap, type ProjectMapCanonicalWriteResult } from "./write";
import type { ProjectMapCanonicalWriteApprovalResult } from "./write-approval";
import type { ProjectMapCanonicalWritePreflightEvaluation } from "./canonical-write-preflight";
import type { ProjectMapCandidateRefreshPreview } from "./candidate-refresh-preview";
import type { ProjectMapReconstructionCandidateResult } from "./reconstruct";
import type { ProjectMapSpsAlignmentResult } from "./alignment";
import type { ProjectMapDriftResult } from "./drift";
import type { ProjectMapCanonicalIntegrityResult, ProjectMapReadResult } from "./read";
import type { ProjectMapRiskDecisionReadResult } from "./risk-decisions";

type ProjectLike = { id: string; name: string; repositoryUrl?: string; workingDirectory?: string };

export type ProjectMapControlledRefreshResult =
  | { status: "no-op"; reason: "no_changes" }
  | { status: "blocked"; reason: string }
  | { status: "written"; mapJsonPath: string; backupPath: string; refreshAuditPath: string; canonicalWrite: ProjectMapCanonicalWriteResult }
  | { status: "failed"; reason: "refresh-failed"; errorMessage: string; backupPath?: string };

export type ProjectMapRefreshAudit = {
  kind: "project-map-refresh-audit";
  version: 1;
  projectId: string;
  projectName: string;
  mapJsonPath: string;
  previousArtifactSha256: string;
  candidateArtifactSha256: string;
  previewStatus: ProjectMapCandidateRefreshPreview["status"];
  approval: { actor: "Product Owner"; status: "approved" };
  backupPath: string;
  writeResult: "written";
  writtenAt: string;
};

export type ProjectMapControlledRefreshReadinessStatus =
  | "safe_no_op"
  | "ready_for_approved_execution"
  | "blocked"
  | "failed_unavailable"
  | "requires_review";

export type ProjectMapControlledRefreshReadiness = {
  status: ProjectMapControlledRefreshReadinessStatus;
  title: string;
  summary: string;
  details: string[];
  backupAndAudit: string;
};

type FileDeps = {
  mkdir: typeof mkdir;
  copyFile: typeof copyFile;
  readFile: typeof readFile;
  writeFile: typeof writeFile;
  unlink: typeof unlink;
  writeCanonical: (input: {
    project: ProjectLike;
    approval: ProjectMapCanonicalWriteApprovalResult;
    candidate: ProjectMapReconstructionCandidateResult;
    preflight: ProjectMapCanonicalWritePreflightEvaluation;
  }) => Promise<ProjectMapCanonicalWriteResult>;
};

const defaultDeps: FileDeps = {
  mkdir,
  copyFile,
  readFile,
  writeFile,
  unlink,
  writeCanonical: ({ project, approval, candidate, preflight }) =>
    writeProjectMapCanonicalMap({ project, approval, candidate, preflight }),
};

function sha256(value: Uint8Array | string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function buildProjectMapControlledRefreshReadiness(input: {
  mapReadResult: ProjectMapReadResult | null;
  integrity: ProjectMapCanonicalIntegrityResult;
  alignment: ProjectMapSpsAlignmentResult;
  structuralDrift: ProjectMapDriftResult;
  preview: ProjectMapCandidateRefreshPreview;
  riskDecisions: ProjectMapRiskDecisionReadResult | null;
  approval: ProjectMapCanonicalWriteApprovalResult | null;
  execution: ProjectMapControlledRefreshResult;
}): ProjectMapControlledRefreshReadiness {
  const details = [
    `canonical: ${input.mapReadResult?.status ?? "unavailable"}`,
    `audit: ${input.mapReadResult?.status === "present" ? input.mapReadResult.auditStatus : "unavailable"}`,
    `integrity: ${input.integrity.status}`,
    `alignment: ${input.alignment.status}`,
    `structural drift: ${input.structuralDrift.status}`,
    `candidate preview: ${input.preview.status}`,
    `risk decisions: ${input.riskDecisions?.status ?? "unavailable"}`,
    `approval: ${input.approval?.status ?? "not requested"}`,
  ];

  if (input.execution.status === "failed" || input.preview.status === "invalid" || input.structuralDrift.status === "invalid") {
    return {
      status: "failed_unavailable",
      title: "Refresh unavailable",
      summary: "Controlled refresh cannot be treated as executable because required comparison data is invalid or execution failed.",
      details: [...details, input.execution.status === "failed" ? `failure: ${input.execution.errorMessage}` : "invalid comparison data blocks refresh"],
      backupAndAudit: "No new backup or refresh audit is created for invalid or failed readiness.",
    };
  }

  if (input.preview.status === "no_changes" && input.structuralDrift.status === "no_drift") {
    return {
      status: "safe_no_op",
      title: "Safe no-op",
      summary: "Current checkout has no structural drift and the candidate preview has no changes, so refresh would not rewrite canonical map.json.",
      details: [...details, "no canonical write is needed"],
      backupAndAudit: "No backup or refresh audit is needed for the current no-op path.",
    };
  }

  if (input.preview.status === "changes_ready") {
    const approved = input.approval?.status === "approved" && input.approval.canonicalWriteAllowed;

    return {
      status: approved ? "ready_for_approved_execution" : "requires_review",
      title: approved ? "Ready for approved execution" : "Approval required",
      summary: approved
        ? "Detected changes can follow the controlled execution contract with backup, canonical write, readback validation, and refresh audit."
        : "Detected changes require explicit Product Owner approval before the controlled execution path may write canonical metadata.",
      details: [
        ...details,
        `added: ${input.preview.addedItems.length}`,
        `removed: ${input.preview.removedItems.length}`,
        `changed: ${input.preview.changedItems.length}`,
      ],
      backupAndAudit: "A changed refresh must create a backup before write and a refresh audit after successful readback validation.",
    };
  }

  const needsReview =
    input.integrity.status === "warning" ||
    input.alignment.status === "needs_review" ||
    input.structuralDrift.status === "unavailable" ||
    input.preview.blockingReasons.length > 0;

  return {
    status: needsReview ? "requires_review" : "blocked",
    title: needsReview ? "Review required" : "Blocked",
    summary: needsReview
      ? "Refresh readiness needs review because one or more read-only control checks is warning, unavailable, or blocked."
      : "Refresh is blocked because required canonical, storage, identity, or candidate data is missing.",
    details: [...details, ...input.preview.blockingReasons.map((reason) => `blocking reason: ${reason}`)],
    backupAndAudit: "No backup, canonical write, or refresh audit is created while readiness is blocked or under review.",
  };
}

export async function executeControlledProjectMapRefresh(
  input: {
    project: ProjectLike | null;
    preview: ProjectMapCandidateRefreshPreview;
    approval: ProjectMapCanonicalWriteApprovalResult;
    candidate: ProjectMapReconstructionCandidateResult | null;
    preflight: ProjectMapCanonicalWritePreflightEvaluation;
    now?: Date;
    deps?: Partial<FileDeps>;
  },
): Promise<ProjectMapControlledRefreshResult> {
  if (input.preview.status === "no_changes") {
    return { status: "no-op", reason: "no_changes" };
  }

  if (input.preview.status !== "changes_ready") {
    return { status: "blocked", reason: `candidate preview is ${input.preview.status}` };
  }
  if (!input.project || !input.candidate || input.candidate.status !== "available") {
    return { status: "blocked", reason: "validated project and candidate are required" };
  }
  if (input.approval.status !== "approved" || !input.approval.canonicalWriteAllowed) {
    return { status: "blocked", reason: "Product Owner approval is required" };
  }
  if (input.preflight.blockers.length > 0 || !["READY_FOR_FUTURE_WRITE", "NEEDS_EVIDENCE"].includes(input.preflight.status)) {
    return { status: "blocked", reason: "preflight blocks controlled refresh" };
  }
  if (input.candidate.projectId !== input.project.id || input.candidate.projectName !== input.project.name) {
    return { status: "blocked", reason: "candidate identity does not match project" };
  }

  const root = resolveProjectMapStorageRoot(input.project);
  if (root.status === "unavailable") {
    return { status: "blocked", reason: "SPS OS metadata target is unavailable" };
  }

  const mapJsonPath = join(root.projectMapRootPath, "map.json");
  const auditPath = join(root.projectMapRootPath, "map-write-audit.json");
  const refreshAuditPath = join(root.projectMapRootPath, "map-refresh-audit.json");
  const stamp = (input.now ?? new Date()).toISOString().replace(/[:.]/g, "-");
  const backupPath = join(root.projectMapRootPath, "backups", `${stamp}-${root.projectId}-map.json`);
  const deps: FileDeps = { ...defaultDeps, ...input.deps };
  let previousMap: Uint8Array | null = null;
  let previousAudit: Uint8Array | null = null;

  try {
    previousMap = await deps.readFile(mapJsonPath);
    try {
      previousAudit = await deps.readFile(auditPath);
    } catch {
      previousAudit = null;
    }
    await deps.mkdir(join(root.projectMapRootPath, "backups"), { recursive: true });
    await deps.copyFile(mapJsonPath, backupPath);
    const canonicalWrite = await deps.writeCanonical({
      project: input.project,
      approval: input.approval,
      candidate: input.candidate,
      preflight: input.preflight,
    });
    if (canonicalWrite.status !== "written") {
      throw new Error(`canonical writer returned ${canonicalWrite.status}`);
    }
    const writtenMap = await deps.readFile(mapJsonPath, "utf8");
    const parsedWrittenMap = JSON.parse(writtenMap.toString()) as { kind?: unknown };
    if (parsedWrittenMap.kind !== "canonical-project-map") {
      throw new Error("written canonical map failed validation");
    }
    const writtenAt = (input.now ?? new Date()).toISOString();
    const candidatePayload = JSON.stringify(canonicalWrite.canonicalMap);
    const refreshAudit: ProjectMapRefreshAudit = {
      kind: "project-map-refresh-audit",
      version: 1,
      projectId: input.project.id,
      projectName: input.project.name,
      mapJsonPath,
      previousArtifactSha256: sha256(previousMap),
      candidateArtifactSha256: sha256(candidatePayload),
      previewStatus: input.preview.status,
      approval: { actor: "Product Owner", status: "approved" },
      backupPath,
      writeResult: "written",
      writtenAt,
    };
    await deps.writeFile(refreshAuditPath, `${JSON.stringify(refreshAudit, null, 2)}\n`, "utf8");
    return { status: "written", mapJsonPath, backupPath, refreshAuditPath, canonicalWrite };
  } catch (error) {
    try {
      if (previousMap) {
        await deps.writeFile(mapJsonPath, previousMap, "utf8");
      }
      if (previousAudit) {
        await deps.writeFile(auditPath, previousAudit, "utf8");
      } else {
        await deps.unlink(auditPath).catch(() => undefined);
      }
    } catch {
      // Preserve the original failure while exposing that recovery was attempted.
    }
    return {
      status: "failed",
      reason: "refresh-failed",
      errorMessage: error instanceof Error ? error.message : "unknown refresh failure",
      backupPath,
    };
  }
}
