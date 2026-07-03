"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  createdAt: string;
};

export default function NewProjectServicePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  function handleCreateService() {
    const newService: Service = {
      id: crypto.randomUUID(),
      name,
      duration: Number(duration),
      price: Number(price),
      createdAt: new Date().toISOString(),
    };

    const storageKey = `soft-premium-system.projects.${params.id}.services`;
    const savedServices = localStorage.getItem(storageKey);
    const services: Service[] = savedServices ? JSON.parse(savedServices) : [];
    const updatedServices = [...services, newService];

    localStorage.setItem(storageKey, JSON.stringify(updatedServices));

    setName("");
    setDuration("");
    setPrice("");

    router.push(`/projects/${params.id}/services`);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">New Service</h2>
          <p className="text-zinc-400">
            Add the basic information for a new service.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">
              Service Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Duration</span>
            <input
              type="text"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Price</span>
            <input
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateService}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950"
        >
          Create Service
        </button>
      </div>
    </section>
  );
}
