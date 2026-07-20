import "server-only";

import { createGenerateAiProjectResponse } from "./engine";
import type {
  GenerateAiProjectResponseInput,
  GenerateAiProjectResponseResult,
} from "./types";

type GenerateAiProjectHttpHandler = (
  request: Request,
  context: RouteContext<"/api/projects/[id]/ai/generate">,
) => Promise<Response>;

type TransportErrorResponse =
  | {
      status: "invalid-request";
    }
  | {
      status: "internal-error";
    };

type TransportRequestBody = {
  instruction: string;
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

  if (!isPlainObject(body)) {
    return {
      ok: false,
    };
  }

  if (typeof body.instruction !== "string") {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    body: {
      instruction: body.instruction,
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

const unavailableProvider = {
  async generate(): Promise<{ status: "unavailable" }> {
    return {
      status: "unavailable",
    };
  },
};

const generateAiProjectResponse = createGenerateAiProjectResponse({
  provider: unavailableProvider,
});

export function createPostGenerateAiProjectRoute(deps: {
  generateAiProjectResponse: (
    input: GenerateAiProjectResponseInput,
  ) => Promise<GenerateAiProjectResponseResult>;
}): GenerateAiProjectHttpHandler {
  return async function postGenerateAiProjectRoute(
    request: Request,
    context: RouteContext<"/api/projects/[id]/ai/generate">,
  ): Promise<Response> {
    const transportBody = await readTransportRequestBody(request);

    if (!transportBody.ok) {
      return createTransportErrorResponse("invalid-request", 400);
    }

    const { id } = await context.params;

    try {
      const result = await deps.generateAiProjectResponse({
        projectId: id,
        instruction: transportBody.body.instruction,
      });

      return Response.json(result, {
        status: mapGenerateResultToHttpStatus(result),
      });
    } catch {
      return createTransportErrorResponse("internal-error", 500);
    }
  };
}

export const postGenerateAiProjectRoute =
  createPostGenerateAiProjectRoute({
    generateAiProjectResponse,
  });
