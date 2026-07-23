import "server-only";

import { neon } from "@neondatabase/serverless";

import type { KnowledgeEntry } from "./types";

type KnowledgeEntryRow = {
  id: string;
  project_id: string;
  title: string;
  content: string;
  created_at: string | Date;
};

const SELECT_KNOWLEDGE_ENTRIES_BY_PROJECT_ID = `SELECT id, project_id, title, content, created_at
FROM public.knowledge_entries
WHERE project_id = $1
ORDER BY created_at ASC, id ASC`;

const INSERT_KNOWLEDGE_ENTRY = `INSERT INTO public.knowledge_entries (id, project_id, title, content, created_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, project_id, title, content, created_at`;

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

function mapKnowledgeEntryRow(
  row: KnowledgeEntryRow,
): KnowledgeEntry {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    content: row.content,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

function normalizeProjectId(projectId: string): string {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw new Error("Knowledge server repository requires a non-empty projectId.");
  }

  return normalizedProjectId;
}

function normalizeTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error("Knowledge server repository requires a non-empty title.");
  }

  return normalizedTitle;
}

function normalizeContent(content: string): string {
  const normalizedContent = content.trim();

  if (!normalizedContent) {
    throw new Error("Knowledge server repository requires non-empty content.");
  }

  return normalizedContent;
}

export async function getServerKnowledgeEntriesByProjectId(
  projectId: string,
): Promise<KnowledgeEntry[]> {
  const sql = neon(getDatabaseUrl());
  const rows = await sql.query(
    SELECT_KNOWLEDGE_ENTRIES_BY_PROJECT_ID,
    [projectId],
  ) as KnowledgeEntryRow[];

  return rows.map((row) => mapKnowledgeEntryRow(row));
}

export async function createServerKnowledgeEntry(input: {
  projectId: string;
  title: string;
  content: string;
}): Promise<KnowledgeEntry> {
  const projectId = normalizeProjectId(input.projectId);
  const title = normalizeTitle(input.title);
  const content = normalizeContent(input.content);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const sql = neon(getDatabaseUrl());
  const rows = await sql.query(
    INSERT_KNOWLEDGE_ENTRY,
    [id, projectId, title, content, createdAt],
  ) as KnowledgeEntryRow[];
  const row = rows[0];

  if (!row) {
    throw new Error(
      "Knowledge server repository did not return the created knowledge entry.",
    );
  }

  return mapKnowledgeEntryRow(row);
}
