"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var amis_editor_core_5 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var helper_2 = require("../../renderer/style-control/helper");
var NumberControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(NumberControlPlugin, _super);
    function NumberControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-number';
        _this.$schema = '/schemas/NumberControlSchema.json';
        // 组件名称
        _this.name = '数字框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-sort-numeric-asc';
        _this.pluginIcon = 'input-number-plugin';
        _this.description = '支持设定最大值和最小值，以及步长与精度';
        _this.docLink = '/amis/zh-CN/components/form/input-number';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-number',
            label: '数字',
            name: 'number',
            keyboard: true
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: 88 })
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '数字框';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '数值变化',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'number',
                                        title: '当前数值'
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
                description: '数字框获取焦点',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'number',
                                        title: '当前数值'
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
                description: '数字框失去焦点',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'number',
                                        title: '当前数值'
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
                description: '清空数字框内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '重置为默认值'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_5.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_5.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_5.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_5.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_5.getSchemaTpl)('label'),
                                {
                                    type: 'switch',
                                    label: (0, amis_editor_core_5.tipedLabel)('键盘事件', '通过键盘上下方向键来加减数据值'),
                                    name: 'keyboard',
                                    value: true,
                                    inputClassName: 'is-inline'
                                },
                                (0, amis_editor_core_5.getSchemaTpl)('kilobitSeparator'),
                                (0, amis_editor_core_5.getSchemaTpl)('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                                    valueType: 'number' // 期望数值类型
                                }),
                                (0, amis_editor_core_5.getSchemaTpl)('valueFormula', {
                                    name: 'min',
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.min }),
                                    needDeleteProps: ['min'],
                                    label: '最小值',
                                    valueType: 'number'
                                }),
                                (0, amis_editor_core_5.getSchemaTpl)('valueFormula', {
                                    name: 'max',
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.max }),
                                    needDeleteProps: ['max'],
                                    label: '最大值',
                                    valueType: 'number'
                                }),
                                {
                                    type: 'input-number',
                                    name: 'step',
                                    label: '步长',
                                    min: 0,
                                    value: 1
                                },
                                {
                                    type: 'input-number',
                                    name: 'precision',
                                    label: (0, amis_editor_core_5.tipedLabel)('小数位数', '根据四舍五入精确保留设置的小数位数'),
                                    min: 1,
                                    max: 100
                                },
                                (0, amis_editor_core_5.getSchemaTpl)('prefix'),
                                (0, amis_editor_core_5.getSchemaTpl)('suffix'),
                                (0, amis_editor_core_5.getSchemaTpl)('combo-container', {
                                    type: 'combo',
                                    label: '单位选项',
                                    mode: 'normal',
                                    name: 'unitOptions',
                                    flat: true,
                                    items: [
                                        {
                                            placeholder: '单位选项',
                                            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                            name: 'text'
                                        }
                                    ],
                                    draggable: false,
                                    multiple: true,
                                    pipeIn: function (value) {
                                        if (!(0, amis_editor_core_3.isObject)(value)) {
                                            return Array.isArray(value) ? value : [];
                                        }
                                        var res = value.map(function (item) { return item.value; });
                                        return res;
                                    },
                                    pipeOut: function (value) {
                                        if (!value.length) {
                                            return undefined;
                                        }
                                        return value;
                                    }
                                }),
                                (0, amis_editor_core_5.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_5.getSchemaTpl)('remark'),
                                (0, amis_editor_core_5.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_5.getSchemaTpl)('description'),
                                (0, amis_editor_core_5.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        (0, amis_editor_core_5.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_5.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect })
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'props' }))
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_5.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_5.getSchemaTpl)('style:formItem', {
                                renderer: context.info.renderer,
                                schema: [
                                    {
                                        label: '快捷编辑',
                                        name: 'displayMode',
                                        type: 'select',
                                        pipeIn: (0, amis_editor_core_5.defaultValue)('base'),
                                        options: [
                                            {
                                                label: '单侧按钮',
                                                value: 'base'
                                            },
                                            {
                                                label: '两侧按钮',
                                                value: 'enhance'
                                            }
                                        ]
                                    }
                                ]
                            }),
                            (0, amis_editor_core_5.getSchemaTpl)('theme:form-label'),
                            (0, amis_editor_core_5.getSchemaTpl)('theme:form-description'),
                            {
                                title: '数字输入框样式',
                                body: tslib_1.__spreadArray([], tslib_1.__read((0, helper_2.inputStateTpl)('themeCss.inputControlClassName', 'inputNumber.base.base')), false)
                            },
                            (0, amis_editor_core_5.getSchemaTpl)('theme:cssCode', {
                                themeClass: [
                                    {
                                        name: '数字输入框',
                                        value: '',
                                        className: 'inputControlClassName',
                                        state: ['default', 'hover', 'active']
                                    }
                                ],
                                isFormItem: true
                            })
                        ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'style' }))
                    ]
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_5.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    NumberControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c;
        return {
            type: 'number',
            title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
            originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
        };
    };
    NumberControlPlugin.id = 'NumberControlPlugin';
    return NumberControlPlugin;
}(amis_editor_core_4.BasePlugin));
exports.NumberControlPlugin = NumberControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(NumberControlPlugin);
