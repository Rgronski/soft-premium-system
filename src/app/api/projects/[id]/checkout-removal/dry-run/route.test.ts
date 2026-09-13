import { describe, expect, it } from "vitest";

async function loadRouteModule() {
  return import("./route");
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

function createRequest(body: unknown): Request {
  return new Request(
    "http://localhost/api/projects/project-1/checkout-removal/dry-run",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
}

describe("POST /api/projects/[id]/checkout-removal/dry-run", () => {
  it("returns a checkout-removal preview without executing deletion", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest({
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
        approvalText: "Product Owner approves checkout-only dry-run.",
      }),
      createContext("project-1"),
    );

    await expect(response.json()).resolves.toEqual({
      status: "preview",
      mode: "remove-checkout",
      executionPerformed: false,
      wouldDeletePaths: ["C:\\SPS_OS_WORK\\beauty-client-pro\\repo"],
      preservedPaths: [
        "C:\\SPS_OS_WORK\\beauty-client-pro",
        "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      ],
      blockedReasons: [],
      gitPreflight: {
        workingTreeStatus: "clean",
        branch: "work/beauty-client-pro",
        head: "60f8280b2103c12d16b2851a3cef1be140eb34b5",
        remote: "https://github.com/Beautyclient/BeautyClientPro.git",
        remoteMainVerified: true,
      },
      evidencePreserved: true,
      reconnectRequired: true,
    });
    expect(response.status).toBe(200);
  });

  it("blocks when the route id and body projectId do not match", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest({
        projectId: "other-project",
        operationMode: "remove-checkout",
        targetPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        preservedPaths: ["C:\\SPS_OS_WORK\\beauty-client-pro"],
        gitPreflight: {},
        approvalText: "approved",
      }),
      createContext("project-1"),
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.executionPerformed).toBe(false);
    expect(body.wouldDeletePaths).toEqual([]);
    expect(body.blockedReasons).toContain(
      "projectId musi zgadzać się z parametrem trasy.",
    );
  });

  it("blocks paths outside the preserved workspace or inside evidence/manifest paths", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest({
        projectId: "project-1",
        operationMode: "remove-checkout",
        targetPath: "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
        preservedPaths: [
          "C:\\SPS_OS_WORK\\beauty-client-pro",
          "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
        ],
        gitPreflight: {},
        approvalText: "approved",
      }),
      createContext("project-1"),
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.executionPerformed).toBe(false);
    expect(body.wouldDeletePaths).toEqual([]);
    expect(body.blockedReasons).toContain(
      "targetPath nie może wskazywać na .sps-meta.",
    );
    expect(body.blockedReasons).toContain(
      "targetPath musi pozostać wewnątrz zachowanego workspace projektu.",
    );
  });

  it("blocks missing contract fields instead of inferring approval", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(createRequest({}), createContext("project-1"));
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.executionPerformed).toBe(false);
    expect(body.blockedReasons).toEqual([
      "projectId musi zgadzać się z parametrem trasy.",
      "operationMode musi mieć wartość remove-checkout.",
      "targetPath musi być bezwzględną ścieżką Windows.",
      "preservedPaths musi zawierać ścieżki do zachowania.",
      "gitPreflight musi być obiektem preflight.",
      "approvalText jest wymagany dla przyszłej zgody.",
    ]);
  });
});
