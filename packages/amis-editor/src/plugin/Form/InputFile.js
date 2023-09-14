"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var FileControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(FileControlPlugin, _super);
    function FileControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-file';
        _this.$schema = '/schemas/FileControlSchema.json';
        // 组件名称
        _this.name = '文件上传';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-upload';
        _this.pluginIcon = 'input-file-plugin';
        _this.description = '可上传多个文件，可配置是否自动上传以及大文件分片上传';
        _this.docLink = '/amis/zh-CN/components/form/input-file';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-file',
            label: '文件上传',
            autoUpload: true,
            proxy: true,
            uploadType: 'fileReceptor',
            name: 'file'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
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
                                (0, amis_editor_core_1.getSchemaTpl)('btnLabel'),
                                (0, amis_editor_core_1.getSchemaTpl)('multiple', {
                                    replace: true,
                                    body: [
                                        {
                                            name: 'maxLength',
                                            label: '最大数量',
                                            type: 'input-number'
                                        }
                                    ]
                                }),
                                {
                                    type: 'input-group',
                                    name: 'maxSize',
                                    label: '最大体积',
                                    body: [
                                        {
                                            type: 'input-number',
                                            name: 'maxSize'
                                        },
                                        {
                                            type: 'tpl',
                                            addOnclassName: 'border-0 bg-none',
                                            tpl: 'B'
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('uploadType', {
                                    options: [
                                        {
                                            label: '随表单提交',
                                            value: 'asForm'
                                        },
                                        {
                                            label: '文件接收器',
                                            value: 'fileReceptor'
                                        },
                                        {
                                            label: '对象存储',
                                            value: 'bos'
                                        }
                                    ],
                                    pipeIn: function (value, form) { return value || 'fileReceptor'; },
                                    pipeOut: function (value, form) { return value || 'fileReceptor'; },
                                    onChange: function (value, oldValue, model, form) {
                                        if (value === 'asForm') {
                                            // 作为表单数据，自动上传开启
                                            form.setValueByName('autoUpload', true);
                                            var formType = form.getValueByName('formType') || 'asBlob';
                                            form.setValueByName(formType, true);
                                        }
                                        else {
                                            form.setValueByName('asBase64', false);
                                            form.setValueByName('asBlob', false);
                                        }
                                    }
                                }),
                                {
                                    name: 'formType',
                                    type: 'select',
                                    tiled: true,
                                    visibleOn: 'data.uploadType === "asForm"',
                                    value: 'asBlob',
                                    label: (0, amis_editor_core_2.tipedLabel)('数据格式', '${formType ? asBase64 ? "小文件时可以使用，默认给 Form 提交的是文件下载地址，设置后给 Form 提交文件内容的 base64 格式字符串。" : "File 控件不接管文件上传，直接由表单的保存接口完成。和 Base64 选项二选一。" : ""}'),
                                    options: [
                                        {
                                            label: 'Base64',
                                            value: 'asBase64'
                                        },
                                        {
                                            label: '二进制',
                                            value: 'asBlob'
                                        }
                                    ],
                                    onChange: function (value, oldValue, model, form) {
                                        form.setValueByName('asBase64', 'asBase64' === value);
                                        form.setValueByName('asBlob', 'asBlob' === value);
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('bos', {
                                    visibleOn: 'data.uploadType === "bos"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('proxy', {
                                    value: true,
                                    visibleOn: 'data.uploadType !== "asForm" || !data.uploadType'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'autoUpload',
                                    label: '自动上传',
                                    value: true,
                                    visibleOn: 'data.uploadType !== "asForm"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'useChunk',
                                    label: '开启分块',
                                    value: false,
                                    pipeIn: function (value, form) { return !!value; },
                                    visibleOn: 'data.uploadType !== "asForm"'
                                }),
                                {
                                    type: 'container',
                                    className: 'ae-ExtendMore mb-3',
                                    visibleOn: 'data.uploadType !== "asForm" && data.useChunk === true',
                                    body: [
                                        {
                                            type: 'input-group',
                                            name: 'chunkSize',
                                            label: '分块大小',
                                            body: [
                                                {
                                                    type: 'input-number',
                                                    name: 'chunkSize'
                                                },
                                                {
                                                    type: 'tpl',
                                                    addOnclassName: 'border-0 bg-none',
                                                    tpl: 'B'
                                                }
                                            ]
                                        },
                                        {
                                            type: 'Container',
                                            visibleOn: 'data.uploadType == "fileReceptor" && data.useChunk != false',
                                            body: [
                                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                                    mode: 'row',
                                                    name: 'startChunkApi',
                                                    label: (0, amis_editor_core_2.tipedLabel)('分块准备接口', '用来做分块前的准备工作，一个文件只会调用一次。如果出错了，后续的分块上传就会中断。'),
                                                    value: '/api/upload/startChunk'
                                                }),
                                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                                    mode: 'row',
                                                    name: 'chunkApi',
                                                    label: (0, amis_editor_core_2.tipedLabel)('分块上传接口', '用来接收每个分块上传，大文件会根据 chunkSize 分割成多块，然后每块上传都会调用这个接口。'),
                                                    value: '/api/upload/chunk'
                                                }),
                                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                                    mode: 'row',
                                                    name: 'finishChunkApi',
                                                    label: (0, amis_editor_core_2.tipedLabel)('上传完成接口', '等所有分块上传完后，将上传文件收集到的 `eTag` 信息合并一起，再次请求后端完成文件上传。'),
                                                    value: '/api/upload/finishChunk'
                                                })
                                            ]
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                    name: 'receiver',
                                    label: (0, amis_editor_core_2.tipedLabel)('文件接收器', '默认不填写将上传到 bos，可以在系统配置中设置为自己的 bos 地址。'),
                                    className: 'inputFile-apiControl',
                                    renderLabel: true,
                                    value: '/api/upload/file',
                                    __isUpload: true,
                                    visibleOn: 'data.uploadType === "fileReceptor" && !data.useChunk'
                                }),
                                {
                                    type: 'input-text',
                                    value: '',
                                    name: 'accept',
                                    label: (0, amis_editor_core_2.tipedLabel)('文件类型', '请填入文件的后缀，多个类型用<code>,</code>隔开')
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('fileUrl', {
                                    name: 'templateUrl',
                                    label: (0, amis_editor_core_2.tipedLabel)('模板链接', '适用于excel上传等有上传格式要求的场景，为用户提供一个模板下载入口')
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'drag',
                                    label: '拖拽上传',
                                    value: false
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi', {
                                    visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFill', {
                                    visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
                                })
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
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                            unsupportStatic: true,
                            schema: [
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'descriptionClassName',
                                    label: '描述'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'btnClassName',
                                    label: '选择按钮'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'btnUploadClassName',
                                    label: '上传按钮'
                                })
                            ]
                        })
                    ])
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
    FileControlPlugin.id = 'FileControlPlugin';
    return FileControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.FileControlPlugin = FileControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(FileControlPlugin);
