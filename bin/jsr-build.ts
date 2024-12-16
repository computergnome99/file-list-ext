import { getJsrData, getPackageData, KEYS, writeJsrData } from "./global";

function build() {
  const packageData = getPackageData();
  const jsrData = getJsrData();

  KEYS.JSR.forEach((key) => {
    if (packageData[key]) {
      jsrData[key] = packageData[key];
    }
  });

  writeJsrData(jsrData);
}

build();
