'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _readPkg = require('read-pkg');

var _readPkg2 = _interopRequireDefault(_readPkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseStrategy = function BaseStrategy(options) {
    _classCallCheck(this, BaseStrategy);

    this._options = options;

    try {
        this.pkg = _readPkg2.default.sync();
    } catch (err) {
        if (err.code === 'ENOENT') {
            err.detail = 'Expecting package.json in ' + process.cwd();
        }

        throw err;
    }
};

exports.default = BaseStrategy;
module.exports = exports['default'];