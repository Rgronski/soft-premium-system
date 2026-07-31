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
const clipboardWriteTextMock = vi.fn<(text: string) => Promise<void>>();

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
    clipboardWriteTextMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: clipboardWriteTextMock,
      },
    });
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
    expect(screen.getByText("Starter Prompts")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Summarize Project State/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Identify Project Risks/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Review Backlog/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Recommend Next Safe Step/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Review Decisions/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: "Instruction" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Generate" })).toBeTruthy();
    expect(
      screen.getByText("Next Generate will use no local conversation context."),
    ).toBeTruthy();
    expect(screen.getByText("No tasks available.")).toBeTruthy();
    expect(screen.getByText("No knowledge entries available.")).toBeTruthy();
  });

  test("selecting a starter prompt fills and replaces the instruction field without submitting", async () => {
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
      target: { value: "Custom draft" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /Summarize Project State/i }),
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(instructionField).toHaveProperty(
      "value",
      "Produce a concise summary of the current project state based only on the provided canonical project context.",
    );

    fireEvent.click(screen.getByRole("button", { name: /Review Decisions/i }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(instructionField).toHaveProperty(
      "value",
      "Summarize the most relevant existing project decisions and identify any visible unresolved decision gap based only on the provided canonical project context.",
    );
  });

  test("selected starter prompt content remains manually editable before submission", async () => {
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
    const starterPromptButton = screen.getByRole("button", {
      name: /Recommend Next Safe Step/i,
    });

    fireEvent.click(starterPromptButton);
    fireEvent.change(instructionField, {
      target: {
        value:
          "Recommend exactly one smallest safe next step based only on the provided canonical project context. Keep it under 3 bullets.",
      },
    });

    expect(instructionField).toHaveProperty(
      "value",
      "Recommend exactly one smallest safe next step based only on the provided canonical project context. Keep it under 3 bullets.",
    );
    expect(starterPromptButton.getAttribute("aria-pressed")).toBe("false");
    expect(fetchMock).not.toHaveBeenCalled();
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

  test("renders a copy control for a generated result and copies the exact response text", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    clipboardWriteTextMock.mockResolvedValue(undefined);
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
      expect(screen.getByText("Generated response")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Copy" })).toBeTruthy();
    });

    expect(
      (screen.getByRole("textbox", { name: "Instruction" }) as HTMLInputElement)
        .value,
    ).toBe("Summarize project");
    expect(
      (screen.getByRole("textbox", { name: "Title" }) as HTMLInputElement).value,
    ).toBe("");
    expect(screen.getByRole("button", { name: "Generate" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Reset Conversation" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Next Generate will use the last 1 local exchange."),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => {
      expect(clipboardWriteTextMock).toHaveBeenCalledTimes(1);
      expect(clipboardWriteTextMock).toHaveBeenCalledWith("Generated response");
    });
    expect(screen.getByText("Generated response")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy" })).toBeTruthy();
    expect(
      (screen.getByRole("textbox", { name: "Instruction" }) as HTMLInputElement)
        .value,
    ).toBe("Summarize project");
    expect(
      (screen.getByRole("textbox", { name: "Title" }) as HTMLInputElement).value,
    ).toBe("");
    expect(screen.getByRole("button", { name: "Generate" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Reset Conversation" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Next Generate will use the last 1 local exchange."),
    ).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("adds each successful generate call as a new local conversation exchange", async () => {
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
            content: "First response",
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
            status: "generated",
            content: "Second response",
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
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    expect(screen.getAllByText("Instruction").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("First instruction")).toBeTruthy();
    expect(screen.getAllByText("Second instruction").length).toBeGreaterThan(0);
    expect(screen.getByText("First response")).toBeTruthy();
    expect(screen.getAllByText("Second response").length).toBeGreaterThan(0);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/projects/project-1/ai/generate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        instruction: "First instruction",
      }),
    });
    const secondGenerateRequest = fetchMock.mock.calls[2 - 1];
    const secondGenerateBody = JSON.parse(
      String(secondGenerateRequest?.[1]?.body),
    ) as Record<string, string>;

    expect(secondGenerateRequest?.[0]).toBe("/api/projects/project-1/ai/generate");
    expect(secondGenerateRequest?.[1]).toMatchObject({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    expect(secondGenerateBody).not.toHaveProperty("history");
    expect(secondGenerateBody).not.toHaveProperty("conversation");
    expect(secondGenerateBody.instruction).toContain("First instruction");
    expect(secondGenerateBody.instruction).toContain("First response");
    expect(secondGenerateBody.instruction).toContain("Second instruction");
    expect(
      screen.getByText("Next Generate will use the last 2 local exchanges."),
    ).toBeTruthy();
  });

  test("first generate does not include local conversation context", async () => {
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

    const firstGenerateBody = JSON.parse(
      String(fetchMock.mock.calls[0]?.[1]?.body),
    ) as Record<string, string>;

    expect(firstGenerateBody).toEqual({
      instruction: "Summarize project",
    });
  });

  test("reset conversation clears local exchanges and the next generate starts without prior history", async () => {
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
            content: "First response",
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
            status: "generated",
            content: "Second response",
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
            status: "generated",
            content: "Third response",
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
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Conversation" }));

    expect(screen.queryByText("First response")).toBeNull();
    expect(screen.queryByText("Second response")).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Title" })).toBeNull();
    expect(
      screen.getByText("Next Generate will use no local conversation context."),
    ).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Reset Conversation" }),
    ).toBeNull();

    fireEvent.change(instructionField, {
      target: { value: "Third instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Third response")).toBeTruthy();
    });

    const thirdGenerateBody = JSON.parse(
      String(fetchMock.mock.calls[2]?.[1]?.body),
    ) as Record<string, string>;

    expect(thirdGenerateBody).toEqual({
      instruction: "Third instruction",
    });
  });

  test("after reset, a new successful exchange becomes the only local context source for later generates", async () => {
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
            content: "First response",
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
            status: "generated",
            content: "Second response",
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
            status: "generated",
            content: "Third response",
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
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Conversation" }));

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Third instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Third response")).toBeTruthy();
    });

    const thirdGenerateBody = JSON.parse(
      String(fetchMock.mock.calls[2]?.[1]?.body),
    ) as Record<string, string>;

    expect(thirdGenerateBody.instruction).toContain("Second instruction");
    expect(thirdGenerateBody.instruction).toContain("Second response");
    expect(thirdGenerateBody.instruction).toContain("Third instruction");
    expect(thirdGenerateBody.instruction).not.toContain("First instruction");
    expect(thirdGenerateBody.instruction).not.toContain("First response");
  });

  test("generation context uses only the latest three successful exchanges", async () => {
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
            content: "Response 1",
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
            status: "generated",
            content: "Response 2",
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
            status: "generated",
            content: "Response 3",
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
            status: "generated",
            content: "Response 4",
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
            status: "generated",
            content: "Response 5",
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
      target: { value: "Instruction 1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Response 1")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Response 2")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Response 3")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 4" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Response 4")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Response 5")).toBeTruthy();
    });

    const fifthGenerateBody = JSON.parse(
      String(fetchMock.mock.calls[4]?.[1]?.body),
    ) as Record<string, string>;

    expect(fifthGenerateBody.instruction).toContain("Instruction 2");
    expect(fifthGenerateBody.instruction).toContain("Response 2");
    expect(fifthGenerateBody.instruction).toContain("Instruction 3");
    expect(fifthGenerateBody.instruction).toContain("Response 3");
    expect(fifthGenerateBody.instruction).toContain("Instruction 4");
    expect(fifthGenerateBody.instruction).toContain("Response 4");
    expect(fifthGenerateBody.instruction).toContain("Instruction 5");
    expect(fifthGenerateBody.instruction).not.toContain("Instruction 1");
    expect(fifthGenerateBody.instruction).not.toContain("Response 1");
    expect(
      screen.getByText("Next Generate will use the last 3 local exchanges."),
    ).toBeTruthy();
  });

  test("renders title and save action after generation and sends the exact knowledge request", async () => {
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
          projectId: "project-1",
          projectName: "Alpha",
          tasks: [],
          knowledgeEntries: [
            {
              id: "knowledge-1",
              title: "Architecture note",
              content: "Generated response",
            },
          ],
        },
      })
      .mockResolvedValue({
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
      expect(screen.getByText("Architecture note")).toBeTruthy();
    });

    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(2);
    expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(2, "project-1");
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
    expect(screen.getAllByText("Generated response").length).toBeGreaterThan(0);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("save to knowledge uses only the latest generated exchange after multiple successful generations", async () => {
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
          projectId: "project-1",
          projectName: "Alpha",
          tasks: [],
          knowledgeEntries: [
            {
              id: "knowledge-1",
              title: "Latest note",
              content: "Second response",
            },
          ],
        },
      });
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: "generated",
            content: "First response",
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
            status: "generated",
            content: "Second response",
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
            title: "Latest note",
            content: "Second response",
            createdAt: "2026-07-27T09:00:00.000Z",
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
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Latest note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy();
      expect(screen.getByText("Latest note")).toBeTruthy();
    });

    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/projects/project-1/knowledge", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Latest note",
        content: "Second response",
      }),
    });
    expect(screen.getByText("First response")).toBeTruthy();
    expect(screen.getAllByText("Second response").length).toBeGreaterThan(0);
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
          projectId: "project-1",
          projectName: "Alpha",
          tasks: [],
          knowledgeEntries: [
            {
              id: "knowledge-1",
              title: "Architecture note",
              content: "Generated response",
            },
          ],
        },
      })
      .mockResolvedValue({
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

    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(2);
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

  test("does not refresh context after an unsuccessful save", async () => {
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

    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("shows a separate refresh error after a successful save and keeps generated result and save success", async () => {
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
      .mockRejectedValueOnce(new Error("refresh failed"))
      .mockResolvedValue({
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

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save to Knowledge" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy();
      expect(
        screen.getByText(
          "Saved to Knowledge, but AI project context could not be refreshed.",
        ),
      ).toBeTruthy();
    });

    expect(screen.getByText("Generated response")).toBeTruthy();
    expect(screen.queryByText("Knowledge save unavailable.")).toBeNull();
    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("stale knowledge refresh from the previous project does not overwrite the current project", async () => {
    const refreshDeferred = createDeferred<{
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
    }>();

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
      .mockReturnValueOnce(refreshDeferred.promise)
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
      expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy();
    });

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    refreshDeferred.resolve({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [
          {
            id: "knowledge-1",
            title: "Architecture note",
            content: "Generated response",
          },
        ],
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    expect(screen.queryByText("Alpha")).toBeNull();
    expect(screen.queryByText("Architecture note")).toBeNull();
    expect(
      screen.queryByText(
        "Saved to Knowledge, but AI project context could not be refreshed.",
      ),
    ).toBeNull();
    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(3);
    expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(1, "project-1");
    expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(2, "project-1");
    expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(3, "project-2");
    expect(fetchMock).toHaveBeenCalledTimes(2);
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
      expect(screen.getByText("First generated response")).toBeTruthy();
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

    expect(screen.getByText("result A")).toBeTruthy();
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
