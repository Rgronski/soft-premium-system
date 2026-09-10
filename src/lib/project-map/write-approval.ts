import type { ProjectMapCandidateAcceptanceResult } from "./acceptance";

export type ProjectMapCanonicalWriteApprovalDecision = "approved" | "rejected";

export type ProjectMapCanonicalWriteApprovalStatus =
  | "not requested"
  | "approval required"
  | "approved"
  | "rejected"
  | "blocked by evidence";

export const PROJECT_MAP_CANONICAL_WRITE_ACCEPTED_RISKS = [
  "SSOT",
  "Project Bible",
  "Project Map",
  "First Layout",
] as const;

export type ProjectMapCanonicalWriteAcceptedRisk =
  (typeof PROJECT_MAP_CANONICAL_WRITE_ACCEPTED_RISKS)[number];

export type ProjectMapCanonicalWriteApprovalResult = {
  status: ProjectMapCanonicalWriteApprovalStatus;
  canonicalWriteAllowed: boolean;
  candidateOnly: true;
  requested: boolean;
  decision: ProjectMapCanonicalWriteApprovalDecision | null;
  acceptanceStatus: ProjectMapCandidateAcceptanceResult["status"];
  requiredEvidence: ProjectMapCandidateAcceptanceResult["requiredEvidence"];
  reviewedFoundationAreas: ProjectMapCandidateAcceptanceResult["reviewedFoundationAreas"];
  acceptedRisks: ProjectMapCanonicalWriteAcceptedRisk[];
};

export type ProjectMapCanonicalWriteApprovalInput = {
  requested: boolean;
  decision?: ProjectMapCanonicalWriteApprovalDecision;
  acceptance: ProjectMapCandidateAcceptanceResult;
  acceptedRisks?: ProjectMapCanonicalWriteAcceptedRisk[];
};

function hasEvidenceBlockingApproval(
  acceptance: ProjectMapCandidateAcceptanceResult,
  acceptedRisks: ProjectMapCanonicalWriteAcceptedRisk[],
): boolean {
  return acceptance.requiredEvidence.some(
    (requirement) =>
      !acceptedRisks.includes(
        requirement.foundationArea as ProjectMapCanonicalWriteAcceptedRisk,
      ),
  );
}

export function evaluateProjectMapCanonicalWriteApproval(
  input: ProjectMapCanonicalWriteApprovalInput,
): ProjectMapCanonicalWriteApprovalResult {
  const acceptedRisks = [
    ...new Set(
      (input.acceptedRisks ?? []).filter((risk) =>
        PROJECT_MAP_CANONICAL_WRITE_ACCEPTED_RISKS.includes(risk),
      ),
    ),
  ];

  if (!input.requested) {
    return {
      status: "not requested",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: false,
      decision: null,
      acceptanceStatus: input.acceptance.status,
      requiredEvidence: input.acceptance.requiredEvidence,
      reviewedFoundationAreas: input.acceptance.reviewedFoundationAreas,
      acceptedRisks,
    };
  }

  if (hasEvidenceBlockingApproval(input.acceptance, acceptedRisks)) {
    return {
      status: "blocked by evidence",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: true,
      decision: input.decision ?? null,
      acceptanceStatus: input.acceptance.status,
      requiredEvidence: input.acceptance.requiredEvidence,
      reviewedFoundationAreas: input.acceptance.reviewedFoundationAreas,
      acceptedRisks,
    };
  }

  if (
    input.acceptance.status === "candidate rejected" ||
    input.decision === "rejected"
  ) {
    return {
      status: "rejected",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: true,
      decision: input.decision ?? null,
      acceptanceStatus: input.acceptance.status,
      requiredEvidence: input.acceptance.requiredEvidence,
      reviewedFoundationAreas: input.acceptance.reviewedFoundationAreas,
      acceptedRisks,
    };
  }

  if (input.decision === "approved") {
    return {
      status: "approved",
      canonicalWriteAllowed: true,
      candidateOnly: true,
      requested: true,
      decision: "approved",
      acceptanceStatus: input.acceptance.status,
      requiredEvidence: input.acceptance.requiredEvidence,
      reviewedFoundationAreas: input.acceptance.reviewedFoundationAreas,
      acceptedRisks,
    };
  }

  return {
    status: "approval required",
    canonicalWriteAllowed: false,
    candidateOnly: true,
    requested: true,
    decision: input.decision ?? null,
    acceptanceStatus: input.acceptance.status,
    requiredEvidence: input.acceptance.requiredEvidence,
    reviewedFoundationAreas: input.acceptance.reviewedFoundationAreas,
    acceptedRisks,
  };
}
