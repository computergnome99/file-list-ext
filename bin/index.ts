import { build as jsrBuild } from "./jsr-build";
import { build as npmBuild } from "./npm-build";
import child_process from "node:child_process";

function build() {
  jsrBuild();
  child_process.execSync("npx jsr publish", { stdio: "inherit" });

  npmBuild();
  child_process.execSync("cd ./dist", { stdio: "inherit" });
  child_process.execSync("npm publish", { stdio: "inherit" });
  child_process.execSync("cd ../", { stdio: "inherit" });
}

build();
