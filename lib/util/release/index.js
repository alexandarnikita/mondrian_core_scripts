'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReleaseCommand = undefined;

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _dedent = require('dedent');

var _dedent2 = _interopRequireDefault(_dedent);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _git = require('../git');

var _git2 = _interopRequireDefault(_git);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _output = require('../output');

var _output2 = _interopRequireDefault(_output);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _yargsUnparser = require('yargs-unparser');

var _yargsUnparser2 = _interopRequireDefault(_yargsUnparser);

var _writePkg = require('write-pkg');

var _writePkg2 = _interopRequireDefault(_writePkg);

var _prompt = require('./prompt');

var _cli = require('../cli');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RECOMMEND_CLI = require.resolve('conventional-recommended-bump/cli');
var CHANGELOG_CLI = require.resolve('conventional-changelog-cli/cli');
var CHANGELOG_NAME = 'CHANGELOG.md';
var README_ERROR_MESSAGE = 'ERROR: No README data found!';

var ReleaseCommand = exports.ReleaseCommand = function () {
    function ReleaseCommand() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$pkg = _ref.pkg,
            pkg = _ref$pkg === undefined ? {} : _ref$pkg,
            _ref$packages = _ref.packages,
            packages = _ref$packages === undefined ? [] : _ref$packages,
            _ref$options = _ref.options,
            options = _ref$options === undefined ? {} : _ref$options;

        _classCallCheck(this, ReleaseCommand);

        this.execOptions = { cwd: process.cwd() };
        this.options = options;
        this.pkg = _extends({}, packages[0], {
            package: pkg
        });
    }

    _createClass(ReleaseCommand, [{
        key: 'execute',
        value: function execute() {
            var recommendedVersion = this.options.npmTag || this.getRecommendedVersion();

            return this.confirmVersion(recommendedVersion).then(function (answer) {
                if (!answer) {
                    throw new Error('Publish command was aborted since the version could not be confirmed.');
                }

                return recommendedVersion;
            }).then(this.updatePackage.bind(this));
        }
    }, {
        key: 'getRecommendedVersion',
        value: function getRecommendedVersion() {
            var recommendedVersion = (0, _cli.execSync)(process.execPath, [RECOMMEND_CLI, '--commit-path', this.pkg.location, '-p', 'angular'], this.execOptions);

            return _semver2.default.inc(this.pkg.version, recommendedVersion);
        }
    }, {
        key: 'confirmVersion',
        value: function confirmVersion(recommendedVersion) {
            if (this.options.yes) {
                return Promise.resolve(true);
            }

            _output2.default.log((0, _dedent2.default)('Changes:\n\n             - ' + this.pkg.name + ': ' + this.pkg.version + ' => ' + recommendedVersion));
            _output2.default.log(_os2.default.EOL);

            return (0, _prompt.confirm)('Are you sure you want to add the above changes to this release?');
        }
    }, {
        key: 'getPackageJsonLocation',
        value: function getPackageJsonLocation() {
            return _path2.default.join(this.pkg.location);
        }
    }, {
        key: 'getChangelogLocation',
        value: function getChangelogLocation() {
            return _path2.default.join(this.pkg.location, CHANGELOG_NAME);
        }
    }, {
        key: 'getChangelogContents',
        value: function getChangelogContents() {
            var changelogLocation = this.getChangelogLocation();

            if (!_fs2.default.existsSync(changelogLocation)) {
                return '';
            }

            var contents = _fs2.default.readFileSync(changelogLocation, 'utf8').trim();

            // Remove the header of the CHANGELOG.md by checking the entries which start with `<a name=`.
            return contents.indexOf('<a name=') !== -1 ? contents.substring(contents.indexOf('<a name=')) : contents;
        }
    }, {
        key: 'ensureEndsWithNewLine',
        value: function ensureEndsWithNewLine(string) {
            return (/\n$/.test(string) ? string : string + '\n'
            );
        }
    }, {
        key: 'getChangelogHeader',
        value: function getChangelogHeader() {
            return (0, _dedent2.default)('# Change Log\n            All notable changes to this project will be documented in this file.\n            See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.');
        }
    }, {
        key: 'updateChangelog',
        value: function updateChangelog() {
            var changelogLocation = this.getChangelogLocation();
            var packageJsonLocation = this.getPackageJsonLocation();
            var changelogContents = this.getChangelogContents();
            var header = this.getChangelogHeader();
            var newEntry = (0, _cli.execSync)(process.execPath, [CHANGELOG_CLI, '--commit-path', this.pkg.location, '--pkg', packageJsonLocation, '-p', 'angular'], this.execOptions);

            var output = this.ensureEndsWithNewLine((0, _dedent2.default)((header + '\n            ' + newEntry + '\n            ' + changelogContents).replace(/\n+$/, '\n')));

            _fs2.default.writeFileSync(changelogLocation, output);
        }
    }, {
        key: 'updatePackage',
        value: function updatePackage(version) {
            var _this = this;

            var packageJsonLocation = this.getPackageJsonLocation();
            var changelogLocation = this.getChangelogLocation();
            var currentBranch = _git2.default.getCurrentBranch(this.execOptions);
            var _options$gitRemote = this.options.gitRemote,
                gitRemote = _options$gitRemote === undefined ? 'origin' : _options$gitRemote;


            this.pkg.package.version = version;

            var ignoredFields = this.pkg.package.readme !== README_ERROR_MESSAGE ? ['_id'] : ['_id', 'readme'];

            _output2.default.info('Updating package.json...');

            _writePkg2.default.sync(packageJsonLocation, (0, _omit3.default)(this.pkg.package, ignoredFields));

            _output2.default.info('Updating CHANGELOG.md...');

            this.updateChangelog();

            _output2.default.info('Adding package.json and CHANGELOG.md...');

            return _git2.default.add([packageJsonLocation, changelogLocation]).then(function () {
                var tag = 'v' + version;
                var message = _this.options.message && _this.options.message.replace(/%s/g, tag) || 'Publish';

                _output2.default.info('Committing changes with message - "' + _chalk2.default.bold(message) + '"...');

                return Promise.all([tag, _git2.default.commit(message)]);
            }).then(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 1),
                    tag = _ref3[0];

                _output2.default.info('Creating tag ' + _chalk2.default.bold(tag) + '...');

                return _git2.default.addTag(tag);
            }).then(function () {
                _output2.default.info('Pushing to remote repository...');

                return _git2.default.push(gitRemote, currentBranch);
            }).then(function () {
                return _git2.default.pushTags(gitRemote);
            }).then(function () {
                var options = _extends({
                    cwd: _this.pkg.location
                }, _this.options.registry ? { npm_config_registry: _this.options.registry } : {});

                var distTag = _this.options.npmTag || 'latest';

                _output2.default.info('Publishing changes to npm...');

                return (0, _cli.exec)('npm', ['publish', '--tag', distTag.trim()], options);
            }).then(function () {
                _output2.default.success((0, _dedent2.default)('The following package was successfully published:\n\n                     - ' + _chalk2.default.bold(_this.pkg.name + '@' + version) + '\n                '));
            });
        }
    }]);

    return ReleaseCommand;
}();

exports.default = function (data) {
    if ((0, _get3.default)(data, 'options.lerna')) {
        var argv = (0, _omit3.default)(data.options, _constants.GLOBAL_CLI_OPTIONS);
        var args = (0, _yargsUnparser2.default)(argv).slice(1);

        return (0, _cli.exec)('lerna', ['publish'].concat(_toConsumableArray(args)), { cwd: process.cwd() });
    }

    if (process.env.npm_lifecycle_event === 'publish') {
        // eslint-disable-line camelcase
        var error = new Error((0, _dedent2.default)('This command cannot be run with "npm publish".\n            It looks like you are trying to run this command using the "npm publish" script on a "non-lerna" repository.\n            We recommend to rename the \'publish\' script name on your package.json to \'release\' instead.\n        '));

        return Promise.reject(error);
    }

    var command = new ReleaseCommand(data);

    return command.execute();
};