import type {
  ProjectMapCanonicalIntegrityResult,
  ProjectMapReadResult,
} from "./read";
import type { ProjectMapSpsAlignmentResult } from "./alignment";
import type { ProjectMapDriftResult } from "./drift";

export type ProjectMapCandidateRefreshPreviewStatus =
  | "no_changes"
  | "changes_ready"
  | "blocked"
  | "invalid";

export type ProjectMapCandidateRefreshPreview = {
  status: ProjectMapCandidateRefreshPreviewStatus;
  addedItems: string[];
  removedItems: string[];
  changedItems: string[];
  unchangedSummary: string;
  blockingReasons: string[];
  sourceIdentity: string;
  targetIdentity: string;
};

type ProjectLike = {
  id: string;
  name: string;
};

export function buildProjectMapCandidateRefreshPreview(input: {
  project: ProjectLike | null;
  mapReadResult: ProjectMapReadResult | null;
  structuralDrift: ProjectMapDriftResult;
  integrity: ProjectMapCanonicalIntegrityResult;
  alignment: ProjectMapSpsAlignmentResult;
}): ProjectMapCandidateRefreshPreview {
  const sourceIdentity = input.mapReadResult?.projectSourceIdentity?.projectCheckoutPath ?? "unavailable";
  const targetIdentity = input.mapReadResult?.mapJsonPath ?? "unavailable";
  const addedItems = input.structuralDrift.added.map((item) => `added: ${item}`);
  const removedItems = input.structuralDrift.removed.map((item) => `removed: ${item}`);
  const changedItems = input.structuralDrift.changed.map((item) => `changed: ${item}`);
  const blockingReasons: string[] = [];

  if (!input.project || input.mapReadResult?.status !== "present") {
    blockingReasons.push("canonical map and project identity are required");
  }
  if (input.structuralDrift.status === "unavailable") {
    blockingReasons.push(...input.structuralDrift.unavailable.map((item) => `structural comparison unavailable: ${item}`));
  }
  if (input.structuralDrift.status === "invalid") {
    return {
      status: "invalid",
      addedItems,
      removedItems,
      changedItems,
      unchangedSummary: "Candidate preview is unavailable because structural comparison is invalid.",
      blockingReasons: ["structural comparison is invalid", ...input.structuralDrift.details],
      sourceIdentity,
      targetIdentity,
    };
  }
  if (input.integrity.status === "invalid") {
    blockingReasons.push("canonical integrity is invalid");
  } else if (input.integrity.status === "warning") {
    blockingReasons.push("canonical integrity requires review");
  }
  if (input.alignment.status !== "aligned") {
    blockingReasons.push(`SPS foundation alignment: ${input.alignment.status}`);
  }

  if (blockingReasons.length > 0) {
    return {
      status: "blocked",
      addedItems,
      removedItems,
      changedItems,
      unchangedSummary: "Candidate preview is not promoted while required comparison or control data needs review.",
      blockingReasons,
      sourceIdentity,
      targetIdentity,
    };
  }

  const hasChanges = addedItems.length > 0 || removedItems.length > 0 || changedItems.length > 0;

  return {
    status: hasChanges ? "changes_ready" : "no_changes",
    addedItems,
    removedItems,
    changedItems,
    unchangedSummary: hasChanges
      ? "Unchanged files remain outside the proposed candidate update."
      : "Current checkout matches the canonical structural baseline; no candidate changes are proposed.",
    blockingReasons: [],
    sourceIdentity,
    targetIdentity,
  };
}
