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

const getServerProjectByIdMock = vi.fn();
const getServerAiProjectContextMock = vi.fn();

vi.mock("../project/server", () => ({
  getServerProjectById: getServerProjectByIdMock,
}));

vi.mock("../project-brain/server", () => ({
  getServerAiProjectContext: getServerAiProjectContextMock,
}));

async function loadServerModule() {
  vi.resetModules();
  return import("./server");
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

function createAvailableContext(options?: {
  projectId?: string;
  projectName?: string;
  tasks?: Array<{ id: string; title: string }>;
  knowledgeEntries?: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}) {
  return {
    status: "available" as const,
    context: {
      projectId: options?.projectId ?? "project-123",
      projectName: options?.projectName ?? "Alpha",
      tasks: options?.tasks ?? [],
      knowledgeEntries: options?.knowledgeEntries ?? [],
    },
  };
}

const originalOpenAiApiKey = process.env.OPENAI_API_KEY;

beforeEach(() => {
  delete process.env.OPENAI_API_KEY;
  getServerProjectByIdMock.mockReset();
  getServerProjectByIdMock.mockResolvedValue({
    id: "project-123",
    name: "Alpha",
    createdAt: "2026-07-13T10:00:00.000Z",
  });
  getServerAiProjectContextMock.mockReset();
  getServerAiProjectContextMock.mockResolvedValue(
    createAvailableContext(),
  );
});

afterEach(() => {
  if (typeof originalOpenAiApiKey === "string") {
    process.env.OPENAI_API_KEY = originalOpenAiApiKey;
  } else {
    delete process.env.OPENAI_API_KEY;
  }

  vi.restoreAllMocks();
});

describe("createPostGenerateAiProjectRoute", () => {
  it("returns 400 for malformed JSON without delegation", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).not.toHaveBeenCalled();
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("returns 400 for non-object body without delegation", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).not.toHaveBeenCalled();
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("returns 400 for missing instruction without delegation", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).not.toHaveBeenCalled();
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("returns 400 for non-string instruction without delegation", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).not.toHaveBeenCalled();
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
  });

  it("reads the existing Project guard once and delegates with route param projectId and untrimmed instruction", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
    const generateAiProjectResponse = vi
      .fn<
        (_: {
          projectId: string;
          instruction: string;
        }) => Promise<GenerateAiProjectResponseResult>
      >()
      .mockResolvedValue({
        status: "generated",
        content: "ok",
      });
    getServerProjectByIdMock.mockResolvedValueOnce({
      id: "route-project-id",
      name: "Alpha",
      createdAt: "2026-07-13T10:00:00.000Z",
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("route-project-id");
    expect(generateAiProjectResponse).toHaveBeenCalledTimes(1);
    expect(generateAiProjectResponse).toHaveBeenCalledWith({
      projectId: "route-project-id",
      instruction: "  keep spacing  ",
    });
  });

  it("returns project-not-found when the existing Project guard returns null without delegating to AI generation", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
    const generateAiProjectResponse = vi.fn();
    getServerProjectByIdMock.mockResolvedValueOnce(null);
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("missing-project"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("missing-project");
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
  });

  it("returns context-unavailable when the existing Project guard throws without delegating to AI generation", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
    const generateAiProjectResponse = vi.fn();
    getServerProjectByIdMock.mockRejectedValueOnce(
      new Error("repository failure"),
    );
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-123"),
    );

    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("project-123");
    expect(generateAiProjectResponse).not.toHaveBeenCalled();
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });

  it("delegates whitespace-only instruction and maps invalid-instruction to 400", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
    const generateAiProjectResponse = vi
      .fn<
        (_: {
          projectId: string;
          instruction: string;
        }) => Promise<GenerateAiProjectResponseResult>
      >()
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-instruction",
    });
  });

  it("maps generated to 200 and preserves JSON result", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
    const generateAiProjectResponse = vi
      .fn<
        (_: {
          projectId: string;
          instruction: string;
        }) => Promise<GenerateAiProjectResponseResult>
      >()
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({
      status: "generated",
      content: "generated content",
    });
  });

  it("maps project-not-found to 404", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
  });

  it("maps context-unavailable to 503", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });

  it("maps provider-unavailable to 503", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({
      status: "provider-unavailable",
    });
  });

  it("maps generation-failed to 502", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({
      status: "generation-failed",
    });
  });

  it("returns 500 without leaking the thrown error", async () => {
    const { createPostGenerateAiProjectRoute } = await loadServerModule();
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
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({
      status: "internal-error",
    });
  });
});

