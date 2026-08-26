import { access } from "node:fs/promises";
import { join } from "node:path";

import { resolveProjectMapStorageRoot } from "../project-brain/metadata";

type ProjectLike = {
  id: string;
  name: string;
  workingDirectory?: string;
};

const PROJECT_MAP_FILE_NAME = "map.json";

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
    };

export async function resolveProjectMapReadResult(
  project: ProjectLike | null | undefined,
): Promise<ProjectMapReadResult> {
  const projectMapStorageRoot = resolveProjectMapStorageRoot(project);

  if (projectMapStorageRoot.status === "unavailable") {
    return {
      status: "unavailable",
      reason: projectMapStorageRoot.reason,
    };
  }

  const mapJsonPath = join(
    projectMapStorageRoot.projectMapRootPath,
    PROJECT_MAP_FILE_NAME,
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
  };
}
