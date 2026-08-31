import type {
  ProjectMapClassifiedEvidenceItem,
  ProjectMapEvidenceClassificationResult,
  ProjectMapEvidenceConfidence,
  ProjectMapFoundationArea,
  ProjectMapMilestoneState,
} from "./classify";
import type { ProjectMapReadResult } from "./read";

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

export type ProjectMapCandidateStructureItem = {
  title: string;
  status: string;
  summary: string;
  evidenceRefs: string[];
};

export type ProjectMapCandidateStructure = {
  trustState: "candidate-read-only" | "needs-review" | "blocked";
  projectIdentity: {
    projectId: string;
    projectName: string;
    repositoryUrl: string | null;
    workingDirectory: string | null;
    checkoutPath: string | null;
    sourceIdentityRepositoryUrl: string | null;
    sourceIdentityPersistence: string;
    sourceIdentityStatus: "aligned" | "missing" | "mismatch";
  };
  currentState: {
    stateSource: string;
    sourceIdentityStatus: "aligned" | "missing" | "mismatch";
    sourceIdentityPersistence: string;
    projectCompletedState: string;
    projectCurrentState: string;
    projectNextState: string;
    canonicalMapStatus: string;
    candidateStatus: string;
  };
  completedItems: ProjectMapCandidateStructureItem[];
  underReviewItems: ProjectMapCandidateStructureItem[];
  rejectedOrBlockedItems: ProjectMapCandidateStructureItem[];
  missingInputs: string[];
  nextSteps: string[];
  evidenceRefs: string[];
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

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))];
}

function buildCandidateStructureStatus(
  item: ProjectMapReconstructionCandidateChecklistItem,
): ProjectMapReconstructionCandidateChecklistStatus {
  if (item.foundationArea === "SSOT" && item.evidence.length > 0) {
    return "needs review";
  }

  return item.status;
}

function buildCandidateStructureSummary(
  item: ProjectMapReconstructionCandidateChecklistItem,
  status: ProjectMapReconstructionCandidateChecklistStatus,
): string {
  if (item.foundationArea === "SSOT" && item.evidence.length > 0) {
    return "SSOT docs were found and can support the candidate map.";
  }

  const summaryByStatus: Record<
    ProjectMapReconstructionCandidateChecklistStatus,
    string
  > = {
    completed: "Ta część jest już potwierdzona w danych projektu.",
    planned: "Ta część pozostaje planowana i nie jest jeszcze canonical.",
    blocked: "Ta część jest zablokowana przez brak wejść lub zależność.",
    parked: "Ta część pozostaje parked jako przyszły kontekst.",
    absent: "Nie znaleziono jeszcze potwierdzenia dla tej części.",
    unknown: "Status tej części wymaga ręcznego sprawdzenia.",
    "needs review": "Ta część ma dane, ale nadal wymaga review.",
  };

  return summaryByStatus[status];
}

function buildCandidateStructureItem(
  item: ProjectMapReconstructionCandidateChecklistItem,
): ProjectMapCandidateStructureItem {
  const status = buildCandidateStructureStatus(item);

  return {
    title: item.foundationArea,
    status,
    summary: buildCandidateStructureSummary(item, status),
    evidenceRefs: uniqueStrings(
      item.evidence.map((evidence) => evidence.sourceRelativePath),
    ),
  };
}

function buildProjectFoundStructureItem(
  title: string,
  summary: string,
  evidenceRefs: string[],
): ProjectMapCandidateStructureItem {
  return {
    title,
    status: "completed",
    summary,
    evidenceRefs: uniqueStrings(evidenceRefs),
  };
}

