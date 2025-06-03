/**
 *
 * Tips:
 * Use jsdoc comments to provide descriptions for your properties.
 * Use jsdoc tags to provide additional properties that TS doesn't (ex: title, minItems on an array)
 * '@comment' becomes $comment, not sure why
 */

/**
 * from packaging library.  Where does this go?
 * export type PackageDescriptorJson = Partial<NamedPackageDir> &
  Partial<{
    - id: string;
    - features: string[];
    - orgPreferences: string[];
    - snapshot: string;
    apexTestAccess: { permissionSets: string[] | string; permissionSetLicenses: string[] | string };
    - permissionSetNames: string[];
    - permissionSetLicenseDeveloperNames: string[];
    - branch: string;
    subscriberPackageVersionId: string;
    packageId: string;
    versionName: string;
    language?: string;
  }>;

  */

export type PackageDirDependency = {
  [k: string]: unknown;
  package: string;
  versionNumber?: string;
  branch?: string;
};

/** type required just for projects, regardless of 1gp/2gp package use */
type BasePackageDir = {
  /**
   * If you have specified more than one path, include this parameter for the default path to indicate which is the default package directory.
   * @title default
   * @default true
   */
  default?: boolean;
  /**
   * If you don’t specify a path, the Salesforce CLI uses a placeholder when you create a package.
   * @title Path
   */
  path: string;
};

/** has the "full" info used for packaging. */
export type PackagePackageDir = BasePackageDir & {
  /**
   * The ancestor that’s the immediate parent of the version that you’re creating. The package version ID to supply starts with '05i'.
   * @title Ancestor ID
   */
  ancestorId?: string;
  /**
   * The ancestor that’s the immediate parent of the version that you’re creating. The ancestor version uses the format major.minor.patch.build.
   * @title Ancestor Version
   */
  ancestorVersion?: string;

  /**
   * Additional access that should be granted to the user when running package Apex tests
   *
   */
  apexTestAccess?: {
    /**
     * The list of permission sets to enable while running Apex tests
     * @title Permission Sets
     */
    permissionSets: string[] | string;
    /**
     * The list of permission sets licenses to enable while running Apex tests
     * @title Permission Set Licenses
     */
    permissionSetLicenses: string[] | string;
  };

  /**
   * Reference an external .json file to specify the features and org preferences required for the metadata of your package, such as the scratch org definition.
   * @title Definition File
   */
  definitionFile?: string;
  /**
   * To specify dependencies for 2GP within the same Dev Hub, use either the package version alias or a combination of the package name and the version number.
   */
  dependencies?: PackageDirDependency[];
  /**
   * Whether to include <userLicense> elements in profile metadata. Defaults to false.
   * @title Include Profile User Licenses
   * @default false
   */
  includeProfileUserLicenses?: boolean;
  /**
   * The package name you specified when creating the package.
   * @title Package Identifier
   */
  package: string;
  /**
   * Additional access that should be granted to the user while deploying package metadata, available in Salesforce API version 61.0 and above
   * @title Package Metadata Access
   */
  packageMetadataAccess?: {
    /** The list of permission sets to enable while deploying package metadata
     * @title Permission Sets
     */
    permissionSets: string | string[];
    /**
     * The list of permission set licenses to enable while deploying package metadata
     * @title Permission Set Licenses
     */
    permissionSetLicenses: string | string[];
  };

  /**
   * The post install script.
   * @title Post Install Script
   */
  postInstallScript?: string;
  /**
   * The post install url.
   * @title Post Install Url
   */
  postInstallUrl?: string;
  /**
   * The release notes url.
   * @title Release Notes Url
   */
  releaseNotesUrl?: string;
  /**
   * Determines whether to include profile settings from only the directory being packaged (true), or whether to include profile settings from all package directories (false). If not specified, the default is false.
   * @title Scope Profiles
   * @default false
   */
  scopeProfiles?: boolean;
  /**
   * The uninstall script.
   * @title Uninstall Script
   */
  uninstallScript?: string;

  /**
   * Set to true if only specifing direct dependencies and the transitive (i.e., indirect) dependencies should be calculated by Salesforce.
   * @title Use Transitive Dependencies
   * @default false
   */
  useTransitiveDependencies?: boolean;

  /**
   * Human readable version information, format not specified.
   * @title Version Description
   */
  versionDescription?: string;
  /**
   * If not specified, the CLI uses versionNumber as the version name.
   * @title Version Name
   */
  versionName?: string;
  /**
   * Version numbers are formatted as major.minor.patch.build. For example, 1.2.1.8.
   * @title Version Number
   */
  versionNumber: string;
  /**
   * Metadata not meant to be packaged, but deployed when testing packaged metadata
   * @title Unpackaged Metadata
   */
  unpackagedMetadata?: {
    /**
     * The path name of the package directory containing the unpackaged metadata
     * @title Path
     */
    path: string;
  };
  /**
   * Metadata not meant to be packaged, but deployed before deploying packaged metadata
   * @title Seed Metadata
   *
   */
  seedMetadata?: {
    /**
     * The path name of the package directory containing the seed metadata
     * @title Path
     */
    path: string;
  };

  /**
   * @deprecated
   */
  functions?: string[];
};

export type PackageDir = BasePackageDir | PackagePackageDir;
