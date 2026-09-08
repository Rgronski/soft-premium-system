import { describe, expect, test } from "vitest";

import {
  evaluateProjectMapCanonicalWritePreflight,
  type ProjectMapCanonicalWritePreflightInput,
} from "./canonical-write-preflight";

function buildInput(
  overrides: Partial<ProjectMapCanonicalWritePreflightInput> = {},
): ProjectMapCanonicalWritePreflightInput {
  return {
    candidate: {
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
      foundationChecklist: [
        {
          foundationArea: "Project Identity",
          status: "completed",
          supportState: "confirmed",
          conflictState: "none",
          milestoneStates: ["completed"],
          evidence: [],
        },
      ],
      evidence: [],
    },
    projectMapRootPath:
      "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map",
    mapJsonPath:
      "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map\\map.json",
    sourceIdentityAvailable: true,
    sourceIdentityPersistenceStatus: "persisted",
    ...overrides,
  };
}

describe("evaluateProjectMapCanonicalWritePreflight", () => {
  test("returns READY_FOR_FUTURE_WRITE when required planning inputs are sufficient", () => {
    const result = evaluateProjectMapCanonicalWritePreflight(buildInput());

    expect(result.status).toBe("READY_FOR_FUTURE_WRITE");
    expect(result.blockers).toEqual([]);
    expect(result.evidenceRiskCount).toBe(0);
  });

  test("returns NEEDS_EVIDENCE when candidate evidence has visible risks", () => {
    const result = evaluateProjectMapCanonicalWritePreflight(
      buildInput({
        candidate: {
          status: "available",
          projectId: "project-1",
          projectName: "Alpha Workspace",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
          foundationChecklist: [
            {
              foundationArea: "Project Map",
              status: "needs review",
              supportState: "inferred",
              conflictState: "conflicting",
              milestoneStates: ["unknown"],
              evidence: [],
            },
          ],
          evidence: [],
        },
      }),
    );

    expect(result.status).toBe("NEEDS_EVIDENCE");
    expect(result.evidenceRiskCount).toBe(1);
    expect(result.reasons.join(" ")).toContain("missing, weak, inferred");
  });

  test("returns BLOCKED when source identity is missing", () => {
    const result = evaluateProjectMapCanonicalWritePreflight(
      buildInput({
        sourceIdentityAvailable: false,
        sourceIdentityPersistenceStatus: null,
      }),
    );

    expect(result.status).toBe("BLOCKED");
    expect(result.blockers).toContain("Project source identity is missing.");
    expect(result.blockers).toContain("Project source identity is not persisted.");
  });

  test("returns UNKNOWN when storage target is unknown", () => {
    const result = evaluateProjectMapCanonicalWritePreflight(
      buildInput({
        projectMapRootPath: null,
        mapJsonPath: null,
      }),
    );

    expect(result.status).toBe("UNKNOWN");
    expect(result.blockers).toContain("SPS OS Project Map storage target is unknown.");
  });

  test("returns REJECTED only from an explicit rejected review state", () => {
    const result = evaluateProjectMapCanonicalWritePreflight(
      buildInput({
        reviewState: "rejected",
      }),
    );

    expect(result.status).toBe("REJECTED");
    expect(result.blockers).toContain(
      "Product Owner or persisted review state rejected the candidate.",
    );
  });
});
