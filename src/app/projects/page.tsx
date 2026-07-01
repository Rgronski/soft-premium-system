"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectsPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");

  function handleCreateProject() {
    const trimmedProjectName = projectName.trim();

    if (!trimmedProjectName) {
      return;
    }

    const newProject = {
      id: crypto.randomUUID(),
      name: trimmedProjectName,
      createdAt: new Date().toISOString(),
    };

    const savedProjects = localStorage.getItem("soft-premium-system.projects");
    const projects = savedProjects ? JSON.parse(savedProjects) : [];

    const updatedProjects = [...projects, newProject];

    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify(updatedProjects),
    );

    setProjectName("");
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Project Creator
          </p>

          <h1 className="text-4xl font-semibold">
            New Project
          </h1>

          <p className="mt-2 text-zinc-400">
            Start by entering the project name.
          </p>

          <p className="text-zinc-400">
            This is the first step of the project creation workflow.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">
              Project Name
            </span>

            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My First Project"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <button
            type="button"
            onClick={handleCreateProject}
            className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950"
          >
            Create Project
          </button>
        </section>
      </div>
    </main>
  );
}
