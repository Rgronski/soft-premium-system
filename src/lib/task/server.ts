import "server-only";

import { neon } from "@neondatabase/serverless";

import type { Task } from "./types";

type TaskRow = {
  id: string;
  project_id: string;
  title: string;
  created_at: string | Date;
};

const SELECT_TASKS_BY_PROJECT_ID = `SELECT id, project_id, title, created_at
FROM public.tasks
WHERE project_id = $1
ORDER BY created_at ASC, id ASC`;

const INSERT_TASK = `INSERT INTO public.tasks (id, project_id, title, created_at)
VALUES ($1, $2, $3, $4)
RETURNING id, project_id, title, created_at`;

const localTasksByProjectId = new Map<string, Task[]>();

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

function mapTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

function normalizeProjectId(projectId: string): string {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw new Error("Task server repository requires a non-empty projectId.");
  }

  return normalizedProjectId;
}

function normalizeTaskTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error("Task server repository requires a non-empty title.");
  }

  return normalizedTitle;
}

function getLocalTasksByProjectId(projectId: string): Task[] {
  return localTasksByProjectId.get(projectId) ?? [];
}

function storeLocalTasksByProjectId(
  projectId: string,
  tasks: Task[],
): Task[] {
  localTasksByProjectId.set(projectId, tasks);

  return tasks;
}

function appendLocalTask(task: Task): Task {
  const existingTasks = getLocalTasksByProjectId(task.projectId);

  localTasksByProjectId.set(task.projectId, [...existingTasks, task]);

  return task;
}

export async function getServerTasksByProjectId(
  projectId: string,
): Promise<Task[]> {
  const normalizedProjectId = normalizeProjectId(projectId);
  const localTasks = getLocalTasksByProjectId(normalizedProjectId);

  if (localTasks.length > 0) {
    return localTasks;
  }

  try {
    const sql = neon(getDatabaseUrl());
    const rows = (await sql.query(
      SELECT_TASKS_BY_PROJECT_ID,
      [normalizedProjectId],
    )) as TaskRow[];
    const tasks = rows.map((row) => mapTaskRow(row));

    return storeLocalTasksByProjectId(normalizedProjectId, tasks);
  } catch {
    return getLocalTasksByProjectId(normalizedProjectId);
  }
}

export async function createServerTask(input: {
  projectId: string;
  title: string;
}): Promise<Task> {
  const projectId = normalizeProjectId(input.projectId);
  const title = normalizeTaskTitle(input.title);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const fallbackTask: Task = {
    id,
    projectId,
    title,
    createdAt,
  };

  try {
    const sql = neon(getDatabaseUrl());
    const rows = (await sql.query(
      INSERT_TASK,
      [id, projectId, title, createdAt],
    )) as TaskRow[];
    const row = rows[0];

    if (!row) {
      return appendLocalTask(fallbackTask);
    }

    return appendLocalTask(mapTaskRow(row));
  } catch {
    return appendLocalTask(fallbackTask);
  }
}
