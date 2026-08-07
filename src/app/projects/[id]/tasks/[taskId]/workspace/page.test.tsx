// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1", taskId: "task-1" }));
const getProjectWorkspaceEntryMock = vi.fn();
const getProjectFromServerMock = vi.fn();
const getTasksFromServerMock = vi.fn();
const writeTextMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/engine", () => ({
  getProjectWorkspaceEntry: (projectId: string) =>
    getProjectWorkspaceEntryMock(projectId),
}));

vi.mock("@/lib/project/browser-server", () => ({
  getProjectFromServer: (projectId: string) =>
    getProjectFromServerMock(projectId),
}));

vi.mock("@/lib/task/browser-server", () => ({
  TaskServerError: class TaskServerError extends Error {
    readonly code: string;
    readonly status?: number;

    constructor(code: string, status?: number) {
      super(code);
      this.code = code;
      this.status = status;
    }
  },
  getTasksFromServer: (projectId: string) =>
    getTasksFromServerMock(projectId),
}));

import ProjectTaskWorkspacePage from "./page";
import ProjectTaskDetailPage from "../page";

describe("ProjectTaskWorkspacePage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "task-1" });
    localStorage.clear();
    writeTextMock.mockReset();
    writeTextMock.mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      configurable: true,
    });
    getProjectWorkspaceEntryMock.mockReset();
    getProjectWorkspaceEntryMock.mockReturnValue({
      projectId: "project-1",
      workspace: {
        overview: {
          project: {
            id: "project-1",
            name: "Project Alpha",
            repositoryUrl: "https://example.com/repos/project-alpha",
          },
          counts: {
            tasks: 1,
            knowledgeEntries: 0,
          },
          workflow: {
            health: "ready",
            confidence: 0.5,
            nextStep: {
              id: "start-next-work",
              label: "Start next work",
              description: "Ready to start the next work item.",
            },
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: [
          {
            id: "task-1",
            title: "First task",
          },
        ],
        knowledgeEntries: [],
      },
    });
    getProjectFromServerMock.mockReset();
    getProjectFromServerMock.mockResolvedValue(null);
    getTasksFromServerMock.mockReset();
    getTasksFromServerMock.mockResolvedValue([
      {
        id: "task-1",
        projectId: "project-1",
        title: "First task",
        createdAt: "2026-07-23T10:00:00.000Z",
      },
    ]);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("loads the task workspace start surface for the current task", async () => {
    render(<ProjectTaskWorkspacePage />);

    expect(screen.getByText("Loading task workspace...")).toBeTruthy();

    await waitFor(() => {
    expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    });

    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledTimes(1);
    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Next Step Action")).toBeTruthy();
    expect(screen.getByText("Start next work")).toBeTruthy();
    expect(
      screen.getByText(
        "Ready to start the next work item.",
      ),
    ).toBeTruthy();
    const continueToResultNotesButton = screen.getByRole("button", {
      name: "Continue to result notes",
    }) as HTMLButtonElement;
    expect(continueToResultNotesButton).toBeTruthy();
    fireEvent.click(continueToResultNotesButton);
    expect(document.activeElement).toBe(screen.getByLabelText("Result notes"));
    expect(screen.getByText("Repository Context")).toBeTruthy();
    expect(screen.getByText("Open repository")).toBeTruthy();
    expect(screen.getByText("Task Handoff")).toBeTruthy();
    expect(screen.getByText("Prepare this task for Codex review with the current workspace and repository context.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Handoff to Codex" })).toBeTruthy();
    expect(screen.getByText("Task Result")).toBeTruthy();
    expect(screen.getByText("Capture the current task result locally for now.")).toBeTruthy();
    expect(screen.getByText("Evidence Review")).toBeTruthy();
    expect(screen.getByText("Awaiting result evidence.")).toBeTruthy();
    expect(
      screen.getByText(
        "Sequence: save the result, acknowledge the review, then complete the task.",
      ),
    ).toBeTruthy();
    const initialAcknowledgeReviewButton = screen.getByRole("button", {
      name: "Acknowledge review",
    }) as HTMLButtonElement;
    expect(initialAcknowledgeReviewButton.disabled).toBe(true);
    expect(screen.getByLabelText("Result notes")).toBeTruthy();
    expect(screen.queryByText("Task completion handoff")).toBeNull();
    expect(screen.queryByText("Completion Summary")).toBeNull();
    const initialSaveButton = screen.getByRole("button", {
      name: "Save result",
    }) as HTMLButtonElement;
    expect(initialSaveButton.disabled).toBe(true);
    const initialCompleteButton = screen.getByRole("button", {
      name: "Complete task",
    }) as HTMLButtonElement;
    expect(initialCompleteButton.disabled).toBe(true);
    expect(getTasksFromServerMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Task Workspace")).toBeTruthy();
    expect(screen.getByText("Task workspace start")).toBeTruthy();
    expect(
      screen.getByText(
        "Start the task workspace for the current project task.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("task-1")).toBeTruthy();
    expect(screen.getByText("project-1")).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Result notes"), {
      target: { value: "Finished the task locally." },
    });

    const saveButton = screen.getByRole("button", {
      name: "Save result",
    }) as HTMLButtonElement;
    expect(saveButton.disabled).toBe(false);

    fireEvent.click(saveButton);

    expect(screen.getByText("Result saved locally.")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Saved locally" }),
    ).toBeTruthy();
    expect(screen.getByText("Result evidence saved locally.")).toBeTruthy();
    const acknowledgeReviewButton = screen.getByRole("button", {
      name: "Acknowledge review",
    }) as HTMLButtonElement;
    expect(acknowledgeReviewButton.disabled).toBe(false);

    fireEvent.click(acknowledgeReviewButton);

    expect(screen.getByText("Evidence review acknowledged locally.")).toBeTruthy();
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.evidence-review",
      ),
    ).toBe("acknowledged");
    expect(
      screen.getByRole("button", { name: "Acknowledged locally" }),
    ).toBeTruthy();

    const completeButton = screen.getByRole("button", {
      name: "Complete task",
    }) as HTMLButtonElement;
    expect(completeButton.disabled).toBe(false);

    fireEvent.click(completeButton);

    expect(screen.getByText("Task completed locally.")).toBeTruthy();
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.completion",
      ),
    ).toBe("completed");
    expect(screen.getByText("Completion Summary")).toBeTruthy();
    expect(screen.getByText("Saved result notes: Finished the task locally.")).toBeTruthy();
    expect(
      screen.getAllByText("Evidence review acknowledged locally."),
    ).toHaveLength(2);
    expect(screen.getByText("Task completion handoff")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy report" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Copy report" }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(
        "Task completed locally.\nSaved result notes: Finished the task locally.",
      );
    });

    expect(screen.getByText("Completion report copied.")).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Result notes"), {
      target: { value: "Edited after completion." },
    });

    expect(screen.queryByText("Completion Summary")).toBeNull();
    expect(screen.queryByText("Task completed locally.")).toBeNull();
    expect(screen.queryByText("Completion report copied.")).toBeNull();
    expect(screen.queryByText("Task completion handoff")).toBeNull();
    expect(screen.queryAllByText("Evidence review acknowledged locally.")).toHaveLength(0);
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.completion",
      ),
    ).toBeNull();
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.evidence-review",
      ),
    ).toBeNull();
    expect(screen.getByText("Awaiting result evidence.")).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Acknowledge review" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: "Complete task" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(screen.queryByRole("button", { name: "Copy report" })).toBeNull();
  });

  test("shows the missing state for an unknown taskId", async () => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "missing-task" });

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Task not found")).toBeTruthy();
    });
  });

  test("restores saved result notes and task context after leaving and returning through the task detail path", async () => {
    const resultNotes = "Finished the task locally.";

    const { unmount } = render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(screen.getByLabelText("Result notes"), {
      target: { value: resultNotes },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save result" }));
    fireEvent.click(screen.getByRole("button", { name: "Acknowledge review" }));
    fireEvent.click(screen.getByRole("button", { name: "Complete task" }));

    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.completion",
      ),
    ).toBe("completed");
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.evidence-review",
      ),
    ).toBe("acknowledged");

    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.result-notes",
      ),
    ).toBe(resultNotes);

    unmount();

    const detailRender = render(<ProjectTaskDetailPage />);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Open task workspace" })).toBeTruthy();
    });

    expect(
      screen.getByRole("link", { name: "Open task workspace" }).getAttribute("href"),
    ).toBe("/projects/project-1/tasks/task-1/workspace");

    detailRender.unmount();

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(3);
    });

    await waitFor(() => {
      expect((screen.getByLabelText("Result notes") as HTMLTextAreaElement).value).toBe(
        resultNotes,
      );
    });

    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("task-1")).toBeTruthy();
    expect(screen.getByText("project-1")).toBeTruthy();
    expect(screen.queryByText("Result saved locally.")).toBeNull();
    expect(screen.getByText("Task completed locally.")).toBeTruthy();
    expect(screen.getByText("Completion Summary")).toBeTruthy();
    expect(screen.getByText("Task completion handoff")).toBeTruthy();
    expect(
      screen.getAllByText("Evidence review acknowledged locally."),
    ).toHaveLength(2);
  });

  test("does not render the next step block when workflow nextStep is unavailable", async () => {
    getProjectWorkspaceEntryMock.mockReturnValueOnce({
      projectId: "project-1",
      workspace: {
        overview: {
          project: {
            id: "project-1",
            name: "Project Alpha",
          },
          counts: {
            tasks: 1,
            knowledgeEntries: 0,
          },
          workflow: {
            health: "ready",
            confidence: 0.5,
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: [
          {
            id: "task-1",
            title: "First task",
          },
        ],
        knowledgeEntries: [],
      },
    });

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    });

    expect(screen.queryByText("Next Step Action")).toBeNull();
  });

  test("falls back to the canonical server workspace path when Project Brain is unavailable", async () => {
    getProjectWorkspaceEntryMock.mockReturnValueOnce(null);
    getProjectFromServerMock.mockResolvedValueOnce({
      id: "project-1",
      name: "Project Alpha",
      createdAt: "2026-08-03T10:00:00.000Z",
    });
    getTasksFromServerMock.mockResolvedValueOnce([
      {
        id: "task-1",
        projectId: "project-1",
        title: "First task",
        createdAt: "2026-07-23T10:00:00.000Z",
      },
    ]);

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Next Step Action")).toBeTruthy();
    });

    expect(screen.getByText("Continue active work")).toBeTruthy();
    expect(
      screen.getByText(
        "Continue the active workflow item before starting new work.",
      ),
    ).toBeTruthy();
  });
});
