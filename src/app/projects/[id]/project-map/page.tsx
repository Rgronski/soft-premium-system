import Link from "next/link";

import { SectionCard } from "@/components/ui/SectionCard";
import { getServerProjectById } from "@/lib/project/server";
import { classifyProjectMapEvidence } from "@/lib/project-map/classify";
import { buildProjectMapReconstructionCandidate } from "@/lib/project-map/reconstruct";
import { scanProjectMapEvidence } from "@/lib/project-map/scan";
import {
  resolveProjectMapReadResult,
  type ProjectMapReadResult,
} from "@/lib/project-map/read";
import type {
  ProjectMapReconstructionCandidateChecklistItem,
  ProjectMapReconstructionCandidateResult,
} from "@/lib/project-map/reconstruct";

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

type ProjectMapCandidateCopy = {
  title: string;
  description: string;
  details: string[];
  foundationChecklist: ProjectMapReconstructionCandidateChecklistItem[];
  evidenceSummaries: string[];
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

function buildProjectMapCandidateCopy(
  candidate: ProjectMapReconstructionCandidateResult | null,
): ProjectMapCandidateCopy | null {
  if (!candidate) {
    return null;
  }

  if (candidate.status === "unavailable") {
    return {
      title: "Project Map candidate not ready",
      description:
        "The reconstruction pipeline could not build a reviewable candidate, so the page keeps the state explicit instead of pretending the map is ready.",
      details: [
        `Reason: ${candidate.reason}`,
        `Project ID: ${candidate.projectId ?? "missing"}`,
        `Project name: ${candidate.projectName ?? "missing"}`,
        `Source path: ${candidate.sourcePath ?? "missing"}`,
      ],
      foundationChecklist: [],
      evidenceSummaries: [],
    };
  }

  return {
    title: "Reviewable Project Map candidate",
    description:
      "This is a read-only reconstruction candidate, not canonical Project Map data. It keeps source evidence and foundation states visible for review.",
    details: [
      `Evidence items: ${candidate.evidence.length}`,
      `Foundation areas: ${candidate.foundationChecklist.length}`,
      "No canonical write, export, promote, or accept action is implemented.",
    ],
    foundationChecklist: candidate.foundationChecklist,
    evidenceSummaries: candidate.evidence.map((evidence) => {
      const foundationAreas =
        evidence.foundationAreas.length > 0
          ? evidence.foundationAreas.join(", ")
          : "none";

      return `${evidence.evidenceType} / ${evidence.discoveryStatus} / ${evidence.supportState} / ${evidence.sourceRelativePath} / ${foundationAreas}`;
    }),
  };
}

function buildProjectMapCandidateFoundationDescription(
  item: ProjectMapReconstructionCandidateChecklistItem,
): string {
  return [
    `support: ${item.supportState}`,
    `conflict: ${item.conflictState}`,
    `evidence: ${item.evidence.length}`,
    `milestones: ${item.milestoneStates.join(", ")}`,
  ].join(" | ");
}

async function loadProjectMapCandidate(
  project: Awaited<ReturnType<typeof getServerProjectById>>,
): Promise<ProjectMapReconstructionCandidateResult | null> {
  if (!project) {
    return null;
  }

  const scanResult = await scanProjectMapEvidence(project);
  const classificationResult = classifyProjectMapEvidence(scanResult);

  return buildProjectMapReconstructionCandidate(classificationResult);
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
  const mapCandidate = await loadProjectMapCandidate(project);
  const foundationStatuses = buildFoundationStatuses(
    project?.name ?? null,
    mapReadResult,
  );
  const projectMapStateCopy = buildProjectMapStateCopy(mapReadResult);
  const projectMapCandidateCopy = buildProjectMapCandidateCopy(mapCandidate);

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

      {projectMapCandidateCopy ? (
        <div className="space-y-3 rounded-xl border border-sky-900/50 bg-sky-950/20 p-4">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200/70">
              Candidate pipeline
            </p>
            <h3 className="text-xl font-semibold text-sky-50">
              {projectMapCandidateCopy.title}
            </h3>
            <p className="text-sm text-sky-100/80">
              {projectMapCandidateCopy.description}
            </p>
          </div>

          <ul className="space-y-2 text-sm text-sky-50/90">
            {projectMapCandidateCopy.details.map((detail) => (
              <li
                key={detail}
                className="rounded-lg border border-sky-900/60 bg-sky-950/40 px-3 py-2"
              >
                {detail}
              </li>
            ))}
          </ul>

          {projectMapCandidateCopy.foundationChecklist.length > 0 ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-200/70">
                  Candidate foundation statuses
                </p>
                <p className="text-sm text-sky-100/70">
                  Reviewable candidate data stays separate from canonical Project
                  Map data.
                </p>
              </div>

              <div className="grid gap-3">
                {projectMapCandidateCopy.foundationChecklist.map((item) => (
                  <div
                    key={item.foundationArea}
                    className="rounded-xl border border-sky-900/60 bg-sky-950/30 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <p className="text-base font-medium text-sky-50">
                          {item.foundationArea}
                        </p>
                        <p className="text-sm text-sky-100/70">
                          {buildProjectMapCandidateFoundationDescription(item)}
                        </p>
                      </div>

                      <span className="inline-flex items-center rounded-full border border-sky-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {projectMapCandidateCopy.evidenceSummaries.length > 0 ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-200/70">
                  Evidence and provenance
                </p>
                <p className="text-sm text-sky-100/70">
                  Source links remain visible so the candidate can be reviewed
                  without promoting it to canonical data.
                </p>
              </div>

              <ul className="space-y-2 text-sm text-sky-50/90">
                {projectMapCandidateCopy.evidenceSummaries.map((summary) => (
                  <li
                    key={summary}
                    className="rounded-lg border border-sky-900/60 bg-sky-950/40 px-3 py-2"
                  >
                    {summary}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

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
