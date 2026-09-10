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
const readFileMock = vi.fn();
const mkdirMock = vi.fn();
const writeFileMock = vi.fn();
const projectSourceIdentityPath =
  "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json";
const projectMetadataRootPath =
  "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb";

vi.mock("node:fs/promises", () => ({
  access: accessMock,
  readFile: readFileMock,
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
  readFileMock.mockReset();
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
  readFileMock.mockRejectedValue(createEnoentError());
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
      projectMetadataRootPath,
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
        projectMetadataRootPath,
        projectSourceIdentityPath,
        persistedAt: expect.any(String),
      },
      projectSourceIdentityPersistence: {
        status: "persisted",
        projectSourceIdentityPath,
        persistedAt: expect.any(String),
      },
    });
    expect(accessMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
    );
    expect(mkdirMock).toHaveBeenCalledWith(
      projectMetadataRootPath,
      { recursive: true },
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      projectSourceIdentityPath,
      expect.stringContaining('"repositoryUrl": "https://github.com/Beautyclient/BeautyClientPro.git"'),
      "utf8",
    );
  });

  it("returns failed persistence status when source identity cannot be written", async () => {
    const epermError = new Error("EPERM: operation not permitted") as Error & {
      code: string;
    };

    epermError.code = "EPERM";
    writeFileMock.mockRejectedValueOnce(epermError);

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
      projectMetadataRootPath,
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
        projectMetadataRootPath,
        projectSourceIdentityPath,
        persistedAt: expect.any(String),
      },
      projectSourceIdentityPersistence: {
        status: "failed",
        reason: "source-identity-write-failed",
        projectSourceIdentityPath,
        errorMessage: "EPERM: operation not permitted",
        persistedAt: expect.any(String),
      },
    });
    expect(mkdirMock).toHaveBeenCalledWith(projectMetadataRootPath, {
      recursive: true,
    });
    expect(writeFileMock).toHaveBeenCalledWith(
      projectSourceIdentityPath,
      expect.stringContaining('"repositoryUrl": "https://github.com/Beautyclient/BeautyClientPro.git"'),
      "utf8",
    );
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
      projectMetadataRootPath,
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
        projectMetadataRootPath,
        projectSourceIdentityPath,
        persistedAt: expect.any(String),
      },
      projectSourceIdentityPersistence: {
        status: "persisted",
        projectSourceIdentityPath,
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

  it("reads the canonical map and audit sidecar without rewriting either artifact", async () => {
    accessMock
      .mockImplementationOnce(async () => undefined)
      .mockImplementationOnce(async () => undefined);
    readFileMock
      .mockResolvedValueOnce(
        JSON.stringify({
          kind: "canonical-project-map",
          version: 1,
          canonical: {
            projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
            projectName: "Beauty Client PRO",
            projectMetadataRootPath: projectMetadataRootPath,
            projectMapRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
            mapJsonPath: "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
            projectSourceIdentityPath,
            sourceIdentity: {
              projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
              projectName: "Beauty Client PRO",
              repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
              workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
              projectCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
              projectMetadataRootPath: projectMetadataRootPath,
              projectSourceIdentityPath,
              persistedAt: "2026-09-10T13:40:05.300Z",
            },
            writtenAt: "2026-09-10T13:40:05.300Z",
          },
          writeApproval: {
            status: "approved",
            canonicalWriteAllowed: true,
            acceptedRisks: ["SSOT", "Project Bible", "Project Map", "First Layout"],
          },
        }),
      )
      .mockResolvedValueOnce(
        JSON.stringify({
          kind: "canonical-project-map-write-audit",
          version: 1,
          projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
          projectName: "Beauty Client PRO",
          mapJsonPath: "map.json",
          projectSourceIdentityPath,
          acceptedRisks: ["SSOT", "Project Bible", "Project Map", "First Layout"],
          preflight: { status: "NEEDS_EVIDENCE", evidenceRiskCount: 5 },
          writeResult: "written",
          writtenAt: "2026-09-10T13:40:05.300Z",
        }),
      );

    const { resolveProjectMapReadResult } = await loadModule();
    const result = await resolveProjectMapReadResult({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    });

    expect(result.status).toBe("present");
    if (result.status !== "present") {
      throw new Error("expected canonical map readback");
    }
    expect(result.canonicalMap.canonical.projectName).toBe("Beauty Client PRO");
    expect(result.audit?.preflight.evidenceRiskCount).toBe(5);
    expect(result.auditStatus).toBe("present");
    expect(readFileMock).toHaveBeenNthCalledWith(1, expect.stringContaining("map.json"), "utf8");
    expect(readFileMock).toHaveBeenNthCalledWith(2, expect.stringContaining("map-write-audit.json"), "utf8");
    expect(mkdirMock).toHaveBeenCalledTimes(1);
    expect(writeFileMock).toHaveBeenCalledTimes(1);
    expect(mkdirMock).toHaveBeenCalledWith(
      projectMetadataRootPath,
      { recursive: true },
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      projectSourceIdentityPath,
      expect.stringContaining('"projectCheckoutPath": "C:\\\\SPS_OS_WORK\\\\beauty-client-pro\\\\repo"'),
      "utf8",
    );
  });
});

