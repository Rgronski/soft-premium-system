// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { APP_VERSION } from "@/lib/app-version";

const deleteProjectFromServerMock = vi.fn();
let confirmSpy: ReturnType<typeof vi.spyOn>;

vi.mock("@/lib/project/browser-server", () => ({
  deleteProjectFromServer: (projectId: string) =>
    deleteProjectFromServerMock(projectId),
}));

import Home from "./page";

describe("Home", () => {
  beforeEach(() => {
    localStorage.clear();
    deleteProjectFromServerMock.mockReset();
    deleteProjectFromServerMock.mockResolvedValue(undefined);
    confirmSpy = vi.spyOn(window, "confirm");
    confirmSpy.mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test("shows recent projects and removes a confirmed project from local storage", async () => {
    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-08-03T10:00:00.000Z",
        },
        {
          id: "project-2",
          name: "Beta",
          createdAt: "2026-08-03T11:00:00.000Z",
        },
      ]),
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeTruthy();
    });
    expect(screen.getByText("Beta")).toBeTruthy();

    fireEvent.click(screen.getAllByRole("button", { name: "Usuń" })[0]!);

    await waitFor(() => {
      expect(deleteProjectFromServerMock).toHaveBeenCalledWith("project-1");
    });

    expect(screen.queryByText("Alpha")).toBeNull();
    expect(screen.getByText("Beta")).toBeTruthy();
    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      {
        id: "project-2",
        name: "Beta",
        createdAt: "2026-08-03T11:00:00.000Z",
      },
    ]);
  });

  test("continue working opens the latest project instead of the empty workspace route", async () => {
    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-08-03T10:00:00.000Z",
        },
        {
          id: "project-2",
          name: "Beta",
          createdAt: "2026-08-03T11:00:00.000Z",
        },
      ]),
    );

    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "Kontynuuj" }).getAttribute("href"),
      ).toBe("/projects/project-2");
    });
  });

  test("empty state CTA points to project creation with a matching label", () => {
    render(<Home />);

    expect(screen.getByText("Utwórz pierwszy projekt")).toBeTruthy();
    expect(
      screen.getByText("Utwórz pierwszy projekt, aby rozpocząć główny przepływ."),
    ).toBeTruthy();
    expect(screen.getByText(`Przestrzeń robocza v${APP_VERSION}`)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Utwórz projekt" }).getAttribute("href"),
    ).toBe("/projects");
  });

  test("keeps the project when deletion is cancelled", async () => {
    confirmSpy.mockReturnValue(false);
    localStorage.setItem(
      "soft-premium-system.projects",
      JSON.stringify([
        {
          id: "project-1",
          name: "Alpha",
          createdAt: "2026-08-03T10:00:00.000Z",
        },
      ]),
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: "Usuń" }));

    expect(deleteProjectFromServerMock).not.toHaveBeenCalled();
    expect(screen.getByText("Alpha")).toBeTruthy();
    expect(
      JSON.parse(localStorage.getItem("soft-premium-system.projects") ?? "[]"),
    ).toEqual([
      {
        id: "project-1",
        name: "Alpha",
        createdAt: "2026-08-03T10:00:00.000Z",
      },
    ]);
  });
});
