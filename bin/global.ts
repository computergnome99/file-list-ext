import fs from "node:fs";
import path from "node:path";
import child_process from "node:child_process";

export const KEYS = {
  NPM: [
    "name",
    "version",
    "main",
    "devDependencies",
    "publishConfig",
    "license",
    "type",
  ],
  JSR: ["name", "version", "license"],
} as const;

export function checkDistDirectory(): string {
  const distPath = path.join(process.cwd(), "dist");

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  return distPath;
}

export function getPackageData(): { [key: string]: unknown } {
  const packagePath = path.join(process.cwd(), "package.json");

  try {
    const packageContent = fs.readFileSync(packagePath, "utf-8");
    const packageData = JSON.parse(packageContent);

    return packageData;
  } catch (error) {
    throw error;
  }
}

export function getJsrData(): { [key: string]: unknown } {
  const jsrPath = path.join(process.cwd(), "jsr.json");

  try {
    const jsrContent = fs.readFileSync(jsrPath, "utf-8");
    const jsrData = JSON.parse(jsrContent);

    return jsrData;
  } catch (error) {
    throw error;
  }
}

export function writeJsrData(data: { [key: string]: unknown }): void {
  const jsrPath = path.join(process.cwd(), "jsr.json");

  try {
    const encodedData = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsrPath, encodedData);
  } catch (error) {
    throw error;
  }
}

export function copyReadme(): void {
  const distPath = checkDistDirectory();
  const readmePath = path.join(process.cwd(), "README.md");

  try {
    if (fs.existsSync(readmePath)) {
      fs.copyFileSync(readmePath, path.join(distPath, "README.md"));
    }
  } catch (error) {
    throw error;
  }
}

export function copyLicense(): void {
  const distPath = checkDistDirectory();
  const readmePath = path.join(process.cwd(), "LICENSE.md");

  try {
    if (fs.existsSync(readmePath)) {
      fs.copyFileSync(readmePath, path.join(distPath, "LICENSE.md"));
    }
  } catch (error) {
    throw error;
  }
}
