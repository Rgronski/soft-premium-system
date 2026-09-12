import {
  getProjectFromServer,
  getProjectsFromServer,
} from "./browser-server";
import { getProjectById, getProjects } from "./project";
import type { Project } from "./types";

export async function getProjectFromBrowserOrServer(
  projectId: string,
): Promise<Project | null> {
  const localProject = getProjectById(projectId);

  if (localProject) {
    return localProject;
  }

  try {
    return await getProjectFromServer(projectId);
  } catch {
    return null;
  }
}

export async function getProjectsFromBrowserOrServer(): Promise<Project[]> {
  const localProjects = getProjects();

  if (localProjects.length > 0) {
    return localProjects;
  }

  try {
    return await getProjectsFromServer();
  } catch {
    return [];
  }
}
