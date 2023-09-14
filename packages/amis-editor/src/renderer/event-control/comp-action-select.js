"use strict";
/**
 * 组件专有动作选择器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_ACTION_PROPS = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var react_1 = tslib_1.__importDefault(require("react"));
// 动作基本配置项
exports.BASE_ACTION_PROPS = [
    'actionType',
    '__actionDesc',
    'preventDefault',
    'stopPropagation',
    'expression'
    // 'outputVar'
];
var CmptActionSelect = /** @class */ (function (_super) {
    tslib_1.__extends(CmptActionSelect, _super);
    function CmptActionSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CmptActionSelect.prototype.onChange = function (option) {
        var formStore = this.props.formStore;
        var removeKeys = {};
        // 保留必须字段，其他过滤掉
        Object.keys(formStore.data).forEach(function (key) {
            if (!tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(exports.BASE_ACTION_PROPS), false), [
                'componentId',
                '__rendererName',
                '__cmptTreeSource'
            ], false).includes(key)) {
                removeKeys[key] = undefined;
            }
        });
        formStore.setValues(tslib_1.__assign(tslib_1.__assign({}, removeKeys), { args: undefined, groupType: option.value, __cmptActionDesc: option.description }));
        this.props.onChange(option.value);
    };
    CmptActionSelect.prototype.render = function () {
        var _a = this.props, data = _a.data, formStore = _a.formStore;
        // 根据type 从组件树中获取actions
        var actions = data.pluginActions[data.__rendererName] || [];
        return (react_1.default.createElement(amis_1.Select, { value: formStore.data.groupType, className: "cmpt-action-select", options: actions.map(function (item) { return ({
                label: item.actionLabel,
                value: item.actionType,
                description: item.description
            }); }), onChange: this.onChange.bind(this), clearable: false }));
    };
    return CmptActionSelect;
}(react_1.default.Component));
exports.default = CmptActionSelect;
