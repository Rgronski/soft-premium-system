import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import {
  buildProjectMapControlledRefreshReadiness,
  executeControlledProjectMapRefresh,
} from "./controlled-refresh";
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

describe("buildProjectMapControlledRefreshReadiness", () => {
  const baseInput = {
    mapReadResult: { status: "present", auditStatus: "present" } as never,
    integrity: { status: "consistent", checks: [] } as never,
    alignment: { status: "aligned", checks: [], controlSources: [] } as never,
    structuralDrift: { status: "no_drift", changed: [], added: [], removed: [], unavailable: [], details: [] } as never,
    preview: preview("no_changes"),
    riskDecisions: { status: "present", decisions: [] } as never,
    approval: null,
    execution: { status: "no-op", reason: "no_changes" } as const,
  };

  it("explains the current no_drift/no_changes path as a safe no-op", () => {
    const readiness = buildProjectMapControlledRefreshReadiness(baseInput);
    expect(readiness.status).toBe("safe_no_op");
    expect(readiness.summary).toContain("would not rewrite canonical map.json");
    expect(readiness.backupAndAudit).toContain("No backup");
  });

  it("requires approval before changed candidates can execute", () => {
    const readiness = buildProjectMapControlledRefreshReadiness({
      ...baseInput,
      structuralDrift: { status: "changed", changed: ["package.json"], added: [], removed: [], unavailable: [], details: [] } as never,
      preview: { ...preview("changes_ready"), changedItems: ["changed: package.json"] },
      execution: { status: "blocked", reason: "Product Owner approval is required" },
    });
    expect(readiness.status).toBe("requires_review");
    expect(readiness.summary).toContain("Product Owner approval");
    expect(readiness.backupAndAudit).toContain("backup before write");
  });

  it("shows approved changed candidates as ready for the controlled execution path", () => {
    const readiness = buildProjectMapControlledRefreshReadiness({
      ...baseInput,
      structuralDrift: { status: "changed", changed: ["src/app/page.tsx"], added: [], removed: [], unavailable: [], details: [] } as never,
      preview: { ...preview("changes_ready"), changedItems: ["changed: src/app/page.tsx"] },
      approval,
      execution: { status: "blocked", reason: "not executed in readiness test" },
    });
    expect(readiness.status).toBe("ready_for_approved_execution");
    expect(readiness.summary).toContain("backup");
    expect(readiness.details).toContain("changed: 1");
  });

  it("does not treat warning or blocked data as safe", () => {
    const readiness = buildProjectMapControlledRefreshReadiness({
      ...baseInput,
      integrity: { status: "warning", checks: [] } as never,
      alignment: { status: "needs_review", checks: [], controlSources: [] } as never,
      preview: { ...preview("blocked"), blockingReasons: ["canonical integrity requires review"] },
      execution: { status: "blocked", reason: "candidate preview is blocked" },
    });
    expect(readiness.status).toBe("requires_review");
    expect(readiness.details).toContain("blocking reason: canonical integrity requires review");
  });
});
