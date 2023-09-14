"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexSettingControlRenderer = void 0;
var tslib_1 = require("tslib");
/**
 * @file icon按钮组
 */
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var ButtonGroupControl_1 = tslib_1.__importDefault(require("./ButtonGroupControl"));
var directionText = {
    'row': ['左对齐', '右对齐', '顶部对齐', '底部对齐'],
    'column': ['顶部对齐', '底部对齐', '左对齐', '右对齐'],
    'row-reverse': ['右对齐', '左对齐', '顶部对齐', '底部对齐'],
    'column-reverse': ['底部对齐', '顶部对齐', '左对齐', '右对齐']
};
var scaleX = {
    'row': '',
    'column': 'scaleX-90',
    'row-reverse': 'scaleX-180',
    'column-reverse': 'scaleX-270'
};
var scaleY = {
    'row': '',
    'column': 'scaleX-270',
    'row-reverse': '',
    'column-reverse': 'scaleX-270'
};
var getFlexItem = function (props) {
    var value = props.value, direction = props.direction, justify = props.justify, alignItems = props.alignItems;
    var curDirection = (value === null || value === void 0 ? void 0 : value.flexDirection) || direction || 'row';
    var isColumn = curDirection === 'column' || curDirection === 'column-reverse';
    // 主轴排列方向
    var directionItemOptions = [
        {
            label: '水平方向',
            value: 'row',
            icon: 'drow'
        },
        {
            label: '垂直方向',
            value: 'column',
            icon: 'dcolumn'
        },
        {
            label: '水平反向',
            value: 'row-reverse',
            icon: 'drowReverse',
            iconClassName: 'scaleX-180'
        },
        {
            label: '垂直反向',
            value: 'column-reverse',
            icon: 'dcolumnReverse',
            iconClassName: 'scaleX-180'
        }
    ];
    // 主轴排列方式
    var justifyItemsOptions = [
        {
            label: directionText[curDirection][0],
            value: 'flex-start',
            icon: 'jFlexStart',
            iconClassName: scaleX[curDirection]
        },
        {
            label: isColumn ? '垂直居中' : '水平居中',
            value: 'center',
            icon: 'jCenter',
            iconClassName: scaleX[curDirection]
        },
        {
            label: directionText[curDirection][1],
            value: 'flex-end',
            icon: 'jFlexEnd',
            iconClassName: scaleX[curDirection]
        },
        {
            label: '两端对齐',
            value: 'space-between',
            icon: 'jSpaceBetween',
            iconClassName: scaleX[curDirection]
        },
        {
            label: '间隔分布',
            value: 'space-around',
            icon: 'jSpaceAround',
            iconClassName: scaleX[curDirection]
        }
    ];
    // 交叉轴排列方式
    var alignItemsOptions = [
        {
            label: directionText[curDirection][2],
            value: 'flex-start',
            icon: 'aFlexStart',
            iconClassName: scaleY[curDirection]
        },
        {
            label: isColumn ? '水平居中' : '垂直居中',
            value: 'center',
            icon: 'aCenter',
            iconClassName: scaleY[curDirection]
        },
        {
            label: directionText[curDirection][3],
            value: 'flex-end',
            icon: 'aFlexEnd',
            iconClassName: scaleY[curDirection]
        },
        {
            label: '基线对齐',
            value: 'baseline',
            icon: 'aBaseline',
            iconClassName: scaleY[curDirection]
        },
        {
            label: isColumn ? '水平铺开' : '高度撑满',
            value: 'stretch',
            icon: 'aStretch',
            iconClassName: isColumn ? 'scaleX-90' : ''
        }
    ];
    var flexItems = [
        {
            field: 'flexDirection',
            options: directionItemOptions,
            default: direction || 'row'
        },
        {
            field: 'justifyContent',
            options: justifyItemsOptions,
            default: justify || 'flex-start'
        },
        {
            field: 'alignItems',
            options: alignItemsOptions,
            default: alignItems || 'stretch'
        }
    ];
    return flexItems;
};
var FlexSettingControl = /** @class */ (function (_super) {
    tslib_1.__extends(FlexSettingControl, _super);
    function FlexSettingControl(props) {
        return _super.call(this, props) || this;
    }
    FlexSettingControl.prototype.setField = function (field) {
        var _a = this.props, value = _a.value, onChange = _a.onChange;
        return function (val) {
            var _a;
            onChange(tslib_1.__assign(tslib_1.__assign({}, value), (_a = {}, _a[field] = val, _a)));
        };
    };
    FlexSettingControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, label = _a.label, rest = tslib_1.__rest(_a, ["value", "label"]);
        var flexItems = getFlexItem(this.props);
        return (react_1.default.createElement("div", { className: "ap-Flex" },
            !label && react_1.default.createElement("div", { className: "ap-Flex-label" }, "\u5F39\u6027\u5E03\u5C40\u8BBE\u7F6E"),
            flexItems.map(function (item) { return (react_1.default.createElement("div", { className: "ap-Flex-item ap-Flex-".concat(item.field), key: item.field },
                react_1.default.createElement(ButtonGroupControl_1.default, tslib_1.__assign({}, rest, { options: item.options, value: (value === null || value === void 0 ? void 0 : value[item.field]) || item.default, onChange: _this.setField(item.field) })))); })));
    };
    return FlexSettingControl;
}(react_1.default.Component));
exports.default = FlexSettingControl;
var FlexSettingControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(FlexSettingControlRenderer, _super);
    function FlexSettingControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlexSettingControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'flex-layout-setting'
        })
    ], FlexSettingControlRenderer);
    return FlexSettingControlRenderer;
}(FlexSettingControl));
exports.FlexSettingControlRenderer = FlexSettingControlRenderer;
