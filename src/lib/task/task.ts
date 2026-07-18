import type { Task } from "./types";

type CreateTaskCommand = {
  commandId: string;
  projectId: string;
  title: string;
};

type StoredTask = Task & {
  commandId?: string;
};

type TaskCommandConflictError = Error & {
  code: "command-identity-conflict";
};

function toPublicTask(task: StoredTask): Task {
  return {
    id: task.id,
    projectId: task.projectId,
    title: task.title,
    createdAt: task.createdAt,
  };
}

function getTasksStorageKey(projectId: string) {
  return `soft-premium-system.projects.${projectId}.tasks`;
}

function isTaskStorageKey(key: string) {
  return key.startsWith("soft-premium-system.projects.") && key.endsWith(".tasks");
}

function readStoredTasks(storageKey: string): StoredTask[] {
  const savedTasks = localStorage.getItem(storageKey);
  return savedTasks ? JSON.parse(savedTasks) : [];
}

function getTaskStorageKeys(): string[] {
  const storageKeys: string[] = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const storageKey = localStorage.key(index);

    if (storageKey && isTaskStorageKey(storageKey)) {
      storageKeys.push(storageKey);
    }
  }

  return storageKeys;
}

function createTaskCommandConflictError(): TaskCommandConflictError {
  const error = new Error(
    "Task Engine rejected a reused commandId with different normalized input.",
  ) as TaskCommandConflictError;
  error.code = "command-identity-conflict";

  return error;
}

function findTaskByCommandId(commandId: string): StoredTask | null {
  for (const storageKey of getTaskStorageKeys()) {
    const storedTasks = readStoredTasks(storageKey);
    const matchingTask = storedTasks.find((task) => task.commandId === commandId);

    if (matchingTask) {
      return matchingTask;
    }
  }

  return null;
}

export function getTasks(projectId: string): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  return readStoredTasks(getTasksStorageKey(projectId));
}

export function getTask(projectId: string, taskId: string): Task | null {
  const tasks = getTasks(projectId);

  return tasks.find((task) => task.id === taskId) ?? null;
}

export function createTask(command: CreateTaskCommand): Task | null {
  if (typeof window === "undefined") {
    return null;
  }

  const trimmedCommandId = command.commandId.trim();
  const trimmedProjectId = command.projectId.trim();
  const trimmedTitle = command.title.trim();

  if (!trimmedCommandId || !trimmedProjectId) {
    return null;
  }

  if (!trimmedTitle) {
    return null;
  }

  const existingTask = findTaskByCommandId(trimmedCommandId);

  if (existingTask) {
    if (
      existingTask.projectId !== trimmedProjectId ||
      existingTask.title.trim() !== trimmedTitle
    ) {
      throw createTaskCommandConflictError();
    }

    return toPublicTask(existingTask);
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    projectId: trimmedProjectId,
    title: trimmedTitle,
    createdAt: new Date().toISOString(),
  };

  const tasks = readStoredTasks(getTasksStorageKey(trimmedProjectId));
  const updatedTasks: StoredTask[] = [
    ...tasks,
    {
      ...newTask,
      commandId: trimmedCommandId,
    },
  ];

  localStorage.setItem(
    getTasksStorageKey(trimmedProjectId),
    JSON.stringify(updatedTasks),
  );

  return newTask;
}
