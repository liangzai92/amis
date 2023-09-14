"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var Date_1 = require("./Date");
var timeFormatOptions = [
    {
        label: 'HH:mm',
        value: 'HH:mm',
        timeFormat: 'HH:mm'
    },
    {
        label: 'HH:mm:ss',
        value: 'HH:mm:ss',
        timeFormat: 'HH:mm:ss'
    },
    {
        label: 'HH时mm分',
        value: 'HH时mm分',
        timeFormat: 'HH:mm'
    },
    {
        label: 'HH时mm分ss秒',
        value: 'HH时mm分ss秒',
        timeFormat: 'HH:mm:ss'
    }
];
// 暂仅提示时间戳，待input-time的timeFormat支持表达式后增加其他类型
var dateFormatOptions = [
    {
        label: 'X(时间戳)',
        value: 'X'
    }
];
var TimePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TimePlugin, _super);
    function TimePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'time';
        _this.name = '时间展示';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'time-plugin';
        _this.scaffold = {
            type: 'time',
            value: Math.round(Date.now() / 1000),
            format: 'HH:mm:ss'
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { format: 'HH:mm:ss', value: Math.round(Date.now() / 1000) });
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_2.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    {
                                        type: 'input-time',
                                        name: 'value',
                                        inputFormat: 'HH:mm:ss',
                                        timeFormat: 'HH:mm:ss',
                                        label: '时间值'
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'format',
                                        label: (0, amis_editor_core_1.tipedLabel)('显示格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: timeFormatOptions,
                                        pipeIn: (0, amis_editor_core_2.defaultValue)('HH:mm:ss')
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'valueFormat',
                                        label: (0, amis_editor_core_1.tipedLabel)('值格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: dateFormatOptions,
                                        pipeIn: (0, amis_editor_core_2.defaultValue)('X')
                                    },
                                    (0, amis_editor_core_2.getSchemaTpl)('placeholder', {
                                        pipeIn: (0, amis_editor_core_2.defaultValue)('-'),
                                        label: '占位符'
                                    })
                                ]
                            },
                            (0, amis_editor_core_2.getSchemaTpl)('status')
                        ])
                    },
                    (0, amis_editor_core_2.getSchemaTpl)('onlyClassNameTab')
                ])
            ];
        };
        return _this;
    }
    TimePlugin.id = 'TimePlugin';
    return TimePlugin;
}(Date_1.DatePlugin));
exports.TimePlugin = TimePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TimePlugin);
