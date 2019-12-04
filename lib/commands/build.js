'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.describe = exports.command = undefined;
exports.builder = builder;
exports.planify = planify;
exports.handler = handler;

var _config = require('../util/config');

var _cli = require('../util/cli');

var _babel = require('../util/babel');

var _babel2 = _interopRequireDefault(_babel);

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'build';

var describe = exports.describe = 'Builds project for production.';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(command)).option('es', {
        type: 'boolean',
        default: true,
        describe: 'Compile ES modules.'
    }).option('copy', {
        type: 'boolean',
        default: false,
        describe: 'Copy files that will not be compiled.'
    });
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Cleaning previous build', _cli.clean.packages);

    plan.step('Building project files', _babel2.default);

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}