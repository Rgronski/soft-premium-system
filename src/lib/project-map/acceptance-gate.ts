import type { ProjectMapSpsAlignmentResult } from "./alignment";
import type { ProjectMapControlledRefreshReadiness } from "./controlled-refresh";
import type { ProjectMapDriftResult } from "./drift";
import type { ProjectMapOperationsSummary } from "./operations-summary";
import type { ProjectMapCanonicalIntegrityResult, ProjectMapReadResult } from "./read";
import type { ProjectMapRiskDecisionReadResult } from "./risk-decisions";
import type { ProjectMapStructuralFingerprintReadResult } from "./structural-fingerprint";

export type ProjectMapEndToEndAcceptanceStatus =
  | "accepted"
  | "accepted_with_known_risks"
  | "requires_review"
  | "blocked";

export type ProjectMapEndToEndAcceptanceGate = {
  status: ProjectMapEndToEndAcceptanceStatus;
  title: string;
  summary: string;
  details: string[];
  knownRisks: string[];
};

const REQUIRED_ACCEPTED_RISKS = ["SSOT", "Project Bible", "Project Map", "First Layout"] as const;

export function buildProjectMapEndToEndAcceptanceGate(input: {
  mapReadResult: ProjectMapReadResult | null;
  integrity: ProjectMapCanonicalIntegrityResult;
  alignment: ProjectMapSpsAlignmentResult;
  structuralFingerprint: ProjectMapStructuralFingerprintReadResult;
  structuralDrift: ProjectMapDriftResult;
  riskDecisions: ProjectMapRiskDecisionReadResult | null;
  refreshReadiness: ProjectMapControlledRefreshReadiness;
  operationsSummary: ProjectMapOperationsSummary;
}): ProjectMapEndToEndAcceptanceGate {
  const acceptedRiskDecisions =
    input.riskDecisions?.status === "present"
      ? input.riskDecisions.decisions
          .filter((decision) => decision.decisionState === "accepted")
          .map((decision) => decision.riskKey)
      : [];
  const acceptedRiskSet = new Set(acceptedRiskDecisions);
  const knownRisks = REQUIRED_ACCEPTED_RISKS.filter((risk) => acceptedRiskSet.has(risk));
  const requiredArtifactsReady =
    input.mapReadResult?.status === "present" &&
    input.mapReadResult.auditStatus === "present" &&
    input.structuralFingerprint.status === "present" &&
    input.riskDecisions?.status === "present";
  const stableRuntimeState =
    input.structuralDrift.status === "no_drift" &&
    input.refreshReadiness.status === "safe_no_op";
  const details = [
    `canonical map: ${input.mapReadResult?.status ?? "unavailable"}`,
    `audit sidecar: ${input.mapReadResult?.status === "present" ? input.mapReadResult.auditStatus : "unavailable"}`,
    `risk decisions: ${input.riskDecisions?.status ?? "unavailable"}`,
    `structural fingerprint: ${input.structuralFingerprint.status}`,
    `structural drift: ${input.structuralDrift.status}`,
    `refresh readiness: ${input.refreshReadiness.status}`,
    `operations summary: ${input.operationsSummary.status}`,
    `integrity: ${input.integrity.status}`,
    `alignment: ${input.alignment.status}`,
  ];

  if (!requiredArtifactsReady) {
    return {
      status: "blocked",
      title: "Project Map acceptance blocked",
      summary: "End-to-end acceptance is blocked because canonical, audit, risk-decision, or fingerprint data is missing.",
      details,
      knownRisks,
    };
  }

  if (!stableRuntimeState || input.integrity.status === "invalid") {
    return {
      status: "requires_review",
      title: "Project Map acceptance requires review",
      summary: "Project Map data exists, but drift, refresh readiness, or integrity requires review before acceptance.",
      details,
      knownRisks,
    };
  }

  if (knownRisks.length > 0 || input.integrity.status === "warning" || input.alignment.status !== "aligned") {
    return {
      status: "accepted_with_known_risks",
      title: "Project Map accepted with known risks",
      summary: "The Project Map block is operationally complete and predictable, while accepted risks remain traceable and are not converted into resolved evidence.",
      details,
      knownRisks,
    };
  }

  return {
    status: "accepted",
    title: "Project Map accepted",
    summary: "The Project Map block is operationally complete with no known accepted-risk caveat in the current read-only data.",
    details,
    knownRisks,
  };
}
