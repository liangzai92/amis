"use strict";
/**
 * @file 阴影
 * @description 阴影配置
 * @grammar
 * x偏移量 | y偏移量 | 阴影颜色
 * x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色
 * 插页(阴影向内) | x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxShadowRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mapValues_1 = tslib_1.__importDefault(require("lodash/mapValues"));
var amis_1 = require("amis");
var transformation_1 = require("./transformation");
function BoxShadow(_a) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, onChange = _a.onChange, render = _a.render;
    var boxShadowContext = (0, mapValues_1.default)((0, transformation_1.parseBoxShadow)(typeof value !== 'string' ? '' : value), function (value, key, collection) {
        return key === 'color' || key === 'inset' ? value : { length: value, unit: 'px' };
    });
    // style-box-shadow组件name需要具体指定，比如style.boxShadow，否则取不到值
    var handleSubmit = function (formValue, action) {
        onChange === null || onChange === void 0 ? void 0 : onChange((0, transformation_1.normalizeBoxShadow)(formValue).boxShadow);
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
        body: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read([
            {
                name: 'X轴偏移量',
                field: 'x'
            },
            {
                name: 'Y轴偏移量',
                field: 'y'
            },
            {
                name: '模糊半径',
                field: 'blur'
            },
            {
                name: '扩散半径',
                field: 'spread'
            }
        ].map(function (item) { return ({
            type: 'combo',
            name: item.field,
            label: item.name,
            formClassName: 'ae-BoxShadow-group',
            items: [
                {
                    type: 'input-range',
                    label: false,
                    name: 'length',
                    max: 120,
                    min: 0,
                    step: 1
                },
                {
                    type: 'select',
                    label: false,
                    name: 'unit',
                    columnClassName: 'ae-BoxShadow-unit',
                    size: 'xs',
                    options: ['px']
                    // TODO: 暂时先支持px
                    // options: ['px', 'em', 'rem', 'vw', 'vh']
                }
            ]
        }); })), false), [
            {
                type: 'switch',
                name: 'inset',
                label: '内阴影',
                mode: 'row',
                inputClassName: 'inline-flex justify-between flex-row-reverse'
            },
            {
                type: 'input-color',
                name: 'color',
                label: '阴影颜色',
                placeholder: '设置阴影颜色',
                mode: 'row'
            }
        ], false)
    }, {
        data: boxShadowContext,
        onSubmit: handleSubmit
    })));
}
exports.default = BoxShadow;
var BoxShadowRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(BoxShadowRenderer, _super);
    function BoxShadowRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxShadowRenderer.prototype.render = function () {
        return react_1.default.createElement(BoxShadow, tslib_1.__assign({}, this.props));
    };
    BoxShadowRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'style-box-shadow' })
    ], BoxShadowRenderer);
    return BoxShadowRenderer;
}(react_1.default.Component));
exports.BoxShadowRenderer = BoxShadowRenderer;
