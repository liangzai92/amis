"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var CarouselPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CarouselPlugin, _super);
    function CarouselPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'carousel';
        _this.$schema = '/schemas/CarouselSchema.json';
        // 组件名称
        _this.name = '轮播图';
        _this.isBaseComponent = true;
        _this.description = '用来渲染轮播图，可以配置每一页的内容（不只是图片），可以配置过渡动画。';
        _this.docLink = '/amis/zh-CN/components/carousel';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-images';
        _this.pluginIcon = 'carousel-plugin';
        _this.scaffold = {
            type: 'carousel',
            options: [
                {
                    image: (0, amis_editor_core_4.mockValue)({ type: 'image' })
                },
                {
                    html: '<div style="width: 100%; height: 300px; background: #e3e3e3; text-align: center; line-height: 300px;">carousel data</div>'
                },
                {
                    image: (0, amis_editor_core_4.mockValue)({ type: 'image' })
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '轮播图';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isUnderField = /\/field\/\w+$/.test(context.path);
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '常规',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                            isUnderField
                                ? {
                                    type: 'tpl',
                                    inline: false,
                                    className: 'text-info text-sm',
                                    tpl: '<p>当前为字段内容节点配置，选择上层还有更多的配置。</p>'
                                }
                                : null,
                            {
                                type: 'formula',
                                name: '__mode',
                                autoSet: false,
                                formula: '!this.name && !this.source && Array.isArray(this.options) ? 2 : 1'
                            },
                            {
                                label: '数据源',
                                name: '__mode',
                                type: 'button-group-select',
                                pipeIn: function (value, _a) {
                                    var data = _a.data;
                                    if (value === undefined) {
                                        return !data.name &&
                                            !data.source &&
                                            Array.isArray(data.options)
                                            ? 2
                                            : 1;
                                    }
                                    return value;
                                },
                                options: [
                                    {
                                        label: '关联字段',
                                        value: 1
                                    },
                                    {
                                        label: '静态设置',
                                        value: 2
                                    }
                                ]
                            },
                            {
                                label: '字段名',
                                name: 'name',
                                type: 'input-text',
                                description: '设置字段名，关联当前数据作用域中的数据。',
                                visibleOn: 'this.__mode == 1 || !this.__mode && (this.name || this.source || !Array.isArray(this.options))'
                            },
                            {
                                type: 'combo',
                                name: 'options',
                                visibleOn: 'this.__mode == 2 || !this.__mode && !this.name && !this.source && Array.isArray(this.options)',
                                label: '轮播选项内容',
                                mode: 'vertical',
                                multiple: true,
                                multiLine: true,
                                addable: true,
                                removable: true,
                                typeSwitchable: false,
                                conditions: [
                                    {
                                        label: '图片',
                                        test: 'this.type === "image"',
                                        items: [
                                            (0, amis_editor_core_3.getSchemaTpl)('imageUrl', {
                                                name: 'content'
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('imageTitle'),
                                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                                label: '图片标题类名',
                                                name: 'titleClassName',
                                                visibleOn: 'this.type == "image"'
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('imageDesc'),
                                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                                label: '图片描述类名',
                                                name: 'descriptionClassName',
                                                visibleOn: 'this.type == "image"'
                                            }),
                                            {
                                                type: 'input-text',
                                                label: '打开外部链接',
                                                name: 'href',
                                                visibleOn: 'this.type == "image"'
                                            }
                                        ],
                                        scaffold: {
                                            type: 'input-image',
                                            image: ''
                                        }
                                    },
                                    {
                                        label: 'HTML',
                                        test: 'this.type === "html"',
                                        items: [
                                            (0, amis_editor_core_3.getSchemaTpl)('richText', {
                                                label: '内容',
                                                name: 'content'
                                            })
                                        ],
                                        scaffold: {
                                            type: 'html',
                                            content: '<p>html 片段</p>'
                                        }
                                    }
                                ],
                                pipeIn: function (value) {
                                    return Array.isArray(value) && value.length
                                        ? value.map(function (item) {
                                            return item && item.hasOwnProperty('html')
                                                ? {
                                                    type: 'html',
                                                    content: item.html
                                                }
                                                : {
                                                    type: 'image',
                                                    content: item.image,
                                                    title: item.title,
                                                    href: item.href,
                                                    titleClassName: item.titleClassName,
                                                    description: item.description,
                                                    descriptionClassName: item.descriptionClassName
                                                };
                                        })
                                        : [];
                                },
                                pipeOut: function (value, originValue, data) {
                                    return Array.isArray(value) && value.length
                                        ? value.map(function (item) {
                                            return item.type === 'html'
                                                ? {
                                                    html: item.content
                                                }
                                                : {
                                                    image: item.content,
                                                    href: item.href,
                                                    title: item.title,
                                                    titleClassName: item.titleClassName,
                                                    description: item.description,
                                                    descriptionClassName: item.descriptionClassName
                                                };
                                        })
                                        : [];
                                }
                            }
                        ]
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                        name: 'auto',
                                        label: '自动轮播',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)(true)
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('valueFormula', {
                                        rendererSchema: {
                                            type: 'input-number'
                                        },
                                        name: 'interval',
                                        label: '动画间隔(ms)',
                                        valueType: 'number',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)(5000)
                                    }),
                                    {
                                        name: 'duration',
                                        type: 'input-number',
                                        label: '动画时长(ms)',
                                        min: 100,
                                        step: 10,
                                        size: 'sm',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)(500)
                                    },
                                    {
                                        name: 'animation',
                                        label: '动画效果',
                                        type: 'button-group-select',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('fade'),
                                        options: [
                                            {
                                                label: 'fade',
                                                value: 'fade'
                                            },
                                            {
                                                label: 'slide',
                                                value: 'slide'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'controlsTheme',
                                        label: '控制按钮主题',
                                        type: 'button-group-select',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('light'),
                                        options: [
                                            {
                                                label: 'light',
                                                value: 'light'
                                            },
                                            {
                                                label: 'dark',
                                                value: 'dark'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'controls',
                                        label: '控制显示',
                                        type: 'button-group-select',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('dots,arrows'),
                                        multiple: true,
                                        options: [
                                            {
                                                label: '底部圆点',
                                                value: 'dots'
                                            },
                                            {
                                                label: '左右箭头',
                                                value: 'arrows'
                                            }
                                        ]
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                        name: 'alwaysShowArrow',
                                        label: '箭头一直显示',
                                        clearValueOnHidden: true,
                                        hiddenOn: '!~this.controls.indexOf("arrows")',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)(false)
                                    }),
                                    {
                                        type: 'ae-switch-more',
                                        bulk: true,
                                        mode: 'normal',
                                        name: 'multiple',
                                        label: '多图展示',
                                        formType: 'extend',
                                        form: {
                                            body: [
                                                {
                                                    name: 'multiple.count',
                                                    label: '数量',
                                                    type: 'input-number',
                                                    min: 2,
                                                    step: 1
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        name: 'width',
                                        type: 'input-text',
                                        label: '宽度',
                                        validations: 'isNumeric',
                                        addOn: {
                                            type: 'button',
                                            label: 'px'
                                        }
                                    },
                                    {
                                        name: 'height',
                                        type: 'input-text',
                                        label: '高度',
                                        validations: 'isNumeric',
                                        addOn: {
                                            type: 'button',
                                            label: 'px'
                                        }
                                    }
                                ]
                            },
                            {
                                title: '显隐',
                                body: [(0, amis_editor_core_3.getSchemaTpl)('ref'), (0, amis_editor_core_3.getSchemaTpl)('visible')]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('theme:base', {
                                title: '轮播图'
                            }),
                            {
                                title: '其他',
                                body: [
                                    {
                                        name: 'themeCss.baseControlClassName.--image-images-prev-icon',
                                        label: '左切换图标',
                                        type: 'icon-select',
                                        returnSvg: true
                                    },
                                    {
                                        name: 'themeCss.baseControlClassName.--image-images-next-icon',
                                        label: '右切换图标',
                                        type: 'icon-select',
                                        returnSvg: true
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('theme:select', {
                                        label: '切换图标大小',
                                        name: 'themeCss.galleryControlClassName.width:default'
                                    })
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('theme:cssCode')
                        ])
                    }
                ])
            ];
        };
        return _this;
    }
    CarouselPlugin.prototype.filterProps = function (props) {
        // 编辑的时候别自动轮播，影响编辑
        props.auto = false;
        return props;
    };
    /**
     * 补充切换的 toolbar
     * @param context
     * @param toolbars
     */
    CarouselPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
        if (context.info.plugin === this &&
            context.info.renderer.name === 'carousel' &&
            !context.info.hostId) {
            var node_1 = context.node;
            toolbars.push({
                level: 'secondary',
                icon: 'fa fa-chevron-left',
                tooltip: '上个卡片',
                onClick: function () {
                    var _a;
                    var control = node_1.getComponent();
                    (_a = control === null || control === void 0 ? void 0 : control.prev) === null || _a === void 0 ? void 0 : _a.call(control);
                }
            });
            toolbars.push({
                level: 'secondary',
                icon: 'fa fa-chevron-right',
                tooltip: '下个卡片',
                onClick: function () {
                    var _a;
                    var control = node_1.getComponent();
                    (_a = control === null || control === void 0 ? void 0 : control.next) === null || _a === void 0 ? void 0 : _a.call(control);
                }
            });
        }
    };
    CarouselPlugin.id = 'CarouselPlugin';
    return CarouselPlugin;
}(amis_editor_core_2.BasePlugin));
exports.CarouselPlugin = CarouselPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CarouselPlugin);
