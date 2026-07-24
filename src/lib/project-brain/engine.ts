import { getKnowledge } from "../knowledge/knowledge";
import { getProjectById } from "../project/project";
import { createTask, getTasks } from "../task/task";
import { evaluateWorkflow } from "../workflow/engine";
import type { ProjectState, WorkflowResult } from "../workflow/types";

import type {
  AiProjectContext,
  AiProjectContextResult,
  ProjectConsumerKnowledgeEntry,
  ProjectConsumerOverview,
  ProjectConsumerTask,
  ProjectBrainSnapshot,
  ProjectConsumerWorkspace,
  ProjectWorkflowSnapshot,
} from "./types";

export type ProjectContextReader = {
  getProjectById(projectId: string): Promise<
    import("../project/types").Project | null
  >;
  getTasksByProjectId(projectId: string): Promise<
    import("../task/types").Task[]
  >;
  getKnowledgeEntriesByProjectId(projectId: string): Promise<
    import("../knowledge/types").KnowledgeEntry[]
  >;
};

export type ServerAiProjectContextResult =
  | {
      status: "available";
      context: AiProjectContext;
    }
  | {
      status: "project-not-found";
    }
  | {
      status: "unavailable";
    };

export type CreateProjectBrainTaskCommand = {
  commandId: string;
  projectId: string;
  title: string;
};

export type CreateProjectBrainTaskResult =
  | {
      status: "completed";
      commandId: string;
      taskId: string;
      snapshot: ProjectBrainSnapshot;
    }
  | {
      status: "completed-with-refresh-failure";
      commandId: string;
      taskId: string;
    };

type ProjectBrainErrorCode =
  | "invalid-command-id"
  | "invalid-project-id"
  | "invalid-task-title"
  | "command-identity-conflict"
  | "project-not-found"
  | "source-write-failed"
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

function normalizeCommandId(commandId: string): string {
  const normalizedCommandId = commandId.trim();

  if (!normalizedCommandId) {
    throw createProjectBrainError(
      "invalid-command-id",
      "Project Brain requires a non-empty commandId.",
    );
  }

  return normalizedCommandId;
}

function normalizeTaskTitle(title: string): string {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw createProjectBrainError(
      "invalid-task-title",
      "Project Brain requires a non-empty task title.",
    );
  }

  return normalizedTitle;
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

