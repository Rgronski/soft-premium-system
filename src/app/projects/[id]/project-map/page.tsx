import { access, mkdir } from "node:fs/promises";

import Link from "next/link";

import { SectionCard } from "@/components/ui/SectionCard";
import { resolveProjectMapStorageRoot } from "@/lib/project-brain/metadata";
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

type ProjectMapOverviewCardCopy = {
  label: string;
  title: string;
  description: string;
  detail: string;
};

type ProjectMapActionEntryCopy = {
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel: string;
  secondaryActionHref: string;
  note: string;
};

type ProjectMapRefreshFeedbackCopy = {
  title: string;
  description: string;
  details: string[];
};

type ProjectMapAvailabilityExplanationStatus =
  | "działa"
  | "candidate"
  | "planowane"
  | "wymaga danych"
  | "wymaga integracji"
  | "blocker";

type ProjectMapAvailabilityExplanationRow = {
  label: string;
  status: ProjectMapAvailabilityExplanationStatus;
  why: string;
  nextStep: string;
  source: "projekt" | "SPS shell" | "candidate" | "canonical" | "missing";
};

type ProjectMapAvailabilityExplanationCopy = {
  title: string;
  description: string;
  rows: ProjectMapAvailabilityExplanationRow[];
};

type ProjectMapStorageReadinessCopy = {
  status: "missing" | "ready" | "unavailable";
  projectMapRootPath?: string;
  projectMetadataRootPath?: string;
  reason?: "invalid-project-identity" | "project-map-access-unavailable";
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

function isMissingPathError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  const code = (error as { code?: unknown }).code;

  return code === "ENOENT" || code === "ENOTDIR";
}

async function resolveProjectMapStorageReadiness(
  project: Awaited<ReturnType<typeof getServerProjectById>> | null,
): Promise<ProjectMapStorageReadinessCopy | null> {
  if (!project) {
    return null;
  }

  const storageRoot = resolveProjectMapStorageRoot(project);

  if (storageRoot.status === "unavailable") {
    return {
      status: "unavailable",
      reason: "invalid-project-identity",
    };
  }

  try {
    await access(storageRoot.projectMapRootPath);
    return {
      status: "ready",
      projectMapRootPath: storageRoot.projectMapRootPath,
      projectMetadataRootPath: storageRoot.projectMetadataRootPath,
    };
  } catch (error) {
    if (isMissingPathError(error)) {
      return {
        status: "missing",
        projectMapRootPath: storageRoot.projectMapRootPath,
        projectMetadataRootPath: storageRoot.projectMetadataRootPath,
      };
    }

    return {
      status: "unavailable",
      reason: "project-map-access-unavailable",
      projectMapRootPath: storageRoot.projectMapRootPath,
      projectMetadataRootPath: storageRoot.projectMetadataRootPath,
    };
  }
}

async function prepareProjectMapStorage(
  project: Awaited<ReturnType<typeof getServerProjectById>>,
): Promise<void> {
  const storageRoot = resolveProjectMapStorageRoot(project);

  if (storageRoot.status === "unavailable") {
    return;
  }

  await mkdir(storageRoot.projectMapRootPath, { recursive: true });
}

