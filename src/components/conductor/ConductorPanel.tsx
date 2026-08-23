import {
  deriveConductorProjectBrainGuidance,
} from "@/lib/conductor/conductor";
import type { WorkflowNextStep } from "@/lib/workflow/types";

type ConductorPanelProps = {
  workflowNextStep?: WorkflowNextStep;
};

const actionReadinessLabels = {
  "ready-to-act-on": "Gotowe do działania",
  "requires-product-owner-decision": "Wymaga decyzji Product Ownera",
  "informational-only": "Tylko informacyjnie",
} as const;

const actionReadinessSignals = {
  "ready-to-act-on": {
    label: "Gotowy",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  },
  "requires-product-owner-decision": {
    label: "Uwaga: wymagana decyzja Product Ownera",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  },
  "informational-only": {
    label: "Informacyjnie",
    className: "border-zinc-700 bg-zinc-900/70 text-zinc-300",
  },
} as const;

const projectFacingConductorState = {
  currentMilestone: "Konduktor projektu czeka na decyzję Product Ownera",
  currentPhase: "Brak stanu dla projektu",
  currentTask: "Projekt nie ma jeszcze własnego stanu Konduktora",
  nextAction:
    "Konduktor może wskazać następny krok dopiero po zapisaniu stanu projektu albo decyzji Product Ownera.",
  projectHealth: "warning",
} as const;

export function ConductorPanel({ workflowNextStep }: ConductorPanelProps) {
  const conductor = projectFacingConductorState;
  const guidance = deriveConductorProjectBrainGuidance(workflowNextStep);
  const guidanceReason =
    guidance.actionReadiness === "requires-product-owner-decision"
      ? "Konduktor projektu czeka na decyzję Product Ownera i nie ma jeszcze własnego stanu dla tego projektu."
      : guidance.reason;
  const readinessLabel = actionReadinessLabels[guidance.actionReadiness];
  const readinessSignal = actionReadinessSignals[guidance.actionReadiness];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
        Konduktor
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Bieżący kamień milowy
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.currentMilestone}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Bieżąca faza
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.currentPhase}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Bieżące zadanie
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.currentTask}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Następna akcja
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-100">
            {conductor.nextAction}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Stan projektu
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
        <p className="mt-2 text-base font-semibold leading-6 text-zinc-50">
          {guidance.headline}
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-300">
          {guidance.description}
        </p>

        <div className="mt-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Gotowość do działania
          </p>
          <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-zinc-200">
            {readinessLabel}
          </p>
          <div
            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${readinessSignal.className}`}
          >
            {readinessSignal.label}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Powód
          </p>
          <p className="mt-1 text-sm leading-6 text-zinc-300">
            {guidanceReason}
          </p>
        </div>

        <div className="mt-4 border-t border-emerald-500/10 pt-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Źródło
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
            Project Brain - tylko do odczytu - bieżący stan
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            {guidance.hasRecommendation
              ? "Rekomendacja tylko do odczytu z Project Brain."
              : guidance.actionReadiness === "requires-product-owner-decision"
                ? "Wskazówka tylko do odczytu oczekująca decyzji Product Ownera."
                : "Ograniczona wskazówka tylko do odczytu z Project Brain."}
          </p>
        </div>
      </div>
    </div>
  );
}
