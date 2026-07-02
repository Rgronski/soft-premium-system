"use client";

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
  );
}
