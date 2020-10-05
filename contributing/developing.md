# Developing

## Get Started

1. Clone the repository, and `cd` into it.

```sh
git clone git@github.com:forcedotcom/schemas.git
```

2. Ensure you have [NodeJS](https://nodejs.org/) installed and run the following to build:

```
npm install
```

## Branches

- Our released (aka. _production_) branch is `main`.
- Our work happens in _topic_ branches (feature and/or bug-fix).
  - feature as well as bug-fix branches are based on `main`
    - _Topic_ branches can live in forks (external contributors) or within this repository (committers).
      \*\* When creating _topic_ branches in this repository please prefix with `<developer-name>/`.
  - branches _should_ be kept up-to-date using `rebase`
  - see below for further merge instructions

### Merging between branches

- We try to limit merge commits as much as possible.

  - They are usually only ok when done by our release automation.

- _Topic_ branches are:

  1. based on `main` and will be
  1. squash-merged into `main`.

- Hot-fix branches are an exception.
  - Instead we aim for faster cycles and a generally stable `main` branch.

### Making Pull Requests

Take a look at [CONTRIBUTING](../CONTRIBUTING.md) doc for making and merging pull requests.

## Testing

Run the following to test library and plugin:

```sh
npm test
```

If you are using VS Code for development, the following launch configurations are available: "Run All Tests", "Run Current Test", "Run Current Test Without Compile". Have `"debug.javascript.usePreview": true` in your user setting enabled so you can utilize [`vscode-js-debug`](https://github.com/microsoft/vscode-js-debug) debugger. This setting is enabled by default in VS Code version 1.47.
