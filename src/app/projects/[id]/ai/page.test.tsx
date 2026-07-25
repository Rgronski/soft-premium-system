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

  test("does not render save controls before a generated result exists", async () => {
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

    expect(screen.queryByRole("textbox", { name: "Title" })).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Save to Knowledge" }),
    ).toBeNull();
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

  test("renders title and save action after generation and sends the exact knowledge request", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    fetchMock
      .mockResolvedValueOnce(
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
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: "knowledge-1",
            projectId: "project-1",
            title: "Architecture note",
            content: "Generated response",
            createdAt: "2026-07-25T09:00:00.000Z",
          }),
          {
            status: 201,
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
      expect(screen.getByText("Generated response")).toBeTruthy();
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const titleField = screen.getByRole("textbox", { name: "Title" });
    fireEvent.change(titleField, {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy();
    });

    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/projects/project-1/knowledge", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Architecture note",
        content: "Generated response",
      }),
    });

    const saveRequest = fetchMock.mock.calls[1];
    const saveBody = JSON.parse(String(saveRequest?.[1]?.body)) as Record<string, string>;

    expect(saveBody).toEqual({
      title: "Architecture note",
      content: "Generated response",
    });
    expect(saveBody).not.toHaveProperty("projectId");
    expect(saveBody).not.toHaveProperty("tasks");
    expect(saveBody).not.toHaveProperty("knowledgeEntries");
    expect(saveBody).not.toHaveProperty("instruction");
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

  test("does not send a save request for a whitespace-only title and shows a validation message", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    fetchMock.mockResolvedValueOnce(
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
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: "Saving..." })).toBeNull();
    expect(screen.getByText("Enter a valid title.")).toBeTruthy();
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

  test("renders saving state, blocks duplicate save, and prevents re-saving the same generated result after success", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    const saveDeferred = createDeferred<Response>();
    fetchMock
      .mockResolvedValueOnce(
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
      )
      .mockReturnValueOnce(saveDeferred.promise);

    render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instruction",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saving..." })).toHaveProperty(
        "disabled",
        true,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Saving..." }));
    expect(fetchMock).toHaveBeenCalledTimes(2);

    saveDeferred.resolve(
      new Response(
        JSON.stringify({
          id: "knowledge-1",
          projectId: "project-1",
          title: "Architecture note",
          content: "Generated response",
          createdAt: "2026-07-25T09:00:00.000Z",
        }),
        {
          status: 201,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saved" })).toHaveProperty(
        "disabled",
        true,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Saved" }));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("keeps the generated result visible and allows a conscious retry after a controlled save error", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    fetchMock
      .mockResolvedValueOnce(
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
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: "context-unavailable",
          }),
          {
            status: 503,
            headers: {
              "content-type": "application/json",
            },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: "knowledge-1",
            projectId: "project-1",
            title: "Architecture note",
            content: "Generated response",
            createdAt: "2026-07-25T09:00:00.000Z",
          }),
          {
            status: 201,
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
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByText("Knowledge save unavailable.")).toBeTruthy();
    });

    expect(screen.getByText("Generated response")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy();
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  test("renders a controlled save error for project-not-found and a network error for rejected save requests", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    fetchMock
      .mockResolvedValueOnce(
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
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: "project-not-found",
          }),
          {
            status: 404,
            headers: {
              "content-type": "application/json",
            },
          },
        ),
      )
      .mockRejectedValueOnce(new Error("network failed"));

    render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instruction",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByText("Project not found.")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByText("Knowledge save unavailable.")).toBeTruthy();
    });
  });

  test("resets save state after a new generation and does not auto-save", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: "generated",
            content: "First generated response",
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
            },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: "knowledge-1",
            projectId: "project-1",
            title: "Architecture note",
            content: "First generated response",
            createdAt: "2026-07-25T09:00:00.000Z",
          }),
          {
            status: 201,
            headers: {
              "content-type": "application/json",
            },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: "generated",
            content: "Second generated response",
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
      target: { value: "First prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("First generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Instruction" }), {
      target: { value: "Second prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Second generated response")).toBeTruthy();
      expect(screen.queryByText("First generated response")).toBeNull();
      expect(screen.getByRole("button", { name: "Save to Knowledge" })).toBeTruthy();
    });

    expect(screen.getByRole("textbox", { name: "Title" })).toHaveProperty(
      "value",
      "",
    );
    expect(screen.queryByRole("button", { name: "Saved" })).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  test("a new generation during an active save does not leak the old save result into the new generated result", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    const saveDeferred = createDeferred<Response>();
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: "generated",
            content: "result A",
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
            },
          },
        ),
      )
      .mockReturnValueOnce(saveDeferred.promise)
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: "generated",
            content: "result B",
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
      target: { value: "First prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("result A")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Title for result A" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saving..." })).toBeTruthy();
    });

    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/projects/project-1/knowledge", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Title for result A",
        content: "result A",
      }),
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Instruction" }), {
      target: { value: "Second prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("result B")).toBeTruthy();
    });

    expect(screen.queryByText("result A")).toBeNull();
    expect(screen.queryByRole("button", { name: "Saved" })).toBeNull();
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveProperty(
      "value",
      "",
    );
    expect(screen.getByRole("button", { name: "Save to Knowledge" })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(3);

    saveDeferred.resolve(
      new Response(
        JSON.stringify({
          id: "knowledge-1",
          projectId: "project-1",
          title: "Title for result A",
          content: "result A",
          createdAt: "2026-07-25T10:00:00.000Z",
        }),
        {
          status: 201,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    await waitFor(() => {
      expect(screen.getByText("result B")).toBeTruthy();
    });

    expect(screen.queryByRole("button", { name: "Saved" })).toBeNull();
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveProperty(
      "value",
      "",
    );
    expect(screen.getByRole("button", { name: "Save to Knowledge" })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(3);
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

  test("changing projectId invalidates the old save flow and stale save completion does not affect the new project", async () => {
    const saveDeferred = createDeferred<Response>();

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
    fetchMock
      .mockResolvedValueOnce(
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
      )
      .mockReturnValueOnce(saveDeferred.promise);

    const { rerender } = render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instruction",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saving..." })).toBeTruthy();
    });

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    expect(screen.queryByText("Generated response")).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Title" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Saved" })).toBeNull();

    saveDeferred.resolve(
      new Response(
        JSON.stringify({
          id: "knowledge-1",
          projectId: "project-1",
          title: "Architecture note",
          content: "Generated response",
          createdAt: "2026-07-25T09:00:00.000Z",
        }),
        {
          status: 201,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    expect(screen.queryByRole("button", { name: "Saved" })).toBeNull();
    expect(screen.queryByText("Generated response")).toBeNull();
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
