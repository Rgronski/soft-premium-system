import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { createKnowledgeEntry } from "./knowledge";

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

describe("createKnowledgeEntry", () => {
  const storage = new MemoryStorage();

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("crypto", {
      randomUUID: () => "knowledge-uuid",
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("creates and stores a knowledge entry with the provided projectId, title, and content", () => {
    const entry = createKnowledgeEntry("project-1", "  Note  ", "  Body  ");
    const savedEntries = JSON.parse(
      storage.getItem("soft-premium-system.projects.project-1.knowledge") ??
        "[]",
    );

    expect(entry?.projectId).toBe("project-1");
    expect(entry?.title).toBe("Note");
    expect(entry?.content).toBe("Body");
    expect(savedEntries[0].projectId).toBe("project-1");
    expect(savedEntries[0].title).toBe("Note");
    expect(savedEntries[0].content).toBe("Body");
  });
});
