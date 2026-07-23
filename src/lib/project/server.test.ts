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
  vi.restoreAllMocks();
});

describe("getServerProjectById", () => {
  it("uses DATABASE_URL, executes a parameterized query, and maps a row", async () => {
    process.env.DATABASE_URL = "postgresql://pooled-runtime-url";

    const queryMock = vi.fn().mockResolvedValue([
      {
        id: "project-1",
        name: "Alpha",
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
      `SELECT id, name, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`,
      ["project-1"],
    );
    expect(result).toEqual({
      id: "project-1",
      name: "Alpha",
      createdAt: "2026-07-23T10:11:12.000Z",
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
      `SELECT id, name, created_at
FROM public.projects
WHERE id = $1
LIMIT 1`,
      ["missing-project"],
    );
  });
});
