"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxesControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var util_1 = require("../../util");
var CheckboxesControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxesControlPlugin, _super);
    function CheckboxesControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'checkboxes';
        _this.$schema = '/schemas/CheckboxesControlSchema.json';
        // 组件名称
        _this.name = '复选框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-check-square';
        _this.pluginIcon = 'checkboxes-plugin';
        _this.description = '通过<code>options</code>配置多个勾选框，也可以通过<code>source</code>拉取选项';
        _this.docLink = '/amis/zh-CN/components/form/checkboxes';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'checkboxes',
            label: '复选框',
            name: 'checkboxes',
            multiple: true,
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
                tslib_1.__assign({ value: 'A' }, _this.scaffold)
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '复选框';
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
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                [
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        label: '可全选',
                                        name: 'checkAll',
                                        value: false,
                                        visibleOn: 'data.multiple',
                                        onChange: function (value, origin, item, form) {
                                            if (!value) {
                                                // 可全选关闭时，默认全选也需联动关闭
                                                form.setValueByName('defaultCheckAll', false);
                                                form.setValueByName('checkAllText', undefined);
                                            }
                                        }
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-2',
                                        visibleOn: 'data.checkAll',
                                        body: [
                                            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                                label: '默认全选',
                                                name: 'defaultCheckAll',
                                                value: false
                                            }),
                                            {
                                                type: 'input-text',
                                                label: '全选文本',
                                                name: 'checkAllText'
                                            }
                                        ]
                                    }
                                ],
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                                    useSelectMode: true,
                                    visibleOn: 'this.options && this.options.length > 0'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('joinValues', {
                                    visibleOn: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('delimiter', {
                                    visibleOn: 'data.joinValues === true'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('extractValue'),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi', {
                                    trigger: 'change'
                                })
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('optionControlV2', {
                                    multiple: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('creatable', {
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [(0, amis_editor_core_1.getSchemaTpl)('createBtnLabel'), (0, amis_editor_core_1.getSchemaTpl)('addApi')]
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('editable', {
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [(0, amis_editor_core_1.getSchemaTpl)('editApi')]
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('removable', {
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [(0, amis_editor_core_1.getSchemaTpl)('deleteApi')]
                                    }
                                })
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
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: renderer }),
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
    CheckboxesControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    CheckboxesControlPlugin.id = 'CheckboxesControlPlugin';
    return CheckboxesControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.CheckboxesControlPlugin = CheckboxesControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(CheckboxesControlPlugin);
