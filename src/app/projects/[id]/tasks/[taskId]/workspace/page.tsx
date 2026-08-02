"use client";

import {
  getProjectWorkspaceEntry,
  type ProjectWorkspaceEntry,
} from "@/lib/project-brain/engine";
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

type TaskResultSaveState = "idle" | "saved";
type TaskCompletionState = "idle" | "completed";

export default function ProjectTaskWorkspacePage() {
  const params = useParams<{ id: string; taskId: string }>();
  const [state, setState] = useState<TaskWorkspaceState>({
    task: null,
    isLoading: true,
    errorMessage: null,
  });
  const [resultNotes, setResultNotes] = useState("");
  const [resultSaveState, setResultSaveState] =
    useState<TaskResultSaveState>("idle");
  const [taskCompletionState, setTaskCompletionState] =
    useState<TaskCompletionState>("idle");

  const projectId = params.id;
  const taskId = params.taskId;

  const workspaceEntry = useMemo<ProjectWorkspaceEntry | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      return getProjectWorkspaceEntry(projectId);
    } catch {
      return null;
    }
  }, [projectId]);

  const taskWorkspace = useMemo(() => state.task, [state.task]);
  const repositoryUrl = workspaceEntry?.workspace.overview.project.repositoryUrl;
  const isResultNotesEmpty = resultNotes.trim().length === 0;

  function handleSaveResult() {
    if (isResultNotesEmpty) {
      return;
    }

    setResultSaveState("saved");
    setTaskCompletionState("idle");
  }

  function handleCompleteTask() {
    if (resultSaveState !== "saved") {
      return;
    }

    setTaskCompletionState("completed");
  }

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
          <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Repository Context
            </p>
            {repositoryUrl ? (
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
              >
                Open repository
              </a>
            ) : (
              <p className="mt-2 text-sm text-zinc-400">
                Repository context unavailable.
              </p>
            )}
          </div>

          <div
            id="codex-handoff"
            className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Task Handoff
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Prepare this task for Codex review with the current workspace and
              repository context.
            </p>
            <a
              href="#codex-handoff"
              className="mt-3 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Handoff to Codex
            </a>
          </div>

          <div
            id="task-result"
            className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Task Result
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Capture the current task result locally for now.
            </p>
            <label className="mt-3 block text-sm text-zinc-300" htmlFor="task-result-notes">
              Result notes
            </label>
            <textarea
              id="task-result-notes"
              className="mt-2 min-h-28 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
              placeholder="Summarize the result of this task."
              value={resultNotes}
              onChange={(event) => {
                setResultNotes(event.target.value);
                setResultSaveState("idle");
                setTaskCompletionState("idle");
              }}
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
                disabled={isResultNotesEmpty}
                onClick={handleSaveResult}
              >
                Save result
              </button>
              {resultSaveState === "saved" ? (
                <p className="text-sm text-zinc-400" aria-live="polite">
                  Result saved locally.
                </p>
              ) : null}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
                disabled={resultSaveState !== "saved"}
                onClick={handleCompleteTask}
              >
                Complete task
              </button>
              {taskCompletionState === "completed" ? (
                <p className="text-sm text-zinc-400" aria-live="polite">
                  Task completed locally.
                </p>
              ) : null}
            </div>
          </div>

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
