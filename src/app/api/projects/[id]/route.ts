import { getProjectRoute } from "@/lib/project/http-server";

export async function GET(
  request: Request,
  context: RouteContext<"/api/projects/[id]">,
): Promise<Response> {
  return getProjectRoute(request, context);
}
