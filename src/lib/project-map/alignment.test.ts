// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  evaluateProjectMapSpsFoundationAlignment,
  SPS_FOUNDATION_CONTROL_SOURCES,
} from "./alignment";
import type { ProjectMapReadResult } from "./read";
import type { ProjectMapReconstructionCandidateResult } from "./reconstruct";
import type { ProjectMapRiskDecisionReadResult, ProjectMapRiskKey } from "./risk-decisions";

const project = {
  id: "project-1",
  name: "Alpha",
  repositoryUrl: "https://github.com/example/alpha.git",
  workingDirectory: "C:\\SPS_OS_WORK\\alpha",
};

const candidate: ProjectMapReconstructionCandidateResult = {
  status: "available" as const,
  projectId: "project-1",
  projectName: "Alpha",
  sourcePath: "C:\\SPS_OS_WORK\\alpha\\repo",
  foundationChecklist: [
    "SSOT",
    "Project Bible",
    "Project Map",
    "First Layout",
  ].map((foundationArea) => ({
    foundationArea: foundationArea as "SSOT" | "Project Bible" | "Project Map" | "First Layout",
    status: "completed" as const,
    supportState: "confirmed" as const,
    conflictState: "none" as const,
    milestoneStates: [],
    evidence: [],
  })),
  evidence: [],
};

const mapReadResult: ProjectMapReadResult = {
  status: "present" as const,
  projectId: "project-1",
  projectName: "Alpha",
  projectMetadataRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha",
  projectMapRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map",
  mapJsonPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\map.json",
  projectSourceIdentity: {
    projectId: "project-1",
    projectName: "Alpha",
    repositoryUrl: project.repositoryUrl,
    workingDirectory: project.workingDirectory,
    projectCheckoutPath: "C:\\SPS_OS_WORK\\alpha\\repo",
    projectMetadataRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha",
    projectSourceIdentityPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-source-identity.json",
    persistedAt: "2026-09-10T00:00:00.000Z",
  },
  projectSourceIdentityPersistence: { status: "persisted" as const, projectSourceIdentityPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-source-identity.json", persistedAt: "2026-09-10T00:00:00.000Z" },
  canonicalMap: {
    kind: "canonical-project-map" as const,
    version: 1 as const,
    canonical: {
      projectId: "project-1",
      projectName: "Alpha",
      projectMetadataRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha",
      projectMapRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map",
      mapJsonPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\map.json",
      projectSourceIdentityPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-source-identity.json",
      sourceIdentity: {} as never,
      writtenAt: "2026-09-10T00:00:00.000Z",
    },
    writeApproval: { status: "approved", canonicalWriteAllowed: true, acceptedRisks: [] },
  },
  auditStatus: "present" as const,
  audit: {} as never,
};

const riskDecisions: ProjectMapRiskDecisionReadResult = {
  status: "present" as const,
  riskDecisionsPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\risk-decisions.json",
  projectId: "project-1",
  projectName: "Alpha",
  decisions: ["SSOT", "Project Bible", "Project Map", "First Layout"].map((riskKey) => ({
    riskKey: riskKey as ProjectMapRiskKey,
    decisionState: "accepted" as const,
    decidedAt: "2026-09-10T00:00:00.000Z",
    actor: "Product Owner" as const,
    projectId: "project-1",
    projectName: "Alpha",
  })),
};

describe("Project Map SPS foundation alignment", () => {
  it("reports aligned when deterministic checks agree", () => {
    const result = evaluateProjectMapSpsFoundationAlignment({
      project,
      mapReadResult,
      integrity: { status: "consistent", checks: [] },
      riskDecisions,
      candidate,
      canonicalWriteEnabled: false,
    });

    expect(result.status).toBe("aligned");
    expect(result.checks.every((check) => check.status === "aligned")).toBe(true);
    expect(result.controlSources).toEqual(SPS_FOUNDATION_CONTROL_SOURCES);
  });

  it("reports missing_data without inferring BCP facts", () => {
    const result = evaluateProjectMapSpsFoundationAlignment({
      project,
      mapReadResult: null,
      integrity: { status: "invalid", checks: [] },
      riskDecisions: { status: "missing", riskDecisionsPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\risk-decisions.json", projectId: "project-1", projectName: "Alpha" },
      candidate: null,
      canonicalWriteEnabled: false,
    });

    expect(result.status).toBe("missing_data");
    expect(result.checks.find((check) => check.key === "required-evidence")?.status).toBe("missing_data");
  });

  it("reports needs_review and mismatch explicitly", () => {
    const review = evaluateProjectMapSpsFoundationAlignment({
      project,
      mapReadResult,
      integrity: { status: "warning", checks: [] },
      riskDecisions: { status: "invalid", riskDecisionsPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\risk-decisions.json" },
      candidate: { ...candidate, foundationChecklist: [] },
      canonicalWriteEnabled: false,
    });
    expect(review.status).toBe("needs_review");

    const mismatch = evaluateProjectMapSpsFoundationAlignment({
      project,
      mapReadResult: { ...mapReadResult, projectSourceIdentity: { ...mapReadResult.projectSourceIdentity, projectId: "other" } },
      integrity: { status: "invalid", checks: [] },
      riskDecisions: { status: "mismatched", riskDecisionsPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\risk-decisions.json", projectId: "other", projectName: "Other" },
      candidate: { ...candidate, foundationChecklist: [{ ...candidate.foundationChecklist[0], conflictState: "conflicting" }] },
      canonicalWriteEnabled: true,
    });
    expect(mismatch.status).toBe("mismatch");
    expect(mismatch.checks.some((check) => check.status === "mismatch")).toBe(true);
  });
});
