import path from "node:path";

type CheckoutRemovalDryRunRequestBody = {
  projectId?: unknown;
  operationMode?: unknown;
  targetPath?: unknown;
  preservedPaths?: unknown;
  gitPreflight?: unknown;
  approvalText?: unknown;
};

type CheckoutRemovalDryRunStatus = "preview" | "blocked";

type CheckoutRemovalDryRunResponse = {
  status: CheckoutRemovalDryRunStatus;
  mode: "remove-checkout";
  executionPerformed: false;
  wouldDeletePaths: string[];
  preservedPaths: string[];
  blockedReasons: string[];
  gitPreflight: unknown;
  evidencePreserved: true;
  reconnectRequired: true;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function readRequestBody(value: unknown): CheckoutRemovalDryRunRequestBody {
  return isPlainObject(value) ? value : {};
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeWindowsPath(value: string): string | null {
  if (!value || !path.win32.isAbsolute(value)) {
    return null;
  }

  return path.win32.normalize(value).replace(/[\\\/]+$/u, "");
}

function normalizeForComparison(value: string): string {
  return value.trim().toLowerCase();
}

function isPathInsideRoot(candidatePath: string, rootPath: string): boolean {
  const normalizedCandidate = normalizeForComparison(
    normalizeWindowsPath(candidatePath) ?? "",
  );
  const normalizedRoot = normalizeForComparison(
    normalizeWindowsPath(rootPath) ?? "",
  );

  return Boolean(
    normalizedCandidate &&
      normalizedRoot &&
      normalizedCandidate !== normalizedRoot &&
      normalizedCandidate.startsWith(`${normalizedRoot}\\`),
  );
}

function isManifestPath(value: string): boolean {
  return normalizeForComparison(value).endsWith("\\sps-project.json");
}

function isMetadataPath(value: string): boolean {
  return normalizeForComparison(value).includes("\\.sps-meta\\");
}

function buildResponse(
  blockedReasons: string[],
  targetPath: string,
  preservedPaths: string[],
  gitPreflight: unknown,
): CheckoutRemovalDryRunResponse {
  return {
    status: blockedReasons.length > 0 ? "blocked" : "preview",
    mode: "remove-checkout",
    executionPerformed: false,
    wouldDeletePaths: blockedReasons.length > 0 ? [] : [targetPath],
    preservedPaths,
    blockedReasons,
    gitPreflight,
    evidencePreserved: true,
    reconnectRequired: true,
  };
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/checkout-removal/dry-run">,
): Promise<Response> {
  const { id } = await context.params;
  const body = readRequestBody(await request.json().catch(() => null));
  const projectId = readString(body.projectId);
  const operationMode = readString(body.operationMode);
  const targetPath = readString(body.targetPath);
  const preservedPaths = readStringArray(body.preservedPaths);
  const approvalText = readString(body.approvalText);
  const normalizedTargetPath = normalizeWindowsPath(targetPath);
  const normalizedPreservedPaths = preservedPaths
    .map((item) => normalizeWindowsPath(item))
    .filter((item): item is string => Boolean(item));
  const blockedReasons: string[] = [];

  if (!projectId || projectId !== id.trim()) {
    blockedReasons.push("projectId musi zgadzać się z parametrem trasy.");
  }

  if (operationMode !== "remove-checkout") {
    blockedReasons.push("operationMode musi mieć wartość remove-checkout.");
  }

  if (!normalizedTargetPath) {
    blockedReasons.push("targetPath musi być bezwzględną ścieżką Windows.");
  }

  if (normalizedPreservedPaths.length === 0) {
    blockedReasons.push("preservedPaths musi zawierać ścieżki do zachowania.");
  }

  if (!isPlainObject(body.gitPreflight)) {
    blockedReasons.push("gitPreflight musi być obiektem preflight.");
  }

  if (!approvalText) {
    blockedReasons.push("approvalText jest wymagany dla przyszłej zgody.");
  }

  if (normalizedTargetPath) {
    if (isManifestPath(normalizedTargetPath)) {
      blockedReasons.push("targetPath nie może wskazywać na sps-project.json.");
    }

    if (isMetadataPath(normalizedTargetPath)) {
      blockedReasons.push("targetPath nie może wskazywać na .sps-meta.");
    }

    if (normalizedPreservedPaths.includes(normalizedTargetPath)) {
      blockedReasons.push("targetPath nie może być ścieżką zachowywaną.");
    }

    const workspaceRoot = normalizedPreservedPaths
      .filter((item) => !isManifestPath(item) && !isMetadataPath(item))
      .find((item) => isPathInsideRoot(normalizedTargetPath, item));

    if (!workspaceRoot) {
      blockedReasons.push(
        "targetPath musi pozostać wewnątrz zachowanego workspace projektu.",
      );
    }
  }

  const response = buildResponse(
    blockedReasons,
    normalizedTargetPath ?? targetPath,
    normalizedPreservedPaths,
    body.gitPreflight,
  );

  return Response.json(response, {
    status: response.status === "blocked" ? 409 : 200,
  });
}
