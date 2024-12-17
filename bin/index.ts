import { build as jsrBuild } from "./jsr-build";
import { build as npmBuild } from "./npm-build";
import child_process from "node:child_process";

function build() {
  jsrBuild();
  child_process.execSync("npx jsr publish", { stdio: "inherit" });

  npmBuild();
  setTimeout(() => {
    child_process.execSync("cd ./dist && npm publish", { stdio: "inherit" });
  });
}

build();
