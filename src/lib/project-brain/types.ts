import type { KnowledgeEntry } from "../knowledge/types";
import type { Project } from "../project/types";
import type { Task } from "../task/types";
import type { ProjectState } from "../workflow/types";

export interface ProjectBrainSnapshot {
  project: Project;
  tasks: Task[];
  knowledgeEntries: KnowledgeEntry[];
  workflowState: ProjectState;
}
