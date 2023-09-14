"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_ui_1 = require("amis-ui");
var amis_editor_core_1 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var NavPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(NavPlugin, _super);
    function NavPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'nav';
        _this.$schema = '/schemas/NavSchema.json';
        // 组件名称
        _this.name = '导航';
        _this.isBaseComponent = true;
        _this.description = '用来渲染导航菜单，支持横排和竖排。';
        _this.docLink = '/amis/zh-CN/components/nav';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-map-signs';
        _this.pluginIcon = 'nav-plugin';
        _this.scaffold = {
            type: 'nav',
            stacked: true,
            links: [
                {
                    label: '页面1',
                    to: '?id=1',
                    target: '_self',
                    id: '0'
                },
                {
                    label: '页面2',
                    to: '?id=2',
                    target: '_self',
                    id: '1'
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '导航';
        _this.panelDefinitions = {
            links: {
                label: '菜单管理',
                name: 'links',
                type: 'combo',
                multiple: true,
                draggable: true,
                addButtonText: '新增菜单',
                multiLine: true,
                messages: {
                    validateFailed: '菜单中存在配置错误，请仔细检查'
                },
                scaffold: {
                    label: '',
                    to: ''
                },
                items: [
                    (0, amis_editor_core_1.getSchemaTpl)('label', {
                        label: '名称',
                        required: true
                    }),
                    {
                        type: 'input-text',
                        name: 'to',
                        label: '跳转地址',
                        required: true
                    },
                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                        label: '是否新开页面',
                        name: 'target',
                        pipeIn: function (value) { return value === '_parent'; },
                        pipeOut: function (value) { return (value ? '_parent' : '_blank'); }
                    }),
                    (0, amis_editor_core_1.getSchemaTpl)('icon', {
                        name: 'icon',
                        label: '图标'
                    }),
                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                        label: '初始是否展开',
                        name: 'unfolded'
                    }),
                    {
                        type: 'group',
                        label: '是否高亮',
                        direction: 'vertical',
                        className: 'm-b-none',
                        labelRemark: {
                            trigger: 'click',
                            rootClose: true,
                            className: 'm-l-xs',
                            content: '可以配置该菜单是否要高亮',
                            placement: 'left'
                        },
                        body: [
                            {
                                name: 'active',
                                type: 'radios',
                                inline: true,
                                // pipeIn: (value:any) => typeof value === 'boolean' ? value : '1'
                                options: [
                                    {
                                        label: '是',
                                        value: true
                                    },
                                    {
                                        label: '否',
                                        value: false
                                    },
                                    {
                                        label: '表达式',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'activeOn',
                                autoComplete: false,
                                visibleOn: 'typeof this.active !== "boolean"',
                                type: 'input-text',
                                placeholder: '留空将自动分析菜单地址',
                                className: 'm-t-n-sm'
                            }
                        ]
                    },
                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                        label: '包含子菜单',
                        name: 'children',
                        pipeIn: function (value) { return !!value; },
                        pipeOut: function (value) { return (value ? [{ label: '', to: '' }] : undefined); },
                        messages: {
                            validateFailed: '子菜单中存在配置错误，请仔细检查'
                        }
                    }),
                    {
                        name: 'children',
                        $ref: 'links',
                        visibleOn: 'this.children',
                        label: '子菜单管理',
                        addButtonText: '新增子菜单'
                    }
                ]
            }
        };
        // 事件定义
        _this.events = [
            {
                eventName: 'click',
                eventLabel: '菜单点击',
                description: '菜单点击时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'change',
                eventLabel: '菜单选中',
                description: '菜单选中时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'toggled',
                eventLabel: '菜单展开',
                description: '菜单展开时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'collapsed',
                eventLabel: '菜单折叠',
                description: '菜单折叠时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'loaded',
                eventLabel: '数据加载完成',
                description: '数据加载完成后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据'
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'updateItems',
                actionLabel: '更新菜单项',
                description: '触发组件更新菜单项'
            },
            {
                actionType: 'collapse',
                actionLabel: '菜单折叠',
                description: '触发组件的折叠与展开'
            },
            {
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
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
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'stacked',
                                    label: '横向摆放',
                                    pipeIn: function (value) { return !value; },
                                    pipeOut: function (value) { return !value; }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'mode',
                                    label: [
                                        {
                                            children: (react_1.default.createElement(amis_ui_1.TooltipWrapper, { tooltipClassName: "ae-nav-tooltip-wrapper", trigger: "hover", rootClose: true, placement: "top", tooltipTheme: "dark", style: {
                                                    fontSize: '12px'
                                                }, tooltip: {
                                                    children: function () { return (react_1.default.createElement("div", null,
                                                        react_1.default.createElement("span", null, "\u9ED8\u8BA4\u4E3A\u5185\u8054\u6A21\u5F0F\uFF0C\u5F00\u542F\u540E\u5B50\u83DC\u5355\u4E0D\u5728\u7236\u7EA7\u4E0B\u65B9\u5C55\u5F00\uFF0C\u4F1A\u60AC\u6D6E\u5728\u83DC\u5355\u7684\u4FA7\u8FB9\u5C55\u793A"),
                                                        react_1.default.createElement("div", { className: "nav-mode-gif" }))); }
                                                } },
                                                react_1.default.createElement("span", null, "\u5B50\u83DC\u5355\u60AC\u6D6E\u5C55\u793A")))
                                        }
                                    ],
                                    visibleOn: 'this.stacked',
                                    pipeIn: function (value) { return value === 'float'; },
                                    pipeOut: function (value) { return (value ? 'float' : 'inline'); }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_1.tipedLabel)('手风琴模式', '点击菜单，只展开当前父级菜单，收起其他展开的菜单'),
                                    visibleOn: 'this.stacked && this.mode !== "float"',
                                    name: 'accordion'
                                }),
                                {
                                    type: 'input-number',
                                    name: 'defaultOpenLevel',
                                    label: (0, amis_editor_core_1.tipedLabel)('默认展开层级', '默认展开全部菜单的对应层级'),
                                    visibleOn: 'this.stacked && this.mode !== "float"',
                                    mode: 'horizontal',
                                    labelAlign: 'left'
                                },
                                {
                                    type: 'input-number',
                                    name: 'level',
                                    label: (0, amis_editor_core_1.tipedLabel)('最大显示层级', '配置后将隐藏超过该层级的菜单项，如最大显示两级，菜单项的三级及以下将被隐藏'),
                                    mode: 'horizontal',
                                    labelAlign: 'left'
                                }
                            ]
                        },
                        {
                            title: '菜单项',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('navControl'),
                                // 角标
                                (0, amis_editor_core_1.getSchemaTpl)('nav-badge', {
                                    visibleOn: 'this.links'
                                })
                                // 默认选中菜单
                                // getSchemaTpl('nav-default-active', {
                                //   visibleOn: 'this.links'
                                // })
                            ]
                        },
                        // {
                        //   title: '高级',
                        //   body: [
                        //     getSchemaTpl('switch', {
                        //       name: 'draggable',
                        //       label: '拖拽排序',
                        //       visibleOn:
                        //         'this.source && this.source !== "${amisStore.app.portalNav}"'
                        //     }),
                        //     getSchemaTpl('switch', {
                        //       name: 'dragOnSameLevel',
                        //       label: '仅同级拖拽',
                        //       visibleOn: 'this.draggable'
                        //     }),
                        //     getSchemaTpl('apiControl', {
                        //       name: 'saveOrderApi',
                        //       label: '保存排序接口',
                        //       mode: 'normal',
                        //       visibleOn:
                        //         'this.source && this.source !== "${amisStore.app.portalNav}"'
                        //     })
                        //   ]
                        // },
                        {
                            title: '状态',
                            body: [(0, amis_editor_core_1.getSchemaTpl)('hidden')]
                        }
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', (0, amis_editor_core_1.getSchemaTpl)('style:common', ['layout']))
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
    NavPlugin.id = 'NavPlugin';
    NavPlugin.scene = ['layout'];
    return NavPlugin;
}(amis_editor_core_1.BasePlugin));
exports.NavPlugin = NavPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(NavPlugin);
