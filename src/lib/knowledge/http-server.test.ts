import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type { KnowledgeEntry } from "./types";

vi.mock("server-only", () => ({}));

const getServerProjectByIdMock = vi.fn();
const getServerKnowledgeEntriesByProjectIdMock = vi.fn();

vi.mock("../project/server", () => ({
  getServerProjectById: getServerProjectByIdMock,
}));

vi.mock("./server", async () => {
  const actual = await vi.importActual<typeof import("./server")>("./server");

  return {
    ...actual,
    getServerKnowledgeEntriesByProjectId:
      getServerKnowledgeEntriesByProjectIdMock,
  };
});

async function loadKnowledgeHttpServerModule() {
  vi.resetModules();
  return import("./http-server");
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

function createJsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/projects/project-123/knowledge", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function createMalformedJsonRequest(): Request {
  return new Request("http://localhost/api/projects/project-123/knowledge", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: "{",
  });
}

function createGetRequest(): Request {
  return new Request("http://localhost/api/projects/project-123/knowledge", {
    method: "GET",
  });
}

function createKnowledgeEntry(
  overrides?: Partial<KnowledgeEntry>,
): KnowledgeEntry {
  return {
    id: "knowledge-1",
    projectId: "project-123",
    title: "Architecture note",
    content: "Server-readable context.",
    createdAt: "2026-07-24T10:00:00.000Z",
    ...overrides,
  };
}

