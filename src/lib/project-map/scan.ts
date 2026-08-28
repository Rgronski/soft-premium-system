import "server-only";

import { access } from "node:fs/promises";
import { join } from "node:path";

type ProjectMapScannerInput = {
  id?: string;
  name?: string;
  workingDirectory?: string;
  sourcePath?: string;
};

export type ProjectMapEvidenceType =
  | "readme"
  | "roadmap"
  | "current-state"
  | "changelog"
  | "session-state"
  | "decision/ADR"
  | "package/config"
  | "deployment"
  | "unknown";

export type ProjectMapEvidenceDiscoveryStatus =
  | "found"
  | "missing"
  | "unavailable"
  | "unreadable";

export type ProjectMapEvidenceItem = {
  evidenceType: ProjectMapEvidenceType;
  discoveryStatus: ProjectMapEvidenceDiscoveryStatus;
  sourceOwner: "project";
  sourcePath: string;
  sourceRelativePath: string;
  projectId: string;
  projectName: string;
};

export type ProjectMapEvidenceScanResult =
  | {
      status: "available";
      projectId: string;
      projectName: string;
      sourcePath: string;
      evidence: ProjectMapEvidenceItem[];
    }
  | {
      status: "unavailable";
      reason: "invalid-project-identity" | "project-source-path-unavailable";
      projectId?: string;
      projectName?: string;
      sourcePath?: string;
      evidence: ProjectMapEvidenceItem[];
    };

type EvidenceCandidate = {
  sourceRelativePath: string;
  evidenceType: ProjectMapEvidenceType;
};

const PROJECT_MAP_EVIDENCE_CANDIDATES: EvidenceCandidate[] = [
  { sourceRelativePath: "README.md", evidenceType: "readme" },
  { sourceRelativePath: "docs/04_ROADMAP.md", evidenceType: "roadmap" },
  { sourceRelativePath: "docs/08_CURRENT_STATE.md", evidenceType: "current-state" },
  { sourceRelativePath: "docs/09_CHANGELOG.md", evidenceType: "changelog" },
  { sourceRelativePath: "docs/10_SESSION_STATE.md", evidenceType: "session-state" },
  { sourceRelativePath: "docs/07_DECISIONS.md", evidenceType: "decision/ADR" },
  { sourceRelativePath: "package.json", evidenceType: "package/config" },
  { sourceRelativePath: "vercel.json", evidenceType: "deployment" },
];

function normalizeProjectIdentityValue(value: string | undefined): string {
  return value?.trim() ?? "";
}

function isMissingPathError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  const code = (error as { code?: unknown }).code;

  return code === "ENOENT" || code === "ENOTDIR";
}

function isUnreadablePathError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  const code = (error as { code?: unknown }).code;

  return code === "EACCES" || code === "EPERM";
}

function buildEvidenceItem(
  projectId: string,
  projectName: string,
  sourcePath: string,
  candidate: EvidenceCandidate,
  discoveryStatus: ProjectMapEvidenceDiscoveryStatus,
): ProjectMapEvidenceItem {
  return {
    evidenceType: candidate.evidenceType,
    discoveryStatus,
    sourceOwner: "project",
    sourcePath: join(sourcePath, candidate.sourceRelativePath),
    sourceRelativePath: candidate.sourceRelativePath,
    projectId,
    projectName,
  };
}

async function classifyEvidenceCandidate(
  sourcePath: string,
  projectId: string,
  projectName: string,
  candidate: EvidenceCandidate,
): Promise<ProjectMapEvidenceItem> {
  const absolutePath = join(sourcePath, candidate.sourceRelativePath);

  try {
    await access(absolutePath);

    return buildEvidenceItem(
      projectId,
      projectName,
      sourcePath,
      candidate,
      "found",
    );
  } catch (error) {
    if (isMissingPathError(error)) {
      return buildEvidenceItem(
        projectId,
        projectName,
        sourcePath,
        candidate,
        "missing",
      );
    }

    if (isUnreadablePathError(error)) {
      return buildEvidenceItem(
        projectId,
        projectName,
        sourcePath,
        candidate,
        "unreadable",
      );
    }

    return buildEvidenceItem(
      projectId,
      projectName,
      sourcePath,
      candidate,
      "unavailable",
    );
  }
}

export async function scanProjectMapEvidence(
  project: ProjectMapScannerInput | null | undefined,
): Promise<ProjectMapEvidenceScanResult> {
  const projectId = normalizeProjectIdentityValue(project?.id);

  if (!projectId) {
    return {
      status: "unavailable",
      reason: "invalid-project-identity",
      evidence: [],
    };
  }

  const projectName = normalizeProjectIdentityValue(project?.name) || projectId;
  const sourcePath =
    normalizeProjectIdentityValue(project?.sourcePath) ||
    normalizeProjectIdentityValue(project?.workingDirectory);

  if (!sourcePath) {
    return {
      status: "unavailable",
      reason: "project-source-path-unavailable",
      projectId,
      projectName,
      evidence: [],
    };
  }

  const evidence = await Promise.all(
    PROJECT_MAP_EVIDENCE_CANDIDATES.map((candidate) =>
      classifyEvidenceCandidate(sourcePath, projectId, projectName, candidate),
    ),
  );

  return {
    status: "available",
    projectId,
    projectName,
    sourcePath,
    evidence,
  };
}
