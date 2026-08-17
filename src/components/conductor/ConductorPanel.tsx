import {
  deriveConductorProjectBrainGuidance,
  getConductorState,
} from "@/lib/conductor/conductor";
import type { WorkflowNextStep } from "@/lib/workflow/types";

type ConductorPanelProps = {
  workflowNextStep?: WorkflowNextStep;
};

const actionReadinessLabels = {
  "ready-to-act-on": "Ready to act on",
  "requires-product-owner-decision": "Requires Product Owner decision",
  "informational-only": "Informational only",
} as const;

const actionReadinessSignals = {
  "ready-to-act-on": {
    label: "Ready",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  },
  "requires-product-owner-decision": {
    label: "Caution: Product Owner decision required",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  },
  "informational-only": {
    label: "Informational",
    className: "border-zinc-700 bg-zinc-900/70 text-zinc-300",
  },
} as const;

export function ConductorPanel({ workflowNextStep }: ConductorPanelProps) {
  const conductor = getConductorState();
  const guidance = deriveConductorProjectBrainGuidance(workflowNextStep);
  const readinessLabel = actionReadinessLabels[guidance.actionReadiness];
  const readinessSignal = actionReadinessSignals[guidance.actionReadiness];

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
          {guidance.description}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          Reason
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-300">
          {guidance.reason}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          Action readiness
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
          {readinessLabel}
        </p>
        <div
          className={`mt-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${readinessSignal.className}`}
        >
          {readinessSignal.label}
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          Source: Project Brain Â· read-only Â· current state
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          {guidance.hasRecommendation
            ? "Read-only recommendation from Project Brain."
            : guidance.actionReadiness === "requires-product-owner-decision"
              ? "Read-only guidance pending Product Owner decision."
              : "Limited read-only guidance from Project Brain."}
        </p>
      </div>
    </div>
  );
}
