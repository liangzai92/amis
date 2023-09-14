"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var RangeControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(RangeControlPlugin, _super);
    function RangeControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-range';
        _this.$schema = '/schemas/RangeControlSchema.json';
        // 组件名称
        _this.name = '滑块';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-sliders';
        _this.pluginIcon = 'input-range-plugin';
        _this.description = '选择某个值或者某个范围';
        _this.docLink = '/amis/zh-CN/components/form/input-range';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-range',
            label: '滑块',
            name: 'range'
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
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '滑块值变化时触发',
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
                                        title: '当前滑块值'
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
                description: '当设置 showInput 为 true 时，输入框获取焦点时触发',
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
                description: '当设置 showInput 为 true 时，输入框失去焦点时触发',
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
                description: '清除输入框'
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
        _this.panelTitle = '滑块';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
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
                                (0, amis_editor_core_1.getSchemaTpl)('label', {
                                    label: 'Label'
                                }),
                                {
                                    label: '方式',
                                    name: 'multiple',
                                    type: 'select',
                                    value: false,
                                    options: [
                                        {
                                            label: '单滑块',
                                            value: false
                                        },
                                        {
                                            label: '双滑块',
                                            value: true
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'value',
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'input-number' }),
                                    valueType: 'number',
                                    visibleOn: '!data.multiple',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(0)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'min',
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'input-number' }),
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(0),
                                    needDeleteProps: ['min'],
                                    label: '最小值',
                                    valueType: 'number'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'max',
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'input-number' }),
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(100),
                                    needDeleteProps: ['max'],
                                    label: '最大值',
                                    valueType: 'number'
                                }),
                                {
                                    label: '默认值',
                                    type: 'input-group',
                                    name: 'value',
                                    visibleOn: 'data.multiple',
                                    className: 'inputGroup-addOn-no-border',
                                    body: [
                                        {
                                            type: 'input-number',
                                            validations: 'isNumeric',
                                            name: 'value.min',
                                            value: 0
                                        },
                                        {
                                            type: 'html',
                                            html: '-',
                                            className: 'inputGroup-split-line'
                                        },
                                        {
                                            type: 'input-number',
                                            validations: 'isNumeric',
                                            name: 'value.max',
                                            value: 100
                                        }
                                    ]
                                },
                                {
                                    label: '步长',
                                    name: 'step',
                                    type: 'input-number',
                                    value: 1,
                                    pipeOut: function (value) {
                                        return value || 1;
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('unit'),
                                // tooltipVisible 为true时，会一直显示，为undefined时，才会鼠标移入显示
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'tooltipVisible',
                                    label: '值标签',
                                    value: undefined,
                                    pipeOut: function (value) {
                                        return !!value ? undefined : false;
                                    },
                                    pipeIn: function (value) {
                                        return value === undefined || value === true ? true : false;
                                    }
                                }),
                                {
                                    type: 'container',
                                    className: 'ae-ExtendMore mb-2',
                                    visibleOn: 'data.tooltipVisible === undefined',
                                    body: [
                                        {
                                            type: 'select',
                                            name: 'tooltipPlacement',
                                            label: '方向',
                                            value: 'auto',
                                            options: [
                                                { label: '自动', value: 'auto' },
                                                { label: '上', value: 'top' },
                                                { label: '下', value: 'bottom' },
                                                { label: '左', value: 'left' },
                                                { label: '右', value: 'right' }
                                            ]
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'showInput',
                                    label: '可输入',
                                    value: false
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'clearable',
                                    label: '可重置',
                                    value: false,
                                    visibleOn: '!!data.showInput'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        {
                            title: '轨道',
                            body: [
                                {
                                    type: 'ae-partsControl',
                                    mode: 'normal'
                                },
                                {
                                    type: 'ae-marksControl',
                                    mode: 'normal',
                                    name: 'marks'
                                }
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: context.info.renderer }),
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames')
                        ])
                    ]
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
    RangeControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g;
        if ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.multiple) {
            return {
                type: 'object',
                title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
                properties: {
                    max: {
                        type: 'number',
                        title: '最大值'
                    },
                    min: {
                        type: 'number',
                        title: '最小值'
                    }
                },
                originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
            };
        }
        return {
            type: 'number',
            title: ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.label) || ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.name),
            originalValue: (_g = node.schema) === null || _g === void 0 ? void 0 : _g.value // 记录原始值，循环引用检测需要
        };
    };
    RangeControlPlugin.id = 'RangeControlPlugin';
    return RangeControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.RangeControlPlugin = RangeControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(RangeControlPlugin);
