'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staged = exports.stylelint = exports.eslint = undefined;

var _eslint = require('./eslint');

Object.defineProperty(exports, 'eslint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_eslint).default;
  }
});

var _stylelint = require('./stylelint');

Object.defineProperty(exports, 'stylelint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stylelint).default;
  }
});

var _staged = require('./staged');

var staged = _interopRequireWildcard(_staged);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.staged = staged;