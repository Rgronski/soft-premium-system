"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type Client = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
};

export default function ProjectClientsPage() {
  const params = useParams<{ id: string }>();
  const clients = useMemo<Client[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedClients = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.clients`,
    );
    return savedClients ? JSON.parse(savedClients) : [];
  }, [params.id]);
  const isLoaded = typeof window !== "undefined";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-50">Clients</h2>
            <p className="text-zinc-400">
              {isLoaded && clients.length === 0 ? "No clients yet." : null}
            </p>
          </div>

          <Link
            href={`/projects/${params.id}/clients/new`}
            className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            Add Client
          </Link>
        </div>

        {isLoaded && clients.length > 0 ? (
          <div className="space-y-3">
            {clients.map((client) => (
              <Link
                key={client.id}
                href={`/projects/${params.id}/clients/${client.id}`}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <p className="text-base font-medium text-zinc-50">
                  {client.firstName} {client.lastName}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{client.phone}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
