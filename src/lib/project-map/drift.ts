import type { ProjectMapReadResult } from "./read";
import type { ProjectMapReconstructionCandidateResult } from "./reconstruct";
import {
  compareProjectMapStructuralFingerprints,
  readProjectMapStructuralFingerprint,
  scanProjectMapStructuralFingerprint,
} from "./structural-fingerprint";

export type ProjectMapDriftStatus =
  | "no_drift"
  | "changed"
  | "unavailable"
  | "invalid";

export type ProjectMapDriftResult = {
  status: ProjectMapDriftStatus;
  changed: string[];
  added: string[];
  removed: string[];
  unavailable: string[];
  details: string[];
};

type StructuralDriftProject = {
  id: string;
  name: string;
  repositoryUrl?: string | null;
  workingDirectory?: string | null;
};

type ProjectLike = {
  id: string;
  name: string;
  repositoryUrl?: string | null;
  workingDirectory?: string | null;
};

type DriftInput = {
  project: ProjectLike | null;
  mapReadResult: ProjectMapReadResult | null;
  candidate: ProjectMapReconstructionCandidateResult | null;
};

function addMismatch(changed: string[], label: string, expected: unknown, actual: unknown) {
  if (expected !== actual) {
    changed.push(`${label}: expected ${expected ?? "missing"}, actual ${actual ?? "missing"}`);
  }
}

function isSpsMetadataPath(path: string | undefined): boolean {
  return !!path && path.toLowerCase().includes("\\.sps-meta\\") && !path.toLowerCase().includes("\\beauty-client-pro\\");
}

export function detectProjectMapCandidateDrift({
  project,
  mapReadResult,
  candidate,
}: DriftInput): ProjectMapDriftResult {
  const changed: string[] = [];
  const added: string[] = [];
  const removed: string[] = [];
  const unavailable: string[] = [];

  if (mapReadResult?.status === "unavailable" && mapReadResult.reason === "project-map-invalid") {
    return {
      status: "invalid",
      changed,
      added,
      removed,
      unavailable,
      details: ["Canonical map.json is malformed or has an invalid schema."],
    };
  }
  if (!project || mapReadResult?.status !== "present") {
    return {
      status: "unavailable",
      changed,
      added,
      removed,
      unavailable: ["canonical map or project identity"],
      details: ["Canonical map and validated project identity are required for drift comparison."],
    };
  }

  const canonical = mapReadResult.canonicalMap.canonical;
  const sourceIdentity = canonical.sourceIdentity;
  addMismatch(changed, "project id", canonical.projectId, project.id);
  addMismatch(changed, "project name", canonical.projectName, project.name);
  addMismatch(changed, "repository URL", sourceIdentity.repositoryUrl, project.repositoryUrl ?? null);
  addMismatch(changed, "working directory", sourceIdentity.workingDirectory, project.workingDirectory ?? null);

  const persistedCheckoutPath = sourceIdentity.projectCheckoutPath;
  if (!persistedCheckoutPath) {
    unavailable.push("persisted checkout path");
  } else {
    addMismatch(changed, "checkout path", persistedCheckoutPath, candidate?.sourcePath);
  }
  if (!isSpsMetadataPath(canonical.projectMetadataRootPath) || !isSpsMetadataPath(canonical.projectMapRootPath) || !isSpsMetadataPath(canonical.mapJsonPath)) {
    changed.push("canonical storage boundary is outside SPS OS metadata");
  }
  if (!candidate || candidate.status !== "available") {
    unavailable.push("current checkout evidence scan");
  } else if (candidate.projectId !== project.id || candidate.projectName !== project.name) {
    changed.push("current checkout project identity");
  }

  const currentEvidence = candidate?.status === "available" ? candidate.evidence : [];
  for (const evidence of currentEvidence) {
    if (evidence.discoveryStatus !== "found") {
      unavailable.push(`${evidence.sourceRelativePath}: ${evidence.discoveryStatus}`);
    }
  }
  if (currentEvidence.length === 0) {
    unavailable.push("current structural evidence summary");
  }

  const details = [
    "Comparison uses the persisted validated checkout path and does not write files.",
    changed.length === 0 ? "Canonical project/map identity matches the current checkout context." : "Canonical project/map identity differs from the current checkout context.",
    currentEvidence.length > 0 ? `Current evidence items inspected: ${currentEvidence.length}.` : "Current evidence items were not available.",
  ];
  const status: ProjectMapDriftStatus = changed.length > 0
    ? "changed"
    : unavailable.length > 0
      ? "unavailable"
      : "no_drift";

  return { status, changed, added, removed, unavailable, details };
}

export async function detectProjectMapStructuralDrift(
  project: StructuralDriftProject | null,
): Promise<ProjectMapDriftResult> {
  const normalizedProject = project
    ? {
        id: project.id,
        name: project.name,
        ...(project.repositoryUrl ? { repositoryUrl: project.repositoryUrl } : {}),
        ...(project.workingDirectory ? { workingDirectory: project.workingDirectory } : {}),
      }
    : null;
  const baseline = await readProjectMapStructuralFingerprint(normalizedProject);

  if (baseline.status === "unavailable") {
    return {
      status: "unavailable",
      changed: [],
      added: [],
      removed: [],
      unavailable: ["structural fingerprint baseline"],
      details: ["A structural fingerprint baseline is required for comparison."],
    };
  }

  if (baseline.status === "invalid") {
    return {
      status: "invalid",
      changed: [],
      added: [],
      removed: [],
      unavailable: [],
      details: ["The structural fingerprint baseline is malformed or invalid."],
    };
  }

  const current = await scanProjectMapStructuralFingerprint(normalizedProject);

  if (current.status === "unavailable") {
    return {
      status: "unavailable",
      changed: [],
      added: [],
      removed: [],
      unavailable: [current.reason],
      details: ["The current checkout could not be scanned completely."],
    };
  }

  if (current.status === "invalid") {
    return {
      status: "invalid",
      changed: [],
      added: [],
      removed: [],
      unavailable: [],
      details: ["The current canonical identity or checkout path is invalid."],
    };
  }

  const comparison = compareProjectMapStructuralFingerprints(
    baseline.artifact,
    current.artifact,
  );
  const changed = [...comparison.changed];
  const identityComparisons: Array<[string, string, string]> = [
    ["project id", baseline.artifact.projectId, current.artifact.projectId],
    ["project name", baseline.artifact.projectName, current.artifact.projectName],
    ["repository URL", baseline.artifact.repositoryUrl, current.artifact.repositoryUrl],
    ["working directory", baseline.artifact.workingDirectory, current.artifact.workingDirectory],
    ["checkout path", baseline.artifact.checkoutPath, current.artifact.checkoutPath],
  ];

  for (const [label, expected, actual] of identityComparisons) {
    if (expected !== actual) {
      changed.push(`${label}: expected ${expected || "missing"}, actual ${actual || "missing"}`);
    }
  }

  if (baseline.artifact.overallFingerprint !== current.artifact.overallFingerprint && changed.length === 0) {
    changed.push("overall fingerprint changed without a file-level difference");
  }

  return {
    status: changed.length > 0 || comparison.added.length > 0 || comparison.removed.length > 0
      ? "changed"
      : "no_drift",
    changed,
    added: comparison.added,
    removed: comparison.removed,
    unavailable: [],
    details: [
      "The persisted structural baseline and current checkout were compared read-only.",
      `Baseline entries: ${baseline.artifact.entries.length}; current entries: ${current.artifact.entries.length}.`,
    ],
  };
}
