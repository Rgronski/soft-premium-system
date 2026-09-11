import { describe, expect, it } from "vitest";

import { buildProjectMapEndToEndAcceptanceGate } from "./acceptance-gate";

const baseInput = {
  mapReadResult: { status: "present", auditStatus: "present" } as never,
  integrity: { status: "warning", checks: [] } as never,
  alignment: { status: "needs_review", checks: [], controlSources: [] } as never,
  structuralFingerprint: { status: "present", artifactPath: "structural-fingerprint.json", artifact: {} } as never,
  structuralDrift: { status: "no_drift", changed: [], added: [], removed: [], unavailable: [], details: [] } as never,
  riskDecisions: {
    status: "present",
    decisions: ["SSOT", "Project Bible", "Project Map", "First Layout"].map((riskKey) => ({
      riskKey,
      decisionState: "accepted",
      decidedAt: "2026-09-11T00:00:00.000Z",
      actor: "Product Owner",
      projectId: "project-1",
      projectName: "Project One",
    })),
  } as never,
  refreshReadiness: {
    status: "safe_no_op",
    title: "Safe no-op",
    summary: "No changes.",
    details: [],
    backupAndAudit: "No backup.",
  } as never,
  operationsSummary: {
    status: "current",
    title: "Operations history current",
    summary: "Current.",
    details: [],
  } as never,
};

describe("buildProjectMapEndToEndAcceptanceGate", () => {
  it("accepts the operational map with traceable known risks", () => {
    const result = buildProjectMapEndToEndAcceptanceGate(baseInput);

    expect(result.status).toBe("accepted_with_known_risks");
    expect(result.knownRisks).toEqual(["SSOT", "Project Bible", "Project Map", "First Layout"]);
    expect(result.summary).toContain("not converted into resolved evidence");
  });

  it("blocks when required artifacts are missing", () => {
    const result = buildProjectMapEndToEndAcceptanceGate({
      ...baseInput,
      structuralFingerprint: { status: "unavailable", reason: "baseline-unavailable", artifactPath: "structural-fingerprint.json" } as never,
    });

    expect(result.status).toBe("blocked");
    expect(result.summary).toContain("is missing");
  });

  it("requires review when drift is not stable", () => {
    const result = buildProjectMapEndToEndAcceptanceGate({
      ...baseInput,
      structuralDrift: { status: "changed", changed: ["package.json"], added: [], removed: [], unavailable: [], details: [] } as never,
    });

    expect(result.status).toBe("requires_review");
    expect(result.details).toContain("structural drift: changed");
  });
});
