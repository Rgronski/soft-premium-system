// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const accessMock = vi.fn();
const mkdirMock = vi.fn();
const getServerProjectByIdMock = vi.fn();
const resolveProjectMapStorageRootMock = vi.fn();
const resolveProjectMapReadResultMock = vi.fn();
const scanProjectMapEvidenceMock = vi.fn();
const classifyProjectMapEvidenceMock = vi.fn();
const buildProjectMapReconstructionCandidateMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  __esModule: true,
  access: (...args: unknown[]) => accessMock(...args),
  mkdir: (...args: unknown[]) => mkdirMock(...args),
  default: {
    access: (...args: unknown[]) => accessMock(...args),
    mkdir: (...args: unknown[]) => mkdirMock(...args),
  },
}));

vi.mock("@/lib/project-brain/metadata", () => ({
  resolveProjectMapStorageRoot: (project: unknown) =>
    resolveProjectMapStorageRootMock(project),
}));

vi.mock("@/lib/project/server", () => ({
  getServerProjectById: (projectId: string) => getServerProjectByIdMock(projectId),
}));

vi.mock("@/lib/project-map/read", () => ({
  resolveProjectMapReadResult: (project: unknown) =>
    resolveProjectMapReadResultMock(project),
}));

vi.mock("@/lib/project-map/scan", () => ({
  scanProjectMapEvidence: (project: unknown) => scanProjectMapEvidenceMock(project),
}));

vi.mock("@/lib/project-map/classify", () => ({
  classifyProjectMapEvidence: (scanResult: unknown) =>
    classifyProjectMapEvidenceMock(scanResult),
}));

vi.mock("@/lib/project-map/reconstruct", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/project-map/reconstruct")>();

  return {
    ...actual,
    buildProjectMapReconstructionCandidate: (classification: unknown) =>
      buildProjectMapReconstructionCandidateMock(classification),
  };
});

import ProjectMapPage from "./page";

function buildAvailableCandidate() {
  return {
    status: "available" as const,
    projectId: "project-1",
    projectName: "Alpha Workspace",
    sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
    foundationChecklist: [
      {
        foundationArea: "Project Identity",
        status: "completed",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["completed"],
        evidence: [
          {
            evidenceType: "readme",
            discoveryStatus: "found",
            sourceOwner: "project",
            sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\README.md",
            sourceRelativePath: "README.md",
            projectId: "project-1",
            projectName: "Alpha Workspace",
            confidence: "direct",
            foundationAreas: ["Project Identity", "Working Source"],
            milestoneStates: ["unknown"],
            conflictState: "none",
            supportState: "confirmed",
          },
        ],
      },
      {
        foundationArea: "SSOT",
        status: "needs review",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["planned"],
        evidence: [
          {
            evidenceType: "current-state",
            discoveryStatus: "found",
            sourceOwner: "project",
            sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\08_CURRENT_STATE.md",
            sourceRelativePath: "docs/08_CURRENT_STATE.md",
            projectId: "project-1",
            projectName: "Alpha Workspace",
            confidence: "direct",
            foundationAreas: ["SSOT", "Project Map"],
            milestoneStates: ["unknown"],
            conflictState: "none",
            supportState: "confirmed",
          },
          {
            evidenceType: "session-state",
            discoveryStatus: "found",
            sourceOwner: "project",
            sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\10_SESSION_STATE.md",
            sourceRelativePath: "docs/10_SESSION_STATE.md",
            projectId: "project-1",
            projectName: "Alpha Workspace",
            confidence: "direct",
            foundationAreas: ["SSOT"],
            milestoneStates: ["unknown"],
            conflictState: "none",
            supportState: "confirmed",
          },
        ],
      },
      {
        foundationArea: "Project Bible",
        status: "planned",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["planned"],
        evidence: [],
      },
      {
        foundationArea: "Project Map",
        status: "needs review",
        supportState: "inferred",
        conflictState: "conflicting",
        milestoneStates: ["unknown"],
        evidence: [],
      },
      {
        foundationArea: "Working Source",
        status: "completed",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["completed"],
        evidence: [],
      },
      {
        foundationArea: "First Layout",
        status: "absent",
        supportState: "missing",
        conflictState: "none",
        milestoneStates: ["absent"],
        evidence: [],
      },
      {
        foundationArea: "First Working Flow",
        status: "planned",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["planned"],
        evidence: [],
      },
      {
        foundationArea: "Publication Path",
        status: "parked",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["parked"],
        evidence: [
          {
            evidenceType: "decision/ADR",
            discoveryStatus: "found",
            sourceOwner: "project",
            sourcePath:
              "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\adr\\2026-08-29-parked-ideas.md",
            sourceRelativePath:
              "docs/adr/2026-08-29-parked-ideas.md",
            projectId: "project-1",
            projectName: "Alpha Workspace",
            confidence: "direct",
            foundationAreas: ["Publication Path"],
            milestoneStates: ["parked"],
            conflictState: "none",
            supportState: "confirmed",
          },
        ],
      },
    ],
    evidence: [
      {
        evidenceType: "readme",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\README.md",
        sourceRelativePath: "README.md",
        projectId: "project-1",
        projectName: "Alpha Workspace",
        confidence: "direct",
        foundationAreas: ["Project Identity", "Working Source"],
        milestoneStates: ["unknown"],
        conflictState: "none",
        supportState: "confirmed",
      },
      {
        evidenceType: "roadmap",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\04_ROADMAP.md",
        sourceRelativePath: "docs/04_ROADMAP.md",
        projectId: "project-1",
        projectName: "Alpha Workspace",
        confidence: "direct",
        foundationAreas: ["Project Map"],
        milestoneStates: ["planned"],
        conflictState: "none",
        supportState: "confirmed",
      },
    ],
  };
}

