"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  createdAt: string;
};

export default function ProjectServicesPage() {
  const params = useParams<{ id: string }>();
  const services = useMemo<Service[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedServices = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.services`,
    );
    return savedServices ? JSON.parse(savedServices) : [];
  }, [params.id]);
  const isLoaded = typeof window !== "undefined";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-50">Services</h2>
            <p className="text-zinc-400">
              {isLoaded && services.length === 0 ? "No services yet." : null}
            </p>
          </div>

          <Link
            href={`/projects/${params.id}/services/new`}
            className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            Add Service
          </Link>
        </div>

        {isLoaded && services.length > 0 ? (
          <div className="space-y-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/projects/${params.id}/services/${service.id}`}
                className="block w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <p className="text-base font-medium text-zinc-50">
                  {service.name}
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  {service.duration} • {service.price}
                </p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
