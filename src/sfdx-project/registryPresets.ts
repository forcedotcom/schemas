// ideally it will be strict to the files in https://github.com/forcedotcom/source-deploy-retrieve/tree/main/src/registry/presets
import { z } from "zod";

export const RegistryPresetsSchema = z.array(z.string());

export type RegistryPresets = z.infer<typeof RegistryPresetsSchema>;
