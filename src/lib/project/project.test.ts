import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { createProject } from "./project";

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
});
