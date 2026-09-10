import { access, mkdir } from "node:fs/promises";

import Link from "next/link";

import { SectionCard } from "@/components/ui/SectionCard";
import { resolveProjectMapStorageRoot } from "@/lib/project-brain/metadata";
import { getServerProjectById } from "@/lib/project/server";
import { buildRepoCheckoutDirectory } from "@/lib/project/source-status";
import { classifyProjectMapEvidence } from "@/lib/project-map/classify";
import {
  buildProjectMapCandidateStructure,
  buildProjectMapReconstructionCandidate,
  enrichProjectMapReconstructionCandidateWithSourceIdentity,
} from "@/lib/project-map/reconstruct";
import { scanProjectMapEvidence } from "@/lib/project-map/scan";
import {
  evaluateProjectMapCanonicalWritePreflight,
  type ProjectMapCanonicalWritePreflightEvaluation,
  type ProjectMapCanonicalWritePreflightStatus,
} from "@/lib/project-map/canonical-write-preflight";
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

type ProjectMapCanonicalWriteReadinessCopy = {
  title: string;
  description: string;
  details: string[];
};

type ProjectMapCanonicalWritePreviewCopy = {
  title: string;
  status: ProjectMapCanonicalWritePreflightStatus;
  description: string;
  details: string[];
  actionGate: ProjectMapCanonicalWriteActionGateCopy;
  handoffPreview: ProjectMapCanonicalWriteHandoffPreviewCopy;
};

type ProjectMapCanonicalWriteActionGateCopy = {
  title: string;
  actionState: string;
  controlLabel: string;
  description: string;
  detail: string;
  approvalCaptureLabel: string;
  approvalCaptureStatus: string;
  approvalCaptureDisabled: boolean;
};

type ProjectMapCanonicalWriteHandoffPreviewCopy = {
  title: string;
  description: string;
  details: string[];
};

const projectMapReviewDecisionOptions = [
  {
    id: "accept",
    label: "Akceptuję kierunek",
    confirmation: "Decyzja robocza: Akceptuję kierunek",
  },
  {
    id: "braki",
    label: "Widzę braki",
    confirmation: "Decyzja robocza: Widzę braki",
  },
  {
    id: "odkladam",
    label: "Odkładam",
    confirmation: "Decyzja robocza: Odkładam",
  },
] as const;

const projectMapNextStepOptions = [
  {
    id: "uzupelnij",
    label: "Uzupełnij braki",
    confirmation: "Następny krok: Uzupełnij braki",
  },
  {
    id: "przygotuj",
    label: "Przygotuj akceptację kierunku",
    confirmation: "Następny krok: Przygotuj akceptację kierunku",
  },
  {
    id: "odloz",
    label: "Odłóż mapę",
    confirmation: "Następny krok: Odłóż mapę",
  },
] as const;

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

