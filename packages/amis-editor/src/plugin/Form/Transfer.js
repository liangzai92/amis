"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var helper_1 = require("../../renderer/event-control/helper");
var validator_1 = require("../../validator");
var amis_editor_core_4 = require("amis-editor-core");
var util_1 = require("../../util");
var TransferPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TransferPlugin, _super);
    function TransferPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'transfer';
        _this.$schema = '/schemas/TransferControlSchema.json';
        // 组件名称
        _this.name = '穿梭器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-list';
        _this.pluginIcon = 'transfer-plugin';
        _this.description = '穿梭器组件';
        _this.docLink = '/amis/zh-CN/components/form/transfer';
        _this.tags = ['表单项'];
        _this.scaffold = {
            label: '分组',
            type: 'transfer',
            name: 'transfer',
            options: [
                {
                    label: '诸葛亮',
                    value: 'zhugeliang'
                },
                {
                    label: '曹操',
                    value: 'caocao'
                }
            ],
            selectMode: 'list',
            resultListModeFollowSelect: false
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
        _this.panelTitle = '穿梭器';
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
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
                eventName: 'selectAll',
                eventLabel: '全选',
                description: '选中所有选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
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
                description: '清空选中内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '重置选择的内容'
            },
            {
                actionType: 'selectAll',
                actionLabel: '全选',
                description: '选中所有选项'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新，多值用“,”分隔'
            }
        ];
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
        _this.notRenderFormZone = true;
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
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'select', multiple: true }),
                                    visibleOn: 'data.options.length > 0'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '统计数据',
                                    name: 'statistics'
                                })
                            ]
                        },
                        {
                            title: '左侧选项面板',
                            body: [
                                {
                                    label: '展示形式',
                                    name: 'selectMode',
                                    type: 'select',
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
                                            label: '树形形式',
                                            value: 'tree'
                                        }
                                    ],
                                    onChange: function (value, origin, item, form) {
                                        form.setValues({
                                            options: undefined,
                                            columns: undefined,
                                            value: '',
                                            valueTpl: ''
                                        });
                                        // 主要解决直接设置value、valueTpl为undefined配置面板不生效问题，所以先设置''，后使用setTimout设置为undefined
                                        setTimeout(function () {
                                            form.setValues({
                                                value: undefined,
                                                valueTpl: undefined
                                            });
                                        }, 100);
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('optionControl', {
                                    visibleOn: 'data.selectMode === "list"',
                                    multiple: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                {
                                    type: 'ae-transferTableControl',
                                    label: '数据',
                                    visibleOn: 'data.selectMode === "table"',
                                    mode: 'normal',
                                    // 自定义change函数
                                    onValueChange: function (type, data, onBulkChange) {
                                        if (type === 'options') {
                                            onBulkChange(data);
                                        }
                                        else if (type === 'columns') {
                                            var columns = data.columns;
                                            if (data.columns.length > 0) {
                                                data.valueTpl = "${".concat(columns[0].name, "}");
                                            }
                                            onBulkChange(data);
                                        }
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('treeOptionControl', {
                                    visibleOn: 'data.selectMode === "tree"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '可检索',
                                    name: 'searchable'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('optionsMenuTpl', {
                                    manager: _this.manager,
                                    onChange: function (value) { },
                                    visibleOn: 'data.selectMode !== "table"'
                                }),
                                {
                                    label: '标题',
                                    name: 'selectTitle',
                                    type: 'input-text',
                                    inputClassName: 'is-inline '
                                }
                            ]
                        },
                        {
                            title: '右侧结果面板',
                            body: [
                                {
                                    type: 'button-group-select',
                                    label: '展示形式',
                                    name: 'resultListModeFollowSelect',
                                    inputClassName: 'items-center',
                                    options: [
                                        { label: '列表形式', value: false },
                                        { label: '跟随左侧', value: true }
                                    ],
                                    onChange: function (value, origin, item, form) {
                                        form.setValueByName('sortable', !value ? true : undefined);
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_4.tipedLabel)('可检索', '查询功能目前只支持根据名称或值来模糊匹配查询'),
                                    name: 'resultSearchable'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('sortable', {
                                    label: '支持排序',
                                    mode: 'horizontal',
                                    horizontal: {
                                        justify: true,
                                        left: 8
                                    },
                                    inputClassName: 'is-inline',
                                    visibleOn: 'data.selectMode === "list" && !data.resultListModeFollowSelect'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('optionsMenuTpl', {
                                    name: 'valueTpl',
                                    manager: _this.manager,
                                    onChange: function (value) { },
                                    visibleOn: '!(data.selectMode === "table" && data.resultListModeFollowSelect)'
                                }),
                                {
                                    label: '标题',
                                    name: 'resultTitle',
                                    type: 'input-text',
                                    inputClassName: 'is-inline '
                                }
                            ]
                        },
                        {
                            title: '高级',
                            body: [
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
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', renderer),
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
                        ])
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
    TransferPlugin.prototype.buildDataSchemas = function (node, region) {
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
    TransferPlugin.id = 'TransferPlugin';
    return TransferPlugin;
}(amis_editor_core_3.BasePlugin));
exports.TransferPlugin = TransferPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(TransferPlugin);
