"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputDate_1 = require("./InputDate");
var YearControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(YearControlPlugin, _super);
    function YearControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-year';
        _this.$schema = '/schemas/YearControlSchema.json';
        // 组件名称
        _this.name = 'Year';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-calendar';
        _this.pluginIcon = 'input-year-plugin';
        _this.description = '年选择';
        _this.docLink = '/amis/zh-CN/components/form/input-year';
        _this.tags = ['表单项'];
        // @ts-ignore
        _this.scaffold = {
            type: 'input-year',
            name: 'year'
        };
        _this.disabledRendererPlugin = true;
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = 'Year';
        return _this;
    }
    YearControlPlugin.id = 'YearControlPlugin';
    return YearControlPlugin;
}(InputDate_1.DateControlPlugin));
exports.YearControlPlugin = YearControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(YearControlPlugin);
