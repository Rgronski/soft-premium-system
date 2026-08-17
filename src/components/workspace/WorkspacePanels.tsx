import { ConductorPanel } from "@/components/conductor/ConductorPanel";
import type { WorkflowNextStep } from "@/lib/workflow/types";
import Link from "next/link";

type WorkspacePanelsProps = {
  clientsCount: number;
  servicesCount: number;
  visitsCount: number;
  upcomingVisitsCount: number;
  projectId: string;
  workflowNextStep: WorkflowNextStep;
};

export function WorkspacePanels({
  clientsCount,
  servicesCount,
  visitsCount,
  upcomingVisitsCount,
  projectId,
  workflowNextStep,
}: WorkspacePanelsProps) {
  const kpiCards = [
    {
      label: "Klienci",
      value: clientsCount,
    },
    {
      label: "Usługi",
      value: servicesCount,
    },
    {
      label: "Wizyty",
      value: visitsCount,
    },
    {
      label: "Nadchodzące wizyty",
      value: upcomingVisitsCount,
    },
  ];

  const quickActions = [
    {
      href: `/projects/${projectId}/tasks`,
      label: "Dodaj zadanie",
    },
    {
      href: `/projects/${projectId}/clients/new`,
      label: "Dodaj klienta",
    },
    {
      href: `/projects/${projectId}/services/new`,
      label: "Dodaj usługę",
    },
    {
      href: `/projects/${projectId}/visits/new`,
      label: "Zaplanuj wizytę",
    },
    {
      href: `/projects/${projectId}/calendar`,
      label: "Otwórz kalendarz",
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpiCard) => (
          <div
            key={kpiCard.label}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {kpiCard.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-zinc-50">
              {kpiCard.value}
            </p>
          </div>
        ))}
      </div>

      <ConductorPanel workflowNextStep={workflowNextStep} />

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Szybkie akcje
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {quickActions.map((quickAction) => (
            <Link
              key={quickAction.href}
              href={quickAction.href}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              {quickAction.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
