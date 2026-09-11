import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { executeControlledProjectMapRefresh } from "./controlled-refresh";
import type { ProjectMapCandidateRefreshPreview } from "./candidate-refresh-preview";
import type { ProjectMapCanonicalWriteApprovalResult } from "./write-approval";

const project = { id: "project-1", name: "Project One" };
const candidate = { status: "available", projectId: project.id, projectName: project.name } as never;
const approval = { status: "approved", canonicalWriteAllowed: true } as unknown as ProjectMapCanonicalWriteApprovalResult;
const preflight = { status: "READY_FOR_FUTURE_WRITE", blockers: [] } as never;
const preview = (status: ProjectMapCandidateRefreshPreview["status"]): ProjectMapCandidateRefreshPreview => ({
  status, addedItems: [], removedItems: [], changedItems: [], unchangedSummary: "", blockingReasons: [], sourceIdentity: "source", targetIdentity: "target",
});

function deps() {
  return {
    mkdir: vi.fn().mockResolvedValue(undefined),
    copyFile: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn().mockResolvedValue(Buffer.from("previous")),
    writeFile: vi.fn().mockResolvedValue(undefined),
    unlink: vi.fn().mockResolvedValue(undefined),
    writeCanonical: vi.fn().mockResolvedValue({ status: "written", canonicalMap: { value: "candidate" } }),
  };
}

describe("executeControlledProjectMapRefresh", () => {
  it("does not touch storage for no_drift/no_changes", async () => {
    const fileDeps = deps();
    const result = await executeControlledProjectMapRefresh({ project, preview: preview("no_changes"), approval, candidate, preflight, deps: fileDeps });
    expect(result).toEqual({ status: "no-op", reason: "no_changes" });
    expect(fileDeps.readFile).not.toHaveBeenCalled();
    expect(fileDeps.writeCanonical).not.toHaveBeenCalled();
  });

  it("blocks changes without Product Owner approval", async () => {
    const fileDeps = deps();
    const result = await executeControlledProjectMapRefresh({ project, preview: preview("changes_ready"), approval: { ...approval, status: "approval required", canonicalWriteAllowed: false }, candidate, preflight, deps: fileDeps });
    expect(result).toMatchObject({ status: "blocked" });
    expect(fileDeps.writeCanonical).not.toHaveBeenCalled();
  });

  it("backs up before writing and records refresh audit", async () => {
    const fileDeps = deps();
    fileDeps.readFile
      .mockResolvedValueOnce(Buffer.from("previous"))
      .mockResolvedValueOnce(Buffer.from("previous audit"))
      .mockResolvedValueOnce(Buffer.from('{"kind":"canonical-project-map"}'));
    const result = await executeControlledProjectMapRefresh({ project, preview: preview("changes_ready"), approval, candidate, preflight, now: new Date("2026-09-11T00:00:00.000Z"), deps: fileDeps });
    expect(result.status).toBe("written");
    expect(fileDeps.copyFile.mock.invocationCallOrder[0]).toBeLessThan(fileDeps.writeCanonical.mock.invocationCallOrder[0]);
    expect(fileDeps.writeFile).toHaveBeenCalledWith(expect.stringContaining("map-refresh-audit.json"), expect.stringContaining("project-map-refresh-audit"), "utf8");
  });

  it("restores the previous canonical artifact after a write failure", async () => {
    const fileDeps = deps();
    fileDeps.writeCanonical.mockRejectedValue(new Error("disk full"));
    const result = await executeControlledProjectMapRefresh({ project, preview: preview("changes_ready"), approval, candidate, preflight, deps: fileDeps });
    expect(result).toMatchObject({ status: "failed", reason: "refresh-failed" });
    expect(fileDeps.writeFile).toHaveBeenCalledWith(expect.stringContaining("map.json"), Buffer.from("previous"), "utf8");
  });
});
