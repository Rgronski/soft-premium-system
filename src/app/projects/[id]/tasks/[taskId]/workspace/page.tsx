"use client";

import Link from "next/link";
import {
  getProjectWorkspaceEntry,
  type ProjectWorkspaceEntry,
} from "@/lib/project-brain/engine";
import { getProjectFromServer } from "@/lib/project/browser-server";
import { getTasksFromServer, TaskServerError } from "@/lib/task/browser-server";
import { getProjectById } from "@/lib/project/project";
import { getTask } from "@/lib/task/task";
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
  recoveryMessage: string | null;
};

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
        "Kontekst Project Brain jest niedostępny, więc pokazuję lokalnie zapisane szczegóły przestrzeni zadania dla tego projektu.",
    };
  } catch {
    return null;
  }
}

type TaskResultSaveState = "idle" | "saved";
type TaskCompletionState = "idle" | "completed";
type TaskCompletionReportCopyState = "idle" | "copied";
type TaskEvidenceReviewState = "idle" | "acknowledged";
type TaskRepositoryOpenState = "idle" | "opened" | "reset" | "restored";

function getTaskResultNotesStorageKey(projectId: string, taskId: string) {
  return `soft-premium-system.projects.${projectId}.tasks.${taskId}.workspace.result-notes`;
}

function getTaskCompletionStorageKey(projectId: string, taskId: string) {
  return `soft-premium-system.projects.${projectId}.tasks.${taskId}.workspace.completion`;
}

function getTaskEvidenceReviewStorageKey(projectId: string, taskId: string) {
  return `soft-premium-system.projects.${projectId}.tasks.${taskId}.workspace.evidence-review`;
}

