import type { Project } from "./types";

const PROJECTS_STORAGE_KEY = "soft-premium-system.projects";

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

export function createProject(name: string): Project {
  const newProject: Project = {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date().toISOString(),
  };

  const projects = getProjects();
  const updatedProjects = [...projects, newProject];

  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));

  return newProject;
}
