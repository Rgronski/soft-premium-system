import { getKnowledgeEntriesFromServer } from "../knowledge/browser-server";
import type { KnowledgeEntry } from "../knowledge/types";
import { getProjectFromServer } from "../project/browser-server";
import type { Project } from "../project/types";
import { getTasksFromServer } from "../task/browser-server";
import type { Task } from "../task/types";

import {
  aiProjectContextFromSnapshot,
  composeProjectBrainSnapshot,
} from "./engine";
import type { AiProjectContext } from "./types";

export type BrowserAiProjectContextResult =
  | {
      status: "available";
      context: AiProjectContext;
    }
  | {
      status: "project-not-found";
    }
  | {
      status: "unavailable";
    };

export type BrowserProjectContextReader = {
  getProjectById(projectId: string): Promise<Project | null>;
  getTasksByProjectId(projectId: string): Promise<Task[]>;
  getKnowledgeEntriesByProjectId(
    projectId: string,
  ): Promise<KnowledgeEntry[]>;
};

export function createGetBrowserAiProjectContext(
  reader: BrowserProjectContextReader,
) {
  return async function getBrowserAiProjectContext(
    projectId: string,
  ): Promise<BrowserAiProjectContextResult> {
    let project: Project | null;

    try {
      project = await reader.getProjectById(projectId);
    } catch {
      return {
        status: "unavailable",
      };
    }

    if (!project) {
      return {
        status: "project-not-found",
      };
    }

    let tasks: Task[];
    let knowledgeEntries: KnowledgeEntry[];

    try {
      tasks = await reader.getTasksByProjectId(projectId);
      knowledgeEntries = await reader.getKnowledgeEntriesByProjectId(projectId);
    } catch {
      return {
        status: "unavailable",
      };
    }

    try {
      const snapshot = composeProjectBrainSnapshot({
        project,
        tasks,
        knowledgeEntries,
        projectId,
      });

      return {
        status: "available",
        context: aiProjectContextFromSnapshot(snapshot),
      };
    } catch {
      return {
        status: "unavailable",
      };
    }
  };
}

export const getBrowserAiProjectContext =
  createGetBrowserAiProjectContext({
    getProjectById: getProjectFromServer,
    getTasksByProjectId: getTasksFromServer,
    getKnowledgeEntriesByProjectId: getKnowledgeEntriesFromServer,
  });
