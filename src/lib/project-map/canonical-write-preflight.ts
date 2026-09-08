import type {
  ProjectMapReconstructionCandidateChecklistItem,
  ProjectMapReconstructionCandidateResult,
} from "./reconstruct";

export type ProjectMapCanonicalWritePreflightStatus =
  | "READY_FOR_FUTURE_WRITE"
  | "BLOCKED"
  | "NEEDS_EVIDENCE"
  | "REJECTED"
  | "UNKNOWN";

export type ProjectMapCanonicalWritePreflightReviewState =
  | "accepted"
  | "rejected"
  | "needs_evidence"
  | "blocked"
  | "unknown";

export type ProjectMapCanonicalWritePreflightInput = {
  candidate: ProjectMapReconstructionCandidateResult | null;
  projectMapRootPath: string | null;
  mapJsonPath: string | null;
  sourceIdentityAvailable: boolean;
  sourceIdentityPersistenceStatus: string | null;
  reviewState?: ProjectMapCanonicalWritePreflightReviewState | null;
};

export type ProjectMapCanonicalWritePreflightEvaluation = {
  status: ProjectMapCanonicalWritePreflightStatus;
  reasons: string[];
  blockers: string[];
  evidenceRiskCount: number | null;
};

function hasPreflightEvidenceRisk(
  item: ProjectMapReconstructionCandidateChecklistItem,
): boolean {
  return (
    item.status === "absent" ||
    item.status === "blocked" ||
    item.status === "needs review" ||
    item.status === "unknown" ||
    item.supportState !== "confirmed" ||
    item.conflictState !== "none"
  );
}

export function evaluateProjectMapCanonicalWritePreflight({
  candidate,
  projectMapRootPath,
  mapJsonPath,
  sourceIdentityAvailable,
  sourceIdentityPersistenceStatus,
  reviewState,
}: ProjectMapCanonicalWritePreflightInput): ProjectMapCanonicalWritePreflightEvaluation {
  const reasons: string[] = [];
  const blockers: string[] = [];

  if (reviewState === "rejected") {
    return {
      status: "REJECTED",
      reasons: ["Review state explicitly rejected future canonical write planning."],
      blockers: ["Product Owner or persisted review state rejected the candidate."],
      evidenceRiskCount: null,
    };
  }

  if (reviewState === "needs_evidence") {
    reasons.push("Review state requires more evidence before future write planning.");
  }

  if (reviewState === "blocked") {
    blockers.push("Review state explicitly blocks future write planning.");
  }

  if (!projectMapRootPath || !mapJsonPath) {
    blockers.push("SPS OS Project Map storage target is unknown.");
  }

  if (!candidate) {
    blockers.push("Project Map candidate is not available.");
  } else if (candidate.status === "unavailable") {
    blockers.push("Project Map candidate is unavailable.");
  }

  if (!sourceIdentityAvailable) {
    blockers.push("Project source identity is missing.");
  }

  if (sourceIdentityPersistenceStatus !== "persisted") {
    blockers.push("Project source identity is not persisted.");
  }

  const evidenceRiskCount =
    candidate?.status === "available"
      ? candidate.foundationChecklist.filter(hasPreflightEvidenceRisk).length
      : null;

  if (evidenceRiskCount !== null && evidenceRiskCount > 0) {
    reasons.push("Candidate contains missing, weak, inferred, conflicting, blocked, absent, unknown, or needs-review evidence.");
  }

  if (blockers.some((blocker) => blocker.includes("unknown"))) {
    return {
      status: "UNKNOWN",
      reasons: reasons.length > 0 ? reasons : ["Required preflight facts are unknown."],
      blockers,
      evidenceRiskCount,
    };
  }

  if (blockers.length > 0) {
    return {
      status: "BLOCKED",
      reasons: reasons.length > 0 ? reasons : ["Future canonical write planning is blocked."],
      blockers,
      evidenceRiskCount,
    };
  }

  if (reviewState === "needs_evidence" || (evidenceRiskCount ?? 0) > 0) {
    return {
      status: "NEEDS_EVIDENCE",
      reasons,
      blockers,
      evidenceRiskCount,
    };
  }

  return {
    status: "READY_FOR_FUTURE_WRITE",
    reasons: ["Candidate, source identity, storage target, and evidence state are sufficient for future write planning."],
    blockers,
    evidenceRiskCount,
  };
}
