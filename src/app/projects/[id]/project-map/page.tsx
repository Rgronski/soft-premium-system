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

type ProjectMapCanonicalVsCandidateCopy = {
  title: string;
  description: string;
  details: string[];
};

type ProjectMapParkedIdeasCopy = {
  title: string;
  description: string;
  details: string[];
};

type ProjectMapMilestoneEvidenceDrilldownEntryCopy = {
  foundationArea: string;
  status: string;
  statusReason: string;
  evidenceLines: string[];
};

type ProjectMapMilestoneEvidenceDrilldownCopy = {
  title: string;
  description: string;
  entries: ProjectMapMilestoneEvidenceDrilldownEntryCopy[];
  emptyState: string;
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

function buildProjectMapCanonicalVsCandidateCopy(
  mapReadResult: ProjectMapReadResult | null,
  candidate: ProjectMapReconstructionCandidateResult | null,
): ProjectMapCanonicalVsCandidateCopy | null {
  if (!mapReadResult && !candidate) {
    return null;
  }

  const canonicalStatus =
    !mapReadResult || mapReadResult.status === "missing"
      ? "missing"
      : mapReadResult.reason === "project-map-present-but-read-not-implemented"
        ? "present"
        : "unavailable";

  const candidateStatus =
    !candidate || candidate.status === "unavailable" ? "unavailable" : "available";

  const viewMode =
    canonicalStatus === "present" && candidateStatus === "available"
      ? "mixed"
      : canonicalStatus === "present"
        ? "canonical"
        : candidateStatus === "available"
          ? "candidate"
          : "missing";

  const details = [
    `Current view: ${viewMode}`,
    `Canonical Project Map: ${canonicalStatus}`,
    `Reconstruction candidate: ${candidateStatus}`,
    "Candidate data is not canonical unless it is explicitly written through the approved boundary.",
  ];

  if (
    mapReadResult &&
    "projectSourceIdentityPersistence" in mapReadResult &&
    mapReadResult.projectSourceIdentityPersistence
  ) {
    details.push(
      `Source identity persistence: ${mapReadResult.projectSourceIdentityPersistence.status}`,
    );
  }

  if (
    mapReadResult &&
    "projectSourceIdentity" in mapReadResult &&
    mapReadResult.projectSourceIdentity
  ) {
    details.push(
      `Repository URL: ${mapReadResult.projectSourceIdentity.repositoryUrl ?? "missing"}`,
    );
    details.push(
      `Working source: ${mapReadResult.projectSourceIdentity.workingDirectory ?? "missing"}`,
    );
    details.push(
      `Checkout path: ${mapReadResult.projectSourceIdentity.projectCheckoutPath ?? "missing"}`,
    );
    details.push(
      `Canonical storage root: ${mapReadResult.projectMapRootPath ?? "missing"}`,
    );
  }

  return {
    title: "Canonical vs candidate state",
    description:
      "This summary keeps canonical Project Map state separate from reconstruction candidate state and makes the current view explicit.",
    details,
  };
}

function buildProjectMapParkedIdeasCopy(
  candidate: ProjectMapReconstructionCandidateResult | null,
): ProjectMapParkedIdeasCopy | null {
  if (!candidate) {
    return null;
  }

  const parkedIdeas = candidate.foundationChecklist.filter(
    (item) =>
      item.status === "parked" || item.milestoneStates.includes("parked"),
  );

  if (parkedIdeas.length === 0) {
    return {
      title: "Parked ideas / future improvements",
      description:
        "Parked ideas stay attached to the relevant milestone or block and remain reviewable context, not active scope.",
      details: [
        "No parked or deferred items were found in the current candidate.",
        "Parked ideas remain explicit only when source evidence supports them.",
      ],
    };
  }

  return {
    title: "Parked ideas / future improvements",
    description:
      "Parked ideas stay attached to the relevant milestone or block and remain reviewable context, not active scope.",
    details: parkedIdeas.map(
      (item) =>
        `${item.foundationArea}: ${item.status} | milestones: ${item.milestoneStates.join(", ")}`,
    ),
  };
}

function buildProjectMapMilestoneEvidenceStateLabel(
  evidence: ProjectMapReconstructionCandidateChecklistItem["evidence"][number],
): string {
  const labels = ["candidate"];

  if (evidence.confidence === "missing") {
    labels.push("missing");
  } else if (evidence.confidence === "weak") {
    labels.push("weak");
  } else if (evidence.confidence === "unknown") {
    labels.push("inferred");
  }

  if (evidence.conflictState === "conflicting") {
    labels.push("conflicting");
  }

  if (evidence.milestoneStates.includes("parked")) {
    labels.push("parked");
  }

  return labels.join(" / ");
}

function buildProjectMapMilestoneEvidenceStatusReason(
  item: ProjectMapReconstructionCandidateChecklistItem,
): string {
  if (item.status === "completed") {
    return item.supportState === "confirmed"
      ? "Direct source evidence supports this block as completed."
      : "Evidence points to completion, but the support signal remains weaker.";
  }

  if (item.status === "planned") {
    return item.evidence.length > 0
      ? "Source evidence links this block to planned future work."
      : "Planned because no completion evidence was found.";
  }

  if (item.status === "blocked") {
    return "Unavailable or unreadable evidence keeps this block blocked.";
  }

  if (item.status === "parked") {
    return "Parked evidence keeps this block as future context, not active scope.";
  }

  if (item.status === "needs review") {
    return "Conflicting evidence keeps this block on review.";
  }

  if (item.status === "absent") {
    return "No supporting evidence was found, so the block stays absent.";
  }

  return "Evidence exists, but the block remains unresolved.";
}

function buildProjectMapMilestoneEvidenceDrilldownCopy(
  candidate: ProjectMapCandidateCopy | null,
): ProjectMapMilestoneEvidenceDrilldownCopy | null {
  if (!candidate) {
    return null;
  }

  const entries = candidate.foundationChecklist.map((item) => {
    const evidenceLines =
      item.evidence.length > 0
        ? item.evidence.map(
            (evidence) =>
              `Evidence state: ${buildProjectMapMilestoneEvidenceStateLabel(evidence)} | source type: ${evidence.evidenceType} | source owner: ${evidence.sourceOwner} | source path: ${evidence.sourcePath} | confidence: ${evidence.confidence} | support: ${evidence.supportState} | conflict: ${evidence.conflictState}`,
          )
        : ["No source evidence linked to this block yet."];

    return {
      foundationArea: item.foundationArea,
      status: item.status,
      statusReason: buildProjectMapMilestoneEvidenceStatusReason(item),
      evidenceLines,
    };
  });

  return {
    title: "Milestone evidence drilldown",
    description:
      "This drilldown explains why each block stays check, planned, blocked, unknown, parked, or needs review without upgrading evidence by implication.",
    entries,
    emptyState: "No candidate evidence was available for drilldown yet.",
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
  const projectMapCanonicalVsCandidateCopy =
    buildProjectMapCanonicalVsCandidateCopy(mapReadResult, mapCandidate);
  const projectMapParkedIdeasCopy = buildProjectMapParkedIdeasCopy(mapCandidate);
  const projectMapMilestoneEvidenceDrilldownCopy =
    buildProjectMapMilestoneEvidenceDrilldownCopy(projectMapCandidateCopy);

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

      {projectMapCanonicalVsCandidateCopy ? (
        <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/70">
            Canonical vs candidate state
          </p>
          <h3 className="mt-1 text-xl font-semibold text-emerald-50">
            {projectMapCanonicalVsCandidateCopy.title}
          </h3>
          <p className="mt-2 text-sm text-emerald-100/80">
            {projectMapCanonicalVsCandidateCopy.description}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-emerald-50/90">
            {projectMapCanonicalVsCandidateCopy.details.map((detail) => (
              <li
                key={detail}
                className="rounded-lg border border-emerald-900/60 bg-emerald-950/40 px-3 py-2"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {projectMapParkedIdeasCopy ? (
        <div className="rounded-xl border border-lime-900/50 bg-lime-950/20 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-lime-200/70">
            Parked ideas visibility
          </p>
          <h3 className="mt-1 text-xl font-semibold text-lime-50">
            {projectMapParkedIdeasCopy.title}
          </h3>
          <p className="mt-2 text-sm text-lime-100/80">
            {projectMapParkedIdeasCopy.description}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-lime-50/90">
            {projectMapParkedIdeasCopy.details.map((detail) => (
              <li
                key={detail}
                className="rounded-lg border border-lime-900/60 bg-lime-950/40 px-3 py-2"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {projectMapMilestoneEvidenceDrilldownCopy ? (
        <div className="space-y-3 rounded-xl border border-cyan-900/50 bg-cyan-950/20 p-4">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/70">
              Milestone evidence drilldown
            </p>
            <h3 className="text-xl font-semibold text-cyan-50">
              {projectMapMilestoneEvidenceDrilldownCopy.title}
            </h3>
            <p className="text-sm text-cyan-100/80">
              {projectMapMilestoneEvidenceDrilldownCopy.description}
            </p>
          </div>

          {projectMapMilestoneEvidenceDrilldownCopy.entries.length > 0 ? (
            <div className="grid gap-3">
              {projectMapMilestoneEvidenceDrilldownCopy.entries.map((entry) => (
                <div
                  key={entry.foundationArea}
                  className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-base font-medium text-cyan-50">
                        {entry.foundationArea}
                      </p>
                      <p className="text-sm text-cyan-100/80">
                        Status reason: {entry.statusReason}
                      </p>
                    </div>

                    <span className="inline-flex items-center rounded-full border border-cyan-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                      {entry.status}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                    {entry.evidenceLines.map((evidenceLine) => (
                      <li
                        key={evidenceLine}
                        className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2"
                      >
                        {evidenceLine}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2 text-sm text-cyan-50/90">
              {projectMapMilestoneEvidenceDrilldownCopy.emptyState}
            </p>
          )}
        </div>
      ) : null}

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
