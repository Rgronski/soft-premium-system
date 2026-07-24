import { describe, expect, test, vi } from "vitest";

vi.mock("server-only", () => ({}), { virtual: true });

import {
  aiProjectContextFromSnapshot,
  composeProjectBrainSnapshot,
  getAiProjectContext,
} from "./engine";
import {
  createGetServerAiProjectContext,
  getServerAiProjectContext,
} from "./server";

vi.mock("../project/server", () => ({
  getServerProjectById: vi.fn(),
}));

vi.mock("../task/server", () => ({
  getServerTasksByProjectId: vi.fn(),
}));

vi.mock("../knowledge/server", () => ({
  getServerKnowledgeEntriesByProjectId: vi.fn(),
}));

class MemoryStorage {
  private store = new Map<string, string>();

  clear() {
    this.store.clear();
  }

  get length() {
    return this.store.size;
  }

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  key(index: number) {
    return [...this.store.keys()][index] ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

describe("Project Brain server entry point", () => {
  const storage = new MemoryStorage();

  test("returns available with empty tasks and knowledge collections", async () => {
    const getServerAiProjectContext = createGetServerAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-23T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockResolvedValue([]),
      getKnowledgeEntriesByProjectId: vi.fn().mockResolvedValue([]),
    });

    await expect(getServerAiProjectContext("project-1")).resolves.toEqual({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
  });

  test("returns available with mapped tasks and knowledge entries", async () => {
    const getServerAiProjectContext = createGetServerAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-23T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockResolvedValue([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-23T11:00:00.000Z",
        },
      ]),
      getKnowledgeEntriesByProjectId: vi.fn().mockResolvedValue([
        {
          id: "knowledge-1",
          projectId: "project-1",
          title: "Note",
          content: "Body",
          createdAt: "2026-07-23T12:00:00.000Z",
        },
      ]),
    });

    await expect(getServerAiProjectContext("project-1")).resolves.toEqual({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [{ id: "task-1", title: "First task" }],
        knowledgeEntries: [
          { id: "knowledge-1", title: "Note", content: "Body" },
        ],
      },
    });
  });

  test("returns project-not-found and skips tasks and knowledge readers", async () => {
    const getProjectById = vi.fn().mockResolvedValue(null);
    const getTasksByProjectId = vi.fn();
    const getKnowledgeEntriesByProjectId = vi.fn();
    const getServerAiProjectContext = createGetServerAiProjectContext({
      getProjectById,
      getTasksByProjectId,
      getKnowledgeEntriesByProjectId,
    });

    await expect(getServerAiProjectContext("missing-project")).resolves.toEqual({
      status: "project-not-found",
    });
    expect(getTasksByProjectId).not.toHaveBeenCalled();
    expect(getKnowledgeEntriesByProjectId).not.toHaveBeenCalled();
  });

  test("returns unavailable when the project reader throws", async () => {
    const getTasksByProjectId = vi.fn();
    const getKnowledgeEntriesByProjectId = vi.fn();
    const getServerAiProjectContext = createGetServerAiProjectContext({
      getProjectById: vi.fn().mockRejectedValue(new Error("db error")),
      getTasksByProjectId,
      getKnowledgeEntriesByProjectId,
    });

    await expect(getServerAiProjectContext("project-1")).resolves.toEqual({
      status: "unavailable",
    });
    expect(getTasksByProjectId).not.toHaveBeenCalled();
    expect(getKnowledgeEntriesByProjectId).not.toHaveBeenCalled();
  });

  test("returns unavailable when the tasks reader throws", async () => {
    const getServerAiProjectContext = createGetServerAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-23T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockRejectedValue(new Error("db error")),
      getKnowledgeEntriesByProjectId: vi.fn(),
    });

    await expect(getServerAiProjectContext("project-1")).resolves.toEqual({
      status: "unavailable",
    });
  });

  test("returns unavailable when the knowledge reader throws", async () => {
    const getServerAiProjectContext = createGetServerAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-23T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockResolvedValue([]),
      getKnowledgeEntriesByProjectId: vi.fn().mockRejectedValue(
        new Error("db error"),
      ),
    });

    await expect(getServerAiProjectContext("project-1")).resolves.toEqual({
      status: "unavailable",
    });
  });

  test("uses the shared snapshot composition to compute workflow state", () => {
    const snapshot = composeProjectBrainSnapshot({
      project: {
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-23T10:00:00.000Z",
      },
      tasks: [
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-23T11:00:00.000Z",
        },
      ],
      knowledgeEntries: [],
      projectId: "project-1",
    });

    expect(snapshot.workflowState).toEqual({
      phase: "project-brain-foundation",
      completedWork: [],
      activeWork: ["task-1"],
      blockers: [],
      warnings: [],
      progress: 0,
    });
  });

  test("returns the exact AiProjectContext shape from the shared mapping", () => {
    const snapshot = composeProjectBrainSnapshot({
      project: {
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-23T10:00:00.000Z",
      },
      tasks: [
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-23T11:00:00.000Z",
        },
      ],
      knowledgeEntries: [
        {
          id: "knowledge-1",
          projectId: "project-1",
          title: "Note",
          content: "Body",
          createdAt: "2026-07-23T12:00:00.000Z",
        },
      ],
      projectId: "project-1",
    });

    expect(aiProjectContextFromSnapshot(snapshot)).toEqual({
      projectId: "project-1",
      projectName: "Alpha",
      tasks: [{ id: "task-1", title: "First task" }],
      knowledgeEntries: [
        { id: "knowledge-1", title: "Note", content: "Body" },
      ],
    });
  });

  test("keeps the browser getAiProjectContext API synchronous and unchanged", () => {
    storage.clear();
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", storage);
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-23T10:00:00.000Z",
        },
      ]),
    );

    const result = getAiProjectContext("project-1");

    expect(result).toEqual({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    expect(result).not.toBeInstanceOf(Promise);
    vi.unstubAllGlobals();
  });

  test("exports the default server entry point", () => {
    expect(typeof getServerAiProjectContext).toBe("function");
  });
});
