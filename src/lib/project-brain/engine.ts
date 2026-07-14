import { getKnowledge } from "../knowledge/knowledge";
import { getProjectById } from "../project/project";
import { getTasks } from "../task/task";
import { evaluateWorkflow } from "../workflow/engine";
import type { ProjectState, WorkflowResult } from "../workflow/types";

import type {
  ProjectConsumerOverview,
  ProjectBrainSnapshot,
  ProjectWorkflowSnapshot,
} from "./types";

type ProjectBrainErrorCode =
  | "invalid-project-id"
  | "project-not-found"
  | "source-read-failed"
  | "invalid-snapshot";

type ProjectBrainError = Error & {
  code: ProjectBrainErrorCode;
};

const PROJECT_BRAIN_PHASE = "project-brain-foundation";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function createProjectBrainError(
  code: ProjectBrainErrorCode,
  message: string,
): ProjectBrainError {
  const error = new Error(message) as ProjectBrainError;
  error.code = code;

  return error;
}

function normalizeProjectId(projectId: string): string {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw createProjectBrainError(
      "invalid-project-id",
      "Project Brain requires a non-empty projectId.",
    );
  }

  return normalizedProjectId;
}

function isProjectState(value: ProjectState): boolean {
  return (
    typeof value.phase === "string" &&
    Array.isArray(value.completedWork) &&
    Array.isArray(value.activeWork) &&
    Array.isArray(value.blockers) &&
    Array.isArray(value.warnings) &&
    typeof value.progress === "number"
  );
}

function isValidProject(value: unknown, normalizedProjectId: string): boolean {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    value.id === normalizedProjectId
  );
}

function isValidTask(value: unknown, normalizedProjectId: string): boolean {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.projectId) &&
    value.projectId === normalizedProjectId &&
    typeof value.title === "string" &&
    typeof value.createdAt === "string"
  );
}

function isValidKnowledgeEntry(
  value: unknown,
  normalizedProjectId: string,
): boolean {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.projectId) &&
    value.projectId === normalizedProjectId &&
    typeof value.title === "string" &&
    typeof value.content === "string" &&
    typeof value.createdAt === "string"
  );
}

function hasMatchingActiveWork(
  workflowState: ProjectState,
  taskIds: string[],
): boolean {
  return (
    workflowState.activeWork.length === taskIds.length &&
    workflowState.activeWork.every((activeWorkId, index) => activeWorkId === taskIds[index])
  );
}

function isValidWorkflowState(
  value: unknown,
  expectedTaskIds: string[],
): value is ProjectState {
  const projectStateCandidate = value as unknown as ProjectState;

  return (
    isRecord(value) &&
    isProjectState(projectStateCandidate) &&
    hasMatchingActiveWork(projectStateCandidate, expectedTaskIds)
  );
}

function isValidSnapshot(
  value: ProjectBrainSnapshot,
  normalizedProjectId: string,
): boolean {
  const taskIds = value.tasks.map((task) => task.id);

  return (
    isValidProject(value.project, normalizedProjectId) &&
    value.tasks.every((task) => isValidTask(task, normalizedProjectId)) &&
    value.knowledgeEntries.every((entry) =>
      isValidKnowledgeEntry(entry, normalizedProjectId),
    ) &&
    isValidWorkflowState(value.workflowState, taskIds)
  );
}

function withSourceReadHandling<T>(readOperation: () => T): T {
  try {
    return readOperation();
  } catch {
    throw createProjectBrainError(
      "source-read-failed",
      "Project Brain could not read the required source data.",
    );
  }
}

function getEvidenceCount(
  evidence: string[],
  prefix: "warnings" | "blockers",
): number {
  const matchingEntry = evidence.find((entry) => entry.startsWith(`${prefix}:`));

  if (!matchingEntry) {
    return 0;
  }

  const parsedCount = Number.parseInt(matchingEntry.slice(prefix.length + 1), 10);

  return Number.isNaN(parsedCount) ? 0 : parsedCount;
}

