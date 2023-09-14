"use strict";
/**
 * @file Font
 * @description 文字样式相关控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var mapValues_1 = tslib_1.__importDefault(require("lodash/mapValues"));
var amis_editor_core_1 = require("amis-editor-core");
var font_family_1 = require("./font-family");
var amis_editor_core_2 = require("amis-editor-core");
var amis_1 = require("amis");
var Font = function (props) {
    var _a, _b, _c, _d, _e;
    var value = props.value, onChange = props.onChange, render = props.render;
    var validProps = [
        'color',
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'textAlign',
        'letterSpacing',
        'lineHeight'
    ];
    var fontContext = (0, amis_editor_core_2.isObject)(value)
        ? tslib_1.__assign(tslib_1.__assign({}, (0, pick_1.default)(value, validProps)), { 
            /** textDecoration 特殊处理一下，因为可以同时选择多个value */
            underline: !!~((_a = value === null || value === void 0 ? void 0 : value.textDecoration) !== null && _a !== void 0 ? _a : '').indexOf('underline')
                ? 'underline'
                : undefined, lineThrough: !!~((_b = value === null || value === void 0 ? void 0 : value.textDecoration) !== null && _b !== void 0 ? _b : '').indexOf('line-through')
                ? 'line-through'
                : undefined }) : {};
    var handleSubmit = function (formValue, action) {
        onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, value), (0, mapValues_1.default)(tslib_1.__assign(tslib_1.__assign({}, (0, pick_1.default)(formValue, validProps)), { textDecoration: [formValue.underline, formValue.lineThrough]
                .filter(Boolean)
                .join(' '), letterSpacing: (0, amis_editor_core_2.string2CSSUnit)(formValue.letterSpacing), lineHeight: (0, amis_editor_core_2.string2CSSUnit)(formValue.lineHeight) }), function (props) { return props || undefined; })), { 
            // 字体需要特殊处理，支持设置为空string
            fontFamily: formValue.fontFamily }));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, render('inner', {
        type: 'form',
        wrapWithPanel: false,
        panelClassName: 'border-none shadow-none mb-0',
        bodyClassName: 'p-none',
        actionsClassName: 'border-none mt-2.5',
        wrapperComponent: 'div',
        preventEnterSubmit: true,
        submitOnChange: true,
        body: [
            {
                name: 'fontFamily',
                label: '字体类型',
                type: 'select',
                mode: 'row',
                size: 'md',
                placeholder: '请选择字体',
                menuTpl: '<div style="font-family: ${value};">${label}</div>',
                options: font_family_1.fontFamilyList,
                clearable: false,
                value: (_c = value === null || value === void 0 ? void 0 : value.fontFamily) !== null && _c !== void 0 ? _c : ''
            },
            {
                name: 'color',
                label: '字体颜色',
                type: 'input-color',
                mode: 'row',
                size: 'md',
                value: (_d = value === null || value === void 0 ? void 0 : value.color) !== null && _d !== void 0 ? _d : ''
            },
            {
                name: 'fontSize',
                label: '字体大小',
                type: 'input-range',
                max: 100,
                min: 12,
                step: 1,
                clearable: false,
                value: (_e = value === null || value === void 0 ? void 0 : value.fontSize) !== null && _e !== void 0 ? _e : 12
            },
            {
                type: 'input-group',
                name: 'input-group',
                label: '文字样式',
                mode: 'row',
                body: [
                    {
                        type: 'button-group-select',
                        name: 'fontWeight',
                        clearable: true,
                        label: false,
                        options: [
                            {
                                label: '',
                                value: 'bold',
                                icon: 'fa fa-bold',
                                className: 'ae-Font-group-lhs ae-Font-relative-left'
                            }
                        ]
                    },
                    {
                        type: 'button-group-select',
                        name: 'fontStyle',
                        clearable: true,
                        label: false,
                        options: [
                            {
                                label: '',
                                value: 'italic',
                                icon: 'fa fa-italic',
                                className: 'ae-Font-group-middle'
                            }
                        ]
                    },
                    {
                        type: 'button-group-select',
                        name: 'underline',
                        clearable: true,
                        label: false,
                        options: [
                            {
                                label: '',
                                value: 'underline',
                                icon: 'fa fa-underline',
                                className: 'ae-Font-group-middle ae-Font-relative-right'
                            }
                        ]
                    },
                    {
                        type: 'button-group-select',
                        name: 'lineThrough',
                        clearable: true,
                        label: false,
                        options: [
                            {
                                label: '',
                                value: 'line-through',
                                icon: 'fa fa-strikethrough',
                                className: 'ae-Font-group-rhs ae-Font-relative-right-2'
                            }
                        ]
                    }
                ]
            },
            // TODO: 添加'justify-all', 'start', 'end', 'match-parent'类型
            (0, amis_editor_core_1.getSchemaTpl)('layout:textAlign', {
                label: '文字位置',
                mode: 'row'
            }),
            {
                type: 'group',
                label: '文字排版',
                body: [
                    {
                        name: 'letterSpacing',
                        label: '',
                        type: 'input-text',
                        addOn: {
                            className: 'ae-Font-group-lhs',
                            label: '',
                            type: 'text',
                            position: 'left',
                            icon: 'fa fa-text-width'
                        }
                    },
                    {
                        name: 'lineHeight',
                        label: '',
                        type: 'input-text',
                        addOn: {
                            className: 'ae-Font-group-lhs',
                            label: '',
                            type: 'text',
                            position: 'left',
                            icon: 'fa fa-text-height'
                        }
                    }
                ]
            }
        ]
    }, {
        data: fontContext,
        onSubmit: handleSubmit
    })));
};
exports.default = Font;
var FontRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(FontRenderer, _super);
    function FontRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FontRenderer.prototype.render = function () {
        return react_1.default.createElement(Font, tslib_1.__assign({}, this.props));
    };
    FontRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'style-font', renderLabel: false })
    ], FontRenderer);
    return FontRenderer;
}(react_1.default.Component));
exports.FontRenderer = FontRenderer;
