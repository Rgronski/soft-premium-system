// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1", taskId: "task-1" }));
const getTasksFromServerMock = vi.fn();
const getProjectByIdMock = vi.fn();
const getTaskMock = vi.fn();

const { TaskServerErrorMock } = vi.hoisted(() => ({
  TaskServerErrorMock: class TaskServerErrorMock extends Error {
    readonly code: string;
    readonly status?: number;

    constructor(code: string, status?: number) {
      super(code);
      this.code = code;
      this.status = status;
    }
  },
}));

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/task/browser-server", () => ({
  TaskServerError: TaskServerErrorMock,
  getTasksFromServer: (projectId: string) =>
    getTasksFromServerMock(projectId),
}));

vi.mock("@/lib/project/project", () => ({
  getProjectById: (projectId: string) => getProjectByIdMock(projectId),
}));

vi.mock("@/lib/task/task", () => ({
  getTask: (projectId: string, taskId: string) =>
    getTaskMock(projectId, taskId),
}));

import ProjectTaskDetailPage from "./page";

describe("ProjectTaskDetailPage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "task-1" });
    getTasksFromServerMock.mockReset();
    getProjectByIdMock.mockReset();
    getTaskMock.mockReset();
    getProjectByIdMock.mockReturnValue(null);
    getTaskMock.mockReturnValue(null);
    getTasksFromServerMock.mockResolvedValue([
      {
        id: "task-1",
        projectId: "project-1",
        title: "First task",
        createdAt: "2026-07-23T10:00:00.000Z",
      },
      {
        id: "task-2",
        projectId: "project-1",
        title: "Second task",
        createdAt: "2026-07-24T10:00:00.000Z",
      },
    ]);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders an existing task from the current project", async () => {
    render(<ProjectTaskDetailPage />);
    const expectedCreatedAt = new Date("2026-07-23T10:00:00.000Z").toLocaleDateString();

    await waitFor(() => {
      expect(screen.getByText("First task")).toBeTruthy();
    });

    expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    expect(getTasksFromServerMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Task Workspace")).toBeTruthy();
    expect(screen.getByText("Start task workspace")).toBeTruthy();
    expect(screen.getByText("Open task workspace")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Open task workspace" }).getAttribute("href"),
    ).toBe("/projects/project-1/tasks/task-1/workspace");
    expect(screen.getByText("task-1")).toBeTruthy();
    expect(screen.getByText("project-1")).toBeTruthy();
    expect(screen.getByText(expectedCreatedAt)).toBeTruthy();
  });

  test("shows the missing state for an unknown taskId", async () => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "missing-task" });

    render(<ProjectTaskDetailPage />);

    await waitFor(() => {
      expect(screen.getByText("Task not found")).toBeTruthy();
    });
  });

  test("recovers from stale project context with local task data", async () => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "task-1" });
    getTasksFromServerMock.mockRejectedValueOnce(
      new TaskServerErrorMock("project-not-found"),
    );
    getProjectByIdMock.mockReturnValue({
      id: "project-1",
      title: "Recovered project",
    });
    getTaskMock.mockReturnValue({
      id: "task-1",
      projectId: "project-1",
      title: "Recovered task",
      createdAt: "2026-07-23T10:00:00.000Z",
    });

    render(<ProjectTaskDetailPage />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Project Brain context is unavailable, so showing locally saved task details for this project.",
        ),
      ).toBeTruthy();
    });

    expect(screen.getByText("Recovered task")).toBeTruthy();
    expect(screen.queryByText("Task not found")).toBeNull();
  });
});
