import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

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

function getShortProjectId(projectId: string): string {
  return projectId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase();
}

async function resolveTaskStoreRoot(projectId: string): Promise<string> {
  const cachedRoot = resolvedTaskStoreRootsByProjectId.get(projectId);

  if (cachedRoot) {
    return cachedRoot;
  }

  const serverProject = await getServerProjectById(projectId);

  if (!serverProject) {
    const fallbackRoot = join(TASK_STORE_ROOT, projectId);
    resolvedTaskStoreRootsByProjectId.set(projectId, fallbackRoot);

    return fallbackRoot;
  }

  const workingDirectorySlug = basename(
    serverProject.workingDirectory ?? "",
  ).trim();
  const readableRootSegment = slugifyMetadataRootSegment(
    workingDirectorySlug || serverProject.name,
  );
  const shortProjectId = getShortProjectId(serverProject.id);
  const rootSegment = shortProjectId
    ? `${readableRootSegment || "project"}--${shortProjectId}`
    : readableRootSegment || projectId;
  const resolvedRoot = join(TASK_STORE_ROOT, rootSegment);

  resolvedTaskStoreRootsByProjectId.set(projectId, resolvedRoot);

  return resolvedRoot;
}

async function getTaskStoreDirectory(projectId: string): Promise<string> {
  return join(await resolveTaskStoreRoot(projectId), "tasks");
}

async function getTaskStorePath(projectId: string): Promise<string> {
  return join(await getTaskStoreDirectory(projectId), TASK_STORE_FILE_NAME);
}

async function readFilesystemTasks(projectId: string): Promise<Task[]> {
  const taskStorePath = await getTaskStorePath(projectId);

  try {
    const content = await readFile(taskStorePath, "utf8");
    const parsedTasks = parseTaskJsonl(content);

    localTasksByProjectId.set(projectId, parsedTasks);

    return parsedTasks;
  } catch (error) {
    const cachedTasks = localTasksByProjectId.get(projectId);

    if (cachedTasks) {
      return cachedTasks;
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: string }).code === "ENOENT"
    ) {
      return [];
    }

    throw createTaskRepositoryError(
      "source-read-failed",
      "Task repository could not read the task store.",
    );
  }
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
