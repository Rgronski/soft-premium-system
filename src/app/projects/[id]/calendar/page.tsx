"use client";

import Link from "next/link";
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
  const clients = useMemo<Client[]>(() => {
    if (!isLoaded) {
      return [];
    }

    const savedClients = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.clients`,
    );

    return savedClients ? JSON.parse(savedClients) : [];
  }, [isLoaded, params.id]);
  const services = useMemo<Service[]>(() => {
    if (!isLoaded) {
      return [];
    }

    const savedServices = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.services`,
    );

    return savedServices ? JSON.parse(savedServices) : [];
  }, [isLoaded, params.id]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-50">Calendar</h2>
            <p className="text-zinc-400">
              {isLoaded && visits.length === 0 ? "No visits scheduled" : null}
            </p>
          </div>

          {isLoaded && visits.length === 0 ? (
            <Link
              href={`/projects/${params.id}/visits/new`}
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Add Visit
            </Link>
          ) : null}
        </div>

        {isLoaded && visits.length > 0 ? (
          <div className="space-y-3">
            {visits.map((visit) => {
              const client = clients.find(
                (currentClient) => currentClient.id === visit.clientId,
              );
              const service = services.find(
                (currentService) => currentService.id === visit.serviceId,
              );

              return (
                <div
                  key={visit.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <p className="text-base font-medium text-zinc-50">
                    {visit.date}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{visit.time}</p>
                  <p className="mt-3 text-sm text-zinc-300">
                    Client:{" "}
                    {client
                      ? `${client.firstName} ${client.lastName}`
                      : "Unknown client"}
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">
                    Service: {service ? service.name : "Unknown service"}
                  </p>
                  {visit.status ? (
                    <p className="mt-1 text-sm text-zinc-300">
                      Status: {visit.status}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
