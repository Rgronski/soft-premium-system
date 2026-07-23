import { postKnowledgeRoute } from "@/lib/knowledge/http-server";

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/knowledge">,
): Promise<Response> {
  return postKnowledgeRoute(request, context);
}
