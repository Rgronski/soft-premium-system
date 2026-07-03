"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Visit = {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  createdAt: string;
};

export default function ProjectVisitsPage() {
  const params = useParams<{ id: string }>();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedVisits = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.visits`,
    );
    const parsedVisits: Visit[] = savedVisits ? JSON.parse(savedVisits) : [];

    setVisits(parsedVisits);
    setIsLoaded(true);
  }, [params.id]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-50">Visits</h2>
            <p className="text-zinc-400">
              {isLoaded && visits.length === 0 ? "No visits yet." : null}
            </p>
          </div>

          <Link
            href={`/projects/${params.id}/visits/new`}
            className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            Add Visit
          </Link>
        </div>

        {isLoaded && visits.length > 0 ? (
          <div className="space-y-3">
            {visits.map((visit) => (
              <Link
                key={visit.id}
                href={`/projects/${params.id}/visits/${visit.id}`}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <p className="text-base font-medium text-zinc-50">
                  {visit.date}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{visit.time}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
