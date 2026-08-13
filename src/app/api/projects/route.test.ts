import { afterEach, describe, expect, it, vi } from "vitest";

const discoverServerProjectsFromWorkingRootMock = vi.fn();

vi.mock("@/lib/project/server", () => ({
  discoverServerProjectsFromWorkingRoot:
    discoverServerProjectsFromWorkingRootMock,
}));

async function loadRouteModule() {
  vi.resetModules();
  return import("./route");
}

afterEach(() => {
  discoverServerProjectsFromWorkingRootMock.mockReset();
  vi.restoreAllMocks();
});

describe("GET /api/projects", () => {
  it("returns discovered projects from the default work root", async () => {
    discoverServerProjectsFromWorkingRootMock.mockResolvedValueOnce([
      {
        id: "project-1",
        name: "Alpha",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-07-24T10:11:12.000Z",
      },
    ]);

    const { GET } = await loadRouteModule();
    const response = await GET();

    expect(discoverServerProjectsFromWorkingRootMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK",
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      projects: [
        {
          id: "project-1",
          name: "Alpha",
          workingDirectory: "C:\\SPS_OS_WORK\\alpha",
          projectFilesystemStatus: "manifest-present",
          createdAt: "2026-07-24T10:11:12.000Z",
        },
      ],
    });
  });
});
