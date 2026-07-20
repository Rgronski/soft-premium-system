// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getAiProjectContextMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/engine", () => ({
  getAiProjectContext: (projectId: string) => getAiProjectContextMock(projectId),
}));

import ProjectAiWorkspacePage from "./page";

describe("ProjectAiWorkspacePage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getAiProjectContextMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("passes route projectId to getAiProjectContext and renders available project context", () => {
    getAiProjectContextMock.mockReturnValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [
          { id: "task-1", title: "First task" },
          { id: "task-2", title: "Second task" },
        ],
        knowledgeEntries: [
          { id: "knowledge-1", title: "Note", content: "Body" },
          { id: "knowledge-2", title: "Guide", content: "Longer content" },
        ],
      },
    });

    render(<ProjectAiWorkspacePage />);

    expect(getAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(getAiProjectContextMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Alpha")).toBeTruthy();
    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("Second task")).toBeTruthy();
    expect(screen.getByText("Note")).toBeTruthy();
    expect(screen.getByText("Guide")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
    expect(screen.getByText("Longer content")).toBeTruthy();
  });

  test("renders explicit empty states for tasks and knowledge entries", () => {
    getAiProjectContextMock.mockReturnValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectAiWorkspacePage />);

    expect(screen.getByText("No tasks available.")).toBeTruthy();
    expect(screen.getByText("No knowledge entries available.")).toBeTruthy();
  });

  test("renders a distinct project-not-found state", () => {
    getAiProjectContextMock.mockReturnValue({
      status: "project-not-found",
      projectId: "project-1",
    });

    render(<ProjectAiWorkspacePage />);

    expect(screen.getByText("Project not found.")).toBeTruthy();
    expect(
      screen.queryByText("AI project context unavailable."),
    ).toBeNull();
  });

  test("renders a distinct unavailable state", () => {
    getAiProjectContextMock.mockReturnValue({
      status: "unavailable",
      projectId: "project-1",
    });

    render(<ProjectAiWorkspacePage />);

    expect(screen.getByText("AI project context unavailable.")).toBeTruthy();
    expect(screen.queryByText("Project not found.")).toBeNull();
  });

  test("does not render write or chat controls", () => {
    getAiProjectContextMock.mockReturnValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectAiWorkspacePage />);

    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("form")).toBeNull();
    expect(screen.queryByText(/send/i)).toBeNull();
    expect(screen.queryByText(/create/i)).toBeNull();
    expect(screen.queryByText(/update/i)).toBeNull();
    expect(screen.queryByText(/delete/i)).toBeNull();
  });
});
