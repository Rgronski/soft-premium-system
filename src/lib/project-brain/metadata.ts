import "server-only";

import { basename, join } from "node:path";

import { getCoreDoctrineBootstrapStatus } from "../knowledge/core-doctrine";
import { getServerKnowledgeEntriesByProjectId } from "../knowledge/server";
import {
  getProjectConductorDecisions,
  getProjectConductorState,
} from "../conductor/project-store";
import { getServerProjectById } from "../project/server";
import { getServerTasksByProjectId } from "../task/server";

export type AiWorkspaceMetadataModuleStatus = "available" | "unavailable";

export type AiWorkspaceMetadataModuleSummary = {
  status: AiWorkspaceMetadataModuleStatus;
  storePath: string;
  count: number | null;
};

export type AiWorkspaceConductorMetadataSummary = AiWorkspaceMetadataModuleSummary & {
  currentMilestone: string;
  currentPhase: string;
  nextAction: string;
  reason: string;
};

export type AiWorkspaceMetadataContext = {
  projectId: string;
  projectName: string;
  projectMetadataRootPath: string;
  repoFilesIncluded: false;
  tasks: AiWorkspaceMetadataModuleSummary;
  knowledge: AiWorkspaceMetadataModuleSummary;
  decisions: AiWorkspaceMetadataModuleSummary;
  conductor: AiWorkspaceConductorMetadataSummary;
  coreDoctrine: {
    status: "available";
    storePath: string;
    count: number;
  };
};

type ProjectLike = {
  id: string;
  name: string;
  workingDirectory?: string;
};

const PROJECT_METADATA_ROOT = "C:\\SPS_OS_WORK\\.sps-meta";

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

function buildProjectMetadataRoot(project: ProjectLike): string {
  const workingDirectorySlug = basename(project.workingDirectory ?? "").trim();
  const readableRootSegment = slugifyMetadataRootSegment(
    workingDirectorySlug || project.name,
  );
  const shortProjectId = getShortProjectId(project.id);

  if (!shortProjectId) {
    return join(PROJECT_METADATA_ROOT, readableRootSegment || project.id);
  }

  return join(
    PROJECT_METADATA_ROOT,
    `${readableRootSegment || "project"}--${shortProjectId}`,
  );
}

function formatCount(count: number | null): string {
  return count === null ? "unavailable" : `${count}`;
}

function formatStoreSummary(module: {
  status: AiWorkspaceMetadataModuleStatus;
  storePath: string;
  count: number | null;
}): string {
  return `${module.status}; count=${formatCount(module.count)}; path=${module.storePath}`;
}

function createFallbackConductorState(projectId: string) {
  return {
    projectId,
    status: "decision-required",
    currentMilestone: "Konduktor projektu czeka na decyzje Product Ownera",
    currentPhase: "Brak stanu dla projektu",
    nextAction:
      "Konduktor może wskazać następny krok dopiero po zapisaniu stanu projektu albo decyzji Product Ownera.",
    reason: "Projekt nie ma jeszcze własnego trwałego stanu Konduktora.",
    updatedAt: new Date().toISOString(),
  };
}

async function readMetadataModuleSummary<T>(
  reader: () => Promise<T[]>,
  storePath: string,
): Promise<AiWorkspaceMetadataModuleSummary> {
  try {
    const entries = await reader();

    return {
      status: "available",
      storePath,
      count: entries.length,
    };
  } catch {
    return {
      status: "unavailable",
      storePath,
      count: null,
    };
  }
}

export async function getServerAiWorkspaceMetadataContext(
  projectId: string,
): Promise<AiWorkspaceMetadataContext> {
  const project = await getServerProjectById(projectId);
  const projectLike: ProjectLike = project ?? {
    id: projectId,
    name: projectId,
  };
  const projectMetadataRootPath = buildProjectMetadataRoot(projectLike);
  const tasksStorePath = join(projectMetadataRootPath, "tasks", "open.jsonl");
  const knowledgeStorePath = join(
    projectMetadataRootPath,
    "knowledge",
    "entries.jsonl",
  );
  const decisionsStorePath = join(
    projectMetadataRootPath,
    "decisions",
    "decisions.jsonl",
  );
  const conductorStorePath = join(
    projectMetadataRootPath,
    "conductor",
    "state.json",
  );
  const conductorStatePromise = getProjectConductorState(projectId).catch(() =>
    createFallbackConductorState(projectId),
  );

  const [tasks, knowledge, decisions, conductor, coreDoctrine] =
    await Promise.all([
      readMetadataModuleSummary(
        () => getServerTasksByProjectId(projectId),
        tasksStorePath,
      ),
      readMetadataModuleSummary(
        () => getServerKnowledgeEntriesByProjectId(projectId),
        knowledgeStorePath,
      ),
      readMetadataModuleSummary(
        () => getProjectConductorDecisions(projectId),
        decisionsStorePath,
      ),
      readMetadataModuleSummary(
        async () => [await conductorStatePromise],
        conductorStorePath,
      ),
      (async () => {
        const bootstrapStatus = await getCoreDoctrineBootstrapStatus();

        return {
          status: bootstrapStatus.status,
          storePath: bootstrapStatus.storePath,
          count: bootstrapStatus.entryCount,
        };
      })(),
    ]);

  const conductorState = await conductorStatePromise;

  return {
    projectId,
    projectName: project?.name ?? projectId,
    projectMetadataRootPath,
    repoFilesIncluded: false,
    tasks,
    knowledge,
    decisions,
    conductor: {
      ...conductor,
      currentMilestone: conductorState.currentMilestone,
      currentPhase: conductorState.currentPhase,
      nextAction: conductorState.nextAction,
      reason: conductorState.reason,
    },
    coreDoctrine,
  };
}

export function buildAiWorkspaceMetadataContextSummary(
  context: AiWorkspaceMetadataContext,
): string {
  return [
    "AI Workspace metadata context:",
    `Project ID: ${context.projectId}`,
    `Project name: ${context.projectName}`,
    `Project metadata root: ${context.projectMetadataRootPath}`,
    "Repository files: not included.",
    "",
    "Project Brain modules:",
    `- Tasks: ${formatStoreSummary(context.tasks)}`,
    `- Knowledge: ${formatStoreSummary(context.knowledge)}`,
    `- Decisions: ${formatStoreSummary(context.decisions)}`,
    `- Conductor: ${formatStoreSummary(context.conductor)}`,
    `  - currentMilestone: ${context.conductor.currentMilestone}`,
    `  - currentPhase: ${context.conductor.currentPhase}`,
    `  - nextAction: ${context.conductor.nextAction}`,
    `  - reason: ${context.conductor.reason}`,
    "",
    "Core Doctrine:",
    `- Status: ${context.coreDoctrine.status}`,
    `- Entries: ${context.coreDoctrine.count}`,
    `- Store path: ${context.coreDoctrine.storePath}`,
  ].join("\n");
}
