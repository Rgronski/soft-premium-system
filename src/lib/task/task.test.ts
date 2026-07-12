import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { createTask } from "./task";

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

describe("createTask", () => {
  const storage = new MemoryStorage();

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("crypto", {
      randomUUID: () => "task-uuid",
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("creates and stores a task with the provided projectId and trimmed title", () => {
    const task = createTask("project-1", "  First task  ");
    const savedTasks = JSON.parse(
      storage.getItem("soft-premium-system.projects.project-1.tasks") ?? "[]",
    );

    expect(task?.projectId).toBe("project-1");
    expect(task?.title).toBe("First task");
    expect(savedTasks[0].projectId).toBe("project-1");
    expect(savedTasks[0].title).toBe("First task");
  });
});
