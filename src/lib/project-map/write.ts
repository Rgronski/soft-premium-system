import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { resolveProjectMapStorageRoot } from "../project-brain/metadata";
import { buildRepoCheckoutDirectory } from "../project/source-status";
import type {
  ProjectMapCanonicalWriteApprovalResult,
  ProjectMapCanonicalWriteApprovalStatus,
} from "./write-approval";
import type { ProjectMapReconstructionCandidateResult } from "./reconstruct";

type ProjectLike = {
  id?: string;
  name?: string;
  repositoryUrl?: string;
  workingDirectory?: string;
};

const PROJECT_MAP_FILE_NAME = "map.json";
const PROJECT_SOURCE_IDENTITY_FILE_NAME = "project-source-identity.json";

export type ProjectMapCanonicalSourceIdentity = {
  projectId: string;
  projectName: string;
  repositoryUrl: string | null;
  workingDirectory: string | null;
  projectCheckoutPath: string | null;
  projectMetadataRootPath: string;
  projectSourceIdentityPath: string;
};

export type ProjectMapCanonicalMap = {
  kind: "canonical-project-map";
  version: 1;
  canonical: {
    projectId: string;
    projectName: string;
    projectMetadataRootPath: string;
    projectMapRootPath: string;
    mapJsonPath: string;
    projectSourceIdentityPath: string;
    sourceIdentity: ProjectMapCanonicalSourceIdentity;
    writtenAt: string;
  };
  writeApproval: ProjectMapCanonicalWriteApprovalResult;
  candidate: ProjectMapReconstructionCandidateResult;
};

export type ProjectMapCanonicalWriteResult =
  | {
      status: "written";
      projectId: string;
      projectName: string;
      projectMetadataRootPath: string;
      projectMapRootPath: string;
      mapJsonPath: string;
      projectSourceIdentityPath: string;
      approvalStatus: ProjectMapCanonicalWriteApprovalStatus;
      canonicalMap: ProjectMapCanonicalMap;
    }
  | {
      status: "blocked";
      reason:
        | "approval-not-requested"
        | "approval-required"
        | "rejected"
        | "blocked-by-evidence";
      projectId: string;
      projectName: string;
      projectMetadataRootPath: string;
      projectMapRootPath: string;
      mapJsonPath: string;
      projectSourceIdentityPath: string;
      approvalStatus: ProjectMapCanonicalWriteApprovalStatus;
    }
  | {
      status: "failed";
      reason: "canonical-write-failed";
      projectId: string;
      projectName: string;
      projectMetadataRootPath: string;
      projectMapRootPath: string;
      mapJsonPath: string;
      projectSourceIdentityPath: string;
      approvalStatus: ProjectMapCanonicalWriteApprovalStatus;
      errorMessage: string;
    }
  | {
      status: "unavailable";
      reason:
        | "invalid-project-identity"
        | "project-map-storage-unavailable"
        | "candidate-unavailable";
      projectId?: string;
      projectName?: string;
      projectMetadataRootPath?: string;
      projectMapRootPath?: string;
      mapJsonPath?: string;
      projectSourceIdentityPath?: string;
      approvalStatus?: ProjectMapCanonicalWriteApprovalStatus;
    };

export type ProjectMapCanonicalWriteInput = {
  project: ProjectLike | null | undefined;
  approval: ProjectMapCanonicalWriteApprovalResult;
  candidate: ProjectMapReconstructionCandidateResult;
};

function buildProjectSourceIdentityPath(
  projectMetadataRootPath: string,
): string {
  return join(projectMetadataRootPath, PROJECT_SOURCE_IDENTITY_FILE_NAME);
}

function buildProjectSourceIdentity(
  projectMapStorageRoot: Extract<
    ReturnType<typeof resolveProjectMapStorageRoot>,
    { status: "available" }
  >,
  project: ProjectLike,
): ProjectMapCanonicalSourceIdentity {
  const workingDirectory = project.workingDirectory?.trim() || null;
  const repositoryUrl = project.repositoryUrl?.trim() || null;
  const projectCheckoutPath = workingDirectory
    ? buildRepoCheckoutDirectory(workingDirectory)
    : null;

  return {
    projectId: projectMapStorageRoot.projectId,
    projectName: projectMapStorageRoot.projectName,
    repositoryUrl,
    workingDirectory,
    projectCheckoutPath,
    projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
    projectSourceIdentityPath: buildProjectSourceIdentityPath(
      projectMapStorageRoot.projectMetadataRootPath,
    ),
  };
}

function normalizeProjectForStorage(
  project: ProjectLike | null | undefined,
): {
  id: string;
  name: string;
  workingDirectory?: string;
} | null {
  const id = project?.id?.trim() || "";

  if (!id) {
    return null;
  }

  const name = project?.name?.trim() || id;
  const workingDirectory = project?.workingDirectory?.trim() || "";

  return {
    id,
    name,
    ...(workingDirectory ? { workingDirectory } : {}),
  };
}

