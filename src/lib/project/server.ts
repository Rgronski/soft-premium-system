import "server-only";

import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

import {
  buildDefaultWorkingDirectory,
  getProjectDeleteValidationSummary,
} from "./project";
import type { Project, ProjectFilesystemStatus } from "./types";

type ProjectCreationErrorCode = "working-directory-create-failed";

type ProjectCreationError = Error & {
  code: ProjectCreationErrorCode;
};

function isProjectCreationError(
  value: unknown,
): value is ProjectCreationError {
  return (
    value instanceof Error &&
    "code" in value &&
    (value as { code?: string }).code === "working-directory-create-failed"
  );
}

type ProjectRow = {
  id: string;
  name: string;
  repository_url: string | null;
  created_at: string | Date;
};

const SELECT_PROJECT_BY_ID = `SELECT id, name, repository_url, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`;

const INSERT_PROJECT = `INSERT INTO public.projects (id, name, repository_url, created_at)
VALUES ($1, $2, $3, $4)
RETURNING id, name, repository_url, created_at`;

const DELETE_PROJECT_BY_ID = `DELETE FROM public.projects
WHERE id = $1`;

const localProjects = new Map<string, Project>();

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    ...(row.repository_url ? { repositoryUrl: row.repository_url } : {}),
    createdAt: new Date(row.created_at).toISOString(),
  };
}

function normalizeProjectId(id: string): string {
  return id.trim();
}

function normalizeProjectWorkingDirectory(
  workingDirectory: string | undefined,
  projectName: string,
): string {
  const normalizedWorkingDirectory = workingDirectory?.trim();

  return normalizedWorkingDirectory || buildDefaultWorkingDirectory(projectName);
}

function buildProjectManifestPath(workingDirectory: string): string {
  return join(workingDirectory, "sps-project.json");
}

function buildProjectReadmePath(workingDirectory: string): string {
  return join(workingDirectory, "README.md");
}

async function detectProjectFilesystemStatus(
  workingDirectory?: string,
): Promise<ProjectFilesystemStatus> {
  if (!workingDirectory) {
    return "unknown";
  }

  try {
    await access(buildProjectManifestPath(workingDirectory));
    return "manifest-present";
  } catch {
    return "manifest-missing";
  }
}

async function attachProjectFilesystemStatus(
  project: Project,
): Promise<Project> {
  if (project.projectFilesystemStatus && project.projectFilesystemStatus !== "unknown") {
    return project;
  }

  return {
    ...project,
    projectFilesystemStatus: await detectProjectFilesystemStatus(
      project.workingDirectory,
    ),
  };
}

function buildProjectManifest(project: Project): {
  id: string;
  name: string;
  repositoryUrl?: string;
  createdAt: string;
} {
  return {
    id: project.id,
    name: project.name,
    ...(project.repositoryUrl ? { repositoryUrl: project.repositoryUrl } : {}),
    createdAt: project.createdAt,
  };
}

type ProjectManifestRecord = {
  id: string;
  name: string;
  repositoryUrl?: string;
  createdAt: string;
};

function isProjectManifestRecord(
  value: unknown,
): value is ProjectManifestRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Partial<ProjectManifestRecord>;

  return (
    typeof record.id === "string" &&
    record.id.trim().length > 0 &&
    typeof record.name === "string" &&
    record.name.trim().length > 0 &&
    typeof record.createdAt === "string" &&
    record.createdAt.trim().length > 0 &&
    (record.repositoryUrl === undefined ||
      typeof record.repositoryUrl === "string")
  );
}

