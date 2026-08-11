"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import {
  buildDefaultWorkingDirectory,
  createProject,
} from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

function isProject(value: unknown): value is Project {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Project).id === "string" &&
    typeof (value as Project).name === "string" &&
    typeof (value as Project).createdAt === "string"
  );
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
        throw new Error(`Project create request failed with ${response.status}`);
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
      );
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

        <SectionCard>
          <label className="block">
            <span className="mb-2 block text-sm text-zinc-400">
              Project Name
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
              placeholder="My First Project"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-zinc-400">
              Repository URL
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
              Working Directory
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
              SPS-owned local path. Repository metadata stays separate.
            </p>
          </label>

          <button
            type="button"
            onClick={handleCreateProject}
            disabled={isSubmitting}
            className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>

          {errorMessage ? (
            <p className="mt-4 text-sm text-red-300" aria-live="polite">
              {errorMessage}
            </p>
          ) : null}
        </SectionCard>
      </div>
    </main>
  );
}
