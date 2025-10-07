import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  return {
    plugins: [tsconfigPaths()],
    esbuild: {
      logOverride: { "duplicate-object-key": "silent" },
    },
    test: {
      exclude: [...configDefaults.exclude, "./tests/**"],
      env: loadEnv(mode, process.cwd(), ""),
      setupFiles: ["./vitest.setup.ts"],
      coverage: {
        provider: "istanbul",
        reporter: ["text", "json", "html"],
        include: ["src/app/api/**/*.{js,ts}", "src/services/**/*.{js,ts}"],
        exclude: ["node_modules", "__tests__"],
      },
    },
  };
});
