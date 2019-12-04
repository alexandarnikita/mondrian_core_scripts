'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultStrategy = function (_BaseStrategy) {
    _inherits(DefaultStrategy, _BaseStrategy);

    function DefaultStrategy() {
        _classCallCheck(this, DefaultStrategy);

        return _possibleConstructorReturn(this, (DefaultStrategy.__proto__ || Object.getPrototypeOf(DefaultStrategy)).apply(this, arguments));
    }

    _createClass(DefaultStrategy, [{
        key: 'packages',
        get: function get() {
            var location = (0, _path.resolve)('.');
            var source = (0, _path.resolve)(location, this.pkg[_constants.SOURCE_KEY] ? (0, _path.dirname)(this.pkg[_constants.SOURCE_KEY]) : _constants.SOURCE_PATH);

            return [{
                name: this.pkg.name,
                version: this.pkg.version,
                private: !!this.pkg.private,
                source: (0, _path.relative)(location, source),
                path: '',
                location: location
            }];
        }
    }, {
        key: 'projects',
        get: function get() {
            return [];
        }
    }]);

    return DefaultStrategy;
}(_Base2.default);

exports.default = DefaultStrategy;
module.exports = exports['default'];