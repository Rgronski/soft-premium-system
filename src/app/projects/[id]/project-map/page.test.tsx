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

vi.mock("@/lib/project-map/reconstruct", () => ({
  buildProjectMapReconstructionCandidate: (classification: unknown) =>
    buildProjectMapReconstructionCandidateMock(classification),
}));

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
        status: "planned",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["planned"],
        evidence: [],
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
      },
      projectSourceIdentity: {
        projectId: "project-1",
        projectName: "Alpha Workspace",
        repositoryUrl: "https://github.com/example/alpha-workspace.git",
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

    expect(screen.getByText((content) => content.includes("Shell"))).toBeTruthy();
    expect(screen.getByText("Alpha Workspace")).toBeTruthy();
    expect(screen.getByText("Następny krok")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Przygotuj miejsce na mapę projektu" })
        .getAttribute("href"),
    ).toBe("/projects/project-1/project-map?prepareStorage=1");
    expect(screen.getByRole("link", { name: "Odśwież kandydata mapy" })).toBeTruthy();
    expect(
      screen.getByText(
        "Kanoniczny zapis pozostaje osobną, approval-bound akcją.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Done")).toBeTruthy();
    expect(screen.getByText("Next")).toBeTruthy();
    expect(screen.getByText("Parked")).toBeTruthy();
    expect(screen.getByText("Canonical vs candidate state")).toBeTruthy();
    expect(screen.getAllByText("Current view: candidate").length).toBeGreaterThan(0);
    expect(screen.getByText("Canonical Project Map: missing")).toBeTruthy();
    expect(screen.getByText("Reconstruction candidate: available")).toBeTruthy();
    expect(screen.getByText("Source identity persistence: persisted")).toBeTruthy();
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
    expect(screen.getByText("Stan odczytu mapy")).toBeTruthy();
    expect(
      screen.getAllByText((content) => content.includes("Mapa projektu nie jest jeszcze gotowa")),
    ).toHaveLength(2);
    expect(screen.getByText("brak / niegotowe")).toBeTruthy();
    expect(screen.getByText("Candidate pipeline")).toBeTruthy();
    expect(screen.getByText("Candidate pipeline details")).toBeTruthy();
    expect(screen.getByText("Candidate foundation statuses")).toBeTruthy();
    expect(screen.getByText("Evidence and provenance")).toBeTruthy();
    expect(screen.getAllByText("Project Identity").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Project Map").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("needs review").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText((content) => content.includes("README.md")).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText("support: confirmed | conflict: none | evidence: 1 | milestones: completed"),
    ).toBeTruthy();
    expect(
      screen.getByText((content) =>
        content.includes("No canonical write, export, promote, or accept action is implemented."),
      ),
    ).toBeTruthy();
    expect(getServerProjectByIdMock).toHaveBeenCalledWith("project-1");
    expect(resolveProjectMapReadResultMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
      workingDirectory: "C:\\SPS_OS_WORK\\alpha-workspace",
    });
    expect(scanProjectMapEvidenceMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
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
      screen.getByText((content) =>
        content.includes("Miejsce na mapę projektu jest gotowe"),
      ),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Odśwież kandydata mapy" })).toBeTruthy();
    expect(
      screen.queryByRole("link", { name: "Przygotuj miejsce na mapę projektu" }),
    ).toBeNull();
    expect(
      screen.getByText((content) =>
        content.includes("Kanoniczny zapis nadal wymaga osobnej zgody."),
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
      screen.getByText((content) => content.includes("Projekt nie został znaleziony.")),
    ).toBeTruthy();
    expect(screen.getByText("Kontekst projektu niedostępny")).toBeTruthy();
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
    expect(screen.getByText((content) => content.includes("obecna / odczyt niezaimplementowany"))).toBeTruthy();
    expect(screen.getByText((content) => content.includes("map.json:"))).toBeTruthy();
    expect(screen.getByText("Candidate pipeline")).toBeTruthy();
    expect(screen.getByText("Candidate pipeline details")).toBeTruthy();
    expect(screen.getByText("Candidate foundation statuses")).toBeTruthy();
    expect(screen.getByText("Evidence and provenance")).toBeTruthy();
    expect(screen.getAllByText("Project Identity").length).toBeGreaterThanOrEqual(2);
    expect(scanProjectMapEvidenceMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Alpha Workspace",
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
    expect(screen.getByText("Parked ideas visibility")).toBeTruthy();
    expect(screen.getByText("Parked ideas details")).toBeTruthy();
    expect(
      screen.getAllByText("No parked or deferred items were found in the current candidate.")
        .length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Milestone evidence drilldown")).toBeTruthy();
    expect(
      screen.getByText("No candidate evidence was available for drilldown yet."),
    ).toBeTruthy();
    expect(screen.getAllByText((content) => content.includes("Reason:")).length).toBeGreaterThan(0);
    expect(screen.queryByText("Candidate foundation statuses")).toBeNull();
  });
});
