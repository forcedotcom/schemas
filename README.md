# Salesforce DX Schemas

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

JSON Schemas help with validation and code completion of json files. Below are the schemas that are available in this repository.

- Schema: [project-scratch-def.json](https://forcedotcom.github.io/schemas/project-scratch-def.json/project-scratch-def.schema.json)
- Schema: [sfdx-project.json](https://forcedotcom.github.io/schemas/sfdx-project.json/sfdx-project.schema.json)

## Using the Schemas

If you are using the **[Salesforce Extensions for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)** these schemas are already included for you.

For most other editors, you can use the schemas by adding the `$schema` property to the top of your JSON file with the link to the schema document as shown below.

```json
{
  "$schema": "https://raw.githubusercontent.com/forcedotcom/schemas/main/sfdx-project.schema.json"
  //...
}
```

You can also use these schemas programatically. For example, Salesforce CLI uses these schema to do certain validation.

```javascript
const schemas = require('@salesforce/schemas');
const projectJsonSchema = require(schemas['sfdx-project']);
// OR
const projectJsonSchema = require('@salesforce/schema/sfdx-project-schema.json']);
```

## Schema Generation

This package uses [Zod v4](https://zod.dev) for schema definition and validation. The schemas are defined in `/src` as Zod schemas, which serve as the single source of truth for:

- TypeScript types (via `z.infer<typeof Schema>`)
- JSON Schema documents (via `z.toJSONSchema()`)
- Runtime validation (via `.parse()` and `.safeParse()`)

### Building

Run `yarn build` to:

1. Compile TypeScript to JavaScript
2. Generate JSON Schema files from Zod schemas
3. Output schemas to root and `/lib` directories

### Updating project-scratch-def.schema.json

Run the `features-update` and `settings-update` scripts on every major release and open a PR with the new changes against the `main` branch to keep the schema files up to date with the latest Salesforce metadata settings.

## Bugs and Feedback

To report issues or feedback with the schemas, open a bug on [GitHub](https://github.com/forcedotcom/schemas/issues).
