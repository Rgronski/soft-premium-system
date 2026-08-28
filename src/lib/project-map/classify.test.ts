// @vitest-environment node

import { describe, expect, it } from "vitest";

import type { ProjectMapEvidenceScanResult } from "./scan";
import {
  classifyProjectMapEvidence,
  classifyProjectMapEvidenceItem,
} from "./classify";

describe("classifyProjectMapEvidenceItem", () => {
  it("preserves read-only source details while attaching confidence and foundation links", () => {
    const classified = classifyProjectMapEvidenceItem({
      evidenceType: "roadmap",
      discoveryStatus: "found",
      sourceOwner: "project",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\04_ROADMAP.md",
      sourceRelativePath: "docs/04_ROADMAP.md",
      projectId: "project-1",
      projectName: "Alpha Workspace",
    });

    expect(classified).toEqual({
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
    });
  });

  it("maps missing, unavailable, unreadable, and unknown evidence explicitly", () => {
    expect(
      classifyProjectMapEvidenceItem({
        evidenceType: "current-state",
        discoveryStatus: "missing",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\08_CURRENT_STATE.md",
        sourceRelativePath: "docs/08_CURRENT_STATE.md",
        projectId: "project-1",
        projectName: "Alpha Workspace",
      }),
    ).toMatchObject({
      confidence: "missing",
      milestoneStates: ["absent"],
    });

    expect(
      classifyProjectMapEvidenceItem({
        evidenceType: "session-state",
        discoveryStatus: "unavailable",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\10_SESSION_STATE.md",
        sourceRelativePath: "docs/10_SESSION_STATE.md",
        projectId: "project-1",
        projectName: "Alpha Workspace",
      }),
    ).toMatchObject({
      confidence: "unavailable",
      milestoneStates: ["blocked"],
    });

    expect(
      classifyProjectMapEvidenceItem({
        evidenceType: "package/config",
        discoveryStatus: "unreadable",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\package.json",
        sourceRelativePath: "package.json",
        projectId: "project-1",
        projectName: "Alpha Workspace",
      }),
    ).toMatchObject({
      confidence: "weak",
      milestoneStates: ["blocked"],
    });

    expect(
      classifyProjectMapEvidenceItem({
        evidenceType: "unknown",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\mystery.txt",
        sourceRelativePath: "mystery.txt",
        projectId: "project-1",
        projectName: "Alpha Workspace",
      }),
    ).toMatchObject({
      confidence: "unknown",
      foundationAreas: [],
      milestoneStates: ["unknown"],
    });
  });
});

describe("classifyProjectMapEvidence", () => {
  it("classifies scanner evidence into foundation-aware read-model items", () => {
    const scanResult: ProjectMapEvidenceScanResult = {
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
      evidence: [
        {
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "current-state",
          discoveryStatus: "missing",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "changelog",
          discoveryStatus: "unreadable",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\09_CHANGELOG.md",
          sourceRelativePath: "docs/09_CHANGELOG.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "session-state",
          discoveryStatus: "unavailable",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "package/config",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\package.json",
          sourceRelativePath: "package.json",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "deployment",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\vercel.json",
          sourceRelativePath: "vercel.json",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
        {
          evidenceType: "unknown",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\mystery.txt",
          sourceRelativePath: "mystery.txt",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        },
      ],
    };

    const classified = classifyProjectMapEvidence(scanResult);

    expect(classified.status).toBe("available");
    expect(classified.projectId).toBe("project-1");
    expect(classified.projectName).toBe("Alpha Workspace");
    expect(classified.sourcePath).toBe("C:\\SPS_OS_WORK\\alpha-workspace");
    expect(classified.evidence).toHaveLength(9);
    expect(classified.evidence[0]).toMatchObject({
      evidenceType: "readme",
      discoveryStatus: "found",
      sourceOwner: "project",
      confidence: "direct",
      foundationAreas: ["Project Identity", "Working Source"],
      milestoneStates: ["unknown"],
      conflictState: "none",
    });
    expect(classified.evidence[2]).toMatchObject({
      evidenceType: "current-state",
      discoveryStatus: "missing",
      confidence: "missing",
      foundationAreas: ["SSOT", "Project Map"],
      milestoneStates: ["absent"],
    });
    expect(classified.evidence[3]).toMatchObject({
      evidenceType: "changelog",
      discoveryStatus: "unreadable",
      confidence: "weak",
      foundationAreas: ["Project Map"],
      milestoneStates: ["blocked"],
    });
    expect(classified.evidence[4]).toMatchObject({
      evidenceType: "session-state",
      discoveryStatus: "unavailable",
      confidence: "unavailable",
      foundationAreas: ["SSOT"],
      milestoneStates: ["blocked"],
    });
    expect(classified.evidence[5]).toMatchObject({
      evidenceType: "decision/ADR",
      discoveryStatus: "found",
      confidence: "direct",
      foundationAreas: ["Project Bible", "Project Map"],
      milestoneStates: ["planned"],
    });
    expect(classified.evidence[6]).toMatchObject({
      evidenceType: "package/config",
      discoveryStatus: "found",
      confidence: "direct",
      foundationAreas: ["Working Source", "First Working Flow"],
      milestoneStates: ["planned"],
    });
    expect(classified.evidence[7]).toMatchObject({
      evidenceType: "deployment",
      discoveryStatus: "found",
      confidence: "direct",
      foundationAreas: ["Publication Path"],
      milestoneStates: ["completed"],
    });
    expect(classified.evidence[8]).toMatchObject({
      evidenceType: "unknown",
      discoveryStatus: "found",
      confidence: "unknown",
      foundationAreas: [],
      milestoneStates: ["unknown"],
    });
  });

  it("preserves unavailable scan results with unavailable confidence", () => {
    const classified = classifyProjectMapEvidence({
      status: "unavailable",
      reason: "project-source-path-unavailable",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      evidence: [],
    });

    expect(classified).toEqual({
      status: "unavailable",
      reason: "project-source-path-unavailable",
      confidence: "unavailable",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: undefined,
      evidence: [],
    });
  });
});
