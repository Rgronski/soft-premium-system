import { rm } from "node:fs/promises";
import path from "node:path";

const REQUIRED_APPROVAL_TEXT =
  "Product Owner approves destructive checkout-only disk removal for Beauty Client PRO, project id 0d3e28cb-6dff-442a-b94c-007a5d6b5779. Remove exactly C:\\SPS_OS_WORK\\beauty-client-pro\\repo. Preserve C:\\SPS_OS_WORK\\beauty-client-pro. Preserve C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json. Preserve C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb. Remote main is verified at 60f8280b2103c12d16b2851a3cef1be140eb34b5. Product Owner acknowledges local checkout deletion is destructive but recoverable from remote if access remains available.";

type CheckoutRemovalExecuteRequestBody = {
  projectId?: unknown;
  operationMode?: unknown;
  targetPath?: unknown;
  preservedPaths?: unknown;
  gitPreflight?: unknown;
  approvalText?: unknown;
};

type CheckoutRemovalExecuteStatus = "blocked" | "executed" | "failed";

type CheckoutRemovalExecuteResponse = {
  status: CheckoutRemovalExecuteStatus;
  mode: "remove-checkout";
  executionPerformed: boolean;
  deletedPaths: string[];
  preservedPaths: string[];
  blockedReasons: string[];
  gitPreflight: unknown;
  evidencePreserved: true;
  reconnectRequired: true;
  nextStep: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function readRequestBody(value: unknown): CheckoutRemovalExecuteRequestBody {
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

function isManifestPath(value: string): boolean {
  return normalizeForComparison(value).endsWith("\\sps-project.json");
}

function isMetadataPath(value: string): boolean {
  return normalizeForComparison(value).includes("\\.sps-meta\\");
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

function hasPath(paths: string[], expectedPath: string): boolean {
  const normalizedExpectedPath = normalizeForComparison(expectedPath);

  return paths.some(
    (item) => normalizeForComparison(item) === normalizedExpectedPath,
  );
}

function isRepoCheckoutPath(value: string): boolean {
  return normalizeForComparison(value).endsWith("\\repo");
}

function readGitPreflight(
  value: unknown,
): Record<string, unknown> | null {
  return isPlainObject(value) ? value : null;
}

function validateGitPreflight(
  gitPreflight: Record<string, unknown> | null,
): string[] {
  if (!gitPreflight) {
    return ["gitPreflight musi być obiektem preflight."];
  }

  const blockedReasons: string[] = [];

  if (readString(gitPreflight.workingTreeStatus) !== "clean") {
    blockedReasons.push("Git status musi być clean.");
  }

  if (!readString(gitPreflight.branch)) {
    blockedReasons.push("Git branch musi być znany.");
  }

  if (!readString(gitPreflight.head)) {
    blockedReasons.push("Git HEAD musi być znany.");
  }

  if (!readString(gitPreflight.remote)) {
    blockedReasons.push("Git remote musi być znany.");
  }

  if (gitPreflight.remoteMainVerified !== true) {
    blockedReasons.push("Remote main musi być zweryfikowany.");
  }

  return blockedReasons;
}

function buildResponse(
  status: CheckoutRemovalExecuteStatus,
  targetPath: string,
  preservedPaths: string[],
  blockedReasons: string[],
  gitPreflight: unknown,
): CheckoutRemovalExecuteResponse {
  return {
    status,
    mode: "remove-checkout",
    executionPerformed: status === "executed",
    deletedPaths: status === "executed" ? [targetPath] : [],
    preservedPaths,
    blockedReasons,
    gitPreflight,
    evidencePreserved: true,
    reconnectRequired: true,
    nextStep:
      status === "executed"
        ? "Reconnect required: dodaj lub połącz checkout ponownie, a potem wykonaj Project Map readback."
        : "Usuń blokady i ponów preflight przed jakimkolwiek wykonaniem.",
  };
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/checkout-removal/execute">,
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
  const gitPreflight = readGitPreflight(body.gitPreflight);
  const blockedReasons: string[] = [];

  if (!projectId || projectId !== id.trim()) {
    blockedReasons.push("projectId musi zgadzać się z parametrem trasy.");
  }

  if (operationMode !== "remove-checkout") {
    blockedReasons.push("operationMode musi mieć wartość remove-checkout.");
  }

  if (approvalText !== REQUIRED_APPROVAL_TEXT) {
    blockedReasons.push("approvalText musi dokładnie pasować do wymaganej zgody.");
  }

  if (!normalizedTargetPath) {
    blockedReasons.push("targetPath musi być bezwzględną ścieżką Windows.");
  }

  if (normalizedPreservedPaths.length === 0) {
    blockedReasons.push("preservedPaths musi zawierać ścieżki do zachowania.");
  }

  blockedReasons.push(...validateGitPreflight(gitPreflight));

  if (normalizedTargetPath) {
    if (isManifestPath(normalizedTargetPath)) {
      blockedReasons.push("targetPath nie może wskazywać na sps-project.json.");
    }

    if (isMetadataPath(normalizedTargetPath)) {
      blockedReasons.push("targetPath nie może wskazywać na .sps-meta.");
    }

    if (!isRepoCheckoutPath(normalizedTargetPath)) {
      blockedReasons.push("targetPath musi wskazywać na checkout repo.");
    }

    if (hasPath(normalizedPreservedPaths, normalizedTargetPath)) {
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

    if (
      workspaceRoot &&
      !hasPath(
        normalizedPreservedPaths,
        `${workspaceRoot}\\sps-project.json`,
      )
    ) {
      blockedReasons.push("preservedPaths musi zawierać manifest sps-project.json.");
    }
  }

  if (
    !normalizedPreservedPaths.some(
      (item) => !isManifestPath(item) && !isMetadataPath(item),
    )
  ) {
    blockedReasons.push("preservedPaths musi zawierać workspace projektu.");
  }

  if (!normalizedPreservedPaths.some(isMetadataPath)) {
    blockedReasons.push("preservedPaths musi zawierać metadata root .sps-meta.");
  }

  if (blockedReasons.length > 0) {
    const response = buildResponse(
      "blocked",
      normalizedTargetPath ?? targetPath,
      normalizedPreservedPaths,
      blockedReasons,
      body.gitPreflight,
    );

    return Response.json(response, { status: 409 });
  }

  try {
    await rm(normalizedTargetPath as string, {
      recursive: true,
      force: true,
    });
  } catch (error) {
    const response = buildResponse(
      "failed",
      normalizedTargetPath as string,
      normalizedPreservedPaths,
      [
        `Nie udało się usunąć checkoutu: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      ],
      body.gitPreflight,
    );

    return Response.json(response, { status: 500 });
  }

  return Response.json(
    buildResponse(
      "executed",
      normalizedTargetPath as string,
      normalizedPreservedPaths,
      [],
      body.gitPreflight,
    ),
  );
}
