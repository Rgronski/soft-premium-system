"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  createdAt: string;
};

export default function ServiceDetailsPage() {
  const params = useParams<{ id: string; serviceId: string }>();
  const service = useMemo<Service | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const savedServices = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.services`,
    );
    const services: Service[] = savedServices ? JSON.parse(savedServices) : [];
    return services.find((item) => item.id === params.serviceId) ?? null;
  }, [params.id, params.serviceId]);
  const isLoaded = typeof window !== "undefined";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      {!isLoaded ? null : service ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-50">
              Service Details
            </h2>
            <p className="text-zinc-400">
              Overview of the selected service.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Service Name
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {service.name}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Duration
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {service.duration}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Price
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {service.price}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Created At
              </p>
              <p className="mt-2 text-base font-medium text-zinc-50">
                {new Date(service.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-400">Service not found</p>
      )}
    </section>
  );
}
