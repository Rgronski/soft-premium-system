import { getKnowledge } from "../knowledge/knowledge";
import { getKnowledgeEntriesFromServer } from "../knowledge/browser-server";
import type { KnowledgeEntry } from "../knowledge/types";
import { getProjectFromServer } from "../project/browser-server";
import type { Project } from "../project/types";
import { getTasksFromServer } from "../task/browser-server";
import type { Task } from "../task/types";

import {
  getAiProjectContext,
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

export type BrowserProjectContextBranch =
  | "server-project"
  | "server-project-local-knowledge-fallback"
  | "browser-local-project-fallback"
  | "project-not-found"
  | "unavailable";

export type BrowserProjectContextDiagnostics = {
  routeProjectId: string;
  projectResponse: Project | null;
  branchUsed: BrowserProjectContextBranch;
  serverTaskCount: number | null;
  serverKnowledgeCount: number | null;
  localKnowledgeCount: number;
};

export type BrowserProjectContextDiagnosticsReporter = (
  diagnostics: BrowserProjectContextDiagnostics,
) => void;

export type BrowserProjectContextOptions = {
  reportDiagnostics?: BrowserProjectContextDiagnosticsReporter;
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
  options: BrowserProjectContextOptions = {},
) {
  function reportDiagnostics(diagnostics: BrowserProjectContextDiagnostics) {
    options.reportDiagnostics?.(diagnostics);
  }

  function debugDiagnostics(diagnostics: BrowserProjectContextDiagnostics) {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    console.debug("AI Workspace project context diagnostics", diagnostics);
  }

  function emitDiagnostics(diagnostics: BrowserProjectContextDiagnostics) {
    reportDiagnostics(diagnostics);
    debugDiagnostics(diagnostics);
  }

  function buildDiagnostics(input: {
    routeProjectId: string;
    projectResponse: Project | null;
    branchUsed: BrowserProjectContextBranch;
    serverTaskCount: number | null;
    serverKnowledgeCount: number | null;
  }): BrowserProjectContextDiagnostics {
    return {
      routeProjectId: input.routeProjectId,
      projectResponse: input.projectResponse,
      branchUsed: input.branchUsed,
      serverTaskCount: input.serverTaskCount,
      serverKnowledgeCount: input.serverKnowledgeCount,
      localKnowledgeCount: getKnowledge(input.routeProjectId).length,
    };
  }

  function buildAvailableContext(input: {
    project: Project;
    tasks: Task[];
    knowledgeEntries: KnowledgeEntry[];
    projectId: string;
  }): BrowserAiProjectContextResult {
    const snapshot = composeProjectBrainSnapshot({
      project: input.project,
      tasks: input.tasks,
      knowledgeEntries: input.knowledgeEntries,
      projectId: input.projectId,
    });

    return {
      status: "available",
      context: aiProjectContextFromSnapshot(snapshot),
    };
  }

  function buildServerKnowledgeFallbackContext(
    projectId: string,
    project: Project,
    tasks: Task[],
  ): BrowserAiProjectContextResult {
    return buildAvailableContext({
      project,
      tasks,
      knowledgeEntries: getKnowledge(projectId),
      projectId,
    });
  }

  return async function getBrowserAiProjectContext(
    projectId: string,
  ): Promise<BrowserAiProjectContextResult> {
    let project: Project | null;

    try {
      project = await reader.getProjectById(projectId);
    } catch {
      emitDiagnostics(
        buildDiagnostics({
          routeProjectId: projectId,
          projectResponse: null,
          branchUsed: "unavailable",
          serverTaskCount: null,
          serverKnowledgeCount: null,
        }),
      );

      return {
        status: "unavailable",
      };
    }

    if (!project) {
      const localContext = getAiProjectContext(projectId);

      if (localContext.status === "available") {
        emitDiagnostics(
          buildDiagnostics({
            routeProjectId: projectId,
            projectResponse: null,
            branchUsed: "browser-local-project-fallback",
            serverTaskCount: null,
            serverKnowledgeCount: null,
          }),
        );

        return localContext;
      }

      emitDiagnostics(
        buildDiagnostics({
          routeProjectId: projectId,
          projectResponse: null,
          branchUsed: localContext.status,
          serverTaskCount: null,
          serverKnowledgeCount: null,
        }),
      );

      return {
        status: localContext.status,
      };
    }

    let tasks: Task[];
    let knowledgeEntries: KnowledgeEntry[];

    try {
      tasks = await reader.getTasksByProjectId(projectId);
    } catch {
      emitDiagnostics(
        buildDiagnostics({
          routeProjectId: projectId,
          projectResponse: project,
          branchUsed: "unavailable",
          serverTaskCount: null,
          serverKnowledgeCount: null,
        }),
      );

      return {
        status: "unavailable",
      };
    }

    try {
      knowledgeEntries = await reader.getKnowledgeEntriesByProjectId(projectId);

      emitDiagnostics(
        buildDiagnostics({
          routeProjectId: projectId,
          projectResponse: project,
          branchUsed: "server-project",
          serverTaskCount: tasks.length,
          serverKnowledgeCount: knowledgeEntries.length,
        }),
      );

      return buildAvailableContext({
        project,
        tasks,
        knowledgeEntries,
        projectId,
      });
    } catch {
      try {
        const fallbackContext = buildServerKnowledgeFallbackContext(
          projectId,
          project,
          tasks,
        );

        emitDiagnostics(
          buildDiagnostics({
            routeProjectId: projectId,
            projectResponse: project,
            branchUsed: "server-project-local-knowledge-fallback",
            serverTaskCount: tasks.length,
            serverKnowledgeCount: null,
          }),
        );

        return fallbackContext;
      } catch {
        emitDiagnostics(
          buildDiagnostics({
            routeProjectId: projectId,
            projectResponse: project,
            branchUsed: "unavailable",
            serverTaskCount: tasks.length,
            serverKnowledgeCount: null,
          }),
        );

        return {
          status: "unavailable",
        };
      }
    }
  };
}

export const getBrowserAiProjectContext =
  createGetBrowserAiProjectContext({
    getProjectById: getProjectFromServer,
    getTasksByProjectId: getTasksFromServer,
    getKnowledgeEntriesByProjectId: getKnowledgeEntriesFromServer,
  });
