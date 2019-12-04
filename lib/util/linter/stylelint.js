'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stylelint;

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _cli = require('../cli');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pattern = '**/*.+(css|less|scss)';

function stylelint(_ref) {
    var options = _ref.options;

    // Start by adding the input files
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
    options.ignorePattern.forEach(function (path) {
        args.push('--ignore-pattern', path);
    });

    return (0, _cli.exec)('stylelint', args).then(function () {
        return process.stdout.write('All files are valid!\n');
    }).catch(function (err) {
        switch (err.code) {
            case 78:
                err.detail = 'If you do not need stylelint, please uninstall it from your project to get rid of this error.';
                break;
            default:
                err.detail = 'stylelint result contains errors, please fix them and run them again.';
        }

        throw err;
    });
}
module.exports = exports['default'];