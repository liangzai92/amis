"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var BaseControl_1 = require("../../component/BaseControl");
var util_1 = require("../../util");
var ListControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ListControlPlugin, _super);
    function ListControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'list-select';
        _this.$schema = '/schemas/ListControlSchema.json';
        // 组件名称
        _this.name = '列表选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-ellipsis-h';
        _this.pluginIcon = 'list-select-plugin';
        _this.description = '单选或者多选，支持 source 拉取选项，选项可配置图片，也可以自定义 HTML 配置';
        _this.docLink = '/amis/zh-CN/components/form/list-select';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'list-select',
            label: '列表',
            name: 'list',
            options: [
                {
                    label: '选项A',
                    value: 'A'
                },
                {
                    label: '选项B',
                    value: 'B'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: 'A' })
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '列表选择';
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化时触发',
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
                                        title: '选中的值'
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
                        (0, amis_editor_core_1.getSchemaTpl)('multiple'),
                        (0, amis_editor_core_1.getSchemaTpl)('extractValue'),
                        (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                            rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                            mode: 'vertical',
                            useSelectMode: true,
                            visibleOn: 'this.options && this.options.length > 0'
                        })
                    ]
                },
                option: {
                    body: [(0, amis_editor_core_1.getSchemaTpl)('optionControlV2')]
                },
                status: {}
            }, context);
        };
        return _this;
    }
    ListControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        var type = (0, util_1.resolveOptionType)((_a = node.schema) === null || _a === void 0 ? void 0 : _a.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
            originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
        };
        if (((_e = node.schema) === null || _e === void 0 ? void 0 : _e.joinValues) === false) {
            dataSchema = tslib_1.__assign(tslib_1.__assign({}, dataSchema), { type: 'object', title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name), properties: {
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
        if ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.multiple) {
            if ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.extractValue) {
                dataSchema = {
                    type: 'array',
                    title: ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.label) || ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.name)
                };
            }
            else if (((_m = node.schema) === null || _m === void 0 ? void 0 : _m.joinValues) === false) {
                dataSchema = {
                    type: 'array',
                    title: ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.label) || ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.name),
                    items: {
                        type: 'object',
                        title: '成员',
                        properties: dataSchema.properties
                    },
                    originalValue: dataSchema.originalValue
                };
            }
        }
        return dataSchema;
    };
    ListControlPlugin.id = 'ListControlPlugin';
    return ListControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.ListControlPlugin = ListControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(ListControlPlugin);
