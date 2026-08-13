import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const mkdirMock = vi.fn();
const writeFileMock = vi.fn();
const neonMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  mkdir: mkdirMock,
  writeFile: writeFileMock,
}));

vi.mock("@neondatabase/serverless", () => ({
  neon: neonMock,
}));

type ProjectRow = {
  id: string;
  name: string;
  repository_url: string | null;
  created_at: string;
};

type TaskRow = {
  id: string;
  project_id: string;
  title: string;
  created_at: string;
};

type DbState = {
  projects: Map<string, ProjectRow>;
  tasks: Map<string, TaskRow[]>;
};

const SELECT_PROJECT_BY_ID = `SELECT id, name, repository_url, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`;

const INSERT_PROJECT = `INSERT INTO public.projects (id, name, repository_url, created_at)
VALUES ($1, $2, $3, $4)
RETURNING id, name, repository_url, created_at`;

const SELECT_TASKS_BY_PROJECT_ID = `SELECT id, project_id, title, created_at
FROM public.tasks
WHERE project_id = $1
ORDER BY created_at ASC, id ASC`;

const INSERT_TASK = `INSERT INTO public.tasks (id, project_id, title, created_at)
VALUES ($1, $2, $3, $4)
RETURNING id, project_id, title, created_at`;

const originalDatabaseUrl = process.env.DATABASE_URL;

function createDbState(): DbState {
  return {
    projects: new Map(),
    tasks: new Map(),
  };
}

function createQueryMock(state: DbState) {
  return vi.fn(async (sql: string, params: unknown[]) => {
    if (sql === SELECT_PROJECT_BY_ID) {
      const [projectId] = params as [string];
      const project = state.projects.get(projectId);

      return project ? [project] : [];
    }

    if (sql === INSERT_PROJECT) {
      const [projectId, name, repositoryUrl, createdAt] = params as [
        string,
        string,
        string | null,
        string,
      ];
      const existingProject = state.projects.get(projectId);

      if (existingProject) {
        return [existingProject];
      }

      const project = {
        id: projectId,
        name,
        repository_url: repositoryUrl,
        created_at: createdAt,
      };
      state.projects.set(projectId, project);

      return [project];
    }

    if (sql === SELECT_TASKS_BY_PROJECT_ID) {
      const [projectId] = params as [string];
      return [...(state.tasks.get(projectId) ?? [])];
    }

    if (sql === INSERT_TASK) {
      const [taskId, projectId, title, createdAt] =
        params as [string, string, string, string];

      if (!state.projects.has(projectId)) {
        const error = new Error("insert or update on table \"tasks\" violates foreign key constraint") as Error & {
          code?: string;
          constraint?: string;
        };
        error.code = "23503";
        error.constraint = "tasks_project_id_fkey";
        throw error;
      }

      const task = {
        id: taskId,
        project_id: projectId,
        title,
        created_at: createdAt,
      };
      const tasks = state.tasks.get(projectId) ?? [];
      state.tasks.set(projectId, [...tasks, task]);

      return [task];
    }

    throw new Error(`Unexpected SQL: ${sql}`);
  });
}

async function loadModules() {
  vi.resetModules();
  const projectServer = await import("./server");
  const taskServer = await import("../task/server");

  return {
    ...projectServer,
    ...taskServer,
  };
}

beforeEach(() => {
  process.env.DATABASE_URL = "postgresql://pooled-runtime-url";
  neonMock.mockReset();
  mkdirMock.mockReset();
  writeFileMock.mockReset();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-03T20:00:00.000Z"));
  vi.stubGlobal("crypto", {
    randomUUID: vi
      .fn()
      .mockImplementationOnce(() => "project-uuid")
      .mockImplementationOnce(() => "task-uuid"),
  });
});

afterEach(() => {
  if (typeof originalDatabaseUrl === "string") {
    process.env.DATABASE_URL = originalDatabaseUrl;
  } else {
    delete process.env.DATABASE_URL;
  }

  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("project-to-task server flow", () => {
  it("creates a project and then accepts a task for that fresh project", async () => {
    const state = createDbState();
    const queryMock = createQueryMock(state);
    neonMock.mockReturnValue({
      query: queryMock,
    });
    mkdirMock.mockResolvedValueOnce(undefined);

    const {
      createServerProject,
      createServerTask,
      getServerProjectById,
      getServerTasksByProjectId,
    } = await loadModules();

    const project = await createServerProject({
      id: "project-uuid",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
    });
    const task = await createServerTask({
      projectId: "project-uuid",
      title: "Kick off flow",
    });

    await expect(getServerProjectById("project-uuid")).resolves.toEqual(project);
    await expect(getServerTasksByProjectId("project-uuid")).resolves.toEqual([
      task,
    ]);
  });

  it("stores a fallback task locally when the task write fails", async () => {
    const state = createDbState();
    const queryMock = createQueryMock(state);
    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerTask, getServerTasksByProjectId } = await loadModules();

    const task = await createServerTask({
      projectId: "missing-project",
      title: "Kick off flow",
    });

    expect(task).toMatchObject({
      projectId: "missing-project",
      title: "Kick off flow",
    });
    await expect(getServerTasksByProjectId("missing-project")).resolves.toEqual([
      task,
    ]);
  });
});
