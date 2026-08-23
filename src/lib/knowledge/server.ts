import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { getServerProjectById } from "../project/server";
import type { KnowledgeEntry } from "./types";

type KnowledgeRepositoryErrorCode =
  | "project-not-found"
  | "source-read-failed"
  | "source-write-failed";

type KnowledgeRepositoryError = Error & {
  code: KnowledgeRepositoryErrorCode;
};

type ProjectForeignKeyError = Error & {
  code: "23503";
  constraint: string;
};

const KNOWLEDGE_STORE_ROOT = "C:\\SPS_OS_WORK\\.sps-meta";
const KNOWLEDGE_STORE_FILE_NAME = "entries.jsonl";

const localKnowledgeEntriesByProjectId = new Map<string, KnowledgeEntry[]>();
const resolvedKnowledgeStoreRootsByProjectId = new Map<string, string>();

function createKnowledgeRepositoryError(
  code: KnowledgeRepositoryErrorCode,
  message: string,
): KnowledgeRepositoryError {
  const error = new Error(message) as KnowledgeRepositoryError;
  error.code = code;

  return error;
}

function createProjectForeignKeyError(): ProjectForeignKeyError {
  const error = new Error(
    "Knowledge repository requires an existing project.",
  ) as ProjectForeignKeyError;
  error.code = "23503";
  error.constraint = "knowledge_entries_project_id_fkey";

  return error;
}

function normalizeProjectId(projectId: string): string {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw createKnowledgeRepositoryError(
      "project-not-found",
      "Knowledge repository requires a non-empty projectId.",
    );
  }

  return normalizedProjectId;
}

function normalizeTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw createKnowledgeRepositoryError(
      "source-write-failed",
      "Knowledge repository requires a non-empty title.",
    );
  }

  return normalizedTitle;
}

function normalizeContent(content: string): string {
  const normalizedContent = content.trim();

  if (!normalizedContent) {
    throw createKnowledgeRepositoryError(
      "source-write-failed",
      "Knowledge repository requires non-empty content.",
    );
  }

  return normalizedContent;
}

function slugifyMetadataRootSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getShortProjectId(projectId: string): string {
  return projectId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase();
}

function isKnowledgeEntry(value: unknown): value is KnowledgeEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<KnowledgeEntry>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.trim().length > 0 &&
    typeof candidate.projectId === "string" &&
    candidate.projectId.trim().length > 0 &&
    typeof candidate.title === "string" &&
    typeof candidate.content === "string" &&
    typeof candidate.createdAt === "string" &&
    candidate.createdAt.trim().length > 0
  );
}

function sortKnowledgeEntries(entries: KnowledgeEntry[]): KnowledgeEntry[] {
  return [...entries].sort(
    (left, right) =>
      left.createdAt.localeCompare(right.createdAt) ||
      left.id.localeCompare(right.id),
  );
}

function parseKnowledgeJsonl(content: string): KnowledgeEntry[] {
  const parsedEntries: KnowledgeEntry[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    try {
      const parsedLine = JSON.parse(trimmedLine) as unknown;

      if (isKnowledgeEntry(parsedLine)) {
        parsedEntries.push({
          id: parsedLine.id,
          projectId: parsedLine.projectId,
          title: parsedLine.title,
          content: parsedLine.content,
          createdAt: parsedLine.createdAt,
        });
      }
    } catch {
      continue;
    }
  }

  return sortKnowledgeEntries(parsedEntries);
}

function serializeKnowledgeJsonl(entries: KnowledgeEntry[]): string {
  if (entries.length === 0) {
    return "";
  }

  return `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`;
}

function buildKnowledgeStoreRoot(project: {
  id: string;
  name: string;
  workingDirectory?: string;
}): string {
  const workingDirectorySlug = basename(project.workingDirectory ?? "").trim();
  const readableRootSegment = slugifyMetadataRootSegment(
    workingDirectorySlug || project.name,
  );
  const shortProjectId = getShortProjectId(project.id);

  if (!shortProjectId) {
    return join(KNOWLEDGE_STORE_ROOT, readableRootSegment || project.id);
  }

  return join(
    KNOWLEDGE_STORE_ROOT,
    `${readableRootSegment || "project"}--${shortProjectId}`,
  );
}

