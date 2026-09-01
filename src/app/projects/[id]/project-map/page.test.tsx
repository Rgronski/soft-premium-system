// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
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
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
      evidence: [],
    });

    classifyProjectMapEvidenceMock.mockReturnValue({
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
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
    expect(screen.getAllByText("Current view: candidate/read-only").length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(
        "Robocza mapa projektu została zbudowana z dostępnych danych. Pozostaje candidate/read-only i nie jest canonical map.json.",
      ).length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("link", { name: "Pokaż roboczą mapę" })).toBeTruthy();
    expect(
      screen.getAllByText((content) => content.includes("Kanoniczny zapis")).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Done")).toBeTruthy();
    expect(screen.getByText("Next")).toBeTruthy();
    expect(screen.getByText("Parked")).toBeTruthy();
    expect(screen.getByText("Robocza mapa projektu")).toBeTruthy();
    expect(screen.getByText("Mapa z repo + SSOT")).toBeTruthy();
    expect(screen.getByText("trust: candidate-read-only")).toBeTruthy();
    expect(screen.getByText("Co to za projekt?")).toBeTruthy();
    expect(screen.getByText("Co już mamy?")).toBeTruthy();
    expect(screen.getByText("Co jest pod review?")).toBeTruthy();
    expect(screen.getByText("Co jest odrzucone / zablokowane?")).toBeTruthy();
    expect(screen.getByText("Czego brakuje?")).toBeTruthy();
    expect(screen.getByText("Co dalej?")).toBeTruthy();
    expect(screen.getByText("Z jakich dokumentów to wynika?")).toBeTruthy();
    expect(
      screen.getByText("State source: repo + SSOT candidate evidence"),
    ).toBeTruthy();
    expect(screen.getByText("Source identity: aligned")).toBeTruthy();
    expect(screen.getAllByText("Source identity persistence: persisted").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("SSOT docs were found and can support the candidate map.").length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText("SSOT remains absent in the candidate map.")).toBeNull();
    expect(
      screen.getByText((content) =>
        content.includes("Completed project state:") &&
        content.includes("Project Identity") &&
        content.includes("Candidate evidence"),
      ),
    ).toBeTruthy();
    expect(screen.getByText("Current candidate state: candidate-read-only")).toBeTruthy();
    expect(
      screen.getByText(
        "Next step: Review SSOT-derived map sections before any canonical save.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Wyjaśnienie dostępności sekcji")).toBeTruthy();
    expect(screen.getByText("Co działa, co czeka i co blokuje")).toBeTruthy();
    expect(screen.getAllByText("Status: candidate").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Źródło: candidate").length).toBeGreaterThan(0);
    expect(screen.getByText("Canonical vs candidate state")).toBeTruthy();
    expect(screen.getAllByText("Current view: candidate/read-only").length).toBeGreaterThan(0);
    expect(screen.getByText("Canonical Project Map: missing")).toBeTruthy();
    expect(screen.getByText("Reconstruction candidate: available")).toBeTruthy();
    expect(
      screen.getAllByText("Source identity persistence: persisted").length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Parked ideas visibility")).toBeTruthy();
    expect(screen.getByText("Parked ideas details")).toBeTruthy();
    expect(screen.getAllByText("Publication Path: parked | milestones: parked").length).toBeGreaterThan(0);
    expect(screen.getByText("Milestone evidence drilldown")).toBeTruthy();
    expect(
      screen.getByText(
        "Status reason: Parked evidence keeps this block as future context, not active scope.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Evidence state: candidate / parked | source type: decision/ADR | source owner: project | source path: C:\\SPS_OS_WORK\\alpha-workspace\\docs\\adr\\2026-08-29-parked-ideas.md | confidence: direct | support: confirmed | conflict: none",
      ),
    ).toBeTruthy();
    expect(
      screen.queryByText("No source evidence linked to this block yet."),
    ).toBeNull();
    expect(screen.getByText("Stan odczytu mapy")).toBeTruthy();
    expect(
      screen.getAllByText((content) => content.includes("Mapa projektu nie jest jeszcze gotowa")).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("candidate").length).toBeGreaterThan(0);
    expect(screen.getByText("Candidate pipeline")).toBeTruthy();
    expect(screen.getByText("Candidate pipeline details")).toBeTruthy();
    expect(screen.getByText("Candidate foundation statuses")).toBeTruthy();
    expect(screen.getByText("Evidence and provenance")).toBeTruthy();
    expect(screen.getAllByText("Project Identity").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Project Map").length).toBeGreaterThan(0);
    expect(screen.getAllByText("needs review").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText((content) => content.includes("README.md")).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText("Repository URL is aligned and source identity is persisted."),
    ).toBeTruthy();
    expect(
      screen.getByText((content) =>
        content.includes("Evidence i provenance pozostają w drilldown, a canonical save jest osobny."),
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
    });
    expect(classifyProjectMapEvidenceMock).toHaveBeenCalledWith({
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
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

    expect(screen.getByText("Repository URL / Source Identity")).toBeTruthy();
    expect(screen.getByText("Status: blocker")).toBeTruthy();
    expect(
      screen.getByText(
        "Repository URL jest oczekiwany w BCP, ale Project Map source identity nadal pokazuje brak połączenia.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText((content) =>
        content.includes("source identity") && content.includes("zaufasz kandydatowi"),
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

    render(
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
        "Candidate pipeline zwrócił widoczny wynik candidate/read-only bez promowania go do canonical map.json.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Candidate result: available")).toBeTruthy();
    expect(screen.getByText("Evidence count: 2")).toBeTruthy();
    expect(screen.getAllByText("Foundation areas: 8").length).toBeGreaterThan(0);
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

    render(
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
    expect(screen.queryByText("Candidate pipeline")).toBeNull();
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
    expect(screen.getByText("Canonical vs candidate state")).toBeTruthy();
    expect(screen.getAllByText("Current view: mixed").length).toBeGreaterThan(0);
    expect(screen.getByText("Canonical Project Map: present")).toBeTruthy();
    expect(screen.getByText("Reconstruction candidate: available")).toBeTruthy();
    expect(screen.getByText("Parked ideas visibility")).toBeTruthy();
    expect(screen.getByText("Parked ideas details")).toBeTruthy();
    expect(screen.getAllByText("Publication Path: parked | milestones: parked").length).toBeGreaterThan(0);
    expect(screen.getByText("Milestone evidence drilldown")).toBeTruthy();
    expect(screen.getAllByText("Status: candidate").length).toBeGreaterThan(0);
    expect(screen.getByText((content) => content.includes("map.json:"))).toBeTruthy();
    expect(screen.getByText("Candidate pipeline")).toBeTruthy();
    expect(screen.getByText("Candidate pipeline details")).toBeTruthy();
    expect(screen.getByText("Candidate foundation statuses")).toBeTruthy();
    expect(screen.getByText("Evidence and provenance")).toBeTruthy();
    expect(screen.getByText("Gotowość do zapisu kanonicznego")).toBeTruthy();
    expect(screen.getByText("Robocza mapa: obecna")).toBeTruthy();
    expect(screen.getByText((content) => content.includes("Ten krok nie udostępnia create/write dla canonical map.json."))).toBeTruthy();
    expect(screen.getByText("Sprawdź roboczą mapę")).toBeTruthy();
    expect(screen.getByText("Oceń kandydata przed dalszą pracą")).toBeTruthy();
    expect(screen.getByText("Czy kierunek roboczej mapy jest dobry?")).toBeTruthy();
    expect(screen.getByText("Decyzja robocza")).toBeTruthy();
    expect(screen.getByText("Akceptuję kierunek")).toBeTruthy();
    expect(screen.getByText("Brak danych wejściowych dla sekcji: First Layout")).toBeTruthy();
    expect(screen.getAllByText("Następny krok").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Co robimy dalej po tej ocenie?")).toBeTruthy();
    expect(screen.getByText("Uzupełnij braki")).toBeTruthy();
    expect(screen.getAllByText("Project Identity").length).toBeGreaterThanOrEqual(2);
    expect(scanProjectMapEvidenceMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
      repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
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

    expect(screen.getByText("Candidate pipeline")).toBeTruthy();
    expect(screen.getByText("Candidate pipeline details")).toBeTruthy();
    expect(screen.getByText("Canonical vs candidate state")).toBeTruthy();
    expect(screen.getAllByText("Current view: missing").length).toBeGreaterThan(0);
    expect(screen.getByText("Canonical Project Map: missing")).toBeTruthy();
    expect(screen.getByText("Reconstruction candidate: unavailable")).toBeTruthy();
    expect(screen.queryByText("Parked ideas visibility")).toBeNull();
    expect(screen.queryByText("Parked ideas details")).toBeNull();
    expect(
      screen.getByText("No parked or deferred items were found in the current candidate."),
    ).toBeTruthy();
    expect(screen.queryByText("Milestone evidence drilldown")).toBeNull();
    expect(screen.queryByText("No candidate evidence was available for drilldown yet.")).toBeNull();
    expect(screen.getAllByText((content) => content.includes("Powód:")).length).toBeGreaterThan(0);
    expect(screen.queryByText("Candidate foundation statuses")).toBeNull();
    expect(screen.getByText("Sprawdź roboczą mapę")).toBeTruthy();
    expect(screen.getByText("Oceń kandydata przed dalszą pracą")).toBeTruthy();
    expect(screen.getByText("Gotowość do zapisu kanonicznego")).toBeTruthy();
    expect(screen.getByText("Robocza mapa: brak gotowego kandydata")).toBeTruthy();
    expect(screen.getByText("Widzę braki")).toBeTruthy();
    expect(screen.getAllByText("Następny krok").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Co robimy dalej po tej ocenie?")).toBeTruthy();
  });
});
