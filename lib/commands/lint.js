'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.describe = exports.command = undefined;
exports.builder = builder;
exports.planify = planify;
exports.handler = handler;

var _optionalRequire = require('optional-require');

var _optionalRequire2 = _interopRequireDefault(_optionalRequire);

var _config = require('../util/config');

var _linter = require('../util/linter');

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

var _constants = require('../util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var command = exports.command = 'lint';

var describe = exports.describe = 'Runs ESLint and Stylelint.';

function builder(yargs) {
    return yargs.strict().config((0, _config.getConfig)(command)).option('ignore-pattern', {
        type: 'array',
        default: [],
        describe: 'Specify patterns of files to ignore.'
    }).option('fix', {
        type: 'boolean',
        default: true,
        describe: 'Automatically fix problems.'
    }).option('staged', {
        type: 'boolean',
        default: false,
        describe: 'Lint only git staged files (useful to use as a pre-commit hook)'
    }).check(function (argv) {
        var _argv$ignorePattern;

        // Add built-in ignore patterns as well as the ones passed through --ignore-pattern
        (_argv$ignorePattern = argv.ignorePattern).unshift.apply(_argv$ignorePattern, [_constants.COVERAGE_PATH].concat(_toConsumableArray(_constants.BUILD_PATHS)));

        return true;
    });
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    // Gather which files are staged if --staged is enabled
    if (argv.staged) {
        plan.step('Gathering staged files', _linter.staged.gatherFiles);
    }

    // Run eslint
    plan.step('Running eslint', _linter.eslint);

    // Run stylelint step if it is installed
    if ((0, _optionalRequire2.default)(require)('stylelint')) {
        plan.step('Running stylelint', _linter.stylelint);
    }

    // Re-add files to git if --fix is enabled because the file contents might have changed
    if (argv.staged && argv.fix) {
        plan.step('Re-adding staged files', _linter.staged.reAddFiles);
    }

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}