"use strict";
/**
 * @file 文字提示容器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipWrapperPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var TooltipWrapperPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipWrapperPlugin, _super);
    function TooltipWrapperPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rendererName = 'tooltip-wrapper';
        _this.$schema = '/schemas/TooltipWrapperSchema.json';
        _this.isBaseComponent = true;
        _this.name = '文字提示';
        _this.description = '类似容器，可以将多个渲染器放置在一起，当用户鼠标悬停或者点击容器时，显示文字提示浮层';
        _this.docLink = '/amis/zh-CN/components/tooltip';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-comment-alt';
        _this.pluginIcon = 'tooltip-wrapper-plugin';
        _this.scaffold = {
            type: 'tooltip-wrapper',
            tooltip: '提示文字',
            body: [
                {
                    type: 'tpl',
                    wrapperComponent: '',
                    tpl: '内容'
                }
            ],
            enterable: true,
            showArrow: true,
            offset: [0, 0]
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { className: 'p-1 mr-3 border-2 border-solid border-indigo-400' });
        _this.regions = [
            {
                key: 'body',
                label: '内容区'
            }
        ];
        _this.panelTitle = _this.name;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                        (0, amis_editor_core_3.getSchemaTpl)('title', {
                                            label: '提示标题'
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('tooltip'),
                                        {
                                            name: 'trigger',
                                            type: 'select',
                                            label: (0, amis_editor_core_4.tipedLabel)('触发方式', '默认方式为”鼠标悬停“'),
                                            multiple: true,
                                            value: ['hover'],
                                            pipeIn: function (value) {
                                                return Array.isArray(value) ? value.join(',') : [];
                                            },
                                            pipeOut: function (value) {
                                                return value && value.length ? value.split(',') : undefined;
                                            },
                                            options: [
                                                {
                                                    label: '鼠标悬停',
                                                    value: 'hover'
                                                },
                                                {
                                                    label: '点击',
                                                    value: 'click'
                                                }
                                            ]
                                        },
                                        {
                                            type: 'button-group-select',
                                            name: 'placement',
                                            label: '提示位置',
                                            size: 'sm',
                                            className: 'ae-buttonGroupSelect--justify',
                                            options: [
                                                {
                                                    label: '上',
                                                    value: 'top'
                                                    // icon: 'fa fa-arrow-up'
                                                },
                                                {
                                                    label: '下',
                                                    value: 'bottom'
                                                    // icon: 'fa fa-arrow-down'
                                                },
                                                {
                                                    label: '左',
                                                    value: 'left'
                                                    // icon: 'fa fa-arrow-left'
                                                },
                                                {
                                                    label: '右',
                                                    value: 'right'
                                                    // icon: 'fa fa-arrow-right'
                                                }
                                            ],
                                            pipeIn: (0, amis_editor_core_3.defaultValue)('top')
                                        },
                                        {
                                            type: 'button-group-select',
                                            name: 'tooltipTheme',
                                            label: '主题色',
                                            size: 'sm',
                                            className: 'ae-buttonGroupSelect--justify',
                                            options: [
                                                {
                                                    label: '亮色',
                                                    value: 'light',
                                                    icon: 'far fa-sun'
                                                },
                                                {
                                                    label: '暗色',
                                                    value: 'dark',
                                                    icon: 'far fa-moon'
                                                }
                                            ],
                                            pipeIn: (0, amis_editor_core_3.defaultValue)('light')
                                        },
                                        {
                                            name: 'inline',
                                            label: '容器内联',
                                            type: 'switch',
                                            mode: 'row',
                                            inputClassName: 'inline-flex justify-between flex-row-reverse'
                                        },
                                        {
                                            name: 'rootClose',
                                            visibleOn: '~this.trigger.indexOf("click")',
                                            label: '点击容器外部关闭提示',
                                            type: 'switch',
                                            mode: 'row',
                                            inputClassName: 'inline-flex justify-between flex-row-reverse'
                                        }
                                    ]
                                },
                                {
                                    title: '高级',
                                    body: [
                                        {
                                            name: 'wrapperComponent',
                                            label: '容器标签',
                                            type: 'input-text',
                                            options: [
                                                'article',
                                                'aside',
                                                'code',
                                                'div',
                                                'footer',
                                                'header',
                                                'p',
                                                'section'
                                            ],
                                            validations: {
                                                isAlphanumeric: true,
                                                matchRegexp: '/^(?!.*script).*$/' // 禁用一下script标签
                                            },
                                            validationErrors: {
                                                isAlpha: 'HTML标签不合法，请重新输入',
                                                matchRegexp: 'HTML标签不合法，请重新输入'
                                            },
                                            validateOnChange: false
                                        },
                                        {
                                            type: 'input-group',
                                            label: (0, amis_editor_core_4.tipedLabel)('浮层偏移量', '提示浮层位置相对”水平“、”垂直“的偏移量'),
                                            body: [
                                                {
                                                    type: 'input-number',
                                                    name: 'offset',
                                                    suffix: 'px',
                                                    pipeIn: function (value) {
                                                        return Array.isArray(value) ? value[0] || 0 : 0;
                                                    },
                                                    pipeOut: function (value, oldValue, data) {
                                                        var _a;
                                                        return [
                                                            value,
                                                            ((_a = data.offset) === null || _a === void 0 ? void 0 : _a[1]) || 0
                                                        ];
                                                    }
                                                },
                                                {
                                                    type: 'input-number',
                                                    name: 'offset',
                                                    suffix: 'px',
                                                    pipeIn: function (value) {
                                                        return Array.isArray(value) ? value[1] || 0 : 0;
                                                    },
                                                    pipeOut: function (value, oldValue, data) {
                                                        var _a;
                                                        return [
                                                            ((_a = data.offset) === null || _a === void 0 ? void 0 : _a[0]) || 0,
                                                            value
                                                        ];
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: 'switch',
                                            label: (0, amis_editor_core_4.tipedLabel)('可进入浮层', '关闭后鼠标进入提示浮层后也关闭浮层'),
                                            name: 'enterable',
                                            inputClassName: 'is-inline'
                                        },
                                        {
                                            type: 'switch',
                                            label: (0, amis_editor_core_4.tipedLabel)('展示浮层箭头', '关闭后提示浮层不展示指向箭头'),
                                            name: 'showArrow',
                                            inputClassName: 'is-inline'
                                        },
                                        {
                                            label: '延迟打开',
                                            type: 'input-number',
                                            min: 0,
                                            step: 100,
                                            name: 'mouseEnterDelay',
                                            suffix: 'ms',
                                            pipeIn: (0, amis_editor_core_3.defaultValue)(0)
                                        },
                                        {
                                            label: '延迟关闭',
                                            type: 'input-number',
                                            min: 0,
                                            step: 100,
                                            name: 'mouseLeaveDelay',
                                            suffix: 'ms',
                                            pipeIn: (0, amis_editor_core_3.defaultValue)(0)
                                        }
                                    ]
                                }
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        className: 'p-none',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('theme:common', {
                            layoutExtra: [
                                (0, amis_editor_core_3.getSchemaTpl)('theme:size', {
                                    label: '尺寸',
                                    name: 'themeCss.baseControlClassName.size:default'
                                })
                            ],
                            extra: [
                                (0, amis_editor_core_3.getSchemaTpl)('theme:base', {
                                    classname: 'tooltipControlClassName',
                                    title: '浮层样式'
                                })
                            ]
                        })), false))
                    }
                ])
            ];
        };
        return _this;
    }
    TooltipWrapperPlugin.id = 'TooltipWrapperPlugin';
    TooltipWrapperPlugin.scene = ['layout'];
    return TooltipWrapperPlugin;
}(amis_editor_core_2.BasePlugin));
exports.TooltipWrapperPlugin = TooltipWrapperPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TooltipWrapperPlugin);
