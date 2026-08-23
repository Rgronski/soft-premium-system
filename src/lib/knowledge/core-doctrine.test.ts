import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import type { CoreDoctrineEntry } from "./core-doctrine";

vi.mock("server-only", () => ({}));

const coreDoctrineStorePath =
  "C:\\SPS_OS_WORK\\.sps-meta\\core\\doctrine.jsonl";

const mkdirMock = vi.fn();
const readFileMock = vi.fn();
const writeFileMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  mkdir: mkdirMock,
  readFile: readFileMock,
  writeFile: writeFileMock,
}));

const fileStore = new Map<string, string>();

async function loadCoreDoctrineModule() {
  vi.resetModules();
  return import("./core-doctrine");
}

beforeEach(() => {
  fileStore.clear();
  mkdirMock.mockReset();
  readFileMock.mockReset();
  writeFileMock.mockReset();

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
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-23T03:00:00.000Z"));
  vi.stubGlobal("crypto", {
    randomUUID: vi.fn(() => "generated-core-doctrine-id"),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("core doctrine store", () => {
  test("reads doctrine entries from the SPS-owned JSONL store", async () => {
    const entries: CoreDoctrineEntry[] = [
      {
        id: "doctrine-1",
        title: "Project Brain is the SSOT",
        content: "Project Brain stays authoritative.",
        createdAt: "2026-08-23T10:00:00.000Z",
      },
      {
        id: "doctrine-2",
        title: "Diagnose before implementation",
        content: "No change should begin before the cause is known.",
        createdAt: "2026-08-23T10:05:00.000Z",
      },
    ];

    fileStore.set(
      coreDoctrineStorePath,
      `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    );

    const { getCoreDoctrineEntries } = await loadCoreDoctrineModule();
    const result = await getCoreDoctrineEntries();

    expect(readFileMock).toHaveBeenCalledWith(coreDoctrineStorePath, "utf8");
    expect(result).toEqual(entries);
  });

  test("writes doctrine entries to the SPS-owned JSONL store", async () => {
    const { createCoreDoctrineEntry, getCoreDoctrineEntries } =
      await loadCoreDoctrineModule();

    const createdEntry = await createCoreDoctrineEntry({
      title: "Codex makes the smallest safe patch",
      content: "Implementation should be minimal and verifiable.",
    });

    expect(mkdirMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\core",
      {
        recursive: true,
      },
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      coreDoctrineStorePath,
      `${JSON.stringify(createdEntry)}\n`,
      "utf8",
    );

    await expect(getCoreDoctrineEntries()).resolves.toEqual([createdEntry]);
  });

  test("bootstraps the doctrine store when it is empty and keeps seeding idempotent", async () => {
    const {
      CORE_DOCTRINE_SEED,
      getCoreDoctrineBootstrapStatus,
      getCoreDoctrineEntries,
    } = await loadCoreDoctrineModule();

    await expect(getCoreDoctrineBootstrapStatus()).resolves.toEqual({
      status: "available",
      storePath: coreDoctrineStorePath,
      entryCount: CORE_DOCTRINE_SEED.length,
    });
    expect(mkdirMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\core",
      {
        recursive: true,
      },
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      coreDoctrineStorePath,
      `${CORE_DOCTRINE_SEED.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
      "utf8",
    );
    await expect(getCoreDoctrineEntries()).resolves.toEqual(CORE_DOCTRINE_SEED);
    expect(writeFileMock).toHaveBeenCalledTimes(1);
  });
});
