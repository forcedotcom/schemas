const schema = require("./project-scratch-def.schema.json");
const Ajv = require("ajv");

const ajv = new Ajv({});
var validate = ajv.compile(schema);

function testFile(path, shouldValidate) {
  return async () => {
    let data = require(path);
    let result = await validate(data);
    expect(result).toBe(shouldValidate);
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
  test("custom field is valid", testFile("./examples/with-custom.json", true));
  test("settings is valid", testFile("./examples/with-settings.json", true));
  test(
    "template pilot property option is valid",
    testFile("./examples/with-template.json", true)
  );
  test(
    "features not in enum are valid",
    testFile("./examples/features-not-in-schema.json", false)
  );
  test(
    "with orgPreferenceSetting is valid",
    testFile("./examples/with-orgPreferenceSetting.json", true)
  );
});
