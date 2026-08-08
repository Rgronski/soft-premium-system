export interface ConductorState {
  currentMilestone: string;
  currentPhase: string;
  currentTask: string;
  nextAction: string;
  projectHealth: "ready" | "warning" | "blocked";
}

export interface ConductorBoundarySnapshot {
  ms0090Published: boolean;
  ms0091Published: boolean;
  ms0092Published: boolean;
  ms0093Published: boolean;
  ms0094Published: boolean;
  ms0095Published: boolean;
  ms0096Published: boolean;
  workflowEngineRemainsRulesOwner: boolean;
  projectBrainRemainsCanonicalSource: boolean;
  ssotRemainsCanonicalSource: boolean;
  readOnlyValidationOnly: boolean;
  uiScopeAdded: boolean;
  automationScopeAdded: boolean;
  schedulingScopeAdded: boolean;
  recoveryScopeAdded: boolean;
  runtimeStateMachineAdded: boolean;
  commandExecutorAdded: boolean;
}

export interface ConductorBoundaryViolation {
  code:
    | "missing-contract"
    | "authority-boundary"
    | "scope-boundary"
    | "non-read-only";
  message: string;
}

export interface ConductorBoundaryValidationResult {
  ready: boolean;
  violations: ConductorBoundaryViolation[];
}
