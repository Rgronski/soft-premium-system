import OpenAI from "openai";
import type { Response as OpenAiResponse } from "openai/resources/responses/responses";
import { describe, expect, test, vi } from "vitest";

import type { AiProjectContext } from "../project-brain/types";

import { createOpenAiProvider } from "./openai-provider";

function createMockOpenAiResponse(
  outputText: string,
): OpenAiResponse {
  return {
    id: "resp_test_123",
    created_at: 0,
    output_text: outputText,
    error: null,
    incomplete_details: null,
    instructions: null,
    metadata: null,
    model: "gpt-5-nano",
    object: "response",
    output: [],
    parallel_tool_calls: false,
    temperature: 1,
    tool_choice: "auto",
    tools: [],
    top_p: 1,
  };
}

function createTestOpenAiClient(): OpenAI {
  return new OpenAI({
    apiKey: "test-openai-key",
    maxRetries: 0,
  });
}

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
    const client = createTestOpenAiClient();
    const create = vi
      .spyOn(client.responses, "create")
      .mockResolvedValue(createMockOpenAiResponse("Generated response"));
    const provider = createOpenAiProvider({
      client,
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
    createMockOpenAiResponse(""),
    createMockOpenAiResponse("   "),
    (() => {
      const response = createMockOpenAiResponse("");
      Object.defineProperty(response, "output_text", {
        value: undefined,
      });
      return response;
    })(),
  ])("returns failed for empty or missing output_text: %j", async (response) => {
    const client = createTestOpenAiClient();
    vi.spyOn(client.responses, "create").mockResolvedValue(response);
    const provider = createOpenAiProvider({
      client,
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
    const client = createTestOpenAiClient();
    vi.spyOn(client.responses, "create").mockRejectedValue(
      new Error("OpenAI request failed"),
    );
    const provider = createOpenAiProvider({
      client,
    });

    await expect(provider.generate({
      instruction: "Summarize project",
      projectContext,
    })).resolves.toEqual({
      status: "failed",
    });
  });
});
