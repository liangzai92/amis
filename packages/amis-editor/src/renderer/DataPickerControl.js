"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPickerControlRenderer = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var DataPickerControl = /** @class */ (function (_super) {
    tslib_1.__extends(DataPickerControl, _super);
    function DataPickerControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataPickerControl.prototype.handleConfirm = function (value) {
        this.props.onChange(value);
    };
    DataPickerControl.prototype.handlePickerOpen = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, manager, node, variables;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, manager = _b.manager, node = _b.node;
                        variables = (_a = this.props.variables) !== null && _a !== void 0 ? _a : this.props.data.variables;
                        if (!!variables) return [3 /*break*/, 2];
                        return [4 /*yield*/, manager.getContextSchemas(node.info.id)];
                    case 1:
                        _c.sent();
                        variables = manager.dataSchema.getDataPropsAsOptions();
                        _c.label = 2;
                    case 2: return [2 /*return*/, {
                            variables: variables.map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), { selectMode: 'tree' })); }),
                            variableMode: 'tree'
                        }];
                }
            });
        });
    };
    DataPickerControl.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, manager = _a.manager, node = _a.node;
        return (react_1.default.createElement(amis_1.FormulaPicker, tslib_1.__assign({}, this.props, { onPickerOpen: this.handlePickerOpen, evalMode: false, onConfirm: this.handleConfirm, value: value, onChange: function () { }, header: '' }), function (_a) {
            var onClick = _a.onClick;
            return (react_1.default.createElement(amis_1.InputBox, { className: "ae-InputVariable", clearable: false, value: value, onChange: onChange, disabled: disabled },
                react_1.default.createElement("span", { onClick: onClick },
                    react_1.default.createElement(amis_1.Icon, { icon: "info", className: "icon" }))));
        }));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DataPickerControl.prototype, "handleConfirm", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Promise)
    ], DataPickerControl.prototype, "handlePickerOpen", null);
    return DataPickerControl;
}(react_1.default.Component));
var DataPickerControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DataPickerControlRenderer, _super);
    function DataPickerControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataPickerControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-DataPickerControl',
            renderLabel: false
        })
    ], DataPickerControlRenderer);
    return DataPickerControlRenderer;
}(DataPickerControl));
exports.DataPickerControlRenderer = DataPickerControlRenderer;
