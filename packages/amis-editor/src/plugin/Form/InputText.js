"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var helper_2 = require("../../renderer/style-control/helper");
var util_1 = require("../../util");
var isText = 'data.type === "input-text"';
var isPassword = 'data.type === "input-password"';
var isEmail = 'data.type === "input-email"';
var isUrl = 'data.type === "input-url"';
function isTextShow(value, name) {
    return ['input-text'].includes(value) ? !!name : false;
}
var TextControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TextControlPlugin, _super);
    function TextControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-text';
        _this.$schema = '/schemas/TextControlSchema.json';
        _this.order = -600;
        // 添加源对应组件中文名称 & type字段
        _this.searchKeywords = '文本框、邮箱框、input-email、URL框、input-url、密码框、input-password';
        // 组件名称
        _this.name = '文本框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-terminal';
        _this.pluginIcon = 'input-text-plugin';
        _this.description = '文本输入框，支持普通文本、密码、URL、邮箱等多种内容输入';
        _this.docLink = '/amis/zh-CN/components/form/text';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-text',
            label: '文本',
            name: 'text'
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
        _this.panelTitle = '文本框';
        _this.events = [
            // {
            //   eventName: 'click',
            //   eventLabel: '点击',
            //   description: '点击事件'
            // },
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '输入框内容变化',
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
                                        title: '当前文本内容'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'focus',
                eventLabel: '获取焦点',
                description: '输入框获取焦点',
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
                                        title: '当前文本内容'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'blur',
                eventLabel: '失去焦点',
                description: '输入框失去焦点',
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
                                        title: '当前文本内容'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
            // 貌似无效，先下掉
            // {
            //   eventName: 'enter',
            //   eventLabel: '回车',
            //   description: '按键回车'
            // }
        ];
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清空输入框内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_3.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('label'),
                                (0, amis_editor_core_3.getSchemaTpl)('inputType', {
                                    value: _this.scaffold.type,
                                    onChange: function (value, oldValue, model, form) {
                                        var _a = form.data, showCounter = _a.showCounter, validations = _a.validations, _b = _a.validationErrors, validationErrors = _b === void 0 ? {} : _b, autoComplete = _a.autoComplete;
                                        var is_old_email = oldValue === 'input-email';
                                        var is_old_url = oldValue === 'input-url';
                                        if (is_old_email) {
                                            validations && delete validations.isEmail;
                                            validationErrors && delete validationErrors.isEmail;
                                        }
                                        if (is_old_url) {
                                            validations && delete validations.isUrl;
                                            validationErrors && delete validationErrors.isUrl;
                                        }
                                        form.setValues({
                                            type: value,
                                            showCounter: ['input-url', 'input-email'].includes(value)
                                                ? undefined
                                                : !!showCounter,
                                            autoComplete: ['input-text'].includes(value)
                                                ? autoComplete
                                                : undefined
                                        });
                                        form.changeValue('validations', tslib_1.__assign({}, validations));
                                        form.changeValue('validationErrors', tslib_1.__assign({}, validationErrors));
                                    }
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('tplFormulaControl', {
                                    name: 'value',
                                    label: '默认值'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('clearable'),
                                (0, amis_editor_core_3.getSchemaTpl)('showCounter', {
                                    visibleOn: "".concat(isText, " || ").concat(isPassword)
                                }),
                                {
                                    name: 'maxLength',
                                    label: (0, amis_editor_core_3.tipedLabel)('最大字数', '限制输入最多文字数量'),
                                    type: 'input-number',
                                    min: 0,
                                    step: 1
                                },
                                {
                                    name: 'addOn',
                                    label: (0, amis_editor_core_3.tipedLabel)('AddOn', '输入框左侧或右侧的附加挂件'),
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    formType: 'extend',
                                    title: 'AddOn',
                                    bulk: false,
                                    defaultData: {
                                        label: '按钮',
                                        type: 'button'
                                    },
                                    form: {
                                        body: [
                                            {
                                                name: 'type',
                                                label: '类型',
                                                type: 'button-group-select',
                                                inputClassName: 'items-center',
                                                pipeIn: (0, amis_editor_core_3.defaultValue)('button'),
                                                options: [
                                                    {
                                                        label: '文本',
                                                        value: 'text'
                                                    },
                                                    {
                                                        label: '按钮',
                                                        value: 'button'
                                                    },
                                                    {
                                                        label: '提交',
                                                        value: 'submit'
                                                    }
                                                ]
                                            },
                                            (0, amis_editor_core_3.getSchemaTpl)('horizontal-align', {
                                                name: 'position',
                                                pipeIn: (0, amis_editor_core_3.defaultValue)('right')
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('addOnLabel'),
                                            (0, amis_editor_core_3.getSchemaTpl)('icon')
                                        ]
                                    }
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_3.getSchemaTpl)('remark'),
                                (0, amis_editor_core_3.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_3.getSchemaTpl)('description'),
                                (0, amis_editor_core_3.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        {
                            title: '选项',
                            visibleOn: "".concat(isText, " && (data.options  || data.autoComplete || data.source)"),
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('optionControlV2'),
                                (0, amis_editor_core_3.getSchemaTpl)('multiple', {
                                    visibleOn: "".concat(isText, " || ").concat(isUrl)
                                }),
                                {
                                    type: 'ae-Switch-More',
                                    mode: 'normal',
                                    label: (0, amis_editor_core_3.tipedLabel)('自动补全', '根据输入内容，调用接口提供选项。当前输入值可用${term}变量'),
                                    visibleOn: isText,
                                    formType: 'extend',
                                    defaultData: {
                                        autoComplete: {
                                            method: 'get',
                                            url: ''
                                        }
                                    },
                                    form: {
                                        body: [
                                            (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                                                name: 'autoComplete',
                                                label: '接口',
                                                description: '',
                                                visibleOn: 'data.autoComplete !== false'
                                            }),
                                            {
                                                label: (0, amis_editor_core_3.tipedLabel)('显示字段', '选项文本对应的数据字段，多字段合并请通过模板配置'),
                                                type: 'input-text',
                                                name: 'labelField',
                                                placeholder: '选项文本对应的字段'
                                            },
                                            {
                                                label: '值字段',
                                                type: 'input-text',
                                                name: 'valueField',
                                                placeholder: '值对应的字段'
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status', {
                            isFormItem: true,
                            readonly: true
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('validation', {
                            tag: function (data) {
                                switch (data.type) {
                                    case 'input-password':
                                        return validator_1.ValidatorTag.Password;
                                    case 'input-email':
                                        return validator_1.ValidatorTag.Email;
                                    case 'input-url':
                                        return validator_1.ValidatorTag.URL;
                                    default:
                                        return validator_1.ValidatorTag.Text;
                                }
                            }
                        })
                        // {
                        //   title: '高级',
                        //   body: [
                        //     getSchemaTpl('autoFill')
                        //   ]
                        // }
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'props' }))
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_3.getSchemaTpl)('style:formItem', { renderer: renderer }),
                        (0, amis_editor_core_3.getSchemaTpl)('theme:form-label'),
                        (0, amis_editor_core_3.getSchemaTpl)('theme:form-description'),
                        {
                            title: '输入框样式',
                            body: tslib_1.__spreadArray([], tslib_1.__read((0, helper_2.inputStateTpl)('themeCss.inputControlClassName', 'input.base.default')), false)
                        },
                        {
                            title: 'AddOn样式',
                            visibleOn: 'this.addOn && this.addOn.type === "text"',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('theme:font', {
                                    label: '文字',
                                    name: 'themeCss.addOnClassName.font:default'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('theme:paddingAndMargin', {
                                    name: 'themeCss.addOnClassName.padding-and-margin:default'
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('theme:cssCode', {
                            themeClass: [
                                {
                                    name: '输入框',
                                    value: '',
                                    className: 'inputControlClassName',
                                    state: ['default', 'hover', 'active']
                                },
                                {
                                    name: 'addOn',
                                    value: 'addOn',
                                    className: 'addOnClassName'
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
                        (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    TextControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var type = (0, util_1.resolveOptionType)((_a = node.schema) === null || _a === void 0 ? void 0 : _a.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
            originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
        };
        // 选择器模式
        if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.options) {
            if (((_f = node.schema) === null || _f === void 0 ? void 0 : _f.joinValues) === false) {
                dataSchema = tslib_1.__assign(tslib_1.__assign({}, dataSchema), { type: 'object', title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name), properties: {
                        label: {
                            type: 'string',
                            title: '文本'
                        },
                        value: {
                            type: type,
                            title: '值'
                        }
                    } });
            }
            if ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.multiple) {
                if ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.extractValue) {
                    dataSchema = {
                        type: 'array',
                        title: ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.label) || ((_m = node.schema) === null || _m === void 0 ? void 0 : _m.name)
                    };
                }
                else if (((_o = node.schema) === null || _o === void 0 ? void 0 : _o.joinValues) === false) {
                    dataSchema = {
                        type: 'array',
                        title: ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.label) || ((_q = node.schema) === null || _q === void 0 ? void 0 : _q.name),
                        items: {
                            type: 'object',
                            title: '成员',
                            properties: dataSchema.properties
                        },
                        originalValue: dataSchema.originalValue
                    };
                }
            }
        }
        return dataSchema;
    };
    TextControlPlugin.id = 'TextControlPlugin';
    TextControlPlugin.scene = ['layout'];
    return TextControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.TextControlPlugin = TextControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TextControlPlugin);
