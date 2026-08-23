import { basename, join } from "node:path";

import { buildRepoCheckoutDirectory } from "./source-status";
import type { Project } from "./types";
import type { ProjectSourceReconciliationStatus } from "./source-status";

const PROJECTS_STORAGE_KEY = "soft-premium-system.projects";
const PROJECT_SCOPED_STORAGE_SUFFIXES = ["tasks", "knowledge"] as const;

function normalizeProjectId(projectId: string): string {
  return projectId.trim();
}

function normalizeProjectName(projectName: string): string {
  return projectName.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizeProjectWorkingDirectory(
  workingDirectory?: string,
): string {
  return workingDirectory?.trim().toLowerCase() ?? "";
}

export type ProjectSourceBindingStatus =
  | "manifest-only"
  | "local-source"
  | "git-repo"
  | "unknown";

export type ProjectSourceBindingSummary = {
  status: ProjectSourceBindingStatus;
  statusLabel: string;
  gitLabel: string;
  repositoryContextMessage: string;
};

export function getProjectSourceBindingSummary(
  project: Project | null | undefined,
): ProjectSourceBindingSummary {
  const hasRepositoryUrl = Boolean(project?.repositoryUrl?.trim());
  const hasWorkingDirectory = Boolean(project?.workingDirectory?.trim());
  const filesystemStatus = project?.projectFilesystemStatus ?? "unknown";

  if (hasRepositoryUrl) {
    return {
      status: "git-repo",
      statusLabel: "repozytorium Git",
      gitLabel: ".git: obecny",
      repositoryContextMessage: "Kontekst repozytorium: dostępny",
    };
  }

  if (filesystemStatus === "manifest-present") {
    return {
      status: "manifest-only",
      statusLabel: "tylko manifest",
      gitLabel: ".git: brak",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: projekt ma manifest SPS, ale nie ma lokalnego repo Git.",
    };
  }

  if (hasWorkingDirectory) {
    return {
      status: "local-source",
      statusLabel: "lokalne źródło",
      gitLabel: ".git: brak",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: lokalna ścieżka istnieje, ale brak lokalnego repo Git.",
    };
  }

  return {
    status: "unknown",
    statusLabel: "nieznany",
    gitLabel: ".git: nieznany",
    repositoryContextMessage:
      "Kontekst repozytorium niedostępny: brak wystarczających danych o źródle.",
  };
}

export type ProjectBindingDecisionStatus =
  | "manifest-only"
  | "github-url-known"
  | "local-source"
  | "unknown";

export type ProjectBindingDecisionSummary = {
  status: ProjectBindingDecisionStatus;
  statusLabel: string;
  githubUrlLabel: string;
  localRepositoryLabel: string;
  nextStepLabel: string;
  repositoryContextMessage: string;
};

export function getProjectBindingDecisionSummary(
  project: Project | null | undefined,
  sourceStatus: ProjectSourceReconciliationStatus | null = null,
): ProjectBindingDecisionSummary {
  const hasRepositoryUrl = Boolean(project?.repositoryUrl?.trim());
  const hasWorkingDirectory = Boolean(project?.workingDirectory?.trim());
  const filesystemStatus = project?.projectFilesystemStatus ?? "unknown";

  if (sourceStatus) {
    return {
      status: "local-source",
      statusLabel: "repo checkout potwierdzony",
      githubUrlLabel: `Adres GitHub: ${hasRepositoryUrl ? "podany" : "nie podano"}`,
      localRepositoryLabel: "Lokalne repo Git: obecne",
      nextStepLabel:
        "local clone/branch setup: completed. Commit/push/merge/PR pozostają poza zakresem.",
      repositoryContextMessage: `Kontekst repozytorium: repo checkout folder ${sourceStatus.repoCheckoutPath}; manifest-only workspace folder pozostaje osobnym folderem projektu SPS OS.`,
    };
  }

  if (hasRepositoryUrl) {
    return {
      status: "github-url-known",
      statusLabel: "adres GitHub podany",
      githubUrlLabel: "Adres GitHub: podany",
      localRepositoryLabel: "Lokalne repo Git: nadal niedostępne",
      nextStepLabel:
        "Import/clone wymaga osobnego zatwierdzenia. Możesz też wskazać istniejący lokalny katalog repo.",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: adres GitHub jest zapisany, ale lokalne repo Git nadal nie jest dostępne.",
    };
  }

  if (filesystemStatus === "manifest-present") {
    return {
      status: "manifest-only",
      statusLabel: "tylko manifest",
      githubUrlLabel: "Adres GitHub: nie podano",
      localRepositoryLabel: "Lokalne repo Git: niedostępne",
      nextStepLabel:
        "Następny krok: podaj adres GitHub lub wskaż istniejący katalog repo.",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: projekt ma manifest SPS, ale nie ma lokalnego repo Git.",
    };
  }

  if (hasWorkingDirectory) {
    return {
      status: "local-source",
      statusLabel: "lokalne źródło",
      githubUrlLabel: "Adres GitHub: nie podano",
      localRepositoryLabel: "Lokalne repo Git: niedostępne",
      nextStepLabel:
        "Następny krok: podaj adres GitHub lub wskaż istniejący katalog repo.",
      repositoryContextMessage:
        "Kontekst repozytorium niedostępny: lokalna ścieżka istnieje, ale brak lokalnego repo Git.",
    };
  }

  return {
    status: "unknown",
    statusLabel: "nieznany",
    githubUrlLabel: "Adres GitHub: nieznany",
    localRepositoryLabel: "Lokalne repo Git: nieznane",
    nextStepLabel:
      "Następny krok: podaj adres GitHub lub wskaż istniejący katalog repo.",
    repositoryContextMessage:
      "Kontekst repozytorium niedostępny: brak wystarczających danych o źródle.",
  };
}

export function areProjectsSameIdentity(
  leftProject: Project,
  rightProject: Project,
): boolean {
  const leftProjectId = normalizeProjectId(leftProject.id);
  const rightProjectId = normalizeProjectId(rightProject.id);

  if (leftProjectId && rightProjectId && leftProjectId === rightProjectId) {
    return true;
  }

  const leftWorkingDirectory = normalizeProjectWorkingDirectory(
    leftProject.workingDirectory,
  );
  const rightWorkingDirectory = normalizeProjectWorkingDirectory(
    rightProject.workingDirectory,
  );

  if (
    leftWorkingDirectory &&
    rightWorkingDirectory &&
    leftWorkingDirectory === rightWorkingDirectory
  ) {
    return true;
  }

  const leftName = normalizeProjectName(leftProject.name);
  const rightName = normalizeProjectName(rightProject.name);

  return Boolean(
    leftName &&
      rightName &&
      leftName === rightName &&
      (!leftWorkingDirectory || !rightWorkingDirectory),
  );
}

export function findMatchingProject(
  projects: Project[],
  candidateProject: Project,
): Project | null {
  const candidateWorkingDirectory = normalizeProjectWorkingDirectory(
    candidateProject.workingDirectory,
  );

  if (!candidateWorkingDirectory) {
    return null;
  }

  return (
    projects.find(
      (project) =>
        normalizeProjectWorkingDirectory(project.workingDirectory) ===
        candidateWorkingDirectory,
    ) ?? null
  );
}

export function buildDefaultWorkingDirectory(projectName: string): string {
  const slug = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `C:\\SPS_OS_WORK\\${slug || "project"}`;
}

function slugifyMetadataRootSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getShortProjectId(projectId: string): string {
  return projectId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase();
}

function buildProjectMetadataRootPath(project: Project): string {
  const workingDirectorySlug = basename(project.workingDirectory ?? "").trim();
  const readableRootSegment = slugifyMetadataRootSegment(
    workingDirectorySlug || project.name,
  );
  const shortProjectId = getShortProjectId(project.id);

  if (!shortProjectId) {
    return join("C:\\SPS_OS_WORK\\.sps-meta", readableRootSegment || project.id);
  }

  return join(
    "C:\\SPS_OS_WORK\\.sps-meta",
    `${readableRootSegment || "project"}--${shortProjectId}`,
  );
}

export type ProjectDeleteValidationSummary = {
  projectName: string;
  projectWorkspacePath: string;
  projectCheckoutPath: string;
  projectMetadataRootPath: string;
  registryRemovalNote: string;
  browserStateRemovalNote: string;
  destructiveDeleteConfirmation: string;
  notes: string[];
};

export function getProjectDeleteValidationSummary(
  project: Project,
): ProjectDeleteValidationSummary {
  const projectWorkspacePath =
    project.workingDirectory?.trim() || buildDefaultWorkingDirectory(project.name);
  const projectCheckoutPath = buildRepoCheckoutDirectory(projectWorkspacePath);
  const projectMetadataRootPath = buildProjectMetadataRootPath(project);

  return {
    projectName: project.name.trim(),
    projectWorkspacePath,
    projectCheckoutPath,
    projectMetadataRootPath,
    registryRemovalNote:
      "Odpięcie projektu usuwa wpis projektu z lokalnego rejestru SPS OS oraz z serwera projektu.",
    browserStateRemovalNote:
      "Stan przeglądarki i localStorage pozostaje osobnym zasobem i wymaga osobnego czyszczenia.",
    destructiveDeleteConfirmation: `Aby wykonać destrukcyjne usunięcie dyskowe, trzeba potwierdzić dokładną nazwę projektu: ${project.name.trim()}.`,
    notes: [
      "Project Brain metadata root jest osobnym zasobem i nie jest częścią repo klienta.",
      "Katalog roboczy / repo checkout jest osobnym zasobem filesystemowym.",
      "Usunięcie klienta i usunięcie katalogu dyskowego to dwa różne kroki.",
    ],
  };
}

function determineProjectBrainStatus(workingDirectory: string): "available" | "pending" {
  return workingDirectory.trim().length > 0 ? "available" : "pending";
}

function canRepairProjectBrainStatus(project: Project): boolean {
  return (
    project.projectBrainStatus === "pending" &&
    typeof project.workingDirectory === "string" &&
    project.workingDirectory.trim().length > 0
  );
}

function persistProjects(projects: Project[]): void {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

function readStoredCollection<T>(storageKey: string): T[] {
  const savedCollection = localStorage.getItem(storageKey);

  if (!savedCollection) {
    return [];
  }

  try {
    const parsedCollection = JSON.parse(savedCollection) as unknown;

    return Array.isArray(parsedCollection) ? (parsedCollection as T[]) : [];
  } catch {
    return [];
  }
}

function mergeStoredCollections<T extends { id: string }>(
  targetCollection: T[],
  sourceCollection: T[],
): T[] {
  const mergedCollection = [...targetCollection];
  const mergedItemIds = new Set(targetCollection.map((item) => item.id));

  for (const sourceItem of sourceCollection) {
    if (mergedItemIds.has(sourceItem.id)) {
      continue;
    }

    mergedItemIds.add(sourceItem.id);
    mergedCollection.push(sourceItem);
  }

  return mergedCollection;
}

function rebindStoredCollectionProjectId<
  T extends { id: string; projectId: string },
>(collection: T[], targetProjectId: string): T[] {
  return collection.map((item) =>
    item.projectId === targetProjectId
      ? item
      : ({
          ...item,
          projectId: targetProjectId,
        } as T),
  );
}

type ProjectRebinding = {
  sourceProjectId: string;
  targetProjectId: string;
};

function rebindProjectScopedCollections(
  sourceProjectId: string,
  targetProjectId: string,
): void {
  const normalizedSourceProjectId = normalizeProjectId(sourceProjectId);
  const normalizedTargetProjectId = normalizeProjectId(targetProjectId);

  if (!normalizedSourceProjectId || normalizedSourceProjectId === normalizedTargetProjectId) {
    return;
  }

  for (const suffix of PROJECT_SCOPED_STORAGE_SUFFIXES) {
    const sourceStorageKey = `soft-premium-system.projects.${normalizedSourceProjectId}.${suffix}`;
    const targetStorageKey = `soft-premium-system.projects.${normalizedTargetProjectId}.${suffix}`;
    const sourceStorageValue = localStorage.getItem(sourceStorageKey);
    const targetStorageValue = localStorage.getItem(targetStorageKey);

    if (sourceStorageValue === null && targetStorageValue === null) {
      continue;
    }

    const sourceCollection = rebindStoredCollectionProjectId(
      readStoredCollection<{ id: string; projectId: string }>(sourceStorageKey),
      normalizedTargetProjectId,
    );
    const targetCollection = rebindStoredCollectionProjectId(
      readStoredCollection<{ id: string; projectId: string }>(targetStorageKey),
      normalizedTargetProjectId,
    );
    const mergedCollection = mergeStoredCollections(
      targetCollection,
      sourceCollection,
    );

    localStorage.setItem(targetStorageKey, JSON.stringify(mergedCollection));
    localStorage.removeItem(sourceStorageKey);
  }
}

function mergeProjectRecords(
  existingProject: Project,
  incomingProject: Project,
): Project {
  return {
    ...existingProject,
    ...incomingProject,
    id: existingProject.id,
    name: incomingProject.name.trim() || existingProject.name,
    workingDirectory:
      incomingProject.workingDirectory?.trim() ||
      existingProject.workingDirectory ||
      buildDefaultWorkingDirectory(incomingProject.name),
    projectBrainStatus:
      incomingProject.projectBrainStatus ?? existingProject.projectBrainStatus,
    projectFilesystemStatus:
      incomingProject.projectFilesystemStatus ??
      existingProject.projectFilesystemStatus,
    createdAt: existingProject.createdAt,
  };
}

type NormalizedProjectList = {
  projects: Project[];
  projectRebindings: ProjectRebinding[];
};

function normalizeProjectList(projects: Project[]): NormalizedProjectList {
  const normalizedProjects: Project[] = [];
  const projectRebindings: ProjectRebinding[] = [];

  for (const project of projects) {
    const matchIndex = normalizedProjects.findIndex((savedProject) =>
      areProjectsSameIdentity(savedProject, project),
    );

    if (matchIndex === -1) {
      normalizedProjects.push(project);
      continue;
    }

    const mergedProject = mergeProjectRecords(
      normalizedProjects[matchIndex],
      project,
    );
    if (mergedProject.id !== project.id) {
      projectRebindings.push({
        sourceProjectId: project.id,
        targetProjectId: mergedProject.id,
      });
    }
    normalizedProjects[matchIndex] = mergedProject;
  }

  return {
    projects: normalizedProjects,
    projectRebindings,
  };
}

function repairProjectBrainStatus(project: Project): Project {
  if (!canRepairProjectBrainStatus(project)) {
    return project;
  }

  const repairedProject: Project = {
    ...project,
    projectBrainStatus: "available",
  };
  const projects = getProjects();
  const updatedProjects = projects.map((savedProject) =>
    savedProject.id === project.id ? repairedProject : savedProject,
  );

  persistProjects(updatedProjects);

  return repairedProject;
}

export function getProjects(): Project[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (!savedProjects) {
    return [];
  }

  const parsedProjects = JSON.parse(savedProjects) as Project[];
  const { projects: normalizedProjects, projectRebindings } =
    normalizeProjectList(parsedProjects);
  const normalizedSerializedProjects = JSON.stringify(normalizedProjects);

  for (const rebinding of projectRebindings) {
    rebindProjectScopedCollections(
      rebinding.sourceProjectId,
      rebinding.targetProjectId,
    );
  }

  if (normalizedSerializedProjects !== savedProjects) {
    persistProjects(normalizedProjects);
  }

  return normalizedProjects;
}

export function getProjectById(id: string): Project | null {
  const projects = getProjects();
  const project = projects.find((savedProject) => savedProject.id === id) ?? null;

  return project ? repairProjectBrainStatus(project) : null;
}

export function createProject(
  name: string,
  id = crypto.randomUUID(),
  repositoryUrl?: string,
  workingDirectory?: string,
  projectFilesystemStatus?: Project["projectFilesystemStatus"],
): Project {
  const existingProjects = getProjects();
  const normalizedRepositoryUrl = repositoryUrl?.trim();
  const normalizedWorkingDirectory =
    workingDirectory?.trim() || buildDefaultWorkingDirectory(name);
  const newProject: Project = {
    id,
    name,
    ...(normalizedRepositoryUrl ? { repositoryUrl: normalizedRepositoryUrl } : {}),
    workingDirectory: normalizedWorkingDirectory,
    projectBrainStatus: determineProjectBrainStatus(normalizedWorkingDirectory),
    projectFilesystemStatus: projectFilesystemStatus ?? "unknown",
    createdAt: new Date().toISOString(),
  };

  const {
    projects: updatedProjects,
    projectRebindings,
  } = normalizeProjectList([...existingProjects, newProject]);
  const canonicalProject =
    findMatchingProject(updatedProjects, newProject) ??
    updatedProjects[updatedProjects.length - 1] ??
    newProject;

  persistProjects(updatedProjects);
  for (const rebinding of projectRebindings) {
    rebindProjectScopedCollections(
      rebinding.sourceProjectId,
      rebinding.targetProjectId,
    );
  }

  return canonicalProject;
}

export function upsertProject(project: Project): Project {
  const existingProjects = getProjects();
  const {
    projects: updatedProjects,
    projectRebindings,
  } = normalizeProjectList([...existingProjects, project]);
  const canonicalProject =
    findMatchingProject(updatedProjects, project) ??
    updatedProjects[updatedProjects.length - 1] ??
    project;

  persistProjects(updatedProjects);
  for (const rebinding of projectRebindings) {
    rebindProjectScopedCollections(
      rebinding.sourceProjectId,
      rebinding.targetProjectId,
    );
  }

  return canonicalProject;
}

export function deleteProject(id: string): void {
  const projects = getProjects();
  const normalizedProjectId = normalizeProjectId(id);
  const updatedProjects = projects.filter(
    (project) => normalizeProjectId(project.id) !== normalizedProjectId,
  );

  persistProjects(updatedProjects);
}
