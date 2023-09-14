"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMappingControlRenderer = exports.DataMappingControl = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var DataMappingControl = /** @class */ (function (_super) {
    tslib_1.__extends(DataMappingControl, _super);
    function DataMappingControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataMappingControl.prototype.renderValue = function (value, onChange, schema) {
        var render = this.props.render;
        return render('value', (0, amis_editor_core_1.getSchemaTpl)('DataPickerControl', {
            inputOnly: true,
            name: 'any'
        }), {
            value: value,
            onChange: onChange
        });
    };
    DataMappingControl.prototype.render = function () {
        var _a = this.props, schema = _a.schema, render = _a.render, name = _a.name, description = _a.description, required = _a.required, rest = tslib_1.__rest(_a, ["schema", "render", "name", "description", "required"]);
        return render('inner', {
            type: 'json-schema',
            schema: schema,
            name: name,
            description: description,
            required: required
        }, tslib_1.__assign(tslib_1.__assign({}, rest), { renderValue: this.renderValue }));
        // return (
        //   <InputJSONSchema
        //     {...rest}
        //     schema={this.state.schema}
        //     renderValue={this.renderValue}
        //   />
        // );
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Function, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DataMappingControl.prototype, "renderValue", null);
    return DataMappingControl;
}(react_1.default.Component));
exports.DataMappingControl = DataMappingControl;
var DataMappingControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DataMappingControlRenderer, _super);
    function DataMappingControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataMappingControlRenderer = tslib_1.__decorate([
        (0, amis_1.Renderer)({
            type: 'ae-DataMappingControl'
        })
    ], DataMappingControlRenderer);
    return DataMappingControlRenderer;
}(DataMappingControl));
exports.DataMappingControlRenderer = DataMappingControlRenderer;
