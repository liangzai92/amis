"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var util_1 = require("../../util");
var SelectControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(SelectControlPlugin, _super);
    function SelectControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'select';
        _this.$schema = '/schemas/SelectControlSchema.json';
        // 组件名称
        _this.name = '下拉框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-list';
        _this.pluginIcon = 'select-plugin';
        _this.description = '支持多选，输入提示，可使用 source 获取选项';
        _this.docLink = '/amis/zh-CN/components/form/select';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'select',
            label: '选项',
            name: 'select',
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
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '下拉框';
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
            },
            {
                eventName: 'add',
                eventLabel: '新增选项',
                description: '新增选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '新增的选项'
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
            },
            {
                eventName: 'edit',
                eventLabel: '编辑选项',
                description: '编辑选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '编辑的选项'
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
            },
            {
                eventName: 'delete',
                eventLabel: '删除选项',
                description: '删除选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '删除的选项'
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
                                (0, amis_editor_core_1.getSchemaTpl)('clearable'),
                                (0, amis_editor_core_1.getSchemaTpl)('searchable'),
                                (0, amis_editor_core_1.getSchemaTpl)('multiple', {
                                    body: [
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            label: '单行显示选中值',
                                            name: 'valuesNoWrap'
                                        }),
                                        {
                                            type: 'input-number',
                                            name: 'maxTagCount',
                                            label: (0, amis_editor_core_4.tipedLabel)('标签展示数', '标签的最大展示数量，超出数量后以收纳浮层的方式展示，默认全展示')
                                        }
                                    ]
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('checkAll'),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_1.getSchemaTpl)('description')
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('optionControlV2'),
                                (0, amis_editor_core_1.getSchemaTpl)('selectFirst'),
                                (0, amis_editor_core_1.getSchemaTpl)('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                // 模板
                                (0, amis_editor_core_1.getSchemaTpl)('optionsMenuTpl', {
                                    manager: _this.manager,
                                    onChange: function (value) { }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('creatable', {
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [
                                            (0, amis_editor_core_1.getSchemaTpl)('createBtnLabel'),
                                            (0, amis_editor_core_1.getSchemaTpl)('addApi')
                                            // {
                                            //   label: '按钮位置',
                                            //   name: 'valueType',
                                            //   type: 'button-group-select',
                                            //   size: 'sm',
                                            //   tiled: true,
                                            //   value: 'asUpload',
                                            //   mode: 'row',
                                            //   options: [
                                            //     {
                                            //       label: '顶部',
                                            //       value: ''
                                            //     },
                                            //     {
                                            //       label: '底部',
                                            //       value: ''
                                            //     },
                                            //   ],
                                            // },
                                        ]
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('editable', {
                                    type: 'ae-Switch-More',
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [(0, amis_editor_core_1.getSchemaTpl)('editApi')]
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('removable', {
                                    type: 'ae-Switch-More',
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [(0, amis_editor_core_1.getSchemaTpl)('deleteApi')]
                                    }
                                })
                            ]
                        },
                        {
                            title: '高级',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_4.tipedLabel)('选项值检查', '开启后，当选项值未匹配到当前options中的选项时，选项文本飘红'),
                                    name: 'showInvalidMatch'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('virtualThreshold'),
                                (0, amis_editor_core_1.getSchemaTpl)('virtualItemHeight')
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
    SelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    SelectControlPlugin.id = 'SelectControlPlugin';
    SelectControlPlugin.scene = ['layout'];
    return SelectControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.SelectControlPlugin = SelectControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(SelectControlPlugin);
