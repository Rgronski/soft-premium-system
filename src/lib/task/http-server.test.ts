import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type { Task } from "./types";

vi.mock("server-only", () => ({}));

async function loadTaskHttpServerModule() {
  vi.resetModules();
  return import("./http-server");
}

function createContext(id: string) {
  return {
    params: Promise.resolve({ id }),
  };
}

function createJsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/projects/project-123/tasks", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function createMalformedJsonRequest(): Request {
  return new Request("http://localhost/api/projects/project-123/tasks", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: "{",
  });
}

describe("createPostTaskRoute", () => {
  it("creates a task once from route params, trims title, and returns 201 with the full task", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createdTask: Task = {
      id: "task-1",
      projectId: "route-project-id",
      title: "Ship route boundary",
      createdAt: "2026-07-23T10:00:00.000Z",
    };
    const createServerTask = vi
      .fn<(_: { projectId: string; title: string }) => Promise<Task>>()
      .mockResolvedValue(createdTask);
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createJsonRequest({
        projectId: "ignored-project-id",
        title: "  Ship route boundary  ",
      }),
      createContext("route-project-id"),
    );

    expect(createServerTask).toHaveBeenCalledTimes(1);
    expect(createServerTask).toHaveBeenCalledWith({
      projectId: "route-project-id",
      title: "Ship route boundary",
    });
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual(createdTask);
  });

  it("returns 400 for malformed JSON without calling create", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createServerTask = vi.fn();
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createMalformedJsonRequest(),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerTask).not.toHaveBeenCalled();
  });

  it("returns 400 for missing title without calling create", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createServerTask = vi.fn();
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createJsonRequest({}),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerTask).not.toHaveBeenCalled();
  });

  it("returns 400 for a non-string title without calling create", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createServerTask = vi.fn();
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createJsonRequest({
        title: 42,
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerTask).not.toHaveBeenCalled();
  });

  it("returns 400 for an empty trimmed title without calling create", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createServerTask = vi.fn();
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createJsonRequest({
        title: "   ",
      }),
      createContext("project-123"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      status: "invalid-request",
    });
    expect(createServerTask).not.toHaveBeenCalled();
  });

  it("returns 404 for foreign key violations without depending on error message text", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createServerTask = vi.fn().mockRejectedValue({
      code: "23503",
      constraint: "tasks_project_id_fkey",
      message: "ignored",
    });
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createJsonRequest({
        title: "Ship route boundary",
      }),
      createContext("missing-project"),
    );

    expect(createServerTask).toHaveBeenCalledTimes(1);
    expect(createServerTask).toHaveBeenCalledWith({
      projectId: "missing-project",
      title: "Ship route boundary",
    });
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      status: "project-not-found",
    });
  });

  it("returns 503 for non-foreign-key SQL errors", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createServerTask = vi.fn().mockRejectedValue({
      code: "42601",
      message: "syntax error",
    });
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createJsonRequest({
        title: "Ship route boundary",
      }),
      createContext("project-123"),
    );

    expect(createServerTask).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });

  it("returns 503 for missing DATABASE_URL surfaced by the dependency", async () => {
    const { createPostTaskRoute } =
      await loadTaskHttpServerModule();
    const createServerTask = vi.fn().mockRejectedValue(
      new Error("DATABASE_URL is not configured."),
    );
    const handler = createPostTaskRoute({
      createServerTask,
    });

    const response = await handler(
      createJsonRequest({
        title: "Ship route boundary",
      }),
      createContext("project-123"),
    );

    expect(createServerTask).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "context-unavailable",
    });
  });
});
