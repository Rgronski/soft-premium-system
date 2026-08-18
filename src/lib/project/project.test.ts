import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  buildDefaultWorkingDirectory,
  createProject,
  deleteProject,
  getProjectById,
  getProjectBindingDecisionSummary,
  getProjectSourceBindingSummary,
  upsertProject,
} from "./project";

class MemoryStorage {
  private store = new Map<string, string>();

  clear() {
    this.store.clear();
  }

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

describe("createProject", () => {
  const storage = new MemoryStorage();

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("crypto", {
      randomUUID: () => "project-uuid",
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("creates and stores a project with the provided name", () => {
    const project = createProject("Alpha");
    const savedProjects = JSON.parse(
      storage.getItem("soft-premium-system.projects") ?? "[]",
    );

    expect(project.name).toBe("Alpha");
    expect(savedProjects[0].name).toBe("Alpha");
  });

  test("creates and stores an optional repositoryUrl when provided", () => {
    const project = createProject(
      "Alpha",
      "project-uuid",
      "  https://github.com/example/project  ",
    );
    const savedProjects = JSON.parse(
      storage.getItem("soft-premium-system.projects") ?? "[]",
    );

    expect(project.repositoryUrl).toBe("https://github.com/example/project");
    expect(savedProjects[0].repositoryUrl).toBe(
      "https://github.com/example/project",
    );
  });

  test("stores the filesystem status when provided by the server create flow", () => {
    const project = createProject(
      "Alpha",
      "project-uuid",
      "https://github.com/example/project",
      "C:\\SPS_OS_WORK\\alpha",
      "manifest-present",
    );
    const savedProjects = JSON.parse(
      storage.getItem("soft-premium-system.projects") ?? "[]",
    );

    expect(project.projectFilesystemStatus).toBe("manifest-present");
    expect(savedProjects[0].projectFilesystemStatus).toBe("manifest-present");
  });

  test("stores the default working directory when none is provided", () => {
    const project = createProject("Alpha Project", "project-uuid");
    const savedProjects = JSON.parse(
      storage.getItem("soft-premium-system.projects") ?? "[]",
    );

    expect(buildDefaultWorkingDirectory("Alpha Project")).toBe(
      "C:\\SPS_OS_WORK\\alpha-project",
    );
    expect(project.workingDirectory).toBe("C:\\SPS_OS_WORK\\alpha-project");
    expect(project.projectBrainStatus).toBe("available");
    expect(savedProjects[0].workingDirectory).toBe(
      "C:\\SPS_OS_WORK\\alpha-project",
    );
    expect(savedProjects[0].projectBrainStatus).toBe("available");
  });

  test("derives a manifest-only source binding when the project has a manifest but no repository URL", () => {
    expect(
      getProjectSourceBindingSummary({
        id: "project-1",
        name: "Alpha",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-08-03T10:00:00.000Z",
      }),
    ).toEqual({
      status: "manifest-only",
      statusLabel: "tylko manifest",
      gitLabel: ".git: brak",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: projekt ma manifest SPS, ale nie ma lokalnego repo Git.",
    });
  });

  test("derives a git-repo source binding when repository metadata is present", () => {
    expect(
      getProjectSourceBindingSummary({
        id: "project-1",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/project",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        createdAt: "2026-08-03T10:00:00.000Z",
      }),
    ).toEqual({
      status: "git-repo",
      statusLabel: "repozytorium Git",
      gitLabel: ".git: obecny",
      repositoryContextMessage: "Kontekst repozytorium: dostępny",
    });
  });

  test("upserts a project into the stored project list without duplicating the id", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Old Alpha",
          createdAt: "2026-07-24T10:00:00.000Z",
        },
        {
          id: "project-2",
          name: "Beta",
          createdAt: "2026-07-24T11:00:00.000Z",
        },
      ]),
    );

    const project = upsertProject({
      id: "project-1",
      name: "Alpha",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      projectFilesystemStatus: "manifest-present",
      createdAt: "2026-08-13T10:00:00.000Z",
    });

    expect(project.name).toBe("Alpha");
    expect(
      JSON.parse(storage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      {
        id: "project-1",
        name: "Alpha",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-07-24T10:00:00.000Z",
      },
      {
        id: "project-2",
        name: "Beta",
        createdAt: "2026-07-24T11:00:00.000Z",
      },
    ]);
  });

  test("repairs a pending existing project with a persisted working directory when it is loaded", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          workingDirectory: "C:\\SPS_OS_WORK\\alpha",
          projectBrainStatus: "pending",
          createdAt: "2026-08-03T10:00:00.000Z",
        },
      ]),
    );

    const project = getProjectById("project-1");
    const savedProjects = JSON.parse(
      storage.getItem("soft-premium-system.projects") ?? "[]",
    );

    expect(project).toEqual(
      expect.objectContaining({
        id: "project-1",
        projectBrainStatus: "available",
      }),
    );
    expect(savedProjects[0].projectBrainStatus).toBe("available");
  });

  test("keeps a pending project pending when the working directory is missing", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          projectBrainStatus: "pending",
          createdAt: "2026-08-03T10:00:00.000Z",
        },
      ]),
    );

    const project = getProjectById("project-1");
    const savedProjects = JSON.parse(
      storage.getItem("soft-premium-system.projects") ?? "[]",
    );

    expect(project).toEqual(
      expect.objectContaining({
        id: "project-1",
        projectBrainStatus: "pending",
      }),
    );
    expect(savedProjects[0].projectBrainStatus).toBe("pending");
  });

  test("deletes a project from the stored project list", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-24T10:00:00.000Z",
        },
        {
          id: "project-2",
          name: "Beta",
          createdAt: "2026-07-24T11:00:00.000Z",
        },
      ]),
    );

    deleteProject("project-1");

    expect(
      JSON.parse(storage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      {
        id: "project-2",
        name: "Beta",
        createdAt: "2026-07-24T11:00:00.000Z",
      },
    ]);
  });

  test("derives a github-url-known binding decision when only the GitHub URL metadata is known", () => {
    expect(
      getProjectBindingDecisionSummary({
        id: "project-1",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/project",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-08-03T10:00:00.000Z",
      }),
    ).toEqual({
      status: "github-url-known",
      statusLabel: "adres GitHub podany",
      githubUrlLabel: "Adres GitHub: podany",
      localRepositoryLabel: "Lokalne repo Git: nadal niedostępne",
      nextStepLabel:
        "Import/clone wymaga osobnego zatwierdzenia. Możesz też wskazać istniejący lokalny katalog repo.",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: adres GitHub jest zapisany, ale lokalne repo Git nadal nie jest dostępne.",
    });
  });

  test("derives a manifest-only binding decision when no GitHub URL is present", () => {
    expect(
      getProjectBindingDecisionSummary({
        id: "project-1",
        name: "Alpha",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
        createdAt: "2026-08-03T10:00:00.000Z",
      }),
    ).toEqual({
      status: "manifest-only",
      statusLabel: "tylko manifest",
      githubUrlLabel: "Adres GitHub: nie podano",
      localRepositoryLabel: "Lokalne repo Git: niedostępne",
      nextStepLabel:
        "Następny krok: podaj adres GitHub lub wskaż istniejący katalog repo.",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: projekt ma manifest SPS, ale nie ma lokalnego repo Git.",
    });
  });
});
