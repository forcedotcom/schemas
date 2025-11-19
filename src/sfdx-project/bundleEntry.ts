/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { z } from "zod";

/**
 * Represents an entry in a package bundle, containing version and descriptive information.
 */
export const BundleEntrySchema = z.object({
  name: z.string().describe("The name of the bundle."),
  versionName: z.string().describe("Human readable name for the version."),
  versionNumber: z
    .string()
    .regex(/^\d+\.\d+$/)
    .describe("The version number in the format major.minor (e.g., 1.0)."),
  versionDescription: z
    .string()
    .optional()
    .describe("Human readable version information, format not specified."),
});

export type BundleEntry = z.infer<typeof BundleEntrySchema>;
