"use strict";
/**
 * @file 进行详细配置
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoConfigControlRenderer = exports.GoConfigControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_core_1 = require("amis-core");
var GoConfigControl = /** @class */ (function (_super) {
    tslib_1.__extends(GoConfigControl, _super);
    function GoConfigControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoConfigControl.prototype.onClick = function () {
        var _a = this.props, _b = _a.data, ctx = _b === void 0 ? {} : _b, compId = _a.compId, manager = _a.manager;
        var id = typeof compId === 'string' ? compId : compId(ctx);
        if (!id) {
            amis_1.toast.error('未找到对应组件');
            return;
        }
        manager.setActiveId(id);
    };
    GoConfigControl.prototype.render = function () {
        var _a = this.props, className = _a.className, label = _a.label, _b = _a.data, ctx = _b === void 0 ? {} : _b;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-GoConfig', className), onClick: this.onClick },
            label,
            react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-GoConfig-trigger') }, "\u53BB\u7F16\u8F91")));
    };
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GoConfigControl.prototype, "onClick", null);
    return GoConfigControl;
}(react_1.default.PureComponent));
exports.GoConfigControl = GoConfigControl;
var GoConfigControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(GoConfigControlRenderer, _super);
    function GoConfigControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoConfigControlRenderer = tslib_1.__decorate([
        (0, amis_1.Renderer)({
            type: 'ae-go-config'
        })
    ], GoConfigControlRenderer);
    return GoConfigControlRenderer;
}(GoConfigControl));
exports.GoConfigControlRenderer = GoConfigControlRenderer;
