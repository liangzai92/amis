"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroupPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var BaseControl_1 = require("../component/BaseControl");
var ButtonGroupPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroupPlugin, _super);
    function ButtonGroupPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'button-group';
        _this.$schema = '/schemas/ButtonGroupSchema.json';
        // 组件名称
        _this.name = '按钮组';
        _this.isBaseComponent = true;
        _this.description = '用来展示多个按钮，视觉上会作为一个整体呈现。';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-object-group';
        _this.pluginIcon = 'btn-group-plugin';
        _this.docLink = '/amis/zh-CN/components/button-group';
        _this.scaffold = {
            type: 'button-group',
            buttons: [
                tslib_1.__assign({ type: 'button', label: '按钮1' }, BaseControl_1.BUTTON_DEFAULT_ACTION),
                tslib_1.__assign({ type: 'button', label: '按钮2' }, BaseControl_1.BUTTON_DEFAULT_ACTION)
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '按钮组';
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
                                {
                                    type: 'button-group-select',
                                    name: 'vertical',
                                    label: '布局方向',
                                    options: [
                                        {
                                            label: '水平',
                                            value: false
                                        },
                                        {
                                            label: '垂直',
                                            value: true
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'tiled',
                                    label: (0, amis_editor_core_1.tipedLabel)('平铺模式', '使按钮组宽度占满父容器，各按钮宽度自适应'),
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
                                    type: 'combo',
                                    label: '按钮管理',
                                    name: 'buttons',
                                    mode: 'normal',
                                    multiple: true,
                                    addable: true,
                                    minLength: 1,
                                    draggable: true,
                                    editable: false,
                                    pipeIn: function (value, data) { return (0, amis_editor_core_1.translateSchema)(value); },
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
                        (0, amis_editor_core_1.getSchemaTpl)('status', {
                            disabled: true
                        })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('buttonLevel', {
                                        label: '样式',
                                        name: 'btnLevel'
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('size', {
                                        label: '尺寸'
                                    })
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                                isFormItem: false,
                                schema: [
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        label: '按钮',
                                        name: 'btnClassName'
                                    })
                                ]
                            })
                        ])
                    ]
                }
            ]);
        };
        _this.regions = [
            {
                key: 'buttons',
                label: '子按钮',
                renderMethod: 'render',
                preferTag: '按钮',
                insertPosition: 'inner'
            }
        ];
        return _this;
    }
    ButtonGroupPlugin.id = 'ButtonGroupPlugin';
    ButtonGroupPlugin.scene = ['layout'];
    return ButtonGroupPlugin;
}(amis_editor_core_1.BasePlugin));
exports.ButtonGroupPlugin = ButtonGroupPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ButtonGroupPlugin);