export async function getServerProjectByWorkingDirectory(
  workingDirectory: string,
): Promise<Project | null> {
  const normalizedWorkingDirectory = workingDirectory.trim();

  if (!normalizedWorkingDirectory) {
    return null;
  }

  try {
    const manifest = JSON.parse(
      await readFile(buildProjectManifestPath(normalizedWorkingDirectory), "utf8"),
    ) as unknown;

    if (!isProjectManifestRecord(manifest)) {
      return null;
    }

    return {
      id: manifest.id,
      name: manifest.name,
      ...(manifest.repositoryUrl ? { repositoryUrl: manifest.repositoryUrl } : {}),
      workingDirectory: normalizedWorkingDirectory,
      projectFilesystemStatus: "manifest-present",
      createdAt: manifest.createdAt,
    };
  } catch {
    return null;
  }
}

export async function discoverServerProjectsFromWorkingRoot(
  workingRoot: string,
): Promise<Project[]> {
  const normalizedWorkingRoot = workingRoot.trim();

  if (!normalizedWorkingRoot) {
    return [];
  }

  try {
    const entries = await readdir(normalizedWorkingRoot, {
      withFileTypes: true,
    });
    const discoveredProjects: Project[] = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const project = await getServerProjectByWorkingDirectory(
        join(normalizedWorkingRoot, entry.name),
      );

      if (project) {
        discoveredProjects.push(project);
      }
    }

    return discoveredProjects;
  } catch {
    return [];
  }
}

function buildProjectReadme(project: Project): string {
  return `# ${project.name}

Project ID: ${project.id}

This directory is managed by SPS OS.

The canonical project manifest is stored in \`sps-project.json\`.
`;
}

async function ensureProjectWorkingDirectory(
  workingDirectory: string,
): Promise<void> {
  try {
    await mkdir(workingDirectory, { recursive: true });
  } catch {
    const error = new Error(
      "Project server repository could not create the working directory.",
    ) as ProjectCreationError;
    error.code = "working-directory-create-failed";
    throw error;
  }
}

async function ensureProjectManifest(project: Project): Promise<void> {
  try {
    await writeFile(
      buildProjectManifestPath(project.workingDirectory ?? ""),
      `${JSON.stringify(buildProjectManifest(project), null, 2)}\n`,
      "utf8",
    );
  } catch {
    const error = new Error(
      "Project server repository could not create the project manifest.",
    ) as ProjectCreationError;
    error.code = "working-directory-create-failed";
    throw error;
  }
}

async function ensureProjectReadme(project: Project): Promise<void> {
  try {
    await writeFile(
      buildProjectReadmePath(project.workingDirectory ?? ""),
      buildProjectReadme(project),
      "utf8",
    );
  } catch {
    const error = new Error(
      "Project server repository could not create the project readme.",
    ) as ProjectCreationError;
    error.code = "working-directory-create-failed";
    throw error;
  }
}

function getLocalProjectById(id: string): Project | null {
  return localProjects.get(id) ?? null;
}

function storeLocalProject(project: Project): Project {
  localProjects.set(project.id, project);
  return project;
}

function deleteLocalProject(id: string): void {
  localProjects.delete(id);
}

export async function getServerProjectById(
  id: string,
): Promise<Project | null> {
  const normalizedId = normalizeProjectId(id);

  if (!normalizedId) {
    return null;
  }

  const localProject = getLocalProjectById(normalizedId);

  if (localProject) {
    return attachProjectFilesystemStatus(localProject);
  }

  try {
    const sql = neon(getDatabaseUrl());
    const rows = (await sql.query(SELECT_PROJECT_BY_ID, [
      normalizedId,
    ])) as ProjectRow[];
    const row = rows[0];

    if (!row) {
      return null;
    }

    return attachProjectFilesystemStatus(storeLocalProject(mapProjectRow(row)));
  } catch {
    const fallbackProject = getLocalProjectById(normalizedId);

    return fallbackProject
      ? attachProjectFilesystemStatus(fallbackProject)
      : null;
  }
}

