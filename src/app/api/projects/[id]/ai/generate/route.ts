import { createProductionGenerateAiProjectResponse } from "@/lib/ai-model/server";
import type { GenerateAiProjectResponseResult } from "@/lib/ai-model/types";
import {
  buildAiWorkspaceMetadataContextSummary,
  getServerAiWorkspaceMetadataContext,
} from "@/lib/project-brain/metadata";
import { getServerAiProjectContext } from "@/lib/project-brain/server";
import type { AiProjectContext } from "@/lib/project-brain/types";

type TransportRequestBody = {
  instruction: string;
  projectContext?: AiProjectContext;
};

type TransportErrorResponse =
  | {
      status: "invalid-request";
    }
  | {
      status: "internal-error";
    };

function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function isAiProjectContext(value: unknown): value is AiProjectContext {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    typeof value.projectId === "string" &&
    typeof value.projectName === "string" &&
    Array.isArray(value.tasks) &&
    Array.isArray(value.knowledgeEntries)
  );
}

async function readTransportRequestBody(
  request: Request,
): Promise<
  | {
      ok: true;
      body: TransportRequestBody;
    }
  | {
      ok: false;
    }
> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return {
      ok: false,
    };
  }

  if (!isPlainObject(body) || typeof body.instruction !== "string") {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    body: {
      instruction: body.instruction,
      ...(isAiProjectContext(body.projectContext)
        ? { projectContext: body.projectContext }
        : {}),
    },
  };
}

function createTransportErrorResponse(
  status: TransportErrorResponse["status"],
  httpStatus: number,
): Response {
  return Response.json(
    {
      status,
    } satisfies TransportErrorResponse,
    {
      status: httpStatus,
    },
  );
}

function mapGenerateResultToHttpStatus(
  result: GenerateAiProjectResponseResult,
): number {
  switch (result.status) {
    case "generated":
      return 200;
    case "invalid-instruction":
      return 400;
    case "project-not-found":
      return 404;
    case "context-unavailable":
    case "provider-unavailable":
      return 503;
    case "generation-failed":
      return 502;
  }
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/ai/generate">,
): Promise<Response> {
  const transportBody = await readTransportRequestBody(request);

  if (!transportBody.ok) {
    return createTransportErrorResponse("invalid-request", 400);
  }

  const { id } = await context.params;
  const projectContext = transportBody.body.projectContext;
  const metadataContext = await getServerAiWorkspaceMetadataContext(id);
  const metadataContextSummary =
    buildAiWorkspaceMetadataContextSummary(metadataContext);
  const generateAiProjectResponse =
    createProductionGenerateAiProjectResponse({
      env: process.env,
      getProjectContext: async (projectId) => {
        if (projectContext?.projectId === projectId) {
          return {
            status: "available",
            context: projectContext,
          };
        }

        const projectContextResult = await getServerAiProjectContext(projectId);

        if (projectContextResult.status === "available") {
          return projectContextResult;
        }

        return {
          ...projectContextResult,
          projectId,
        };
      },
    });

  try {
    const result = await generateAiProjectResponse({
      projectId: id,
      instruction: [
        metadataContextSummary,
        transportBody.body.instruction,
      ].join("\n\n"),
    });

    return Response.json(result, {
      status: mapGenerateResultToHttpStatus(result),
    });
  } catch {
    return createTransportErrorResponse("internal-error", 500);
  }
}
