"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var FormulaControl_1 = require("../../renderer/FormulaControl");
var amis_core_1 = require("amis-core");
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
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
    date: tslib_1.__assign(tslib_1.__assign({}, (0, amis_core_1.getRendererByName)('input-date-range')), { format: 'YYYY-MM-DD', placeholder: '请选择日期范围', shortcuts: [
            'yesterday',
            '7daysago',
            'prevweek',
            'thismonth',
            'prevmonth',
            'prevquarter'
        ], formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
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
        ], false) }),
    datetime: tslib_1.__assign(tslib_1.__assign({}, (0, amis_core_1.getRendererByName)('input-datetime-range')), { format: 'YYYY-MM-DD HH:mm:ss', timeFormat: 'HH:mm:ss', placeholder: '请选择日期时间范围', shortcuts: [
            'yesterday',
            '7daysago',
            'prevweek',
            'thismonth',
            'prevmonth',
            'prevquarter'
        ], formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
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
        ], false) }),
    time: tslib_1.__assign(tslib_1.__assign({}, (0, amis_core_1.getRendererByName)('input-time-range')), { format: 'HH:mm', timeFormat: 'HH:mm:ss', placeholder: '请选择时间范围', shortcuts: [], formatOptions: [
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
        ] }),
    month: tslib_1.__assign(tslib_1.__assign({}, (0, amis_core_1.getRendererByName)('input-month-range')), { format: 'YYYY-MM', placeholder: '请选择月份范围', shortcuts: [], formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
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
        ], false) }),
    quarter: tslib_1.__assign(tslib_1.__assign({}, (0, amis_core_1.getRendererByName)('input-quarter-range')), { format: 'YYYY [Q]Q', placeholder: '请选择季度范围', shortcuts: ['thisquarter', 'prevquarter'], formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
            {
                label: 'YYYY-[Q]Q',
                value: 'YYYY-[Q]Q'
            },
            {
                label: 'Q',
                value: 'Q'
            }
        ], false) }),
    year: tslib_1.__assign(tslib_1.__assign({}, (0, amis_core_1.getRendererByName)('input-year-range')), { format: 'YYYY', placeholder: '请选择年范围', shortcuts: ['thisyear', 'lastYear'], formatOptions: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(formatX), false), [
            {
                label: 'YYYY',
                value: 'YYYY'
            }
        ], false) })
};
var dateTooltip = '支持例如: <code>now、+3days、-2weeks、+1hour、+2years</code> 等（minute|hour|day|week|month|year|weekday|second|millisecond）这种相对值用法';
var rangTooltip = '支持例如: <code>3days、2weeks、1hour、2years</code> 等（minute|hour|day|week|month|year|weekday|second|millisecond）这种相对值用法';
var sizeImmutableComponents = Object.values(DateType)
    .map(function (item) { return ((item === null || item === void 0 ? void 0 : item.sizeMutable) === false ? item.type : null); })
    .filter(function (a) { return a; });
var DateRangeControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangeControlPlugin, _super);
    function DateRangeControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-date-range';
        _this.$schema = '/schemas/DateRangeControlSchema.json';
        // 组件名称
        _this.icon = 'fa fa-calendar';
        _this.pluginIcon = 'input-date-range-plugin';
        _this.name = '日期范围';
        _this.isBaseComponent = true;
        // 添加源对应组件中文名称 & type字段
        _this.searchKeywords = '日期范围框、input-datetime-range、日期时间范围、input-time-range、时间范围、input-month-range、月份范围、input-quarter-range、季度范围、input-year-range、年范围';
        _this.description = '日期范围选择，可通过<code>minDate</code>、<code>maxDate</code>设定最小、最大日期';
        _this.docLink = '/amis/zh-CN/components/form/input-date-range';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-date-range',
            label: '日期范围',
            name: 'date-range'
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
        _this.panelTitle = '日期范围';
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
                                        title: '当前时间范围'
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
                                        title: '当前时间范围'
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
                                        title: '当前时间范围'
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
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('formItemExtraName'),
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                (0, amis_editor_core_1.getSchemaTpl)('selectDateRangeType', {
                                    value: _this.scaffold.type,
                                    onChange: function (value, oldValue, model, form) {
                                        var _a, _b, _c, _d;
                                        var type = value.split('-')[1];
                                        form.setValues({
                                            displayFormat: (_a = DateType[type]) === null || _a === void 0 ? void 0 : _a.format,
                                            placeholder: (_b = DateType[type]) === null || _b === void 0 ? void 0 : _b.placeholder,
                                            valueFormat: type === 'time' ? 'HH:mm' : 'X',
                                            minDate: '',
                                            maxDate: '',
                                            value: '',
                                            shortcuts: (_c = DateType[type]) === null || _c === void 0 ? void 0 : _c.shortcuts,
                                            /** amis 3.1.0之后ranges属性废弃 */
                                            ranges: undefined,
                                            // size immutable 组件去除 size 字段
                                            size: sizeImmutableComponents.includes(value)
                                                ? undefined
                                                : (_d = form.data) === null || _d === void 0 ? void 0 : _d.size
                                        });
                                    }
                                }),
                                {
                                    type: 'input-text',
                                    name: 'valueFormat',
                                    label: (0, amis_editor_core_1.tipedLabel)('值格式', '提交数据前将根据设定格式化数据，请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('X'),
                                    clearable: true,
                                    onChange: function (value, oldValue, model, form) {
                                        model.setOptions(DateType[form.data.type.split('-')[1]].formatOptions);
                                    },
                                    options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
                                },
                                {
                                    type: 'input-text',
                                    name: 'displayFormat',
                                    label: (0, amis_editor_core_1.tipedLabel)('显示格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('YYYY-MM-DD'),
                                    clearable: true,
                                    onChange: function (value, oldValue, model, form) {
                                        model.setOptions(DateType[form.data.type.split('-')[1]].formatOptions);
                                    },
                                    options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('utc'),
                                (0, amis_editor_core_1.getSchemaTpl)('clearable', {
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { size: 'full', mode: 'inline' }),
                                    mode: 'vertical',
                                    header: '表达式或相对值',
                                    DateTimeType: FormulaControl_1.FormulaDateType.IsRange,
                                    label: (0, amis_editor_core_1.tipedLabel)('默认值', dateTooltip)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'minDate',
                                    header: '表达式或相对值',
                                    DateTimeType: FormulaControl_1.FormulaDateType.IsDate,
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, (0, omit_1.default)(context === null || context === void 0 ? void 0 : context.schema, ['shortcuts'])), { value: context === null || context === void 0 ? void 0 : context.schema.minDate, type: 'input-date' }),
                                    placeholder: '请选择静态值',
                                    needDeleteProps: ['minDate', 'ranges', 'shortcuts'],
                                    label: (0, amis_editor_core_1.tipedLabel)('最小值', dateTooltip)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'maxDate',
                                    header: '表达式或相对值',
                                    DateTimeType: FormulaControl_1.FormulaDateType.IsDate,
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, (0, omit_1.default)(context === null || context === void 0 ? void 0 : context.schema, ['shortcuts'])), { value: context === null || context === void 0 ? void 0 : context.schema.maxDate, type: 'input-date' }),
                                    placeholder: '请选择静态值',
                                    needDeleteProps: ['maxDate', 'ranges', 'shortcuts'],
                                    label: (0, amis_editor_core_1.tipedLabel)('最大值', dateTooltip)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'minDuration',
                                    header: '表达式',
                                    DateTimeType: FormulaControl_1.FormulaDateType.NotDate,
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.minDuration, type: 'input-text' }),
                                    placeholder: '请输入相对值',
                                    needDeleteProps: ['minDuration'],
                                    label: (0, amis_editor_core_1.tipedLabel)('最小跨度', rangTooltip)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'maxDuration',
                                    header: '表达式',
                                    DateTimeType: FormulaControl_1.FormulaDateType.NotDate,
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.maxDuration, type: 'input-text' }),
                                    placeholder: '请输入相对值',
                                    needDeleteProps: ['maxDuration'],
                                    label: (0, amis_editor_core_1.tipedLabel)('最大跨度', rangTooltip)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('dateShortCutControl', {
                                    name: 'shortcuts',
                                    mode: 'normal',
                                    certainOptions: [
                                        'today',
                                        'yesterday',
                                        'thisweek',
                                        'prevweek',
                                        'thismonth',
                                        'prevmonth',
                                        'thisquarter',
                                        'prevquarter',
                                        'thisyear'
                                    ],
                                    modifyOptions: [
                                        '$daysago',
                                        '$dayslater',
                                        '$weeksago',
                                        '$weekslater',
                                        '$monthsago',
                                        '$monthslater',
                                        '$quartersago',
                                        '$quarterslater',
                                        '$yearsago',
                                        '$yearslater'
                                    ]
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('startPlaceholder'),
                                (0, amis_editor_core_1.getSchemaTpl)('endPlaceholder'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', {
                            tag: validator_1.ValidatorTag.Date
                        })
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'props' }))
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', {
                            renderer: tslib_1.__assign(tslib_1.__assign({}, renderer), { sizeMutable: false }),
                            schema: [
                                // 需要作为一个字符串表达式传入，因为切换 type 后 panelBodyCreator 不会重新执行
                                (0, amis_editor_core_1.getSchemaTpl)('formItemSize', {
                                    hiddenOn: "[\"".concat(sizeImmutableComponents.join('","'), "\"].includes(this.type)")
                                })
                            ]
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames', [
                            (0, amis_editor_core_1.getSchemaTpl)('className', {
                                label: '描述',
                                name: 'descriptionClassName',
                                visibleOn: 'this.description'
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('className', {
                                name: 'addOn.className',
                                label: 'AddOn',
                                visibleOn: 'this.addOn && this.addOn.type === "text"'
                            })
                        ]),
                        (0, amis_editor_core_1.getSchemaTpl)('style:others', [
                            {
                                name: 'embed',
                                type: 'button-group-select',
                                size: 'md',
                                label: '模式',
                                mode: 'row',
                                pipeIn: (0, amis_editor_core_1.defaultValue)(false),
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
                        (0, amis_editor_core_1.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    DateRangeControlPlugin.id = 'DateRangeControlPlugin';
    return DateRangeControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.DateRangeControlPlugin = DateRangeControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(DateRangeControlPlugin);
