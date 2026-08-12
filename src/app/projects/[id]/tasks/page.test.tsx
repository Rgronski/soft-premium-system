// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { Task } from "@/lib/task/types";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getTasksFromServerMock = vi.fn();
const createTaskOnServerMock = vi.fn();
const getProjectByIdMock = vi.fn();
const getTasksMock = vi.fn();

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;

  const promise = new Promise<T>((promiseResolve) => {
    resolve = promiseResolve;
  });

  return {
    promise,
    resolve,
  };
}

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
  getTasksFromServer: (projectId: string) => getTasksFromServerMock(projectId),
  createTaskOnServer: (input: { projectId: string; title: string }) =>
    createTaskOnServerMock(input),
}));

vi.mock("@/lib/project/project", () => ({
  getProjectById: (projectId: string) => getProjectByIdMock(projectId),
}));

vi.mock("@/lib/task/task", () => ({
  getTasks: (projectId: string) => getTasksMock(projectId),
}));

import { TaskServerError } from "@/lib/task/browser-server";
import ProjectTasksPage from "./page";

describe("ProjectTasksPage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getTasksFromServerMock.mockReset();
    createTaskOnServerMock.mockReset();
    getProjectByIdMock.mockReset();
    getTasksMock.mockReset();
    getProjectByIdMock.mockReturnValue(null);
    getTasksMock.mockReturnValue([]);
    getTasksFromServerMock.mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("initial load calls getTasksFromServer with route projectId and shows loading state", async () => {
    render(<ProjectTasksPage />);

    expect(screen.getByText("Ładowanie zadań...")).toBeTruthy();

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    });
    expect(getTasksFromServerMock).toHaveBeenCalledWith("project-1");
  });

  test("focuses the task title input on mount for quick entry", async () => {
    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Tytuł zadania")).toBeTruthy();
    });

    expect(screen.getByText("Wprowadzanie zadań")).toBeTruthy();
    expect(screen.getByText("Dodaj kolejne zadanie")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByPlaceholderText("Tytuł zadania"));
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
    const taskLink = screen.getByRole("link", { name: /First task/ });
    expect(taskLink.getAttribute("href")).toBe(
      "/projects/project-1/tasks/task-1",
    );
    expect(taskLink.getAttribute("class")).toContain("block");
    expect(taskLink.getAttribute("class")).toContain("w-full");
  });

  test("renders the empty state when the canonical task list is empty", async () => {
    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("Ten projekt nie ma jeszcze zadań. Utwórz pierwsze zadanie, aby kontynuować.")).toBeTruthy();
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

  test("recovers from a stale Project Brain miss using local project tasks", async () => {
    getProjectByIdMock.mockReturnValue({
      id: "project-1",
      name: "Alpha Workspace",
      createdAt: "2026-08-03T10:00:00.000Z",
    });
    getTasksMock.mockReturnValue([
      {
        id: "task-local-1",
        projectId: "project-1",
        title: "Local task",
        createdAt: "2026-08-03T12:00:00.000Z",
      },
    ]);
    getTasksFromServerMock.mockRejectedValueOnce(
      new TaskServerError("project-not-found"),
    );

    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText(
        "Kontekst Project Brain jest chwilowo niedostępny, więc pokazuję lokalnie zapisane zadania dla tego projektu.",
        ),
      ).toBeTruthy();
    });
    expect(screen.getByText("Local task")).toBeTruthy();
    expect(screen.queryByText("Projekt nie istnieje.")).toBeNull();
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
    const deferredCreateTask = createDeferred<Task>();
    createTaskOnServerMock.mockImplementation(() => deferredCreateTask.promise);

    render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("Ten projekt nie ma jeszcze zadań. Utwórz pierwsze zadanie, aby kontynuować.")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Tytuł zadania") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Dodaj zadanie" });

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

    deferredCreateTask.resolve({
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
      expect(screen.getByText("Ten projekt nie ma jeszcze zadań. Utwórz pierwsze zadanie, aby kontynuować.")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Tytuł zadania") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Dodaj zadanie" });

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
      expect(screen.getByText("Ten projekt nie ma jeszcze zadań. Utwórz pierwsze zadanie, aby kontynuować.")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Tytuł zadania") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Dodaj zadanie" });

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
      expect(screen.getByText("Ten projekt nie ma jeszcze zadań. Utwórz pierwsze zadanie, aby kontynuować.")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("Tytuł zadania"), {
      target: { value: "First task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Dodaj zadanie" }));

    await waitFor(() => {
      expect(screen.getByText("Projekt nie istnieje.")).toBeTruthy();
    });
  });

  test("ignores a stale submit result after the route projectId changes", async () => {
    getTasksFromServerMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const deferredCreateTask = createDeferred<Task>();
    createTaskOnServerMock.mockImplementation(() => deferredCreateTask.promise);

    const { rerender } = render(<ProjectTasksPage />);

    await waitFor(() => {
      expect(screen.getByText("Ten projekt nie ma jeszcze zadań. Utwórz pierwsze zadanie, aby kontynuować.")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("Tytuł zadania"), {
      target: { value: "First task" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Dodaj zadanie" }));

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
      expect(screen.getByText("Ten projekt nie ma jeszcze zadań. Utwórz pierwsze zadanie, aby kontynuować.")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("Tytuł zadania"), {
      target: { value: "Second task" },
    });

    await waitFor(() => {
      expect(
        (screen.getByRole("button", { name: "Dodaj zadanie" }) as HTMLButtonElement)
          .disabled,
      ).toBe(false);
    });

    deferredCreateTask.resolve({
      id: "task-1",
      projectId: "project-1",
      title: "First task",
      createdAt: "2026-07-23T10:00:00.000Z",
    });

    await waitFor(() => {
      expect(
        (screen.getByPlaceholderText("Tytuł zadania") as HTMLInputElement).value,
      ).toBe("Second task");
    });
    expect(screen.queryByText("First task")).toBeNull();
    expect(getTasksFromServerMock).toHaveBeenCalledTimes(2);
  });
});
