"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var AlertPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(AlertPlugin, _super);
    function AlertPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'alert';
        _this.$schema = '/schemas/AlertSchema.json';
        // 组件名称
        _this.name = '提示';
        _this.isBaseComponent = true;
        _this.description = '用来做文字特殊提示，分为四类：提示类、成功类、警告类和危险类。可结合 <code>visibleOn</code> 用来做错误信息提示。';
        _this.docLink = '/amis/zh-CN/components/alert';
        _this.icon = 'fa fa-exclamation-circle';
        _this.pluginIcon = 'tooltip-plugin';
        _this.tags = ['功能'];
        _this.scaffold = {
            type: 'alert',
            body: {
                type: 'tpl',
                tpl: '提示内容',
                wrapperComponent: '',
                inline: false
            },
            level: 'info'
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { className: 'text-left', showCloseButton: true });
        // 普通容器类渲染器配置
        _this.regions = [{ key: 'body', label: '内容区', placeholder: '提示内容' }];
        _this.notRenderFormZone = true;
        _this.panelTitle = '提示';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
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
                                    name: 'level',
                                    type: 'select',
                                    options: [
                                        {
                                            label: '提示',
                                            value: 'info'
                                        },
                                        {
                                            label: '成功',
                                            value: 'success'
                                        },
                                        {
                                            label: '警告',
                                            value: 'warning'
                                        },
                                        {
                                            label: '严重',
                                            value: 'danger'
                                        }
                                    ]
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('label', {
                                    name: 'title'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    label: '可关闭',
                                    name: 'showCloseButton'
                                }),
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    name: 'showIcon',
                                    label: '图标',
                                    hiddenOnDefault: !context.schema.icon,
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                                label: '自定义图标'
                                            })
                                        ]
                                    }
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_3.getSchemaTpl)('style:classNames', { isFormItem: false })
                    ])
                }
            ]);
        };
        return _this;
    }
    AlertPlugin.id = 'AlertPlugin';
    AlertPlugin.scene = ['layout'];
    return AlertPlugin;
}(amis_editor_core_2.BasePlugin));
exports.AlertPlugin = AlertPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(AlertPlugin);