function buildUnavailableCandidate() {
  return {
    status: "unavailable" as const,
    reason: "project-source-path-unavailable" as const,
    confidence: "unavailable" as const,
    projectId: "project-1",
    projectName: "Alpha Workspace",
    sourcePath: undefined,
    foundationChecklist: [],
    evidence: [],
  };
}

function buildReadyCandidate() {
  return {
    status: "available" as const,
    projectId: "project-1",
    projectName: "Alpha Workspace",
    sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
    foundationChecklist: [
      {
        foundationArea: "Project Identity",
        status: "completed",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["completed"],
        evidence: [],
      },
    ],
    evidence: [],
  };
}

describe("ProjectMapPage", () => {
  beforeEach(() => {
    accessMock.mockReset();
    mkdirMock.mockReset();
    getServerProjectByIdMock.mockReset();
    resolveProjectMapStorageRootMock.mockReset();
    resolveProjectMapReadResultMock.mockReset();
    scanProjectMapEvidenceMock.mockReset();
    classifyProjectMapEvidenceMock.mockReset();
    buildProjectMapReconstructionCandidateMock.mockReset();

    accessMock.mockRejectedValue(
      Object.assign(new Error("missing"), { code: "ENOENT" }),
    );
    mkdirMock.mockResolvedValue(undefined);

    getServerProjectByIdMock.mockResolvedValue({
      id: "project-1",
      name: "Alpha Workspace",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
    });

    resolveProjectMapStorageRootMock.mockReturnValue({
      status: "available",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map",
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
      projectSourceIdentityPersistence: {
        status: "persisted",
        persistedAt: "2026-08-30T12:34:56.000Z",
      },
      projectSourceIdentity: {
        projectId: "project-1",
        projectName: "Alpha Workspace",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
        projectCheckoutPath: "C:\\SPS_OS_WORK\\alpha-workspace\\repo",
      },
    });

    scanProjectMapEvidenceMock.mockResolvedValue({
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\repo",
      evidence: [],
    });

    classifyProjectMapEvidenceMock.mockReturnValue({
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\repo",
      evidence: [],
    });

    buildProjectMapReconstructionCandidateMock.mockReturnValue(
      buildAvailableCandidate(),
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders the visible Project Map shell with explicit missing map state and a reviewable candidate", async () => {
    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Shell przyszłej Mapy projektu" }),
    ).toBeTruthy();
    expect(screen.getByText("Alpha Workspace")).toBeTruthy();
    expect(screen.getAllByText("Następny krok").length).toBeGreaterThan(0);
    expect(
      screen
        .getByRole("link", { name: /Przygotuj/ })
        .getAttribute("href"),
    ).toBe("/projects/project-1/project-map?prepareStorage=1");
    expect(screen.getAllByText("Widok teraz: kandydat read-only").length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(
        "Robocza mapa projektu została zbudowana z dostępnych danych. Pozostaje kandydatem read-only i nie jest canonical map.json.",
      ).length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("link", { name: "Pokaż roboczą mapę" })).toBeTruthy();
    expect(
      screen.getAllByText((content) => content.includes("Kanoniczny zapis")).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Gotowe")).toBeTruthy();
    expect(screen.getByText("Następne")).toBeTruthy();
    expect(screen.getByText("Odłożone")).toBeTruthy();
    expect(screen.getByText("Robocza mapa projektu")).toBeTruthy();
    expect(screen.getByText("Mapa z repo + SSOT")).toBeTruthy();
    expect(screen.getByText("Zaufanie: kandydat read-only")).toBeTruthy();
    expect(screen.getByText("Co to za projekt?")).toBeTruthy();
    expect(screen.getAllByText((content) => content.includes("ID projektu:")).length).toBeGreaterThan(0);
    expect(screen.getAllByText((content) => content.includes("Adres repozytorium:")).length).toBeGreaterThan(0);
    expect(screen.getByText("Co już mamy?")).toBeTruthy();
    expect(screen.getByText("Co jest pod review?")).toBeTruthy();
    expect(screen.getByText("Co jest odrzucone / zablokowane?")).toBeTruthy();
    expect(screen.getByText("Czego brakuje?")).toBeTruthy();
    expect(screen.getByText("Co dalej?")).toBeTruthy();
    expect(screen.getByText("Z jakich dokumentów to wynika?")).toBeTruthy();
    expect(
      screen.getAllByText("Źródło stanu: repo + SSOT + evidence kandydata.")[0],
    ).toBeTruthy();
    expect(screen.getAllByText("Status tożsamości źródła: zgodne").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Utrwalenie tożsamości źródła: utrwalone").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Dokumenty SSOT zostały znalezione i mogą wspierać mapę kandydata.").length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText("SSOT remains absent in the candidate map.")).toBeNull();
    expect(
      screen.getByText((content) =>
        content.includes("Potwierdzony stan projektu:") &&
        content.includes("Tożsamość projektu"),
      ),
    ).toBeTruthy();
    expect(screen.getByText("Stan kandydata: kandydat read-only")).toBeTruthy();
    expect(
      screen.getAllByText((content) =>
        content.includes("Przejrzyj sekcje mapy wynikające z SSOT przed jakimkolwiek zapisem kanonicznym."),
      ).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Wyjaśnienie dostępności sekcji")).toBeTruthy();
    expect(screen.getByText("Co działa, co czeka i co blokuje")).toBeTruthy();
    expect(screen.getByText("Co jest aktualne w Mapie projektu")).toBeTruthy();
    expect(
      screen.getByText("Kanoniczna mapa: absent / brak kanonicznego map.json."),
    ).toBeTruthy();
    expect(
      screen.getByText("Widoczna mapa: roboczy kandydat, nie stan kanoniczny."),
    ).toBeTruthy();
    expect(
      screen.getByText("Zapis kanoniczny: nie jest teraz wykonywany."),
    ).toBeTruthy();
    expect(
      screen.getByText("Lokalne potwierdzenie: nie jest utrwalone i nie zapisuje map.json."),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Następny wymagany krok: osobny zatwierdzony milestone wykonawczy.",
      ),
    ).toBeTruthy();
    expect(screen.getAllByText("Status: kandydat").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Źródło: kandydat").length).toBeGreaterThan(0);
    expect(screen.getByText("Stan kanoniczny vs kandydat")).toBeTruthy();
    expect(screen.getAllByText("Widok teraz: kandydat read-only").length).toBeGreaterThan(0);
    expect(screen.getByText("Kanoniczna Mapa projektu: brak")).toBeTruthy();
    expect(screen.getByText("Kandydat rekonstrukcji: dostępny")).toBeTruthy();
    expect(screen.getByText("Preview status zapisu kanonicznego")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "NEEDS_EVIDENCE" })).toBeTruthy();
    expect(screen.getByText("Status preview: NEEDS_EVIDENCE")).toBeTruthy();
    expect(screen.getByText("Bramka akcji zapisu kanonicznego")).toBeTruthy();
    expect(screen.getByText("Status akcji: potrzeba evidence")).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: "Akcja niedostępna - potrzeba evidence",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      (
        screen.getByRole("checkbox", {
          name: /Lokalne potwierdzenie niewystarczające/,
        }) as HTMLInputElement
      ).disabled,
    ).toBe(true);
    expect(
      screen.getByText(
        "Lokalne potwierdzenie nie omija braków evidence, nie jest utrwalone, nie uruchamia milestone wykonawczego i nie zapisuje map.json.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Kandydat ma braki, słabe dowody, wnioski lub konflikty evidence.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "map.json teraz: absent / brak kanonicznego pliku",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Evidence risks: 3")).toBeTruthy();
    expect(
      screen.getByText("Ten milestone nie zapisuje, nie tworzy i nie promuje map.json."),
    ).toBeTruthy();
    expect(
      screen.getAllByText("Utrwalenie tożsamości źródła: utrwalone").length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Widoczność odłożonych pomysłów")).toBeTruthy();
    expect(screen.getByText("Szczegóły odłożonych pomysłów")).toBeTruthy();
    expect(screen.getAllByText("Ścieżka publikacji: odłożone | milestones: odłożone").length).toBeGreaterThan(0);
    expect(screen.getByText("Szczegóły evidence milestone'ów")).toBeTruthy();
    expect(
      screen.getByText(
        "Powód statusu: Parked evidence utrzymuje ten blok jako przyszły kontekst, nie aktywny zakres.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Stan evidence: candidate / parked | typ źródła: decision/ADR | właściciel źródła: project | ścieżka źródła: C:\\SPS_OS_WORK\\alpha-workspace\\docs\\adr\\2026-08-29-parked-ideas.md | confidence: direct | support: confirmed | conflict: none",
      ),
    ).toBeTruthy();
    expect(
      screen.queryByText("Brak source evidence połączonego z tym blokiem."),
    ).toBeNull();
    expect(screen.getByText("Stan odczytu mapy")).toBeTruthy();
    expect(
      screen.getAllByText((content) => content.includes("Mapa projektu nie jest jeszcze gotowa")).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("candidate").length).toBeGreaterThan(0);
    expect(screen.getByText("Pipeline kandydata")).toBeTruthy();
    expect(screen.getByText("Szczegóły pipeline kandydata")).toBeTruthy();
    expect(screen.getByText("Statusy foundation kandydata")).toBeTruthy();
    expect(screen.getByText("Evidence i provenance")).toBeTruthy();
    expect(screen.getAllByText("Tożsamość projektu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Mapa projektu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("wymaga review").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText((content) => content.includes("README.md")).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText("Adres repozytorium jest połączony z tożsamością źródła i utrwalony w SPS metadata root."),
    ).toBeTruthy();
    expect(
      screen.getByText((content) =>
        content.includes("Evidence i provenance pozostają w szczegółach, a zapis kanoniczny jest osobny."),
      ),
    ).toBeTruthy();
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("project-1");
    expect(resolveProjectMapReadResultMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
    });
    expect(scanProjectMapEvidenceMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\repo",
    });
    expect(classifyProjectMapEvidenceMock).toHaveBeenCalledWith({
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\repo",
      evidence: [],
    });
    expect(buildProjectMapReconstructionCandidateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "available",
        projectId: "project-1",
      }),
    );
  });

  test("shows a precise repository-url source-identity warning when the project URL is not connected", async () => {
    getServerProjectByIdMock.mockResolvedValueOnce({
      id: "project-1",
      name: "Alpha Workspace",
      repositoryUrl: "https://github.com/example/alpha-workspace.git",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
    });

    resolveProjectMapReadResultMock.mockResolvedValueOnce({
      status: "missing",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map\\map.json",
      projectSourceIdentityPersistence: {
        status: "persisted",
        persistedAt: "2026-08-30T12:34:56.000Z",
      },
      projectSourceIdentity: {
        projectId: "project-1",
        projectName: "Alpha Workspace",
        repositoryUrl: null,
        workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
        projectCheckoutPath: "C:\\SPS_OS_WORK\\alpha-workspace\\repo",
      },
    });

    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );

    expect(screen.getByText("Adres repozytorium / tożsamość źródła")).toBeTruthy();
    expect(screen.getByText("Status: blokada")).toBeTruthy();
    expect(
      screen.getByText(
        "Adres repozytorium jest oczekiwany w BCP, ale tożsamość źródła Project Map nadal pokazuje brak połączenia.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText((content) =>
        content.includes("tożsamości źródła") && content.includes("zaufasz kandydatowi"),
      ),
    ).toBeTruthy();
    expect(screen.getAllByText("Źródło: projekt").length).toBeGreaterThan(0);
  });

  test("creates Project Map storage and shows the ready CTA when preparation is requested", async () => {
    accessMock
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(
        Object.assign(new Error("missing"), { code: "ENOENT" }),
      )
      .mockResolvedValueOnce(undefined);

    const view = render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
        searchParams: Promise.resolve({ prepareStorage: "1" }),
      }),
    );
    expect(mkdirMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map",
      { recursive: true },
    );
    expect(
      screen.getAllByText((content) => content.includes("Miejsce na map")).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Stwórz roboczą mapę projektu" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Pokaż roboczą mapę" })).toBeTruthy();
    expect(
      screen.queryByRole("link", { name: /Przygotuj/ }),
    ).toBeNull();
    expect(
      screen.getByText((content) =>
        content.includes("Kanoniczny zapis"),
      ),
    ).toBeTruthy();
  });

  test("shows explicit candidate build feedback when refresh is requested", async () => {
    accessMock
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(
        Object.assign(new Error("missing"), { code: "ENOENT" }),
      )
      .mockResolvedValueOnce(undefined);

    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
        searchParams: Promise.resolve({ refresh: "1" }),
      }),
    );

    expect(
      screen.getByRole("link", {
        name: "Stwórz roboczą mapę projektu",
      }).getAttribute("href"),
    ).toBe("/projects/project-1/project-map?refresh=1#project-map-refresh-result");
    expect(screen.getByText("Wynik odświeżenia")).toBeTruthy();
    expect(screen.getByText("Robocza mapa projektu została zbudowana")).toBeTruthy();
    expect(
      screen.getByText(
        "Pipeline kandydata zwrócił widoczny wynik w trybie read-only bez promowania go do canonical map.json.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Wynik kandydata: available")).toBeTruthy();
    expect(screen.getByText("Liczba evidence: 3")).toBeTruthy();
    expect(screen.getAllByText("Obszary foundation: 8").length).toBeGreaterThan(0);
    expect(
      screen.getByText("Ostatnio odświeżono: 2026-08-30T12:34:56.000Z"),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Canonical map.json pozostaje poza zakresem tego kroku.",
      ),
    ).toBeTruthy();
  });


  test("shows an unavailable shell when the project identity is missing", async () => {
    getServerProjectByIdMock.mockResolvedValueOnce(null);

    const view = render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );
    expect(
      screen.getByText((content) => content.includes("Kontekst projektu") && content.includes("niedost")),
    ).toBeTruthy();
    expect(
      screen.getByText((content) => content.includes("Kontekst projektu") && content.includes("niedost")),
    ).toBeTruthy();
    expect(
      screen.getAllByText((content) => content.includes("Brak poprawnego kontekstu projektu.")).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Preview status zapisu kanonicznego")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "UNKNOWN" })).toBeTruthy();
    expect(screen.getByText("Status preview: UNKNOWN")).toBeTruthy();
    expect(screen.queryByText("Pipeline kandydata")).toBeNull();
    expect(resolveProjectMapReadResultMock).not.toHaveBeenCalled();
    expect(scanProjectMapEvidenceMock).not.toHaveBeenCalled();
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
      screen.getByText((content) =>
        content.includes("Mapa projektu jest obecna, ale odczyt niezaimplementowany"),
      ),
    ).toBeTruthy();
    expect(screen.getByText("Stan kanoniczny vs kandydat")).toBeTruthy();
    expect(screen.getAllByText("Widok teraz: mixed").length).toBeGreaterThan(0);
    expect(screen.getByText("Kanoniczna Mapa projektu: present")).toBeTruthy();
    expect(screen.getByText("Kandydat rekonstrukcji: dostępny")).toBeTruthy();
    expect(screen.getByText("Widoczność odłożonych pomysłów")).toBeTruthy();
    expect(screen.getByText("Szczegóły odłożonych pomysłów")).toBeTruthy();
    expect(screen.getAllByText("Ścieżka publikacji: odłożone | milestones: odłożone").length).toBeGreaterThan(0);
    expect(screen.getByText("Szczegóły evidence milestone'ów")).toBeTruthy();
    expect(screen.getAllByText("Status: kandydat").length).toBeGreaterThan(0);
    expect(screen.getByText((content) => content.includes("map.json:"))).toBeTruthy();
    expect(screen.getByText("Pipeline kandydata")).toBeTruthy();
    expect(screen.getByText("Szczegóły pipeline kandydata")).toBeTruthy();
    expect(screen.getByText("Statusy foundation kandydata")).toBeTruthy();
    expect(screen.getByText("Evidence i provenance")).toBeTruthy();
    expect(screen.getByText("Gotowość do zapisu kanonicznego")).toBeTruthy();
    expect(screen.getByText("Robocza mapa: obecna")).toBeTruthy();
    expect(screen.getByText((content) => content.includes("Ten krok nie udostępnia create/write dla canonical map.json."))).toBeTruthy();
    expect(screen.getByText("Sprawdź roboczą mapę")).toBeTruthy();
    expect(screen.getByText("Oceń kandydata przed dalszą pracą")).toBeTruthy();
    expect(screen.getByText("Czy kierunek roboczej mapy jest dobry?")).toBeTruthy();
    expect(screen.getByText("Decyzja robocza")).toBeTruthy();
    const reviewAcceptChoice = screen.getByLabelText("Akceptuję kierunek");
    const reviewBrakiChoice = screen.getByLabelText("Widzę braki");
    const reviewOdkładamChoice = screen.getByLabelText("Odkładam");
    expect((reviewAcceptChoice as HTMLInputElement).checked).toBe(false);
    expect((reviewBrakiChoice as HTMLInputElement).checked).toBe(false);
    expect((reviewOdkładamChoice as HTMLInputElement).checked).toBe(false);
    expect(screen.getByText("Brak danych wejściowych dla sekcji: pierwszy layout")).toBeTruthy();
    expect(screen.getAllByText("Następny krok").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Co robimy dalej po tej ocenie?")).toBeTruthy();
    const nextUzupełnijChoice = screen.getByLabelText("Uzupełnij braki");
    const nextPrzygotujChoice = screen.getByLabelText("Przygotuj akceptację kierunku");
    const nextOdłóżChoice = screen.getByLabelText("Odłóż mapę");
    expect((nextUzupełnijChoice as HTMLInputElement).checked).toBe(false);
    expect((nextPrzygotujChoice as HTMLInputElement).checked).toBe(false);
    expect((nextOdłóżChoice as HTMLInputElement).checked).toBe(false);

    fireEvent.click(reviewBrakiChoice);
    fireEvent.click(nextUzupełnijChoice);

    expect((reviewBrakiChoice as HTMLInputElement).checked).toBe(true);
    expect((reviewAcceptChoice as HTMLInputElement).checked).toBe(false);
    expect((nextUzupełnijChoice as HTMLInputElement).checked).toBe(true);
    expect((nextPrzygotujChoice as HTMLInputElement).checked).toBe(false);
    expect(screen.getAllByText("Tożsamość projektu").length).toBeGreaterThanOrEqual(2);
    expect(scanProjectMapEvidenceMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
    });
  });

  test("shows an explicit candidate-not-ready state when the pipeline cannot produce a candidate", async () => {
    scanProjectMapEvidenceMock.mockResolvedValueOnce({
      status: "unavailable",
      reason: "project-source-path-unavailable",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      evidence: [],
    });
    classifyProjectMapEvidenceMock.mockReturnValueOnce({
      status: "unavailable",
      reason: "project-source-path-unavailable",
      confidence: "unavailable",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      evidence: [],
    });
    buildProjectMapReconstructionCandidateMock.mockReturnValueOnce(
      buildUnavailableCandidate(),
    );

    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );

    expect(screen.getByText("Pipeline kandydata")).toBeTruthy();
    expect(screen.getByText("Szczegóły pipeline kandydata")).toBeTruthy();
    expect(screen.getByText("Stan kanoniczny vs kandydat")).toBeTruthy();
    expect(screen.getByText("Co jest aktualne w Mapie projektu")).toBeTruthy();
    expect(screen.getAllByText("Widok teraz: brak").length).toBeGreaterThan(0);
    expect(screen.getByText("Kanoniczna Mapa projektu: brak")).toBeTruthy();
    expect(screen.getByText("Kandydat rekonstrukcji: niedostępny")).toBeTruthy();
    expect(
      screen.getByText("Kanoniczna mapa: absent / brak kanonicznego map.json."),
    ).toBeTruthy();
    expect(
      screen.getByText("Widoczna mapa: brak gotowego roboczego kandydata."),
    ).toBeTruthy();
    expect(
      screen.getByText("Zapis kanoniczny: nie jest teraz wykonywany."),
    ).toBeTruthy();
    expect(screen.queryByText("Widoczność odłożonych pomysłów")).toBeNull();
    expect(screen.queryByText("Szczegóły odłożonych pomysłów")).toBeNull();
    expect(
      screen.getByText("Nie znaleziono odłożonych elementów w bieżącym kandydacie."),
    ).toBeTruthy();
    expect(screen.queryByText("Szczegóły evidence milestone'ów")).toBeNull();
    expect(screen.queryByText("Brak evidence kandydata dostępnego w szczegółach.")).toBeNull();
    expect(screen.getAllByText((content) => content.includes("Powód:")).length).toBeGreaterThan(0);
    expect(screen.queryByText("Statusy foundation kandydata")).toBeNull();
    expect(screen.getByText("Sprawdź roboczą mapę")).toBeTruthy();
    expect(screen.getByText("Oceń kandydata przed dalszą pracą")).toBeTruthy();
    expect(screen.getByText("Gotowość do zapisu kanonicznego")).toBeTruthy();
    expect(screen.getByText("Robocza mapa: brak gotowego kandydata")).toBeTruthy();
    expect(screen.getByText("Status preview: BLOCKED")).toBeTruthy();
    expect(
      screen.getByText((content) =>
        content.includes("Status akcji:") && content.includes("blokada"),
      ),
    ).toBeTruthy();
    expect(
      screen.getByText("Preview handoffu dla przyszłego milestone wykonawczego"),
    ).toBeTruthy();
    expect(screen.getByText("Status gotowości: BLOCKED")).toBeTruthy();
    expect(screen.getByText("Lokalne potwierdzenie: unavailable / blocked")).toBeTruthy();
    expect(
      screen.getAllByText((content) =>
        content.startsWith("Główna blokada / powód: "),
      ).length,
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Brak zgody na zapis teraz: nie wolno teraz tworzyć, zapisywać, nadpisywać ani promować map.json.",
      ),
    ).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: "Akcja niedostępna - blokada",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      screen.getByText(
        "Lokalne potwierdzenie nie omija blokad, nie jest utrwalone, nie uruchamia milestone wykonawczego i nie zapisuje map.json.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText("Co byłoby zapisane później: UNKNOWN - brak gotowego kandydata"),
    ).toBeTruthy();
    const reviewBrakiChoice = screen.getByLabelText("Widzę braki");
    const nextPrzygotujChoice = screen.getByLabelText("Przygotuj akceptację kierunku");
    expect((reviewBrakiChoice as HTMLInputElement).checked).toBe(false);
    expect((nextPrzygotujChoice as HTMLInputElement).checked).toBe(false);
    fireEvent.click(reviewBrakiChoice);
    fireEvent.click(nextPrzygotujChoice);
    expect((reviewBrakiChoice as HTMLInputElement).checked).toBe(true);
    expect((nextPrzygotujChoice as HTMLInputElement).checked).toBe(true);
    expect(screen.getAllByText("Następny krok").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Co robimy dalej po tej ocenie?")).toBeTruthy();
  });

  test("keeps the canonical write action disabled even when preflight is ready", async () => {
    buildProjectMapReconstructionCandidateMock.mockReturnValueOnce(
      buildReadyCandidate(),
    );

    render(
      await ProjectMapPage({
        params: Promise.resolve({ id: "project-1" }),
      }),
    );

    expect(screen.getByText("Status preview: READY_FOR_FUTURE_WRITE")).toBeTruthy();
    expect(screen.getByText("Status akcji: gotowe do przyszłej zgody")).toBeTruthy();
    expect(screen.getByText("Status gotowości: READY_FOR_FUTURE_WRITE")).toBeTruthy();
    expect(
      screen.getByText(
        "Lokalne potwierdzenie: dostępne lokalnie / tylko planowanie / nie zapisuje decyzji",
      ),
    ).toBeTruthy();
    expect(
      screen.getAllByText((content) =>
        content.startsWith("Główna blokada / powód: "),
      ).length,
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Przyszłe wykonanie wymaga osobnego zatwierdzonego milestone wykonawczego.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "MS-031.29 pokazuje tylko komunikat approval capture; nie zapisuje, nie tworzy i nie promuje map.json.",
      ),
    ).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: "Gotowe do osobnej zgody Product Ownera",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    const approvalCapture = screen.getByRole("checkbox", {
      name: /Rozumiem: to tylko lokalne potwierdzenie gotowości/,
    }) as HTMLInputElement;
    expect(approvalCapture.disabled).toBe(false);
    fireEvent.click(approvalCapture);
    expect(approvalCapture.checked).toBe(true);
    expect(
      screen.getByText(
        "Lokalna intencja Product Ownera jest tylko do planowania, nie jest utrwalona i nie zastępuje osobnego przyszłego milestone wykonawczego.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Intencja lokalna uchwycona tylko do planowania; nie jest utrwalona, nie włącza wykonania i nie zastępuje osobnego przyszłego milestone wykonawczego.",
      ),
    ).toBeTruthy();
  });
});
