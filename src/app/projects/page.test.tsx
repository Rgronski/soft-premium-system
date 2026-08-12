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

describe("ProjectsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    pushMock.mockReset();
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          id: "project-uuid",
          name: "Alpha",
          repositoryUrl: "https://github.com/example/project",
          createdAt: "2026-08-03T20:00:00.000Z",
        }),
        {
          status: 201,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );
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

  test("creates a project through the server boundary and stores the same id locally", async () => {
    render(<ProjectsPage />);

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
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/projects/project-uuid", {
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
      }),
    ]);

    expect(pushMock).toHaveBeenCalledWith("/projects/project-uuid");
  });
});
