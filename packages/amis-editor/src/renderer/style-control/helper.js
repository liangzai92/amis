"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputStateFunc = exports.inputStateTpl = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var inputStateTpl = function (className, path) {
    if (path === void 0) { path = ''; }
    return tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([
        {
            type: 'select',
            name: 'editorState',
            label: '状态',
            selectFirst: true,
            options: [
                {
                    label: '常规',
                    value: 'default'
                },
                {
                    label: '悬浮',
                    value: 'hover'
                },
                {
                    label: '点击',
                    value: 'active'
                }
            ]
        }
    ], tslib_1.__read((0, exports.inputStateFunc)("${editorState == 'default' || !editorState}", 'default', className, path)), false), tslib_1.__read((0, exports.inputStateFunc)("${editorState == 'hover'}", 'hover', className, path)), false), tslib_1.__read((0, exports.inputStateFunc)("${editorState == 'active'}", 'active', className, path)), false);
};
exports.inputStateTpl = inputStateTpl;
var inputStateFunc = function (visibleOn, state, className, path, options) {
    if (options === void 0) { options = []; }
    return tslib_1.__spreadArray([
        (0, amis_editor_core_1.getSchemaTpl)('theme:font', {
            label: '文字',
            name: "".concat(className, ".font:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.font")
        }),
        (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
            label: '背景',
            name: "".concat(className, ".background:").concat(state),
            labelMode: 'input',
            needGradient: true,
            needImage: true,
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.bg-color")
        }),
        (0, amis_editor_core_1.getSchemaTpl)('theme:border', {
            name: "".concat(className, ".border:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.border")
        }),
        (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
            name: "".concat(className, ".padding-and-margin:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.padding-and-margin")
        }),
        (0, amis_editor_core_1.getSchemaTpl)('theme:radius', {
            name: "".concat(className, ".radius:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.border")
        })
    ], tslib_1.__read(options), false);
};
exports.inputStateFunc = inputStateFunc;
