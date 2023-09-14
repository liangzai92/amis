"use strict";
/**
 * @file 边框圆角
 * @description 边框 & 圆角设置
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorderRenderer = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importStar(require("react"));
var camelCase_1 = tslib_1.__importDefault(require("lodash/camelCase"));
var mobx_react_1 = require("mobx-react");
var amis_1 = require("amis");
var borderItems = [
    {
        item: 'left',
        tip: '左边框',
        content: '┣'
    },
    {
        item: 'top',
        tip: '上边框',
        content: '┳'
    },
    {
        item: 'right',
        tip: '右边框',
        content: '┫'
    },
    {
        item: 'bottom',
        tip: '下边框',
        content: '┻'
    },
    {
        item: 'all',
        tip: '全部',
        content: '╋'
    }
];
var radiusItems = [
    {
        item: 'top-left',
        tip: '左上角',
        content: '┏'
    },
    {
        item: 'top-right',
        tip: '右上角',
        content: '┓'
    },
    {
        item: 'bottom-left',
        tip: '左下角',
        content: '┗'
    },
    {
        item: 'bottom-right',
        tip: '右下角',
        content: '┛'
    },
    {
        item: 'all',
        tip: '全部',
        content: '╋'
    }
];
function BoxBorder(_a) {
    var _b = _a.disableBorder, disableBorder = _b === void 0 ? false : _b, _c = _a.disableRadius, disableRadius = _c === void 0 ? false : _c, onChange = _a.onChange, _d = _a.value, value = _d === void 0 ? {} : _d, render = _a.render;
    var _e = tslib_1.__read((0, react_1.useState)('all'), 2), borderItem = _e[0], setBorderItem = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)('all'), 2), radiusItem = _f[0], setRadiusItem = _f[1];
    function getKey(type, field) {
        var activeItem = field === 'radius' ? radiusItem : borderItem;
        // TODO: 获取全部的时候应该判断是否所有值都相等，不相等的话返回空或者返回组合提示？
        if (activeItem === 'all') {
            return field === 'radius'
                ? (0, camelCase_1.default)("".concat(type, "-top-left-").concat(field))
                : (0, camelCase_1.default)("".concat(type, "-left-").concat(field));
        }
        return (0, camelCase_1.default)("".concat(type, "-").concat(activeItem, "-").concat(field));
    }
    function changeItem(type, key) {
        return function (e) {
            var _a;
            var val = (e === null || e === void 0 ? void 0 : e.value) || e;
            var field = getKey(type, key);
            var isRadius = key === 'radius';
            var activeItem = isRadius ? radiusItem : borderItem;
            if (activeItem === 'all') {
                var newValue_1 = {};
                // 过滤掉all
                var items = (isRadius ? radiusItems : borderItems).filter(function (position) { return (position === null || position === void 0 ? void 0 : position.item) !== 'all'; });
                items.forEach(function (item) {
                    var itemKey = (0, camelCase_1.default)("".concat(type, "-").concat(item.item, "-").concat(key));
                    newValue_1[itemKey] = val;
                });
                onChange(tslib_1.__assign(tslib_1.__assign({}, value), newValue_1));
            }
            else {
                onChange(tslib_1.__assign(tslib_1.__assign({}, value), (_a = {}, _a[field] = val, _a)));
            }
        };
    }
    function renderRadius() {
        return (react_1.default.createElement("div", { className: "ae-border-wrap ae-border-radius flex items-center" },
            react_1.default.createElement("div", { className: "ae-border-items" }, radiusItems.map(function (item) {
                var valueKey = (0, camelCase_1.default)("border-".concat(item.item));
                return (react_1.default.createElement("div", { key: valueKey, className: (0, classnames_1.default)("ae-border-item ".concat(item.item), {
                        active: radiusItem === item.item
                    }), onClick: function () { return setRadiusItem(item.item); } },
                    react_1.default.createElement("span", { "data-tooltip": item.tip, "data-position": "top" }, item.content)));
            })),
            react_1.default.createElement("div", { className: "ae-border-settings" },
                react_1.default.createElement("div", { className: "flex items-center" },
                    react_1.default.createElement("label", null, "\u5706\u89D2"),
                    react_1.default.createElement(amis_1.NumberInput, { placeholder: "\u5706\u89D2\u5C3A\u5BF8", value: value[getKey('border', 'radius')], step: 1, min: 0, onChange: changeItem('border', 'radius') })))));
    }
    function renderBorder() {
        return (react_1.default.createElement("div", { className: "ae-border-wrap flex flex-top mb-2" },
            react_1.default.createElement("div", { className: "ae-border-items" }, borderItems.map(function (item) {
                var valueKey = (0, camelCase_1.default)("border-".concat(item.item));
                return (react_1.default.createElement("div", { key: valueKey, className: (0, classnames_1.default)("ae-border-item ".concat(item.item), {
                        active: borderItem === item.item
                    }), onClick: function () { return setBorderItem(item.item); } },
                    react_1.default.createElement("span", { "data-tooltip": item.tip, "data-position": "top" }, item.content)));
            })),
            react_1.default.createElement("div", { className: "ae-border-settings" },
                react_1.default.createElement("div", { className: "flex items-center" },
                    react_1.default.createElement("label", null, "\u7EBF\u5F62"),
                    react_1.default.createElement(amis_1.Select, { className: "ae-border-input", placeholder: "\u8FB9\u6846\u7EBF\u578B", onChange: changeItem('border', 'style'), value: value[getKey('border', 'style')], options: [
                            {
                                label: '无',
                                value: 'none'
                            },
                            {
                                label: '实线',
                                value: 'solid'
                            },
                            {
                                label: '点线',
                                value: 'dotted'
                            },
                            {
                                label: '虚线',
                                value: 'dashed'
                            }
                        ] })),
                react_1.default.createElement("div", { className: "flex items-center" },
                    react_1.default.createElement("label", null, "\u7EBF\u5BBD"),
                    react_1.default.createElement(amis_1.NumberInput, { placeholder: "\u8FB9\u6846\u5BBD\u5EA6", value: value[getKey('border', 'width')], step: 1, min: 0, onChange: changeItem('border', 'width') })),
                react_1.default.createElement("div", { className: "flex items-center" },
                    react_1.default.createElement("label", null, "\u989C\u8272"),
                    render('color', {
                        type: 'input-color',
                        placeholder: '边框颜色',
                        clearable: true,
                        value: value[getKey('border', 'color')],
                        inputClassName: 'ae-border-colorpicker',
                        label: false
                    }, {
                        onChange: changeItem('border', 'color')
                    })))));
    }
    return (react_1.default.createElement("div", { className: "p-2 ae-border" },
        !disableBorder && renderBorder(),
        !disableRadius && renderRadius()));
}
exports.default = (0, mobx_react_1.observer)(BoxBorder);
var BorderRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(BorderRenderer, _super);
    function BorderRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BorderRenderer.prototype.render = function () {
        return react_1.default.createElement(BoxBorder, tslib_1.__assign({}, this.props));
    };
    BorderRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'style-border', renderLabel: false })
    ], BorderRenderer);
    return BorderRenderer;
}(react_1.default.Component));
exports.BorderRenderer = BorderRenderer;
