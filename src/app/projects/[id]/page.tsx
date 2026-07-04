"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type Project = {
  id: string;
  name: string;
  createdAt: string;
};

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

    const savedProjects = localStorage.getItem("soft-premium-system.projects");
    const projects: Project[] = savedProjects ? JSON.parse(savedProjects) : [];
    const project = projects.find((item) => item.id === params.id) ?? null;
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
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      {!dashboard.isLoaded ? null : dashboard.project ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Project Overview
            </p>
            <h2 className="text-2xl font-semibold text-zinc-50">
              Workspace Dashboard
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Clients
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-50">
                {dashboard.clientsCount}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Services
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-50">
                {dashboard.servicesCount}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Visits
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-50">
                {dashboard.visitsCount}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Upcoming Visits
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-50">
                {dashboard.upcomingVisitsCount}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Quick Actions
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Link
                href={`/projects/${params.id}/clients/new`}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                Add Client
              </Link>
              <Link
                href={`/projects/${params.id}/services/new`}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                Add Service
              </Link>
              <Link
                href={`/projects/${params.id}/visits/new`}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                Schedule Visit
              </Link>
              <Link
                href={`/projects/${params.id}/calendar`}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                Open Calendar
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-400">Project not found</p>
      )}
    </section>
  );
}
