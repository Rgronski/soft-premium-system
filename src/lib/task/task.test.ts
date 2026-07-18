import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { createTask } from "./task";

class MemoryStorage {
  private store = new Map<string, string>();

  clear() {
    this.store.clear();
  }

  get length() {
    return this.store.size;
  }

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  key(index: number) {
    return [...this.store.keys()][index] ?? null;
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
    vi.restoreAllMocks();
  });

  test("creates and stores a task with the provided projectId and trimmed title", () => {
    const task = createTask({
      commandId: "command-1",
      projectId: "project-1",
      title: "  First task  ",
    });
    const savedTasks = JSON.parse(
      storage.getItem("soft-premium-system.projects.project-1.tasks") ?? "[]",
    );

    expect(task?.projectId).toBe("project-1");
    expect(task?.title).toBe("First task");
    expect(savedTasks[0].commandId).toBe("command-1");
    expect(savedTasks[0].projectId).toBe("project-1");
    expect(savedTasks[0].title).toBe("First task");
  });

  test("returns the existing task for the same command without another write", () => {
    const setItemSpy = vi.spyOn(storage, "setItem");

    const firstTask = createTask({
      commandId: "command-1",
      projectId: "project-1",
      title: "First task",
    });

    setItemSpy.mockClear();

    const secondTask = createTask({
      commandId: "command-1",
      projectId: "project-1",
      title: "  First task  ",
    });
    const savedTasks = JSON.parse(
      storage.getItem("soft-premium-system.projects.project-1.tasks") ?? "[]",
    );

    expect(secondTask).toEqual(firstTask);
    expect(savedTasks).toHaveLength(1);
    expect(setItemSpy).not.toHaveBeenCalled();
  });

  test("rejects a reused commandId with a different normalized title", () => {
    createTask({
      commandId: "command-1",
      projectId: "project-1",
      title: "First task",
    });

    expect(() =>
      createTask({
        commandId: "command-1",
        projectId: "project-1",
        title: "Second task",
      }),
    ).toThrowError(expect.objectContaining({ code: "command-identity-conflict" }));
  });

  test("rejects a reused commandId with a different projectId", () => {
    createTask({
      commandId: "command-1",
      projectId: "project-1",
      title: "First task",
    });

    expect(() =>
      createTask({
        commandId: "command-1",
        projectId: "project-2",
        title: "First task",
      }),
    ).toThrowError(expect.objectContaining({ code: "command-identity-conflict" }));
  });
});
