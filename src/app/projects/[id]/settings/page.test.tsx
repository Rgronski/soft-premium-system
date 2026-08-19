// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createProject } from "@/lib/project/project";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

import ProjectSettingsPage from "./page";

describe("ProjectSettingsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    useParamsMock.mockReturnValue({ id: "project-1" });
    createProject(
      "Beauty Client PRO",
      "project-1",
      undefined,
      "C:\\SPS_OS_WORK\\beauty-client-pro",
      "manifest-present",
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test("shows the manifest-only binding guidance for a real project", () => {
    render(<ProjectSettingsPage />);

    expect(
      screen.getByText(
        "Projekt ma tylko manifest SPS. Możesz zostawić go jako manifest, podpiąć istniejący katalog repo albo dodać adres GitHub.",
      ),
    ).toBeTruthy();
    expect(screen.getAllByText("Adres GitHub: nie podano")).toHaveLength(2);
    expect(screen.getAllByText("Lokalne repo Git: niedostępne")).toHaveLength(1);
    expect(
      screen.getByText(
        "Następny krok: podaj adres GitHub lub wskaż istniejący katalog repo.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Pozostaw jako manifest-only")).toBeTruthy();
    expect(screen.queryByText("Decyzja pracy z gałęzią")).toBeNull();
  });

  test("stores a GitHub URL as metadata without creating a duplicate project", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText("Podaj adres GitHub"), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz adres GitHub" }));

    await waitFor(() => {
      expect(screen.getAllByText("Adres GitHub: podany")).toHaveLength(2);
    });

    expect(
      screen.getByText(
        "Kontekst repozytorium niedostępny: adres GitHub jest zapisany, ale lokalne repo Git nadal nie jest dostępne.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Decyzja pracy z gałęzią")).toBeTruthy();
    expect(screen.getByText("Wybrany tryb pracy: nie wybrano")).toBeTruthy();

    const savedProjects = JSON.parse(
      localStorage.getItem("soft-premium-system.projects") ?? "[]",
    ) as Array<{ id: string; repositoryUrl?: string }>;

    expect(savedProjects).toHaveLength(1);
    expect(savedProjects[0].id).toBe("project-1");
    expect(savedProjects[0].repositoryUrl).toBe(
      "https://github.com/example/beauty-client-pro",
    );
  });

  test("stores the branch work mode decision in browser state after the GitHub URL is present", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText("Podaj adres GitHub"), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz adres GitHub" }));

    await waitFor(() => {
      expect(screen.getByText("Decyzja pracy z gałęzią")).toBeTruthy();
    });

    fireEvent.click(screen.getAllByRole("radio")[1]);

    expect(screen.getByText("Wybrany tryb pracy: Utwórz i użyj gałęzi roboczej")).toBeTruthy();
    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.branch-work-mode",
      ),
    ).toBe("working-branch");
    expect(
      screen.getByText(
        "Wybrano użycie gałęzi roboczej jako decyzję Product Ownera.",
      ),
    ).toBeTruthy();
  });
});
