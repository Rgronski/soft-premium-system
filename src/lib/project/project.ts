import type { Project } from "./types";

const PROJECTS_STORAGE_KEY = "soft-premium-system.projects";

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
  return savedProjects ? JSON.parse(savedProjects) : [];
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

  const projects = getProjects();
  const updatedProjects = [...projects, newProject];

  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));

  return newProject;
}

export function deleteProject(id: string): void {
  const projects = getProjects();
  const updatedProjects = projects.filter((project) => project.id !== id);

  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
}
