"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var amis_editor_core_2 = require("amis-editor-core");
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
var Dialog_1 = require("./Dialog");
var DrawerPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DrawerPlugin, _super);
    function DrawerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'drawer';
        _this.$schema = '/schemas/DrawerSchema.json';
        // 组件名称
        _this.name = '抽屉式弹框';
        _this.isBaseComponent = true;
        _this.wrapperProps = {
            wrapperComponent: Dialog_1.InlineModal,
            onClose: amis_editor_core_1.noop,
            resizable: false,
            show: true
        };
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                renderMethod: 'renderBody',
                renderMethodOverride: function (regions, insertRegion) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var info = this.props.$$editor;
                        var dom = this.super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(args), false));
                        if (info && args[1] === 'body') {
                            return insertRegion(this, dom, regions, info, info.plugin.manager);
                        }
                        return dom;
                    };
                }
            },
            {
                key: 'actions',
                label: '按钮组',
                renderMethod: 'renderFooter',
                wrapperResolve: function (dom) { return dom; }
            }
        ];
        // 现在没用，后面弹窗优化后有用
        _this.events = [
            {
                eventName: 'confirm',
                eventLabel: '确认',
                description: '点击抽屉确认按钮时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'cancel',
                eventLabel: '取消',
                description: '点击抽屉取消按钮时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            }
        ];
        _this.actions = [
            {
                actionType: 'confirm',
                actionLabel: '确认',
                description: '触发抽屉确认操作'
            },
            {
                actionType: 'cancel',
                actionLabel: '取消',
                description: '触发抽屉取消操作'
            },
            {
                actionType: 'setValue',
                actionLabel: '变量赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = '弹框';
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
                                    label: '标题',
                                    type: 'input-text',
                                    name: 'title'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'overlay',
                                    label: '显示蒙层',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'showCloseButton',
                                    label: '展示关闭按钮',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'closeOnOutside',
                                    label: '点击遮罩关闭'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '可按 Esc 关闭',
                                    name: 'closeOnEsc'
                                }),
                                {
                                    type: 'ae-StatusControl',
                                    label: '隐藏按钮区',
                                    mode: 'normal',
                                    name: 'hideActions',
                                    expressionName: 'hideActionsOn'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'resizable',
                                    label: '可拖拽抽屉大小',
                                    value: false
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('dataMap')
                            ]
                        }
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '样式',
                            body: [
                                {
                                    type: 'button-group-select',
                                    name: 'position',
                                    label: '位置',
                                    mode: 'horizontal',
                                    options: [
                                        {
                                            label: '左',
                                            value: 'left'
                                        },
                                        {
                                            label: '上',
                                            value: 'top'
                                        },
                                        {
                                            label: '右',
                                            value: 'right'
                                        },
                                        {
                                            label: '下',
                                            value: 'bottom'
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('right'),
                                    pipeOut: function (value) { return (value ? value : 'right'); },
                                    onChange: function (value, oldValue, model, form) {
                                        if (value === 'left' || value === 'right') {
                                            form.deleteValueByName('height');
                                        }
                                        else if (value === 'top' || value === 'bottom') {
                                            form.deleteValueByName('width');
                                        }
                                    }
                                },
                                {
                                    type: 'button-group-select',
                                    name: 'size',
                                    label: '尺寸',
                                    size: 'sm',
                                    mode: 'horizontal',
                                    options: [
                                        {
                                            label: '标准',
                                            value: ''
                                        },
                                        {
                                            label: '小',
                                            value: 'sm'
                                        },
                                        {
                                            label: '中',
                                            value: 'md'
                                        },
                                        {
                                            label: '大',
                                            value: 'lg'
                                        },
                                        {
                                            label: '超大',
                                            value: 'xl'
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(''),
                                    pipeOut: function (value) { return (value ? value : undefined); }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('style:widthHeight', {
                                    widthSchema: {
                                        label: (0, amis_editor_core_2.tipedLabel)('宽度', '位置为 "左" 或 "右" 时生效。 默认宽度为"尺寸"字段配置的宽度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                        visibleOn: 'this.position === "top" || this.position === "bottom"'
                                    },
                                    heightSchema: {
                                        label: (0, amis_editor_core_2.tipedLabel)('高度', '位置为 "上" 或 "下" 时生效。 默认宽度为"尺寸"字段配置的高度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                        visibleOn: 'this.position === "left" || this.position === "right" || !this.position'
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:border', {
                                    name: 'themeCss.drawerClassName.border'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:radius', {
                                    name: 'themeCss.drawerClassName.radius'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:shadow', {
                                    name: 'themeCss.drawerClassName.box-shadow'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerClassName.background',
                                    labelMode: 'input'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '遮罩颜色',
                                    name: 'themeCss.drawerMaskClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '标题区',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('theme:font', {
                                    label: '文字',
                                    name: 'themeCss.drawerTitleClassName.font'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                                    name: 'themeCss.drawerHeaderClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerHeaderClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '内容区',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('theme:border', {
                                    name: 'themeCss.drawerBodyClassName.border'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:radius', {
                                    name: 'themeCss.drawerBodyClassName.radius'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                                    name: 'themeCss.drawerBodyClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerBodyClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '底部区',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                                    name: 'themeCss.drawerFooterClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerFooterClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        }
                    ])
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    DrawerPlugin.prototype.buildSubRenderers = function () { };
    DrawerPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
        var _a, _b, _c, _d, _e, _f, _g;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var renderer, data, dataSchema, key, hostNodeDataSchema;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        renderer = (_a = this.manager.store.getNodeById(node.id)) === null || _a === void 0 ? void 0 : _a.getComponent();
                        data = (0, omit_1.default)(renderer.props.$schema.data, '$$id');
                        dataSchema = {};
                        if (!(renderer.props.$schema.data === undefined || !(0, amis_editor_core_1.isEmpty)(data))) return [3 /*break*/, 2];
                        // 静态数据
                        for (key in data) {
                            if (!['&'].includes(key)) {
                                dataSchema[key] = {
                                    type: (_b = typeof data[key]) !== null && _b !== void 0 ? _b : 'string',
                                    title: key
                                };
                            }
                        }
                        return [4 /*yield*/, ((_d = (_c = this.manager.config).getHostNodeDataSchema) === null || _d === void 0 ? void 0 : _d.call(_c))];
                    case 1:
                        hostNodeDataSchema = _h.sent();
                        (_e = hostNodeDataSchema
                            .filter(function (item) { return !['system-variable', 'page-global'].includes(item.$id); })) === null || _e === void 0 ? void 0 : _e.forEach(function (item) {
                            dataSchema = tslib_1.__assign(tslib_1.__assign({}, dataSchema), item.properties);
                        });
                        _h.label = 2;
                    case 2: return [2 /*return*/, {
                            $id: 'drawer',
                            type: 'object',
                            title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name),
                            properties: dataSchema
                        }];
                }
            });
        });
    };
    DrawerPlugin.id = 'DrawerPlugin';
    return DrawerPlugin;
}(amis_editor_core_1.BasePlugin));
exports.DrawerPlugin = DrawerPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DrawerPlugin);
