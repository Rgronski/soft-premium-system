import { afterEach, describe, expect, it, vi } from "vitest";

const execFileMock = vi.fn();
const mkdirMock = vi.fn();
const statMock = vi.fn();

vi.mock("node:child_process", () => ({
  execFile: execFileMock,
}));

vi.mock("node:fs/promises", () => ({
  mkdir: mkdirMock,
  stat: statMock,
}));

function createRequest(body: unknown): Request {
  return new Request(
    "http://localhost/api/projects/project-1/working-branch/setup",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
}

function createGetRequest(
  searchParams: Record<string, string>,
): Request {
  const url = new URL("http://localhost/api/projects/project-1/working-branch/setup");

  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, value);
  }

  return new Request(url);
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

function createValidBody(overrides?: Partial<Record<string, string>>): Record<string, string> {
  return {
    projectId: "project-1",
    repositoryUrl: "https://github.com/example/beauty-client-pro",
    workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    branchWorkMode: "working-branch",
    workingBranchName: "work/beauty-client-pro",
    candidateDecision: "approved for further preparation",
    authorization: "authorized to execute",
    ...overrides,
  };
}

function mockExecFileSequence(
  implementations: Array<(command: string, args: string[]) => [Error | null, string, string]>,
): void {
  execFileMock.mockImplementation(
    (
      command: string,
      args: string[],
      _options: unknown,
      callback: (error: Error | null, stdout: string, stderr: string) => void,
    ) => {
      const implementation = implementations.shift();

      if (!implementation) {
        callback(new Error("unexpected git call"), "", "");
        return;
      }

      const [error, stdout, stderr] = implementation(command, args);
      callback(error, stdout, stderr);
    },
  );
}

async function loadRouteModule() {
  vi.resetModules();
  return import("./route");
}

afterEach(() => {
  execFileMock.mockReset();
  mkdirMock.mockReset();
  statMock.mockReset();
  vi.restoreAllMocks();
});

