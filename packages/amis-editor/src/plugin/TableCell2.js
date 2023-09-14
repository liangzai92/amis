"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCell2Plugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var get_1 = tslib_1.__importDefault(require("lodash/get"));
var flattenDeep_1 = tslib_1.__importDefault(require("lodash/flattenDeep"));
var amis_1 = require("amis");
var amis_core_1 = require("amis-core");
var amis_editor_core_1 = require("amis-editor-core");
var BaseControl_1 = require("../component/BaseControl");
var TableCell2Plugin = /** @class */ (function (_super) {
    tslib_1.__extends(TableCell2Plugin, _super);
    function TableCell2Plugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rendererName = 'cell-field';
        _this.panelTitle = '列配置';
        _this.panelIcon = 'fa fa-columns';
        _this.panelJustify = true;
        _this._dynamicControls = {
            /** 字段配置 */
            name: function () {
                return (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                    name: 'name',
                    label: '列字段',
                    visibleOn: 'data.name !== undefined || data.key === undefined'
                });
            },
            /** 字段配置，兼容key */
            key: function () {
                return (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                    name: 'key',
                    label: '列字段',
                    visibleOn: 'data.name === undefined && data.key'
                });
            },
            /** 排序配置 */
            sorter: function () {
                return (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'sorter',
                    hidden: _this._isOpColumn,
                    label: (0, amis_editor_core_1.tipedLabel)('可排序', '开启后可以根据当前列排序，接口类型将增加排序参数。')
                });
            },
            /** 可搜索 */
            searchable: function () {
                return [
                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                        name: 'searchable',
                        label: '可搜索',
                        hidden: _this._isOpColumn,
                        pipeIn: function (value) { return !!value; }
                    }),
                    {
                        name: 'searchable',
                        visibleOn: 'data.searchable',
                        asFormItem: true,
                        label: false,
                        children: function (_a) {
                            var _b;
                            var value = _a.value, onChange = _a.onChange, data = _a.data;
                            if (value === true) {
                                value = {};
                            }
                            else if (typeof value === 'undefined') {
                                value = (0, amis_core_1.getVariable)(data, 'searchable');
                            }
                            var originMode = value.mode;
                            value = tslib_1.__assign(tslib_1.__assign({}, value), { type: 'form', mode: 'normal', wrapWithPanel: false, body: ((_b = value === null || value === void 0 ? void 0 : value.body) === null || _b === void 0 ? void 0 : _b.length)
                                    ? value.body
                                    : [
                                        {
                                            type: 'input-text',
                                            name: data.key
                                        }
                                    ] });
                            delete value.mode;
                            // todo 多个快速编辑表单模式看来只能代码模式编辑了。
                            return (react_1.default.createElement(amis_1.Button, { className: "w-full flex flex-col items-center", onClick: function () {
                                    _this.manager.openSubEditor({
                                        title: '配置列搜索类型',
                                        value: value,
                                        onChange: function (value) {
                                            return onChange(tslib_1.__assign(tslib_1.__assign({}, value), { mode: originMode }), 'searchable');
                                        }
                                    });
                                } },
                                react_1.default.createElement("span", { className: "inline-flex items-center" },
                                    react_1.default.createElement(amis_1.Icon, { icon: "edit", className: "mr-1 w-3" }),
                                    "\u914D\u7F6E\u5217\u641C\u7D22\u7C7B\u578B")));
                        }
                    }
                ];
            },
            /** 快速查看 */
            popover: function () {
                return {
                    name: 'popOver',
                    label: '弹出框',
                    type: 'ae-switch-more',
                    hidden: _this._isOpColumn,
                    mode: 'normal',
                    formType: 'extend',
                    bulk: true,
                    defaultData: {
                        popOver: {
                            mode: 'popOver'
                        }
                    },
                    trueValue: {
                        mode: 'popOver',
                        body: [
                            {
                                type: 'tpl',
                                tpl: '弹出框内容'
                            }
                        ]
                    },
                    isChecked: function (e) {
                        var data = e.data, name = e.name;
                        return (0, get_1.default)(data, name);
                    },
                    form: {
                        body: [
                            {
                                name: 'popOver.mode',
                                type: 'button-group-select',
                                label: '模式',
                                value: 'popOver',
                                options: [
                                    {
                                        label: '提示',
                                        value: 'popOver'
                                    },
                                    {
                                        label: '弹窗',
                                        value: 'dialog'
                                    },
                                    {
                                        label: '抽屉',
                                        value: 'drawer'
                                    }
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('formItemSize', {
                                name: 'popOver.size',
                                clearValueOnHidden: true,
                                visibleOn: 'popOver.mode !== "popOver"'
                            }),
                            {
                                type: 'select',
                                name: 'popOver.position',
                                label: '弹出位置',
                                visibleOn: 'popOver.mode === "popOver"',
                                options: [
                                    'center',
                                    'left-top',
                                    'right-top',
                                    'left-bottom',
                                    'right-bottom'
                                ],
                                clearValueOnHidden: true
                            },
                            {
                                name: 'popOver.trigger',
                                type: 'button-group-select',
                                label: '触发方式',
                                options: [
                                    {
                                        label: '点击',
                                        value: 'click'
                                    },
                                    {
                                        label: '鼠标移入',
                                        value: 'hover'
                                    }
                                ],
                                pipeIn: (0, amis_editor_core_1.defaultValue)('click')
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                name: 'popOver.showIcon',
                                label: '显示图标',
                                value: true
                            }),
                            {
                                type: 'input-text',
                                name: 'popOver.title',
                                label: '标题'
                            },
                            {
                                name: 'popOver.body',
                                asFormItem: true,
                                label: false,
                                children: function (_a) {
                                    var value = _a.value, onBulkChange = _a.onBulkChange, onChange = _a.onChange, name = _a.name, data = _a.data;
                                    value = {
                                        body: value && value.body
                                            ? value.body
                                            : [
                                                {
                                                    type: 'tpl',
                                                    tpl: '弹出框内容'
                                                }
                                            ]
                                    };
                                    return (react_1.default.createElement(amis_1.Button, { className: "w-full flex flex-col items-center", onClick: function () {
                                            _this.manager.openSubEditor({
                                                title: '配置弹出框',
                                                value: value,
                                                onChange: function (value) {
                                                    onChange(value
                                                        ? Array.isArray(value)
                                                            ? value
                                                            : (value === null || value === void 0 ? void 0 : value.body)
                                                                ? value.body
                                                                : []
                                                        : []);
                                                }
                                            });
                                        } },
                                        react_1.default.createElement("span", { className: "inline-flex items-center" },
                                            react_1.default.createElement(amis_1.Icon, { icon: "edit", className: "mr-1 w-3" }),
                                            "\u914D\u7F6E\u5F39\u51FA\u6846")));
                                }
                            }
                        ]
                    }
                };
            },
            /** 快速编辑 */
            quickEdit: function () {
                return {
                    name: 'quickEdit',
                    label: (0, amis_editor_core_1.tipedLabel)('快速编辑', '输入框左侧或右侧的附加挂件'),
                    type: 'ae-switch-more',
                    hidden: _this._isOpColumn,
                    mode: 'normal',
                    formType: 'extend',
                    bulk: true,
                    defaultData: {
                        quickEdit: {
                            mode: 'popOver'
                        }
                    },
                    trueValue: {
                        mode: 'popOver'
                    },
                    isChecked: function (e) {
                        var data = e.data, name = e.name;
                        return (0, get_1.default)(data, name);
                    },
                    form: {
                        body: [
                            {
                                name: 'quickEdit.mode',
                                type: 'button-group-select',
                                label: '模式',
                                value: 'popOver',
                                options: [
                                    {
                                        label: '下拉',
                                        value: 'popOver'
                                    },
                                    {
                                        label: '内嵌',
                                        value: 'inline'
                                    }
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                name: 'quickEdit.saveImmediately',
                                label: (0, amis_editor_core_1.tipedLabel)('修改立即保存', '开启后修改即提交，而不是批量提交。'),
                                pipeIn: function (value) { return !!value; }
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('api', {
                                label: '立即保存接口',
                                description: '是否单独给立即保存配置接口，如果不配置，则默认使用quickSaveItemApi。',
                                name: 'quickEdit.saveImmediately.api',
                                visibleOn: 'this.quickEdit && this.quickEdit.saveImmediately'
                            }),
                            {
                                name: 'quickEdit',
                                asFormItem: true,
                                label: false,
                                children: function (_a) {
                                    var _b;
                                    var value = _a.value, onBulkChange = _a.onBulkChange, name = _a.name, data = _a.data;
                                    if (value === true) {
                                        value = {};
                                    }
                                    else if (typeof value === 'undefined') {
                                        value = (0, amis_core_1.getVariable)(data, 'quickEdit');
                                    }
                                    var originMode = (value === null || value === void 0 ? void 0 : value.mode) || 'popOver';
                                    value = tslib_1.__assign(tslib_1.__assign({}, value), { type: 'form', mode: 'normal', wrapWithPanel: false, body: ((_b = value === null || value === void 0 ? void 0 : value.body) === null || _b === void 0 ? void 0 : _b.length)
                                            ? value.body
                                            : [
                                                {
                                                    type: 'input-text',
                                                    name: data.key
                                                }
                                            ] });
                                    if (value.mode) {
                                        delete value.mode;
                                    }
                                    // todo 多个快速编辑表单模式看来只能代码模式编辑了。
                                    return (react_1.default.createElement(amis_1.Button, { className: "w-full flex flex-col items-center", onClick: function () {
                                            _this.manager.openSubEditor({
                                                title: '配置快速编辑类型',
                                                value: value,
                                                onChange: function (value) {
                                                    var _a;
                                                    return onBulkChange((_a = {},
                                                        _a[name] = tslib_1.__assign(tslib_1.__assign({}, value), { mode: originMode }),
                                                        _a));
                                                }
                                            });
                                        } },
                                        react_1.default.createElement("span", { className: "inline-flex items-center" },
                                            react_1.default.createElement(amis_1.Icon, { icon: "edit", className: "mr-1 w-3" }),
                                            "\u914D\u7F6E\u7F16\u8F91\u8868\u5355")));
                                }
                            }
                        ]
                    }
                };
            }
        };
        _this.panelBodyCreator = function (context) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var manager = _this.manager;
            var dc = _this.dynamicControls;
            _this._isOpColumn = ((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.type) === 'operation';
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '数据源',
                            hidden: _this._isOpColumn,
                            body: (0, flattenDeep_1.default)([
                                /** 字段配置 */
                                (_b = dc === null || dc === void 0 ? void 0 : dc.name) === null || _b === void 0 ? void 0 : _b.call(dc, context),
                                /** 字段配置，兼容key */
                                (_c = dc === null || dc === void 0 ? void 0 : dc.key) === null || _c === void 0 ? void 0 : _c.call(dc, context),
                                {
                                    name: 'title',
                                    label: '列标题',
                                    type: 'input-text'
                                },
                                (0, BaseControl_1.remarkTpl)({
                                    name: 'remark',
                                    label: '标题提示',
                                    labelRemark: '在标题旁展示提示'
                                }),
                                {
                                    name: 'placeholder',
                                    type: 'input-text',
                                    label: (0, amis_editor_core_1.tipedLabel)('占位提示', '当没有值时用这个来替代展示。'),
                                    value: '-'
                                }
                            ]).filter(Boolean)
                        },
                        (_d = dc === null || dc === void 0 ? void 0 : dc.relationBuildSetting) === null || _d === void 0 ? void 0 : _d.call(dc, context),
                        /** 操作列按钮配置 */
                        {
                            title: '操作按钮',
                            hidden: !_this._isOpColumn,
                            body: [
                                {
                                    type: 'ae-feature-control',
                                    label: false,
                                    manager: manager,
                                    addable: true,
                                    sortable: true,
                                    removeable: true,
                                    features: function () {
                                        var _a, _b;
                                        var node = manager.store.getNodeById(context.id);
                                        return ((_b = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.buttons) !== null && _b !== void 0 ? _b : []).map(function (item, index) { return ({
                                            label: item.label,
                                            value: item.$$id || '',
                                            remove: function (schema) {
                                                var _a;
                                                if ((_a = schema === null || schema === void 0 ? void 0 : schema.buttons) === null || _a === void 0 ? void 0 : _a.length) {
                                                    schema.buttons.splice(index, 1);
                                                }
                                            }
                                        }); });
                                    },
                                    goFeatureComp: function (feat) { return feat.value; },
                                    onSort: function (schema, e) {
                                        var _a;
                                        if (((_a = schema === null || schema === void 0 ? void 0 : schema.buttons) === null || _a === void 0 ? void 0 : _a.length) > 1) {
                                            schema.buttons[e.oldIndex] = schema.buttons.splice(e.newIndex, 1, schema.buttons[e.oldIndex])[0];
                                        }
                                    },
                                    customAction: function (props) {
                                        var onBulkChange = props.onBulkChange, schema = props.schema;
                                        return {
                                            type: 'button',
                                            label: '新增按钮',
                                            level: 'enhance',
                                            className: 'ae-FeatureControl-action',
                                            onClick: function () {
                                                schema.buttons.push({
                                                    label: '新增按钮',
                                                    level: 'link'
                                                }),
                                                    onBulkChange(schema);
                                            }
                                        };
                                    }
                                }
                            ]
                        },
                        {
                            title: '列设置',
                            body: (0, flattenDeep_1.default)([
                                {
                                    type: 'ae-columnWidthControl',
                                    name: 'width',
                                    label: false,
                                    formLabel: '列宽'
                                },
                                {
                                    type: 'select',
                                    name: 'align',
                                    label: '对齐方式',
                                    hidden: _this._isOpColumn,
                                    options: [
                                        { label: '左对齐', value: 'left' },
                                        { label: '居中对齐', value: 'center' },
                                        { label: '右对齐', value: 'right' }
                                    ]
                                },
                                {
                                    type: 'select',
                                    name: 'fixed',
                                    label: '固定当前列',
                                    hidden: _this._isOpColumn,
                                    options: [
                                        { label: '不固定', value: false },
                                        { label: '左侧固定', value: 'left' },
                                        { label: '右侧固定', value: 'right' }
                                    ]
                                },
                                {
                                    type: 'ae-Switch-More',
                                    mode: 'normal',
                                    name: 'copyable',
                                    label: '可复制',
                                    hiddenOnDefault: true,
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                name: 'copyable.content',
                                                visibleOn: 'data.copyable',
                                                type: 'ae-formulaControl',
                                                label: '复制内容'
                                            }
                                        ]
                                    }
                                },
                                /** 排序设置 */
                                (_e = dc === null || dc === void 0 ? void 0 : dc.sorter) === null || _e === void 0 ? void 0 : _e.call(dc, context),
                                /** 可搜索 */
                                (_f = dc === null || dc === void 0 ? void 0 : dc.searchable) === null || _f === void 0 ? void 0 : _f.call(dc, context),
                                /** 快速查看 */
                                (_g = dc === null || dc === void 0 ? void 0 : dc.popover) === null || _g === void 0 ? void 0 : _g.call(dc, context),
                                /** 快速编辑 */
                                (_h = dc === null || dc === void 0 ? void 0 : dc.quickEdit) === null || _h === void 0 ? void 0 : _h.call(dc, context)
                            ]).filter(Boolean)
                        }
                    ].filter(Boolean))
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('className'),
                        (0, amis_editor_core_1.getSchemaTpl)('className', {
                            name: 'innerClassName',
                            label: '内部 CSS 类名'
                        })
                    ]
                }
            ]);
        };
        return _this;
    }
    /** NodeStore在构建时需要将一些信息添加进去 */
    TableCell2Plugin.prototype.getRendererInfo = function (context) {
        var renderer = context.renderer, schema = context.schema;
        if (this.rendererName === (renderer === null || renderer === void 0 ? void 0 : renderer.name)) {
            return {
                name: schema.title ? "<".concat(schema.title, ">\u5217") : '匿名列',
                $schema: '/schemas/TableSchema.json',
                multifactor: true,
                wrapperResolve: function (dom) {
                    var _a, _b;
                    // 固定这种结构 amis里改了 这里也得改
                    var parent = (_a = dom.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
                    var groupId = parent === null || parent === void 0 ? void 0 : parent.getAttribute('data-group-id');
                    var wrapper = (_b = dom.closest('table').parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                    return [].slice.call(wrapper === null || wrapper === void 0 ? void 0 : wrapper.querySelectorAll("th[data-group-id=\"".concat(groupId, "\"],\n              td[data-group-id=\"").concat(groupId, "\"]")));
                }
                // filterProps: (props: any) => {
                //   props = JSONPipeOut(props, true);
                //   return props;
                // }
            };
        }
        return _super.prototype.getRendererInfo.call(this, context);
    };
    /** 更新渲染器前的事件，或者右键粘贴配置 */
    TableCell2Plugin.prototype.beforeReplace = function (event) {
        var context = event.context;
        // 替换字段的时候保留 label 和 name 值。
        if (context.info.plugin === this && context.data) {
            context.data.title = context.data.title || context.schema.title;
            context.data.key = context.data.key || context.schema.key;
        }
    };
    TableCell2Plugin.prototype.afterBuildPanelBody = function (event) {
        var _a, _b;
        var _c = event.context, context = _c.context, data = _c.data;
        if (!((_b = (_a = context.node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.type) ||
            context.node.parent.parent.type !== 'table2') {
            return;
        }
        // @ts-ignore
        var base = [
            // context.node.info.plugin.withDataSource === false
            //   ? false
            //   : {
            //       sameName: context.info.renderer.isFormItem ? 'name' : undefined,
            //       name: 'name',
            //       type: 'ae-DataBindingControl',
            //       label: '列字段',
            //       onBindingChange(
            //         field: DSField,
            //         onBulkChange: (value: any) => void
            //       ) {
            //         const schema = field?.resolveColumnSchema?.('List') || {
            //           title: field.label
            //         };
            //         onBulkChange(schema);
            //       }
            //     },
            {
                sameName: context.info.renderer.isFormItem ? 'name' : undefined,
                name: 'name',
                type: 'ae-DataBindingControl',
                label: '列字段',
                onBindingChange: function (field, onBulkChange) {
                    var _a;
                    var schema = ((_a = field === null || field === void 0 ? void 0 : field.resolveColumnSchema) === null || _a === void 0 ? void 0 : _a.call(field, 'List')) || {
                        title: field.label
                    };
                    onBulkChange(schema);
                }
            },
            {
                sameName: context.info.renderer.isFormItem ? 'label' : undefined,
                name: 'title',
                label: '列标题',
                type: 'input-text'
            },
            (0, BaseControl_1.remarkTpl)({
                name: 'remark',
                label: '标题提示',
                labelRemark: '在标题旁展示提示'
            }),
            {
                name: 'placeholder',
                type: 'input-text',
                label: (0, amis_editor_core_1.tipedLabel)('占位提示', '当没有值时用这个来替代展示。'),
                value: '-'
            }
        ].filter(Boolean);
        var advanced = [
            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                name: 'sorter',
                label: (0, amis_editor_core_1.tipedLabel)('可排序', '开启后可以根据当前列排序，接口类型将增加排序参数。')
            }),
            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                name: 'searchable',
                label: '可搜索',
                pipeIn: function (value) { return !!value; }
            }),
            {
                visibleOn: 'data.searchable',
                name: 'searchable',
                asFormItem: true,
                label: false,
                children: function (_a) {
                    var value = _a.value, onChange = _a.onChange, data = _a.data;
                    if (value === true) {
                        value = {};
                    }
                    else if (typeof value === 'undefined') {
                        value = (0, amis_core_1.getVariable)(data, 'searchable');
                    }
                }
            }
        ];
    };
    Object.defineProperty(TableCell2Plugin.prototype, "dynamicControls", {
        /** 需要动态控制的控件 */
        get: function () {
            return this._dynamicControls;
        },
        set: function (controls) {
            if (!controls || !(0, amis_core_1.isObject)(controls)) {
                throw new Error('[amis-editor][TableCell2Plugin] dynamicControls的值必须是一个对象');
            }
            this._dynamicControls = tslib_1.__assign(tslib_1.__assign({}, this._dynamicControls), controls);
        },
        enumerable: false,
        configurable: true
    });
    TableCell2Plugin.id = 'TableCell2Plugin';
    return TableCell2Plugin;
}(amis_editor_core_1.BasePlugin));
exports.TableCell2Plugin = TableCell2Plugin;
(0, amis_editor_core_1.registerEditorPlugin)(TableCell2Plugin);
