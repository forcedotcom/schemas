const fs = require("fs");
const path = require("path");
const schemas = require("../schemas");
const Ajv = require("ajv");

function testFile(path, validate, shouldValidate) {
  return async () => {
    let data = require(path);
    let result = await validate(data);

    if (shouldValidate && !result) {
      console.log(validate.errors);
    }
    expect(result).toBe(shouldValidate);
  };
}

for (const schema of Object.keys(schemas)) {
  const schemaPath = schemas[schema];
  const examplePath = path.join(__dirname, "..", "examples", schema);
  const examples = fs.readdirSync(examplePath);

  if (examples && examples.length) {
    const ajv = new Ajv();
    const validate = ajv.compile(require(schemaPath));

    describe(`${schema} example`, () => {
      for (const example of examples) {
        test(
          `${example}`,
          testFile(
            path.join(examplePath, example),
            validate,
            !example.includes("invalid")
          )
        );
      }
    });
  } else {
    process.stderr(`Warning! No examples for ${schema}`);
  }
}
