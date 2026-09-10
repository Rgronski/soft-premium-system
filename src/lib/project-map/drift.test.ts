// @vitest-environment node

import { describe, expect, it } from "vitest";

import { detectProjectMapCandidateDrift } from "./drift";
import type { ProjectMapReadResult } from "./read";
import type { ProjectMapReconstructionCandidateResult } from "./reconstruct";

const project = {
  id: "project-1",
  name: "Alpha",
  repositoryUrl: "https://github.com/example/alpha.git",
  workingDirectory: "C:\\SPS_OS_WORK\\alpha",
};

const candidate = {
  status: "available",
  projectId: "project-1",
  projectName: "Alpha",
  sourcePath: "C:\\SPS_OS_WORK\\alpha\\repo",
  evidence: [{ sourceRelativePath: "README.md", discoveryStatus: "found" }],
} as unknown as ProjectMapReconstructionCandidateResult;

const mapReadResult = {
  status: "present",
  canonicalMap: {
    canonical: {
      projectId: "project-1",
      projectName: "Alpha",
      projectMetadataRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha",
      projectMapRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map",
      mapJsonPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\map.json",
      sourceIdentity: {
        projectId: "project-1",
        projectName: "Alpha",
        repositoryUrl: project.repositoryUrl,
        workingDirectory: project.workingDirectory,
        projectCheckoutPath: "C:\\SPS_OS_WORK\\alpha\\repo",
      },
    },
  },
} as unknown as ProjectMapReadResult;

describe("Project Map candidate drift", () => {
  it("reports no_drift when identity and available evidence align", () => {
    const result = detectProjectMapCandidateDrift({ project, mapReadResult, candidate });

    expect(result.status).toBe("no_drift");
    expect(result.changed).toEqual([]);
    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.unavailable).toEqual([]);
  });

  it("reports changed identity deterministically", () => {
    const result = detectProjectMapCandidateDrift({
      project: { ...project, name: "Other" },
      mapReadResult,
      candidate,
    });

    expect(result.status).toBe("changed");
    expect(result.changed.join(" | ")).toContain("project name");
  });

  it("reports unavailable data without treating it as no drift", () => {
    const result = detectProjectMapCandidateDrift({ project, mapReadResult: null, candidate: null });

    expect(result.status).toBe("unavailable");
    expect(result.unavailable).toContain("canonical map or project identity");
  });

  it("reports malformed canonical data as invalid", () => {
    const result = detectProjectMapCandidateDrift({
      project,
      mapReadResult: { status: "unavailable", reason: "project-map-invalid" } as ProjectMapReadResult,
      candidate,
    });

    expect(result.status).toBe("invalid");
  });
});
