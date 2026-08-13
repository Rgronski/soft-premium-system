"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import {
  buildDefaultWorkingDirectory,
  createProject,
  getProjects,
  upsertProject,
} from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function isProject(value: unknown): value is Project {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Project).id === "string" &&
    typeof (value as Project).name === "string" &&
    typeof (value as Project).createdAt === "string"
  );
}

function getCreateProjectErrorMessage(
  responseStatus: number,
  errorBody: unknown,
): string {
  if (
    typeof errorBody === "object" &&
    errorBody !== null &&
    "status" in errorBody &&
    (errorBody as { status?: unknown }).status ===
      "working-directory-create-failed"
  ) {
    return "Nie udało się utworzyć katalogu roboczego projektu. Sprawdź uprawnienia i spróbuj ponownie.";
  }

  return `Project create request failed with ${responseStatus}`;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [workingDirectory, setWorkingDirectory] = useState(
    () => buildDefaultWorkingDirectory(""),
  );
  const [workingDirectoryManuallyEdited, setWorkingDirectoryManuallyEdited] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [discoveredProjects, setDiscoveredProjects] = useState<Project[]>([]);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [discoveryErrorMessage, setDiscoveryErrorMessage] = useState<
    string | null
  >(null);
  const [isDiscoveryLoading, setIsDiscoveryLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadDiscoveredProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Project discovery request failed.");
        }

        const payload = (await response.json()) as { projects?: unknown };

        if (!Array.isArray(payload.projects)) {
          throw new Error("Project discovery response is invalid.");
        }

        const nextProjects = payload.projects.filter(isProject);

        if (isActive) {
          setDiscoveredProjects(nextProjects);
          setDiscoveryErrorMessage(null);
        }
      } catch {
        if (isActive) {
          setDiscoveryErrorMessage("Nie udało się wczytać projektów z dysku.");
        }
      } finally {
        if (isActive) {
          setIsDiscoveryLoading(false);
        }
      }
    }

    void loadDiscoveredProjects();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    setLocalProjects(getProjects());
  }, []);

  async function handleCreateProject() {
    const trimmedProjectName = projectName.trim();
    const trimmedRepositoryUrl = repositoryUrl.trim();
    const trimmedWorkingDirectory = workingDirectory.trim();

    if (!trimmedProjectName || !trimmedWorkingDirectory || isSubmitting) {
      return;
    }

    const projectId = crypto.randomUUID();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `/api/projects/${encodeURIComponent(projectId)}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedProjectName,
            ...(trimmedRepositoryUrl
              ? {
                  repositoryUrl: trimmedRepositoryUrl,
                }
              : {}),
            workingDirectory: trimmedWorkingDirectory,
          }),
        },
      );

      if (!response.ok) {
        let errorBody: unknown = null;

        try {
          errorBody = await response.json();
        } catch {
          errorBody = null;
        }

        throw new Error(
          getCreateProjectErrorMessage(response.status, errorBody),
        );
      }

      const createdProject = await response.json();

      if (!isProject(createdProject)) {
        throw new Error("Project create response is invalid.");
      }

      createProject(
        createdProject.name,
        createdProject.id,
        createdProject.repositoryUrl,
        trimmedWorkingDirectory,
        createdProject.projectFilesystemStatus,
      );
      setLocalProjects(getProjects());
      setProjectName("");
      setRepositoryUrl("");
      setWorkingDirectory(buildDefaultWorkingDirectory(""));
      setWorkingDirectoryManuallyEdited(false);
      router.push(`/projects/${createdProject.id}`);
    } catch {
      setErrorMessage("Nie udało się utworzyć projektu. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenDiscoveredProject(project: Project) {
    createProject(
      project.name,
      project.id,
      project.repositoryUrl,
      project.workingDirectory,
      project.projectFilesystemStatus,
    );
    setLocalProjects(getProjects());
    router.push(`/projects/${project.id}`);
  }

  function handleAttachDiscoveredProject(project: Project) {
    upsertProject(project);
    setLocalProjects(getProjects());
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Tworzenie projektu
          </p>

          <h1 className="text-4xl font-semibold">Nowy projekt</h1>

          <p className="mt-2 text-zinc-400">
            Zacznij od podania nazwy projektu.
          </p>

          <p className="text-zinc-400">
            To pierwszy krok w przepływie tworzenia projektu.
          </p>
        </header>

        <SectionCard>
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">
              Nazwa projektu
            </span>

            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                const nextProjectName = e.target.value;
                setProjectName(nextProjectName);

                if (!workingDirectoryManuallyEdited) {
                  setWorkingDirectory(
                    buildDefaultWorkingDirectory(nextProjectName),
                  );
                }
              }}
              placeholder="Mój pierwszy projekt"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-zinc-400">
              Adres repozytorium
            </span>

            <input
              type="url"
              value={repositoryUrl}
              onChange={(e) => setRepositoryUrl(e.target.value)}
              placeholder="https://github.com/example/project"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-zinc-400">
              Katalog roboczy
            </span>

            <input
              type="text"
              value={workingDirectory}
              onChange={(e) => {
                setWorkingDirectoryManuallyEdited(true);
                setWorkingDirectory(e.target.value);
              }}
              placeholder="C:\\SPS_OS_WORK\\my-project"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Lokalna ścieżka należąca do SPS. Metadane repozytorium pozostają osobno.
            </p>
          </label>

          <button
            type="button"
            onClick={handleCreateProject}
            disabled={isSubmitting}
            className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950"
          >
            {isSubmitting ? "Tworzenie..." : "Utwórz projekt"}
          </button>

          {errorMessage ? (
            <p className="mt-4 text-sm text-red-300" aria-live="polite">
              {errorMessage}
            </p>
          ) : null}
        </SectionCard>

        <SectionCard>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Projekty wykryte na dysku
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Tylko odczyt z `C:\SPS_OS_WORK`
              </h2>

              <p className="mt-2 text-zinc-400">
                To są projekty znalezione przez serwer na podstawie
                `sps-project.json`. Nie są jeszcze scalone z lokalną listą
                przeglądarki.
              </p>
            </div>

            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
              {isDiscoveryLoading ? "Wczytywanie..." : "Odczyt"}
            </span>
          </div>

          {discoveryErrorMessage ? (
            <p className="mt-4 text-sm text-red-300" aria-live="polite">
              {discoveryErrorMessage}
            </p>
          ) : null}

          {!isDiscoveryLoading && !discoveryErrorMessage ? (
            discoveredProjects.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {discoveredProjects.map((project) => {
                  const localProject = localProjects.find(
                    (entry) => entry.id === project.id,
                  );
                  const isLocallyAttached = Boolean(localProject);
                  const hasSourceConflict = Boolean(
                    localProject &&
                      (localProject.name !== project.name ||
                        localProject.workingDirectory !==
                          project.workingDirectory ||
                        (localProject.repositoryUrl &&
                          project.repositoryUrl &&
                          localProject.repositoryUrl !==
                            project.repositoryUrl)),
                  );
                  const sourceLabel = project.workingDirectory.startsWith(
                    "C:\\SPS_OS_WORK",
                  )
                    ? "Z C:\\SPS_OS_WORK"
                    : `Z ${project.workingDirectory}`;

                  return (
                    <li
                      key={project.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-zinc-50">
                            {project.name}
                          </p>
                          <p className="mt-1 text-sm text-zinc-400">
                            {project.id}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500">
                            {project.workingDirectory}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleOpenDiscoveredProject(project)}
                              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
                            >
                              Otwórz
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleAttachDiscoveredProject(project)
                              }
                              disabled={isLocallyAttached}
                              className="rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-medium text-emerald-100 transition-colors hover:border-emerald-400 hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Przypnij
                            </button>
                          </div>

                          {isLocallyAttached ? (
                            <div className="flex flex-col items-end gap-2">
                              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100">
                                Przypięty lokalnie
                              </span>

                              {hasSourceConflict ? (
                                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100">
                                  Konflikt źródła
                                </span>
                              ) : null}

                              <span className="rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
                                {sourceLabel}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-zinc-500">
                Nie wykryto lokalnych projektów z poprawnym manifestem.
              </p>
            )
          ) : null}
        </SectionCard>
      </div>
    </main>
  );
}
