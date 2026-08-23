import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import type { Task } from "./types";

vi.mock("server-only", () => ({}));

const projectId = "0d3e28cb-6dff-442a-b94c-007a5d6b5779";
const projectWorkingDirectory = "C:\\SPS_OS_WORK\\beauty-client-pro";
const metadataRootSegment = "beauty-client-pro--0d3e28cb";
const taskStoreDirectory = `C:\\SPS_OS_WORK\\.sps-meta\\${metadataRootSegment}\\tasks`;
const taskStorePath = `${taskStoreDirectory}\\open.jsonl`;

const mkdirMock = vi.fn();
const readFileMock = vi.fn();
const writeFileMock = vi.fn();
const getServerProjectByIdMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  mkdir: mkdirMock,
  readFile: readFileMock,
  writeFile: writeFileMock,
}));

vi.mock("../project/server", async () => {
  const actual = await vi.importActual<typeof import("../project/server")>(
    "../project/server",
  );

  return {
    ...actual,
    getServerProjectById: getServerProjectByIdMock,
  };
});

const fileStore = new Map<string, string>();

async function loadServerModule() {
  vi.resetModules();
  return import("./server");
}

beforeEach(() => {
  fileStore.clear();
  mkdirMock.mockReset();
  readFileMock.mockReset();
  writeFileMock.mockReset();
  getServerProjectByIdMock.mockReset();

  mkdirMock.mockResolvedValue(undefined);
  getServerProjectByIdMock.mockResolvedValue({
    id: projectId,
    name: "Beauty Client PRO",
    workingDirectory: projectWorkingDirectory,
    createdAt: "2026-08-22T10:00:00.000Z",
  });
  readFileMock.mockImplementation(async (path: string) => {
    const storedValue = fileStore.get(path);

    if (typeof storedValue !== "string") {
      const error = new Error("ENOENT") as Error & { code: string };
      error.code = "ENOENT";
      throw error;
    }

    return storedValue;
  });
  writeFileMock.mockImplementation(async (path: string, data: string) => {
    fileStore.set(path, data);
  });
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-23T02:10:00.000Z"));
  vi.stubGlobal("crypto", {
    randomUUID: vi.fn(() => "generated-task-id"),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getServerTasksByProjectId", () => {
  test("reads tasks from the SPS-owned JSONL store", async () => {
    const tasks: Task[] = [
      {
        id: "task-1",
        projectId,
        title: "First task",
        createdAt: "2026-08-23T10:00:00.000Z",
      },
      {
        id: "task-2",
        projectId,
        title: "Second task",
        createdAt: "2026-08-23T10:05:00.000Z",
      },
    ];

    fileStore.set(
      taskStorePath,
      `${tasks.map((task) => JSON.stringify(task)).join("\n")}\n`,
    );

    const { getServerTasksByProjectId } = await loadServerModule();
    const result = await getServerTasksByProjectId(projectId);

    expect(getServerProjectByIdMock).toHaveBeenCalledWith(projectId);
    expect(readFileMock).toHaveBeenCalledWith(taskStorePath, "utf8");
    expect(result).toEqual(tasks);
  });
});

describe("createServerTask", () => {
  test("writes tasks to the SPS-owned JSONL store and restores them after reload", async () => {
    const { createServerTask, getServerTasksByProjectId } =
      await loadServerModule();

    const createdTask = await createServerTask({
      projectId,
      title: "Alpha task",
    });

    expect(getServerProjectByIdMock).toHaveBeenCalledWith(projectId);
    expect(mkdirMock).toHaveBeenCalledWith(taskStoreDirectory, {
      recursive: true,
    });
    expect(writeFileMock).toHaveBeenCalledWith(
      taskStorePath,
      `${JSON.stringify(createdTask)}\n`,
      "utf8",
    );
    await expect(getServerTasksByProjectId(projectId)).resolves.toEqual([
      createdTask,
    ]);

    const reloadedModule = await loadServerModule();

    await expect(
      reloadedModule.getServerTasksByProjectId(projectId),
    ).resolves.toEqual([createdTask]);
  });
});
