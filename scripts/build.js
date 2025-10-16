import path from "path";
import fs from "fs-extra";

async function findDeepestStandalone(dir) {
  const entries = await fs.readdir(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      const maybeServer = path.join(fullPath, "server.js");
      if (await fs.pathExists(maybeServer)) {
        return fullPath;
      }
      const deeper = await findDeepestStandalone(fullPath);
      if (deeper) return deeper;
    }
  }
  return null;
}

async function main() {
  await fs.remove("build");

  const standaloneDir = ".next/standalone";
  const rootAppDir = await findDeepestStandalone(standaloneDir);

  if (!rootAppDir) {
    throw new Error("server.js CAN NOT BE FOUND");
  }

  await fs.copy(rootAppDir, "build");

  await fs.copy(".next/static", "build/.next/static");
  await fs.copy("public", "build/public");
}

main();
