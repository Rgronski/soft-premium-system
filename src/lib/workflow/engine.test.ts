import { describe, expect, test } from "vitest";

import { evaluateWorkflow } from "./engine";
import type { ProjectState } from "./types";

describe("evaluateWorkflow", () => {
  test("returns blocked health and review-project-state next step when blockers exist", () => {
    const projectState: ProjectState = {
      phase: "execution",
      completedWork: [],
      activeWork: ["baseline-review"],
      blockers: ["blocked-by-policy"],
      warnings: [],
      progress: 25,
    };

    const result = evaluateWorkflow(projectState);

    expect(result.health).toBe("blocked");
    expect(result.nextStep.id).toBe("review-project-state");
  });
});
