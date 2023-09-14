"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBoxPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var SearchBoxPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(SearchBoxPlugin, _super);
    function SearchBoxPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'search-box';
        _this.$schema = '/schemas/SearchBoxSchema.json';
        // 组件名称
        _this.name = '搜索框';
        _this.searchKeywords = '搜索框、searchbox';
        _this.isBaseComponent = true;
        _this.description = '用于展示一个简单搜索框，通常需要搭配其他组件使用。比如 page 配置 initApi 后，可以用来实现简单数据过滤查找，name keywords 会作为参数传递给 page 的 initApi。';
        _this.docLink = '/amis/zh-CN/components/search-box';
        _this.icon = 'fa fa-search';
        _this.pluginIcon = 'search-box-plugin';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'search-box',
            name: 'keyword',
            body: {
                type: 'tpl',
                tpl: '搜索框',
                wrapperComponent: '',
                inline: false
            },
            level: 'info'
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { className: 'text-left', showCloseButton: true });
        _this.regions = [{ key: 'body', label: '内容区', placeholder: '搜索框内容' }];
        // 事件定义
        _this.events = [
            {
                eventName: 'search',
                eventLabel: '点击搜索',
                description: '点击搜索图标时触发',
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
                                        title: '搜索值'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
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
                                        title: '搜索值'
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
                                        title: '搜索值'
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
                                        title: '搜索值'
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
                description: '清空输入框'
            },
            {
                actionType: 'setValue',
                actionLabel: '更新数据',
                description: '更新数据'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelTitle = '搜索框';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_2.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基础',
                            body: [
                                (0, amis_editor_core_2.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: '可清除',
                                    name: 'clearable'
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: '清除后立即搜索',
                                    name: 'clearAndSubmit'
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: '立即搜索',
                                    name: 'searchImediately'
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: 'mini版本',
                                    name: 'mini'
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: '加强样式',
                                    name: 'enhance',
                                    visibleOn: '!data.mini'
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('placeholder')
                            ]
                        },
                        (0, amis_editor_core_2.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_2.getSchemaTpl)('style:classNames', { isFormItem: false })
                    ])
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: (0, amis_editor_core_2.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                }
            ]);
        };
        return _this;
    }
    SearchBoxPlugin.id = 'SearchBoxPlugin';
    return SearchBoxPlugin;
}(amis_editor_core_1.BasePlugin));
exports.SearchBoxPlugin = SearchBoxPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(SearchBoxPlugin);
