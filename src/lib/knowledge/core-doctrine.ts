import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

type CoreDoctrineRepositoryErrorCode =
  | "source-read-failed"
  | "source-write-failed";

type CoreDoctrineRepositoryError = Error & {
  code: CoreDoctrineRepositoryErrorCode;
};

export type CoreDoctrineEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export const CORE_DOCTRINE_STORE_ROOT = "C:\\SPS_OS_WORK\\.sps-meta\\core";
export const CORE_DOCTRINE_STORE_FILE_NAME = "doctrine.jsonl";

export const CORE_DOCTRINE_SEED: CoreDoctrineEntry[] = [
  {
    id: "core-doctrine-001",
    title: "Project Brain is the SSOT",
    content: "Project Brain stays authoritative for project knowledge and state.",
    createdAt: "2026-08-23T00:00:00.000Z",
  },
  {
    id: "core-doctrine-002",
    title: "Product Owner sets priorities",
    content: "The Product Owner approves milestones and decides what comes next.",
    createdAt: "2026-08-23T00:00:01.000Z",
  },
  {
    id: "core-doctrine-003",
    title: "Chief Architect protects scope",
    content: "The Chief Architect defines scope, guards consistency, and reviews handoffs.",
    createdAt: "2026-08-23T00:00:02.000Z",
  },
  {
    id: "core-doctrine-004",
    title: "Codex makes the smallest safe patch",
    content: "Implementation should be minimal, local, and fully verifiable.",
    createdAt: "2026-08-23T00:00:03.000Z",
  },
  {
    id: "core-doctrine-005",
    title: "Diagnose before implementation",
    content: "No change should begin before the likely cause is known.",
    createdAt: "2026-08-23T00:00:04.000Z",
  },
  {
    id: "core-doctrine-006",
    title: "Keep SPS metadata outside client repos",
    content: "SPS-owned metadata must stay in the sidecar filesystem root, not in client source.",
    createdAt: "2026-08-23T00:00:05.000Z",
  },
  {
    id: "core-doctrine-007",
    title: "Park ideas until decided",
    content: "Potential scope should be parked until the Product Owner chooses it.",
    createdAt: "2026-08-23T00:00:06.000Z",
  },
  {
    id: "core-doctrine-008",
    title: "Do not expand scope without approval",
    content: "New capabilities stay out of the active milestone until explicitly accepted.",
    createdAt: "2026-08-23T00:00:07.000Z",
  },
];

const localCoreDoctrineEntries = new Map<string, CoreDoctrineEntry[]>();

function createCoreDoctrineRepositoryError(
  code: CoreDoctrineRepositoryErrorCode,
  message: string,
): CoreDoctrineRepositoryError {
  const error = new Error(message) as CoreDoctrineRepositoryError;
  error.code = code;

  return error;
}

function normalizeTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw createCoreDoctrineRepositoryError(
      "source-write-failed",
      "Core doctrine repository requires a non-empty title.",
    );
  }

  return normalizedTitle;
}

function normalizeContent(content: string): string {
  const normalizedContent = content.trim();

  if (!normalizedContent) {
    throw createCoreDoctrineRepositoryError(
      "source-write-failed",
      "Core doctrine repository requires non-empty content.",
    );
  }

  return normalizedContent;
}

function isCoreDoctrineEntry(value: unknown): value is CoreDoctrineEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<CoreDoctrineEntry>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.trim().length > 0 &&
    typeof candidate.title === "string" &&
    candidate.title.trim().length > 0 &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0 &&
    typeof candidate.createdAt === "string" &&
    candidate.createdAt.trim().length > 0
  );
}

function sortCoreDoctrineEntries(
  entries: CoreDoctrineEntry[],
): CoreDoctrineEntry[] {
  return [...entries].sort(
    (left, right) =>
      left.createdAt.localeCompare(right.createdAt) ||
      left.id.localeCompare(right.id),
  );
}

function parseCoreDoctrineJsonl(content: string): CoreDoctrineEntry[] {
  const parsedEntries: CoreDoctrineEntry[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    try {
      const parsedLine = JSON.parse(trimmedLine) as unknown;

      if (isCoreDoctrineEntry(parsedLine)) {
        parsedEntries.push({
          id: parsedLine.id,
          title: parsedLine.title,
          content: parsedLine.content,
          createdAt: parsedLine.createdAt,
        });
      }
    } catch {
      continue;
    }
  }

  return sortCoreDoctrineEntries(parsedEntries);
}

function serializeCoreDoctrineJsonl(entries: CoreDoctrineEntry[]): string {
  if (entries.length === 0) {
    return "";
  }

  return `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`;
}

function getCoreDoctrineStorePath(): string {
  return join(CORE_DOCTRINE_STORE_ROOT, CORE_DOCTRINE_STORE_FILE_NAME);
}

async function readFilesystemCoreDoctrineEntries(): Promise<CoreDoctrineEntry[]> {
  const coreDoctrineStorePath = getCoreDoctrineStorePath();

  try {
    const content = await readFile(coreDoctrineStorePath, "utf8");
    const parsedEntries = parseCoreDoctrineJsonl(content);

    localCoreDoctrineEntries.set(coreDoctrineStorePath, parsedEntries);

    return parsedEntries;
  } catch (error) {
    const cachedEntries = localCoreDoctrineEntries.get(coreDoctrineStorePath);

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

    throw createCoreDoctrineRepositoryError(
      "source-read-failed",
      "Core doctrine repository could not read the doctrine store.",
    );
  }
}

async function writeFilesystemCoreDoctrineEntries(
  entries: CoreDoctrineEntry[],
): Promise<void> {
  const coreDoctrineStorePath = getCoreDoctrineStorePath();

  try {
    await mkdir(CORE_DOCTRINE_STORE_ROOT, { recursive: true });
    await writeFile(
      coreDoctrineStorePath,
      serializeCoreDoctrineJsonl(sortCoreDoctrineEntries(entries)),
      "utf8",
    );
    localCoreDoctrineEntries.set(
      coreDoctrineStorePath,
      sortCoreDoctrineEntries(entries),
    );
  } catch {
    throw createCoreDoctrineRepositoryError(
      "source-write-failed",
      "Core doctrine repository could not write the doctrine store.",
    );
  }
}

export async function getCoreDoctrineEntries(): Promise<CoreDoctrineEntry[]> {
  return readFilesystemCoreDoctrineEntries();
}

export async function createCoreDoctrineEntry(input: {
  title: string;
  content: string;
}): Promise<CoreDoctrineEntry> {
  const title = normalizeTitle(input.title);
  const content = normalizeContent(input.content);
  const coreDoctrineEntry: CoreDoctrineEntry = {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  const existingCoreDoctrineEntries = await readFilesystemCoreDoctrineEntries();

  await writeFilesystemCoreDoctrineEntries([
    ...existingCoreDoctrineEntries,
    coreDoctrineEntry,
  ]);

  return coreDoctrineEntry;
}

export async function ensureCoreDoctrineSeeded(
  seedEntries: CoreDoctrineEntry[] = CORE_DOCTRINE_SEED,
): Promise<CoreDoctrineEntry[]> {
  const existingEntries = await readFilesystemCoreDoctrineEntries();

  if (existingEntries.length > 0) {
    return existingEntries;
  }

  const normalizedSeedEntries = sortCoreDoctrineEntries(seedEntries);

  await writeFilesystemCoreDoctrineEntries(normalizedSeedEntries);

  return normalizedSeedEntries;
}
