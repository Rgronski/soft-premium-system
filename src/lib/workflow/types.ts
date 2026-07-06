export type WorkflowHealth = "ready" | "warning" | "blocked";

export interface WorkflowWarning {
  code: string;
  message: string;
}

export interface WorkflowNextStep {
  id: string;
  label: string;
  description: string;
}

export interface ProjectState {
  phase: string;
  completedWork: string[];
  activeWork: string[];
  blockers: string[];
  warnings: WorkflowWarning[];
  progress: number;
}

export interface WorkflowResult {
  nextStep: WorkflowNextStep;
  health: WorkflowHealth;
  warnings: WorkflowWarning[];
  progress: number;
  confidence: number;
  reason: string;
  evidence: string[];
}

export interface WorkflowEngine {
  evaluate(projectState: ProjectState): WorkflowResult;
}
