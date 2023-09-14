"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var LocationControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(LocationControlPlugin, _super);
    function LocationControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'location-picker';
        _this.$schema = '/schemas/LocationControlSchema.json';
        // 组件名称
        _this.name = '地理位置选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-location-arrow';
        _this.pluginIcon = 'location-picker-plugin';
        _this.description = '地理位置选择';
        _this.docLink = '/amis/zh-CN/components/form/location-picker';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'location-picker',
            name: 'location',
            label: '位置选择'
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
        _this.panelTitle = '地理位置选择';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                        required: true
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('label'),
                                    /* 备注: 暂时不开放
                                    getSchemaTpl('valueFormula', {
                                      rendererSchema: context?.schema,
                                    }),
                                    */
                                    {
                                        type: 'input-text',
                                        name: 'ak',
                                        label: '百度地图的 AK',
                                        required: true,
                                        validationErrors: {
                                            isRequired: 'AK不能为空，请访问http://lbsyun.baidu.com/获取密钥(AK)'
                                        },
                                        description: '请从<a href="http://lbsyun.baidu.com/" target="_blank" class="text-sm">百度地图开放平台</a>获取'
                                    },
                                    {
                                        type: 'select',
                                        name: 'coordinatesType',
                                        label: '坐标格式',
                                        value: 'bd09',
                                        options: [
                                            { label: '百度坐标', value: 'bd09' },
                                            { label: '国测局坐标', value: 'gcj02' }
                                        ]
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('clearable'),
                                    (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                    (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                    (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                                    (0, amis_editor_core_1.getSchemaTpl)('description')
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('status', {
                                isFormItem: true,
                                readonly: false
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.Text })
                        ])
                    ]
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: renderer }),
                            (0, amis_editor_core_1.getSchemaTpl)('theme:classNames', {
                                schema: [
                                    {
                                        type: 'theme-classname',
                                        label: '控件',
                                        name: 'inputClassName'
                                    },
                                    {
                                        type: 'theme-classname',
                                        label: '表单项',
                                        name: 'className'
                                    },
                                    {
                                        type: 'theme-classname',
                                        label: '静态表单项',
                                        name: 'staticClassName'
                                    }
                                ]
                            })
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    LocationControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c;
        return {
            type: 'object',
            title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
            properties: {
                city: {
                    type: 'string',
                    title: '城市'
                },
                address: {
                    type: 'string',
                    title: '地址'
                },
                lng: {
                    type: 'number',
                    title: '经度'
                },
                lat: {
                    type: 'number',
                    title: '纬度'
                },
                vendor: {
                    type: 'string',
                    title: '地图厂商'
                }
            },
            originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
        };
    };
    LocationControlPlugin.id = 'LocationControlPlugin';
    return LocationControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.LocationControlPlugin = LocationControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(LocationControlPlugin);
