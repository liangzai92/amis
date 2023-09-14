"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputDate_1 = require("./InputDate");
var TimeControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TimeControlPlugin, _super);
    function TimeControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-time';
        _this.$schema = '/schemas/TimeControlSchema.json';
        // 组件名称
        _this.name = '时间框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-clock-o';
        _this.pluginIcon = 'input-time-plugin';
        _this.description = '时分秒输入';
        _this.docLink = '/amis/zh-CN/components/form/input-time';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-time',
            label: '时间',
            name: 'time'
        };
        _this.disabledRendererPlugin = true;
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: tslib_1.__assign({}, _this.scaffold)
        };
        _this.panelTitle = '时间框';
        return _this;
    }
    TimeControlPlugin.id = 'TimeControlPlugin';
    return TimeControlPlugin;
}(InputDate_1.DateControlPlugin));
exports.TimeControlPlugin = TimeControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TimeControlPlugin);
