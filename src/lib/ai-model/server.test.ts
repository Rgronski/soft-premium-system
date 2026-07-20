import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type { GenerateAiProjectResponseResult } from "./types";

vi.mock("server-only", () => ({}));

async function loadServerModule() {
  return import("./server");
}

class MemoryStorage {
  private store = new Map<string, string>();

  clear() {
    this.store.clear();
  }

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

function createJsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/projects/project-123/ai/generate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function createMalformedJsonRequest(): Request {
  return new Request("http://localhost/api/projects/project-123/ai/generate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: "{",
  });
}

const storage = new MemoryStorage();

beforeEach(() => {
  storage.clear();
  vi.stubGlobal("window", {});
  vi.stubGlobal("localStorage", storage);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("createPostGenerateAiProjectRoute", () => {
  it("returns 400 for malformed JSON without delegation", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const generateAiProjectResponse = vi.fn();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createMalformedJsonRequest(),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("returns 400 for non-object body without delegation", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const generateAiProjectResponse = vi.fn();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest(["instruction"]),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("returns 400 for missing instruction without delegation", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const generateAiProjectResponse = vi.fn();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({}),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("returns 400 for non-string instruction without delegation", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const generateAiProjectResponse = vi.fn();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({ instruction: 42 }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("delegates exactly once with route param projectId and untrimmed instruction", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const generateAiProjectResponse = vi
      .fn<(_: { projectId: string; instruction: string }) => Promise<GenerateAiProjectResponseResult>>()
      .mockResolvedValue({
        status: "generated",
        content: "ok",
      });
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({
        projectId: "ignored-project-id",
        instruction: "  keep spacing  ",
      }),
      createContext("route-project-id"),
    );

    expect(response.status).toBe(200);
    expect(generateAiProjectResponse).toHaveBeenCalledTimes(1);
    expect(generateAiProjectResponse).toHaveBeenCalledWith({
      projectId: "route-project-id",
      instruction: "  keep spacing  ",
    });
  });

  it("delegates whitespace-only instruction and maps invalid-instruction to 400", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const generateAiProjectResponse = vi
      .fn<(_: { projectId: string; instruction: string }) => Promise<GenerateAiProjectResponseResult>>()
      .mockResolvedValue({
        status: "invalid-instruction",
      });
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({
        instruction: "   ",
      }),
      createContext("project-123"),
    );

    expect(generateAiProjectResponse).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-instruction",
    });
  });

  it("maps generated to 200 and preserves JSON result", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const generateAiProjectResponse = vi
      .fn<(_: { projectId: string; instruction: string }) => Promise<GenerateAiProjectResponseResult>>()
      .mockResolvedValue({
        status: "generated",
        content: "generated content",
      });
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "generated",
      content: "generated content",
    });
  });

  it("maps project-not-found to 404", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse: vi.fn().mockResolvedValue({
        status: "project-not-found",
      } satisfies GenerateAiProjectResponseResult),
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("missing-project"),
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
  });

  it("maps context-unavailable to 503", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse: vi.fn().mockResolvedValue({
        status: "context-unavailable",
      } satisfies GenerateAiProjectResponseResult),
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });

  it("maps provider-unavailable to 503", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse: vi.fn().mockResolvedValue({
        status: "provider-unavailable",
      } satisfies GenerateAiProjectResponseResult),
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "provider-unavailable",
    });
  });

  it("maps generation-failed to 502", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse: vi.fn().mockResolvedValue({
        status: "generation-failed",
      } satisfies GenerateAiProjectResponseResult),
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      status: "generation-failed",
    });
  });

  it("returns 500 without leaking the thrown error", async () => {
    const { createPostGenerateAiProjectRoute } =
      await loadServerModule();
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse: vi.fn().mockRejectedValue(
        new Error("secret failure details"),
      ),
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      status: "internal-error",
    });
  });
});

describe("postGenerateAiProjectRoute", () => {
  it("uses the production unavailable provider composition", async () => {
    const { postGenerateAiProjectRoute } =
      await loadServerModule();
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );

    const response = await postGenerateAiProjectRoute(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-1"),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "provider-unavailable",
    });
  });
});
