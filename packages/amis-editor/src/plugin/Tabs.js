"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var amis_editor_core_5 = require("amis-editor-core");
var findIndex_1 = tslib_1.__importDefault(require("lodash/findIndex"));
var amis_editor_core_6 = require("amis-editor-core");
var amis_1 = require("amis");
var amis_editor_core_7 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var TabsPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TabsPlugin, _super);
    function TabsPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tabs';
        _this.$schema = '/schemas/TabsSchema.json';
        // 组件名称
        _this.name = '选项卡';
        _this.isBaseComponent = true;
        _this.description = '选项卡，可以将内容分组用选项卡的形式展示，降低用户使用成本。';
        _this.docLink = '/amis/zh-CN/components/tabs';
        _this.tags = ['布局容器'];
        _this.icon = 'fa fa-folder-o';
        _this.pluginIcon = 'tabs-plugin';
        _this.scaffold = {
            type: 'tabs',
            tabs: [
                {
                    title: '选项卡1',
                    body: '内容1'
                },
                {
                    title: '选项卡2',
                    body: '内容2'
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.notRenderFormZone = true;
        _this.regions = [
            {
                key: 'toolbar',
                label: '工具栏',
                preferTag: '展示'
            }
        ];
        _this.panelTitle = '选项卡';
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '选项卡切换',
                description: '选项卡切换',
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
                                        title: '选项卡索引'
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
                actionType: 'changeActiveKey',
                actionLabel: '激活指定选项卡',
                description: '修改当前激活tab项的key',
                config: ['activeKey'],
                descDetail: function (info) {
                    var _a;
                    return (react_1.default.createElement("div", null,
                        "\u6FC0\u6D3B\u7B2C",
                        react_1.default.createElement("span", { className: "variable-left variable-right" }, (_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.activeKey),
                        "\u9879"));
                },
                schema: (0, helper_1.getArgsWrapper)((0, amis_editor_core_3.getSchemaTpl)('formulaControl', {
                    name: 'activeKey',
                    label: '激活项',
                    variables: '${variables}',
                    size: 'lg',
                    mode: 'horizontal'
                }))
            }
        ];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isNewTabMode = 'data.tabsMode !=="vertical" && data.tabsMode !=="sidebar" && data.tabsMode !=="chrome"';
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                                    type: 'combo',
                                    label: '选项卡',
                                    mode: 'normal',
                                    name: 'tabs',
                                    draggableTip: '',
                                    draggable: true,
                                    multiple: true,
                                    minLength: 1,
                                    scaffold: {
                                        title: '选项卡',
                                        body: {
                                            type: 'tpl',
                                            tpl: '内容',
                                            inline: false
                                        }
                                    },
                                    items: [
                                        (0, amis_editor_core_3.getSchemaTpl)('title', {
                                            label: false,
                                            required: true
                                        })
                                    ]
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'showTip',
                                    label: (0, amis_editor_core_7.tipedLabel)('标题提示', '鼠标移动到选项卡标题时弹出提示，适用于标题超长时进行完整提示'),
                                    visibleOn: isNewTabMode,
                                    clearValueOnHidden: true
                                }),
                                {
                                    label: (0, amis_editor_core_7.tipedLabel)('初始选项卡', '组件初始化时激活的选项卡，优先级高于激活的选项卡，不可响应上下文数据，选项卡配置hash时使用hash，否则使用索引值，支持获取变量，如：<code>tab\\${id}</code>、<code>\\${id}</code>'),
                                    type: 'input-text',
                                    name: 'defaultKey',
                                    placeholder: '初始默认激活的选项卡',
                                    pipeOut: function (data) {
                                        return data === '' || isNaN(Number(data)) ? data : Number(data);
                                    }
                                },
                                {
                                    label: (0, amis_editor_core_7.tipedLabel)('激活的选项卡', '默认显示某个选项卡，可响应上下文数据，选项卡配置hash时使用hash，否则使用索引值，支持获取变量，如：<code>tab\\${id}</code>、<code>\\${id}</code>'),
                                    type: 'input-text',
                                    name: 'activeKey',
                                    placeholder: '默认激活的选项卡',
                                    pipeOut: function (data) {
                                        return data === '' || isNaN(Number(data)) ? data : Number(data);
                                    }
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status'),
                        {
                            title: '高级',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('sourceBindControl', {
                                    label: (0, amis_editor_core_7.tipedLabel)('关联数据', '根据该数据来动态重复渲染所配置的选项卡')
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'mountOnEnter',
                                    label: (0, amis_editor_core_7.tipedLabel)('激活时渲染内容', '只有激活选项卡时才进行内容渲染，提升渲染性能')
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'unmountOnExit',
                                    label: (0, amis_editor_core_7.tipedLabel)('隐藏后销毁内容', '激活其他选项卡时销毁当前内容，使其再次激活时内容可以重新渲染，适用于数据容器需要每次渲染实时获取数据的场景')
                                })
                            ]
                        }
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    {
                                        name: 'tabsMode',
                                        label: '样式',
                                        type: 'select',
                                        options: [
                                            {
                                                label: '默认',
                                                value: ''
                                            },
                                            {
                                                label: '线型',
                                                value: 'line'
                                            },
                                            {
                                                label: '简约',
                                                value: 'simple'
                                            },
                                            {
                                                label: '加强',
                                                value: 'strong'
                                            },
                                            {
                                                label: '卡片',
                                                value: 'card'
                                            },
                                            {
                                                label: '仿 Chrome',
                                                value: 'chrome'
                                            },
                                            {
                                                label: '水平铺满',
                                                value: 'tiled'
                                            },
                                            {
                                                label: '选择器',
                                                value: 'radio'
                                            },
                                            {
                                                label: '垂直',
                                                value: 'vertical'
                                            },
                                            {
                                                label: '侧边栏',
                                                value: 'sidebar'
                                            }
                                        ],
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('')
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('horizontal-align', {
                                        label: '标题区位置',
                                        name: 'sidePosition',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('left'),
                                        visibleOn: 'data.tabsMode === "sidebar"',
                                        clearValueOnHidden: true
                                    })
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                                isFormItem: false,
                                schema: [
                                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                                        name: 'linksClassName',
                                        label: '标题区'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                                        name: 'toolbarClassName',
                                        label: '工具栏'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                                        name: 'contentClassName',
                                        label: '内容区'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                                        name: 'showTipClassName',
                                        label: '提示',
                                        visibleOn: 'data.showTip',
                                        clearValueOnHidden: true
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
                        (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        _this.patchContainers = ['tabs.body'];
        _this.vRendererConfig = {
            regions: {
                body: {
                    key: 'body',
                    label: '内容区'
                }
            },
            panelTitle: '卡片',
            panelJustify: true,
            panelBodyCreator: function (context) {
                var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
                return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    {
                                        name: 'title',
                                        label: '标题',
                                        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                        required: true
                                    },
                                    {
                                        type: 'ae-switch-more',
                                        formType: 'extend',
                                        mode: 'normal',
                                        label: '标题图标',
                                        form: {
                                            body: [
                                                (0, amis_editor_core_3.getSchemaTpl)('icon'),
                                                (0, amis_editor_core_3.getSchemaTpl)('horizontal-align', {
                                                    label: '位置',
                                                    name: 'iconPosition',
                                                    pipeIn: (0, amis_editor_core_3.defaultValue)('left'),
                                                    visibleOn: 'data.icon',
                                                    clearValueOnHidden: true
                                                })
                                            ]
                                        }
                                    },
                                    {
                                        label: (0, amis_editor_core_7.tipedLabel)('Hash', '设置后，会同步更新地址栏的 Hash。'),
                                        name: 'hash',
                                        type: 'input-text'
                                    }
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('status', { disabled: true }),
                            {
                                title: '高级',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                        name: 'mountOnEnter',
                                        label: (0, amis_editor_core_7.tipedLabel)('激活时才渲染', '当选项卡选中后才渲染其内容区，可提高渲染性能。'),
                                        visibleOn: '!this.reload',
                                        clearValueOnHidden: true
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                        name: 'unmountOnExit',
                                        label: (0, amis_editor_core_7.tipedLabel)('隐藏即销毁', '关闭选项卡则销毁其内容去，配置「激活时才渲染」选项可实现每次选中均重新加载的效果。'),
                                        visibleOn: '!this.reload',
                                        clearValueOnHidden: true
                                    })
                                ]
                            }
                        ])
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                                isFormItem: false
                            })
                        ])
                    }
                ]);
            }
        };
        _this.wrapperProps = {
            unmountOnExit: true,
            mountOnEnter: true
        };
        _this.tabWrapperResolve = function (dom) { return dom.parentElement; };
        _this.overrides = {
            renderTabs: function () {
                var _this = this;
                var dom = this.super();
                if (!this.renderTab && this.props.$$editor && dom) {
                    var tabs_1 = this.props.tabs;
                    return (0, amis_editor_core_4.mapReactElement)(dom, function (item) {
                        var _a, _b;
                        if (item.type === amis_1.Tab && item.props.$$id) {
                            var id_1 = item.props.$$id;
                            var index = (0, findIndex_1.default)(tabs_1, function (tab) { return tab.$$id === id_1; });
                            var info = _this.props.$$editor;
                            var plugin = info.plugin;
                            if (~index) {
                                var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.body;
                                if (!region) {
                                    return item;
                                }
                                return react_1.default.cloneElement(item, {
                                    children: (react_1.default.createElement(amis_editor_core_5.VRenderer, { key: id_1, type: info.type, plugin: info.plugin, renderer: info.renderer, "$schema": "/schemas/TabSchema.json", hostId: info.id, memberIndex: index, name: "".concat(item.props.title || "\u5361\u7247".concat(index + 1)), id: id_1, draggable: false, wrapperResolve: plugin.tabWrapperResolve, schemaPath: "".concat(info.schemaPath, "/tabs/").concat(index), path: "".concat(_this.props.$path, "/").concat(index), data: _this.props.data },
                                        react_1.default.createElement(amis_editor_core_6.RegionWrapper, { key: region.key, preferTag: region.preferTag, name: region.key, label: region.label, regionConfig: region, placeholder: region.placeholder, editorStore: plugin.manager.store, manager: plugin.manager, children: item.props.children, wrapperResolve: region.wrapperResolve, rendererName: info.renderer.name })))
                                });
                            }
                        }
                        return item;
                    });
                }
                return dom;
            }
        };
        return _this;
    }
    /**
     * 补充切换的 toolbar
     * @param context
     * @param toolbars
     */
    TabsPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
        if (context.info.plugin === this &&
            context.info.renderer.name === 'tabs' &&
            !context.info.hostId) {
            var node_1 = context.node;
            toolbars.push({
                level: 'secondary',
                icon: 'fa fa-chevron-left',
                tooltip: '上个卡片',
                onClick: function () {
                    var control = node_1.getComponent();
                    if (control === null || control === void 0 ? void 0 : control.switchTo) {
                        var currentIndex = control.currentIndex();
                        control.switchTo(currentIndex - 1);
                    }
                }
            });
            toolbars.push({
                level: 'secondary',
                icon: 'fa fa-chevron-right',
                tooltip: '下个卡片',
                onClick: function () {
                    var control = node_1.getComponent();
                    if (control === null || control === void 0 ? void 0 : control.switchTo) {
                        var currentIndex = control.currentIndex();
                        control.switchTo(currentIndex + 1);
                    }
                }
            });
        }
    };
    TabsPlugin.prototype.onPreventClick = function (e) {
        var mouseEvent = e.context.data;
        if (mouseEvent.defaultPrevented) {
            return false;
        }
        else if (mouseEvent.target.closest('[role=tablist]>li')) {
            return false;
        }
        return;
    };
    TabsPlugin.id = 'TabsPlugin';
    return TabsPlugin;
}(amis_editor_core_2.BasePlugin));
exports.TabsPlugin = TabsPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TabsPlugin);
