"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var BaseControl_1 = require("../../component/BaseControl");
var util_1 = require("../../util");
var TagControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TagControlPlugin, _super);
    function TagControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-tag';
        _this.$schema = '/schemas/TagControlSchema.json';
        // 组件名称
        _this.name = '标签选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-tag';
        _this.pluginIcon = 'input-tag-plugin';
        _this.description = '配置 options 可以实现选择选项';
        _this.docLink = '/amis/zh-CN/components/form/input-tag';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-tag',
            label: '标签',
            name: 'tag',
            options: ['红色', '绿色', '蓝色']
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: '红色' })
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '标签';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '当前标签值'
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
                description: '获取焦点',
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
                                        title: '当前标签值'
                                    },
                                    selectedItems: {
                                        type: 'array',
                                        title: '选中的标签'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '标签列表'
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
                description: '失去焦点',
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
                                        title: '当前标签值'
                                    },
                                    selectedItems: {
                                        type: 'array',
                                        title: '选中的标签'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '标签列表'
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
                description: '重置为默认值'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelBodyCreator = function (context) {
            return (0, BaseControl_1.formItemControl)({
                common: {
                    replace: true,
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                            required: true
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('label'),
                        (0, amis_editor_core_1.getSchemaTpl)('clearable'),
                        (0, amis_editor_core_1.getSchemaTpl)('optionsTip'),
                        (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                            rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                            mode: 'vertical' // 改成上下展示模式
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('joinValues'),
                        (0, amis_editor_core_1.getSchemaTpl)('delimiter'),
                        (0, amis_editor_core_1.getSchemaTpl)('extractValue'),
                        (0, amis_editor_core_1.getSchemaTpl)('autoFillApi', {
                            visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('autoFill', {
                            visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
                        })
                    ]
                },
                option: {
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('optionControlV2', {
                            description: '设置选项后，输入时会下拉这些选项供用户参考。'
                        })
                    ]
                },
                status: {}
            }, context);
        };
        return _this;
    }
    TagControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var type = (0, util_1.resolveOptionType)((_a = node.schema) === null || _a === void 0 ? void 0 : _a.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
            originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
        };
        if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.extractValue) {
            dataSchema = {
                type: 'array',
                title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name)
            };
        }
        else if (((_h = node.schema) === null || _h === void 0 ? void 0 : _h.joinValues) === false) {
            dataSchema = {
                type: 'array',
                title: ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.label) || ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.name),
                items: {
                    type: 'object',
                    title: '成员',
                    properties: {
                        label: {
                            type: 'string',
                            title: '文本'
                        },
                        value: {
                            type: type,
                            title: '值'
                        }
                    }
                },
                originalValue: dataSchema.originalValue
            };
        }
        return dataSchema;
    };
    TagControlPlugin.id = 'TagControlPlugin';
    TagControlPlugin.scene = ['layout'];
    return TagControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.TagControlPlugin = TagControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(TagControlPlugin);
