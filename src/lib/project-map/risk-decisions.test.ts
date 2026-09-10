// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const { readFileMock, writeFileMock, mkdirMock } = vi.hoisted(() => ({
  readFileMock: vi.fn(),
  writeFileMock: vi.fn(),
  mkdirMock: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
  readFile: readFileMock,
  writeFile: writeFileMock,
  mkdir: mkdirMock,
}));

vi.mock("../project-brain/metadata", () => ({
  resolveProjectMapStorageRoot: (project: { id: string; name: string }) => ({
    status: "available",
    projectId: project.id,
    projectName: project.name,
    projectMetadataRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha",
    projectMapRootPath: "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map",
  }),
}));

import {
  persistProjectMapRiskDecision,
  readProjectMapRiskDecisions,
} from "./risk-decisions";

const project = {
  id: "project-1",
  name: "Alpha",
  workingDirectory: "C:\\SPS_OS_WORK\\alpha",
};

beforeEach(() => {
  readFileMock.mockReset();
  writeFileMock.mockReset();
  mkdirMock.mockReset();
  mkdirMock.mockResolvedValue(undefined);
  writeFileMock.mockResolvedValue(undefined);
});

describe("Project Map risk decisions", () => {
  it("reads all supported decision states from a valid artifact", async () => {
    readFileMock.mockResolvedValue(
      JSON.stringify({
        kind: "project-map-risk-decisions",
        version: 1,
        decisions: [
          { riskKey: "SSOT", decisionState: "accepted", decidedAt: "2026-09-10T00:00:00.000Z", actor: "Product Owner", projectId: "project-1", projectName: "Alpha" },
          { riskKey: "Project Bible", decisionState: "open", decidedAt: "2026-09-10T00:00:00.000Z", actor: "Product Owner", projectId: "project-1", projectName: "Alpha" },
          { riskKey: "Project Map", decisionState: "needs_evidence", decidedAt: "2026-09-10T00:00:00.000Z", actor: "Product Owner", projectId: "project-1", projectName: "Alpha" },
        ],
      }),
    );

    await expect(readProjectMapRiskDecisions(project)).resolves.toMatchObject({
      status: "present",
      decisions: expect.arrayContaining([
        expect.objectContaining({ riskKey: "SSOT", decisionState: "accepted" }),
        expect.objectContaining({ riskKey: "Project Bible", decisionState: "open" }),
        expect.objectContaining({ riskKey: "Project Map", decisionState: "needs_evidence" }),
      ]),
    });
  });

  it("handles missing, malformed, and mismatched artifacts safely", async () => {
    readFileMock.mockRejectedValueOnce(Object.assign(new Error("missing"), { code: "ENOENT" }));
    await expect(readProjectMapRiskDecisions(project)).resolves.toMatchObject({ status: "missing" });

    readFileMock.mockResolvedValueOnce("not-json");
    await expect(readProjectMapRiskDecisions(project)).resolves.toMatchObject({ status: "invalid" });

    readFileMock.mockResolvedValueOnce(JSON.stringify({
      kind: "project-map-risk-decisions",
      version: 1,
      decisions: [{ riskKey: "SSOT", decisionState: "accepted", decidedAt: "2026-09-10T00:00:00.000Z", actor: "Product Owner", projectId: "other", projectName: "Alpha" }],
    }));
    await expect(readProjectMapRiskDecisions(project)).resolves.toMatchObject({ status: "mismatched" });
  });

  it("persists a decision in SPS metadata with Product Owner provenance", async () => {
    readFileMock.mockRejectedValueOnce(Object.assign(new Error("missing"), { code: "ENOENT" }));

    const result = await persistProjectMapRiskDecision(project, {
      riskKey: "First Layout",
      decisionState: "needs_evidence",
    });

    expect(result.status).toBe("persisted");
    expect(writeFileMock).toHaveBeenCalledWith(
      "C:\\SPS_OS_WORK\\.sps-meta\\alpha\\project-map\\risk-decisions.json",
      expect.stringContaining('"actor": "Product Owner"'),
      "utf8",
    );
    expect(writeFileMock.mock.calls[0][1]).toContain('"decisionState": "needs_evidence"');
  });

  it("reports a write failure without claiming the decision changed", async () => {
    readFileMock.mockRejectedValueOnce(Object.assign(new Error("missing"), { code: "ENOENT" }));
    writeFileMock.mockRejectedValueOnce(new Error("disk full"));

    await expect(
      persistProjectMapRiskDecision(project, {
        riskKey: "SSOT",
        decisionState: "open",
      }),
    ).resolves.toMatchObject({ status: "write-failure" });
  });
});
