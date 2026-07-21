import type { AiProjectContext } from "../project-brain/types";

type ModelGenerationRequest = {
  instruction: string;
  projectContext: AiProjectContext;
};

type ModelGenerationResult =
  | {
      status: "generated";
      content: string;
    }
  | {
      status: "unavailable";
    }
  | {
      status: "failed";
    };

type OpenAiResponsesClient = {
  responses: {
    create(request: {
      model: string;
      input: string;
    }): Promise<{
      output_text?: string | null;
    }>;
  };
};

type CreateOpenAiProviderOptions = {
  client: OpenAiResponsesClient;
  model?: "gpt-5-nano";
};

const DEFAULT_OPENAI_MODEL = "gpt-5-nano";

function buildOpenAiInput(
  request: ModelGenerationRequest,
): string {
  const taskLines = request.projectContext.tasks.map((task) =>
    `- ${task.id}: ${task.title}`
  );
  const knowledgeLines = request.projectContext.knowledgeEntries.map((entry) =>
    `- ${entry.id}: ${entry.title}\n${entry.content}`
  );

  return [
    "Instruction:",
    request.instruction,
    "",
    "Project Context:",
    `Project ID: ${request.projectContext.projectId}`,
    `Project Name: ${request.projectContext.projectName}`,
    "",
    "Tasks:",
    ...(taskLines.length > 0 ? taskLines : ["- none"]),
    "",
    "Knowledge Entries:",
    ...(knowledgeLines.length > 0 ? knowledgeLines : ["- none"]),
  ].join("\n");
}

export function createOpenAiProvider(
  options: CreateOpenAiProviderOptions,
): {
  generate(
    request: ModelGenerationRequest,
  ): Promise<ModelGenerationResult>;
} {
  const model = options.model ?? DEFAULT_OPENAI_MODEL;

  return {
    async generate(
      request: ModelGenerationRequest,
    ): Promise<ModelGenerationResult> {
      try {
        const response = await options.client.responses.create({
          model,
          input: buildOpenAiInput(request),
        });

        const outputText = response.output_text?.trim();

        if (!outputText) {
          return {
            status: "failed",
          };
        }

        return {
          status: "generated",
          content: outputText,
        };
      } catch {
        return {
          status: "failed",
        };
      }
    },
  };
}