type ProjectMapMissingInputCopy = {
  label: string;
  detail?: string;
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
  candidateAvailable: boolean,
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
        title: candidateAvailable
          ? "Robocza mapa projektu jest gotowa"
          : "Miejsce na mapę projektu jest gotowe",
        description:
          candidateAvailable
            ? "Folder Project Map istnieje, robocza mapa kandydata w trybie read-only jest widoczna, a canonical map.json nadal nie został utworzony."
            : "Folder Project Map już istnieje, ale canonical map.json jeszcze nie został utworzony. Widok pozostaje kandydatem read-only.",
        details: [
          `Project Map root: ${mapReadResult.projectMapRootPath}`,
          `map.json: ${mapReadResult.mapJsonPath}`,
          "Widok teraz: kandydat read-only",
          candidateAvailable
            ? "Następny krok: przejrzyj kandydata i trzymaj zapis kanoniczny osobno."
            : "Następny krok: pokaż roboczą mapę.",
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
        `Powód: ${candidate.reason}`,
        `Projekt: ${candidate.projectName ?? "missing"}`,
        `Źródło projektu: ${candidate.sourcePath ?? "missing"}`,
        "Źródło stanu pozostaje kandydatem read-only.",
      ],
      foundationChecklist: [],
      evidenceSummaries: [],
    };
  }

  return {
    title: "Robocza mapa projektu gotowa",
    description:
      "Robocza mapa projektu została zbudowana z dostępnych danych. Pozostaje kandydatem read-only i nie jest canonical map.json.",
    details: [
      "Źródło stanu: repo + SSOT + evidence kandydata.",
      "Główny widok pokazuje gotowe elementy, review, blokady i następne kroki.",
      "Evidence i provenance pozostają w szczegółach, a zapis kanoniczny jest osobny.",
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
      label: "Gotowe",
      title: "Aktualny stan",
      description:
        projectMapCanonicalVsCandidateCopy?.description ??
        "Stan kanoniczny i kandydat nie są jeszcze dostępne.",
      detail:
        projectMapCanonicalVsCandidateCopy?.details[0] ??
        "Widok teraz: niedostępny",
    },
    {
      label: "Następne",
      title: "Status kandydata",
      description:
        projectMapCandidateCopy?.description ??
        "Nie udało się jeszcze zbudować kandydata do review.",
      detail:
        projectMapCandidateCopy?.details[0] ??
        (projectMapStateCopy.title === "Kontekst projektu niedostÄ™pny"
          ? "Brak dostępnego kontekstu projektu."
          : projectMapStateCopy.details[0]) ??
        "Pipeline kandydata pozostaje niedostępny.",
    },
    {
      label: "Odłożone",
      title: "Kontekst odłożony",
      description:
        projectMapParkedIdeasCopy?.description ??
        "Odłożone pomysły pozostają widoczne jako przyszły kontekst.",
      detail:
        projectMapParkedIdeasCopy?.details[0] ??
        "Nie znaleziono odłożonych elementów w bieżącym kandydacie.",
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
  const ssotDocsFound =
    projectMapCandidateCopy?.foundationChecklist.find(
      (item) => item.foundationArea === "SSOT" && item.evidence.length > 0,
    ) !== undefined;
  const sourceIdentityReady =
    !!projectRepositoryUrl &&
    !!sourceIdentityRepositoryUrl &&
    projectRepositoryUrl === sourceIdentityRepositoryUrl &&
    mapReadResult &&
    "projectSourceIdentityPersistence" in mapReadResult &&
    mapReadResult.projectSourceIdentityPersistence?.status === "persisted";

  const rows: ProjectMapAvailabilityExplanationRow[] = [
    {
      label: "Tożsamość projektu",
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
      status: ssotDocsFound ? "candidate" : "planowane",
      why: ssotDocsFound
        ? "Znaleziono dokumenty SSOT, które mogą wspierać roboczą mapę."
        : "Źródło prawdy dla milestone'ów żyje w docs/SSOT, nie w tej stronie.",
      nextStep: ssotDocsFound
        ? "Przejrzyj sekcje mapy wynikające z SSOT przed jakimkolwiek zapisem kanonicznym."
        : "Trzymaj docs/04_ROADMAP.md, docs/08_CURRENT_STATE.md i docs/10_SESSION_STATE.md w zgodzie.",
      source: ssotDocsFound ? "candidate" : "SPS shell",
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
        ? "Widok pokazuje roboczą mapę kandydata w trybie read-only, a canonical map.json nadal pozostaje osobnym krokiem."
        : projectMapReady
          ? "Folder jest gotowy, ale widok nadal potrzebuje dalszej integracji, żeby dać użyteczny wynik."
          : "Brakuje gotowego folderu lub odczytu, więc mapa pozostaje niegotowa.",
      nextStep: candidateResultAvailable
        ? "Przejrzyj wynik kandydata i trzymaj zapis kanoniczny osobno."
        : "Uzupełnij brakującą integrację albo przygotuj storage, zależnie od stanu projektu.",
      source: candidateResultAvailable ? "candidate" : "SPS shell",
    },
    {
      label: "Źródło robocze",
      status: project?.workingDirectory ? "wymaga integracji" : "blocker",
      why: project?.workingDirectory
        ? `Źródło robocze wskazuje na ${project.workingDirectory}, ale wciąż wymaga wyjaśnienia względem innych źródeł projektu.`
        : "Brak rozpoznanego źródła roboczego dla bieżącego projektu.",
      nextStep: project?.workingDirectory
        ? "Uzgodnij źródło robocze z resztą źródeł przed zaufaniem kandydatowi."
        : "Podłącz źródło robocze, zanim zaczniesz ufać kandydatowi.",
      source: project?.workingDirectory ? "projekt" : "missing",
    },
    {
      label: "Pierwszy layout",
      status: "działa",
      why: "Shell z podsumowaniem na początku już działa, ale to nadal osobna warstwa od evidence layoutu BCP.",
      nextStep: "Traktuj layout shella jako niezależny od evidence projektu, dopóki nie masz źródła layoutu BCP.",
      source: "SPS shell",
    },
    {
      label: "Pierwszy działający przepływ",
      status: "planowane",
      why: projectMapCandidateCopy
        ? "Przepływ kandydata już istnieje, ale pierwszy prawdziwy przepływ roboczy pozostaje osobnym krokiem."
        : "Pierwszy prawdziwy przepływ roboczy nie jest jeszcze gotowy do użycia.",
      nextStep: projectMapCandidateCopy
        ? "Zachowaj wynik kandydata oddzielnie od przyszłego przepływu roboczego."
        : "Zdefiniuj osobny krok przepływu roboczego po ustabilizowaniu źródła.",
      source: projectMapCandidateCopy ? "candidate" : "missing",
    },
    {
      label: "Ścieżka publikacji",
      status: "planowane",
      why: "Zapis kanoniczny / publikacja pozostaje związana z osobną zgodą i poza tym milestone'em.",
      nextStep: "Dodaj path publikacji dopiero po osobnej zgodzie Product Ownera.",
      source: "canonical",
    },
    {
      label: "Adres repozytorium / tożsamość źródła",
      status:
        sourceIdentityReady
          ? "działa"
          : projectRepositoryUrl && sourceIdentityRepositoryUrl
            ? projectRepositoryUrl === sourceIdentityRepositoryUrl
              ? "wymaga integracji"
              : "blocker"
            : "blocker",
      why:
        sourceIdentityReady
          ? "Adres repozytorium jest połączony z tożsamością źródła i utrwalony w SPS metadata root."
          : projectRepositoryUrl && sourceIdentityRepositoryUrl
            ? projectRepositoryUrl === sourceIdentityRepositoryUrl
              ? "Adres repozytorium jest połączony, ale utrwalenie tożsamości źródła nie jest jeszcze potwierdzone."
              : "Adres repozytorium w tożsamości źródła nie zgadza się z kontekstem projektu."
            : "Adres repozytorium jest oczekiwany w BCP, ale tożsamość źródła Project Map nadal pokazuje brak połączenia.",
      nextStep: sourceIdentityReady
        ? "Przejrzyj sekcje mapy wynikające z SSOT przed jakimkolwiek zapisem kanonicznym."
        : projectRepositoryUrl && sourceIdentityRepositoryUrl
          ? projectRepositoryUrl === sourceIdentityRepositoryUrl
            ? "Utrwal tożsamość źródła przed zaufaniem kandydatowi."
            : "Uzgodnij repositoryUrl z rekordem projektu BCP, potem oceń tożsamość źródła ponownie."
          : "Podłącz adres repozytorium do tożsamości źródła, zanim zaufasz kandydatowi.",
      source: sourceIdentityReady
        ? "candidate"
        : projectRepositoryUrl || sourceIdentityRepositoryUrl
          ? "projekt"
          : "missing",
    },
    {
      label: "Wynik kandydata / evidence",
      status: candidateResultAvailable ? "candidate" : "wymaga danych",
      why: candidateResultAvailable
        ? `Kandydat zwraca ${projectMapCandidateCopy?.evidenceSummaries.length ?? 0} wpisów evidence i pozostaje read-only.`
        : "Brak czytelnego wyniku kandydata, więc nie ma jeszcze czego oceniać.",
      nextStep: candidateResultAvailable
        ? "Przejrzyj evidence i nie promuj wyniku bez osobno zatwierdzonego zapisu."
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
      note: "Kanoniczny zapis pozostaje osobną akcją wymagającą zgody.",
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

function buildProjectMapCanonicalWriteReadinessCopy(
  storageReadiness: ProjectMapStorageReadinessCopy | null,
  mapReadResult: ProjectMapReadResult | null,
  mapCandidate: ProjectMapReconstructionCandidateResult | null,
  projectMapCandidateCopy: ProjectMapCandidateCopy | null,
): ProjectMapCanonicalWriteReadinessCopy | null {
  if (
    !storageReadiness &&
    !mapReadResult &&
    !mapCandidate &&
    !projectMapCandidateCopy
  ) {
    return null;
  }

  const candidateAvailable = mapCandidate?.status === "available";
  const projectMapRootPath =
    mapReadResult?.projectMapRootPath ?? storageReadiness?.projectMapRootPath ?? null;
  const canonicalMapJsonPath =
    mapReadResult?.mapJsonPath ??
    (projectMapRootPath ? `${projectMapRootPath}\\map.json` : null);
  const blockingAreas =
    projectMapCandidateCopy?.foundationChecklist.filter(
      (item) => item.status !== "completed",
    ) ?? [];
  const blockingDetails = candidateAvailable
    ? blockingAreas.length > 0
      ? blockingAreas
          .slice(0, 3)
          .map(
            (item) =>
              `Blokada: ${buildProjectMapVisibleTokenLabel(item.foundationArea)} - ${buildProjectMapCandidateFoundationDescription(item)}`,
          )
      : ["Blokady: brak otwartych blokad; zapis nadal pozostaje osobnym krokiem."]
    : [
        `Blokada: ${projectMapCandidateCopy?.details[0] ?? "Brak gotowego kandydata do przeniesienia."}`,
      ];

  return {
    title: "Gotowość do zapisu kanonicznego",
    description:
      "To tylko kontrola gotowości: pokazuje, czy robocza mapa istnieje, gdzie później trafi canonical map.json i co jeszcze blokuje zapis. Sam zapis nie jest dostępny w tym milestone.",
    details: [
      `Robocza mapa: ${candidateAvailable ? "obecna" : "brak gotowego kandydata"}`,
      `Docelowy zapis: ${canonicalMapJsonPath ?? "Project Map root (ścieżka jeszcze niepotwierdzona)"}`,
      `Do zapisania później: ${candidateAvailable ? "zatwierdzona robocza mapa projektu w trybie read-only" : "najpierw trzeba zbudować kandydata read-only"}`,
      ...blockingDetails,
      "Ten krok nie udostępnia create/write dla canonical map.json.",
    ],
  };
}

function buildProjectMapCanonicalWritePreviewCopy(
  storageReadiness: ProjectMapStorageReadinessCopy | null,
  mapReadResult: ProjectMapReadResult | null,
  mapCandidate: ProjectMapReconstructionCandidateResult | null,
): ProjectMapCanonicalWritePreviewCopy {
  const candidateAvailable = mapCandidate?.status === "available";
  const projectMapRootPath =
    mapReadResult?.projectMapRootPath ?? storageReadiness?.projectMapRootPath ?? null;
  const canonicalMapJsonPath =
    mapReadResult?.mapJsonPath ??
    (projectMapRootPath ? `${projectMapRootPath}\\map.json` : null);
  const sourceIdentityAvailable = Boolean(mapReadResult?.projectSourceIdentity);
  const canonicalState =
    mapReadResult?.status === "missing"
      ? "absent / brak kanonicznego pliku"
      : mapReadResult?.status === "unavailable" &&
          mapReadResult.reason === "project-map-present-but-read-not-implemented"
        ? "present / odczyt kanoniczny nie jest jeszcze zaimplementowany"
        : "UNKNOWN";
  const preflightEvaluation = evaluateProjectMapCanonicalWritePreflight({
    candidate: mapCandidate,
    projectMapRootPath,
    mapJsonPath: canonicalMapJsonPath,
    sourceIdentityAvailable,
    sourceIdentityPersistenceStatus:
      mapReadResult?.projectSourceIdentityPersistence?.status ?? null,
  });
  const actionGate = buildProjectMapCanonicalWriteActionGateCopy(
    preflightEvaluation,
  );
  const topBlockerOrReason =
    preflightEvaluation.blockers[0] ??
    preflightEvaluation.reasons[0] ??
    "none";
  const localApprovalCaptureState = actionGate.approvalCaptureDisabled
    ? `unavailable / ${actionGate.actionState}`
    : "dostępne lokalnie / tylko planowanie / nie zapisuje decyzji";

  return {
    title: "Preview status zapisu kanonicznego",
    status: preflightEvaluation.status,
    description:
      "Read-only preview pokazuje, co można planować przed przyszłym zapisem. Nie uruchamia writerów i nie tworzy map.json.",
    details: [
      `Status preview: ${preflightEvaluation.status}`,
      `Co byłoby zapisane później: ${candidateAvailable ? "reviewed Project Map candidate po osobnej zgodzie Product Ownera" : "UNKNOWN - brak gotowego kandydata"}`,
      `Gdzie byłoby zapisane później: ${canonicalMapJsonPath ?? "UNKNOWN - brak znanej ścieżki"}`,
      `map.json teraz: ${canonicalState}`,
      `Evidence risks: ${preflightEvaluation.evidenceRiskCount ?? "UNKNOWN"}`,
      `Preflight reasons: ${preflightEvaluation.reasons.join(" | ")}`,
      `Preflight blockers: ${preflightEvaluation.blockers.length > 0 ? preflightEvaluation.blockers.join(" | ") : "none"}`,
      "Dlaczego nie zapisuje teraz: MS-031.25 jest tylko preview/status i nie wykonuje canonical write.",
      "Planowanie przyszłego zapisu wymaga PASS preflight i osobnej zgody Product Ownera.",
      "Ten milestone nie zapisuje, nie tworzy i nie promuje map.json.",
    ],
    actionGate,
    handoffPreview: {
      title: "Preview handoffu dla przyszłego milestone wykonawczego",
      description:
        "Copy-ready preview dla Codexa opisuje tylko warunki przyszłego wykonania; nie uruchamia API, writerów ani zapisu plików.",
      details: [
        `Status gotowości: ${preflightEvaluation.status}`,
        `Lokalne potwierdzenie: ${localApprovalCaptureState}`,
        `Główna blokada / powód: ${buildProjectMapCanonicalWriteReasonLabel(topBlockerOrReason)}`,
        "Brak zgody na zapis teraz: nie wolno teraz tworzyć, zapisywać, nadpisywać ani promować map.json.",
        "Przyszłe wykonanie wymaga osobnego zatwierdzonego milestone wykonawczego.",
      ],
    },
  };
}

function buildProjectMapCanonicalWriteActionGateCopy(
  evaluation: ProjectMapCanonicalWritePreflightEvaluation,
): ProjectMapCanonicalWriteActionGateCopy {
  if (evaluation.status === "READY_FOR_FUTURE_WRITE") {
    return {
      title: "Bramka akcji zapisu kanonicznego",
      actionState: "ready for future approval",
      controlLabel: "Gotowe do osobnej zgody Product Ownera",
      description:
        "Status gotowości pozwala planować dalej, ale wykonanie zapisu wymaga osobnego zatwierdzonego milestone wykonawczego.",
      detail:
        "MS-031.29 pokazuje tylko komunikat approval capture; nie zapisuje, nie tworzy i nie promuje map.json.",
      approvalCaptureLabel:
        "Rozumiem: to tylko lokalne potwierdzenie gotowości, bez zapisu map.json.",
      approvalCaptureStatus:
        "Lokalna intencja Product Ownera jest tylko do planowania, nie jest utrwalona i nie zastępuje osobnego przyszłego milestone wykonawczego.",
      approvalCaptureDisabled: false,
    };
  }

  if (evaluation.status === "REJECTED") {
    return {
      title: "Bramka akcji zapisu kanonicznego",
      actionState: "rejected",
      controlLabel: "Akcja odrzucona",
      description:
        "Przyszły zapis kanoniczny jest odrzucony przez jawny stan review i nie może być uruchomiony.",
      detail:
        buildProjectMapCanonicalWriteReasonLabel(
          evaluation.blockers[0] ??
            "MS-031.27 nie wykonuje zapisu map.json przy stanie rejected.",
        ),
      approvalCaptureLabel:
        "Lokalne potwierdzenie niedostępne: stan rejected blokuje planowanie zapisu.",
      approvalCaptureStatus:
        "Lokalne potwierdzenie nie omija stanu rejected, nie jest utrwalone, nie uruchamia milestone wykonawczego i nie zapisuje map.json.",
      approvalCaptureDisabled: true,
    };
  }

  if (evaluation.status === "NEEDS_EVIDENCE") {
    return {
      title: "Bramka akcji zapisu kanonicznego",
      actionState: "needs evidence",
      controlLabel: "Akcja niedostępna - potrzeba evidence",
      description:
        "Przyszły zapis kanoniczny wymaga uzupełnienia lub rozstrzygnięcia evidence przed osobną zgodą.",
      detail:
        buildProjectMapCanonicalWriteReasonLabel(
          evaluation.reasons[0] ??
            "MS-031.27 nie wykonuje zapisu map.json przy stanie potrzeba evidence.",
        ),
      approvalCaptureLabel:
        "Lokalne potwierdzenie niewystarczające: najpierw potrzeba evidence.",
      approvalCaptureStatus:
        "Lokalne potwierdzenie nie omija braków evidence, nie jest utrwalone, nie uruchamia milestone wykonawczego i nie zapisuje map.json.",
      approvalCaptureDisabled: true,
    };
  }

  if (evaluation.status === "UNKNOWN") {
    return {
      title: "Bramka akcji zapisu kanonicznego",
      actionState: "unknown",
      controlLabel: "Akcja niedostępna - stan nieznany",
      description:
        "Przyszły zapis kanoniczny nie może być planowany, bo brakuje wymaganych faktów preflight.",
      detail:
        buildProjectMapCanonicalWriteReasonLabel(
          evaluation.blockers[0] ??
            evaluation.reasons[0] ??
            "MS-031.27 nie wykonuje zapisu map.json przy stanie unknown.",
        ),
      approvalCaptureLabel:
        "Lokalne potwierdzenie niedostępne: stan unknown wymaga ustalenia faktów.",
      approvalCaptureStatus:
        "Lokalne potwierdzenie nie omija nieznanych blokad, nie jest utrwalone, nie uruchamia milestone wykonawczego i nie zapisuje map.json.",
      approvalCaptureDisabled: true,
    };
  }

  return {
    title: "Bramka akcji zapisu kanonicznego",
    actionState: "blocked",
    controlLabel: "Akcja niedostępna - blokada",
    description:
      "Przyszły zapis kanoniczny jest zablokowany do czasu usunięcia blokady i osobnej zgody Product Ownera.",
    detail:
    buildProjectMapCanonicalWriteReasonLabel(
      evaluation.blockers[0] ??
        evaluation.reasons[0] ??
        "MS-031.27 nie wykonuje zapisu map.json przy stanie blocked.",
    ),
    approvalCaptureLabel:
      "Lokalne potwierdzenie niedostępne: blocked wymaga usunięcia blokady.",
    approvalCaptureStatus:
      "Lokalne potwierdzenie nie omija blokad, nie jest utrwalone, nie uruchamia milestone wykonawczego i nie zapisuje map.json.",
    approvalCaptureDisabled: true,
  };
}

function buildProjectMapCanonicalWriteReasonLabel(reason: string): string {
  if (reason === "none") {
    return "brak";
  }

  if (
    reason.includes(
      "Candidate contains missing, weak, inferred, conflicting, blocked, absent, unknown, or needs-review evidence.",
    )
  ) {
    return "Kandydat ma braki, słabe dowody, wnioski lub konflikty evidence.";
  }

  if (reason.includes("SPS OS Project Map storage target is unknown.")) {
    return "Nieznana ścieżka docelowa Project Map w SPS OS.";
  }

  if (reason.includes("No reviewed Project Map candidate is available.")) {
    return "Brak sprawdzonego kandydata Project Map.";
  }

  return reason;
}

function buildProjectMapVisibleTokenLabel(value: string): string {
  const labels: Record<string, string> = {
    "Project Identity": "Tożsamość projektu",
    "Project Map": "Mapa projektu",
    "Working Source": "Źródło robocze",
    "First Layout": "Pierwszy layout",
    "First Working Flow": "Pierwszy działający przepływ",
    "Publication Path": "Ścieżka publikacji",
    candidate: "kandydat",
    canonical: "kanoniczne",
    missing: "brak",
    available: "dostępny",
    unavailable: "niedostępny",
    blocker: "blokada",
    blocked: "blokada",
    parked: "odłożone",
    "needs evidence": "potrzeba evidence",
    "needs review": "wymaga review",
    "candidate-read-only": "kandydat read-only",
    "candidate/read-only": "kandydat read-only",
    "ready for future approval": "gotowe do przyszłej zgody",
    persisted: "utrwalone",
    aligned: "zgodne",
  };

  if (labels[value]) {
    return labels[value];
  }

  return Object.entries(labels).reduce(
    (label, [source, replacement]) => label.replaceAll(source, replacement),
    value,
  );
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
        "Wynik kandydata: unavailable",
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
        `Wynik kandydata: unavailable (${candidate.reason})`,
        `ID projektu: ${candidate.projectId ?? "missing"}`,
        `Nazwa projektu: ${candidate.projectName ?? "missing"}`,
        `Ostatnio odświeżono: ${refreshedAt ?? "brak znacznika czasu"}`,
      ],
    };
  }

  return {
    title: "Robocza mapa projektu została zbudowana",
    description:
      "Pipeline kandydata zwrócił widoczny wynik w trybie read-only bez promowania go do canonical map.json.",
    details: [
      `Wynik kandydata: available`,
      `Liczba evidence: ${candidate.evidence.length}`,
      `Obszary foundation: ${candidate.foundationChecklist.length}`,
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
          ? "kandydat read-only"
          : "missing";

  const details = [
    `Widok teraz: ${buildProjectMapVisibleTokenLabel(viewMode)}`,
    `Kanoniczna Mapa projektu: ${buildProjectMapVisibleTokenLabel(canonicalStatus)}`,
    `Kandydat rekonstrukcji: ${buildProjectMapVisibleTokenLabel(candidateStatus)}`,
    "Dane kandydata nie są kanoniczne bez jawnego zapisu przez zatwierdzoną granicę.",
  ];

  if (
    mapReadResult &&
    "projectSourceIdentityPersistence" in mapReadResult &&
    mapReadResult.projectSourceIdentityPersistence
  ) {
    details.push(
      `Utrwalenie tożsamości źródła: ${buildProjectMapVisibleTokenLabel(mapReadResult.projectSourceIdentityPersistence.status)}`,
    );
  }

  if (
    mapReadResult &&
    "projectSourceIdentity" in mapReadResult &&
    mapReadResult.projectSourceIdentity
  ) {
    details.push(
      `Adres repozytorium: ${mapReadResult.projectSourceIdentity.repositoryUrl ?? "missing"}`,
    );
    details.push(
      `Źródło robocze: ${mapReadResult.projectSourceIdentity.workingDirectory ?? "missing"}`,
    );
    details.push(
      `Ścieżka checkout: ${mapReadResult.projectSourceIdentity.projectCheckoutPath ?? "missing"}`,
    );
    details.push(
      `Kanoniczny katalog storage: ${mapReadResult.projectMapRootPath ?? "missing"}`,
    );
  }

  return {
    title: "Stan kanoniczny vs kandydat",
    description:
      "To podsumowanie oddziela stan kanoniczny Project Map od kandydata rekonstrukcji i jasno pokazuje bieżący widok.",
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
    return null;
  }

  return {
    title: "Parked ideas / future improvements",
    description:
      "Parked ideas stay attached to the relevant milestone or block and remain reviewable context, not active scope.",
    details: parkedIdeas.map(
      (item) =>
        `${buildProjectMapVisibleTokenLabel(item.foundationArea)}: ${buildProjectMapVisibleTokenLabel(item.status)} | milestones: ${item.milestoneStates.map(buildProjectMapVisibleTokenLabel).join(", ")}`,
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
      ? "Bezpośrednie evidence ze źródła potwierdza ten blok jako completed."
      : "Evidence wskazuje ukończenie, ale sygnał wsparcia pozostaje słabszy.";
  }

  if (item.status === "planned") {
    return item.evidence.length > 0
      ? "Evidence ze źródła łączy ten blok z planowaną przyszłą pracą."
      : "Planowane, bo nie znaleziono evidence ukończenia.";
  }

  if (item.status === "blocked") {
    return "Niedostępne albo nieczytelne evidence utrzymuje ten blok jako blocked.";
  }

  if (item.status === "parked") {
    return "Parked evidence utrzymuje ten blok jako przyszły kontekst, nie aktywny zakres.";
  }

  if (item.status === "needs review") {
    return "Konflikt evidence utrzymuje ten blok w review.";
  }

  if (item.status === "absent") {
    return "Nie znaleziono wspierającego evidence, więc blok pozostaje absent.";
  }

  return "Evidence istnieje, ale blok pozostaje nierozstrzygnięty.";
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
              `Stan evidence: ${buildProjectMapMilestoneEvidenceStateLabel(evidence)} | typ źródła: ${evidence.evidenceType} | właściciel źródła: ${evidence.sourceOwner} | ścieżka źródła: ${evidence.sourcePath} | confidence: ${evidence.confidence} | support: ${evidence.supportState} | conflict: ${evidence.conflictState}`,
          )
        : [];

    return {
      foundationArea: item.foundationArea,
      status: item.status,
      statusReason: buildProjectMapMilestoneEvidenceStatusReason(item),
      evidenceLines,
    };
  }).filter((entry) => entry.evidenceLines.length > 0);

  if (entries.length === 0) {
    return null;
  }

    return {
      title: "Szczegóły evidence milestone'ów",
      description:
        "Te szczegóły pokazują tylko bloki oparte na evidence i wyjaśniają, czemu zostają check, planned, blocked, unknown, parked albo needs review bez domyślnego podbijania evidence.",
      entries,
      emptyState: "Brak evidence kandydata dostępnego w szczegółach.",
    };
  }

function buildProjectMapCandidateFoundationDescription(
  item: ProjectMapReconstructionCandidateChecklistItem,
): string {
  if (item.status === "completed") {
    return "Ta część jest już potwierdzona w danych projektu.";
  }

  if (item.status === "planned") {
    return "Ta część pozostaje planowana i nie jest jeszcze canonical.";
  }

  if (item.status === "blocked") {
    return "Ta część jest zablokowana przez brak wejść lub zależność.";
  }

  if (item.status === "parked") {
    return "Ta część pozostaje parked jako przyszły kontekst.";
  }

  if (item.status === "absent") {
    return "Nie znaleziono jeszcze potwierdzenia dla tej części.";
  }

  if (item.status === "needs review") {
    return "Ta część ma dane, ale nadal wymaga review.";
  }

  return "Status tej części wymaga ręcznego sprawdzenia.";
}

function buildProjectMapMissingInputCopy(item: string): ProjectMapMissingInputCopy {
  if (item.includes("Repository URL is missing from Project Map source identity.")) {
    return {
      label: "Brak pełnego źródła dla bloku: tożsamość źródła",
      detail: "Tożsamość źródła Project Map nie zawiera adresu repozytorium.",
    };
  }

  if (item.includes("Repository URL in Project Map source identity does not match")) {
    return {
      label: "Brak spójnego źródła dla bloku: tożsamość źródła",
      detail: "Tożsamość źródła nie zgadza się z rekordem BCP.",
    };
  }

  if (item.includes("SSOT is missing because no SSOT docs were found.")) {
    return {
      label: "Brak pełnego źródła dla bloku: SSOT",
      detail: "Nie znaleziono dokumentów SSOT.",
    };
  }

  if (item.includes("Project Bible is missing because no dedicated Project Bible source was found.")) {
    return {
      label: "Brak danych wejściowych dla sekcji: Project Bible",
      detail: "Nie znaleziono osobnego źródła Project Bible.",
    };
  }

  if (item.includes("Project Map is missing because canonical map.json does not exist yet.")) {
    return {
      label: "Brak canonical map.json",
      detail: "Mapa kanoniczna nie została jeszcze utworzona.",
    };
  }

  if (item.includes("First Layout is missing because no BCP layout evidence was found; the shell layout exists separately.")) {
    return {
      label: "Brak danych wejściowych dla sekcji: pierwszy layout",
      detail: "Brakuje potwierdzenia układu BCP.",
    };
  }

  if (item.includes("First Working Flow is missing because no flow evidence was found.")) {
    return {
      label: "Brak danych wejściowych dla sekcji: pierwszy działający przepływ",
      detail: "Brakuje potwierdzenia pierwszego przepływu.",
    };
  }

  if (item.includes("Publication Path is missing because canonical save/publish is not implemented or approved yet.")) {
    return {
      label: "Brak decyzji akceptacyjnej dla ścieżki publikacji",
      detail: "Kanoniczny zapis pozostaje osobnym krokiem.",
    };
  }

  return {
    label: item,
  };
}

async function loadProjectMapCandidate(
  project: Awaited<ReturnType<typeof getServerProjectById>>,
  sourcePath?: string,
  mapReadResult?: ProjectMapReadResult | null,
): Promise<ProjectMapReconstructionCandidateResult | null> {
  if (!project) {
    return null;
  }

  const scanResult = await scanProjectMapEvidence({
    ...project,
    ...(sourcePath ? { sourcePath } : {}),
  });
  const classificationResult = classifyProjectMapEvidence(scanResult);

  return enrichProjectMapReconstructionCandidateWithSourceIdentity(
    buildProjectMapReconstructionCandidate(classificationResult),
    project,
    mapReadResult ?? null,
  );
}

function buildFoundationStatuses(
  projectName: string | null,
  storageReadiness: ProjectMapStorageReadinessCopy | null,
  mapReadResult: ProjectMapReadResult | null,
  projectMapCandidateCopy: ProjectMapCandidateCopy | null,
): FoundationStatus[] {
  const projectIdentityStatus = projectName ? "dostępny" : "niedostępny";
  const ssotDocsFound =
    projectMapCandidateCopy?.foundationChecklist.find(
      (item) => item.foundationArea === "SSOT" && item.evidence.length > 0,
    ) !== undefined;
  const candidateReady =
    projectMapCandidateCopy?.title === "Robocza mapa projektu gotowa";
  const projectMapStatus =
    candidateReady
      ? "candidate"
      : !mapReadResult || mapReadResult.status === "missing"
      ? storageReadiness?.status === "ready"
        ? "gotowe / bez map.json"
        : "brak / niegotowe"
      : mapReadResult.reason === "project-map-present-but-read-not-implemented"
        ? "obecna / odczyt niezaimplementowany"
        : "niedostępna";

  return [
    {
      label: "Tożsamość projektu",
      status: projectIdentityStatus,
      description: projectName
        ? `Bieżący projekt: ${projectName}.`
        : "Brak rozpoznanego projektu w bieżącym kontekście.",
    },
    {
      label: "SSOT",
      status: ssotDocsFound ? "candidate" : "planowane",
      description: ssotDocsFound
        ? "Dokumenty SSOT zostały znalezione i mogą wspierać mapę kandydata."
        : "Źródło prawdy pozostaje w dokumentacji SSOT.",
    },
    {
      label: "Project Bible",
      status: "planowane",
      description: "Kompas celu, jakości i zakresu pozostaje do odczytu.",
    },
    {
      label: "Mapa projektu",
      status: projectMapStatus,
      description:
        projectMapStatus === "candidate"
          ? "Robocza mapa projektu jest widoczna, a canonical map.json nadal pozostaje osobno."
          : projectMapStatus === "brak / niegotowe"
          ? "Mapa projektu nie jest jeszcze gotowa do użycia."
          : projectMapStatus === "obecna / odczyt niezaimplementowany"
            ? "Mapa projektu istnieje, ale odczyt pozostaje niezaimplementowany."
            : "Mapa projektu pozostaje niedostępna.",
    },
    {
      label: "Źródło robocze",
      status: "planowane",
      description: "Wskaż miejsce, w którym żyją projektowe pliki lub kod.",
    },
    {
      label: "Pierwszy layout",
      status: "działa",
      description:
        "Shell overview-first już działa, ale to nadal osobna warstwa od BCP layout evidence.",
    },
    {
      label: "Pierwszy działający przepływ",
      status: "planowane",
      description: "Pierwszy użyteczny przepływ pozostaje osobnym krokiem.",
    },
    {
      label: "Ścieżka publikacji",
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
  const persistedCheckoutPath = mapReadResult?.projectSourceIdentity?.projectCheckoutPath;
  const expectedCheckoutPath = project?.workingDirectory
    ? buildRepoCheckoutDirectory(project.workingDirectory)
    : null;
  const candidateSourcePath =
    persistedCheckoutPath && expectedCheckoutPath === persistedCheckoutPath
      ? persistedCheckoutPath
      : project?.workingDirectory;
  const mapCandidate = await loadProjectMapCandidate(
    project,
    candidateSourcePath,
    mapReadResult,
  );
  const projectMapStorageReadiness = await resolveProjectMapStorageReadiness(
    project,
  );
  const projectMapCandidateCopy = buildProjectMapCandidateCopy(mapCandidate);
  const foundationStatuses = buildFoundationStatuses(
    project?.name ?? null,
    projectMapStorageReadiness,
    mapReadResult,
    projectMapCandidateCopy,
  );
  const projectMapStateCopy = buildProjectMapStateCopy(
    projectMapStorageReadiness,
    mapReadResult,
    projectMapCandidateCopy?.title === "Robocza mapa projektu gotowa",
  );
  const projectMapCandidateStructure = buildProjectMapCandidateStructure(
    project ?? null,
    mapReadResult,
    mapCandidate,
  );
  const projectMapActionEntryCopy = buildProjectMapActionEntryCopy(
    project?.id ?? null,
    mapReadResult,
    projectMapCandidateCopy,
    projectMapStorageReadiness,
  );
  const projectMapCanonicalWriteReadinessCopy =
    buildProjectMapCanonicalWriteReadinessCopy(
      projectMapStorageReadiness,
      mapReadResult,
      mapCandidate,
      projectMapCandidateCopy,
    );
  const projectMapCanonicalWritePreviewCopy =
    buildProjectMapCanonicalWritePreviewCopy(
      projectMapStorageReadiness,
      mapReadResult,
      mapCandidate,
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
  const currentStateSummaryItems = [
    mapReadResult?.status === "unavailable" &&
    mapReadResult.reason === "project-map-present-but-read-not-implemented"
      ? "Kanoniczna mapa: plik map.json istnieje, odczyt pozostaje poza tym widokiem."
      : "Kanoniczna mapa: absent / brak kanonicznego map.json.",
    projectMapCandidateCopy?.title === "Robocza mapa projektu gotowa"
      ? "Widoczna mapa: roboczy kandydat, nie stan kanoniczny."
      : "Widoczna mapa: brak gotowego roboczego kandydata.",
    "Zapis kanoniczny: nie jest teraz wykonywany.",
    "Lokalne potwierdzenie: nie jest utrwalone i nie zapisuje map.json.",
    "Następny wymagany krok: osobny zatwierdzony milestone wykonawczy.",
  ];

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

      <section
        id="project-map-current-state-summary"
        className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4"
      >
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Stan teraz
          </p>
          <h3 className="text-xl font-semibold text-zinc-50">
            Co jest aktualne w Mapie projektu
          </h3>
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-zinc-200 md:grid-cols-2">
          {currentStateSummaryItems.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

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

      {projectMapCanonicalWriteReadinessCopy ? (
        <section
          id="project-map-canonical-write-readiness"
          className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4"
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
              Gotowość do zapisu
            </p>
            <h3 className="text-xl font-semibold text-emerald-50">
              {projectMapCanonicalWriteReadinessCopy.title}
            </h3>
            <p className="text-sm text-emerald-100/80">
              {projectMapCanonicalWriteReadinessCopy.description}
            </p>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-emerald-50/90">
            {projectMapCanonicalWriteReadinessCopy.details.map((detail) => (
              <li
                key={detail}
                className="rounded-lg border border-emerald-900/60 bg-emerald-950/35 px-3 py-2"
              >
                {detail}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <details
        id="project-map-canonical-write-preview-status"
        className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-4"
      >
        <summary className="cursor-pointer list-none text-xs uppercase tracking-[0.2em] text-amber-200/70">
          Preview zapisu
        </summary>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-amber-50">
            {projectMapCanonicalWritePreviewCopy.status}
          </h3>
          <p className="text-sm font-medium text-amber-100">
            {projectMapCanonicalWritePreviewCopy.title}
          </p>
          <p className="text-sm text-amber-100/80">
            {projectMapCanonicalWritePreviewCopy.description}
          </p>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-amber-50/90">
          {projectMapCanonicalWritePreviewCopy.details.map((detail) => (
            <li
              key={detail}
              className="rounded-lg border border-amber-900/60 bg-amber-950/35 px-3 py-2"
            >
              {detail}
            </li>
          ))}
        </ul>
      </details>

      <section
        id="project-map-canonical-write-action-gate"
        className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
      >
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Bramka akcji
          </p>
          <h3 className="text-xl font-semibold text-zinc-50">
            {projectMapCanonicalWritePreviewCopy.actionGate.title}
          </h3>
          <p className="text-sm text-zinc-300">
            Status akcji: {buildProjectMapVisibleTokenLabel(projectMapCanonicalWritePreviewCopy.actionGate.actionState)}
          </p>
          <p className="text-sm text-zinc-400">
            {projectMapCanonicalWritePreviewCopy.actionGate.description}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-400"
          >
            {projectMapCanonicalWritePreviewCopy.actionGate.controlLabel}
          </button>
          <p className="text-sm text-zinc-400">
            {projectMapCanonicalWritePreviewCopy.actionGate.detail}
          </p>
        </div>

        <label className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200">
          <input
            type="checkbox"
            name="project-map-canonical-write-approval-capture"
            disabled={
              projectMapCanonicalWritePreviewCopy.actionGate
                .approvalCaptureDisabled
            }
            className="peer mt-1 h-4 w-4 shrink-0 accent-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <span>
            {
              projectMapCanonicalWritePreviewCopy.actionGate
                .approvalCaptureLabel
            }
          </span>
          <span className="col-start-2 hidden text-xs text-amber-200 peer-checked:block">
            Intencja lokalna uchwycona tylko do planowania; nie jest utrwalona, nie włącza wykonania i nie zastępuje osobnego przyszłego milestone wykonawczego.
          </span>
          <span className="col-start-2 text-xs text-zinc-400">
            {
              projectMapCanonicalWritePreviewCopy.actionGate
                .approvalCaptureStatus
            }
          </span>
        </label>

        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Preview handoffu
            </p>
            <h4 className="text-sm font-semibold text-zinc-100">
              {projectMapCanonicalWritePreviewCopy.handoffPreview.title}
            </h4>
            <p className="text-xs text-zinc-400">
              {projectMapCanonicalWritePreviewCopy.handoffPreview.description}
            </p>
          </div>
          <ul className="mt-3 space-y-2 text-xs text-zinc-300">
            {projectMapCanonicalWritePreviewCopy.handoffPreview.details.map(
              (detail) => (
                <li
                  key={detail}
                  className="rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2"
                >
                  {detail}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

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

      {projectMapCandidateStructure ? (
        <section
          id="project-map-candidate-structure"
          className="rounded-xl border border-cyan-900/50 bg-cyan-950/20 p-4"
        >
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                Robocza mapa projektu
              </p>
              <span className="rounded-full border border-cyan-700 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
                Zaufanie: {buildProjectMapVisibleTokenLabel(projectMapCandidateStructure.trustState)}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-cyan-50">
              Mapa z repo + SSOT
            </h3>
            <p className="text-sm text-cyan-100/80">
              To jest czytelna robocza mapa zbudowana z danych projektu i
              sygnałów SSOT. Pozostaje kandydatem read-only i nie promuje
              canonical map.json.
            </p>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4">
              <p className="text-sm font-semibold text-cyan-50">Co to za projekt?</p>
              <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                <li>ID projektu: {projectMapCandidateStructure.projectIdentity.projectId}</li>
                <li>Nazwa projektu: {projectMapCandidateStructure.projectIdentity.projectName}</li>
                <li>Adres repozytorium: {projectMapCandidateStructure.projectIdentity.repositoryUrl ?? "missing"}</li>
                <li>Katalog roboczy: {projectMapCandidateStructure.projectIdentity.workingDirectory ?? "missing"}</li>
                <li>Ścieżka checkout: {projectMapCandidateStructure.projectIdentity.checkoutPath ?? "missing"}</li>
                <li>Adres repozytorium w tożsamości źródła: {projectMapCandidateStructure.projectIdentity.sourceIdentityRepositoryUrl ?? "missing"}</li>
                <li>Status tożsamości źródła: {buildProjectMapVisibleTokenLabel(projectMapCandidateStructure.projectIdentity.sourceIdentityStatus)}</li>
                <li>Utrwalenie tożsamości źródła: {buildProjectMapVisibleTokenLabel(projectMapCandidateStructure.projectIdentity.sourceIdentityPersistence)}</li>
              </ul>
            </article>

            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4">
              <p className="text-sm font-semibold text-cyan-50">Co już mamy?</p>
              {projectMapCandidateStructure.completedItems.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                  {projectMapCandidateStructure.completedItems.map((item) => (
                    <li key={item.title} className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">
                      <p className="font-medium">{buildProjectMapVisibleTokenLabel(item.title)}</p>
                      <p className="text-cyan-100/80">{item.summary}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-cyan-100/80">Brak completed items.</p>
              )}
            </article>

            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4">
              <p className="text-sm font-semibold text-cyan-50">Co jest pod review?</p>
              {projectMapCandidateStructure.underReviewItems.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                  {projectMapCandidateStructure.underReviewItems.map((item) => (
                    <li key={item.title} className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">
                      <p className="font-medium">{buildProjectMapVisibleTokenLabel(item.title)}</p>
                      <p className="text-cyan-100/80">{item.summary}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-cyan-100/80">Brak under-review items.</p>
              )}
            </article>

            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4">
              <p className="text-sm font-semibold text-cyan-50">
                Co jest odrzucone / zablokowane?
              </p>
              {projectMapCandidateStructure.rejectedOrBlockedItems.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                  {projectMapCandidateStructure.rejectedOrBlockedItems.map((item) => (
                    <li key={item.title} className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">
                      <p className="font-medium">{buildProjectMapVisibleTokenLabel(item.title)}</p>
                      <p className="text-cyan-100/80">{item.summary}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-cyan-100/80">Brak blocked items.</p>
              )}
            </article>

            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4">
              <p className="text-sm font-semibold text-cyan-50">Czego brakuje?</p>
              {projectMapCandidateStructure.missingInputs.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                  {projectMapCandidateStructure.missingInputs.map((item) => (
                    <li key={item} className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">
                      {(() => {
                        const missingInputCopy = buildProjectMapMissingInputCopy(item);

                        return (
                          <>
                            <p className="font-medium text-cyan-50">
                              {missingInputCopy.label}
                            </p>
                            {missingInputCopy.detail ? (
                              <p className="mt-1 text-xs text-cyan-100/75">
                                {missingInputCopy.detail}
                              </p>
                            ) : null}
                          </>
                        );
                      })()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-cyan-100/80">Brak jawnych braków.</p>
              )}
            </article>

            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4">
              <p className="text-sm font-semibold text-cyan-50">Co dalej?</p>
              <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                {projectMapCandidateStructure.nextSteps.map((step) => (
                  <li key={step} className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">
                    {step}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4">
              <p className="text-sm font-semibold text-cyan-50">
                Z jakich dokumentów to wynika?
              </p>
              <ul className="mt-3 space-y-2 text-sm text-cyan-50/90">
                {projectMapCandidateStructure.evidenceRefs.map((ref) => (
                  <li key={ref} className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">
                    {ref}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-4 lg:col-span-2">
              <p className="text-sm font-semibold text-cyan-50">Aktualny stan</p>
              <ul className="mt-3 grid gap-2 text-sm text-cyan-50/90 sm:grid-cols-2">
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Źródło stanu: {projectMapCandidateStructure.currentState.stateSource}</li>
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Status tożsamości źródła: {buildProjectMapVisibleTokenLabel(projectMapCandidateStructure.currentState.sourceIdentityStatus)}</li>
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Utrwalenie tożsamości źródła: {buildProjectMapVisibleTokenLabel(projectMapCandidateStructure.currentState.sourceIdentityPersistence)}</li>
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Potwierdzony stan projektu: {buildProjectMapVisibleTokenLabel(projectMapCandidateStructure.currentState.projectCompletedState)}</li>
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Stan kandydata: {buildProjectMapVisibleTokenLabel(projectMapCandidateStructure.currentState.projectCurrentState)}</li>
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Następny krok: {projectMapCandidateStructure.currentState.projectNextState}</li>
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Stan kanoniczny: {projectMapCandidateStructure.currentState.canonicalMapStatus}</li>
                <li className="rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2">Status kandydata: {projectMapCandidateStructure.currentState.candidateStatus}</li>
              </ul>
            </article>
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
                      {buildProjectMapVisibleTokenLabel(row.label)}
                    </p>
                    <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs uppercase tracking-[0.18em] text-zinc-300">
                      Status: {buildProjectMapVisibleTokenLabel(row.status)}
                    </span>
                    <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs uppercase tracking-[0.18em] text-zinc-300">
                      Źródło: {buildProjectMapVisibleTokenLabel(row.source)}
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
            Stan kanoniczny vs kandydat
          </summary>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-emerald-50">
              Szczegóły stanu kanonicznego
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
            Widoczność odłożonych pomysłów
          </summary>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-lime-50">
              Szczegóły odłożonych pomysłów
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
            Szczegóły evidence milestone'ów
          </summary>
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-cyan-50">
                Detale evidence milestone'ów
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
                          {buildProjectMapVisibleTokenLabel(entry.foundationArea)}
                        </p>
                        <p className="text-sm text-cyan-100/80">
                          Powód statusu: {entry.statusReason}
                        </p>
                      </div>

                      <span className="inline-flex items-center rounded-full border border-cyan-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                        {buildProjectMapVisibleTokenLabel(entry.status)}
                      </span>
                    </div>                    {entry.evidenceLines.length > 0 ? (
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
                    ) : (
                      <p className="mt-3 rounded-lg border border-cyan-900/60 bg-cyan-950/30 px-3 py-2 text-sm text-cyan-50/90">
                        Brak source evidence połączonego z tym blokiem.
                      </p>
                    )}
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
            Pipeline kandydata
          </summary>
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-sky-50">
                Szczegóły pipeline kandydata
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
                    Statusy foundation kandydata
                  </p>
                  <p className="text-sm text-sky-100/70">
                    Dane kandydata do review pozostają oddzielone od kanonicznych
                    danych Project Map.
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
                            {buildProjectMapVisibleTokenLabel(item.foundationArea)}
                          </p>
                          <p className="text-sm text-sky-100/70">
                            {buildProjectMapCandidateFoundationDescription(item)}
                          </p>
                        </div>

                        <span className="inline-flex items-center rounded-full border border-sky-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
                          {buildProjectMapVisibleTokenLabel(item.status)}
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
                    Evidence i provenance
                  </p>
                  <p className="text-sm text-sky-100/70">
                    Linki źródłowe pozostają widoczne, żeby kandydat mógł zostać
                    sprawdzony bez promowania go do danych kanonicznych.
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

            <div
              className="rounded-xl border border-sky-800/70 bg-sky-950/40 p-4"
              data-project-map-selection
            >
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-200/70">
                  Sprawdź roboczą mapę
                </p>
                <h4 className="text-lg font-semibold text-sky-50">
                  Oceń kandydata przed dalszą pracą
                </h4>
                <p className="text-sm text-sky-100/80">
                  To nadal tryb roboczy: nie zapisuje map.json i nie publikuje mapy
                  kanonicznej.
                </p>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                <div className="rounded-lg border border-sky-900/60 bg-sky-950/30 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">
                    Decyzja robocza
                  </p>
                  <p className="mt-1 text-sm font-medium text-sky-50">
                    Czy kierunek roboczej mapy jest dobry?
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {projectMapReviewDecisionOptions.map((option) => {
                      const inputId = `project-map-review-${option.id}`;

                      return (
                        <div key={option.id} className="space-y-1">
                          <input
                            id={inputId}
                            type="radio"
                            name="project-map-review-decision"
                            value={option.id}
                            data-project-map-review-choice
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={inputId}
                            className="block cursor-pointer rounded-lg border border-sky-900/60 bg-sky-950/35 px-3 py-2 text-sm text-sky-50/90 transition hover:border-sky-700 hover:bg-sky-900/40 peer-checked:border-sky-300 peer-checked:bg-sky-500/20 peer-checked:text-sky-50"
                          >
                            {option.label}
                          </label>
                          <p className="hidden text-xs text-sky-100/70 peer-checked:block">
                            {option.confirmation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-sky-900/60 bg-sky-950/30 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">
                    Następny krok
                  </p>
                  <p className="mt-1 text-sm font-medium text-sky-50">
                    Co robimy dalej po tej ocenie?
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {projectMapNextStepOptions.map((option) => {
                      const inputId = `project-map-next-${option.id}`;

                      return (
                        <div key={option.id} className="space-y-1">
                          <input
                            id={inputId}
                            type="radio"
                            name="project-map-next-step"
                            value={option.id}
                            data-project-map-next-choice
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={inputId}
                            className="block cursor-pointer rounded-lg border border-sky-900/60 bg-sky-950/35 px-3 py-2 text-sm text-sky-50/90 transition hover:border-sky-700 hover:bg-sky-900/40 peer-checked:border-sky-300 peer-checked:bg-sky-500/20 peer-checked:text-sky-50"
                          >
                            {option.label}
                          </label>
                          <p className="hidden text-xs text-sky-100/70 peer-checked:block">
                            {option.confirmation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
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
