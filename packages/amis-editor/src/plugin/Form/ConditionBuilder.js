"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionBilderPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var isString_1 = tslib_1.__importDefault(require("lodash/isString"));
var config_1 = tslib_1.__importStar(require("amis-ui/lib/components/condition-builder/config"));
var ConditionBilderPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionBilderPlugin, _super);
    function ConditionBilderPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'condition-builder';
        _this.$schema = '/schemas/ConditionBuilderControlSchema.json';
        // 组件名称
        _this.name = '条件组件';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-group';
        _this.pluginIcon = 'condition-builder-plugin';
        _this.description = '用于设置复杂组合条件，支持添加条件，添加分组，设置组合方式，拖拽排序等功能。';
        _this.docLink = '/amis/zh-CN/components/form/condition-builder';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'condition-builder',
            label: '条件组件',
            name: 'conditions',
            description: '适合让用户自己拼查询条件，然后后端根据数据生成 query where',
            fields: [
                {
                    label: '文本',
                    type: 'text',
                    name: 'text'
                },
                {
                    label: '数字',
                    type: 'number',
                    name: 'number'
                },
                {
                    label: '布尔',
                    type: 'boolean',
                    name: 'boolean'
                },
                {
                    label: '选项',
                    type: 'select',
                    name: 'select',
                    options: [
                        {
                            label: 'A',
                            value: 'a'
                        },
                        {
                            label: 'B',
                            value: 'b'
                        },
                        {
                            label: 'C',
                            value: 'c'
                        },
                        {
                            label: 'D',
                            value: 'd'
                        },
                        {
                            label: 'E',
                            value: 'e'
                        }
                    ]
                },
                {
                    label: '日期',
                    type: 'date',
                    name: 'date'
                },
                {
                    label: '时间',
                    type: 'time',
                    name: 'time'
                },
                {
                    label: '日期时间',
                    type: 'datetime',
                    name: 'datetime'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [_this.scaffold]
        };
        _this.panelTitle = '条件组件';
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                (0, amis_editor_core_3.getSchemaTpl)('source')
            ];
        };
        return _this;
    }
    Object.defineProperty(ConditionBilderPlugin.prototype, "scaffoldForm", {
        get: function () {
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return {
                title: '快速开始-条件组合',
                body: [
                    {
                        type: 'combo',
                        name: 'fields',
                        multiple: true,
                        draggable: true,
                        multiLine: true,
                        items: [
                            {
                                type: 'group',
                                body: [
                                    {
                                        type: 'select',
                                        name: 'type',
                                        placeholder: '条件类型',
                                        options: [
                                            {
                                                label: '文本',
                                                value: 'text'
                                            },
                                            {
                                                label: '数字',
                                                value: 'number'
                                            },
                                            {
                                                label: '布尔',
                                                value: 'boolean'
                                            },
                                            {
                                                label: '日期',
                                                value: 'date'
                                            },
                                            {
                                                label: '日期时间',
                                                value: 'datetime'
                                            },
                                            {
                                                label: '时间',
                                                value: 'time'
                                            },
                                            {
                                                label: '选项',
                                                value: 'select'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'name',
                                        placeholder: '字段名'
                                    },
                                    {
                                        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                        placeholder: '字段名称',
                                        name: 'label'
                                    }
                                ]
                            },
                            {
                                type: 'group',
                                visibleOn: 'data.type === "number"',
                                body: [
                                    {
                                        type: 'input-number',
                                        name: 'minimum',
                                        placeholder: '最小值'
                                    },
                                    {
                                        type: 'input-number',
                                        name: 'maximum',
                                        placeholder: '最大值'
                                    },
                                    {
                                        type: 'input-number',
                                        name: 'step',
                                        min: 0,
                                        placeholder: '步长'
                                    }
                                ]
                            },
                            {
                                type: 'group',
                                visibleOn: '!!~["date", "datetime", "time"].indexOf(data.type)',
                                body: [
                                    {
                                        type: 'input-text',
                                        name: 'format',
                                        placeholder: '值格式'
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'inputFormat',
                                        placeholder: '日期显示格式'
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'timeFormat',
                                        placeholder: '时间显示格式',
                                        visibleOn: 'data.type === "datetime"'
                                    }
                                ]
                            },
                            {
                                type: 'group',
                                visibleOn: 'data.type === "select"',
                                body: [
                                    {
                                        type: 'input-text',
                                        name: 'source',
                                        placeholder: '字段选项远程拉取，支持接口或数据映射'
                                    }
                                ]
                            },
                            {
                                type: 'group',
                                body: [
                                    {
                                        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                        placeholder: '占位符',
                                        name: 'placeholder'
                                    },
                                    {
                                        name: 'operators',
                                        placeholder: '操作符',
                                        asFormItem: true,
                                        children: function (_a) {
                                            var _b, _c;
                                            var data = _a.data, render = _a.render, onChange = _a.onChange;
                                            return render('operations', {
                                                type: 'select',
                                                name: 'operators',
                                                multiple: true,
                                                value: data.value ||
                                                    ((_b = config_1.default.types[data.type]) === null || _b === void 0 ? void 0 : _b.operators) ||
                                                    [],
                                                joinValues: false,
                                                extractValue: true,
                                                options: (_c = config_1.default.types[data.type]) === null || _c === void 0 ? void 0 : _c.operators.map(function (item) {
                                                    if ((0, isObject_1.default)(item) && item.label && item.value) {
                                                        return ({
                                                            label: item.label,
                                                            value: item.value
                                                        } || []);
                                                    }
                                                    else if ((0, isString_1.default)(item)) {
                                                        return ({
                                                            label: config_1.OperationMap[item],
                                                            value: item
                                                        } || []);
                                                    }
                                                    else {
                                                        return [];
                                                    }
                                                })
                                            }, {
                                                onChange: function (value) { return onChange(value); }
                                            });
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                canRebuild: true
            };
        },
        enumerable: false,
        configurable: true
    });
    ConditionBilderPlugin.prototype.buildSubRenderers = function (context, renderers) {
        var plugin = this;
        // return super.buildSubRenderers.apply(this, arguments);
        if (plugin.name && plugin.description) {
            return {
                name: plugin.name,
                icon: plugin.icon,
                pluginIcon: plugin.pluginIcon,
                description: plugin.description,
                previewSchema: plugin.previewSchema,
                tags: plugin.tags,
                docLink: plugin.docLink,
                type: plugin.type,
                scaffold: plugin.scaffold,
                scaffoldForm: this.scaffoldForm,
                disabledRendererPlugin: plugin.disabledRendererPlugin,
                isBaseComponent: plugin.isBaseComponent,
                rendererName: plugin.rendererName
            };
        }
    };
    ConditionBilderPlugin.id = 'ConditionBilderPlugin';
    return ConditionBilderPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ConditionBilderPlugin = ConditionBilderPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ConditionBilderPlugin);
