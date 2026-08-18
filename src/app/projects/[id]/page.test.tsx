// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const pushMock = vi.fn();
const getProjectWorkspaceEntryMock = vi.fn();
const getProjectByIdMock = vi.fn();
const getTasksMock = vi.fn();
const getTasksFromServerMock = vi.fn();
const getKnowledgeMock = vi.fn();
const deleteProjectMock = vi.fn((projectId: string) => {
  const savedProjects = localStorage.getItem("soft-premium-system.projects");
  const projects = savedProjects ? JSON.parse(savedProjects) : [];
  localStorage.setItem(
    "soft-premium-system.projects",
    JSON.stringify(
      projects.filter((project: { id: string }) => project.id !== projectId),
    ),
  );
});
const deleteProjectFromServerMock = vi.fn();
let confirmSpy: ReturnType<typeof vi.spyOn>;

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/lib/project-brain/engine", () => ({
  getProjectWorkspaceEntry: (projectId: string) =>
    getProjectWorkspaceEntryMock(projectId),
}));

vi.mock("@/lib/project/project", async () => {
  const actual = await vi.importActual<typeof import("@/lib/project/project")>(
    "@/lib/project/project",
  );

  return {
    ...actual,
    deleteProject: (projectId: string) => deleteProjectMock(projectId),
    getProjectById: (projectId: string) => getProjectByIdMock(projectId),
  };
});

vi.mock("@/lib/task/browser-server", () => ({
  getTasksFromServer: (projectId: string) => getTasksFromServerMock(projectId),
}));

vi.mock("@/lib/task/task", () => ({
  getTasks: (projectId: string) => getTasksMock(projectId),
}));

vi.mock("@/lib/knowledge/knowledge", () => ({
  getKnowledge: (projectId: string) => getKnowledgeMock(projectId),
}));

vi.mock("@/lib/project/browser-server", () => ({
  deleteProjectFromServer: (projectId: string) =>
    deleteProjectFromServerMock(projectId),
}));

import ProjectWorkspacePage from "./page";

