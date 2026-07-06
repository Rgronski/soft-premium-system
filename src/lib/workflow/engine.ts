import type {
  ProjectState,
  WorkflowEngine,
  WorkflowResult,
} from "./types";

export function evaluateWorkflow(projectState: ProjectState): WorkflowResult {
  return {
    nextStep: {
      id: "review-project-state",
      label: "Review project state",
      description: "Review the current project state before applying rules.",
    },
    health: projectState.blockers.length > 0 ? "blocked" : "ready",
    warnings: projectState.warnings,
    progress: projectState.progress,
    confidence: 0.25,
    reason: "Workflow Engine foundation is active without decision rules.",
    evidence: [
      `phase:${projectState.phase}`,
      `completed:${projectState.completedWork.length}`,
      `active:${projectState.activeWork.length}`,
      `blockers:${projectState.blockers.length}`,
    ],
  };
}

export const workflowEngine: WorkflowEngine = {
  evaluate: evaluateWorkflow,
};
