'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Paths used to output built files
var BUILD_PATHS = exports.BUILD_PATHS = ['lib', 'es'];

// Path used to output test coverage information
var COVERAGE_PATH = exports.COVERAGE_PATH = 'coverage';

// Default path used to find source files
var SOURCE_PATH = exports.SOURCE_PATH = 'src';

// Key used to find the source path
var SOURCE_KEY = exports.SOURCE_KEY = 'source';

// Used to remove CLI options from the argv to pass it to another executable, e.g.: jest
var GLOBAL_CLI_OPTIONS = exports.GLOBAL_CLI_OPTIONS = ['reporter', 'lerna', 'version', 'v', 'help', 'h', 'scope', 'ignore'];