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
    return "Nie udaĹ‚o siÄ™ utworzyÄ‡ katalogu roboczego projektu. SprawdĹş uprawnienia i sprĂłbuj ponownie.";
  }

  return `Project create request failed with ${responseStatus}`;
}

type ProjectConflictField = {
  label: string;
  localValue: string;
  discoveredValue: string;
};

function getProjectConflictFields(
  localProject: Project,
  discoveredProject: Project,
): ProjectConflictField[] {
  const conflictFields: ProjectConflictField[] = [];

  if (localProject.name !== discoveredProject.name) {
    conflictFields.push({
      label: "Nazwa",
      localValue: localProject.name,
      discoveredValue: discoveredProject.name,
    });
  }

  if (localProject.workingDirectory !== discoveredProject.workingDirectory) {
    conflictFields.push({
      label: "Katalog roboczy",
      localValue: localProject.workingDirectory ?? "",
      discoveredValue: discoveredProject.workingDirectory ?? "",
    });
  }

  if (
    localProject.repositoryUrl &&
    discoveredProject.repositoryUrl &&
    localProject.repositoryUrl !== discoveredProject.repositoryUrl
  ) {
    conflictFields.push({
      label: "Repozytorium",
      localValue: localProject.repositoryUrl,
      discoveredValue: discoveredProject.repositoryUrl,
    });
  }

  return conflictFields;
}

function resolveDiscoveredProjectConflict(
  localProject: Project,
  discoveredProject: Project,
): Project {
  return {
    ...localProject,
    name: discoveredProject.name,
    workingDirectory:
      discoveredProject.workingDirectory ?? localProject.workingDirectory ?? "",
    ...(discoveredProject.repositoryUrl
      ? { repositoryUrl: discoveredProject.repositoryUrl }
      : {}),
  };
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
  const [expandedConflictProjectId, setExpandedConflictProjectId] = useState<
    string | null
  >(null);
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
          setDiscoveryErrorMessage("Nie udaĹ‚o siÄ™ wczytaÄ‡ projektĂłw z dysku.");
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
      setErrorMessage("Nie udaĹ‚o siÄ™ utworzyÄ‡ projektu. SprĂłbuj ponownie.");
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

  function handleKeepLocalProject() {
    setExpandedConflictProjectId(null);
  }

  function handleAcceptDiscoveredProject(
    localProject: Project,
    discoveredProject: Project,
  ) {
    upsertProject(
      resolveDiscoveredProjectConflict(localProject, discoveredProject),
    );
    setLocalProjects(getProjects());
    setExpandedConflictProjectId(null);
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
            To pierwszy krok w przepĹ‚ywie tworzenia projektu.
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
              placeholder={"M" + "\u00F3" + "j pierwszy projekt"}
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
              Lokalna Ĺ›cieĹĽka naleĹĽÄ…ca do SPS. Metadane repozytorium pozostajÄ… osobno.
            </p>
          </label>

          <button
            type="button"
            onClick={handleCreateProject}
            disabled={isSubmitting}
            className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950"
          >
            {isSubmitting ? "Tworzenie..." : "Utw\u00F3rz projekt"}
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
                To sÄ… projekty znalezione przez serwer na podstawie
                `sps-project.json`. Nie sÄ… jeszcze scalone z lokalnÄ… listÄ…
                przeglÄ…darki.
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
                  const conflictFields = localProject
                    ? getProjectConflictFields(localProject, project)
                    : [];
                  const hasSourceConflict = conflictFields.length > 0;
                  const sourceLabel = project.workingDirectory?.startsWith(
                    "C:\\SPS_OS_WORK",
                  )
                    ? "Z C:\\SPS_OS_WORK"
                    : `Z ${project.workingDirectory ?? ""}`;

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
                              {"Otw" + "\u00F3" + "rz"}
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
                                {"Przypi" + "\u0119" + "ty lokalnie"}
                              </span>

                              {hasSourceConflict ? (
                                <>
                                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100">
                                    {"Konflikt " + "\u017A" + "\u00F3" + "r\u00F3d\u0142a"}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedConflictProjectId(
                                        (current) =>
                                          current === project.id
                                            ? null
                                            : project.id,
                                      )
                                    }
                                    className="rounded-full border border-amber-500/40 px-4 py-2 text-sm font-medium text-amber-100 transition-colors hover:border-amber-400 hover:bg-amber-500/10"
                                  >
                                    {expandedConflictProjectId === project.id
                                      ? "Ukryj " + "r\u00F3" + "\u017C" + "nice"
                                      : "Zobacz " + "r\u00F3" + "\u017C" + "nice"}
                                  </button>

                                  {expandedConflictProjectId === project.id ? (
                                    <div className="w-full max-w-sm rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-left">
                                      <p className="text-xs uppercase tracking-[0.2em] text-amber-100">
                                        {"R\u00F3" + "\u017C" + "nice"}
                                      </p>

                                      <div className="mt-3 space-y-3">
                                        {conflictFields.map((field) => (
                                          <div
                                            key={field.label}
                                            className="space-y-1"
                                          >
                                            <p className="text-sm font-medium text-zinc-100">
                                              {field.label}
                                            </p>
                                            <div className="grid gap-1 text-sm text-zinc-300">
                                              <span>
                                                Lokalny wpis:{" "}
                                                {field.localValue}
                                              </span>
                                              <span>
                                                Wykryty wpis:{" "}
                                                {field.discoveredValue}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>

                                      <div className="mt-4 flex flex-wrap gap-2">
                                        <button
                                          type="button"
                                          onClick={handleKeepLocalProject}
                                          className="rounded-full border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
                                        >
                                          Zachowaj lokalną wersję
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                        handleAcceptDiscoveredProject(
                                              localProject!,
                                              project,
                                            )
                                          }
                                          className="rounded-full border border-amber-500/40 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:border-amber-400 hover:bg-amber-500/10"
                                        >
                                          Zaakceptuj wykryty projekt
                                        </button>
                                      </div>
                                    </div>
                                  ) : null}
                                </>
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
                Nie wykryto lokalnych projektĂłw z poprawnym manifestem.
              </p>
            )
          ) : null}
        </SectionCard>
      </div>
    </main>
  );
}
