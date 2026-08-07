"use client";

import {
  getProjectWorkspaceEntry,
  type ProjectWorkspaceEntry,
} from "@/lib/project-brain/engine";
import { getProjectFromServer } from "@/lib/project/browser-server";
import { getTasksFromServer, TaskServerError } from "@/lib/task/browser-server";
import type { Task } from "@/lib/task/types";
import type { WorkflowNextStep } from "@/lib/workflow/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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
type TaskCompletionReportCopyState = "idle" | "copied";
type TaskEvidenceReviewState = "idle" | "acknowledged";

function getTaskResultNotesStorageKey(projectId: string, taskId: string) {
  return `soft-premium-system.projects.${projectId}.tasks.${taskId}.workspace.result-notes`;
}

function getTaskCompletionStorageKey(projectId: string, taskId: string) {
  return `soft-premium-system.projects.${projectId}.tasks.${taskId}.workspace.completion`;
}

function getTaskEvidenceReviewStorageKey(projectId: string, taskId: string) {
  return `soft-premium-system.projects.${projectId}.tasks.${taskId}.workspace.evidence-review`;
}

function readSavedTaskResultNotes(projectId: string, taskId: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return (
    localStorage.getItem(getTaskResultNotesStorageKey(projectId, taskId)) ?? ""
  );
}

function readSavedTaskCompletionState(
  projectId: string,
  taskId: string,
): TaskCompletionState {
  if (typeof window === "undefined") {
    return "idle";
  }

  return localStorage.getItem(getTaskCompletionStorageKey(projectId, taskId)) ===
    "completed"
    ? "completed"
    : "idle";
}

