// @vitest-environment node

import { describe, expect, it } from "vitest";

import { classifyProjectMapEvidenceItem } from "./classify";
import { evaluateProjectMapCandidateAcceptance } from "./acceptance";
import { buildProjectMapReconstructionCandidate } from "./reconstruct";
import { evaluateProjectMapCanonicalWriteApproval } from "./write-approval";

describe("evaluateProjectMapCanonicalWriteApproval", () => {
  it("keeps approval not requested when canonical write has not been asked for", () => {
    const candidate = buildProjectMapReconstructionCandidate({
      status: "available",
      projectId: "project-1",
      projectName: "Alpha Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace",
      evidence: [
        classifyProjectMapEvidenceItem({
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\alpha-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId: "project-1",
          projectName: "Alpha Workspace",
        }),
      ],
    });

    const acceptance = evaluateProjectMapCandidateAcceptance(candidate);

    expect(
      evaluateProjectMapCanonicalWriteApproval({
        requested: false,
        acceptance,
      }),
    ).toMatchObject({
      status: "not requested",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: false,
      decision: null,
      acceptanceStatus: "candidate reviewed",
    });
  });

  it("requires approval when the candidate is acceptable but not yet approved", () => {
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
          evidenceType: "session-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "current-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "changelog",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\docs\\09_CHANGELOG.md",
          sourceRelativePath: "docs/09_CHANGELOG.md",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "package/config",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\package.json",
          sourceRelativePath: "package.json",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "deployment",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\beta-workspace\\vercel.json",
          sourceRelativePath: "vercel.json",
          projectId: "project-2",
          projectName: "Beta Workspace",
        }),
      ],
    });

    const acceptance = evaluateProjectMapCandidateAcceptance(candidate);

    expect(
      evaluateProjectMapCanonicalWriteApproval({
        requested: true,
        acceptance,
      }),
    ).toMatchObject({
      status: "approval required",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: true,
      decision: null,
      acceptanceStatus: "candidate acceptable",
    });
  });

  it("blocks approval when candidate evidence is missing or conflicting", () => {
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

    const acceptance = evaluateProjectMapCandidateAcceptance(candidate);

    expect(
      evaluateProjectMapCanonicalWriteApproval({
        requested: true,
        decision: "approved",
        acceptance,
      }),
    ).toMatchObject({
      status: "blocked by evidence",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: true,
      decision: "approved",
      acceptanceStatus: "candidate needs evidence",
    });
  });

  it("rejects an explicit rejection when the candidate is clear and requested", () => {
    const candidate = buildProjectMapReconstructionCandidate({
      status: "available",
      projectId: "project-4",
      projectName: "Delta Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\delta-workspace",
      evidence: [
        classifyProjectMapEvidenceItem({
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "session-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "current-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "changelog",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\docs\\09_CHANGELOG.md",
          sourceRelativePath: "docs/09_CHANGELOG.md",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "package/config",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\package.json",
          sourceRelativePath: "package.json",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "deployment",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\delta-workspace\\vercel.json",
          sourceRelativePath: "vercel.json",
          projectId: "project-4",
          projectName: "Delta Workspace",
        }),
      ],
    });

    const acceptance = evaluateProjectMapCandidateAcceptance(candidate);

    expect(
      evaluateProjectMapCanonicalWriteApproval({
        requested: true,
        decision: "rejected",
        acceptance,
      }),
    ).toMatchObject({
      status: "rejected",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: true,
      decision: "rejected",
      acceptanceStatus: "candidate acceptable",
    });
  });

  it("approves an explicit approval when the candidate is clear and requested", () => {
    const candidate = buildProjectMapReconstructionCandidate({
      status: "available",
      projectId: "project-5",
      projectName: "Epsilon Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace",
      evidence: [
        classifyProjectMapEvidenceItem({
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "session-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "current-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "changelog",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\docs\\09_CHANGELOG.md",
          sourceRelativePath: "docs/09_CHANGELOG.md",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "package/config",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\package.json",
          sourceRelativePath: "package.json",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "deployment",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\epsilon-workspace\\vercel.json",
          sourceRelativePath: "vercel.json",
          projectId: "project-5",
          projectName: "Epsilon Workspace",
        }),
      ],
    });

    const acceptance = evaluateProjectMapCandidateAcceptance(candidate);

    expect(
      evaluateProjectMapCanonicalWriteApproval({
        requested: true,
        decision: "approved",
        acceptance,
      }),
    ).toMatchObject({
      status: "approved",
      canonicalWriteAllowed: true,
      candidateOnly: true,
      requested: true,
      decision: "approved",
      acceptanceStatus: "candidate acceptable",
    });
  });

  it("rejects an explicit approval decision before canonical write", () => {
    const candidate = buildProjectMapReconstructionCandidate({
      status: "available",
      projectId: "project-6",
      projectName: "Zeta Workspace",
      sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace",
      evidence: [
        classifyProjectMapEvidenceItem({
          evidenceType: "readme",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\README.md",
          sourceRelativePath: "README.md",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "session-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\docs\\10_SESSION_STATE.md",
          sourceRelativePath: "docs/10_SESSION_STATE.md",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "roadmap",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\docs\\04_ROADMAP.md",
          sourceRelativePath: "docs/04_ROADMAP.md",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "current-state",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\docs\\08_CURRENT_STATE.md",
          sourceRelativePath: "docs/08_CURRENT_STATE.md",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "changelog",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\docs\\09_CHANGELOG.md",
          sourceRelativePath: "docs/09_CHANGELOG.md",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "decision/ADR",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\docs\\07_DECISIONS.md",
          sourceRelativePath: "docs/07_DECISIONS.md",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "package/config",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\package.json",
          sourceRelativePath: "package.json",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
        classifyProjectMapEvidenceItem({
          evidenceType: "deployment",
          discoveryStatus: "found",
          sourceOwner: "project",
          sourcePath: "C:\\SPS_OS_WORK\\zeta-workspace\\vercel.json",
          sourceRelativePath: "vercel.json",
          projectId: "project-6",
          projectName: "Zeta Workspace",
        }),
      ],
    });

    const acceptance = evaluateProjectMapCandidateAcceptance(candidate);

    expect(
      evaluateProjectMapCanonicalWriteApproval({
        requested: true,
        decision: "rejected",
        acceptance,
      }),
    ).toMatchObject({
      status: "rejected",
      canonicalWriteAllowed: false,
      candidateOnly: true,
      requested: true,
      decision: "rejected",
      acceptanceStatus: "candidate acceptable",
    });
  });
});
