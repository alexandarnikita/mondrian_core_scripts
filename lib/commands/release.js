'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.command = undefined;
exports.builder = builder;
exports.planify = planify;
exports.handler = handler;

var _config = require('../util/config');

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

var _release = require('../util/release');

var _release2 = _interopRequireDefault(_release);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'release';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(command)).option('git-remote', {
        default: 'origin',
        describe: 'Push git changes to the specified remote instead of \'origin\'.',
        type: 'string'
    }).option('message', {
        describe: 'Use a custom commit message when creating the release commit.',
        type: 'string'
    }).option('yes', {
        default: undefined,
        describe: 'Skip all confirmation prompts.',
        type: 'boolean'
    }).option('registry', {
        default: undefined,
        describe: 'Push git changes to the specified remote instead of \'origin\'.',
        type: 'string'
    }).option('npm-tag', {
        describe: 'Publish packages with the specified npm dist-tag',
        type: 'string'
    }).option('conventional-commits', {
        default: true,
        describe: 'Use angular conventional-commit format to determine version bump and generate CHANGELOG.',
        type: 'boolean'
    });
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Creating a new release', _release2.default);

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}