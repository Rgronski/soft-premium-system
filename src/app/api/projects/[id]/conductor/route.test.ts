// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const getServerProjectByIdMock = vi.fn();
const getProjectConductorStateMock = vi.fn();

vi.mock("@/lib/project/server", () => ({
  getServerProjectById: (projectId: string) =>
    getServerProjectByIdMock(projectId),
}));

vi.mock("@/lib/conductor/project-store", () => ({
  getProjectConductorState: (projectId: string) =>
    getProjectConductorStateMock(projectId),
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

describe("GET /api/projects/[id]/conductor", () => {
  beforeEach(() => {
    getServerProjectByIdMock.mockReset();
    getProjectConductorStateMock.mockReset();
  });

  it("returns the filesystem-backed conductor state when the project exists", async () => {
    const conductorState = {
      projectId: "project-123",
      status: "decision-required",
      currentMilestone: "Konduktor projektu czeka na decyzję Product Ownera",
      currentPhase: "Brak stanu dla projektu",
      nextAction:
        "Konduktor może wskazać następny krok dopiero po zapisaniu stanu projektu albo decyzji Product Ownera.",
      reason: "Projekt nie ma jeszcze własnego trwałego stanu Konduktora.",
      updatedAt: "2026-08-23T04:00:00.000Z",
    };

    getServerProjectByIdMock.mockResolvedValue({
      id: "project-123",
      name: "Beauty Client PRO",
    });
    getProjectConductorStateMock.mockResolvedValue(conductorState);

    const { GET } = await loadRouteModule();
    const response = await GET(
      new Request("http://localhost/api/projects/project-123/conductor"),
      createContext("project-123"),
    );

    expect(response.status).toBe(200);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("project-123");
    expect(getProjectConductorStateMock).toHaveBeenCalledWith("project-123");
    await expect(response.json()).resolves.toEqual(conductorState);
  });

  it("returns project-not-found when the project does not exist", async () => {
    getServerProjectByIdMock.mockResolvedValue(null);

    const { GET } = await loadRouteModule();
    const response = await GET(
      new Request("http://localhost/api/projects/project-123/conductor"),
      createContext("project-123"),
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
    expect(getProjectConductorStateMock).not.toHaveBeenCalled();
  });
});