async function resolveKnowledgeStoreRoot(
  projectId: string,
  errorCode: Exclude<KnowledgeRepositoryErrorCode, "project-not-found">,
): Promise<string> {
  const cachedRoot = resolvedKnowledgeStoreRootsByProjectId.get(projectId);

  if (cachedRoot) {
    return cachedRoot;
  }

  try {
    const project = await getServerProjectById(projectId);

    if (!project) {
      throw createProjectForeignKeyError();
    }

    const resolvedRoot = buildKnowledgeStoreRoot(project);
    resolvedKnowledgeStoreRootsByProjectId.set(projectId, resolvedRoot);

    return resolvedRoot;
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const errorCodeValue = (error as { code?: string }).code;

      if (errorCodeValue === "23503") {
        throw error;
      }
    }

    throw createKnowledgeRepositoryError(
      errorCode,
      "Knowledge repository could not resolve the project.",
    );
  }
}

async function getKnowledgeStoreDirectory(projectId: string): Promise<string> {
  return join(await resolveKnowledgeStoreRoot(projectId, "source-read-failed"), "knowledge");
}

async function getKnowledgeStorePath(projectId: string): Promise<string> {
  return join(await getKnowledgeStoreDirectory(projectId), KNOWLEDGE_STORE_FILE_NAME);
}

async function readFilesystemKnowledgeEntries(
  projectId: string,
): Promise<KnowledgeEntry[]> {
  const knowledgeStorePath = await getKnowledgeStorePath(projectId);

  try {
    const content = await readFile(knowledgeStorePath, "utf8");
    const parsedEntries = parseKnowledgeJsonl(content);

    localKnowledgeEntriesByProjectId.set(projectId, parsedEntries);

    return parsedEntries;
  } catch (error) {
    const cachedEntries = localKnowledgeEntriesByProjectId.get(projectId);

    if (cachedEntries) {
      return cachedEntries;
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: string }).code === "ENOENT"
    ) {
      return [];
    }

    throw createKnowledgeRepositoryError(
      "source-read-failed",
      "Knowledge repository could not read the knowledge store.",
    );
  }
}

async function writeFilesystemKnowledgeEntries(
  projectId: string,
  entries: KnowledgeEntry[],
): Promise<void> {
  const knowledgeStoreDirectory = await getKnowledgeStoreDirectory(projectId);
  const knowledgeStorePath = await getKnowledgeStorePath(projectId);

  try {
    await mkdir(knowledgeStoreDirectory, { recursive: true });
    await writeFile(
      knowledgeStorePath,
      serializeKnowledgeJsonl(sortKnowledgeEntries(entries)),
      "utf8",
    );
    localKnowledgeEntriesByProjectId.set(projectId, sortKnowledgeEntries(entries));
  } catch {
    throw createKnowledgeRepositoryError(
      "source-write-failed",
      "Knowledge repository could not write the knowledge store.",
    );
  }
}

export async function getServerKnowledgeEntriesByProjectId(
  projectId: string,
): Promise<KnowledgeEntry[]> {
  const normalizedProjectId = normalizeProjectId(projectId);

  return readFilesystemKnowledgeEntries(normalizedProjectId);
}

export async function createServerKnowledgeEntry(input: {
  projectId: string;
  title: string;
  content: string;
}): Promise<KnowledgeEntry> {
  const projectId = normalizeProjectId(input.projectId);
  const title = normalizeTitle(input.title);
  const content = normalizeContent(input.content);
  const knowledgeEntry: KnowledgeEntry = {
    id: crypto.randomUUID(),
    projectId,
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  const existingKnowledgeEntries = await readFilesystemKnowledgeEntries(projectId);

  await writeFilesystemKnowledgeEntries(projectId, [
    ...existingKnowledgeEntries,
    knowledgeEntry,
  ]);

  return knowledgeEntry;
}
