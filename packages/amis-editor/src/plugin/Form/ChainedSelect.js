"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainedSelectControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var ChainedSelectControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ChainedSelectControlPlugin, _super);
    function ChainedSelectControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'chained-select';
        _this.$schema = '/schemas/ChainedSelectControlSchema.json';
        // 组件名称
        _this.name = '链式下拉框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-list';
        _this.pluginIcon = 'chained-select-plugin';
        _this.description = '通过<code>source</code>拉取选项，只要有返回结果，就可以无限级别增加';
        _this.docLink = '/amis/zh-CN/components/form/chain-select';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'chained-select',
            label: '链式下拉',
            name: 'chainedSelect',
            joinValues: true
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: tslib_1.__assign({}, _this.scaffold)
        };
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
        _this.panelTitle = '链式下拉';
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_2.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_2.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_2.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('label'),
                                (0, amis_editor_core_2.getSchemaTpl)('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                                    mode: 'vertical',
                                    rendererWrapper: true,
                                    label: (0, amis_editor_core_2.tipedLabel)('默认值', '请填入选项 Options 中 value 值')
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_2.tipedLabel)('拼接值', '开启后将选中的选项 value 的值用连接符拼接起来，作为当前表单项的值'),
                                    name: 'joinValues',
                                    pipeIn: (0, amis_editor_core_2.defaultValue)(true)
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('delimiter', {
                                    visibleOn: 'data.joinValues !== false',
                                    clearValueOnHidden: true
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('extractValue', {
                                    visibleOn: 'data.joinValues === false',
                                    clearValueOnHidden: true
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_2.getSchemaTpl)('remark'),
                                (0, amis_editor_core_2.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_2.getSchemaTpl)('description'),
                                (0, amis_editor_core_2.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                (0, amis_editor_core_2.getSchemaTpl)('apiControl', {
                                    name: 'source',
                                    mode: 'normal',
                                    label: (0, amis_editor_core_2.tipedLabel)('获取选项接口', "<div>\u53EF\u7528\u53D8\u91CF\u8BF4\u660E</div><ul>\n                      <li><code>value</code>\u5F53\u524D\u503C</li>\n                      <li><code>level</code>\u62C9\u53D6\u7EA7\u522B\uFF0C\u4ECE <code>1</code>\u5F00\u59CB\u3002</li>\n                      <li><code>parentId</code>\u4E0A\u4E00\u5C42\u9009\u4E2D\u7684 <code>value</code> \u503C</li>\n                      <li><code>parent</code>\u4E0A\u4E00\u5C42\u9009\u4E2D\u9009\u9879\uFF0C\u5305\u542B <code>label</code> \u548C <code>value</code> \u7684\u503C\u3002</li>\n                  </ul>", {
                                        maxWidth: 'unset'
                                    })
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                {
                                    type: 'input-text',
                                    name: 'labelField',
                                    label: (0, amis_editor_core_2.tipedLabel)('选项标签字段', '默认渲染选项组，会获取每一项中的label变量作为展示文本'),
                                    pipeIn: (0, amis_editor_core_2.defaultValue)('label')
                                },
                                {
                                    type: 'input-text',
                                    name: 'valueField',
                                    label: (0, amis_editor_core_2.tipedLabel)('选项值字段', '默认渲染选项组，会获取每一项中的value变量作为表单项值'),
                                    pipeIn: (0, amis_editor_core_2.defaultValue)('value')
                                }
                            ]
                        },
                        (0, amis_editor_core_2.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_2.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_2.getSchemaTpl)('style:formItem', { renderer: context.info.renderer }),
                            (0, amis_editor_core_2.getSchemaTpl)('style:classNames', {
                                schema: [
                                    (0, amis_editor_core_2.getSchemaTpl)('className', {
                                        name: 'descriptionClassName',
                                        label: '描述'
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
                        (0, amis_editor_core_2.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    ChainedSelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // 默认文本，todo:异步数据case
        var type = 'string';
        var dataSchema = {
            type: type,
            title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
            originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
        };
        if ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.extractValue) {
            dataSchema = {
                type: 'array',
                title: ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.label) || ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.name)
            };
        }
        else if (((_g = node.schema) === null || _g === void 0 ? void 0 : _g.joinValues) === false) {
            dataSchema = {
                type: 'array',
                title: ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.label) || ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.name),
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
    ChainedSelectControlPlugin.id = 'ChainedSelectControlPlugin';
    return ChainedSelectControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ChainedSelectControlPlugin = ChainedSelectControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ChainedSelectControlPlugin);
