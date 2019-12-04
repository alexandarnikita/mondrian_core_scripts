'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Default = require('./Default');

var _Default2 = _interopRequireDefault(_Default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStrategy(options) {
    if (options.lerna) {
        // Lazy load lerna so that it remains trully optional
        return new (require('./Lerna'))(options); // eslint-disable-line global-require
    }

    return new _Default2.default(options);
}

exports.default = getStrategy;
module.exports = exports['default'];