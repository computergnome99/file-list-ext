import { getPackageData, KEYS, writeJsrData } from "./global";

function build() {
  const packageData = getPackageData();
  const jsrData: { [key: string]: unknown } = {};
  const baseData = {
    exports: "./index.ts",
    publish: {
      exclude: [
        "./tests",
        "./bin",
        ".gitignore",
        "bun.lockb",
        "bunfig.toml",
        "tsconfig.json",
      ],
    },
  };

  KEYS.JSR.forEach((key) => {
    if (packageData[key]) {
      jsrData[key] = packageData[key];
    }
  });

  Object.entries(baseData).forEach(([key, value]) => {
    if (!jsrData[key]) jsrData[key] = value;
  });

  writeJsrData(jsrData);
}

build();
