export type MetadataRegistry = {
  types: TypeIndex;
  suffixes: SuffixIndex;
  strictDirectoryNames: {
    [directoryName: string]: string;
  };
  childTypes: {
    [childTypeId: string]: string;
  };
};

type SuffixIndex = {
  [suffix: string]: string;
};

type TypeIndex = {
  [typeId: string]: {
    id: string;
    name: string;
    directoryName: string;
    suffix?: string;
    strictDirectoryName?: boolean;
    ignoreParsedFullName?: boolean;
    folderContentType?: string;
    folderType?: string;
    xmlElementName?: string;
    uniqueIdElement?: string;
    isAddressable?: boolean;
    unaddressableWithoutParent?: boolean;
    supportsWildcardAndName?: boolean;
    supportsPartialDelete?: boolean;
    aliasFor?: string;
    children?: {
      types: TypeIndex;
      suffixes: SuffixIndex;
      directories?: DirectoryIndex;
    };
    strategies?: {
      adapter:
        | "mixedContent"
        | "matchingContentFile"
        | "decomposed"
        | "bundle"
        | "default";
      transformer?:
        | "decomposed"
        | "staticResource"
        | "standard";
      decomposition?: "topLevel" | "folderPerType";
    };
  };
};

type DirectoryIndex = {
  [directoryName: string]: string;
};
