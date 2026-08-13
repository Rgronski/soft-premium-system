import { discoverServerProjectsFromWorkingRoot } from "@/lib/project/server";

const DEFAULT_WORK_ROOT = "C:\\SPS_OS_WORK";

export async function GET(): Promise<Response> {
  const projects = await discoverServerProjectsFromWorkingRoot(
    DEFAULT_WORK_ROOT,
  );

  return Response.json({ projects }, { status: 200 });
}
