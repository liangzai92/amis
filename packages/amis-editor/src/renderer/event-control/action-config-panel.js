"use strict";
/**
 * 动作配置面板
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var helper_1 = require("./helper");
var ActionConfigPanel = /** @class */ (function (_super) {
    tslib_1.__extends(ActionConfigPanel, _super);
    function ActionConfigPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionConfigPanel.prototype.render = function () {
        var _a, _b, _c, _d;
        var _e = this.props, data = _e.data, onBulkChange = _e.onBulkChange, render = _e.render, pluginActions = _e.pluginActions, actionConfigItemsMap = _e.actionConfigItemsMap;
        var actionType = data.__subActions ? data.groupType : data.actionType;
        var commonActionConfig = tslib_1.__assign(tslib_1.__assign({}, helper_1.COMMON_ACTION_SCHEMA_MAP), actionConfigItemsMap);
        var schema = null;
        if (data.actionType === 'component') {
            // 获取组件动作配置
            var subActionSchema = (_c = (_b = (_a = pluginActions === null || pluginActions === void 0 ? void 0 : pluginActions[data.__rendererName]) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.actionType === data.groupType; })) === null || _b === void 0 ? void 0 : _b.schema) !== null && _c !== void 0 ? _c : (_d = commonActionConfig[data.groupType]) === null || _d === void 0 ? void 0 : _d.schema;
            var baseSchema = (0, helper_1.renderCmptActionSelect)('选择组件', true);
            // 追加到基础配置
            schema = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((Array.isArray(baseSchema) ? baseSchema : [baseSchema])), false), tslib_1.__read((Array.isArray(subActionSchema)
                ? subActionSchema
                : [subActionSchema])), false);
        }
        else {
            schema = data.__actionSchema;
        }
        return schema ? (render('inner', schema, {
            data: data
        })) : data.__subActions ? (react_1.default.createElement(react_1.default.Fragment, null)) : (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-event-control-action-placeholder', {
                'no-settings': actionType
            }) },
            react_1.default.createElement("div", { className: "ae-event-control-action-placeholder-img" }),
            react_1.default.createElement("span", null, actionType ? '无配置内容' : '请选择执行动作')));
    };
    return ActionConfigPanel;
}(react_1.default.Component));
exports.default = ActionConfigPanel;
