// @vitest-environment node

import { describe, expect, it } from "vitest";

import { classifyProjectMapEvidenceItem } from "./classify";
import {
  buildProjectMapCandidateStructure,
  buildProjectMapReconstructionCandidate,
} from "./reconstruct";

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

  it("builds a map-shaped candidate structure with identity, state, and evidence refs", () => {
    const projectId = "0d3e28cb-6dff-442a-b94c-007a5d6b5779";
    const projectName = "Beauty Client PRO";
    const sourcePath = "C:\\SPS_OS_WORK\\beauty-client-pro";

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
          sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\README.md",
          sourceRelativePath: "README.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "current-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "session-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId,
          projectName,
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId,
          projectName,
        }),
      ],
    });

    const structure = buildProjectMapCandidateStructure(
      {
        id: projectId,
        name: projectName,
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      },
      {
        status: "missing",
        projectId,
        projectName,
        projectMetadataRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
        projectMapRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
        mapJsonPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
        projectSourceIdentity: {
          projectId,
          projectName,
          repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
          workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
          projectCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
          projectMetadataRootPath:
            "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
          projectSourceIdentityPath:
            "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
          persistedAt: "2026-08-31T11:48:02.9592588Z",
        },
        projectSourceIdentityPersistence: {
          status: "persisted",
          projectSourceIdentityPath:
            "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-source-identity.json",
          persistedAt: "2026-08-31T11:48:02.9592588Z",
        },
      },
      candidate,
    );

    expect(structure).toMatchObject({
      trustState: "candidate-read-only",
      projectIdentity: {
        projectId,
        projectName,
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
        checkoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
        sourceIdentityRepositoryUrl:
          "https://github.com/Beautyclient/BeautyClientPro.git",
        sourceIdentityStatus: "aligned",
        sourceIdentityPersistence: "persisted",
      },
      currentState: {
        stateSource: "repo + SSOT candidate evidence",
        sourceIdentityStatus: "aligned",
        sourceIdentityPersistence: "persisted",
        projectCompletedState: "Project Identity, Candidate evidence",
        projectCurrentState: "candidate-read-only",
        projectNextState: "Review SSOT-derived map sections before any canonical save.",
        canonicalMapStatus: "missing",
        candidateStatus: "available",
      },
    });
    expect(structure?.completedItems.map((item) => item.title)).toEqual([
      "Project Identity",
      "Candidate evidence",
    ]);
    expect(structure?.underReviewItems.map((item) => item.title)).toEqual([
      "Project Identity",
      "SSOT",
      "Project Bible",
      "Project Map",
      "Working Source",
    ]);
    expect(
      structure?.underReviewItems.find((item) => item.title === "SSOT"),
    ).toMatchObject({
      status: "needs review",
      summary: "SSOT docs were found and can support the candidate map.",
    });
    expect(structure?.rejectedOrBlockedItems.map((item) => item.title)).toEqual([
      "First Layout",
      "First Working Flow",
      "Publication Path",
    ]);
    expect(structure?.missingInputs).toEqual(
      expect.arrayContaining([
        "First Layout is missing because no BCP layout evidence was found; the shell layout exists separately.",
        "First Working Flow is missing because no flow evidence was found.",
        "Publication Path is missing because canonical save/publish is not implemented or approved yet.",
      ]),
    );
    expect(structure?.nextSteps).toEqual(
      expect.arrayContaining([
        "Review SSOT-derived map sections before any canonical save.",
        "Resolve blocked inputs before any canonical write is considered.",
        "Keep canonical save separate and approval-bound.",
      ]),
    );
    expect(structure?.evidenceRefs).toEqual(
      expect.arrayContaining([
        "README.md",
        "docs/04_ROADMAP.md",
        "docs/07_DECISIONS.md",
      ]),
    );
  });

  it("keeps SSOT out of rejected and missing inputs when evidence exists but the raw status is absent", () => {
    const projectId = "project-1";
    const projectName = "Alpha Workspace";
    const sourcePath = "C:\\SPS_OS_WORK\\alpha-workspace";

    const structure = buildProjectMapCandidateStructure(
      {
        id: projectId,
        name: projectName,
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: sourcePath,
      },
      {
        status: "missing",
        projectId,
        projectName,
        projectMetadataRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1",
        projectMapRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map",
        mapJsonPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-map\\map.json",
        projectSourceIdentity: {
          projectId,
          projectName,
          repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
          workingDirectory: sourcePath,
          projectCheckoutPath: "C:\\SPS_OS_WORK\\alpha-workspace\\repo",
          projectMetadataRootPath:
            "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1",
          projectSourceIdentityPath:
            "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-source-identity.json",
          persistedAt: "2026-08-31T11:48:02.9592588Z",
        },
        projectSourceIdentityPersistence: {
          status: "persisted",
          projectSourceIdentityPath:
            "C:\\SPS_OS_WORK\\.sps-meta\\alpha-workspace--project1\\project-source-identity.json",
          persistedAt: "2026-08-31T11:48:02.9592588Z",
        },
      },
      {
        status: "available",
        projectId,
        projectName,
        sourcePath,
        foundationChecklist: [
          {
            foundationArea: "SSOT",
            status: "absent",
            supportState: "confirmed",
            conflictState: "none",
            milestoneStates: ["unknown"],
            evidence: [
              {
                evidenceType: "current-state",
                discoveryStatus: "found",
                sourceOwner: "project",
                sourcePath:
                  "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\08_CURRENT_STATE.md",
                sourceRelativePath: "docs/08_CURRENT_STATE.md",
                projectId,
                projectName,
                confidence: "direct",
                foundationAreas: ["SSOT"],
                milestoneStates: ["unknown"],
                conflictState: "none",
                supportState: "confirmed",
              },
            ],
          },
        ],
        evidence: [],
      },
    );

    expect(structure?.underReviewItems.map((item) => item.title)).toContain("SSOT");
    expect(structure?.rejectedOrBlockedItems.map((item) => item.title)).not.toContain(
      "SSOT",
    );
    expect(structure?.missingInputs.join(" ")).not.toContain("SSOT docs were found");
  });
});
