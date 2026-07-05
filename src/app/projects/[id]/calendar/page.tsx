"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

type Visit = {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  createdAt: string;
  status?: string;
};

export default function ProjectCalendarPage() {
  const params = useParams<{ id: string }>();
  const isLoaded = typeof window !== "undefined";
  const visits = useMemo<Visit[]>(() => {
    if (!isLoaded) {
      return [];
    }

    const savedVisits = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.visits`,
    );
    const parsedVisits: Visit[] = savedVisits ? JSON.parse(savedVisits) : [];

    return [...parsedVisits].sort((firstVisit, secondVisit) => {
      const firstDateTime = `${firstVisit.date}T${firstVisit.time}`;
      const secondDateTime = `${secondVisit.date}T${secondVisit.time}`;

      return firstDateTime.localeCompare(secondDateTime);
    });
  }, [isLoaded, params.id]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">Calendar</h2>
          <p className="text-zinc-400">Project Scheduling Workspace</p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              {"<"}
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Today
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              {">"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Day
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Week
            </button>
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950"
            >
              Month
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Workspace
            </p>
            <h3 className="text-xl font-semibold text-zinc-50">Month View</h3>
            <p className="text-zinc-400">Coming in MS-009.2</p>
            <p className="text-sm text-zinc-500">
              {isLoaded
                ? `${visits.length} scheduling items available in this project.`
                : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
