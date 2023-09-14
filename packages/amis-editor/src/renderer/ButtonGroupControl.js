"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroupControlRenderer = void 0;
var tslib_1 = require("tslib");
/**
 * @file icon按钮组
 */
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var ButtonGroupControl = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroupControl, _super);
    function ButtonGroupControl(props) {
        return _super.call(this, props) || this;
    }
    ButtonGroupControl.prototype.render = function () {
        var _a = this.props, options = _a.options, value = _a.value, onChange = _a.onChange, classnames = _a.classnames;
        var cls = classnames || classnames_1.default;
        return (react_1.default.createElement("div", { className: cls('ButtonGroup', 'icon-ButtonList') }, options &&
            options.map(function (item) { return (react_1.default.createElement(amis_1.Button, { key: item.value, onClick: function () { return onChange(item.value); }, level: value === item.value ? 'primary' : 'default', tooltip: item.label, active: value === item.value }, (0, amis_1.hasIcon)(item.icon) ? (react_1.default.createElement(amis_1.Icon, { icon: item.icon, className: (0, classnames_1.default)('icon', item.iconClassName) })) : item.icon ? (react_1.default.createElement("i", { className: (0, classnames_1.default)(item.icon, item.iconClassName) })) : (item.label))); })));
    };
    return ButtonGroupControl;
}(react_1.default.Component));
exports.default = ButtonGroupControl;
var ButtonGroupControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroupControlRenderer, _super);
    function ButtonGroupControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'icon-button-group'
        })
    ], ButtonGroupControlRenderer);
    return ButtonGroupControlRenderer;
}(ButtonGroupControl));
exports.ButtonGroupControlRenderer = ButtonGroupControlRenderer;
