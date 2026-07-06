import type { Task } from "./types";

function getTasksStorageKey(projectId: string) {
  return `soft-premium-system.projects.${projectId}.tasks`;
}

export function getTasks(projectId: string): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedTasks = localStorage.getItem(getTasksStorageKey(projectId));
  return savedTasks ? JSON.parse(savedTasks) : [];
}

export function getTask(projectId: string, taskId: string): Task | null {
  const tasks = getTasks(projectId);

  return tasks.find((task) => task.id === taskId) ?? null;
}

export function createTask(projectId: string, title: string): Task | null {
  if (typeof window === "undefined") {
    return null;
  }

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return null;
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    projectId,
    title: trimmedTitle,
    createdAt: new Date().toISOString(),
  };

  const tasks = getTasks(projectId);
  const updatedTasks = [...tasks, newTask];

  localStorage.setItem(
    getTasksStorageKey(projectId),
    JSON.stringify(updatedTasks),
  );

  return newTask;
}
