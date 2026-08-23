import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@neondatabase/serverless", () => ({ neon: vi.fn() }));

const markerFileName = "marker.txt";

async function loadServerModule() {
  vi.resetModules();
  return import("./server");
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function removePath(path: string): Promise<void> {
  await rm(path, { recursive: true, force: true });
}

async function createFixtureProject() {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "sps-delete-execution-"));
  const workingDirectory = join(fixtureRoot, "workspace");
  const metadataRoot = join(fixtureRoot, "metadata-root");
  const projectName = "Temp Delete Fixture";
  const projectId = `project-${fixtureRoot
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 8)
    .toLowerCase()}`;

  await mkdir(join(workingDirectory, "repo"), { recursive: true });
  await writeFile(
    join(workingDirectory, markerFileName),
    "workspace-marker",
    "utf8",
  );
  await writeFile(
    join(workingDirectory, "repo", markerFileName),
    "checkout-marker",
    "utf8",
  );

  const server = await loadServerModule();
  const project = await server.createServerProject({
    id: projectId,
    name: projectName,
    workingDirectory,
  });

  await mkdir(metadataRoot, { recursive: true });
  await writeFile(
    join(metadataRoot, markerFileName),
    "metadata-marker",
    "utf8",
  );

  return {
    fixtureRoot,
    workingDirectory,
    metadataRoot,
    checkoutPath: join(workingDirectory, "repo"),
    project,
    server,
  };
}

