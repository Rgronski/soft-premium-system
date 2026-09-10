// @vitest-environment node

import { describe, expect, it, vi } from "vitest";

import { resolveProjectMapStorageRoot } from "../project-brain/metadata";

vi.mock("../project-brain/metadata", () => ({
  resolveProjectMapStorageRoot: vi.fn(),
}));

import {
  buildProjectMapStructuralFingerprintArtifact,
  generateProjectMapStructuralFingerprint,
  STRUCTURAL_FINGERPRINT_EXCLUSIONS,
} from "./structural-fingerprint";

describe("Project Map structural fingerprint", () => {
  it("sorts entries and produces a stable overall fingerprint", () => {
    const first = buildProjectMapStructuralFingerprintArtifact({
      project: {
        id: "project-1",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/alpha.git",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      },
      checkoutPath: "C:\\SPS_OS_WORK\\alpha\\repo",
      generatedAt: "2026-09-11T00:00:00.000Z",
      entries: [
        { path: "src/z.ts", size: 3, sha256: "z" },
        { path: "README.md", size: 4, sha256: "a" },
      ],
    });
    const second = buildProjectMapStructuralFingerprintArtifact({
      project: {
        id: "project-1",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/alpha.git",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      },
      checkoutPath: first.checkoutPath,
      generatedAt: first.generatedAt,
      entries: [...first.entries].reverse(),
    });

    expect(first.entries.map((entry) => entry.path)).toEqual(["README.md", "src/z.ts"]);
    expect(second).toEqual(first);
    expect(first.kind).toBe("project-map-structural-fingerprint");
    expect(STRUCTURAL_FINGERPRINT_EXCLUSIONS).toContain(".env*");
    expect(STRUCTURAL_FINGERPRINT_EXCLUSIONS).toContain("node_modules/**");
  });

  it("generates the SPS metadata baseline from the validated checkout", async () => {
    vi.mocked(resolveProjectMapStorageRoot).mockReturnValue({
      status: "available",
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      projectName: "Beauty Client PRO",
      projectMetadataRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
    });

    const result = await generateProjectMapStructuralFingerprint({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    });

    expect(result.status).toBe("generated");
    if (result.status === "generated") {
      expect(result.artifact.kind).toBe("project-map-structural-fingerprint");
      expect(result.artifact.entries.length).toBeGreaterThan(0);
      expect(result.artifact.entries.some((entry) => entry.path.startsWith(".git/"))).toBe(false);
    }
  });
});
