'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.describe = exports.command = undefined;
exports.builder = builder;
exports.planify = planify;
exports.handler = handler;

var _path = require('path');

var _config = require('../util/config');

var _cli = require('../util/cli');

var _createPlan = require('../util/createPlan');

var _createPlan2 = _interopRequireDefault(_createPlan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cmd = 'rm';

var command = exports.command = cmd + ' <path..>';

var describe = exports.describe = 'Remove files and directories.';

function builder(yargs) {
    return yargs.config((0, _config.getConfig)(cmd));
}

function planify(argv) {
    var plan = (0, _createPlan2.default)(argv);

    plan.step('Removing files', function (_ref) {
        var packages = _ref.packages,
            options = _ref.options;

        var extraArgs = process.argv.slice(options.path.length + 3);

        return Promise.all(packages.reduce(function (promises, _ref2) {
            var name = _ref2.name,
                location = _ref2.location;

            var args = [].concat(_toConsumableArray(options.path.map(function (path) {
                return (0, _path.resolve)(location, path);
            })), _toConsumableArray(extraArgs));

            promises.push((0, _cli.remove)(args).then(function () {
                return process.stdout.write(name + ' \'' + options.path.join('\', \'') + '\' removed!\n');
            }));

            return promises;
        }, []));
    });

    return plan;
}

function handler(argv) {
    return planify(argv).run({ reporter: argv.reporter, exit: true });
}