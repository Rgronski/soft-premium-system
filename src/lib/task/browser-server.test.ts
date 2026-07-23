import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  TaskServerError,
  createTaskOnServer,
  getTasksFromServer,
} from "./browser-server";
import type { Task } from "./types";

const fetchMock = vi.fn();

function createTask(overrides?: Partial<Task>): Task {
  return {
    id: "task-1",
    projectId: "project-1",
    title: "Ship route boundary",
    createdAt: "2026-07-23T10:00:00.000Z",
    ...overrides,
  };
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getTasksFromServer", () => {
  it("uses encoded projectId, sends GET, and returns tasks", async () => {
    const tasks = [createTask({ projectId: "project/1" })];
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(tasks), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    const result = await getTasksFromServer("project/1");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/projects/project%2F1/tasks",
      {
        method: "GET",
      },
    );
    expect(result).toEqual(tasks);
  });

  it("returns an empty array for a valid empty response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getTasksFromServer("project-1")).resolves.toEqual([]);
  });

  it("maps 404 to project-not-found", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "project-not-found" }), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getTasksFromServer("project-1")).rejects.toMatchObject({
      code: "project-not-found",
      status: 404,
    } satisfies Partial<TaskServerError>);
  });

  it("maps 503 to context-unavailable", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "context-unavailable" }), {
        status: 503,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getTasksFromServer("project-1")).rejects.toMatchObject({
      code: "context-unavailable",
      status: 503,
    } satisfies Partial<TaskServerError>);
  });

  it("maps a rejected fetch to network-error", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    await expect(getTasksFromServer("project-1")).rejects.toMatchObject({
      code: "network-error",
    } satisfies Partial<TaskServerError>);
  });

  it("maps invalid JSON to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response("{", {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getTasksFromServer("project-1")).rejects.toMatchObject({
      code: "invalid-response",
      status: 200,
    } satisfies Partial<TaskServerError>);
  });

  it("maps an invalid task array shape to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([{ id: "task-1" }]), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(getTasksFromServer("project-1")).rejects.toMatchObject({
      code: "invalid-response",
      status: 200,
    } satisfies Partial<TaskServerError>);
  });
});

describe("createTaskOnServer", () => {
  it("uses encoded projectId, sends POST with only title, and returns the full task", async () => {
    const task = createTask({ projectId: "project/1" });
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(task), {
        status: 201,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    const result = await createTaskOnServer({
      projectId: "project/1",
      title: "Ship route boundary",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/projects/project%2F1/tasks",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: "Ship route boundary",
        }),
      },
    );
    expect(result).toEqual(task);
  });

  it("maps 400 to invalid-request", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "invalid-request" }), {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      createTaskOnServer({
        projectId: "project-1",
        title: " ",
      }),
    ).rejects.toMatchObject({
      code: "invalid-request",
      status: 400,
    } satisfies Partial<TaskServerError>);
  });

  it("maps 404 to project-not-found", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "project-not-found" }), {
        status: 404,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      createTaskOnServer({
        projectId: "project-1",
        title: "Ship route boundary",
      }),
    ).rejects.toMatchObject({
      code: "project-not-found",
      status: 404,
    } satisfies Partial<TaskServerError>);
  });

  it("maps 503 to context-unavailable", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "context-unavailable" }), {
        status: 503,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      createTaskOnServer({
        projectId: "project-1",
        title: "Ship route boundary",
      }),
    ).rejects.toMatchObject({
      code: "context-unavailable",
      status: 503,
    } satisfies Partial<TaskServerError>);
  });

  it("maps a rejected fetch to network-error", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    await expect(
      createTaskOnServer({
        projectId: "project-1",
        title: "Ship route boundary",
      }),
    ).rejects.toMatchObject({
      code: "network-error",
    } satisfies Partial<TaskServerError>);
  });

  it("maps invalid JSON to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response("{", {
        status: 201,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      createTaskOnServer({
        projectId: "project-1",
        title: "Ship route boundary",
      }),
    ).rejects.toMatchObject({
      code: "invalid-response",
      status: 201,
    } satisfies Partial<TaskServerError>);
  });

  it("maps an invalid task shape to invalid-response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ id: "task-1" }), {
        status: 201,
        headers: {
          "content-type": "application/json",
        },
      }),
    );

    await expect(
      createTaskOnServer({
        projectId: "project-1",
        title: "Ship route boundary",
      }),
    ).rejects.toMatchObject({
      code: "invalid-response",
      status: 201,
    } satisfies Partial<TaskServerError>);
  });
});
