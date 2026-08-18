// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getProjectWorkspaceEntryMock = vi.fn();
const getProjectByIdMock = vi.fn();
const getTasksMock = vi.fn();
const getTasksFromServerMock = vi.fn();
const getKnowledgeMock = vi.fn();
const deleteProjectMock = vi.fn();
const deleteProjectFromServerMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/lib/project-brain/engine", () => ({
  getProjectWorkspaceEntry: (projectId: string) =>
    getProjectWorkspaceEntryMock(projectId),
}));

vi.mock("@/lib/project/project", async () => {
  const actual = await vi.importActual<typeof import("@/lib/project/project")>(
    "@/lib/project/project",
  );

  return {
    ...actual,
    deleteProject: (projectId: string) => deleteProjectMock(projectId),
    getProjectById: (projectId: string) => getProjectByIdMock(projectId),
  };
});

vi.mock("@/lib/task/browser-server", () => ({
  getTasksFromServer: (projectId: string) => getTasksFromServerMock(projectId),
}));

vi.mock("@/lib/task/task", () => ({
  getTasks: (projectId: string) => getTasksMock(projectId),
}));

vi.mock("@/lib/knowledge/knowledge", () => ({
  getKnowledge: (projectId: string) => getKnowledgeMock(projectId),
}));

vi.mock("@/lib/project/browser-server", () => ({
  deleteProjectFromServer: (projectId: string) =>
    deleteProjectFromServerMock(projectId),
}));

import ProjectWorkspacePage from "./page";

describe("ProjectWorkspacePage filesystem status", () => {
  beforeEach(() => {
    localStorage.clear();
    useParamsMock.mockReturnValue({ id: "project-1" });
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
              label: "Kontynuuj aktywną pracę",
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
    getProjectByIdMock.mockReturnValue({
      id: "project-1",
      name: "Alpha Workspace",
      createdAt: "2026-08-03T10:00:00.000Z",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
      projectFilesystemStatus: "manifest-present",
    });
    getTasksMock.mockReturnValue([]);
    getTasksFromServerMock.mockResolvedValue([]);
    getKnowledgeMock.mockReturnValue([]);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("shows the filesystem manifest status on the project surface", () => {
    render(<ProjectWorkspacePage />);

    expect(screen.getByText("Stan systemu plików")).toBeTruthy();
    expect(screen.getByText("Tryb źródła")).toBeTruthy();
    expect(screen.getByText("tylko manifest")).toBeTruthy();
    expect(screen.getByText("Adres GitHub: nie podano")).toBeTruthy();
    expect(screen.getByText("Lokalne repo Git: niedostępne")).toBeTruthy();
    expect(
      screen.getByText(
        "Następny krok: podaj adres GitHub lub wskaż istniejący katalog repo.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Kontekst repozytorium niedostępny: projekt ma manifest SPS, ale nie ma lokalnego repo Git.",
      ),
    ).toBeTruthy();
  });
});
