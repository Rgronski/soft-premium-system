// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import {
  APP_VERSION,
  APP_VERSION_LABEL,
  LAST_PUBLISHED_MS,
  LAST_PUBLISHED_MS_LABEL,
} from "@/lib/app-version";

import { AppVersionBadge } from "./app-version-badge";

describe("AppVersionBadge", () => {
  afterEach(() => {
    cleanup();
  });

  test("shows the canonical app version label", () => {
    render(<AppVersionBadge />);

    expect(screen.getByText(APP_VERSION_LABEL)).toBeTruthy();
    expect(screen.getByText(LAST_PUBLISHED_MS_LABEL)).toBeTruthy();
    expect(APP_VERSION).toBe("1.0044");
    expect(LAST_PUBLISHED_MS).toBe(
      "MS-031.4 - Project Map Create Candidate Action Foundation",
    );
  });
});
