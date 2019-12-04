'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cli = require('./cli');

var _simpleGit = require('./simpleGit');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    add: function add(files) {
        return new Promise(function (resolve, reject) {
            _simpleGit2.default.add(files, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    },
    addTag: function addTag(tag) {
        return new Promise(function (resolve, reject) {
            _simpleGit2.default.addTag(tag, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    },
    commit: function commit(message) {
        return new Promise(function (resolve, reject) {
            _simpleGit2.default.commit(message, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    },
    getCurrentBranch: function getCurrentBranch(options) {
        return (0, _cli.execSync)('git', ['rev-parse', '--abbrev-ref', 'HEAD'], options);
    },
    push: function push(remote, branch, options) {
        return new Promise(function (resolve, reject) {
            _simpleGit2.default.push(remote, branch, options, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    },
    pushTags: function pushTags(remote, options) {
        return new Promise(function (resolve, reject) {
            _simpleGit2.default.pushTags(remote, options, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
};
module.exports = exports['default'];