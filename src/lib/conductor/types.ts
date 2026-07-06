export interface ConductorState {
  currentMilestone: string;
  currentPhase: string;
  currentTask: string;
  nextAction: string;
  projectHealth: "ready" | "warning" | "blocked";
}
