import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  getProjectFromServer,
  ProjectServerError,
} from "./browser-server";
import type { Project } from "./types";

const fetchMock = vi.fn();

function createProject(overrides?: Partial<Project>): Project {
  return {
    id: "project-1",
    name: "Alpha",
    createdAt: "2026-07-24T10:00:00.000Z",
    ...overrides,
  };
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getProjectFromServer", () => {
  it("uses encoded projectId, sends GET, and returns the full project", async () => {
    const project = createProject({ id: "project/1" });
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(project), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    const result = await getProjectFromServer("project/1");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/projects/project%2F1", {
      method: "GET",
    });
    expect(result).toEqual(project);
  });

  it("maps 404 project-not-found to null", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "project-not-found" }), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getProjectFromServer("project-1")).resolves.toBeNull();
  });

  it("maps 503 context-unavailable to the controlled error", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "context-unavailable" }), {
        status: 503,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getProjectFromServer("project-1")).rejects.toMatchObject({
      code: "context-unavailable",
      status: 503,
    } satisfies Partial<ProjectServerError>);
  });

  it("maps a rejected fetch to network-error", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    await expect(getProjectFromServer("project-1")).rejects.toMatchObject({
      code: "network-error",
    } satisfies Partial<ProjectServerError>);
  });

  it("maps invalid JSON to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response("{", {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getProjectFromServer("project-1")).rejects.toMatchObject({
      code: "invalid-response",
      status: 200,
    } satisfies Partial<ProjectServerError>);
  });

  it("maps an invalid project shape to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ id: "project-1" }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getProjectFromServer("project-1")).rejects.toMatchObject({
      code: "invalid-response",
      status: 200,
    } satisfies Partial<ProjectServerError>);
  });

  it("maps an invalid 404 body to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "context-unavailable" }), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getProjectFromServer("project-1")).rejects.toMatchObject({
      code: "invalid-response",
      status: 404,
    } satisfies Partial<ProjectServerError>);
  });

  it("maps an unsupported status to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "project-not-found" }), {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getProjectFromServer("project-1")).rejects.toMatchObject({
      code: "invalid-response",
      status: 500,
    } satisfies Partial<ProjectServerError>);
  });
});
