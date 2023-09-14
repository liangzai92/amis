"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var presetColors = [
    '#2468f2',
    '#b8babf',
    '#528eff',
    '#30bf13',
    '#f33e3e',
    '#ff9326',
    '#fff',
    '#000'
];
var TagPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TagPlugin, _super);
    function TagPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tag';
        _this.$schema = '/schemas/TagSchema.json';
        // 组件名称
        _this.name = '标签';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-tag';
        _this.pluginIcon = 'tag-plugin';
        _this.description = '用于标记和选择的标签';
        _this.docLink = '/amis/zh-CN/components/tag';
        _this.tags = ['展示'];
        _this.previewSchema = {
            type: 'tag',
            label: '普通标签',
            color: 'processing'
        };
        _this.scaffold = {
            type: 'tag',
            label: '普通标签',
            color: 'processing'
        };
        _this.panelTitle = '标签';
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
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
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
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
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
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'close',
                eventLabel: '点击关闭',
                description: '点击关闭时触发',
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
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
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
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('valueFormula', {
                                    name: 'label',
                                    label: '标签内容',
                                    rendererSchema: {
                                        type: 'input-text'
                                    }
                                }),
                                {
                                    type: 'button-group-select',
                                    label: '模式',
                                    name: 'displayMode',
                                    value: 'normal',
                                    options: [
                                        {
                                            label: '普通',
                                            value: 'normal'
                                        },
                                        {
                                            label: '圆角',
                                            value: 'rounded'
                                        },
                                        {
                                            label: '状态',
                                            value: 'status'
                                        }
                                    ],
                                    onChange: function (value, origin, item, form) {
                                        if (value !== 'status') {
                                            form.setValues({
                                                icon: undefined
                                            });
                                        }
                                    }
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                    visibleOn: 'data.displayMode === "status"',
                                    label: '前置图标'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    label: '可关闭',
                                    name: 'closable'
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '颜色',
                            body: [
                                {
                                    type: 'input-color',
                                    label: '主题',
                                    name: 'color',
                                    presetColors: presetColors,
                                    pipeOut: amis_editor_core_3.undefinedPipeOut
                                },
                                {
                                    type: 'input-color',
                                    label: '背景色',
                                    name: 'style.backgroundColor',
                                    presetColors: presetColors,
                                    pipeOut: amis_editor_core_3.undefinedPipeOut
                                },
                                {
                                    type: 'input-color',
                                    label: '边框',
                                    name: 'style.borderColor',
                                    presetColors: presetColors,
                                    pipeOut: amis_editor_core_3.undefinedPipeOut
                                },
                                {
                                    type: 'input-color',
                                    label: '文字',
                                    name: 'style.color',
                                    presetColors: presetColors,
                                    pipeOut: amis_editor_core_3.undefinedPipeOut
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                            isFormItem: false
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
        return _this;
    }
    TagPlugin.id = 'TagPlugin';
    return TagPlugin;
}(amis_editor_core_2.BasePlugin));
exports.TagPlugin = TagPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TagPlugin);
