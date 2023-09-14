"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var PlainPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(PlainPlugin, _super);
    function PlainPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'plain';
        _this.$schema = '/schemas/PlainSchema.json';
        _this.disabledRendererPlugin = true; // 组件面板不显示
        // 组件名称
        _this.name = '纯文本';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-file-text-o';
        _this.pluginIcon = 'plain-plugin';
        _this.description = '用来展示纯文字，html 标签会被转义。';
        _this.docLink = '/amis/zh-CN/components/plain';
        _this.tags = ['展示'];
        _this.previewSchema = {
            type: 'plain',
            text: '这是纯文本',
            className: 'text-center',
            inline: false
        };
        _this.scaffold = {
            type: 'plain',
            tpl: '内容',
            inline: false
        };
        _this.panelTitle = '纯文本';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'click',
                eventLabel: '点击',
                description: '点击时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseenter',
                eventLabel: '鼠标移入',
                description: '鼠标移入时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseleave',
                eventLabel: '鼠标移出',
                description: '鼠标移出时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [];
        _this.panelBodyCreator = function (context) {
            var isTableCell = context.info.renderer.name === 'table-cell';
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('textareaFormulaControl', {
                                        name: 'tpl',
                                        label: '内容',
                                        mode: 'normal',
                                        pipeIn: function (value, data) {
                                            return value || (data && data.text);
                                        },
                                        description: '如果当前字段有值，请不要设置，否则覆盖。支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/amis/zh-CN/docs/concepts/template">详情</a>'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('placeholder', {
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('-'),
                                        label: '占位符'
                                    })
                                ]
                            },
                            isTableCell ? null : (0, amis_editor_core_3.getSchemaTpl)('status')
                        ])
                    },
                    isTableCell
                        ? null
                        : {
                            title: '外观',
                            body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                            name: 'inline',
                                            label: '内联模式',
                                            value: true
                                        })
                                    ]
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('style:classNames', { isFormItem: false })
                            ])
                        },
                    {
                        title: '事件',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                        ]
                    }
                ])
            ];
        };
        return _this;
    }
    PlainPlugin.id = 'PlainPlugin';
    return PlainPlugin;
}(amis_editor_core_2.BasePlugin));
exports.PlainPlugin = PlainPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(PlainPlugin);
