"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedSelectControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var util_1 = require("../../util");
var NestedSelectControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(NestedSelectControlPlugin, _super);
    function NestedSelectControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'nested-select';
        _this.$schema = '/schemas/NestedSelectControlSchema.json';
        // 组件名称
        _this.name = '级联选择器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-indent';
        _this.pluginIcon = 'nested-select-plugin';
        _this.description = '适用于选项中含有子项，可通过 source 拉取选项，支持多选';
        _this.docLink = '/amis/zh-CN/components/form/nestedselect';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'nested-select',
            label: '级联选择器',
            name: 'nestedSelect',
            onlyChildren: true,
            options: [
                {
                    label: '选项A',
                    value: 'A'
                },
                {
                    label: '选项B',
                    value: 'B',
                    children: [
                        {
                            label: '选项b1',
                            value: 'b1'
                        },
                        {
                            label: '选项b2',
                            value: 'b2'
                        }
                    ]
                },
                {
                    label: '选项C',
                    value: 'C',
                    children: [
                        {
                            label: '选项c1',
                            value: 'c1'
                        },
                        {
                            label: '选项c2',
                            value: 'c2'
                        }
                    ]
                }
            ]
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
        _this.panelTitle = '级联选择器';
        _this.notRenderFormZone = true;
        _this.panelDefinitions = {
            options: {
                label: '选项 Options',
                name: 'options',
                type: 'combo',
                multiple: true,
                multiLine: true,
                draggable: true,
                addButtonText: '新增选项',
                scaffold: {
                    label: '',
                    value: ''
                },
                items: [
                    {
                        type: 'group',
                        body: [
                            (0, amis_editor_core_1.getSchemaTpl)('optionsLabel'),
                            {
                                type: 'input-text',
                                name: 'value',
                                placeholder: '值',
                                unique: true
                            }
                        ]
                    },
                    {
                        $ref: 'options',
                        label: '子选项',
                        name: 'children',
                        addButtonText: '新增子选项'
                    }
                ]
            }
        };
        _this.panelJustify = true;
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
            },
            {
                eventName: 'focus',
                eventLabel: '获取焦点',
                description: '输入框获取焦点时触发',
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
            },
            {
                eventName: 'blur',
                eventLabel: '失去焦点',
                description: '输入框失去焦点时触发',
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
                                (0, amis_editor_core_1.getSchemaTpl)('clearable'),
                                {
                                    type: 'ae-Switch-More',
                                    name: 'searchable',
                                    label: '可检索',
                                    mode: 'normal',
                                    value: false,
                                    hiddenOnDefault: true,
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                type: 'input-text',
                                                name: 'noResultsText',
                                                label: (0, amis_editor_core_3.tipedLabel)('空提示', '检索无结果时的文本')
                                            }
                                        ]
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('onlyLeaf'),
                                [
                                    {
                                        type: 'switch',
                                        label: '可多选',
                                        name: 'multiple',
                                        value: false,
                                        inputClassName: 'is-inline'
                                    },
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'this.multiple',
                                        body: [
                                            {
                                                type: 'switch',
                                                label: (0, amis_editor_core_3.tipedLabel)('父级作为返回值', '开启后选中父级，不会全选子级选项，并且父级作为值返回'),
                                                horizontal: {
                                                    left: 6,
                                                    justify: true
                                                },
                                                name: 'onlyChildren',
                                                inputClassName: 'is-inline',
                                                visibleOn: '!this.onlyLeaf',
                                                pipeIn: function (value) { return !value; },
                                                pipeOut: function (value) { return !value; },
                                                onChange: function (value, origin, item, form) {
                                                    if (!value) {
                                                        // 父级作为返回值
                                                        form.setValues({
                                                            cascade: true,
                                                            withChildren: false,
                                                            onlyChildren: true
                                                        });
                                                    }
                                                    else {
                                                        form.setValues({
                                                            withChildren: false,
                                                            cascade: false,
                                                            onlyChildren: false
                                                        });
                                                    }
                                                }
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('joinValues'),
                                            (0, amis_editor_core_1.getSchemaTpl)('delimiter', {
                                                visibleOn: 'this.joinValues'
                                            }),
                                            (0, amis_editor_core_1.getSchemaTpl)('extractValue', {
                                                visibleOn: '!this.joinValues'
                                            })
                                        ]
                                    }
                                ],
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('hideNodePathLabel'),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('treeOptionControl'),
                                (0, amis_editor_core_1.getSchemaTpl)('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context })
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', {
                            tag: function (data) {
                                return validator_1.ValidatorTag.MultiSelect;
                            }
                        })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: renderer }),
                        {
                            title: '边框',
                            key: 'borderMode',
                            body: [(0, amis_editor_core_1.getSchemaTpl)('borderMode')]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                            schema: [
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    label: '描述',
                                    name: 'descriptionClassName',
                                    visibleOn: 'this.description'
                                })
                            ]
                        })
                    ])
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
    NestedSelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    NestedSelectControlPlugin.id = 'NestedSelectControlPlugin';
    return NestedSelectControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.NestedSelectControlPlugin = NestedSelectControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(NestedSelectControlPlugin);
