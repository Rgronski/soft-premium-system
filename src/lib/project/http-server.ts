import "server-only";

import { getServerProjectById } from "./server";
import type { Project } from "./types";

type GetProjectHttpHandler = (
  request: Request,
  context: RouteContext<"/api/projects/[id]">,
) => Promise<Response>;

type TransportErrorResponse =
  | {
      status: "project-not-found";
    }
  | {
      status: "context-unavailable";
    };

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

export const getProjectRoute = createGetProjectRoute({
  getServerProjectById,
});
