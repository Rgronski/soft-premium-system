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
      screen.getByText(/Projekt ma tylko manifest SPS/),
    ).toBeTruthy();
    expect(screen.getAllByText(/Adres GitHub: nie podano/)).toHaveLength(2);
    expect(screen.getAllByText(/Lokalne repo Git: niedostępne/)).toHaveLength(1);
    expect(
      screen.getByText(/Następny krok: podaj adres GitHub/),
    ).toBeTruthy();
    expect(screen.getByText(/Pozostaw jako manifest-only/)).toBeTruthy();
    expect(screen.queryByText(/Decyzja pracy z ga/)).toBeNull();
    expect(screen.queryByText(/Gotowość połączenia GitHub/)).toBeNull();
  });

  test("shows a blocked GitHub readiness action state until the repository URL exists", () => {
    render(<ProjectSettingsPage />);

    expect(screen.getByText(/Stan akcji GitHub: blocked/)).toBeTruthy();
    expect(
      screen.getByText(
        /Brakuje wymaganych lokalnych metadanych\. Realne wykonanie Git\/GitHub pozostaje zablokowane\./,
      ),
    ).toBeTruthy();
    expect(
      screen.queryByText(/Bramka potwierdzenia wykonania GitHub/),
    ).toBeNull();
  });

  test("shows the confirmation gate after local metadata is present", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji GitHub: blocked/)).toBeTruthy();
      expect(
        screen.queryByText(/Bramka potwierdzenia wykonania GitHub/),
      ).toBeNull();
    });

    fireEvent.click(screen.getAllByRole("radio")[0]);

    await waitFor(() => {
      expect(
        screen.getByText(/Stan akcji GitHub: requires confirmation/),
      ).toBeTruthy();
    });
    expect(screen.getByText(/Bramka potwierdzenia wykonania GitHub/)).toBeTruthy();
    expect(
      screen.getByText(/Gotowe do potwierdzenia przez Product Ownera/),
    ).toBeTruthy();
    expect(screen.getByText(/To nie jest gotowość do wykonania\./)).toBeTruthy();
    expect(
      screen.getByText(
        /Tryb pracy na `main` jest przygotowany lokalnie, ale realne wykonanie nadal wymaga jawnej zgody Product Ownera i pozostaje zablokowane\./,
      ),
    ).toBeTruthy();

    fireEvent.click(screen.getAllByRole("radio")[1]);

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji GitHub: ready/)).toBeTruthy();
    });
    expect(screen.getByText(/Bramka potwierdzenia wykonania GitHub/)).toBeTruthy();
    expect(
      screen.getByText(/Gotowe do potwierdzenia przez Product Ownera/),
    ).toBeTruthy();
    expect(screen.getByText(/To nie jest gotowość do wykonania\./)).toBeTruthy();
  });

  test("stores a GitHub URL as metadata without creating a duplicate project", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getAllByText(/Adres GitHub: podany/)).toHaveLength(2);
    });

    expect(
      screen.getByText(
        /Kontekst repozytorium niedostępny: adres GitHub jest zapisany/,
      ),
    ).toBeTruthy();
    expect(screen.getByText(/Decyzja pracy z ga/)).toBeTruthy();
    expect(screen.getByText(/Wybrany tryb pracy: nie wybrano/)).toBeTruthy();
    expect(screen.queryByLabelText(/Nazwa ga/i)).toBeNull();
    expect(screen.queryByText(/Podsumowanie konfiguracji/)).toBeNull();

    const savedProjects = JSON.parse(
      localStorage.getItem("soft-premium-system.projects") ?? "[]",
    ) as Array<{ id: string; repositoryUrl?: string }>;

    expect(savedProjects).toHaveLength(1);
    expect(savedProjects[0].id).toBe("project-1");
    expect(savedProjects[0].repositoryUrl).toBe(
      "https://github.com/example/beauty-client-pro",
    );
  });

  test("shows a GitHub connection readiness block after the repository URL is saved", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/Gotowość połączenia GitHub/)).toBeTruthy();
    });

    expect(
      screen.getByText(/GitHub wykryty, ale połączenie nie jest jeszcze gotowe\./),
    ).toBeTruthy();
    expect(
      screen.getByText(/Adres repozytorium GitHub wykryty\./),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Połączenie GitHub nie jest jeszcze potwierdzone ani zweryfikowane\./,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(/Uwierzytelnienie i konfiguracja połączenia pozostają przyszłą pracą\./),
    ).toBeTruthy();
    expect(
      screen.getByText(/Lokalny klon i prawdziwy workflow Git nie są jeszcze skonfigurowane\./),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Przygotowanie gałęzi roboczej już istnieje, ale prawdziwe wykonanie Git jeszcze nie startuje\./,
      ),
    ).toBeTruthy();
  });

  test("shows a local clone readiness block with branch metadata after branch preparation is selected", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/Decyzja pracy z ga/)).toBeTruthy();
    });

    fireEvent.click(screen.getAllByRole("radio")[1]);

    await waitFor(() => {
      expect(
        screen.getByText(/Lokalny klon \/ workspace nie jest jeszcze skonfigurowany ani zweryfikowany/),
      ).toBeTruthy();
    });

    expect(screen.getByText(/GitHub wykryty, ale lokalny klon\/workspace nie jest jeszcze gotowy\./)).toBeTruthy();
    expect(
      screen.getByText(/Lokalny klon \/ workspace nie jest jeszcze skonfigurowany ani zweryfikowany\./),
    ).toBeTruthy();
    expect(
      screen.getByText(/Prawdziwe clone, fetch, checkout i walidacja filesystemu to przysz/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Przygotowana nazwa ga.*roboczej to `work\/beauty-client-pro`, ale nadal jest tylko metadanymi przygotowania\./),
    ).toBeTruthy();
    expect(
      screen.getByText(/W tym kroku nie kopiujemy plik.* i nie klonujemy repozytorium\./),
    ).toBeTruthy();
  });

  test("shows requires confirmation for main and ready for working branch after local metadata is present", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji GitHub: blocked/)).toBeTruthy();
    });

    fireEvent.click(screen.getAllByRole("radio")[0]);

    await waitFor(() => {
      expect(
        screen.getByText(/Stan akcji GitHub: requires confirmation/),
      ).toBeTruthy();
    });
    expect(screen.getByText(/Bramka potwierdzenia wykonania GitHub/)).toBeTruthy();
    expect(
      screen.getByText(/Gotowe do potwierdzenia przez Product Ownera/),
    ).toBeTruthy();
    expect(screen.getByText(/To nie jest gotowość do wykonania\./)).toBeTruthy();
    expect(
      screen.getByText(
        /Tryb pracy na `main` jest przygotowany lokalnie, ale realne wykonanie nadal wymaga jawnej zgody Product Ownera i pozostaje zablokowane\./,
      ),
    ).toBeTruthy();

    fireEvent.click(screen.getAllByRole("radio")[1]);

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji GitHub: ready/)).toBeTruthy();
    });
    expect(
      screen.getByText(
        /Lokalny kontekst gałęzi roboczej jest kompletny i gotowy do potwierdzenia, ale realne wykonanie nadal wymaga jawnej zgody Product Ownera i pozostaje zablokowane\./,
      ),
    ).toBeTruthy();
  });

  test("shows a real readiness checklist that updates from missing branch decision to ready branch metadata", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/realnego wykonania Git/)).toBeTruthy();
    });

    expect(
      screen.getByText(/Decyzja trybu pracy ga/).closest("li")?.textContent,
    ).toContain("brak");
    expect(
      screen.getByText(/^Nazwa gałęzi roboczej$/, { selector: ".text-zinc-300" }).closest("li")
        ?.textContent,
    ).toContain("nie wymagana");
    expect(
      screen.getByText(/Po.*czenie GitHub \/ uwierzytelnienie/).closest("li")?.textContent,
    ).toContain("brak / wymagane");
    expect(
      screen.getByText(/^Lokalny klon \/ workspace$/).closest("li")?.textContent,
    ).toContain("brak / wymagane");
    expect(
      screen.getByText(/^Realne wykonanie Git$/, { selector: ".text-zinc-300" }).closest("li")
        ?.textContent,
    ).toContain("zablokowane do jawnej zgody Product Ownera");

    fireEvent.click(screen.getAllByRole("radio")[1]);

    await waitFor(() => {
      expect(
        screen.getByText(/Decyzja trybu pracy ga/).closest("li")?.textContent,
      ).toContain("gotowa");
    });

    expect(
      screen.getByText(/^Nazwa gałęzi roboczej$/, { selector: ".text-zinc-300" }).closest("li")
        ?.textContent,
    ).toContain("gotowa");
    expect(
      screen.getByText(/Po.*czenie GitHub \/ uwierzytelnienie/).closest("li")?.textContent,
    ).toContain("brak / wymagane");
    expect(
      screen.getByText(/^Lokalny klon \/ workspace$/).closest("li")?.textContent,
    ).toContain("brak / wymagane");
  });

  test("shows a main-mode summary after the Product Owner chooses main", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/Decyzja pracy z ga/)).toBeTruthy();
    });

    fireEvent.click(screen.getAllByRole("radio")[0]);

    await waitFor(() => {
      expect(screen.getByText(/Podsumowanie konfiguracji/)).toBeTruthy();
    });

    expect(
      screen.getByText(/Projekt jest przygotowany do pracy na `main`/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Prawdziwe tworzenie ga.*checkout.*merge i PR/),
    ).toBeTruthy();
    expect(screen.queryByLabelText(/Nazwa ga/i)).toBeNull();
  });

  test("shows a proposed branch name when the working branch mode is selected", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/Decyzja pracy z ga/)).toBeTruthy();
    });

    fireEvent.click(screen.getAllByRole("radio")[1]);

    await waitFor(() => {
      expect(screen.getByText(/Proponowana ga.*robocza/)).toBeTruthy();
    });

    expect(
      (screen.getByLabelText(/Nazwa ga/i) as HTMLInputElement).value,
    ).toBe("work/beauty-client-pro");
    expect(screen.getByText(/Podsumowanie konfiguracji/)).toBeTruthy();
    expect(
      screen.getByText(/Projekt jest przygotowany do pracy na ga.*work\/beauty-client-pro/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Prawdziwe tworzenie ga.*checkout.*merge i PR/),
    ).toBeTruthy();
  });

  test("stores the edited branch name and restores it after remount", async () => {
    render(<ProjectSettingsPage />);

    fireEvent.change(screen.getByLabelText(/Podaj adres GitHub/), {
      target: { value: "https://github.com/example/beauty-client-pro" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Zapisz adres GitHub/ }));

    await waitFor(() => {
      expect(screen.getByText(/Decyzja pracy z ga/)).toBeTruthy();
    });

    fireEvent.click(screen.getAllByRole("radio")[1]);

    await waitFor(() => {
      expect(screen.getByLabelText(/Nazwa ga/i)).toBeTruthy();
    });

    fireEvent.change(screen.getByLabelText(/Nazwa ga/i), {
      target: { value: "work/beauty-client-pro-hotfix" },
    });

    expect(
      localStorage.getItem(
        "soft-premium-system.projects.project-1.working-branch-name",
      ),
    ).toBe("work/beauty-client-pro-hotfix");

    cleanup();
    render(<ProjectSettingsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Proponowana ga.*robocza/)).toBeTruthy();
    });

    expect(
      (screen.getByLabelText(/Nazwa ga/i) as HTMLInputElement).value,
    ).toBe("work/beauty-client-pro-hotfix");
  });
});
