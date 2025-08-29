/*
 * Copyright (c) 2025, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Represents an entry in a package bundle, containing version and descriptive information.
 */
export type BundleEntry = {
  /**
   * The name of the bundle.
   * @title Bundle Name
   */
  name: string;

  /**
   * Human readable name for the version.
   * @title Version Name
   */
  versionName: string;

  /**
   * The version number in the format major.minor (e.g., 1.0).
   * @title Version Number
   */
  versionNumber: string;

  /**
   * Human readable version information, format not specified.
   * @title Version Description
   */
  versionDescription?: string;
} 