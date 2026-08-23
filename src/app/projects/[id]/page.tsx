"use client";

import { deleteProjectFromServer } from "@/lib/project/browser-server";
import { WorkspaceContent } from "@/components/workspace/WorkspaceContent";
import { WorkspaceCollections } from "@/components/workspace/WorkspaceCollections";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { WorkspacePanels } from "@/components/workspace/WorkspacePanels";
import { getTasksFromServer } from "@/lib/task/browser-server";
import {
  getProjectWorkspaceEntry,
  type ProjectWorkspaceEntry,
} from "@/lib/project-brain/engine";
import { getKnowledge } from "@/lib/knowledge/knowledge";
import {
  deleteProject,
  getProjectById,
  getProjectBindingDecisionSummary,
} from "@/lib/project/project";
import {
  buildRepoCheckoutDirectoryHint,
  clearProjectSourceStatus,
  readProjectBranchWorkMode,
  readProjectWorkingBranchName,
  saveProjectSourceStatus,
  type ProjectSourceReconciliationStatus,
  type ProjectSourceWorkingTreeState,
} from "@/lib/project/source-status";
import { getTasks } from "@/lib/task/task";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const projectJourneySteps = [
  "Projekt",
  "Lista zadań",
  "Szczegóły zadania",
  "Przestrzeń zadania",
  "Zapisz wynik",
  "Potwierdź przegląd",
  "Zakończ zadanie",
  "Skopiuj przekazanie",
];

const PROJECT_DELETE_ACTIONS = [
  {
    value: "detach-from-sps",
    label: "Odpinanie z SPS OS",
    description:
      "Usuwa wpis projektu z SPS OS i z lokalnego widoku projektu. Nie kasuje dysku.",
  },
  {
    value: "detach-browser-cleanup",
    label: "Odpinanie + browser/localStorage",
    description:
      "Czyści też lokalny stan projektu w przeglądarce. Nadal nie kasuje dysku.",
  },
  {
    value: "delete-metadata-root",
    label: "Usuń Project Brain metadata root",
    description:
      "Wymaga osobnej decyzji Product Ownera. Na tym etapie tylko potwierdzenie.",
  },
  {
    value: "delete-workspace-checkout",
    label: "Usuń katalog roboczy i checkout",
    description:
      "Wymaga osobnej decyzji Product Ownera. Na tym etapie tylko potwierdzenie.",
  },
] as const;

type ProjectDeleteAction = (typeof PROJECT_DELETE_ACTIONS)[number]["value"];

type Client = {
  id: string;
};

type Service = {
  id: string;
};

type Visit = {
  id: string;
  date: string;
  time: string;
};

type DashboardSnapshot = {
  workspaceEntry: ProjectWorkspaceEntry | null;
  clientsCount: number;
  servicesCount: number;
  visitsCount: number;
  upcomingVisitsCount: number;
  isLoaded: boolean;
  errorCode: string | null;
};

type ProjectSourceRevalidationSuccessResponse = {
  status: "success";
  message: string;
  workingDirectory: string;
  activeBranch: string;
  repoCheckoutPath: string;
  remoteUrl: string;
  workingTreeState: ProjectSourceWorkingTreeState;
  sourceStatus: "git-repo";
};

type ProjectSourceRevalidationBlockedResponse = {
  status: "blocked";
  message: string;
};

type ProjectSourceRevalidationErrorResponse = {
  status: "error";
  message: string;
};

type ProjectSourceRevalidationResponse =
  | ProjectSourceRevalidationSuccessResponse
  | ProjectSourceRevalidationBlockedResponse
  | ProjectSourceRevalidationErrorResponse;

type ProjectDeleteExecutionResult = {
  status: "blocked" | "dry-run" | "deleted" | "partial";
  deletedPaths: string[];
  blockedReasons: string[];
  requestedActions: string[];
  projectMetadataRootPath: string;
  projectWorkingDirectoryPath: string;
  projectCheckoutPath: string;
};

