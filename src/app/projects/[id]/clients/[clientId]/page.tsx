"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Client = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
};

export default function ClientDetailsPage() {
  const params = useParams<{ id: string; clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedClients = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.clients`,
    );
    const clients: Client[] = savedClients ? JSON.parse(savedClients) : [];
    const matchedClient =
      clients.find((item) => item.id === params.clientId) ?? null;

    setClient(matchedClient);
    setIsLoaded(true);
  }, [params.clientId, params.id]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      {!isLoaded ? null : client ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-50">
              Client Details
            </h2>
            <p className="text-zinc-400">
              Overview of the selected client.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                First Name
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {client.firstName}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Last Name
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {client.lastName}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Phone
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {client.phone}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Created At
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {new Date(client.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-400">Client not found</p>
      )}
    </section>
  );
}
