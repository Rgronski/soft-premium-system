import type { ProjectMapCandidateAcceptanceResult } from "./acceptance";

export type ProjectMapCanonicalWriteApprovalDecision = "approved" | "rejected";

export type ProjectMapCanonicalWriteApprovalStatus =
  | "not requested"
  | "approval required"
  | "approved"
  | "rejected"
  | "blocked by evidence";

export type ProjectMapCanonicalWriteApprovalResult = {
  status: ProjectMapCanonicalWriteApprovalStatus;
  canonicalWriteAllowed: boolean;
  candidateOnly: true;
  requested: boolean;
  decision: ProjectMapCanonicalWriteApprovalDecision | null;
  acceptanceStatus: ProjectMapCandidateAcceptanceResult["status"];
  requiredEvidence: ProjectMapCandidateAcceptanceResult["requiredEvidence"];
  reviewedFoundationAreas: ProjectMapCandidateAcceptanceResult["reviewedFoundationAreas"];
};

export type ProjectMapCanonicalWriteApprovalInput = {
  requested: boolean;
  decision?: ProjectMapCanonicalWriteApprovalDecision;
  acceptance: ProjectMapCandidateAcceptanceResult;
};

function hasEvidenceBlockingApproval(
  acceptance: ProjectMapCandidateAcceptanceResult,
): boolean {
  return (
    acceptance.status === "candidate needs evidence" ||
    acceptance.requiredEvidence.length > 0
  );
}

export function evaluateProjectMapCanonicalWriteApproval(
  input: ProjectMapCanonicalWriteApprovalInput,
): ProjectMapCanonicalWriteApprovalResult {
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
    };
  }

  if (hasEvidenceBlockingApproval(input.acceptance)) {
    return {
      status: "blocked by evidence",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: true,
      decision: input.decision ?? null,
      acceptanceStatus: input.acceptance.status,
      requiredEvidence: input.acceptance.requiredEvidence,
      reviewedFoundationAreas: input.acceptance.reviewedFoundationAreas,
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
  };
}