function buildMissingInputReason(
  item: ProjectMapCandidateStructureItem,
): string {
  if (item.title === "SSOT") {
    return item.status === "needs review"
      ? "SSOT docs were found and can support the candidate map."
      : "SSOT is missing because no SSOT docs were found.";
  }

  if (item.title === "Project Bible") {
    return "Project Bible is missing because no dedicated Project Bible source was found.";
  }

  if (item.title === "Project Map") {
    return "Project Map is missing because canonical map.json does not exist yet.";
  }

  if (item.title === "First Layout") {
    return "First Layout is missing because no BCP layout evidence was found; the shell layout exists separately.";
  }

  if (item.title === "First Working Flow") {
    return "First Working Flow is missing because no flow evidence was found.";
  }

  if (item.title === "Publication Path") {
    return "Publication Path is missing because canonical save/publish is not implemented or approved yet.";
  }

  return `${item.title} remains ${item.status} in the candidate map.`;
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

export function buildProjectMapCandidateStructure(
  project: {
    id: string;
    name: string;
    repositoryUrl?: string | null;
    workingDirectory?: string | null;
  } | null,
  mapReadResult: ProjectMapReadResult | null,
  candidate: ProjectMapReconstructionCandidateResult | null,
): ProjectMapCandidateStructure | null {
  if (!project || !mapReadResult || !candidate || candidate.status !== "available") {
    return null;
  }

  const sourceIdentityRepositoryUrl =
    "projectSourceIdentity" in mapReadResult && mapReadResult.projectSourceIdentity
      ? mapReadResult.projectSourceIdentity.repositoryUrl
      : null;
  const sourceIdentityPersistence =
    "projectSourceIdentityPersistence" in mapReadResult &&
    mapReadResult.projectSourceIdentityPersistence
      ? mapReadResult.projectSourceIdentityPersistence.status
      : "unavailable";
  const repositoryUrl = project.repositoryUrl?.trim() || null;
  const workingDirectory = project.workingDirectory?.trim() || null;
  const checkoutPath =
    "projectSourceIdentity" in mapReadResult && mapReadResult.projectSourceIdentity
      ? mapReadResult.projectSourceIdentity.projectCheckoutPath ?? null
      : null;
  const sourceIdentityStatus =
    repositoryUrl && sourceIdentityRepositoryUrl
      ? repositoryUrl === sourceIdentityRepositoryUrl
        ? "aligned"
        : "mismatch"
      : "missing";

  const completedItems = uniqueStrings([
    sourceIdentityStatus === "aligned"
      ? "Project identity is aligned and repositoryUrl is visible."
      : "",
    candidate.status === "available"
      ? `Candidate evidence is available (${candidate.evidence.length} items).`
      : "",
  ]).map((summary) =>
    summary.includes("Project identity")
      ? buildProjectFoundStructureItem(
          "Project Identity",
          "Repository URL is aligned and source identity is persisted.",
          [
            "project-source-identity.json",
            repositoryUrl ?? "",
            workingDirectory ?? "",
            checkoutPath ?? "",
          ],
        )
      : buildProjectFoundStructureItem(
          "Candidate evidence",
          "Robocza mapa projektu może być zbudowana z dostępnych evidence i SSOT.",
          [
            ...candidate.evidence.map((evidence) => evidence.sourceRelativePath),
            ...(mapReadResult.status === "missing" || mapReadResult.status === "unavailable"
              ? []
              : [
                  "docs/04_ROADMAP.md",
                  "docs/08_CURRENT_STATE.md",
                  "docs/09_CHANGELOG.md",
                  "docs/10_SESSION_STATE.md",
                  "docs/07_DECISIONS.md",
                  "package.json",
                ]),
          ],
        ),
  );

  const completedChecklistItems = candidate.foundationChecklist
    .filter((item) => item.status === "completed")
    .map(buildCandidateStructureItem);

  const completedProjectItems = uniqueStrings(
    [...completedItems, ...completedChecklistItems].map((item) => item.title),
  ).map((title) => {
    const foundItem =
      completedItems.find((item) => item.title === title) ??
      completedChecklistItems.find((item) => item.title === title);

    return foundItem as ProjectMapCandidateStructureItem;
  });
  const candidateStructureItems = candidate.foundationChecklist.map(
    buildCandidateStructureItem,
  );
  const underReviewItems = candidateStructureItems.filter((item) =>
    ["planned", "needs review", "parked", "unknown"].includes(item.status),
  );
  const rejectedOrBlockedItems = candidateStructureItems.filter((item) =>
    ["blocked", "absent"].includes(item.status),
  );

  const missingInputs = uniqueStrings([
    sourceIdentityStatus === "missing"
      ? "Repository URL is missing from Project Map source identity."
      : "",
    sourceIdentityStatus === "mismatch"
      ? "Repository URL in Project Map source identity does not match the BCP project record."
      : "",
    ...rejectedOrBlockedItems.map(buildMissingInputReason),
  ]);

  const nextSteps = uniqueStrings([
    sourceIdentityStatus === "aligned"
      ? "Review SSOT-derived map sections before any canonical save."
      : "Align repositoryUrl and source identity before trusting the candidate.",
    rejectedOrBlockedItems.length > 0
      ? "Resolve blocked inputs before any canonical write is considered."
      : "",
    "Keep canonical save separate and approval-bound.",
  ]);

  const evidenceRefs = uniqueStrings([
    ...candidate.evidence.map((evidence) => evidence.sourceRelativePath),
    ...(mapReadResult.status === "missing" || mapReadResult.status === "unavailable"
      ? []
      : [
          "docs/04_ROADMAP.md",
          "docs/08_CURRENT_STATE.md",
          "docs/09_CHANGELOG.md",
          "docs/10_SESSION_STATE.md",
          "docs/07_DECISIONS.md",
          "package.json",
        ]),
  ]);

  const trustState =
    sourceIdentityStatus === "aligned"
      ? "candidate-read-only"
      : sourceIdentityStatus === "mismatch"
        ? "needs-review"
        : "blocked";

  return {
    trustState,
    projectIdentity: {
      projectId: project.id,
      projectName: project.name,
      repositoryUrl,
      workingDirectory,
      checkoutPath,
      sourceIdentityRepositoryUrl,
      sourceIdentityPersistence,
      sourceIdentityStatus,
    },
    currentState: {
      stateSource: "repo + SSOT candidate evidence",
      sourceIdentityStatus,
      sourceIdentityPersistence,
      projectCompletedState:
        completedProjectItems.length > 0
          ? completedProjectItems.map((item) => item.title).join(", ")
          : "Brak projektowo potwierdzonych completed items.",
      projectCurrentState: trustState,
      projectNextState:
        nextSteps[0] ?? "Keep canonical save separate and approval-bound.",
      canonicalMapStatus:
        mapReadResult.status === "missing"
          ? "missing"
          : mapReadResult.reason === "project-map-present-but-read-not-implemented"
            ? "present"
            : "unavailable",
      candidateStatus: candidate.status,
    },
    completedItems: completedProjectItems,
    underReviewItems,
    rejectedOrBlockedItems,
    missingInputs,
    nextSteps,
    evidenceRefs,
  };
}
