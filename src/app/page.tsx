"use client";

import { deleteProjectFromServer } from "@/lib/project/browser-server";
import { deleteProject, getProjects } from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
import { APP_VERSION } from "@/lib/app-version";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const latestProject = projects[projects.length - 1] ?? null;
  const hasProjects = projects.length > 0;
  const continueHref = latestProject
    ? `/projects/${latestProject.id}`
    : "/projects";
  const continueLabel = latestProject ? "Kontynuuj" : "Utwórz projekt";
  const primarySectionTitle = hasProjects
    ? "Kontynuuj pracę"
    : "Utwórz pierwszy projekt";
  const primarySectionDescription = hasProjects
    ? "Wznów aktywny sprint bazowy."
    : "Utwórz pierwszy projekt, aby rozpocząć główny przepływ.";

  async function handleDeleteProject(project: Project) {
    const confirmed = window.confirm(
      `Usunąć "${project.name}"? Tego nie można cofnąć.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProjectFromServer(project.id);
      deleteProject(project.id);
      setProjects((currentProjects) =>
        currentProjects.filter(
          (currentProject) => currentProject.id !== project.id,
        ),
      );
    } catch {
      window.alert("Nie udało się usunąć projektu.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Soft Premium System
          </p>

          <div className="space-y-1">
            <h1 className="text-4xl font-semibold tracking-tight">
              Witaj ponownie, Radek
            </h1>
            <p className="text-sm text-zinc-400">
              Przestrzeń robocza v{APP_VERSION}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{primarySectionTitle}</h2>
              <p className="mt-1 text-sm text-zinc-400">
                {primarySectionDescription}
              </p>
            </div>

            <Link
              href={continueHref}
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              {continueLabel}
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Projekt
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
              <h2 className="text-lg font-semibold">Ostatnie projekty</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Szybki dostęp do ostatniej przestrzeni pracy.
              </p>
            </div>

            <Link
              href="/projects"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Utwórz nowy projekt
            </Link>
          </div>

          <div className="space-y-3">
            {projects.length === 0 ? (
              <p className="text-sm text-zinc-400">Brak projektów.</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="flex w-full items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="min-w-0 flex-1"
                  >
                    <p className="text-base font-medium">{project.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </Link>

                  <button
                    type="button"
                    onClick={() => void handleDeleteProject(project)}
                    className="shrink-0 rounded-full border border-red-500/40 px-4 py-2 text-sm font-medium text-red-200 transition-colors hover:border-red-400 hover:bg-red-500/10"
                  >
                    Usuń
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
