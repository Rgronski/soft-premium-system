// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { APP_VERSION, APP_VERSION_LABEL } from "@/lib/app-version";

import { AppVersionBadge } from "./app-version-badge";

describe("AppVersionBadge", () => {
  afterEach(() => {
    cleanup();
  });

  test("shows the canonical app version label", () => {
    render(<AppVersionBadge />);

    expect(screen.getByText(APP_VERSION_LABEL)).toBeTruthy();
    expect(APP_VERSION).toBe("0.021.2");
  });
});
