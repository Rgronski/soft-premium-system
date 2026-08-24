import { execFile } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import {
  buildRepoCheckoutDirectory,
  type ProjectSourceWorkingTreeState,
} from "@/lib/project/source-status";

type LocalWorkingBranchSetupRequestBody = {
  projectId: string;
  repositoryUrl: string;
  workingDirectory: string;
  branchWorkMode: "working-branch";
  workingBranchName: string;
  candidateDecision: "approved for further preparation";
  authorization: "authorized to execute";
};

type LocalWorkingBranchSetupSuccessResponse = {
  status: "success";
  message: string;
  workingDirectory: string;
  activeBranch: string;
  repoCheckoutPath: string;
  remoteUrl: string;
  workingTreeState: ProjectSourceWorkingTreeState;
  sourceStatus: "git-repo";
};

type LocalWorkingBranchSetupBlockedResponse = {
  status: "blocked";
  message: string;
};

type LocalWorkingBranchSetupErrorResponse = {
  status: "error";
  message: string;
};

type LocalWorkingBranchSetupResponse =
  | LocalWorkingBranchSetupSuccessResponse
  | LocalWorkingBranchSetupBlockedResponse
  | LocalWorkingBranchSetupErrorResponse;

type GitCommandResult = {
  stdout: string;
  stderr: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function createJsonResponse(
  body: LocalWorkingBranchSetupResponse,
  status: number,
): Response {
  return Response.json(body, { status });
}

function normalizeWindowsPath(value: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue || !path.win32.isAbsolute(trimmedValue)) {
    return null;
  }

  return path.win32.normalize(trimmedValue).replace(/[\\\/]+$/u, "");
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
      (normalizedCandidate === normalizedRoot ||
        normalizedCandidate.startsWith(`${normalizedRoot}\\`)),
  );
}

function normalizeGitHubRepositoryReference(value: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const httpsMatch = (() => {
    try {
      const parsedUrl = new URL(trimmedValue);

      if (parsedUrl.hostname.toLowerCase() !== "github.com") {
        return null;
      }

      const [owner, repository, ...rest] = parsedUrl.pathname
        .replace(/^\/+|\/+$/gu, "")
        .split("/");

      if (!owner || !repository || rest.length > 0) {
        return null;
      }

      return `${owner}/${repository.replace(/\.git$/iu, "")}`;
    } catch {
      return null;
    }
  })();

  if (httpsMatch) {
    return normalizeForComparison(httpsMatch);
  }

  const sshMatch = trimmedValue.match(
    /^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/iu,
  );

  if (sshMatch) {
    return normalizeForComparison(`${sshMatch[1]}/${sshMatch[2]}`);
  }

  return null;
}

function validateGitHubRepositoryUrl(value: string): string | null {
  return normalizeGitHubRepositoryReference(value)
    ? value.trim()
    : null;
}

