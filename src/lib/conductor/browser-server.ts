export type ProjectConductorStateSnapshot = {
  projectId: string;
  status: string;
  currentMilestone: string;
  currentPhase: string;
  nextAction: string;
  reason: string;
  updatedAt: string;
};

export type ConductorServerErrorCode =
  | "project-not-found"
  | "context-unavailable"
  | "network-error"
  | "invalid-response";

export class ConductorServerError extends Error {
  readonly code: ConductorServerErrorCode;
  readonly status?: number;

  constructor(code: ConductorServerErrorCode, status?: number) {
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

function buildConductorUrl(projectId: string): string {
  return `/api/projects/${encodeURIComponent(projectId)}/conductor`;
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

function isProjectConductorStateSnapshot(
  value: unknown,
): value is ProjectConductorStateSnapshot {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    typeof value.projectId === "string" &&
    value.projectId.trim().length > 0 &&
    typeof value.status === "string" &&
    value.status.trim().length > 0 &&
    typeof value.currentMilestone === "string" &&
    typeof value.currentPhase === "string" &&
    typeof value.nextAction === "string" &&
    typeof value.reason === "string" &&
    typeof value.updatedAt === "string" &&
    value.updatedAt.trim().length > 0
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
      return {
        status: "project-not-found",
      };
    case "context-unavailable":
      return {
        status: "context-unavailable",
      };
    default:
      return null;
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new ConductorServerError("invalid-response", response.status);
  }
}

async function executeFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch {
    throw new ConductorServerError("network-error");
  }
}

async function mapErrorResponse(response: Response): Promise<never> {
  const json = await readJson(response);
  const transportError = parseTransportError(json);

  if (!transportError) {
    throw new ConductorServerError("invalid-response", response.status);
  }

  switch (response.status) {
    case 404:
      if (transportError.status === "project-not-found") {
        throw new ConductorServerError("project-not-found", response.status);
      }
      break;
    case 503:
      if (transportError.status === "context-unavailable") {
        throw new ConductorServerError("context-unavailable", response.status);
      }
      break;
  }

  throw new ConductorServerError("invalid-response", response.status);
}

export async function getConductorStateFromServer(
  projectId: string,
): Promise<ProjectConductorStateSnapshot> {
  const response = await executeFetch(buildConductorUrl(projectId), {
    method: "GET",
  });

  if (response.status === 200) {
    const json = await readJson(response);

    if (!isProjectConductorStateSnapshot(json)) {
      throw new ConductorServerError("invalid-response", response.status);
    }

    return json;
  }

  return mapErrorResponse(response);
}
