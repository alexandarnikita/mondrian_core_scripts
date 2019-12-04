'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transformStylesPath = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _babelCore = require('babel-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveModulePath(filename) {
    var dir = _path2.default.dirname(filename);

    if (_path2.default.isAbsolute(dir)) {
        return dir;
    }

    if (process.env.PWD) {
        return _path2.default.resolve(process.env.PWD, dir);
    }

    return _path2.default.resolve(dir);
}

function transformStylesPath(config) {
    var srcPath = config.srcPath,
        styles = config.styles;


    return function (_ref) {
        var t = _ref.types;
        return {
            visitor: {
                CallExpression: function CallExpression(tree, _ref2) {
                    var file = _ref2.file;

                    var extensions = ['.css'];

                    var _tree$node = tree.node,
                        calleeName = _tree$node.callee.name,
                        args = _tree$node.arguments;


                    if (calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
                        return;
                    }

                    if (extensions.find(function (ext) {
                        return args[0].value.endsWith(ext);
                    })) {
                        var _args = _slicedToArray(args, 1),
                            filePath = _args[0].value;

                        if (!t.isVariableDeclarator(tree.parent)) {
                            throw new Error('Found empty import from ' + filePath + '.');
                        }

                        var modulePath = resolveModulePath(file.opts.filename);
                        var srcFilePath = _path2.default.resolve(modulePath, filePath);
                        var relativeFilePath = _path2.default.relative(srcPath, srcFilePath);

                        // Push styles paths to global array
                        // if it doesn't exist
                        if (!styles.filter(function (style) {
                            return style.srcFilePath === srcFilePath;
                        }).length) {
                            styles.push({
                                srcFilePath: srcFilePath,
                                relativeFilePath: relativeFilePath
                            });
                        }
                    }
                }
            }
        };
    };
}

function buildScript(config) {
    var srcPath = config.srcPath,
        outputPath = config.outputPath,
        babelConfig = config.babelConfig;


    return function (srcFilePath) {
        return new Promise(function (resolve) {
            var relativeFilePath = _path2.default.relative(srcPath, srcFilePath);
            var outputFilePath = _path2.default.resolve(outputPath, relativeFilePath);

            // Setup env option
            process.env.BABEL_ENV = babelConfig.env;

            // Transform file using .babelrc and the custom plugin for styles
            var data = (0, _babelCore.transformFileSync)(srcFilePath, babelConfig);

            resolve([{
                filename: outputFilePath,
                content: data.code
            }]);
        });
    };
}

exports.transformStylesPath = transformStylesPath;
exports.default = buildScript;