function validateWorkingBranchName(value: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (!/^work\/[a-z0-9][a-z0-9._/-]*$/iu.test(trimmedValue)) {
    return null;
  }

  if (
    trimmedValue.includes("..") ||
    trimmedValue.includes("\\") ||
    trimmedValue.includes("//") ||
    trimmedValue.endsWith("/") ||
    trimmedValue.startsWith("/") ||
    trimmedValue.startsWith("-") ||
    /[\s~^:?*\[]/u.test(trimmedValue) ||
    trimmedValue.includes("@{")
  ) {
    return null;
  }

  return trimmedValue;
}

function execGitCommand(
  args: string[],
  cwd?: string,
): Promise<GitCommandResult> {
  return new Promise((resolve, reject) => {
    execFile(
      "git",
      args,
      {
        cwd,
        windowsHide: true,
      },
      (error, stdout, stderr) => {
        if (error) {
          const gitError = new Error(
            stderr.trim() || error.message || "Git command failed.",
          ) as Error & {
            code?: number;
            stderr?: string;
          };

          if (typeof (error as { code?: number }).code === "number") {
            gitError.code = (error as { code?: number }).code;
          }

          gitError.stderr = stderr.trim();
          reject(gitError);
          return;
        }

        resolve({
          stdout,
          stderr,
        });
      },
    );
  });
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function isManifestOnlyWorkspaceFolder(
  targetPath: string,
): Promise<boolean> {
  try {
    await stat(path.win32.join(targetPath, "sps-project.json"));
  } catch {
    return false;
  }

  try {
    await stat(path.win32.join(targetPath, ".git"));
    return false;
  } catch {
    return true;
  }
}

async function isGitRepository(targetPath: string): Promise<boolean> {
  try {
    const result = await execGitCommand(
      ["-C", targetPath, "rev-parse", "--is-inside-work-tree"],
      process.cwd(),
    );

    return result.stdout.trim() === "true";
  } catch {
    return false;
  }
}

async function getGitRemoteOriginUrl(
  targetPath: string,
): Promise<string | null> {
  try {
    const result = await execGitCommand(
      ["-C", targetPath, "remote", "get-url", "origin"],
      process.cwd(),
    );

    return result.stdout.trim() || null;
  } catch {
    return null;
  }
}

async function getWorkingTreeState(
  targetPath: string,
): Promise<ProjectSourceWorkingTreeState> {
  try {
    const result = await execGitCommand(
      ["-C", targetPath, "status", "--porcelain"],
      process.cwd(),
    );

    return result.stdout.trim().length === 0 ? "clean" : "dirty";
  } catch {
    return "unknown";
  }
}

async function getActiveBranchName(
  targetPath: string,
): Promise<string | null> {
  try {
    const result = await execGitCommand(
      ["-C", targetPath, "rev-parse", "--abbrev-ref", "HEAD"],
      process.cwd(),
    );

    const branchName = result.stdout.trim();

    return branchName && branchName !== "HEAD" ? branchName : null;
  } catch {
    return null;
  }
}

async function hasLocalBranch(
  targetPath: string,
  branchName: string,
): Promise<boolean> {
  try {
    const result = await execGitCommand(
      ["-C", targetPath, "rev-parse", "--verify", "--quiet", branchName],
      process.cwd(),
    );

    return result.stdout.trim().length > 0;
  } catch {
    return false;
  }
}

type LocalWorkingBranchSourceRevalidationResponse = {
  status: "success";
  message: string;
  workingDirectory: string;
  activeBranch: string;
  repoCheckoutPath: string;
  remoteUrl: string;
  workingTreeState: ProjectSourceWorkingTreeState;
  sourceStatus: "git-repo";
};

function createSourceRevalidationSuccessResponse(
  body: LocalWorkingBranchSourceRevalidationResponse,
): Response {
  return Response.json(body, { status: 200 });
}

async function probeLocalWorkingBranchSourceStatus(
  requestBody: Pick<
    LocalWorkingBranchSetupRequestBody,
    "repositoryUrl" | "workingDirectory" | "branchWorkMode" | "workingBranchName"
  >,
): Promise<Response> {
  const normalizedRepositoryUrl = validateGitHubRepositoryUrl(
    requestBody.repositoryUrl,
  );
  const normalizedWorkingDirectory = normalizeWindowsPath(
    requestBody.workingDirectory,
  );
  const normalizedWorkingBranchName =
    requestBody.branchWorkMode === "working-branch"
      ? validateWorkingBranchName(requestBody.workingBranchName)
      : null;

  if (!normalizedRepositoryUrl) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Nieprawidłowy adres GitHub. Rewalidacja pozostaje zablokowana.",
      },
      409,
    );
  }

  if (!normalizedWorkingDirectory) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Ścieżka workspace musi być absolutna. Rewalidacja pozostaje zablokowana.",
      },
      409,
    );
  }

  const checkoutCandidates = [
    normalizedWorkingDirectory,
    buildRepoCheckoutDirectory(normalizedWorkingDirectory),
  ].filter((candidate, index, list) => list.indexOf(candidate) === index);

  let repoCheckoutPath = "";

  for (const candidatePath of checkoutCandidates) {
    if (!(await pathExists(candidatePath))) {
      continue;
    }

    const candidateStat = await stat(candidatePath);
    if (!candidateStat.isDirectory()) {
      continue;
    }

    if (await isManifestOnlyWorkspaceFolder(candidatePath)) {
      continue;
    }

    if (await isGitRepository(candidatePath)) {
      repoCheckoutPath = candidatePath;
      break;
    }
  }

  if (!repoCheckoutPath) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Lokalny repo checkout nadal niedostępny lub nie jest poprawnym repozytorium Git.",
      },
      409,
    );
  }

  const remoteOriginUrl = await getGitRemoteOriginUrl(repoCheckoutPath);
  const normalizedRemoteOriginUrl = remoteOriginUrl
    ? normalizeGitHubRepositoryReference(remoteOriginUrl)
    : null;
  const normalizedRequestedRepository = normalizeGitHubRepositoryReference(
    normalizedRepositoryUrl,
  );

  if (
    !normalizedRemoteOriginUrl ||
    !normalizedRequestedRepository ||
    normalizedRemoteOriginUrl !== normalizedRequestedRepository
  ) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Remote origin nie pasuje do zapisanego adresu GitHub. Rewalidacja pozostaje zablokowana.",
      },
      409,
    );
  }

  const activeBranch = await getActiveBranchName(repoCheckoutPath);

  if (
    normalizedWorkingBranchName &&
    activeBranch &&
    activeBranch !== normalizedWorkingBranchName
  ) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Aktywna gałąź nie zgadza się z zapisaną gałęzią roboczą. Rewalidacja pozostaje zablokowana.",
      },
      409,
    );
  }

  const workingTreeState = await getWorkingTreeState(repoCheckoutPath);

  return createSourceRevalidationSuccessResponse({
    status: "success",
    message:
      "Checkout status został zrewalidowany. Commit/push/merge/PR pozostają poza zakresem.",
    workingDirectory: normalizedWorkingDirectory,
    activeBranch: activeBranch ?? normalizedWorkingBranchName ?? "unknown",
    repoCheckoutPath,
    remoteUrl: remoteOriginUrl ?? normalizedRepositoryUrl,
    workingTreeState,
    sourceStatus: "git-repo",
  });
}

