"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickerControlPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var helper_1 = require("../../renderer/event-control/helper");
var util_1 = require("../../util");
var PickerControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(PickerControlPlugin, _super);
    function PickerControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'picker';
        _this.$schema = '/schemas/PickerControlSchema.json';
        // 组件名称
        _this.name = '列表选取';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-window-restore';
        _this.pluginIcon = 'picker-plugin';
        _this.description = '通过 pickerSchema 配置可供选取的数据源进行选择需要的数据，支持多选';
        _this.docLink = '/amis/zh-CN/components/form/picker';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'picker',
            label: '列表选取',
            name: 'picker',
            options: [
                {
                    label: '选项A',
                    value: 'A'
                },
                {
                    label: '选项B',
                    value: 'B'
                }
            ],
            modalClassName: 'app-popover'
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
                                        title: '选中的值'
                                    },
                                    selectedItems: {
                                        type: 'string',
                                        title: '选中的行记录'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'itemClick',
                eventLabel: '点击选项',
                description: '选项被点击时触发',
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
                                        title: '所点击的选项'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        _this.panelTitle = '列表选取';
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                            name: 'embed',
                            label: '开启内嵌模式'
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('switchDefaultValue'),
                        {
                            type: 'input-text',
                            name: 'value',
                            label: '默认值',
                            visibleOn: 'typeof this.value !== "undefined"'
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('fieldSet', {
                            title: '选项',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('options'),
                                (0, amis_editor_core_1.getSchemaTpl)('api', {
                                    name: 'source',
                                    label: '获取选项接口'
                                }),
                                {
                                    children: (react_1.default.createElement(amis_1.Button, { size: "sm", level: "danger", className: "m-b", onClick: _this.editDetail.bind(_this, context.id), block: true }, "\u914D\u7F6E\u9009\u6846\u8BE6\u60C5"))
                                },
                                {
                                    label: 'labelTpl',
                                    type: 'textarea',
                                    name: 'labelTpl',
                                    labelRemark: '已选定数据的展示样式',
                                    description: '支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/amis/zh-CN/docs/concepts/template">详情</a>'
                                },
                                {
                                    type: 'button-group-select',
                                    name: 'modalMode',
                                    label: '选框类型',
                                    value: 'dialog',
                                    size: 'xs',
                                    options: [
                                        {
                                            label: '弹框',
                                            value: 'dialog'
                                        },
                                        {
                                            label: '抽出式弹框',
                                            value: 'drawer'
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('strictMode'),
                                (0, amis_editor_core_1.getSchemaTpl)('multiple'),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFillApi', {
                                    visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('autoFill', {
                                    visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
                                })
                            ]
                        })
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
    PickerControlPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
        var id = _a.id, info = _a.info;
        if (info.renderer.name === this.rendererName) {
            toolbars.push({
                icon: 'fa fa-expand',
                order: 100,
                tooltip: '配置选框详情',
                onClick: this.editDetail.bind(this, id)
            });
        }
    };
    PickerControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var id = _a.id, schema = _a.schema, region = _a.region, info = _a.info;
        if (info.renderer.name === this.rendererName) {
            menus.push('|', {
                label: '配置选框详情',
                onSelect: this.editDetail.bind(this, id)
            });
        }
    };
    PickerControlPlugin.prototype.editDetail = function (id) {
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        if (!node || !value) {
            return;
        }
        var component = node.getComponent();
        var schema = tslib_1.__assign(tslib_1.__assign({ type: 'crud', mode: 'list' }, (value.pickerSchema || {
            listItem: {
                title: '${label}'
            }
        })), { api: value.source, pickerMode: true, multiple: value.multiple });
        this.manager.openSubEditor({
            title: '配置选框详情',
            value: schema,
            data: { options: component.props.options },
            onChange: function (newValue) {
                newValue = tslib_1.__assign(tslib_1.__assign({}, value), { pickerSchema: tslib_1.__assign({}, newValue), source: newValue.api });
                delete newValue.pickerSchema.api;
                delete newValue.pickerSchema.type;
                delete newValue.pickerSchema.pickerMode;
                delete newValue.pickerSchema.multiple;
                manager.panelChangeValue(newValue, (0, amis_editor_core_4.diff)(value, newValue));
            }
        });
    };
    PickerControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    PickerControlPlugin.id = 'PickerControlPlugin';
    return PickerControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.PickerControlPlugin = PickerControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(PickerControlPlugin);
