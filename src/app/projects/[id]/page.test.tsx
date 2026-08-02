// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getProjectWorkspaceEntryMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/engine", () => ({
  getProjectWorkspaceEntry: (projectId: string) =>
    getProjectWorkspaceEntryMock(projectId),
}));

import ProjectWorkspacePage from "./page";

describe("ProjectWorkspacePage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getProjectWorkspaceEntryMock.mockReset();
    getProjectWorkspaceEntryMock.mockReturnValue({
      projectId: "project-1",
      workspace: {
        overview: {
          project: {
            id: "project-1",
            name: "Alpha Workspace",
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
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("uses the Project Brain workspace access boundary for the route project id", () => {
    render(<ProjectWorkspacePage />);

    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledTimes(1);
    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Alpha Workspace")).toBeTruthy();
    expect(screen.getByText("Task A")).toBeTruthy();
    expect(screen.getByText("Knowledge note")).toBeTruthy();
    expect(screen.getAllByText("Continue active work")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Open tasks" })).toBeTruthy();
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
});
