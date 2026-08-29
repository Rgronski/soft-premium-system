// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const getServerProjectByIdMock = vi.fn();
const getServerTasksByProjectIdMock = vi.fn();
const getServerKnowledgeEntriesByProjectIdMock = vi.fn();
const getProjectConductorDecisionsMock = vi.fn();
const getProjectConductorStateMock = vi.fn();
const getCoreDoctrineBootstrapStatusMock = vi.fn();
const accessMock = vi.fn();
const mkdirMock = vi.fn();
const writeFileMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  access: accessMock,
  mkdir: mkdirMock,
  writeFile: writeFileMock,
}));

vi.mock("@/lib/project/server", () => ({
  getServerProjectById: getServerProjectByIdMock,
}));

vi.mock("@/lib/task/server", () => ({
  getServerTasksByProjectId: getServerTasksByProjectIdMock,
}));

vi.mock("@/lib/knowledge/server", () => ({
  getServerKnowledgeEntriesByProjectId:
    getServerKnowledgeEntriesByProjectIdMock,
}));

vi.mock("@/lib/conductor/project-store", () => ({
  getProjectConductorDecisions: getProjectConductorDecisionsMock,
  getProjectConductorState: getProjectConductorStateMock,
}));

vi.mock("@/lib/knowledge/core-doctrine", () => ({
  getCoreDoctrineBootstrapStatus: getCoreDoctrineBootstrapStatusMock,
}));

async function loadModule() {
  vi.resetModules();
  return import("./read");
}

function createEnoentError() {
  const error = new Error("ENOENT") as Error & { code: string };

  error.code = "ENOENT";

  return error;
}

beforeEach(() => {
  getServerProjectByIdMock.mockReset();
  getServerTasksByProjectIdMock.mockReset();
  getServerKnowledgeEntriesByProjectIdMock.mockReset();
  getProjectConductorDecisionsMock.mockReset();
  getProjectConductorStateMock.mockReset();
  getCoreDoctrineBootstrapStatusMock.mockReset();
  accessMock.mockReset();
  mkdirMock.mockReset();
  writeFileMock.mockReset();

  getServerProjectByIdMock.mockResolvedValue({
    id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
    name: "Beauty Client PRO",
    repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
    workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
  });
  accessMock.mockImplementation(async () => {
    throw createEnoentError();
  });
  mkdirMock.mockResolvedValue(undefined);
  writeFileMock.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("resolveProjectMapReadResult", () => {
  it("returns unavailable for invalid project identity without touching the filesystem", async () => {
    const { resolveProjectMapReadResult } = await loadModule();

    await expect(
      resolveProjectMapReadResult({
        id: "   ",
        name: "Alpha",
      }),
    ).resolves.toEqual({
      status: "unavailable",
      reason: "invalid-project-identity",
      projectSourceIdentityPersistence: {
        status: "skipped",
        reason: "invalid-project-identity",
      },
    });
    expect(accessMock).not.toHaveBeenCalled();
    expect(mkdirMock).not.toHaveBeenCalled();
    expect(writeFileMock).not.toHaveBeenCalled();
  });

  it("returns unavailable with unavailable persistence when the project is not provided", async () => {
    const { resolveProjectMapReadResult } = await loadModule();

    await expect(resolveProjectMapReadResult(null)).resolves.toEqual({
      status: "unavailable",
      reason: "invalid-project-identity",
      projectSourceIdentityPersistence: {
        status: "unavailable",
        reason: "project-source-identity-unavailable",
      },
    });
    expect(accessMock).not.toHaveBeenCalled();
    expect(mkdirMock).not.toHaveBeenCalled();
    expect(writeFileMock).not.toHaveBeenCalled();
  });

  it("returns missing when the project-map root does not exist", async () => {
    const { resolveProjectMapReadResult } = await loadModule();
    const result = await resolveProjectMapReadResult({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    });

    expect(result).toEqual({
      status: "missing",
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      projectName: "Beauty Client PRO",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
      projectSourceIdentity: {
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
        projectCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        projectMetadataRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
        projectSourceIdentityPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        persistedAt: expect.any(String),
      },
      projectSourceIdentityPersistence: {
        status: "persisted",
        projectSourceIdentityPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        persistedAt: expect.any(String),
      },
    });
    expect(accessMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
    );
    expect(mkdirMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      { recursive: true },
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
      expect.stringContaining('"repositoryUrl": "https://github.com/Beautyclient/BeautyClientPro.git"'),
      "utf8",
    );
  });

  it("returns failed persistence status when source identity cannot be written", async () => {
    mkdirMock.mockRejectedValueOnce(new Error("permission denied"));

    const { resolveProjectMapReadResult } = await loadModule();
    const result = await resolveProjectMapReadResult({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    });

    expect(result).toEqual({
      status: "missing",
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      projectName: "Beauty Client PRO",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
      projectSourceIdentity: {
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
        projectCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        projectMetadataRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
        projectSourceIdentityPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        persistedAt: expect.any(String),
      },
      projectSourceIdentityPersistence: {
        status: "failed",
        reason: "source-identity-write-failed",
        projectSourceIdentityPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        errorMessage: "permission denied",
        persistedAt: expect.any(String),
      },
    });
    expect(writeFileMock).not.toHaveBeenCalled();
  });

  it("returns missing when map.json does not exist inside an existing project-map root", async () => {
    accessMock
      .mockImplementationOnce(async () => undefined)
      .mockImplementationOnce(async () => {
        throw createEnoentError();
      });

    const { resolveProjectMapReadResult } = await loadModule();
    const result = await resolveProjectMapReadResult({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    });

    expect(result).toEqual({
      status: "missing",
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      projectName: "Beauty Client PRO",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
      projectSourceIdentity: {
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
        projectCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        projectMetadataRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
        projectSourceIdentityPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        persistedAt: expect.any(String),
      },
      projectSourceIdentityPersistence: {
        status: "persisted",
        projectSourceIdentityPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        persistedAt: expect.any(String),
      },
    });
    expect(accessMock).toHaveBeenNthCalledWith(
      1,
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
    );
    expect(accessMock).toHaveBeenNthCalledWith(
      2,
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
    );
  });

  it("returns unavailable when the map file exists but read parsing is not implemented yet", async () => {
    accessMock
      .mockImplementationOnce(async () => undefined)
      .mockImplementationOnce(async () => undefined);

    accessMock.mockResolvedValue(undefined);

    const { resolveProjectMapReadResult } = await loadModule();
    const result = await resolveProjectMapReadResult({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    });

    expect(result).toEqual({
      status: "unavailable",
      reason: "project-map-present-but-read-not-implemented",
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      projectName: "Beauty Client PRO",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
      projectSourceIdentity: {
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
        projectCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        projectMetadataRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
        projectSourceIdentityPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        persistedAt: expect.any(String),
      },
      projectSourceIdentityPersistence: {
        status: "persisted",
        projectSourceIdentityPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
        persistedAt: expect.any(String),
      },
    });
    expect(mkdirMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      { recursive: true },
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
      expect.stringContaining('"projectCheckoutPath": "C:\\\\SPS_OS_WORK\\\\beauty-client-pro\\\\repo"'),
      "utf8",
    );
  });
});
