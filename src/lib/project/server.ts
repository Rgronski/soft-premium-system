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

export async function getServerProjectById(
  id: string,
): Promise<Project | null> {
  const sql = neon(getDatabaseUrl());
  const rows = await sql.query(SELECT_PROJECT_BY_ID, [id]) as ProjectRow[];
  const row = rows[0];

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    createdAt: new Date(row.created_at).toISOString(),
  };
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
  const sql = neon(getDatabaseUrl());
  const rows = (await sql.query(INSERT_PROJECT, [
    normalizedId,
    normalizedName,
    createdAt,
  ])) as ProjectRow[];
  const row = rows[0];

  if (!row) {
    throw new Error("Project server repository did not return the created project.");
  }

  return mapProjectRow(row);
}

export async function deleteServerProjectById(id: string): Promise<void> {
  const sql = neon(getDatabaseUrl());

  await sql.query(DELETE_PROJECT_BY_ID, [id]);
}
