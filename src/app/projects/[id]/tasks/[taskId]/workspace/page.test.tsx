// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1", taskId: "task-1" }));
const getTasksFromServerMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
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
  });

  test("shows the missing state for an unknown taskId", async () => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "missing-task" });

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Task not found")).toBeTruthy();
    });
  });
});
