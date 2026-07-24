// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getBrowserAiProjectContextMock = vi.fn();
const fetchMock = vi.fn<typeof fetch>();

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
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
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

  test("renders the instruction field and generate button with the existing project context view", async () => {
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
    expect(screen.getByRole("textbox", { name: "Instruction" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Generate" })).toBeTruthy();
    expect(screen.getByText("No tasks available.")).toBeTruthy();
    expect(screen.getByText("No knowledge entries available.")).toBeTruthy();
  });

  test("sends the correct request and renders the generated text", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          status: "generated",
          content: "Generated response",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instruction",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Generated response")).toBeTruthy();
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/projects/project-1/ai/generate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        instruction: "Summarize project",
      }),
    });
  });

  test("renders generating state and blocks duplicate submission while the request is active", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });

    let resolveResponse:
      | ((value: Response | PromiseLike<Response>) => void)
      | undefined;
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveResponse = resolve;
      }),
    );

    render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instruction",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });

    const button = screen.getByRole("button", { name: "Generate" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Generating..." }),
      ).toHaveProperty("disabled", true);
    });

    fireEvent.click(screen.getByRole("button", { name: "Generating..." }));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveResponse?.(
      new Response(
        JSON.stringify({
          status: "generated",
          content: "Generated response",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });
  });

  test("does not send a request for a whitespace-only instruction and shows a validation message", async () => {
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

    const instructionField = await screen.findByRole("textbox", {
      name: "Instruction",
    });
    fireEvent.change(instructionField, {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("button", { name: "Generating..." }),
    ).toBeNull();
    expect(screen.getByText("Enter a valid instruction.")).toBeTruthy();
  });

  test("renders a controlled generation error", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          status: "provider-unavailable",
        }),
        {
          status: 503,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instruction",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("AI provider unavailable.")).toBeTruthy();
    });
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
