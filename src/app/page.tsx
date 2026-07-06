"use client";

import { getProjects } from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  const projects = useMemo<Project[]>(() => {
    return getProjects();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Soft Premium System
          </p>

          <div className="space-y-1">
            <h1 className="text-4xl font-semibold tracking-tight">
              Welcome back, Radek
            </h1>
            <p className="text-sm text-zinc-400">Workspace v0.1</p>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Continue working</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Resume the active foundation sprint.
              </p>
            </div>

            <Link
              href="/workspace"
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              Continue
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Project
              </p>
              <p className="mt-2 text-base font-medium">Soft Premium System</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Status
              </p>
              <p className="mt-2 text-base font-medium">Foundation</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Sprint
              </p>
              <p className="mt-2 text-base font-medium">Foundation-02</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Recent Projects</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Quick access to your latest workspace.
              </p>
            </div>

            <Link
              href="/projects"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Create New Project
            </Link>
          </div>

          <div className="space-y-3">
            {projects.length === 0 ? (
              <p className="text-sm text-zinc-400">No projects yet.</p>
            ) : (
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <p className="text-base font-medium">{project.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
