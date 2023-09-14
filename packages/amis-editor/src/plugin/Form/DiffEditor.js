"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffEditorControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var DiffEditorControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DiffEditorControlPlugin, _super);
    function DiffEditorControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'diff-editor';
        _this.$schema = '/schemas/DiffEditorControlSchema.json';
        // 组件名称
        _this.name = 'Diff编辑器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-columns';
        _this.pluginIcon = 'diff-editor-plugin';
        _this.description = "\u5DE6\u53F3\u4E24\u8FB9\u7684\u4EE3\u7801\u505A\u5BF9\u6BD4\uFF0C\u652F\u6301\u7684\u8BED\u8A00\u5305\u62EC\uFF1A".concat(amis_1.EditorAvailableLanguages
            .slice(0, 10)
            .join('，'), "\u7B49\u7B49");
        _this.docLink = '/amis/zh-CN/components/form/diff-editor';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'diff-editor',
            label: 'diff编辑器',
            name: 'diff'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: 'Hello World\nLine 1\nNew line\nBla Bla', diffValue: 'Hello World\nLine 2' })
            ]
        };
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '代码变化',
                description: '代码变化时触发',
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
                                        title: '当前代码内容'
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
                description: '右侧输入框获取焦点时触发',
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
                                        title: '当前代码内容'
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
                description: '右侧输入框失去焦点时触发',
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
                                        title: '当前代码内容'
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
                description: '清除选中值'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'focus',
                actionLabel: '获取焦点',
                description: '获取焦点，焦点落在右侧编辑面板'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelTitle = 'Diff编辑器';
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
                                {
                                    label: '语言',
                                    name: 'language',
                                    type: 'select',
                                    value: 'javascript',
                                    searchable: true,
                                    options: amis_1.EditorAvailableLanguages.concat()
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: {
                                        type: 'textarea',
                                        value: context === null || context === void 0 ? void 0 : context.schema.diffValue
                                    },
                                    label: '左侧默认值',
                                    name: 'diffValue',
                                    mode: 'vertical' // 改成上下展示模式
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: {
                                        type: 'textarea',
                                        value: context === null || context === void 0 ? void 0 : context.schema.value
                                    },
                                    label: '右侧默认值',
                                    mode: 'vertical' // 改成上下展示模式
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', {
                            isFormItem: true,
                            unsupportStatic: true
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', {
                            tag: validator_1.ValidatorTag.All
                        })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', {
                            renderer: context.info.renderer,
                            schema: [
                                {
                                    name: 'size',
                                    type: 'select',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(''),
                                    pipeOut: amis_editor_core_1.undefinedPipeOut,
                                    label: '控件尺寸',
                                    options: [
                                        {
                                            label: '默认',
                                            value: ''
                                        },
                                        {
                                            label: '中',
                                            value: 'md'
                                        },
                                        {
                                            label: '大',
                                            value: 'lg'
                                        },
                                        {
                                            label: '特大',
                                            value: 'xl'
                                        },
                                        {
                                            label: '超大',
                                            value: 'xxl'
                                        }
                                    ]
                                }
                            ]
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                            unsupportStatic: true
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
    DiffEditorControlPlugin.prototype.filterProps = function (props) {
        props.disabled = true;
        return props;
    };
    DiffEditorControlPlugin.id = 'DiffEditorControlPlugin';
    return DiffEditorControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.DiffEditorControlPlugin = DiffEditorControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(DiffEditorControlPlugin);