function buildProjectSourceRevalidationRequestUrl(
  projectId: string,
  repositoryUrl: string,
  workingDirectory: string,
  branchWorkMode: "main" | "working-branch" | null,
  workingBranchName: string,
): string {
  const searchParams = new URLSearchParams({
    projectId,
    repositoryUrl,
    workingDirectory,
    branchWorkMode: branchWorkMode ?? "main",
    workingBranchName,
  });

  return `/api/projects/${projectId}/working-branch/setup?${searchParams.toString()}`;
}

function createLocalRecoveryWorkspaceEntry(
  projectId: string,
): ProjectWorkspaceEntry | null {
  try {
    const localProject = getProjectById(projectId);

    if (!localProject) {
      return null;
    }

    const tasks = getTasks(projectId);
    const knowledgeEntries = getKnowledge(projectId);

    return {
      projectId: localProject.id,
      workspace: {
        overview: {
          project: {
            id: localProject.id,
            name: localProject.name,
          },
          counts: {
            tasks: tasks.length,
            knowledgeEntries: knowledgeEntries.length,
          },
          workflow: {
            health: "warning",
            confidence: 0,
            nextStep: {
              id: "local-project-recovery",
              label: "Kontynuuj lokalny stan projektu",
              description:
                "Kontekst Project Brain jest niedostępny, ale lokalna przestrzeń projektu nadal jest dostępna.",
            },
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: tasks.map((task) => ({
          id: task.id,
          title: task.title,
        })),
        knowledgeEntries: knowledgeEntries.map((knowledgeEntry) => ({
          id: knowledgeEntry.id,
          title: knowledgeEntry.title,
        })),
      },
    };
  } catch {
    return null;
  }
}

function deriveWorkflowHealth(
  projectBrainStatus: string | undefined,
  workflowHealth: ProjectWorkspaceEntry["workspace"]["overview"]["workflow"]["health"],
): ProjectWorkspaceEntry["workspace"]["overview"]["workflow"]["health"] {
  if (projectBrainStatus === "available") {
    return workflowHealth;
  }

  if (projectBrainStatus === "failed") {
    return "blocked";
  }

  return "warning";
}

function clearProjectScopedDeleteBrowserState(projectId: string): void {
  localStorage.removeItem(`soft-premium-system.projects.${projectId}.tasks`);
  localStorage.removeItem(`soft-premium-system.projects.${projectId}.knowledge`);
  localStorage.removeItem(
    `soft-premium-system.projects.${projectId}.branch-work-mode`,
  );
  localStorage.removeItem(
    `soft-premium-system.projects.${projectId}.working-branch-name`,
  );
  clearProjectSourceStatus(projectId);
}

function buildProjectDeleteExecutionRequestUrl(projectId: string): string {
  return `/api/projects/${encodeURIComponent(projectId)}/delete-execution`;
}

export default function ProjectWorkspacePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [canonicalTasks, setCanonicalTasks] = useState<
    ProjectWorkspaceEntry["workspace"]["tasks"] | null
  >(null);
  const [revalidatedSourceStatus, setRevalidatedSourceStatus] =
    useState<ProjectSourceReconciliationStatus | null>(null);
  const [deleteGateOpen, setDeleteGateOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState<ProjectDeleteAction>(
    "detach-from-sps",
  );
  const [deleteProjectNameInput, setDeleteProjectNameInput] = useState("");
  const [deleteProductOwnerApproval, setDeleteProductOwnerApproval] =
    useState(false);
  const [deleteExecutionResult, setDeleteExecutionResult] =
    useState<ProjectDeleteExecutionResult | null>(null);
  const localProject = getProjectById(params.id);
  const sourceBindingSummary = getProjectBindingDecisionSummary(
    localProject,
    revalidatedSourceStatus,
  );
  const projectBrainStatus = localProject?.projectBrainStatus ?? "pending";
  const projectFilesystemStatus =
    localProject?.projectFilesystemStatus ?? "unknown";
  const repoCheckoutDirectoryHint = localProject
    ? buildRepoCheckoutDirectoryHint(localProject)
    : null;
  const dashboard = useMemo<DashboardSnapshot>(() => {
    if (typeof window === "undefined") {
      return {
        workspaceEntry: null,
        clientsCount: 0,
        servicesCount: 0,
        visitsCount: 0,
        upcomingVisitsCount: 0,
        isLoaded: false,
        errorCode: null,
      };
    }

    try {
      const workspaceEntry = getProjectWorkspaceEntry(params.id);
      const savedClients = localStorage.getItem(
        `soft-premium-system.projects.${params.id}.clients`,
      );
      const clients: Client[] = savedClients ? JSON.parse(savedClients) : [];
      const savedServices = localStorage.getItem(
        `soft-premium-system.projects.${params.id}.services`,
      );
      const services: Service[] = savedServices ? JSON.parse(savedServices) : [];
      const savedVisits = localStorage.getItem(
        `soft-premium-system.projects.${params.id}.visits`,
      );
      const visits: Visit[] = savedVisits ? JSON.parse(savedVisits) : [];
      // eslint-disable-next-line react-hooks/purity
      const now = Date.now();
      const upcomingVisits = visits.filter((visit) => {
        const visitTimestamp = new Date(`${visit.date}T${visit.time}`).getTime();

        return Number.isFinite(visitTimestamp) && visitTimestamp >= now;
      });

      return {
        workspaceEntry,
        clientsCount: clients.length,
        servicesCount: services.length,
        visitsCount: visits.length,
        upcomingVisitsCount: upcomingVisits.length,
        isLoaded: true,
        errorCode: null,
      };
    } catch (error) {
      const errorCode =
        error instanceof Error && "code" in error && typeof error.code === "string"
          ? error.code
          : "source-read-failed";
      const recoveryWorkspaceEntry =
        errorCode === "project-not-found"
          ? createLocalRecoveryWorkspaceEntry(params.id)
          : null;

      return {
        workspaceEntry: recoveryWorkspaceEntry,
        clientsCount: 0,
        servicesCount: 0,
        visitsCount: 0,
        upcomingVisitsCount: 0,
        isLoaded: true,
        errorCode: recoveryWorkspaceEntry ? null : errorCode,
      };
    }
  }, [params.id]);

  const deleteProjectName =
    dashboard.workspaceEntry?.workspace.overview.project.name.trim() ?? "";
  const deleteProjectNameConfirmed =
    deleteProjectNameInput.trim() === deleteProjectName && deleteProjectName !== "";
  const selectedDeleteAction =
    PROJECT_DELETE_ACTIONS.find((action) => action.value === deleteAction) ??
    PROJECT_DELETE_ACTIONS[0];

  useEffect(() => {
    let ignore = false;

    async function loadCanonicalTasks() {
      try {
        const loadedTasks = await getTasksFromServer(params.id);

        if (!ignore) {
          setCanonicalTasks(loadedTasks);
        }
      } catch {
        if (!ignore) {
          setCanonicalTasks(null);
        }
      }
    }

    void loadCanonicalTasks();

    return () => {
      ignore = true;
    };
  }, [params.id]);

  useEffect(() => {
    let ignore = false;
    const repositoryUrl = localProject?.repositoryUrl?.trim() ?? "";
    const workingDirectory = localProject?.workingDirectory?.trim() ?? "";
    const branchWorkMode = readProjectBranchWorkMode(params.id);
    const workingBranchName = readProjectWorkingBranchName(params.id) ?? "";

    async function loadRevalidatedSourceStatus() {
      if (!repositoryUrl || !workingDirectory) {
        clearProjectSourceStatus(params.id);
        if (!ignore) {
          setRevalidatedSourceStatus(null);
        }
        return;
      }

      try {
        const response = await fetch(
          buildProjectSourceRevalidationRequestUrl(
            params.id,
            repositoryUrl,
            workingDirectory,
            branchWorkMode,
            workingBranchName,
          ),
        );
        const payload =
          (await response.json()) as ProjectSourceRevalidationResponse;

        if (ignore) {
          return;
        }

        if (response.ok && payload.status === "success") {
          const nextSourceStatus: ProjectSourceReconciliationStatus = {
            sourceStatus: "git-repo",
            repoCheckoutPath: payload.repoCheckoutPath,
            remoteUrl: payload.remoteUrl,
            activeBranch: payload.activeBranch,
            workingTreeState: payload.workingTreeState,
          };

          saveProjectSourceStatus(params.id, nextSourceStatus);
          setRevalidatedSourceStatus(nextSourceStatus);
          return;
        }

        clearProjectSourceStatus(params.id);
        setRevalidatedSourceStatus(null);
      } catch {
        if (!ignore) {
          clearProjectSourceStatus(params.id);
          setRevalidatedSourceStatus(null);
        }
      }
    }

    void loadRevalidatedSourceStatus();

    return () => {
      ignore = true;
    };
  }, [
    localProject?.repositoryUrl,
    localProject?.workingDirectory,
    params.id,
  ]);

  const localWorkspaceTasks = dashboard.workspaceEntry?.workspace.tasks ?? [];
  const workspaceTasks =
    canonicalTasks && canonicalTasks.length > 0
      ? canonicalTasks
      : localWorkspaceTasks;
  const workspaceTaskCount = workspaceTasks.length;
  const workflowHealth = dashboard.workspaceEntry
    ? deriveWorkflowHealth(
        projectBrainStatus,
        dashboard.workspaceEntry.workspace.overview.workflow.health,
      )
    : "warning";

  async function handleDeleteProject() {
    if (!dashboard.workspaceEntry) {
      return;
    }

    if (!deleteProjectNameConfirmed) {
      window.alert(
        `Wpisz dokładną nazwę projektu: ${deleteProjectName}, aby potwierdzić.`,
      );
      return;
    }

    try {
      if (deleteAction === "detach-browser-cleanup") {
        clearProjectScopedDeleteBrowserState(params.id);
      }

      if (deleteAction === "delete-metadata-root" || deleteAction === "delete-workspace-checkout") {
        const response = await fetch(
          buildProjectDeleteExecutionRequestUrl(params.id),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              projectId: params.id,
              projectName: deleteProjectName,
              typedConfirmation: deleteProjectNameInput,
              deleteMetadataRoot: deleteAction === "delete-metadata-root",
              deleteWorkingDirectory:
                deleteAction === "delete-workspace-checkout",
              explicitProductOwnerApproval: deleteProductOwnerApproval,
              dryRun: false,
            }),
          },
        );
        const result =
          (await response.json()) as ProjectDeleteExecutionResult;
        setDeleteExecutionResult(result);

        if (result.status === "deleted") {
          await deleteProjectFromServer(params.id);
          deleteProject(params.id);
        }

        return;
      }

      setDeleteExecutionResult(null);
      await deleteProjectFromServer(params.id);
      deleteProject(params.id);
      router.push("/");
    } catch {
      window.alert("Project deletion failed.");
    }
  }

  return (
    <WorkspaceLayout>
      {!dashboard.isLoaded ? null : dashboard.workspaceEntry ? (
        <WorkspaceContent>
          {projectBrainStatus !== "available" ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
                Gotowość projektu
              </p>
              <p className="mt-2 text-sm">
                Project Brain ma status {projectBrainStatus}. Ten projekt nie
                jest jeszcze gotowy do użycia produkcyjnego.
              </p>
            </div>
          ) : null}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Stan systemu plików
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {projectFilesystemStatus === "manifest-present"
                ? "manifest obecny"
                : projectFilesystemStatus === "manifest-missing"
                  ? "manifest brak"
                  : "nieznany"}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Tryb źródła
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {sourceBindingSummary.statusLabel}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {sourceBindingSummary.githubUrlLabel}
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {sourceBindingSummary.localRepositoryLabel}
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {sourceBindingSummary.nextStepLabel}
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {sourceBindingSummary.repositoryContextMessage}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Post-clone source status
            </p>
            {revalidatedSourceStatus ? (
              <div className="mt-2 space-y-2">
                <p className="text-sm text-emerald-200">
                  Local git repo present
                </p>
                <p className="text-sm text-zinc-300">
                  Project workspace folder: {localProject?.workingDirectory ?? "brak"}
                </p>
                <p className="text-sm text-zinc-300">
                  Repo checkout folder: {revalidatedSourceStatus.repoCheckoutPath}
                </p>
                <p className="text-sm text-zinc-300">
                  GitHub remote URL: {revalidatedSourceStatus.remoteUrl}
                </p>
                <p className="text-sm text-zinc-300">
                  Active working branch: {revalidatedSourceStatus.activeBranch}
                </p>
                <p className="text-sm text-zinc-300">
                  Working tree state: {revalidatedSourceStatus.workingTreeState}
                </p>
                <p className="text-sm text-zinc-400">
                  Manifest-only workspace folder remains a separate project folder.
                </p>
              </div>
            ) : (
              <div className="mt-2 space-y-2">
                <p className="text-sm text-zinc-300">manifest obecny</p>
                <p className="text-sm text-zinc-300">
                  Lokalne repo Git: nadal niedostępne
                </p>
                <p className="text-sm text-zinc-300">
                  Project workspace folder: {localProject?.workingDirectory ?? "brak"}
                </p>
                <p className="text-sm text-zinc-400">
                  Repo checkout folder: {repoCheckoutDirectoryHint ?? "brak"}
                </p>
                <p className="text-sm text-zinc-400">
                  Manifest-only workspace folder remains a separate project folder.
                </p>
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Przewodnik przepływu
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Zacznij tutaj: wybierz zadanie z listy poniżej, a potem przechodź
              przez przestrzeń pracy po kolei.
            </p>
            <ol className="mt-4 flex flex-wrap gap-2">
              {projectJourneySteps.map((step, index) => (
                <li
                  key={step}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                    index === 0
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
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
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-200/80">
                  Potwierdzenie usuwania
                </p>
                <p className="mt-2 text-sm text-red-100">
                  Domyślny wariant jest bezpieczny: odpięcie z SPS OS bez
                  kasowania dysku.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDeleteGateOpen((current) => !current)}
                className="rounded-full border border-red-500/40 px-5 py-2 text-sm font-medium text-red-200 transition-colors hover:border-red-400 hover:bg-red-500/10"
              >
                {deleteGateOpen ? "Ukryj potwierdzenie" : "Usuń projekt"}
              </button>
            </div>
            {deleteGateOpen ? (
              <div className="mt-4 space-y-4">
                <div className="grid gap-3">
                  {PROJECT_DELETE_ACTIONS.map((action) => (
                    <label
                      key={action.value}
                      className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                        action.value === selectedDeleteAction.value
                          ? "border-red-400/60 bg-red-500/10 text-red-50"
                          : "border-red-500/20 bg-zinc-950/50 text-red-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="project-delete-action"
                          value={action.value}
                          checked={action.value === deleteAction}
                          onChange={() =>
                            setDeleteAction(action.value as ProjectDeleteAction)
                          }
                          className="mt-1 accent-red-400"
                        />
                        <div className="space-y-1">
                          <p className="font-medium">{action.label}</p>
                          <p className="text-sm text-red-100/80">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm text-red-100">
                    Wpisz dokładną nazwę projektu, aby potwierdzić
                  </span>
                  <input
                    type="text"
                    value={deleteProjectNameInput}
                    onChange={(event) =>
                      setDeleteProjectNameInput(event.target.value)
                    }
                    placeholder={deleteProjectName || "nazwa projektu"}
                    className="w-full rounded-lg border border-red-500/30 bg-zinc-950 px-4 py-3 text-red-50 outline-none focus:border-red-300"
                  />
                </label>
                <p className="text-sm text-red-100/80">
                  Wymagane: {deleteProjectName || "brak nazwy projektu"}.
                  Destrukcyjne warianty pozostają zablokowane i wymagają
                  osobnej decyzji Product Ownera.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={!deleteProjectNameConfirmed}
                    onClick={() => void handleDeleteProject()}
                    className="rounded-full border border-red-400/50 px-5 py-2 text-sm font-medium text-red-100 transition-colors hover:border-red-300 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:border-red-500/20 disabled:text-red-200/50"
                  >
                    Potwierdź
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteGateOpen(false);
                      setDeleteProjectNameInput("");
                      setDeleteAction("detach-from-sps");
                    }}
                    className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
                  >
                    Anuluj
                  </button>
                </div>
                <p className="text-sm text-red-100/80">
                  Bezpieczny domyślny wariant usuwa tylko wpis projektu z SPS OS
                  i lokalnej listy projektu. Browser/localStorage cleanup jest
                  osobnym wariantem. Usunięcie metadata root lub katalogu
                  roboczego nie jest jeszcze wykonywane.
                </p>
                <label className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-zinc-950/70 px-4 py-3 text-sm text-red-50">
                  <input
                    type="checkbox"
                    checked={deleteProductOwnerApproval}
                    onChange={(event) =>
                      setDeleteProductOwnerApproval(event.target.checked)
                    }
                    className="mt-1 accent-red-400"
                  />
                  <span>
                    Mam osobna zgode Product Ownera na destrukcyjne usuniecie
                    dysku. Bez tej zgody helper serverowy zablokuje wykonanie.
                  </span>
                </label>
                {deleteExecutionResult ? (
                  <div className="rounded-xl border border-red-500/20 bg-zinc-950/80 p-4 text-sm text-red-50">
                    <p className="text-xs uppercase tracking-[0.2em] text-red-200/70">
                      Wynik wykonania
                    </p>
                    <p className="mt-2">
                      status:{" "}
                      <span className="font-medium">
                        {deleteExecutionResult.status}
                      </span>
                    </p>
                    <p className="mt-2 text-red-100/90">
                      requestedActions:{" "}
                      {deleteExecutionResult.requestedActions.length > 0
                        ? deleteExecutionResult.requestedActions.join(", ")
                        : "brak"}
                    </p>
                    <p className="mt-2 text-red-100/90">
                      deletedPaths:{" "}
                      {deleteExecutionResult.deletedPaths.length > 0
                        ? deleteExecutionResult.deletedPaths.join(" | ")
                        : "brak"}
                    </p>
                    <p className="mt-2 text-red-100/90">
                      blockedReasons:{" "}
                      {deleteExecutionResult.blockedReasons.length > 0
                        ? deleteExecutionResult.blockedReasons.join(" | ")
                        : "brak"}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <WorkspaceHeader
            projectName={dashboard.workspaceEntry.workspace.overview.project.name}
            repositoryUrl={
              dashboard.workspaceEntry.workspace.overview.project.repositoryUrl
            }
            taskCount={workspaceTaskCount}
            knowledgeCount={
              dashboard.workspaceEntry.workspace.overview.counts.knowledgeEntries
            }
            workflowHealth={workflowHealth}
            workflowConfidence={
              dashboard.workspaceEntry.workspace.overview.workflow.confidence
            }
            workflowNextStep={
              dashboard.workspaceEntry.workspace.overview.workflow.nextStep
            }
            warningCount={dashboard.workspaceEntry.workspace.overview.workflow.warnings}
            blockerCount={dashboard.workspaceEntry.workspace.overview.workflow.blockers}
          />
          <WorkspaceCollections
            projectId={params.id}
            tasks={workspaceTasks}
            knowledgeEntries={dashboard.workspaceEntry.workspace.knowledgeEntries}
          />
          <WorkspacePanels
            clientsCount={dashboard.clientsCount}
            servicesCount={dashboard.servicesCount}
            visitsCount={dashboard.visitsCount}
            upcomingVisitsCount={dashboard.upcomingVisitsCount}
            projectId={dashboard.workspaceEntry.projectId}
            workflowNextStep={
              dashboard.workspaceEntry.workspace.overview.workflow.nextStep
            }
          />
        </WorkspaceContent>
      ) : (
        <p className="text-sm text-zinc-400">
          {dashboard.errorCode === "project-not-found"
            ? "Projekt nie został znaleziony"
            : "Przegląd projektu niedostępny"}
        </p>
      )}
    </WorkspaceLayout>
  );
}
