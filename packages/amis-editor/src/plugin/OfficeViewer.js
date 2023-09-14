"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeViewerPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var OfficeViewerPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(OfficeViewerPlugin, _super);
    function OfficeViewerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'office-viewer';
        _this.$schema = '/schemas/OfficeViewerSchema.json';
        // 组件名称
        _this.name = '文档预览';
        _this.isBaseComponent = true;
        _this.description = 'Office 文档预览';
        _this.docLink = '/amis/zh-CN/components/office-viewer';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-file-word';
        _this.pluginIcon = 'officeViewer-plugin';
        _this.scaffold = {
            type: 'office-viewer'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '文档预览';
        _this.panelJustify = true;
        _this.actions = [
            {
                actionType: 'print',
                actionLabel: '打印',
                description: '打印文档'
            },
            {
                actionType: 'saveAs',
                actionLabel: '下载',
                description: '下载文档'
            }
        ];
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        (0, amis_editor_core_3.getSchemaTpl)('officeUrl', {
                                            name: 'src',
                                            type: 'input-text',
                                            label: '文档地址'
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                            type: 'switch',
                                            label: '是否渲染',
                                            name: 'display',
                                            pipeIn: (0, amis_editor_core_3.defaultValue)(true),
                                            inline: true
                                        })
                                    ]
                                },
                                {
                                    title: 'Word 渲染配置',
                                    collapsed: true,
                                    body: [
                                        {
                                            type: 'combo',
                                            name: 'wordOptions',
                                            // panelJustify 下需要加这个
                                            mode: 'normal',
                                            noBorder: true,
                                            multiLine: true,
                                            items: [
                                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                                    label: '忽略宽度',
                                                    inline: true,
                                                    name: 'ignoreWidth'
                                                }),
                                                {
                                                    type: 'input-text',
                                                    label: '页面内边距',
                                                    name: 'padding'
                                                },
                                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                                    label: '列表使用字体',
                                                    pipeIn: (0, amis_editor_core_3.defaultValue)(true),
                                                    name: 'bulletUseFont',
                                                    inline: true
                                                }),
                                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                                    label: '变量替换',
                                                    name: 'enableVar',
                                                    inline: true
                                                }),
                                                {
                                                    type: 'input-text',
                                                    label: '强制行高',
                                                    name: 'forceLineHeight'
                                                },
                                                {
                                                    type: 'input-kv',
                                                    label: '字体映射',
                                                    name: 'fontMapping'
                                                },
                                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                                    label: '是否开启分页渲染',
                                                    name: 'page',
                                                    inline: true
                                                }),
                                                {
                                                    type: 'input-number',
                                                    label: '页上下边距',
                                                    name: 'pageMarginBottom',
                                                    visibleOn: 'data.page'
                                                },
                                                {
                                                    type: 'input-color',
                                                    label: '页背景色',
                                                    pipeIn: (0, amis_editor_core_3.defaultValue)('#FFFFFF'),
                                                    name: 'pageBackground',
                                                    visibleOn: 'data.page'
                                                },
                                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                                    label: '是否显示页面阴影',
                                                    name: 'pageShadow',
                                                    inline: true,
                                                    visibleOn: 'data.page'
                                                }),
                                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                                    label: '是否显示页面包裹',
                                                    name: 'pageWrap',
                                                    inline: true,
                                                    visibleOn: 'data.page'
                                                }),
                                                {
                                                    type: 'input-number',
                                                    label: '页面包裹宽度',
                                                    name: 'pageWrapPadding',
                                                    visibleOn: 'data.page'
                                                },
                                                {
                                                    type: 'input-color',
                                                    label: '页面包裹背景色',
                                                    pipeIn: (0, amis_editor_core_3.defaultValue)('#ECECEC'),
                                                    name: 'pageWrapBackground',
                                                    visibleOn: 'data.page'
                                                },
                                                {
                                                    type: 'input-number',
                                                    label: '缩放比例',
                                                    min: 0.1,
                                                    max: 1,
                                                    name: 'zoom',
                                                    visibleOn: 'data.page'
                                                },
                                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                                    label: '自适应宽度',
                                                    name: 'zoomFitWidth',
                                                    inline: true,
                                                    visibleOn: 'data.page'
                                                })
                                            ]
                                        }
                                    ]
                                }
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_3.getSchemaTpl)('style:classNames', { isFormItem: false })
                        ])
                    }
                ])
            ];
        };
        return _this;
    }
    OfficeViewerPlugin.id = 'OfficeViewerPlugin';
    OfficeViewerPlugin.scene = ['layout'];
    return OfficeViewerPlugin;
}(amis_editor_core_2.BasePlugin));
exports.OfficeViewerPlugin = OfficeViewerPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(OfficeViewerPlugin);
