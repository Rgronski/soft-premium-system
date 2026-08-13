// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const pushMock = vi.fn();
const fetchMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

import ProjectsPage from "./page";

function createJsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });
}

describe("ProjectsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    pushMock.mockReset();
    fetchMock.mockReset();
    fetchMock.mockImplementation(async (input, init) => {
      const requestUrl = String(input);
      const requestMethod = init?.method ?? "GET";

      if (requestUrl === "/api/projects" && requestMethod === "GET") {
        return createJsonResponse(
          {
            projects: [
              {
                id: "filesystem-project",
                name: "Filesystem Project",
                workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
                projectFilesystemStatus: "manifest-present",
                createdAt: "2026-08-03T20:00:00.000Z",
              },
            ],
          },
          200,
        );
      }

      if (
        requestUrl === "/api/projects/project-uuid" &&
        requestMethod === "POST"
      ) {
        return createJsonResponse(
          {
            id: "project-uuid",
            name: "Alpha",
            repositoryUrl: "https://github.com/example/project",
            workingDirectory: "C:\\SPS_OS_WORK\\alpha",
            projectFilesystemStatus: "manifest-present",
            createdAt: "2026-08-03T20:00:00.000Z",
          },
          201,
        );
      }

      return createJsonResponse({}, 404);
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "project-uuid"),
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test("shows filesystem-discovered projects and keeps them separate from local browser state", async () => {
    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    expect(screen.getByText("Projekty wykryte na dysku")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Otwórz" })).toBeTruthy();
    expect(localStorage.getItem("soft-premium-system.projects")).toBeNull();
  });

  test("opens a filesystem-discovered project by seeding local browser state first", async () => {
    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Otwórz" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/projects/filesystem-project");
    });

    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      expect.objectContaining({
        id: "filesystem-project",
        name: "Filesystem Project",
        workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
        projectFilesystemStatus: "manifest-present",
      }),
    ]);
  });

  test("attaches a filesystem-discovered project into local browser state", async () => {
    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Przypnij" }));

    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      expect.objectContaining({
        id: "filesystem-project",
        name: "Filesystem Project",
        workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
        projectFilesystemStatus: "manifest-present",
      }),
    ]);
  });

  test("shows already attached discovered projects as pinned locally and disables attach", async () => {
    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "filesystem-project",
          name: "Filesystem Project",
          workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
          projectFilesystemStatus: "manifest-present",
          createdAt: "2026-08-01T10:00:00.000Z",
        },
      ]),
    );

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    expect(screen.getByText("Przypięty lokalnie")).toBeTruthy();
    expect(screen.getByText("Z C:\\SPS_OS_WORK")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Przypnij" }).disabled).toBe(true);
    expect(screen.getByRole("button", { name: "Otwórz" })).toBeTruthy();
  });

  test("keeps attached status visible after revisiting the projects list", async () => {
    const firstRender = render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Przypnij" }));

    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      expect.objectContaining({
        id: "filesystem-project",
        name: "Filesystem Project",
        workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
        projectFilesystemStatus: "manifest-present",
      }),
    ]);

    firstRender.unmount();

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    expect(screen.getByText("Przypięty lokalnie")).toBeTruthy();
    expect(screen.getByText("Z C:\\SPS_OS_WORK")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Przypnij" }).disabled).toBe(true);
    expect(screen.getByRole("button", { name: "Otwórz" })).toBeTruthy();
  });

  test("creates a project through the server boundary and stores the same id locally", async () => {
    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("Mój pierwszy projekt"), {
      target: {
        value: "Alpha",
      },
    });
    fireEvent.change(screen.getByPlaceholderText("https://github.com/example/project"), {
      target: {
        value: "  https://github.com/example/project  ",
      },
    });
    await waitFor(() => {
      expect(screen.getByDisplayValue("C:\\SPS_OS_WORK\\alpha")).toBeTruthy();
    });
    fireEvent.click(screen.getByRole("button", { name: "Utwórz projekt" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/projects");
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/projects/project-uuid", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Alpha",
        repositoryUrl: "https://github.com/example/project",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
      }),
    });

    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      expect.objectContaining({
        id: "project-uuid",
        name: "Alpha",
        repositoryUrl: "https://github.com/example/project",
        workingDirectory: "C:\\SPS_OS_WORK\\alpha",
        projectFilesystemStatus: "manifest-present",
      }),
    ]);

    expect(pushMock).toHaveBeenCalledWith("/projects/project-uuid");
  });
});
