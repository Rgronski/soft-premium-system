import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { createProject, deleteProject } from "./project";

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