export async function createServerProject(input: {
  id: string;
  name: string;
  repositoryUrl?: string;
  workingDirectory?: string;
}): Promise<Project> {
  const normalizedId = input.id.trim();
  const normalizedName = input.name.trim();
  const normalizedRepositoryUrl = input.repositoryUrl?.trim();
  const normalizedWorkingDirectory = normalizeProjectWorkingDirectory(
    input.workingDirectory,
    normalizedName,
  );

  if (!normalizedId) {
    throw new Error("Project server repository requires a non-empty id.");
  }

  if (!normalizedName) {
    throw new Error("Project server repository requires a non-empty name.");
  }

  const createdAt = new Date().toISOString();
  const fallbackProject: Project = {
    id: normalizedId,
    name: normalizedName,
    ...(normalizedRepositoryUrl ? { repositoryUrl: normalizedRepositoryUrl } : {}),
    workingDirectory: normalizedWorkingDirectory,
    projectBrainStatus: "pending",
    createdAt,
  };

  try {
    await ensureProjectWorkingDirectory(normalizedWorkingDirectory);
    await ensureProjectManifest(fallbackProject);
    await ensureProjectReadme(fallbackProject);

    const sql = neon(getDatabaseUrl());
    const rows = (await sql.query(INSERT_PROJECT, [
      normalizedId,
      normalizedName,
      normalizedRepositoryUrl ?? null,
      createdAt,
    ])) as ProjectRow[];
    const row = rows[0];

    if (!row) {
      return storeLocalProject({
        ...fallbackProject,
        projectFilesystemStatus: "manifest-present",
      });
    }

    return storeLocalProject({
      ...mapProjectRow(row),
      workingDirectory: normalizedWorkingDirectory,
      projectBrainStatus: "pending",
      projectFilesystemStatus: "manifest-present",
    });
  } catch (error) {
    if (isProjectCreationError(error)) {
      throw error;
    }

    return storeLocalProject({
      ...fallbackProject,
      projectFilesystemStatus: "manifest-present",
    });
  }
}

export async function deleteServerProjectById(id: string): Promise<void> {
  const normalizedId = normalizeProjectId(id);

  deleteLocalProject(normalizedId);

  try {
    const sql = neon(getDatabaseUrl());

    await sql.query(DELETE_PROJECT_BY_ID, [normalizedId]);
  } catch {
    return;
  }
}

export type ProjectDiskDeleteRequestedAction =
  | "metadata-root"
  | "working-directory-repo-checkout";

export type ProjectDiskDeleteExecutionStatus =
  | "blocked"
  | "dry-run"
  | "deleted"
  | "partial";

export type ProjectDiskDeleteExecutionRequest = {
  projectId: string;
  projectName: string;
  typedConfirmation: string;
  deleteMetadataRoot: boolean;
  deleteWorkingDirectory: boolean;
  explicitProductOwnerApproval: boolean;
  dryRun?: boolean;
  pathOverrides?: {
    projectMetadataRootPath?: string;
    projectWorkingDirectoryPath?: string;
    projectCheckoutPath?: string;
  };
};

export type ProjectDiskDeleteExecutionResult = {
  status: ProjectDiskDeleteExecutionStatus;
  deletedPaths: string[];
  blockedReasons: string[];
  requestedActions: ProjectDiskDeleteRequestedAction[];
  projectMetadataRootPath: string;
  projectWorkingDirectoryPath: string;
  projectCheckoutPath: string;
};

function normalizeProjectDeleteProjectName(value: string): string {
  return value.trim();
}

function normalizeProjectDeleteTypedConfirmation(value: string): string {
  return value;
}

function buildRequestedProjectDeleteActions(
  request: ProjectDiskDeleteExecutionRequest,
): ProjectDiskDeleteRequestedAction[] {
  const requestedActions: ProjectDiskDeleteRequestedAction[] = [];

  if (request.deleteMetadataRoot) {
    requestedActions.push("metadata-root");
  }

  if (request.deleteWorkingDirectory) {
    requestedActions.push("working-directory-repo-checkout");
  }

  return requestedActions;
}

