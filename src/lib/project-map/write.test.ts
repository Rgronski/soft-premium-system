// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { basename } from "node:path";

import { classifyProjectMapEvidenceItem } from "./classify";
import { evaluateProjectMapCandidateAcceptance } from "./acceptance";
import { buildProjectMapReconstructionCandidate } from "./reconstruct";
import { evaluateProjectMapCanonicalWriteApproval } from "./write-approval";

const mkdirMock = vi.fn();
const writeFileMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  mkdir: mkdirMock,
  writeFile: writeFileMock,
}));

vi.mock("../project-brain/metadata", () => ({
  resolveProjectMapStorageRoot: (
    project: {
      id?: string;
      name?: string;
      workingDirectory?: string;
    } | null | undefined,
  ) => {
    const projectId = project?.id?.trim() ?? "";

    if (!projectId) {
      return {
        status: "unavailable",
        reason: "invalid-project-identity",
      } as const;
    }

    const projectName = project?.name?.trim() || projectId;
    const workingDirectory = project?.workingDirectory?.trim() || "";
    const readableRootSegment = basename(workingDirectory || projectName)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const shortProjectId = projectId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase();
    const projectMetadataRootPath = `C:\\SPS_OS_WORK\\.sps-meta\\${readableRootSegment || "project"}--${shortProjectId}`;

    return {
      status: "available",
      projectId,
      projectName,
      projectMetadataRootPath,
      projectMapRootPath: `${projectMetadataRootPath}\\project-map`,
    } as const;
  },
}));

async function loadModule() {
  vi.resetModules();
  return import("./write");
}

