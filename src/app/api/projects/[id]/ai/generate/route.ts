import { postGenerateAiProjectRoute } from "@/lib/ai-model/server";

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/ai/generate">,
): Promise<Response> {
  return postGenerateAiProjectRoute(request, context);
}
