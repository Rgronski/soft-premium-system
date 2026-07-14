import type { KnowledgeEntry } from "../knowledge/types";
import type { Project } from "../project/types";
import type { Task } from "../task/types";
import type { ProjectState, WorkflowResult } from "../workflow/types";

export interface ProjectBrainSnapshot {
  project: Project;
  tasks: Task[];
  knowledgeEntries: KnowledgeEntry[];
  workflowState: ProjectState;
}

export type ProjectWorkflowSnapshot = {
  snapshot: ProjectBrainSnapshot;
  workflowResult: WorkflowResult;
};

export type ProjectConsumerOverview = {
  project: {
    id: string;
    name: string;
  };
  counts: {
    tasks: number;
    knowledgeEntries: number;
  };
  workflow: {
    health: WorkflowResult["health"];
    confidence: number;
    nextStep: WorkflowResult["nextStep"];
    warnings: number;
    blockers: number;
  };
};