describe("verifyProjectMapCanonicalIntegrity", () => {
  it("returns consistent when canonical and audit identity and decisions match", async () => {
    const { verifyProjectMapCanonicalIntegrity } = await loadModule();
    const identity = {
      projectId: "project-1",
      projectName: "Alpha",
      repositoryUrl: "https://example.com/alpha.git",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      projectCheckoutPath: "C:\\SPS_OS_WORK\\alpha\\repo",
      projectMetadataRootPath,
      projectSourceIdentityPath,
      persistedAt: "2026-09-10T13:40:05.300Z",
    };

    const result = verifyProjectMapCanonicalIntegrity({
      status: "present",
      projectId: "project-1",
      projectName: "Alpha",
      projectMetadataRootPath,
      projectMapRootPath: `${projectMetadataRootPath}\\project-map`,
      mapJsonPath: `${projectMetadataRootPath}\\project-map\\map.json`,
      projectSourceIdentity: identity,
      projectSourceIdentityPersistence: { status: "persisted", projectSourceIdentityPath, persistedAt: identity.persistedAt },
      canonicalMap: {
        kind: "canonical-project-map",
        version: 1,
        canonical: {
          projectId: "project-1",
          projectName: "Alpha",
          projectMetadataRootPath,
          projectMapRootPath: `${projectMetadataRootPath}\\project-map`,
          mapJsonPath: `${projectMetadataRootPath}\\project-map\\map.json`,
          projectSourceIdentityPath,
          sourceIdentity: identity,
          writtenAt: identity.persistedAt,
        },
        writeApproval: { status: "approved", canonicalWriteAllowed: true, acceptedRisks: ["SSOT"] },
      },
      auditStatus: "present",
      audit: {
        kind: "canonical-project-map-write-audit",
        version: 1,
        projectId: "project-1",
        projectName: "Alpha",
        mapJsonPath: `${projectMetadataRootPath}\\project-map\\map.json`,
        projectSourceIdentityPath,
        sourceIdentity: identity,
        acceptedRisks: ["SSOT"],
        preflight: { status: "NEEDS_EVIDENCE", evidenceRiskCount: 1 },
        writeResult: "written",
        writtenAt: identity.persistedAt,
      },
    });

    expect(result.status).toBe("consistent");
  });

  it("returns warning for a missing audit sidecar and invalid for a mismatch", async () => {
    const { verifyProjectMapCanonicalIntegrity } = await loadModule();
    const base = {
      status: "present" as const,
      projectId: "project-1",
      projectName: "Alpha",
      projectMetadataRootPath,
      projectMapRootPath: `${projectMetadataRootPath}\\project-map`,
      mapJsonPath: `${projectMetadataRootPath}\\project-map\\map.json`,
      projectSourceIdentity: {} as never,
      projectSourceIdentityPersistence: { status: "unavailable" as const, reason: "project-source-identity-unavailable" as const },
      canonicalMap: {} as never,
    };

    expect(verifyProjectMapCanonicalIntegrity({ ...base, auditStatus: "missing" }).status).toBe("warning");
    expect(
      verifyProjectMapCanonicalIntegrity({
        ...base,
        auditStatus: "present",
        audit: { projectId: "other" } as never,
      }).status,
    ).toBe("invalid");
  });
});
