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

var _jest = require('../util/jest');

var _jest2 = _interopRequireDefault(_jest);

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'test';

var describe = exports.describe = 'Runs unit tests.';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(command)).epilogue('see Jest CLI options at http://facebook.github.io/jest/docs/en/cli.html');
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Cleaning previous report', function () {
        return _cli.clean.coverage().then(function () {
            return process.stdout.write('Test reports cleaned!\n');
        });
    });

    plan.step('Testing your project', _jest2.default);

    return plan;
}
function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}