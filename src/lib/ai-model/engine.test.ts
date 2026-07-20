import { describe, expect, test, vi } from "vitest";

import type { AiProjectContext } from "../project-brain/types";

import { createGenerateAiProjectResponse } from "./engine";

describe("AI model boundary", () => {
  const projectContext: AiProjectContext = {
    projectId: "project-1",
    projectName: "Alpha",
    tasks: [{ id: "task-1", title: "First task" }],
    knowledgeEntries: [
      {
        id: "knowledge-1",
        title: "Note",
        content: "Body",
      },
    ],
  };

  test("returns generated text when context is available and provider generates content", async () => {
    const getProjectContext = vi.fn(() => ({
      status: "available" as const,
      context: projectContext,
    }));
    const provider = {
      generate: vi.fn(async () => ({
        status: "generated" as const,
        content: "Generated response",
      })),
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext,
    });

    const result = await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "Summarize project",
    });

    expect(result).toEqual({
      status: "generated",
      content: "Generated response",
    });
  });

  test.each(["", "   "])(
    "returns invalid-instruction for an empty instruction value %j",
    async (instruction) => {
      const getProjectContext = vi.fn();
      const provider = {
        generate: vi.fn(),
      };
      const generateAiProjectResponse = createGenerateAiProjectResponse({
        provider,
        getProjectContext,
      });

      const result = await generateAiProjectResponse({
        projectId: "project-1",
        instruction,
      });

      expect(result).toEqual({
        status: "invalid-instruction",
      });
      expect(getProjectContext).not.toHaveBeenCalled();
      expect(provider.generate).not.toHaveBeenCalled();
    },
  );

  test("maps project-not-found without calling the provider", async () => {
    const getProjectContext = vi.fn(() => ({
      status: "project-not-found" as const,
      projectId: "project-1",
    }));
    const provider = {
      generate: vi.fn(),
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext,
    });

    const result = await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "Summarize project",
    });

    expect(result).toEqual({
      status: "project-not-found",
    });
    expect(provider.generate).not.toHaveBeenCalled();
  });

  test("maps unavailable context without calling the provider", async () => {
    const getProjectContext = vi.fn(() => ({
      status: "unavailable" as const,
      projectId: "project-1",
    }));
    const provider = {
      generate: vi.fn(),
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext,
    });

    const result = await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "Summarize project",
    });

    expect(result).toEqual({
      status: "context-unavailable",
    });
    expect(provider.generate).not.toHaveBeenCalled();
  });

  test("maps unavailable provider to provider-unavailable", async () => {
    const provider = {
      generate: vi.fn(async () => ({
        status: "unavailable" as const,
      })),
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext: () => ({
        status: "available",
        context: projectContext,
      }),
    });

    const result = await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "Summarize project",
    });

    expect(result).toEqual({
      status: "provider-unavailable",
    });
  });

  test("maps provider failed to generation-failed", async () => {
    const provider = {
      generate: vi.fn(async () => ({
        status: "failed" as const,
      })),
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext: () => ({
        status: "available",
        context: projectContext,
      }),
    });

    const result = await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "Summarize project",
    });

    expect(result).toEqual({
      status: "generation-failed",
    });
  });

  test("maps a provider exception to generation-failed without leaking it", async () => {
    const provider = {
      generate: vi.fn(async () => {
        throw new Error("provider exploded");
      }),
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext: () => ({
        status: "available",
        context: projectContext,
      }),
    });

    const result = await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "Summarize project",
    });

    expect(result).toEqual({
      status: "generation-failed",
    });
  });

  test("passes only the trimmed instruction and exact AI project context to the provider", async () => {
    const generate = vi.fn(
      async (request: {
        instruction: string;
        projectContext: AiProjectContext;
      }) => ({
        content: request.instruction === "Summarize project"
          ? "Generated response"
          : "Unexpected response",
        status: "generated" as const,
      }),
    );
    const provider = {
      generate,
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext: () => ({
        status: "available",
        context: projectContext,
      }),
    });

    await generateAiProjectResponse({
      projectId: "project-1",
      instruction: "  Summarize project  ",
    });

    expect(generate).toHaveBeenCalledTimes(1);
    expect(generate).toHaveBeenCalledWith({
      instruction: "Summarize project",
      projectContext,
    });
    const providerRequest = generate.mock.calls[0]?.[0];

    if (!providerRequest) {
      throw new Error("Expected provider call arguments");
    }

    expect(providerRequest.projectContext).toBe(projectContext);
    expect(Object.keys(providerRequest).sort()).toEqual([
      "instruction",
      "projectContext",
    ]);
  });

  test("reads project context once with the unchanged projectId", async () => {
    const getProjectContext = vi.fn(() => ({
      status: "available" as const,
      context: projectContext,
    }));
    const provider = {
      generate: vi.fn(async () => ({
        status: "generated" as const,
        content: "Generated response",
      })),
    };
    const generateAiProjectResponse = createGenerateAiProjectResponse({
      provider,
      getProjectContext,
    });

    await generateAiProjectResponse({
      projectId: "  project-1  ",
      instruction: "Summarize project",
    });

    expect(getProjectContext).toHaveBeenCalledTimes(1);
    expect(getProjectContext).toHaveBeenCalledWith("  project-1  ");
  });
});
