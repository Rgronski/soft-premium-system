import { describe, expect, test } from "vitest";

import { validateConductorBoundarySnapshot } from "./conductor";
import type { ConductorBoundarySnapshot } from "./types";

const readySnapshot: ConductorBoundarySnapshot = {
  ms0090Published: true,
  ms0091Published: true,
  ms0092Published: true,
  ms0093Published: true,
  ms0094Published: true,
  ms0095Published: true,
  ms0096Published: true,
  workflowEngineRemainsRulesOwner: true,
  projectBrainRemainsCanonicalSource: true,
  ssotRemainsCanonicalSource: true,
  readOnlyValidationOnly: true,
  uiScopeAdded: false,
  automationScopeAdded: false,
  schedulingScopeAdded: false,
  recoveryScopeAdded: false,
  runtimeStateMachineAdded: false,
  commandExecutorAdded: false,
};

describe("validateConductorBoundarySnapshot", () => {
  test("accepts a snapshot that keeps the MS-009.0 through MS-009.6 boundary intact", () => {
    const result = validateConductorBoundarySnapshot(readySnapshot);

    expect(result.ready).toBe(true);
    expect(result.violations).toEqual([]);
  });

  test("rejects snapshots that break the read-only or scope boundary", () => {
    const result = validateConductorBoundarySnapshot({
      ...readySnapshot,
      ms0095Published: false,
      automationScopeAdded: true,
      readOnlyValidationOnly: false,
    });

    expect(result.ready).toBe(false);
    expect(result.violations.map((violation) => violation.code)).toEqual([
      "missing-contract",
      "scope-boundary",
      "non-read-only",
    ]);
  });
});
