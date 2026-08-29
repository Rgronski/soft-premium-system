// @vitest-environment node

import { describe, expect, it } from "vitest";

import { classifyProjectMapEvidenceItem } from "./classify";
import { evaluateProjectMapCandidateAcceptance } from "./acceptance";
import { buildProjectMapReconstructionCandidate } from "./reconstruct";

describe("evaluateProjectMapCandidateAcceptance", () => {
  it("marks a direct-evidence candidate as acceptable while keeping canonical write disabled", () => {
    const projectId = "project-1";
    const projectName = "Alpha Workspace";
    const sourcePath = "C:\\SPS_OS_WORK\\alpha-workspace";

    const candidate = buildProjectMapReconstructionCandidate({
      status: "available",
      projectId,
      projectName,
      sourcePath,
      evidence: [
        classifyProjectMapEvidenceItem({
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "session-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "current-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "changelog",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\09_CHANGELOG.md",
          sourceRelativePath: "docs/09_CHANGELOG.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "package/config",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\package.json",
          sourceRelativePath: "package.json",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "deployment",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\vercel.json",
          sourceRelativePath: "vercel.json",
          projectId,
          projectName,
        }),
      ],
    });

    expect(evaluateProjectMapCandidateAcceptance(candidate)).toEqual({
      status: "candidate acceptable",
      canonicalWriteStatus: "canonical write not allowed yet",
      candidateOnly: true,
      projectId,
      projectName,
      sourcePath,
      requiredEvidence: [],
      reviewedFoundationAreas: [
        "Project Identity",
        "SSOT",
        "Project Bible",
        "Project Map",
        "Working Source",
        "First Layout",
        "First Working Flow",
        "Publication Path",
      ],
    });
  });

  it("marks weak or inferred candidate evidence as reviewed", () => {
    const candidate = buildProjectMapReconstructionCandidate({
      status: "available",
      projectId: "project-2",
      projectName: "Beta Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\beta-workspace",
      evidence: [
        classifyProjectMapEvidenceItem({
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "current-state",
          discoveryStatus: "missing",
          sourceOwner: "project",
          sourcePath:
            "C:\\SPS_OS_WORK\\beta-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
      ],
    });

    expect(evaluateProjectMapCandidateAcceptance(candidate)).toMatchObject({
      status: "candidate reviewed",
      canonicalWriteStatus: "canonical write not allowed yet",
      candidateOnly: true,
      requiredEvidence: expect.arrayContaining([
        expect.objectContaining({
          foundationArea: "SSOT",
          reason: "missing",
        }),
        expect.objectContaining({
          foundationArea: "Project Map",
          reason: "missing",
        }),
      ]),
    });
  });

  it("marks missing or conflicting candidate evidence as needing evidence", () => {
    const candidate = buildProjectMapReconstructionCandidate({
      status: "available",
      projectId: "project-3",
      projectName: "Gamma Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\gamma-workspace",
      evidence: [
        classifyProjectMapEvidenceItem({
          evidenceType: "unknown",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\gamma-workspace\\mystery.txt",
          sourceRelativePath: "mystery.txt",
          projectId: "project-3",
          projectName: "Gamma Workspace",
        }),
      ],
    });

    expect(evaluateProjectMapCandidateAcceptance(candidate)).toMatchObject({
      status: "candidate needs evidence",
      canonicalWriteStatus: "canonical write not allowed yet",
      candidateOnly: true,
      projectId: "project-3",
      projectName: "Gamma Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\gamma-workspace",
      requiredEvidence: expect.arrayContaining([
        expect.objectContaining({
          foundationArea: "Project Identity",
          reason: "missing",
        }),
        expect.objectContaining({
          foundationArea: "Publication Path",
          reason: "missing",
        }),
      ]),
      reviewedFoundationAreas: [
        "Project Identity",
        "SSOT",
        "Project Bible",
        "Project Map",
        "Working Source",
        "First Layout",
        "First Working Flow",
        "Publication Path",
      ],
    });
  });

  it("rejects unavailable candidates while keeping canonical write disabled", () => {
    expect(
      evaluateProjectMapCandidateAcceptance({
        status: "unavailable",
        reason: "project-source-path-unavailable",
        confidence: "unavailable",
        projectId: "project-4",
        projectName: "Delta Workspace",
        sourcePath: undefined,
        foundationChecklist: [],
        evidence: [],
      }),
    ).toEqual({
      status: "candidate rejected",
      canonicalWriteStatus: "canonical write not allowed yet",
      candidateOnly: true,
      projectId: "project-4",
      projectName: "Delta Workspace",
      sourcePath: undefined,
      requiredEvidence: [],
      reviewedFoundationAreas: [],
    });
  });
});
