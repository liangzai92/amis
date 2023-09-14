"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file 属性表
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var PropertyPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(PropertyPlugin, _super);
    function PropertyPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'property';
        _this.$schema = '/schemas/PropertySchema.json';
        // 组件名称
        _this.name = '属性表';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-list';
        _this.pluginIcon = 'property-sheet-plugin';
        _this.description = '属性表';
        _this.docLink = '/amis/zh-CN/components/property';
        _this.tags = ['功能'];
        _this.scaffold = {
            type: 'property',
            title: '机器配置',
            items: [
                {
                    label: 'cpu',
                    content: '1 core'
                },
                {
                    label: 'memory',
                    content: '4G'
                },
                {
                    label: 'disk',
                    content: '80G'
                },
                {
                    label: 'network',
                    content: '4M',
                    span: 2
                },
                {
                    label: 'IDC',
                    content: 'beijing'
                },
                {
                    label: 'Note',
                    content: '其它说明',
                    span: 3
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '属性表';
        _this.panelBody = [
            (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        (0, amis_editor_core_3.getSchemaTpl)('propertyTitle'),
                        {
                            label: '每行显示几列',
                            type: 'input-number',
                            value: 3,
                            name: 'column'
                        },
                        {
                            type: 'radios',
                            name: 'mode',
                            inline: true,
                            value: 'table',
                            label: '显示模式',
                            options: ['table', 'simple']
                        },
                        {
                            label: '分隔符',
                            type: 'input-text',
                            name: 'separator',
                            visibleOn: 'data.mode === "simple"'
                        },
                        {
                            label: '属性取自变量',
                            type: 'input-text',
                            name: 'source'
                        },
                        {
                            label: '属性列表',
                            name: 'items',
                            type: 'combo',
                            multiple: true,
                            multiLine: true,
                            draggable: true,
                            addButtonText: '新增',
                            scaffold: {
                                label: '',
                                content: '',
                                span: 1
                            },
                            items: [
                                (0, amis_editor_core_3.getSchemaTpl)('propertyLabel'),
                                (0, amis_editor_core_3.getSchemaTpl)('propertyContent'),
                                {
                                    type: 'input-number',
                                    mode: 'inline',
                                    size: 'sm',
                                    label: '跨几列',
                                    value: 1,
                                    name: 'span'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '外观',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('className')]
                },
                {
                    title: '显隐',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('ref'), (0, amis_editor_core_3.getSchemaTpl)('visible')]
                }
            ])
        ];
        return _this;
    }
    PropertyPlugin.id = 'PropertyPlugin';
    return PropertyPlugin;
}(amis_editor_core_2.BasePlugin));
exports.PropertyPlugin = PropertyPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(PropertyPlugin);