export function buildProjectWorkflowState(projectId: string): ProjectState {
  const normalizedProjectId = normalizeProjectId(projectId);
  const project = withSourceReadHandling(() => getProjectById(normalizedProjectId));

  if (!project) {
    throw createProjectBrainError(
      "project-not-found",
      "Project Brain could not find the requested project.",
    );
  }

  if (!isValidProject(project, normalizedProjectId)) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain received an invalid project snapshot source.",
    );
  }

  const tasks = withSourceReadHandling(() => getTasks(normalizedProjectId));
  if (!tasks.every((task) => isValidTask(task, normalizedProjectId))) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain received invalid task snapshot data.",
    );
  }

  const workflowState: ProjectState = {
    phase: PROJECT_BRAIN_PHASE,
    completedWork: [],
    activeWork: tasks.map((task) => task.id),
    blockers: [],
    warnings: [],
    progress: 0,
  };

  if (!isValidWorkflowState(workflowState, tasks.map((task) => task.id))) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain produced an invalid workflow state.",
    );
  }

  return workflowState;
}

export function getProjectBrainSnapshot(
  projectId: string,
): ProjectBrainSnapshot {
  const normalizedProjectId = normalizeProjectId(projectId);
  const project = withSourceReadHandling(() => getProjectById(normalizedProjectId));

  if (!project) {
    throw createProjectBrainError(
      "project-not-found",
      "Project Brain could not find the requested project.",
    );
  }

  if (!isValidProject(project, normalizedProjectId)) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain received an invalid project snapshot source.",
    );
  }

  const tasks = withSourceReadHandling(() => getTasks(normalizedProjectId));
  if (!tasks.every((task) => isValidTask(task, normalizedProjectId))) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain received invalid task snapshot data.",
    );
  }

  const knowledgeEntries = withSourceReadHandling(() =>
    getKnowledge(normalizedProjectId),
  );
  if (
    !knowledgeEntries.every((entry) =>
      isValidKnowledgeEntry(entry, normalizedProjectId),
    )
  ) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain received invalid knowledge snapshot data.",
    );
  }

  const workflowState = buildProjectWorkflowState(normalizedProjectId);
  const snapshot: ProjectBrainSnapshot = {
    project,
    tasks,
    knowledgeEntries,
    workflowState,
  };

  if (!isValidSnapshot(snapshot, normalizedProjectId)) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain produced an invalid snapshot.",
    );
  }

  return snapshot;
}

export function evaluateProjectWorkflow(
  projectId: string,
): WorkflowResult {
  const snapshot = getProjectBrainSnapshot(projectId);

  return evaluateWorkflow(snapshot.workflowState);
}

export function getProjectWorkflowSnapshot(
  projectId: string,
): ProjectWorkflowSnapshot {
  const snapshot = getProjectBrainSnapshot(projectId);
  const workflowResult = evaluateWorkflow(snapshot.workflowState);

  return {
    snapshot,
    workflowResult,
  };
}

export function getProjectConsumerOverview(
  projectId: string,
): ProjectConsumerOverview {
  const workflowSnapshot = getProjectWorkflowSnapshot(projectId);

  return {
    project: {
      id: workflowSnapshot.snapshot.project.id,
      name: workflowSnapshot.snapshot.project.name,
    },
    counts: {
      tasks: workflowSnapshot.snapshot.tasks.length,
      knowledgeEntries: workflowSnapshot.snapshot.knowledgeEntries.length,
    },
    workflow: {
      health: workflowSnapshot.workflowResult.health,
      confidence: workflowSnapshot.workflowResult.confidence,
      nextStep: workflowSnapshot.workflowResult.nextStep,
      warnings: workflowSnapshot.workflowResult.warnings.length,
      blockers: getEvidenceCount(
        workflowSnapshot.workflowResult.evidence,
        "blockers",
      ),
    },
  };
}
