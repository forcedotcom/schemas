// Export TypeScript types (inferred from Zod schemas)
export { ProjectJson } from "./sfdx-project/sfdxProjectJson";
export { BundleEntry } from "./sfdx-project/bundleEntry";
export {
  PackageDir,
  PackageDirDependency,
  PackagePackageDir,
} from "./sfdx-project/packageDir";
export { ScratchOrgDef } from "./project-scratch-def/scratchOrgDef";
export { Features } from "./project-scratch-def/features";
export { Settings } from "./project-scratch-def/settings";

// Export Zod schemas for runtime validation
export { ProjectJsonSchema } from "./sfdx-project/sfdxProjectJson";
export { BundleEntrySchema } from "./sfdx-project/bundleEntry";
export {
  PackageDirSchema,
  PackageDirDependencySchema,
} from "./sfdx-project/packageDir";
export { ReplacementsSchema } from "./sfdx-project/replacements";
export { RegistryPresetsSchema } from "./sfdx-project/registryPresets";
export { MetadataRegistrySchema } from "./sfdx-project/registryVariants";
export { ScratchOrgDefSchema } from "./project-scratch-def/scratchOrgDef";
export { FeaturesSchema } from "./project-scratch-def/features";
export { SettingsSchema } from "./project-scratch-def/settings";

// preferred: direct json exports
import projectSchema from "../sfdx-project.schema.json";
import scratchDefSchema from "../project-scratch-def.schema.json";

export { projectSchema, scratchDefSchema };
// Maintain backwards compatibility with dynamic exports
export {
  projectSchema as "sfdx-project",
  scratchDefSchema as "project-scratch-def",
};
