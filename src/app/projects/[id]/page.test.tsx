// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const pushMock = vi.fn();
const getProjectWorkspaceEntryMock = vi.fn();
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
    deleteProjectFromServerMock.mockReset();
    deleteProjectFromServerMock.mockResolvedValue(undefined);
    getProjectWorkspaceEntryMock.mockReset();
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
              label: "Continue active work",
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
      screen.getByRole("link", { name: "Open repository" }).getAttribute("href"),
    ).toBe("https://example.com/repos/alpha-workspace");
    expect(screen.getAllByText("Continue active work")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Open tasks" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Add Task" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "View all tasks" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "View all knowledge" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Usuń projekt" })).toBeTruthy();
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
    expect(screen.getAllByText("Start next work")).toHaveLength(2);
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
});
