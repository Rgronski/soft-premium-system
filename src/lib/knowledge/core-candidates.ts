import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { getServerProjectById } from "../project/server";
import type { KnowledgeEntry } from "./types";

type CoreCandidateRepositoryErrorCode =
  | "project-not-found"
  | "source-read-failed"
  | "source-write-failed";

type CoreCandidateRepositoryError = Error & {
  code: CoreCandidateRepositoryErrorCode;
};

type ProjectForeignKeyError = Error & {
  code: "23503";
  constraint: string;
};

export type CoreDoctrineCandidateStatus = "candidate";

export type CoreDoctrineCandidateEntry = {
  id: string;
  projectId: string;
  sourceKnowledgeEntryId: string;
  title: string;
  content: string;
  reason: string;
  status: CoreDoctrineCandidateStatus;
  createdAt: string;
};

const CORE_CANDIDATE_STORE_ROOT = "C:\\SPS_OS_WORK\\.sps-meta";
const CORE_CANDIDATE_STORE_FILE_NAME = "core-candidates.jsonl";

const localCoreCandidatesByProjectId = new Map<string, CoreDoctrineCandidateEntry[]>();
const resolvedCoreCandidateStoreRootsByProjectId = new Map<string, string>();

function createCoreCandidateRepositoryError(
  code: CoreCandidateRepositoryErrorCode,
  message: string,
): CoreCandidateRepositoryError {
  const error = new Error(message) as CoreCandidateRepositoryError;
  error.code = code;

  return error;
}

function createProjectForeignKeyError(): ProjectForeignKeyError {
  const error = new Error(
    "Core candidate repository requires an existing project.",
  ) as ProjectForeignKeyError;
  error.code = "23503";
  error.constraint = "core_candidates_project_id_fkey";

  return error;
}

function normalizeProjectId(projectId: string): string {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw createCoreCandidateRepositoryError(
      "project-not-found",
      "Core candidate repository requires a non-empty projectId.",
    );
  }

  return normalizedProjectId;
}

function normalizeReason(reason: string): string {
  const normalizedReason = reason.trim();

  if (!normalizedReason) {
    throw createCoreCandidateRepositoryError(
      "source-write-failed",
      "Core candidate repository requires a non-empty reason.",
    );
  }

  return normalizedReason;
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

function isCoreDoctrineCandidateEntry(
  value: unknown,
): value is CoreDoctrineCandidateEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<CoreDoctrineCandidateEntry>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.trim().length > 0 &&
    typeof candidate.projectId === "string" &&
    candidate.projectId.trim().length > 0 &&
    typeof candidate.sourceKnowledgeEntryId === "string" &&
    candidate.sourceKnowledgeEntryId.trim().length > 0 &&
    typeof candidate.title === "string" &&
    typeof candidate.content === "string" &&
    typeof candidate.reason === "string" &&
    typeof candidate.status === "string" &&
    candidate.status === "candidate" &&
    typeof candidate.createdAt === "string" &&
    candidate.createdAt.trim().length > 0
  );
}

function sortCoreCandidates(
  entries: CoreDoctrineCandidateEntry[],
): CoreDoctrineCandidateEntry[] {
  return [...entries].sort(
    (left, right) =>
      left.createdAt.localeCompare(right.createdAt) ||
      left.id.localeCompare(right.id),
  );
}

function parseCoreCandidatesJsonl(
  content: string,
): CoreDoctrineCandidateEntry[] {
  const parsedEntries: CoreDoctrineCandidateEntry[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    try {
      const parsedLine = JSON.parse(trimmedLine) as unknown;

      if (isCoreDoctrineCandidateEntry(parsedLine)) {
        parsedEntries.push({
          id: parsedLine.id,
          projectId: parsedLine.projectId,
          sourceKnowledgeEntryId: parsedLine.sourceKnowledgeEntryId,
          title: parsedLine.title,
          content: parsedLine.content,
          reason: parsedLine.reason,
          status: parsedLine.status,
          createdAt: parsedLine.createdAt,
        });
      }
    } catch {
      continue;
    }
  }

  return sortCoreCandidates(parsedEntries);
}

function serializeCoreCandidatesJsonl(
  entries: CoreDoctrineCandidateEntry[],
): string {
  if (entries.length === 0) {
    return "";
  }

  return `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`;
}

