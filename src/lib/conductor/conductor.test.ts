import { describe, expect, test } from "vitest";

import {
  deriveConductorBoundaryConsumerState,
  deriveConductorProjectBrainGuidance,
  getConductorState,
  validateConductorBoundarySnapshot,
} from "./conductor";
import type { ConductorBoundarySnapshot } from "./types";

const readySnapshot: ConductorBoundarySnapshot = {
  ms0090Published: true,
  ms0091Published: true,
  ms0092Published: true,
  ms0093Published: true,
  ms0094Published: true,
  ms0095Published: true,
  ms0096Published: true,
  workflowEngineRemainsRulesOwner: true,
  projectBrainRemainsCanonicalSource: true,
  ssotRemainsCanonicalSource: true,
  readOnlyValidationOnly: true,
  uiScopeAdded: false,
  automationScopeAdded: false,
  schedulingScopeAdded: false,
  recoveryScopeAdded: false,
  runtimeStateMachineAdded: false,
  commandExecutorAdded: false,
};

describe("validateConductorBoundarySnapshot", () => {
  test("accepts a snapshot that keeps the MS-009.0 through MS-009.6 boundary intact", () => {
    const result = validateConductorBoundarySnapshot(readySnapshot);

    expect(result.ready).toBe(true);
    expect(result.violations).toEqual([]);
  });

  test("rejects snapshots that break the read-only or scope boundary", () => {
    const result = validateConductorBoundarySnapshot({
      ...readySnapshot,
      ms0095Published: false,
      automationScopeAdded: true,
      readOnlyValidationOnly: false,
    });

    expect(result.ready).toBe(false);
    expect(result.violations.map((violation) => violation.code)).toEqual([
      "missing-contract",
      "scope-boundary",
      "non-read-only",
    ]);
  });
});

describe("deriveConductorBoundaryConsumerState", () => {
  test("derives a ready conductor state from a validated boundary result", () => {
    const validationResult = validateConductorBoundarySnapshot(readySnapshot);

    expect(deriveConductorBoundaryConsumerState(validationResult)).toEqual({
      currentMilestone:
        "MS-009.11 - Dyrygent/Konduktor Boundary Validation Consumer Implementation Authorization Foundation",
      currentPhase: "Boundary Consumption",
      currentTask: "Consume validated conductor boundary output",
      nextAction: "Proceed with the read-only conductor consumer seam.",
      projectHealth: "ready",
    });
  });

  test("derives a blocked conductor state from a rejected validation result", () => {
    const validationResult = validateConductorBoundarySnapshot({
      ...readySnapshot,
      ms0092Published: false,
      recoveryScopeAdded: true,
    });

    expect(deriveConductorBoundaryConsumerState(validationResult)).toEqual({
      currentMilestone:
        "MS-009.11 - Dyrygent/Konduktor Boundary Validation Consumer Implementation Authorization Foundation",
      currentPhase: "Boundary Consumption",
      currentTask: "Review conductor boundary validation violations",
      nextAction: "Resolve missing-contract before consuming the validator output.",
      projectHealth: "blocked",
    });
  });
});

describe("getConductorState", () => {
  test("preserves the legacy conductor state contract", () => {
    expect(getConductorState()).toEqual({
      currentMilestone: "MS-000.5 - Konduktor",
      currentPhase: "Implementacja",
      currentTask: "Utwórz minimalny panel Konduktora",
      nextAction: "Sprawdź integrację pulpitu i zaktualizuj dokumentację",
      projectHealth: "ready",
    });
  });
});

describe("deriveConductorProjectBrainGuidance", () => {
  test("maps a concrete workflow next step to a calm read-only recommendation", () => {
    expect(
      deriveConductorProjectBrainGuidance({
        id: "continue-active-work",
        label: "Kontynuuj aktywną pracę",
        description: "Kontynuuj aktywny element przepływu przed rozpoczęciem nowej pracy.",
      }),
    ).toEqual({
      headline: "Konduktor podpowiada: Kontynuuj aktywną pracę",
      description: "Kontynuuj aktywny element przepływu przed rozpoczęciem nowej pracy.",
      reason:
        "The workflow next step is specific enough to act on without asking for a new decision.",
      hasRecommendation: true,
      actionReadiness: "ready-to-act-on",
    });
  });

  test("marks the default start-next-work signal as requiring Product Owner decision", () => {
    expect(
      deriveConductorProjectBrainGuidance({
        id: "start-next-work",
        label: "Start next work",
        description: "Start the next safe workflow item.",
      }),
    ).toEqual({
      headline: "Konduktor potrzebuje decyzji Product Ownera",
      description:
        "Konduktor wskazuje następny kierunek, ale nie zatwierdza kamienia milowego i nie uruchamia pracy automatycznie. Product Owner pozostaje właścicielem decyzji.",
      reason:
        "MS-025.3 refined the decision prompt, so Konduktor can advise the next direction while Product Owner still approves the milestone and decides when any work may start.",
      hasRecommendation: false,
      actionReadiness: "requires-product-owner-decision",
    });
  });

  test("falls back to a gentle read-only state for local recovery guidance", () => {
    expect(
      deriveConductorProjectBrainGuidance({
        id: "local-project-recovery",
        label: "Kontynuuj lokalny stan projektu",
        description:
          "Kontekst Project Brain jest niedostępny, ale lokalna przestrzeń projektu nadal jest dostępna.",
      }),
    ).toEqual({
      headline: "Brak silniejszej rekomendacji",
      description:
        "Konduktor pozostaje przy istniejącym sygnale Project Brain tylko do odczytu i nie dodaje własnej decyzji.",
      reason:
        "The current Project Brain signal is informational only, so Konduktor stays read-only and non-executable.",
      hasRecommendation: false,
      actionReadiness: "informational-only",
    });
  });
});
