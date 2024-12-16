import fs from "node:fs";
import path from "node:path";
import child_process from "node:child_process";

const KEYS = {
  NPM: ["main", "devDependencies", "publishConfig", "license", "type"],
  JSR: ["name", "version"],
} as const;

function checkDistDirectory(): string {
  const distPath = path.join(process.cwd(), "dist");

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  return distPath;
}

function getPackageData(): { [key: string]: unknown } {
  const packagePath = path.join(process.cwd(), "package.json");

  try {
    const packageContent = fs.readFileSync(packagePath, "utf-8");
    const packageData = JSON.parse(packageContent);

    return packageData;
  } catch (error) {
    throw error;
  }
}

function getJsrData(): { [key: string]: unknown } {
  const jsrPath = path.join(process.cwd(), "jsr.json");

  try {
    const jsrContent = fs.readFileSync(jsrPath, "utf-8");
    const jsrData = JSON.parse(jsrContent);

    return jsrData;
  } catch (error) {
    throw error;
  }
}

function createPackageFile(): void {
  const distPath = checkDistDirectory();
  const packageData = getPackageData();
  const jsrData = getJsrData();

  const newPackageData: { [key: string]: unknown } = {};

  KEYS.JSR.forEach((key) => {
    if (jsrData[key]) {
      newPackageData[key] = jsrData[key];
    }
  });

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

function copyReadme(): void {
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

function copyLicense(): void {
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

build();
