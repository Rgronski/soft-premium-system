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
    expect(screen.getByText("Punkt kontrolny ścieżki")).toBeTruthy();
    expect(screen.getByText("Jesteś w szczegółach zadania. Następnie otwórz przestrzeń zadania i wykonuj sekwencję wyniku po kolei.")).toBeTruthy();
    expect(screen.getByText("Szczegóły zadania", { selector: "p" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Bieżący przegląd zadania" })).toBeTruthy();
    expect(screen.getByText("Uruchom przestrzeń zadania")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Uruchom przestrzeń zadania" }).getAttribute("href"),
    ).toBe("/projects/project-1/tasks/task-1/workspace");
    expect(screen.getByText("task-1")).toBeTruthy();
    expect(screen.getByText("project-1")).toBeTruthy();
    expect(screen.getByText(expectedCreatedAt)).toBeTruthy();
  });

  test("shows the missing state for an unknown taskId", async () => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "missing-task" });

    render(<ProjectTaskDetailPage />);

    await waitFor(() => {
      expect(screen.getByText("Nie znaleziono zadania")).toBeTruthy();
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
        "Kontekst Project Brain jest niedostępny, więc pokazuję lokalnie zapisane szczegóły zadania dla tego projektu.",
        ),
      ).toBeTruthy();
    });

    expect(screen.getByText("Recovered task")).toBeTruthy();
    expect(screen.queryByText("Nie znaleziono zadania")).toBeNull();
  });
});
