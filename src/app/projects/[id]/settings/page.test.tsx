// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createProject } from "@/lib/project/project";

const useParamsMock = vi.fn(() => ({ id: "project-1" }));

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

function createBlockedSourceRevalidationResponse(
  message =
    "Lokalny repo checkout nadal niedostępny lub nie jest poprawnym repozytorium Git.",
): Response {
  return new Response(
    JSON.stringify({
      status: "blocked",
      message,
    }),
    {
      status: 409,
      headers: {
        "content-type": "application/json",
      },
    },
  );
}

function createSuccessfulSourceRevalidationResponse(): Response {
  return new Response(
    JSON.stringify({
      status: "success",
      message:
        "Checkout status został zrewalidowany. Commit/push/merge/PR pozostają poza zakresem.",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
      activeBranch: "work/beauty-client-pro",
      repoCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
      remoteUrl: "https://github.com/example/beauty-client-pro",
      workingTreeState: "clean",
      sourceStatus: "git-repo",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    },
  );
}

vi.mock("next/navigation", () => ({
  useParams: () => useParamsMock(),
}));

import ProjectSettingsPage from "./page";

describe("ProjectSettingsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    useParamsMock.mockReturnValue({ id: "project-1" });
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(createBlockedSourceRevalidationResponse())));
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
    vi.unstubAllGlobals();
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
    expect(
      screen.getByText(/C:\\SPS_OS_WORK\\beauty-client-pro\\repo/, {
        selector: ".text-zinc-200",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(/Samo ustawienie katalogu repo nie wykonuje jeszcze clone\./),
    ).toBeTruthy();
    expect(screen.queryByText(/Decyzja pracy z ga/)).toBeNull();
    expect(screen.queryByText(/Gotowość połączenia GitHub/)).toBeNull();
  });

  test("blocks saving the manifest-only folder as a repo checkout and points to the derived repo folder", () => {
    render(<ProjectSettingsPage />);

    fireEvent.click(screen.getByRole("button", { name: /Zapisz katalog repo/ }));

    expect(
      screen.getByText(/Ten katalog wskazuje folder manifest-only/, {
        selector: ".text-emerald-200",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(/C:\\SPS_OS_WORK\\beauty-client-pro\\repo jako repo checkout\./, {
        selector: ".text-emerald-200",
      }),
    ).toBeTruthy();
  });

  test("shows the live trial decision contract before any destructive execution", () => {
    const { container } = render(<ProjectSettingsPage />);

    expect(screen.getByText(/Kontrakt decyzji live trial/)).toBeTruthy();
    expect(
      screen.getByText(/Project selected for live trial: Beauty Client PRO/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Allowed delete scope: Odpinanie z SPS OS, browser\/localStorage cleanup/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Explicitly forbidden until next approval: deleting Beauty Client PRO/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Abort conditions: unexpected path, missing project name/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Rollback \/ odzyskanie: rerun discovery refresh, reopen from the filesystem path/),
    ).toBeTruthy();
  });

  test("shows a read-only registry detach preview for the BCP project entry and all prefixed browser keys", () => {
    const bcpProjectId = "0d3e28cb-6dff-442a-b94c-007a5d6b5779";
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText,
      },
    });
    localStorage.clear();
    useParamsMock.mockReturnValue({ id: bcpProjectId });
    createProject(
      "Beauty Client PRO",
      bcpProjectId,
      undefined,
      "C:\\SPS_OS_WORK\\beauty-client-pro",
      "manifest-present",
    );
    localStorage.setItem(
      `soft-premium-system.projects.${bcpProjectId}.tasks`,
      "[]",
    );
    localStorage.setItem(
      `soft-premium-system.projects.${bcpProjectId}.clients`,
      "[]",
    );
    localStorage.setItem(
      "soft-premium-system.projects.other-project.tasks",
      "[]",
    );

    const { container } = render(<ProjectSettingsPage />);

    expect(screen.getByText(/Podgląd odpięcia z rejestru SPS/)).toBeTruthy();
    expect(
      screen.getByText(/Podgląd tylko do odczytu\. Nie wykonuje detach\/delete/),
    ).toBeTruthy();
    expect(screen.getByText(/wouldRemoveBrowserProjectEntry:\s*true/)).toBeTruthy();
    expect(screen.getByText(/wouldRemoveServerRegistryEntry:\s*true/)).toBeTruthy();
    expect(screen.getByText(/wouldCallDeleteExecution:\s*false/)).toBeTruthy();
    expect(container.textContent).toContain(
      `soft-premium-system.projects.${bcpProjectId}.clients`,
    );
    expect(container.textContent).toContain(
      `soft-premium-system.projects.${bcpProjectId}.tasks`,
    );
    expect(
      container.textContent,
    ).not.toContain("soft-premium-system.projects.other-project.tasks");
    expect(
      screen.getByText(/preserved workspace: C:\\SPS_OS_WORK\\beauty-client-pro/),
    ).toBeTruthy();
    expect(
      screen.getByText(/preserved repo checkout: C:\\SPS_OS_WORK\\beauty-client-pro\\repo/),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /preserved metadata root: C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb/,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(/Manifest sps-project\.json w C:\\SPS_OS_WORK\\beauty-client-pro/),
    ).toBeTruthy();
    expect(container.textContent).toContain("nie woła DELETE /api/projects/[id]");
    expect(container.textContent).toContain("nie używa /delete-execution");
    expect(screen.getByText(/Bramka zgody Product Ownera/)).toBeTruthy();
    expect(
      screen.getByText(/Ten milestone nie wykonuje odpięcia/),
    ).toBeTruthy();
    expect(
      screen.getByText(/BCP repo, metadata, Project Map i canonical artifacts pozostają nietknięte/),
    ).toBeTruthy();
    expect(container.textContent).toContain(
      "Product Owner approves registry-only detach for Beauty Client PRO, project id 0d3e28cb-6dff-442a-b94c-007a5d6b5779. Scope is limited to SPS OS registry/UI visibility and explicitly excludes BCP repository, .git, source files, workspace wrapper manifest, SPS metadata root, source identity, knowledge store, canonical Project Map artifacts, audit, risk decisions, and structural fingerprint.",
    );

    fireEvent.click(screen.getByRole("button", { name: /Kopiuj tekst zgody/ }));

    expect(writeText).toHaveBeenCalledWith(
      "Product Owner approves registry-only detach for Beauty Client PRO, project id 0d3e28cb-6dff-442a-b94c-007a5d6b5779. Scope is limited to SPS OS registry/UI visibility and explicitly excludes BCP repository, .git, source files, workspace wrapper manifest, SPS metadata root, source identity, knowledge store, canonical Project Map artifacts, audit, risk decisions, and structural fingerprint.",
    );
    expect(
      screen.getByText(/Tryby zarządzania lokalnymi plikami projektu/),
    ).toBeTruthy();
    expect(screen.getByText(/Odłącz z SPS OS/)).toBeTruthy();
    expect(screen.getAllByText(/Usuń lokalny checkout \/ repo/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Usuń cały workspace projektu/)).toBeTruthy();
    expect(screen.getAllByText(/Evidence preserved/).length).toBeGreaterThan(0);
    expect(container.textContent).toContain(
      "To jest tylko preview kontraktu UI. Nie wykonuje usunięcia",
    );
    expect(container.textContent).toContain(
      "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
    );
    expect(container.textContent).toContain(
      "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
    );
    expect(container.textContent).toContain(
      "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
    );
    expect(container.textContent).toContain(
      "Git status, branch, HEAD, remote i remote freshness muszą być sprawdzone",
    );
    expect(container.textContent).toContain(
      "SPS evidence nie jest kasowane domyślnie",
    );
    expect(
      screen.getByText(/Gotowość wykonania: Usuń lokalny checkout \/ repo/),
    ).toBeTruthy();
    expect(container.textContent).toContain(
      "Status operacji: approval required.",
    );
    expect(container.textContent).toContain("Git status clean: wymagane.");
    expect(container.textContent).toContain("Branch, HEAD i remote: wymagane.");
    expect(container.textContent).toContain(
      "Remote main verified: wymagane.",
    );
    expect(container.textContent).toContain(
      "Approval text copied/confirmed: wymagane.",
    );
    expect(container.textContent).toContain("Evidence preserved: wymagane.");
    expect(container.textContent).toContain("Blocked if Git dirty");
    expect(container.textContent).toContain("path is not project checkout");
    expect(container.textContent).toContain("path leaves workspace");
    expect(container.textContent).toContain("manifest would be removed");
    expect(container.textContent).toContain("`.sps-meta` would be removed");
    expect(container.textContent).toContain(
      "preview, approval required, ready, blocked, executed, failed, reconnect required",
    );
    expect(container.textContent).toContain(
      "Ten panel nie wykonuje usuwania, nie dodaje endpointu",
    );
    expect(
      screen.getByText(/Kontrakt endpointu\/akcji: Usuń lokalny checkout \/ repo/),
    ).toBeTruthy();
    expect(container.textContent).toContain(
      "H2 opisuje przyszły minimalny endpoint lub server action bez wykonania.",
    );
    expect(container.textContent).toContain(
      "Request shape: projectId, operationMode=remove-checkout, targetPath, preservedPaths, gitPreflight, approvalText.",
    );
    expect(container.textContent).toContain(
      "Walidacje: targetPath musi być checkoutem projektu",
    );
    expect(container.textContent).toContain(
      "Blokady: Git dirty, niezweryfikowany remote main",
    );
    expect(container.textContent).toContain(
      "Response shape: status, mode, wouldDeletePaths, preservedPaths, blockedReasons, gitPreflight, evidencePreserved, reconnectRequired, executionPerformed.",
    );
    expect(container.textContent).toContain(
      "executionPerformed zawsze pozostaje false",
    );
    expect(
      screen.getByRole("button", {
        name: /Sprawdź dry-run usunięcia checkoutu/,
      }),
    ).toBeTruthy();
    expect(container.textContent).toContain(
      "To jest dry-run. Nic nie zostało usunięte.",
    );
    expect(screen.getByText(/Project Brain, mapa i Konduktor/)).toBeTruthy();
    expect(
      container.textContent.indexOf("Project Brain, mapa i Konduktor"),
    ).toBeGreaterThan(
      container.textContent.indexOf(
        "Tryby zarządzania lokalnymi plikami projektu",
      ),
    );
    expect(container.textContent).toContain(
      "To jest tylko kontrakt UI, bez wykonania delete, detach, reconnect albo zapisu mapy.",
    );
    expect(container.textContent).toContain(
      "Project Brain przechowuje wiedzę, stan i evidence projektu.",
    );
    expect(container.textContent).toContain(
      "Project Map opisuje strukturę projektu, canonical artifacts, audit, accepted risks i fingerprint.",
    );
    expect(container.textContent).toContain(
      "Conductor czyta Brain + Map i rekomenduje następny bezpieczny krok.",
    );
    expect(container.textContent).toContain(
      "Project Operations wykonuje tylko jawnie zatwierdzone operacje",
    );
    expect(container.textContent).toContain(
      "Gdy lokalny checkout zniknie, evidence zostaje",
    );
    expect(container.textContent).toContain("reconnect i readback Project Map");
    expect(container.textContent).toContain("projekt utworzony / zaimportowany");
    expect(container.textContent).toContain("source identity znane");
    expect(container.textContent).toContain("Project Map candidate available");
    expect(container.textContent).toContain("canonical Project Map present");
    expect(container.textContent).toContain("local checkout present");
    expect(container.textContent).toContain("local checkout missing");
    expect(container.textContent).toContain("evidence preserved");
    expect(container.textContent).toContain("reconnect required");
    expect(container.textContent).toContain("map readback required");
    expect(container.textContent).toContain("Conductor next step required");
  });

  test("calls the checkout-removal dry-run endpoint and renders the response without delete execution", async () => {
    const bcpProjectId = "0d3e28cb-6dff-442a-b94c-007a5d6b5779";
    const fetchMock = vi.fn((input: RequestInfo | URL, _init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();

      if (url.includes("/checkout-removal/dry-run")) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              status: "preview",
              mode: "remove-checkout",
              executionPerformed: false,
              wouldDeletePaths: [
                "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
              ],
              preservedPaths: [
                "C:\\SPS_OS_WORK\\beauty-client-pro",
                "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
                "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
              ],
              blockedReasons: [],
              gitPreflight: {
                workingTreeStatus: "requires separate preflight",
                remoteMainVerified: false,
              },
              evidencePreserved: true,
              reconnectRequired: true,
            }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
              },
            },
          ),
        );
      }

      return Promise.resolve(createBlockedSourceRevalidationResponse());
    });

    vi.stubGlobal("fetch", fetchMock);
    localStorage.clear();
    useParamsMock.mockReturnValue({ id: bcpProjectId });
    createProject(
      "Beauty Client PRO",
      bcpProjectId,
      undefined,
      "C:\\SPS_OS_WORK\\beauty-client-pro",
      "manifest-present",
    );

    const { container } = render(<ProjectSettingsPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /Sprawdź dry-run usunięcia checkoutu/,
        }),
      ).toBeTruthy();
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /Sprawdź dry-run usunięcia checkoutu/,
      }),
    );

    await waitFor(() => {
      expect(container.textContent).toContain("executionPerformed: false");
    });

    const dryRunCall = fetchMock.mock.calls.find(([input]) =>
      String(input).includes("/checkout-removal/dry-run"),
    );

    expect(dryRunCall).toBeTruthy();
    expect(String(dryRunCall?.[0])).toBe(
      `/api/projects/${bcpProjectId}/checkout-removal/dry-run`,
    );
    expect(
      JSON.parse(String((dryRunCall?.[1] as RequestInit | undefined)?.body)),
    ).toMatchObject({
      preservedPaths: [
        "C:\\SPS_OS_WORK\\beauty-client-pro",
        "C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json",
        "C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb",
      ],
    });
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("/delete-execution"),
      ),
    ).toBe(false);
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("DELETE /api/projects"),
      ),
    ).toBe(false);
    expect(container.textContent).toContain("wouldDeletePaths:");
    expect(container.textContent).toContain(
      "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
    );
    expect(container.textContent).toContain("preservedPaths:");
    expect(container.textContent).toContain("blockedReasons:");
    expect(container.textContent).toContain("brak");
    expect(container.textContent).toContain("gitPreflight:");
    expect(container.textContent).toContain("evidencePreserved: true");
    expect(container.textContent).toContain("reconnectRequired: true");
    expect(container.textContent).toContain(
      "To jest dry-run. Nic nie zostało usunięte.",
    );
  });

  test("renders dry-run blocked reasons without deleting anything", async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();

      if (url.includes("/checkout-removal/dry-run")) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              status: "blocked",
              mode: "remove-checkout",
              executionPerformed: false,
              wouldDeletePaths: [],
              preservedPaths: ["C:\\SPS_OS_WORK\\beauty-client-pro"],
              blockedReasons: ["targetPath musi pozostać wewnątrz workspace."],
              gitPreflight: {
                remoteMainVerified: false,
              },
              evidencePreserved: true,
              reconnectRequired: true,
            }),
            {
              status: 409,
              headers: {
                "content-type": "application/json",
              },
            },
          ),
        );
      }

      return Promise.resolve(createBlockedSourceRevalidationResponse());
    });

    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<ProjectSettingsPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Sprawdź dry-run usunięcia checkoutu/,
      }),
    );

    await waitFor(() => {
      expect(container.textContent).toContain(
        "Dry-run zwrócił blokady. Nic nie zostało usunięte.",
      );
    });

    expect(container.textContent).toContain("executionPerformed: false");
    expect(container.textContent).toContain(
      "targetPath musi pozostać wewnątrz workspace.",
    );
    expect(container.textContent).toContain(
      "To jest dry-run. Nic nie zostało usunięte.",
    );
  });

  test("captures checkout removal approval locally without execution calls", async () => {
    const requiredApprovalText =
      "Product Owner approves destructive checkout-only disk removal for Beauty Client PRO, project id 0d3e28cb-6dff-442a-b94c-007a5d6b5779. Remove exactly C:\\SPS_OS_WORK\\beauty-client-pro\\repo. Preserve C:\\SPS_OS_WORK\\beauty-client-pro. Preserve C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json. Preserve C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb. Remote main is verified at 60f8280b2103c12d16b2851a3cef1be140eb34b5. Product Owner acknowledges local checkout deletion is destructive but recoverable from remote if access remains available.";
    const fetchMock = vi.fn((input: RequestInfo | URL) =>
      Promise.resolve(createBlockedSourceRevalidationResponse()),
    );

    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<ProjectSettingsPage />);

    expect(container.textContent).toContain(
      "Lokalna bramka zgody: Usuń lokalny checkout / repo",
    );
    expect(container.textContent).toContain(requiredApprovalText);
    expect(container.textContent).toContain(
      "Zgoda jest sprawdzana tylko lokalnie. Nic nie zostało wykonane.",
    );
    expect(container.textContent).toContain("Status zgody: approval missing.");
    expect(
      screen
        .getByRole("button", { name: /Wykonanie niedostępne/ })
        .hasAttribute("disabled"),
    ).toBe(true);

    fireEvent.change(
      screen.getByLabelText(/Wklej tekst zgody Product Ownera/),
      {
        target: {
          value: "Product Owner approves something else.",
        },
      },
    );

    expect(container.textContent).toContain("Status zgody: approval mismatch.");
    expect(container.textContent).toContain(
      "Tekst zgody nie pasuje do wymaganego kontraktu.",
    );

    fireEvent.change(
      screen.getByLabelText(/Wklej tekst zgody Product Ownera/),
      {
        target: {
          value: requiredApprovalText,
        },
      },
    );

    expect(container.textContent).toContain("Status zgody: approval matched.");
    expect(container.textContent).toContain("Future state: ready for execution.");
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("/delete-execution"),
      ),
    ).toBe(false);
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("DELETE /api/projects"),
      ),
    ).toBe(false);
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("/checkout-removal/dry-run"),
      ),
    ).toBe(false);
  });

  test("shows the future checkout removal execute action as disabled only", async () => {
    const requiredApprovalText =
      "Product Owner approves destructive checkout-only disk removal for Beauty Client PRO, project id 0d3e28cb-6dff-442a-b94c-007a5d6b5779. Remove exactly C:\\SPS_OS_WORK\\beauty-client-pro\\repo. Preserve C:\\SPS_OS_WORK\\beauty-client-pro. Preserve C:\\SPS_OS_WORK\\beauty-client-pro\\sps-project.json. Preserve C:\\SPS_OS_WORK\\.sps-meta\\beauty-client-pro--0d3e28cb. Remote main is verified at 60f8280b2103c12d16b2851a3cef1be140eb34b5. Product Owner acknowledges local checkout deletion is destructive but recoverable from remote if access remains available.";
    const fetchMock = vi.fn((input: RequestInfo | URL) =>
      Promise.resolve(createBlockedSourceRevalidationResponse()),
    );

    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<ProjectSettingsPage />);

    expect(container.textContent).toContain("Przyszła akcja wykonawcza");
    expect(container.textContent).toContain(
      "Wykonanie jest nadal zablokowane. Ten krok tylko pokazuje przyszłą akcję.",
    );
    expect(container.textContent).toContain("approval matched");
    expect(container.textContent).toContain("dry-run executed");
    expect(container.textContent).toContain("Git preflight confirmed");
    expect(container.textContent).toContain("execute endpoint available");
    expect(container.textContent).toContain(
      "separate final execution confirmation",
    );

    const executeButton = screen.getByRole("button", {
      name: /Wykonaj usunięcie checkoutu/,
    });

    expect(executeButton.hasAttribute("disabled")).toBe(true);

    fireEvent.change(
      screen.getByLabelText(/Wklej tekst zgody Product Ownera/),
      {
        target: {
          value: requiredApprovalText,
        },
      },
    );
    fireEvent.click(executeButton);

    expect(container.textContent).toContain("Status zgody: approval matched.");
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("/checkout-removal/execute"),
      ),
    ).toBe(false);
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("/delete-execution"),
      ),
    ).toBe(false);
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input).includes("DELETE /api/projects"),
      ),
    ).toBe(false);
  });

  test("revalidates a derived repo checkout and hides the manifest-only source copy", async () => {
    createProject(
      "Beauty Client PRO",
      "project-1",
      "https://github.com/example/beauty-client-pro",
      "C:\\SPS_OS_WORK\\beauty-client-pro",
      "manifest-present",
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(createSuccessfulSourceRevalidationResponse())),
    );

    render(<ProjectSettingsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Post-clone source status/)).toBeTruthy();
    });

    expect(
      screen.getByText(/Status repo zweryfikowany z filesystemu/),
    ).toBeTruthy();
    expect(screen.getByText(/Local git repo present/)).toBeTruthy();
    expect(
      screen.getByText(/Project workspace folder: C:\\SPS_OS_WORK\\beauty-client-pro/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Repo checkout folder: C:\\SPS_OS_WORK\\beauty-client-pro\\repo/),
    ).toBeTruthy();
    expect(
      screen.getByText(/GitHub remote URL: https:\/\/github.com\/example\/beauty-client-pro/),
    ).toBeTruthy();
    expect(
      screen.getAllByText(/Active working branch: work\/beauty-client-pro/),
    ).not.toHaveLength(0);
    expect(screen.getAllByText(/Working tree state: clean/)).not.toHaveLength(0);
    expect(screen.queryByText(/Pozostaw jako manifest-only/)).toBeNull();
    expect(screen.getByText(/Lokalne repo Git: obecne/)).toBeTruthy();
  });

  test("recovers settings from the server project registry when browser state is missing", async () => {
    localStorage.setItem("soft-premium-system.projects", JSON.stringify([]));
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = typeof input === "string" ? input : input.toString();

        if (url === "/api/projects/project-1") {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                id: "project-1",
                name: "Beauty Client PRO",
                repositoryUrl: "https://github.com/Beautyclient/BeautyClientPro.git",
                workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro",
                projectFilesystemStatus: "manifest-present",
                createdAt: "2026-09-10T10:00:00.000Z",
              }),
              {
                status: 200,
                headers: {
                  "content-type": "application/json",
                },
              },
            ),
          );
        }

        return Promise.resolve(createBlockedSourceRevalidationResponse());
      }),
    );

    render(<ProjectSettingsPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Project selected for live trial: Beauty Client PRO/),
      ).toBeTruthy();
    });

    expect(screen.queryByText("Projekt nie został znaleziony.")).toBeNull();
    expect(
      screen.getByDisplayValue("https://github.com/Beautyclient/BeautyClientPro.git"),
    ).toBeTruthy();
    expect(
      screen.getByDisplayValue("C:\\SPS_OS_WORK\\beauty-client-pro"),
    ).toBeTruthy();
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
    expect(
      screen.queryByText(/Wybór pierwszej realnej operacji/),
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
      screen.getByText(/Wybór pierwszej realnej operacji/),
    ).toBeTruthy();
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

  test("shows selected-as-candidate copy and readiness detail after choosing a candidate operation", async () => {
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
        screen.getByText(/Bramka potwierdzenia wykonania GitHub/),
      ).toBeTruthy();
    });
    expect(
      screen.queryByText("readiness detail", { selector: ".text-xs" }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", {
        name: /Zatwierdź do dalszego przygotowania/,
      }),
    ).toBeNull();

    fireEvent.click(screen.getByLabelText("connection check"));

    expect(
      screen.getByText(/Wybrano jako kandydat: connection check\./),
    ).toBeTruthy();
    expect(
      screen.getByText(/Decyzja Product Ownera/),
    ).toBeTruthy();
    expect(
      screen.getByText(/decision: pending/),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", {
        name: /Zatwierdź do dalszego przygotowania/,
      }),
    ).toBeTruthy();
    expect(
      screen.getByText("readiness detail", { selector: ".text-xs" }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Informational only\. Selected as candidate: connection check\./,
      ),
    ).toBeTruthy();
    expect(
      screen.getAllByText(/To nie jest autoryzacja do wykonania\./),
    ).toHaveLength(4);
    expect(
      screen.getAllByText(/Realne wykonanie Git\/GitHub pozostaje zablokowane\./),
    ).toHaveLength(5);
    expect(screen.queryByText(/Bramka autoryzacji/)).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: /Zatwierdź do dalszego przygotowania/ }),
    );

    expect(screen.getByText(/decision: approved for further preparation/)).toBeTruthy();
    expect(
      screen.getByText(
        /Wybrany kandydat jest approved for further preparation\. selected candidate: connection check\. authorized to execute: blocked\./,
      ),
    ).toBeTruthy();
    expect(
      screen.getAllByText(
        /To nie jest autoryzacja do wykonania\. Realne wykonanie Git\/GitHub pozostaje zablokowane\./,
      ),
    ).not.toHaveLength(0);
    expect(screen.getByText(/Bramka autoryzacji/)).toBeTruthy();
    expect(
      screen.getByText(/authorization: authorization required/),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", {
        name: /Oznacz jako authorized to execute/,
      }),
    ).toBeTruthy();
    expect(
      screen.queryByText(/Preflight pierwszej autoryzowanej operacji/),
    ).toBeNull();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Oznacz jako authorized to execute/,
      }),
    );

    expect(
      screen.getAllByText(/authorization: authorized to execute/),
    ).not.toHaveLength(0);
    expect(
      screen.getByText(
        /authorization required: fulfilled\. authorized to execute: connection check\. real execution remains blocked\./,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /To nadal lokalny stan decyzji\. Realne wykonanie Git\/GitHub pozostaje zablokowane w aplikacji na tym etapie\./,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(/Preflight pierwszej autoryzowanej operacji/),
    ).toBeTruthy();
    expect(screen.getByText(/Gotowe lokalnie/)).toBeTruthy();
    expect(screen.getByText(/Wciąż blokuje/)).toBeTruthy();
    expect(
      screen.getAllByText(/selected candidate: connection check/),
    ).not.toHaveLength(0);
    expect(
      screen.getAllByText(/authorization: authorized to execute/),
    ).not.toHaveLength(0);
    expect(
      screen.getByText(
        /Realne wykonanie Git\/GitHub pozostaje zablokowane\. To nadal lokalny preflight oparty wyłącznie na UI\/browser state\./,
      ),
    ).toBeTruthy();

    fireEvent.click(screen.getAllByRole("radio")[1]);

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji GitHub: ready/)).toBeTruthy();
    });
    expect(screen.getByLabelText("connection check")).toBeTruthy();
  });

  test("shows the SPS OS local working branch creation action after authorized preflight and records a local success state", async () => {
    const fetchDeferred = createDeferred<Response>();
    const fetchMock = vi.fn((_, init?: RequestInit) => {
      if (init?.method === "POST") {
        return fetchDeferred.promise;
      }

      return Promise.resolve(createBlockedSourceRevalidationResponse());
    });
    vi.stubGlobal("fetch", fetchMock);

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
      expect(screen.getByText(/Proponowana ga/)).toBeTruthy();
    });

    fireEvent.click(screen.getByLabelText("branch check"));

    expect(
      screen.getByText(/Wybrano jako kandydat: branch check\./),
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Zatwierd/i,
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Oznacz jako authorized to execute/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/Akcja lokalnego klonu i ga/i)).toBeTruthy();
    });
    expect(screen.getByText(/Stan akcji: ready/)).toBeTruthy();
    expect(screen.getByText(/Sama nazwa ga/i)).toBeTruthy();
    expect(
      screen.getByRole("button", {
        name: /Utw.*lokalny klon/i,
      }),
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Utw.*lokalny klon/i,
      }),
    );

    expect(screen.getByText(/Stan akcji: running/)).toBeTruthy();
    const postCall = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
    expect(postCall).toBeTruthy();
    const postRequestInit = postCall?.[1];
    expect(postRequestInit).toBeTruthy();
    expect(JSON.parse(postRequestInit?.body as string)).toEqual({
      projectId: "project-1",
      repositoryUrl: "https://github.com/example/beauty-client-pro",
      workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
      branchWorkMode: "working-branch",
      workingBranchName: "work/beauty-client-pro",
      candidateDecision: "approved for further preparation",
      authorization: "authorized to execute",
    });

    fetchDeferred.resolve(
      new Response(
        JSON.stringify({
          status: "success",
          message:
            "Lokalny clone i working branch setup zostały wykonane. Commit/push/merge/PR pozostają poza zakresem.",
          workingDirectory: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
          activeBranch: "work/beauty-client-pro",
          repoCheckoutPath: "C:\\SPS_OS_WORK\\beauty-client-pro\\repo",
          remoteUrl: "https://github.com/example/beauty-client-pro",
          workingTreeState: "clean",
          sourceStatus: "git-repo",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji: success/)).toBeTruthy();
    });
    expect(
      screen.getByText(
        /local clone\/branch setup: completed\. Commit\/push\/merge\/PR pozostają poza zakresem\./,
        {
          selector: ".text-zinc-300",
        },
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(/Repo checkout path: C:\\SPS_OS_WORK\\beauty-client-pro\\repo/, {
        selector: ".text-emerald-200",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(/Active branch: work\/beauty-client-pro/, {
        selector: ".text-emerald-200",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(/GitHub remote URL: https:\/\/github.com\/example\/beauty-client-pro/),
    ).toBeTruthy();
    expect(screen.getAllByText(/Working tree state: clean/)).not.toHaveLength(0);
    expect(screen.getByText(/Post-clone source status/)).toBeTruthy();
    expect(screen.getByText(/Local git repo present/)).toBeTruthy();
    expect(screen.getByText(/Project workspace folder: C:\\SPS_OS_WORK\\beauty-client-pro/)).toBeTruthy();
    expect(screen.getByText(/Repo checkout folder: C:\\SPS_OS_WORK\\beauty-client-pro\\repo/)).toBeTruthy();
    expect(screen.queryByText(/Pozostaw jako manifest-only/)).toBeNull();
    expect(
      screen.queryByText(/Folder projektu SPS OS to manifest-only/),
    ).toBeNull();
  });

  test("shows blocked and error states when the action API blocks or fails", async () => {
    let postCallCount = 0;
    const fetchMock = vi.fn((_, init?: RequestInit) => {
      if (init?.method !== "POST") {
        return Promise.resolve(createBlockedSourceRevalidationResponse());
      }

      postCallCount += 1;

      if (postCallCount === 1) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              status: "blocked",
              message:
                "Remote origin nie pasuje do skonfigurowanego adresu GitHub.",
            }),
            {
              status: 409,
              headers: {
                "content-type": "application/json",
              },
            },
          ),
        );
      }

      return Promise.reject(new Error("network failure"));
    });
    vi.stubGlobal("fetch", fetchMock);

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
      expect(screen.getByText(/Proponowana ga/)).toBeTruthy();
    });

    fireEvent.click(screen.getByLabelText("branch check"));
    fireEvent.click(
      screen.getByRole("button", {
        name: /Zatwierd/i,
      }),
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: /Oznacz jako authorized to execute/,
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Utw.*lokalny klon/i,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji: blocked/)).toBeTruthy();
    });
    expect(
      screen.getByText(
        /Remote origin nie pasuje do skonfigurowanego adresu GitHub\./,
      ),
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Utw.*lokalny klon/i,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/Stan akcji: error/)).toBeTruthy();
    });
    expect(
      screen.getByText(
        /Akcja lokalnego klonu i gałęzi roboczej napotkała błąd komunikacji z API\./,
      ),
    ).toBeTruthy();
  });

  test("hides the candidate decision block until a real operation candidate is selected", async () => {
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
        screen.getByText(/Bramka potwierdzenia wykonania GitHub/),
      ).toBeTruthy();
    });
    expect(
      screen.queryByText(/Decyzja Product Ownera/),
    ).toBeNull();
    expect(
      screen.queryByRole("button", {
        name: /Zatwierdź do dalszego przygotowania/,
      }),
    ).toBeNull();
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

  test("shows GitHub connection readiness and multi-account auth guidance after the repository URL is saved", async () => {
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
    expect(
      screen.getByText(/GitHub multi-account auth guidance/),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Przy wielu kontach GitHub przeglądarka może mieć poprawny dostęp, ale Git może używać złego credential\./,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /SPS OS repo auth context i client\/project repo auth context to dwa osobne konteksty\./,
      ),
    ).toBeTruthy();
    expect(screen.getByText(/Repository not found/)).toBeTruthy();
    expect(screen.getByText(/403 Permission denied/)).toBeTruthy();
    expect(screen.getByText(/Git Credential Manager/)).toBeTruthy();
    expect(
      screen.getByText(/credential\.https:\/\/github\.com\.useHttpPath true/),
    ).toBeTruthy();
    expect(
      screen.getByText(/GitHub CLI account switching, jeśli gh jest zainstalowane/),
    ).toBeTruthy();
    expect(screen.getByText(/SSH host aliases z osobnymi keys/)).toBeTruthy();
    expect(
      screen.getByText(/SPS OS nie przełącza credentiali automatycznie\./),
    ).toBeTruthy();
    expect(screen.queryByText(/OAuth/i)).toBeNull();
    expect(screen.queryByText(/token storage/i)).toBeNull();
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