function readSavedTaskEvidenceReviewState(
  projectId: string,
  taskId: string,
): TaskEvidenceReviewState {
  if (typeof window === "undefined") {
    return "idle";
  }

  return localStorage.getItem(
    getTaskEvidenceReviewStorageKey(projectId, taskId),
  ) === "acknowledged"
    ? "acknowledged"
    : "idle";
}

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
  const [taskCompletionReportCopyState, setTaskCompletionReportCopyState] =
    useState<TaskCompletionReportCopyState>("idle");
  const [taskEvidenceReviewState, setTaskEvidenceReviewState] =
    useState<TaskEvidenceReviewState>("idle");
  const [canonicalNextStep, setCanonicalNextStep] =
    useState<WorkflowNextStep | null>(null);
  const taskResultNotesRef = useRef<HTMLTextAreaElement | null>(null);

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
  const taskWorkspaceNextStep =
    workspaceEntry?.workspace.overview.workflow.nextStep ?? canonicalNextStep;
  const isResultNotesEmpty = resultNotes.trim().length === 0;
  const evidenceReviewStatus =
    taskEvidenceReviewState === "acknowledged"
      ? "Evidence review acknowledged locally."
      : taskCompletionState === "completed"
      ? "Result evidence reviewed locally."
      : resultSaveState === "saved"
        ? "Result evidence saved locally."
        : "Awaiting result evidence.";

  const canAcknowledgeEvidenceReview = resultSaveState === "saved";

  function handleNextStepAction() {
    taskResultNotesRef.current?.focus();
  }

  function handleSaveResult() {
    if (isResultNotesEmpty) {
      return;
    }

    localStorage.setItem(
      getTaskResultNotesStorageKey(projectId, taskId),
      resultNotes,
    );
    setResultSaveState("saved");
    setTaskCompletionState("idle");
    setTaskCompletionReportCopyState("idle");
    setTaskEvidenceReviewState("idle");
  }

  function handleCompleteTask() {
    if (resultSaveState !== "saved") {
      return;
    }

    localStorage.setItem(
      getTaskCompletionStorageKey(projectId, taskId),
      "completed",
    );
    setTaskCompletionState("completed");
    setTaskCompletionReportCopyState("idle");
  }

  function handleAcknowledgeEvidenceReview() {
    if (!canAcknowledgeEvidenceReview) {
      return;
    }

    localStorage.setItem(
      getTaskEvidenceReviewStorageKey(projectId, taskId),
      "acknowledged",
    );
    setTaskEvidenceReviewState("acknowledged");
  }

  async function handleCopyCompletionReport() {
    const completionReport = [
      "Task completed locally.",
      `Saved result notes: ${resultNotes}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(completionReport);
    } catch {
      return;
    }

    setTaskCompletionReportCopyState("copied");
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

  useEffect(() => {
    setResultNotes(readSavedTaskResultNotes(projectId, taskId));
    setTaskCompletionState(readSavedTaskCompletionState(projectId, taskId));
    setTaskEvidenceReviewState(
      readSavedTaskEvidenceReviewState(projectId, taskId),
    );
    setResultSaveState("idle");
    setTaskCompletionReportCopyState("idle");
  }, [projectId, taskId]);

  useEffect(() => {
    let ignore = false;

    async function loadCanonicalNextStep() {
      if (workspaceEntry) {
        if (!ignore) {
          setCanonicalNextStep(
            workspaceEntry.workspace.overview.workflow.nextStep ?? null,
          );
        }

        return;
      }

      try {
        const [project, tasks] = await Promise.all([
          getProjectFromServer(projectId),
          getTasksFromServer(projectId),
        ]);

        if (!project || ignore) {
          return;
        }

        const nextStep: WorkflowNextStep =
          tasks.length > 0
            ? {
                id: "continue-active-work",
                label: "Continue active work",
                description:
                  "Continue the active workflow item before starting new work.",
              }
            : {
                id: "start-next-work",
                label: "Start next work",
                description: "Start the next safe workflow item.",
              };

        setCanonicalNextStep(nextStep);
      } catch {
        if (!ignore) {
          setCanonicalNextStep(null);
        }
      }
    }

    void loadCanonicalNextStep();

    return () => {
      ignore = true;
    };
  }, [projectId, workspaceEntry]);

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
          {taskWorkspaceNextStep ? (
            <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Next Step Action
              </p>
              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-medium text-zinc-50">
                    {taskWorkspaceNextStep.label}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {taskWorkspaceNextStep.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
                  aria-controls="task-result-notes"
                  onClick={handleNextStepAction}
                >
                  Continue to result notes
                </button>
              </div>
            </div>
          ) : null}

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
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Evidence Review
              </p>
              <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
                {evidenceReviewStatus}
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Review source: local result notes and completion state.
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Sequence: save the result, acknowledge the review, then complete the task.
              </p>
              <button
                type="button"
                className="mt-3 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
                disabled={!canAcknowledgeEvidenceReview}
                onClick={handleAcknowledgeEvidenceReview}
              >
                {taskEvidenceReviewState === "acknowledged"
                  ? "Acknowledged locally"
                  : "Acknowledge review"}
              </button>
            </div>
            <label
              className="mt-3 block text-sm text-zinc-300"
              htmlFor="task-result-notes"
            >
              Result notes
            </label>
            <textarea
              ref={taskResultNotesRef}
              id="task-result-notes"
              className="mt-2 min-h-28 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
              placeholder="Summarize the result of this task."
              value={resultNotes}
              onChange={(event) => {
                localStorage.removeItem(
                  getTaskCompletionStorageKey(projectId, taskId),
                );
                localStorage.removeItem(
                  getTaskEvidenceReviewStorageKey(projectId, taskId),
                );
                setResultNotes(event.target.value);
                setResultSaveState("idle");
                setTaskCompletionState("idle");
                setTaskCompletionReportCopyState("idle");
                setTaskEvidenceReviewState("idle");
              }}
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
                disabled={isResultNotesEmpty}
                onClick={handleSaveResult}
              >
                {resultSaveState === "saved" ? "Saved locally" : "Save result"}
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
            </div>
            {taskCompletionState === "completed" ? (
              <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Completion Summary
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Task completed locally.
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  Saved result notes: {resultNotes}
                </p>
                {taskEvidenceReviewState === "acknowledged" ? (
                  <p className="mt-2 text-sm text-zinc-300">
                    Evidence review acknowledged locally.
                  </p>
                ) : null}
                <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Task completion handoff
                  </p>
                  <p className="mt-2 whitespace-pre-wrap rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
                    {`Task completion handoff
Task completed locally.
Saved result notes: ${resultNotes}${taskEvidenceReviewState === "acknowledged" ? "\nEvidence review acknowledged locally." : ""}`}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
                    onClick={handleCopyCompletionReport}
                  >
                    Copy report
                  </button>
                  {taskCompletionReportCopyState === "copied" ? (
                    <p className="text-sm text-zinc-400" aria-live="polite">
                      Completion report copied.
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
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
