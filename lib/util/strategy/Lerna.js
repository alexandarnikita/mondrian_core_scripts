'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _Repository = require('lerna/lib/Repository');

var _Repository2 = _interopRequireDefault(_Repository);

var _PackageUtilities = require('lerna/lib/PackageUtilities');

var _PackageUtilities2 = _interopRequireDefault(_PackageUtilities);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LernaStrategy = function (_BaseStrategy) {
    _inherits(LernaStrategy, _BaseStrategy);

    function LernaStrategy(options) {
        _classCallCheck(this, LernaStrategy);

        var _this = _possibleConstructorReturn(this, (LernaStrategy.__proto__ || Object.getPrototypeOf(LernaStrategy)).call(this, options));

        _this._repo = new _Repository2.default();
        return _this;
    }

    _createClass(LernaStrategy, [{
        key: 'packages',
        get: function get() {
            var _this2 = this;

            var _repo = this._repo,
                rootPath = _repo.rootPath,
                packageConfigs = _repo.packageConfigs;

            var packages = _PackageUtilities2.default.getPackages({ rootPath: rootPath, packageConfigs: packageConfigs }).map(function (pkg) {
                var source = (0, _path.resolve)(pkg.location, pkg[_constants.SOURCE_KEY] ? (0, _path.dirname)(pkg[_constants.SOURCE_KEY]) : _constants.SOURCE_PATH);

                return {
                    name: pkg.name,
                    version: pkg.version,
                    private: !!pkg.private,
                    source: (0, _path.relative)(pkg.location, source),
                    path: (0, _path.relative)(_this2._repo.rootPath, pkg.location),
                    location: pkg.location
                };
            });

            return _PackageUtilities2.default.filterPackages(packages, {
                scope: this._options.scope,
                ignore: this._options.ignore
            });
        }
    }, {
        key: 'projects',
        get: function get() {
            return this.packages.map(function (pkg) {
                return (0, _path.dirname)(pkg.location);
            });
        }
    }]);

    return LernaStrategy;
}(_Base2.default);

exports.default = LernaStrategy;
module.exports = exports['default'];