import type { KnowledgeEntry } from "./types";

export type KnowledgeServerErrorCode =
  | "project-not-found"
  | "context-unavailable"
  | "network-error"
  | "invalid-response";

export class KnowledgeServerError extends Error {
  readonly code: KnowledgeServerErrorCode;
  readonly status?: number;

  constructor(code: KnowledgeServerErrorCode, status?: number) {
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

function buildKnowledgeUrl(projectId: string): string {
  return `/api/projects/${encodeURIComponent(projectId)}/knowledge`;
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

function isValidKnowledgeEntry(value: unknown): value is KnowledgeEntry {
  return (
    isPlainObject(value) &&
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.projectId === "string" &&
    value.projectId.trim().length > 0 &&
    typeof value.title === "string" &&
    typeof value.content === "string" &&
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
    throw new KnowledgeServerError("invalid-response", response.status);
  }
}

async function executeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch {
    throw new KnowledgeServerError("network-error");
  }
}

export async function getKnowledgeEntriesFromServer(
  projectId: string,
): Promise<KnowledgeEntry[]> {
  const response = await executeFetch(buildKnowledgeUrl(projectId), {
    method: "GET",
  });

  if (response.status === 200) {
    const json = await readJson(response);

    if (
      !Array.isArray(json) ||
      !json.every((entry) => isValidKnowledgeEntry(entry))
    ) {
      throw new KnowledgeServerError("invalid-response", response.status);
    }

    return json;
  }

  const json = await readJson(response);
  const transportError = parseTransportError(json);

  if (!transportError) {
    throw new KnowledgeServerError("invalid-response", response.status);
  }

  if (
    response.status === 404 &&
    transportError.status === "project-not-found"
  ) {
    throw new KnowledgeServerError("project-not-found", response.status);
  }

  if (
    response.status === 503 &&
    transportError.status === "context-unavailable"
  ) {
    throw new KnowledgeServerError("context-unavailable", response.status);
  }

  throw new KnowledgeServerError("invalid-response", response.status);
}
