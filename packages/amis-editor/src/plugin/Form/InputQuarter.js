"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputQuarterPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputDate_1 = require("./InputDate");
var InputQuarterPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(InputQuarterPlugin, _super);
    function InputQuarterPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-quarter';
        _this.$schema = '/schemas/QuarterControlSchema.json';
        // 组件名称
        _this.name = '季度';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-calendar';
        _this.pluginIcon = 'input-quarter-plugin';
        _this.description = '季度选择';
        _this.docLink = '/amis/zh-CN/components/form/input-quarter';
        _this.tags = ['表单项'];
        // @ts-ignore
        _this.scaffold = {
            type: 'input-quarter',
            name: 'month'
        };
        _this.disabledRendererPlugin = true;
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = 'Quarter';
        return _this;
    }
    InputQuarterPlugin.id = 'InputQuarterPlugin';
    return InputQuarterPlugin;
}(InputDate_1.DateControlPlugin));
exports.InputQuarterPlugin = InputQuarterPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(InputQuarterPlugin);
