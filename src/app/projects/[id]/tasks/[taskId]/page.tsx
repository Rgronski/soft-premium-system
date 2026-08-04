"use client";

import Link from "next/link";
import { getTasksFromServer, TaskServerError } from "@/lib/task/browser-server";
import type { Task } from "@/lib/task/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function getTaskDetailErrorMessage(error: unknown): string {
  if (error instanceof TaskServerError) {
    switch (error.code) {
      case "project-not-found":
        return "Projekt nie istnieje.";
      case "context-unavailable":
        return "Dane projektu sÄ… chwilowo niedostÄ™pne.";
      case "network-error":
        return "Nie udaĹ‚o siÄ™ poĹ‚Ä…czyÄ‡ z serwerem.";
      case "invalid-response":
        return "Serwer zwrĂłciĹ‚ nieprawidĹ‚owÄ… odpowiedĹş.";
      case "invalid-request":
        return "Nie udaĹ‚o siÄ™ wykonaÄ‡ operacji na zadaniach.";
    }
  }

  return "Nie udaĹ‚o siÄ™ wykonaÄ‡ operacji na zadaniach.";
}

type TaskDetailState = {
  task: Task | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export default function ProjectTaskDetailPage() {
  const params = useParams<{ id: string; taskId: string }>();
  const [state, setState] = useState<TaskDetailState>({
    task: null,
    isLoading: true,
    errorMessage: null,
  });

  const projectId = params.id;
  const taskId = params.taskId;

  const taskDetail = useMemo(
    () => state.task,
    [state.task],
  );

  useEffect(() => {
    let ignore = false;

    async function loadTask() {
      setState({
        task: null,
        isLoading: true,
        errorMessage: null,
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
        });
      } catch (error) {
        if (ignore) {
          return;
        }

        setState({
          task: null,
          isLoading: false,
          errorMessage: getTaskDetailErrorMessage(error),
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
            Task Workspace
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Start task workspace
          </h2>
          <p className="text-sm text-zinc-400">
            Open the task workspace start surface for the current project task.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="mb-4">
            <Link
              href={`/projects/${projectId}/tasks/${taskId}/workspace`}
              className="inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Open task workspace
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
