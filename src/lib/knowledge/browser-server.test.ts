import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  getKnowledgeEntriesFromServer,
  KnowledgeServerError,
} from "./browser-server";
import type { KnowledgeEntry } from "./types";

const fetchMock = vi.fn();

function createKnowledgeEntry(
  overrides?: Partial<KnowledgeEntry>,
): KnowledgeEntry {
  return {
    id: "knowledge-1",
    projectId: "project-1",
    title: "Architecture note",
    content: "Server-readable context.",
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

describe("getKnowledgeEntriesFromServer", () => {
  it("uses encoded projectId, sends GET, and returns the full entries list", async () => {
    const knowledgeEntries = [
      createKnowledgeEntry({ projectId: "project/1" }),
    ];
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(knowledgeEntries), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    const result = await getKnowledgeEntriesFromServer("project/1");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/projects/project%2F1/knowledge",
      {
        method: "GET",
      },
    );
    expect(result).toEqual(knowledgeEntries);
  });

  it("returns an empty array for a valid empty response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).resolves.toEqual([]);
  });

  it("maps 404 to project-not-found", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "project-not-found" }), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "project-not-found",
      status: 404,
    } satisfies Partial<KnowledgeServerError>);
  });

  it("maps 503 to context-unavailable", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "context-unavailable" }), {
        status: 503,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "context-unavailable",
      status: 503,
    } satisfies Partial<KnowledgeServerError>);
  });

  it("maps a rejected fetch to network-error", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "network-error",
    } satisfies Partial<KnowledgeServerError>);
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

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "invalid-response",
      status: 200,
    } satisfies Partial<KnowledgeServerError>);
  });

  it("maps a non-array 200 body to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "invalid-response",
      status: 200,
    } satisfies Partial<KnowledgeServerError>);
  });

  it("maps an invalid knowledge entry to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([{ id: "knowledge-1" }]), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "invalid-response",
      status: 200,
    } satisfies Partial<KnowledgeServerError>);
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

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "invalid-response",
      status: 404,
    } satisfies Partial<KnowledgeServerError>);
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

    await expect(
      getKnowledgeEntriesFromServer("project-1"),
    ).rejects.toMatchObject({
      code: "invalid-response",
      status: 500,
    } satisfies Partial<KnowledgeServerError>);
  });
});
