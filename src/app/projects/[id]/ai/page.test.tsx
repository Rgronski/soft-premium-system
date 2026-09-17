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
const getTasksFromServerMock = vi.fn();
const createKnowledgeEntryMock = vi.fn();
const createTaskOnServerMock = vi.fn();
const fetchMock = vi.fn<typeof fetch>();
const clipboardWriteTextMock = vi.fn<(text: string) => Promise<void>>();
const canonicalProjectContext = {
  projectId: "project-1",
  projectName: "Alpha",
  tasks: [],
  knowledgeEntries: [],
} as const;

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/browser", () => ({
  getBrowserAiProjectContext: (projectId: string) =>
    getBrowserAiProjectContextMock(projectId),
}));

vi.mock("@/lib/task/browser-server", () => ({
  createTaskOnServer: (input: { projectId: string; title: string }) =>
    createTaskOnServerMock(input),
  getTasksFromServer: (projectId: string) =>
    getTasksFromServerMock(projectId),
}));

vi.mock("@/lib/knowledge/knowledge", () => ({
  createKnowledgeEntry: (...args: unknown[]) =>
    createKnowledgeEntryMock(...args),
}));

import ProjectAiWorkspacePage from "./page";

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

describe("ProjectAiWorkspacePage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getBrowserAiProjectContextMock.mockReset();
    getTasksFromServerMock.mockReset();
    createKnowledgeEntryMock.mockReset();
    createTaskOnServerMock.mockReset();
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
    getTasksFromServerMock.mockResolvedValue([
      {
        id: "task-1",
        projectId: "project-1",
        title: "First task",
        createdAt: "2026-08-12T15:00:00.000Z",
      },
      {
        id: "task-2",
        projectId: "project-1",
        title: "Second task",
        createdAt: "2026-08-12T15:05:00.000Z",
      },
    ]);

    render(<ProjectAiWorkspacePage />);

    expect(screen.getByText("Ładowanie kontekstu AI projektu...")).toBeTruthy();
    await waitFor(() => {
      expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
      expect(getBrowserAiProjectContextMock).toHaveBeenCalledWith("project-1");
      expect(screen.getByText("Alpha")).toBeTruthy();
    });
    expect(getTasksFromServerMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("First task")).toBeTruthy();
    expect(screen.getByText("Second task")).toBeTruthy();
    expect(screen.getByText("Ostatnio odzyskana pamięć")).toBeTruthy();
    expect(screen.getByText("Ostatnia pamięć: Guide")).toBeTruthy();
    expect(screen.getByText("Note")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
    expect(screen.getByText("Fragment kontekstu: Longer content")).toBeTruthy();
    expect(
      screen.getByText("Konduktor podpowiada: kontynuuj zadania projektu"),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "W projekcie są aktywne zadania (2). Kontynuuj bieżącą pracę przed rozpoczynaniem nowego kierunku.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Wejścia do rekomendacji")).toBeTruthy();
    expect(screen.getByText("Aktywne zadania są sygnałem pracy w toku.")).toBeTruthy();
    expect(
      screen.getByText("Wpisy wiedzy dostarczają kontekst i uzasadnienie."),
    ).toBeTruthy();
    expect(
      screen.getByText("Sygnał dla Konduktora: Kontynuuj aktywną pracę."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Konduktor wybiera jeden następny krok z istniejących sygnałów. Ten widok niczego nie uruchamia.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Utwórz zadanie z pamięci" }),
    ).toBeTruthy();
  });

  test("hydrates persisted tasks on initial AI Workspace load", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [
          {
            id: "knowledge-1",
            title: "Architecture note",
            content: "Remember this follow-up.",
          },
        ],
      },
    });
    getTasksFromServerMock.mockResolvedValue([
      {
        id: "task-1",
        title: "Persisted task",
        projectId: "project-1",
        createdAt: "2026-08-12T15:10:00.000Z",
      },
    ]);

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeTruthy();
    });
    expect(screen.getByText("Persisted task")).toBeTruthy();
    expect(screen.queryByText("Brak zadań.")).toBeNull();
  });

  test("creates a task from the latest retrieved memory and keeps it through refresh", async () => {
    getBrowserAiProjectContextMock
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
              content: "Remember this follow-up.",
            },
          ],
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
              content: "Remember this follow-up.",
            },
          ],
        },
      });
    getTasksFromServerMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    createTaskOnServerMock.mockResolvedValue({
      id: "task-1",
      projectId: "project-1",
      title: "Memory follow-up: Architecture note",
      createdAt: "2026-08-12T15:30:00.000Z",
    });

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeTruthy();
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Utwórz zadanie z pamięci" }),
    );

    await waitFor(() => {
      expect(createTaskOnServerMock).toHaveBeenCalledTimes(1);
    });
    expect(createTaskOnServerMock).toHaveBeenCalledWith({
      projectId: "project-1",
      title: "Memory follow-up: Architecture note",
    });
    expect(
      screen.getByText(
        "Created task from memory: Memory follow-up: Architecture note",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Memory follow-up: Architecture note")).toBeTruthy();

    await waitFor(() => {
      expect(getTasksFromServerMock).toHaveBeenCalledTimes(2);
    });
    expect(
      screen.getByText("Memory follow-up: Architecture note"),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Created task from memory: Memory follow-up: Architecture note",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText("Fragment kontekstu: Remember this follow-up."),
    ).toBeTruthy();
    expect(screen.getByText("Alpha")).toBeTruthy();
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
      expect(screen.getByText("Brak zadań.")).toBeTruthy();
      expect(screen.getByText("Brak wpisów wiedzy.")).toBeTruthy();
    });
  });

  test("renders a distinct project-not-found state", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "project-not-found",
    });

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Projekt nie został znaleziony.")).toBeTruthy();
      expect(
        screen.queryByText("Kontekst AI projektu jest niedostępny."),
      ).toBeNull();
    });
  });

  test("renders a distinct unavailable state", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "unavailable",
    });

    render(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Kontekst AI projektu jest niedostępny.")).toBeTruthy();
      expect(screen.queryByText("Projekt nie został znaleziony.")).toBeNull();
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
    expect(screen.getByText("Propozycje startowe")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Podsumuj stan projektu/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Zidentyfikuj ryzyka projektu/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Przejrzyj backlog/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Zaproponuj następny bezpieczny krok/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Przejrzyj decyzje/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: "Instrukcja" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Generuj" })).toBeTruthy();
    expect(
      screen.getByText(
        "AI Workspace korzysta z Project Brain. Przypięte repo nie przekazuje jeszcze plików repo do promptu AI.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText("Następna generacja nie użyje lokalnego kontekstu rozmowy."),
    ).toBeTruthy();
    expect(screen.getByText("Brak zadań.")).toBeTruthy();
    expect(screen.getByText("Brak wpisów wiedzy.")).toBeTruthy();
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
      name: "Instrukcja",
    });

    fireEvent.change(instructionField, {
      target: { value: "Custom draft" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /Podsumuj stan projektu/i }),
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(instructionField).toHaveProperty(
      "value",
      "Przygotuj zwięzłe podsumowanie bieżącego stanu projektu wyłącznie na podstawie dostarczonego kanonicznego kontekstu projektu.",
    );

    fireEvent.click(screen.getByRole("button", { name: /Przejrzyj decyzje/i }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(instructionField).toHaveProperty(
      "value",
      "Podsumuj najistotniejsze istniejące decyzje projektu i wskaż każdą widoczną nierozwiązaną lukę decyzyjną wyłącznie na podstawie dostarczonego kanonicznego kontekstu projektu.",
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
      name: "Instrukcja",
    });
    const starterPromptButton = screen.getByRole("button", {
      name: /Zaproponuj następny bezpieczny krok/i,
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

    expect(screen.queryByRole("textbox", { name: "Tytuł" })).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Zapisz do wiedzy" }),
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

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
        projectContext: canonicalProjectContext,
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Kopiuj" })).toBeTruthy();
    });

    expect(
      (screen.getByRole("textbox", { name: "Instrukcja" }) as HTMLInputElement)
        .value,
    ).toBe("Summarize project");
    expect(
      (screen.getByRole("textbox", { name: "Tytuł" }) as HTMLInputElement).value,
    ).toBe("");
    expect(screen.getByRole("button", { name: "Generuj" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Zresetuj rozmowę" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Następna generacja użyje ostatniej lokalnej wymiany."),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Kopiuj" }));

    await waitFor(() => {
      expect(clipboardWriteTextMock).toHaveBeenCalledTimes(1);
      expect(clipboardWriteTextMock).toHaveBeenCalledWith("Generated response");
    });
    expect(screen.getByText("Generated response")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Kopiuj" })).toBeTruthy();
    expect(
      (screen.getByRole("textbox", { name: "Instrukcja" }) as HTMLInputElement)
        .value,
    ).toBe("Summarize project");
    expect(
      (screen.getByRole("textbox", { name: "Tytuł" }) as HTMLInputElement).value,
    ).toBe("");
    expect(screen.getByRole("button", { name: "Generuj" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Zresetuj rozmowę" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Następna generacja użyje ostatniej lokalnej wymiany."),
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
      name: "Instrukcja",
    });

    fireEvent.change(instructionField, {
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    expect(screen.getAllByText("Instrukcja").length).toBeGreaterThanOrEqual(2);
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
        projectContext: canonicalProjectContext,
      }),
    });
    const secondGenerateRequest = fetchMock.mock.calls[2 - 1];
    const secondGenerateBody = JSON.parse(
      String(secondGenerateRequest?.[1]?.body),
    ) as Record<string, unknown>;

    expect(secondGenerateRequest?.[0]).toBe("/api/projects/project-1/ai/generate");
    expect(secondGenerateRequest?.[1]).toMatchObject({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    expect(secondGenerateBody).not.toHaveProperty("history");
    expect(secondGenerateBody).not.toHaveProperty("conversation");
    expect(secondGenerateBody.projectContext).toEqual(canonicalProjectContext);
    expect(secondGenerateBody.instruction).toContain("First instruction");
    expect(secondGenerateBody.instruction).toContain("First response");
    expect(secondGenerateBody.instruction).toContain("Second instruction");
    expect(
      screen.getByText("Następna generacja użyje ostatnich 2 lokalnych wymian."),
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    const firstGenerateBody = JSON.parse(
      String(fetchMock.mock.calls[0]?.[1]?.body),
    ) as Record<string, unknown>;

    expect(firstGenerateBody).toEqual({
      instruction: "Summarize project",
      projectContext: canonicalProjectContext,
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
      name: "Instrukcja",
    });

    fireEvent.change(instructionField, {
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Zresetuj rozmowę" }));

    expect(screen.queryByText("First response")).toBeNull();
    expect(screen.queryByText("Second response")).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Tytuł" })).toBeNull();
    expect(
      screen.getByText("Następna generacja nie użyje lokalnego kontekstu rozmowy."),
    ).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Zresetuj rozmowę" }),
    ).toBeNull();

    fireEvent.change(instructionField, {
      target: { value: "Third instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Third response")).toBeTruthy();
    });

    const thirdGenerateBody = JSON.parse(
      String(fetchMock.mock.calls[2]?.[1]?.body),
    ) as Record<string, unknown>;

    expect(thirdGenerateBody).toEqual({
      instruction: "Third instruction",
      projectContext: canonicalProjectContext,
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
      name: "Instrukcja",
    });

    fireEvent.change(instructionField, {
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Zresetuj rozmowę" }));

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Third instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

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
      name: "Instrukcja",
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Response 1")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Response 2")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Response 3")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 4" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Response 4")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Instruction 5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

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
      screen.getByText("Następna generacja użyje ostatnich 3 lokalnych wymian."),
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const titleField = screen.getByRole("textbox", { name: "Tytuł" });
    fireEvent.change(titleField, {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisano" })).toBeTruthy();
      expect(screen.getByText("Architecture note")).toBeTruthy();
    });

    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
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
      name: "Instrukcja",
    });

    fireEvent.change(instructionField, {
      target: { value: "First instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("First response")).toBeTruthy();
    });

    fireEvent.change(instructionField, {
      target: { value: "Second instruction" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Second response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Latest note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisano" })).toBeTruthy();
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });

    const button = screen.getByRole("button", { name: "Generuj" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Generowanie..." }),
      ).toHaveProperty("disabled", true);
    });

    fireEvent.click(screen.getByRole("button", { name: "Generowanie..." }));
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("button", { name: "Generowanie..." }),
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: "Zapisywanie..." })).toBeNull();
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisywanie..." })).toHaveProperty(
        "disabled",
        true,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Zapisywanie..." }));
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
      expect(screen.getByRole("button", { name: "Zapisano" })).toHaveProperty(
        "disabled",
        true,
      );
    });

    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Zapisano" }));
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByText("Knowledge save unavailable.")).toBeTruthy();
    });

    expect(screen.getByText("Generated response")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisano" })).toBeTruthy();
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByText("Knowledge save unavailable.")).toBeTruthy();
    });

    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("saves to knowledge and merges the saved entry into the visible context without a refresh warning", async () => {
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisano" })).toBeTruthy();
      expect(screen.getByText("Architecture note")).toBeTruthy();
    });

    expect(screen.getAllByText("Generated response").length).toBeGreaterThan(0);
    expect(screen.queryByText("Knowledge save unavailable.")).toBeNull();
    expect(
      screen.queryByText(
        "Saved to Knowledge, but AI project context could not be refreshed.",
      ),
    ).toBeNull();
    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("recovers a missing server project before retrying the knowledge save once", async () => {
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
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: "project-1",
            name: "Alpha",
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisano" })).toBeTruthy();
      expect(screen.getByText("Architecture note")).toBeTruthy();
    });

    expect(
      screen.queryByText(
        "Saved to Knowledge, but AI project context could not be refreshed.",
      ),
    ).toBeNull();
    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(4);
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
    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/projects/project-1", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Alpha",
      }),
    });
    expect(fetchMock).toHaveBeenNthCalledWith(4, "/api/projects/project-1/knowledge", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Architecture note",
        content: "Generated response",
      }),
    });
  });

  test("stale project load from the previous project does not overwrite the current project", async () => {
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

    await waitFor(() => {
      expect(screen.getByText("Ładowanie kontekstu AI projektu...")).toBeTruthy();
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
    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(2);
    expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(1, "project-1");
    expect(getBrowserAiProjectContextMock).toHaveBeenNthCalledWith(2, "project-2");
    expect(fetchMock).toHaveBeenCalledTimes(0);
  });

  test("falls back to local knowledge storage when save retry still returns project-not-found", async () => {
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
      });
    createKnowledgeEntryMock.mockReturnValue({
      id: "knowledge-local-1",
      projectId: "project-1",
      title: "Architecture note",
      content: "Generated response",
      createdAt: "2026-08-12T10:00:00.000Z",
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
      .mockResolvedValueOnce(
        new Response("{}", {
          status: 201,
          headers: {
            "content-type": "application/json",
          },
        }),
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
      );

    render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
    expect(screen.getAllByText("Generated response").length).toBeGreaterThan(0);
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(createKnowledgeEntryMock).toHaveBeenCalledWith(
        "project-1",
        "Architecture note",
        "Generated response",
      );
      expect(screen.getByRole("button", { name: "Zapisano" })).toBeTruthy();
      expect(screen.getByText("Architecture note")).toBeTruthy();
    });

    expect(screen.queryByText("Projekt nie został znaleziony.")).toBeNull();
    expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(4);
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "First prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
    expect(screen.getAllByText("First generated response").length).toBeGreaterThan(0);
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisano" })).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Instrukcja" }), {
      target: { value: "Second prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Second generated response")).toBeTruthy();
      expect(screen.getAllByText("First generated response").length).toBeGreaterThan(0);
      expect(screen.getByRole("button", { name: "Zapisz do wiedzy" })).toBeTruthy();
    });

    expect(screen.getByRole("textbox", { name: "Tytuł" })).toHaveProperty(
      "value",
      "",
    );
    expect(screen.queryByRole("button", { name: "Zapisano" })).toBeNull();
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "First prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("result A")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Title for result A" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisywanie..." })).toBeTruthy();
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

    fireEvent.change(screen.getByRole("textbox", { name: "Instrukcja" }), {
      target: { value: "Second prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("result B")).toBeTruthy();
    });

    expect(screen.getByText("result A")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Zapisano" })).toBeNull();
    expect(screen.getByRole("textbox", { name: "Tytuł" })).toHaveProperty(
      "value",
      "",
    );
    expect(screen.getByRole("button", { name: "Zapisz do wiedzy" })).toBeTruthy();
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

    expect(screen.queryByRole("button", { name: "Zapisano" })).toBeNull();
    expect(screen.getByRole("textbox", { name: "Tytuł" })).toHaveProperty(
      "value",
      "",
    );
    expect(screen.getByRole("button", { name: "Zapisz do wiedzy" })).toBeTruthy();
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
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByText("Generated response")).toBeTruthy();
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Tytuł" }), {
      target: { value: "Architecture note" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz do wiedzy" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Zapisywanie..." })).toBeTruthy();
    });

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    expect(screen.queryByText("Generated response")).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Tytuł" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Zapisano" })).toBeNull();

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

    expect(
      (screen.getByRole("textbox", { name: "Instrukcja" }) as HTMLInputElement)
        .value,
    ).toBe("");
    expect(screen.queryByText("Generated response")).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Tytuł" })).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Zapisz do wiedzy" }),
    ).toBeNull();
    expect(screen.queryByRole("button", { name: "Zresetuj rozmowę" })).toBeNull();
    expect(screen.getByRole("button", { name: "Generuj" })).toBeTruthy();
    expect(
      screen.getByText("Następna generacja nie użyje lokalnego kontekstu rozmowy."),
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Zapisano" })).toBeNull();
    expect(screen.queryByText("Generated response")).toBeNull();
  });

  test("stale generate success after a project switch does not update the current project", async () => {
    const generateDeferred = createDeferred<Response>();

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
    fetchMock.mockReturnValueOnce(generateDeferred.promise);

    const { rerender } = render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Generowanie..." })).toBeTruthy();
    });

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    generateDeferred.resolve(
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
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    expect(screen.queryByText("Generated response")).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Tytuł" })).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Zapisz do wiedzy" }),
    ).toBeNull();
    expect(screen.queryByText("Unexpected generation error.")).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("stale generate error after a project switch does not set the current project error", async () => {
    const generateDeferred = createDeferred<Response>();

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
    fetchMock.mockReturnValueOnce(generateDeferred.promise);

    const { rerender } = render(<ProjectAiWorkspacePage />);

    const instructionField = await screen.findByRole("textbox", {
      name: "Instrukcja",
    });
    fireEvent.change(instructionField, {
      target: { value: "Summarize project" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generuj" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Generowanie..." })).toBeTruthy();
    });

    useParamsMock.mockReturnValue({ id: "project-2" });
    rerender(<ProjectAiWorkspacePage />);

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    generateDeferred.reject(new Error("stale generation failed"));
    await generateDeferred.promise.catch(() => undefined);

    await waitFor(() => {
      expect(screen.getByText("Beta")).toBeTruthy();
    });

    expect(screen.queryByText("Unexpected generation error.")).toBeNull();
    expect(screen.queryByText("Generated response")).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Tytuł" })).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Zapisz do wiedzy" }),
    ).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
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

    expect(screen.getByText("Ładowanie kontekstu AI projektu...")).toBeTruthy();

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

  test("renders the Chief Architect and Codex operating model in the project workspace", async () => {
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
      expect(screen.getByText("Model pracy AI")).toBeTruthy();
    });

    expect(
      screen.getByText("Lewa strona prowadzi rozmowę Chief Architect / Konduktor."),
    ).toBeTruthy();
    expect(
      screen.getByText("Prawa strona przygotowuje okno pracy Codexa i handoff."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Project Brain dostarcza kontekst, a Konduktor wskazuje następny bezpieczny krok.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Gotowy wynik możesz skopiować przyciskiem Kopiuj przy odpowiedzi.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Status kontraktu workbench")).toBeTruthy();
    expect(screen.getByText("Zintegrowany Workbench Projektu")).toBeTruthy();
    expect(
      screen.getByText("Lewy panel: Chief Architect / Konduktor / Project Brain."),
    ).toBeTruthy();
    expect(screen.getByText("Prawy panel: manualne okno Codexa.")).toBeTruthy();
    expect(screen.getByText("Etap wykonania")).toBeTruthy();
    expect(screen.getByText("Manualny roundtrip")).toBeTruthy();
    expect(
      screen.getByText("Handoff i raport przechodzą przez kopiuj/wklej."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Codex runner / execution bridge: przyszły etap zarządzany, teraz nieaktywny.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Wskazówka etapu")).toBeTruthy();
    expect(
      screen.getByText("Teraz: manualny handoff i raport Codexa."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Konduktor wskazuje następny krok w workbench bez uruchamiania pracy.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Dalej: osobno zatwierdzony, zarządzany etap Codex Window.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Pamięć operacyjna")).toBeTruthy();
    expect(
      screen.getByText(
        "Cross-Project Operational Memory: przyszłe źródło wzorców, teraz nieaktywne.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "SPS OS nie odpytuje ani nie stosuje pamięci międzyprojektowej w tym panelu.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Ten panel niczego nie automatyzuje i nie zapisuje do Project Brain.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Chat / Konduktor / Chief Architect")).toBeTruthy();
    expect(screen.getByText("Decyzje i przygotowanie handoffu")).toBeTruthy();
    expect(screen.getByText("Propozycje Konduktora")).toBeTruthy();
    expect(screen.getByText("Rekomendacja Project Brain")).toBeTruthy();
    expect(
      screen.getByText("Konduktor potrzebuje decyzji Product Ownera"),
    ).toBeTruthy();
    expect(screen.getByText("Wymaga decyzji Product Ownera")).toBeTruthy();
    expect(screen.getByText("Project Brain / Workflow Engine")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Dalej" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Akceptuję" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Przygotuj handoff" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Kopiuj instrukcję Konduktora" }),
    ).toBeTruthy();
    expect(screen.getByText("Gotowa instrukcja")).toBeTruthy();
    expect(
      screen.getByText(
        "Dalej. Przejdź do następnego bezpiecznego kroku zgodnie z aktualnym milestone.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Codex: handoff i wykonanie")).toBeTruthy();
    expect(screen.getByText("Okno pracy Codexa")).toBeTruthy();
    expect(
      screen.getByText(
        "Skopiuj przygotowany handoff, wklej go do Codexa i wróć tutaj z wynikiem wykonania.",
      ),
    ).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("selects Conductor quick actions with ready local instructions", async () => {
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

    const nextButton = await screen.findByRole("button", { name: "Dalej" });

    fireEvent.click(nextButton);

    expect(
      screen.getByText(
        "Dalej. Przejdź do następnego bezpiecznego kroku zgodnie z aktualnym milestone.",
      ),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Akceptuję" }));
    expect(
      screen.getByText(
        "Akceptuję proponowany krok. Potwierdź zakres i wskaż najmniejszy bezpieczny następny ruch.",
      ),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Przygotuj handoff" }),
    );
    expect(
      screen.getByText(
        "Przygotuj handoff do Codexa dla wybranego zakresu. Uwzględnij cel, dozwolone pliki, zakazy i komendy weryfikacji.",
      ),
    ).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(clipboardWriteTextMock).not.toHaveBeenCalled();
  });

  test("copies the displayed Conductor instruction only", async () => {
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

    render(<ProjectAiWorkspacePage />);

    await screen.findByText("Propozycje Konduktora");

    fireEvent.click(
      screen.getByRole("button", { name: "Przygotuj handoff" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Kopiuj instrukcję Konduktora" }),
    );

    await waitFor(() => {
      expect(clipboardWriteTextMock).toHaveBeenCalledTimes(1);
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(
        "Przygotuj handoff do Codexa dla wybranego zakresu. Uwzględnij cel, dozwolone pliki, zakazy i komendy weryfikacji.",
      );
      expect(
        screen.getByText("Skopiowano instrukcję Konduktora."),
      ).toBeTruthy();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("renders the handoff template in the Codex execution panel", async () => {
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
      expect(screen.getByText("Codex: handoff i wykonanie")).toBeTruthy();
    });

    expect(
      screen.getByText(
        (content, element) =>
          element?.tagName === "PRE" &&
          content.includes("SPS OS przygotowuje kontekst projektu i blok przekazania."),
      ),
    ).toBeTruthy();
    const handoffTemplate = screen.getByText(
      (content, element) =>
        element?.tagName === "PRE" &&
        content.includes("===== HANDOFF DO CODEXA START =====") &&
        content.includes("===== HANDOFF DO CODEXA END ====="),
    );

    expect(handoffTemplate).toBeTruthy();
    expect(handoffTemplate.textContent).toContain("Codex wykonuje tylko zaakceptowany zakres poza aplikacją.");
    expect(handoffTemplate.textContent).toContain("Poniższy handoff jest copy-ready i pozostaje ręczny.");
    expect(handoffTemplate.textContent).toContain("Session Identity:");
    expect(handoffTemplate.textContent).toContain("- Previous Session ID:");
    expect(handoffTemplate.textContent).toContain("- Current Session ID:");
    expect(handoffTemplate.textContent).toContain("- Next Session ID:");
    expect(handoffTemplate.textContent).toContain("- Identity source:");
    expect(handoffTemplate.textContent).toContain("Repository:");
    expect(handoffTemplate.textContent).toContain("- Path:");
    expect(handoffTemplate.textContent).toContain("- Branch:");
    expect(handoffTemplate.textContent).toContain("Milestone Control:");
    expect(handoffTemplate.textContent).toContain("- Current Product Milestone:");
    expect(handoffTemplate.textContent).toContain("- Latest Completed Milestone:");
    expect(handoffTemplate.textContent).toContain("- Visible Version Gate:");
    expect(handoffTemplate.textContent).toContain("Cost / Model:");
    expect(handoffTemplate.textContent).toContain("- Expected cost class:");
    expect(handoffTemplate.textContent).toContain("- Model baseline:");
    expect(handoffTemplate.textContent).toContain("- Usage record requirement:");
    expect(handoffTemplate.textContent).toContain("Cel: Konduktor potrzebuje decyzji Product Ownera");
    expect(handoffTemplate.textContent).toContain(
      "Zakres: Konduktor wskazuje następny kierunek, ale nie zatwierdza kamienia milowego i nie uruchamia pracy automatycznie. Product Owner pozostaje właścicielem decyzji.",
    );
    expect(handoffTemplate.textContent).toContain("Dozwolone pliki:");
    expect(handoffTemplate.textContent).toContain("Zakazane pliki:");
    expect(handoffTemplate.textContent).toContain("Weryfikacja:");
    expect(handoffTemplate.textContent).toContain("Kontekst projektu:");
    expect(handoffTemplate.textContent).toContain("- Project ID: project-1");
    expect(handoffTemplate.textContent).toContain("- Project name: Alpha");
    expect(handoffTemplate.textContent).toContain("- Tasks: 0");
    expect(handoffTemplate.textContent).toContain("- Knowledge entries: 0");
    expect(handoffTemplate.textContent).toContain("Rekomendacja Konduktora:");
    expect(handoffTemplate.textContent).toContain("- Gotowość: Wymaga decyzji Product Ownera");
    expect(handoffTemplate.textContent).toContain("Zasada wykonania:");
    expect(handoffTemplate.textContent).toContain("Codex pozostaje uruchamiany ręcznie poza SPS OS.");
    expect(handoffTemplate.textContent).toContain(
      "SPS OS nie uruchamia Codexa, nie dopowiada ukrytego scope, nie wykonuje komend, nie wywołuje providerów i nie mutuje zewnętrznych workspace.",
    );
    expect(handoffTemplate.textContent).toContain("Zasady pracy:");
    expect(handoffTemplate.textContent).toContain("oszczędzaj tokeny i kredyty");
    expect(handoffTemplate.textContent).toContain("diagnozuj przed edycją");
    expect(handoffTemplate.textContent).toContain("stosuj minimalny patch");
    expect(handoffTemplate.textContent).toContain("nie refaktoruj przy okazji");
    expect(handoffTemplate.textContent).toContain("nie rozszerzaj scope");
    expect(handoffTemplate.textContent).toContain("nie commituj ani nie pushuj bez trybu publikacji");
    expect(handoffTemplate.textContent).toContain("raportuj w bloku do skopiowania");
    expect(handoffTemplate.textContent).toContain("nie przechodź na SOL bez decyzji Product Ownera");
    expect(handoffTemplate.textContent).toContain("Wymagany raport Codexa:");
    expect(handoffTemplate.textContent).toContain("files changed");
    expect(handoffTemplate.textContent).toContain("Visible Version Gate status");
    expect(handoffTemplate.textContent).toContain("usage record written: yes/no");
    expect(handoffTemplate.textContent).toContain("git status after work");
    expect(handoffTemplate.textContent).toContain("do not commit or push");
  });

  test("shows a read-only hint for the handoff context fields", async () => {
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
      expect(
        screen.getByText(
          "Session Identity pobierz z aktywnego SPS OS session/bootstrap.",
        ),
      ).toBeTruthy();
    });

    expect(
      screen.getByText("Repository i Branch pobierz z Git Context aktywnego pakietu."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Current Product Milestone i Latest Completed Milestone bierz z SSOT.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Visible Version Gate, koszt, model i usage record bierz z zatwierdzonego kontraktu milestone.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "SPS OS nie uzupelnia tych pol automatycznie na tym etapie.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Manualne wypelnianie")).toBeTruthy();
    expect(
      screen.getByText(
        "Session Identity kopiuj z bootstrapu aktywnej sesji SPS OS.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Previous, Current i Next Session ID kopiuj bez zgadywania.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Repository wpisz jako sciezke repozytorium SPS OS, a Branch jako aktywna galaz.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Cel bierz z celu zatwierdzonego milestone.")).toBeTruthy();
    expect(screen.getByText("Zakres bierz z zatwierdzonego scope.")).toBeTruthy();
    expect(
      screen.getByText(
        "Dozwolone pliki i Zakazane pliki bierz z handoffu lub kontraktu.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText("Weryfikacja bierz z planu weryfikacji."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Required Codex report fields zostaw w bloku, zeby wynik byl kompletny.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        (content, element) =>
          element?.tagName === "PRE" && content.includes("Zasady pracy:"),
      ),
    ).toBeTruthy();
  });

  test("copies the handoff block and shows the copied state", async () => {
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

    render(<ProjectAiWorkspacePage />);

    const copyButton = await screen.findByRole("button", {
      name: "Kopiuj handoff",
    });

    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(clipboardWriteTextMock).toHaveBeenCalledTimes(1);
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(
        expect.stringContaining("Cel: Konduktor potrzebuje decyzji Product Ownera"),
      );
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(
        expect.stringContaining("- Project name: Alpha"),
      );
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(
        expect.stringContaining("Ten handoff nie wykonuje automatycznie pracy ani milestone."),
      );
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(
        expect.stringContaining("- Visible Version Gate:"),
      );
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(
        expect.stringContaining("Wymagany raport Codexa:"),
      );
      expect(screen.getByRole("button", { name: "Skopiowano" })).toBeTruthy();
    });
  });

  test("keeps pasted Codex reports local and copies them from the right panel", async () => {
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

    render(<ProjectAiWorkspacePage />);

    const codexReportField = await screen.findByRole("textbox", {
      name: "Odpowiedź Codexa / Raport Codexa",
    });

    expect(screen.getByText("Manualny przepływ Codexa")).toBeTruthy();
    expect(
      screen.getByText(
        "Przygotuj handoff -> Wklej do Codexa -> Wklej raport -> Przejrzyj -> Zaakceptuj -> Opublikuj -> Zwróć raport publikacji.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "To podsumowanie procesu: SPS OS nie dodaje stanu ani automatyzacji.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Skopiuj handoff.")).toBeTruthy();
    expect(screen.getByText("Wklej go do zewnętrznego Codexa.")).toBeTruthy();
    expect(screen.getByText("Wklej raport Codexa z powrotem tutaj.")).toBeTruthy();
    expect(
      screen.getByText("Skopiuj raport do przeglądu Chief Architect."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Pole jest lokalne: SPS OS nie zapisuje, nie analizuje i nie wysyła tej treści do API.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Przegląd raportu")).toBeTruthy();
    expect(
      screen.getByText(
        "Sprawdź, czy wykonany zakres zgadza się z zaakceptowanym handoffem.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Potwierdź wyniki weryfikacji i Visible Version Gate, jeśli był wymagany.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Porównaj forbidden areas, blockers/deviations oraz status commit/push.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Ten blok jest tylko listą kontrolną: SPS OS nie parsuje, nie zapisuje i nie waliduje raportu automatycznie.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Akceptacja raportu")).toBeTruthy();
    expect(
      screen.getByText(
        "Po pozytywnym przeglądzie Product Owner może zaakceptować lokalny wynik.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Akceptacja raportu nie wykonuje automatycznie commit ani push.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText("Commit/push pozostaje osobnym, jawnym handoffem albo akcją."),
    ).toBeTruthy();
    expect(
      screen.getByText("Nierozwiązane blockers/deviations zatrzymują publikację."),
    ).toBeTruthy();
    expect(screen.getByText("Zwrot raportu publikacji")).toBeTruthy();
    expect(
      screen.getByText("Po commit/push zwróć do Chief Architect commit hash i subject."),
    ).toBeTruthy();
    expect(
      screen.getByText("Dodaj push status, final repository status i wyniki weryfikacji."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Dodaj Version Gate status, usage record status oraz blockers/deviations.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Ten blok niczego nie generuje automatycznie i nie publikuje zmian.",
      ),
    ).toBeTruthy();

    fireEvent.change(codexReportField, {
      target: { value: "Codex report ready for review" },
    });

    expect(codexReportField).toHaveProperty(
      "value",
      "Codex report ready for review",
    );
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Kopiuj raport" }));

    await waitFor(() => {
      expect(clipboardWriteTextMock).toHaveBeenCalledTimes(1);
      expect(clipboardWriteTextMock).toHaveBeenCalledWith(
        "Codex report ready for review",
      );
      expect(
        screen.getByRole("button", { name: "Skopiowano raport" }),
      ).toBeTruthy();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("shows the copied Codex report state even when clipboard is unavailable", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    render(<ProjectAiWorkspacePage />);

    const codexReportField = await screen.findByRole("textbox", {
      name: "Odpowiedź Codexa / Raport Codexa",
    });
    fireEvent.change(codexReportField, {
      target: { value: "Clipboard unavailable report" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Kopiuj raport" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Skopiowano raport" }),
      ).toBeTruthy();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("shows the copied state even when clipboard is unavailable", async () => {
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha",
        tasks: [],
        knowledgeEntries: [],
      },
    });
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    render(<ProjectAiWorkspacePage />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: "Kopiuj handoff",
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Skopiowano" })).toBeTruthy();
    });
  });

  test("renders the AI Workspace layout bands and anchors", async () => {
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
      expect(
        screen.getByRole("navigation", { name: "Sekcje obszaru AI" }),
      ).toBeTruthy();
    });

    expect(screen.getByRole("link", { name: "Kontekst projektu" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "AI chat" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Wartość projektu" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Codex" })).toBeTruthy();
    expect(document.getElementById("project-context")).not.toBeNull();
    expect(document.getElementById("project-value")).not.toBeNull();
    expect(document.getElementById("ai-chat")).not.toBeNull();
    expect(document.getElementById("ai-workbench")).not.toBeNull();
    expect(document.getElementById("codex-handoff")).not.toBeNull();
  });
});
