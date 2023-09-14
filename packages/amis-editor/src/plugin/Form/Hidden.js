"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiddenControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var HiddenControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(HiddenControlPlugin, _super);
    function HiddenControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'hidden';
        _this.$schema = '/schemas/HiddenControlSchema.json';
        // 组件名称
        _this.name = '隐藏域';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-eye-slash';
        _this.pluginIcon = 'hidden-plugin';
        _this.description = '隐藏表单项';
        _this.docLink = '/amis/zh-CN/components/form/hidden';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'hidden',
            name: 'var1'
        };
        _this.previewSchema = {
            type: 'tpl',
            tpl: '隐藏域'
        };
        _this.panelTitle = '隐藏域';
        _this.panelBody = [
            (0, amis_editor_core_2.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
            {
                type: 'input-text',
                name: 'value',
                label: '默认值'
            }
        ];
        return _this;
    }
    HiddenControlPlugin.prototype.renderRenderer = function (props) {
        return this.renderPlaceholder('功能组件（隐藏字段）', props.key, props.style);
    };
    HiddenControlPlugin.id = 'HiddenControlPlugin';
    return HiddenControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.HiddenControlPlugin = HiddenControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(HiddenControlPlugin);
