// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getTasksFromServerMock = vi.fn();
const createTaskOnServerMock = vi.fn();

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
  createTaskOnServer: (input: { projectId: string; title: string }) =>
    createTaskOnServerMock(input),
}));

import { TaskServerError } from "@/lib/task/browser-server";
import ProjectTasksPage from "./page";

describe("ProjectTasksPage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getTasksFromServerMock.mockReset();
    createTaskOnServerMock.mockReset();
    getTasksFromServerMock.mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("initial load calls getTasksFromServer with route projectId and shows loading state", async () => {
    render(<ProjectTasksPage />);

    expect(screen.getByText("Loading tasks...")).toBeTruthy();

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    });
    expect(getTasksFromServerMock).toHaveBeenCalledWith("project-1");
  });

  test("renders canonical tasks after initial load success", async () => {
    getTasksFromServerMock.mockResolvedValueOnce([
      {
        id: "task-1",
        projectId: "project-1",
        title: "First task",
        createdAt: "2026-07-23T10:00:00.000Z",
      },
    ]);

    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("First task")).toBeTruthy();
    });
  });

  test("renders the empty state when the canonical task list is empty", async () => {
    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeTruthy();
    });
  });

  test("shows a local message when the initial canonical GET fails", async () => {
    getTasksFromServerMock.mockRejectedValueOnce(
      new TaskServerError("context-unavailable"),
    );

    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Dane projektu są chwilowo niedostępne."),
      ).toBeTruthy();
    });
  });

  test("successful submit calls POST once, uses route projectId, sends trimmed title, refreshes with canonical GET, and clears the input", async () => {
    getTasksFromServerMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-23T10:00:00.000Z",
        },
      ]);
    let resolveCreateTask: ((value: unknown) => void) | null = null;
    createTaskOnServerMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreateTask = resolve;
        }),
    );

    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Task title") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, {
      target: { value: "  First task  " },
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(createTaskOnServerMock).toHaveBeenCalledTimes(1);
    });
    expect(createTaskOnServerMock).toHaveBeenCalledWith({
      projectId: "project-1",
      title: "First task",
    });
    await waitFor(() => {
      expect((button as HTMLButtonElement).disabled).toBe(true);
    });

    fireEvent.click(button);

    expect(createTaskOnServerMock).toHaveBeenCalledTimes(1);

    resolveCreateTask?.({
      id: "task-1",
      projectId: "project-1",
      title: "First task",
      createdAt: "2026-07-23T10:00:00.000Z",
    });

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(2);
    });
    expect(getTasksFromServerMock.mock.calls[0]?.[0]).toBe("project-1");
    expect(getTasksFromServerMock.mock.calls[1]?.[0]).toBe("project-1");
    await waitFor(() => {
      expect(screen.getByText("First task")).toBeTruthy();
    });
    expect(input.value).toBe("");
  });

  test("does not submit an empty trimmed title", async () => {
    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Task title") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, {
      target: { value: "   " },
    });
    fireEvent.click(button);

    expect(createTaskOnServerMock).not.toHaveBeenCalled();
    expect(
      screen.getByText("Nie udało się dodać zadania. Sprawdź dane."),
    ).toBeTruthy();
  });

  test("shows a local message when POST fails and does not run canonical GET refresh", async () => {
    getTasksFromServerMock.mockResolvedValueOnce([]);
    createTaskOnServerMock.mockRejectedValueOnce(
      new TaskServerError("network-error"),
    );

    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Task title") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "First task" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(createTaskOnServerMock).toHaveBeenCalledTimes(1);
    });
    expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText("Nie udało się połączyć z serwerem."),
    ).toBeTruthy();
    expect(input.value).toBe("First task");
  });

  test("maps project-not-found during create to a local message", async () => {
    getTasksFromServerMock.mockResolvedValueOnce([]);
    createTaskOnServerMock.mockRejectedValueOnce(
      new TaskServerError("project-not-found"),
    );

    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "First task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(screen.getByText("Projekt nie istnieje.")).toBeTruthy();
    });
  });

  test("ignores a stale submit result after the route projectId changes", async () => {
    getTasksFromServerMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    let resolveCreateTask: ((value: unknown) => void) | null = null;
    createTaskOnServerMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreateTask = resolve;
        }),
    );

    const { rerender } = render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "First task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(createTaskOnServerMock).toHaveBeenCalledTimes(1);
    });

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectTasksPage />);

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(2);
    });
    expect(getTasksFromServerMock.mock.calls[0]?.[0]).toBe("project-1");
    expect(getTasksFromServerMock.mock.calls[1]?.[0]).toBe("project-2");

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "Second task" },
    });

    await waitFor(() => {
      expect((screen.getByRole("button", { name: "Add" }) as HTMLButtonElement).disabled).toBe(false);
    });

    resolveCreateTask?.({
      id: "task-1",
      projectId: "project-1",
      title: "First task",
      createdAt: "2026-07-23T10:00:00.000Z",
    });

    await waitFor(() => {
      expect(
        (screen.getByPlaceholderText("Task title") as HTMLInputElement).value,
      ).toBe("Second task");
    });
    expect(screen.queryByText("First task")).toBeNull();
    expect(getTasksFromServerMock).toHaveBeenCalledTimes(2);
  });
});
