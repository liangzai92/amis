"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextareaControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var TextareaControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TextareaControlPlugin, _super);
    function TextareaControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'textarea';
        _this.$schema = '/schemas/TextareaControlSchema.json';
        // 组件名称
        _this.name = '多行文本框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-paragraph';
        _this.pluginIcon = 'textarea-plugin';
        _this.description = '支持换行输入';
        _this.docLink = '/amis/zh-CN/components/form/textarea';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'textarea',
            label: '多行文本',
            name: 'textarea'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: tslib_1.__assign({}, _this.scaffold)
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '多行文本';
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '输入框值变化时触发',
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
                                        title: '当前文本内容'
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
                                        title: '当前文本内容'
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
                                        title: '当前的文本内容'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清空输入框内容'
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
                                // getSchemaTpl('valueFormula', {
                                //   rendererSchema: context?.schema,
                                //   mode: 'vertical' // 改成上下展示模式
                                // }),
                                (0, amis_editor_core_1.getSchemaTpl)('textareaDefaultValue'),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'trimContents',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                                    label: (0, amis_editor_core_3.tipedLabel)('去除首尾空白', '开启后，将不允许用户输入前后空格')
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('showCounter'),
                                {
                                    name: 'maxLength',
                                    label: (0, amis_editor_core_3.tipedLabel)('最大字数', '限制输入最多文字数量'),
                                    type: 'input-number',
                                    min: 0,
                                    step: 1
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', {
                            isFormItem: true,
                            readonly: true
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', {
                            tag: validator_1.ValidatorTag.Text
                        })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', {
                                renderer: context.info.renderer,
                                schema: [
                                    {
                                        type: 'input-number',
                                        name: 'minRows',
                                        value: 3,
                                        label: '最小展示行数'
                                    },
                                    {
                                        type: 'input-number',
                                        name: 'maxRows',
                                        value: 20,
                                        label: '最大展示行数'
                                    }
                                ]
                            }),
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
    TextareaControlPlugin.id = 'TextareaControlPlugin';
    return TextareaControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.TextareaControlPlugin = TextareaControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(TextareaControlPlugin);
