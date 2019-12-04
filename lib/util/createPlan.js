'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createPlan;

var _planify = require('planify');

var _planify2 = _interopRequireDefault(_planify);

var _strategy = require('./strategy');

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPlan(argv) {
    var strategy = (0, _strategy2.default)(argv);

    return (0, _planify2.default)({
        pkg: strategy.pkg,
        packages: strategy.packages,
        projects: strategy.projects,
        options: argv
    });
}
module.exports = exports['default'];