function buildCanonicalMap(
  projectMapStorageRoot: Extract<
    ReturnType<typeof resolveProjectMapStorageRoot>,
    { status: "available" }
  >,
  project: ProjectLike,
  approval: ProjectMapCanonicalWriteApprovalResult,
  candidate: ProjectMapReconstructionCandidateResult,
  mapJsonPath: string,
  writtenAt: string,
): ProjectMapCanonicalMap {
  const sourceIdentity = buildProjectSourceIdentity(projectMapStorageRoot, project);

  return {
    kind: "canonical-project-map",
    version: 1,
    canonical: {
      projectId: projectMapStorageRoot.projectId,
      projectName: projectMapStorageRoot.projectName,
      projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
      projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
      mapJsonPath,
      projectSourceIdentityPath: sourceIdentity.projectSourceIdentityPath,
      sourceIdentity,
      writtenAt,
    },
    writeApproval: approval,
    candidate,
  };
}

function serializeCanonicalMap(canonicalMap: ProjectMapCanonicalMap): string {
  return `${JSON.stringify(canonicalMap, null, 2)}\n`;
}

function createBlockedResult(
  projectMapStorageRoot: Extract<
    ReturnType<typeof resolveProjectMapStorageRoot>,
    { status: "available" }
  >,
  approvalStatus: ProjectMapCanonicalWriteApprovalStatus,
  reason:
    | "approval-not-requested"
    | "approval-required"
    | "rejected"
    | "blocked-by-evidence",
  mapJsonPath: string,
): Extract<ProjectMapCanonicalWriteResult, { status: "blocked" }> {
  return {
    status: "blocked",
    reason,
    projectId: projectMapStorageRoot.projectId,
    projectName: projectMapStorageRoot.projectName,
    projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
    projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
    mapJsonPath,
    projectSourceIdentityPath: buildProjectSourceIdentityPath(
      projectMapStorageRoot.projectMetadataRootPath,
    ),
    approvalStatus,
  };
}

export async function writeProjectMapCanonicalMap(
  input: ProjectMapCanonicalWriteInput,
): Promise<ProjectMapCanonicalWriteResult> {
  if (input.candidate.status === "unavailable") {
    return {
      status: "unavailable",
      reason: "candidate-unavailable",
      approvalStatus: input.approval.status,
      projectId: input.candidate.projectId,
      projectName: input.candidate.projectName,
    };
  }

  const projectForStorage = normalizeProjectForStorage(input.project);

  if (!projectForStorage) {
    return {
      status: "unavailable",
      reason: "invalid-project-identity",
      approvalStatus: input.approval.status,
    };
  }

  const projectMapStorageRoot = resolveProjectMapStorageRoot(projectForStorage);

  if (projectMapStorageRoot.status === "unavailable") {
    return {
      status: "unavailable",
      reason: "invalid-project-identity",
      approvalStatus: input.approval.status,
    };
  }

  const mapJsonPath = join(
    projectMapStorageRoot.projectMapRootPath,
    PROJECT_MAP_FILE_NAME,
  );

  if (
    input.approval.status !== "approved" ||
    !input.approval.canonicalWriteAllowed
  ) {
    const reason =
      input.approval.status === "not requested"
        ? "approval-not-requested"
        : input.approval.status === "approval required"
          ? "approval-required"
          : input.approval.status === "rejected"
            ? "rejected"
            : "blocked-by-evidence";

    return createBlockedResult(
      projectMapStorageRoot,
      input.approval.status,
      reason,
      mapJsonPath,
    );
  }

  const writtenAt = new Date().toISOString();
  const canonicalMap = buildCanonicalMap(
    projectMapStorageRoot,
    input.project ?? {},
    input.approval,
    input.candidate,
    mapJsonPath,
    writtenAt,
  );

  try {
    await mkdir(projectMapStorageRoot.projectMapRootPath, { recursive: true });
    await writeFile(
      mapJsonPath,
      serializeCanonicalMap(canonicalMap),
      "utf8",
    );
  } catch (error) {
    return {
      status: "failed",
      reason: "canonical-write-failed",
      projectId: projectMapStorageRoot.projectId,
      projectName: projectMapStorageRoot.projectName,
      projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
      projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
      mapJsonPath,
      projectSourceIdentityPath: buildProjectSourceIdentityPath(
        projectMapStorageRoot.projectMetadataRootPath,
      ),
      approvalStatus: input.approval.status,
      errorMessage: error instanceof Error ? error.message : "unknown write failure",
    };
  }

  return {
    status: "written",
    projectId: projectMapStorageRoot.projectId,
    projectName: projectMapStorageRoot.projectName,
    projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
    projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
    mapJsonPath,
    projectSourceIdentityPath: buildProjectSourceIdentityPath(
      projectMapStorageRoot.projectMetadataRootPath,
    ),
    approvalStatus: input.approval.status,
    canonicalMap,
  };
}
