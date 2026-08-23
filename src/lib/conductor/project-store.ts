import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { getServerProjectById } from "../project/server";

export type ProjectConductorDecisionRecord = {
  id: string;
  projectId: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
};

export type ProjectConductorState = {
  projectId: string;
  status: string;
  currentMilestone: string;
  currentPhase: string;
  nextAction: string;
  reason: string;
  updatedAt: string;
};

type ConductorStoreErrorCode =
  | "project-not-found"
  | "source-read-failed"
  | "source-write-failed";

type ConductorStoreError = Error & {
  code: ConductorStoreErrorCode;
};

const CONDUCTOR_STORE_ROOT = "C:\\SPS_OS_WORK\\.sps-meta";
const DECISIONS_STORE_FILE_NAME = "decisions.jsonl";
const CONDUCTOR_STATE_FILE_NAME = "state.json";

const localProjectDecisionRecords = new Map<string, ProjectConductorDecisionRecord[]>();
const localProjectConductorStates = new Map<string, ProjectConductorState>();
const resolvedProjectMetadataRoots = new Map<string, string>();

function createConductorStoreError(
  code: ConductorStoreErrorCode,
  message: string,
): ConductorStoreError {
  const error = new Error(message) as ConductorStoreError;
  error.code = code;

  return error;
}

function normalizeProjectId(projectId: string): string {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw createConductorStoreError(
      "project-not-found",
      "Conductor store requires a non-empty projectId.",
    );
  }

  return normalizedProjectId;
}

function slugifyMetadataRootSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getShortProjectId(projectId: string): string {
  return projectId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase();
}

function buildProjectMetadataRoot(project: {
  id: string;
  name: string;
  workingDirectory?: string;
}): string {
  const workingDirectorySlug = basename(project.workingDirectory ?? "").trim();
  const readableRootSegment = slugifyMetadataRootSegment(
    workingDirectorySlug || project.name,
  );
  const shortProjectId = getShortProjectId(project.id);

  if (!shortProjectId) {
    return join(CONDUCTOR_STORE_ROOT, readableRootSegment || project.id);
  }

  return join(
    CONDUCTOR_STORE_ROOT,
    `${readableRootSegment || "project"}--${shortProjectId}`,
  );
}

async function resolveProjectMetadataRoot(projectId: string): Promise<string> {
  const cachedRoot = resolvedProjectMetadataRoots.get(projectId);

  if (cachedRoot) {
    return cachedRoot;
  }

  const project = await getServerProjectById(projectId);

  if (!project) {
    const fallbackRoot = join(CONDUCTOR_STORE_ROOT, projectId);
    resolvedProjectMetadataRoots.set(projectId, fallbackRoot);

    return fallbackRoot;
  }

  const resolvedRoot = buildProjectMetadataRoot(project);
  resolvedProjectMetadataRoots.set(projectId, resolvedRoot);

  return resolvedRoot;
}

async function getDecisionsStoreDirectory(projectId: string): Promise<string> {
  return join(await resolveProjectMetadataRoot(projectId), "decisions");
}

async function getDecisionsStorePath(projectId: string): Promise<string> {
  return join(await getDecisionsStoreDirectory(projectId), DECISIONS_STORE_FILE_NAME);
}

async function getConductorStateDirectory(projectId: string): Promise<string> {
  return join(await resolveProjectMetadataRoot(projectId), "conductor");
}

async function getConductorStatePath(projectId: string): Promise<string> {
  return join(await getConductorStateDirectory(projectId), CONDUCTOR_STATE_FILE_NAME);
}

function isProjectConductorDecisionRecord(
  value: unknown,
): value is ProjectConductorDecisionRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ProjectConductorDecisionRecord>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.trim().length > 0 &&
    typeof candidate.projectId === "string" &&
    candidate.projectId.trim().length > 0 &&
    typeof candidate.title === "string" &&
    candidate.title.trim().length > 0 &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0 &&
    typeof candidate.status === "string" &&
    candidate.status.trim().length > 0 &&
    typeof candidate.createdAt === "string" &&
    candidate.createdAt.trim().length > 0
  );
}

function isProjectConductorState(value: unknown): value is ProjectConductorState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ProjectConductorState>;

  return (
    typeof candidate.projectId === "string" &&
    candidate.projectId.trim().length > 0 &&
    typeof candidate.status === "string" &&
    candidate.status.trim().length > 0 &&
    typeof candidate.currentMilestone === "string" &&
    typeof candidate.currentPhase === "string" &&
    typeof candidate.nextAction === "string" &&
    typeof candidate.reason === "string" &&
    typeof candidate.updatedAt === "string" &&
    candidate.updatedAt.trim().length > 0
  );
}

function sortProjectConductorDecisionRecords(
  records: ProjectConductorDecisionRecord[],
): ProjectConductorDecisionRecord[] {
  return [...records].sort(
    (left, right) =>
      left.createdAt.localeCompare(right.createdAt) ||
      left.id.localeCompare(right.id),
  );
}

function parseProjectConductorDecisionJsonl(
  content: string,
): ProjectConductorDecisionRecord[] {
  const parsedRecords: ProjectConductorDecisionRecord[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    try {
      const parsedLine = JSON.parse(trimmedLine) as unknown;

      if (isProjectConductorDecisionRecord(parsedLine)) {
        parsedRecords.push({
          id: parsedLine.id,
          projectId: parsedLine.projectId,
          title: parsedLine.title,
          content: parsedLine.content,
          status: parsedLine.status,
          createdAt: parsedLine.createdAt,
        });
      }
    } catch {
      continue;
    }
  }

  return sortProjectConductorDecisionRecords(parsedRecords);
}

