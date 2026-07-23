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

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
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
