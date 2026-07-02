"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  createdAt: string;
};

export default function ProjectWorkspacePage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProjects = localStorage.getItem("soft-premium-system.projects");
    const projects: Project[] = savedProjects ? JSON.parse(savedProjects) : [];
    const matchedProject =
      projects.find((item) => item.id === params.id) ?? null;

    setProject(matchedProject);
    setIsLoaded(true);
  }, [params.id]);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Project Workspace
            </p>

            <h1 className="text-4xl font-semibold">
              {project ? project.name : "Project not found"}
            </h1>

            <p className="text-zinc-400">
              Opened from your recent projects list.
            </p>
          </div>

          <div>
            <Link
              href="/"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Back to Home
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <nav className="space-y-2">
              <p className="px-3 pb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                Workspace
              </p>

              <div className="rounded-xl bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-50">
                Overview
              </div>

              <div className="rounded-xl px-3 py-2 text-sm text-zinc-400">
                Clients
              </div>

              <div className="rounded-xl px-3 py-2 text-sm text-zinc-400">
                Calendar
              </div>

              <div className="rounded-xl px-3 py-2 text-sm text-zinc-400">
                Invoices
              </div>

              <div className="rounded-xl px-3 py-2 text-sm text-zinc-400">
                Settings
              </div>
            </nav>
          </aside>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            {!isLoaded ? null : project ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                    Project Overview
                  </p>
                  <h2 className="text-2xl font-semibold text-zinc-50">
                    First dashboard for this project
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      Project Name
                    </p>
                    <p className="mt-2 text-base font-medium">{project.name}</p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      Created At
                    </p>
                    <p className="mt-2 text-base font-medium">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      Status
                    </p>
                    <p className="mt-2 text-base font-medium">Active</p>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                    Quick Actions
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200">
                      Add client
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200">
                      Schedule visit
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200">
                      Create invoice
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-400">Project not found</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
