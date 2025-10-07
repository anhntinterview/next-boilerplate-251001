import type NodeCache from "node-cache";
import { vi } from "vitest";

global.tokenCache = {
  get: () => undefined,
  set: () => true,
  keys: () => [],
  del: () => 0,
  getTtl: () => 0,
} as unknown as NodeCache;

// Mock server-side next-intl
vi.mock("next-intl/server", () => ({
  getLocale: async () => Promise.resolve("en"),
  getTranslations: async () => Promise.resolve((key: string) => key),
  getFormatter: async () =>
    Promise.resolve({ number: (value: number) => value }),
}));

vi.mock("server-only", () => {
  return {
    // mock server-only module
  };
});

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: (name: string) => {
      if (name === "currentEnterprise") {
        return { value: "enterprise" };
      }
      if (name === "currentStore") {
        return { value: "store" };
      }
      return undefined;
    },
  }),
}));
