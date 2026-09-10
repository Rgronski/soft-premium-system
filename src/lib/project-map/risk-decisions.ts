import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { resolveProjectMapStorageRoot } from "../project-brain/metadata";

export const PROJECT_MAP_RISK_KEYS = [
  "SSOT",
  "Project Bible",
  "Project Map",
  "First Layout",
] as const;

export type ProjectMapRiskKey = (typeof PROJECT_MAP_RISK_KEYS)[number];
export type ProjectMapRiskDecisionState =
  | "accepted"
  | "open"
  | "needs_evidence";

export type ProjectMapRiskDecision = {
  riskKey: ProjectMapRiskKey;
  decisionState: ProjectMapRiskDecisionState;
  decidedAt: string;
  actor: "Product Owner";
  projectId: string;
  projectName: string;
};

type ProjectLike = {
  id: string;
  name: string;
  workingDirectory?: string;
};

export type ProjectMapRiskDecisionReadResult =
  | {
      status: "missing";
      riskDecisionsPath: string;
      projectId: string;
      projectName: string;
    }
  | {
      status: "present";
      riskDecisionsPath: string;
      projectId: string;
      projectName: string;
      decisions: ProjectMapRiskDecision[];
    }
  | {
      status: "invalid" | "mismatched" | "unavailable";
      riskDecisionsPath?: string;
      projectId?: string;
      projectName?: string;
    };

export type ProjectMapRiskDecisionWriteResult =
  | { status: "persisted"; riskDecisionsPath: string; decision: ProjectMapRiskDecision }
  | {
      status: "invalid" | "mismatched" | "unavailable" | "write-failure";
      riskDecisionsPath?: string;
    };

const RISK_DECISIONS_FILE_NAME = "risk-decisions.json";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isRiskKey(value: unknown): value is ProjectMapRiskKey {
  return typeof value === "string" && PROJECT_MAP_RISK_KEYS.includes(value as ProjectMapRiskKey);
}

function isDecisionState(value: unknown): value is ProjectMapRiskDecisionState {
  return value === "accepted" || value === "open" || value === "needs_evidence";
}

function isDecision(value: unknown): value is ProjectMapRiskDecision {
  return (
    isRecord(value) &&
    isRiskKey(value.riskKey) &&
    isDecisionState(value.decisionState) &&
    typeof value.decidedAt === "string" &&
    value.actor === "Product Owner" &&
    typeof value.projectId === "string" &&
    typeof value.projectName === "string"
  );
}

function resolveRiskDecisionsPath(project: ProjectLike | null | undefined): string | null {
  const storageRoot = resolveProjectMapStorageRoot(project);

  return storageRoot.status === "available"
    ? join(storageRoot.projectMapRootPath, RISK_DECISIONS_FILE_NAME)
    : null;
}

function hasMatchingIdentity(
  project: ProjectLike,
  decision: ProjectMapRiskDecision,
): boolean {
  return decision.projectId === project.id.trim() && decision.projectName === project.name.trim();
}

function isMissingPathError(error: unknown): boolean {
  return isRecord(error) && (error.code === "ENOENT" || error.code === "ENOTDIR");
}

export async function readProjectMapRiskDecisions(
  project: ProjectLike | null | undefined,
): Promise<ProjectMapRiskDecisionReadResult> {
  const riskDecisionsPath = resolveRiskDecisionsPath(project);

  if (!project?.id.trim() || !project.name.trim() || !riskDecisionsPath) {
    return { status: "unavailable", riskDecisionsPath: riskDecisionsPath ?? undefined };
  }

  try {
    const parsed = JSON.parse(await readFile(riskDecisionsPath, "utf8")) as unknown;

    if (
      !isRecord(parsed) ||
      parsed.kind !== "project-map-risk-decisions" ||
      parsed.version !== 1 ||
      !Array.isArray(parsed.decisions) ||
      !parsed.decisions.every(isDecision)
    ) {
      return { status: "invalid", riskDecisionsPath };
    }

    const decisions = parsed.decisions as ProjectMapRiskDecision[];
    if (!decisions.every((decision) => hasMatchingIdentity(project, decision))) {
      return {
        status: "mismatched",
        riskDecisionsPath,
        projectId: project.id,
        projectName: project.name,
      };
    }

    return {
      status: "present",
      riskDecisionsPath,
      projectId: project.id,
      projectName: project.name,
      decisions,
    };
  } catch (error) {
    return isMissingPathError(error)
      ? {
          status: "missing",
          riskDecisionsPath,
          projectId: project.id,
          projectName: project.name,
        }
      : { status: "invalid", riskDecisionsPath };
  }
}

export async function persistProjectMapRiskDecision(
  project: ProjectLike | null | undefined,
  input: {
    riskKey: ProjectMapRiskKey;
    decisionState: ProjectMapRiskDecisionState;
  },
): Promise<ProjectMapRiskDecisionWriteResult> {
  const riskDecisionsPath = resolveRiskDecisionsPath(project);

  if (!project?.id.trim() || !project.name.trim() || !riskDecisionsPath) {
    return { status: "unavailable", riskDecisionsPath: riskDecisionsPath ?? undefined };
  }

  const current = await readProjectMapRiskDecisions(project);
  if (current.status === "invalid" || current.status === "mismatched") {
    return { status: current.status, riskDecisionsPath };
  }

  const decision: ProjectMapRiskDecision = {
    riskKey: input.riskKey,
    decisionState: input.decisionState,
    decidedAt: new Date().toISOString(),
    actor: "Product Owner",
    projectId: project.id.trim(),
    projectName: project.name.trim(),
  };
  const decisions = current.status === "present" ? [...current.decisions] : [];
  const existingIndex = decisions.findIndex((item) => item.riskKey === decision.riskKey);
  if (existingIndex >= 0) {
    decisions[existingIndex] = decision;
  } else {
    decisions.push(decision);
  }

  try {
    const storageRoot = resolveProjectMapStorageRoot(project);
    if (storageRoot.status !== "available") {
      return { status: "unavailable", riskDecisionsPath };
    }
    await mkdir(storageRoot.projectMapRootPath, { recursive: true });
    await writeFile(
      riskDecisionsPath,
      `${JSON.stringify({
        kind: "project-map-risk-decisions",
        version: 1,
        projectId: project.id.trim(),
        projectName: project.name.trim(),
        decisions,
      }, null, 2)}\n`,
      "utf8",
    );
    return { status: "persisted", riskDecisionsPath, decision };
  } catch {
    return { status: "write-failure", riskDecisionsPath };
  }
}