describe("POST /api/projects/[id]/working-branch/setup", () => {
  it("clones a new repository and creates the working branch in a fresh workspace", async () => {
    statMock.mockRejectedValueOnce(new Error("ENOENT"));
    mkdirMock.mockResolvedValueOnce(undefined);
    mockExecFileSequence([
      (command, args) => {
        expect(command).toBe("git");
        expect(args).toEqual([
          "clone",
          "--branch",
          "main",
          "--single-branch",
          "https://github.com/example/beauty-client-pro",
          "C:\\SPS_OS_WORK\\beauty-client-pro",
        ]);
        return [null, "", ""];
      },
      (command, args) => {
        expect(command).toBe("git");
        expect(args).toEqual([
          "-C",
          "C:\\SPS_OS_WORK\\beauty-client-pro",
          "switch",
          "-c",
          "work/beauty-client-pro",
        ]);
        return [null, "", ""];
      },
      (command, args) => {
        expect(command).toBe("git");
        expect(args).toEqual([
          "-C",
          "C:\\SPS_OS_WORK\\beauty-client-pro",
          "status",
          "--porcelain",
        ]);
        return [null, "", ""];
      },
    ]);

    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(createValidBody()),
      createContext("project-1"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "success",
      message:
        "Lokalny clone i working branch setup zostały wykonane. Commit/push/merge/PR pozostają poza zakresem.",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      activeBranch: "work/beauty-client-pro",
      repoCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro",
      remoteUrl: "https://github.com/example/beauty-client-pro",
      workingTreeState: "clean",
      sourceStatus: "git-repo",
    });
    expect(mkdirMock).toHaveBeenCalledWith("C:\\SPS_OS_WORK", {
      recursive: true,
    });
  });

  it("blocks an invalid workspace path before any git command is started", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest({
        ...createValidBody({
          workingDirectory: "relative\\workspace",
        }),
      }),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      status: "blocked",
      message: "Ścieżka workspace musi być absolutna. Akcja pozostaje zablokowana.",
    });
    expect(execFileMock).not.toHaveBeenCalled();
  });

  it("blocks a workspace path that is inside the SPS OS repository", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(
        createValidBody({
          workingDirectory: "C:\\Users\\p700\\soft-premium-system\\workspace",
        }),
      ),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      status: "blocked",
      message:
        "Ścieżka workspace nie może znajdować się wewnątrz repo SPS OS.",
    });
    expect(execFileMock).not.toHaveBeenCalled();
  });

  it("blocks a manifest-only workspace folder and suggests the derived repo checkout path", async () => {
    statMock.mockResolvedValueOnce({
      isDirectory: () => true,
    });
    statMock.mockResolvedValueOnce({
      isDirectory: () => true,
    });
    statMock.mockResolvedValueOnce({
      isDirectory: () => true,
    });
    statMock.mockRejectedValueOnce(new Error("ENOENT"));

    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(createValidBody()),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toMatchObject({
      status: "blocked",
      message: expect.stringContaining(
        "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
      ),
    });
    expect(execFileMock).not.toHaveBeenCalled();
  });

  it("blocks an unsafe branch name before any filesystem work", async () => {
    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(
        createValidBody({
          workingBranchName: "feature/beauty-client-pro",
        }),
      ),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      status: "blocked",
      message: "Nazwa gałęzi jest niebezpieczna lub nie pasuje do work/....",
    });
    expect(execFileMock).not.toHaveBeenCalled();
  });

  it("blocks an existing folder that is not a git repository", async () => {
    statMock.mockResolvedValueOnce({
      isDirectory: () => true,
    });
    statMock.mockResolvedValueOnce({
      isDirectory: () => true,
    });
    execFileMock.mockImplementationOnce(
      (
        _command: string,
        _args: string[],
        _options: unknown,
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(new Error("not a git repository"), "", "");
      },
    );

    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(createValidBody()),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      status: "blocked",
      message: "Istniejący katalog nie jest repozytorium Git.",
    });
  });

  it("blocks a remote origin that does not match the configured GitHub URL", async () => {
    statMock.mockResolvedValueOnce({
      isDirectory: () => true,
    });
    statMock.mockResolvedValueOnce({
      isDirectory: () => true,
    });
    mockExecFileSequence([
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          "C:\\SPS_OS_WORK\\beauty-client-pro",
          "rev-parse",
          "--is-inside-work-tree",
        ]);
        return [null, "true", ""];
      },
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          "C:\\SPS_OS_WORK\\beauty-client-pro",
          "remote",
          "get-url",
          "origin",
        ]);
        return [null, "https://github.com/example/another-repo", ""];
      },
    ]);

    const { POST } = await loadRouteModule();
    const response = await POST(
      createRequest(createValidBody()),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      status: "blocked",
      message:
        "Remote origin nie pasuje do skonfigurowanego adresu GitHub.",
    });
  });
});

