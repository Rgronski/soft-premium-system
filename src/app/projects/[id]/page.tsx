"use client";

import { WorkspaceContent } from "@/components/workspace/WorkspaceContent";
import { WorkspaceCollections } from "@/components/workspace/WorkspaceCollections";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { WorkspacePanels } from "@/components/workspace/WorkspacePanels";
import {
  getProjectWorkspaceEntry,
  type ProjectWorkspaceEntry,
} from "@/lib/project-brain/engine";
import { useParams } from "next/navigation";
import { useMemo } from "react";

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

export default function ProjectWorkspacePage() {
  const params = useParams<{ id: string }>();
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

      return {
        workspaceEntry: null,
        clientsCount: 0,
        servicesCount: 0,
        visitsCount: 0,
        upcomingVisitsCount: 0,
        isLoaded: true,
        errorCode,
      };
    }
  }, [params.id]);

  return (
    <WorkspaceLayout>
      {!dashboard.isLoaded ? null : dashboard.workspaceEntry ? (
        <WorkspaceContent>
          <WorkspaceHeader
            projectName={dashboard.workspaceEntry.workspace.overview.project.name}
            taskCount={dashboard.workspaceEntry.workspace.overview.counts.tasks}
            knowledgeCount={
              dashboard.workspaceEntry.workspace.overview.counts.knowledgeEntries
            }
            workflowHealth={dashboard.workspaceEntry.workspace.overview.workflow.health}
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
            tasks={dashboard.workspaceEntry.workspace.tasks}
            knowledgeEntries={dashboard.workspaceEntry.workspace.knowledgeEntries}
          />
          <WorkspacePanels
            clientsCount={dashboard.clientsCount}
            servicesCount={dashboard.servicesCount}
            visitsCount={dashboard.visitsCount}
            upcomingVisitsCount={dashboard.upcomingVisitsCount}
            projectId={dashboard.workspaceEntry.projectId}
          />
        </WorkspaceContent>
      ) : (
        <p className="text-sm text-zinc-400">
          {dashboard.errorCode === "project-not-found"
            ? "Project not found"
            : "Project overview unavailable"}
        </p>
      )}
    </WorkspaceLayout>
  );
}
