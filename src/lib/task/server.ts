import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { join } from "node:path";
import { getServerProjectById } from "../project/server";
import type { Task } from "./types";

type TaskRepositoryErrorCode =
  | "project-not-found"
  | "source-read-failed"
  | "source-write-failed";

type TaskRepositoryError = Error & {
  code: TaskRepositoryErrorCode;
};

const TASK_STORE_ROOT = "C:\\SPS_OS_WORK\\.sps-meta";
const TASK_STORE_FILE_NAME = "open.jsonl";

const localTasksByProjectId = new Map<string, Task[]>();
const resolvedTaskStoreRootsByProjectId = new Map<string, string>();

function createTaskRepositoryError(
  code: TaskRepositoryErrorCode,
  message: string,
): TaskRepositoryError {
  const error = new Error(message) as TaskRepositoryError;
  error.code = code;

  return error;
}

function normalizeProjectId(projectId: string): string {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw createTaskRepositoryError(
      "project-not-found",
      "Task repository requires a non-empty projectId.",
    );
  }

  return normalizedProjectId;
}

function normalizeTaskTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw createTaskRepositoryError(
      "source-write-failed",
      "Task repository requires a non-empty title.",
    );
  }

  return normalizedTitle;
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

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Task>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.trim().length > 0 &&
    typeof candidate.projectId === "string" &&
    candidate.projectId.trim().length > 0 &&
    typeof candidate.title === "string" &&
    typeof candidate.createdAt === "string" &&
    candidate.createdAt.trim().length > 0
  );
}

function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (left, right) =>
      left.createdAt.localeCompare(right.createdAt) ||
      left.id.localeCompare(right.id),
  );
}

function parseTaskJsonl(content: string): Task[] {
  const parsedTasks: Task[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    try {
      const parsedLine = JSON.parse(trimmedLine) as unknown;

      if (isTask(parsedLine)) {
        parsedTasks.push({
          id: parsedLine.id,
          projectId: parsedLine.projectId,
          title: parsedLine.title,
          createdAt: parsedLine.createdAt,
        });
      }
    } catch {
      continue;
    }
  }

  return sortTasks(parsedTasks);
}

function serializeTaskJsonl(tasks: Task[]): string {
  if (tasks.length === 0) {
    return "";
  }

  return `${tasks.map((task) => JSON.stringify(task)).join("\n")}\n`;
}

function buildCanonicalTaskStoreRoot(project: {
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
    return join(TASK_STORE_ROOT, readableRootSegment || project.id);
  }

  return join(TASK_STORE_ROOT, `${readableRootSegment || "project"}--${shortProjectId}`);
}

async function resolveTaskStoreRoots(projectId: string): Promise<string[]> {
  const cachedRoot = resolvedTaskStoreRootsByProjectId.get(projectId);

  if (cachedRoot) {
    const legacyRoot = join(TASK_STORE_ROOT, projectId);

    return cachedRoot === legacyRoot
      ? [legacyRoot]
      : [cachedRoot, legacyRoot];
  }

  const serverProject = await getServerProjectById(projectId);

  if (!serverProject) {
    const legacyRoot = join(TASK_STORE_ROOT, projectId);
    resolvedTaskStoreRootsByProjectId.set(projectId, legacyRoot);

    return [legacyRoot];
  }

  const canonicalRoot = buildCanonicalTaskStoreRoot(serverProject);
  const legacyRoot = join(TASK_STORE_ROOT, projectId);
  const roots =
    canonicalRoot === legacyRoot ? [canonicalRoot] : [canonicalRoot, legacyRoot];

  resolvedTaskStoreRootsByProjectId.set(projectId, canonicalRoot);

  return roots;
}

async function getTaskStoreDirectory(projectId: string): Promise<string> {
  const [taskStoreRoot] = await resolveTaskStoreRoots(projectId);

  return join(taskStoreRoot, "tasks");
}

async function getTaskStorePath(projectId: string): Promise<string> {
  return join(await getTaskStoreDirectory(projectId), TASK_STORE_FILE_NAME);
}

async function readFilesystemTasks(projectId: string): Promise<Task[]> {
  const taskStorePaths = (await resolveTaskStoreRoots(projectId)).map((root) =>
    join(root, "tasks", TASK_STORE_FILE_NAME),
  );
  const lastTaskStorePath = taskStorePaths[taskStorePaths.length - 1];

  for (const taskStorePath of taskStorePaths) {
    try {
      const content = await readFile(taskStorePath, "utf8");
      const parsedTasks = parseTaskJsonl(content);

      if (parsedTasks.length === 0 && taskStorePath !== lastTaskStorePath) {
        continue;
      }

      localTasksByProjectId.set(projectId, parsedTasks);

      return parsedTasks;
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as { code?: string }).code === "ENOENT"
      ) {
        continue;
      }

      const cachedTasks = localTasksByProjectId.get(projectId);

      if (cachedTasks) {
        return cachedTasks;
      }

      throw createTaskRepositoryError(
        "source-read-failed",
        "Task repository could not read the task store.",
      );
    }
  }

  const cachedTasks = localTasksByProjectId.get(projectId);

  return cachedTasks ?? [];
}

async function writeFilesystemTasks(
  projectId: string,
  tasks: Task[],
): Promise<void> {
  const taskStoreDirectory = await getTaskStoreDirectory(projectId);
  const taskStorePath = await getTaskStorePath(projectId);

  try {
    await mkdir(taskStoreDirectory, { recursive: true });
    await writeFile(taskStorePath, serializeTaskJsonl(sortTasks(tasks)), "utf8");
    localTasksByProjectId.set(projectId, sortTasks(tasks));
  } catch {
    throw createTaskRepositoryError(
      "source-write-failed",
      "Task repository could not write the task store.",
    );
  }
}

export async function getServerTasksByProjectId(
  projectId: string,
): Promise<Task[]> {
  const normalizedProjectId = normalizeProjectId(projectId);

  return readFilesystemTasks(normalizedProjectId);
}

export async function createServerTask(input: {
  projectId: string;
  title: string;
}): Promise<Task> {
  const projectId = normalizeProjectId(input.projectId);
  const title = normalizeTaskTitle(input.title);
  const task: Task = {
    id: crypto.randomUUID(),
    projectId,
    title,
    createdAt: new Date().toISOString(),
  };
  const existingTasks = await readFilesystemTasks(projectId);

  await writeFilesystemTasks(projectId, [...existingTasks, task]);

  return task;
}
