'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eslint;

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _cli = require('../cli');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pattern = '**/*.js';

function eslint(_ref) {
    var options = _ref.options;

    var args = !options.files ? [pattern] : options.files.filter(_minimatch2.default.filter(pattern));

    // Skip if there are no files
    if (!args.length) {
        process.stdout.write('No files to lint.\n');

        return Promise.resolve();
    }

    // Enable autofix if option was passed
    if (options.fix) {
        args.push('--fix');
    }

    // Add ignore patterns to args
    options.ignorePattern.forEach(function (pattern) {
        args.push('--ignore-pattern', pattern);
    });

    return (0, _cli.exec)('eslint', args).then(function () {
        return process.stdout.write('All files are valid!\n');
    }).catch(function (err) {
        err.detail = 'eslint result contains errors, please fix them and run them again.';
        throw err;
    });
}
module.exports = exports['default'];