"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var ProgressPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressPlugin, _super);
    function ProgressPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'progress';
        _this.$schema = '/schemas/ProgressSchema.json';
        // 组件名称
        _this.name = '进度展示';
        _this.searchKeywords = '进度条、progress';
        _this.isBaseComponent = true;
        _this.description = '用来展示进度。可配置各个进度段用不同的颜色展示。';
        _this.docLink = '/amis/zh-CN/components/progress';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-angle-double-right';
        _this.pluginIcon = 'progress-plugin';
        _this.scaffold = {
            type: 'progress',
            mode: 'line',
            value: 66,
            strokeWidth: 6,
            valueTpl: '${value}%'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '进度';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isFormItem = !!(context === null || context === void 0 ? void 0 : context.info.renderer.isFormItem);
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                {
                                    label: '类型',
                                    name: 'mode',
                                    type: 'select',
                                    option: '继承',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)('line'),
                                    tiled: true,
                                    options: [
                                        {
                                            label: '线形',
                                            value: 'line'
                                        },
                                        {
                                            label: '圆形',
                                            value: 'circle'
                                        },
                                        {
                                            label: '仪表盘',
                                            value: 'dashboard'
                                        }
                                    ],
                                    onChange: function (value, oldValue, model, form) {
                                        if (value === 'circle') {
                                            form.setValueByName('gapDegree', 0);
                                            form.setValueByName('gapPosition', '');
                                        }
                                        else if (value === 'dashboard') {
                                            form.setValueByName('gapDegree', 75);
                                            form.setValueByName('gapPosition', 'bottom');
                                        }
                                    }
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('valueFormula', {
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'input-number' }),
                                    needDeleteProps: ['placeholder'],
                                    valueType: 'number' // 期望数值类型，不过 amis中会尝试字符串 trans 数值类型
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('menuTpl', {
                                    label: (0, amis_editor_core_4.tipedLabel)('数值模板', '值渲染模板，支持JSX、数据域变量使用, 默认 ${value}%'),
                                    name: 'valueTpl',
                                    variables: [
                                        {
                                            label: '值字段',
                                            children: [
                                                {
                                                    label: '进度值',
                                                    value: 'value',
                                                    tag: 'number'
                                                }
                                            ]
                                        }
                                    ],
                                    requiredDataPropsVariables: true
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'showLabel',
                                    label: '进度值',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)(true)
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('placeholder', {
                                    value: '-',
                                    placeholder: '无数据空位提示',
                                    label: (0, amis_editor_core_4.tipedLabel)('占位提示', '数据字段未定义时的值，不包括0')
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status', { isFormItem: isFormItem })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    type: 'select',
                                    name: 'progressClassName',
                                    label: '尺寸',
                                    value: '',
                                    options: [
                                        {
                                            label: '极小',
                                            value: 'w-xs'
                                        },
                                        {
                                            label: '小',
                                            value: 'w-sm'
                                        },
                                        {
                                            label: '中',
                                            value: 'w-md'
                                        },
                                        {
                                            label: '大',
                                            value: 'w-lg'
                                        },
                                        {
                                            label: '默认',
                                            value: ''
                                        }
                                    ]
                                },
                                {
                                    type: 'input-number',
                                    name: 'strokeWidth',
                                    label: '线条宽度',
                                    value: 6,
                                    min: 0,
                                    max: 100
                                },
                                {
                                    type: 'input-number',
                                    name: 'gapDegree',
                                    visibleOn: 'data.mode === "dashboard"',
                                    label: '缺口角度',
                                    value: 75,
                                    min: 0,
                                    max: 295
                                },
                                {
                                    label: '缺口位置',
                                    name: 'gapPosition',
                                    type: 'button-group-select',
                                    visibleOn: 'data.mode === "dashboard"',
                                    value: (0, amis_editor_core_3.defaultValue)('bottom'),
                                    tiled: true,
                                    options: [
                                        {
                                            label: '上',
                                            value: 'top'
                                        },
                                        {
                                            label: '下',
                                            value: 'bottom'
                                        },
                                        {
                                            label: '左',
                                            value: 'left'
                                        },
                                        {
                                            label: '右',
                                            value: 'right'
                                        }
                                    ]
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'animate',
                                    label: '显示动画',
                                    visibleOn: 'data.mode === "line"'
                                }),
                                {
                                    type: 'button-group-select',
                                    name: 'styleType',
                                    label: '样式',
                                    visibleOn: 'data.mode === "line"',
                                    options: [
                                        {
                                            label: '纯色',
                                            value: 'purity'
                                        },
                                        {
                                            label: '条纹',
                                            value: 'stripe'
                                        }
                                    ],
                                    pipeIn: function (value, form) {
                                        var _a;
                                        return ((_a = form.data) === null || _a === void 0 ? void 0 : _a.stripe) ? 'stripe' : 'purity';
                                    },
                                    onChange: function (value, oldValue, model, form) {
                                        form.setValueByName('stripe', value === 'stripe');
                                    }
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                                    name: 'map',
                                    type: 'combo',
                                    mode: 'normal',
                                    multiple: true,
                                    label: (0, amis_editor_core_4.tipedLabel)('颜色', '分配不同的值段，用不同的颜色提示用户。若只配置一个颜色不配置value，默认value为100'),
                                    items: [
                                        {
                                            placeholder: 'color',
                                            type: 'input-color',
                                            name: 'color'
                                        },
                                        {
                                            type: 'input-number',
                                            name: 'value',
                                            placeholder: 'value',
                                            columnClassName: 'w-xs',
                                            unique: true,
                                            requiredOn: 'data.map?.length > 1',
                                            min: 0,
                                            step: 10,
                                            precision: 0
                                        }
                                    ],
                                    value: [
                                        { color: '#dc3545', value: 20 },
                                        { color: '#fad733', value: 60 },
                                        { color: '#28a745', value: 100 }
                                    ],
                                    pipeIn: function (mapItem) {
                                        // schema传入
                                        if (Array.isArray(mapItem) && mapItem.length) {
                                            return typeof mapItem[0] === 'string'
                                                ? mapItem.map(function (item, index) {
                                                    var span = 100 / mapItem.length;
                                                    return { value: (index + 1) * span, color: item };
                                                })
                                                : mapItem.length === 1 && !mapItem[0].value
                                                    ? [{ color: mapItem[0].color, value: 100 }]
                                                    : mapItem;
                                        }
                                        else {
                                            return mapItem ? [mapItem] : [];
                                        }
                                    },
                                    pipeOut: function (mapItem, origin, data) {
                                        // 传入schema
                                        if (mapItem.length === 1 && !mapItem[0].value) {
                                            // 只有一个颜色且value未设置时默认为100
                                            return [{ color: mapItem[0].color, value: 100 }];
                                        }
                                        else {
                                            return mapItem;
                                        }
                                    }
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                            schema: [],
                            isFormItem: isFormItem
                        })
                    ])
                }
            ]);
        };
        return _this;
    }
    ProgressPlugin.id = 'ProgressPlugin';
    ProgressPlugin.scene = ['layout'];
    return ProgressPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ProgressPlugin = ProgressPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ProgressPlugin);
