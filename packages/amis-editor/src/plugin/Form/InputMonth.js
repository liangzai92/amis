"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputDate_1 = require("./InputDate");
var MonthControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(MonthControlPlugin, _super);
    function MonthControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-month';
        _this.$schema = '/schemas/MonthControlSchema.json';
        // 组件名称
        _this.name = '日期';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'inputMonth-plugin';
        _this.icon = 'fa fa-calendar';
        _this.description = '月份选择';
        _this.docLink = '/amis/zh-CN/components/form/input-month';
        _this.tags = ['表单项'];
        // @ts-ignore
        _this.scaffold = {
            type: 'input-month',
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
        _this.panelTitle = 'Month';
        return _this;
    }
    MonthControlPlugin.id = 'MonthControlPlugin';
    return MonthControlPlugin;
}(InputDate_1.DateControlPlugin));
exports.MonthControlPlugin = MonthControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(MonthControlPlugin);