describe("createProductionGenerateAiProjectResponse", () => {
  it("passes canonical server Project Brain context to provider flow", async () => {
    const { createProductionGenerateAiProjectResponse } =
      await loadServerModule();
    getServerAiProjectContextMock.mockResolvedValueOnce(
      createAvailableContext({
        projectId: "project-123",
        tasks: [{ id: "task-1", title: "First task" }],
        knowledgeEntries: [
          { id: "knowledge-1", title: "Note", content: "Body" },
        ],
      }),
    );
    const providerGenerate = vi.fn().mockResolvedValue({
      status: "generated" as const,
      content: "Generated response",
    });
    const createProvider = vi.fn(() => ({
      generate: providerGenerate,
    }));
    const generateAiProjectResponse =
      createProductionGenerateAiProjectResponse({
        env: {
          OPENAI_API_KEY: "test-openai-key",
        } as NodeJS.ProcessEnv,
        createClient: () => ({
          responses: {
            create: vi.fn(),
          },
        }),
        createProvider,
      });

    const result = await generateAiProjectResponse({
      projectId: "project-123",
      instruction: "Summarize project",
    });

    expect(getServerAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(getServerAiProjectContextMock).toHaveBeenCalledWith("project-123");
    expect(providerGenerate).toHaveBeenCalledTimes(1);
    expect(providerGenerate).toHaveBeenCalledWith({
      instruction: "Summarize project",
      projectContext: {
        projectId: "project-123",
        projectName: "Alpha",
        tasks: [{ id: "task-1", title: "First task" }],
        knowledgeEntries: [
          { id: "knowledge-1", title: "Note", content: "Body" },
        ],
      },
    });
    expect(result).toEqual({
      status: "generated",
      content: "Generated response",
    });
  });

  it("accepts empty canonical tasks and knowledge as a valid available context", async () => {
    const { createProductionGenerateAiProjectResponse } =
      await loadServerModule();
    const providerGenerate = vi.fn().mockResolvedValue({
      status: "generated" as const,
      content: "Generated response",
    });
    const generateAiProjectResponse =
      createProductionGenerateAiProjectResponse({
        env: {
          OPENAI_API_KEY: "test-openai-key",
        } as NodeJS.ProcessEnv,
        createClient: () => ({
          responses: {
            create: vi.fn(),
          },
        }),
        createProvider: () => ({
          generate: providerGenerate,
        }),
      });

    const result = await generateAiProjectResponse({
      projectId: "project-123",
      instruction: "Summarize project",
    });

    expect(getServerAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(providerGenerate).toHaveBeenCalledTimes(1);
    expect(providerGenerate).toHaveBeenCalledWith({
      instruction: "Summarize project",
      projectContext: {
        projectId: "project-123",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    expect(result).toEqual({
      status: "generated",
      content: "Generated response",
    });
  });

  it("returns project-not-found and does not invoke the provider when canonical server Project Brain reports a missing project", async () => {
    const { createProductionGenerateAiProjectResponse } =
      await loadServerModule();
    getServerAiProjectContextMock.mockResolvedValueOnce({
      status: "project-not-found",
    });
    const providerGenerate = vi.fn();
    const generateAiProjectResponse =
      createProductionGenerateAiProjectResponse({
        env: {
          OPENAI_API_KEY: "test-openai-key",
        } as NodeJS.ProcessEnv,
        createClient: () => ({
          responses: {
            create: vi.fn(),
          },
        }),
        createProvider: () => ({
          generate: providerGenerate,
        }),
      });

    const result = await generateAiProjectResponse({
      projectId: "project-123",
      instruction: "Summarize project",
    });

    expect(getServerAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(providerGenerate).not.toHaveBeenCalled();
    expect(result).toEqual({
      status: "project-not-found",
    });
  });

  it("returns context-unavailable and does not invoke the provider when canonical server Project Brain is unavailable", async () => {
    const { createProductionGenerateAiProjectResponse } =
      await loadServerModule();
    getServerAiProjectContextMock.mockResolvedValueOnce({
      status: "unavailable",
    });
    const providerGenerate = vi.fn();
    const generateAiProjectResponse =
      createProductionGenerateAiProjectResponse({
        env: {
          OPENAI_API_KEY: "test-openai-key",
        } as NodeJS.ProcessEnv,
        createClient: () => ({
          responses: {
            create: vi.fn(),
          },
        }),
        createProvider: () => ({
          generate: providerGenerate,
        }),
      });

    const result = await generateAiProjectResponse({
      projectId: "project-123",
      instruction: "Summarize project",
    });

    expect(getServerAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(providerGenerate).not.toHaveBeenCalled();
    expect(result).toEqual({
      status: "context-unavailable",
    });
  });

  it.each([
    undefined,
    "",
    "   ",
  ])(
    "keeps provider-unavailable behavior when OPENAI_API_KEY is %j and canonical context is available",
    async (apiKey) => {
      if (typeof apiKey === "string") {
        process.env.OPENAI_API_KEY = apiKey;
      } else {
        delete process.env.OPENAI_API_KEY;
      }

      const { postGenerateAiProjectRoute } = await loadServerModule();
      getServerProjectByIdMock.mockResolvedValueOnce({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-13T10:00:00.000Z",
      });
      getServerAiProjectContextMock.mockResolvedValueOnce(
        createAvailableContext({
          projectId: "project-1",
        }),
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
      expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
      expect(getServerAiProjectContextMock).toHaveBeenCalledTimes(1);
      expect(getServerAiProjectContextMock).toHaveBeenCalledWith("project-1");
    },
  );

  it("uses the OpenAI provider in production composition when OPENAI_API_KEY is present", async () => {
    const { createProductionGenerateAiProjectResponse } =
      await loadServerModule();
    getServerAiProjectContextMock.mockResolvedValueOnce(
      createAvailableContext({
        projectId: "project-1",
      }),
    );
    const createClient = vi.fn(() => ({
      responses: {
        create: vi.fn(async () => ({
          output_text: "Generated response",
        })),
      },
    }));
    const createProvider = vi.fn(() => ({
      generate: vi.fn(async () => ({
        status: "generated" as const,
        content: "Generated response",
      })),
    }));
    const generateAiProjectResponse =
      createProductionGenerateAiProjectResponse({
        env: {
          OPENAI_API_KEY: "test-openai-key",
        } as NodeJS.ProcessEnv,
        createClient,
        createProvider,
      });

    const result = await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "Summarize project",
    });

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(createClient).toHaveBeenCalledWith("test-openai-key");
    expect(createProvider).toHaveBeenCalledTimes(1);
    expect(createProvider).toHaveBeenCalledWith({
      client: expect.objectContaining({
        responses: expect.any(Object),
      }),
      model: "gpt-5-nano",
    });
    expect(getServerAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(getServerAiProjectContextMock).toHaveBeenCalledWith("project-1");
    expect(result).toEqual({
      status: "generated",
      content: "Generated response",
    });
  });

  it("returns generated response through the existing transport boundary when the production OpenAI composition succeeds", async () => {
    const {
      createPostGenerateAiProjectRoute,
      createProductionGenerateAiProjectResponse,
    } = await loadServerModule();
    getServerProjectByIdMock.mockResolvedValueOnce({
      id: "project-1",
      name: "Alpha",
      createdAt: "2026-07-13T10:00:00.000Z",
    });
    getServerAiProjectContextMock.mockResolvedValueOnce(
      createAvailableContext({
        projectId: "project-1",
      }),
    );
    const generateAiProjectResponse =
      createProductionGenerateAiProjectResponse({
        env: {
          OPENAI_API_KEY: "test-openai-key",
        } as NodeJS.ProcessEnv,
        createClient: () => ({
          responses: {
            create: vi.fn(async () => ({
              output_text: "Generated response",
            })),
          },
        }),
      });
    const handler = createPostGenerateAiProjectRoute({
      generateAiProjectResponse,
    });

    const response = await handler(
      createJsonRequest({
        instruction: "generate",
      }),
      createContext("project-1"),
    );

    expect(response.status).toBe(200);
    expect(getServerProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(getServerAiProjectContextMock).toHaveBeenCalledTimes(1);
    await expect(response.json()).resolves.toEqual({
      status: "generated",
      content: "Generated response",
    });
  });
});
