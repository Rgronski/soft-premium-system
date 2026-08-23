import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import type { KnowledgeEntry } from "./types";

vi.mock("server-only", () => ({}));

const projectId = "0d3e28cb-6dff-442a-b94c-007a5d6b5779";
const projectWorkingDirectory = "C:\\SPS_OS_WORK\\beauty-client-pro";
const metadataRootSegment = "beauty-client-pro--0d3e28cb";
const knowledgeStoreDirectory = `C:\\SPS_OS_WORK\\.sps-meta\\${metadataRootSegment}\\knowledge`;
const knowledgeStorePath = `${knowledgeStoreDirectory}\\entries.jsonl`;

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
    randomUUID: vi.fn(() => "generated-knowledge-id"),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getServerKnowledgeEntriesByProjectId", () => {
  test("reads knowledge entries from the SPS-owned JSONL store", async () => {
    const entries: KnowledgeEntry[] = [
      {
        id: "knowledge-1",
        projectId,
        title: "First note",
        content: "First body",
        createdAt: "2026-08-23T10:00:00.000Z",
      },
      {
        id: "knowledge-2",
        projectId,
        title: "Second note",
        content: "Second body",
        createdAt: "2026-08-23T10:05:00.000Z",
      },
    ];

    fileStore.set(
      knowledgeStorePath,
      `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    );

    const { getServerKnowledgeEntriesByProjectId } = await loadServerModule();
    const result = await getServerKnowledgeEntriesByProjectId(projectId);

    expect(getServerProjectByIdMock).toHaveBeenCalledWith(projectId);
    expect(readFileMock).toHaveBeenCalledWith(knowledgeStorePath, "utf8");
    expect(result).toEqual(entries);
  });

  test("returns an empty array when the knowledge store file does not exist", async () => {
    const { getServerKnowledgeEntriesByProjectId } = await loadServerModule();

    await expect(
      getServerKnowledgeEntriesByProjectId(projectId),
    ).resolves.toEqual([]);
  });
});

describe("createServerKnowledgeEntry", () => {
  test("writes knowledge entries to the SPS-owned JSONL store and restores them after reload", async () => {
    const { createServerKnowledgeEntry, getServerKnowledgeEntriesByProjectId } =
      await loadServerModule();

    const createdEntry = await createServerKnowledgeEntry({
      projectId,
      title: "Architecture note",
      content: "Persistent project knowledge.",
    });

    expect(getServerProjectByIdMock).toHaveBeenCalledWith(projectId);
    expect(mkdirMock).toHaveBeenCalledWith(knowledgeStoreDirectory, {
      recursive: true,
    });
    expect(writeFileMock).toHaveBeenCalledWith(
      knowledgeStorePath,
      `${JSON.stringify(createdEntry)}\n`,
      "utf8",
    );

    const reloadedModule = await loadServerModule();

    await expect(
      reloadedModule.getServerKnowledgeEntriesByProjectId(projectId),
    ).resolves.toEqual([createdEntry]);
  });

  test("rejects an empty projectId", async () => {
    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId: "   ",
        title: "Architecture note",
        content: "Persistent project knowledge.",
      }),
    ).rejects.toThrow(
      "Knowledge repository requires a non-empty projectId.",
    );
  });

  test("rejects an empty title", async () => {
    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId,
        title: "   ",
        content: "Persistent project knowledge.",
      }),
    ).rejects.toThrow(
      "Knowledge repository requires a non-empty title.",
    );
  });

  test("rejects empty content", async () => {
    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId,
        title: "Architecture note",
        content: "   ",
      }),
    ).rejects.toThrow(
      "Knowledge repository requires non-empty content.",
    );
  });

  test("maps a missing project to the transport foreign-key shape", async () => {
    getServerProjectByIdMock.mockResolvedValueOnce(null);

    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId,
        title: "Architecture note",
        content: "Persistent project knowledge.",
      }),
    ).rejects.toMatchObject({
      code: "23503",
      constraint: "knowledge_entries_project_id_fkey",
    });
  });
});
