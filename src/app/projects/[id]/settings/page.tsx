"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import {
  getProjectBindingDecisionSummary,
  getProjectById,
  upsertProject,
} from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ProjectBranchWorkMode = "main" | "working-branch";

const PROJECT_BRANCH_WORK_MODE_STORAGE_SUFFIX = "branch-work-mode";
const PROJECT_WORKING_BRANCH_NAME_STORAGE_SUFFIX = "working-branch-name";

function saveProjectBinding(project: Project, updates: Partial<Project>): Project {
  return upsertProject({
    ...project,
    ...updates,
  });
}

function getProjectBranchWorkModeStorageKey(projectId: string): string {
  return `soft-premium-system.projects.${projectId}.${PROJECT_BRANCH_WORK_MODE_STORAGE_SUFFIX}`;
}

function readProjectBranchWorkMode(
  projectId: string,
): ProjectBranchWorkMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = localStorage.getItem(
    getProjectBranchWorkModeStorageKey(projectId),
  );

  return storedValue === "main" || storedValue === "working-branch"
    ? storedValue
    : null;
}

function saveProjectBranchWorkMode(
  projectId: string,
  branchWorkMode: ProjectBranchWorkMode,
): void {
  localStorage.setItem(
    getProjectBranchWorkModeStorageKey(projectId),
    branchWorkMode,
  );
}

function getProjectWorkingBranchNameStorageKey(projectId: string): string {
  return `soft-premium-system.projects.${projectId}.${PROJECT_WORKING_BRANCH_NAME_STORAGE_SUFFIX}`;
}

function buildWorkingBranchName(projectName: string): string {
  const slug = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `work/${slug || "project"}`;
}

function buildBranchWorkModeSummary(
  projectName: string,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
): { summary: string; note: string } | null {
  if (!branchWorkMode) {
    return null;
  }

  const futureWorkNote =
    "Prawdziwe tworzenie gałęzi, checkout, synchronizacja, merge i PR to przyszła praca i nie jest jeszcze wykonywane.";

  if (branchWorkMode === "main") {
    return {
      summary: "Projekt jest przygotowany do pracy na `main`.",
      note: futureWorkNote,
    };
  }

  const selectedWorkingBranchName =
    workingBranchName.trim() || buildWorkingBranchName(projectName);

  return {
    summary: `Projekt jest przygotowany do pracy na gałęzi roboczej \`${selectedWorkingBranchName}\`.`,
    note: futureWorkNote,
  };
}

function buildGitHubConnectionReadinessSummary(
  hasRepositoryUrl: boolean,
): string[] | null {
  if (!hasRepositoryUrl) {
    return null;
  }

  return [
    "Adres repozytorium GitHub wykryty.",
    "Połączenie GitHub nie jest jeszcze potwierdzone ani zweryfikowane.",
    "Uwierzytelnienie i konfiguracja połączenia pozostają przyszłą pracą.",
    "Lokalny klon i prawdziwy workflow Git nie są jeszcze skonfigurowane.",
    "Przygotowanie gałęzi roboczej już istnieje, ale prawdziwe wykonanie Git jeszcze nie startuje.",
  ];
}

function buildLocalCloneReadinessSummary(
  hasRepositoryUrl: boolean,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
  projectName: string,
): string[] | null {
  if (!hasRepositoryUrl) {
    return null;
  }

  const preparedWorkingBranchName =
    workingBranchName.trim() || buildWorkingBranchName(projectName);

  return [
    "Lokalny klon / workspace nie jest jeszcze skonfigurowany ani zweryfikowany.",
    "Prawdziwe clone, fetch, checkout i walidacja filesystemu to przyszĹ‚a praca.",
    branchWorkMode === "working-branch"
      ? `Przygotowana nazwa gaĹ‚Ä™zi roboczej to \`${preparedWorkingBranchName}\`, ale nadal jest tylko metadanymi przygotowania.`
      : branchWorkMode === "main"
        ? "Wybrano pracÄ™ na `main`, ale to nadal tylko metadane przygotowania lokalnego workspace."
        : "WybĂłr gaĹ‚Ä™zi roboczej pozostaje tylko metadanymi przygotowania lokalnego workspace.",
    "W tym kroku nie kopiujemy plikĂłw i nie klonujemy repozytorium.",
  ];
}

