"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import {
  getProjectBindingDecisionSummary,
  getProjectById,
  getProjectDeleteValidationSummary,
  upsertProject,
} from "@/lib/project/project";
import type { Project } from "@/lib/project/types";
import {
  buildRepoCheckoutDirectory,
  buildRepoCheckoutDirectoryHint,
  buildWorkingBranchName,
  clearProjectSourceStatus,
  getProjectWorkingBranchNameStorageKey,
  isManifestOnlyWorkspaceDirectory,
  readProjectBranchWorkMode,
  readProjectWorkingBranchName,
  resolveRepoCheckoutDirectory,
  saveProjectBranchWorkMode,
  saveProjectSourceStatus,
  saveProjectWorkingBranchName,
  type ProjectBranchWorkMode,
  type ProjectSourceReconciliationStatus,
} from "@/lib/project/source-status";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function saveProjectBinding(project: Project, updates: Partial<Project>): Project {
  return upsertProject({
    ...project,
    ...updates,
  });
}

type ProjectSourceRevalidationSuccessResponse = {
  status: "success";
  message: string;
  workingDirectory: string;
  activeBranch: string;
  repoCheckoutPath: string;
  remoteUrl: string;
  workingTreeState: ProjectSourceWorkingTreeState;
  sourceStatus: "git-repo";
};

type ProjectSourceRevalidationBlockedResponse = {
  status: "blocked";
  message: string;
};

type ProjectSourceRevalidationErrorResponse = {
  status: "error";
  message: string;
};

type ProjectSourceRevalidationResponse =
  | ProjectSourceRevalidationSuccessResponse
  | ProjectSourceRevalidationBlockedResponse
  | ProjectSourceRevalidationErrorResponse;

