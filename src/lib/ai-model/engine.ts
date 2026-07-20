import { getAiProjectContext } from "../project-brain/engine";
import type {
  AiProjectContext,
  AiProjectContextResult,
} from "../project-brain/types";

import type {
  GenerateAiProjectResponseInput,
  GenerateAiProjectResponseResult,
} from "./types";

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

interface AiModelProvider {
  generate(
    request: ModelGenerationRequest,
  ): Promise<ModelGenerationResult>;
}

type GetAiProjectContext = (
  projectId: string,
) => AiProjectContextResult;

export function createGenerateAiProjectResponse(deps: {
  provider: AiModelProvider;
  getProjectContext?: GetAiProjectContext;
}): (
  input: GenerateAiProjectResponseInput,
) => Promise<GenerateAiProjectResponseResult> {
  const getProjectContext = deps.getProjectContext ?? getAiProjectContext;

  return async function generateAiProjectResponse(
    input: GenerateAiProjectResponseInput,
  ): Promise<GenerateAiProjectResponseResult> {
    const trimmedInstruction = input.instruction.trim();

    if (!trimmedInstruction) {
      return {
        status: "invalid-instruction",
      };
    }

    const projectContextResult = getProjectContext(input.projectId);

    if (projectContextResult.status === "project-not-found") {
      return {
        status: "project-not-found",
      };
    }

    if (projectContextResult.status === "unavailable") {
      return {
        status: "context-unavailable",
      };
    }

    try {
      const providerResult = await deps.provider.generate({
        instruction: trimmedInstruction,
        projectContext: projectContextResult.context,
      });

      if (providerResult.status === "generated") {
        return {
          status: "generated",
          content: providerResult.content,
        };
      }

      if (providerResult.status === "unavailable") {
        return {
          status: "provider-unavailable",
        };
      }

      return {
        status: "generation-failed",
      };
    } catch {
      return {
        status: "generation-failed",
      };
    }
  };
}
