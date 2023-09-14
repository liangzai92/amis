"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsTransferPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var helper_1 = require("../../renderer/event-control/helper");
var util_1 = require("../../util");
var TabsTransferPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TabsTransferPlugin, _super);
    function TabsTransferPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tabs-transfer';
        _this.$schema = '/schemas/TransferControlSchema.json';
        // 组件名称
        _this.name = '组合穿梭器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-list';
        _this.pluginIcon = 'tabs-transfer-plugin';
        _this.description = '组合穿梭器组件';
        _this.docLink = '/amis/zh-CN/components/form/transfer';
        _this.tags = ['表单项'];
        _this.scaffold = {
            label: '组合穿梭器',
            type: 'tabs-transfer',
            name: 'a',
            sortable: true,
            searchable: true,
            options: [
                {
                    label: '成员',
                    selectMode: 'tree',
                    children: [
                        {
                            label: '法师',
                            children: [
                                {
                                    label: '诸葛亮',
                                    value: 'zhugeliang'
                                }
                            ]
                        },
                        {
                            label: '战士',
                            children: [
                                {
                                    label: '曹操',
                                    value: 'caocao'
                                },
                                {
                                    label: '钟无艳',
                                    value: 'zhongwuyan'
                                }
                            ]
                        },
                        {
                            label: '打野',
                            children: [
                                {
                                    label: '李白',
                                    value: 'libai'
                                },
                                {
                                    label: '韩信',
                                    value: 'hanxin'
                                },
                                {
                                    label: '云中君',
                                    value: 'yunzhongjun'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '用户',
                    selectMode: 'chained',
                    children: [
                        {
                            label: '法师',
                            children: [
                                {
                                    label: '诸葛亮',
                                    value: 'zhugeliang2'
                                }
                            ]
                        },
                        {
                            label: '战士',
                            children: [
                                {
                                    label: '曹操',
                                    value: 'caocao2'
                                },
                                {
                                    label: '钟无艳',
                                    value: 'zhongwuyan2'
                                }
                            ]
                        },
                        {
                            label: '打野',
                            children: [
                                {
                                    label: '李白',
                                    value: 'libai2'
                                },
                                {
                                    label: '韩信',
                                    value: 'hanxin2'
                                },
                                {
                                    label: '云中君',
                                    value: 'yunzhongjun2'
                                }
                            ]
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
        _this.panelTitle = '组合穿梭器';
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
                eventName: 'tab-change',
                eventLabel: '选项卡切换',
                description: '选项卡切换时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    key: {
                                        type: 'string',
                                        title: '激活的索引'
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
                description: '清空选中内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '重置选择的内容'
            },
            {
                actionType: 'changeTabKey',
                actionLabel: '修改选中tab',
                description: '修改当前选中tab，来选择其他选项',
                descDetail: function (info) {
                    return (react_1.default.createElement("div", null,
                        react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u4FEE\u6539\u9009\u4E2Dtab"));
                }
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelDefinitions = {
            options: {
                label: '选项 Options',
                name: 'options',
                type: 'combo',
                multiple: true,
                multiLine: true,
                draggable: true,
                mode: 'normal',
                addButtonText: '新增选项',
                scaffold: {
                    label: '',
                    value: ''
                },
                items: [
                    {
                        type: 'group',
                        body: [
                            (0, amis_editor_core_1.getSchemaTpl)('label', {
                                label: false,
                                placeholder: '名称',
                                required: true
                            }),
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
        // notRenderFormZone = true;
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
                                (0, amis_editor_core_1.getSchemaTpl)('searchable'),
                                (0, amis_editor_core_1.getSchemaTpl)('api', {
                                    label: '检索接口',
                                    name: 'searchApi'
                                }),
                                {
                                    label: '查询时勾选展示模式',
                                    name: 'searchResultMode',
                                    type: 'select',
                                    mode: 'normal',
                                    options: [
                                        {
                                            label: '列表形式',
                                            value: 'list'
                                        },
                                        {
                                            label: '表格形式',
                                            value: 'table'
                                        },
                                        {
                                            label: '树形选择形式',
                                            value: 'tree'
                                        },
                                        {
                                            label: '级联选择形式',
                                            value: 'chained'
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('sortable'),
                                {
                                    label: '左侧选项标题',
                                    name: 'selectTitle',
                                    type: 'input-text',
                                    inputClassName: 'is-inline '
                                },
                                {
                                    label: '右侧结果标题',
                                    name: 'resultTitle',
                                    type: 'input-text',
                                    inputClassName: 'is-inline '
                                }
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                {
                                    $ref: 'options',
                                    name: 'options'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('source'),
                                (0, amis_editor_core_1.getSchemaTpl)('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                (0, amis_editor_core_1.getSchemaTpl)('joinValues'),
                                (0, amis_editor_core_1.getSchemaTpl)('delimiter'),
                                (0, amis_editor_core_1.getSchemaTpl)('extractValue'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi', {
                                    visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFill', {
                                    visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
                                })
                            ]
                        },
                        {
                            title: '高级',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('virtualThreshold'),
                                (0, amis_editor_core_1.getSchemaTpl)('virtualItemHeight')
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true })
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
    TabsTransferPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var type = (0, util_1.resolveOptionType)((_a = node.schema) === null || _a === void 0 ? void 0 : _a.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
            originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
        };
        if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.extractValue) {
            dataSchema = {
                type: 'array',
                title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name)
            };
        }
        else if (((_h = node.schema) === null || _h === void 0 ? void 0 : _h.joinValues) === false) {
            dataSchema = {
                type: 'array',
                title: ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.label) || ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.name),
                items: {
                    type: 'object',
                    title: '成员',
                    properties: {
                        label: {
                            type: 'string',
                            title: '文本'
                        },
                        value: {
                            type: type,
                            title: '值'
                        }
                    }
                },
                originalValue: dataSchema.originalValue
            };
        }
        return dataSchema;
    };
    TabsTransferPlugin.id = 'TabsTransferPlugin';
    return TabsTransferPlugin;
}(amis_editor_core_3.BasePlugin));
exports.TabsTransferPlugin = TabsTransferPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(TabsTransferPlugin);
