"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import {
  getProjectBindingDecisionSummary,
  getProjectById,
  upsertProject,
} from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function saveProjectBinding(project: Project, updates: Partial<Project>): Project {
  return upsertProject({
    ...project,
    ...updates,
  });
}

export default function ProjectSettingsPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(() =>
    getProjectById(params.id),
  );
  const [githubUrlInput, setGithubUrlInput] = useState(
    () => getProjectById(params.id)?.repositoryUrl ?? "",
  );
  const [workingDirectoryInput, setWorkingDirectoryInput] = useState(
    () => getProjectById(params.id)?.workingDirectory ?? "",
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const nextProject = getProjectById(params.id);

    setProject(nextProject);
    setGithubUrlInput(nextProject?.repositoryUrl ?? "");
    setWorkingDirectoryInput(nextProject?.workingDirectory ?? "");
    setFeedbackMessage(null);
  }, [params.id]);

  if (!project) {
    return (
      <SectionCard>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">Ustawienia źródła</h2>
          <p className="text-zinc-400">Projekt nie został znaleziony.</p>
        </div>
      </SectionCard>
    );
  }

  const summary = getProjectBindingDecisionSummary(project);

  function handleSaveGithubUrl() {
    const trimmedGithubUrl = githubUrlInput.trim();

    const nextProject = saveProjectBinding(project, {
      ...(trimmedGithubUrl ? { repositoryUrl: trimmedGithubUrl } : {}),
    });

    setProject(nextProject);
    setFeedbackMessage(
      trimmedGithubUrl
        ? "Adres GitHub zapisano jako metadane projektu."
        : "Pozostawiono projekt bez adresu GitHub.",
    );
  }

  function handleSaveWorkingDirectory() {
    const trimmedWorkingDirectory = workingDirectoryInput.trim();

    if (!trimmedWorkingDirectory) {
      setFeedbackMessage("Podaj istniejący katalog repo, aby go zapisać.");
      return;
    }

    const nextProject = saveProjectBinding(project, {
      workingDirectory: trimmedWorkingDirectory,
    });

    setProject(nextProject);
    setFeedbackMessage(
      "Istniejący katalog repo zapisano jako metadane projektu.",
    );
  }

  return (
    <SectionCard>
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Ustawienia źródła
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Decyzja bindująca dla projektu
          </h2>
          <p className="text-zinc-400">
            Projekt ma tylko manifest SPS. Możesz zostawić go jako manifest,
            podpiąć istniejący katalog repo albo dodać adres GitHub.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Tryb źródła
          </p>
          <p className="mt-2 text-sm text-zinc-300">{summary.statusLabel}</p>
          <p className="mt-2 text-sm text-zinc-400">{summary.githubUrlLabel}</p>
          <p className="mt-2 text-sm text-zinc-300">
            {summary.localRepositoryLabel}
          </p>
          <p className="mt-2 text-sm text-zinc-300">{summary.nextStepLabel}</p>
          <p className="mt-2 text-sm text-zinc-400">
            {summary.repositoryContextMessage}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Adres GitHub
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Adres GitHub: {githubUrlInput.trim() ? "podany" : "nie podano"}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Lokalne repo Git: nadal niedostępne
            </p>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-zinc-400">
                Podaj adres GitHub
              </span>
              <input
                type="url"
                value={githubUrlInput}
                onChange={(event) => setGithubUrlInput(event.target.value)}
                placeholder="https://github.com/example/beauty-client-pro"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </label>
            <button
              type="button"
              onClick={handleSaveGithubUrl}
              className="mt-4 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Zapisz adres GitHub
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Istniejący katalog repo
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Możesz wskazać istniejący lokalny katalog repo bez klonowania.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Import/clone wymaga osobnego zatwierdzenia.
            </p>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-zinc-400">
                Katalog repo
              </span>
              <input
                type="text"
                value={workingDirectoryInput}
                onChange={(event) => setWorkingDirectoryInput(event.target.value)}
                placeholder="C:\\SPS_OS_WORK\\beauty-client-pro"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </label>
            <button
              type="button"
              onClick={handleSaveWorkingDirectory}
              className="mt-4 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Zapisz katalog repo
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Pozostaw jako manifest-only
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Jeśli nie zapiszesz żadnych nowych metadanych, projekt pozostanie
            w trybie manifest-only.
          </p>
        </div>

        {feedbackMessage ? (
          <p className="text-sm text-emerald-200" aria-live="polite">
            {feedbackMessage}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
