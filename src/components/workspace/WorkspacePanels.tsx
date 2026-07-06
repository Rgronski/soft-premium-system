import { ConductorPanel } from "@/components/conductor/ConductorPanel";
import Link from "next/link";

type WorkspacePanelsProps = {
  clientsCount: number;
  servicesCount: number;
  visitsCount: number;
  upcomingVisitsCount: number;
  projectId: string;
};

export function WorkspacePanels({
  clientsCount,
  servicesCount,
  visitsCount,
  upcomingVisitsCount,
  projectId,
}: WorkspacePanelsProps) {
  const quickActions = [
    {
      href: `/projects/${projectId}/clients/new`,
      label: "Add Client",
    },
    {
      href: `/projects/${projectId}/services/new`,
      label: "Add Service",
    },
    {
      href: `/projects/${projectId}/visits/new`,
      label: "Schedule Visit",
    },
    {
      href: `/projects/${projectId}/calendar`,
      label: "Open Calendar",
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Clients
          </p>
          <p className="mt-2 text-2xl font-semibold text-zinc-50">
            {clientsCount}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Services
          </p>
          <p className="mt-2 text-2xl font-semibold text-zinc-50">
            {servicesCount}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Visits
          </p>
          <p className="mt-2 text-2xl font-semibold text-zinc-50">
            {visitsCount}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Upcoming Visits
          </p>
          <p className="mt-2 text-2xl font-semibold text-zinc-50">
            {upcomingVisitsCount}
          </p>
        </div>
      </div>

      <ConductorPanel />

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Quick Actions
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
