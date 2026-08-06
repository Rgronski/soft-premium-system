import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const neonMock = vi.fn();

vi.mock("@neondatabase/serverless", () => ({
  neon: neonMock,
}));

const originalDatabaseUrl = process.env.DATABASE_URL;

async function loadServerModule() {
  vi.resetModules();
  return import("./server");
}

afterEach(() => {
  if (typeof originalDatabaseUrl === "string") {
    process.env.DATABASE_URL = originalDatabaseUrl;
  } else {
    delete process.env.DATABASE_URL;
  }

  neonMock.mockReset();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getServerTasksByProjectId", () => {
  it("uses DATABASE_URL, queries by projectId, and maps rows in SQL order", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "task-2",
        project_id: "project-1",
        title: "Second",
        created_at: "2026-07-23T10:11:13.000Z",
      },
      {
        id: "task-3",
        project_id: "project-1",
        title: "Third",
        created_at: "2026-07-23T10:11:13.000Z",
      },
    ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerTasksByProjectId } = await loadServerModule();
    const result = await getServerTasksByProjectId("project-1");

    expect(neonMock).toHaveBeenCalledWith("postgresql://pooled-runtime-url");
    expect(queryMock).toHaveBeenCalledWith(
      `SELECT id, project_id, title, created_at
FROM public.tasks
WHERE project_id = $1
ORDER BY created_at ASC, id ASC`,
      ["project-1"],
    );
    expect(result).toEqual([
      {
        id: "task-2",
        projectId: "project-1",
        title: "Second",
        createdAt: "2026-07-23T10:11:13.000Z",
      },
      {
        id: "task-3",
        projectId: "project-1",
        title: "Third",
        createdAt: "2026-07-23T10:11:13.000Z",
      },
    ]);
  });

  it("returns an empty array when the query returns no rows", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerTasksByProjectId } = await loadServerModule();

    await expect(getServerTasksByProjectId("project-1")).resolves.toEqual([]);
  });

  it("falls back locally when the database query fails during read", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockRejectedValue(new Error("SQL failed"));

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerTasksByProjectId } = await loadServerModule();

    await expect(getServerTasksByProjectId("project-1")).resolves.toEqual([]);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });
});

describe("task server local fallback", () => {
  it("stores and loads tasks locally when the database query fails", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T10:11:12.000Z"));
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "generated-task-id"),
    });

    const queryMock = vi.fn().mockRejectedValue(
      new Error("repository failure"),
    );

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerTask, getServerTasksByProjectId } =
      await loadServerModule();
    const createdTask = await createServerTask({
      projectId: "project-1",
      title: "Alpha task",
    });

    expect(createdTask).toEqual({
      id: "generated-task-id",
      projectId: "project-1",
      title: "Alpha task",
      createdAt: "2026-07-23T10:11:12.000Z",
    });
    await expect(getServerTasksByProjectId("project-1")).resolves.toEqual([
      createdTask,
    ]);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });
});

describe("createServerTask", () => {
  it("trims input, generates id and timestamp, inserts once, and returns a Task", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T10:11:12.000Z"));
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "generated-task-id"),
    });

    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "generated-task-id",
        project_id: "project-1",
        title: "Alpha task",
        created_at: "2026-07-23T10:11:12.000Z",
      },
    ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerTask } = await loadServerModule();
    const result = await createServerTask({
      projectId: "  project-1  ",
      title: "  Alpha task  ",
    });

    expect(queryMock).toHaveBeenCalledWith(
      `INSERT INTO public.tasks (id, project_id, title, created_at)
VALUES ($1, $2, $3, $4)
RETURNING id, project_id, title, created_at`,
      [
        "generated-task-id",
        "project-1",
        "Alpha task",
        "2026-07-23T10:11:12.000Z",
      ],
    );
    expect(result).toEqual({
      id: "generated-task-id",
      projectId: "project-1",
      title: "Alpha task",
      createdAt: "2026-07-23T10:11:12.000Z",
    });
  });

  it("rejects an empty projectId", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const { createServerTask } = await loadServerModule();

    await expect(
      createServerTask({
        projectId: "   ",
        title: "Task",
      }),
    ).rejects.toThrow("Task server repository requires a non-empty projectId.");
  });

  it("rejects an empty title", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const { createServerTask } = await loadServerModule();

    await expect(
      createServerTask({
        projectId: "project-1",
        title: "   ",
      }),
    ).rejects.toThrow("Task server repository requires a non-empty title.");
  });

  it("falls back locally when the database insert fails", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T10:11:12.000Z"));
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "generated-task-id"),
    });

    const queryMock = vi.fn().mockRejectedValue(
      new Error("insert or update on table \"tasks\" violates foreign key constraint"),
    );

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerTask } = await loadServerModule();

    await expect(
      createServerTask({
        projectId: "project-1",
        title: "Task",
      }),
    ).resolves.toEqual({
      id: "generated-task-id",
      projectId: "project-1",
      title: "Task",
      createdAt: "2026-07-23T10:11:12.000Z",
    });
    expect(queryMock).toHaveBeenCalledTimes(1);
  });
});
