import "server-only";

import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

import { buildDefaultWorkingDirectory } from "./project";
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
