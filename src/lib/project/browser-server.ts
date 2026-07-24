import type { Project } from "./types";

export type ProjectServerErrorCode =
  | "context-unavailable"
  | "network-error"
  | "invalid-response";

export class ProjectServerError extends Error {
  readonly code: ProjectServerErrorCode;
  readonly status?: number;

  constructor(code: ProjectServerErrorCode, status?: number) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

type TransportErrorResponse =
  | {
      status: "project-not-found";
    }
  | {
      status: "context-unavailable";
    };

function buildProjectUrl(projectId: string): string {
  return `/api/projects/${encodeURIComponent(projectId)}`;
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

function isValidProject(value: unknown): value is Project {
  return (
    isPlainObject(value) &&
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.name === "string" &&
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
    throw new ProjectServerError("invalid-response", response.status);
  }
}

async function executeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch {
    throw new ProjectServerError("network-error");
  }
}

export async function getProjectFromServer(
  projectId: string,
): Promise<Project | null> {
  const response = await executeFetch(buildProjectUrl(projectId), {
    method: "GET",
  });

  if (response.status === 200) {
    const json = await readJson(response);

    if (!isValidProject(json)) {
      throw new ProjectServerError("invalid-response", response.status);
    }

    return json;
  }

  const json = await readJson(response);
  const transportError = parseTransportError(json);

  if (!transportError) {
    throw new ProjectServerError("invalid-response", response.status);
  }

  if (
    response.status === 404 &&
    transportError.status === "project-not-found"
  ) {
    return null;
  }

  if (
    response.status === 503 &&
    transportError.status === "context-unavailable"
  ) {
    throw new ProjectServerError("context-unavailable", response.status);
  }

  throw new ProjectServerError("invalid-response", response.status);
}
