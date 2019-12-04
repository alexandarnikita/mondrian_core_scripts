'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.describe = exports.command = undefined;
exports.builder = builder;
exports.planify = planify;
exports.handler = handler;

var _config = require('../util/config');

var _retire = require('../util/retire');

var _retire2 = _interopRequireDefault(_retire);

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'security';

var describe = exports.describe = 'Scans dependencies for known vulnerabilities.';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(command)).epilogue('see Retire CLI options at https://github.com/RetireJS/retire.js');
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Scanning project for security issues', _retire2.default);

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}