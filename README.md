# core-scripts

This package includes configuration and scripts used to build components with [React](https://github.com/facebook/react).

## Motivation

There are lots of reasons to bring this project to life. I'm working on it...

## Installation and setup

1. `npm install --save-dev @mondrian/core-scripts`
1. Add appropriate configuration files:
    * `.babelrc` with [Babel](https://github.com/babel/babel) configuration;
    * `.eslintrc.json` with [ESLint](https://github.com/eslint/eslint) configuration;
    * `postcss.config.js` with [PostCSS](https://github.com/postcss/postcss) configuration (if your project have styles).
    * `commitlint.config.js` with [Commitlint](https://github.com/marionebl/commitlint) configuration:

    ```js
    module.exports = {
        extends: [
            '@commitlint/config-angular',
            '@commitlint/config-lerna-scopes',
        ],
    };
    ```

1. Update your `package.json` like this:

    ```json
    {
      "scripts": {
        "build": "core-scripts build",
        "clean": "core-scripts clean",
        "commit-helper": "core-scripts commitizen",
        "commitmsg": "core-scripts commitlint",
        "lint": "core-scripts lint",
        "precommit": "npm run lint -- --staged",
        "prerelease": "npm run lint && npm t && npm run build",
        "release": "core-scripts release",
        "security": "core-scripts security",
        "test": "core-scripts test"
      }
    }
    ```

## Commands

### core-scripts build

```sh
core-scripts build
```

Builds the project for production.

It runs two times for the following environments:
* `cjs` for tools that work with CommonJS such as Node.js and Webpack.
* `es` for ES6-aware tools like Rollup and Webpack 2.

`core-scripts build` respects the `--lerna` and `--reporter` options.

#### --no-es

```sh
core-scripts build --no-es
```

This flag tells `build` to ignore ES compilation.

#### --copy

```sh
core-scripts build --copy
```

This flag tells `build` to copy files that will not be compiled.

### core-scripts clean

```sh
core-scripts clean
```

Cleans generated files by the other commands as well as dependencies (`node_modules`).

`core-scripts clean` respects the `--lerna` and `--reporter` options.

#### --no-deps

```sh
core-scripts lint --no-deps
```

This flag tells `clean` to not remove dependencies (node_modules).

### core-scripts lint

```sh
core-scripts lint
```

Runs ESLint and Stylelint.

`core-scripts lint` respects the `--lerna` and `--reporter` options.

#### --staged

```sh
core-scripts lint --staged
```

Lint only git staged files. This is useful to only lint the files that we are committing through a git `precommit` hook.

#### --no-fix

```sh
core-scripts lint --no-fix
```

This flag tells `lint` to not automatically fix any problems.

### core-scripts rm

```sh
core-scripts rm <path> [<path> ...]
```

Removes files and directories.

`core-scripts rm` respects the `--lerna` and `--reporter` options.

### core-scripts security

```sh
core-scripts security
```

Scan the project for use of vulnerable JavaScript libraries and/or Node.JS modules.

See [Retire CLI](https://github.com/RetireJS/retire.js) for available options.

`core-scripts security` respects the `--lerna` and `--reporter` options.

### core-scripts test

```sh
core-scripts test
```

Runs all tests.

See [Jest CLI](http://facebook.github.io/jest/docs/en/cli.html) for available options.  
Additionally you may create a `jest` object in your [package.json](https://facebook.github.io/jest/docs/configuration.html) file which will be merged with the built-in [config](./src/util/jest/config.js).
If you specify a `--config` on your own, it will be used instead of the built-in one.

`core-scripts test` respects the `--lerna` and `--reporter` options.

### core-scripts commitizen

```sh
core-scripts commitzen
```

Runs commitizen, a commit message helper to follow conventional commits guidelines.

See [commitizen](http://commitizen.github.io/cz-cli/) and [conventional commits](https://conventionalcommits.org/).

### core-scripts commitlint

```sh
core-scripts commitlint
```

Runs on every `git commit` on the `commitmsg` hook to lint the message according to conventional commits guidelines.

See [commitlint](http://marionebl.github.io/commitlint/#/)

### core-scripts release

```sh
core-scripts release
```

Publishes packages in the current project. Without the `--lerna` option, this command does the following:
    1. Creates a new release.
    2. Prompts for a new version.
    3. Creates a new git commit/tag in the process of publishing to npm.

`core-scripts release` respects the `--lerna` and `--reporter` options.

## Options

The options can come from configuration (`.corescriptsrc.json`) or on the command line. Additionally options in config can live at the top level or may be applied to specific commands.

Example:

```json
{
    "lerna": true,
    "reporter": "spec",
    "command": {
        "clean": {
            "reporter": "progress",
        }
    },
}
```

In this case `reporter` will be "spec" for all commands except `clean`, where it will be "progress". In all cases it may be overridden to "spinner" on the command-line with --reporter=spinner.

#### --lerna

When run a command with this flag, `core-scripts` will look for project as a Lerna repo. Its default value is `true` if `lerna.json` exists and `false` otherwise.

```sh
core-scripts <command> --lerna
```

#### --reporter

Wen run a command with this flag, `core-scripts` will output with the given reporter.

```sh
core-scripts <command> --reporter=spec
```


## Node library

If you want to access to internal commands, you can import `core-scripts` to your project.

```javascript
import { commands } from '@mondrian/core-scripts';
```

Then, each command module is structured like the following example:

```javascript
const { command, describe, builder, handler, planify } = commands.lint;
```

All of those properties are related to how yargs constructs commands, except `planify` which allows you to compose handlers.

## Tests

In the near future, you can run `npm test` and see tests running.

## License

UNLICENSED
