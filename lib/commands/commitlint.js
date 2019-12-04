'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.describe = exports.command = undefined;
exports.builder = builder;
exports.planify = planify;
exports.handler = handler;

var _config = require('../util/config');

var _commitlint = require('../util/commitlint');

var _commitlint2 = _interopRequireDefault(_commitlint);

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'commitlint';

var describe = exports.describe = 'Lint commit messages.';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(command)).epilogue('see commitlint CLI options at http://marionebl.github.io/commitlint/#/reference-cli');
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Linting commit message', _commitlint2.default);

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}