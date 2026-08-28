"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { SectionCard } from "@/components/ui/SectionCard";
import { getProjectById } from "@/lib/project/project";

type FoundationStatus = {
  label: string;
  status: string;
  description: string;
};

function buildFoundationStatuses(projectName: string | null): FoundationStatus[] {
  return [
    {
      label: "Project Identity",
      status: projectName ? "dostępny" : "nieznany",
      description: projectName
        ? `Bieżący projekt: ${projectName}.`
        : "Brak rozpoznanego projektu w bieżącym kontekście.",
    },
    {
      label: "SSOT",
      status: "planowane",
      description: "Źródło prawdy pozostaje w dokumentacji SSOT.",
    },
    {
      label: "Project Bible",
      status: "planowane",
      description: "Kompas celu, jakości i zakresu pozostaje do odczytu.",
    },
    {
      label: "Project Map",
      status: "niegotowe",
      description: "Kandydacka mapa nie jest jeszcze zbudowana ani kanoniczna.",
    },
    {
      label: "Working Source",
      status: "planowane",
      description: "Wskaż miejsce, w którym żyją projektowe pliki lub kod.",
    },
    {
      label: "First Layout",
      status: "planowane",
      description: "Pierwszy układ pozostaje osobnym krokiem implementacyjnym.",
    },
    {
      label: "First Working Flow",
      status: "planowane",
      description: "Pierwszy użyteczny przepływ pozostaje osobnym krokiem.",
    },
    {
      label: "Publication Path",
      status: "planowane",
      description: "Eksport i publikacja pozostają poza tym shell'em.",
    },
  ];
}

export default function ProjectMapPage() {
  const params = useParams<{ id: string }>();
  const project = getProjectById(params.id);
  const foundationStatuses = buildFoundationStatuses(project?.name ?? null);

  return (
    <SectionCard className="space-y-6">
      <div className="space-y-4 border-b border-zinc-800 pb-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Mapa projektu
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Shell przyszłej Mapy projektu
          </h2>
          <p className="text-sm text-zinc-400">
            To jest kandydacki shell przyszłej Mapy projektu. Nie promuje mapy do
            stanu kanonicznego, nie zapisuje niczego i nie uruchamia silnika mapy.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Kontekst projektu
          </p>
          {project ? (
            <div className="mt-2 space-y-1">
              <p className="text-lg font-medium text-zinc-100">{project.name}</p>
              <p className="text-sm text-zinc-400">ID projektu: {project.id}</p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-zinc-400">
              Projekt nie został znaleziony.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-4">
        <p className="text-sm text-amber-100">
          To jest widok kandydacki, nie kanoniczna Mapa projektu. Akcje zapisu,
          promowania i accept/write pozostają poza zakresem.
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Fundamenty
          </p>
          <h3 className="text-xl font-semibold text-zinc-50">
            Stan checklisty fundamentów
          </h3>
        </div>

        <div className="grid gap-3">
          {foundationStatuses.map((foundationStatus) => (
            <div
              key={foundationStatus.label}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-medium text-zinc-100">
                    {foundationStatus.label}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {foundationStatus.description}
                  </p>
                </div>

                <span className="inline-flex items-center rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">
                  {foundationStatus.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/projects/${params.id}`}
          className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
        >
          Wróć do przeglądu projektu
        </Link>
      </div>
    </SectionCard>
  );
}
