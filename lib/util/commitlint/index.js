'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = commitlint;

var _cli = require('../cli');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function commitlint() {
    var cliPath = _path2.default.resolve(process.cwd(), 'node_modules/.bin/commitlint');
    var args = ['-e'].concat(_toConsumableArray(process.argv.slice(3)), ['-x', '@mondrian/commitlint-config']);

    return (0, _cli.exec)(cliPath, args);
}
module.exports = exports['default'];