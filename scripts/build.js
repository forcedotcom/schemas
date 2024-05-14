#!/usr/bin/env node
const exec = require("child_process").execSync;
const fs = require("fs");
/**
 * Dummy build script to satisfy Github Actions build requirement for running unit tests.
 */
console.log("compiling");
exec(`yarn tsc -p . --pretty`);
console.log(`generating schema from TS files`);
exec(
  `ts-json-schema-generator --path src/sfdx-project/sfdxProjectJson.ts --type ProjectJson --out compiled/sfdx-project.schema.json -f tsconfig.json --no-top-ref --id http://schemas.salesforce.com/sfdx-project.json;`
);
console.log(`copying schema`);
// the compiled sfdxProject files didn't exist until TS created them, but now we need them in the correct places
fs.copyFileSync(
  "compiled/sfdx-project.schema.json",
  "sfdx-project.schema.json"
);
fs.copyFileSync(
  "compiled/sfdx-project.schema.json",
  "lib/sfdx-project.schema.json"
);
console.log("done");
