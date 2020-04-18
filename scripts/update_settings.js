#!/usr/bin/env node

/**
 * This script updates project-scratch-def.schema.json based on the Salesforce's
 * doc site results from https://developer.salesforce.com/docs/get_document/atlas.en-us.api_meta.meta
 */
const fs = require("fs");
const { join } = require("path");
const shell = require("shelljs");
shell.set("-e");
shell.set("+v");

const SFDX_DEV_URL =
  "https://developer.salesforce.com/docs/get_document/atlas.en-us.api_meta.meta";

const reportPayload = shell
  .exec(`curl ${SFDX_DEV_URL} -v`, {
    silent: true
  })
  .stdout.trim();

const report = JSON.parse(reportPayload);
if (report && report.length === 0) {
  logger.error(`Looks like url ${SFDX_DEV_URL} is not returning a valid JSON`);
  process.exit(-1);
}

const entries = report.toc;
let propertiesObj = { properties: {} };

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
            secLevelItem.hasOwnProperty("children") &&
            Array.isArray(secLevelItem.children)
          ) {
            const thirdLevelChildren = secLevelItem.children;
            thirdLevelChildren.forEach(thirdLevelItem => {
              if (
                thirdLevelItem.hasOwnProperty("text") &&
                thirdLevelItem.text.endsWith("Settings")
              ) {
                const fixSettingName =
                  thirdLevelItem.text.charAt(0).toLowerCase() +
                  thirdLevelItem.text.substring(1);
                const docUri = thirdLevelItem.a_attr.href;

                propertiesObj.properties[fixSettingName] = {
                  type: "object",
                  title: thirdLevelItem.text,
                  description: `For more details go to https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/${docUri}`
                };
              }
            });
          }
        });
      }
    });
  }
});

const scratchSchemaDefPath = join(
  __dirname,
  "..",
  "project-scratch-def.json",
  "project-scratch-def.schema.json"
);
const scratchDef = JSON.parse(fs.readFileSync(scratchSchemaDefPath));
scratchDef.definitions.settings.properties = propertiesObj.properties;

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

console.log(`Successfully updated settings for ${scratchSchemaDefPath}`);
