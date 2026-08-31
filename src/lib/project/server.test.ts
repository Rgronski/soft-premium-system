import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const mkdirMock = vi.fn();
const execFileMock = vi.fn();
const readFileMock = vi.fn();
const readdirMock = vi.fn();
const writeFileMock = vi.fn();
const neonMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  mkdir: mkdirMock,
  readFile: readFileMock,
  readdir: readdirMock,
  writeFile: writeFileMock,
}));

vi.mock("node:child_process", () => ({
  execFile: execFileMock,
}));

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
  mkdirMock.mockReset();
  execFileMock.mockReset();
  readFileMock.mockReset();
  readdirMock.mockReset();
  writeFileMock.mockReset();
  vi.restoreAllMocks();

  execFileMock.mockImplementation(
    (
      _command: string,
      _args: string[],
      _options: { cwd?: string },
      callback: (error: Error | null, stdout: string, stderr: string) => void,
    ) => {
      callback(new Error("git remote unavailable"), "", "");
    },
  );
});

describe("discoverServerProjectsFromWorkingRoot", () => {
  it("returns only valid manifest-backed projects from immediate child directories", async () => {
    readdirMock.mockResolvedValueOnce([
      { name: "alpha", isDirectory: () => true },
      { name: "notes.txt", isDirectory: () => false },
      { name: "bravo", isDirectory: () => true },
    ]);

    readFileMock.mockImplementation(async (path: string) => {
      if (path === "C:\\SPS_OS_WORK\\alpha\\sps-project.json") {
        return JSON.stringify({
          id: "project-1",
          name: "Alpha",
          repositoryUrl: "https://github.com/example/alpha",
          createdAt: "2026-07-24T10:11:12.000Z",
        });
      }

      if (path === "C:\\SPS_OS_WORK\\bravo\\sps-project.json") {
        return JSON.stringify({
          id: "project-2",
          name: "Bravo",
          repositoryUrl: "https://github.com/example/bravo",
          createdAt: "2026-07-24T10:11:13.000Z",
        });
      }

      throw new Error("ENOENT");
    });

    const { discoverServerProjectsFromWorkingRoot } = await loadServerModule();
    const result = await discoverServerProjectsFromWorkingRoot(
      "C:\\SPS_OS_WORK",
    );

    expect(readdirMock).toHaveBeenCalledWith("C:\\SPS_OS_WORK", {
      withFileTypes: true,
    });
    expect(result).toEqual([
      {
        id: "project-1",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/alpha",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-07-24T10:11:12.000Z",
      },
      {
        id: "project-2",
        name: "Bravo",
        repositoryUrl: "https://github.com/example/bravo",
        workingDirectory: "C:\\SPS_OS_WORK\\bravo",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-07-24T10:11:13.000Z",
      },
    ]);
  });

  it("returns an empty list when the root cannot be read", async () => {
    readdirMock.mockRejectedValueOnce(new Error("permission denied"));

    const { discoverServerProjectsFromWorkingRoot } = await loadServerModule();

    await expect(
      discoverServerProjectsFromWorkingRoot("C:\\SPS_OS_WORK"),
    ).resolves.toEqual([]);
  });
});

describe("getServerProjectByWorkingDirectory", () => {
  it("reads and validates a manifest from the working directory", async () => {
    readFileMock.mockResolvedValueOnce(
      JSON.stringify({
        id: "project-1",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/project",
        createdAt: "2026-07-24T10:11:12.000Z",
      }),
    );

    const { getServerProjectByWorkingDirectory } = await loadServerModule();
    const result = await getServerProjectByWorkingDirectory(
      "C:\\SPS_OS_WORK\\alpha",
    );

    expect(readFileMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\alpha\\sps-project.json",
      "utf8",
    );
    expect(result).toEqual({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      projectFilesystemStatus: "manifest-present",
      createdAt: "2026-07-24T10:11:12.000Z",
    });
  });

  it("returns null when the manifest is missing or invalid", async () => {
    readFileMock.mockRejectedValueOnce(new Error("ENOENT"));

    const { getServerProjectByWorkingDirectory } = await loadServerModule();

    await expect(
      getServerProjectByWorkingDirectory("C:\\SPS_OS_WORK\\alpha"),
    ).resolves.toBeNull();

    readFileMock.mockResolvedValueOnce(
      JSON.stringify({
        id: "",
        name: "Alpha",
        createdAt: "2026-07-24T10:11:12.000Z",
      }),
    );

    await expect(
      getServerProjectByWorkingDirectory("C:\\SPS_OS_WORK\\alpha"),
    ).resolves.toBeNull();
  });
});

