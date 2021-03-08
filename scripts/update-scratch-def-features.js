#!/usr/bin/env node

/**
 * This script updates project-scratch-def.schema.json based on the Salesforce's
 * doc site results from https://developer.salesforce.com/docs/get_document/atlas.en-us.sfdx_dev.meta
 */
const fs = require("fs");
const { join } = require("path");
const shell = require("shelljs");
shell.set("-e");
shell.set("+v");

const SFDX_DEV_URL =
  "https://developer.salesforce.com/docs/get_document/atlas.en-us.sfdx_dev.meta";

const reportPayload = shell
  .exec(`curl ${SFDX_DEV_URL}`, {
    silent: true
  })
  .stdout.trim();

const report = JSON.parse(reportPayload);
if (report && report.length === 0) {
  logger.error(`Looks like url ${SFDX_DEV_URL} is not returning a valid JSON`);
  process.exit(-1);
}

const entries = report.toc;
let featureSet = new Set();
let anyOfArray = [];

console.log(
  "Start processing report JSON to update scratch definition features:"
);

entries.forEach(item => {
  if (item.hasOwnProperty("children") && Array.isArray(item.children)) {
    const firstLevelChildren = item.children;
    firstLevelChildren.forEach(childItem => {
      if (
        childItem.hasOwnProperty("children") &&
        Array.isArray(childItem.children)
      ) {
        const secondLevelChildren = childItem.children;
        secondLevelChildren.forEach(secLevelItem => {
          if (
            secLevelItem.id.startsWith(
              "sfdx_dev_scratch_orgs_def_file_config_values-sfdx_dev_scratch_orgs_def_file_config_values"
            )
          ) {
            secLevelItem.children.forEach(feature => {
              if (feature.text.endsWith(":<value>")) {
                const patternVal = `^(${feature.text.replace(
                  ":<value>",
                  ""
                )}\\:[0-9]+$)`;
                anyOfArray.push({
                  type: "string",
                  title: feature.text,
                  pattern: patternVal
                });
              } else {
                featureSet.add(feature.text);
              }
            });
          }
        });
      }
    });
  }
});

console.log(`Processed features : ${featureSet.size}`);
// Merge the featureSet enum
anyOfArray.push({ type: "string", enum: Array.from(featureSet).sort() });

const scratchSchemaDefPath = join(
  __dirname,
  "..",
  "project-scratch-def.schema.json"
);
const scratchDef = JSON.parse(fs.readFileSync(scratchSchemaDefPath));
scratchDef.definitions.features.items.anyOf = anyOfArray;

fs.writeFileSync(scratchSchemaDefPath, JSON.stringify(scratchDef));

// reformat using prettier
const prettierExecutable = join(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  "prettier"
);

shell.exec(
  `${prettierExecutable} --config .prettierrc --write "${scratchSchemaDefPath}"`,
  {
    cwd: join(__dirname, "..")
  }
);

console.log(`Successfully updated features for ${scratchSchemaDefPath}`);
