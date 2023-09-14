"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var BaseControl_1 = require("../component/BaseControl");
var helper_1 = require("../renderer/event-control/helper");
var helper_2 = require("../renderer/event-control/helper");
var ButtonPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonPlugin, _super);
    function ButtonPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'button';
        _this.$schema = '/schemas/ActionSchema.json';
        _this.order = -400;
        // 组件名称
        _this.name = '按钮';
        _this.isBaseComponent = true;
        _this.description = '用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为。';
        _this.docLink = '/amis/zh-CN/components/button';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-square';
        _this.pluginIcon = 'button-plugin';
        _this.scaffold = tslib_1.__assign({ type: 'button', label: '按钮' }, BaseControl_1.BUTTON_DEFAULT_ACTION);
        _this.previewSchema = {
            type: 'button',
            label: '按钮'
        };
        _this.panelTitle = '按钮';
        // 事件定义
        _this.events = [
            {
                eventName: 'click',
                eventLabel: '点击',
                description: '点击时触发',
                defaultShow: true,
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
            // {
            //   eventName: 'doubleClick',
            //   eventLabel: '双击',
            //   description: '鼠标双击事件'
            // }
        ];
        // 动作定义
        _this.actions = [];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isInDialog = /(?:\/|^)dialog\/.+$/.test(context.path);
            var isInDrawer = /(?:\/|^)drawer\/.+$/.test(context.path);
            // TODO: 旧方法无法判断，context 中没有 dropdown-button 的信息，临时实现
            // const isInDropdown = /(?:\/|^)dropdown-button\/.+$/.test(context.path);
            var isInDropdown = /^button-group\/.+$/.test(context.path);
            var buttonStateFunc = function (visibleOn, state) {
                return [
                    (0, amis_editor_core_3.getSchemaTpl)('theme:font', {
                        label: '文字',
                        name: "themeCss.className.font:".concat(state),
                        visibleOn: visibleOn,
                        editorThemePath: [
                            "button1.type.${level}.".concat(state, ".body.font-color"),
                            "button1.size.${size}.body.font"
                        ]
                    }),
                    (0, amis_editor_core_3.getSchemaTpl)('theme:colorPicker', {
                        label: '背景',
                        name: "themeCss.className.background:".concat(state),
                        labelMode: 'input',
                        needGradient: true,
                        needImage: true,
                        visibleOn: visibleOn,
                        editorThemePath: "button1.type.${level}.".concat(state, ".body.bg-color")
                    }),
                    (0, amis_editor_core_3.getSchemaTpl)('theme:border', {
                        name: "themeCss.className.border:".concat(state),
                        visibleOn: visibleOn,
                        editorThemePath: "button1.type.${level}.".concat(state, ".body.border")
                    }),
                    (0, amis_editor_core_3.getSchemaTpl)('theme:paddingAndMargin', {
                        name: "themeCss.className.padding-and-margin:".concat(state),
                        visibleOn: visibleOn,
                        editorThemePath: "button1.size.${size}.body.padding-and-margin"
                    }),
                    (0, amis_editor_core_3.getSchemaTpl)('theme:radius', {
                        name: "themeCss.className.radius:".concat(state),
                        visibleOn: visibleOn,
                        editorThemePath: "button1.size.${size}.body.border"
                    }),
                    (0, amis_editor_core_3.getSchemaTpl)('theme:select', {
                        label: '图标尺寸',
                        name: "themeCss.iconClassName.iconSize:".concat(state),
                        visibleOn: visibleOn,
                        editorThemePath: "button1.size.${size}.body.icon-size"
                    })
                ];
            };
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_3.getSchemaTpl)('label', {
                                    label: '名称'
                                }),
                                {
                                    label: '类型',
                                    type: 'button-group-select',
                                    name: 'type',
                                    size: 'sm',
                                    visibleOn: 'type === "submit" || type === "reset" ',
                                    options: [
                                        {
                                            label: '按钮',
                                            value: 'button'
                                        },
                                        {
                                            label: '提交',
                                            value: 'submit'
                                        },
                                        {
                                            label: '重置',
                                            value: 'reset'
                                        }
                                    ]
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'close',
                                    label: '是否关闭',
                                    clearValueOnHidden: true,
                                    labelRemark: "\u6307\u5B9A\u6B64\u6B21\u64CD\u4F5C\u5B8C\u540E\u5173\u95ED\u5F53\u524D ".concat(isInDialog ? 'dialog' : 'drawer'),
                                    hidden: !isInDialog && !isInDrawer,
                                    pipeIn: (0, amis_editor_core_3.defaultValue)(false)
                                }),
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    formType: 'extend',
                                    label: (0, amis_editor_core_2.tipedLabel)('二次确认', '点击后先询问用户，由手动确认后再执行动作，避免误触。可从数据域变量中取值。'),
                                    form: {
                                        body: [
                                            (0, amis_editor_core_3.getSchemaTpl)('textareaFormulaControl', {
                                                label: '确认内容',
                                                mode: 'normal',
                                                name: 'confirmText'
                                            })
                                        ]
                                    }
                                },
                                {
                                    type: 'ae-switch-more',
                                    formType: 'extend',
                                    mode: 'normal',
                                    label: '气泡提示',
                                    hidden: isInDropdown,
                                    form: {
                                        body: [
                                            (0, amis_editor_core_3.getSchemaTpl)('textareaFormulaControl', {
                                                name: 'tooltip',
                                                mode: 'normal',
                                                label: (0, amis_editor_core_2.tipedLabel)('正常提示', '正常状态下的提示内容，不填则不弹出提示。可从数据域变量中取值。')
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('textareaFormulaControl', {
                                                name: 'disabledTip',
                                                mode: 'normal',
                                                label: (0, amis_editor_core_2.tipedLabel)('禁用提示', '禁用状态下的提示内容，不填则弹出正常提示。可从数据域变量中取值。'),
                                                clearValueOnHidden: true,
                                                visibleOn: 'data.tooltipTrigger !== "focus"'
                                            }),
                                            {
                                                type: 'button-group-select',
                                                name: 'tooltipTrigger',
                                                label: '触发方式',
                                                // visibleOn: 'data.tooltip || data.disabledTip',
                                                size: 'sm',
                                                options: [
                                                    {
                                                        label: '鼠标悬浮',
                                                        value: 'hover'
                                                    },
                                                    {
                                                        label: '聚焦',
                                                        value: 'focus'
                                                    }
                                                ],
                                                pipeIn: (0, amis_editor_core_3.defaultValue)('hover')
                                            },
                                            {
                                                type: 'button-group-select',
                                                name: 'tooltipPlacement',
                                                // visibleOn: 'data.tooltip || data.disabledTip',
                                                label: '提示位置',
                                                size: 'sm',
                                                options: [
                                                    {
                                                        label: '上',
                                                        value: 'top'
                                                    },
                                                    {
                                                        label: '右',
                                                        value: 'right'
                                                    },
                                                    {
                                                        label: '下',
                                                        value: 'bottom'
                                                    },
                                                    {
                                                        label: '左',
                                                        value: 'left'
                                                    }
                                                ],
                                                pipeIn: (0, amis_editor_core_3.defaultValue)('bottom')
                                            }
                                        ]
                                    }
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                    label: '左侧图标'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                    name: 'rightIcon',
                                    label: '右侧图标'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('badge')
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
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('buttonLevel', {
                                    label: '样式',
                                    name: 'level',
                                    hidden: isInDropdown
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('buttonLevel', {
                                    label: '高亮样式',
                                    name: 'activeLevel',
                                    hidden: isInDropdown,
                                    visibleOn: 'data.active'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'block',
                                    label: '块状显示',
                                    hidden: isInDropdown
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('size', {
                                    label: '尺寸',
                                    hidden: isInDropdown
                                })
                            ]
                        },
                        {
                            title: '基本样式',
                            body: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([
                                {
                                    type: 'select',
                                    name: 'editorState',
                                    label: '状态',
                                    selectFirst: true,
                                    options: [
                                        {
                                            label: '常规',
                                            value: 'default'
                                        },
                                        {
                                            label: '悬浮',
                                            value: 'hover'
                                        },
                                        {
                                            label: '点击',
                                            value: 'active'
                                        }
                                    ]
                                }
                            ], tslib_1.__read(buttonStateFunc("${editorState == 'default' || !editorState}", 'default')), false), tslib_1.__read(buttonStateFunc("${editorState == 'hover'}", 'hover')), false), tslib_1.__read(buttonStateFunc("${editorState == 'active'}", 'active')), false)
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('theme:cssCode', {
                            themeClass: [
                                {
                                    value: '',
                                    state: ['default', 'hover', 'active']
                                }
                            ]
                        })
                    ])
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: !!context.schema.actionType ||
                        ['submit', 'reset'].includes(context.schema.type)
                        ? [
                            (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context))),
                            (0, helper_2.getOldActionSchema)(_this.manager, context)
                        ]
                        : [
                            (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                        ]
                }
            ]);
        };
        return _this;
    }
    /**
     * 如果禁用了没办法编辑
     */
    ButtonPlugin.prototype.filterProps = function (props) {
        props.disabled = false;
        return props;
    };
    /**
     * 如果配置里面有 rendererName 自动返回渲染器信息。
     * @param renderer
     */
    ButtonPlugin.prototype.getRendererInfo = function (_a) {
        var renderer = _a.renderer, schema = _a.schema;
        var plugin = this;
        if (schema.$$id &&
            plugin.name &&
            plugin.rendererName &&
            plugin.rendererName === renderer.name) {
            // 复制部分信息出去
            return {
                name: schema.label ? schema.label : plugin.name,
                regions: plugin.regions,
                patchContainers: plugin.patchContainers,
                // wrapper: plugin.wrapper,
                vRendererConfig: plugin.vRendererConfig,
                wrapperProps: plugin.wrapperProps,
                wrapperResolve: plugin.wrapperResolve,
                filterProps: plugin.filterProps,
                $schema: plugin.$schema,
                renderRenderer: plugin.renderRenderer
            };
        }
    };
    ButtonPlugin.id = 'ButtonPlugin';
    ButtonPlugin.scene = ['layout'];
    return ButtonPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ButtonPlugin = ButtonPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ButtonPlugin);
