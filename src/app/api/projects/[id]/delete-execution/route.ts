import { executeProjectDiskDelete } from "@/lib/project/server";

type ProjectDeleteExecutionRequestBody = {
  projectId?: unknown;
  projectName?: unknown;
  typedConfirmation?: unknown;
  deleteMetadataRoot?: unknown;
  deleteWorkingDirectory?: unknown;
  explicitProductOwnerApproval?: unknown;
  dryRun?: unknown;
};

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function readRequestBody(value: unknown): ProjectDeleteExecutionRequestBody {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as ProjectDeleteExecutionRequestBody;
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/delete-execution">,
): Promise<Response> {
  const { id } = await context.params;
  const body = readRequestBody(await request.json().catch(() => null));
  const projectId = typeof body.projectId === "string" ? body.projectId.trim() : "";

  if (!projectId || projectId !== id.trim()) {
    return Response.json(
      {
        status: "blocked",
        deletedPaths: [],
        blockedReasons: ["projectId musi zgadzać się z parametrem trasy."],
        requestedActions: [],
        projectMetadataRootPath: "",
        projectWorkingDirectoryPath: "",
        projectCheckoutPath: "",
      },
      {
        status: 409,
      },
    );
  }

  const result = await executeProjectDiskDelete({
    projectId,
    projectName:
      typeof body.projectName === "string" ? body.projectName : "",
    typedConfirmation:
      typeof body.typedConfirmation === "string"
        ? body.typedConfirmation
        : "",
    deleteMetadataRoot: isBoolean(body.deleteMetadataRoot)
      ? body.deleteMetadataRoot
      : false,
    deleteWorkingDirectory: isBoolean(body.deleteWorkingDirectory)
      ? body.deleteWorkingDirectory
      : false,
    explicitProductOwnerApproval: isBoolean(body.explicitProductOwnerApproval)
      ? body.explicitProductOwnerApproval
      : false,
    dryRun: isBoolean(body.dryRun) ? body.dryRun : undefined,
  });

  return Response.json(result, {
    status: result.status === "blocked" ? 409 : 200,
  });
}
