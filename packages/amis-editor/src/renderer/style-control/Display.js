"use strict";
/**
 * @file Display
 * @description 布局展示相关控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var mapValues_1 = tslib_1.__importDefault(require("lodash/mapValues"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var Display = function (props) {
    var onChange = props.onChange, value = props.value, render = props.render;
    // 下拉菜单通用渲染
    var menuTpl = {
        type: 'html',
        html: "<span>${label}</span><code class='ae-Code'>${value}</code>",
        className: 'ae-selection-code'
    };
    var displayContext = (0, pick_1.default)((0, amis_editor_core_1.isObject)(value) ? value : {}, [
        'display',
        'flexWrap',
        'flexDirection',
        'justifyContent',
        'alignItems'
    ]);
    if (!displayContext.display) {
        displayContext.display = 'default';
    }
    var handleSubmit = function (form, action) {
        var displayValue = form.display === 'flex'
            ? form
            : (0, mapValues_1.default)(displayContext, function (value, key) {
                // 非flex布局/默认布局需要把不相关的参数干掉
                return key !== 'display' || (key === 'display' && form[key] === 'default')
                    ? undefined
                    : form[key];
            });
        onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__assign(tslib_1.__assign({}, value), displayValue));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, render('inner', {
        type: 'form',
        wrapWithPanel: false,
        panelClassName: 'border-none shadow-none mb-0',
        bodyClassName: 'p-none',
        actionsClassName: 'border-none mt-2.5',
        wrapperComponent: 'div',
        formLazyChange: true,
        preventEnterSubmit: true,
        submitOnChange: true,
        body: [
            {
                label: '显示类型',
                name: 'display',
                type: 'select',
                mode: 'row',
                menuTpl: menuTpl,
                options: [
                    {
                        label: '默认',
                        value: 'default'
                    },
                    {
                        label: '区块',
                        icon: 'display-block',
                        value: 'block'
                    },
                    {
                        label: '行内区块',
                        icon: 'display-inline-block',
                        value: 'inline-block'
                    },
                    {
                        label: '行内元素',
                        icon: 'display-inline',
                        value: 'inline'
                    },
                    {
                        label: '弹性布局',
                        icon: 'display-flex',
                        value: 'flex'
                    }
                ]
            },
            {
                type: 'wrapper',
                visibleOn: "this.display === 'flex'",
                className: 'ae-Display-group',
                body: [
                    {
                        type: 'tpl',
                        tpl: '弹性布局配置',
                        className: 'text-base font-bold mb-1'
                    },
                    {
                        label: '自动换行',
                        name: 'flexWrap',
                        type: 'switch',
                        trueValue: 'wrap',
                        falseValue: 'nowrap',
                        mode: 'row',
                        inputClassName: 'inline-flex justify-between flex-row-reverse',
                        clearValueOnHidden: true
                    },
                    {
                        label: '主轴方向',
                        name: 'flexDirection',
                        type: 'select',
                        clearValueOnHidden: true,
                        menuTpl: menuTpl,
                        options: [
                            {
                                label: '默认水平',
                                value: 'row',
                                icon: 'drow'
                            },
                            {
                                label: '默认垂直',
                                value: 'column',
                                icon: 'dcolumn'
                            },
                            {
                                label: '水平反向',
                                value: 'row-reverse',
                                icon: 'drowReverse'
                            },
                            {
                                label: '垂直反向',
                                value: 'column-reverse',
                                icon: 'dcolumnReverse'
                            }
                        ]
                    },
                    {
                        label: '主轴对齐方式',
                        type: 'select',
                        name: 'justifyContent',
                        clearValueOnHidden: true,
                        menuTpl: menuTpl,
                        options: [
                            {
                                label: '起始端对齐',
                                value: 'flex-start'
                            },
                            {
                                label: '居中对齐',
                                value: 'center'
                            },
                            {
                                label: '末尾端对齐',
                                value: 'flex-end'
                            },
                            {
                                label: '首尾留空',
                                value: 'space-around'
                            },
                            {
                                label: '首尾对齐',
                                value: 'space-between'
                            },
                            {
                                label: '元素等间距',
                                value: 'space-evenly'
                            },
                            {
                                label: '自动拉伸',
                                value: 'stretch'
                            }
                        ]
                    },
                    {
                        label: '交叉轴对齐方式',
                        type: 'select',
                        name: 'alignItems',
                        clearValueOnHidden: true,
                        menuTpl: menuTpl,
                        options: [
                            {
                                label: '起始端对齐',
                                value: 'flex-start'
                            },
                            {
                                label: '居中对齐',
                                value: 'center'
                            },
                            {
                                label: '末尾端对齐',
                                value: 'flex-end'
                            },
                            {
                                label: '基线对齐',
                                value: 'baseline'
                            },
                            {
                                label: '自动拉伸',
                                value: 'stretch'
                            }
                        ]
                    }
                ]
            }
        ]
    }, {
        data: displayContext,
        onSubmit: handleSubmit
    })));
};
var DisplayRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DisplayRenderer, _super);
    function DisplayRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DisplayRenderer.prototype.render = function () {
        return react_1.default.createElement(Display, tslib_1.__assign({}, this.props));
    };
    DisplayRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'style-display' })
    ], DisplayRenderer);
    return DisplayRenderer;
}(react_1.default.Component));
exports.default = DisplayRenderer;
