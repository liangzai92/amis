"use strict";
/**
 * @file  BoxModel
 * @description 盒模型控件，支持编辑 margin & padding
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxModelRenderer = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importDefault(require("react"));
var mobx_react_1 = require("mobx-react");
var camelCase_1 = tslib_1.__importDefault(require("lodash/camelCase"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var util_1 = require("../../util");
function BoxModel(_a) {
    var value = _a.value, onChange = _a.onChange;
    var directions = ['left', 'right', 'top', 'bottom'];
    function handleChange(styleName) {
        return function (e) {
            var _a, _b;
            var inputValue = e.target.value;
            if (!inputValue) {
                onChange(tslib_1.__assign(tslib_1.__assign({}, value), (_a = {}, _a[styleName] = undefined, _a)));
                return;
            }
            // 数字类型或带有合法单位的字符串都支持
            if ((0, amis_editor_core_1.isNumeric)(inputValue) ||
                (0, util_1.isAuto)(inputValue) ||
                /^(-?(\d*\.)?\d+)((px)|(em)|(%)|(ex)|(ch)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(cm)|(mm)|(in)|(pt)|(pc))$/.test(inputValue)) {
                onChange(tslib_1.__assign(tslib_1.__assign({}, value), (_b = {}, _b[styleName] = inputValue, _b)));
            }
        };
    }
    function renderBoxItem(item) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            directions.map(function (direction) {
                var propsName = (0, camelCase_1.default)("".concat(item, "-").concat(direction));
                return (react_1.default.createElement("input", { key: propsName, placeholder: "0", className: "ae-BoxModel-input ".concat(direction), type: "text", onChange: handleChange(propsName), value: (value === null || value === void 0 ? void 0 : value[propsName]) || '' }));
            }),
            react_1.default.createElement("div", { className: "ae-BoxModel-title" }, item.toUpperCase()),
            ['lt', 'lb', 'rt', 'rb'].map(function (position) { return (react_1.default.createElement("div", { key: position, className: (0, classnames_1.default)('ae-BoxModel-line', position) })); })));
    }
    return (react_1.default.createElement("div", { className: "mx-2 ae-BoxModel" },
        react_1.default.createElement("div", { className: "ae-BoxModel-inner" },
            react_1.default.createElement("div", { className: "ae-BoxModel" },
                react_1.default.createElement("div", { className: "ae-BoxModel-inner" }),
                renderBoxItem('padding'))),
        renderBoxItem('margin')));
}
exports.default = (0, mobx_react_1.observer)(BoxModel);
var BoxModelRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(BoxModelRenderer, _super);
    function BoxModelRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxModelRenderer.prototype.render = function () {
        return react_1.default.createElement(BoxModel, tslib_1.__assign({}, this.props));
    };
    BoxModelRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'style-box-model' })
    ], BoxModelRenderer);
    return BoxModelRenderer;
}(react_1.default.Component));
exports.BoxModelRenderer = BoxModelRenderer;