function buildProjectDiskDeleteBlockedResult(
  summary: ProjectDeleteValidationSummary,
  requestedActions: ProjectDiskDeleteRequestedAction[],
  blockedReasons: string[],
): ProjectDiskDeleteExecutionResult {
  return {
    status: "blocked",
    deletedPaths: [],
    blockedReasons,
    requestedActions,
    projectMetadataRootPath: summary.projectMetadataRootPath,
    projectWorkingDirectoryPath: summary.projectWorkspacePath,
    projectCheckoutPath: summary.projectCheckoutPath,
  };
}

function buildProjectDiskDeleteDryRunResult(
  summary: ProjectDeleteValidationSummary,
  requestedActions: ProjectDiskDeleteRequestedAction[],
): ProjectDiskDeleteExecutionResult {
  return {
    status: "dry-run",
    deletedPaths: [],
    blockedReasons: [],
    requestedActions,
    projectMetadataRootPath: summary.projectMetadataRootPath,
    projectWorkingDirectoryPath: summary.projectWorkspacePath,
    projectCheckoutPath: summary.projectCheckoutPath,
  };
}

function resolveProjectDeleteExecutionSummary(
  summary: ProjectDeleteValidationSummary,
  request: ProjectDiskDeleteExecutionRequest,
): ProjectDeleteValidationSummary {
  return {
    ...summary,
    projectMetadataRootPath:
      request.pathOverrides?.projectMetadataRootPath ??
      summary.projectMetadataRootPath,
    projectWorkspacePath:
      request.pathOverrides?.projectWorkingDirectoryPath ??
      summary.projectWorkspacePath,
    projectCheckoutPath:
      request.pathOverrides?.projectCheckoutPath ?? summary.projectCheckoutPath,
  };
}

async function removeProjectDiskPath(
  path: string,
  deletedPaths: string[],
  blockedReasons: string[],
): Promise<void> {
  try {
    await rm(path, {
      recursive: true,
      force: true,
    });
    deletedPaths.push(path);
  } catch (error) {
    blockedReasons.push(
      `Nie udało się usunąć ${path}: ${
        error instanceof Error ? error.message : "unknown error"
      }`,
    );
  }
}

