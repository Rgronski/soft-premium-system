"use client";

import Link from "next/link";
import { getTasksFromServer, TaskServerError } from "@/lib/task/browser-server";
import { getProjectById } from "@/lib/project/project";
import { getTask } from "@/lib/task/task";
import type { Task } from "@/lib/task/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const taskDetailJourneySteps = [
  "Task List",
  "Task Detail",
  "Task Workspace",
  "Save Result",
  "Acknowledge Review",
  "Complete Task",
  "Copy Handoff",
];

function getTaskDetailErrorMessage(error: unknown): string {
  if (error instanceof TaskServerError) {
    switch (error.code) {
      case "project-not-found":
        return "Projekt nie istnieje.";
      case "context-unavailable":
        return "Dane projektu są chwilowo niedostępne.";
      case "network-error":
        return "Nie udało się połączyć z serwerem.";
      case "invalid-response":
        return "Serwer zwrócił nieprawidłową odpowiedź.";
      case "invalid-request":
        return "Nie udało się wykonać operacji na zadaniach.";
    }
  }

  return "Nie udało się wykonać operacji na zadaniach.";
}

function createLocalRecoveryTask(
  projectId: string,
  taskId: string,
): { task: Task; recoveryMessage: string } | null {
  try {
    if (!getProjectById(projectId)) {
      return null;
    }

    const localTask = getTask(projectId, taskId);

    if (!localTask) {
      return null;
    }

    return {
      task: localTask,
      recoveryMessage:
        "Project Brain context is unavailable, so showing locally saved task details for this project.",
    };
  } catch {
    return null;
  }
}

type TaskDetailState = {
  task: Task | null;
  isLoading: boolean;
  errorMessage: string | null;
  recoveryMessage: string | null;
};

export default function ProjectTaskDetailPage() {
  const params = useParams<{ id: string; taskId: string }>();
  const [state, setState] = useState<TaskDetailState>({
    task: null,
    isLoading: true,
    errorMessage: null,
    recoveryMessage: null,
  });

  const projectId = params.id;
  const taskId = params.taskId;

  const taskDetail = useMemo(() => state.task, [state.task]);

  useEffect(() => {
    let ignore = false;

    async function loadTask() {
      setState({
        task: null,
        isLoading: true,
        errorMessage: null,
        recoveryMessage: null,
      });

      try {
        const loadedTasks = await getTasksFromServer(projectId);

        if (ignore) {
          return;
        }

        setState({
          task: loadedTasks.find((task) => task.id === taskId) ?? null,
          isLoading: false,
          errorMessage: null,
          recoveryMessage: null,
        });
      } catch (error) {
        if (ignore) {
          return;
        }

        const errorCode =
          error instanceof TaskServerError ? error.code : null;
        const recoveryTask =
          errorCode === "project-not-found" ||
          errorCode === "context-unavailable"
            ? createLocalRecoveryTask(projectId, taskId)
            : null;

        if (recoveryTask) {
          setState({
            task: recoveryTask.task,
            isLoading: false,
            errorMessage: null,
            recoveryMessage: recoveryTask.recoveryMessage,
          });
          return;
        }

        setState({
          task: null,
          isLoading: false,
          errorMessage: getTaskDetailErrorMessage(error),
          recoveryMessage: null,
        });
      }
    }

    void loadTask();

    return () => {
      ignore = true;
    };
  }, [projectId, taskId]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Task Detail
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Current task review
          </h2>
          <p className="text-sm text-zinc-400">
            Review the current task before moving into the workspace.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Journey Checkpoint
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            You are at Task Detail. Next open the task workspace, then follow
            the result sequence in order.
          </p>
          <ol className="mt-4 flex flex-wrap gap-2">
            {taskDetailJourneySteps.map((step, index) => (
              <li
                key={step}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                  index === 1
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                    : index === 2
                      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-100"
                      : "border-zinc-800 bg-zinc-900 text-zinc-300"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {state.recoveryMessage ? (
          <div className="rounded-xl border border-amber-900/50 bg-amber-950/30 p-4">
            <p className="text-sm text-amber-200">{state.recoveryMessage}</p>
          </div>
        ) : null}

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="mb-4">
            <Link
              href={`/projects/${projectId}/tasks/${taskId}/workspace`}
              className="inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Start task workspace
            </Link>
          </div>

          {state.isLoading ? (
            <p className="text-sm text-zinc-400">Loading task...</p>
          ) : state.errorMessage ? (
            <p className="text-sm text-zinc-400">{state.errorMessage}</p>
          ) : taskDetail ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Title
                </p>
                <p className="mt-2 text-base font-medium text-zinc-50">
                  {taskDetail.title}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Task ID
                </p>
                <p className="mt-2 text-base font-medium text-zinc-50">
                  {taskDetail.id}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Project ID
                </p>
                <p className="mt-2 text-base font-medium text-zinc-50">
                  {taskDetail.projectId}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Created At
                </p>
                <p className="mt-2 text-base font-medium text-zinc-50">
                  {new Date(taskDetail.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-zinc-400">Task not found</p>
          )}
        </div>
      </div>
    </section>
  );
}
