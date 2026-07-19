// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const createProjectBrainTaskMock = vi.fn();
const getTasksMock = vi.fn((projectId: string) => {
  void projectId;

  return [];
});
const randomUuidMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/engine", () => ({
  createProjectBrainTask: (command: unknown) =>
    createProjectBrainTaskMock(command),
}));

vi.mock("@/lib/task/task", () => ({
  getTasks: (projectId: string) => getTasksMock(projectId),
}));

import ProjectTasksPage from "./page";

describe("ProjectTasksPage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    createProjectBrainTaskMock.mockReset();
    getTasksMock.mockReset();
    getTasksMock.mockReturnValue([]);
    randomUuidMock.mockReset();
    randomUuidMock
      .mockReturnValueOnce("command-1")
      .mockReturnValueOnce("command-2")
      .mockReturnValue("command-fallback");

    vi.stubGlobal("crypto", {
      randomUUID: () => randomUuidMock(),
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("does not write during render without user intent", () => {
    render(<ProjectTasksPage />);

    expect(createProjectBrainTaskMock).not.toHaveBeenCalled();
  });

  test("handles a completed result by clearing the input, refreshing reads, and not repeating the write on rerender", () => {
    createProjectBrainTaskMock.mockReturnValue({
      status: "completed",
      commandId: "command-1",
      taskId: "task-1",
      snapshot: {
        project: {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-18T10:00:00.000Z",
        },
        tasks: [],
        knowledgeEntries: [],
        workflowState: {
          phase: "project-brain-foundation",
          completedWork: [],
          activeWork: [],
          blockers: [],
          warnings: [],
          progress: 0,
        },
      },
    });

    const { rerender } = render(<ProjectTasksPage />);
    const baselineReadCalls = getTasksMock.mock.calls.length;

    const input = screen.getByPlaceholderText("Task title") as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "First task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(createProjectBrainTaskMock).toHaveBeenCalledTimes(1);
    expect(createProjectBrainTaskMock).toHaveBeenCalledWith({
      commandId: "command-1",
      projectId: "project-1",
      title: "First task",
    });
    expect(input.value).toBe("");
    expect(getTasksMock.mock.calls.length).toBeGreaterThan(baselineReadCalls);

    rerender(<ProjectTasksPage />);

    expect(createProjectBrainTaskMock).toHaveBeenCalledTimes(1);
  });

  test("treats completed-with-refresh-failure as confirmed creation and still refreshes reads without retrying the write", () => {
    createProjectBrainTaskMock.mockReturnValue({
      status: "completed-with-refresh-failure",
      commandId: "command-1",
      taskId: "task-1",
    });

    render(<ProjectTasksPage />);
    const baselineReadCalls = getTasksMock.mock.calls.length;

    const input = screen.getByPlaceholderText("Task title") as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "First task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(createProjectBrainTaskMock).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("");
    expect(getTasksMock.mock.calls.length).toBeGreaterThan(baselineReadCalls);
  });

  test("uses a new commandId for each explicit user intent", () => {
    createProjectBrainTaskMock.mockReturnValue({
      status: "completed",
      commandId: "command-1",
      taskId: "task-1",
      snapshot: {
        project: {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-07-18T10:00:00.000Z",
        },
        tasks: [],
        knowledgeEntries: [],
        workflowState: {
          phase: "project-brain-foundation",
          completedWork: [],
          activeWork: [],
          blockers: [],
          warnings: [],
          progress: 0,
        },
      },
    });

    render(<ProjectTasksPage />);

    const input = screen.getByPlaceholderText("Task title");
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "First task" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "Second task" } });
    fireEvent.click(button);

    expect(createProjectBrainTaskMock).toHaveBeenCalledTimes(2);
    expect(createProjectBrainTaskMock.mock.calls[0]?.[0]).toEqual({
      commandId: "command-1",
      projectId: "project-1",
      title: "First task",
    });
    expect(createProjectBrainTaskMock.mock.calls[1]?.[0]).toEqual({
      commandId: "command-2",
      projectId: "project-1",
      title: "Second task",
    });
  });
});
