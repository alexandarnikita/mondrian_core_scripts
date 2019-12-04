'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gatherFiles = gatherFiles;
exports.reAddFiles = reAddFiles;

var _stagedGitFiles = require('staged-git-files');

var _stagedGitFiles2 = _interopRequireDefault(_stagedGitFiles);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _git = require('../git');

var _git2 = _interopRequireDefault(_git);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gatherFiles(_ref) {
    var options = _ref.options;

    return (0, _pify2.default)(_stagedGitFiles2.default)('ACM').then(function (files) {
        options.files = files.map(function (file) {
            return file.filename;
        });

        process.stdout.write('A total of ' + options.files.length + ' files were detected.\n');
    });
}

function reAddFiles(_ref2) {
    var options = _ref2.options;

    return _git2.default.add(options.files).then(function () {
        return process.stdout.write('The staged files were re-added to git.\n');
    });
}