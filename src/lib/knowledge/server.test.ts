import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const neonMock = vi.fn();

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
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getServerKnowledgeEntriesByProjectId", () => {
  it("uses DATABASE_URL, queries by projectId, and maps rows", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "knowledge-1",
        project_id: "project-1",
        title: "Alpha",
        content: "Body",
        created_at: "2026-07-23T10:11:12.000Z",
      },
      {
        id: "knowledge-2",
        project_id: "project-1",
        title: "Beta",
        content: "Body 2",
        created_at: "2026-07-23T10:11:13.000Z",
      },
    ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerKnowledgeEntriesByProjectId } = await loadServerModule();
    const result = await getServerKnowledgeEntriesByProjectId("project-1");

    expect(queryMock).toHaveBeenCalledWith(
      `SELECT id, project_id, title, content, created_at
FROM public.knowledge_entries
WHERE project_id = $1
ORDER BY created_at ASC, id ASC`,
      ["project-1"],
    );
    expect(result).toEqual([
      {
        id: "knowledge-1",
        projectId: "project-1",
        title: "Alpha",
        content: "Body",
        createdAt: "2026-07-23T10:11:12.000Z",
      },
      {
        id: "knowledge-2",
        projectId: "project-1",
        title: "Beta",
        content: "Body 2",
        createdAt: "2026-07-23T10:11:13.000Z",
      },
    ]);
  });

  it("returns an empty array when the query returns no rows", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerKnowledgeEntriesByProjectId } = await loadServerModule();

    await expect(
      getServerKnowledgeEntriesByProjectId("project-1"),
    ).resolves.toEqual([]);
  });

  it("throws when DATABASE_URL is missing", async () => {
    delete process.env.DATABASE_URL;

    const { getServerKnowledgeEntriesByProjectId } = await loadServerModule();

    await expect(
      getServerKnowledgeEntriesByProjectId("project-1"),
    ).rejects.toThrow("DATABASE_URL is not configured.");
  });

  it("propagates SQL errors", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockRejectedValue(new Error("SQL failed"));

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { getServerKnowledgeEntriesByProjectId } = await loadServerModule();

    await expect(
      getServerKnowledgeEntriesByProjectId("project-1"),
    ).rejects.toThrow("SQL failed");
  });
});

describe("createServerKnowledgeEntry", () => {
  it("trims input, generates id and timestamp, inserts once, and returns a KnowledgeEntry", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T10:11:12.000Z"));
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "generated-knowledge-id"),
    });

    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "generated-knowledge-id",
        project_id: "project-1",
        title: "Alpha",
        content: "Body",
        created_at: "2026-07-23T10:11:12.000Z",
      },
    ]);

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerKnowledgeEntry } = await loadServerModule();
    const result = await createServerKnowledgeEntry({
      projectId: "  project-1  ",
      title: "  Alpha  ",
      content: "  Body  ",
    });

    expect(queryMock).toHaveBeenCalledWith(
      `INSERT INTO public.knowledge_entries (id, project_id, title, content, created_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, project_id, title, content, created_at`,
      [
        "generated-knowledge-id",
        "project-1",
        "Alpha",
        "Body",
        "2026-07-23T10:11:12.000Z",
      ],
    );
    expect(result).toEqual({
      id: "generated-knowledge-id",
      projectId: "project-1",
      title: "Alpha",
      content: "Body",
      createdAt: "2026-07-23T10:11:12.000Z",
    });
  });

  it("rejects an empty projectId", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId: "   ",
        title: "Alpha",
        content: "Body",
      }),
    ).rejects.toThrow(
      "Knowledge server repository requires a non-empty projectId.",
    );
  });

  it("rejects an empty title", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId: "project-1",
        title: "   ",
        content: "Body",
      }),
    ).rejects.toThrow(
      "Knowledge server repository requires a non-empty title.",
    );
  });

  it("rejects empty content", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId: "project-1",
        title: "Alpha",
        content: "   ",
      }),
    ).rejects.toThrow(
      "Knowledge server repository requires non-empty content.",
    );
  });

  it("propagates SQL or foreign key errors", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T10:11:12.000Z"));
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "generated-knowledge-id"),
    });

    const queryMock = vi.fn().mockRejectedValue(
      new Error("insert or update on table \"knowledge_entries\" violates foreign key constraint"),
    );

    neonMock.mockReturnValue({
      query: queryMock,
    });

    const { createServerKnowledgeEntry } = await loadServerModule();

    await expect(
      createServerKnowledgeEntry({
        projectId: "project-1",
        title: "Alpha",
        content: "Body",
      }),
    ).rejects.toThrow("violates foreign key constraint");
  });
});
