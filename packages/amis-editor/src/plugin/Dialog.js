"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineModal = exports.DialogPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_ui_1 = require("amis-ui");
var amis_editor_core_1 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
var DialogPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DialogPlugin, _super);
    function DialogPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'dialog';
        _this.$schema = '/schemas/DialogSchema.json';
        // 组件名称
        _this.name = '弹框';
        _this.isBaseComponent = true;
        _this.wrapperProps = {
            wrapperComponent: InlineModal,
            onClose: amis_editor_core_1.noop,
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
                description: '点击弹窗确认按钮时触发',
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
                description: '点击弹窗取消按钮时触发',
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
                description: '触发弹窗确认操作'
            },
            {
                actionType: 'cancel',
                actionLabel: '取消',
                description: '触发弹窗取消操作'
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
            var _a;
            // 确认对话框的配置面板
            if (((_a = context.schema) === null || _a === void 0 ? void 0 : _a.dialogType) === 'confirm') {
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
                                    (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    {
                                        label: '确认按钮文案',
                                        type: 'input-text',
                                        name: 'confirmText'
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    {
                                        label: '取消按钮文案',
                                        type: 'input-text',
                                        name: 'cancelText'
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        label: '可按 Esc 关闭',
                                        name: 'closeOnEsc',
                                        value: false
                                    })
                                ]
                            }
                        ])
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    {
                                        label: '尺寸',
                                        type: 'button-group-select',
                                        name: 'size',
                                        size: 'sm',
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
                                    (0, amis_editor_core_1.getSchemaTpl)('buttonLevel', {
                                        label: '确认按钮样式',
                                        name: 'confirmBtnLevel'
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('buttonLevel', {
                                        label: '取消按钮样式',
                                        name: 'cancelBtnLevel'
                                    })
                                ]
                            }
                        ])
                    }
                ]);
            }
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
                                    label: '展示关闭按钮',
                                    name: 'showCloseButton',
                                    value: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '点击遮罩关闭',
                                    name: 'closeOnOutside',
                                    value: false
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '可按 Esc 关闭',
                                    name: 'closeOnEsc',
                                    value: false
                                }),
                                {
                                    type: 'ae-StatusControl',
                                    label: '隐藏按钮区',
                                    mode: 'normal',
                                    name: 'hideActions',
                                    expressionName: 'hideActionsOn'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '左下角展示报错消息',
                                    name: 'showErrorMsg',
                                    value: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '左下角展示loading动画',
                                    name: 'showLoading',
                                    value: true
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
                                    label: '尺寸',
                                    type: 'button-group-select',
                                    name: 'size',
                                    size: 'xs',
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
                                        },
                                        {
                                            label: '自定义',
                                            value: 'custom'
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(''),
                                    pipeOut: function (value) { return (value ? value : undefined); },
                                    onChange: function (value, oldValue, model, form) {
                                        if (value !== 'custom') {
                                            form.setValueByName('style', undefined);
                                        }
                                    }
                                },
                                {
                                    type: 'input-number',
                                    label: '宽度',
                                    name: 'style.width',
                                    disabled: true,
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw'],
                                    visibleOn: 'data.size !== "custom"',
                                    pipeIn: function (value, form) {
                                        if (!form.data.size) {
                                            return '500px';
                                        }
                                        else if (form.data.size === 'sm') {
                                            return '350px';
                                        }
                                        else if (form.data.size === 'md') {
                                            return '800px';
                                        }
                                        else if (form.data.size === 'lg') {
                                            return '1100px';
                                        }
                                        else if (form.data.size === 'xl') {
                                            return '90%';
                                        }
                                        return '';
                                    }
                                },
                                {
                                    type: 'input-number',
                                    label: '宽度',
                                    name: 'style.width',
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw'],
                                    visibleOn: 'data.size === "custom"',
                                    pipeOut: function (value) {
                                        var curValue = parseInt(value);
                                        if (value === 'auto' || curValue || curValue === 0) {
                                            return value;
                                        }
                                        else {
                                            return undefined;
                                        }
                                    }
                                },
                                {
                                    type: 'input-number',
                                    label: '高度',
                                    name: 'style.height',
                                    disabled: true,
                                    visibleOn: 'data.size !== "custom"',
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw']
                                },
                                {
                                    type: 'input-number',
                                    label: '高度',
                                    name: 'style.height',
                                    visibleOn: 'data.size === "custom"',
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw'],
                                    pipeOut: function (value) {
                                        var curValue = parseInt(value);
                                        if (value === 'auto' || curValue || curValue === 0) {
                                            return value;
                                        }
                                        else {
                                            return undefined;
                                        }
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('theme:border', {
                                    name: 'themeCss.dialogClassName.border'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:radius', {
                                    name: 'themeCss.dialogClassName.radius'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:shadow', {
                                    name: 'themeCss.dialogClassName.box-shadow'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogClassName.background',
                                    labelMode: 'input'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '遮罩颜色',
                                    name: 'themeCss.dialogMaskClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '标题区',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('theme:font', {
                                    label: '文字',
                                    name: 'themeCss.dialogTitleClassName.font'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                                    name: 'themeCss.dialogHeaderClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogHeaderClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '内容区',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('theme:border', {
                                    name: 'themeCss.dialogBodyClassName.border'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:radius', {
                                    name: 'themeCss.dialogBodyClassName.radius'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                                    name: 'themeCss.dialogBodyClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogBodyClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '底部区',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                                    name: 'themeCss.dialogFooterClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogFooterClassName.background',
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
    DialogPlugin.prototype.buildSubRenderers = function () { };
    DialogPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
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
                            $id: 'dialog',
                            type: 'object',
                            title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name),
                            properties: dataSchema
                        }];
                }
            });
        });
    };
    /**
     * 为了让 dialog 的按钮可以点击编辑
     */
    DialogPlugin.prototype.patchSchema = function (schema, info, props) {
        if (Array.isArray(schema.actions)) {
            return;
        }
        return tslib_1.__assign(tslib_1.__assign({}, schema), { actions: [
                {
                    type: 'button',
                    actionType: 'cancel',
                    label: '取消'
                },
                (props === null || props === void 0 ? void 0 : props.confirm)
                    ? {
                        type: 'button',
                        actionType: 'confirm',
                        label: '确定',
                        primary: true
                    }
                    : null
            ].filter(function (item) { return item; }) });
    };
    DialogPlugin.id = 'DialogPlugin';
    return DialogPlugin;
}(amis_editor_core_1.BasePlugin));
exports.DialogPlugin = DialogPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(DialogPlugin);
var InlineModal = /** @class */ (function (_super) {
    tslib_1.__extends(InlineModal, _super);
    function InlineModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineModal.prototype.componentDidMount = function () { };
    InlineModal.prototype.render = function () {
        var _a = this.props, type = _a.type, children = _a.children, dialogType = _a.dialogType, cancelText = _a.cancelText, confirmText = _a.confirmText, cancelBtnLevel = _a.cancelBtnLevel, confirmBtnLevel = _a.confirmBtnLevel, editorDialogMountNode = _a.editorDialogMountNode;
        var Container = type === 'drawer' ? amis_ui_1.Drawer : amis_ui_1.Modal;
        if (dialogType === 'confirm') {
            children = children.filter(function (item) { return (item === null || item === void 0 ? void 0 : item.key) !== 'actions'; });
            return (react_1.default.createElement(amis_ui_1.Modal, tslib_1.__assign({}, this.props, { container: editorDialogMountNode }),
                react_1.default.createElement("div", { className: "ae-InlineModal" },
                    children,
                    react_1.default.createElement("div", { className: "ae-InlineModal-footer" },
                        react_1.default.createElement(amis_ui_1.Button, { className: "ae-InlineModal-footer-btn", level: cancelBtnLevel }, cancelText || '取消'),
                        react_1.default.createElement(amis_ui_1.Button, { className: "ae-InlineModal-footer-btn", level: confirmBtnLevel }, confirmText || '确认')))));
        }
        return (react_1.default.createElement(Container, tslib_1.__assign({}, this.props, { container: editorDialogMountNode }), children));
    };
    return InlineModal;
}(react_1.default.Component));
exports.InlineModal = InlineModal;
