"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadiosControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var util_1 = require("../../util");
var RadiosControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(RadiosControlPlugin, _super);
    function RadiosControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'radios';
        _this.$schema = '/schemas/RadiosControlSchema.json';
        // 组件名称
        _this.name = '单选框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-dot-circle-o';
        _this.pluginIcon = 'radios-plugin';
        _this.description = '通过 options 配置选项，可通过 source 拉取选项';
        _this.docLink = '/amis/zh-CN/components/form/radios';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'radios',
            label: '单选框',
            name: 'radios',
            options: [
                {
                    label: '选项A',
                    value: 'A'
                },
                {
                    label: '选项B',
                    value: 'B'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: 'A' })
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '单选框';
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化时触发',
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
                                        title: '选中的值'
                                    },
                                    selectedItems: {
                                        type: 'object',
                                        title: '选中的项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
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
                description: '清除选中值'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
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
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                                    useSelectMode: true,
                                    visibleOn: 'this.options && this.options.length > 0'
                                }),
                                // getSchemaTpl('autoFill')
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi', {
                                    trigger: 'change'
                                })
                            ]
                        },
                        {
                            title: '选项',
                            body: [(0, amis_editor_core_1.getSchemaTpl)('optionControlV2'), (0, amis_editor_core_1.getSchemaTpl)('selectFirst')]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', {
                                renderer: context.info.renderer,
                                schema: [
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        label: '一行选项显示',
                                        name: 'inline',
                                        hiddenOn: 'data.mode === "inline"',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                    }),
                                    {
                                        label: '每行选项个数',
                                        name: 'columnsCount',
                                        hiddenOn: 'data.mode === "inline" || data.inline !== false',
                                        type: 'input-range',
                                        min: 1,
                                        max: 6,
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(1)
                                    }
                                ]
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                                schema: [
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        label: '单个选项',
                                        name: 'itemClassName'
                                    })
                                ]
                            })
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
    RadiosControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g;
        var type = (0, util_1.resolveOptionType)((_a = node.schema) === null || _a === void 0 ? void 0 : _a.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
            originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
        };
        if (((_e = node.schema) === null || _e === void 0 ? void 0 : _e.joinValues) === false) {
            dataSchema = tslib_1.__assign(tslib_1.__assign({}, dataSchema), { type: 'object', title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name), properties: {
                    label: {
                        type: 'string',
                        title: '文本'
                    },
                    value: {
                        type: type,
                        title: '值'
                    }
                } });
        }
        return dataSchema;
    };
    RadiosControlPlugin.id = 'RadiosControlPlugin';
    RadiosControlPlugin.scene = ['layout'];
    return RadiosControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.RadiosControlPlugin = RadiosControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(RadiosControlPlugin);
