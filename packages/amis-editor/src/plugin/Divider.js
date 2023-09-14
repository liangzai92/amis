"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DividerPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var DividerPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DividerPlugin, _super);
    function DividerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'divider';
        _this.$schema = '/schemas/DividerSchema.json';
        // 组件名称
        _this.name = '分隔线';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-minus';
        _this.pluginIcon = 'divider-plugin';
        _this.description = '用来展示一个分割线，可用来做视觉上的隔离。';
        _this.scaffold = {
            type: 'divider'
        };
        _this.previewSchema = {
            type: 'divider',
            className: 'm-t-none m-b-none'
        };
        _this.panelTitle = '分隔线';
        _this.panelJustify = true;
        _this.tags = ['展示'];
        _this.panelBody = (0, amis_editor_core_3.getSchemaTpl)('tabs', [
            {
                title: '外观',
                body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                    {
                        title: '基本样式',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                            (0, amis_editor_core_3.getSchemaTpl)('layout:width:v2', {
                                visibleOn: 'data.style && data.style.position && (data.style.position === "fixed" || data.style.position === "absolute")'
                            }),
                            {
                                mode: 'horizontal',
                                type: 'button-group-select',
                                label: '类型',
                                name: 'lineStyle',
                                value: 'dashed',
                                options: [
                                    {
                                        value: 'dashed',
                                        label: '虚线'
                                    },
                                    {
                                        value: 'solid',
                                        label: '实线'
                                    }
                                ]
                            },
                            {
                                mode: 'horizontal',
                                type: 'button-group-select',
                                label: '方向',
                                name: 'direction',
                                value: 'horizontal',
                                options: [
                                    {
                                        value: 'horizontal',
                                        label: '水平'
                                    },
                                    {
                                        value: 'vertical',
                                        label: '垂直'
                                    }
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('theme:select', {
                                mode: 'horizontal',
                                label: '长度',
                                name: 'style.width',
                                placeholder: '100%',
                                visibleOn: 'direction !== "vertical"',
                                clearValueOnHidden: true
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('theme:select', {
                                mode: 'horizontal',
                                label: '长度',
                                name: 'style.height',
                                placeholder: 'var(--sizes-base-15)',
                                visibleOn: 'direction === "vertical"',
                                clearValueOnHidden: true
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('theme:select', {
                                mode: 'horizontal',
                                label: '宽度',
                                name: 'style.borderWidth',
                                placeholder: '1px'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('theme:colorPicker', {
                                mode: 'horizontal',
                                label: '颜色',
                                name: 'color',
                                placeholder: 'var(--colors-neutral-line-8)',
                                labelMode: 'input',
                                needGradient: true
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('theme:paddingAndMargin', {
                                name: 'style',
                                hidePadding: true
                            }),
                            {
                                mode: 'horizontal',
                                type: 'input-number',
                                label: '角度',
                                name: 'rotate',
                                value: 0
                            }
                        ]
                    }
                ])
            },
            {
                title: '显隐',
                body: [(0, amis_editor_core_3.getSchemaTpl)('ref'), (0, amis_editor_core_3.getSchemaTpl)('visible')]
            }
        ]);
        return _this;
    }
    DividerPlugin.id = 'DividerPlugin';
    DividerPlugin.scene = ['layout'];
    return DividerPlugin;
}(amis_editor_core_2.BasePlugin));
exports.DividerPlugin = DividerPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DividerPlugin);
