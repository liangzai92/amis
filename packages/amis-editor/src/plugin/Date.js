"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var dateFormatOptions = [
    {
        label: 'X(时间戳)',
        value: 'X'
    },
    {
        label: 'x(毫秒时间戳)',
        value: 'x'
    },
    {
        label: 'YYYY-MM-DD',
        value: 'YYYY-MM-DD'
    },
    {
        label: 'YYYY/MM/DD',
        value: 'YYYY/MM/DD'
    },
    {
        label: 'YYYY年MM月DD日',
        value: 'YYYY年MM月DD日'
    }
];
var valueDateFormatOptions = [
    {
        label: 'X(时间戳)',
        value: 'X'
    }
];
var DatePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DatePlugin, _super);
    function DatePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'date';
        _this.$schema = '/schemas/DateSchema.json';
        // 组件名称
        _this.name = '日期展示';
        _this.isBaseComponent = true;
        _this.description = '主要用来关联字段名做日期展示，支持各种格式如：X（时间戳），YYYY-MM-DD HH:mm:ss。';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-calendar';
        _this.pluginIcon = 'date-plugin';
        _this.scaffold = {
            type: 'date',
            value: Math.round(Date.now() / 1000)
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { format: 'YYYY-MM-DD', value: Math.round(Date.now() / 1000) });
        _this.panelTitle = '日期展示';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    {
                                        type: 'input-date',
                                        name: 'value',
                                        label: '日期值'
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'format',
                                        label: (0, amis_editor_core_1.tipedLabel)('显示格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: dateFormatOptions,
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('YYYY-MM-DD')
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'valueFormat',
                                        label: (0, amis_editor_core_1.tipedLabel)('值格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: valueDateFormatOptions,
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('X')
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('placeholder', {
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('-'),
                                        label: '占位符'
                                    })
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('status')
                        ])
                    },
                    (0, amis_editor_core_3.getSchemaTpl)('onlyClassNameTab')
                ])
            ];
        };
        return _this;
    }
    DatePlugin.id = 'DatePlugin';
    DatePlugin.scene = ['layout'];
    return DatePlugin;
}(amis_editor_core_2.BasePlugin));
exports.DatePlugin = DatePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DatePlugin);
