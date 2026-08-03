import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type { Project } from "./types";

vi.mock("server-only", () => ({}));

const getServerProjectByIdMock = vi.fn();
const createServerProjectMock = vi.fn();

vi.mock("./server", () => ({
  getServerProjectById: getServerProjectByIdMock,
  createServerProject: createServerProjectMock,
}));

async function loadProjectHttpServerModule() {
  vi.resetModules();
  return import("./http-server");
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

function createGetRequest(): Request {
  return new Request("http://localhost/api/projects/project-123", {
    method: "GET",
  });
}

function createPostRequest(body: unknown): Request {
  return new Request("http://localhost/api/projects/project-123", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function createProject(overrides?: Partial<Project>): Project {
  return {
    id: "project-123",
    name: "Alpha",
    createdAt: "2026-07-24T10:00:00.000Z",
    ...overrides,
  };
}

beforeEach(() => {
  getServerProjectByIdMock.mockReset();
  createServerProjectMock.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createGetProjectRoute", () => {
  it("returns 200 with the full project for an existing route project id", async () => {
    const { createGetProjectRoute } = await loadProjectHttpServerModule();
    const project = createProject({
      id: "route-project-id",
      name: "Route Project",
    });
    getServerProjectByIdMock.mockResolvedValueOnce(project);
    const handler = createGetProjectRoute({
      getServerProjectById: getServerProjectByIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("route-project-id"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("route-project-id");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(project);
  });

  it("returns 404 when the repository returns null", async () => {
    const { createGetProjectRoute } = await loadProjectHttpServerModule();
    getServerProjectByIdMock.mockResolvedValueOnce(null);
    const handler = createGetProjectRoute({
      getServerProjectById: getServerProjectByIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("missing-project"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("missing-project");
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
  });

  it("returns 503 when the repository throws", async () => {
    const { createGetProjectRoute } = await loadProjectHttpServerModule();
    getServerProjectByIdMock.mockRejectedValueOnce(
      new Error("repository failure"),
    );
    const handler = createGetProjectRoute({
      getServerProjectById: getServerProjectByIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("project-123"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("project-123");
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });

  it("reads the project id from route params instead of parsing the URL", async () => {
    const { createGetProjectRoute } = await loadProjectHttpServerModule();
    const project = createProject({
      id: "params-project-id",
    });
    getServerProjectByIdMock.mockResolvedValueOnce(project);
    const handler = createGetProjectRoute({
      getServerProjectById: getServerProjectByIdMock,
    });

    const response = await handler(
      new Request("http://localhost/api/projects/url-project-id", {
        method: "GET",
      }),
      createContext("params-project-id"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("params-project-id");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(project);
  });
});

describe("createPostProjectRoute", () => {
  it("returns 201 with the created project for a valid request", async () => {
    const { createPostProjectRoute } = await loadProjectHttpServerModule();
    const project = createProject({
      id: "route-project-id",
      name: "Route Project",
    });
    createServerProjectMock.mockResolvedValueOnce(project);
    const handler = createPostProjectRoute({
      createServerProject: createServerProjectMock,
    });

    const response = await handler(
      createPostRequest({
        name: "Route Project",
      }),
      createContext("route-project-id"),
    );

    expect(createServerProjectMock).toHaveBeenCalledTimes(1);
    expect(createServerProjectMock).toHaveBeenCalledWith({
      id: "route-project-id",
      name: "Route Project",
    });
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual(project);
  });

  it("returns 400 for malformed JSON without calling the repository", async () => {
    const { createPostProjectRoute } = await loadProjectHttpServerModule();
    const handler = createPostProjectRoute({
      createServerProject: createServerProjectMock,
    });

    const response = await handler(
      new Request("http://localhost/api/projects/project-123", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: "{",
      }),
      createContext("project-123"),
    );

    expect(createServerProjectMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
  });

  it("returns 503 when the repository throws", async () => {
    const { createPostProjectRoute } = await loadProjectHttpServerModule();
    createServerProjectMock.mockRejectedValueOnce(
      new Error("repository failure"),
    );
    const handler = createPostProjectRoute({
      createServerProject: createServerProjectMock,
    });

    const response = await handler(
      createPostRequest({
        name: "Route Project",
      }),
      createContext("project-123"),
    );

    expect(createServerProjectMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });
});
