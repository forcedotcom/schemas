# Salesforce DX Schemas

JSON Schemas help with validation and code completion of json files. Below are the schemas that are availible in this repository.

- Schema: [project-scratch-def.json](https://forcedotcom.github.io/schemas/project-scratch-def.json/project-scratch-def.schema.json)
- Schema: [sfdx-project.json](https://forcedotcom.github.io/schemas/sfdx-project.json/sfdx-project.schema.json)

## Using the Schemas

You can use the schemas from your favorite editor usually by adding the `$schema` property to the top of your JSON file with the link to the schema document as shown below.

```json
{
  "$schema": "https://forcedotcom.github.io/schemas/project-scratch-def.schema.json"
  //...
}
```

In **Visual Studio Code** you can reference the schemas by adding the following to your settings.

```json
"json.schemas": [
  {
    "fileMatch": ["/config/*.json"],
    "url": "https://forcedotcom.github.io/schemas/project-scratch-def.schema.json"
  },
  {
    "fileMatch": ["/sfdx-project.json"],
    "url": "https://forcedotcom.github.io/schemas/sfdx-project.json/sfdx-project.schema.json"
  }
]
```

> **NOTE**: These schemas will be added by the Salesforce Extensions for Visual Studio Code soon.

## Bugs and Feedback

To report issues or feedback with the schemas, open a bug on [GitHub](https://github.com/forcedotcom/schemas/issues).
