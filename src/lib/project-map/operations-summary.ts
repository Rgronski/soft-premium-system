import type { ProjectMapSpsAlignmentResult } from "./alignment";
import type { ProjectMapControlledRefreshReadiness } from "./controlled-refresh";
import type { ProjectMapDriftResult } from "./drift";
import type {
  ProjectMapCanonicalIntegrityResult,
  ProjectMapReadResult,
} from "./read";
import type { ProjectMapRiskDecisionReadResult } from "./risk-decisions";
import type { ProjectMapStructuralFingerprintReadResult } from "./structural-fingerprint";

export type ProjectMapOperationsSummaryStatus =
  | "current"
  | "requires_review"
  | "unavailable";

export type ProjectMapOperationsSummary = {
  status: ProjectMapOperationsSummaryStatus;
  title: string;
  summary: string;
  details: string[];
};

export function buildProjectMapOperationsSummary(input: {
  appVersion: string;
  lastPublishedMilestone: string;
  mapReadResult: ProjectMapReadResult | null;
  integrity: ProjectMapCanonicalIntegrityResult;
  alignment: ProjectMapSpsAlignmentResult;
  structuralFingerprint: ProjectMapStructuralFingerprintReadResult;
  structuralDrift: ProjectMapDriftResult;
  riskDecisions: ProjectMapRiskDecisionReadResult | null;
  refreshReadiness: ProjectMapControlledRefreshReadiness;
}): ProjectMapOperationsSummary {
  const canonicalReady = input.mapReadResult?.status === "present";
  const auditReady =
    input.mapReadResult?.status === "present" &&
    input.mapReadResult.auditStatus === "present";
  const decisionsReady = input.riskDecisions?.status === "present";
  const fingerprintReady = input.structuralFingerprint.status === "present";
  const driftReady = input.structuralDrift.status === "no_drift";
  const refreshNoOp = input.refreshReadiness.status === "safe_no_op";
  const integrityReady = input.integrity.status === "consistent" || input.integrity.status === "warning";
  const alignmentUsable = input.alignment.status === "aligned" || input.alignment.status === "needs_review";
  const details = [
    `SPS version: ${input.appVersion}`,
    `Last published milestone: ${input.lastPublishedMilestone}`,
    `Canonical map: ${canonicalReady ? "present" : input.mapReadResult?.status ?? "unavailable"}`,
    `Audit sidecar: ${auditReady ? "present" : input.mapReadResult?.status === "present" ? input.mapReadResult.auditStatus : "unavailable"}`,
    `Risk decisions: ${input.riskDecisions?.status ?? "unavailable"}`,
    `Structural fingerprint baseline: ${input.structuralFingerprint.status}`,
    `Structural drift: ${input.structuralDrift.status}`,
    `Refresh readiness: ${input.refreshReadiness.status}`,
    `Integrity: ${input.integrity.status}`,
    `SPS alignment: ${input.alignment.status}`,
  ];

  if (!canonicalReady || !auditReady || !decisionsReady || !fingerprintReady) {
    return {
      status: "unavailable",
      title: "Operations history unavailable",
      summary: "Project Map operations history is incomplete because one or more required read-only artifacts is missing or unavailable.",
      details,
    };
  }

  if (!driftReady || !refreshNoOp || !integrityReady || !alignmentUsable) {
    return {
      status: "requires_review",
      title: "Operations history requires review",
      summary: "Project Map operations history is available, but current drift, refresh, integrity, or alignment data requires review before treating the map lifecycle as current.",
      details,
    };
  }

  return {
    status: "current",
    title: "Operations history current",
    summary: "Canonical map, audit sidecar, Product Owner risk decisions, structural fingerprint, no-drift comparison, and safe no-op refresh readiness are all visible from read-only data.",
    details,
  };
}
