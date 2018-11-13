const schema = require("./project-scratch-def.schema.json");
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

describe("project-stract-def.json", () => {
  test(
    "minimum configuration is valid",
    testFile("./examples/simple.json", true)
  );
  test(
    "simple configuration is valid",
    testFile("./examples/simple.json", true)
  );
  test(
    "deprecated orgPreferences option is valid",
    testFile("./examples/orgPrefs.json", true)
  );
  test(
    "deprecated orgPreferences option with settings is invalid",
    testFile("./examples/orgPrefs-with-settings-invalid.json", false)
  );
  test(
    "template pilot property option is valid",
    testFile("./examples/with-template.json", false)
  );
});
