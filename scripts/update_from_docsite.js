#!/usr/bin/env node

/**
 * This script updates project-scratch-def.schema.json based on the Salesforce's
 * doc site results from https://developer.salesforce.com/docs/get_document/atlas.en-us.sfdx_dev.meta
 */
const fs = require("fs");
const { join } = require("path");

// TODO: Replace with api call
const report = JSON.parse(fs.readFileSync(join(__dirname, "doc_file.json")));

const entries = report.toc;
let featureSet = new Set();
let anyOfArray = [];

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
              "sfdx_dev_scratch_orgs_def_file_config_values"
            )
          ) {
            if (secLevelItem.text.endsWith(":<value>")) {
              const patternVal = `^(${secLevelItem.text.replace(
                ":<value>",
                ""
              )}\\:[0-9]+$)`;
              anyOfArray.push({
                type: "string",
                title: secLevelItem.text,
                pattern: patternVal
              });
            } else {
              featureSet.add(secLevelItem.text);
            }
          }
        });
      }
    });
  }
});

console.log("Feature set :");
console.log(`Size : ${featureSet.size}`);

// Merge the featureSet enum
anyOfArray.push({ type: "string", enum: Array.from(featureSet).sort() });

const scratchSchemaDefPath = join(
  __dirname,
  "..",
  "project-scratch-def.json",
  "project-scratch-def.schema.json"
);
const scratchDef = JSON.parse(fs.readFileSync(scratchSchemaDefPath));
scratchDef.definitions.features.items.anyOf = anyOfArray;

fs.writeFileSync(scratchSchemaDefPath, JSON.stringify(scratchDef));

// reformat using prettier
