import fs from "node:fs";
import path from "node:path";
import child_process from "node:child_process";

import {
  checkDistDirectory,
  copyLicense,
  copyReadme,
  getPackageData,
  KEYS,
} from "./global";

function createPackageFile(): void {
  const distPath = checkDistDirectory();
  const packageData = getPackageData();

  const newPackageData: { [key: string]: unknown } = {};

  KEYS.NPM.forEach((key) => {
    if (packageData[key]) {
      newPackageData[key] = packageData[key];
    }
  });

  const newPackagePath = path.join(distPath, "package.json");

  try {
    fs.writeFileSync(newPackagePath, JSON.stringify(newPackageData, null, 2));
  } catch (error) {
    throw error;
  }
}

function build() {
  createPackageFile();
  copyReadme();
  copyLicense();

  try {
    child_process.execSync("bun build . --outdir ./dist --minify", {
      stdio: "ignore",
    });
    child_process.execSync("tsc --emitDeclarationOnly", { stdio: "ignore" });
  } catch (error) {
    throw error;
  }
}

export { build };
