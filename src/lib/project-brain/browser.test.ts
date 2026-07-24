import { beforeEach, describe, expect, it, vi } from "vitest";

const getProjectFromServerMock = vi.fn();
const getTasksFromServerMock = vi.fn();
const getKnowledgeEntriesFromServerMock = vi.fn();

vi.mock("../project/browser-server", () => ({
  getProjectFromServer: getProjectFromServerMock,
}));

vi.mock("../task/browser-server", () => ({
  getTasksFromServer: getTasksFromServerMock,
}));

vi.mock("../knowledge/browser-server", () => ({
  getKnowledgeEntriesFromServer: getKnowledgeEntriesFromServerMock,
}));

async function loadBrowserProjectBrainModule() {
  vi.resetModules();
  return import("./browser");
}

describe("createGetBrowserAiProjectContext", () => {
  beforeEach(() => {
    getProjectFromServerMock.mockReset();
    getTasksFromServerMock.mockReset();
    getKnowledgeEntriesFromServerMock.mockReset();
  });

  it("returns available for an existing project with empty tasks and knowledge", async () => {
    const { createGetBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    const getBrowserAiProjectContext = createGetBrowserAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-24T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockResolvedValue([]),
      getKnowledgeEntriesByProjectId: vi.fn().mockResolvedValue([]),
    });

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
  });

  it("returns the full AI project context from the shared composition", async () => {
    const { createGetBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    const getBrowserAiProjectContext = createGetBrowserAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-24T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockResolvedValue([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-24T10:05:00.000Z",
        },
      ]),
      getKnowledgeEntriesByProjectId: vi.fn().mockResolvedValue([
        {
          id: "knowledge-1",
          projectId: "project-1",
          title: "Architecture note",
          content: "Body",
          createdAt: "2026-07-24T10:10:00.000Z",
        },
      ]),
    });

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [{ id: "task-1", title: "First task" }],
        knowledgeEntries: [
          {
            id: "knowledge-1",
            title: "Architecture note",
            content: "Body",
          },
        ],
      },
    });
  });

  it("returns project-not-found and skips tasks and knowledge readers", async () => {
    const { createGetBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    const getTasksByProjectId = vi.fn();
    const getKnowledgeEntriesByProjectId = vi.fn();
    const getBrowserAiProjectContext = createGetBrowserAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue(null),
      getTasksByProjectId,
      getKnowledgeEntriesByProjectId,
    });

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "project-not-found",
    });
    expect(getTasksByProjectId).not.toHaveBeenCalled();
    expect(getKnowledgeEntriesByProjectId).not.toHaveBeenCalled();
  });

  it("returns unavailable when the project reader throws", async () => {
    const { createGetBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    const getBrowserAiProjectContext = createGetBrowserAiProjectContext({
      getProjectById: vi.fn().mockRejectedValue(new Error("network")),
      getTasksByProjectId: vi.fn(),
      getKnowledgeEntriesByProjectId: vi.fn(),
    });

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "unavailable",
    });
  });

  it("returns unavailable when the tasks reader throws", async () => {
    const { createGetBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    const getKnowledgeEntriesByProjectId = vi.fn();
    const getBrowserAiProjectContext = createGetBrowserAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-24T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockRejectedValue(new Error("network")),
      getKnowledgeEntriesByProjectId,
    });

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "unavailable",
    });
    expect(getKnowledgeEntriesByProjectId).not.toHaveBeenCalled();
  });

  it("returns unavailable when the knowledge reader throws", async () => {
    const { createGetBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    const getBrowserAiProjectContext = createGetBrowserAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-24T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockResolvedValue([]),
      getKnowledgeEntriesByProjectId: vi.fn().mockRejectedValue(
        new Error("network"),
      ),
    });

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "unavailable",
    });
  });

  it("returns unavailable when the shared composition rejects invalid canonical data", async () => {
    const { createGetBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    const getBrowserAiProjectContext = createGetBrowserAiProjectContext({
      getProjectById: vi.fn().mockResolvedValue({
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-07-24T10:00:00.000Z",
      }),
      getTasksByProjectId: vi.fn().mockResolvedValue([
        {
          id: "task-1",
          projectId: "different-project",
          title: "Wrong task",
          createdAt: "2026-07-24T10:05:00.000Z",
        },
      ]),
      getKnowledgeEntriesByProjectId: vi.fn().mockResolvedValue([]),
    });

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "unavailable",
    });
  });
});

describe("getBrowserAiProjectContext", () => {
  beforeEach(() => {
    getProjectFromServerMock.mockReset();
    getTasksFromServerMock.mockReset();
    getKnowledgeEntriesFromServerMock.mockReset();
  });

  it("uses canonical browser clients instead of localStorage readers", async () => {
    const { getBrowserAiProjectContext } =
      await loadBrowserProjectBrainModule();
    getProjectFromServerMock.mockResolvedValueOnce({
      id: "project-1",
      name: "Alpha",
      createdAt: "2026-07-24T10:00:00.000Z",
    });
    getTasksFromServerMock.mockResolvedValueOnce([]);
    getKnowledgeEntriesFromServerMock.mockResolvedValueOnce([]);

    await expect(getBrowserAiProjectContext("project-1")).resolves.toEqual({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });

    expect(getProjectFromServerMock).toHaveBeenCalledTimes(1);
    expect(getProjectFromServerMock).toHaveBeenCalledWith("project-1");
    expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    expect(getTasksFromServerMock).toHaveBeenCalledWith("project-1");
    expect(getKnowledgeEntriesFromServerMock).toHaveBeenCalledTimes(1);
    expect(getKnowledgeEntriesFromServerMock).toHaveBeenCalledWith("project-1");
  });
});
