import { describe, expect, test, vi } from "vitest";

import type { AiProjectContext } from "../project-brain/types";

import { createOpenAiProvider } from "./openai-provider";

describe("createOpenAiProvider", () => {
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

  test("returns generated content from non-empty output_text", async () => {
    const create = vi.fn(async () => ({
      output_text: "Generated response",
    }));
    const provider = createOpenAiProvider({
      client: {
        responses: {
          create,
        },
      },
    });

    const result = await provider.generate({
      instruction: "Summarize project",
      projectContext,
    });

    expect(result).toEqual({
      status: "generated",
      content: "Generated response",
    });
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      model: "gpt-5-nano",
      input: expect.stringContaining("Summarize project"),
    });
    expect(create.mock.calls[0]?.[0]?.input).toContain("Project ID: project-1");
  });

  test.each([
    { output_text: "" },
    { output_text: "   " },
    {},
  ])("returns failed for empty or missing output_text: %j", async (response) => {
    const provider = createOpenAiProvider({
      client: {
        responses: {
          create: vi.fn(async () => response),
        },
      },
    });

    const result = await provider.generate({
      instruction: "Summarize project",
      projectContext,
    });

    expect(result).toEqual({
      status: "failed",
    });
  });

  test("returns failed when the client throws", async () => {
    const provider = createOpenAiProvider({
      client: {
        responses: {
          create: vi.fn(async () => {
            throw new Error("OpenAI request failed");
          }),
        },
      },
    });

    await expect(provider.generate({
      instruction: "Summarize project",
      projectContext,
    })).resolves.toEqual({
      status: "failed",
    });
  });
});
