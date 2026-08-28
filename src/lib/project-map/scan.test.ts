// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const accessMock = vi.fn();

vi.mock("server-only", () => ({}));

vi.mock("node:fs/promises", () => ({
  access: accessMock,
}));

async function loadModule() {
  vi.resetModules();
  return import("./scan");
}

function createError(code: string): Error & { code: string } {
  const error = new Error(code) as Error & { code: string };
  error.code = code;
  return error;
}

beforeEach(() => {
  accessMock.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("scanProjectMapEvidence", () => {
  it("returns unavailable for invalid project identity without touching the filesystem", async () => {
    const { scanProjectMapEvidence } = await loadModule();

    await expect(scanProjectMapEvidence({ id: "   ", name: "Alpha" })).resolves
      .toEqual({
        status: "unavailable",
        reason: "invalid-project-identity",
        evidence: [],
      });

    expect(accessMock).not.toHaveBeenCalled();
  });

  it("returns unavailable when no source path is configured", async () => {
    const { scanProjectMapEvidence } = await loadModule();

    await expect(
      scanProjectMapEvidence({
        id: "project-1",
        name: "Alpha Workspace",
      }),
    ).resolves.toEqual({
      status: "unavailable",
      reason: "project-source-path-unavailable",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      evidence: [],
    });

    expect(accessMock).not.toHaveBeenCalled();
  });

  it("discovers candidate documentation and config evidence without reading file contents", async () => {
    accessMock.mockImplementation(async (path: string) => {
      const normalizedPath = path.replace(/\\/g, "/");

      if (normalizedPath.endsWith("README.md")) {
        return undefined;
      }

      if (normalizedPath.endsWith("docs/04_ROADMAP.md")) {
        throw createError("ENOENT");
      }

      if (normalizedPath.endsWith("docs/08_CURRENT_STATE.md")) {
        throw createError("EACCES");
      }

      if (normalizedPath.endsWith("docs/09_CHANGELOG.md")) {
        throw createError("EIO");
      }

      if (normalizedPath.endsWith("docs/10_SESSION_STATE.md")) {
        return undefined;
      }

      if (normalizedPath.endsWith("docs/07_DECISIONS.md")) {
        return undefined;
      }

      if (normalizedPath.endsWith("package.json")) {
        throw createError("ENOTDIR");
      }

      if (normalizedPath.endsWith("vercel.json")) {
        throw createError("EPERM");
      }

      return undefined;
    });

    const { scanProjectMapEvidence } = await loadModule();
    const result = await scanProjectMapEvidence({
      id: "project-1",
      name: "Alpha Workspace",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
    });

    expect(result).toEqual({
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
      evidence: [
        {
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "roadmap",
          discoveryStatus: "missing",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "current-state",
          discoveryStatus: "unreadable",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "changelog",
          discoveryStatus: "unavailable",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\09_CHANGELOG.md",
          sourceRelativePath: "docs/09_CHANGELOG.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "session-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "package/config",
          discoveryStatus: "missing",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\package.json",
          sourceRelativePath: "package.json",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "deployment",
          discoveryStatus: "unreadable",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\vercel.json",
          sourceRelativePath: "vercel.json",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
      ],
    });

    expect(accessMock).toHaveBeenCalledTimes(8);
    expect(accessMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\alpha-workspace\\README.md",
    );
    expect(accessMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\04_ROADMAP.md",
    );
  });
});
