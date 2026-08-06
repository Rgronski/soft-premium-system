// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getProjectWorkspaceEntryMock = vi.fn();
const getProjectByIdMock = vi.fn();
const getKnowledgeMock = vi.fn();

const { ProjectBrainErrorMock } = vi.hoisted(() => ({
  ProjectBrainErrorMock: class ProjectBrainErrorMock extends Error {
    readonly code: string;

    constructor(code: string) {
      super(code);
      this.code = code;
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

vi.mock("@/lib/project/project", () => ({
  getProjectById: (projectId: string) => getProjectByIdMock(projectId),
}));

vi.mock("@/lib/knowledge/knowledge", () => ({
  getKnowledge: (projectId: string) => getKnowledgeMock(projectId),
}));

import ProjectKnowledgePage from "./page";

describe("ProjectKnowledgePage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getProjectWorkspaceEntryMock.mockReset();
    getProjectByIdMock.mockReset();
    getKnowledgeMock.mockReset();
    getProjectByIdMock.mockReturnValue(null);
    getKnowledgeMock.mockReturnValue([]);
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
        tasks: [],
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

  test("renders the workspace knowledge collection for the route project id", () => {
    render(<ProjectKnowledgePage />);

    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledTimes(1);
    expect(getProjectWorkspaceEntryMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Knowledge")).toBeTruthy();
    expect(
      screen.getByText("Read-only knowledge entries for the current project workspace."),
    ).toBeTruthy();
    expect(screen.getByText("Knowledge note")).toBeTruthy();
  });

  test("renders the empty state when the knowledge collection is empty", () => {
    getProjectWorkspaceEntryMock.mockReturnValueOnce({
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
              id: "continue-active-work",
              label: "Continue active work",
              description:
                "Continue the active workflow item before starting new work.",
            },
            warnings: 0,
            blockers: 0,
          },
        },
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectKnowledgePage />);

    expect(screen.getByText("No knowledge entries available.")).toBeTruthy();
  });

  test("recovers from stale project context with local knowledge entries", async () => {
    getProjectWorkspaceEntryMock.mockImplementation(() => {
      throw new ProjectBrainErrorMock("project-not-found");
    });
    getProjectByIdMock.mockReturnValue({
      id: "project-1",
      name: "Recovered project",
      createdAt: "2026-08-03T12:00:00.000Z",
    });
    getKnowledgeMock.mockReturnValue([
      {
        id: "knowledge-1",
        projectId: "project-1",
        title: "Recovered knowledge",
        content: "Recovered from local project state.",
        createdAt: "2026-08-03T13:00:00.000Z",
      },
    ]);

    render(<ProjectKnowledgePage />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Project Brain context is unavailable, so showing locally saved knowledge entries for this project.",
        ),
      ).toBeTruthy();
    });

    expect(getProjectByIdMock).toHaveBeenCalledWith("project-1");
    expect(getKnowledgeMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Recovered knowledge")).toBeTruthy();
    expect(screen.queryByText("Project not found")).toBeNull();
  });
});
