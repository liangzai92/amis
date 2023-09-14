"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownButtonPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var BaseControl_1 = require("../component/BaseControl");
var DropDownButtonPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownButtonPlugin, _super);
    function DropDownButtonPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'dropdown-button';
        _this.$schema = '/schemas/DropdownButtonSchema.json';
        // 组件名称
        _this.name = '下拉按钮';
        _this.isBaseComponent = true;
        _this.description = '下拉按钮，更多的按钮通过点击后展示开来。';
        _this.tags = ['表单项'];
        _this.icon = 'fa fa-chevron-down';
        _this.pluginIcon = 'dropdown-btn-plugin';
        _this.docLink = '/amis/zh-CN/components/dropdown-button';
        _this.scaffold = {
            type: 'dropdown-button',
            label: '下拉按钮',
            buttons: [
                tslib_1.__assign({ type: 'button', label: '按钮1' }, BaseControl_1.BUTTON_DEFAULT_ACTION),
                tslib_1.__assign({ type: 'button', label: '按钮2' }, BaseControl_1.BUTTON_DEFAULT_ACTION)
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '下拉按钮';
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
                                    children: (react_1.default.createElement("div", { className: "mb-3" },
                                        react_1.default.createElement(amis_1.Button, { level: "info", size: "sm", className: "m-b-sm", block: true, onClick: _this.editDetail.bind(_this, context.id) }, "\u914D\u7F6E\u4E0B\u62C9\u6309\u94AE\u96C6\u5408")))
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('label', {
                                    label: '按钮文案'
                                }),
                                {
                                    type: 'button-group-select',
                                    name: 'trigger',
                                    label: '触发方式',
                                    size: 'sm',
                                    options: [
                                        {
                                            label: '点击',
                                            value: 'click'
                                        },
                                        {
                                            label: '鼠标经过',
                                            value: 'hover'
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('click')
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'closeOnOutside',
                                    label: '点击外部关闭',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'closeOnClick',
                                    label: '点击内容关闭'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_1.tipedLabel)('默认展开', '选择后下拉菜单会默认展开'),
                                    name: 'defaultIsOpened'
                                }),
                                {
                                    type: 'button-group-select',
                                    name: 'align',
                                    label: '菜单对齐方式',
                                    size: 'sm',
                                    options: [
                                        {
                                            label: '左对齐',
                                            value: 'left'
                                        },
                                        {
                                            label: '右对齐',
                                            value: 'right'
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('left')
                                }
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
                                    (0, amis_editor_core_1.getSchemaTpl)('size', {
                                        label: '尺寸',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)('md')
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'block',
                                        label: (0, amis_editor_core_1.tipedLabel)('块状显示', '选择后按钮占满父容器宽度')
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('buttonLevel', {
                                        label: '展示样式',
                                        name: 'level'
                                    })
                                ]
                            },
                            {
                                title: '图标',
                                body: [
                                    // getSchemaTpl('switch', {
                                    //   label: '只显示 icon',
                                    //   name: 'iconOnly'
                                    // }),
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        label: '隐藏下拉图标',
                                        name: 'hideCaret'
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                        label: '左侧图标'
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                        name: 'rightIcon',
                                        label: '右侧图标'
                                    })
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                                isFormItem: false,
                                schema: [
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        name: 'btnClassName',
                                        label: '按钮'
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        name: 'menuClassName',
                                        label: '下拉菜单'
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
    DropDownButtonPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
        var id = _a.id, info = _a.info;
        if (info.renderer.name === 'dropdown-button') {
            toolbars.push({
                icon: 'fa fa-expand',
                order: 100,
                tooltip: '配置下拉按钮集合',
                onClick: this.editDetail.bind(this, id)
            });
        }
    };
    DropDownButtonPlugin.prototype.editDetail = function (id) {
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置下拉按钮集合',
                value: value.buttons,
                slot: {
                    type: 'button-group',
                    buttons: '$$',
                    block: true
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { buttons: newValue });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_1.diff)(value, newValue));
                }
            });
    };
    DropDownButtonPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var id = _a.id, schema = _a.schema, region = _a.region, info = _a.info, selections = _a.selections;
        if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
            return;
        }
        if (info.renderer.name === 'dropdown-button') {
            menus.push('|', {
                label: '配置下拉按钮集合',
                onSelect: this.editDetail.bind(this, id)
            });
        }
    };
    DropDownButtonPlugin.prototype.filterProps = function (props) {
        // trigger 为 hover 会影响编辑体验。
        props.trigger = 'click';
        return props;
    };
    DropDownButtonPlugin.id = 'DropDownButtonPlugin';
    DropDownButtonPlugin.scene = ['layout'];
    return DropDownButtonPlugin;
}(amis_editor_core_1.BasePlugin));
exports.DropDownButtonPlugin = DropDownButtonPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DropDownButtonPlugin);
