import type { Project } from "./types";

export type ProjectBranchWorkMode = "main" | "working-branch";

const PROJECT_BRANCH_WORK_MODE_STORAGE_SUFFIX = "branch-work-mode";
const PROJECT_WORKING_BRANCH_NAME_STORAGE_SUFFIX = "working-branch-name";
const PROJECT_SOURCE_STATUS_STORAGE_SUFFIX = "source-status";

export type ProjectSourceWorkingTreeState = "clean" | "dirty" | "unknown";

export type ProjectSourceReconciliationStatus = {
  sourceStatus: "git-repo";
  repoCheckoutPath: string;
  remoteUrl: string;
  activeBranch: string;
  workingTreeState: ProjectSourceWorkingTreeState;
};

export function normalizeWindowsPath(value: string): string {
  return value.trim().replace(/[\\/]+$/u, "");
}

export function buildWorkingBranchName(projectName: string): string {
  const slug = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `work/${slug || "project"}`;
}

export function buildRepoCheckoutDirectory(
  workspaceDirectory: string,
): string {
  const normalizedWorkspaceDirectory = normalizeWindowsPath(workspaceDirectory);

  return normalizedWorkspaceDirectory.endsWith("\\repo")
    ? normalizedWorkspaceDirectory
    : `${normalizedWorkspaceDirectory}\\repo`;
}

export function isManifestOnlyWorkspaceDirectory(
  project: Project,
  candidateDirectory: string,
): boolean {
  if (project.projectFilesystemStatus !== "manifest-present") {
    return false;
  }

  const normalizedCandidateDirectory = normalizeWindowsPath(candidateDirectory);
  const normalizedWorkspaceDirectory = normalizeWindowsPath(
    project.workingDirectory ?? "",
  );

  return Boolean(
    normalizedCandidateDirectory &&
      normalizedWorkspaceDirectory &&
      normalizedCandidateDirectory === normalizedWorkspaceDirectory,
  );
}

export function resolveRepoCheckoutDirectory(
  project: Project,
  candidateDirectory: string,
): string {
  const trimmedCandidateDirectory = candidateDirectory.trim();

  if (!trimmedCandidateDirectory) {
    return project.projectFilesystemStatus === "manifest-present" &&
      project.workingDirectory?.trim()
      ? buildRepoCheckoutDirectory(project.workingDirectory)
      : "";
  }

  if (isManifestOnlyWorkspaceDirectory(project, trimmedCandidateDirectory)) {
    return buildRepoCheckoutDirectory(project.workingDirectory ?? "");
  }

  return trimmedCandidateDirectory;
}

export function buildRepoCheckoutDirectoryHint(project: Project): string | null {
  if (
    project.projectFilesystemStatus !== "manifest-present" ||
    !project.workingDirectory?.trim()
  ) {
    return null;
  }

  return buildRepoCheckoutDirectory(project.workingDirectory);
}

export function getProjectBranchWorkModeStorageKey(
  projectId: string,
): string {
  return `soft-premium-system.projects.${projectId}.${PROJECT_BRANCH_WORK_MODE_STORAGE_SUFFIX}`;
}

export function readProjectBranchWorkMode(
  projectId: string,
): ProjectBranchWorkMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = localStorage.getItem(
    getProjectBranchWorkModeStorageKey(projectId),
  );

  return storedValue === "main" || storedValue === "working-branch"
    ? storedValue
    : null;
}

export function saveProjectBranchWorkMode(
  projectId: string,
  branchWorkMode: ProjectBranchWorkMode,
): void {
  localStorage.setItem(
    getProjectBranchWorkModeStorageKey(projectId),
    branchWorkMode,
  );
}

export function getProjectWorkingBranchNameStorageKey(
  projectId: string,
): string {
  return `soft-premium-system.projects.${projectId}.${PROJECT_WORKING_BRANCH_NAME_STORAGE_SUFFIX}`;
}

export function readProjectWorkingBranchName(
  projectId: string,
): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = localStorage.getItem(
    getProjectWorkingBranchNameStorageKey(projectId),
  );

  return storedValue?.trim() || null;
}

export function saveProjectWorkingBranchName(
  projectId: string,
  workingBranchName: string,
): void {
  localStorage.setItem(
    getProjectWorkingBranchNameStorageKey(projectId),
    workingBranchName.trim(),
  );
}

export function getProjectSourceStatusStorageKey(
  projectId: string,
): string {
  return `soft-premium-system.projects.${projectId}.${PROJECT_SOURCE_STATUS_STORAGE_SUFFIX}`;
}

export function readProjectSourceStatus(
  projectId: string,
): ProjectSourceReconciliationStatus | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = localStorage.getItem(
    getProjectSourceStatusStorageKey(projectId),
  );

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(
      storedValue,
    ) as Partial<ProjectSourceReconciliationStatus>;

    if (
      parsedValue?.sourceStatus === "git-repo" &&
      typeof parsedValue.repoCheckoutPath === "string" &&
      typeof parsedValue.remoteUrl === "string" &&
      typeof parsedValue.activeBranch === "string" &&
      (parsedValue.workingTreeState === "clean" ||
        parsedValue.workingTreeState === "dirty" ||
        parsedValue.workingTreeState === "unknown")
    ) {
      return {
        sourceStatus: "git-repo",
        repoCheckoutPath: parsedValue.repoCheckoutPath,
        remoteUrl: parsedValue.remoteUrl,
        activeBranch: parsedValue.activeBranch,
        workingTreeState: parsedValue.workingTreeState,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function saveProjectSourceStatus(
  projectId: string,
  sourceStatus: ProjectSourceReconciliationStatus,
): void {
  localStorage.setItem(
    getProjectSourceStatusStorageKey(projectId),
    JSON.stringify(sourceStatus),
  );
}

export function clearProjectSourceStatus(projectId: string): void {
  localStorage.removeItem(getProjectSourceStatusStorageKey(projectId));
}
