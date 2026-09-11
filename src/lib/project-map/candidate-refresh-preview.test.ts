// @vitest-environment node

import { describe, expect, it } from "vitest";

import { buildProjectMapCandidateRefreshPreview } from "./candidate-refresh-preview";
import type { ProjectMapCanonicalIntegrityResult } from "./read";
import type { ProjectMapSpsAlignmentResult } from "./alignment";
import type { ProjectMapDriftResult } from "./drift";

const integrity: ProjectMapCanonicalIntegrityResult = { status: "consistent", checks: [] };
const alignment: ProjectMapSpsAlignmentResult = { status: "aligned", checks: [], controlSources: [] };
const drift: ProjectMapDriftResult = {
  status: "no_drift",
  changed: [],
  added: [],
  removed: [],
  unavailable: [],
  details: [],
};

describe("Project Map candidate refresh preview", () => {
  it("reports no_changes for a matching controlled baseline", () => {
    const result = buildProjectMapCandidateRefreshPreview({
      project: { id: "project-1", name: "Alpha" },
      mapReadResult: { status: "present", mapJsonPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\map.json", projectSourceIdentity: { projectCheckoutPath: "C:\\SPS_OS_WORK\\alpha\\repo" } } as never,
      structuralDrift: drift,
      integrity,
      alignment,
    });

    expect(result.status).toBe("no_changes");
    expect(result.blockingReasons).toEqual([]);
  });

  it("reports changes_ready with deterministic file details", () => {
    const result = buildProjectMapCandidateRefreshPreview({
      project: { id: "project-1", name: "Alpha" },
      mapReadResult: { status: "present", mapJsonPath: "map.json", projectSourceIdentity: { projectCheckoutPath: "repo" } } as never,
      structuralDrift: { ...drift, status: "changed", changed: ["src/a.ts"], added: ["src/b.ts"], removed: ["src/c.ts"] },
      integrity,
      alignment,
    });

    expect(result.status).toBe("changes_ready");
    expect(result.changedItems).toEqual(["changed: src/a.ts"]);
    expect(result.addedItems).toEqual(["added: src/b.ts"]);
    expect(result.removedItems).toEqual(["removed: src/c.ts"]);
  });

  it("blocks missing comparison data and marks invalid drift explicitly", () => {
    const blocked = buildProjectMapCandidateRefreshPreview({
      project: null,
      mapReadResult: null,
      structuralDrift: { ...drift, status: "unavailable", unavailable: ["baseline"] },
      integrity,
      alignment,
    });
    const invalid = buildProjectMapCandidateRefreshPreview({
      project: { id: "project-1", name: "Alpha" },
      mapReadResult: null,
      structuralDrift: { ...drift, status: "invalid", details: ["malformed baseline"] },
      integrity,
      alignment,
    });

    expect(blocked.status).toBe("blocked");
    expect(invalid.status).toBe("invalid");
  });
});
