"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var MatrixControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(MatrixControlPlugin, _super);
    function MatrixControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'matrix-checkboxes';
        _this.$schema = '/schemas/MatrixControlSchema.json';
        // 组件名称
        _this.name = '矩阵开关';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-large';
        _this.pluginIcon = 'matrix-checkboxes-plugin';
        _this.description = '可配置行单选，列单选，以及全部选项只能单选或者全部选项多选';
        _this.docLink = '/amis/zh-CN/components/form/matrix-checkboxes';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'matrix-checkboxes',
            name: 'matrix',
            label: '矩阵开关',
            rowLabel: '行标题说明',
            columns: [
                {
                    label: '列1'
                },
                {
                    label: '列2'
                }
            ],
            rows: [
                {
                    label: '行1'
                },
                {
                    label: '行2'
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
        _this.panelTitle = '矩阵开关';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化',
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
                description: '重置为默认值'
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
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'multiple',
                                    label: '可多选'
                                }),
                                {
                                    label: (0, amis_editor_core_1.tipedLabel)('模式', '行级、列级或者单个单元单选'),
                                    name: 'singleSelectMode',
                                    type: 'button-group-select',
                                    size: 'sm',
                                    option: '列级',
                                    horizontal: {
                                        left: 2,
                                        justify: true
                                    },
                                    visibleOn: '!data.multiple',
                                    options: [
                                        {
                                            label: '行级',
                                            value: 'row'
                                        },
                                        {
                                            label: '列级',
                                            value: 'column'
                                        },
                                        {
                                            label: '单个单元',
                                            value: 'cell'
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('column')
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'yCheckAll',
                                    label: (0, amis_editor_core_1.tipedLabel)('列全选', '列级全选功能')
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'xCheckAll',
                                    label: (0, amis_editor_core_1.tipedLabel)('行全选', '行级全选功能')
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                [
                                    (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
                                        label: '列配置',
                                        mode: 'normal',
                                        name: 'columns',
                                        type: 'combo',
                                        multiple: true,
                                        addButtonText: '添加一列',
                                        scaffold: {
                                            label: '列说明'
                                        },
                                        items: [(0, amis_editor_core_1.getSchemaTpl)('matrixColumnLabel')]
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('matrixRowTitle'),
                                    (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
                                        label: '行配置',
                                        name: 'rows',
                                        type: 'combo',
                                        mode: 'normal',
                                        multiple: true,
                                        scaffold: {
                                            label: '行说明'
                                        },
                                        addButtonText: '添加一行',
                                        items: [(0, amis_editor_core_1.getSchemaTpl)('matrixRowLabel')]
                                    })
                                ],
                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                    label: (0, amis_editor_core_1.tipedLabel)('接口', '获取矩阵数据接口'),
                                    name: 'source',
                                    mode: 'normal'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('loadingConfig', {}, { context: context })
                                // getSchemaTpl('value')
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
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames'),
                            {
                                label: (0, amis_editor_core_1.tipedLabel)('对齐方式', '默认当开启全选后居左排列'),
                                name: 'textAlign',
                                type: 'select',
                                options: [
                                    {
                                        label: '居中',
                                        value: 'center'
                                    },
                                    {
                                        label: '居左',
                                        value: 'left'
                                    },
                                    {
                                        label: '居右',
                                        value: 'right'
                                    },
                                    {
                                        label: '两端对齐',
                                        value: 'justify'
                                    }
                                ]
                            }
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
    MatrixControlPlugin.id = 'MatrixControlPlugin';
    return MatrixControlPlugin;
}(amis_editor_core_1.BasePlugin));
exports.MatrixControlPlugin = MatrixControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(MatrixControlPlugin);
