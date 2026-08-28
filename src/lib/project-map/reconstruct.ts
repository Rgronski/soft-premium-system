import type {
  ProjectMapClassifiedEvidenceItem,
  ProjectMapEvidenceClassificationResult,
  ProjectMapEvidenceConfidence,
  ProjectMapFoundationArea,
  ProjectMapMilestoneState,
} from "./classify";

const FOUNDATION_AREAS: ProjectMapFoundationArea[] = [
  "Project Identity",
  "SSOT",
  "Project Bible",
  "Project Map",
  "Working Source",
  "First Layout",
  "First Working Flow",
  "Publication Path",
];

export type ProjectMapReconstructionCandidateSupportState =
  | "confirmed"
  | "inferred"
  | "weak"
  | "missing";

export type ProjectMapReconstructionCandidateConflictState = "none" | "conflicting";

export type ProjectMapReconstructionCandidateChecklistStatus =
  | "completed"
  | "planned"
  | "blocked"
  | "parked"
  | "absent"
  | "unknown"
  | "needs review";

export type ProjectMapReconstructionCandidateEvidenceItem =
  ProjectMapClassifiedEvidenceItem & {
    supportState: ProjectMapReconstructionCandidateSupportState;
  };

export type ProjectMapReconstructionCandidateChecklistItem = {
  foundationArea: ProjectMapFoundationArea;
  status: ProjectMapReconstructionCandidateChecklistStatus;
  supportState: ProjectMapReconstructionCandidateSupportState;
  conflictState: ProjectMapReconstructionCandidateConflictState;
  milestoneStates: ProjectMapMilestoneState[];
  evidence: ProjectMapReconstructionCandidateEvidenceItem[];
};

export type ProjectMapReconstructionCandidateResult =
  | {
      status: "available";
      projectId: string;
      projectName: string;
      sourcePath: string;
      foundationChecklist: ProjectMapReconstructionCandidateChecklistItem[];
      evidence: ProjectMapReconstructionCandidateEvidenceItem[];
    }
  | {
      status: "unavailable";
      reason:
        | "invalid-project-identity"
        | "project-source-path-unavailable";
      confidence: "unavailable";
      projectId?: string;
      projectName?: string;
      sourcePath?: string;
      foundationChecklist: ProjectMapReconstructionCandidateChecklistItem[];
      evidence: ProjectMapReconstructionCandidateEvidenceItem[];
    };

function mapSupportState(
  confidence: ProjectMapEvidenceConfidence,
): ProjectMapReconstructionCandidateSupportState {
  if (confidence === "direct") {
    return "confirmed";
  }

  if (confidence === "unknown") {
    return "inferred";
  }

  if (confidence === "missing") {
    return "missing";
  }

  return "weak";
}

function toCandidateEvidenceItem(
  evidence: ProjectMapClassifiedEvidenceItem,
): ProjectMapReconstructionCandidateEvidenceItem {
  return {
    ...evidence,
    supportState: mapSupportState(evidence.confidence),
  };
}

function collectMilestoneStates(
  evidenceItems: ProjectMapReconstructionCandidateEvidenceItem[],
): ProjectMapMilestoneState[] {
  const milestoneStates = new Set<ProjectMapMilestoneState>();

  for (const evidence of evidenceItems) {
    for (const state of evidence.milestoneStates) {
      milestoneStates.add(state);
    }
  }

  return [...milestoneStates];
}

function deriveConflictState(
  evidenceItems: ProjectMapReconstructionCandidateEvidenceItem[],
): ProjectMapReconstructionCandidateConflictState {
  const supportStates = new Set(
    evidenceItems.map((evidence) => evidence.supportState),
  );

  return supportStates.size > 1 ? "conflicting" : "none";
}

function deriveChecklistStatus(
  evidenceItems: ProjectMapReconstructionCandidateEvidenceItem[],
  conflictState: ProjectMapReconstructionCandidateConflictState,
): ProjectMapReconstructionCandidateChecklistStatus {
  if (conflictState === "conflicting") {
    return "needs review";
  }

  if (evidenceItems.length === 0) {
    return "absent";
  }

  const milestoneStates = collectMilestoneStates(evidenceItems);

  if (milestoneStates.includes("completed")) {
    return "completed";
  }

  if (milestoneStates.includes("planned")) {
    return "planned";
  }

  if (milestoneStates.includes("blocked")) {
    return "blocked";
  }

  if (milestoneStates.includes("parked")) {
    return "parked";
  }

  if (milestoneStates.includes("absent")) {
    return "absent";
  }

  return "unknown";
}

function buildChecklistItem(
  foundationArea: ProjectMapFoundationArea,
  evidenceItems: ProjectMapReconstructionCandidateEvidenceItem[],
): ProjectMapReconstructionCandidateChecklistItem {
  const conflictState = deriveConflictState(evidenceItems);
  const supportState = evidenceItems.some(
    (evidence) => evidence.supportState === "confirmed",
  )
    ? "confirmed"
    : evidenceItems.some((evidence) => evidence.supportState === "inferred")
      ? "inferred"
      : evidenceItems.some((evidence) => evidence.supportState === "weak")
        ? "weak"
        : "missing";

  return {
    foundationArea,
    status: deriveChecklistStatus(evidenceItems, conflictState),
    supportState,
    conflictState,
    milestoneStates: collectMilestoneStates(evidenceItems),
    evidence: evidenceItems,
  };
}

function buildFoundationChecklist(
  evidence: ProjectMapReconstructionCandidateEvidenceItem[],
): ProjectMapReconstructionCandidateChecklistItem[] {
  const evidenceByFoundationArea = new Map<
    ProjectMapFoundationArea,
    ProjectMapReconstructionCandidateEvidenceItem[]
  >();

  for (const foundationArea of FOUNDATION_AREAS) {
    evidenceByFoundationArea.set(foundationArea, []);
  }

  for (const evidenceItem of evidence) {
    for (const foundationArea of evidenceItem.foundationAreas) {
      evidenceByFoundationArea.get(foundationArea)?.push(evidenceItem);
    }
  }

  return FOUNDATION_AREAS.map((foundationArea) =>
    buildChecklistItem(
      foundationArea,
      evidenceByFoundationArea.get(foundationArea) ?? [],
    ),
  );
}

export function buildProjectMapReconstructionCandidate(
  classification: ProjectMapEvidenceClassificationResult,
): ProjectMapReconstructionCandidateResult {
  if (classification.status === "unavailable") {
    return {
      status: "unavailable",
      reason: classification.reason,
      confidence: "unavailable",
      projectId: classification.projectId,
      projectName: classification.projectName,
      sourcePath: classification.sourcePath,
      foundationChecklist: [],
      evidence: [],
    };
  }

  const evidence = classification.evidence.map(toCandidateEvidenceItem);

  return {
    status: "available",
    projectId: classification.projectId,
    projectName: classification.projectName,
    sourcePath: classification.sourcePath,
    foundationChecklist: buildFoundationChecklist(evidence),
    evidence,
  };
}
