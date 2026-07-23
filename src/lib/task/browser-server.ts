import type { Task } from "./types";

export type TaskServerErrorCode =
  | "invalid-request"
  | "project-not-found"
  | "context-unavailable"
  | "network-error"
  | "invalid-response";

export class TaskServerError extends Error {
  readonly code: TaskServerErrorCode;
  readonly status?: number;

  constructor(code: TaskServerErrorCode, status?: number) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

type TransportErrorResponse =
  | {
      status: "invalid-request";
    }
  | {
      status: "project-not-found";
    }
  | {
      status: "context-unavailable";
    };

function buildTasksUrl(projectId: string): string {
  return `/api/projects/${encodeURIComponent(projectId)}/tasks`;
}

function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function isValidTask(value: unknown): value is Task {
  return (
    isPlainObject(value) &&
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.projectId === "string" &&
    value.projectId.trim().length > 0 &&
    typeof value.title === "string" &&
    typeof value.createdAt === "string" &&
    value.createdAt.trim().length > 0
  );
}

function parseTransportError(
  value: unknown,
): TransportErrorResponse | null {
  if (!isPlainObject(value) || typeof value.status !== "string") {
    return null;
  }

  switch (value.status) {
    case "invalid-request":
    case "project-not-found":
    case "context-unavailable":
      return value;
    default:
      return null;
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new TaskServerError("invalid-response", response.status);
  }
}

async function mapErrorResponse(response: Response): Promise<never> {
  const json = await readJson(response);
  const transportError = parseTransportError(json);

  if (!transportError) {
    throw new TaskServerError("invalid-response", response.status);
  }

  switch (response.status) {
    case 400:
      if (transportError.status === "invalid-request") {
        throw new TaskServerError("invalid-request", response.status);
      }
      break;
    case 404:
      if (transportError.status === "project-not-found") {
        throw new TaskServerError("project-not-found", response.status);
      }
      break;
    case 503:
      if (transportError.status === "context-unavailable") {
        throw new TaskServerError("context-unavailable", response.status);
      }
      break;
  }

  throw new TaskServerError("invalid-response", response.status);
}

async function executeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch {
    throw new TaskServerError("network-error");
  }
}

export async function getTasksFromServer(
  projectId: string,
): Promise<Task[]> {
  const response = await executeFetch(buildTasksUrl(projectId), {
    method: "GET",
  });

  if (response.status === 200) {
    const json = await readJson(response);

    if (!Array.isArray(json) || !json.every((task) => isValidTask(task))) {
      throw new TaskServerError("invalid-response", response.status);
    }

    return json;
  }

  return mapErrorResponse(response);
}

export async function createTaskOnServer(input: {
  projectId: string;
  title: string;
}): Promise<Task> {
  const response = await executeFetch(buildTasksUrl(input.projectId), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: input.title,
    }),
  });

  if (response.status === 201) {
    const json = await readJson(response);

    if (!isValidTask(json)) {
      throw new TaskServerError("invalid-response", response.status);
    }

    return json;
  }

  return mapErrorResponse(response);
}
