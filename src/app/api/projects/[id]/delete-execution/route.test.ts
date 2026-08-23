// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const executeProjectDiskDeleteMock = vi.fn();

vi.mock("@/lib/project/server", () => ({
  executeProjectDiskDelete: (request: unknown) =>
    executeProjectDiskDeleteMock(request),
}));

async function loadRouteModule() {
  vi.resetModules();
  return import("./route");
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

describe("POST /api/projects/[id]/delete-execution", () => {
  beforeEach(() => {
    executeProjectDiskDeleteMock.mockReset();
  });

  it("returns a blocked result when confirmation is missing", async () => {
    const blockedResult = {
      status: "blocked" as const,
      deletedPaths: [],
      blockedReasons: ["Brak typedConfirmation."],
      requestedActions: ["metadata-root"],
      projectMetadataRootPath: "",
      projectWorkingDirectoryPath: "",
      projectCheckoutPath: "",
    };

    executeProjectDiskDeleteMock.mockResolvedValueOnce(blockedResult);

    const { POST } = await loadRouteModule();
    const response = await POST(
      new Request("http://localhost/api/projects/project-1/delete-execution", {
        method: "POST",
        body: JSON.stringify({
          projectId: "project-1",
          projectName: "Alpha Workspace",
          typedConfirmation: "",
          deleteMetadataRoot: true,
          deleteWorkingDirectory: false,
          explicitProductOwnerApproval: false,
        }),
      }),
      createContext("project-1"),
    );

    expect(executeProjectDiskDeleteMock).toHaveBeenCalledWith({
      projectId: "project-1",
      projectName: "Alpha Workspace",
      typedConfirmation: "",
      deleteMetadataRoot: true,
      deleteWorkingDirectory: false,
      explicitProductOwnerApproval: false,
      dryRun: undefined,
    });
    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual(blockedResult);
  });

  it("returns a blocked result when Product Owner approval is missing", async () => {
    const blockedResult = {
      status: "blocked" as const,
      deletedPaths: [],
      blockedReasons: [
        "explicitProductOwnerApproval musi mieć wartość true przed wykonaniem destrukcyjnego delete.",
      ],
      requestedActions: ["working-directory-repo-checkout"],
      projectMetadataRootPath: "C:\\temp\\metadata",
      projectWorkingDirectoryPath: "C:\\temp\\workspace",
      projectCheckoutPath: "C:\\temp\\workspace\\repo",
    };

    executeProjectDiskDeleteMock.mockResolvedValueOnce(blockedResult);

    const { POST } = await loadRouteModule();
    const response = await POST(
      new Request("http://localhost/api/projects/project-1/delete-execution", {
        method: "POST",
        body: JSON.stringify({
          projectId: "project-1",
          projectName: "Alpha Workspace",
          typedConfirmation: "Alpha Workspace",
          deleteMetadataRoot: false,
          deleteWorkingDirectory: true,
          explicitProductOwnerApproval: false,
          dryRun: false,
        }),
      }),
      createContext("project-1"),
    );

    expect(executeProjectDiskDeleteMock).toHaveBeenCalledWith({
      projectId: "project-1",
      projectName: "Alpha Workspace",
      typedConfirmation: "Alpha Workspace",
      deleteMetadataRoot: false,
      deleteWorkingDirectory: true,
      explicitProductOwnerApproval: false,
      dryRun: false,
    });
    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual(blockedResult);
  });

  it("returns the helper result for confirmed destructive execution", async () => {
    const deletedResult = {
      status: "deleted" as const,
      deletedPaths: [
        "C:\\temp\\metadata",
        "C:\\temp\\workspace\\repo",
        "C:\\temp\\workspace",
      ],
      blockedReasons: [],
      requestedActions: [
        "metadata-root",
        "working-directory-repo-checkout",
      ],
      projectMetadataRootPath: "C:\\temp\\metadata",
      projectWorkingDirectoryPath: "C:\\temp\\workspace",
      projectCheckoutPath: "C:\\temp\\workspace\\repo",
    };

    executeProjectDiskDeleteMock.mockResolvedValueOnce(deletedResult);

    const { POST } = await loadRouteModule();
    const response = await POST(
      new Request("http://localhost/api/projects/project-1/delete-execution", {
        method: "POST",
        body: JSON.stringify({
          projectId: "project-1",
          projectName: "Alpha Workspace",
          typedConfirmation: "Alpha Workspace",
          deleteMetadataRoot: true,
          deleteWorkingDirectory: true,
          explicitProductOwnerApproval: true,
          dryRun: false,
        }),
      }),
      createContext("project-1"),
    );

    expect(executeProjectDiskDeleteMock).toHaveBeenCalledWith({
      projectId: "project-1",
      projectName: "Alpha Workspace",
      typedConfirmation: "Alpha Workspace",
      deleteMetadataRoot: true,
      deleteWorkingDirectory: true,
      explicitProductOwnerApproval: true,
      dryRun: false,
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(deletedResult);
  });
});