describe("executeProjectDiskDelete", () => {
  afterEach(async () => {
    vi.restoreAllMocks();
  });

  it("blocks when the typed confirmation does not exactly match the project name", async () => {
    const { project, workingDirectory, metadataRoot, checkoutPath, fixtureRoot, server } =
      await createFixtureProject();

    const result = await server.executeProjectDiskDelete({
      projectId: project.id,
      projectName: project.name,
      typedConfirmation: `${project.name} `,
      deleteMetadataRoot: true,
      deleteWorkingDirectory: true,
      explicitProductOwnerApproval: true,
      dryRun: false,
      pathOverrides: {
        projectMetadataRootPath: metadataRoot,
        projectWorkingDirectoryPath: workingDirectory,
        projectCheckoutPath: checkoutPath,
      },
    });

    expect(result.status).toBe("blocked");
    expect(result.blockedReasons).toContain(
      `typedConfirmation musi być dokładnie równe nazwie projektu: ${project.name}.`,
    );
    expect(await fileExists(workingDirectory)).toBe(true);
    expect(await fileExists(checkoutPath)).toBe(true);
    expect(await fileExists(metadataRoot)).toBe(true);
    await removePath(fixtureRoot);
    await removePath(metadataRoot);
  });

  it("blocks destructive execution when Product Owner approval is missing", async () => {
    const { project, workingDirectory, metadataRoot, checkoutPath, fixtureRoot, server } =
      await createFixtureProject();

    const result = await server.executeProjectDiskDelete({
      projectId: project.id,
      projectName: project.name,
      typedConfirmation: project.name,
      deleteMetadataRoot: true,
      deleteWorkingDirectory: true,
      explicitProductOwnerApproval: false,
      dryRun: false,
      pathOverrides: {
        projectMetadataRootPath: metadataRoot,
        projectWorkingDirectoryPath: workingDirectory,
        projectCheckoutPath: checkoutPath,
      },
    });

    expect(result.status).toBe("blocked");
    expect(result.blockedReasons).toContain(
      "explicitProductOwnerApproval musi mieć wartość true przed wykonaniem destrukcyjnego delete.",
    );
    expect(await fileExists(workingDirectory)).toBe(true);
    expect(await fileExists(checkoutPath)).toBe(true);
    expect(await fileExists(metadataRoot)).toBe(true);
    await removePath(fixtureRoot);
    await removePath(metadataRoot);
  });

  it("returns a dry-run summary without deleting fixture paths", async () => {
    const { project, workingDirectory, metadataRoot, checkoutPath, fixtureRoot, server } =
      await createFixtureProject();

    const result = await server.executeProjectDiskDelete({
      projectId: project.id,
      projectName: project.name,
      typedConfirmation: project.name,
      deleteMetadataRoot: true,
      deleteWorkingDirectory: true,
      explicitProductOwnerApproval: true,
      pathOverrides: {
        projectMetadataRootPath: metadataRoot,
        projectWorkingDirectoryPath: workingDirectory,
        projectCheckoutPath: checkoutPath,
      },
    });

    expect(result.status).toBe("dry-run");
    expect(result.requestedActions).toEqual([
      "metadata-root",
      "working-directory-repo-checkout",
    ]);
    expect(result.deletedPaths).toEqual([]);
    expect(await fileExists(workingDirectory)).toBe(true);
    expect(await fileExists(checkoutPath)).toBe(true);
    expect(await fileExists(metadataRoot)).toBe(true);
    await removePath(fixtureRoot);
    await removePath(metadataRoot);
  });

  it("deletes only the requested fixture paths when execution is confirmed", async () => {
    const { project, workingDirectory, metadataRoot, checkoutPath, fixtureRoot, server } =
      await createFixtureProject();

    const result = await server.executeProjectDiskDelete({
      projectId: project.id,
      projectName: project.name,
      typedConfirmation: project.name,
      deleteMetadataRoot: true,
      deleteWorkingDirectory: true,
      explicitProductOwnerApproval: true,
      dryRun: false,
      pathOverrides: {
        projectMetadataRootPath: metadataRoot,
        projectWorkingDirectoryPath: workingDirectory,
        projectCheckoutPath: checkoutPath,
      },
    });

    expect(result.status).toBe("deleted");
    expect(result.deletedPaths).toEqual([
      metadataRoot,
      checkoutPath,
      workingDirectory,
    ]);
    expect(await fileExists(workingDirectory)).toBe(false);
    expect(await fileExists(metadataRoot)).toBe(false);
    await removePath(fixtureRoot);
    await removePath(metadataRoot);
  });

  it("allows rediscovery after deleting and recreating the fixture project", async () => {
    const { project, workingDirectory, metadataRoot, fixtureRoot, server } =
      await createFixtureProject();

    const deleteResult = await server.executeProjectDiskDelete({
      projectId: project.id,
      projectName: project.name,
      typedConfirmation: project.name,
      deleteMetadataRoot: true,
      deleteWorkingDirectory: true,
      explicitProductOwnerApproval: true,
      dryRun: false,
      pathOverrides: {
        projectMetadataRootPath: metadataRoot,
        projectWorkingDirectoryPath: workingDirectory,
        projectCheckoutPath: join(workingDirectory, "repo"),
      },
    });

    expect(deleteResult.status).toBe("deleted");
    expect(await fileExists(workingDirectory)).toBe(false);
    expect(await fileExists(metadataRoot)).toBe(false);

    const reopenedProject = await server.createServerProject({
      id: project.id,
      name: project.name,
      workingDirectory,
    });

    expect(reopenedProject.id).toBe(project.id);
    expect(reopenedProject.name).toBe(project.name);
    expect(await fileExists(workingDirectory)).toBe(true);
    expect(await fileExists(join(workingDirectory, "sps-project.json"))).toBe(true);
    expect(await fileExists(join(workingDirectory, "README.md"))).toBe(true);

    const rediscoveredProjects = await server.discoverServerProjectsFromWorkingRoot(
      fixtureRoot,
    );

    expect(rediscoveredProjects).toEqual([
      expect.objectContaining({
        id: project.id,
        name: project.name,
        workingDirectory,
        projectFilesystemStatus: "manifest-present",
      }),
    ]);

    await removePath(fixtureRoot);
    await removePath(metadataRoot);
  });
});