describe("ProjectWorkspacePage", () => {
  beforeEach(() => {
    localStorage.clear();
    useParamsMock.mockReturnValue({ id: "project-1" });
    pushMock.mockReset();
    deleteProjectMock.mockClear();
    deleteProjectFromServerMock.mockReset();
    deleteProjectFromServerMock.mockResolvedValue(undefined);
    getProjectWorkspaceEntryMock.mockReset();
    getProjectByIdMock.mockReset();
    getTasksMock.mockReset();
    getTasksFromServerMock.mockReset();
    getTasksFromServerMock.mockResolvedValue([]);
    getKnowledgeMock.mockReset();
    getProjectByIdMock.mockReturnValue({
      id: "project-1",
      name: "Alpha Workspace",
      createdAt: "2026-08-03T10:00:00.000Z",
    });
    getTasksMock.mockReturnValue([]);
    getKnowledgeMock.mockReturnValue([]);
    getProjectWorkspaceEntryMock.mockReturnValue({
      projectId: "project-1",
      workspace: {
        overview: {
          project: {
            id: "project-1",
            name: "Alpha Workspace",
            repositoryUrl: "https://example.com/repos/alpha-workspace",
          },
          counts: {
            tasks: 1,
            knowledgeEntries: 1,
          },
          workflow: {
            health: "ready",
            confidence: 0.5,
            nextStep: {
              id: "continue-active-work",
              label: "Kontynuuj aktywną pracę",
              description:
                "Continue the active workflow item before starting new work.",
            },
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: [
          {
            id: "task-1",
            title: "Task A",
          },
        ],
        knowledgeEntries: [
          {
            id: "knowledge-1",
            title: "Knowledge note",
          },
        ],
      },
    });
    confirmSpy = vi.spyOn(window, "confirm");
    confirmSpy.mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha Workspace",
          createdAt: "2026-08-03T10:00:00.000Z",
        },
      ]),
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test("uses the Project Brain workspace access boundary for the route project id", () => {
    render(<ProjectWorkspacePage />);

    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledTimes(1);
    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Alpha Workspace")).toBeTruthy();
    expect(screen.getByText("Task A")).toBeTruthy();
    expect(screen.getByText("Knowledge note")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Otwórz repozytorium" }).getAttribute("href"),
    ).toBe("https://example.com/repos/alpha-workspace");
    expect(screen.getAllByText("Kontynuuj aktywną pracę")).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Przejdź do zadań" }).getAttribute("href"),
    ).toBe("/projects/project-1/tasks");
    expect(screen.getByRole("link", { name: "Dodaj zadanie" })).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Zobacz wszystkie zadania" }).getAttribute("href"),
    ).toBe("/projects/project-1/tasks");
    expect(
      screen.getByRole("link", { name: "Zobacz całą wiedzę" }).getAttribute("href"),
    ).toBe("/projects/project-1/knowledge");
    expect(screen.getByText("Project Brain")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Przejdź do zadań" })).toBeTruthy();
    expect(
      screen.getByText("Konduktor podpowiada: Kontynuuj aktywną pracę"),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Usuń projekt" })).toBeTruthy();
  });

  test("renders local repository sources as metadata instead of navigable links", () => {
    getProjectWorkspaceEntryMock.mockReturnValue({
      projectId: "project-1",
      workspace: {
        overview: {
          project: {
            id: "project-1",
            name: "Alpha Workspace",
            repositoryUrl: "source: C:/SPS_OS_WORK/Test-MS-011",
          },
          counts: {
            tasks: 1,
            knowledgeEntries: 1,
          },
          workflow: {
            health: "ready",
            confidence: 0.5,
            nextStep: {
              id: "continue-active-work",
              label: "Kontynuuj aktywną pracę",
              description:
                "Continue the active workflow item before starting new work.",
            },
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: [
          {
            id: "task-1",
            title: "Task A",
          },
        ],
        knowledgeEntries: [
          {
            id: "knowledge-1",
            title: "Knowledge note",
          },
        ],
      },
    });

    render(<ProjectWorkspacePage />);

    expect(
      screen.queryByRole("link", { name: "Otwórz repozytorium" }),
    ).toBeNull();
    expect(
      screen.getByText("source: C:/SPS_OS_WORK/Test-MS-011"),
    ).toBeTruthy();
  });

  test("surfaces the Project Brain start-next-work readiness boundary when no active work exists", () => {
    getProjectWorkspaceEntryMock.mockReturnValue({
      projectId: "project-1",
      workspace: {
        overview: {
          project: {
            id: "project-1",
            name: "Alpha Workspace",
          },
          counts: {
            tasks: 0,
            knowledgeEntries: 0,
          },
          workflow: {
            health: "ready",
            confidence: 0.5,
            nextStep: {
              id: "start-next-work",
              label: "Start next work",
              description: "Start the next safe workflow item.",
            },
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectWorkspacePage />);

    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledTimes(1);
    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Project Brain")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Przejd/i }),
    ).toBeTruthy();
  });

  test("shows a calm empty state when Project Brain has no clearer next context yet", () => {
    getProjectWorkspaceEntryMock.mockReturnValue({
      projectId: "project-1",
      workspace: {
        overview: {
          project: {
            id: "project-1",
            name: "Alpha Workspace",
          },
          counts: {
            tasks: 0,
            knowledgeEntries: 0,
          },
          workflow: {
            health: "ready",
            confidence: 0.5,
            nextStep: {
              id: "start-next-work",
              label: "Start next work",
              description: "Start the next safe workflow item.",
            },
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectWorkspacePage />);

    expect(
      screen.getAllByText("Brak dodatkowego kontekstu Project Brain"),
    ).toHaveLength(2);
    expect(
      screen.getByText(/Project Brain nie ma jeszcze wyraźniejszej wskazówki/i),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Przejd/i }),
    ).toBeTruthy();
  });

  test("shows a readiness banner when the local project Brain status is pending", () => {
    getProjectByIdMock.mockReturnValue({
      id: "project-1",
      name: "Alpha Workspace",
      createdAt: "2026-08-03T10:00:00.000Z",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
      projectBrainStatus: "pending",
    });

    render(<ProjectWorkspacePage />);

    expect(
      screen.getByText(
        "Project Brain ma status pending. Ten projekt nie jest jeszcze gotowy do użycia produkcyjnego.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("warning")).toBeTruthy();
  });

  test("confirms delete, removes the project, and redirects home", async () => {
    render(<ProjectWorkspacePage />);

    fireEvent.click(screen.getByRole("button", { name: "Usuń projekt" }));

    await waitFor(() => {
      expect(deleteProjectFromServerMock).toHaveBeenCalledWith("project-1");
    });

    expect(pushMock).toHaveBeenCalledWith("/");
    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([]);
  });

  test("recovers from a stale Project Brain miss using local project state", () => {
    getProjectWorkspaceEntryMock.mockImplementation(() => {
      const error = new Error("Project Brain could not find the requested project.") as Error & {
        code: string;
      };
      error.code = "project-not-found";
      throw error;
    });
    getTasksMock.mockReturnValue([
      {
        id: "task-1",
        projectId: "project-1",
        title: "Local task",
        createdAt: "2026-08-03T12:00:00.000Z",
      },
    ]);
    getKnowledgeMock.mockReturnValue([
      {
        id: "knowledge-1",
        projectId: "project-1",
        title: "Local knowledge",
        content: "Recovered from local project state.",
        createdAt: "2026-08-03T13:00:00.000Z",
      },
    ]);

    render(<ProjectWorkspacePage />);

    expect(screen.queryByText("Projekt nie został znaleziony")).toBeNull();
    expect(screen.getByText("Alpha Workspace")).toBeTruthy();
    expect(screen.getByText("Local task")).toBeTruthy();
    expect(screen.getByText("Local knowledge")).toBeTruthy();
    expect(screen.getAllByText(/lokalna przestrzeń projektu/i)).toHaveLength(1);
  });
});