type GitHubReadinessChecklistItem = {
  label: string;
  status: string;
};

function buildGitHubReadinessChecklist(
  hasRepositoryUrl: boolean,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
  projectName: string,
): GitHubReadinessChecklistItem[] | null {
  if (!hasRepositoryUrl) {
    return null;
  }

  const hasWorkingBranchName = Boolean(
    workingBranchName.trim() || buildWorkingBranchName(projectName),
  );

  return [
    { label: "Adres repozytorium GitHub", status: "gotowy" },
    {
      label: "Decyzja trybu pracy gałęzi",
      status: branchWorkMode ? "gotowa" : "brak",
    },
    {
      label: "Nazwa gałęzi roboczej",
      status:
        branchWorkMode === "working-branch"
          ? hasWorkingBranchName
            ? "gotowa"
            : "brak"
          : "nie wymagana",
    },
    {
      label: "Połączenie GitHub / uwierzytelnienie",
      status: "brak / wymagane",
    },
    { label: "Lokalny klon / workspace", status: "brak / wymagane" },
    {
      label: "Realne wykonanie Git",
      status: "zablokowane do jawnej zgody Product Ownera",
    },
  ];
}

type GitHubRealReadinessActionState =
  | "blocked"
  | "requires confirmation"
  | "ready";

type GitHubRealReadinessActionSummary = {
  state: GitHubRealReadinessActionState;
  note: string;
};

type GitHubRealExecutionConfirmationGateSummary = {
  title: string;
  note: string;
  disclosure: string;
};

type GitHubRealOperationSelection =
  | "connection check"
  | "local clone/workspace check"
  | "clone preparation"
  | "branch check";

type GitHubRealOperationSelectionSummary = {
  label: GitHubRealOperationSelection;
  copy: string;
};

type GitHubRealOperationCandidateDecision =
  | "pending"
  | "approved for further preparation";

type GitHubRealOperationCandidateDecisionSummary = {
  status: GitHubRealOperationCandidateDecision;
  copy: string;
  disclosure: string;
  actionLabel: string;
};

type GitHubRealOperationReadinessDetailSummary = {
  title: string;
  note: string;
  disclosure: string;
};

const GITHUB_REAL_OPERATION_SELECTION_OPTIONS: Array<{
  label: GitHubRealOperationSelection;
}> = [
  { label: "connection check" },
  { label: "local clone/workspace check" },
  { label: "clone preparation" },
  { label: "branch check" },
];

function buildGitHubRealReadinessActionSummary(
  hasRepositoryUrl: boolean,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
): GitHubRealReadinessActionSummary {
  if (!hasRepositoryUrl || !branchWorkMode) {
    return {
      state: "blocked",
      note:
        "Brakuje wymaganych lokalnych metadanych. Realne wykonanie Git/GitHub pozostaje zablokowane.",
    };
  }

  if (branchWorkMode === "main") {
    return {
      state: "requires confirmation",
      note:
        "Tryb pracy na `main` jest przygotowany lokalnie, ale realne wykonanie nadal wymaga jawnej zgody Product Ownera i pozostaje zablokowane.",
    };
  }

  if (!workingBranchName.trim()) {
    return {
      state: "blocked",
      note:
        "Brakuje nazwy gałęzi roboczej wymaganej przez lokalny tryb pracy. Realne wykonanie Git/GitHub pozostaje zablokowane.",
    };
  }

  return {
    state: "ready",
    note:
      "Lokalny kontekst gałęzi roboczej jest kompletny i gotowy do potwierdzenia, ale realne wykonanie nadal wymaga jawnej zgody Product Ownera i pozostaje zablokowane.",
  };
}

