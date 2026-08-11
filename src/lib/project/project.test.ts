import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  buildDefaultWorkingDirectory,
  createProject,
  deleteProject,
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

  test("stores the default working directory when none is provided", () => {
    const project = createProject("Alpha Project", "project-uuid");
    const savedProjects = JSON.parse(
      storage.getItem("soft-premium-system.projects") ?? "[]",
    );

    expect(buildDefaultWorkingDirectory("Alpha Project")).toBe(
      "C:\\SPS_OS_WORK\\alpha-project",
    );
    expect(project.workingDirectory).toBe("C:\\SPS_OS_WORK\\alpha-project");
    expect(project.projectBrainStatus).toBe("pending");
    expect(savedProjects[0].workingDirectory).toBe(
      "C:\\SPS_OS_WORK\\alpha-project",
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
});
