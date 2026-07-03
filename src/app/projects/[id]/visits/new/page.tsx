"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

type Visit = {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  createdAt: string;
};

export default function NewProjectVisitPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [clientId, setClientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const savedClients = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.clients`,
    );
    const parsedClients: Client[] = savedClients ? JSON.parse(savedClients) : [];

    const savedServices = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.services`,
    );
    const parsedServices: Service[] = savedServices
      ? JSON.parse(savedServices)
      : [];

    setClients(parsedClients);
    setServices(parsedServices);
  }, [params.id]);

  function handleCreateVisit() {
    const newVisit: Visit = {
      id: crypto.randomUUID(),
      clientId,
      serviceId,
      date,
      time,
      createdAt: new Date().toISOString(),
    };

    const storageKey = `soft-premium-system.projects.${params.id}.visits`;
    const savedVisits = localStorage.getItem(storageKey);
    const visits: Visit[] = savedVisits ? JSON.parse(savedVisits) : [];
    const updatedVisits = [...visits, newVisit];

    localStorage.setItem(storageKey, JSON.stringify(updatedVisits));

    setClientId("");
    setServiceId("");
    setDate("");
    setTime("");

    router.push(`/projects/${params.id}/visits`);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">New Visit</h2>
          <p className="text-zinc-400">
            Add the basic information for a new visit.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Client</span>
            <select
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Service</span>
            <select
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            >
              <option value="">Select service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Date</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Time</span>
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateVisit}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950"
        >
          Create Visit
        </button>
      </div>
    </section>
  );
}
