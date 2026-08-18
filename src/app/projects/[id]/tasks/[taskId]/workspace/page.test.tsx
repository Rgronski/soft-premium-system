// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createProject } from "@/lib/project/project";

const useParamsMock = vi.fn(() => ({ id: "project-1", taskId: "task-1" }));
const getProjectWorkspaceEntryMock = vi.fn();
const getProjectFromServerMock = vi.fn();
const getTasksFromServerMock = vi.fn();
const writeTextMock = vi.fn();
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

vi.mock("@/lib/project-brain/engine", () => ({
  getProjectWorkspaceEntry: (projectId: string) =>
    getProjectWorkspaceEntryMock(projectId),
}));

vi.mock("@/lib/project/browser-server", () => ({
  getProjectFromServer: (projectId: string) =>
    getProjectFromServerMock(projectId),
}));

vi.mock("@/lib/task/browser-server", () => ({
  TaskServerError: TaskServerErrorMock,
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

    expect(screen.getByText("Ładowanie przestrzeni zadania...")).toBeTruthy();

    await waitFor(() => {
    expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    });

    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledTimes(1);
    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Akcja następnego kroku")).toBeTruthy();
    expect(screen.getByText("Start next work")).toBeTruthy();
    expect(
      screen.getByText(
        "Ready to start the next work item.",
      ),
    ).toBeTruthy();
    const continueToResultNotesButton = screen.getByRole("button", {
      name: "Przejdź do notatek wyniku",
    }) as HTMLButtonElement;
    expect(continueToResultNotesButton).toBeTruthy();
    fireEvent.click(continueToResultNotesButton);
    expect(document.activeElement).toBe(screen.getByLabelText("Notatki wyniku"));
    expect(
      screen.getByRole("link", { name: "Wróć do listy zadań" }).getAttribute("href"),
    ).toBe("/projects/project-1/tasks");
    expect(screen.getByText("Kontekst repozytorium")).toBeTruthy();
    expect(screen.getByText("Otwórz repozytorium")).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Otwórz repozytorium" }));
    expect(screen.getByText("Repozytorium otwarte lokalnie.")).toBeTruthy();
    expect(screen.getByText("Przekazanie zadania")).toBeTruthy();
    expect(screen.getByText("Przygotuj to zadanie do przeglądu przez Codex z bieżącą przestrzenią roboczą i kontekstem repozytorium.")).toBeTruthy();
    const codexHandoffLink = screen.getByRole("link", { name: "Przekaż do Codex" });
    expect(codexHandoffLink).toBeTruthy();
    fireEvent.click(codexHandoffLink);
    expect(screen.getByText("Przekazanie do Codex otwarte lokalnie.")).toBeTruthy();
    expect(screen.getByText("Wynik zadania")).toBeTruthy();
    expect(screen.getByText("Zapisz bieżący wynik zadania lokalnie na teraz.")).toBeTruthy();
    expect(screen.getByText("Przegląd dowodów")).toBeTruthy();
    expect(screen.getByText("Oczekiwanie na dowody wyniku.")).toBeTruthy();
    expect(
      screen.getByText(
        "Sekwencja: zapisz wynik, potem potwierdź przegląd przed zakończeniem zadania.",
      ),
    ).toBeTruthy();
    const initialAcknowledgeReviewButton = screen.getByRole("button", {
      name: "Potwierdź przegląd",
    }) as HTMLButtonElement;
    expect(initialAcknowledgeReviewButton.disabled).toBe(true);
    expect(screen.getByLabelText("Notatki wyniku")).toBeTruthy();
    expect(screen.queryByText("Przekazanie ukończenia zadania")).toBeNull();
    expect(screen.queryByText("Podsumowanie ukończenia")).toBeNull();
    const initialSaveButton = screen.getByRole("button", {
      name: "Zapisz wynik",
    }) as HTMLButtonElement;
    expect(initialSaveButton.disabled).toBe(true);
    const initialCompleteButton = screen.getByRole("button", {
      name: "Zakończ zadanie",
    }) as HTMLButtonElement;
    expect(initialCompleteButton.disabled).toBe(true);
    expect(getTasksFromServerMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Punkt kontrolny ścieżki")).toBeTruthy();
    expect(
      screen.getByText(
        "Jesteś w przestrzeni zadania. Wykonaj pozostałe akcje po kolei: zapisz wynik, potwierdź przegląd, zakończ zadanie, a potem skopiuj przekazanie.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Start przestrzeni zadania")).toBeTruthy();
    expect(
      screen.getByText(
        "Uruchom przestrzeń zadania dla bieżącego zadania projektu.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("task-1")).toBeTruthy();
    expect(screen.getByText("project-1")).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Notatki wyniku"), {
      target: { value: "Finished the task locally." },
    });

    const saveButton = screen.getByRole("button", {
      name: "Zapisz wynik",
    }) as HTMLButtonElement;
    expect(saveButton.disabled).toBe(false);

    fireEvent.click(saveButton);

    expect(screen.getByText("Wynik zapisano lokalnie.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Potwierdź przegląd teraz" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Zapisano lokalnie" }),
    ).toBeTruthy();
    expect(screen.getByText("Reset otwarcia repozytorium lokalnie.")).toBeTruthy();
    expect(screen.queryByText("Repozytorium otwarte lokalnie.")).toBeNull();
    expect(screen.getByText("Wynik zapisano lokalnie. Następna akcja: potwierdź przegląd.")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Notatki wyniku"), {
      target: { value: "Finished the task locally again." },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Zapisz wynik" }) as HTMLButtonElement,
    );

    expect(screen.getByText("Przywrócono otwarcie repozytorium lokalnie.")).toBeTruthy();
    expect(screen.queryByText("Reset otwarcia repozytorium lokalnie.")).toBeNull();
    const acknowledgeReviewButton = screen.getByRole("button", {
      name: "Potwierdź przegląd teraz",
    }) as HTMLButtonElement;
    expect(acknowledgeReviewButton.disabled).toBe(false);

    fireEvent.click(acknowledgeReviewButton);

    expect(screen.getByText("Przegląd dowodów potwierdzono lokalnie.")).toBeTruthy();
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.evidence-review",
      ),
    ).toBe("acknowledged");
    expect(
      screen.getByRole("button", { name: "Potwierdzono lokalnie" }),
    ).toBeTruthy();

    const completeButton = screen.getByRole("button", {
      name: "Zakończ zadanie",
    }) as HTMLButtonElement;
    expect(completeButton.disabled).toBe(false);

    fireEvent.click(completeButton);

    expect(screen.getByText("Zadanie zakończono lokalnie.")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Zakończono lokalnie" }),
    ).toBeTruthy();
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.completion",
      ),
    ).toBe("completed");
    expect(screen.getByText("Podsumowanie ukończenia")).toBeTruthy();
    expect(screen.getByText("Zapisane notatki wyniku: Finished the task locally again.")).toBeTruthy();
    expect(
      screen.getAllByText("Przegląd dowodów potwierdzono lokalnie."),
    ).toHaveLength(2);
    expect(screen.getByText("Przekazanie ukończenia zadania")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Skopiuj przekazanie" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Skopiuj przekazanie" }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(
        "Przekazanie ukończenia zadania\nZadanie zakończono lokalnie.\nZapisane notatki wyniku: Finished the task locally again.",
      );
    });

    expect(screen.getByText("Przekazanie ukończenia skopiowane.")).toBeTruthy();
    expect(
      screen.getByText(
        "Przekazanie skopiowane. Możesz teraz wkleić je do następnej sesji.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Skopiowano lokalnie" }),
    ).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Notatki wyniku"), {
      target: { value: "Edited after completion." },
    });

    expect(screen.getByText("Ukończenie zresetowane lokalnie.")).toBeTruthy();
    expect(screen.getByText("Reset przekazania ukończenia lokalnie.")).toBeTruthy();
    const restoredSaveButton = screen.getByRole("button", {
      name: "Zapisz wynik",
    }) as HTMLButtonElement;
    expect(restoredSaveButton.disabled).toBe(false);

    fireEvent.click(restoredSaveButton);

    expect(screen.getByText("Ukończenie przywrócone lokalnie.")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Przywrócono lokalnie" }),
    ).toBeTruthy();
    expect(screen.getByText("Przekazanie ukończenia przywrócone lokalnie.")).toBeTruthy();
    expect(screen.queryByText("Podsumowanie ukończenia")).toBeNull();
    expect(screen.queryByText("Zadanie zakończono lokalnie.")).toBeNull();
    expect(screen.queryByText("Przekazanie ukończenia skopiowane.")).toBeNull();
    expect(screen.queryByText("Skopiowano lokalnie")).toBeNull();
    expect(screen.queryByText("Ukończenie zresetowane lokalnie.")).toBeNull();
    expect(screen.queryByText("Reset przekazania ukończenia lokalnie.")).toBeNull();
    expect(screen.queryByText("Przekazanie ukończenia zadania")).toBeNull();
    expect(screen.queryAllByText("Przegląd dowodów potwierdzono lokalnie.")).toHaveLength(0);
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
    expect(screen.getByText("Wynik zapisano lokalnie. Następna akcja: potwierdź przegląd.")).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Potwierdź przegląd teraz" }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
    expect(
      (screen.getByRole("button", { name: "Zakończ zadanie" }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
    expect(screen.queryByRole("button", { name: "Skopiuj przekazanie" })).toBeNull();
  });

  test("shows the missing state for an unknown taskId", async () => {
    useParamsMock.mockReturnValue({ id: "project-1", taskId: "missing-task" });

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Nie znaleziono zadania")).toBeTruthy();
    });
  });

  test("restores saved result notes and task context after leaving and returning through the task detail path", async () => {
    const resultNotes = "Finished the task locally.";

    const { unmount } = render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getByRole("link", { name: "Otwórz repozytorium" }));
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.tasks.task-1.workspace.repository-open",
      ),
    ).toBe("opened");

    fireEvent.change(screen.getByLabelText("Notatki wyniku"), {
      target: { value: resultNotes },
    });

    fireEvent.click(screen.getByRole("button", { name: "Zapisz wynik" }));
    fireEvent.click(screen.getByRole("button", { name: "Potwierdź przegląd teraz" }));
    fireEvent.click(screen.getByRole("button", { name: "Zakończ zadanie" }));

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
      expect(screen.getByRole("link", { name: "Uruchom przestrzeń zadania" })).toBeTruthy();
    });

    expect(
      screen.getByRole("link", { name: "Uruchom przestrzeń zadania" }).getAttribute("href"),
    ).toBe("/projects/project-1/tasks/task-1/workspace");

    detailRender.unmount();

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(3);
    });

    await waitFor(() => {
      expect((screen.getByLabelText("Notatki wyniku") as HTMLTextAreaElement).value).toBe(
        resultNotes,
      );
    });

    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("task-1")).toBeTruthy();
    expect(screen.getByText("project-1")).toBeTruthy();
    expect(screen.getByText("Repozytorium otwarte lokalnie.")).toBeTruthy();
    expect(screen.queryByText("Wynik zapisano lokalnie.")).toBeNull();
    expect(screen.getByText("Zadanie zakończono lokalnie.")).toBeTruthy();
    expect(screen.getByText("Podsumowanie ukończenia")).toBeTruthy();
    expect(screen.getByText("Przekazanie ukończenia zadania")).toBeTruthy();
    expect(
      screen.getAllByText("Przegląd dowodów potwierdzono lokalnie."),
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

    expect(screen.queryByText("Akcja następnego kroku")).toBeNull();
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
      expect(screen.getByText("Akcja następnego kroku")).toBeTruthy();
    });

    expect(screen.getByText("Kontynuuj aktywną pracę")).toBeTruthy();
    expect(
      screen.getByText(
        "Continue the active workflow item before starting new work.",
      ),
    ).toBeTruthy();
  });

  test("recovers the task workspace from local task state when the canonical server project is missing", async () => {
    createProject("Project Alpha", "project-1");
    localStorage.setItem(
      "soft-premium-system.projects.project-1.tasks",
      JSON.stringify([
        {
          id: "task-1",
          projectId: "project-1",
          title: "First task",
          createdAt: "2026-07-23T10:00:00.000Z",
        },
      ]),
    );
    getProjectWorkspaceEntryMock.mockReturnValueOnce(null);
    getProjectFromServerMock.mockResolvedValueOnce(null);
    getTasksFromServerMock.mockRejectedValueOnce(
      new TaskServerErrorMock("project-not-found"),
    );

    render(<ProjectTaskWorkspacePage />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Kontekst Project Brain jest niedostępny, więc pokazuję lokalnie zapisane szczegóły przestrzeni zadania dla tego projektu.",
        ),
      ).toBeTruthy();
    });

    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("task-1")).toBeTruthy();
    expect(screen.getByText("project-1")).toBeTruthy();
    expect(screen.queryByText("Projekt nie istnieje.")).toBeNull();
  });
});
