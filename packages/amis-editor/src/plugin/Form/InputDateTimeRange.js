"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeRangeControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputDateRange_1 = require("./InputDateRange");
var DateTimeRangeControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeRangeControlPlugin, _super);
    function DateTimeRangeControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-datetime-range';
        _this.$schema = '/schemas/DateTimeRangeControlSchema.json';
        // 组件名称
        _this.icon = 'fa fa-calendar';
        _this.pluginIcon = 'input-date-range-plugin';
        _this.name = '日期时间范围';
        _this.isBaseComponent = true;
        _this.description = '日期时间范围选择，可通过<code>minDate</code>、<code>maxDate</code>设定最小、最大日期';
        _this.docLink = '/amis/zh-CN/components/form/input-datetime-range';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-datetime-range',
            label: '日期范围',
            name: 'datetime-range'
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
        _this.disabledRendererPlugin = true;
        _this.notRenderFormZone = true;
        return _this;
    }
    DateTimeRangeControlPlugin.id = 'DateTimeRangeControlPlugin';
    return DateTimeRangeControlPlugin;
}(InputDateRange_1.DateRangeControlPlugin));
exports.DateTimeRangeControlPlugin = DateTimeRangeControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DateTimeRangeControlPlugin);
