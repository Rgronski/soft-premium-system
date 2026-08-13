export type ProjectFilesystemStatus =
  | "manifest-present"
  | "manifest-missing"
  | "unknown";

export type Project = {
  id: string;
  name: string;
  repositoryUrl?: string;
  workingDirectory?: string;
  projectBrainStatus?: "available" | "pending" | "failed";
  projectFilesystemStatus?: ProjectFilesystemStatus;
  createdAt: string;
};
