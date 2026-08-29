import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { resolveProjectMapStorageRoot } from "../project-brain/metadata";
import { buildRepoCheckoutDirectory } from "../project/source-status";

type ProjectLike = {
  id: string;
  name: string;
  repositoryUrl?: string;
  workingDirectory?: string;
};

const PROJECT_MAP_FILE_NAME = "map.json";
const PROJECT_SOURCE_IDENTITY_FILE_NAME = "project-source-identity.json";

export type ProjectMapSourceIdentity = {
  projectId: string;
  projectName: string;
  repositoryUrl: string | null;
  workingDirectory: string | null;
  projectCheckoutPath: string | null;
  projectMetadataRootPath: string;
  projectSourceIdentityPath: string;
  persistedAt: string;
};

export type ProjectMapSourceIdentityPersistenceResult =
  | {
      status: "persisted";
      projectSourceIdentityPath: string;
      persistedAt: string;
    }
  | {
      status: "skipped";
      reason: "invalid-project-identity" | "project-not-provided";
    }
  | {
      status: "failed";
      reason: "source-identity-write-failed";
      projectSourceIdentityPath: string;
      errorMessage: string;
      persistedAt: string;
    }
  | {
      status: "unavailable";
      reason: "project-source-identity-unavailable";
    };

function isMissingPathError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  const code = (error as { code?: unknown }).code;

  return code === "ENOENT" || code === "ENOTDIR";
}

export type ProjectMapReadResult =
  | {
      status: "missing";
      projectId: string;
      projectName: string;
      projectMetadataRootPath: string;
      projectMapRootPath: string;
      mapJsonPath: string;
      projectSourceIdentity: ProjectMapSourceIdentity;
      projectSourceIdentityPersistence: ProjectMapSourceIdentityPersistenceResult;
    }
  | {
      status: "unavailable";
      reason:
        | "invalid-project-identity"
        | "project-map-access-unavailable"
        | "project-map-present-but-read-not-implemented";
      projectId?: string;
      projectName?: string;
      projectMetadataRootPath?: string;
      projectMapRootPath?: string;
      mapJsonPath?: string;
      projectSourceIdentity?: ProjectMapSourceIdentity;
      projectSourceIdentityPersistence: ProjectMapSourceIdentityPersistenceResult;
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
  project: ProjectLike | null | undefined,
): ProjectMapSourceIdentity {
  const workingDirectory = project?.workingDirectory?.trim() || null;
  const repositoryUrl = project?.repositoryUrl?.trim() || null;
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
    persistedAt: new Date().toISOString(),
  };
}

async function persistProjectSourceIdentity(
  sourceIdentity: ProjectMapSourceIdentity,
): Promise<ProjectMapSourceIdentityPersistenceResult> {
  try {
    await mkdir(sourceIdentity.projectMetadataRootPath, { recursive: true });
    await writeFile(
      sourceIdentity.projectSourceIdentityPath,
      `${JSON.stringify(sourceIdentity, null, 2)}\n`,
      "utf8",
    );
    return {
      status: "persisted",
      projectSourceIdentityPath: sourceIdentity.projectSourceIdentityPath,
      persistedAt: sourceIdentity.persistedAt,
    };
  } catch (error) {
    return {
      status: "failed",
      reason: "source-identity-write-failed",
      projectSourceIdentityPath: sourceIdentity.projectSourceIdentityPath,
      errorMessage:
        error instanceof Error ? error.message : "unknown write failure",
      persistedAt: sourceIdentity.persistedAt,
    };
  }
}

export async function resolveProjectMapReadResult(
  project: ProjectLike | null | undefined,
): Promise<ProjectMapReadResult> {
  if (!project) {
    return {
      status: "unavailable",
      reason: "invalid-project-identity",
      projectSourceIdentityPersistence: {
        status: "unavailable",
        reason: "project-source-identity-unavailable",
      },
    };
  }

  const projectMapStorageRoot = resolveProjectMapStorageRoot(project);

  if (projectMapStorageRoot.status === "unavailable") {
    return {
      status: "unavailable",
      reason: projectMapStorageRoot.reason,
      projectSourceIdentityPersistence: {
        status: "skipped",
        reason: "invalid-project-identity",
      },
    };
  }

  const mapJsonPath = join(
    projectMapStorageRoot.projectMapRootPath,
    PROJECT_MAP_FILE_NAME,
  );
  const projectSourceIdentity = buildProjectSourceIdentity(
    projectMapStorageRoot,
    project,
  );
  const projectSourceIdentityPersistence = await persistProjectSourceIdentity(
    projectSourceIdentity,
  );

  try {
    await access(projectMapStorageRoot.projectMapRootPath);
  } catch (error) {
    if (isMissingPathError(error)) {
      return {
        status: "missing",
        projectId: projectMapStorageRoot.projectId,
        projectName: projectMapStorageRoot.projectName,
        projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
        projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
        mapJsonPath,
        projectSourceIdentity,
        projectSourceIdentityPersistence,
      };
    }

    return {
      status: "unavailable",
      reason: "project-map-access-unavailable",
      projectId: projectMapStorageRoot.projectId,
      projectName: projectMapStorageRoot.projectName,
      projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
      projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
      mapJsonPath,
      projectSourceIdentity,
      projectSourceIdentityPersistence,
    };
  }

  try {
    await access(mapJsonPath);
  } catch (error) {
    if (isMissingPathError(error)) {
      return {
        status: "missing",
        projectId: projectMapStorageRoot.projectId,
        projectName: projectMapStorageRoot.projectName,
        projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
        projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
        mapJsonPath,
        projectSourceIdentity,
        projectSourceIdentityPersistence,
      };
    }

    return {
      status: "unavailable",
      reason: "project-map-access-unavailable",
      projectId: projectMapStorageRoot.projectId,
      projectName: projectMapStorageRoot.projectName,
      projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
      projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
      mapJsonPath,
      projectSourceIdentity,
      projectSourceIdentityPersistence,
    };
  }

  return {
    status: "unavailable",
    reason: "project-map-present-but-read-not-implemented",
    projectId: projectMapStorageRoot.projectId,
    projectName: projectMapStorageRoot.projectName,
    projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
    projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
    mapJsonPath,
    projectSourceIdentity,
    projectSourceIdentityPersistence,
  };
}
