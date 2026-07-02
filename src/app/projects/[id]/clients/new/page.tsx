"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Client = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
};

export default function NewProjectClientPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  function handleCreateClient() {
    const newClient: Client = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      phone,
      createdAt: new Date().toISOString(),
    };

    const storageKey = `soft-premium-system.projects.${params.id}.clients`;
    const savedClients = localStorage.getItem(storageKey);
    const clients: Client[] = savedClients ? JSON.parse(savedClients) : [];
    const updatedClients = [...clients, newClient];

    localStorage.setItem(storageKey, JSON.stringify(updatedClients));

    setFirstName("");
    setLastName("");
    setPhone("");

    router.push(`/projects/${params.id}/clients`);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">New Client</h2>
          <p className="text-zinc-400">
            Add the basic information for a new client.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">Phone</span>
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateClient}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950"
        >
          Create Client
        </button>
      </div>
    </section>
  );
}
