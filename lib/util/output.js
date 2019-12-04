'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = function log(color) {
    return function (message) {
        process.stdout.write(['' + color(message), _os2.default.EOL].join(''));
    };
};

exports.default = {
    error: log(_chalk2.default.red),
    info: log(_chalk2.default.cyan),
    log: log(_chalk2.default.white),
    success: log(_chalk2.default.green),
    warn: log(_chalk2.default.yellow)
};
module.exports = exports['default'];