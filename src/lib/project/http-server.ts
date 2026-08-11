import "server-only";

import { createServerProject, getServerProjectById } from "./server";
import type { Project } from "./types";

type GetProjectHttpHandler = (
  request: Request,
  context: RouteContext<"/api/projects/[id]">,
) => Promise<Response>;

type PostProjectHttpHandler = (
  request: Request,
  context: RouteContext<"/api/projects/[id]">,
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
    }
  | {
      status: "working-directory-create-failed";
    };

type TransportProjectCreateBody = {
  name: string;
  repositoryUrl?: string;
  workingDirectory?: string;
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

async function readTransportCreateBody(
  request: Request,
): Promise<
  | {
      ok: true;
      body: TransportProjectCreateBody;
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

  if (
    !isPlainObject(body) ||
    typeof body.name !== "string" ||
    (body.repositoryUrl !== undefined && typeof body.repositoryUrl !== "string") ||
    (body.workingDirectory !== undefined &&
      typeof body.workingDirectory !== "string")
  ) {
    return {
      ok: false,
    };
  }

  const name = body.name.trim();
  const repositoryUrl =
    typeof body.repositoryUrl === "string" ? body.repositoryUrl.trim() : "";
  const workingDirectory =
    typeof body.workingDirectory === "string"
      ? body.workingDirectory.trim()
      : "";

  if (!name) {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    body: {
      name,
      ...(repositoryUrl ? { repositoryUrl } : {}),
      ...(workingDirectory ? { workingDirectory } : {}),
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

export function createGetProjectRoute(deps: {
  getServerProjectById: typeof getServerProjectById;
}): GetProjectHttpHandler {
  return async function getProjectRoute(
    _request: Request,
    context: RouteContext<"/api/projects/[id]">,
  ): Promise<Response> {
    const { id } = await context.params;

    try {
      const project = await deps.getServerProjectById(id);

      if (!project) {
        return createTransportErrorResponse("project-not-found", 404);
      }

      return Response.json(project satisfies Project, {
        status: 200,
      });
    } catch {
      return createTransportErrorResponse("context-unavailable", 503);
    }
  };
}

export function createPostProjectRoute(deps: {
  createServerProject: typeof createServerProject;
}): PostProjectHttpHandler {
  return async function postProjectRoute(
    request: Request,
    context: RouteContext<"/api/projects/[id]">,
  ): Promise<Response> {
    const transportBody = await readTransportCreateBody(request);

    if (!transportBody.ok) {
      return createTransportErrorResponse("invalid-request", 400);
    }

    const { id } = await context.params;

    try {
      const project = await deps.createServerProject({
        id,
        name: transportBody.body.name,
        repositoryUrl: transportBody.body.repositoryUrl,
        workingDirectory: transportBody.body.workingDirectory,
      });

      return Response.json(project satisfies Project, {
        status: 201,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as { code?: string }).code ===
          "working-directory-create-failed"
      ) {
        return createTransportErrorResponse(
          "working-directory-create-failed",
          500,
        );
      }

      return createTransportErrorResponse("context-unavailable", 503);
    }
  };
}

export const getProjectRoute = createGetProjectRoute({
  getServerProjectById,
});

export const postProjectRoute = createPostProjectRoute({
  createServerProject,
});
