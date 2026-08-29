import type {
  ProjectMapReconstructionCandidateChecklistItem,
  ProjectMapReconstructionCandidateResult,
} from "./reconstruct";

export type ProjectMapCandidateAcceptanceStatus =
  | "candidate reviewed"
  | "candidate acceptable"
  | "candidate rejected"
  | "candidate needs evidence";

export type ProjectMapCandidateCanonicalWriteStatus =
  "canonical write not allowed yet";

export type ProjectMapCandidateAcceptanceRequirement = {
  foundationArea: ProjectMapReconstructionCandidateChecklistItem["foundationArea"];
  reason: "missing" | "weak" | "inferred" | "conflicting";
};

const ACCEPTANCE_REQUIRED_FOUNDATION_AREAS = new Set<
  ProjectMapReconstructionCandidateChecklistItem["foundationArea"]
>([
  "Project Identity",
  "SSOT",
  "Project Bible",
  "Project Map",
  "Working Source",
  "First Working Flow",
  "Publication Path",
]);

export type ProjectMapCandidateAcceptanceResult = {
  status: ProjectMapCandidateAcceptanceStatus;
  canonicalWriteStatus: ProjectMapCandidateCanonicalWriteStatus;
  candidateOnly: true;
  projectId?: string;
  projectName?: string;
  sourcePath?: string;
  requiredEvidence: ProjectMapCandidateAcceptanceRequirement[];
  reviewedFoundationAreas: ProjectMapReconstructionCandidateChecklistItem["foundationArea"][];
};

function collectAcceptanceRequirements(
  foundationChecklist: ProjectMapReconstructionCandidateChecklistItem[],
): ProjectMapCandidateAcceptanceRequirement[] {
  const requirements: ProjectMapCandidateAcceptanceRequirement[] = [];

  for (const item of foundationChecklist) {
    if (!ACCEPTANCE_REQUIRED_FOUNDATION_AREAS.has(item.foundationArea)) {
      continue;
    }

    if (item.conflictState === "conflicting") {
      requirements.push({
        foundationArea: item.foundationArea,
        reason: "conflicting",
      });
      continue;
    }

    if (item.supportState === "missing") {
      requirements.push({
        foundationArea: item.foundationArea,
        reason: "missing",
      });
      continue;
    }

    if (item.supportState === "weak") {
      requirements.push({
        foundationArea: item.foundationArea,
        reason: "weak",
      });
      continue;
    }

    if (item.supportState === "inferred") {
      requirements.push({
        foundationArea: item.foundationArea,
        reason: "inferred",
      });
    }
  }

  return requirements;
}

export function evaluateProjectMapCandidateAcceptance(
  candidate: ProjectMapReconstructionCandidateResult,
): ProjectMapCandidateAcceptanceResult {
  if (candidate.status === "unavailable") {
    return {
      status: "candidate rejected",
      canonicalWriteStatus: "canonical write not allowed yet",
      candidateOnly: true,
      projectId: candidate.projectId,
      projectName: candidate.projectName,
      sourcePath: candidate.sourcePath,
      requiredEvidence: [],
      reviewedFoundationAreas: [],
    };
  }

  const requiredEvidence = collectAcceptanceRequirements(
    candidate.foundationChecklist,
  );
  const reviewedFoundationAreas = candidate.foundationChecklist.map(
    (item) => item.foundationArea,
  );
  const hasDirectEvidence = candidate.evidence.some(
    (evidence) => evidence.supportState === "confirmed",
  );

  if (requiredEvidence.length > 0 && hasDirectEvidence) {
    return {
      status: "candidate reviewed",
      canonicalWriteStatus: "canonical write not allowed yet",
      candidateOnly: true,
      projectId: candidate.projectId,
      projectName: candidate.projectName,
      sourcePath: candidate.sourcePath,
      requiredEvidence,
      reviewedFoundationAreas,
    };
  }

  if (requiredEvidence.length > 0) {
    return {
      status: "candidate needs evidence",
      canonicalWriteStatus: "canonical write not allowed yet",
      candidateOnly: true,
      projectId: candidate.projectId,
      projectName: candidate.projectName,
      sourcePath: candidate.sourcePath,
      requiredEvidence,
      reviewedFoundationAreas,
    };
  }

  return {
    status: hasDirectEvidence
      ? "candidate acceptable"
      : "candidate needs evidence",
    canonicalWriteStatus: "canonical write not allowed yet",
    candidateOnly: true,
    projectId: candidate.projectId,
    projectName: candidate.projectName,
    sourcePath: candidate.sourcePath,
    requiredEvidence,
    reviewedFoundationAreas,
  };
}