function buildCoreCandidateStoreRoot(project: {
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
    return join(CORE_CANDIDATE_STORE_ROOT, readableRootSegment || project.id);
  }

  return join(
    CORE_CANDIDATE_STORE_ROOT,
    `${readableRootSegment || "project"}--${shortProjectId}`,
  );
}

async function resolveCoreCandidateStoreRoot(
  projectId: string,
  errorCode: Exclude<CoreCandidateRepositoryErrorCode, "project-not-found">,
): Promise<string> {
  const cachedRoot = resolvedCoreCandidateStoreRootsByProjectId.get(projectId);

  if (cachedRoot) {
    return cachedRoot;
  }

  try {
    const project = await getServerProjectById(projectId);

    if (!project) {
      throw createProjectForeignKeyError();
    }

    const resolvedRoot = buildCoreCandidateStoreRoot(project);
    resolvedCoreCandidateStoreRootsByProjectId.set(projectId, resolvedRoot);

    return resolvedRoot;
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const errorCodeValue = (error as { code?: string }).code;

      if (errorCodeValue === "23503") {
        throw error;
      }
    }

    throw createCoreCandidateRepositoryError(
      errorCode,
      "Core candidate repository could not resolve the project.",
    );
  }
}

async function getCoreCandidateStoreDirectory(
  projectId: string,
): Promise<string> {
  return join(
    await resolveCoreCandidateStoreRoot(projectId, "source-read-failed"),
    "knowledge",
  );
}

async function getCoreCandidateStorePath(projectId: string): Promise<string> {
  return join(
    await getCoreCandidateStoreDirectory(projectId),
    CORE_CANDIDATE_STORE_FILE_NAME,
  );
}

async function readFilesystemCoreCandidates(
  projectId: string,
): Promise<CoreDoctrineCandidateEntry[]> {
  const coreCandidateStorePath = await getCoreCandidateStorePath(projectId);

  try {
    const content = await readFile(coreCandidateStorePath, "utf8");
    const parsedEntries = parseCoreCandidatesJsonl(content);

    localCoreCandidatesByProjectId.set(projectId, parsedEntries);

    return parsedEntries;
  } catch (error) {
    const cachedEntries = localCoreCandidatesByProjectId.get(projectId);

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

    throw createCoreCandidateRepositoryError(
      "source-read-failed",
      "Core candidate repository could not read the candidate store.",
    );
  }
}

async function writeFilesystemCoreCandidates(
  projectId: string,
  entries: CoreDoctrineCandidateEntry[],
): Promise<void> {
  const coreCandidateStoreDirectory = await getCoreCandidateStoreDirectory(
    projectId,
  );
  const coreCandidateStorePath = await getCoreCandidateStorePath(projectId);

  try {
    await mkdir(coreCandidateStoreDirectory, { recursive: true });
    await writeFile(
      coreCandidateStorePath,
      serializeCoreCandidatesJsonl(sortCoreCandidates(entries)),
      "utf8",
    );
    localCoreCandidatesByProjectId.set(
      projectId,
      sortCoreCandidates(entries),
    );
  } catch {
    throw createCoreCandidateRepositoryError(
      "source-write-failed",
      "Core candidate repository could not write the candidate store.",
    );
  }
}

export async function getCoreDoctrineCandidatesByProjectId(
  projectId: string,
): Promise<CoreDoctrineCandidateEntry[]> {
  const normalizedProjectId = normalizeProjectId(projectId);

  return readFilesystemCoreCandidates(normalizedProjectId);
}

export async function createCoreDoctrineCandidateFromKnowledgeEntry(input: {
  projectId: string;
  knowledgeEntry: KnowledgeEntry;
  reason: string;
}): Promise<CoreDoctrineCandidateEntry> {
  const projectId = normalizeProjectId(input.projectId);
  const reason = normalizeReason(input.reason);
  const candidateEntry: CoreDoctrineCandidateEntry = {
    id: crypto.randomUUID(),
    projectId,
    sourceKnowledgeEntryId: input.knowledgeEntry.id,
    title: input.knowledgeEntry.title,
    content: input.knowledgeEntry.content,
    reason,
    status: "candidate",
    createdAt: new Date().toISOString(),
  };
  const existingCoreCandidates =
    await readFilesystemCoreCandidates(projectId);

  await writeFilesystemCoreCandidates(projectId, [
    ...existingCoreCandidates,
    candidateEntry,
  ]);

  return candidateEntry;
}
