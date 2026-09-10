import { access, mkdir, readFile, writeFile } from "node:fs/promises";
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

export type ProjectMapCanonicalReadback = {
  kind: "canonical-project-map";
  version: 1;
  canonical: {
    projectId: string;
    projectName: string;
    projectMetadataRootPath: string;
    projectMapRootPath: string;
    mapJsonPath: string;
    projectSourceIdentityPath: string;
    sourceIdentity: ProjectMapSourceIdentity;
    writtenAt: string;
  };
  writeApproval: {
    status: string;
    canonicalWriteAllowed: boolean;
    acceptedRisks: string[];
  };
};

export type ProjectMapWriteAuditReadback = {
  kind: "canonical-project-map-write-audit";
  version: 1;
  projectId: string;
  projectName: string;
  mapJsonPath: string;
  projectSourceIdentityPath: string;
  acceptedRisks: string[];
  preflight: {
    status: string;
    evidenceRiskCount: number;
  };
  writeResult: string;
  writtenAt: string;
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
      status: "present";
      projectId: string;
      projectName: string;
      projectMetadataRootPath: string;
      projectMapRootPath: string;
      mapJsonPath: string;
      projectSourceIdentity: ProjectMapSourceIdentity;
      projectSourceIdentityPersistence: ProjectMapSourceIdentityPersistenceResult;
      canonicalMap: ProjectMapCanonicalReadback;
      auditStatus: "present" | "missing" | "invalid";
      audit?: ProjectMapWriteAuditReadback;
    }
  | {
      status: "unavailable";
      reason:
        | "invalid-project-identity"
        | "project-map-access-unavailable"
        | "project-map-present-but-read-not-implemented"
        | "project-map-invalid";
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readCanonicalMap(value: unknown): ProjectMapCanonicalReadback | null {
  if (!isRecord(value) || value.kind !== "canonical-project-map" || value.version !== 1) {
    return null;
  }

  const canonical = value.canonical;
  const approval = value.writeApproval;

  if (
    !isRecord(canonical) ||
    !isRecord(approval) ||
    typeof canonical.projectId !== "string" ||
    typeof canonical.projectName !== "string" ||
    typeof canonical.projectMetadataRootPath !== "string" ||
    typeof canonical.projectMapRootPath !== "string" ||
    typeof canonical.mapJsonPath !== "string" ||
    typeof canonical.projectSourceIdentityPath !== "string" ||
    !isRecord(canonical.sourceIdentity) ||
    typeof canonical.writtenAt !== "string" ||
    typeof approval.status !== "string" ||
    typeof approval.canonicalWriteAllowed !== "boolean" ||
    !Array.isArray(approval.acceptedRisks) ||
    !approval.acceptedRisks.every((risk) => typeof risk === "string")
  ) {
    return null;
  }

  return value as unknown as ProjectMapCanonicalReadback;
}

function readWriteAudit(value: unknown): ProjectMapWriteAuditReadback | null {
  if (!isRecord(value) || value.kind !== "canonical-project-map-write-audit" || value.version !== 1) {
    return null;
  }

  const preflight = value.preflight;

  if (
    !isRecord(preflight) ||
    typeof value.projectId !== "string" ||
    typeof value.projectName !== "string" ||
    typeof value.mapJsonPath !== "string" ||
    typeof value.projectSourceIdentityPath !== "string" ||
    !Array.isArray(value.acceptedRisks) ||
    !value.acceptedRisks.every((risk) => typeof risk === "string") ||
    typeof preflight.status !== "string" ||
    typeof preflight.evidenceRiskCount !== "number" ||
    typeof value.writeResult !== "string" ||
    typeof value.writtenAt !== "string"
  ) {
    return null;
  }

  return value as unknown as ProjectMapWriteAuditReadback;
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
      errorMessage: error instanceof Error ? error.message : "unknown write failure",
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

  let canonicalMap: ProjectMapCanonicalReadback | null;

  try {
    canonicalMap = readCanonicalMap(
      JSON.parse(await readFile(mapJsonPath, "utf8")) as unknown,
    );
  } catch {
    canonicalMap = null;
  }

  if (!canonicalMap) {
    return {
      status: "unavailable",
      reason: "project-map-invalid",
      projectId: projectMapStorageRoot.projectId,
      projectName: projectMapStorageRoot.projectName,
      projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
      projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
      mapJsonPath,
      projectSourceIdentity,
      projectSourceIdentityPersistence,
    };
  }

  const auditJsonPath = join(
    projectMapStorageRoot.projectMapRootPath,
    "map-write-audit.json",
  );
  let auditStatus: "present" | "missing" | "invalid" = "missing";
  let audit: ProjectMapWriteAuditReadback | undefined;

  try {
    audit = readWriteAudit(
      JSON.parse(await readFile(auditJsonPath, "utf8")) as unknown,
    ) ?? undefined;
    auditStatus = audit ? "present" : "invalid";
  } catch (error) {
    if (!isMissingPathError(error)) {
      auditStatus = "invalid";
    }
  }

  return {
    status: "present",
    projectId: projectMapStorageRoot.projectId,
    projectName: projectMapStorageRoot.projectName,
    projectMetadataRootPath: projectMapStorageRoot.projectMetadataRootPath,
    projectMapRootPath: projectMapStorageRoot.projectMapRootPath,
    mapJsonPath,
    projectSourceIdentity,
    projectSourceIdentityPersistence,
    canonicalMap,
    auditStatus,
    ...(audit ? { audit } : {}),
  };
}
