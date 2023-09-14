"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var RepeatControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(RepeatControlPlugin, _super);
    function RepeatControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-repeat';
        _this.$schema = '/schemas/RepeatControlSchema.json';
        // 组件名称
        _this.name = '重复周期选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-repeat';
        _this.pluginIcon = 'input-repeat-plugin';
        _this.description = '选择重复的频率，如每时、每天、每周等';
        _this.docLink = '/amis/zh-CN/components/form/input-repeat';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-repeat',
            label: '周期',
            name: 'repeat'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = '周期';
        _this.panelBody = [
            (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
            (0, amis_editor_core_1.getSchemaTpl)('switchDefaultValue'),
            {
                type: 'input-text',
                name: 'value',
                label: '默认值',
                visibleOn: 'typeof this.value !== "undefined"'
            },
            {
                name: 'options',
                type: 'select',
                label: '启用单位',
                options: 'secondly,minutely,hourly,daily,weekdays,weekly,monthly,yearly'.split(','),
                value: 'hourly,daily,weekly,monthly',
                multiple: true
            }
        ];
        return _this;
    }
    RepeatControlPlugin.id = 'RepeatControlPlugin';
    return RepeatControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.RepeatControlPlugin = RepeatControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(RepeatControlPlugin);