function serializeProjectConductorDecisionJsonl(
  records: ProjectConductorDecisionRecord[],
): string {
  if (records.length === 0) {
    return "";
  }

  return `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
}

function readProjectConductorStateFallback(
  projectId: string,
): ProjectConductorState {
  return {
    projectId,
    status: "decision-required",
    currentMilestone: "Konduktor projektu czeka na decyzję Product Ownera",
    currentPhase: "Brak stanu dla projektu",
    nextAction:
      "Konduktor może wskazać następny krok dopiero po zapisaniu stanu projektu albo decyzji Product Ownera.",
    reason: "Projekt nie ma jeszcze własnego trwałego stanu Konduktora.",
    updatedAt: new Date().toISOString(),
  };
}

async function readFilesystemProjectDecisions(
  projectId: string,
): Promise<ProjectConductorDecisionRecord[]> {
  const decisionsStorePath = await getDecisionsStorePath(projectId);

  try {
    const content = await readFile(decisionsStorePath, "utf8");
    const parsedRecords = parseProjectConductorDecisionJsonl(content);

    localProjectDecisionRecords.set(projectId, parsedRecords);

    return parsedRecords;
  } catch (error) {
    const cachedRecords = localProjectDecisionRecords.get(projectId);

    if (cachedRecords) {
      return cachedRecords;
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: string }).code === "ENOENT"
    ) {
      return [];
    }

    throw createConductorStoreError(
      "source-read-failed",
      "Conductor store could not read the decisions store.",
    );
  }
}

async function writeFilesystemProjectDecisions(
  projectId: string,
  records: ProjectConductorDecisionRecord[],
): Promise<void> {
  const decisionsStoreDirectory = await getDecisionsStoreDirectory(projectId);
  const decisionsStorePath = await getDecisionsStorePath(projectId);

  try {
    await mkdir(decisionsStoreDirectory, { recursive: true });
    const sortedRecords = sortProjectConductorDecisionRecords(records);

    await writeFile(
      decisionsStorePath,
      serializeProjectConductorDecisionJsonl(sortedRecords),
      "utf8",
    );
    localProjectDecisionRecords.set(projectId, sortedRecords);
  } catch {
    throw createConductorStoreError(
      "source-write-failed",
      "Conductor store could not write the decisions store.",
    );
  }
}

async function readFilesystemProjectConductorState(
  projectId: string,
): Promise<ProjectConductorState> {
  const conductorStatePath = await getConductorStatePath(projectId);

  try {
    const content = await readFile(conductorStatePath, "utf8");
    const parsedState = JSON.parse(content) as unknown;

    if (isProjectConductorState(parsedState)) {
      localProjectConductorStates.set(projectId, parsedState);

      return parsedState;
    }
  } catch (error) {
    const cachedState = localProjectConductorStates.get(projectId);

    if (cachedState) {
      return cachedState;
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: string }).code === "ENOENT"
    ) {
      return readProjectConductorStateFallback(projectId);
    }

    throw createConductorStoreError(
      "source-read-failed",
      "Conductor store could not read the conductor state store.",
    );
  }

  return readProjectConductorStateFallback(projectId);
}

async function writeFilesystemProjectConductorState(
  projectId: string,
  state: ProjectConductorState,
): Promise<void> {
  const conductorStateDirectory = await getConductorStateDirectory(projectId);
  const conductorStatePath = await getConductorStatePath(projectId);

  try {
    await mkdir(conductorStateDirectory, { recursive: true });
    await writeFile(conductorStatePath, `${JSON.stringify(state)}\n`, "utf8");
    localProjectConductorStates.set(projectId, state);
  } catch {
    throw createConductorStoreError(
      "source-write-failed",
      "Conductor store could not write the conductor state store.",
    );
  }
}

export async function getProjectConductorDecisions(
  projectId: string,
): Promise<ProjectConductorDecisionRecord[]> {
  return readFilesystemProjectDecisions(normalizeProjectId(projectId));
}

export async function createProjectConductorDecision(input: {
  projectId: string;
  title: string;
  content: string;
  status?: string;
}): Promise<ProjectConductorDecisionRecord> {
  const projectId = normalizeProjectId(input.projectId);
  const decision: ProjectConductorDecisionRecord = {
    id: crypto.randomUUID(),
    projectId,
    title: input.title.trim(),
    content: input.content.trim(),
    status: input.status?.trim() || "open",
    createdAt: new Date().toISOString(),
  };
  const existingDecisions = await readFilesystemProjectDecisions(projectId);

  await writeFilesystemProjectDecisions(projectId, [
    ...existingDecisions,
    decision,
  ]);

  return decision;
}

export async function getProjectConductorState(
  projectId: string,
): Promise<ProjectConductorState> {
  return readFilesystemProjectConductorState(normalizeProjectId(projectId));
}

export async function saveProjectConductorState(input: {
  projectId: string;
  status: string;
  currentMilestone: string;
  currentPhase: string;
  nextAction: string;
  reason: string;
  updatedAt?: string;
}): Promise<ProjectConductorState> {
  const projectId = normalizeProjectId(input.projectId);
  const state: ProjectConductorState = {
    projectId,
    status: input.status.trim(),
    currentMilestone: input.currentMilestone.trim(),
    currentPhase: input.currentPhase.trim(),
    nextAction: input.nextAction.trim(),
    reason: input.reason.trim(),
    updatedAt: input.updatedAt?.trim() || new Date().toISOString(),
  };

  await writeFilesystemProjectConductorState(projectId, state);

  return state;
}