function buildGitHubRealExecutionConfirmationGateSummary(
  readinessActionState: GitHubRealReadinessActionState,
): GitHubRealExecutionConfirmationGateSummary | null {
  if (readinessActionState === "blocked") {
    return null;
  }

  if (readinessActionState === "requires confirmation") {
    return {
      title: "Gotowe do potwierdzenia przez Product Ownera",
      note:
        "Lokalne warunki są wystarczające, żeby poprosić Product Ownera o jawne potwierdzenie. Realne wykonanie Git/GitHub pozostaje zablokowane.",
      disclosure: "To nie jest gotowość do wykonania.",
    };
  }

  return {
    title: "Gotowe do potwierdzenia przez Product Ownera",
    note:
      "Lokalny kontekst jest kompletny i gotowy do potwierdzenia przez Product Ownera, ale to nie jest gotowość do wykonania. Realne wykonanie Git/GitHub pozostaje zablokowane.",
    disclosure: "To nie jest gotowość do wykonania.",
  };
}

function buildGitHubRealOperationSelectionSummary(
  selection: GitHubRealOperationSelection | null,
): GitHubRealOperationSelectionSummary | null {
  if (!selection) {
    return null;
  }

  return {
    label: selection,
    copy: `Wybrano jako kandydat: ${selection}. To nie jest autoryzacja do wykonania. Realne wykonanie Git/GitHub pozostaje zablokowane.`,
  };
}

const GITHUB_REAL_OPERATION_CANDIDATE_DECISION_STORAGE_SUFFIX =
  "github-real-operation-candidate-decision";

function getGitHubRealOperationCandidateDecisionStorageKey(
  projectId: string,
  selection: GitHubRealOperationSelection,
): string {
  return `soft-premium-system.projects.${projectId}.${GITHUB_REAL_OPERATION_CANDIDATE_DECISION_STORAGE_SUFFIX}.${selection}`;
}

function readGitHubRealOperationCandidateDecision(
  projectId: string,
  selection: GitHubRealOperationSelection | null,
): GitHubRealOperationCandidateDecision {
  if (typeof window === "undefined" || !selection) {
    return "pending";
  }

  const storedValue = localStorage.getItem(
    getGitHubRealOperationCandidateDecisionStorageKey(projectId, selection),
  );

  return storedValue === "approved for further preparation"
    ? storedValue
    : "pending";
}

function saveGitHubRealOperationCandidateDecision(
  projectId: string,
  selection: GitHubRealOperationSelection,
  decision: GitHubRealOperationCandidateDecision,
): void {
  localStorage.setItem(
    getGitHubRealOperationCandidateDecisionStorageKey(projectId, selection),
    decision,
  );
}

function buildGitHubRealOperationCandidateDecisionSummary(
  selection: GitHubRealOperationSelection | null,
  decision: GitHubRealOperationCandidateDecision,
): GitHubRealOperationCandidateDecisionSummary | null {
  if (!selection) {
    return null;
  }

  const isApproved = decision === "approved for further preparation";

  return {
    status: decision,
    copy: isApproved
      ? `Wybrany kandydat jest approved for further preparation. selected candidate: ${selection}. authorized to execute: blocked.`
      : `Wybrany kandydat czeka na decyzję. selected candidate: ${selection}. authorized to execute: blocked.`,
    disclosure:
      "To nie jest autoryzacja do wykonania. Realne wykonanie Git/GitHub pozostaje zablokowane.",
    actionLabel: "Zatwierdź do dalszego przygotowania",
  };
}

function buildGitHubRealOperationReadinessDetailSummary(
  selection: GitHubRealOperationSelection | null,
): GitHubRealOperationReadinessDetailSummary | null {
  if (!selection) {
    return null;
  }

  const detailBySelection: Record<
    GitHubRealOperationSelection,
    Pick<GitHubRealOperationReadinessDetailSummary, "note">
  > = {
    "connection check": {
      note:
        "Ten kandydat opisuje tylko lokalny kontekst sprawdzania połączenia, bez łączenia się z GitHub.",
    },
    "local clone/workspace check": {
      note:
        "Ten kandydat opisuje tylko lokalny kontekst klonu/workspace, bez klonowania, synchronizacji ani zmian na dysku.",
    },
    "clone preparation": {
      note:
        "Ten kandydat opisuje tylko przygotowanie klonu, bez tworzenia repozytorium, checkoutu ani push.",
    },
    "branch check": {
      note:
        "Ten kandydat opisuje tylko lokalną weryfikację gałęzi, bez przełączania gałęzi i bez realnego wykonania Git/GitHub.",
    },
  };

  return {
    title: "Readiness detail",
    note: `Informational only. Selected as candidate: ${selection}. ${detailBySelection[selection].note}`,
    disclosure:
      "To nie jest autoryzacja do wykonania. Realne wykonanie Git/GitHub pozostaje zablokowane.",
  };
}

