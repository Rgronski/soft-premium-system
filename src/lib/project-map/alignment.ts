import type { ProjectMapCanonicalIntegrityResult, ProjectMapReadResult } from "./read";
import type {
  ProjectMapReconstructionCandidateResult,
} from "./reconstruct";
import type {
  ProjectMapRiskDecisionReadResult,
} from "./risk-decisions";

export const SPS_FOUNDATION_CONTROL_SOURCES = [
  "docs/00_PROJECT_BIBLE.md",
  "docs/02_ARCHITECTURE.md",
  "docs/03_DEVELOPMENT_STANDARD.md",
  "docs/04_ROADMAP.md",
  "docs/08_CURRENT_STATE.md",
  "docs/10_SESSION_STATE.md",
  "docs/11_WORKFLOW_ENGINE.md",
] as const;

export type ProjectMapSpsAlignmentStatus =
  | "aligned"
  | "missing_data"
  | "needs_review"
  | "mismatch";

export type ProjectMapSpsAlignmentCheck = {
  key: string;
  label: string;
  status: ProjectMapSpsAlignmentStatus;
  detail: string;
};

export type ProjectMapSpsAlignmentResult = {
  status: ProjectMapSpsAlignmentStatus;
  checks: ProjectMapSpsAlignmentCheck[];
  controlSources: readonly string[];
};

type ProjectLike = {
  id: string;
  name: string;
  workingDirectory?: string;
  repositoryUrl?: string;
};

type AlignmentInput = {
  project: ProjectLike | null;
  mapReadResult: ProjectMapReadResult | null;
  integrity: ProjectMapCanonicalIntegrityResult;
  riskDecisions: ProjectMapRiskDecisionReadResult | null;
  candidate: ProjectMapReconstructionCandidateResult | null;
  canonicalWriteEnabled: boolean;
};

const REQUIRED_RISK_KEYS = ["SSOT", "Project Bible", "Project Map", "First Layout"] as const;

function pathIsSpsMetadata(path: string | undefined): boolean {
  if (!path) {
    return false;
  }

  const normalized = path.toLowerCase();
  return normalized.includes("\\.sps-meta\\") && !normalized.includes("\\beauty-client-pro\\");
}

function statusRank(status: ProjectMapSpsAlignmentStatus): number {
  return { aligned: 0, missing_data: 1, needs_review: 2, mismatch: 3 }[status];
}

function aggregateStatus(checks: ProjectMapSpsAlignmentCheck[]): ProjectMapSpsAlignmentStatus {
  return checks.reduce<ProjectMapSpsAlignmentStatus>(
    (current, check) => (statusRank(check.status) > statusRank(current) ? check.status : current),
    "aligned",
  );
}

function buildIdentityCheck(input: AlignmentInput): ProjectMapSpsAlignmentCheck {
  const source = input.mapReadResult?.projectSourceIdentity;
  if (!input.project || !source) {
    return { key: "project-identity", label: "Project identity", status: "missing_data", detail: "Brak danych tożsamości projektu do porównania." };
  }

  const matches = source.projectId === input.project.id &&
    source.projectName === input.project.name &&
    (!input.project.repositoryUrl || source.repositoryUrl === input.project.repositoryUrl) &&
    (!input.project.workingDirectory || source.workingDirectory === input.project.workingDirectory);
  return {
    key: "project-identity",
    label: "Project identity",
    status: matches ? "aligned" : "mismatch",
    detail: matches ? "Utrwalona tożsamość projektu pasuje do bieżącego projektu." : "Tożsamość canonical/source identity nie pasuje do bieżącego projektu.",
  };
}

export function evaluateProjectMapSpsFoundationAlignment(
  input: AlignmentInput,
): ProjectMapSpsAlignmentResult {
  const checks: ProjectMapSpsAlignmentCheck[] = [buildIdentityCheck(input)];
  const canonical = input.mapReadResult?.status === "present" ? input.mapReadResult.canonicalMap.canonical : null;
  const riskPath = input.riskDecisions?.riskDecisionsPath;
  const storagePaths = [canonical?.projectMetadataRootPath, canonical?.projectMapRootPath, canonical?.mapJsonPath, riskPath].filter(Boolean) as string[];

  checks.push({
    key: "storage-boundary",
    label: "SPS OS storage boundary",
    status: storagePaths.length === 0
      ? "missing_data"
      : storagePaths.every(pathIsSpsMetadata) ? "aligned" : "mismatch",
    detail: storagePaths.length === 0 ? "Brak ścieżek metadata do sprawdzenia." : "Ścieżki storage pozostają w granicy SPS OS metadata.",
  });
  checks.push({
    key: "audit-consistency",
    label: "Canonical and audit consistency",
    status: input.mapReadResult?.status !== "present"
      ? "missing_data"
      : input.integrity.status === "consistent" ? "aligned" : input.integrity.status === "warning" ? "needs_review" : "mismatch",
    detail: input.mapReadResult?.status !== "present" ? "Canonical/audit nie są dostępne do porównania." : `Wynik integralności: ${input.integrity.status}.`,
  });

  const decisions = input.riskDecisions?.status === "present" ? input.riskDecisions.decisions : [];
  const decisionKeys = new Set(decisions.map((decision) => decision.riskKey));
  checks.push({
    key: "risk-decisions",
    label: "Persisted risk decisions",
    status: input.riskDecisions?.status === "mismatched"
      ? "mismatch"
      : input.riskDecisions?.status === "invalid"
        ? "needs_review"
        : input.riskDecisions?.status === "present" && REQUIRED_RISK_KEYS.every((key) => decisionKeys.has(key))
          ? "aligned"
          : "missing_data",
    detail: input.riskDecisions?.status === "present" ? `${decisions.length} decyzji ma utrwaloną tożsamość projektu.` : `Stan artefaktu decyzji: ${input.riskDecisions?.status ?? "unavailable"}.`,
  });

  const evidence = input.candidate?.foundationChecklist.filter((item) =>
    REQUIRED_RISK_KEYS.includes(item.foundationArea as (typeof REQUIRED_RISK_KEYS)[number]),
  ) ?? [];
  const evidenceStatus = input.candidate?.status !== "available"
    ? "missing_data"
    : evidence.some((item) => item.conflictState === "conflicting")
      ? "mismatch"
      : evidence.length < REQUIRED_RISK_KEYS.length
        ? "missing_data"
        : evidence.every((item) => item.status === "completed" && item.supportState === "confirmed")
          ? "aligned"
          : "needs_review";
  checks.push({ key: "required-evidence", label: "Required BCP evidence status", status: evidenceStatus, detail: "Status evidence pochodzi wyłącznie z kandydata BCP; dokumenty SPS OS są regułami kontrolnymi." });

  const candidatePath = input.candidate?.sourcePath;
  checks.push({
    key: "candidate-canonical-separation",
    label: "Candidate/canonical separation",
    status: !candidatePath || !canonical?.projectMapRootPath
      ? "missing_data"
      : candidatePath.toLowerCase() === canonical.projectMapRootPath.toLowerCase() ? "mismatch" : "aligned",
    detail: "Kandydat i canonical storage są porównywane jako odrębne źródła.",
  });
  checks.push({
    key: "write-boundary",
    label: "Canonical write approval boundary",
    status: input.canonicalWriteEnabled ? "mismatch" : "aligned",
    detail: input.canonicalWriteEnabled ? "Canonical write jest aktywny w widoku alignment." : "Canonical write pozostaje wyłączony.",
  });

  return { status: aggregateStatus(checks), checks, controlSources: SPS_FOUNDATION_CONTROL_SOURCES };
}
