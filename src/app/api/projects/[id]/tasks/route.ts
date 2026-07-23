import { getTasksRoute, postTaskRoute } from "@/lib/task/http-server";

export async function GET(
  request: Request,
  context: RouteContext<"/api/projects/[id]/tasks">,
): Promise<Response> {
  return getTasksRoute(request, context);
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/tasks">,
): Promise<Response> {
  return postTaskRoute(request, context);
}
