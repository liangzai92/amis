"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var validator_1 = require("../../validator");
var amis_editor_core_3 = require("amis-editor-core");
var helper_1 = require("../../renderer/event-control/helper");
var tinycolor2_1 = tslib_1.__importDefault(require("tinycolor2"));
function convertColor(value, format) {
    format = format.toLocaleLowerCase();
    function convert(v) {
        var color = (0, tinycolor2_1.default)(v);
        if (!color.isValid()) {
            return '';
        }
        if (format !== 'rgba') {
            color.setAlpha(1);
        }
        switch (format) {
            case 'hex':
                return color.toHexString();
            case 'hsl':
                return color.toHslString();
            case 'rgb':
                return color.toRgbString();
            case 'rgba':
                var _a = color.toRgb(), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
                return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
            default:
                return color.toString();
        }
    }
    return Array.isArray(value) ? value.map(convert) : convert(value);
}
var presetColors = [
    '#ffffff',
    '#000000',
    '#d0021b',
    '#f5a623',
    '#f8e71c',
    '#7ED321',
    '#4A90E2',
    '#9013fe'
];
var colorFormat = ['hex', 'rgb', 'rgba', 'hsl'];
var presetColorsByFormat = colorFormat.reduce(function (res, fmt) {
    res[fmt] = convertColor(presetColors, fmt);
    return res;
}, {});
var ColorControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ColorControlPlugin, _super);
    function ColorControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-color';
        _this.$schema = '/schemas/ColorControlSchema.json';
        // 组件名称
        _this.name = '颜色框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-eyedropper';
        _this.pluginIcon = 'input-color-plugin';
        _this.description = '支持<code>hex、hls、rgb、rgba</code>格式，默认为<code>hex</code>格式';
        _this.docLink = '/amis/zh-CN/components/form/input-color';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-color',
            label: '颜色',
            name: 'color'
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
        _this.panelTitle = '颜色框';
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            var formatOptions = colorFormat.map(function (value) { return ({
                label: value.toUpperCase(),
                value: value
            }); });
            return (0, amis_editor_core_2.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_2.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_2.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('label'),
                                {
                                    type: 'select',
                                    label: '值格式',
                                    name: 'format',
                                    value: 'hex',
                                    options: formatOptions,
                                    onChange: function (format, oldFormat, model, form) {
                                        var _a = form.data, value = _a.value, presetColors = _a.presetColors;
                                        if (value) {
                                            form.setValueByName('value', convertColor(value, format));
                                        }
                                        if (Array.isArray(presetColors)) {
                                            form.setValueByName('presetColors', convertColor(presetColors, format));
                                        }
                                    }
                                },
                                tslib_1.__spreadArray([], tslib_1.__read(formatOptions.map(function (_a) {
                                    var value = _a.value;
                                    return _this.getConditionalColorPanel(value);
                                })), false),
                                // {
                                //   label: '默认值',
                                //   name: 'value',
                                //   type: 'input-color',
                                //   format: '${format}'
                                // },
                                (0, amis_editor_core_2.getSchemaTpl)('clearable'),
                                (0, amis_editor_core_2.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_2.getSchemaTpl)('remark'),
                                (0, amis_editor_core_2.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_2.getSchemaTpl)('description'),
                                (0, amis_editor_core_2.getSchemaTpl)('autoFillApi')
                            ]
                        },
                        {
                            title: '拾色器',
                            body: tslib_1.__spreadArray([
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_2.tipedLabel)('隐藏调色盘', '开启时，禁止手动输入颜色，只能从备选颜色中选择'),
                                    name: 'allowCustomColor',
                                    disabledOn: 'Array.isArray(presetColors) && presetColors.length === 0',
                                    pipeIn: function (value) {
                                        return typeof value === 'undefined' ? false : !value;
                                    },
                                    pipeOut: function (value) { return !value; }
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_2.tipedLabel)('备选色', '拾色器底部的备选颜色'),
                                    name: 'presetColors',
                                    onText: '自定义',
                                    offText: '默认',
                                    pipeIn: function (value) {
                                        return typeof value === 'undefined' ? false : true;
                                    },
                                    pipeOut: function (value, originValue, _a) {
                                        var _b = _a.format, format = _b === void 0 ? 'hex' : _b;
                                        return !value ? undefined : presetColorsByFormat[format];
                                    },
                                    onChange: function (colors, oldValue, model, form) {
                                        if (Array.isArray(colors) && colors.length === 0) {
                                            form.setValueByName('allowCustomColor', true);
                                        }
                                    }
                                })
                            ], tslib_1.__read(formatOptions.map(function (_a) {
                                var value = _a.value;
                                return _this.getConditionalColorComb(value);
                            })), false)
                        },
                        (0, amis_editor_core_2.getSchemaTpl)('status', {
                            isFormItem: true
                        }),
                        (0, amis_editor_core_2.getSchemaTpl)('validation', {
                            tag: validator_1.ValidatorTag.MultiSelect
                        })
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'props' }))
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_2.getSchemaTpl)('style:formItem', { renderer: renderer }),
                        (0, amis_editor_core_2.getSchemaTpl)('style:classNames', {
                            schema: [
                                (0, amis_editor_core_2.getSchemaTpl)('className', {
                                    label: '描述',
                                    name: 'descriptionClassName',
                                    visibleOn: 'this.description'
                                })
                            ]
                        })
                    ], tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'style' }))
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_2.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    ColorControlPlugin.prototype.getConditionalColorPanel = function (format) {
        var visibleOnNoFormat = format === 'hex' ? ' || !this.format' : '';
        return {
            label: '默认值',
            name: 'value',
            type: 'input-color',
            format: format,
            clearable: true,
            visibleOn: "this.format===\"".concat(format, "\"").concat(visibleOnNoFormat),
            presetColors: presetColorsByFormat[format]
        };
    };
    ColorControlPlugin.prototype.getConditionalColorComb = function (format) {
        var visibleOnNoFormat = format === 'hex' ? ' || !this.format' : '';
        return (0, amis_editor_core_2.getSchemaTpl)('combo-container', {
            type: 'combo',
            mode: 'normal',
            name: 'presetColors',
            items: [
                {
                    type: 'input-color',
                    format: format,
                    name: 'color',
                    clearable: false,
                    presetColors: presetColorsByFormat[format]
                }
            ],
            draggable: false,
            multiple: true,
            visibleOn: "this.presetColors !== undefined && (this.format === \"".concat(format, "\"").concat(visibleOnNoFormat, ")"),
            onChange: function (colors, oldValue, model, form) {
                if (Array.isArray(colors) && colors.length === 0) {
                    form.setValueByName('allowCustomColor', true);
                }
            },
            pipeIn: function (value) {
                return value.map(function (color, index) {
                    if (color === void 0) { color = ''; }
                    return ({
                        key: "".concat(color, "-").concat(index),
                        color: convertColor(color, format)
                    });
                });
            },
            pipeOut: function (value) { return value.map(function (_a) {
                var _b = _a.color, color = _b === void 0 ? '' : _b;
                return color;
            }); }
        });
    };
    ColorControlPlugin.id = 'ColorControlPlugin';
    ColorControlPlugin.scene = ['layout'];
    return ColorControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.ColorControlPlugin = ColorControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ColorControlPlugin);
