import {
  getKnowledgeEntriesRoute,
  postKnowledgeRoute,
} from "@/lib/knowledge/http-server";

export async function GET(
  request: Request,
  context: RouteContext<"/api/projects/[id]/knowledge">,
): Promise<Response> {
  return getKnowledgeEntriesRoute(request, context);
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/knowledge">,
): Promise<Response> {
  return postKnowledgeRoute(request, context);
}
