export type Replacements = {
  replaceWhenEnv?: Array<EnvConditional>;
} & WhereToReplace &
  WhatToReplace &
  ReplaceWith;

type WhereToReplace =
  | { filename: string; glob?: never }
  | { glob: string; filename?: never };

type WhatToReplace =
  | {
      stringToReplace: string;
      regexToReplace?: never;
    }
  | { regexToReplace: string; stringToReplace?: never };

type ReplaceWith =
  | {
      replaceWithFile: string;
      replaceWithEnv?: never;
    }
  | {
      replaceWithEnv: string;
      replaceWithFile?: never;
      allowUnsetEnvVariable?: boolean;
    };

type EnvConditional = {
  env: string;
  value: string;
};