async function runLocalWorkingBranchSetup(
  requestBody: LocalWorkingBranchSetupRequestBody,
): Promise<Response> {
  const normalizedRepositoryUrl = validateGitHubRepositoryUrl(
    requestBody.repositoryUrl,
  );
  const normalizedWorkingDirectory = normalizeWindowsPath(
    requestBody.workingDirectory,
  );
  const normalizedWorkingBranchName = validateWorkingBranchName(
    requestBody.workingBranchName,
  );

  if (!normalizedRepositoryUrl) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Nieprawidłowy adres GitHub. Akcja pozostaje zablokowana.",
      },
      409,
    );
  }

  if (!normalizedWorkingDirectory) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Ścieżka workspace musi być absolutna. Akcja pozostaje zablokowana.",
      },
      409,
    );
  }

  if (isPathInsideRoot(normalizedWorkingDirectory, process.cwd())) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Ścieżka workspace nie może znajdować się wewnątrz repo SPS OS.",
      },
      409,
    );
  }

  if (requestBody.branchWorkMode !== "working-branch") {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Akcja wymaga trybu pracy working-branch ustawionego w SPS OS.",
      },
      409,
    );
  }

  if (
    requestBody.candidateDecision !== "approved for further preparation" ||
    requestBody.authorization !== "authorized to execute"
  ) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Brakuje zatwierdzenia i autoryzacji wymaganych do rozpoczęcia lokalnego wykonania.",
      },
      409,
    );
  }

  if (!normalizedWorkingBranchName) {
    return createJsonResponse(
      {
        status: "blocked",
        message:
          "Nazwa gałęzi jest niebezpieczna lub nie pasuje do work/....",
      },
      409,
    );
  }

  const workspaceExists = await pathExists(normalizedWorkingDirectory);

  if (workspaceExists) {
    const workspaceStat = await stat(normalizedWorkingDirectory);

    if (!workspaceStat.isDirectory()) {
      return createJsonResponse(
        {
          status: "blocked",
          message:
            "Istniejąca ścieżka workspace nie jest katalogiem.",
        },
        409,
      );
    }

    if (await isManifestOnlyWorkspaceFolder(normalizedWorkingDirectory)) {
      return createJsonResponse(
        {
          status: "blocked",
          message:
            `Ten katalog jest folderem manifest-only. Użyj ${path.win32.join(
              normalizedWorkingDirectory,
              "repo",
            )} jako repo checkout.`,
        },
        409,
      );
    }

    if (!(await isGitRepository(normalizedWorkingDirectory))) {
      return createJsonResponse(
        {
          status: "blocked",
          message:
            "Istniejący katalog nie jest repozytorium Git.",
        },
        409,
      );
    }

    const remoteOriginUrl = await getGitRemoteOriginUrl(
      normalizedWorkingDirectory,
    );
    const normalizedRemoteOriginUrl = remoteOriginUrl
      ? normalizeGitHubRepositoryReference(remoteOriginUrl)
      : null;
    const normalizedRequestedRepository = normalizeGitHubRepositoryReference(
      normalizedRepositoryUrl,
    );

    if (
      !normalizedRemoteOriginUrl ||
      !normalizedRequestedRepository ||
      normalizedRemoteOriginUrl !== normalizedRequestedRepository
    ) {
      return createJsonResponse(
        {
          status: "blocked",
          message:
            "Remote origin nie pasuje do skonfigurowanego adresu GitHub.",
        },
        409,
      );
    }

    const workingTreeState = await getWorkingTreeState(normalizedWorkingDirectory);

    if (workingTreeState !== "clean") {
      return createJsonResponse(
        {
          status: "blocked",
          message:
            "Workspace ma lokalne zmiany i nie można bezpiecznie kontynuować.",
        },
        409,
      );
    }

    try {
      await execGitCommand(
        ["-C", normalizedWorkingDirectory, "fetch", "origin"],
        process.cwd(),
      );
      await execGitCommand(
        ["-C", normalizedWorkingDirectory, "switch", "main"],
        process.cwd(),
      );

      if (await hasLocalBranch(normalizedWorkingDirectory, normalizedWorkingBranchName)) {
        await execGitCommand(
          [
            "-C",
            normalizedWorkingDirectory,
            "switch",
            normalizedWorkingBranchName,
          ],
          process.cwd(),
        );
      } else {
        await execGitCommand(
          [
            "-C",
            normalizedWorkingDirectory,
            "switch",
            "-c",
            normalizedWorkingBranchName,
          ],
          process.cwd(),
        );
      }
    } catch (error) {
      const message =
        error instanceof Error && error.message.trim()
          ? error.message.trim()
          : "Git execution failed.";

      return createJsonResponse(
        {
          status: "blocked",
          message: `GitHub/Git execution nie powiodło się: ${message}`,
        },
        409,
      );
    }

    return createJsonResponse(
      {
        status: "success",
        message:
          "Lokalny clone i working branch setup zostały wykonane. Commit/push/merge/PR pozostają poza zakresem.",
        workingDirectory: normalizedWorkingDirectory,
        activeBranch: normalizedWorkingBranchName,
        repoCheckoutPath: normalizedWorkingDirectory,
        remoteUrl: remoteOriginUrl ?? normalizedRepositoryUrl,
        workingTreeState,
        sourceStatus: "git-repo",
      },
      200,
    );
  }

  try {
    await mkdir(path.win32.dirname(normalizedWorkingDirectory), {
      recursive: true,
    });
    await execGitCommand(
      [
        "clone",
        "--branch",
        "main",
        "--single-branch",
        normalizedRepositoryUrl,
        normalizedWorkingDirectory,
      ],
      process.cwd(),
    );
    await execGitCommand(
      [
        "-C",
        normalizedWorkingDirectory,
        "switch",
        "-c",
        normalizedWorkingBranchName,
      ],
      process.cwd(),
    );
  } catch (error) {
    const message =
      error instanceof Error && error.message.trim()
        ? error.message.trim()
        : "Git execution failed.";

    return createJsonResponse(
      {
        status: "blocked",
        message: `GitHub/Git execution nie powiodło się: ${message}`,
      },
      409,
    );
  }

  return createJsonResponse(
    {
      status: "success",
      message:
        "Lokalny clone i working branch setup zostały wykonane. Commit/push/merge/PR pozostają poza zakresem.",
      workingDirectory: normalizedWorkingDirectory,
      activeBranch: normalizedWorkingBranchName,
      repoCheckoutPath: normalizedWorkingDirectory,
      remoteUrl: normalizedRepositoryUrl,
      workingTreeState: await getWorkingTreeState(normalizedWorkingDirectory),
      sourceStatus: "git-repo",
    },
    200,
  );
}

