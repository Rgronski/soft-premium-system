import "server-only";

import { getServerKnowledgeEntriesByProjectId } from "../knowledge/server";
import { getServerProjectById } from "../project/server";
import { getServerTasksByProjectId } from "../task/server";

import {
  aiProjectContextFromSnapshot,
  composeProjectBrainSnapshot,
} from "./engine";
import type {
  ProjectContextReader,
  ServerAiProjectContextResult,
} from "./engine";

export function createGetServerAiProjectContext(
  reader: ProjectContextReader,
): (
  projectId: string,
) => Promise<ServerAiProjectContextResult> {
  return async function getServerAiProjectContext(
    projectId: string,
  ): Promise<ServerAiProjectContextResult> {
    try {
      const project = await reader.getProjectById(projectId);

      if (!project) {
        return {
          status: "project-not-found",
        };
      }

      const tasks = await reader.getTasksByProjectId(projectId);
      const knowledgeEntries =
        await reader.getKnowledgeEntriesByProjectId(projectId);
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

export const getServerAiProjectContext = createGetServerAiProjectContext({
  getProjectById: getServerProjectById,
  getTasksByProjectId: getServerTasksByProjectId,
  getKnowledgeEntriesByProjectId: getServerKnowledgeEntriesByProjectId,
});
