"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var ImagesPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ImagesPlugin, _super);
    function ImagesPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'images';
        _this.$schema = '/schemas/ImagesSchema.json';
        // 组件名称
        _this.name = '图片集';
        _this.isBaseComponent = true;
        _this.description = '展示多张图片';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-clone';
        _this.pluginIcon = 'images-plugin';
        _this.scaffold = {
            type: 'images',
            imageGallaryClassName: 'app-popover'
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { listClassName: 'nowrap', thumbMode: 'cover', value: [
                {
                    title: '图片1',
                    image: (0, amis_editor_core_4.mockValue)({ type: 'image' }),
                    src: (0, amis_editor_core_4.mockValue)({ type: 'image' })
                },
                {
                    title: '图片2',
                    image: (0, amis_editor_core_4.mockValue)({ type: 'image' }),
                    src: (0, amis_editor_core_4.mockValue)({ type: 'image' })
                }
            ] });
        _this.panelTitle = '图片集';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isUnderField = /\/field\/\w+$/.test(context.path);
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: (isUnderField
                                ? []
                                : [
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
                                        size: 'sm',
                                        options: [
                                            {
                                                label: '关联字段',
                                                value: 1
                                            },
                                            {
                                                label: '静态设置',
                                                value: 2
                                            }
                                        ],
                                        onChange: function (value, oldValue, model, form) {
                                            if (value !== oldValue && value == 1) {
                                                form.deleteValueByName('options');
                                            }
                                        }
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('sourceBindControl', {
                                        label: (0, amis_editor_core_3.tipedLabel)('关联数据', '比如：\\${listVar}，用来关联作用域中的已有数据'),
                                        visibleOn: 'this.__mode == 1'
                                    }),
                                    {
                                        type: 'combo',
                                        name: 'options',
                                        visibleOn: 'this.__mode == 2',
                                        minLength: 1,
                                        label: '图片集数据',
                                        multiple: true,
                                        multiLine: true,
                                        addable: true,
                                        removable: true,
                                        value: [{}],
                                        items: [
                                            (0, amis_editor_core_3.getSchemaTpl)('imageUrl', {
                                                name: 'image',
                                                label: '缩略图'
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('imageUrl', {
                                                name: 'src',
                                                label: '原图'
                                            }),
                                            {
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                                label: '图片标题',
                                                name: 'title'
                                            },
                                            {
                                                type: i18nEnabled ? 'textarea-i18n' : 'textarea',
                                                label: '图片描述',
                                                name: 'caption'
                                            }
                                        ]
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                        name: 'enlargeAble',
                                        label: '图片放大功能'
                                    })
                                ]).concat([
                                (0, amis_editor_core_3.getSchemaTpl)('imageUrl', {
                                    name: 'defaultImage',
                                    label: (0, amis_editor_core_3.tipedLabel)('占位图', '无数据时显示的图片')
                                })
                            ])
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                // 已废弃
                                // getSchemaTpl('switch', {
                                //   name: 'showDimensions',
                                //   label: '显示图片尺寸'
                                // }),
                                {
                                    name: 'thumbMode',
                                    type: 'select',
                                    label: '缩略图展示模式',
                                    mode: 'horizontal',
                                    labelAlign: 'left',
                                    horizontal: {
                                        left: 5,
                                        right: 7
                                    },
                                    pipeIn: (0, amis_editor_core_3.defaultValue)('contain'),
                                    options: [
                                        {
                                            label: '宽度占满',
                                            value: 'w-full'
                                        },
                                        {
                                            label: '高度占满',
                                            value: 'h-full'
                                        },
                                        {
                                            label: '包含',
                                            value: 'contain'
                                        },
                                        {
                                            label: '铺满',
                                            value: 'cover'
                                        }
                                    ]
                                },
                                {
                                    name: 'thumbRatio',
                                    type: 'button-group-select',
                                    label: '缩略图比率',
                                    size: 'sm',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)('1:1'),
                                    options: [
                                        {
                                            label: '1:1',
                                            value: '1:1'
                                        },
                                        {
                                            label: '4:3',
                                            value: '4:3'
                                        },
                                        {
                                            label: '16:9',
                                            value: '16:9'
                                        }
                                    ]
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('theme:base', {
                            classname: 'imagesControlClassName',
                            title: '图片集'
                        }),
                        {
                            title: '其他',
                            body: [
                                {
                                    name: 'themeCss.galleryControlClassName.--image-images-prev-icon',
                                    label: '左切换图标',
                                    type: 'icon-select',
                                    returnSvg: true
                                },
                                {
                                    name: 'themeCss.galleryControlClassName.--image-images-next-icon',
                                    label: '右切换图标',
                                    type: 'icon-select',
                                    returnSvg: true
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('theme:select', {
                                    label: '切换图标大小',
                                    name: 'themeCss.galleryControlClassName.--image-images-item-size'
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('theme:cssCode')
                    ])
                }
            ]);
        };
        return _this;
    }
    ImagesPlugin.id = 'ImagesPlugin';
    ImagesPlugin.scene = ['layout'];
    return ImagesPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ImagesPlugin = ImagesPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ImagesPlugin);
