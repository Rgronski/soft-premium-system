// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const rmMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  rm: (path: string, options: unknown) => rmMock(path, options),
}));

const approvalText =
  "Product Owner approves destructive checkout-only disk removal for Beauty Client PRO, project id 0d3e28cb-6dff-442a-b94c-007a5d6b5779. Remove exactly C:\\SPS_OS_WORK\\beauty-client-pro\\repo. Preserve C:\\SPS_OS_WORK\\beauty-client-pro. Preserve C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json. Preserve C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb. Remote main is verified at 60f8280b2103c12d16b2851a3cef1be140eb34b5. Product Owner acknowledges local checkout deletion is destructive but recoverable from remote if access remains available.";

async function loadRouteModule() {
  vi.resetModules();
  return import("./route");
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

function createRequest(body: unknown): Request {
  return new Request(
    "http://localhost/api/projects/project-1/checkout-removal/execute",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
}

function createValidPayload() {
  return {
    projectId: "project-1",
    operationMode: "remove-checkout",
    targetPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
    preservedPaths: [
      "C:\\SPS_OS_WORK\\beauty-client-pro",
      "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
    ],
    gitPreflight: {
      workingTreeStatus: "clean",
      branch: "work/beauty-client-pro",
      head: "60f8280b2103c12d16b2851a3cef1be140eb34b5",
      remote: "https://github.com/Beautyclient/BeautyClientPro.git",
      remoteMainVerified: true,
    },
    approvalText,
  };
}

describe("POST /api/projects/[id]/checkout-removal/execute", () => {
  beforeEach(() => {
    rmMock.mockReset();
  });

  it("deletes only the checkout path when every guard passes", async () => {
    rmMock.mockResolvedValueOnce(undefined);

    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(createValidPayload()),
      createContext("project-1"),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(rmMock).toHaveBeenCalledTimes(1);
    expect(rmMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
      {
        recursive: true,
        force: true,
      },
    );
    expect(body).toEqual({
      status: "executed",
      mode: "remove-checkout",
      executionPerformed: true,
      deletedPaths: ["C:\\SPS_OS_WORK\\beauty-client-pro\\repo"],
      preservedPaths: [
        "C:\\SPS_OS_WORK\\beauty-client-pro",
        "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      ],
      blockedReasons: [],
      gitPreflight: createValidPayload().gitPreflight,
      evidencePreserved: true,
      reconnectRequired: true,
      nextStep:
        "Reconnect required: dodaj lub połącz checkout ponownie, a potem wykonaj Project Map readback.",
    });
  });

  it("blocks mismatched approval text before any disk operation", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest({
        ...createValidPayload(),
        approvalText: "Product Owner approves something else.",
      }),
      createContext("project-1"),
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(rmMock).not.toHaveBeenCalled();
    expect(body.executionPerformed).toBe(false);
    expect(body.deletedPaths).toEqual([]);
    expect(body.blockedReasons).toContain(
      "approvalText musi dokładnie pasować do wymaganej zgody.",
    );
  });

  it("blocks dirty or incomplete git preflight before any disk operation", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest({
        ...createValidPayload(),
        gitPreflight: {
          workingTreeStatus: "dirty",
          branch: "",
          head: "",
          remote: "",
          remoteMainVerified: false,
        },
      }),
      createContext("project-1"),
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(rmMock).not.toHaveBeenCalled();
    expect(body.blockedReasons).toEqual([
      "Git status musi być clean.",
      "Git branch musi być znany.",
      "Git HEAD musi być znany.",
      "Git remote musi być znany.",
      "Remote main musi być zweryfikowany.",
    ]);
  });

  it("blocks manifest, metadata, preserved, and outside-workspace targets", async () => {
    const { POST } = await loadRouteModule();
    const metadataResponse = await POST(
      createRequest({
        ...createValidPayload(),
        targetPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      }),
      createContext("project-1"),
    );
    const metadataBody = await metadataResponse.json();
    const manifestResponse = await POST(
      createRequest({
        ...createValidPayload(),
        targetPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
      }),
      createContext("project-1"),
    );
    const manifestBody = await manifestResponse.json();
    const outsideResponse = await POST(
      createRequest({
        ...createValidPayload(),
        targetPath: "C:\\SPS_OS_WORK\\other-project\\repo",
      }),
      createContext("project-1"),
    );
    const outsideBody = await outsideResponse.json();

    expect(rmMock).not.toHaveBeenCalled();
    expect(metadataResponse.status).toBe(409);
    expect(metadataBody.blockedReasons).toContain(
      "targetPath nie może wskazywać na .sps-meta.",
    );
    expect(metadataBody.blockedReasons).toContain(
      "targetPath nie może być ścieżką zachowywaną.",
    );
    expect(manifestResponse.status).toBe(409);
    expect(manifestBody.blockedReasons).toContain(
      "targetPath nie może wskazywać na sps-project.json.",
    );
    expect(manifestBody.blockedReasons).toContain(
      "targetPath nie może być ścieżką zachowywaną.",
    );
    expect(outsideResponse.status).toBe(409);
    expect(outsideBody.blockedReasons).toContain(
      "targetPath musi pozostać wewnątrz zachowanego workspace projektu.",
    );
  });

  it("blocks when preserved paths do not protect wrapper, manifest, and metadata", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest({
        ...createValidPayload(),
        preservedPaths: ["C:\\SPS_OS_WORK\\beauty-client-pro"],
      }),
      createContext("project-1"),
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(rmMock).not.toHaveBeenCalled();
    expect(body.blockedReasons).toContain(
      "preservedPaths musi zawierać manifest sps-project.json.",
    );
    expect(body.blockedReasons).toContain(
      "preservedPaths musi zawierać metadata root .sps-meta.",
    );
  });

  it("reports failed removal without claiming execution", async () => {
    rmMock.mockRejectedValueOnce(new Error("permission denied"));

    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(createValidPayload()),
      createContext("project-1"),
    );
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(rmMock).toHaveBeenCalledTimes(1);
    expect(body.status).toBe("failed");
    expect(body.executionPerformed).toBe(false);
    expect(body.deletedPaths).toEqual([]);
    expect(body.blockedReasons).toEqual([
      "Nie udało się usunąć checkoutu: permission denied",
    ]);
  });
});
