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
    const firstRender = render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    expect(screen.getByText("Projekty wykryte na dysku")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Otw\u00F3rz" })).toBeTruthy();
    expect(localStorage.getItem("soft-premium-system.projects")).toBeNull();
  });

  test("opens a filesystem-discovered project by seeding local browser state first", async () => {
    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Otw\u00F3rz" }));

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

    const firstRender = render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    expect(screen.getByText("Przypi\u0119ty lokalnie")).toBeTruthy();
    expect(screen.getByText("Z C:\\SPS_OS_WORK")).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Przypnij" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(screen.getByRole("button", { name: "Otw\u00F3rz" })).toBeTruthy();
  });

  test("shows a source conflict warning when the attached local project differs from discovery", async () => {
    fetchMock.mockImplementationOnce(async () =>
      createJsonResponse(
        {
          projects: [
            {
              id: "filesystem-project",
              name: "Filesystem Project",
              workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
              repositoryUrl: "https://github.com/example/discovered-project",
              projectFilesystemStatus: "manifest-present",
              createdAt: "2026-08-03T20:00:00.000Z",
            },
          ],
        },
        200,
      ),
    );

    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "filesystem-project",
          name: "Filesystem Project - Local",
          workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project-local",
          repositoryUrl: "https://github.com/example/local-project",
          projectFilesystemStatus: "manifest-present",
          createdAt: "2026-08-01T10:00:00.000Z",
        },
      ]),
    );

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    expect(screen.getByText("Przypi\u0119ty lokalnie")).toBeTruthy();
    expect(screen.getByText("Konflikt \u017A\u00F3r\u00F3d\u0142a")).toBeTruthy();
    expect(screen.getByText("Z C:\\SPS_OS_WORK")).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Przypnij" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(screen.getByRole("button", { name: "Otw\u00F3rz" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Zobacz r\u00F3\u017Cnice" }));

    expect(screen.getByRole("button", { name: "Ukryj r\u00F3\u017Cnice" })).toBeTruthy();
    expect(screen.getByText("R\u00F3\u017Cnice")).toBeTruthy();
    expect(screen.getByText("Nazwa")).toBeTruthy();
    expect(
      screen.getByText("Lokalny wpis: Filesystem Project - Local"),
    ).toBeTruthy();
    expect(screen.getByText("Wykryty wpis: Filesystem Project")).toBeTruthy();
    expect(screen.getAllByText("Katalog roboczy")).toHaveLength(2);
    expect(
      screen.getByText(
        "Lokalny wpis: C:\\SPS_OS_WORK\\filesystem-project-local",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText("Wykryty wpis: C:\\SPS_OS_WORK\\filesystem-project"),
    ).toBeTruthy();
    expect(screen.getByText("Repozytorium")).toBeTruthy();
    expect(
      screen.getByText(
        "Lokalny wpis: https://github.com/example/local-project",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Wykryty wpis: https://github.com/example/discovered-project",
      ),
    ).toBeTruthy();
  });

  test("keeps the local version without mutating browser state when resolving a conflict", async () => {
    fetchMock.mockImplementationOnce(async () =>
      createJsonResponse(
        {
          projects: [
            {
              id: "filesystem-project",
              name: "Filesystem Project",
              workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
              repositoryUrl: "https://github.com/example/discovered-project",
              projectFilesystemStatus: "manifest-present",
              createdAt: "2026-08-03T20:00:00.000Z",
            },
          ],
        },
        200,
      ),
    );

    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "filesystem-project",
          name: "Filesystem Project - Local",
          workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project-local",
          repositoryUrl: "https://github.com/example/local-project",
          projectFilesystemStatus: "manifest-present",
          createdAt: "2026-08-01T10:00:00.000Z",
        },
      ]),
    );

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Zobacz r\u00F3\u017Cnice" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Zachowaj lokaln\u0105 wersj\u0119" }),
    );

    expect(screen.queryByRole("button", { name: "Ukryj r\u00F3\u017Cnice" })).toBeNull();
    expect(
      screen.getByText("Zachowano lokaln\u0105 wersj\u0119 projektu"),
    ).toBeTruthy();
    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      expect.objectContaining({
        id: "filesystem-project",
        name: "Filesystem Project - Local",
        workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project-local",
        repositoryUrl: "https://github.com/example/local-project",
        projectFilesystemStatus: "manifest-present",
      }),
    ]);

    cleanup();

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    expect(screen.queryByText("Konflikt \u017A\u00F3r\u00F3d\u0142a")).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Zobacz r\u00F3\u017Cnice" }),
    ).toBeNull();
  });
  test("accepts the discovered version into local browser state when resolving a conflict", async () => {
    fetchMock.mockImplementationOnce(async () =>
      createJsonResponse(
        {
          projects: [
            {
              id: "filesystem-project",
              name: "Filesystem Project",
              workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
              repositoryUrl: "https://github.com/example/discovered-project",
              projectFilesystemStatus: "manifest-present",
              createdAt: "2026-08-03T20:00:00.000Z",
            },
          ],
        },
        200,
      ),
    );

    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "filesystem-project",
          name: "Filesystem Project - Local",
          workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project-local",
          repositoryUrl: "https://github.com/example/local-project",
          projectFilesystemStatus: "manifest-present",
          createdAt: "2026-08-01T10:00:00.000Z",
        },
      ]),
    );

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Zobacz r\u00F3\u017Cnice" }));
    fireEvent.click(screen.getByRole("button", { name: "Zaakceptuj wykryty projekt" }));

    await waitFor(() => {
      expect(screen.queryByText("Konflikt źródła")).toBeNull();
    });
    expect(
      screen.getByText("Zaakceptowano dane z wykrytego projektu"),
    ).toBeTruthy();

    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      expect.objectContaining({
        id: "filesystem-project",
        name: "Filesystem Project",
        workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project",
        repositoryUrl: "https://github.com/example/discovered-project",
        projectFilesystemStatus: "manifest-present",
      }),
    ]);

    cleanup();

    fetchMock.mockImplementationOnce(async () =>
      createJsonResponse(
        {
          projects: [
            {
              id: "filesystem-project",
              name: "Filesystem Project v2",
              workingDirectory: "C:\\SPS_OS_WORK\\filesystem-project-v2",
              repositoryUrl: "https://github.com/example/discovered-project-v2",
              projectFilesystemStatus: "manifest-present",
              createdAt: "2026-08-04T20:00:00.000Z",
            },
          ],
        },
        200,
      ),
    );

    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project v2")).toBeTruthy();
    });

    expect(screen.queryByText("Konflikt \u017A\u00F3r\u00F3d\u0142a")).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Zobacz r\u00F3\u017Cnice" }),
    ).toBeNull();
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

    expect(screen.getByText("Przypi\u0119ty lokalnie")).toBeTruthy();
    expect(screen.getByText("Z C:\\SPS_OS_WORK")).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Przypnij" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(screen.getByRole("button", { name: "Otw\u00F3rz" })).toBeTruthy();
  });

  test("creates a project through the server boundary and stores the same id locally", async () => {
    render(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText("Filesystem Project")).toBeTruthy();
    });

    fireEvent.change(screen.getByPlaceholderText("M\u00F3j pierwszy projekt"), {
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
    fireEvent.click(screen.getByRole("button", { name: "Utw\u00F3rz projekt" }));

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
