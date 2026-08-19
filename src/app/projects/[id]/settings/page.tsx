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

type ProjectBranchWorkMode = "main" | "working-branch";

const PROJECT_BRANCH_WORK_MODE_STORAGE_SUFFIX = "branch-work-mode";

function saveProjectBinding(project: Project, updates: Partial<Project>): Project {
  return upsertProject({
    ...project,
    ...updates,
  });
}

function getProjectBranchWorkModeStorageKey(projectId: string): string {
  return `soft-premium-system.projects.${projectId}.${PROJECT_BRANCH_WORK_MODE_STORAGE_SUFFIX}`;
}

function readProjectBranchWorkMode(
  projectId: string,
): ProjectBranchWorkMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = localStorage.getItem(
    getProjectBranchWorkModeStorageKey(projectId),
  );

  return storedValue === "main" || storedValue === "working-branch"
    ? storedValue
    : null;
}

function saveProjectBranchWorkMode(
  projectId: string,
  branchWorkMode: ProjectBranchWorkMode,
): void {
  localStorage.setItem(
    getProjectBranchWorkModeStorageKey(projectId),
    branchWorkMode,
  );
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
  const [branchWorkMode, setBranchWorkMode] =
    useState<ProjectBranchWorkMode | null>(() =>
      readProjectBranchWorkMode(params.id),
    );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const nextProject = getProjectById(params.id);

    setProject(nextProject);
    setGithubUrlInput(nextProject?.repositoryUrl ?? "");
    setWorkingDirectoryInput(nextProject?.workingDirectory ?? "");
    setBranchWorkMode(readProjectBranchWorkMode(params.id));
    setFeedbackMessage(null);
  }, [params.id]);

  if (!project) {
    return (
      <SectionCard>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">
            Ustawienia źródła
          </h2>
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
    setFeedbackMessage("Istniejący katalog repo zapisano jako metadane projektu.");
  }

  function handleBranchWorkModeChange(
    nextBranchWorkMode: ProjectBranchWorkMode,
  ) {
    saveProjectBranchWorkMode(params.id, nextBranchWorkMode);
    setBranchWorkMode(nextBranchWorkMode);
    setFeedbackMessage(
      nextBranchWorkMode === "main"
        ? "Wybrano pracę bezpośrednio na main jako decyzję Product Ownera."
        : "Wybrano użycie gałęzi roboczej jako decyzję Product Ownera.",
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

        {project.repositoryUrl?.trim() ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Decyzja pracy z gałęzią
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Po podaniu adresu GitHub wybierz, czy projekt ma pracować
              bezpośrednio na `main`, czy na gałęzi roboczej.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Synchronizacja zatwierdzonych zmian z powrotem do `main` jest
              przyszłą pracą, która nie jest jeszcze zaimplementowana.
            </p>

            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                <input
                  type="radio"
                  name="branch-work-mode"
                  checked={branchWorkMode === "main"}
                  onChange={() => handleBranchWorkModeChange("main")}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium text-zinc-100">
                    Pracuj na `main`
                  </span>
                  <span className="block text-sm text-zinc-400">
                    Najprostszy tryb, bez tworzenia osobnej gałęzi roboczej.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                <input
                  type="radio"
                  name="branch-work-mode"
                  checked={branchWorkMode === "working-branch"}
                  onChange={() => handleBranchWorkModeChange("working-branch")}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium text-zinc-100">
                    Utwórz i użyj gałęzi roboczej
                  </span>
                  <span className="block text-sm text-zinc-400">
                    Gałąź robocza ma pozostać lokalną decyzją pracy, a
                    synchronizacja do `main` zostaje na później.
                  </span>
                </span>
              </label>
            </div>

            <p className="mt-4 text-sm text-zinc-400" aria-live="polite">
              Wybrany tryb pracy:{" "}
              {branchWorkMode === "main"
                ? "Pracuj na `main`"
                : branchWorkMode === "working-branch"
                  ? "Utwórz i użyj gałęzi roboczej"
                  : "nie wybrano"}
            </p>
          </div>
        ) : null}

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
