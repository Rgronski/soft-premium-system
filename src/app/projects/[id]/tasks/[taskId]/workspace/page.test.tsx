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
const getTasksFromServerMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/engine", () => ({
  getProjectWorkspaceEntry: (projectId: string) =>
    getProjectWorkspaceEntryMock(projectId),
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

describe("ProjectTaskWorkspacePage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "task-1" });
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
    expect(screen.getByText("Repository Context")).toBeTruthy();
    expect(screen.getByText("Open repository")).toBeTruthy();
    expect(screen.getByText("Task Handoff")).toBeTruthy();
    expect(screen.getByText("Prepare this task for Codex review with the current workspace and repository context.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Handoff to Codex" })).toBeTruthy();
    expect(screen.getByText("Task Result")).toBeTruthy();
    expect(screen.getByText("Capture the current task result locally for now.")).toBeTruthy();
    expect(screen.getByLabelText("Result notes")).toBeTruthy();
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

    const completeButton = screen.getByRole("button", {
      name: "Complete task",
    }) as HTMLButtonElement;
    expect(completeButton.disabled).toBe(false);

    fireEvent.click(completeButton);

    expect(screen.getByText("Task completed locally.")).toBeTruthy();
    expect(screen.getByText("Completion Summary")).toBeTruthy();
    expect(screen.getByText("Saved result notes: Finished the task locally.")).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Result notes"), {
      target: { value: "Edited after completion." },
    });

    expect(screen.queryByText("Completion Summary")).toBeNull();
    expect(screen.queryByText("Task completed locally.")).toBeNull();
    expect(
      (screen.getByRole("button", { name: "Complete task" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  test("shows the missing state for an unknown taskId", async () => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "missing-task" });

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Task not found")).toBeTruthy();
    });
  });
});
