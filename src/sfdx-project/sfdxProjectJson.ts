import { PackageDir } from "./packageDir";
import { RegistryPresets } from "./registryPresets";
import { MetadataRegistry } from "./registryVariants";
import { Replacements } from "./replacements";

/**
 * The properties and shape of the SFDX project
 * @title Salesforce DX Project File
 */
export type ProjectJson = {
  /**
   * The name of your Salesforce project.
   * @title name
   */
  name?: string;
  /**
   * Package directories indicate which directories to target when syncing source to and from the scratch org. These directories can contain source from your managed package, unmanaged package, or unpackaged source, for example, ant tool or change set.
   * @title Package Directories
   * @comment The properties ancestorId & ancestorVersion cannot be included together, but this schema optimizes for VS Code code completion rather than pure validation.
   * @minItems 1
   */
  packageDirectories: PackageDir[];
  /**
   * A namespace is an alphanumeric identifier that distinguishes your package and its contents from other packages in your customer’s org. For steps on how to register a namespace and link it to your Dev Hub org, see Create and Register Your Namespace for Second-Generation Managed Packages on developer.salesforce.com. If you’re creating an unlocked package, you can create it without a namespace.
   * @title Namespace
   */
  namespace?: string;
  /**
   * The API version that the source is compatible with. By default it matches the API version.
   * @default '48.0'
   * @title Source API Version
   */
  sourceApiVersion?: string;
  /**
   * The login URL that the force:auth commands use. If not specified, the default is login.salesforce.com. Override the default value if you want users to authorize to a specific Salesforce instance. For example, if you want to authorize into a sandbox org, set this parameter to test.salesforce.com.
   * @title SFDC Login URL
   */
  sfdcLoginUrl?: string;
  /** The url that is used when creating new scratch orgs. This is typically only used for testing prerelease environments. */
  signupTargetLoginUrl?: string;
  /**
   * By default, the OAuth port is 1717. However, change this port if this port is already in use, and you plan to create a connected app in your Dev Hub org to support JWT-based authorization.
   * @default 1717
   */
  oauthLocalPort?: number;
  /**
   * Salesforce CLI plugin configurations used with this project.
   * @title CLI Plugins custom settings
   */
  plugins?: { [k: string]: unknown };

  /**
   * The Salesforce CLI updates this file with the aliases when you create a package or package version. You can also manually update this section for existing packages or package versions. You can use the alias instead of the cryptic package ID when running CLI force:package commands.
   * @title Aliases for packaging ids
   */
  packageAliases?: { [k: string]: string };
  /**
   * filenames from https://github.com/forcedotcom/source-deploy-retrieve/tree/main/src/registry/presets
   * @title Custom predefined presets for decomposing metadata types
   */
  registryPresets?: RegistryPresets;
  // TODO: does this belong here or in SDR?  This should be the simplified, "public" version of the registry props.  Only allow things we want people to do
  registryCustomizations?: MetadataRegistry;
  /**
   * The Salesforce CLI will conditionally replace portions of your metadata during a deployment"
   * @title Replacements for metadata that are executed during deployments"
   */
  replacements?: Replacements[];
};
