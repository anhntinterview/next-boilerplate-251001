import fs from "fs-extra";

async function main() {
  await fs.remove("build");

  const standaloneDir = ".next/standalone";

  if (!(await fs.pathExists(standaloneDir))) {
    throw new Error(".next/standalone does not exist");
  }

  await fs.copy(standaloneDir, "build");

  if (await fs.pathExists(".next/static")) {
    await fs.copy(".next/static", "build/.next/static");
  }
  if (await fs.pathExists("public")) {
    await fs.copy("public", "build/public");
  }

  console.log("Build folder generated successfully (CI mode).");
}

main();
