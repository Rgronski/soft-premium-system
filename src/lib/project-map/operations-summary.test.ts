import { describe, expect, it } from "vitest";

import { buildProjectMapOperationsSummary } from "./operations-summary";

const baseInput = {
  appVersion: "1.0073",
  lastPublishedMilestone: "MS-031.52 - Project Map Operations History Summary Foundation",
  mapReadResult: { status: "present", auditStatus: "present" } as never,
  integrity: { status: "consistent", checks: [] } as never,
  alignment: { status: "aligned", checks: [], controlSources: [] } as never,
  structuralFingerprint: { status: "present", artifactPath: "structural-fingerprint.json", artifact: {} } as never,
  structuralDrift: { status: "no_drift", changed: [], added: [], removed: [], unavailable: [], details: [] } as never,
  riskDecisions: { status: "present", decisions: [] } as never,
  refreshReadiness: {
    status: "safe_no_op" as const,
    title: "Safe no-op",
    summary: "No changes.",
    details: [],
    backupAndAudit: "No backup.",
  },
};

describe("buildProjectMapOperationsSummary", () => {
  it("summarizes the current visible Project Map lifecycle", () => {
    const result = buildProjectMapOperationsSummary(baseInput);

    expect(result.status).toBe("current");
    expect(result.summary).toContain("Canonical map");
    expect(result.details).toContain("Structural drift: no_drift");
    expect(result.details).toContain("Refresh readiness: safe_no_op");
  });

  it("requires review when drift or refresh readiness is not current", () => {
    const result = buildProjectMapOperationsSummary({
      ...baseInput,
      structuralDrift: { status: "changed", changed: ["package.json"], added: [], removed: [], unavailable: [], details: [] } as never,
      refreshReadiness: { ...baseInput.refreshReadiness, status: "requires_review" } as never,
    });

    expect(result.status).toBe("requires_review");
    expect(result.summary).toContain("requires review");
  });

  it("does not infer missing required artifacts as current", () => {
    const result = buildProjectMapOperationsSummary({
      ...baseInput,
      structuralFingerprint: { status: "unavailable", reason: "baseline-unavailable", artifactPath: "structural-fingerprint.json" } as never,
    });

    expect(result.status).toBe("unavailable");
    expect(result.summary).toContain("missing or unavailable");
  });
});
