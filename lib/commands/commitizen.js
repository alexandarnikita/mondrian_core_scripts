'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.describe = exports.command = undefined;
exports.builder = builder;
exports.planify = planify;
exports.handler = handler;

var _config = require('../util/config');

var _commitizen = require('../util/commitizen');

var _commitizen2 = _interopRequireDefault(_commitizen);

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'commitizen';

var describe = exports.describe = 'Simple commit conventions for internet citizens.';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(command)).epilogue('See commitizen CLI options at http://commitizen.github.io/cz-cli/');
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Running commitizen', _commitizen2.default);

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: false });
}