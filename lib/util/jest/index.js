'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = jest;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _yargsUnparser = require('yargs-unparser');

var _yargsUnparser2 = _interopRequireDefault(_yargsUnparser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _cli = require('../cli');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jest(data) {
    var argv = (0, _omit2.default)(data.options, _constants.GLOBAL_CLI_OPTIONS);

    // If no --config/--c was specified, install our own config
    if (!argv.config && !argv.c) {
        argv.config = JSON.stringify((0, _config2.default)(data));
    }

    var args = (0, _yargsUnparser2.default)(argv).slice(1);

    return (0, _cli.exec)('jest', args).then(function () {
        var coverageFile = _path2.default.join(_constants.COVERAGE_PATH, 'lcov-report/index.html');

        if (_fs2.default.existsSync(coverageFile)) {
            process.stdout.write('\nYou may open ' + _chalk2.default.bold(coverageFile) + ' to see the coverage analysis.\n');
        }
    }).catch(function (err) {
        err.detail = 'Test result contain errors, please fix them and run them again.';
        throw err;
    });
}
module.exports = exports['default'];