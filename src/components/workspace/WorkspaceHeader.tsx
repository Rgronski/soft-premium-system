import Link from "next/link";
import type { WorkflowNextStep } from "@/lib/workflow/types";

type WorkspaceHeaderProps = {
  projectName: string;
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
  taskCount,
  knowledgeCount,
  workflowHealth,
  workflowConfidence,
  workflowNextStep,
  warningCount,
  blockerCount,
}: WorkspaceHeaderProps) {
  const overviewItems = [
    {
      label: "Project Name",
      value: projectName,
    },
    {
      label: "Task Count",
      value: taskCount,
    },
    {
      label: "Knowledge Count",
      value: knowledgeCount,
    },
    {
      label: "Workflow Health",
      value: workflowHealth,
    },
    {
      label: "Workflow Confidence",
      value: workflowConfidence,
    },
    {
      label: "Next Step",
      value: workflowNextStep.label,
    },
    {
      label: "Warnings",
      value: warningCount,
    },
    {
      label: "Blockers",
      value: blockerCount,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Project Overview
        </p>
        <h2 className="text-2xl font-semibold text-zinc-50">
          Workspace Dashboard
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

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Next Step Action
        </p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-100">
              {workflowNextStep.label}
            </p>
            <p className="text-sm text-zinc-400">
              {workflowNextStep.description}
            </p>
          </div>

          <Link
            href="./tasks"
            className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            Open tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
