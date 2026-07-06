import { getConductorState } from "@/lib/conductor/conductor";

export function ConductorPanel() {
  const conductor = getConductorState();

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
    </div>
  );
}
