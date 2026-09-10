import { createHash } from "node:crypto";
import { access, mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

import { resolveProjectMapStorageRoot } from "../project-brain/metadata";
import { buildRepoCheckoutDirectory } from "../project/source-status";

const STRUCTURAL_FINGERPRINT_FILE_NAME = "structural-fingerprint.json";
const EXCLUDED_DIRECTORY_NAMES = new Set([
  ".git",
  ".next",
  ".turbo",
  "build",
  "cache",
  "coverage",
  "dist",
  "node_modules",
  "out",
]);

export const STRUCTURAL_FINGERPRINT_SCOPE = [
  "project identity metadata from canonical map.json",
  "regular files under the validated BCP checkout",
  "normalized relative paths, byte sizes, and SHA-256 content hashes",
] as const;

export const STRUCTURAL_FINGERPRINT_EXCLUSIONS = [
  ".git/**",
  ".next/**",
  ".turbo/**",
  "build/**",
  "cache/**",
  "coverage/**",
  "dist/**",
  "node_modules/**",
  "out/**",
  ".env*",
  "*.key",
  "*.pem",
  "*.p12",
  "*.pfx",
  "*secret*",
  "*token*",
] as const;

export type ProjectMapStructuralFingerprintEntry = {
  path: string;
  size: number;
  sha256: string;
};

export type ProjectMapStructuralFingerprintArtifact = {
  kind: "project-map-structural-fingerprint";
  version: 1;
  projectId: string;
  projectName: string;
  repositoryUrl: string;
  workingDirectory: string;
  checkoutPath: string;
  generatedAt: string;
  hashAlgorithm: "sha256";
  scanScope: readonly string[];
  exclusions: readonly string[];
  entries: ProjectMapStructuralFingerprintEntry[];
  overallFingerprint: string;
};

export type ProjectMapStructuralFingerprintResult =
  | {
      status: "generated";
      artifactPath: string;
      artifact: ProjectMapStructuralFingerprintArtifact;
    }
  | {
      status: "unavailable";
      reason:
        | "source-checkout-unavailable"
        | "metadata-storage-unavailable"
        | "baseline-scan-unavailable"
        | "baseline-write-unavailable";
      artifactPath?: string;
    }
  | {
      status: "invalid";
      reason: "canonical-map-invalid" | "project-identity-mismatch";
      artifactPath?: string;
    };

export type ProjectMapStructuralFingerprintReadResult =
  | { status: "present"; artifactPath: string; artifact: ProjectMapStructuralFingerprintArtifact }
  | { status: "unavailable"; reason: "baseline-unavailable"; artifactPath: string }
  | { status: "invalid"; reason: "baseline-invalid"; artifactPath: string };

export type ProjectMapStructuralFingerprintScanResult =
  | { status: "available"; artifact: ProjectMapStructuralFingerprintArtifact }
  | { status: "unavailable"; reason: "source-checkout-unavailable" | "scan-unavailable" }
  | { status: "invalid"; reason: "canonical-map-invalid" | "project-identity-mismatch" };

export type ProjectMapStructuralFingerprintComparison = {
  changed: string[];
  added: string[];
  removed: string[];
};

type ProjectLike = {
  id: string;
  name: string;
  repositoryUrl?: string;
  workingDirectory?: string;
};

type CanonicalIdentity = {
  projectId: string;
  projectName: string;
  repositoryUrl: string | null;
  workingDirectory: string | null;
  projectCheckoutPath: string | null;
};

function normalizeWindowsPath(value: string): string {
  return value.trim().replace(/[\\/]+$/u, "").toLowerCase();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSensitiveFileName(fileName: string): boolean {
  const normalized = fileName.toLowerCase();

  return (
    normalized.startsWith(".env") ||
    [".key", ".pem", ".p12", ".pfx"].some((suffix) => normalized.endsWith(suffix)) ||
    normalized.includes("secret") ||
    normalized.includes("token")
  );
}

function readCanonicalIdentity(value: unknown): CanonicalIdentity | null {
  if (!isRecord(value) || value.kind !== "canonical-project-map" || value.version !== 1) {
    return null;
  }

  const canonical = value.canonical;
  const identity = isRecord(canonical) ? canonical.sourceIdentity : null;

  if (
    !isRecord(canonical) ||
    !isRecord(identity) ||
    typeof canonical.projectId !== "string" ||
    typeof canonical.projectName !== "string" ||
    typeof identity.projectId !== "string" ||
    typeof identity.projectName !== "string" ||
    (identity.repositoryUrl !== null && typeof identity.repositoryUrl !== "string") ||
    (identity.workingDirectory !== null && typeof identity.workingDirectory !== "string") ||
    (identity.projectCheckoutPath !== null && typeof identity.projectCheckoutPath !== "string")
  ) {
    return null;
  }

  return {
    projectId: canonical.projectId,
    projectName: canonical.projectName,
    repositoryUrl: identity.repositoryUrl,
    workingDirectory: identity.workingDirectory,
    projectCheckoutPath: identity.projectCheckoutPath,
  };
}

function buildOverallFingerprint(
  entries: ProjectMapStructuralFingerprintEntry[],
): string {
  return createHash("sha256")
    .update(JSON.stringify(entries))
    .digest("hex");
}

function isFingerprintArtifact(value: unknown): value is ProjectMapStructuralFingerprintArtifact {
  if (!isRecord(value) || value.kind !== "project-map-structural-fingerprint" || value.version !== 1) {
    return false;
  }

  return (
    typeof value.projectId === "string" &&
    typeof value.projectName === "string" &&
    typeof value.repositoryUrl === "string" &&
    typeof value.workingDirectory === "string" &&
    typeof value.checkoutPath === "string" &&
    typeof value.generatedAt === "string" &&
    value.hashAlgorithm === "sha256" &&
    Array.isArray(value.scanScope) &&
    value.scanScope.every((item) => typeof item === "string") &&
    Array.isArray(value.exclusions) &&
    value.exclusions.every((item) => typeof item === "string") &&
    Array.isArray(value.entries) &&
    value.entries.every(
      (entry) =>
        isRecord(entry) &&
        typeof entry.path === "string" &&
        typeof entry.size === "number" &&
        Number.isSafeInteger(entry.size) &&
        typeof entry.sha256 === "string",
    ) &&
    typeof value.overallFingerprint === "string"
  );
}

export function compareProjectMapStructuralFingerprints(
  baseline: ProjectMapStructuralFingerprintArtifact,
  current: ProjectMapStructuralFingerprintArtifact,
): ProjectMapStructuralFingerprintComparison {
  const baselineEntries = new Map(baseline.entries.map((entry) => [entry.path, entry]));
  const currentEntries = new Map(current.entries.map((entry) => [entry.path, entry]));
  const added = [...currentEntries.keys()]
    .filter((path) => !baselineEntries.has(path))
    .sort();
  const removed = [...baselineEntries.keys()]
    .filter((path) => !currentEntries.has(path))
    .sort();
  const changed = [...currentEntries.keys()]
    .filter((path) => {
      const baselineEntry = baselineEntries.get(path);
      const currentEntry = currentEntries.get(path);

      return Boolean(
        baselineEntry &&
          currentEntry &&
          (baselineEntry.size !== currentEntry.size || baselineEntry.sha256 !== currentEntry.sha256),
      );
    })
    .sort();

  return { changed, added, removed };
}

export function buildProjectMapStructuralFingerprintArtifact(input: {
  project: ProjectLike;
  checkoutPath: string;
  entries: ProjectMapStructuralFingerprintEntry[];
  generatedAt?: string;
}): ProjectMapStructuralFingerprintArtifact {
  const entries = [...input.entries].sort((left, right) =>
    left.path.localeCompare(right.path),
  );

  return {
    kind: "project-map-structural-fingerprint",
    version: 1,
    projectId: input.project.id,
    projectName: input.project.name,
    repositoryUrl: input.project.repositoryUrl?.trim() ?? "",
    workingDirectory: input.project.workingDirectory?.trim() ?? "",
    checkoutPath: input.checkoutPath,
    generatedAt: input.generatedAt ?? new Date().toISOString(),
    hashAlgorithm: "sha256",
    scanScope: STRUCTURAL_FINGERPRINT_SCOPE,
    exclusions: STRUCTURAL_FINGERPRINT_EXCLUSIONS,
    entries,
    overallFingerprint: buildOverallFingerprint(entries),
  };
}

async function collectEntries(
  checkoutPath: string,
  currentPath = checkoutPath,
): Promise<ProjectMapStructuralFingerprintEntry[]> {
  const entries: ProjectMapStructuralFingerprintEntry[] = [];
  const children = await readdir(currentPath, { withFileTypes: true });

  for (const child of children) {
    if (EXCLUDED_DIRECTORY_NAMES.has(child.name.toLowerCase()) || isSensitiveFileName(child.name)) {
      continue;
    }

    const childPath = join(currentPath, child.name);

    if (child.isDirectory()) {
      entries.push(...(await collectEntries(checkoutPath, childPath)));
      continue;
    }

    if (!child.isFile()) {
      continue;
    }

    const content = await readFile(childPath);
    const relativePath = relative(checkoutPath, childPath).split(sep).join("/");
    const fileStat = await stat(childPath);

    entries.push({
      path: relativePath,
      size: fileStat.size,
      sha256: createHash("sha256").update(content).digest("hex"),
    });
  }

  return entries;
}

async function readCanonicalIdentityFromMap(mapJsonPath: string): Promise<CanonicalIdentity | null> {
  try {
    return readCanonicalIdentity(JSON.parse(await readFile(mapJsonPath, "utf8")));
  } catch {
    return null;
  }
}

export async function readProjectMapStructuralFingerprint(
  project: ProjectLike | null | undefined,
): Promise<ProjectMapStructuralFingerprintReadResult> {
  const storageRoot = resolveProjectMapStorageRoot(project);
  const artifactPath =
    storageRoot.status === "available"
      ? join(storageRoot.projectMapRootPath, STRUCTURAL_FINGERPRINT_FILE_NAME)
      : "";

  if (storageRoot.status === "unavailable") {
    return { status: "unavailable", reason: "baseline-unavailable", artifactPath };
  }

  try {
    const artifact = JSON.parse(await readFile(artifactPath, "utf8"));

    return isFingerprintArtifact(artifact)
      ? { status: "present", artifactPath, artifact }
      : { status: "invalid", reason: "baseline-invalid", artifactPath };
  } catch {
    return { status: "unavailable", reason: "baseline-unavailable", artifactPath };
  }
}

export async function scanProjectMapStructuralFingerprint(
  project: ProjectLike | null | undefined,
): Promise<ProjectMapStructuralFingerprintScanResult> {
  if (!project?.workingDirectory?.trim() || !project.repositoryUrl?.trim()) {
    return { status: "invalid", reason: "project-identity-mismatch" };
  }

  const storageRoot = resolveProjectMapStorageRoot(project);

  if (storageRoot.status === "unavailable") {
    return { status: "unavailable", reason: "source-checkout-unavailable" };
  }

  const canonicalIdentity = await readCanonicalIdentityFromMap(
    join(storageRoot.projectMapRootPath, "map.json"),
  );
  const checkoutPath = buildRepoCheckoutDirectory(project.workingDirectory);

  if (
    !canonicalIdentity ||
    canonicalIdentity.projectId !== project.id ||
    canonicalIdentity.projectName !== project.name ||
    canonicalIdentity.repositoryUrl !== project.repositoryUrl.trim() ||
    canonicalIdentity.workingDirectory !== project.workingDirectory.trim() ||
    normalizeWindowsPath(canonicalIdentity.projectCheckoutPath ?? "") !==
      normalizeWindowsPath(checkoutPath)
  ) {
    return { status: "invalid", reason: "project-identity-mismatch" };
  }

  try {
    await access(checkoutPath);
    const entries = await collectEntries(checkoutPath);

    return {
      status: "available",
      artifact: buildProjectMapStructuralFingerprintArtifact({
        project,
        checkoutPath,
        entries,
      }),
    };
  } catch {
    return { status: "unavailable", reason: "scan-unavailable" };
  }
}

export async function generateProjectMapStructuralFingerprint(
  project: ProjectLike | null | undefined,
): Promise<ProjectMapStructuralFingerprintResult> {
  const storageRoot = resolveProjectMapStorageRoot(project);

  if (storageRoot.status === "unavailable") {
    return { status: "unavailable", reason: "metadata-storage-unavailable" };
  }

  const artifactPath = join(
    storageRoot.projectMapRootPath,
    STRUCTURAL_FINGERPRINT_FILE_NAME,
  );

  if (!project?.workingDirectory?.trim() || !project.repositoryUrl?.trim()) {
    return { status: "invalid", reason: "project-identity-mismatch", artifactPath };
  }

  const canonicalIdentity = await readCanonicalIdentityFromMap(
    join(storageRoot.projectMapRootPath, "map.json"),
  );
  const expectedCheckoutPath = buildRepoCheckoutDirectory(project.workingDirectory);

  if (
    !canonicalIdentity ||
    canonicalIdentity.projectId !== project.id ||
    canonicalIdentity.projectName !== project.name ||
    canonicalIdentity.repositoryUrl !== project.repositoryUrl.trim() ||
    canonicalIdentity.workingDirectory !== project.workingDirectory.trim() ||
    normalizeWindowsPath(canonicalIdentity.projectCheckoutPath ?? "") !==
      normalizeWindowsPath(expectedCheckoutPath)
  ) {
    return { status: "invalid", reason: "project-identity-mismatch", artifactPath };
  }

  try {
    await access(expectedCheckoutPath);
  } catch {
    return { status: "unavailable", reason: "source-checkout-unavailable", artifactPath };
  }

  let entries: ProjectMapStructuralFingerprintEntry[];

  try {
    entries = await collectEntries(expectedCheckoutPath);
  } catch {
    return { status: "unavailable", reason: "baseline-scan-unavailable", artifactPath };
  }

  const artifact = buildProjectMapStructuralFingerprintArtifact({
    project,
    checkoutPath: expectedCheckoutPath,
    entries,
  });
  const temporaryPath = `${artifactPath}.${process.pid}.tmp`;

  try {
    await mkdir(storageRoot.projectMapRootPath, { recursive: true });
    await writeFile(temporaryPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
    await rename(temporaryPath, artifactPath);
  } catch {
    return { status: "unavailable", reason: "baseline-write-unavailable", artifactPath };
  }

  return { status: "generated", artifactPath, artifact };
}