describe("getServerProjectById", () => {
  it("uses DATABASE_URL, executes a parameterized query, and maps a row", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "project-1",
        name: "Alpha",
        repository_url: "https://github.com/example/project",
        created_at: "2026-07-23T10:11:12.000Z",
      },
    ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerProjectById } = await loadServerModule();
    const result = await getServerProjectById("project-1");

    expect(neonMock).toHaveBeenCalledTimes(1);
    expect(neonMock).toHaveBeenCalledWith("postgresql://pooled-runtime-url");
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock).toHaveBeenCalledWith(
      `SELECT id, name, repository_url, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`,
      ["project-1"],
    );
    expect(result).toEqual({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
      createdAt: "2026-07-23T10:11:12.000Z",
      projectFilesystemStatus: "unknown",
    });
  });

  it("hydrates a cached local project from the checkout remote before returning it", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi
      .fn()
      .mockResolvedValueOnce([
        {
          id: "project-1",
          name: "Alpha",
          repository_url: null,
          created_at: "2026-07-23T10:11:12.000Z",
        },
      ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    execFileMock.mockImplementationOnce(
      (
        _command: string,
        _args: string[],
        _options: { cwd?: string },
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(null, "https://github.com/example/project.git\n", "");
      },
    );

    const { createServerProject, getServerProjectById } =
      await loadServerModule();

    await expect(
      createServerProject({
        id: "project-1",
        name: "Alpha",
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        id: "project-1",
        name: "Alpha",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
      }),
    );

    await expect(getServerProjectById("project-1")).resolves.toEqual(
      expect.objectContaining({
        id: "project-1",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/project.git",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-07-23T10:11:12.000Z",
      }),
    );
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(execFileMock).toHaveBeenCalledWith(
      "git",
      [
        "-c",
        "safe.directory=C:\\SPS_OS_WORK\\alpha\\repo",
        "-C",
        "C:\\SPS_OS_WORK\\alpha\\repo",
        "remote",
        "get-url",
        "origin",
      ],
      expect.objectContaining({ cwd: process.cwd(), windowsHide: true }),
      expect.any(Function),
    );
  });

  it("recovers a missing database project from the SPS work root manifest", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    readdirMock.mockResolvedValueOnce([
      { name: "beauty-client-pro", isDirectory: () => true },
      { name: "core", isDirectory: () => true },
    ]);
    readFileMock.mockImplementation(async (path: string) => {
      if (path === "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json") {
        return JSON.stringify({
          id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
          name: "Beauty Client PRO",
          createdAt: "2026-08-23T20:29:16.690Z",
        });
      }

      throw new Error("ENOENT");
    });
    execFileMock.mockImplementation(
      (
        _command: string,
        _args: string[],
        _options: { cwd?: string },
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(
          null,
          "https://github.com/Beautyclient/BeautyClientPro.git\n",
          "",
        );
      },
    );

    const { getServerProjectById } = await loadServerModule();
    const result = await getServerProjectById(
      "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
    );

    expect(neonMock).toHaveBeenCalledWith("postgresql://pooled-runtime-url");
    expect(queryMock).toHaveBeenCalledWith(
      `SELECT id, name, repository_url, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`,
      ["0d3e28cb-6dff-442a-b94c-007a5d6b5779"],
    );
    expect(readdirMock).toHaveBeenCalledWith("C:\\SPS_OS_WORK", {
      withFileTypes: true,
    });
    expect(result).toEqual({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      projectFilesystemStatus: "manifest-present",
      createdAt: "2026-08-23T20:29:16.690Z",
    });
    expect(execFileMock).toHaveBeenCalledWith(
      "git",
      [
        "-c",
        "safe.directory=C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        "-C",
        "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        "remote",
        "get-url",
        "origin",
      ],
      expect.objectContaining({ cwd: process.cwd(), windowsHide: true }),
      expect.any(Function),
    );
  });

  it("uses repository_url when the row includes it", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "project-1",
        name: "Alpha",
        repository_url: "https://github.com/example/project",
        created_at: "2026-07-23T10:11:12.000Z",
      },
    ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerProjectById } = await loadServerModule();
    const result = await getServerProjectById("project-1");

    expect(result).toEqual({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
      createdAt: "2026-07-23T10:11:12.000Z",
      projectFilesystemStatus: "unknown",
    });
  });

  it("returns null when the query returns no rows", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerProjectById } = await loadServerModule();

    await expect(getServerProjectById("missing-project")).resolves.toBeNull();
    expect(neonMock).toHaveBeenCalledWith("postgresql://pooled-runtime-url");
    expect(queryMock).toHaveBeenCalledWith(
      `SELECT id, name, repository_url, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`,
      ["missing-project"],
    );
  });
});

