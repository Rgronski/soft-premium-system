import { getProjectConductorState } from "@/lib/conductor/project-store";
import { getServerProjectById } from "@/lib/project/server";

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

export async function GET(
  _request: Request,
  context: RouteContext<"/api/projects/[id]/conductor">,
): Promise<Response> {
  const { id } = await context.params;

  try {
    const project = await getServerProjectById(id);

    if (!project) {
      return createTransportErrorResponse("project-not-found", 404);
    }

    const conductorState = await getProjectConductorState(id);

    return Response.json(conductorState, {
      status: 200,
    });
  } catch {
    return createTransportErrorResponse("context-unavailable", 503);
  }
}
