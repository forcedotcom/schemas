const schema = require("./sfdx-project.schema.json");
const Ajv = require("ajv");

const ajv = new Ajv();
var validate = ajv.compile(schema);

function testFile(path, shouldValidate) {
  return async () => {
    let data = require(path);
    let result = validate(data);
    expect(result === shouldValidate);
  };
}

describe("sfdx-project.json", () => {
  test("minimum configuration is valid", testFile("./examples/min.json", true));
  test(
    "default configuration is valid",
    testFile("./examples/default.json", true)
  );
  test(
    "package config is valid",
    testFile("./examples/package-basic.json", true)
  );
  test(
    "package without versionNumber is invalid",
    testFile("./examples/package-no-versionNumber-invalid.json", false)
  );
});
