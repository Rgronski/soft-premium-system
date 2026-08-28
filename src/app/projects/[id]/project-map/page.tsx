import Link from "next/link";

import { SectionCard } from "@/components/ui/SectionCard";
import { getServerProjectById } from "@/lib/project/server";
import {
  resolveProjectMapReadResult,
  type ProjectMapReadResult,
} from "@/lib/project-map/read";

type FoundationStatus = {
  label: string;
  status: string;
  description: string;
};

type ProjectMapStateCopy = {
  title: string;
  description: string;
  details: string[];
};

function buildProjectMapStateCopy(
  mapReadResult: ProjectMapReadResult | null,
): ProjectMapStateCopy {
  if (!mapReadResult) {
    return {
      title: "Kontekst projektu niedostępny",
      description:
        "Nie rozpoznano poprawnego projektu, więc Mapa projektu pozostaje niedostępna.",
      details: [
        "Brak poprawnego kontekstu projektu.",
        "Shell nie promuje żadnej mapy do stanu kanonicznego.",
      ],
    };
  }

  if (mapReadResult.status === "missing") {
    return {
      title: "Mapa projektu nie jest jeszcze gotowa",
      description:
        "Dla tego projektu nie ma jeszcze folderu Project Map ani pliku map.json, więc stan pozostaje jawnie niegotowy.",
      details: [
        `Project Map root: ${mapReadResult.projectMapRootPath}`,
        `map.json: ${mapReadResult.mapJsonPath}`,
      ],
    };
  }

  if (mapReadResult.reason === "project-map-present-but-read-not-implemented") {
    return {
      title: "Mapa projektu jest obecna, ale odczyt niezaimplementowany",
      description:
        "Helper wykrył obecność pliku map.json, ale właściwy odczyt mapy nadal pozostaje poza zakresem tej wersji.",
      details: [
        `Project Map root: ${mapReadResult.projectMapRootPath ?? "brak"}`,
        `map.json: ${mapReadResult.mapJsonPath ?? "brak"}`,
      ],
    };
  }

  return {
    title: "Stan mapy projektu niedostępny",
    description:
      "Dostęp do Project Map nie mógł zostać bezpiecznie potwierdzony, więc shell pokazuje stan niedostępny zamiast udawać kompletność.",
    details: [
      `Powód: ${mapReadResult.reason}`,
      `Project Map root: ${mapReadResult.projectMapRootPath ?? "brak"}`,
      `map.json: ${mapReadResult.mapJsonPath ?? "brak"}`,
    ],
  };
}

function buildFoundationStatuses(
  projectName: string | null,
  mapReadResult: ProjectMapReadResult | null,
): FoundationStatus[] {
  const projectIdentityStatus = projectName ? "dostępny" : "niedostępny";
  const projectMapStatus =
    !mapReadResult || mapReadResult.status === "missing"
      ? "brak / niegotowe"
      : mapReadResult.reason === "project-map-present-but-read-not-implemented"
        ? "obecna / odczyt niezaimplementowany"
        : "niedostępna";

  return [
    {
      label: "Project Identity",
      status: projectIdentityStatus,
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
      status: projectMapStatus,
      description:
        projectMapStatus === "brak / niegotowe"
          ? "Mapa projektu nie jest jeszcze gotowa do użycia."
          : projectMapStatus === "obecna / odczyt niezaimplementowany"
            ? "Mapa projektu istnieje, ale odczyt pozostaje niezaimplementowany."
            : "Mapa projektu pozostaje niedostępna.",
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
      description: "Eksport i publikacja pozostają poza tym shellem.",
    },
  ];
}

export default async function ProjectMapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getServerProjectById(id);
  const mapReadResult = project
    ? await resolveProjectMapReadResult(project)
    : null;
  const foundationStatuses = buildFoundationStatuses(
    project?.name ?? null,
    mapReadResult,
  );
  const projectMapStateCopy = buildProjectMapStateCopy(mapReadResult);

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

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Stan odczytu mapy
        </p>
        <h3 className="mt-1 text-xl font-semibold text-zinc-50">
          {projectMapStateCopy.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          {projectMapStateCopy.description}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          {projectMapStateCopy.details.map((detail) => (
            <li key={detail} className="rounded-lg border border-zinc-800 px-3 py-2">
              {detail}
            </li>
          ))}
        </ul>
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
          href={`/projects/${id}`}
          className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
        >
          Wróć do przeglądu projektu
        </Link>
      </div>
    </SectionCard>
  );
}
