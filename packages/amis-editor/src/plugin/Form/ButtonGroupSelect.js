"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroupControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var helper_1 = require("../../renderer/event-control/helper");
var validator_1 = require("../../validator");
var util_1 = require("../../util");
var ButtonGroupControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroupControlPlugin, _super);
    function ButtonGroupControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'button-group-select';
        _this.$schema = '/schemas/ButtonGroupControlSchema.json';
        // 组件名称
        _this.name = '按钮点选';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-object-group';
        _this.pluginIcon = 'btn-select-plugin';
        _this.description = '用来展示多个按钮，视觉上会作为一个整体呈现，同时可以作为表单项选项选择器来用。';
        _this.docLink = '/amis/zh-CN/components/button-group';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'button-group-select',
            name: 'buttonGroupSelect',
            label: '按钮点选',
            inline: false,
            options: [
                {
                    label: '选项1',
                    value: 'a'
                },
                {
                    label: '选项2',
                    value: 'b'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: 'a', label: '按钮点选', description: '按钮点选可以当选项用。' })
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '按钮点选';
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
            return (0, amis_editor_core_4.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_4.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_4.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    (0, amis_editor_core_4.getSchemaTpl)('formItemName', {
                                        required: true
                                    }),
                                    (0, amis_editor_core_4.getSchemaTpl)('label'),
                                    (0, amis_editor_core_4.getSchemaTpl)('multiple'),
                                    (0, amis_editor_core_4.getSchemaTpl)('valueFormula', {
                                        rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                                        useSelectMode: true,
                                        visibleOn: 'this.options && this.options.length > 0'
                                    }),
                                    (0, amis_editor_core_4.getSchemaTpl)('description')
                                ]
                            },
                            {
                                title: '按钮管理',
                                body: [(0, amis_editor_core_4.getSchemaTpl)('nav-badge'), (0, amis_editor_core_4.getSchemaTpl)('optionControlV2')]
                            },
                            (0, amis_editor_core_4.getSchemaTpl)('status', {
                                isFormItem: true
                            }),
                            (0, amis_editor_core_4.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect })
                        ])
                    ]
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_4.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_4.getSchemaTpl)('formItemMode'),
                                    (0, amis_editor_core_4.getSchemaTpl)('horizontal', {
                                        label: '',
                                        visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
                                    }),
                                    (0, amis_editor_core_4.getSchemaTpl)('switch', {
                                        name: 'tiled',
                                        label: (0, amis_editor_core_3.tipedLabel)('平铺模式', '使按钮宽度占满父容器，各按钮宽度自适应'),
                                        pipeIn: (0, amis_editor_core_4.defaultValue)(false),
                                        visibleOn: 'data.mode !== "inline"'
                                    }),
                                    (0, amis_editor_core_4.getSchemaTpl)('size'),
                                    (0, amis_editor_core_4.getSchemaTpl)('buttonLevel', {
                                        label: '按钮样式',
                                        name: 'btnLevel'
                                    }),
                                    (0, amis_editor_core_4.getSchemaTpl)('buttonLevel', {
                                        label: '按钮选中样式',
                                        name: 'btnActiveLevel',
                                        pipeIn: (0, amis_editor_core_4.defaultValue)('primary')
                                    })
                                ]
                            },
                            (0, amis_editor_core_4.getSchemaTpl)('style:classNames', {
                                isFormItem: true,
                                schema: [
                                    (0, amis_editor_core_4.getSchemaTpl)('className', {
                                        label: '按钮',
                                        name: 'btnClassName'
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
                        (0, amis_editor_core_4.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    ButtonGroupControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
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
        if ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.multiple) {
            if ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.extractValue) {
                dataSchema = {
                    type: 'array',
                    title: ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.label) || ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.name)
                };
            }
            else if (((_m = node.schema) === null || _m === void 0 ? void 0 : _m.joinValues) === false) {
                dataSchema = {
                    type: 'array',
                    title: ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.label) || ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.name),
                    items: {
                        type: 'object',
                        title: '成员',
                        properties: dataSchema.properties
                    },
                    originalValue: dataSchema.originalValue
                };
            }
        }
        return dataSchema;
    };
    ButtonGroupControlPlugin.id = 'ButtonGroupControlPlugin';
    return ButtonGroupControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ButtonGroupControlPlugin = ButtonGroupControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ButtonGroupControlPlugin);
