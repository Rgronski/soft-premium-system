import type {
  ProjectMapEvidenceDiscoveryStatus,
  ProjectMapEvidenceItem,
  ProjectMapEvidenceScanResult,
  ProjectMapEvidenceType,
} from "./scan";

export type ProjectMapFoundationArea =
  | "Project Identity"
  | "SSOT"
  | "Project Bible"
  | "Project Map"
  | "Working Source"
  | "First Layout"
  | "First Working Flow"
  | "Publication Path";

export type ProjectMapMilestoneState =
  | "completed"
  | "planned"
  | "blocked"
  | "parked"
  | "absent"
  | "unknown";

export type ProjectMapEvidenceConfidence =
  | "direct"
  | "missing"
  | "unavailable"
  | "weak"
  | "unknown";

export type ProjectMapEvidenceConflictState = "none" | "conflicting";

export type ProjectMapClassifiedEvidenceItem = ProjectMapEvidenceItem & {
  confidence: ProjectMapEvidenceConfidence;
  foundationAreas: ProjectMapFoundationArea[];
  milestoneStates: ProjectMapMilestoneState[];
  conflictState: ProjectMapEvidenceConflictState;
};

export type ProjectMapEvidenceClassificationResult =
  | {
      status: "available";
      projectId: string;
      projectName: string;
      sourcePath: string;
      evidence: ProjectMapClassifiedEvidenceItem[];
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
      evidence: ProjectMapClassifiedEvidenceItem[];
    };

const FOUNDATION_AREAS_BY_EVIDENCE_TYPE: Record<
  Exclude<ProjectMapEvidenceType, "unknown">,
  ProjectMapFoundationArea[]
> = {
  readme: ["Project Identity", "Working Source"],
  roadmap: ["Project Map"],
  "current-state": ["SSOT", "Project Map"],
  changelog: ["Project Map"],
  "session-state": ["SSOT"],
  "decision/ADR": ["Project Bible", "Project Map"],
  "package/config": ["Working Source", "First Working Flow"],
  deployment: ["Publication Path"],
};

const MILESTONE_STATES_BY_EVIDENCE_TYPE: Record<
  Exclude<ProjectMapEvidenceType, "unknown">,
  ProjectMapMilestoneState[]
> = {
  readme: ["unknown"],
  roadmap: ["planned"],
  "current-state": ["unknown"],
  changelog: ["completed"],
  "session-state": ["unknown"],
  "decision/ADR": ["planned"],
  "package/config": ["planned"],
  deployment: ["completed"],
};

function classifyConfidence(
  evidenceType: ProjectMapEvidenceType,
  discoveryStatus: ProjectMapEvidenceDiscoveryStatus,
): ProjectMapEvidenceConfidence {
  if (discoveryStatus === "found") {
    return evidenceType === "unknown" ? "unknown" : "direct";
  }

  if (discoveryStatus === "missing") {
    return "missing";
  }

  if (discoveryStatus === "unavailable") {
    return "unavailable";
  }

  return "weak";
}

function classifyFoundationAreas(
  evidenceType: ProjectMapEvidenceType,
): ProjectMapFoundationArea[] {
  if (evidenceType === "unknown") {
    return [];
  }

  return FOUNDATION_AREAS_BY_EVIDENCE_TYPE[evidenceType] ?? [];
}

function classifyMilestoneStates(
  evidenceType: ProjectMapEvidenceType,
  discoveryStatus: ProjectMapEvidenceDiscoveryStatus,
): ProjectMapMilestoneState[] {
  if (discoveryStatus === "missing") {
    return ["absent"];
  }

  if (discoveryStatus === "unavailable" || discoveryStatus === "unreadable") {
    return ["blocked"];
  }

  if (evidenceType === "unknown") {
    return ["unknown"];
  }

  return MILESTONE_STATES_BY_EVIDENCE_TYPE[evidenceType] ?? ["unknown"];
}

export function classifyProjectMapEvidenceItem(
  evidence: ProjectMapEvidenceItem,
): ProjectMapClassifiedEvidenceItem {
  return {
    ...evidence,
    confidence: classifyConfidence(
      evidence.evidenceType,
      evidence.discoveryStatus,
    ),
    foundationAreas: classifyFoundationAreas(evidence.evidenceType),
    milestoneStates: classifyMilestoneStates(
      evidence.evidenceType,
      evidence.discoveryStatus,
    ),
    conflictState: "none",
  };
}

export function classifyProjectMapEvidence(
  scanResult: ProjectMapEvidenceScanResult,
): ProjectMapEvidenceClassificationResult {
  if (scanResult.status === "unavailable") {
    return {
      status: "unavailable",
      reason: scanResult.reason,
      confidence: "unavailable",
      projectId: scanResult.projectId,
      projectName: scanResult.projectName,
      sourcePath: scanResult.sourcePath,
      evidence: [],
    };
  }

  return {
    status: "available",
    projectId: scanResult.projectId,
    projectName: scanResult.projectName,
    sourcePath: scanResult.sourcePath,
    evidence: scanResult.evidence.map(classifyProjectMapEvidenceItem),
  };
}
