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
};

type Client = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
};

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  createdAt: string;
};

type VisitDetailsSnapshot = {
  visit: Visit | null;
  client: Client | null;
  service: Service | null;
  isLoaded: boolean;
};

export default function VisitDetailsPage() {
  const params = useParams<{ id: string; visitId: string }>();
  const details = useMemo<VisitDetailsSnapshot>(() => {
    if (typeof window === "undefined") {
      return {
        visit: null,
        client: null,
        service: null,
        isLoaded: false,
      };
    }

    const savedVisits = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.visits`,
    );
    const visits: Visit[] = savedVisits ? JSON.parse(savedVisits) : [];
    const matchedVisit =
      visits.find((item) => item.id === params.visitId) ?? null;

    const savedClients = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.clients`,
    );
    const clients: Client[] = savedClients ? JSON.parse(savedClients) : [];

    const savedServices = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.services`,
    );
    const services: Service[] = savedServices ? JSON.parse(savedServices) : [];

    return {
      visit: matchedVisit,
      client: matchedVisit
        ? clients.find((item) => item.id === matchedVisit.clientId) ?? null
        : null,
      service: matchedVisit
        ? services.find((item) => item.id === matchedVisit.serviceId) ?? null
        : null,
      isLoaded: true,
    };
  }, [params.id, params.visitId]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      {!details.isLoaded ? null : details.visit ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-50">
              Visit Details
            </h2>
            <p className="text-zinc-400">
              Overview of the selected visit.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Client
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {details.client
                  ? `${details.client.firstName} ${details.client.lastName}`
                  : "Unknown client"}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Service
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {details.service ? details.service.name : "Unknown service"}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Date
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {details.visit.date}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Time
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {details.visit.time}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Created At
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {new Date(details.visit.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-400">Visit not found</p>
      )}
    </section>
  );
}
