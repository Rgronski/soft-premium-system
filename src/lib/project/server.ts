import "server-only";

import { neon } from "@neondatabase/serverless";

import type { Project } from "./types";

type ProjectRow = {
  id: string;
  name: string;
  created_at: string | Date;
};

const SELECT_PROJECT_BY_ID = `SELECT id, name, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`;

const INSERT_PROJECT = `INSERT INTO public.projects (id, name, created_at)
VALUES ($1, $2, $3)
RETURNING id, name, created_at`;

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
    createdAt: new Date(row.created_at).toISOString(),
  };
}

function normalizeProjectId(id: string): string {
  return id.trim();
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
    return localProject;
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

    return storeLocalProject(mapProjectRow(row));
  } catch {
    return getLocalProjectById(normalizedId);
  }
}

export async function createServerProject(input: {
  id: string;
  name: string;
}): Promise<Project> {
  const normalizedId = input.id.trim();
  const normalizedName = input.name.trim();

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
    createdAt,
  };

  try {
    const sql = neon(getDatabaseUrl());
    const rows = (await sql.query(INSERT_PROJECT, [
      normalizedId,
      normalizedName,
      createdAt,
    ])) as ProjectRow[];
    const row = rows[0];

    if (!row) {
      return storeLocalProject(fallbackProject);
    }

    return storeLocalProject(mapProjectRow(row));
  } catch {
    return storeLocalProject(fallbackProject);
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
