"use client";

import { getTasksFromServer, TaskServerError } from "@/lib/task/browser-server";
import type { Task } from "@/lib/task/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function getTaskWorkspaceErrorMessage(error: unknown): string {
  if (error instanceof TaskServerError) {
    switch (error.code) {
      case "project-not-found":
        return "Projekt nie istnieje.";
      case "context-unavailable":
        return "Dane projektu sÄ… chwilowo niedostÄ™pne.";
      case "network-error":
        return "Nie udaÅ‚o siÄ™ poÅ‚Ä…czyÄ‡ z serwerem.";
      case "invalid-response":
        return "Serwer zwrĂłciÅ‚ nieprawidÅ‚owÄ… odpowiedÄ‡.";
      case "invalid-request":
        return "Nie udaÅ‚o siÄ™ wykonaÄ‡ operacji na zadaniach.";
    }
  }

  return "Nie udaÅ‚o siÄ™ otworzyÄ‡ obszaru roboczego zadania.";
}

type TaskWorkspaceState = {
  task: Task | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export default function ProjectTaskWorkspacePage() {
  const params = useParams<{ id: string; taskId: string }>();
  const [state, setState] = useState<TaskWorkspaceState>({
    task: null,
    isLoading: true,
    errorMessage: null,
  });

  const projectId = params.id;
  const taskId = params.taskId;

  const taskWorkspace = useMemo(() => state.task, [state.task]);

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
          errorMessage: getTaskWorkspaceErrorMessage(error),
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
            Task workspace start
          </h2>
          <p className="text-sm text-zinc-400">
            Start the task workspace for the current project task.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          {state.isLoading ? (
            <p className="text-sm text-zinc-400">Loading task workspace...</p>
          ) : state.errorMessage ? (
            <p className="text-sm text-zinc-400">{state.errorMessage}</p>
          ) : taskWorkspace ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Workspace Task
                </p>
                <p className="mt-2 text-base font-medium text-zinc-50">
                  {taskWorkspace.title}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Task ID
                  </p>
                  <p className="mt-2 text-base font-medium text-zinc-50">
                    {taskWorkspace.id}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Project ID
                  </p>
                  <p className="mt-2 text-base font-medium text-zinc-50">
                    {taskWorkspace.projectId}
                  </p>
                </div>
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
