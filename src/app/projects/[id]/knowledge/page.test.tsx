// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getBrowserAiProjectContextMock = vi.fn();
const getProjectByIdMock = vi.fn();
const getKnowledgeMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project-brain/browser", () => ({
  getBrowserAiProjectContext: (projectId: string) =>
    getBrowserAiProjectContextMock(projectId),
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
    getBrowserAiProjectContextMock.mockReset();
    getProjectByIdMock.mockReset();
    getKnowledgeMock.mockReset();
    getProjectByIdMock.mockReturnValue(null);
    getKnowledgeMock.mockReturnValue([]);
    getBrowserAiProjectContextMock.mockResolvedValue({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha Workspace",
        tasks: [],
        knowledgeEntries: [
          {
            id: "knowledge-1",
            title: "Knowledge note",
            content: "Server-backed context.",
          },
        ],
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders the workspace knowledge collection for the route project id", async () => {
    render(<ProjectKnowledgePage />);

    await waitFor(() => {
      expect(getBrowserAiProjectContextMock).toHaveBeenCalledTimes(1);
      expect(getBrowserAiProjectContextMock).toHaveBeenCalledWith("project-1");
    });

    expect(screen.getByText("Wiedza")).toBeTruthy();
    expect(
      screen.getByText("Wpisy wiedzy tylko do odczytu dla bieżącej przestrzeni projektu."),
    ).toBeTruthy();
    expect(screen.getByText("Knowledge note")).toBeTruthy();
  });

  test("renders the empty state when the knowledge collection is empty", async () => {
    getBrowserAiProjectContextMock.mockResolvedValueOnce({
      status: "available",
      context: {
        projectId: "project-1",
        projectName: "Alpha Workspace",
        tasks: [],
        knowledgeEntries: [],
      },
    });

    render(<ProjectKnowledgePage />);

    await waitFor(() => {
      expect(screen.getByText("Brak dostępnych wpisów wiedzy.")).toBeTruthy();
    });
  });

  test("recovers from stale project context with local knowledge entries", async () => {
    getBrowserAiProjectContextMock.mockResolvedValueOnce({
      status: "project-not-found",
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
          "Kontekst Project Brain jest niedostępny, więc pokazuję lokalnie zapisane wpisy wiedzy dla tego projektu.",
        ),
      ).toBeTruthy();
    });

    expect(getBrowserAiProjectContextMock).toHaveBeenCalledWith("project-1");
    expect(getProjectByIdMock).toHaveBeenCalledWith("project-1");
    expect(getKnowledgeMock).toHaveBeenCalledWith("project-1");
    expect(screen.getByText("Recovered knowledge")).toBeTruthy();
    expect(screen.queryByText("Projekt nie został znaleziony")).toBeNull();
  });
});
