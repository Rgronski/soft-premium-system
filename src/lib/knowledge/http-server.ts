import "server-only";

import { createServerKnowledgeEntry } from "./server";
import type { KnowledgeEntry } from "./types";

type PostKnowledgeHttpHandler = (
  request: Request,
  context: RouteContext<"/api/projects/[id]/knowledge">,
) => Promise<Response>;

type TransportErrorResponse =
  | {
      status: "invalid-request";
    }
  | {
      status: "project-not-found";
    }
  | {
      status: "context-unavailable";
    };

type TransportRequestBody = {
  title: string;
  content: string;
};

type PostgresErrorLike = {
  code?: unknown;
  constraint?: unknown;
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

  if (
    typeof body.title !== "string" ||
    typeof body.content !== "string"
  ) {
    return {
      ok: false,
    };
  }

  const title = body.title.trim();
  const content = body.content.trim();

  if (!title || !content) {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    body: {
      title,
      content,
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

function isProjectForeignKeyViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const postgresError = error as PostgresErrorLike;

  if (postgresError.code !== "23503") {
    return false;
  }

  if (
    typeof postgresError.constraint === "string" &&
    !postgresError.constraint.includes("project")
  ) {
    return false;
  }

  return true;
}

export function createPostKnowledgeRoute(deps: {
  createServerKnowledgeEntry: typeof createServerKnowledgeEntry;
}): PostKnowledgeHttpHandler {
  return async function postKnowledgeRoute(
    request: Request,
    context: RouteContext<"/api/projects/[id]/knowledge">,
  ): Promise<Response> {
    const transportBody = await readTransportRequestBody(request);

    if (!transportBody.ok) {
      return createTransportErrorResponse("invalid-request", 400);
    }

    const { id } = await context.params;

    try {
      const knowledgeEntry =
        await deps.createServerKnowledgeEntry({
          projectId: id,
          title: transportBody.body.title,
          content: transportBody.body.content,
        });

      return Response.json(
        knowledgeEntry satisfies KnowledgeEntry,
        {
          status: 201,
        },
      );
    } catch (error) {
      if (isProjectForeignKeyViolation(error)) {
        return createTransportErrorResponse("project-not-found", 404);
      }

      return createTransportErrorResponse(
        "context-unavailable",
        503,
      );
    }
  };
}

export const postKnowledgeRoute = createPostKnowledgeRoute({
  createServerKnowledgeEntry,
});
