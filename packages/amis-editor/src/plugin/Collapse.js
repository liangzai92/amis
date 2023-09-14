"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var CollapsePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CollapsePlugin, _super);
    function CollapsePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'collapse';
        _this.$schema = '/schemas/CollapseSchema.json';
        // 组件名称
        _this.name = '折叠器';
        _this.isBaseComponent = true;
        _this.description = '折叠器，可以将内容区展开或隐藏，保持页面的整洁';
        _this.docLink = '/amis/zh-CN/components/collapse';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-window-minimize';
        _this.pluginIcon = 'collapse-plugin';
        _this.scaffold = {
            type: 'collapse',
            header: '标题',
            body: [
                {
                    type: 'tpl',
                    tpl: '内容',
                    wrapperComponent: '',
                    inline: false
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '折叠器';
        _this.panelJustify = true;
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '折叠状态改变',
                description: '折叠器折叠状态改变时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    collapsed: {
                                        type: 'boolean',
                                        title: '折叠器状态'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'expand',
                eventLabel: '折叠器展开',
                description: '折叠器状态变更为展开时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    collapsed: {
                                        type: 'boolean',
                                        title: '折叠器状态'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'collapse',
                eventLabel: '折叠器收起',
                description: '折叠器状态变更为收起时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    collapsed: {
                                        type: 'boolean',
                                        title: '折叠器状态'
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
                actionType: 'expand',
                actionLabel: '组件展开',
                description: '组件折叠状态变更为展开'
            },
            {
                actionLabel: '组件收起',
                actionType: 'collapse',
                description: '组件折叠状态变更为收起'
            }
        ];
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_3.getSchemaTpl)('title', {
                                    name: 'header',
                                    label: '标题',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)(((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.title) || ((_b = context === null || context === void 0 ? void 0 : context.schema) === null || _b === void 0 ? void 0 : _b.header) || ''),
                                    onChange: function (value, oldValue, model, form) {
                                        // 转换一下旧版本的title字段
                                        form.setValueByName('header', value);
                                        form.setValueByName('title', undefined);
                                    }
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('collapseOpenHeader'),
                                {
                                    name: 'headerPosition',
                                    label: '标题位置',
                                    type: 'button-group-select',
                                    size: 'sm',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)('top'),
                                    options: [
                                        {
                                            label: '顶部',
                                            value: 'top',
                                            icon: 'fa fa-arrow-up'
                                        },
                                        {
                                            label: '底部',
                                            value: 'bottom',
                                            icon: 'fa fa-arrow-down'
                                        }
                                    ]
                                },
                                {
                                    name: 'showArrow',
                                    label: '显示图标',
                                    mode: 'row',
                                    inputClassName: 'inline-flex justify-between flex-row-reverse',
                                    type: 'switch',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)(true)
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'collapsable',
                                    label: '可折叠',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)(true)
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status', {
                            disabled: true
                        })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                            isFormItem: false,
                            schema: [
                                (0, amis_editor_core_3.getSchemaTpl)('className', {
                                    name: 'headingClassName',
                                    label: '标题类名'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('className', {
                                    name: 'bodyClassName',
                                    label: '内容类名'
                                })
                            ]
                        })
                    ])
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        _this.regions = [
            {
                key: 'body',
                label: '内容区'
            }
        ];
        return _this;
    }
    CollapsePlugin.id = 'CollapsePlugin';
    return CollapsePlugin;
}(amis_editor_core_2.BasePlugin));
exports.CollapsePlugin = CollapsePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CollapsePlugin);