function buildProjectMapStateCopy(
  storageReadiness: ProjectMapStorageReadinessCopy | null,
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
    if (storageReadiness?.status === "ready") {
      return {
        title: "Miejsce na mapę projektu jest gotowe",
        description:
          "Folder Project Map już istnieje, ale canonical map.json jeszcze nie został utworzony. Widok pozostaje candidate/read-only.",
        details: [
          `Project Map root: ${mapReadResult.projectMapRootPath}`,
          `map.json: ${mapReadResult.mapJsonPath}`,
          "Current view: candidate/read-only",
          "Next step: Pokaż roboczą mapę.",
        ],
      };
    }

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
      title: "Nie udało się zbudować roboczej mapy projektu",
      description:
        "Pipeline nie zdołał zbudować roboczej mapy projektu z dostępnych danych, więc stan pozostaje jawny.",
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
    title: "Robocza mapa projektu gotowa",
    description:
      "Robocza mapa projektu została zbudowana z dostępnych danych. Pozostaje candidate/read-only i nie jest canonical map.json.",
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

function buildProjectMapOverviewCards(
  projectMapStateCopy: ProjectMapStateCopy,
  projectMapCandidateCopy: ProjectMapCandidateCopy | null,
  projectMapCanonicalVsCandidateCopy: ProjectMapCanonicalVsCandidateCopy | null,
  projectMapParkedIdeasCopy: ProjectMapParkedIdeasCopy | null,
): ProjectMapOverviewCardCopy[] {
  return [
    {
      label: "Done",
      title: "Current state",
      description:
        projectMapCanonicalVsCandidateCopy?.description ??
        "Canonical and candidate state is not available yet.",
      detail:
        projectMapCanonicalVsCandidateCopy?.details[0] ??
        "Current view: unavailable",
    },
    {
      label: "Next",
      title: "Candidate status",
      description:
        projectMapCandidateCopy?.description ??
        "No reviewable candidate could be built yet.",
      detail:
        projectMapCandidateCopy?.details[0] ??
        (projectMapStateCopy.title === "Kontekst projektu niedostÄ™pny"
          ? "No project context is available yet."
          : projectMapStateCopy.details[0]) ??
        "Candidate pipeline remains unavailable.",
    },
    {
      label: "Parked",
      title: "Parked context",
      description:
        projectMapParkedIdeasCopy?.description ??
        "Parked ideas remain visible as future context.",
      detail:
        projectMapParkedIdeasCopy?.details[0] ??
        "No parked or deferred items were found in the current candidate.",
    },
  ];
}

function buildProjectMapAvailabilityExplanationCopy(
  project: Awaited<ReturnType<typeof getServerProjectById>> | null,
  storageReadiness: ProjectMapStorageReadinessCopy | null,
  mapReadResult: ProjectMapReadResult | null,
  projectMapCandidateCopy: ProjectMapCandidateCopy | null,
): ProjectMapAvailabilityExplanationCopy | null {
  if (!project && !storageReadiness && !mapReadResult && !projectMapCandidateCopy) {
    return null;
  }

  const projectRepositoryUrl = project?.repositoryUrl?.trim() || null;
  const sourceIdentityRepositoryUrl =
    mapReadResult &&
    "projectSourceIdentity" in mapReadResult &&
    mapReadResult.projectSourceIdentity
      ? mapReadResult.projectSourceIdentity.repositoryUrl
      : null;
  const projectMapReady = storageReadiness?.status === "ready";
  const candidateResultAvailable =
    projectMapCandidateCopy?.title === "Robocza mapa projektu gotowa";

  const rows: ProjectMapAvailabilityExplanationRow[] = [
    {
      label: "Project Identity",
      status: project ? "działa" : "blocker",
      why: project
        ? `Rozpoznano projekt ${project.name}.`
        : "Brak poprawnego kontekstu projektu.",
      nextStep: project
        ? "Utrzymaj bieżący kontekst projektu i nie promuj niczego automatycznie."
        : "Wybierz poprawny projekt, zanim ocenisz dostępność sekcji.",
      source: project ? "projekt" : "missing",
    },
    {
      label: "SSOT",
      status: "planowane",
      why: "Źródło prawdy dla milestone'ów żyje w docs/SSOT, nie w tej stronie.",
      nextStep: "Trzymaj docs/04_ROADMAP.md, docs/08_CURRENT_STATE.md i docs/10_SESSION_STATE.md w zgodzie.",
      source: "SPS shell",
    },
    {
      label: "Project Bible",
      status: project ? "wymaga danych" : "blocker",
      why: "Kompas celu i zakresu nie jest jeszcze podłączony do tej warstwy widoku.",
      nextStep: "Dołącz źródło Project Bible zanim uznasz sekcję za gotową.",
      source: "missing",
    },
    {
      label: "Project Map",
      status: candidateResultAvailable
        ? "candidate"
        : projectMapReady
          ? "wymaga integracji"
          : "wymaga danych",
      why: candidateResultAvailable
        ? "Widok potrafi już pokazać kandydacką mapę w trybie candidate/read-only."
        : projectMapReady
          ? "Folder jest gotowy, ale widok nadal potrzebuje dalszej integracji, żeby dać użyteczny wynik."
          : "Brakuje gotowego folderu lub odczytu, więc mapa pozostaje niegotowa.",
      nextStep: candidateResultAvailable
        ? "Przejrzyj wynik kandydata i trzymaj canonical save osobno."
        : "Uzupełnij brakującą integrację albo przygotuj storage, zależnie od stanu projektu.",
      source: candidateResultAvailable ? "candidate" : "SPS shell",
    },
    {
      label: "Working Source",
      status: project?.workingDirectory ? "wymaga integracji" : "blocker",
      why: project?.workingDirectory
        ? `Working source wskazuje na ${project.workingDirectory}, ale wciąż wymaga wyjaśnienia względem innych źródeł projektu.`
        : "Brak rozpoznanego working source dla bieżącego projektu.",
      nextStep: project?.workingDirectory
        ? "Uzgodnij working source z resztą źródeł przed zaufaniem kandydatowi."
        : "Podłącz working source, zanim zaczniesz ufać kandydatowi.",
      source: project?.workingDirectory ? "projekt" : "missing",
    },
    {
      label: "First Layout",
      status: "działa",
      why: "Shell już pokazuje pierwszy układ overview-first i następny krok.",
      nextStep: "Zachowaj układ zwięzły i czytelny na desktopie.",
      source: "SPS shell",
    },
    {
      label: "First Working Flow",
      status: "planowane",
      why: projectMapCandidateCopy
        ? "Kandydacki przepływ już istnieje, ale pierwszy prawdziwy working flow pozostaje osobnym krokiem."
        : "Pierwszy prawdziwy working flow nie jest jeszcze gotowy do użycia.",
      nextStep: projectMapCandidateCopy
        ? "Zachowaj kandydacki wynik oddzielnie od przyszłego working flow."
        : "Zdefiniuj osobny krok working flow po ustabilizowaniu źródła.",
      source: projectMapCandidateCopy ? "candidate" : "missing",
    },
    {
      label: "Publication Path",
      status: "planowane",
      why: "Canonical save / publish pozostaje approval-bound i poza tym milestone'em.",
      nextStep: "Dodaj path publikacji dopiero po osobnej zgodzie Product Ownera.",
      source: "canonical",
    },
    {
      label: "Repository URL / Source Identity",
      status:
        projectRepositoryUrl && sourceIdentityRepositoryUrl
          ? projectRepositoryUrl === sourceIdentityRepositoryUrl
            ? "działa"
            : "blocker"
          : "blocker",
      why:
        projectRepositoryUrl && sourceIdentityRepositoryUrl
          ? projectRepositoryUrl === sourceIdentityRepositoryUrl
            ? "Repository URL jest połączony z source identity."
            : "Repository URL w source identity nie zgadza się z kontekstem projektu."
          : "Repository URL jest oczekiwany w BCP, ale Project Map source identity nadal pokazuje brak połączenia.",
      nextStep:
        "Podłącz repository URL do source identity, zanim zaufasz kandydatowi.",
      source: projectRepositoryUrl || sourceIdentityRepositoryUrl ? "projekt" : "missing",
    },
    {
      label: "Candidate result / evidence",
      status: candidateResultAvailable ? "candidate" : "wymaga danych",
      why: candidateResultAvailable
        ? `Kandydat zwraca ${projectMapCandidateCopy?.evidenceSummaries.length ?? 0} wpisów evidence i pozostaje read-only.`
        : "Brak czytelnego wyniku kandydata, więc nie ma jeszcze czego oceniać.",
      nextStep: candidateResultAvailable
        ? "Przejrzyj evidence i nie promuj wyniku bez approval-bound save."
        : "Uruchom candidate pipeline albo przygotuj dane wejściowe.",
      source: candidateResultAvailable ? "candidate" : "missing",
    },
  ];

  return {
    title: "Wyjaśnienie dostępności sekcji",
    description:
      "Każda sekcja pokazuje status, dlaczego jest taka, jaki jest następny krok i z jakiego źródła pochodzi.",
    rows,
  };
}

function buildProjectMapActionEntryCopy(
  projectId: string | null,
  mapReadResult: ProjectMapReadResult | null,
  projectMapCandidateCopy: ProjectMapCandidateCopy | null,
  storageReadiness: ProjectMapStorageReadinessCopy | null,
): ProjectMapActionEntryCopy | null {
  if (!projectId) {
    return null;
  }

  const storageIsReady = storageReadiness?.status === "ready";
  const readNotImplemented =
    !!mapReadResult &&
    mapReadResult.status === "unavailable" &&
    mapReadResult.reason === "project-map-present-but-read-not-implemented";

  if (!storageIsReady) {
    return {
      title: "Miejsce na mapę projektu nie jest jeszcze gotowe",
      description:
        "Przygotuj katalog Project Map w SPS OS, aby odczyt i odświeżanie kandydata miały własne miejsce bez tworzenia canonical map.json.",
      primaryActionLabel: "Przygotuj miejsce na mapę projektu",
      primaryActionHref: `/projects/${projectId}/project-map?prepareStorage=1`,
      secondaryActionLabel: projectMapCandidateCopy
        ? "Pokaż roboczą mapę"
        : "Pokaż roboczą mapę",
      secondaryActionHref: "#project-map-candidate",
      note: "Kanoniczny zapis pozostaje osobną, approval-bound akcją.",
    };
  }

  if (readNotImplemented) {
    return {
      title: "Miejsce na mapę projektu jest gotowe",
      description:
        "Folder Project Map już istnieje. Stwórz lub odśwież roboczą mapę projektu z dostępnych danych bez ruszania canonical map.json.",
      primaryActionLabel: "Stwórz roboczą mapę projektu",
      primaryActionHref: `/projects/${projectId}/project-map?refresh=1`,
      secondaryActionLabel: "Pokaż roboczą mapę",
      secondaryActionHref: "#project-map-candidate",
      note: "Kanoniczny zapis nadal wymaga osobnej zgody.",
    };
  }

  return {
    title: "Miejsce na mapę projektu jest gotowe",
    description:
      "Folder Project Map istnieje. Stwórz lub odśwież roboczą mapę projektu z dostępnych danych bez tworzenia canonical map.json.",
    primaryActionLabel: "Stwórz roboczą mapę projektu",
    primaryActionHref: `/projects/${projectId}/project-map?refresh=1#project-map-refresh-result`,
    secondaryActionLabel: "Pokaż roboczą mapę",
    secondaryActionHref: "#project-map-candidate",
    note: "Kanoniczny zapis nadal wymaga osobnej zgody.",
  };
}

function buildProjectMapRefreshFeedbackCopy(
  refreshRequested: boolean,
  mapReadResult: ProjectMapReadResult | null,
  candidate: ProjectMapReconstructionCandidateResult | null,
): ProjectMapRefreshFeedbackCopy | null {
  if (!refreshRequested) {
    return null;
  }

  const refreshedAt =
    mapReadResult &&
    "projectSourceIdentityPersistence" in mapReadResult &&
    mapReadResult.projectSourceIdentityPersistence.status === "persisted"
      ? mapReadResult.projectSourceIdentityPersistence.persistedAt
      : null;

  if (!candidate) {
    return {
      title: "Brak danych do zbudowania roboczej mapy",
      description:
        "Odświeżenie uruchomiło candidate pipeline, ale nie zwrócił on jeszcze użytecznego wyniku.",
      details: [
        "Candidate result: unavailable",
        `Ostatnio odświeżono: ${refreshedAt ?? "brak znacznika czasu"}`,
        "Canonical map.json nie został utworzony ani promowany.",
      ],
    };
  }

  if (candidate.status === "unavailable") {
    return {
      title: "Nie udało się zbudować roboczej mapy",
      description:
        "Odświeżenie uruchomiło pipeline, ale dostępne dane nie wystarczyły do zbudowania czytelnego wyniku candidate.",
      details: [
        `Candidate result: unavailable (${candidate.reason})`,
        `Project ID: ${candidate.projectId ?? "missing"}`,
        `Project name: ${candidate.projectName ?? "missing"}`,
        `Ostatnio odświeżono: ${refreshedAt ?? "brak znacznika czasu"}`,
      ],
    };
  }

  return {
    title: "Robocza mapa projektu została zbudowana",
    description:
      "Candidate pipeline zwrócił widoczny wynik candidate/read-only bez promowania go do canonical map.json.",
    details: [
      `Candidate result: available`,
      `Evidence count: ${candidate.evidence.length}`,
      `Foundation areas: ${candidate.foundationChecklist.length}`,
      `Ostatnio odświeżono: ${refreshedAt ?? "brak znacznika czasu"}`,
      "Canonical map.json pozostaje poza zakresem tego kroku.",
    ],
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
          ? "candidate/read-only"
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
  storageReadiness: ProjectMapStorageReadinessCopy | null,
  mapReadResult: ProjectMapReadResult | null,
): FoundationStatus[] {
  const projectIdentityStatus = projectName ? "dostępny" : "niedostępny";
  const projectMapStatus =
    !mapReadResult || mapReadResult.status === "missing"
      ? storageReadiness?.status === "ready"
        ? "gotowe / bez map.json"
        : "brak / niegotowe"
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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ prepareStorage?: string; refresh?: string }>;
}) {
  const { id } = await params;
  const project = await getServerProjectById(id);
  const { prepareStorage, refresh } = await (
    searchParams ??
    Promise.resolve({} as { prepareStorage?: string; refresh?: string })
  );

  if (project && prepareStorage === "1") {
    await prepareProjectMapStorage(project);
  }

  const mapReadResult = project
    ? await resolveProjectMapReadResult(project)
    : null;
  const mapCandidate = await loadProjectMapCandidate(project);
  const projectMapStorageReadiness = await resolveProjectMapStorageReadiness(
    project,
  );
  const foundationStatuses = buildFoundationStatuses(
    project?.name ?? null,
    projectMapStorageReadiness,
    mapReadResult,
  );
  const projectMapStateCopy = buildProjectMapStateCopy(
    projectMapStorageReadiness,
    mapReadResult,
  );
  const projectMapCandidateCopy = buildProjectMapCandidateCopy(mapCandidate);
  const projectMapActionEntryCopy = buildProjectMapActionEntryCopy(
    project?.id ?? null,
    mapReadResult,
    projectMapCandidateCopy,
    projectMapStorageReadiness,
  );
  const projectMapAvailabilityExplanationCopy =
    buildProjectMapAvailabilityExplanationCopy(
      project ?? null,
      projectMapStorageReadiness,
      mapReadResult,
      projectMapCandidateCopy,
    );
  const projectMapCanonicalVsCandidateCopy =
    buildProjectMapCanonicalVsCandidateCopy(mapReadResult, mapCandidate);
  const projectMapParkedIdeasCopy = buildProjectMapParkedIdeasCopy(mapCandidate);
  const projectMapMilestoneEvidenceDrilldownCopy =
    buildProjectMapMilestoneEvidenceDrilldownCopy(projectMapCandidateCopy);
  const projectMapOverviewCards = buildProjectMapOverviewCards(
    projectMapStateCopy,
    projectMapCandidateCopy,
    projectMapCanonicalVsCandidateCopy,
    projectMapParkedIdeasCopy,
  );
  const projectMapRefreshFeedbackCopy = buildProjectMapRefreshFeedbackCopy(
    refresh === "1",
    mapReadResult,
    mapCandidate,
  );

  return (
    <SectionCard className="space-y-6">
      <div className="space-y-2 border-b border-zinc-800 pb-4 sm:space-y-4 sm:pb-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Mapa projektu
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Shell przyszłej Mapy projektu
          </h2>
          <p className="hidden text-sm text-zinc-400 sm:block">
            To jest kandydacki shell przyszłej Mapy projektu. Nie promuje mapy do
            stanu kanonicznego, nie zapisuje niczego i nie uruchamia silnika mapy.
          </p>
        </div>

      </div>

      {projectMapActionEntryCopy ? (
        <section
          id="project-map-action-entry"
          className="rounded-xl border border-sky-900/50 bg-sky-950/20 p-4"
        >
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">
                Następny krok
              </p>
              <h3 className="text-xl font-semibold text-sky-50">
                {projectMapActionEntryCopy.title}
              </h3>
              <p className="text-sm text-sky-100/80">
                {projectMapActionEntryCopy.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={projectMapActionEntryCopy.primaryActionHref}
                className="inline-flex items-center justify-center rounded-full border border-sky-500 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-50 transition-colors hover:border-sky-400 hover:bg-sky-500/20"
              >
                {projectMapActionEntryCopy.primaryActionLabel}
              </a>
              <a
                href={projectMapActionEntryCopy.secondaryActionHref}
                className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
              >
                {projectMapActionEntryCopy.secondaryActionLabel}
              </a>
            </div>

            <p className="text-xs text-sky-100/70">
              {projectMapActionEntryCopy.note}
            </p>
          </div>
        </section>
      ) : null}

      {projectMapRefreshFeedbackCopy ? (
        <section
          id="project-map-refresh-result"
          className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4"
          aria-live="polite"
        >
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                Wynik odświeżenia
              </p>
              <h3 className="text-xl font-semibold text-emerald-50">
                {projectMapRefreshFeedbackCopy.title}
              </h3>
              <p className="text-sm text-emerald-100/80">
                {projectMapRefreshFeedbackCopy.description}
              </p>
            </div>

            <ul className="space-y-2 text-sm text-emerald-50/90">
              {projectMapRefreshFeedbackCopy.details.map((detail) => (
                <li
                  key={detail}
                  className="rounded-lg border border-emerald-900/60 bg-emerald-950/40 px-3 py-2"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <div className="hidden rounded-xl border border-amber-900/50 bg-amber-950/20 p-4 sm:block">
        <p className="text-sm text-amber-100">
          To jest widok kandydacki, nie kanoniczna Mapa projektu. Akcje zapisu,
          promowania i accept/write pozostają poza zakresem.
        </p>
      </div>

      <div className="hidden rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 sm:block">
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

      <div className="grid gap-3 md:grid-cols-3">
        {projectMapOverviewCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {card.label}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-50">{card.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{card.description}</p>
            <p className="mt-3 text-sm text-zinc-200">{card.detail}</p>
          </div>
        ))}
      </div>

      {projectMapAvailabilityExplanationCopy ? (
        <section className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {projectMapAvailabilityExplanationCopy.title}
            </p>
            <h3 className="text-xl font-semibold text-zinc-50">
              Co działa, co czeka i co blokuje
            </h3>
            <p className="text-sm text-zinc-400">
              {projectMapAvailabilityExplanationCopy.description}
            </p>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {projectMapAvailabilityExplanationCopy.rows.map((row) => (
              <article
                key={row.label}
                className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-50">
                      {row.label}
                    </p>
                    <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs uppercase tracking-[0.18em] text-zinc-300">
                      Status: {row.status}
                    </span>
                    <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs uppercase tracking-[0.18em] text-zinc-300">
                      Źródło: {row.source}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    <span className="font-medium text-zinc-100">Dlaczego:</span>{" "}
                    {row.why}
                  </p>
                  <p className="text-sm text-zinc-300">
                    <span className="font-medium text-zinc-100">
                      Następny krok:
                    </span>{" "}
                    {row.nextStep}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {projectMapCanonicalVsCandidateCopy ? (
        <details
          id="project-map-candidate"
          className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4"
        >
          <summary className="cursor-pointer list-none text-sm uppercase tracking-[0.2em] text-emerald-200/70">
            Canonical vs candidate state
          </summary>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-emerald-50">
              Canonical state details
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
        </details>
      ) : null}

      {projectMapParkedIdeasCopy ? (
        <details className="rounded-xl border border-lime-900/50 bg-lime-950/20 p-4">
          <summary className="cursor-pointer list-none text-sm uppercase tracking-[0.2em] text-lime-200/70">
            Parked ideas visibility
          </summary>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-lime-50">
              Parked ideas details
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
        </details>
      ) : null}

      {projectMapMilestoneEvidenceDrilldownCopy ? (
        <details className="space-y-3 rounded-xl border border-cyan-900/50 bg-cyan-950/20 p-4">
          <summary className="cursor-pointer list-none text-sm uppercase tracking-[0.2em] text-cyan-200/70">
            Milestone evidence drilldown
          </summary>
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-cyan-50">
                Milestone evidence details
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
        </details>
      ) : null}

      <div
        id="project-map-state"
        className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
      >
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
        <details className="space-y-3 rounded-xl border border-sky-900/50 bg-sky-950/20 p-4">
          <summary className="cursor-pointer list-none text-sm uppercase tracking-[0.2em] text-sky-200/70">
            Candidate pipeline
          </summary>
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-sky-50">
                Candidate pipeline details
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
        </details>
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
