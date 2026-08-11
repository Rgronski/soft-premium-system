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

export function getProjects(): Project[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
  return savedProjects ? JSON.parse(savedProjects) : [];
}

export function getProjectById(id: string): Project | null {
  const projects = getProjects();

  return projects.find((project) => project.id === id) ?? null;
}

export function createProject(
  name: string,
  id = crypto.randomUUID(),
  repositoryUrl?: string,
  workingDirectory?: string,
): Project {
  const normalizedRepositoryUrl = repositoryUrl?.trim();
  const normalizedWorkingDirectory =
    workingDirectory?.trim() || buildDefaultWorkingDirectory(name);
  const newProject: Project = {
    id,
    name,
    ...(normalizedRepositoryUrl ? { repositoryUrl: normalizedRepositoryUrl } : {}),
    workingDirectory: normalizedWorkingDirectory,
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
