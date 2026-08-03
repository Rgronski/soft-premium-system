import { getProjectRoute } from "@/lib/project/http-server";
import { deleteServerProjectById } from "@/lib/project/server";

export async function GET(
  request: Request,
  context: RouteContext<"/api/projects/[id]">,
): Promise<Response> {
  return getProjectRoute(request, context);
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/projects/[id]">,
): Promise<Response> {
  const { id } = await context.params;

  try {
    await deleteServerProjectById(id);
    return new Response(null, { status: 204 });
  } catch {
    return Response.json(
      {
        status: "context-unavailable",
      },
      {
        status: 503,
      },
    );
  }
}