export async function executeProjectDiskDelete(
  request: ProjectDiskDeleteExecutionRequest,
): Promise<ProjectDiskDeleteExecutionResult> {
  const normalizedProjectId = normalizeProjectId(request.projectId);
  const normalizedProjectName = normalizeProjectDeleteProjectName(
    request.projectName,
  );
  const normalizedTypedConfirmation = normalizeProjectDeleteTypedConfirmation(
    request.typedConfirmation,
  );
  const requestedActions = buildRequestedProjectDeleteActions(request);

  if (!normalizedProjectId) {
    return buildProjectDiskDeleteBlockedResult(
      {
        projectName: normalizedProjectName,
        projectWorkspacePath: "",
        projectCheckoutPath: "",
        projectMetadataRootPath: "",
        registryRemovalNote: "",
        browserStateRemovalNote: "",
        destructiveDeleteConfirmation: "",
        notes: [],
      },
      requestedActions,
      ["Brak projectId."],
    );
  }

  if (!normalizedProjectName) {
    return buildProjectDiskDeleteBlockedResult(
      {
        projectName: "",
        projectWorkspacePath: "",
        projectCheckoutPath: "",
        projectMetadataRootPath: "",
        registryRemovalNote: "",
        browserStateRemovalNote: "",
        destructiveDeleteConfirmation: "",
        notes: [],
      },
      requestedActions,
      ["Brak projectName."],
    );
  }

  if (!normalizedTypedConfirmation) {
    return buildProjectDiskDeleteBlockedResult(
      {
        projectName: normalizedProjectName,
        projectWorkspacePath: "",
        projectCheckoutPath: "",
        projectMetadataRootPath: "",
        registryRemovalNote: "",
        browserStateRemovalNote: "",
        destructiveDeleteConfirmation: "",
        notes: [],
      },
      requestedActions,
      ["Brak typedConfirmation."],
    );
  }

  const project = await getServerProjectById(normalizedProjectId);

  if (!project) {
    return buildProjectDiskDeleteBlockedResult(
      {
        projectName: normalizedProjectName,
        projectWorkspacePath: "",
        projectCheckoutPath: "",
        projectMetadataRootPath: "",
        registryRemovalNote: "",
        browserStateRemovalNote: "",
        destructiveDeleteConfirmation: "",
        notes: [],
      },
      requestedActions,
      ["Nie znaleziono projektu dla podanego projectId."],
    );
  }

  const canonicalProjectName = project.name.trim();

  if (canonicalProjectName !== normalizedProjectName) {
    return buildProjectDiskDeleteBlockedResult(
      getProjectDeleteValidationSummary(project),
      requestedActions,
      [
        `projectName nie zgadza się z kanoniczną nazwą projektu: ${canonicalProjectName}.`,
      ],
    );
  }

  if (normalizedTypedConfirmation !== canonicalProjectName) {
    return buildProjectDiskDeleteBlockedResult(
      getProjectDeleteValidationSummary(project),
      requestedActions,
      [
        `typedConfirmation musi być dokładnie równe nazwie projektu: ${canonicalProjectName}.`,
      ],
    );
  }

  if (!project.workingDirectory?.trim()) {
    return buildProjectDiskDeleteBlockedResult(
      getProjectDeleteValidationSummary(project),
      requestedActions,
      [
        "Brak workingDirectory projektu; destrukcyjne kasowanie dyskowe pozostaje zablokowane.",
      ],
    );
  }

  const summary = getProjectDeleteValidationSummary(project);
  const executionSummary = resolveProjectDeleteExecutionSummary(summary, request);

  if (requestedActions.length === 0 || request.dryRun !== false) {
    return buildProjectDiskDeleteDryRunResult(executionSummary, requestedActions);
  }

  if (!request.explicitProductOwnerApproval) {
    return buildProjectDiskDeleteBlockedResult(executionSummary, requestedActions, [
      "explicitProductOwnerApproval musi mieć wartość true przed wykonaniem destrukcyjnego delete.",
    ]);
  }

  const deletedPaths: string[] = [];
  const blockedReasons: string[] = [];

  if (request.deleteMetadataRoot) {
    await removeProjectDiskPath(
      executionSummary.projectMetadataRootPath,
      deletedPaths,
      blockedReasons,
    );
  }

  if (request.deleteWorkingDirectory) {
    await removeProjectDiskPath(
      executionSummary.projectCheckoutPath,
      deletedPaths,
      blockedReasons,
    );
    await removeProjectDiskPath(
      executionSummary.projectWorkspacePath,
      deletedPaths,
      blockedReasons,
    );
  }

  if (blockedReasons.length > 0 && deletedPaths.length > 0) {
    return {
      status: "partial",
      deletedPaths,
      blockedReasons,
      requestedActions,
      projectMetadataRootPath: executionSummary.projectMetadataRootPath,
      projectWorkingDirectoryPath: executionSummary.projectWorkspacePath,
      projectCheckoutPath: executionSummary.projectCheckoutPath,
    };
  }

  if (blockedReasons.length > 0) {
    return buildProjectDiskDeleteBlockedResult(
      executionSummary,
      requestedActions,
      blockedReasons,
    );
  }

  return {
    status: "deleted",
    deletedPaths,
    blockedReasons: [],
    requestedActions,
    projectMetadataRootPath: executionSummary.projectMetadataRootPath,
    projectWorkingDirectoryPath: executionSummary.projectWorkspacePath,
    projectCheckoutPath: executionSummary.projectCheckoutPath,
  };
}