function readProjectWorkingBranchName(projectId: string): string {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(getProjectWorkingBranchNameStorageKey(projectId)) ?? "";
}

function saveProjectWorkingBranchName(
  projectId: string,
  workingBranchName: string,
): void {
  localStorage.setItem(
    getProjectWorkingBranchNameStorageKey(projectId),
    workingBranchName,
  );
}

export default function ProjectSettingsPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(() =>
    getProjectById(params.id),
  );
  const [githubUrlInput, setGithubUrlInput] = useState(
    () => getProjectById(params.id)?.repositoryUrl ?? "",
  );
  const [workingDirectoryInput, setWorkingDirectoryInput] = useState(
    () => getProjectById(params.id)?.workingDirectory ?? "",
  );
  const [branchWorkMode, setBranchWorkMode] =
    useState<ProjectBranchWorkMode | null>(() =>
      readProjectBranchWorkMode(params.id),
    );
  const [workingBranchName, setWorkingBranchName] = useState<string>(() => {
    const nextProject = getProjectById(params.id);
    const nextBranchWorkMode = readProjectBranchWorkMode(params.id);
    const storedWorkingBranchName = readProjectWorkingBranchName(params.id);

    if (storedWorkingBranchName) {
      return storedWorkingBranchName;
    }

    if (nextProject?.repositoryUrl?.trim() && nextBranchWorkMode === "working-branch") {
      return buildWorkingBranchName(nextProject.name);
    }

    return "";
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [githubRealOperationSelection, setGithubRealOperationSelection] =
    useState<GitHubRealOperationSelection | null>(null);
  const [githubRealOperationCandidateDecision, setGithubRealOperationCandidateDecision] =
    useState<GitHubRealOperationCandidateDecision>("pending");

  useEffect(() => {
    const nextProject = getProjectById(params.id);
    const nextBranchWorkMode = readProjectBranchWorkMode(params.id);
    const storedWorkingBranchName = readProjectWorkingBranchName(params.id);

    setProject(nextProject);
    setGithubUrlInput(nextProject?.repositoryUrl ?? "");
    setWorkingDirectoryInput(nextProject?.workingDirectory ?? "");
    setBranchWorkMode(nextBranchWorkMode);
    setWorkingBranchName(
      storedWorkingBranchName ||
        (nextProject?.repositoryUrl?.trim() &&
        nextBranchWorkMode === "working-branch"
          ? buildWorkingBranchName(nextProject.name)
          : ""),
    );
    setGithubRealOperationSelection(null);
    setGithubRealOperationCandidateDecision("pending");
    setFeedbackMessage(null);
  }, [params.id]);

  if (!project) {
    return (
      <SectionCard>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">
            Ustawienia źródła
          </h2>
          <p className="text-zinc-400">Projekt nie został znaleziony.</p>
        </div>
      </SectionCard>
    );
  }

  const summary = getProjectBindingDecisionSummary(project);
  const branchWorkModeSummary = buildBranchWorkModeSummary(
    project.name,
    branchWorkMode,
    workingBranchName,
  );
  const githubConnectionReadinessSummary =
    buildGitHubConnectionReadinessSummary(Boolean(project.repositoryUrl?.trim()));
  const localCloneReadinessSummary = buildLocalCloneReadinessSummary(
    Boolean(project.repositoryUrl?.trim()),
    branchWorkMode,
    workingBranchName,
    project.name,
  );
  const githubReadinessChecklist = buildGitHubReadinessChecklist(
    Boolean(project.repositoryUrl?.trim()),
    branchWorkMode,
    workingBranchName,
    project.name,
  );
  const githubRealReadinessActionSummary = buildGitHubRealReadinessActionSummary(
    Boolean(project.repositoryUrl?.trim()),
    branchWorkMode,
    workingBranchName,
  );
  const githubRealExecutionConfirmationGateSummary =
    buildGitHubRealExecutionConfirmationGateSummary(
      githubRealReadinessActionSummary.state,
    );
  const githubRealOperationSelectionSummary =
    buildGitHubRealOperationSelectionSummary(githubRealOperationSelection);
  const githubRealOperationCandidateDecisionSummary =
    buildGitHubRealOperationCandidateDecisionSummary(
      githubRealOperationSelection,
      githubRealOperationCandidateDecision,
    );
  const githubRealOperationReadinessDetailSummary =
    buildGitHubRealOperationReadinessDetailSummary(
      githubRealOperationSelection,
    );

  function handleSaveGithubUrl() {
    const trimmedGithubUrl = githubUrlInput.trim();

    const nextProject = saveProjectBinding(project, {
      ...(trimmedGithubUrl ? { repositoryUrl: trimmedGithubUrl } : {}),
    });

    setProject(nextProject);
    setFeedbackMessage(
      trimmedGithubUrl
        ? "Adres GitHub zapisano jako metadane projektu."
        : "Pozostawiono projekt bez adresu GitHub.",
    );
  }

  function handleSaveWorkingDirectory() {
    const trimmedWorkingDirectory = workingDirectoryInput.trim();

    if (!trimmedWorkingDirectory) {
      setFeedbackMessage("Podaj istniejący katalog repo, aby go zapisać.");
      return;
    }

    const nextProject = saveProjectBinding(project, {
      workingDirectory: trimmedWorkingDirectory,
    });

    setProject(nextProject);
    setFeedbackMessage("Istniejący katalog repo zapisano jako metadane projektu.");
  }

  function handleBranchWorkModeChange(
    nextBranchWorkMode: ProjectBranchWorkMode,
  ) {
    saveProjectBranchWorkMode(params.id, nextBranchWorkMode);
    setBranchWorkMode(nextBranchWorkMode);
    if (nextBranchWorkMode === "working-branch") {
      const nextWorkingBranchName =
        readProjectWorkingBranchName(params.id) ||
        buildWorkingBranchName(project.name);

      setWorkingBranchName(nextWorkingBranchName);
      saveProjectWorkingBranchName(params.id, nextWorkingBranchName);
    }
    setFeedbackMessage(
      nextBranchWorkMode === "main"
        ? "Wybrano pracę bezpośrednio na main jako decyzję Product Ownera."
        : "Wybrano użycie gałęzi roboczej jako decyzję Product Ownera.",
    );
  }

  function handleGitHubRealOperationSelectionChange(
    nextSelection: GitHubRealOperationSelection,
  ) {
    setGithubRealOperationSelection(nextSelection);
    setGithubRealOperationCandidateDecision(
      readGitHubRealOperationCandidateDecision(params.id, nextSelection),
    );
  }

  function handleApproveGitHubRealOperationCandidate() {
    if (!githubRealOperationSelection) {
      return;
    }

    saveGitHubRealOperationCandidateDecision(
      params.id,
      githubRealOperationSelection,
      "approved for further preparation",
    );
    setGithubRealOperationCandidateDecision("approved for further preparation");
    setFeedbackMessage(
      "Kandydat zatwierdzono do dalszego przygotowania. To nie jest autoryzacja do wykonania.",
    );
  }

  function handleWorkingBranchNameChange(nextWorkingBranchName: string) {
    setWorkingBranchName(nextWorkingBranchName);
    const trimmedWorkingBranchName = nextWorkingBranchName.trim();

    if (!trimmedWorkingBranchName) {
      localStorage.removeItem(
        getProjectWorkingBranchNameStorageKey(params.id),
      );
      return;
    }

    saveProjectWorkingBranchName(params.id, trimmedWorkingBranchName);
  }

  return (
    <SectionCard>
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Ustawienia źródła
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Decyzja bindująca dla projektu
          </h2>
          <p className="text-zinc-400">
            Projekt ma tylko manifest SPS. Możesz zostawić go jako manifest,
            podpiąć istniejący katalog repo albo dodać adres GitHub.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Tryb źródła
          </p>
          <p className="mt-2 text-sm text-zinc-300">{summary.statusLabel}</p>
          <p className="mt-2 text-sm text-zinc-400">{summary.githubUrlLabel}</p>
          <p className="mt-2 text-sm text-zinc-300">
            {summary.localRepositoryLabel}
          </p>
          <p className="mt-2 text-sm text-zinc-300">{summary.nextStepLabel}</p>
          <p className="mt-2 text-sm text-zinc-400">
            {summary.repositoryContextMessage}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Adres GitHub
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Adres GitHub: {githubUrlInput.trim() ? "podany" : "nie podano"}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Lokalne repo Git: nadal niedostępne
            </p>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-zinc-400">
                Podaj adres GitHub
              </span>
              <input
                type="url"
                value={githubUrlInput}
                onChange={(event) => setGithubUrlInput(event.target.value)}
                placeholder="https://github.com/example/beauty-client-pro"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </label>
            <button
              type="button"
              onClick={handleSaveGithubUrl}
              className="mt-4 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Zapisz adres GitHub
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Istniejący katalog repo
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Możesz wskazać istniejący lokalny katalog repo bez klonowania.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Import/clone wymaga osobnego zatwierdzenia.
            </p>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-zinc-400">
                Katalog repo
              </span>
              <input
                type="text"
                value={workingDirectoryInput}
                onChange={(event) => setWorkingDirectoryInput(event.target.value)}
                placeholder="C:\\SPS_OS_WORK\\beauty-client-pro"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </label>
            <button
              type="button"
              onClick={handleSaveWorkingDirectory}
              className="mt-4 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Zapisz katalog repo
            </button>
          </div>
        </div>

        {project.repositoryUrl?.trim() ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Decyzja pracy z gałęzią
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Po podaniu adresu GitHub wybierz, czy projekt ma pracować
              bezpośrednio na `main`, czy na gałęzi roboczej.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Synchronizacja zatwierdzonych zmian z powrotem do `main` jest
              przyszłą pracą, która nie jest jeszcze zaimplementowana.
            </p>

            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                <input
                  type="radio"
                  name="branch-work-mode"
                  checked={branchWorkMode === "main"}
                  onChange={() => handleBranchWorkModeChange("main")}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium text-zinc-100">
                    Pracuj na `main`
                  </span>
                  <span className="block text-sm text-zinc-400">
                    Najprostszy tryb, bez tworzenia osobnej gałęzi roboczej.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                <input
                  type="radio"
                  name="branch-work-mode"
                  checked={branchWorkMode === "working-branch"}
                  onChange={() => handleBranchWorkModeChange("working-branch")}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium text-zinc-100">
                    Utwórz i użyj gałęzi roboczej
                  </span>
                  <span className="block text-sm text-zinc-400">
                    Gałąź robocza ma pozostać lokalną decyzją pracy, a
                    synchronizacja do `main` zostaje na później.
                  </span>
                </span>
              </label>
            </div>

            {branchWorkModeSummary ? (
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Podsumowanie konfiguracji
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  {branchWorkModeSummary.summary}
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  {branchWorkModeSummary.note}
                </p>
              </div>
            ) : null}

            <p className="mt-4 text-sm text-zinc-400" aria-live="polite">
              Wybrany tryb pracy:{" "}
              {branchWorkMode === "main"
                ? "Pracuj na `main`"
                : branchWorkMode === "working-branch"
                  ? "Utwórz i użyj gałęzi roboczej"
                  : "nie wybrano"}
            </p>
          </div>
        ) : null}

        {githubConnectionReadinessSummary ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Gotowość połączenia GitHub
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              GitHub wykryty, ale połączenie nie jest jeszcze gotowe.
            </p>
            <div className="mt-3 space-y-2">
              {githubConnectionReadinessSummary.map((line) => (
                <p key={line} className="text-sm text-zinc-400">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {localCloneReadinessSummary ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Gotowość lokalnego klonu
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              GitHub wykryty, ale lokalny klon/workspace nie jest jeszcze gotowy.
            </p>
            <div className="mt-3 space-y-2">
              {localCloneReadinessSummary.map((line) => (
                <p key={line} className="text-sm text-zinc-400">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {githubReadinessChecklist ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              GotowoĹ›Ä‡ do realnego wykonania Git
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              To jest tylko bramka gotowoĹ›ci, nie wykonanie.
            </p>
            <ul className="mt-3 space-y-2">
              {githubReadinessChecklist.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950/80 px-3 py-2"
                >
                  <span className="text-sm text-zinc-300">{item.label}</span>
                  <span className="text-sm text-zinc-400">{item.status}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Stan gotowości akcji GitHub
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Stan akcji GitHub: {githubRealReadinessActionSummary.state}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            {githubRealReadinessActionSummary.note}
          </p>
        </div>

        {githubRealExecutionConfirmationGateSummary ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Bramka potwierdzenia wykonania GitHub
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {githubRealExecutionConfirmationGateSummary.title}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {githubRealExecutionConfirmationGateSummary.note}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {githubRealExecutionConfirmationGateSummary.disclosure}
            </p>

            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Wybór pierwszej realnej operacji
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Wybierz tylko lokalny kandydat. To nie jest autoryzacja do
                wykonania. Realne wykonanie Git/GitHub pozostaje zablokowane.
              </p>
              <div className="mt-3 space-y-2">
                {GITHUB_REAL_OPERATION_SELECTION_OPTIONS.map((option) => (
                  <label
                    key={option.label}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2"
                  >
                    <input
                      type="radio"
                      name="github-real-operation-selection"
                      checked={githubRealOperationSelection === option.label}
                      onChange={() =>
                        handleGitHubRealOperationSelectionChange(option.label)
                      }
                      className="mt-1"
                    />
                    <span className="text-sm text-zinc-300">{option.label}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-sm text-zinc-400" aria-live="polite">
                {githubRealOperationSelectionSummary
                  ? githubRealOperationSelectionSummary.copy
                  : "Jeszcze nie wybrano kandydata. To nie jest autoryzacja do wykonania. Realne wykonanie Git/GitHub pozostaje zablokowane."}
              </p>
              {githubRealOperationCandidateDecisionSummary ? (
                <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Decyzja Product Ownera
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    selected candidate: {githubRealOperationSelection}
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">
                    decision:{" "}
                    {githubRealOperationCandidateDecisionSummary.status}
                  </p>
                  <button
                    type="button"
                    onClick={handleApproveGitHubRealOperationCandidate}
                    className="mt-3 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition hover:border-zinc-500"
                  >
                    {githubRealOperationCandidateDecisionSummary.actionLabel}
                  </button>
                  <p className="mt-3 text-sm text-zinc-400">
                    {githubRealOperationCandidateDecisionSummary.copy}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {githubRealOperationCandidateDecisionSummary.disclosure}
                  </p>
                </div>
              ) : null}
              {githubRealOperationReadinessDetailSummary ? (
                <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    readiness detail
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    {githubRealOperationReadinessDetailSummary.title}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {githubRealOperationReadinessDetailSummary.note}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {githubRealOperationReadinessDetailSummary.disclosure}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {project.repositoryUrl?.trim() && branchWorkMode === "working-branch" ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Proponowana gałąź robocza
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              To tylko przygotowana nazwa gałęzi roboczej dla przyszłego
              workflow Git. Nie tworzy gałęzi ani nie synchronizuje zmian.
            </p>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-zinc-400">
                Nazwa gałęzi roboczej
              </span>
              <input
                type="text"
                value={workingBranchName}
                onChange={(event) =>
                  handleWorkingBranchNameChange(event.target.value)
                }
                placeholder={buildWorkingBranchName(project.name)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
              />
            </label>
            <p className="mt-2 text-sm text-zinc-400">
              Ta nazwa jest zapisywana lokalnie dla tego projektu.
            </p>
          </div>
        ) : null}

        <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Pozostaw jako manifest-only
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Jeśli nie zapiszesz żadnych nowych metadanych, projekt pozostanie
            w trybie manifest-only.
          </p>
        </div>

        {feedbackMessage ? (
          <p className="text-sm text-emerald-200" aria-live="polite">
            {feedbackMessage}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
