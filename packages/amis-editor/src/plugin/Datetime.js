"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatetimePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var Date_1 = require("./Date");
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
        label: 'YYYY-MM-DD HH:mm:ss',
        value: 'YYYY-MM-DD HH:mm:ss'
    },
    {
        label: 'YYYY/MM/DD HH:mm:ss',
        value: 'YYYY/MM/DD HH:mm:ss'
    },
    {
        label: 'YYYY年MM月DD日 HH时mm分ss秒',
        value: 'YYYY年MM月DD日 HH时mm分ss秒'
    }
];
var valueDateFormatOptions = [
    {
        label: 'X(时间戳)',
        value: 'X'
    }
];
var DatetimePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DatetimePlugin, _super);
    function DatetimePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'datetime';
        _this.scaffold = {
            type: 'datetime',
            value: Math.round(Date.now() / 1000)
        };
        _this.name = '日期时间展示';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'datetime-plugin';
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { format: 'YYYY-MM-DD HH:mm:ss', value: Math.round(Date.now() / 1000) });
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
                                        type: 'input-datetime',
                                        name: 'value',
                                        label: '日期时间值'
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'format',
                                        label: (0, amis_editor_core_1.tipedLabel)('显示格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: dateFormatOptions,
                                        pipeIn: (0, amis_editor_core_2.defaultValue)('YYYY-MM-DD HH:mm:ss')
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'valueFormat',
                                        label: (0, amis_editor_core_1.tipedLabel)('值格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: valueDateFormatOptions,
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
    DatetimePlugin.id = 'DatetimePlugin';
    DatetimePlugin.scene = ['layout'];
    return DatetimePlugin;
}(Date_1.DatePlugin));
exports.DatetimePlugin = DatetimePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DatetimePlugin);
