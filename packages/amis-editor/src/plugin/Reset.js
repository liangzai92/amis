"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var Button_1 = require("./Button");
var ResetPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ResetPlugin, _super);
    function ResetPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'reset';
        _this.disabledRendererPlugin = true; // 组件面板不显示
        // 组件名称
        _this.name = '重置';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-eraser';
        _this.description = '一般用来重置表单数据到初始值。';
        _this.panelTitle = '按钮';
        _this.scaffold = {
            type: 'reset',
            label: '重置'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        return _this;
    }
    ResetPlugin.id = 'ResetPlugin';
    return ResetPlugin;
}(Button_1.ButtonPlugin));
exports.ResetPlugin = ResetPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ResetPlugin);
