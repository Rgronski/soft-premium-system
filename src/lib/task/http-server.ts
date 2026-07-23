import "server-only";

import { getServerProjectById } from "../project/server";
import { getServerTasksByProjectId } from "./server";
import { createServerTask } from "./server";
import type { Task } from "./types";

type GetTasksHttpHandler = (
  request: Request,
  context: RouteContext<"/api/projects/[id]/tasks">,
) => Promise<Response>;

type PostTaskHttpHandler = (
  request: Request,
  context: RouteContext<"/api/projects/[id]/tasks">,
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

  if (typeof body.title !== "string") {
    return {
      ok: false,
    };
  }

  const title = body.title.trim();

  if (!title) {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    body: {
      title,
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

export function createGetTasksRoute(deps: {
  getServerProjectById: typeof getServerProjectById;
  getServerTasksByProjectId: typeof getServerTasksByProjectId;
}): GetTasksHttpHandler {
  return async function getTasksRoute(
    _request: Request,
    context: RouteContext<"/api/projects/[id]/tasks">,
  ): Promise<Response> {
    const { id } = await context.params;

    try {
      const project = await deps.getServerProjectById(id);

      if (!project) {
        return createTransportErrorResponse("project-not-found", 404);
      }
    } catch {
      return createTransportErrorResponse(
        "context-unavailable",
        503,
      );
    }

    try {
      const tasks = await deps.getServerTasksByProjectId(id);

      return Response.json(tasks satisfies Task[], {
        status: 200,
      });
    } catch {
      return createTransportErrorResponse(
        "context-unavailable",
        503,
      );
    }
  };
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

export function createPostTaskRoute(deps: {
  createServerTask: typeof createServerTask;
}): PostTaskHttpHandler {
  return async function postTaskRoute(
    request: Request,
    context: RouteContext<"/api/projects/[id]/tasks">,
  ): Promise<Response> {
    const transportBody = await readTransportRequestBody(request);

    if (!transportBody.ok) {
      return createTransportErrorResponse("invalid-request", 400);
    }

    const { id } = await context.params;

    try {
      const task = await deps.createServerTask({
        projectId: id,
        title: transportBody.body.title,
      });

      return Response.json(task satisfies Task, {
        status: 201,
      });
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

export const postTaskRoute = createPostTaskRoute({
  createServerTask,
});

export const getTasksRoute = createGetTasksRoute({
  getServerProjectById,
  getServerTasksByProjectId,
});
