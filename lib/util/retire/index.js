'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = retire;

var _cli = require('../cli');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function retire() {
    // Resolve required configurations
    var retireignore = require.resolve('./retireignore.json');
    var options = ['--ignorefile', retireignore].concat(_toConsumableArray(process.argv.slice(3)));

    return (0, _cli.exec)('retire', options);
}
module.exports = exports['default'];