beforeEach(() => {
  getServerProjectByIdMock.mockReset();
  getServerKnowledgeEntriesByProjectIdMock.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createGetKnowledgeEntriesRoute", () => {
  it("returns 200 with the full entries list for an existing project", async () => {
    const { createGetKnowledgeEntriesRoute } =
      await loadKnowledgeHttpServerModule();
    const knowledgeEntries = [
      createKnowledgeEntry({
        id: "knowledge-1",
        projectId: "route-project-id",
      }),
      createKnowledgeEntry({
        id: "knowledge-2",
        projectId: "route-project-id",
        title: "Second note",
      }),
    ];
    getServerProjectByIdMock.mockResolvedValueOnce({
      id: "route-project-id",
      name: "Alpha",
      createdAt: "2026-07-24T09:00:00.000Z",
    });
    getServerKnowledgeEntriesByProjectIdMock.mockResolvedValueOnce(
      knowledgeEntries,
    );
    const handler = createGetKnowledgeEntriesRoute({
      getServerProjectById: getServerProjectByIdMock,
      getServerKnowledgeEntriesByProjectId:
        getServerKnowledgeEntriesByProjectIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("route-project-id"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("route-project-id");
    expect(getServerKnowledgeEntriesByProjectIdMock).toHaveBeenCalledTimes(1);
    expect(getServerKnowledgeEntriesByProjectIdMock).toHaveBeenCalledWith(
      "route-project-id",
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(knowledgeEntries);
  });

  it("returns 200 with an empty array for an existing project without knowledge entries", async () => {
    const { createGetKnowledgeEntriesRoute } =
      await loadKnowledgeHttpServerModule();
    getServerProjectByIdMock.mockResolvedValueOnce({
      id: "project-123",
      name: "Alpha",
      createdAt: "2026-07-24T09:00:00.000Z",
    });
    getServerKnowledgeEntriesByProjectIdMock.mockResolvedValueOnce([]);
    const handler = createGetKnowledgeEntriesRoute({
      getServerProjectById: getServerProjectByIdMock,
      getServerKnowledgeEntriesByProjectId:
        getServerKnowledgeEntriesByProjectIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("project-123"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([]);
  });

  it("returns 404 for a missing project without calling the knowledge reader", async () => {
    const { createGetKnowledgeEntriesRoute } =
      await loadKnowledgeHttpServerModule();
    getServerProjectByIdMock.mockResolvedValueOnce(null);
    const handler = createGetKnowledgeEntriesRoute({
      getServerProjectById: getServerProjectByIdMock,
      getServerKnowledgeEntriesByProjectId:
        getServerKnowledgeEntriesByProjectIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("missing-project"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("missing-project");
    expect(getServerKnowledgeEntriesByProjectIdMock).not.toHaveBeenCalled();
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
  });

  it("returns 503 when the project repository throws without calling the knowledge reader", async () => {
    const { createGetKnowledgeEntriesRoute } =
      await loadKnowledgeHttpServerModule();
    getServerProjectByIdMock.mockRejectedValueOnce(
      new Error("project repository failure"),
    );
    const handler = createGetKnowledgeEntriesRoute({
      getServerProjectById: getServerProjectByIdMock,
      getServerKnowledgeEntriesByProjectId:
        getServerKnowledgeEntriesByProjectIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("project-123"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerKnowledgeEntriesByProjectIdMock).not.toHaveBeenCalled();
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });

  it("returns 503 when the knowledge repository throws for an existing project", async () => {
    const { createGetKnowledgeEntriesRoute } =
      await loadKnowledgeHttpServerModule();
    getServerProjectByIdMock.mockResolvedValueOnce({
      id: "project-123",
      name: "Alpha",
      createdAt: "2026-07-24T09:00:00.000Z",
    });
    getServerKnowledgeEntriesByProjectIdMock.mockRejectedValueOnce(
      new Error("knowledge repository failure"),
    );
    const handler = createGetKnowledgeEntriesRoute({
      getServerProjectById: getServerProjectByIdMock,
      getServerKnowledgeEntriesByProjectId:
        getServerKnowledgeEntriesByProjectIdMock,
    });

    const response = await handler(
      createGetRequest(),
      createContext("project-123"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerKnowledgeEntriesByProjectIdMock).toHaveBeenCalledTimes(1);
    expect(getServerKnowledgeEntriesByProjectIdMock).toHaveBeenCalledWith(
      "project-123",
    );
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });

  it("reads the project id from route params instead of parsing the URL", async () => {
    const { createGetKnowledgeEntriesRoute } =
      await loadKnowledgeHttpServerModule();
    const knowledgeEntries = [
      createKnowledgeEntry({
        projectId: "params-project-id",
      }),
    ];
    getServerProjectByIdMock.mockResolvedValueOnce({
      id: "params-project-id",
      name: "Alpha",
      createdAt: "2026-07-24T09:00:00.000Z",
    });
    getServerKnowledgeEntriesByProjectIdMock.mockResolvedValueOnce(
      knowledgeEntries,
    );
    const handler = createGetKnowledgeEntriesRoute({
      getServerProjectById: getServerProjectByIdMock,
      getServerKnowledgeEntriesByProjectId:
        getServerKnowledgeEntriesByProjectIdMock,
    });

    const response = await handler(
      new Request("http://localhost/api/projects/url-project-id/knowledge", {
        method: "GET",
      }),
      createContext("params-project-id"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("params-project-id");
    expect(getServerKnowledgeEntriesByProjectIdMock).toHaveBeenCalledTimes(1);
    expect(getServerKnowledgeEntriesByProjectIdMock).toHaveBeenCalledWith(
      "params-project-id",
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(knowledgeEntries);
  });
});

describe("createPostKnowledgeRoute", () => {
  it("creates a knowledge entry once from route params, trims title and content, and returns 201 with the full entry", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createdEntry: KnowledgeEntry = {
      id: "knowledge-1",
      projectId: "route-project-id",
      title: "Architecture note",
      content: "Server-readable context.",
      createdAt: "2026-07-23T10:00:00.000Z",
    };
    const createServerKnowledgeEntry = vi
      .fn<(_: {
        projectId: string;
        title: string;
        content: string;
      }) => Promise<KnowledgeEntry>>()
      .mockResolvedValue(createdEntry);
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        projectId: "ignored-project-id",
        title: "  Architecture note  ",
        content: "  Server-readable context.  ",
      }),
      createContext("route-project-id"),
    );

    expect(createServerKnowledgeEntry).toHaveBeenCalledTimes(1);
    expect(createServerKnowledgeEntry).toHaveBeenCalledWith({
      projectId: "route-project-id",
      title: "Architecture note",
      content: "Server-readable context.",
    });
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual(createdEntry);
  });

  it("returns 400 for malformed JSON without calling create", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn();
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createMalformedJsonRequest(),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerKnowledgeEntry).not.toHaveBeenCalled();
  });

  it("returns 400 for missing title without calling create", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn();
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        content: "Server-readable context.",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerKnowledgeEntry).not.toHaveBeenCalled();
  });

  it("returns 400 for a non-string title without calling create", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn();
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        title: 42,
        content: "Server-readable context.",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerKnowledgeEntry).not.toHaveBeenCalled();
  });

  it("returns 400 for an empty trimmed title without calling create", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn();
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        title: "   ",
        content: "Server-readable context.",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerKnowledgeEntry).not.toHaveBeenCalled();
  });

  it("returns 400 for missing content without calling create", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn();
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        title: "Architecture note",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerKnowledgeEntry).not.toHaveBeenCalled();
  });

  it("returns 400 for a non-string content without calling create", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn();
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        title: "Architecture note",
        content: 42,
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerKnowledgeEntry).not.toHaveBeenCalled();
  });

  it("returns 400 for an empty trimmed content without calling create", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn();
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        title: "Architecture note",
        content: "   ",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerKnowledgeEntry).not.toHaveBeenCalled();
  });

  it("returns 404 for foreign key violations without depending on error message text", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn().mockRejectedValue({
      code: "23503",
      constraint: "knowledge_entries_project_id_fkey",
      message: "ignored",
    });
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        title: "Architecture note",
        content: "Server-readable context.",
      }),
      createContext("missing-project"),
    );

    expect(createServerKnowledgeEntry).toHaveBeenCalledTimes(1);
    expect(createServerKnowledgeEntry).toHaveBeenCalledWith({
      projectId: "missing-project",
      title: "Architecture note",
      content: "Server-readable context.",
    });
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
  });

  it("returns 503 for non-foreign-key exceptions", async () => {
    const { createPostKnowledgeRoute } =
      await loadKnowledgeHttpServerModule();
    const createServerKnowledgeEntry = vi.fn().mockRejectedValue({
      code: "42601",
      message: "syntax error",
    });
    const handler = createPostKnowledgeRoute({
      createServerKnowledgeEntry,
    });

    const response = await handler(
      createJsonRequest({
        title: "Architecture note",
        content: "Server-readable context.",
      }),
      createContext("project-123"),
    );

    expect(createServerKnowledgeEntry).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });
});
