"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { WorkflowNextStep } from "@/lib/workflow/types";

function isExternalRepositoryUrl(repositoryUrl: string) {
  try {
    const parsedUrl = new URL(repositoryUrl);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

type WorkspaceHeaderProps = {
  projectName: string;
  repositoryUrl?: string;
  taskCount: number;
  knowledgeCount: number;
  workflowHealth: string;
  workflowConfidence: number;
  workflowNextStep: WorkflowNextStep;
  warningCount: number;
  blockerCount: number;
};

export function WorkspaceHeader({
  projectName,
  repositoryUrl,
  taskCount,
  knowledgeCount,
  workflowHealth,
  workflowConfidence,
  workflowNextStep,
  warningCount,
  blockerCount,
}: WorkspaceHeaderProps) {
  const params = useParams<{ id: string }>();
  const projectId = params.id;
  const overviewItems = [
    {
      label: "Nazwa projektu",
      value: projectName,
    },
    {
      label: "Liczba zadań",
      value: taskCount,
    },
    {
      label: "Liczba wpisów wiedzy",
      value: knowledgeCount,
    },
    {
      label: "Stan przepływu pracy",
      value: workflowHealth,
    },
    {
      label: "Pewność przepływu",
      value: workflowConfidence,
    },
    {
      label: "Następny krok",
      value: workflowNextStep.label,
    },
    {
      label: "Ostrzeżenia",
      value: warningCount,
    },
    {
      label: "Blokady",
      value: blockerCount,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Przegląd projektu
        </p>
        <h2 className="text-2xl font-semibold text-zinc-50">
          Pulpit przestrzeni pracy
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewItems.map((overviewItem) => (
          <div
            key={overviewItem.label}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {overviewItem.label}
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-100">
              {overviewItem.value}
            </p>
          </div>
        ))}
      </div>

      {repositoryUrl ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Repozytorium
          </p>
          {isExternalRepositoryUrl(repositoryUrl) ? (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Otwórz repozytorium
            </a>
          ) : (
            <p className="mt-2 break-all text-sm text-zinc-400">
              {repositoryUrl}
            </p>
          )}
        </div>
      ) : null}

      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-zinc-950/60 to-zinc-950/80 p-4 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
              Project Brain
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Następny krok
            </p>
          </div>

          <Link
            href={`/projects/${projectId}/tasks`}
            className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-50 transition-colors hover:border-emerald-300/50 hover:bg-emerald-400/20"
          >
            Otwórz zadania
          </Link>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-base font-semibold text-zinc-50">
            {workflowNextStep.label}
          </p>
          <p className="text-sm leading-6 text-zinc-300">
            {workflowNextStep.description}
          </p>
        </div>
      </div>
    </div>
  );
}
