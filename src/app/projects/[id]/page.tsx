"use client";

import { WorkspaceContent } from "@/components/workspace/WorkspaceContent";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { WorkspacePanels } from "@/components/workspace/WorkspacePanels";
import { getProjectById } from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
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
  project: Project | null;
  clientsCount: number;
  servicesCount: number;
  visitsCount: number;
  upcomingVisitsCount: number;
  isLoaded: boolean;
};

export default function ProjectWorkspacePage() {
  const params = useParams<{ id: string }>();
  const dashboard = useMemo<DashboardSnapshot>(() => {
    if (typeof window === "undefined") {
      return {
        project: null,
        clientsCount: 0,
        servicesCount: 0,
        visitsCount: 0,
        upcomingVisitsCount: 0,
        isLoaded: false,
      };
    }

    const project = getProjectById(params.id);
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
      project,
      clientsCount: clients.length,
      servicesCount: services.length,
      visitsCount: visits.length,
      upcomingVisitsCount: upcomingVisits.length,
      isLoaded: true,
    };
  }, [params.id]);

  return (
    <WorkspaceLayout>
      {!dashboard.isLoaded ? null : dashboard.project ? (
        <WorkspaceContent>
          <WorkspaceHeader />
          <WorkspacePanels
            clientsCount={dashboard.clientsCount}
            servicesCount={dashboard.servicesCount}
            visitsCount={dashboard.visitsCount}
            upcomingVisitsCount={dashboard.upcomingVisitsCount}
            projectId={params.id}
          />
        </WorkspaceContent>
      ) : (
        <p className="text-sm text-zinc-400">Project not found</p>
      )}
    </WorkspaceLayout>
  );
}