function buildProjectSourceRevalidationRequestUrl(
  projectId: string,
  repositoryUrl: string,
  workingDirectory: string,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
): string {
  const searchParams = new URLSearchParams({
    projectId,
    repositoryUrl,
    workingDirectory,
    branchWorkMode: branchWorkMode ?? "main",
    workingBranchName,
  });

  return `/api/projects/${projectId}/working-branch/setup?${searchParams.toString()}`;
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

type GitHubMultiAccountAuthGuidanceSummary = {
  title: string;
  intro: string;
  bullets: string[];
  disclosure: string;
};

function buildGitHubMultiAccountAuthGuidanceSummary(
  hasRepositoryUrl: boolean,
): GitHubMultiAccountAuthGuidanceSummary | null {
  if (!hasRepositoryUrl) {
    return null;
  }

  return {
    title: "GitHub multi-account auth guidance",
    intro:
      "Przy wielu kontach GitHub przeglądarka może mieć poprawny dostęp, ale Git może używać złego credential.",
    bullets: [
      "SPS OS repo auth context i client/project repo auth context to dwa osobne konteksty.",
      "`Repository not found` dla prywatnego repo może oznaczać brak właściwego konta w Git, nie brak repo.",
      "`403 Permission denied` przy push może oznaczać zły account context albo brak uprawnień do zapisu.",
      "Praktyczny default dla Windows i Git Credential Manager to path-based credentials.",
      "`git config --global credential.https://github.com.useHttpPath true`",
      "Alternatywy: GitHub CLI account switching, jeśli gh jest zainstalowane, albo SSH host aliases z osobnymi keys.",
    ],
    disclosure:
      "To jest tylko guidance w UI. SPS OS nie przełącza credentiali automatycznie.",
  };
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

function buildGitHubConnectionReadinessSummaryWithSourceStatus(
  hasRepositoryUrl: boolean,
  sourceStatus: ProjectSourceReconciliationStatus | null,
): string[] | null {
  if (!hasRepositoryUrl) {
    return null;
  }

  if (sourceStatus) {
    return [
      "Adres repozytorium GitHub wykryty.",
      "Repo checkout został zrekonsyliowany jako osobny folder.",
      `Repo checkout path: ${sourceStatus.repoCheckoutPath}`,
      `Remote URL: ${sourceStatus.remoteUrl}`,
      `Active working branch: ${sourceStatus.activeBranch}`,
      `Working tree state: ${sourceStatus.workingTreeState}`,
    ];
  }

  return [
    "Adres repozytorium GitHub wykryty.",
    "Połączenie GitHub nie jest jeszcze potwierdzone ani zweryfikowane.",
    "Uwierzytelnienie i konfiguracja połączenia pozostają przyszłą pracą.",
    "Lokalny klon i prawdziwy workflow Git nie są jeszcze skonfigurowane.",
    "Przygotowanie gałęzi roboczej już istnieje, ale prawdziwe wykonanie Git jeszcze nie startuje.",
  ];
}

function buildLocalCloneReadinessSummaryWithSourceStatus(
  hasRepositoryUrl: boolean,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
  projectName: string,
  sourceStatus: ProjectSourceReconciliationStatus | null,
): string[] | null {
  if (!hasRepositoryUrl) {
    return null;
  }

  if (sourceStatus) {
    return [
      "Lokalny repo checkout jest już zrekonsyliowany.",
      `Repo checkout path: ${sourceStatus.repoCheckoutPath}`,
      `Remote URL: ${sourceStatus.remoteUrl}`,
      `Active working branch: ${sourceStatus.activeBranch}`,
      `Working tree state: ${sourceStatus.workingTreeState}`,
      "Manifest-only workspace folder pozostaje osobnym folderem projektu SPS OS.",
    ];
  }

  const preparedWorkingBranchName =
    workingBranchName.trim() || buildWorkingBranchName(projectName);

  return [
    "Lokalny klon / workspace nie jest jeszcze skonfigurowany ani zweryfikowany.",
    "Prawdziwe clone, fetch, checkout i walidacja filesystemu to przyszła praca.",
    branchWorkMode === "working-branch"
      ? `Przygotowana nazwa gałęzi roboczej to \`${preparedWorkingBranchName}\`, ale nadal jest tylko metadanymi przygotowania.`
      : branchWorkMode === "main"
        ? "Wybrano pracę na `main`, ale to nadal tylko metadane przygotowania lokalnego workspace."
        : "Wybór gałęzi roboczej pozostaje tylko metadanymi przygotowania lokalnego workspace.",
    "W tym kroku nie kopiujemy plików i nie klonujemy repozytorium.",
  ];
}

function buildGitHubReadinessChecklistWithSourceStatus(
  hasRepositoryUrl: boolean,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
  projectName: string,
  sourceStatus: ProjectSourceReconciliationStatus | null,
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
      status: sourceStatus ? "zrekonsyliowane" : "brak / wymagane",
    },
    {
      label: "Lokalny klon / workspace",
      status: sourceStatus ? "gotowy" : "brak / wymagane",
    },
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

type GitHubRealOperationAuthorizationState =
  | "authorization required"
  | "authorized to execute";

type GitHubRealOperationAuthorizationSummary = {
  status: GitHubRealOperationAuthorizationState;
  copy: string;
  disclosure: string;
  actionLabel: string;
};

type GitHubRealOperationPreflightCheck = {
  label: string;
  status: string;
};

type GitHubRealOperationPreflightSummary = {
  title: string;
  readyChecks: GitHubRealOperationPreflightCheck[];
  blockerChecks: GitHubRealOperationPreflightCheck[];
  disclosure: string;
};

type GitHubRealOperationReadinessDetailSummary = {
  title: string;
  note: string;
  disclosure: string;
};

type GitHubLocalWorkingBranchCreationOutcome =
  | "idle"
  | "blocked"
  | "running"
  | "error"
  | "success";

type GitHubLocalWorkingBranchSetupResponse =
  | {
      status: "success";
      message: string;
      workingDirectory: string;
      activeBranch: string;
      repoCheckoutPath: string;
      remoteUrl: string;
      workingTreeState: ProjectSourceWorkingTreeState;
      sourceStatus: "git-repo";
    }
  | {
      status: "blocked";
      message: string;
    }
  | {
      status: "error";
      message: string;
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

function buildGitHubRealOperationPreflightSummary(
  projectName: string,
  hasRepositoryUrl: boolean,
  branchWorkMode: ProjectBranchWorkMode | null,
  workingBranchName: string,
  selection: GitHubRealOperationSelection | null,
  candidateDecision: GitHubRealOperationCandidateDecision,
  authorization: GitHubRealOperationAuthorizationState,
): GitHubRealOperationPreflightSummary | null {
  if (
    !selection ||
    candidateDecision !== "approved for further preparation" ||
    authorization !== "authorized to execute"
  ) {
    return null;
  }

  const readyChecks: GitHubRealOperationPreflightCheck[] = [
    { label: "selected candidate", status: selection },
    { label: "decision", status: "approved for further preparation" },
    { label: "authorization", status: "authorized to execute" },
  ];
  const blockerChecks: GitHubRealOperationPreflightCheck[] = [
    { label: "real execution", status: "blocked" },
    {
      label: "Git/GitHub actions",
      status: "clone/fetch/checkout/branch/commit/push/PR not added",
    },
  ];

  if (hasRepositoryUrl) {
    readyChecks.push({ label: "Adres GitHub", status: "gotowy" });
  } else {
    blockerChecks.push({ label: "Adres GitHub", status: "brak" });
  }

  if (branchWorkMode === "main") {
    readyChecks.push({ label: "Tryb pracy gałęzi", status: "main" });
  } else if (branchWorkMode === "working-branch") {
    const preparedWorkingBranchName =
      workingBranchName.trim() || buildWorkingBranchName(projectName);

    readyChecks.push({ label: "Tryb pracy gałęzi", status: "working-branch" });

    if (workingBranchName.trim()) {
      readyChecks.push({
        label: "Nazwa gałęzi roboczej",
        status: preparedWorkingBranchName,
      });
    } else {
      blockerChecks.push({
        label: "Nazwa gałęzi roboczej",
        status: `brak, oczekiwano ${preparedWorkingBranchName}`,
      });
    }
  } else {
    blockerChecks.push({ label: "Tryb pracy gałęzi", status: "brak" });
  }

  return {
    title: "Lokalny preflight jest gotowy do oceny stanu i blokad.",
    readyChecks,
    blockerChecks,
    disclosure:
      "Realne wykonanie Git/GitHub pozostaje zablokowane. To nadal lokalny preflight oparty wyłącznie na UI/browser state.",
  };
}

const GITHUB_REAL_OPERATION_CANDIDATE_DECISION_STORAGE_SUFFIX =
  "github-real-operation-candidate-decision";
const GITHUB_REAL_OPERATION_AUTHORIZATION_STORAGE_SUFFIX =
  "github-real-operation-authorization";

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

function getGitHubRealOperationAuthorizationStorageKey(
  projectId: string,
  selection: GitHubRealOperationSelection,
): string {
  return `soft-premium-system.projects.${projectId}.${GITHUB_REAL_OPERATION_AUTHORIZATION_STORAGE_SUFFIX}.${selection}`;
}

function readGitHubRealOperationAuthorization(
  projectId: string,
  selection: GitHubRealOperationSelection | null,
): GitHubRealOperationAuthorizationState {
  if (typeof window === "undefined" || !selection) {
    return "authorization required";
  }

  const storedValue = localStorage.getItem(
    getGitHubRealOperationAuthorizationStorageKey(projectId, selection),
  );

  return storedValue === "authorized to execute"
    ? storedValue
    : "authorization required";
}

function saveGitHubRealOperationAuthorization(
  projectId: string,
  selection: GitHubRealOperationSelection,
  authorization: GitHubRealOperationAuthorizationState,
): void {
  localStorage.setItem(
    getGitHubRealOperationAuthorizationStorageKey(projectId, selection),
    authorization,
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

function buildGitHubRealOperationAuthorizationSummary(
  selection: GitHubRealOperationSelection | null,
  candidateDecision: GitHubRealOperationCandidateDecision,
  authorization: GitHubRealOperationAuthorizationState,
): GitHubRealOperationAuthorizationSummary | null {
  if (!selection || candidateDecision !== "approved for further preparation") {
    return null;
  }

  const isAuthorized = authorization === "authorized to execute";

  return {
    status: authorization,
    copy: isAuthorized
      ? `authorization required: fulfilled. authorized to execute: ${selection}. real execution remains blocked.`
      : `authorization required: pending. selected candidate: ${selection}. real execution remains blocked.`,
    disclosure:
      "To nadal lokalny stan decyzji. Realne wykonanie Git/GitHub pozostaje zablokowane w aplikacji na tym etapie.",
    actionLabel: "Oznacz jako authorized to execute",
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
    const storedWorkingBranchName =
      readProjectWorkingBranchName(params.id) ?? "";

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
  const [githubRealOperationAuthorization, setGithubRealOperationAuthorization] =
    useState<GitHubRealOperationAuthorizationState>("authorization required");
  const [githubLocalWorkingBranchCreationOutcome, setGithubLocalWorkingBranchCreationOutcome] =
    useState<GitHubLocalWorkingBranchCreationOutcome>("idle");
  const [projectSourceStatus, setProjectSourceStatus] =
    useState<ProjectSourceReconciliationStatus | null>(null);

  useEffect(() => {
    const nextProject = getProjectById(params.id);
    const nextBranchWorkMode = readProjectBranchWorkMode(params.id);
    const storedWorkingBranchName =
      readProjectWorkingBranchName(params.id) ?? "";

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
    setGithubRealOperationAuthorization("authorization required");
    setGithubLocalWorkingBranchCreationOutcome("idle");
    setProjectSourceStatus(null);
    setFeedbackMessage(null);
  }, [params.id]);

  useEffect(() => {
    let ignore = false;

    async function loadRevalidatedSourceStatus() {
      const repositoryUrl = project?.repositoryUrl?.trim() ?? "";
      const workingDirectory = project?.workingDirectory?.trim() ?? "";

      if (!repositoryUrl || !workingDirectory) {
        clearProjectSourceStatus(params.id);
        if (!ignore) {
          setProjectSourceStatus(null);
        }
        return;
      }

      try {
        const response = await fetch(
          buildProjectSourceRevalidationRequestUrl(
            params.id,
            repositoryUrl,
            workingDirectory,
            branchWorkMode,
            workingBranchName.trim(),
          ),
        );
        const payload =
          (await response.json()) as ProjectSourceRevalidationResponse;

        if (ignore) {
          return;
        }

        if (response.ok && payload.status === "success") {
          const nextSourceStatus: ProjectSourceReconciliationStatus = {
            sourceStatus: "git-repo",
            repoCheckoutPath: payload.repoCheckoutPath,
            remoteUrl: payload.remoteUrl,
            activeBranch: payload.activeBranch,
            workingTreeState: payload.workingTreeState,
          };

          saveProjectSourceStatus(params.id, nextSourceStatus);
          setProjectSourceStatus(nextSourceStatus);
          return;
        }

        clearProjectSourceStatus(params.id);
        setProjectSourceStatus(null);
      } catch {
        if (!ignore) {
          clearProjectSourceStatus(params.id);
          setProjectSourceStatus(null);
        }
      }
    }

    void loadRevalidatedSourceStatus();

    return () => {
      ignore = true;
    };
  }, [
    branchWorkMode,
    params.id,
    project?.repositoryUrl,
    project?.workingDirectory,
    workingBranchName,
  ]);

  useEffect(() => {
    setGithubLocalWorkingBranchCreationOutcome("idle");
  }, [
    project?.repositoryUrl,
    project?.workingDirectory,
    branchWorkMode,
    workingBranchName,
    githubRealOperationSelection,
    githubRealOperationCandidateDecision,
    githubRealOperationAuthorization,
  ]);

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

  const reconciledSourceStatus =
    projectSourceStatus?.sourceStatus === "git-repo"
      ? projectSourceStatus
      : null;
  const summary = reconciledSourceStatus
    ? {
        status: "local-source" as const,
        statusLabel: "repo checkout potwierdzony",
        githubUrlLabel: `Adres GitHub: ${project.repositoryUrl?.trim() ? "podany" : "nie podano"}`,
        localRepositoryLabel: "Lokalne repo Git: obecne",
        nextStepLabel:
          "local clone/branch setup: completed. Commit/push/merge/PR pozostają poza zakresem.",
        repositoryContextMessage: `Kontekst repozytorium: repo checkout folder ${reconciledSourceStatus.repoCheckoutPath}; manifest-only workspace folder pozostaje osobnym folderem projektu SPS OS.`,
      }
    : getProjectBindingDecisionSummary(project);
  const deleteValidationSummary = getProjectDeleteValidationSummary(project);
  const branchWorkModeSummary = buildBranchWorkModeSummary(
    project.name,
    branchWorkMode,
    workingBranchName,
  );
  const githubConnectionReadinessSummary =
    buildGitHubConnectionReadinessSummaryWithSourceStatus(
      Boolean(project.repositoryUrl?.trim()),
      reconciledSourceStatus,
    );
  const githubMultiAccountAuthGuidanceSummary =
    buildGitHubMultiAccountAuthGuidanceSummary(
      Boolean(project.repositoryUrl?.trim()),
    );
  const localCloneReadinessSummary =
    buildLocalCloneReadinessSummaryWithSourceStatus(
      Boolean(project.repositoryUrl?.trim()),
      branchWorkMode,
      workingBranchName,
      project.name,
      reconciledSourceStatus,
    );
  const githubReadinessChecklist =
    buildGitHubReadinessChecklistWithSourceStatus(
      Boolean(project.repositoryUrl?.trim()),
      branchWorkMode,
      workingBranchName,
      project.name,
      reconciledSourceStatus,
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
  const githubRealOperationAuthorizationSummary =
    buildGitHubRealOperationAuthorizationSummary(
      githubRealOperationSelection,
      githubRealOperationCandidateDecision,
      githubRealOperationAuthorization,
    );
  const githubRealOperationPreflightSummary =
    buildGitHubRealOperationPreflightSummary(
      project.name,
      Boolean(project.repositoryUrl?.trim()),
      branchWorkMode,
      workingBranchName,
      githubRealOperationSelection,
      githubRealOperationCandidateDecision,
      githubRealOperationAuthorization,
    );
  const githubRealOperationReadinessDetailSummary =
    buildGitHubRealOperationReadinessDetailSummary(
      githubRealOperationSelection,
    );
  const repoCheckoutDirectoryHint = buildRepoCheckoutDirectoryHint(project);
  const resolvedRepoCheckoutDirectory = resolveRepoCheckoutDirectory(
    project,
    workingDirectoryInput,
  );
  const githubLocalWorkingBranchCreationActionCanRun =
    Boolean(githubRealOperationPreflightSummary) &&
    branchWorkMode === "working-branch" &&
    Boolean(resolvedRepoCheckoutDirectory) &&
    Boolean(workingBranchName.trim());
  const githubLocalWorkingBranchCreationActionState =
    githubLocalWorkingBranchCreationOutcome === "success"
      ? "success"
      : githubLocalWorkingBranchCreationOutcome === "running"
        ? "running"
        : githubLocalWorkingBranchCreationOutcome === "blocked"
          ? "blocked"
        : githubLocalWorkingBranchCreationOutcome === "error"
          ? "error"
          : githubLocalWorkingBranchCreationActionCanRun
            ? "ready"
            : "blocked";

  function handleSaveGithubUrl() {
    const trimmedGithubUrl = githubUrlInput.trim();

    const nextProject = saveProjectBinding(project, {
      ...(trimmedGithubUrl ? { repositoryUrl: trimmedGithubUrl } : {}),
    });

    setProject(nextProject);
    clearProjectSourceStatus(params.id);
    setProjectSourceStatus(null);
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

    if (isManifestOnlyWorkspaceDirectory(project, trimmedWorkingDirectory)) {
      setFeedbackMessage(
        `Ten katalog wskazuje folder manifest-only. Użyj ${buildRepoCheckoutDirectory(
          project.workingDirectory ?? trimmedWorkingDirectory,
        )} jako repo checkout.`,
      );
      return;
    }

    const nextProject = saveProjectBinding(project, {
      workingDirectory: trimmedWorkingDirectory,
    });

    setProject(nextProject);
    clearProjectSourceStatus(params.id);
    setProjectSourceStatus(null);
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
    setGithubRealOperationAuthorization(
      readGitHubRealOperationAuthorization(params.id, nextSelection),
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

  function handleAuthorizeGitHubRealOperationCandidate() {
    if (
      !githubRealOperationSelection ||
      githubRealOperationCandidateDecision !==
        "approved for further preparation"
    ) {
      return;
    }

    saveGitHubRealOperationAuthorization(
      params.id,
      githubRealOperationSelection,
      "authorized to execute",
    );
    setGithubRealOperationAuthorization("authorized to execute");
    setFeedbackMessage(
      "Lokalny stan ustawiono na authorized to execute. Realne wykonanie nadal pozostaje zablokowane.",
    );
  }

  async function handleCreateLocalWorkingBranchAction() {
    const savedWorkingDirectory = resolvedRepoCheckoutDirectory;
    const savedWorkingBranchName = workingBranchName.trim();

    if (!githubRealOperationPreflightSummary) {
      setGithubLocalWorkingBranchCreationOutcome("blocked");
      setFeedbackMessage(
        "Akcja lokalnego klonu i gałęzi roboczej jest zablokowana do czasu preflight i autoryzacji. Realne wykonanie Git/GitHub pozostaje zablokowane.",
      );
      return;
    }

    if (branchWorkMode !== "working-branch" || !savedWorkingBranchName) {
      setGithubLocalWorkingBranchCreationOutcome("error");
      setFeedbackMessage(
        "Brakuje ustawień SPS OS potrzebnych do lokalnego klonu i gałęzi roboczej. Sama nazwa gałęzi nie tworzy gałęzi.",
      );
      return;
    }

    if (!savedWorkingDirectory) {
      setGithubLocalWorkingBranchCreationOutcome("blocked");
      setFeedbackMessage(
        "Brakuje zapisanego local workspace path. Akcja pozostaje zablokowana, a realne clone/checkout/branch nadal nie startują.",
      );
      return;
    }

    setGithubLocalWorkingBranchCreationOutcome("running");
    setFeedbackMessage(
      "SPS OS uruchamia lokalny clone i working branch setup. Commit/push/merge/PR nadal pozostają poza zakresem.",
    );

    try {
      const response = await fetch(
        `/api/projects/${params.id}/working-branch/setup`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            projectId: params.id,
            repositoryUrl: project.repositoryUrl?.trim() ?? "",
            workingDirectory: savedWorkingDirectory,
            branchWorkMode,
            workingBranchName: savedWorkingBranchName,
            candidateDecision: githubRealOperationCandidateDecision,
            authorization: githubRealOperationAuthorization,
          }),
        },
      );
      const payload =
        (await response.json()) as GitHubLocalWorkingBranchSetupResponse;

      if (response.ok && payload.status === "success") {
        setGithubLocalWorkingBranchCreationOutcome("success");
        saveProjectSourceStatus(params.id, {
          sourceStatus: "git-repo",
          repoCheckoutPath: payload.repoCheckoutPath,
          remoteUrl: payload.remoteUrl,
          activeBranch: payload.activeBranch,
          workingTreeState: payload.workingTreeState,
        });
        setProjectSourceStatus({
          sourceStatus: "git-repo",
          repoCheckoutPath: payload.repoCheckoutPath,
          remoteUrl: payload.remoteUrl,
          activeBranch: payload.activeBranch,
          workingTreeState: payload.workingTreeState,
        });
        setFeedbackMessage(
          `${payload.message} Repo checkout path: ${payload.repoCheckoutPath}. Remote URL: ${payload.remoteUrl}. Active branch: ${payload.activeBranch}. Working tree state: ${payload.workingTreeState}.`,
        );
        return;
      }

      if (response.status === 409 && payload.status === "blocked") {
        setGithubLocalWorkingBranchCreationOutcome("blocked");
        setFeedbackMessage(payload.message);
        return;
      }

      setGithubLocalWorkingBranchCreationOutcome("error");
      setFeedbackMessage(
        payload.message ||
          "Akcja lokalnego klonu i gałęzi roboczej napotkała błąd.",
      );
    } catch {
      setGithubLocalWorkingBranchCreationOutcome("error");
      setFeedbackMessage(
        "Akcja lokalnego klonu i gałęzi roboczej napotkała błąd komunikacji z API.",
      );
    }
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
            {reconciledSourceStatus
              ? "Projekt ma workspace SPS i zrekonsyliowane repo checkout. Folder projektu SPS OS z sps-project.json nadal istnieje, ale repo checkout jest osobnym folderem."
              : "Projekt ma tylko manifest SPS. Możesz zostawić go jako manifest, podpiąć istniejący katalog repo albo dodać adres GitHub."}
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

        <div className="rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
            Bezpieczny kontrakt usuwania
          </p>
          <p className="mt-2 text-sm text-amber-50">
            To jest tylko podgląd. Destrukcyjne usunięcie będzie możliwe
            dopiero po osobnej decyzji Product Ownera.
          </p>
          <div className="mt-3 space-y-2 text-sm text-amber-100">
            <p>Projekt: {deleteValidationSummary.projectName}</p>
            <p>
              Odpięcie z SPS OS: {deleteValidationSummary.registryRemovalNote}
            </p>
            <p>
              Browser/localStorage:{" "}
              {deleteValidationSummary.browserStateRemovalNote}
            </p>
            <p>
              Project Brain metadata root:{" "}
              {deleteValidationSummary.projectMetadataRootPath}
            </p>
            <p>
              Katalog roboczy: {deleteValidationSummary.projectWorkspacePath}
            </p>
            <p>Repo checkout: {deleteValidationSummary.projectCheckoutPath}</p>
          </div>
          <p className="mt-3 text-sm text-amber-100">
            {deleteValidationSummary.destructiveDeleteConfirmation}
          </p>
          <ul className="mt-3 space-y-2">
            {deleteValidationSummary.notes.map((note) => (
              <li key={note} className="text-sm text-amber-100">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {reconciledSourceStatus ? (
          <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
              Post-clone source status
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
              Status repo zweryfikowany z filesystemu
            </p>
            <p className="mt-2 text-sm text-emerald-100">
              Local git repo present
            </p>
            <div className="mt-3 space-y-1 text-sm text-emerald-200">
              <p>
                Project workspace folder: {project.workingDirectory ?? "brak"}
              </p>
              <p>
                Repo checkout folder: {reconciledSourceStatus.repoCheckoutPath}
              </p>
              <p>GitHub remote URL: {reconciledSourceStatus.remoteUrl}</p>
              <p>
                Active working branch: {reconciledSourceStatus.activeBranch}
              </p>
              <p>
                Working tree state: {reconciledSourceStatus.workingTreeState}
              </p>
            </div>
            <p className="mt-3 text-sm text-emerald-200">
              Manifest-only workspace folder pozostaje osobnym folderem projektu
              SPS OS, ale repo checkout jest już rozpoznane osobno.
            </p>
          </div>
        ) : null}

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
            {!reconciledSourceStatus && repoCheckoutDirectoryHint ? (
              <p className="mt-2 text-sm text-zinc-400">
                Folder projektu SPS OS to manifest-only. Sugerowany katalog repo checkout to{" "}
                <span className="text-zinc-200">{repoCheckoutDirectoryHint}</span>.
                Samo ustawienie katalogu repo nie wykonuje jeszcze clone.
              </p>
            ) : null}
            {!reconciledSourceStatus &&
            isManifestOnlyWorkspaceDirectory(project, workingDirectoryInput) ? (
              <p className="mt-2 text-sm text-amber-200">
                Ten katalog wskazuje folder manifest-only. Użyj{" "}
                <span className="text-amber-100">
                  {buildRepoCheckoutDirectory(project.workingDirectory ?? workingDirectoryInput)}
                </span>{" "}
                jako repo checkout.
              </p>
            ) : null}
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

        {githubMultiAccountAuthGuidanceSummary ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              GitHub multi-account auth guidance
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {githubMultiAccountAuthGuidanceSummary.intro}
            </p>
            <ul className="mt-3 space-y-2">
              {githubMultiAccountAuthGuidanceSummary.bullets.map((line) => (
                <li key={line} className="text-sm text-zinc-400">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-zinc-400">
              {githubMultiAccountAuthGuidanceSummary.disclosure}
            </p>
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
              {githubRealOperationAuthorizationSummary ? (
                <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Bramka autoryzacji
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    selected candidate: {githubRealOperationSelection}
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">
                    authorization:{" "}
                    {githubRealOperationAuthorizationSummary.status}
                  </p>
                  <button
                    type="button"
                    onClick={handleAuthorizeGitHubRealOperationCandidate}
                    className="mt-3 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition hover:border-zinc-500"
                  >
                    {githubRealOperationAuthorizationSummary.actionLabel}
                  </button>
                  <p className="mt-3 text-sm text-zinc-400">
                    {githubRealOperationAuthorizationSummary.copy}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {githubRealOperationAuthorizationSummary.disclosure}
                  </p>
                </div>
              ) : null}
              {githubRealOperationPreflightSummary ? (
                <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Preflight pierwszej autoryzowanej operacji
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    {githubRealOperationPreflightSummary.title}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {githubRealOperationPreflightSummary.disclosure}
                  </p>
                  <div className="mt-4 grid gap-3 lg:grid-cols-2">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Gotowe lokalnie
                      </p>
                      <ul className="mt-3 space-y-2">
                        {githubRealOperationPreflightSummary.readyChecks.map(
                          (check) => (
                            <li key={check.label} className="text-sm text-zinc-300">
                              {check.label}: {check.status}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Wciąż blokuje
                      </p>
                      <ul className="mt-3 space-y-2">
                        {githubRealOperationPreflightSummary.blockerChecks.map(
                          (check) => (
                            <li key={check.label} className="text-sm text-zinc-300">
                              {check.label}: {check.status}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                  {branchWorkMode === "working-branch" ? (
                    <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Akcja lokalnego klonu i gałęzi roboczej
                      </p>
                      <p className="mt-2 text-sm text-zinc-300">
                        To osobny krok SPS OS oparty na zapisanych ustawieniach projektu: adresie GitHub, local workspace path i nazwie gałęzi roboczej. Sama nazwa gałęzi nie tworzy gałęzi.
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">
                        local clone/branch setup: completed. Commit/push/merge/PR pozostają poza zakresem.
                      </p>
                      <p className="mt-3 text-sm text-zinc-300" aria-live="polite">
                        Stan akcji: {githubLocalWorkingBranchCreationActionState}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        Repo checkout path:{" "}
                        {resolvedRepoCheckoutDirectory || "brak"}
                        . working branch name:{" "}
                        {workingBranchName.trim() || "brak"}
                      </p>
                      <button
                        type="button"
                        onClick={handleCreateLocalWorkingBranchAction}
                        disabled={!githubLocalWorkingBranchCreationActionCanRun}
                        className="mt-3 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Utwórz lokalny klon i gałąź roboczą
                      </button>
                      <p className="mt-3 text-sm text-zinc-400">
                        {githubLocalWorkingBranchCreationActionState === "success"
                          ? "Lokalne clone/branch setup zakończone. Commit/push/merge/PR pozostają poza zakresem."
                          : githubLocalWorkingBranchCreationActionState === "running"
                            ? "Akcja jest uruchomiona i czeka na odpowiedź API."
                            : githubLocalWorkingBranchCreationActionState ===
                                "blocked"
                              ? "Akcja została zablokowana. Sprawdź komunikat powyżej."
                            : githubLocalWorkingBranchCreationActionState === "error"
                              ? "Akcja nie mogła przejść dalej. To nadal tylko lokalna ścieżka aplikacji."
                              : githubLocalWorkingBranchCreationActionCanRun
                                ? "Ustawienia są gotowe do wykonania osobnego kroku SPS OS."
                                : "Akcja jest zablokowana do czasu zapisania lokalnego workspace path."}
                      </p>
                    </div>
                  ) : null}
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

        {!reconciledSourceStatus ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Pozostaw jako manifest-only
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Jeśli nie zapiszesz żadnych nowych metadanych, projekt pozostanie
              w trybie manifest-only.
            </p>
          </div>
        ) : null}

        {feedbackMessage ? (
          <p className="text-sm text-emerald-200" aria-live="polite">
            {feedbackMessage}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
