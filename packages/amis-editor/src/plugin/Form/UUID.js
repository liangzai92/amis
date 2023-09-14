"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var UUIDControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(UUIDControlPlugin, _super);
    function UUIDControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'uuid';
        _this.$schema = '/schemas/UUIDControlSchema.json';
        // 组件名称
        _this.name = 'UUID';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-eye-slash';
        _this.pluginIcon = 'uuid-plugin';
        _this.description = '自动生成的 UUID';
        _this.docLink = '/amis/zh-CN/components/form/uuid';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'uuid',
            name: 'uuid'
        };
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = 'UUID';
        _this.panelBody = [
            (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
            { type: 'static', value: '自动按 UUID v4 格式生成，无需配置' }
        ];
        return _this;
    }
    UUIDControlPlugin.prototype.renderRenderer = function (props) {
        return this.renderPlaceholder('UUID（展现将隐藏）', props.key, props.style);
    };
    UUIDControlPlugin.id = 'UUIDControlPlugin';
    return UUIDControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.UUIDControlPlugin = UUIDControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(UUIDControlPlugin);
