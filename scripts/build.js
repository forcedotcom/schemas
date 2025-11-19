#!/usr/bin/env node
const exec = require("child_process").execSync;
const fs = require("fs");
/**
 * Build script using Zod's native JSON Schema generation
 */
console.log("compiling TypeScript");
exec(`yarn tsc -p . --pretty`);

console.log("generating JSON schemas from Zod schemas");

const { z } = require("zod");
const target = "draft-7";
const schemaSchema = "http://json-schema.org/draft-07/schema#";
// Generate sfdx-project schema
const { ProjectJsonSchema } = require("../lib/sfdx-project/sfdxProjectJson.js");
const projectSchema = z.toJSONSchema(ProjectJsonSchema, {
  target,
  override: (ctx) => {
    if (ctx.path.length === 0) {
      ctx.jsonSchema.$schema = schemaSchema;
      ctx.jsonSchema.$id = "http://schemas.salesforce.com/sfdx-project.json";
      ctx.jsonSchema.title = "Salesforce DX Project File";
    }
  },
});
const projectSchemaJson = JSON.stringify(projectSchema, null, 2);

// Generate project-scratch-def schema
const {
  ScratchOrgDefSchema,
} = require("../lib/project-scratch-def/scratchOrgDef.js");
const scratchDefSchema = z.toJSONSchema(ScratchOrgDefSchema, {
  target,
  override: (ctx) => {
    if (ctx.path.length === 0) {
      ctx.jsonSchema.$schema = schemaSchema;
      ctx.jsonSchema.$id =
        "https://schemas.salesforce.com/project-scratch-def.json";
      ctx.jsonSchema.title = "Scratch Org Definition Configuration";
      ctx.jsonSchema.description =
        "The scratch org definition file contains the configuration values that determine the shape of the scratch org.";
    }
  },
});
const scratchDefSchemaJson = JSON.stringify(scratchDefSchema, null, 2);

console.log("writing schemas to output locations");
// Write sfdx-project schema
fs.writeFileSync("sfdx-project.schema.json", projectSchemaJson);
fs.writeFileSync("lib/sfdx-project.schema.json", projectSchemaJson);

// Write project-scratch-def schema
fs.writeFileSync("project-scratch-def.schema.json", scratchDefSchemaJson);
fs.writeFileSync("lib/project-scratch-def.schema.json", scratchDefSchemaJson);

console.log("done");
