// @vitest-environment node

import { describe, expect, it } from "vitest";

import { classifyProjectMapEvidenceItem } from "./classify";
import { buildProjectMapReconstructionCandidate } from "./reconstruct";

describe("buildProjectMapReconstructionCandidate", () => {
  it("builds a reviewable candidate with foundation checklist and preserved evidence links", () => {
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
          discoveryStatus: "missing",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
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
        classifyProjectMapEvidenceItem({
          evidenceType: "unknown",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\mystery.txt",
          sourceRelativePath: "mystery.txt",
          projectId,
          projectName,
        }),
      ],
    });

    expect(candidate).toMatchObject({
      status: "available",
      projectId,
      projectName,
      sourcePath,
    });
    expect(candidate.evidence).toHaveLength(9);
    expect(candidate.evidence[0]).toMatchObject({
      evidenceType: "readme",
      supportState: "confirmed",
      foundationAreas: ["Project Identity", "Working Source"],
    });
    expect(candidate.evidence[8]).toMatchObject({
      evidenceType: "unknown",
      supportState: "inferred",
      foundationAreas: [],
    });
    expect(candidate.foundationChecklist).toHaveLength(8);
    expect(candidate.foundationChecklist).toEqual([
      expect.objectContaining({
        foundationArea: "Project Identity",
        status: "unknown",
        supportState: "confirmed",
        conflictState: "none",
        milestoneStates: ["unknown"],
      }),
      expect.objectContaining({
        foundationArea: "SSOT",
        status: "needs review",
        supportState: "confirmed",
        conflictState: "conflicting",
      }),
      expect.objectContaining({
        foundationArea: "Project Bible",
        status: "planned",
        supportState: "confirmed",
        conflictState: "none",
      }),
      expect.objectContaining({
        foundationArea: "Project Map",
        status: "needs review",
        conflictState: "conflicting",
      }),
      expect.objectContaining({
        foundationArea: "Working Source",
        status: "planned",
        supportState: "confirmed",
        conflictState: "none",
      }),
      expect.objectContaining({
        foundationArea: "First Layout",
        status: "absent",
        supportState: "missing",
        conflictState: "none",
      }),
      expect.objectContaining({
        foundationArea: "First Working Flow",
        status: "planned",
        supportState: "confirmed",
        conflictState: "none",
      }),
      expect.objectContaining({
        foundationArea: "Publication Path",
        status: "completed",
        supportState: "confirmed",
        conflictState: "none",
      }),
    ]);
  });

  it("preserves unavailable classification results without inventing a candidate", () => {
    const candidate = buildProjectMapReconstructionCandidate({
      status: "unavailable",
      reason: "project-source-path-unavailable",
      confidence: "unavailable",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: undefined,
      evidence: [],
    });

    expect(candidate).toEqual({
      status: "unavailable",
      reason: "project-source-path-unavailable",
      confidence: "unavailable",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: undefined,
      foundationChecklist: [],
      evidence: [],
    });
  });
});
