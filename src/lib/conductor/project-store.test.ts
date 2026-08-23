import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

vi.mock("server-only", () => ({}));

const projectId = "0d3e28cb-6dff-442a-b94c-007a5d6b5779";
const projectWorkingDirectory = "C:\\SPS_OS_WORK\\beauty-client-pro";
const metadataRootSegment = "beauty-client-pro--0d3e28cb";
const decisionsStoreDirectory =
  `C:\\SPS_OS_WORK\\.sps-meta\\${metadataRootSegment}\\decisions`;
const decisionsStorePath = `${decisionsStoreDirectory}\\decisions.jsonl`;
const conductorStoreDirectory =
  `C:\\SPS_OS_WORK\\.sps-meta\\${metadataRootSegment}\\conductor`;
const conductorStorePath = `${conductorStoreDirectory}\\state.json`;

const mkdirMock = vi.fn();
const readFileMock = vi.fn();
const writeFileMock = vi.fn();
const getServerProjectByIdMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  mkdir: mkdirMock,
  readFile: readFileMock,
  writeFile: writeFileMock,
}));

vi.mock("../project/server", () => ({
  getServerProjectById: (candidateProjectId: string) =>
    getServerProjectByIdMock(candidateProjectId),
}));

const fileStore = new Map<string, string>();

async function loadProjectConductorStoreModule() {
  vi.resetModules();
  return import("./project-store");
}

beforeEach(() => {
  fileStore.clear();
  mkdirMock.mockReset();
  readFileMock.mockReset();
  writeFileMock.mockReset();
  getServerProjectByIdMock.mockReset();

  mkdirMock.mockResolvedValue(undefined);
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
  getServerProjectByIdMock.mockResolvedValue({
    id: projectId,
    name: "Beauty Client PRO",
    workingDirectory: projectWorkingDirectory,
  });
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-23T04:00:00.000Z"));
  vi.stubGlobal("crypto", {
    randomUUID: vi.fn(() => "generated-conductor-record-id"),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("project conductor store", () => {
  test("writes decisions and conductor state to the same project-scoped metadata root", async () => {
    const { createProjectConductorDecision, saveProjectConductorState } =
      await loadProjectConductorStoreModule();

    const decision = await createProjectConductorDecision({
      projectId,
      title: "Decyzja Product Ownera",
      content: "Projekt czeka na potwierdzenie najbliższego kroku.",
      status: "open",
    });

    const state = await saveProjectConductorState({
      projectId,
      status: "decision-required",
      currentMilestone: "Konduktor projektu czeka na decyzję Product Ownera",
      currentPhase: "Brak stanu dla projektu",
      nextAction:
        "Konduktor może wskazać następny krok dopiero po zapisaniu stanu projektu albo decyzji Product Ownera.",
      reason: "Projekt nie ma jeszcze własnego trwałego stanu Konduktora.",
    });

    expect(mkdirMock).toHaveBeenCalledWith(decisionsStoreDirectory, {
      recursive: true,
    });
    expect(mkdirMock).toHaveBeenCalledWith(conductorStoreDirectory, {
      recursive: true,
    });
    expect(writeFileMock).toHaveBeenCalledWith(
      decisionsStorePath,
      `${JSON.stringify(decision)}\n`,
      "utf8",
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      conductorStorePath,
      `${JSON.stringify(state)}\n`,
      "utf8",
    );
  });

  test("reads decisions from the project-scoped JSONL store", async () => {
    const decision = {
      id: "decision-1",
      projectId,
      title: "Potrzebna decyzja",
      content: "Ustalmy następną kolejność prac.",
      status: "open",
      createdAt: "2026-08-23T04:00:00.000Z",
    };

    fileStore.set(decisionsStorePath, `${JSON.stringify(decision)}\n`);

    const { getProjectConductorDecisions } = await loadProjectConductorStoreModule();
    const result = await getProjectConductorDecisions(projectId);

    expect(readFileMock).toHaveBeenCalledWith(decisionsStorePath, "utf8");
    expect(result).toEqual([decision]);
  });

  test("returns an honest empty decision state when conductor state is missing", async () => {
    const { getProjectConductorState } = await loadProjectConductorStoreModule();

    await expect(getProjectConductorState(projectId)).resolves.toEqual({
      projectId,
      status: "decision-required",
      currentMilestone: "Konduktor projektu czeka na decyzję Product Ownera",
      currentPhase: "Brak stanu dla projektu",
      nextAction:
        "Konduktor może wskazać następny krok dopiero po zapisaniu stanu projektu albo decyzji Product Ownera.",
      reason: "Projekt nie ma jeszcze własnego trwałego stanu Konduktora.",
      updatedAt: "2026-08-23T04:00:00.000Z",
    });
    expect(readFileMock).toHaveBeenCalledWith(conductorStorePath, "utf8");
  });
});