function getTaskRepositoryOpenStorageKey(projectId: string, taskId: string) {
  return `soft-premium-system.projects.${projectId}.tasks.${taskId}.workspace.repository-open`;
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

function readSavedTaskRepositoryOpenState(
  projectId: string,
  taskId: string,
): "idle" | "opened" {
  if (typeof window === "undefined") {
    return "idle";
  }

  return localStorage.getItem(
    getTaskRepositoryOpenStorageKey(projectId, taskId),
  ) === "opened"
    ? "opened"
    : "idle";
}

const taskWorkspaceJourneySteps = [
  "Szczegóły zadania",
  "Przestrzeń zadania",
  "Zapisz wynik",
  "Potwierdź przegląd",
  "Zakończ zadanie",
  "Skopiuj przekazanie",
];

export default function ProjectTaskWorkspacePage() {
  const params = useParams<{ id: string; taskId: string }>();
  const [state, setState] = useState<TaskWorkspaceState>({
    task: null,
    isLoading: true,
    errorMessage: null,
    recoveryMessage: null,
  });
  const [resultNotes, setResultNotes] = useState("");
  const [resultSaveState, setResultSaveState] =
    useState<TaskResultSaveState>("idle");
  const [taskCompletionState, setTaskCompletionState] =
    useState<TaskCompletionState>("idle");
  const [taskCompletionReportCopyState, setTaskCompletionReportCopyState] =
    useState<TaskCompletionReportCopyState>("idle");
  const [taskCompletionReportCopyResetState, setTaskCompletionReportCopyResetState] =
    useState<"idle" | "reset">("idle");
  const [taskCompletionReportCopyRestoreState, setTaskCompletionReportCopyRestoreState] =
    useState<"idle" | "restored">("idle");
  const [taskCompletionResetState, setTaskCompletionResetState] =
    useState<"idle" | "reset">("idle");
  const [taskCompletionRestoreState, setTaskCompletionRestoreState] =
    useState<"idle" | "restored">("idle");
  const [taskCodexHandoffJumpState, setTaskCodexHandoffJumpState] =
    useState<"idle" | "jumped">("idle");
  const [taskRepositoryOpenState, setTaskRepositoryOpenState] =
    useState<TaskRepositoryOpenState>("idle");
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
      ? "Przegląd dowodów potwierdzono lokalnie."
      : taskCompletionState === "completed"
      ? "Dowody wyniku przejrzano lokalnie."
      : resultSaveState === "saved"
        ? "Wynik zapisano lokalnie. Następna akcja: potwierdź przegląd."
        : "Oczekiwanie na dowody wyniku.";

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
    setTaskCompletionReportCopyResetState("idle");
    setTaskCompletionReportCopyRestoreState(
      taskCompletionReportCopyResetState === "reset" ? "restored" : "idle",
    );
    setTaskCompletionResetState("idle");
    setTaskCompletionRestoreState(
      taskCompletionResetState === "reset" ? "restored" : "idle",
    );
    setTaskCodexHandoffJumpState("idle");
    setTaskRepositoryOpenState(
      taskRepositoryOpenState === "opened"
        ? "reset"
        : taskRepositoryOpenState === "reset"
          ? "restored"
          : "idle",
    );
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
    setTaskCompletionReportCopyResetState("idle");
    setTaskCompletionReportCopyRestoreState("idle");
    setTaskCompletionResetState("idle");
    setTaskCompletionRestoreState("idle");
    setTaskCodexHandoffJumpState("idle");
    setTaskRepositoryOpenState("idle");
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
      "Przekazanie ukończenia zadania",
      "Zadanie zakończono lokalnie.",
      `Zapisane notatki wyniku: ${resultNotes}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(completionReport);
    } catch {
      return;
    }

    setTaskCompletionReportCopyState("copied");
    setTaskCompletionReportCopyResetState("idle");
    setTaskCompletionReportCopyRestoreState("idle");
  }

  function handleCodexHandoffJump() {
    setTaskCodexHandoffJumpState("jumped");
  }

  function handleRepositoryOpen() {
    localStorage.setItem(getTaskRepositoryOpenStorageKey(projectId, taskId), "opened");
    setTaskRepositoryOpenState("opened");
  }

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

        const errorCode = error instanceof TaskServerError ? error.code : null;
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
          errorMessage: getTaskWorkspaceErrorMessage(error),
          recoveryMessage: null,
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
    setTaskRepositoryOpenState(
      readSavedTaskRepositoryOpenState(projectId, taskId),
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
                label: "Kontynuuj aktywną pracę",
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
            Przestrzeń zadania
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Start przestrzeni zadania
          </h2>
          <p className="text-sm text-zinc-400">
            Uruchom przestrzeń zadania dla bieżącego zadania projektu.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Punkt kontrolny ścieżki
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Jesteś w przestrzeni zadania. Wykonaj pozostałe akcje po kolei:
            zapisz wynik, potwierdź przegląd, zakończ zadanie, a potem skopiuj
            przekazanie.
          </p>
          <ol className="mt-4 flex flex-wrap gap-2">
            {taskWorkspaceJourneySteps.map((step, index) => (
              <li
                key={step}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                  index === 1
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                    : index >= 2
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

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          {state.recoveryMessage ? (
            <div className="mb-4 rounded-xl border border-amber-900/50 bg-amber-950/30 p-4">
              <p className="text-sm text-amber-200">{state.recoveryMessage}</p>
            </div>
          ) : null}

          {taskWorkspaceNextStep ? (
            <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Akcja następnego kroku
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
                  Przejdź do notatek wyniku
                </button>

                <Link
                  href={`/projects/${projectId}/tasks`}
                  className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
                >
                  Wróć do listy zadań
                </Link>
              </div>
            </div>
          ) : null}

          <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Kontekst repozytorium
            </p>
            {repositoryUrl ? (
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={handleRepositoryOpen}
                className="mt-2 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
              >
                Otwórz repozytorium
              </a>
            ) : (
              <p className="mt-2 text-sm text-zinc-400">
                Kontekst repozytorium niedostępny.
              </p>
            )}
            {taskRepositoryOpenState === "opened" ? (
              <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
                Repozytorium otwarte lokalnie.
              </p>
            ) : taskRepositoryOpenState === "reset" ? (
              <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
                Reset otwarcia repozytorium lokalnie.
              </p>
            ) : taskRepositoryOpenState === "restored" ? (
              <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
                Przywrócono otwarcie repozytorium lokalnie.
              </p>
            ) : null}
          </div>

          <div
            id="codex-handoff"
            className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Przekazanie zadania
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Przygotuj to zadanie do przeglądu przez Codex z bieżącą
              przestrzenią roboczą i kontekstem repozytorium.
            </p>
            <a
              href="#codex-handoff"
              onClick={handleCodexHandoffJump}
              className="mt-3 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Przekaż do Codex
            </a>
            {taskCodexHandoffJumpState === "jumped" ? (
              <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
                Przekazanie do Codex otwarte lokalnie.
              </p>
            ) : null}
          </div>

          <div
            id="task-result"
            className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Wynik zadania
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Zapisz bieżący wynik zadania lokalnie na teraz.
            </p>
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Przegląd dowodów
              </p>
              <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
                {evidenceReviewStatus}
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Źródło przeglądu: lokalne notatki wyniku i stan ukończenia.
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Sekwencja: zapisz wynik, potem potwierdź przegląd przed zakończeniem zadania.
              </p>
              <button
                type="button"
                className="mt-3 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
                disabled={!canAcknowledgeEvidenceReview}
                onClick={handleAcknowledgeEvidenceReview}
              >
                {taskEvidenceReviewState === "acknowledged"
                    ? "Potwierdzono lokalnie"
                  : resultSaveState === "saved"
                    ? "Potwierdź przegląd teraz"
                    : "Potwierdź przegląd"}
              </button>
            </div>
            <label
              className="mt-3 block text-sm text-zinc-300"
              htmlFor="task-result-notes"
            >
              Notatki wyniku
            </label>
            <textarea
              ref={taskResultNotesRef}
              id="task-result-notes"
              className="mt-2 min-h-28 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-50 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
              placeholder="Podsumuj wynik tego zadania."
              value={resultNotes}
              onChange={(event) => {
                const hadCompletedFlow =
                  taskCompletionState === "completed" ||
                  taskCompletionReportCopyState === "copied" ||
                  taskEvidenceReviewState === "acknowledged";
                const hadCopiedCompletionHandoff =
                  taskCompletionReportCopyState === "copied";
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
                setTaskCompletionReportCopyResetState(
                  hadCopiedCompletionHandoff ? "reset" : "idle",
                );
                setTaskCompletionReportCopyRestoreState("idle");
                setTaskCompletionResetState(hadCompletedFlow ? "reset" : "idle");
                setTaskCompletionRestoreState("idle");
                setTaskCodexHandoffJumpState("idle");
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
                {taskCompletionRestoreState === "restored"
                  ? "Przywrócono lokalnie"
                  : resultSaveState === "saved"
                    ? "Zapisano lokalnie"
                    : "Zapisz wynik"}
              </button>
              {taskCompletionRestoreState === "restored" ? (
                <p className="text-sm text-zinc-400" aria-live="polite">
                  Ukończenie przywrócone lokalnie.
                </p>
              ) : resultSaveState === "saved" ? (
                <p className="text-sm text-zinc-400" aria-live="polite">
                  Wynik zapisano lokalnie.
                </p>
              ) : null}
              {taskCompletionReportCopyRestoreState === "restored" ? (
                <p className="text-sm text-zinc-400" aria-live="polite">
                  Przekazanie ukończenia przywrócone lokalnie.
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
                {taskCompletionState === "completed"
                  ? "Zakończono lokalnie"
                  : "Zakończ zadanie"}
              </button>
            </div>
            {taskCompletionResetState === "reset" ? (
              <p className="mt-3 text-sm text-zinc-400" aria-live="polite">
                Ukończenie zresetowane lokalnie.
              </p>
            ) : null}
            {taskCompletionReportCopyResetState === "reset" ? (
              <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
                Reset przekazania ukończenia lokalnie.
              </p>
            ) : null}
            {taskCompletionState === "completed" ? (
              <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Podsumowanie ukończenia
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Zadanie zakończono lokalnie.
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  Zapisane notatki wyniku: {resultNotes}
                </p>
                {taskEvidenceReviewState === "acknowledged" ? (
                  <p className="mt-2 text-sm text-zinc-300">
                    Przegląd dowodów potwierdzono lokalnie.
                  </p>
                ) : null}
                <p className="mt-2 text-sm text-zinc-300">
                  Następna akcja: skopiuj przekazanie.
                </p>
                <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Przekazanie ukończenia zadania
                  </p>
                  <p className="mt-2 whitespace-pre-wrap rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
                    {`Przekazanie ukończenia zadania
Zadanie zakończono lokalnie.
Zapisane notatki wyniku: ${resultNotes}${taskEvidenceReviewState === "acknowledged" ? "\nPrzegląd dowodów potwierdzono lokalnie." : ""}`}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
                    onClick={handleCopyCompletionReport}
                  >
                    {taskCompletionReportCopyState === "copied"
                      ? "Skopiowano lokalnie"
                      : "Skopiuj przekazanie"}
                  </button>
                  {taskCompletionReportCopyState === "copied" ? (
                    <div className="space-y-1" aria-live="polite">
                      <p className="text-sm text-zinc-400">
                        Przekazanie ukończenia skopiowane.
                      </p>
                      <p className="text-sm text-zinc-300">
                        Przekazanie skopiowane. Możesz teraz wkleić je do następnej sesji.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          {state.isLoading ? (
            <p className="text-sm text-zinc-400">Ładowanie przestrzeni zadania...</p>
          ) : state.errorMessage ? (
            <p className="text-sm text-zinc-400">{state.errorMessage}</p>
          ) : taskWorkspace ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Zadanie w przestrzeni
                </p>
                <p className="mt-2 text-base font-medium text-zinc-50">
                  {taskWorkspace.title}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    ID zadania
                  </p>
                  <p className="mt-2 text-base font-medium text-zinc-50">
                    {taskWorkspace.id}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    ID projektu
                  </p>
                  <p className="mt-2 text-base font-medium text-zinc-50">
                    {taskWorkspace.projectId}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-zinc-400">Nie znaleziono zadania</p>
          )}
        </div>
      </div>
    </section>
  );
}
