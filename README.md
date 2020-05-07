# Salesforce DX Schemas

JSON Schemas help with validation and code completion of json files. Below are the schemas that are available in this repository.

- Schema: [project-scratch-def.json](https://forcedotcom.github.io/schemas/project-scratch-def.json/project-scratch-def.schema.json)
- Schema: [sfdx-project.json](https://forcedotcom.github.io/schemas/sfdx-project.json/sfdx-project.schema.json)

## Using the Schemas

If you are using the **[Salesforce Extensions for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)** these schemas are already included for you.

For most other editors, you can use the schemas by adding the `$schema` property to the top of your JSON file with the link to the schema document as shown below.

```json
{
  "$schema": "https://raw.githubusercontent.com/forcedotcom/schemas/master/schemas/sfdx-project.schema.json"
  //...
}
```

You can also use these schemas programatially. For example, Salesforce CLI uses these schema to do certain validation.

```javascript
const schemas = require('@salesforce/schemas');
const projectJsonSchema = require(schemas['sfdx-project']);
// OR
const projectJsonSchema = require('@salesforce/schema/sfdx-project-schema.json']);
```

## Bugs and Feedback

To report issues or feedback with the schemas, open a bug on [GitHub](https://github.com/forcedotcom/schemas/issues).
