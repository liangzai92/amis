"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_1 = require("amis");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
(0, amis_editor_core_1.setSchemaTpl)('option', {
    name: 'option',
    type: 'input-text',
    label: (0, amis_editor_core_3.tipedLabel)('说明', '选项说明')
});
var CheckboxControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxControlPlugin, _super);
    function CheckboxControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'checkbox';
        _this.$schema = '/schemas/CheckboxControlSchema.json';
        // 组件名称
        _this.name = '勾选框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-check-square-o';
        _this.pluginIcon = 'checkbox-plugin';
        _this.description = '勾选框';
        _this.docLink = '/amis/zh-CN/components/form/checkbox';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'checkbox',
            option: '勾选框',
            name: 'checkbox'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: [
                tslib_1.__assign(tslib_1.__assign({ value: true }, _this.scaffold), { label: '勾选表单' })
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '勾选框';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中状态变化时触发',
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
                                        title: '状态值'
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
                actionLabel: '清空',
                description: '清除选中值'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
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
                                (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                (0, amis_editor_core_1.getSchemaTpl)('option'),
                                {
                                    type: 'ae-switch-more',
                                    hiddenOnDefault: false,
                                    mode: 'normal',
                                    label: '值格式',
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                type: 'input-text',
                                                label: '勾选值',
                                                name: 'trueValue',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                                                pipeOut: amis_editor_core_1.valuePipeOut,
                                                onChange: function (value, oldValue, model, form) {
                                                    var _a;
                                                    var defaultValue = (_a = form === null || form === void 0 ? void 0 : form.data) === null || _a === void 0 ? void 0 : _a.value;
                                                    if ((0, amis_1.isPureVariable)(defaultValue)) {
                                                        return;
                                                    }
                                                    if (oldValue === defaultValue) {
                                                        form.setValues({ value: value });
                                                    }
                                                }
                                            },
                                            {
                                                type: 'input-text',
                                                label: '未勾选值',
                                                name: 'falseValue',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                                                pipeOut: amis_editor_core_1.valuePipeOut,
                                                onChange: function (value, oldValue, model, form) {
                                                    var _a = (form === null || form === void 0 ? void 0 : form.data) || {}, defaultValue = _a.value, trueValue = _a.trueValue;
                                                    if ((0, amis_1.isPureVariable)(defaultValue)) {
                                                        return;
                                                    }
                                                    if (trueValue !== defaultValue) {
                                                        form.setValues({ value: value });
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, (0, omit_1.default)(context === null || context === void 0 ? void 0 : context.schema, ['trueValue', 'falseValue'])), { type: 'switch' }),
                                    needDeleteProps: ['option'],
                                    label: '默认勾选',
                                    rendererWrapper: true,
                                    valueType: 'boolean',
                                    pipeIn: function (value, data) {
                                        var _a, _b;
                                        if ((0, amis_1.isPureVariable)(value)) {
                                            return value;
                                        }
                                        return value === ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.trueValue) !== null && _b !== void 0 ? _b : true);
                                    },
                                    pipeOut: function (value, origin, data) {
                                        if ((0, amis_1.isPureVariable)(value)) {
                                            return value;
                                        }
                                        var _a = data.trueValue, trueValue = _a === void 0 ? true : _a, _b = data.falseValue, falseValue = _b === void 0 ? false : _b;
                                        return value ? trueValue : falseValue;
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi', {
                                    trigger: 'change'
                                })
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: context.info.renderer }),
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames')
                        ])
                    ]
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
    CheckboxControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e;
        // 默认trueValue和falseValue是同类型
        return {
            type: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.trueValue) ? typeof ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.trueValue) : 'boolean',
            title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
            originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
        };
    };
    CheckboxControlPlugin.id = 'CheckboxControlPlugin';
    CheckboxControlPlugin.scene = ['layout'];
    return CheckboxControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.CheckboxControlPlugin = CheckboxControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(CheckboxControlPlugin);
