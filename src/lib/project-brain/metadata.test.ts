// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const getServerProjectByIdMock = vi.fn();
const getServerTasksByProjectIdMock = vi.fn();
const getServerKnowledgeEntriesByProjectIdMock = vi.fn();
const getProjectConductorDecisionsMock = vi.fn();
const getProjectConductorStateMock = vi.fn();
const getCoreDoctrineBootstrapStatusMock = vi.fn();

vi.mock("@/lib/project/server", () => ({
  getServerProjectById: getServerProjectByIdMock,
}));

vi.mock("@/lib/task/server", () => ({
  getServerTasksByProjectId: getServerTasksByProjectIdMock,
}));

vi.mock("@/lib/knowledge/server", () => ({
  getServerKnowledgeEntriesByProjectId:
    getServerKnowledgeEntriesByProjectIdMock,
}));

vi.mock("@/lib/conductor/project-store", () => ({
  getProjectConductorDecisions: getProjectConductorDecisionsMock,
  getProjectConductorState: getProjectConductorStateMock,
}));

vi.mock("@/lib/knowledge/core-doctrine", () => ({
  getCoreDoctrineBootstrapStatus: getCoreDoctrineBootstrapStatusMock,
}));

async function loadModule() {
  vi.resetModules();
  return import("./metadata");
}

describe("getServerAiWorkspaceMetadataContext", () => {
  beforeEach(() => {
    getServerProjectByIdMock.mockReset();
    getServerTasksByProjectIdMock.mockReset();
    getServerKnowledgeEntriesByProjectIdMock.mockReset();
    getProjectConductorDecisionsMock.mockReset();
    getProjectConductorStateMock.mockReset();
    getCoreDoctrineBootstrapStatusMock.mockReset();

    getServerProjectByIdMock.mockResolvedValue({
      id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      name: "Beauty Client PRO",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
    });
    getServerTasksByProjectIdMock.mockResolvedValue([
      {
        id: "task-1",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        title: "First task",
        createdAt: "2026-08-23T10:00:00.000Z",
      },
      {
        id: "task-2",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        title: "Second task",
        createdAt: "2026-08-23T10:05:00.000Z",
      },
    ]);
    getServerKnowledgeEntriesByProjectIdMock.mockResolvedValue([
      {
        id: "knowledge-1",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        title: "Note",
        content: "Body",
        createdAt: "2026-08-23T10:10:00.000Z",
      },
    ]);
    getProjectConductorDecisionsMock.mockResolvedValue([
      {
        id: "decision-1",
        projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        title: "Scope",
        content: "Keep it minimal",
        status: "open",
        createdAt: "2026-08-23T10:15:00.000Z",
      },
    ]);
    getProjectConductorStateMock.mockResolvedValue({
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      status: "decision-required",
      currentMilestone: "MS-028.32 - Conductor State UI Wiring Foundation",
      currentPhase: "decision-required",
      nextAction: "Review the metadata loader.",
      reason: "The project has conductor state.",
      updatedAt: "2026-08-23T10:20:00.000Z",
    });
    getCoreDoctrineBootstrapStatusMock.mockResolvedValue({
      status: "available",
      storePath: "C:\\SPS_OS_WORK\\.sps-meta\\core\\doctrine.jsonl",
      entryCount: 8,
    });
  });

  it("summarizes project metadata modules without repo files", async () => {
    const { getServerAiWorkspaceMetadataContext } = await loadModule();
    const result = await getServerAiWorkspaceMetadataContext(
      "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
    );

    expect(result).toEqual({
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      projectName: "Beauty Client PRO",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      repoFilesIncluded: false,
      tasks: {
        status: "available",
        storePath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\tasks\\open.jsonl",
        count: 2,
      },
      knowledge: {
        status: "available",
        storePath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\knowledge\\entries.jsonl",
        count: 1,
      },
      decisions: {
        status: "available",
        storePath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\decisions\\decisions.jsonl",
        count: 1,
      },
      conductor: {
        status: "available",
        storePath:
          "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\conductor\\state.json",
        count: 1,
        currentMilestone:
          "MS-028.32 - Conductor State UI Wiring Foundation",
        currentPhase: "decision-required",
        nextAction: "Review the metadata loader.",
        reason: "The project has conductor state.",
      },
      coreDoctrine: {
        status: "available",
        storePath: "C:\\SPS_OS_WORK\\.sps-meta\\core\\doctrine.jsonl",
        count: 8,
      },
    });
  });

  it("formats a prompt-safe summary that explicitly excludes repo files", async () => {
    const { buildAiWorkspaceMetadataContextSummary } = await loadModule();

    expect(
      buildAiWorkspaceMetadataContextSummary({
        projectId: "project-1",
        projectName: "Alpha",
        projectMetadataRootPath:
          "C:\\SPS_OS_WORK\\.sps-meta\\alpha--project1",
        repoFilesIncluded: false,
        tasks: {
          status: "available",
          storePath:
            "C:\\SPS_OS_WORK\\.sps-meta\\alpha--project1\\tasks\\open.jsonl",
          count: 0,
        },
        knowledge: {
          status: "available",
          storePath:
            "C:\\SPS_OS_WORK\\.sps-meta\\alpha--project1\\knowledge\\entries.jsonl",
          count: 0,
        },
        decisions: {
          status: "available",
          storePath:
            "C:\\SPS_OS_WORK\\.sps-meta\\alpha--project1\\decisions\\decisions.jsonl",
          count: 0,
        },
        conductor: {
          status: "available",
          storePath:
            "C:\\SPS_OS_WORK\\.sps-meta\\alpha--project1\\conductor\\state.json",
          count: 1,
          currentMilestone: "Decision state",
          currentPhase: "decision-required",
          nextAction: "Wait for Product Owner input.",
          reason: "No project-specific conductor state yet.",
        },
        coreDoctrine: {
          status: "available",
          storePath: "C:\\SPS_OS_WORK\\.sps-meta\\core\\doctrine.jsonl",
          count: 8,
        },
      }),
    ).toContain("Repository files: not included.");
  });
});

describe("resolveProjectMapStorageRoot", () => {
  it("derives the project-map root from the existing metadata-root strategy", async () => {
    const { resolveProjectMapStorageRoot } = await loadModule();

    expect(
      resolveProjectMapStorageRoot({
        id: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
        name: "Beauty Client PRO",
        workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      }),
    ).toEqual({
      status: "available",
      projectId: "0d3e28cb-6dff-442a-b94c-007a5d6b5779",
      projectName: "Beauty Client PRO",
      projectMetadataRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      projectMapRootPath:
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb\\project-map",
    });
  });

  it("returns an explicit unavailable result for a missing project identity", async () => {
    const { resolveProjectMapStorageRoot } = await loadModule();

    expect(
      resolveProjectMapStorageRoot({
        id: "   ",
        name: "Alpha",
      }),
    ).toEqual({
      status: "unavailable",
      reason: "invalid-project-identity",
    });
  });
});
