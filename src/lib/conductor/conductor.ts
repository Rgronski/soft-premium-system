import type {
  ConductorBoundarySnapshot,
  ConductorBoundaryValidationResult,
  ConductorState,
} from "./types";

export function getConductorState(): ConductorState {
  return {
    currentMilestone: "MS-000.5 - The Conductor",
    currentPhase: "Implementation",
    currentTask: "Create minimal Conductor panel",
    nextAction: "Verify dashboard integration and update documentation",
    projectHealth: "ready",
  };
}

export function validateConductorBoundarySnapshot(
  snapshot: ConductorBoundarySnapshot,
): ConductorBoundaryValidationResult {
  const violations: ConductorBoundaryValidationResult["violations"] = [];

  const publishedContracts = [
    ["MS-009.0", snapshot.ms0090Published],
    ["MS-009.1", snapshot.ms0091Published],
    ["MS-009.2", snapshot.ms0092Published],
    ["MS-009.3", snapshot.ms0093Published],
    ["MS-009.4", snapshot.ms0094Published],
    ["MS-009.5", snapshot.ms0095Published],
    ["MS-009.6", snapshot.ms0096Published],
  ] as const;

  for (const [contract, published] of publishedContracts) {
    if (!published) {
      violations.push({
        code: "missing-contract",
        message: `${contract} is not published in the snapshot.`,
      });
    }
  }

  if (
    !snapshot.workflowEngineRemainsRulesOwner ||
    !snapshot.projectBrainRemainsCanonicalSource ||
    !snapshot.ssotRemainsCanonicalSource
  ) {
    violations.push({
      code: "authority-boundary",
      message:
        "Workflow Engine, Project Brain, and SSOT ownership must remain intact.",
    });
  }

  if (
    snapshot.uiScopeAdded ||
    snapshot.automationScopeAdded ||
    snapshot.schedulingScopeAdded ||
    snapshot.recoveryScopeAdded ||
    snapshot.runtimeStateMachineAdded ||
    snapshot.commandExecutorAdded
  ) {
    violations.push({
      code: "scope-boundary",
      message:
        "The snapshot includes UI, automation, scheduling, recovery, runtime state machine, or command executor scope.",
    });
  }

  if (!snapshot.readOnlyValidationOnly) {
    violations.push({
      code: "non-read-only",
      message: "The snapshot must remain read-only validation only.",
    });
  }

  return {
    ready: violations.length === 0,
    violations,
  };
}

export function deriveConductorBoundaryConsumerState(
  validationResult: ConductorBoundaryValidationResult,
): ConductorState {
  const firstViolation = validationResult.violations[0];

  if (validationResult.ready) {
    return {
      currentMilestone:
        "MS-009.11 - Dyrygent/Konduktor Boundary Validation Consumer Implementation Authorization Foundation",
      currentPhase: "Boundary Consumption",
      currentTask: "Consume validated conductor boundary output",
      nextAction: "Proceed with the read-only conductor consumer seam.",
      projectHealth: "ready",
    };
  }

  return {
    currentMilestone:
      "MS-009.11 - Dyrygent/Konduktor Boundary Validation Consumer Implementation Authorization Foundation",
    currentPhase: "Boundary Consumption",
    currentTask: "Review conductor boundary validation violations",
    nextAction: firstViolation
      ? `Resolve ${firstViolation.code} before consuming the validator output.`
      : "Resolve conductor boundary validation violations before consuming the validator output.",
    projectHealth: "blocked",
  };
}
