"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonToolbarControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var BaseControl_1 = require("../../component/BaseControl");
var ButtonToolbarControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonToolbarControlPlugin, _super);
    function ButtonToolbarControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'button-toolbar';
        _this.$schema = '/schemas/ButtonToolbarControlSchema.json';
        // 组件名称
        _this.name = '按钮工具栏';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-ellipsis-h';
        _this.pluginIcon = 'btn-toolbar-plugin';
        _this.description = '可以用来放置多个按钮或者按钮组，按钮之间会存在一定的间隔';
        _this.docLink = '/amis/zh-CN/components/form/button-toolbar';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'button-toolbar',
            label: '按钮工具栏',
            buttons: [
                tslib_1.__assign({ type: 'button', label: '按钮1' }, BaseControl_1.BUTTON_DEFAULT_ACTION),
                tslib_1.__assign({ type: 'button', label: '按钮2' }, BaseControl_1.BUTTON_DEFAULT_ACTION)
            ]
        };
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: tslib_1.__assign({}, _this.scaffold)
        };
        // 容器配置
        _this.regions = [
            {
                key: 'buttons',
                label: '按钮集合',
                preferTag: '按钮',
                renderMethod: 'renderButtons'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelTitle = '工具栏';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    (0, amis_editor_core_3.getSchemaTpl)('label'),
                                    (0, amis_editor_core_3.getSchemaTpl)('labelRemark'),
                                    (0, amis_editor_core_3.getSchemaTpl)('remark'),
                                    (0, amis_editor_core_3.getSchemaTpl)('description'),
                                    (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                                        type: 'combo',
                                        label: '按钮管理',
                                        name: 'buttons',
                                        mode: 'normal',
                                        multiple: true,
                                        addable: true,
                                        minLength: 1,
                                        draggable: true,
                                        editable: false,
                                        pipeIn: function (value) { return (0, amis_editor_core_1.translateSchema)(value); },
                                        items: [
                                            {
                                                type: 'tpl',
                                                inline: false,
                                                className: 'p-t-xs',
                                                tpl: "<span class=\"label label-default\"><% if (data.type === \"button-group\") { %> ".concat('按钮组', " <% } else { %><%= data.label %><% if (data.icon) { %><i class=\"<%= data.icon %>\"/><% }%><% } %></span>")
                                            }
                                        ],
                                        addButtonText: '新增按钮',
                                        scaffold: {
                                            type: 'button',
                                            label: '按钮'
                                        }
                                    })
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('status')
                        ])
                    ]
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('formItemMode'),
                                    (0, amis_editor_core_3.getSchemaTpl)('horizontal', {
                                        label: '',
                                        visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
                                    })
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                                isFormItem: true,
                                unsupportStatic: true,
                                schema: [
                                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                                        label: '描述',
                                        name: 'descriptionClassName',
                                        visibleOn: 'this.description'
                                    })
                                ]
                            })
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    ButtonToolbarControlPlugin.id = 'ButtonToolbarControlPlugin';
    ButtonToolbarControlPlugin.scene = ['layout'];
    return ButtonToolbarControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ButtonToolbarControlPlugin = ButtonToolbarControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ButtonToolbarControlPlugin);
