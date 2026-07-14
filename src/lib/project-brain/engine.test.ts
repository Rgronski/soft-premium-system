import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import * as knowledgeModule from "../knowledge/knowledge";
import * as projectModule from "../project/project";
import * as taskModule from "../task/task";
import { evaluateWorkflow } from "../workflow/engine";
import {
  buildProjectWorkflowState,
  evaluateProjectWorkflow,
  getProjectWorkflowSnapshot,
  getProjectBrainSnapshot,
} from "./engine";

class MemoryStorage {
  private store = new Map<string, string>();

  clear() {
    this.store.clear();
  }

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

describe("Project Brain engine", () => {
  const storage = new MemoryStorage();
  let setItemSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", storage);
    setItemSpy = vi.spyOn(storage, "setItem");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function getErrorCode(callback: () => unknown) {
    try {
      callback();
    } catch (error) {
      return (error as { code?: string }).code;
    }

    return null;
  }

  function seedWorkflowSnapshotProject(options?: {
    includeTask?: boolean;
    includeKnowledge?: boolean;
  }) {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );

    if (options?.includeTask) {
      storage.setItem(
        "soft-premium-system.projects.project-1.tasks",
        JSON.stringify([
          {
            id: "task-1",
            projectId: "project-1",
            title: "First task",
            createdAt: "2026-07-13T12:00:00.000Z",
          },
        ]),
      );
    }

    if (options?.includeKnowledge) {
      storage.setItem(
        "soft-premium-system.projects.project-1.knowledge",
        JSON.stringify([
          {
            id: "knowledge-1",
            projectId: "project-1",
            title: "Note",
            content: "Body",
            createdAt: "2026-07-13T12:30:00.000Z",
          },
        ]),
      );
    }
  }

  test("returns a snapshot for an existing project", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );

    const snapshot = getProjectBrainSnapshot("project-1");

    expect(snapshot.project.id).toBe("project-1");
    expect(snapshot.tasks).toEqual([]);
    expect(snapshot.knowledgeEntries).toEqual([]);
  });

  test("aggregates only tasks for the requested projectId", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
        {
          id: "project-2",
          name: "Beta",
          createdAt: "2026-07-13T11:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-2.tasks",
      JSON.stringify([
        {
          id: "task-2",
          projectId: "project-2",
          title: "Second task",
          createdAt: "2026-07-13T13:00:00.000Z",
        },
      ]),
    );

    const snapshot = getProjectBrainSnapshot("project-1");

    expect(snapshot.tasks).toHaveLength(1);
    expect(snapshot.tasks[0]?.projectId).toBe("project-1");
  });

  test("aggregates only knowledge entries for the requested projectId", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.knowledge",
      JSON.stringify([
        {
          id: "knowledge-1",
          projectId: "project-1",
          title: "Note",
          content: "Body",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-2.knowledge",
      JSON.stringify([
        {
          id: "knowledge-2",
          projectId: "project-2",
          title: "Other",
          content: "Other body",
          createdAt: "2026-07-13T13:00:00.000Z",
        },
      ]),
    );

    const snapshot = getProjectBrainSnapshot("project-1");

    expect(snapshot.knowledgeEntries).toHaveLength(1);
    expect(snapshot.knowledgeEntries[0]?.projectId).toBe("project-1");
  });

  test("returns a minimal deterministic workflowState", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );

    const workflowState = buildProjectWorkflowState("project-1");

    expect(workflowState).toEqual({
      phase: "project-brain-foundation",
      completedWork: [],
      activeWork: ["task-1"],
      blockers: [],
      warnings: [],
      progress: 0,
    });
  });

  test("treats an empty projectId as invalid-project-id", () => {
    expect(getErrorCode(() => getProjectBrainSnapshot("   "))).toBe(
      "invalid-project-id",
    );
  });

  test("treats a missing project as project-not-found", () => {
    storage.setItem("soft-premium-system.projects", JSON.stringify([]));

    expect(getErrorCode(() => getProjectBrainSnapshot("project-1"))).toBe(
      "project-not-found",
    );
  });

  test("maps corrupted source JSON to source-read-failed", () => {
    storage.setItem("soft-premium-system.projects", "{");

    expect(getErrorCode(() => getProjectBrainSnapshot("project-1"))).toBe(
      "source-read-failed",
    );
  });

  test("treats a mismatched project id from the source as invalid-snapshot", () => {
    vi.spyOn(projectModule, "getProjectById").mockReturnValue({
      id: "project-2",
      name: "Beta",
      createdAt: "2026-07-13T10:00:00.000Z",
    });

    expect(getErrorCode(() => getProjectBrainSnapshot("project-1"))).toBe(
      "invalid-snapshot",
    );
  });

  test("treats a task with an invalid runtime field as invalid-snapshot", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
        },
      ]),
    );

    expect(getErrorCode(() => getProjectBrainSnapshot("project-1"))).toBe(
      "invalid-snapshot",
    );
  });

  test("treats a task from another project as invalid-snapshot", () => {
    vi.spyOn(taskModule, "getTasks").mockReturnValue([
      {
        id: "task-1",
        projectId: "project-2",
        title: "First task",
        createdAt: "2026-07-13T12:00:00.000Z",
      },
    ]);
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );

    expect(getErrorCode(() => getProjectBrainSnapshot("project-1"))).toBe(
      "invalid-snapshot",
    );
  });

  test("treats a knowledge entry with an invalid runtime field as invalid-snapshot", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.knowledge",
      JSON.stringify([
        {
          id: "knowledge-1",
          projectId: "project-1",
          title: "Note",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );

    expect(getErrorCode(() => getProjectBrainSnapshot("project-1"))).toBe(
      "invalid-snapshot",
    );
  });

  test("treats a knowledge entry from another project as invalid-snapshot", () => {
    vi.spyOn(knowledgeModule, "getKnowledge").mockReturnValue([
      {
        id: "knowledge-1",
        projectId: "project-2",
        title: "Note",
        content: "Body",
        createdAt: "2026-07-13T12:00:00.000Z",
      },
    ]);
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );

    expect(getErrorCode(() => getProjectBrainSnapshot("project-1"))).toBe(
      "invalid-snapshot",
    );
  });

  test("does not write to localStorage", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    setItemSpy.mockClear();

    getProjectBrainSnapshot("project-1");
    buildProjectWorkflowState("project-1");

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  test("returns equivalent snapshots for repeated reads of the same data", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.knowledge",
      JSON.stringify([
        {
          id: "knowledge-1",
          projectId: "project-1",
          title: "Note",
          content: "Body",
          createdAt: "2026-07-13T12:30:00.000Z",
        },
      ]),
    );

    const firstSnapshot = getProjectBrainSnapshot("project-1");
    const secondSnapshot = getProjectBrainSnapshot("project-1");

    expect(secondSnapshot).toEqual(firstSnapshot);
  });

  test("returns a WorkflowResult for an existing project", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );

    const result = evaluateProjectWorkflow("project-1");

    expect(result.health).toBe("ready");
    expect(result.nextStep.id).toBe("continue-active-work");
  });

  test("returns the same result as direct workflow evaluation of the snapshot workflowState", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );

    const snapshot = getProjectBrainSnapshot("project-1");
    const result = evaluateProjectWorkflow("project-1");

    expect(result).toEqual(evaluateWorkflow(snapshot.workflowState));
  });

  test("returns equivalent workflow results for repeated reads of the same data", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );

    const firstResult = evaluateProjectWorkflow("project-1");
    const secondResult = evaluateProjectWorkflow("project-1");

    expect(secondResult).toEqual(firstResult);
  });

  test("returns a workflow snapshot aggregate with exactly snapshot and workflowResult for an existing ready project", () => {
    seedWorkflowSnapshotProject();

    const result = getProjectWorkflowSnapshot("project-1");

    expect(Object.keys(result).sort()).toEqual(["snapshot", "workflowResult"]);
    expect(result.snapshot.project.id).toBe("project-1");
    expect(result.workflowResult.health).toBe("ready");
    expect(result.workflowResult.nextStep.id).toBe("start-next-work");
  });

  test("returns a snapshot equivalent to the direct project brain snapshot", () => {
    seedWorkflowSnapshotProject({ includeTask: true });

    const expectedSnapshot = getProjectBrainSnapshot("project-1");
    const result = getProjectWorkflowSnapshot("project-1");

    expect(result.snapshot).toEqual(expectedSnapshot);
  });

  test("returns a workflow result equivalent to evaluating the returned snapshot workflowState", () => {
    seedWorkflowSnapshotProject({ includeTask: true });

    const result = getProjectWorkflowSnapshot("project-1");

    expect(result.workflowResult).toEqual(
      evaluateWorkflow(result.snapshot.workflowState),
    );
  });

  test("returns equivalent workflow snapshot aggregates for repeated reads of the same data", () => {
    seedWorkflowSnapshotProject({ includeTask: true, includeKnowledge: true });

    const firstResult = getProjectWorkflowSnapshot("project-1");
    const secondResult = getProjectWorkflowSnapshot("project-1");

    expect(secondResult).toEqual(firstResult);
  });

  test("preserves activeWork behavior in the workflow snapshot aggregate", () => {
    seedWorkflowSnapshotProject({ includeTask: true });

    const result = getProjectWorkflowSnapshot("project-1");

    expect(result.workflowResult.health).toBe("ready");
    expect(result.workflowResult.nextStep.id).toBe("continue-active-work");
  });

  test("preserves activeWork behavior from the Workflow Engine", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );

    const result = evaluateProjectWorkflow("project-1");

    expect(result.health).toBe("ready");
    expect(result.nextStep.id).toBe("continue-active-work");
  });

  test("preserves ready behavior when there is no activeWork", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );

    const result = evaluateProjectWorkflow("project-1");

    expect(result.health).toBe("ready");
    expect(result.nextStep.id).toBe("start-next-work");
  });

  test("propagates invalid-project-id from Project Brain", () => {
    expect(getErrorCode(() => evaluateProjectWorkflow("   "))).toBe(
      "invalid-project-id",
    );
  });

  test("propagates project-not-found from Project Brain", () => {
    storage.setItem("soft-premium-system.projects", JSON.stringify([]));

    expect(getErrorCode(() => evaluateProjectWorkflow("project-1"))).toBe(
      "project-not-found",
    );
  });

  test("propagates source-read-failed from Project Brain", () => {
    storage.setItem("soft-premium-system.projects", "{");

    expect(getErrorCode(() => evaluateProjectWorkflow("project-1"))).toBe(
      "source-read-failed",
    );
  });

  test("propagates invalid-snapshot from Project Brain", () => {
    vi.spyOn(projectModule, "getProjectById").mockReturnValue({
      id: "project-2",
      name: "Beta",
      createdAt: "2026-07-13T10:00:00.000Z",
    });

    expect(getErrorCode(() => evaluateProjectWorkflow("project-1"))).toBe(
      "invalid-snapshot",
    );
  });

  test.each([
    {
      name: "invalid-project-id",
      projectId: "   ",
      setup: () => {},
      expectedCode: "invalid-project-id",
    },
    {
      name: "project-not-found",
      projectId: "project-1",
      setup: () => {
        storage.setItem("soft-premium-system.projects", JSON.stringify([]));
      },
      expectedCode: "project-not-found",
    },
    {
      name: "source-read-failed",
      projectId: "project-1",
      setup: () => {
        storage.setItem("soft-premium-system.projects", "{");
      },
      expectedCode: "source-read-failed",
    },
    {
      name: "invalid-snapshot",
      projectId: "project-1",
      setup: () => {
        vi.spyOn(projectModule, "getProjectById").mockReturnValue({
          id: "project-2",
          name: "Beta",
          createdAt: "2026-07-13T10:00:00.000Z",
        });
      },
      expectedCode: "invalid-snapshot",
    },
  ])(
    "propagates $name from the workflow snapshot aggregate",
    ({ projectId, setup, expectedCode }) => {
      setup();

      expect(getErrorCode(() => getProjectWorkflowSnapshot(projectId))).toBe(
        expectedCode,
      );
    },
  );

  test("does not write or persist workflow results", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    setItemSpy.mockClear();

    evaluateProjectWorkflow("project-1");

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  test("does not write or persist workflow snapshot aggregates", () => {
    seedWorkflowSnapshotProject();
    setItemSpy.mockClear();

    getProjectWorkflowSnapshot("project-1");

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  test("does not mutate the source workflowState", () => {
    storage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-13T10:00:00.000Z",
        },
      ]),
    );
    storage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-13T12:00:00.000Z",
        },
      ]),
    );

    const snapshot = getProjectBrainSnapshot("project-1");
    const workflowStateBefore = structuredClone(snapshot.workflowState);

    evaluateProjectWorkflow("project-1");

    expect(snapshot.workflowState).toEqual(workflowStateBefore);
  });

  test("does not mutate the returned workflow snapshot aggregate source data", () => {
    seedWorkflowSnapshotProject({ includeTask: true });

    const result = getProjectWorkflowSnapshot("project-1");
    const snapshotBefore = structuredClone(result.snapshot);
    const workflowStateBefore = structuredClone(result.snapshot.workflowState);

    expect(result.snapshot).toEqual(snapshotBefore);
    expect(result.snapshot.workflowState).toEqual(workflowStateBefore);
  });
});
