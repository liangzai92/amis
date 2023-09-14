"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var helper_1 = require("../../renderer/event-control/helper");
var validator_1 = require("../../validator");
var addBtnCssClassName = 'themeCss.addBtnControlClassName';
var IconCssClassName = 'themeCss.iconControlClassName';
var editorPath = 'inputImage.base';
var inputStateFunc = function (visibleOn, state) {
    return [
        (0, amis_editor_core_1.getSchemaTpl)('theme:border', {
            name: "".concat(addBtnCssClassName, ".border:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(editorPath, ".").concat(state, ".body.border")
        }),
        (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
            label: '文字',
            name: "".concat(addBtnCssClassName, ".color:").concat(state),
            labelMode: 'input',
            visibleOn: visibleOn,
            editorThemePath: "".concat(editorPath, ".").concat(state, ".body.color")
        }),
        (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
            label: '背景',
            name: "".concat(addBtnCssClassName, ".background:").concat(state),
            labelMode: 'input',
            needGradient: true,
            needImage: true,
            visibleOn: visibleOn,
            editorThemePath: "".concat(editorPath, ".").concat(state, ".body.bg-color")
        }),
        (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
            label: '图标',
            name: "".concat(addBtnCssClassName, ".icon-color:").concat(state),
            labelMode: 'input',
            visibleOn: visibleOn,
            editorThemePath: "".concat(editorPath, ".").concat(state, ".body.icon-color")
        })
    ];
};
var ImageControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ImageControlPlugin, _super);
    function ImageControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-image';
        _this.$schema = '/schemas/ImageControlSchema.json';
        // 组件名称
        _this.name = '图片上传';
        _this.isBaseComponent = true;
        _this.description = '可以对图片实现裁剪，限制图片的宽高以及大小，支持自动上传及上传多张图片';
        _this.docLink = '/amis/zh-CN/components/form/input-image';
        _this.tags = ['表单项'];
        _this.icon = 'fa fa-crop';
        _this.pluginIcon = 'input-image-plugin';
        _this.scaffold = {
            type: 'input-image',
            label: '图片上传',
            name: 'image',
            autoUpload: true,
            proxy: true,
            uploadType: 'fileReceptor',
            imageClassName: 'r w-full'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        _this.notRenderFormZone = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '上传文件值变化时触发（上传失败同样会触发）',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    file: {
                                        type: 'object',
                                        title: '上传的文件'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'remove',
                eventLabel: '移除文件',
                description: '移除文件时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    item: {
                                        type: 'object',
                                        title: '被移除的文件'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'success',
                eventLabel: '上传成功',
                description: '上传文件成功时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    item: {
                                        type: 'object',
                                        title: '远程上传请求成功后返回的结果数据'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'fail',
                eventLabel: '上传失败',
                description: '上传文件失败时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    item: {
                                        type: 'object',
                                        title: '上传的文件'
                                    },
                                    error: {
                                        type: 'object',
                                        title: '远程上传请求失败后返回的错误信息'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空数据',
                description: '清除选择的文件'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                {
                                    type: 'input-text',
                                    name: 'value',
                                    label: '默认值',
                                    visibleOn: 'typeof this.value !== "undefined"'
                                },
                                {
                                    type: 'input-text',
                                    value: '.jpeg, .jpg, .png, .gif',
                                    name: 'accept',
                                    label: (0, amis_editor_core_2.tipedLabel)('图片类型', '请填入图片的后缀或 <code>MimeType</code>，多个类型用<code>,</code>隔开')
                                },
                                {
                                    type: 'input-text',
                                    name: 'frameImage',
                                    label: '占位图片地址'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('uploadType', {
                                    visibleOn: 'data.submitType === "asUpload" || !data.submitType',
                                    pipeIn: function (value, form) { return value || 'fileReceptor'; },
                                    pipeOut: function (value, form) { return value || 'fileReceptor'; }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                    mode: 'row',
                                    name: 'receiver',
                                    label: (0, amis_editor_core_2.tipedLabel)('文件接收器', '文件接收接口，默认不填则上传到 hiphoto'),
                                    visibleOn: 'data.uploadType === "fileReceptor"',
                                    value: '/api/upload',
                                    __isUpload: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('bos', {
                                    visibleOn: 'data.uploadType === "bos"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('proxy', {
                                    value: true
                                }),
                                // getSchemaTpl('autoFill'),
                                (0, amis_editor_core_1.getSchemaTpl)('multiple', {
                                    patch: {
                                        value: false,
                                        visibleOn: '!data.crop',
                                        label: (0, amis_editor_core_2.tipedLabel)('可多选', '开启后，不能同时开启裁剪功能')
                                    },
                                    body: [
                                        {
                                            name: 'maxLength',
                                            label: '最大数量',
                                            type: 'input-number'
                                        }
                                    ]
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'hideUploadButton',
                                    label: '隐藏上传按钮',
                                    value: false
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'autoUpload',
                                    label: '自动上传',
                                    value: false
                                }),
                                // getSchemaTpl('switch', {
                                //   name: 'compress',
                                //   value: true,
                                //   label: tipedLabel(
                                //     '开启压缩',
                                //     '由 hiphoto 实现，自定义接口将无效'
                                //   )
                                // }),
                                // {
                                //   type: 'container',
                                //   className: 'ae-ExtendMore mb-3',
                                //   visibleOn: 'data.compress',
                                //   name: 'compressOptions',
                                //   body: [
                                //     {
                                //       type: 'input-number',
                                //       label: '最大宽度',
                                //       name: 'compressOptions.maxWidth'
                                //     },
                                //     {
                                //       type: 'input-number',
                                //       label: '最大高度',
                                //       name: 'compressOptions.maxHeight'
                                //     }
                                //   ]
                                // },
                                // getSchemaTpl('switch', {
                                //   name: 'showCompressOptions',
                                //   label: '显示压缩选项'
                                // }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'crop',
                                    visibleOn: '!data.multiple',
                                    label: (0, amis_editor_core_2.tipedLabel)('开启裁剪', '开启后，不能同时开启多选模式'),
                                    pipeIn: function (value) { return !!value; }
                                }),
                                {
                                    type: 'container',
                                    className: 'ae-ExtendMore mb-3',
                                    visibleOn: 'data.crop',
                                    body: [
                                        {
                                            name: 'crop.aspectRatio',
                                            type: 'input-text',
                                            label: '裁剪比率',
                                            pipeOut: amis_editor_core_1.valuePipeOut
                                        },
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            name: 'crop.rotatable',
                                            label: '裁剪时可旋转',
                                            pipeOut: amis_editor_core_1.valuePipeOut
                                        }),
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            name: 'crop.scalable',
                                            label: '裁剪时可缩放',
                                            pipeOut: amis_editor_core_1.valuePipeOut
                                        }),
                                        {
                                            name: 'crop.viewMode',
                                            type: 'select',
                                            label: '裁剪区域',
                                            value: 1,
                                            options: [
                                                { label: '无限制', value: 0 },
                                                { label: '绘图区域', value: 1 }
                                            ],
                                            pipeOut: amis_editor_core_1.valuePipeOut
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'limit',
                                    label: '图片限制',
                                    pipeIn: function (value) { return !!value; }
                                }),
                                {
                                    type: 'container',
                                    className: 'ae-ExtendMore mb-3',
                                    visibleOn: 'data.limit',
                                    body: [
                                        {
                                            name: 'maxSize',
                                            type: 'input-number',
                                            suffix: 'B',
                                            label: (0, amis_editor_core_2.tipedLabel)('最大体积', '超出大小不允许上传，单位字节')
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'limit.width',
                                            label: (0, amis_editor_core_2.tipedLabel)('宽度', '校验优先级比最大宽度和最大宽度高')
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'limit.height',
                                            label: (0, amis_editor_core_2.tipedLabel)('高度', '校验优先级比最大高度和最大高度高')
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'limit.maxWidth',
                                            label: '最大宽度'
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'limit.maxHeight',
                                            label: '最大高度'
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'limit.minWidth',
                                            label: '最小宽度'
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'limit.minHeight',
                                            label: '最小高度'
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'limit.aspectRatio',
                                            label: '宽高比率'
                                        },
                                        {
                                            type: 'input-text',
                                            name: 'limit.aspectRatioLabel',
                                            label: (0, amis_editor_core_2.tipedLabel)('宽高比描述', '当宽高比没有满足条件时，此描述将作为提示信息显示')
                                        }
                                    ]
                                }
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', {
                            isFormItem: true,
                            unsupportStatic: true
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.File })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: context.info.renderer }),
                        {
                            title: '基本样式',
                            body: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([
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
                            ], tslib_1.__read(inputStateFunc("${editorState == 'default' || !editorState}", 'default')), false), tslib_1.__read(inputStateFunc("${editorState == 'hover'}", 'hover')), false), tslib_1.__read(inputStateFunc("${editorState == 'active'}", 'active')), false), [
                                (0, amis_editor_core_1.getSchemaTpl)('theme:radius', {
                                    name: "".concat(addBtnCssClassName, ".border-radius"),
                                    label: '圆角',
                                    editorThemePath: "".concat(editorPath, ".default.body.border")
                                }),
                                {
                                    name: "".concat(addBtnCssClassName, ".--inputImage-base-default-icon"),
                                    label: '选择图标',
                                    type: 'icon-select',
                                    returnSvg: true
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('theme:select', {
                                    name: "".concat(IconCssClassName, ".font-size"),
                                    label: '图标大小',
                                    editorThemePath: "".concat(editorPath, ".default.body.icon-size")
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:select', {
                                    name: "".concat(IconCssClassName, ".margin-bottom"),
                                    label: '图标底边距',
                                    editorThemePath: "".concat(editorPath, ".default.body.icon-margin")
                                })
                            ], false)
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('theme:cssCode', {
                            themeClass: [
                                {
                                    name: '图片上传按钮',
                                    value: 'addOn',
                                    className: 'addBtnControlClassName',
                                    state: ['default', 'hover', 'active']
                                },
                                {
                                    name: '上传图标',
                                    value: 'icon',
                                    className: 'iconControlClassName'
                                }
                            ],
                            isFormItem: true
                        })
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'style' }))
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
    ImageControlPlugin.id = 'ImageControlPlugin';
    return ImageControlPlugin;
}(amis_editor_core_1.BasePlugin));
exports.ImageControlPlugin = ImageControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ImageControlPlugin);