describe("deleteServerProjectById", () => {
  it("uses DATABASE_URL and executes a delete query for the project id", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { deleteServerProjectById } = await loadServerModule();
    await deleteServerProjectById("project-1");

    expect(neonMock).toHaveBeenCalledWith("postgresql://pooled-runtime-url");
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock).toHaveBeenCalledWith(
      `DELETE FROM public.projects
WHERE id = $1`,
      ["project-1"],
    );
  });
});

describe("createServerProject", () => {
  it("uses DATABASE_URL, persists repository_url, and maps the created row", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    mkdirMock.mockResolvedValueOnce(undefined);
    writeFileMock.mockResolvedValueOnce(undefined);
    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "project-1",
        name: "Alpha",
        repository_url: "https://github.com/example/project",
        created_at: "2026-07-24T10:11:12.000Z",
      },
    ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerProject } = await loadServerModule();
    const result = await createServerProject({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
    });

    expect(neonMock).toHaveBeenCalledWith("postgresql://pooled-runtime-url");
    expect(mkdirMock).toHaveBeenCalledWith("C:\\SPS_OS_WORK\\alpha", {
      recursive: true,
    });
    expect(writeFileMock).toHaveBeenCalledTimes(2);
    expect(writeFileMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\alpha\\sps-project.json",
      expect.any(String),
      "utf8",
    );
    expect(JSON.parse(writeFileMock.mock.calls[0][1] as string)).toEqual({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
      createdAt: expect.any(String),
    });
    expect(writeFileMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\alpha\\README.md",
      expect.stringContaining("# Alpha"),
      "utf8",
    );
    expect(writeFileMock.mock.calls[1][1]).toContain("Project ID: project-1");
    expect(writeFileMock.mock.calls[1][1]).toContain(
      "sps-project.json",
    );
    expect(queryMock).toHaveBeenCalledWith(
      `INSERT INTO public.projects (id, name, repository_url, created_at)
VALUES ($1, $2, $3, $4)
RETURNING id, name, repository_url, created_at`,
      [
        "project-1",
        "Alpha",
        "https://github.com/example/project",
        expect.any(String),
      ],
    );
    expect(result).toEqual({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      projectBrainStatus: "pending",
      projectFilesystemStatus: "manifest-present",
      createdAt: "2026-07-24T10:11:12.000Z",
    });
  });

  it("fails project creation when the manifest cannot be written", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    mkdirMock.mockResolvedValueOnce(undefined);
    writeFileMock.mockRejectedValueOnce(new Error("permission denied"));
    const queryMock = vi.fn();

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerProject } = await loadServerModule();

    await expect(
      createServerProject({
        id: "project-1",
        name: "Alpha",
      }),
    ).rejects.toMatchObject({
      code: "working-directory-create-failed",
    });

    expect(queryMock).not.toHaveBeenCalled();
  });

  it("fails project creation when the readme cannot be written", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    mkdirMock.mockResolvedValueOnce(undefined);
    writeFileMock.mockResolvedValueOnce(undefined);
    writeFileMock.mockRejectedValueOnce(new Error("permission denied"));
    const queryMock = vi.fn();

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerProject } = await loadServerModule();

    await expect(
      createServerProject({
        id: "project-1",
        name: "Alpha",
      }),
    ).rejects.toMatchObject({
      code: "working-directory-create-failed",
    });

    expect(queryMock).not.toHaveBeenCalled();
  });
});

describe("project server local fallback", () => {
  it("stores, loads, and deletes projects locally when the database query fails", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    mkdirMock.mockResolvedValueOnce(undefined);
    const queryMock = vi.fn().mockRejectedValue(
      new Error("repository failure"),
    );

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerProject, getServerProjectById, deleteServerProjectById } =
      await loadServerModule();

    const createdProject = await createServerProject({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
    });

    expect(createdProject).toMatchObject({
      id: "project-1",
      name: "Alpha",
      repositoryUrl: "https://github.com/example/project",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      projectBrainStatus: "pending",
      projectFilesystemStatus: "manifest-present",
    });
    expect(createdProject.createdAt).toEqual(expect.any(String));
    expect(await getServerProjectById("project-1")).toEqual(createdProject);

    await deleteServerProjectById("project-1");

    await expect(getServerProjectById("project-1")).resolves.toBeNull();
    expect(queryMock).toHaveBeenCalledTimes(3);
  });

  it("throws a clear error when the working directory cannot be created", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    mkdirMock.mockRejectedValueOnce(new Error("permission denied"));
    const queryMock = vi.fn();

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerProject } = await loadServerModule();

    await expect(
      createServerProject({
        id: "project-1",
        name: "Alpha",
      }),
    ).rejects.toMatchObject({
      code: "working-directory-create-failed",
    });

    expect(queryMock).not.toHaveBeenCalled();
  });
});