describe("GET /api/projects/[id]/working-branch/setup", () => {
  it("revalidates a manifest-only workspace by switching to the derived repo checkout folder", async () => {
    const workspaceDirectory = "C:\\SPS_OS_WORK\\beauty-client-pro";
    const repoCheckoutDirectory = "C:\\SPS_OS_WORK\\beauty-client-pro\\repo";

    statMock.mockImplementation(async (targetPath: string) => {
      if (targetPath === workspaceDirectory || targetPath === repoCheckoutDirectory) {
        return {
          isDirectory: () => true,
        } as Awaited<ReturnType<typeof statMock>>;
      }

      if (targetPath === `${workspaceDirectory}\\sps-project.json`) {
        return {
          isDirectory: () => false,
        } as Awaited<ReturnType<typeof statMock>>;
      }

      if (targetPath === `${workspaceDirectory}\\.git`) {
        throw new Error("ENOENT");
      }

      if (targetPath === `${repoCheckoutDirectory}\\sps-project.json`) {
        throw new Error("ENOENT");
      }

      throw new Error(`unexpected stat target: ${targetPath}`);
    });

    mockExecFileSequence([
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "rev-parse",
          "--is-inside-work-tree",
        ]);
        return [null, "true", ""];
      },
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "remote",
          "get-url",
          "origin",
        ]);
        return [null, "https://github.com/Beautyclient/BeautyClientPro.git", ""];
      },
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "rev-parse",
          "--abbrev-ref",
          "HEAD",
        ]);
        return [null, "work/beauty-client-pro", ""];
      },
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "status",
          "--porcelain",
        ]);
        return [null, "", ""];
      },
    ]);

    const { GET } = await loadRouteModule();
    const response = await GET(
      createGetRequest({
        projectId: "project-1",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: workspaceDirectory,
        branchWorkMode: "working-branch",
        workingBranchName: "work/beauty-client-pro",
      }),
      createContext("project-1"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "success",
      message:
        "Checkout status został zrewalidowany. Commit/push/merge/PR pozostają poza zakresem.",
      workingDirectory: workspaceDirectory,
      activeBranch: "work/beauty-client-pro",
      repoCheckoutPath: repoCheckoutDirectory,
      remoteUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingTreeState: "clean",
      sourceStatus: "git-repo",
    });
  });

  it("blocks revalidation when the repo checkout remote does not match the saved GitHub URL", async () => {
    const repoCheckoutDirectory = "C:\\SPS_OS_WORK\\beauty-client-pro\\repo";

    statMock.mockImplementation(async (targetPath: string) => {
      if (targetPath === repoCheckoutDirectory) {
        return {
          isDirectory: () => true,
        } as Awaited<ReturnType<typeof statMock>>;
      }

      if (targetPath === `${repoCheckoutDirectory}\\sps-project.json`) {
        throw new Error("ENOENT");
      }

      throw new Error(`unexpected stat target: ${targetPath}`);
    });

    mockExecFileSequence([
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "rev-parse",
          "--is-inside-work-tree",
        ]);
        return [null, "true", ""];
      },
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "remote",
          "get-url",
          "origin",
        ]);
        return [null, "https://github.com/example/another-repo", ""];
      },
    ]);

    const { GET } = await loadRouteModule();
    const response = await GET(
      createGetRequest({
        projectId: "project-1",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
        branchWorkMode: "working-branch",
        workingBranchName: "work/beauty-client-pro",
      }),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      status: "blocked",
      message:
        "Remote origin nie pasuje do zapisanego adresu GitHub. Rewalidacja pozostaje zablokowana.",
    });
  });

  it("blocks revalidation when the active branch does not match the saved working branch", async () => {
    const repoCheckoutDirectory = "C:\\SPS_OS_WORK\\beauty-client-pro\\repo";

    statMock.mockImplementation(async (targetPath: string) => {
      if (targetPath === repoCheckoutDirectory) {
        return {
          isDirectory: () => true,
        } as Awaited<ReturnType<typeof statMock>>;
      }

      if (targetPath === `${repoCheckoutDirectory}\\sps-project.json`) {
        throw new Error("ENOENT");
      }

      throw new Error(`unexpected stat target: ${targetPath}`);
    });

    mockExecFileSequence([
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "rev-parse",
          "--is-inside-work-tree",
        ]);
        return [null, "true", ""];
      },
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "remote",
          "get-url",
          "origin",
        ]);
        return [null, "https://github.com/Beautyclient/BeautyClientPro.git", ""];
      },
      (_command, args) => {
        expect(args).toEqual([
          "-C",
          repoCheckoutDirectory,
          "rev-parse",
          "--abbrev-ref",
          "HEAD",
        ]);
        return [null, "work/beauty-client-pro", ""];
      },
    ]);

    const { GET } = await loadRouteModule();
    const response = await GET(
      createGetRequest({
        projectId: "project-1",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
        branchWorkMode: "working-branch",
        workingBranchName: "work/beauty-client-pro-hotfix",
      }),
      createContext("project-1"),
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      status: "blocked",
      message:
        "Aktywna gałąź nie zgadza się z zapisaną gałęzią roboczą. Rewalidacja pozostaje zablokowana.",
    });
  });
});
