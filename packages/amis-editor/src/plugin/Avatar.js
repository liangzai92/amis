"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file 头像
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var DefaultSize = 40;
var DefaultBorderRadius = 20;
var widthOrheightPipeIn = function (curValue, rest) { var _a, _b; return curValue ? curValue : (_b = (_a = rest.data) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : DefaultSize; };
var AvatarPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(AvatarPlugin, _super);
    function AvatarPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'avatar';
        _this.$schema = '/schemas/AvatarSchema.json';
        // 组件名称
        _this.name = '头像';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-user';
        _this.pluginIcon = 'avatar-plugin';
        _this.description = '用户头像';
        _this.docLink = '/amis/zh-CN/components/avatar';
        _this.tags = ['展示'];
        _this.scaffold = {
            type: 'avatar',
            showtype: 'image',
            icon: '',
            fit: 'cover',
            style: {
                width: DefaultSize,
                height: DefaultSize,
                borderRadius: DefaultBorderRadius
            }
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelTitle = '头像';
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                className: 'p-none',
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    // 如果同时存在 src、text 和 icon，会优先用 src、接着 text、最后 icon
                                    {
                                        type: 'button-group-select',
                                        label: '内容',
                                        name: 'showtype',
                                        tiled: true,
                                        inputClassName: 'items-center',
                                        options: [
                                            { label: '图片', value: 'image' },
                                            { label: '图标', value: 'icon' },
                                            { label: '文字', value: 'text' }
                                        ],
                                        pipeIn: function (value, form) {
                                            var _a, _b;
                                            if (value) {
                                                return value;
                                            }
                                            var showType = ((_a = form.data) === null || _a === void 0 ? void 0 : _a.text)
                                                ? 'text'
                                                : ((_b = form.data) === null || _b === void 0 ? void 0 : _b.icon)
                                                    ? 'icon'
                                                    : 'image';
                                            // 使用setTimeout跳过react更新检测，推进showtype更新
                                            setTimeout(function () { return form.setValueByName('showtype', showType); });
                                            return showType;
                                        },
                                        onChange: function (value, origin, item, form) {
                                            form.setValues({
                                                src: undefined,
                                                fit: 'cover',
                                                text: undefined,
                                                gap: 4,
                                                icon: ''
                                            });
                                        }
                                    },
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        body: [
                                            // 图标
                                            (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                                name: 'icon',
                                                label: '图标',
                                                visibleOn: 'data.showtype === "icon"'
                                            }),
                                            // 图片
                                            (0, amis_editor_core_3.getSchemaTpl)('valueFormula', {
                                                rendererSchema: {
                                                    type: 'input-url'
                                                },
                                                name: 'src',
                                                label: '链接',
                                                visibleOn: 'data.showtype === "image"'
                                            }),
                                            {
                                                label: (0, amis_editor_core_4.tipedLabel)('填充方式', '图片大小与控件大小不一致的图片处理方式'),
                                                name: 'fit',
                                                type: 'select',
                                                pipeIn: (0, amis_editor_core_3.defaultValue)('cover'),
                                                options: [
                                                    {
                                                        label: '等比例裁剪长边',
                                                        value: 'cover'
                                                    },
                                                    {
                                                        label: '等比例留空短边',
                                                        value: 'contain'
                                                    },
                                                    {
                                                        label: '拉伸图片填满',
                                                        value: 'fill'
                                                    },
                                                    {
                                                        label: '按原尺寸裁剪',
                                                        value: 'none'
                                                    }
                                                ],
                                                visibleOn: 'data.showtype === "image"'
                                            },
                                            // 文字
                                            (0, amis_editor_core_3.getSchemaTpl)('avatarText'),
                                            {
                                                type: 'input-group',
                                                name: 'gap',
                                                value: 4,
                                                label: (0, amis_editor_core_4.tipedLabel)('边框距离', '文字居中，文字过多时保持与边框最小的距离'),
                                                body: [
                                                    {
                                                        type: 'input-number',
                                                        name: 'gap',
                                                        min: 0
                                                    },
                                                    {
                                                        type: 'tpl',
                                                        addOnclassName: 'border-0 bg-none',
                                                        tpl: 'px'
                                                    }
                                                ],
                                                visibleOn: 'data.showtype === "text"'
                                            }
                                        ]
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('badge')
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('status')
                        ])
                    ]
                },
                {
                    title: '外观',
                    className: 'p-none',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    type: 'input-number',
                                    label: '长度',
                                    min: 0,
                                    name: 'style.width',
                                    pipeIn: widthOrheightPipeIn
                                },
                                {
                                    type: 'input-number',
                                    label: '高度',
                                    min: 1,
                                    name: 'style.height',
                                    pipeIn: widthOrheightPipeIn
                                },
                                {
                                    type: 'input-number',
                                    label: '圆角',
                                    min: 0,
                                    name: 'style.borderRadius',
                                    pipeIn: function (curValue, rest) {
                                        var _a, _b, _c;
                                        if (curValue) {
                                            return curValue;
                                        }
                                        // 如果是圆形，说明是旧的，直接设置shape为长方形后，返回50%
                                        if (((_a = rest.data) === null || _a === void 0 ? void 0 : _a.shape) === 'circle') {
                                            rest.setValueByName('shape', 'square');
                                            return +(((_b = rest.data) === null || _b === void 0 ? void 0 : _b.size) || DefaultSize) * 0.5;
                                        }
                                        return ((_c = rest.data) === null || _c === void 0 ? void 0 : _c.size) ? 0 : DefaultBorderRadius;
                                    }
                                }
                            ]
                        },
                        // 兼容旧的外观面板
                        {
                            header: '文字',
                            key: 'font',
                            body: [
                                {
                                    type: 'style-font',
                                    label: false,
                                    name: 'style'
                                }
                            ]
                        },
                        {
                            header: '内外边距',
                            key: 'box-model',
                            body: [
                                {
                                    type: 'style-box-model',
                                    label: false,
                                    name: 'style'
                                }
                            ]
                        },
                        {
                            header: '边框',
                            key: 'border',
                            body: [
                                {
                                    type: 'style-border',
                                    label: false,
                                    name: 'style',
                                    disableRadius: true
                                }
                            ]
                        },
                        {
                            title: '背景',
                            body: [
                                {
                                    type: 'style-background',
                                    label: false,
                                    name: 'style',
                                    noImage: true
                                }
                            ]
                        },
                        {
                            header: '阴影',
                            key: 'box-shadow',
                            body: [
                                {
                                    type: 'style-box-shadow',
                                    label: false,
                                    name: 'style.boxShadow'
                                }
                            ]
                        },
                        {
                            header: '其他',
                            key: 'other',
                            body: [
                                {
                                    label: '透明度',
                                    name: 'style.opacity',
                                    min: 0,
                                    max: 1,
                                    step: 0.05,
                                    type: 'input-range',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)(1),
                                    marks: {
                                        '0%': '0',
                                        '50%': '0.5',
                                        '100%': '1'
                                    }
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('style:classNames', { isFormItem: false })
                    ])
                }
            ]);
        };
        return _this;
    }
    AvatarPlugin.id = 'AvatarPlugin';
    AvatarPlugin.scene = ['layout'];
    return AvatarPlugin;
}(amis_editor_core_2.BasePlugin));
exports.AvatarPlugin = AvatarPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(AvatarPlugin);
