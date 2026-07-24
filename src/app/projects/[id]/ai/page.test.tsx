// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getBrowserAiProjectContextMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/browser", () => ({
  getBrowserAiProjectContext: (projectId: string) =>
    getBrowserAiProjectContextMock(projectId),
}));

import ProjectAiWorkspacePage from "./page";

describe("ProjectAiWorkspacePage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getBrowserAiProjectContextMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("loads canonical browser project context and renders available data", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
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

    expect(screen.getByText("Loading AI project context...")).toBeTruthy();
    await waitFor(() => {
      expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
      expect(getBrowserAiProjectContextMock).toHaveBeenCalledWith("project-1");
      expect(screen.getByText("Alpha")).toBeTruthy();
    });
    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("Second task")).toBeTruthy();
    expect(screen.getByText("Note")).toBeTruthy();
    expect(screen.getByText("Guide")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
    expect(screen.getByText("Longer content")).toBeTruthy();
  });

  test("renders explicit empty states for tasks and knowledge entries", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("No tasks available.")).toBeTruthy();
      expect(screen.getByText("No knowledge entries available.")).toBeTruthy();
    });
  });

  test("renders a distinct project-not-found state", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "project-not-found",
    });

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Project not found.")).toBeTruthy();
      expect(
        screen.queryByText("AI project context unavailable."),
      ).toBeNull();
    });
  });

  test("renders a distinct unavailable state", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "unavailable",
    });

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("AI project context unavailable.")).toBeTruthy();
      expect(screen.queryByText("Project not found.")).toBeNull();
    });
  });

  test("does not render write or chat controls", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeTruthy();
    });
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("form")).toBeNull();
    expect(screen.queryByText(/send/i)).toBeNull();
    expect(screen.queryByText(/create/i)).toBeNull();
    expect(screen.queryByText(/update/i)).toBeNull();
    expect(screen.queryByText(/delete/i)).toBeNull();
  });

  test("changing projectId triggers a new canonical request", async () => {
    getBrowserAiProjectContextMock
      .mockResolvedValueOnce({
        status: "available",
        context: {
          projectId: "project-1",
          projectName: "Alpha",
          tasks: [],
          knowledgeEntries: [],
        },
      })
      .mockResolvedValueOnce({
        status: "available",
        context: {
          projectId: "project-2",
          projectName: "Beta",
          tasks: [],
          knowledgeEntries: [],
        },
      });

    const { rerender } = render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeTruthy();
    });

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(2);
      expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(1, "project-1");
      expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(2, "project-2");
      expect(screen.getByText("Beta")).toBeTruthy();
    });
  });

  test("stale results from the previous project do not replace the new project page", async () => {
    let resolveProjectOne:
      | ((value: {
          status: "available";
          context: {
            projectId: string;
            projectName: string;
            tasks: Array<{ id: string; title: string }>;
            knowledgeEntries: Array<{
              id: string;
              title: string;
              content: string;
            }>;
          };
        }) => void)
      | undefined;
    const projectOnePromise = new Promise<{
      status: "available";
      context: {
        projectId: string;
        projectName: string;
        tasks: Array<{ id: string; title: string }>;
        knowledgeEntries: Array<{
          id: string;
          title: string;
          content: string;
        }>;
      };
    }>((resolve) => {
      resolveProjectOne = resolve;
    });

    getBrowserAiProjectContextMock
      .mockReturnValueOnce(projectOnePromise)
      .mockResolvedValueOnce({
        status: "available",
        context: {
          projectId: "project-2",
          projectName: "Beta",
          tasks: [{ id: "task-2", title: "Second task" }],
          knowledgeEntries: [],
        },
      });

    const { rerender } = render(<ProjectAiWorkspacePage />);

    expect(screen.getByText("Loading AI project context...")).toBeTruthy();

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    resolveProjectOne?.({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [{ id: "task-1", title: "First task" }],
        knowledgeEntries: [],
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    expect(screen.queryByText("Alpha")).toBeNull();
    expect(screen.queryByText("First task")).toBeNull();
  });
});
