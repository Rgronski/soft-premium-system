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
const candidateStoreDirectory = `C:\\SPS_OS_WORK\\.sps-meta\\${metadataRootSegment}\\knowledge`;
const candidateStorePath = `${candidateStoreDirectory}\\core-candidates.jsonl`;

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

async function loadCoreCandidateModule() {
  vi.resetModules();
  return import("./core-candidates");
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
    createdAt: "2026-08-23T10:00:00.000Z",
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
  vi.setSystemTime(new Date("2026-08-23T04:00:00.000Z"));
  vi.stubGlobal("crypto", {
    randomUUID: vi.fn(() => "generated-core-candidate-id"),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("core doctrine candidate store", () => {
  test("reads candidates from the SPS-owned JSONL store", async () => {
    const candidate = {
      id: "candidate-1",
      projectId,
      sourceKnowledgeEntryId: "knowledge-1",
      title: "Recovered note",
      content: "A reusable insight.",
      reason: "Already repeated in multiple prompts.",
      status: "candidate" as const,
      createdAt: "2026-08-23T10:10:00.000Z",
    };

    fileStore.set(
      candidateStorePath,
      `${JSON.stringify(candidate)}\n`,
    );

    const { getCoreDoctrineCandidatesByProjectId } =
      await loadCoreCandidateModule();
    const result = await getCoreDoctrineCandidatesByProjectId(projectId);

    expect(getServerProjectByIdMock).toHaveBeenCalledWith(projectId);
    expect(readFileMock).toHaveBeenCalledWith(candidateStorePath, "utf8");
    expect(result).toEqual([candidate]);
  });

  test("writes a candidate record without touching core doctrine", async () => {
    const knowledgeEntry: KnowledgeEntry = {
      id: "knowledge-1",
      projectId,
      title: "Recovered note",
      content: "A reusable insight.",
      createdAt: "2026-08-23T10:05:00.000Z",
    };

    const { createCoreDoctrineCandidateFromKnowledgeEntry, getCoreDoctrineCandidatesByProjectId } =
      await loadCoreCandidateModule();

    const createdCandidate = await createCoreDoctrineCandidateFromKnowledgeEntry({
      projectId,
      knowledgeEntry,
      reason: "Repeated across projects and worth reviewing for the core store.",
    });

    expect(getServerProjectByIdMock).toHaveBeenCalledWith(projectId);
    expect(mkdirMock).toHaveBeenCalledWith(candidateStoreDirectory, {
      recursive: true,
    });
    expect(writeFileMock).toHaveBeenCalledWith(
      candidateStorePath,
      `${JSON.stringify(createdCandidate)}\n`,
      "utf8",
    );
    expect(createdCandidate).toMatchObject({
      projectId,
      sourceKnowledgeEntryId: "knowledge-1",
      title: "Recovered note",
      content: "A reusable insight.",
      status: "candidate",
    });

    await expect(
      getCoreDoctrineCandidatesByProjectId(projectId),
    ).resolves.toEqual([createdCandidate]);
  });

  test("rejects an empty reason", async () => {
    const knowledgeEntry: KnowledgeEntry = {
      id: "knowledge-1",
      projectId,
      title: "Recovered note",
      content: "A reusable insight.",
      createdAt: "2026-08-23T10:05:00.000Z",
    };

    const { createCoreDoctrineCandidateFromKnowledgeEntry } =
      await loadCoreCandidateModule();

    await expect(
      createCoreDoctrineCandidateFromKnowledgeEntry({
        projectId,
        knowledgeEntry,
        reason: "   ",
      }),
    ).rejects.toThrow(
      "Core candidate repository requires a non-empty reason.",
    );
  });
});
