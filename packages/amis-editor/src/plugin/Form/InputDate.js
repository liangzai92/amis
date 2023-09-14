"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var FormulaControl_1 = require("../../renderer/FormulaControl");
var formatX = [
    {
        label: 'X(时间戳)',
        value: 'X'
    },
    {
        label: 'x(毫秒时间戳)',
        value: 'x'
    }
];
var DateType = {
    date: {
        format: 'YYYY-MM-DD',
        placeholder: '请选择日期',
        formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
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
        ], false)
    },
    datetime: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请选择日期以及时间',
        formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
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
        ], false)
    },
    time: {
        format: 'HH:mm',
        placeholder: '请选择时间',
        formatOptions: [
            {
                label: 'HH:mm',
                value: 'HH:mm'
            },
            {
                label: 'HH:mm:ss',
                value: 'HH:mm:ss'
            },
            {
                label: 'HH时mm分',
                value: 'HH时mm分'
            },
            {
                label: 'HH时mm分ss秒',
                value: 'HH时mm分ss秒'
            }
        ]
    },
    month: {
        format: 'YYYY-MM',
        placeholder: '请选择月份',
        formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
            {
                label: 'YYYY-MM',
                value: 'YYYY-MM'
            },
            {
                label: 'MM',
                value: 'MM'
            },
            {
                label: 'M',
                value: 'M'
            }
        ], false)
    },
    quarter: {
        format: 'YYYY [Q]Q',
        placeholder: '请选择季度',
        formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
            {
                label: 'YYYY-[Q]Q',
                value: 'YYYY-[Q]Q'
            },
            {
                label: 'Q',
                value: 'Q'
            }
        ], false)
    },
    year: {
        format: 'YYYY',
        placeholder: '请选择年',
        formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
            {
                label: 'YYYY',
                value: 'YYYY'
            }
        ], false)
    }
};
var dateTooltip = '支持例如: <code>now、+3days、-2weeks、+1hour、+2years</code> 等（minute|min|hour|day|week|month|year|weekday|second|millisecond）这种相对值用法';
var DateControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DateControlPlugin, _super);
    function DateControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-date';
        _this.$schema = '/schemas/DateControlSchema.json';
        // 组件名称
        _this.icon = 'fa fa-calendar';
        _this.pluginIcon = 'input-date-plugin';
        _this.name = '日期';
        _this.isBaseComponent = true;
        // 添加源对应组件中文名称 & type字段
        _this.searchKeywords = '日期框、input-datetime、日期时间框、input-time、时间框、input-month、月份框、input-quarter、季度框、input-year、年框';
        _this.description = '年月日选择，支持相对值设定，如<code>+2days</code>两天后';
        _this.docLink = '/amis/zh-CN/components/form/input-date';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-date',
            label: '日期',
            name: 'date'
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
        _this.notRenderFormZone = true;
        _this.panelTitle = '日期配置';
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '时间值变化时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'string',
                                        title: '当前日期'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'focus',
                eventLabel: '获取焦点',
                description: '输入框获取焦点(非内嵌模式)时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'string',
                                        title: '当前日期'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'blur',
                eventLabel: '失去焦点',
                description: '输入框失去焦点(非内嵌模式)时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'string',
                                        title: '当前日期'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清空输入框内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            return (0, amis_editor_core_2.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_2.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_2.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('label'),
                                (0, amis_editor_core_2.getSchemaTpl)('selectDateType', {
                                    value: _this.scaffold.type,
                                    onChange: function (value, oldValue, model, form) {
                                        var _a, _b;
                                        var type = value.split('-')[1];
                                        form.setValues({
                                            placeholder: (_a = DateType[type]) === null || _a === void 0 ? void 0 : _a.placeholder,
                                            valueFormat: type === 'time' ? 'HH:mm' : 'X',
                                            displayFormat: (_b = DateType[type]) === null || _b === void 0 ? void 0 : _b.format,
                                            minDate: '',
                                            maxDate: '',
                                            value: ''
                                        });
                                    }
                                }),
                                {
                                    type: 'input-text',
                                    name: 'valueFormat',
                                    label: (0, amis_editor_core_3.tipedLabel)('值格式', '提交数据前将根据设定格式化数据，请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                    pipeIn: (0, amis_editor_core_2.defaultValue)('YYYY-MM-DD'),
                                    clearable: true,
                                    onChange: function (value, oldValue, model, form) {
                                        var type = form.data.type.split('-')[1];
                                        model.setOptions(DateType[type].formatOptions);
                                    },
                                    options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
                                },
                                {
                                    type: 'input-text',
                                    name: 'displayFormat',
                                    label: (0, amis_editor_core_3.tipedLabel)('显示格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                    pipeIn: (0, amis_editor_core_2.defaultValue)('YYYY-MM-DD'),
                                    clearable: true,
                                    onChange: function (value, oldValue, model, form) {
                                        var type = form.data.type.split('-')[1];
                                        model.setOptions(DateType[type].formatOptions);
                                    },
                                    options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
                                },
                                (0, amis_editor_core_2.getSchemaTpl)('utc'),
                                (0, amis_editor_core_2.getSchemaTpl)('clearable', {
                                    pipeIn: (0, amis_editor_core_2.defaultValue)(true)
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('valueFormula', {
                                    rendererSchema: tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema),
                                    placeholder: '请选择静态值',
                                    header: '表达式或相对值',
                                    DateTimeType: FormulaControl_1.FormulaDateType.IsDate,
                                    label: (0, amis_editor_core_3.tipedLabel)('默认值', dateTooltip)
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('valueFormula', {
                                    name: 'minDate',
                                    header: '表达式或相对值',
                                    DateTimeType: FormulaControl_1.FormulaDateType.IsDate,
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.minDate }),
                                    placeholder: '请选择静态值',
                                    needDeleteProps: ['minDate'],
                                    label: (0, amis_editor_core_3.tipedLabel)('最小值', dateTooltip)
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('valueFormula', {
                                    name: 'maxDate',
                                    header: '表达式或相对值',
                                    DateTimeType: FormulaControl_1.FormulaDateType.IsDate,
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.maxDate }),
                                    needDeleteProps: ['maxDate'],
                                    label: (0, amis_editor_core_3.tipedLabel)('最大值', dateTooltip)
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('placeholder', {
                                    pipeIn: (0, amis_editor_core_2.defaultValue)('请选择日期')
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('remark'),
                                (0, amis_editor_core_2.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_2.getSchemaTpl)('description'),
                                (0, amis_editor_core_2.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        (0, amis_editor_core_2.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_2.getSchemaTpl)('validation', {
                            tag: validator_1.ValidatorTag.Date
                        })
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'props' }))
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_2.getSchemaTpl)('style:formItem', renderer),
                        (0, amis_editor_core_2.getSchemaTpl)('style:classNames', [
                            (0, amis_editor_core_2.getSchemaTpl)('className', {
                                label: '描述',
                                name: 'descriptionClassName',
                                visibleOn: 'this.description'
                            }),
                            (0, amis_editor_core_2.getSchemaTpl)('className', {
                                name: 'addOn.className',
                                label: 'AddOn',
                                visibleOn: 'this.addOn && this.addOn.type === "text"'
                            })
                        ]),
                        (0, amis_editor_core_2.getSchemaTpl)('style:others', [
                            {
                                name: 'embed',
                                type: 'button-group-select',
                                size: 'md',
                                label: '模式',
                                mode: 'row',
                                pipeIn: (0, amis_editor_core_2.defaultValue)(false),
                                options: [
                                    {
                                        label: '浮层',
                                        value: false
                                    },
                                    {
                                        label: '内嵌',
                                        value: true
                                    }
                                ]
                            }
                        ])
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'style' }))
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_2.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    DateControlPlugin.id = 'DateControlPlugin';
    return DateControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.DateControlPlugin = DateControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DateControlPlugin);
