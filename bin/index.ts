import { build as jsrBuild } from "./jsr-build";
import { build as npmBuild } from "./npm-build";
import child_process from "node:child_process";

function build() {
  jsrBuild();
  child_process.execSync("npx jsr publish");

  npmBuild();
  child_process.execSync("cd ./dist");
  child_process.execSync("npm publish");
  child_process.execSync("cd ../");
}

build();
