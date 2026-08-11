export type Project = {
  id: string;
  name: string;
  repositoryUrl?: string;
  workingDirectory?: string;
  projectBrainStatus?: "available" | "pending" | "failed";
  createdAt: string;
};
