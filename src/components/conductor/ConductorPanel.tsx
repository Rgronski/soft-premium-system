import { getConductorState, deriveConductorProjectBrainGuidance } from "@/lib/conductor/conductor";
import type { WorkflowNextStep } from "@/lib/workflow/types";

type ConductorPanelProps = {
  workflowNextStep?: WorkflowNextStep;
};

export function ConductorPanel({ workflowNextStep }: ConductorPanelProps) {
  const conductor = getConductorState();
  const guidance = deriveConductorProjectBrainGuidance(workflowNextStep);
  const guidanceDescription = guidance.hasRecommendation
    ? guidance.description
    : "Konduktor only reflects the current Project Brain signal. It is read-only, limited, and not a command or new decision.";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
        The Conductor
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Current Milestone
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.currentMilestone}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Current Phase
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.currentPhase}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Current Task
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.currentTask}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Next Action
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.nextAction}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Project Health
          </p>
          <p className="mt-2 text-sm font-medium capitalize text-zinc-100">
            {conductor.projectHealth}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
          Project Brain Guidance
        </p>
        <p className="mt-2 text-sm font-medium text-zinc-100">
          {guidance.headline}
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-300">
          {guidanceDescription}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          Source: Project Brain · read-only · current state
        </p>
        {!guidance.hasRecommendation ? (
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            Limited read-only guidance
          </p>
        ) : null}
      </div>
    </div>
  );
}