function projectConsumerOverview(
  workflowSnapshot: ProjectWorkflowSnapshot,
): ProjectConsumerOverview {
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

function projectConsumerTask(task: ProjectBrainSnapshot["tasks"][number]): ProjectConsumerTask {
  return {
    id: task.id,
    title: task.title,
  };
}

function projectConsumerKnowledgeEntry(
  knowledgeEntry: ProjectBrainSnapshot["knowledgeEntries"][number],
): ProjectConsumerKnowledgeEntry {
  return {
    id: knowledgeEntry.id,
    title: knowledgeEntry.title,
  };
}

function projectWorkflowStateFromSnapshotParts(
  project: unknown,
  tasks: ProjectBrainSnapshot["tasks"],
  normalizedProjectId: string,
): ProjectState {
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

export function composeProjectBrainSnapshot(input: {
  project: unknown;
  tasks: ProjectBrainSnapshot["tasks"];
  knowledgeEntries: ProjectBrainSnapshot["knowledgeEntries"];
  projectId: string;
}): ProjectBrainSnapshot {
  const normalizedProjectId = normalizeProjectId(input.projectId);
  const { project, tasks, knowledgeEntries } = input;

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

  if (!tasks.every((task) => isValidTask(task, normalizedProjectId))) {
    throw createProjectBrainError(
      "invalid-snapshot",
      "Project Brain received invalid task snapshot data.",
    );
  }

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

  const workflowState = projectWorkflowStateFromSnapshotParts(
    project,
    tasks,
    normalizedProjectId,
  );
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

export function buildProjectWorkflowState(projectId: string): ProjectState {
  const normalizedProjectId = normalizeProjectId(projectId);
  const project = withSourceReadHandling(() => getProjectById(normalizedProjectId));
  const tasks = withSourceReadHandling(() => getTasks(normalizedProjectId));

  return projectWorkflowStateFromSnapshotParts(
    project,
    tasks,
    normalizedProjectId,
  );
}

export function getProjectBrainSnapshot(
  projectId: string,
): ProjectBrainSnapshot {
  const normalizedProjectId = normalizeProjectId(projectId);
  const project = withSourceReadHandling(() => getProjectById(normalizedProjectId));
  const tasks = withSourceReadHandling(() => getTasks(normalizedProjectId));
  const knowledgeEntries = withSourceReadHandling(() =>
    getKnowledge(normalizedProjectId),
  );

  return composeProjectBrainSnapshot({
    project,
    tasks,
    knowledgeEntries,
    projectId: normalizedProjectId,
  });
}

export function getCurrentProjectBrainState(
  projectId: string,
): ProjectBrainSnapshot {
  return getProjectBrainSnapshot(projectId);
}

export function aiProjectContextFromSnapshot(
  snapshot: ProjectBrainSnapshot,
): AiProjectContext {
  return {
    projectId: snapshot.project.id,
    projectName: snapshot.project.name,
    tasks: snapshot.tasks.map((task) => ({
      id: task.id,
      title: task.title,
    })),
    knowledgeEntries: snapshot.knowledgeEntries.map((knowledgeEntry) => ({
      id: knowledgeEntry.id,
      title: knowledgeEntry.title,
      content: knowledgeEntry.content,
    })),
  };
}

export function getAiProjectContext(
  projectId: string,
): AiProjectContextResult {
  const normalizedProjectId = normalizeProjectId(projectId);

  try {
    return {
      status: "available",
      context: aiProjectContextFromSnapshot(
        getCurrentProjectBrainState(normalizedProjectId),
      ),
    };
  } catch (error) {
    const errorCode =
      error instanceof Error && "code" in error && typeof error.code === "string"
        ? error.code
        : null;

    if (errorCode === "project-not-found") {
      return {
        status: "project-not-found",
        projectId: normalizedProjectId,
      };
    }

    if (errorCode === "source-read-failed" || errorCode === "invalid-snapshot") {
      return {
        status: "unavailable",
        projectId: normalizedProjectId,
      };
    }

    throw error;
  }
}

export function createProjectBrainTask(
  command: CreateProjectBrainTaskCommand,
): CreateProjectBrainTaskResult {
  const normalizedCommandId = normalizeCommandId(command.commandId);
  const normalizedProjectId = normalizeProjectId(command.projectId);
  const normalizedTitle = normalizeTaskTitle(command.title);
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

  let createdTask: ReturnType<typeof createTask>;

  try {
    createdTask = createTask({
      commandId: normalizedCommandId,
      projectId: normalizedProjectId,
      title: normalizedTitle,
    });
  } catch (error) {
    if ((error as { code?: string }).code === "command-identity-conflict") {
      throw createProjectBrainError(
        "command-identity-conflict",
        "Project Brain rejected a reused commandId with different normalized input.",
      );
    }

    throw createProjectBrainError(
      "source-write-failed",
      "Project Brain could not write the requested task.",
    );
  }

  if (!createdTask) {
    throw createProjectBrainError(
      "source-write-failed",
      "Project Brain could not write the requested task.",
    );
  }

  try {
    return {
      status: "completed",
      commandId: normalizedCommandId,
      taskId: createdTask.id,
      snapshot: getCurrentProjectBrainState(normalizedProjectId),
    };
  } catch {
    return {
      status: "completed-with-refresh-failure",
      commandId: normalizedCommandId,
      taskId: createdTask.id,
    };
  }
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
  const snapshot = getCurrentProjectBrainState(projectId);
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
    ...projectConsumerOverview(workflowSnapshot),
  };
}

export function getProjectConsumerWorkspace(
  projectId: string,
): ProjectConsumerWorkspace {
  const workflowSnapshot = getProjectWorkflowSnapshot(projectId);

  return {
    overview: projectConsumerOverview(workflowSnapshot),
    tasks: workflowSnapshot.snapshot.tasks.map((task) => projectConsumerTask(task)),
    knowledgeEntries: workflowSnapshot.snapshot.knowledgeEntries.map((entry) =>
      projectConsumerKnowledgeEntry(entry),
    ),
  };
}
