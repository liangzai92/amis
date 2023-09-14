"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var CityControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CityControlPlugin, _super);
    function CityControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-city';
        _this.$schema = '/schemas/CityControlSchema.json';
        // 组件名称
        _this.name = '城市选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-building-o';
        _this.pluginIcon = 'input-city-plugin';
        _this.description = '可配置是否选择区域或者城市';
        _this.docLink = '/amis/zh-CN/components/form/input-city';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-city',
            label: '城市选择',
            name: 'city',
            allowCity: true,
            allowDistrict: true,
            extractValue: true
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
        _this.panelTitle = '城市选择';
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
                                        type: 'string',
                                        title: '当前城市'
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
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                                    rendererWrapper: true,
                                    mode: 'vertical' // 改成上下展示模式
                                }),
                                {
                                    name: 'extractValue',
                                    label: '值格式',
                                    type: 'button-group-select',
                                    size: 'sm',
                                    options: [
                                        { label: '行政编码', value: true },
                                        { label: '对象结构', value: false }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'allowCity',
                                    label: '可选城市',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                                    onChange: function (value, oldValue, item, form) {
                                        if (!value) {
                                            var schema = (0, cloneDeep_1.default)(form.data);
                                            form.setValueByName('allowDistrict', undefined);
                                            form.setValueByName('value', schema.extractValue ? '' : {});
                                        }
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'allowDistrict',
                                    label: '可选区域',
                                    visibleOn: 'data.allowCity',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                                    onChange: function (value, oldValue, item, form) {
                                        if (!value) {
                                            var schema = (0, cloneDeep_1.default)(form.data);
                                            form.setValueByName('value', schema.extractValue ? '' : {});
                                        }
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'searchable',
                                    label: '可搜索',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('description')
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
    CityControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f;
        var dataSchema = {
            type: 'string',
            title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
            originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
        };
        if (((_d = node.schema) === null || _d === void 0 ? void 0 : _d.extractValue) === false) {
            dataSchema = tslib_1.__assign(tslib_1.__assign({}, dataSchema), { type: 'object', title: ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.label) || ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.name), properties: {
                    code: {
                        type: 'number',
                        title: '编码'
                    },
                    provinceCode: {
                        type: 'number',
                        title: '省份编码'
                    },
                    province: {
                        type: 'string',
                        title: '省份'
                    },
                    cityCode: {
                        type: 'number',
                        title: '城市编码'
                    },
                    city: {
                        type: 'string',
                        title: '城市'
                    },
                    districtCode: {
                        type: 'number',
                        title: '区域编码'
                    },
                    district: {
                        type: 'string',
                        title: '区域'
                    },
                    street: {
                        type: 'string',
                        title: '街道'
                    }
                } });
        }
        return dataSchema;
    };
    CityControlPlugin.id = 'CityControlPlugin';
    CityControlPlugin.scene = ['layout'];
    return CityControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.CityControlPlugin = CityControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(CityControlPlugin);
