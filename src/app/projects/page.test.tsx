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

    fireEvent.change(screen.getByPlaceholderText("My First Project"), {
      target: {
        value: "Alpha",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create Project" }));

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
      }),
    });

    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      expect.objectContaining({
        id: "project-uuid",
        name: "Alpha",
      }),
    ]);

    expect(pushMock).toHaveBeenCalledWith("/projects/project-uuid");
  });
});
