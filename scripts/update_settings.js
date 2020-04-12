#!/usr/bin/env node

/**
 * This script updates project-scratch-def.schema.json based on the Salesforce's
 * doc site results from https://developer.salesforce.com/docs/get_document_content/api_meta/meta_mobilesettings.htm/en-us/224.0
 */
const fs = require("fs");
const { join } = require("path");

// TODO: Replace with api call
const report = JSON.parse(
  fs.readFileSync(join(__dirname, "settings_doc.json"))
);

const entries = report.toc;
// let settingNames = new Set();
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
                // console.log(`name => ${thirdLevelItem.text}`);
                const fixSettingName =
                  thirdLevelItem.text.charAt(0).toLowerCase() +
                  thirdLevelItem.text.substring(1);
                const docUri = thirdLevelItem.a_attr.href;
                // console.log(`fixed name => ${fixSettingName}`);

                propertiesObj.properties[fixSettingName] = {
                  type: "object",
                  title: thirdLevelItem.text,
                  description: `For more details go to https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/${docUri}`
                };
                // settingNames.add(fixSettingName);
              }
            });
          }
        });
      }
    });
  }
});

console.log("Settings");
// console.log(`propertiesObj ====> `, propertiesObj);

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
