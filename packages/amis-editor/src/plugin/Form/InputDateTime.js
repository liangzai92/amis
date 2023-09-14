"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputDate_1 = require("./InputDate");
var DateTimeControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeControlPlugin, _super);
    function DateTimeControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-datetime';
        _this.$schema = '/schemas/DateTimeControlSchema.json';
        // 组件名称
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-calendar';
        _this.pluginIcon = 'input-datetime-plugin';
        _this.name = '日期时间';
        _this.description = '年月日时分选择';
        _this.docLink = '/amis/zh-CN/components/form/input-datetime';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-datetime',
            label: '日期时间',
            name: 'datetime'
        };
        _this.disabledRendererPlugin = true;
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: [
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = '日期时间';
        return _this;
    }
    DateTimeControlPlugin.id = 'DateTimeControlPlugin';
    return DateTimeControlPlugin;
}(InputDate_1.DateControlPlugin));
exports.DateTimeControlPlugin = DateTimeControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DateTimeControlPlugin);
