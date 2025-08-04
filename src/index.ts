import fs from "node:fs";
import path from "node:path";

export { ProjectJson } from "./sfdx-project/sfdxProjectJson";
export {
  PackageDir,
  PackageDirDependency,
  PackagePackageDir
} from "./sfdx-project/packageDir";

/** TS really doesn't want us to export things with hyphens.  I tried to statically export the 2 top-level json files
 * but that was throwing compiler errors.  So I kept the original code from index.js to dynamically find and export the schemas.
 */
const schemas = fs
  .readdirSync(__dirname)
  .filter(filename => filename.endsWith("schema.json"));

for (const schema of schemas) {
  exports[path.basename(schema, ".schema.json")] = path.resolve(
    path.join(__dirname, schema)
  );
}
