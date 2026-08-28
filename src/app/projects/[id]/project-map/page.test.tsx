// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const getServerProjectByIdMock = vi.fn();
const resolveProjectMapReadResultMock = vi.fn();

vi.mock("@/lib/project/server", () => ({
  getServerProjectById: (projectId: string) => getServerProjectByIdMock(projectId),
}));

vi.mock("@/lib/project-map/read", () => ({
  resolveProjectMapReadResult: (project: unknown) =>
    resolveProjectMapReadResultMock(project),
}));

import ProjectMapPage from "./page";

describe("ProjectMapPage", () => {
  beforeEach(() => {
    getServerProjectByIdMock.mockReset();
    resolveProjectMapReadResultMock.mockReset();
    getServerProjectByIdMock.mockResolvedValue({
      id: "project-1",
      name: "Alpha Workspace",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
    });
    resolveProjectMapReadResultMock.mockResolvedValue({
      status: "missing",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map\\map.json",
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders the visible Project Map shell with an explicit missing map state", async () => {
    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );

    expect(screen.getByText("Mapa projektu")).toBeTruthy();
    expect(screen.getByText("Shell przyszłej Mapy projektu")).toBeTruthy();
    expect(screen.getByText("Alpha Workspace")).toBeTruthy();
    expect(screen.getByText("Stan odczytu mapy")).toBeTruthy();
    expect(screen.getByText("Mapa projektu nie jest jeszcze gotowa")).toBeTruthy();
    expect(screen.getByText("Project Identity")).toBeTruthy();
    expect(screen.getByText("dostępny")).toBeTruthy();
    expect(screen.getAllByText("planowane")).toHaveLength(6);
    expect(screen.getByText("brak / niegotowe")).toBeTruthy();
    expect(
      screen.getByText(
        "To jest widok kandydacki, nie kanoniczna Mapa projektu. Akcje zapisu, promowania i accept/write pozostają poza zakresem.",
      ),
    ).toBeTruthy();
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("project-1");
    expect(resolveProjectMapReadResultMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
    });
  });

  test("shows an unavailable shell when the project identity is missing", async () => {
    getServerProjectByIdMock.mockResolvedValueOnce(null);

    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );

    expect(screen.getByText("Projekt nie został znaleziony.")).toBeTruthy();
    expect(screen.getByText("niedostępny")).toBeTruthy();
    expect(screen.getByText("Kontekst projektu niedostępny")).toBeTruthy();
    expect(screen.getByText("Brak poprawnego kontekstu projektu.")).toBeTruthy();
    expect(resolveProjectMapReadResultMock).not.toHaveBeenCalled();
  });

  test("shows an explicit read-not-implemented state when the map file already exists", async () => {
    resolveProjectMapReadResultMock.mockResolvedValueOnce({
      status: "unavailable",
      reason: "project-map-present-but-read-not-implemented",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map\\map.json",
    });

    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );

    expect(
      screen.getByText(
        "Mapa projektu jest obecna, ale odczyt niezaimplementowany",
      ),
    ).toBeTruthy();
    expect(screen.getByText("obecna / odczyt niezaimplementowany")).toBeTruthy();
    expect(screen.getByText((content) => content.includes("map.json:"))).toBeTruthy();
  });
});
