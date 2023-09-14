"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file 面包屑
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var BreadcrumbPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(BreadcrumbPlugin, _super);
    function BreadcrumbPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'breadcrumb';
        _this.$schema = '/schemas/BreadcrumbSchema.json';
        _this.disabledRendererPlugin = true;
        // 组件名称
        _this.name = '面包屑';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-list';
        _this.pluginIcon = 'breadcrumb-plugin';
        _this.description = '面包屑导航';
        _this.docLink = '/amis/zh-CN/components/breadcrumb';
        _this.tags = ['其他'];
        _this.scaffold = {
            type: 'breadcrumb',
            items: [
                {
                    label: '首页',
                    href: '/',
                    icon: 'fa fa-home'
                },
                {
                    label: '上级页面'
                },
                {
                    label: '<b>当前页面</b>'
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '面包屑';
        _this.panelBody = [
            (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        {
                            label: '分隔符',
                            type: 'input-text',
                            name: 'separator'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('api', {
                            label: '动态数据',
                            name: 'source'
                        }),
                        {
                            label: '面包屑',
                            name: 'items',
                            type: 'combo',
                            multiple: true,
                            multiLine: true,
                            draggable: true,
                            addButtonText: '新增',
                            items: [
                                {
                                    type: 'input-text',
                                    placeholder: '文本',
                                    name: 'label'
                                },
                                {
                                    type: 'input-text',
                                    name: 'href',
                                    placeholder: '链接'
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                    name: 'icon',
                                    label: '图标'
                                })
                            ]
                        }
                    ]
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('className'),
                        (0, amis_editor_core_3.getSchemaTpl)('className', {
                            name: 'itemClassName',
                            label: '面包屑的 CSS 类名'
                        }),
                        ,
                        (0, amis_editor_core_3.getSchemaTpl)('className', {
                            name: 'separatorClassName',
                            label: '分隔符的 CSS 类名'
                        })
                    ]
                },
                {
                    title: '显隐',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('ref'), (0, amis_editor_core_3.getSchemaTpl)('visible')]
                }
            ])
        ];
        return _this;
    }
    BreadcrumbPlugin.id = 'BreadcrumbPlugin';
    return BreadcrumbPlugin;
}(amis_editor_core_2.BasePlugin));
exports.BreadcrumbPlugin = BreadcrumbPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(BreadcrumbPlugin);
