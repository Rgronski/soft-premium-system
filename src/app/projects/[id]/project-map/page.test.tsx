// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));
const getProjectByIdMock = vi.fn();

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@/lib/project/project", () => ({
  getProjectById: (projectId: string) => getProjectByIdMock(projectId),
}));

import ProjectMapPage from "./page";

describe("ProjectMapPage", () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ id: "project-1" });
    getProjectByIdMock.mockReset();
    getProjectByIdMock.mockReturnValue({
      id: "project-1",
      name: "Alpha Workspace",
      createdAt: "2026-08-03T10:00:00.000Z",
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders the visible Project Map shell for the current project context", () => {
    render(<ProjectMapPage />);

    expect(screen.getByText("Mapa projektu")).toBeTruthy();
    expect(screen.getByText("Shell przyszłej Mapy projektu")).toBeTruthy();
    expect(screen.getByText("Alpha Workspace")).toBeTruthy();
    expect(screen.getByText("Project Identity")).toBeTruthy();
    expect(screen.getByText("dostępny")).toBeTruthy();
    expect(screen.getAllByText("planowane")).toHaveLength(6);
    expect(screen.getByText("niegotowe")).toBeTruthy();
    expect(
      screen.getByText(
        "To jest widok kandydacki, nie kanoniczna Mapa projektu. Akcje zapisu, promowania i accept/write pozostają poza zakresem.",
      ),
    ).toBeTruthy();
  });

  test("shows a not-ready shell when the project context is missing", () => {
    getProjectByIdMock.mockReturnValueOnce(null);

    render(<ProjectMapPage />);

    expect(screen.getByText("Projekt nie został znaleziony.")).toBeTruthy();
    expect(screen.getByText("nieznany")).toBeTruthy();
    expect(screen.getByText("niegotowe")).toBeTruthy();
  });
});
