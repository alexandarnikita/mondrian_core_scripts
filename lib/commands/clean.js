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

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'clean';

var describe = exports.describe = 'Clean generated files.';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(command)).option('deps', {
        type: 'boolean',
        default: true,
        describe: 'Remove dependencies (node_modules)'
    });
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Cleaning files', _cli.clean.all);

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}