export async function GET(
  request: Request,
  context: RouteContext<"/api/projects/[id]/working-branch/setup">,
): Promise<Response> {
  const { id } = await context.params;
  const url = new URL(request.url);
  const projectId = url.searchParams.get("projectId")?.trim();
  const repositoryUrl = url.searchParams.get("repositoryUrl") ?? "";
  const workingDirectory = url.searchParams.get("workingDirectory") ?? "";
  const branchWorkMode: "working-branch" = "working-branch";
  const workingBranchName = url.searchParams.get("workingBranchName") ?? "";

  if (projectId && projectId !== id) {
    return createJsonResponse(
      {
        status: "error",
        message: "Nieprawidłowy identyfikator projektu.",
      },
      400,
    );
  }

  return probeLocalWorkingBranchSourceStatus({
    repositoryUrl,
    workingDirectory,
    branchWorkMode,
    workingBranchName,
  });
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/projects/[id]/working-branch/setup">,
): Promise<Response> {
  const { id } = await context.params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return createJsonResponse(
      {
        status: "error",
        message: "Nieprawidłowe dane żądania.",
      },
      400,
    );
  }

  if (!isPlainObject(body)) {
    return createJsonResponse(
      {
        status: "error",
        message: "Nieprawidłowe dane żądania.",
      },
      400,
    );
  }

  const projectId = typeof body.projectId === "string" ? body.projectId.trim() : "";
  const repositoryUrl =
    typeof body.repositoryUrl === "string" ? body.repositoryUrl : "";
  const workingDirectory =
    typeof body.workingDirectory === "string" ? body.workingDirectory : "";
  const branchWorkMode =
    body.branchWorkMode === "working-branch"
      ? body.branchWorkMode
      : null;
  const workingBranchName =
    typeof body.workingBranchName === "string" ? body.workingBranchName : "";
  const candidateDecision =
    body.candidateDecision === "approved for further preparation"
      ? body.candidateDecision
      : null;
  const authorization =
    body.authorization === "authorized to execute" ? body.authorization : null;

  if (!projectId || projectId !== id) {
    return createJsonResponse(
      {
        status: "error",
        message: "Nieprawidłowy identyfikator projektu.",
      },
      400,
    );
  }

  if (
    !repositoryUrl.trim() ||
    !workingDirectory.trim() ||
    !branchWorkMode ||
    !candidateDecision ||
    !authorization
  ) {
    return createJsonResponse(
      {
        status: "error",
        message: "Brakuje wymaganych ustawień SPS OS do uruchomienia akcji.",
      },
      400,
    );
  }

  return runLocalWorkingBranchSetup({
    projectId,
    repositoryUrl,
    workingDirectory,
    branchWorkMode,
    workingBranchName,
    candidateDecision,
    authorization,
  });
}
