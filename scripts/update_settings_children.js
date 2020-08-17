#!/usr/bin/env node

/**
 * Use an up to date metadata wsdl
 */
const fs = require("fs");
const { join } = require("path");
const shell = require("shelljs");
shell.set("-e");
shell.set("+v");
const parser = require("xml2js").parseString;

const xmlData = fs.readFileSync("./scripts/data.xml");

const scratchSchemaDefPath = join(
  __dirname,
  "..",
  "project-scratch-def.json",
  "project-scratch-def.schema.json"
);
const scratchDef = JSON.parse(fs.readFileSync(scratchSchemaDefPath));
const settingNames = Object.keys(scratchDef.definitions.settings.properties);
console.log("all settingNames = ", settingNames);

parser(xmlData.toString(), { trim: true }, function(err, result) {
  const complexTypes =
    result.definitions.types[0]["xsd:schema"][0]["xsd:complexType"];

  // this first iteration should create a new formatted object with everything
  // referenced by the current settings
  // then, we would use that newly formatted JSON to build the setting children
  complexTypes.forEach(item => {
    const val = item["$"];
    const fixSettingName =
      val.name.charAt(0).toLowerCase() + val.name.substring(1);
    if (
      settingNames.includes(fixSettingName) &&
      item.hasOwnProperty("xsd:complexContent")
    ) {
      const elems =
        item["xsd:complexContent"][0]["xsd:extension"][0]["xsd:sequence"][0][
          "xsd:element"
        ];
      console.log("--------------");
      console.log(fixSettingName);
      let objProperties = { properties: {} };

      elems.forEach(eItem => {
        if (eItem["$"].type.startsWith("tns:")) {
          console.log("looks like this setting references another object");
          complexTypes.forEach(ct => {
            if (ct["$"].name === eItem["$"].type.replace("tns:", "")) {
              //
              const el = ct["xsd:sequence"][0]["xsd:element"];
              let secondLevelProps = { properties: {} };
              el.forEach(sle => {
                secondLevelProps.properties[sle["$"].name] = {
                  type: sle["$"].type.replace("xsd:", "")
                };
              });
              objProperties.properties[eItem["$"].name] = secondLevelProps;
            }
          });
        } else {
          objProperties.properties[eItem["$"].name] = {
            type: eItem["$"].type.replace("xsd:", "")
          };
        }
      });
      console.log(objProperties);
      console.log("\n");
    }
  });
});
