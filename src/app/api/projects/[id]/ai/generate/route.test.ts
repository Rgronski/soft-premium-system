// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const createProductionGenerateAiProjectResponseMock = vi.fn();
const getServerAiProjectContextMock = vi.fn();

vi.mock("@/lib/ai-model/server", () => ({
  createProductionGenerateAiProjectResponse:
    createProductionGenerateAiProjectResponseMock,
}));

vi.mock("@/lib/project-brain/server", () => ({
  getServerAiProjectContext: getServerAiProjectContextMock,
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

function createJsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/projects/project-123/ai/generate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/projects/[id]/ai/generate", () => {
  beforeEach(() => {
    createProductionGenerateAiProjectResponseMock.mockReset();
    getServerAiProjectContextMock.mockReset();
    getServerAiProjectContextMock.mockResolvedValue({
      status: "project-not-found",
    });
  });

  it("uses the request projectContext for canonical AI Workspace generation", async () => {
    let capturedGetProjectContext:
      | ((projectId: string) => Promise<any>)
      | null = null;

    const generateAiProjectResponse = vi.fn(
      async ({
        projectId,
        instruction,
      }: {
        projectId: string;
        instruction: string;
      }) => {
        if (!capturedGetProjectContext) {
          throw new Error("Missing getProjectContext mock.");
        }

        const projectContextResult = await capturedGetProjectContext(projectId);

        if (projectContextResult.status !== "available") {
          return projectContextResult;
        }

        return {
          status: "generated" as const,
          content: `${projectContextResult.context.projectName}: ${instruction}`,
        };
      },
    );

    createProductionGenerateAiProjectResponseMock.mockImplementation((deps) => {
      capturedGetProjectContext = deps.getProjectContext ?? null;
      return generateAiProjectResponse;
    });

    const { POST } = await loadRouteModule();
    const response = await POST(
      createJsonRequest({
        instruction: "Summarize project",
        projectContext: {
          projectId: "project-123",
          projectName: "Beauty Client PRO",
          tasks: [],
          knowledgeEntries: [],
        },
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(200);
    expect(createProductionGenerateAiProjectResponseMock).toHaveBeenCalledTimes(1);
    expect(getServerAiProjectContextMock).not.toHaveBeenCalled();
    expect(generateAiProjectResponse).toHaveBeenCalledWith({
      projectId: "project-123",
      instruction: "Summarize project",
    });
    await expect(response.json()).resolves.toEqual({
      status: "generated",
      content: "Beauty Client PRO: Summarize project",
    });
  });
});
