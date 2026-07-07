import type {
  ProjectState,
  WorkflowEngine,
  WorkflowResult,
} from "./types";

export function evaluateWorkflow(projectState: ProjectState): WorkflowResult {
  const hasBlockers = projectState.blockers.length > 0;
  const hasWarnings = projectState.warnings.length > 0;

  if (hasBlockers) {
    return {
      nextStep: {
        id: "review-project-state",
        label: "Review project state",
        description: "Review the current project state before applying rules.",
      },
      health: "blocked",
      warnings: projectState.warnings,
      progress: projectState.progress,
      confidence: 1,
      reason: "Workflow Engine foundation is active without decision rules.",
      evidence: [
        `phase:${projectState.phase}`,
        `completed:${projectState.completedWork.length}`,
        `active:${projectState.activeWork.length}`,
        `warnings:${projectState.warnings.length}`,
        `blockers:${projectState.blockers.length}`,
      ],
    };
  }

  if (hasWarnings) {
    return {
      nextStep: {
        id: "review-project-warnings",
        label: "Review project warnings",
        description: "Review warnings before continuing the workflow.",
      },
      health: "warning",
      warnings: projectState.warnings,
      progress: projectState.progress,
      confidence: 0.75,
      reason: "Workflow Engine detected warnings that should be reviewed before continuing.",
      evidence: [
        `phase:${projectState.phase}`,
        `completed:${projectState.completedWork.length}`,
        `active:${projectState.activeWork.length}`,
        `warnings:${projectState.warnings.length}`,
        `blockers:${projectState.blockers.length}`,
      ],
    };
  }

  if (projectState.activeWork.length > 0) {
    return {
      nextStep: {
        id: "continue-active-work",
        label: "Continue active work",
        description: "Continue the active workflow item before starting new work.",
      },
      health: "ready",
      warnings: projectState.warnings,
      progress: projectState.progress,
      confidence: 0.5,
      reason: "Workflow Engine detected active work ready to continue.",
      evidence: [
        `phase:${projectState.phase}`,
        `completed:${projectState.completedWork.length}`,
        `active:${projectState.activeWork.length}`,
        `warnings:${projectState.warnings.length}`,
        `blockers:${projectState.blockers.length}`,
      ],
    };
  }

  return {
    nextStep: {
      id: "start-next-work",
      label: "Start next work",
      description: "Start the next safe workflow item.",
    },
    health: "ready",
    warnings: projectState.warnings,
    progress: projectState.progress,
    confidence: 0.5,
    reason: "Workflow Engine detected a ready state with no active work in progress.",
    evidence: [
      `phase:${projectState.phase}`,
      `completed:${projectState.completedWork.length}`,
      `active:${projectState.activeWork.length}`,
      `warnings:${projectState.warnings.length}`,
      `blockers:${projectState.blockers.length}`,
    ],
  };
}

export const workflowEngine: WorkflowEngine = {
  evaluate: evaluateWorkflow,
};