beforeEach(() => {
  mkdirMock.mockReset();
  writeFileMock.mockReset();
  mkdirMock.mockResolvedValue(undefined);
  writeFileMock.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function buildApprovedCandidate() {
  const candidate = buildProjectMapReconstructionCandidate({
    status: "available",
    projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
    projectName: "Beauty Client PRO",
    sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro",
    evidence: [
      classifyProjectMapEvidenceItem({
        evidenceType: "readme",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\README.md",
        sourceRelativePath: "README.md",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
      classifyProjectMapEvidenceItem({
        evidenceType: "session-state",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath:
          "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\10_SESSION_STATE.md",
        sourceRelativePath: "docs/10_SESSION_STATE.md",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
      classifyProjectMapEvidenceItem({
        evidenceType: "roadmap",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath:
          "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\04_ROADMAP.md",
        sourceRelativePath: "docs/04_ROADMAP.md",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
      classifyProjectMapEvidenceItem({
        evidenceType: "current-state",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath:
          "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\08_CURRENT_STATE.md",
        sourceRelativePath: "docs/08_CURRENT_STATE.md",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
      classifyProjectMapEvidenceItem({
        evidenceType: "changelog",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath:
          "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\09_CHANGELOG.md",
        sourceRelativePath: "docs/09_CHANGELOG.md",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
      classifyProjectMapEvidenceItem({
        evidenceType: "decision/ADR",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath:
          "C:\\SPS_OS_WORK\\beauty-client-pro\\docs\\07_DECISIONS.md",
        sourceRelativePath: "docs/07_DECISIONS.md",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
      classifyProjectMapEvidenceItem({
        evidenceType: "package/config",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\package.json",
        sourceRelativePath: "package.json",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
      classifyProjectMapEvidenceItem({
        evidenceType: "deployment",
        discoveryStatus: "found",
        sourceOwner: "project",
        sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro\\vercel.json",
        sourceRelativePath: "vercel.json",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        projectName: "Beauty Client PRO",
      }),
    ],
  });

  return {
    candidate,
    acceptance: evaluateProjectMapCandidateAcceptance(candidate),
  };
}

describe("writeProjectMapCanonicalMap", () => {
  it("blocks canonical write when approval is not requested", async () => {
    const { candidate, acceptance } = buildApprovedCandidate();
    const approval = evaluateProjectMapCanonicalWriteApproval({
      requested: false,
      acceptance,
    });

    const { writeProjectMapCanonicalMap } = await loadModule();
    const result = await writeProjectMapCanonicalMap({
      project: {
        id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        name: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      },
      approval,
      candidate,
    });

    expect(result).toMatchObject({
      status: "blocked",
      reason: "approval-not-requested",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
      mapJsonPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
      approvalStatus: "not requested",
    });
    expect(mkdirMock).not.toHaveBeenCalled();
    expect(writeFileMock).not.toHaveBeenCalled();
  });

  it("writes canonical map only after approval and uses the SPS-owned metadata root", async () => {
    const { candidate, acceptance } = buildApprovedCandidate();
    const approval = evaluateProjectMapCanonicalWriteApproval({
      requested: true,
      decision: "approved",
      acceptance,
    });

    const { writeProjectMapCanonicalMap } = await loadModule();
    const result = await writeProjectMapCanonicalMap({
      project: {
        id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        name: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      },
      approval,
      candidate,
    });

    expect(result.status).toBe("written");
    if (result.status !== "written") {
      throw new Error("Expected canonical write to succeed");
    }

    expect(result.projectMapRootPath).toBe(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
    );
    expect(result.mapJsonPath).toBe(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
    );
    expect(result.mapJsonPath).not.toContain("C:\\SPS_OS_WORK\\beauty-client-pro");
    expect(mkdirMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
      { recursive: true },
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
      expect.stringContaining('"kind": "canonical-project-map"'),
      "utf8",
    );
  });

  it("keeps candidate data distinguishable from canonical data after write", async () => {
    const { candidate, acceptance } = buildApprovedCandidate();
    const approval = evaluateProjectMapCanonicalWriteApproval({
      requested: true,
      decision: "approved",
      acceptance,
    });

    const { writeProjectMapCanonicalMap } = await loadModule();
    const result = await writeProjectMapCanonicalMap({
      project: {
        id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        name: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      },
      approval,
      candidate,
    });

    expect(result.status).toBe("written");
    if (result.status !== "written") {
      throw new Error("Expected canonical write to succeed");
    }

    const writtenPayload = writeFileMock.mock.calls[0]?.[1];

    expect(typeof writtenPayload).toBe("string");
    const parsedPayload = JSON.parse(String(writtenPayload)) as {
      kind: string;
      canonical: { projectId: string; mapJsonPath: string };
      candidate: { projectId: string; sourcePath: string };
      writeApproval: { status: string };
    };

    expect(parsedPayload).toMatchObject({
      kind: "canonical-project-map",
      canonical: {
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        mapJsonPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map\\map.json",
      },
      writeApproval: {
        status: "approved",
      },
      candidate: {
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        sourcePath: "C:\\SPS_OS_WORK\\beauty-client-pro",
      },
    });
    expect(parsedPayload.canonical).not.toBe(parsedPayload.candidate);
  });

  it("returns unavailable when the candidate is unavailable", async () => {
    const { writeProjectMapCanonicalMap } = await loadModule();
    const result = await writeProjectMapCanonicalMap({
      project: {
        id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        name: "Beauty Client PRO",
        repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      },
      approval: {
        status: "approved",
        canonicalWriteAllowed: true,
        candidateOnly: true,
        requested: true,
        decision: "approved",
        acceptanceStatus: "candidate acceptable",
        requiredEvidence: [],
        reviewedFoundationAreas: [],
      },
      candidate: {
        status: "unavailable",
        reason: "project-source-path-unavailable",
        confidence: "unavailable",
        foundationChecklist: [],
        evidence: [],
      },
    });

    expect(result).toMatchObject({
      status: "unavailable",
      reason: "candidate-unavailable",
      approvalStatus: "approved",
    });
    expect(mkdirMock).not.toHaveBeenCalled();
    expect(writeFileMock).not.toHaveBeenCalled();
  });
});
