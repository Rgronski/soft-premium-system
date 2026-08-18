import type { Project } from "./types";

const PROJECTS_STORAGE_KEY = "soft-premium-system.projects";

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
): ProjectBindingDecisionSummary {
  const hasRepositoryUrl = Boolean(project?.repositoryUrl?.trim());
  const hasWorkingDirectory = Boolean(project?.workingDirectory?.trim());
  const filesystemStatus = project?.projectFilesystemStatus ?? "unknown";

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

function normalizeProjectList(projects: Project[]): Project[] {
  const normalizedProjects: Project[] = [];

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
    normalizedProjects[matchIndex] = mergedProject;
  }

  return normalizedProjects;
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
  const normalizedProjects = normalizeProjectList(parsedProjects);
  const normalizedSerializedProjects = JSON.stringify(normalizedProjects);

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

  const updatedProjects = normalizeProjectList([...getProjects(), newProject]);

  persistProjects(updatedProjects);

  return (
    findMatchingProject(updatedProjects, newProject) ??
    updatedProjects[updatedProjects.length - 1] ??
    newProject
  );
}

export function upsertProject(project: Project): Project {
  const updatedProjects = normalizeProjectList([...getProjects(), project]);

  persistProjects(updatedProjects);

  return (
    findMatchingProject(updatedProjects, project) ??
    updatedProjects[updatedProjects.length - 1] ??
    project
  );
}

export function deleteProject(id: string): void {
  const projects = getProjects();
  const normalizedProjectId = normalizeProjectId(id);
  const updatedProjects = projects.filter(
    (project) => normalizeProjectId(project.id) !== normalizedProjectId,
  );

  persistProjects(updatedProjects);
}
