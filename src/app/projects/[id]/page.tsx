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
import { deleteProject, getProjectById } from "@/lib/project/project";
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

export default function ProjectWorkspacePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [canonicalTasks, setCanonicalTasks] = useState<
    ProjectWorkspaceEntry["workspace"]["tasks"] | null
  >(null);
  const localProject = getProjectById(params.id);
  const projectBrainStatus = localProject?.projectBrainStatus ?? "pending";
  const projectFilesystemStatus =
    localProject?.projectFilesystemStatus ?? "unknown";
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

    const projectName =
      dashboard.workspaceEntry.workspace.overview.project.name;
    const confirmed = window.confirm(
      `Delete "${projectName}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => void handleDeleteProject()}
              className="rounded-full border border-red-500/40 px-5 py-2 text-sm font-medium text-red-200 transition-colors hover:border-red-400 hover:bg-red-500/10"
            >
              Usuń projekt
            </button>
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
