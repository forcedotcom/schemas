#!/usr/bin/env node
const fs = require("fs");
const { join } = require("path");

// TODO: Replace with api call
const report = JSON.parse(
  fs.readFileSync(join(__dirname, "mdReport_v48.json"))
);

const entries = report.types;
let featureSet = new Set();

Object.keys(entries).forEach(key => {
  //console.log(key, entries[key]);
  const entityDetails = entries[key];
  if (entityDetails.hasOwnProperty("scratchDefinitions")) {
    console.log(`Currently processing data from ${key}`);
    if (entityDetails.scratchDefinitions !== null) {
      // iterate over different scratch definitions to get features
      Object.keys(entityDetails.scratchDefinitions).forEach(types => {
        const parsedConfig = JSON.parse(
          entityDetails.scratchDefinitions[types]
        );
        console.log(parsedConfig);

        if (parsedConfig.hasOwnProperty("features")) {
          console.log(`features ===> ${parsedConfig.features}`);
          parsedConfig.features.forEach(item => featureSet.add(item));
        }
      });
    }
  }
});

console.log("Feature set :");
console.log(`Size : ${featureSet.size}`);

const scratchSchemaDefPath = join(
  __dirname,
  "..",
  "project-scratch-def.json",
  "project-scratch-def.schema.json"
);
const scratchDef = JSON.parse(fs.readFileSync(scratchSchemaDefPath));
scratchDef.definitions.features.items.enum = Array.from(featureSet).sort();

fs.writeFileSync(scratchSchemaDefPath, JSON.stringify(scratchDef));

// reformat using prettier
