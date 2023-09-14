"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table2Plugin = exports.Table2RendererAction = exports.Table2RenderereEvent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var amis_core_1 = require("amis-core");
var amis_editor_core_1 = require("amis-editor-core");
var DSBuilderManager_1 = require("../builder/DSBuilderManager");
var helper_1 = require("../renderer/event-control/helper");
var util_1 = require("../util");
exports.Table2RenderereEvent = [
    {
        eventName: 'selectedChange',
        eventLabel: '选择表格项',
        description: '手动选择表格项事件',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            selectedItems: {
                                type: 'array',
                                title: '已选行记录'
                            },
                            unSelectedItems: {
                                type: 'array',
                                title: '未选行记录'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'columnSort',
        eventLabel: '列排序',
        description: '点击列排序事件',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            orderBy: {
                                type: 'string',
                                title: '列名'
                            },
                            orderDir: {
                                type: 'string',
                                title: '排序值'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'columnFilter',
        eventLabel: '列筛选',
        description: '点击列筛选事件',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            filterName: {
                                type: 'string',
                                title: '列名'
                            },
                            filterValue: {
                                type: 'string',
                                title: '筛选值'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'columnSearch',
        eventLabel: '列搜索',
        description: '点击列搜索事件',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            searchName: {
                                type: 'string',
                                title: '列名'
                            },
                            searchValue: {
                                type: 'object',
                                title: '搜索值'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'orderChange',
        eventLabel: '行排序',
        description: '手动拖拽行排序事件',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            movedItems: {
                                type: 'array',
                                title: '已排序记录'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'columnToggled',
        eventLabel: '列显示变化',
        description: '点击自定义列事件',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            columns: {
                                type: 'array',
                                title: '当前显示的列配置'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'rowClick',
        eventLabel: '行单击',
        description: '点击整行事件',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            item: {
                                type: 'object',
                                title: '当前行记录'
                            },
                            index: {
                                type: 'number',
                                title: '当前行索引'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'rowMouseEnter',
        eventLabel: '鼠标移入行事件',
        description: '移入整行时触发',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            item: {
                                type: 'object',
                                title: '当前行记录'
                            },
                            index: {
                                type: 'number',
                                title: '当前行索引'
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        eventName: 'rowMouseLeave',
        eventLabel: '鼠标移出行事件',
        description: '移出整行时触发',
        dataSchema: [
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        title: '数据',
                        properties: {
                            item: {
                                type: 'object',
                                title: '当前行记录'
                            },
                            index: {
                                type: 'number',
                                title: '当前行索引'
                            }
                        }
                    }
                }
            }
        ]
    }
];
exports.Table2RendererAction = [
    {
        actionType: 'select',
        actionLabel: '设置选中项',
        description: '设置表格的选中项',
        schema: (0, helper_1.getArgsWrapper)([
            (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                name: 'selected',
                label: '选中项',
                variables: '${variables}',
                size: 'lg',
                mode: 'horizontal'
            })
        ])
    },
    {
        actionType: 'selectAll',
        actionLabel: '设置全部选中',
        description: '设置表格全部项选中'
    },
    {
        actionType: 'clearAll',
        actionLabel: '清空选中项',
        description: '清空表格所有选中项'
    }
];
var Table2Plugin = /** @class */ (function (_super) {
    tslib_1.__extends(Table2Plugin, _super);
    function Table2Plugin(manager) {
        var _this = _super.call(this, manager) || this;
        _this.disabledRendererPlugin = true;
        _this.name = '表格';
        _this.panelTitle = '表格';
        _this.icon = 'fa fa-table';
        _this.panelIcon = 'fa fa-table';
        _this.pluginIcon = 'table-plugin';
        _this.rendererName = 'table2';
        _this.isBaseComponent = true;
        _this.panelJustify = true;
        _this.$schema = '/schemas/TableSchema2.json';
        _this.description = '用来展示表格数据，可以配置列信息，然后关联数据便能完成展示。支持嵌套、超级表头、列固定、表头固顶、合并单元格等等。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。';
        _this.docLink = '/amis/zh-CN/components/table2';
        _this.scaffold = {
            type: 'table2',
            columns: [
                {
                    title: '列信息',
                    name: 'a'
                }
            ],
            source: '$item'
        };
        _this.regions = [
            {
                key: 'columns',
                label: '列集合',
                renderMethod: 'renderTable',
                preferTag: '展示',
                dndMode: 'position-h'
            }
        ];
        _this.previewSchema = {
            type: 'table2',
            className: 'text-left m-b-none',
            items: [
                { a: 1, b: 2, c: 9 },
                { a: 3, b: 4, c: 8 },
                { a: 5, b: 6, c: 7 }
            ],
            columns: [
                {
                    title: 'A',
                    name: 'a'
                },
                {
                    title: 'B',
                    name: 'b'
                }
            ]
        };
        _this.scaffoldForm = {
            title: '快速构建表格',
            canRebuild: true,
            body: [
                {
                    name: 'columns',
                    type: 'combo',
                    multiple: true,
                    label: false,
                    addButtonText: '新增一列',
                    draggable: true,
                    items: [
                        {
                            type: 'input-text',
                            name: 'title',
                            placeholder: '标题'
                        },
                        {
                            type: 'input-text',
                            name: 'name',
                            placeholder: '绑定字段名'
                        },
                        {
                            type: 'select',
                            name: 'type',
                            placeholder: '类型',
                            value: 'text',
                            options: [
                                {
                                    value: 'text',
                                    label: '纯文本'
                                },
                                {
                                    value: 'tpl',
                                    label: '模板'
                                },
                                {
                                    value: 'image',
                                    label: '图片'
                                },
                                {
                                    value: 'date',
                                    label: '日期'
                                },
                                {
                                    value: 'progress',
                                    label: '进度'
                                },
                                {
                                    value: 'status',
                                    label: '状态'
                                },
                                {
                                    value: 'mapping',
                                    label: '映射'
                                },
                                {
                                    value: 'container',
                                    label: '容器'
                                },
                                {
                                    value: 'operation',
                                    label: '操作栏'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        _this.events = exports.Table2RenderereEvent;
        _this.actions = exports.Table2RendererAction;
        _this._dynamicControls = {
            primaryField: function (context) {
                return (0, amis_editor_core_1.getSchemaTpl)('primaryField', {
                    /** CRUD下，该项配置提升到CRUD中 */
                    hiddenOn: "data.type && (data.type === \"crud\" || data.type === \"crud2\")"
                });
            },
            quickSaveApi: function (context) {
                return (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                    name: 'quickSaveApi',
                    renderLabel: false,
                    label: {
                        type: 'tpl',
                        tpl: '快速保存',
                        className: 'flex items-end'
                    }
                });
            },
            quickSaveItemApi: function (context) {
                return (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                    name: 'quickSaveItemApi',
                    renderLabel: false,
                    label: {
                        type: 'tpl',
                        tpl: '快速保存单条',
                        className: 'flex items-end'
                    }
                });
            },
            rowSelectionKeyField: function (context) {
                return {
                    type: 'input-text',
                    name: 'rowSelection.keyField',
                    label: '数据源key'
                };
            },
            expandableKeyField: function (context) {
                return {
                    type: 'input-text',
                    name: 'rowSelection.keyField',
                    label: '数据源key'
                };
            },
            draggable: function (context) {
                return (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'draggable',
                    label: '可拖拽'
                });
            },
            itemDraggableOn: function (context) {
                return (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                    label: '可拖拽条件',
                    name: 'itemDraggableOn'
                });
            },
            saveOrderApi: function (context) {
                return (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                    name: 'saveOrderApi',
                    renderLabel: false,
                    label: {
                        type: 'tpl',
                        tpl: '保存排序',
                        className: 'flex items-end'
                    }
                });
            },
            columnTogglable: function (context) { return false; }
        };
        _this.panelBodyCreator = function (context) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var isCRUDBody = _this.isCRUDContext(context);
            var dc = _this.dynamicControls;
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                        label: (0, amis_editor_core_1.tipedLabel)('数据源', '绑定当前上下文变量'),
                                        hidden: isCRUDBody,
                                        name: 'source',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)('${items}')
                                    }),
                                    (_a = dc === null || dc === void 0 ? void 0 : dc.primaryField) === null || _a === void 0 ? void 0 : _a.call(dc, context),
                                    isCRUDBody ? null : (_b = dc === null || dc === void 0 ? void 0 : dc.quickSaveApi) === null || _b === void 0 ? void 0 : _b.call(dc, context),
                                    isCRUDBody ? null : (_c = dc === null || dc === void 0 ? void 0 : dc.quickSaveItemApi) === null || _c === void 0 ? void 0 : _c.call(dc, context),
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'title',
                                        label: '显示标题',
                                        pipeIn: function (value) { return !!value; },
                                        pipeOut: function (value) {
                                            if (value) {
                                                return {
                                                    type: 'container',
                                                    body: [
                                                        {
                                                            type: 'tpl',
                                                            wrapperComponent: '',
                                                            tpl: '表格标题',
                                                            inline: false,
                                                            style: {
                                                                fontSize: 14
                                                            }
                                                        }
                                                    ]
                                                };
                                            }
                                            return null;
                                        }
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'showHeader',
                                        label: '显示表头',
                                        value: true,
                                        pipeIn: function (value) { return !!value; },
                                        pipeOut: function (value) { return !!value; }
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        visibleOn: 'this.showHeader !== false',
                                        name: 'sticky',
                                        label: '冻结表头',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'footer',
                                        label: '显示表尾',
                                        pipeIn: function (value) { return !!value; },
                                        pipeOut: function (value) {
                                            if (value) {
                                                return {
                                                    type: 'container',
                                                    body: [
                                                        {
                                                            type: 'tpl',
                                                            tpl: '表格尾部',
                                                            wrapperComponent: '',
                                                            inline: false,
                                                            style: {
                                                                fontSize: 14
                                                            }
                                                        }
                                                    ]
                                                };
                                            }
                                            return null;
                                        }
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('tablePlaceholder', {
                                        hidden: isCRUDBody
                                    })
                                    // TODD: 组件功能没有支持，暂时隐藏
                                    // {
                                    //   type: 'input-number',
                                    //   name: 'combineNum',
                                    //   label: '合并单元格'
                                    // }
                                ].filter(Boolean)
                            },
                            {
                                title: '列设置',
                                body: [
                                    (_d = dc === null || dc === void 0 ? void 0 : dc.columnTogglable) === null || _d === void 0 ? void 0 : _d.call(dc, context),
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'resizable',
                                        label: (0, amis_editor_core_1.tipedLabel)('可调整列宽', '用户可通过拖拽调整列宽度'),
                                        pipeIn: function (value) { return !!value; },
                                        pipeOut: function (value) { return value; }
                                    }),
                                    isCRUDBody
                                        ? null
                                        : {
                                            type: 'ae-Switch-More',
                                            mode: 'normal',
                                            name: 'columnsTogglable',
                                            hiddenOnDefault: true,
                                            formType: 'extend',
                                            label: (0, amis_editor_core_1.tipedLabel)('自定义显示列', '自动即列数量大于10自动开启。'),
                                            pipeOut: function (value) {
                                                if (value && value.columnsTogglable) {
                                                    return { columnsTogglable: { type: 'column-toggler' } };
                                                }
                                                return value;
                                            },
                                            form: {
                                                body: [
                                                    {
                                                        mode: 'normal',
                                                        type: 'ae-columnControl'
                                                    }
                                                ]
                                            }
                                        }
                                ].filter(Boolean)
                            },
                            {
                                title: '行设置',
                                body: [
                                    {
                                        name: 'lineHeight',
                                        label: '行高度',
                                        type: 'select',
                                        placeholder: '请选择高度',
                                        options: [
                                            { label: '跟随内容', value: '' },
                                            { label: '高', value: 'large' },
                                            { label: '中', value: 'middle' }
                                        ],
                                        clearable: false,
                                        value: ''
                                    },
                                    {
                                        type: 'ae-Switch-More',
                                        mode: 'normal',
                                        name: 'rowSelection',
                                        label: '可选择',
                                        visibleOn: 'data.selectable',
                                        hiddenOnDefault: true,
                                        formType: 'extend',
                                        form: {
                                            body: [
                                                (_e = dc === null || dc === void 0 ? void 0 : dc.rowSelectionKeyField) === null || _e === void 0 ? void 0 : _e.call(dc, context),
                                                {
                                                    name: 'rowSelection.type',
                                                    label: '选择类型',
                                                    type: 'button-group-select',
                                                    options: [
                                                        {
                                                            label: '多选',
                                                            value: 'checkbox'
                                                        },
                                                        {
                                                            label: '单选',
                                                            value: 'radio'
                                                        }
                                                    ],
                                                    pipeIn: (0, amis_editor_core_1.defaultValue)('checkbox')
                                                },
                                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                                    name: 'rowSelection.fixed',
                                                    label: '固定选择列'
                                                }),
                                                {
                                                    type: 'input-number',
                                                    name: 'rowSelection.columnWidth',
                                                    label: '选择列列宽',
                                                    min: 0,
                                                    pipeOut: function (data) { return data || undefined; }
                                                },
                                                {
                                                    label: '可选区域',
                                                    name: 'rowSelection.rowClick',
                                                    type: 'button-group-select',
                                                    value: false,
                                                    options: [
                                                        {
                                                            label: '整行',
                                                            value: true
                                                        },
                                                        {
                                                            label: '勾选框',
                                                            value: false
                                                        }
                                                    ]
                                                },
                                                (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                                    name: 'rowSelection.disableOn',
                                                    label: '行禁用条件'
                                                }),
                                                {
                                                    name: 'rowSelection.selections',
                                                    label: '选择菜单项',
                                                    type: 'checkboxes',
                                                    joinValues: false,
                                                    inline: false,
                                                    itemClassName: 'text-sm',
                                                    options: [
                                                        { label: '全选所有', value: 'all' },
                                                        { label: '反选当页', value: 'invert' },
                                                        { label: '清空所有', value: 'none' },
                                                        { label: '选择奇数行', value: 'odd' },
                                                        { label: '选择偶数行', value: 'even' }
                                                    ],
                                                    pipeIn: function (v) {
                                                        if (!v) {
                                                            return;
                                                        }
                                                        return v.map(function (item) { return ({
                                                            label: item.text,
                                                            value: item.key
                                                        }); });
                                                    },
                                                    pipeOut: function (v) {
                                                        if (!v) {
                                                            return;
                                                        }
                                                        return v.map(function (item) { return ({
                                                            key: item.value,
                                                            text: item.label
                                                        }); });
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                        label: '行可勾选条件',
                                        name: 'itemCheckableOn'
                                    }),
                                    {
                                        type: 'input-number',
                                        name: 'maxKeepItemSelectionLength',
                                        label: '最大选择条数'
                                    },
                                    {
                                        type: 'ae-Switch-More',
                                        mode: 'normal',
                                        name: 'expandable',
                                        label: '可展开',
                                        hiddenOnDefault: true,
                                        formType: 'extend',
                                        form: {
                                            body: [
                                                (_f = dc === null || dc === void 0 ? void 0 : dc.expandableKeyField) === null || _f === void 0 ? void 0 : _f.call(dc, context),
                                                {
                                                    type: 'select',
                                                    label: '展开按钮位置',
                                                    name: 'expandable.position',
                                                    options: [
                                                        {
                                                            label: '默认',
                                                            value: ''
                                                        },
                                                        {
                                                            label: '左侧',
                                                            value: 'left'
                                                        },
                                                        {
                                                            label: '右侧',
                                                            value: 'right'
                                                        },
                                                        {
                                                            label: '隐藏',
                                                            value: 'none'
                                                        }
                                                    ]
                                                },
                                                (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                                    name: 'expandable.expandableOn',
                                                    visibleOn: 'data.expandable',
                                                    label: '可展开条件'
                                                }),
                                                {
                                                    name: 'expandable',
                                                    asFormItem: true,
                                                    label: false,
                                                    children: function (_a) {
                                                        var value = _a.value, onBulkChange = _a.onBulkChange, onChange = _a.onChange, name = _a.name, data = _a.data, form = _a.form;
                                                        var newValue = tslib_1.__assign(tslib_1.__assign({}, value), (value && value.type
                                                            ? {}
                                                            : {
                                                                type: 'container',
                                                                body: [
                                                                    {
                                                                        type: 'tpl',
                                                                        tpl: '展开行内容',
                                                                        inline: false
                                                                    }
                                                                ]
                                                            }));
                                                        return (react_1.default.createElement(amis_1.Button, { className: "w-full flex flex-col items-center", onClick: function () {
                                                                _this.manager.openSubEditor({
                                                                    title: '配置展开区域',
                                                                    value: newValue,
                                                                    onChange: function (value) {
                                                                        var _a;
                                                                        onBulkChange((_a = {},
                                                                            _a[name] = value,
                                                                            _a));
                                                                    },
                                                                    data: tslib_1.__assign({}, _this.manager.store.ctx) //默认数据
                                                                });
                                                            } },
                                                            react_1.default.createElement("span", { className: "inline-flex items-center" },
                                                                react_1.default.createElement(amis_1.Icon, { icon: "edit", className: "mr-1 w-3" }),
                                                                "\u914D\u7F6E\u5C55\u5F00\u533A\u57DF")));
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        type: 'input-text',
                                        label: (0, amis_editor_core_1.tipedLabel)('嵌套字段', '声明数据结构中作为子节点的字段名称，默认是<code>children</code>'),
                                        name: 'childrenColumnName',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)('children')
                                    },
                                    (_g = dc === null || dc === void 0 ? void 0 : dc.draggable) === null || _g === void 0 ? void 0 : _g.call(dc, context),
                                    (_h = dc === null || dc === void 0 ? void 0 : dc.itemDraggableOn) === null || _h === void 0 ? void 0 : _h.call(dc, context),
                                    (_j = dc === null || dc === void 0 ? void 0 : dc.saveOrderApi) === null || _j === void 0 ? void 0 : _j.call(dc, context),
                                    {
                                        name: 'showBadge',
                                        label: '行角标',
                                        type: 'ae-switch-more',
                                        mode: 'normal',
                                        formType: 'extend',
                                        bulk: true,
                                        defaultData: {
                                            itemBadge: {
                                                mode: 'dot'
                                            }
                                        },
                                        isChecked: function (e) {
                                            var data = e.data, name = e.name;
                                            return data[name];
                                        },
                                        form: {
                                            body: [
                                                {
                                                    type: 'ae-badge',
                                                    label: false,
                                                    name: 'itemBadge',
                                                    contentsOnly: true
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                title: '分页设置',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'keepItemSelectionOnPageChange',
                                        label: (0, amis_editor_core_1.tipedLabel)('保留选择项', '默认切换页面、搜索后，用户选择项会被清空，开启此功能后会保留用户选择，可以实现跨页面批量操作。'),
                                        /** 目前仅支持2种类型，默认是 pagination */
                                        visibleOn: '!data.loadType || data.loadType !== "more"'
                                    }),
                                    {
                                        name: 'maxKeepItemSelectionLength',
                                        type: 'input-number',
                                        label: '最大选择条数',
                                        visibleOn: 'data.keepItemSelectionOnPageChange'
                                    }
                                ]
                            },
                            {
                                title: '状态',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('hidden', {
                                        label: '隐藏'
                                    })
                                ]
                            }
                        ])
                    ]
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'bordered',
                                        label: '边框',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                    }),
                                    {
                                        name: 'size',
                                        label: '控件尺寸',
                                        type: 'select',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)('default'),
                                        options: [
                                            {
                                                label: '小',
                                                value: 'small'
                                            },
                                            {
                                                label: '默认',
                                                value: 'default'
                                            },
                                            {
                                                label: '大',
                                                value: 'large'
                                            }
                                        ]
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'autoFillHeight',
                                        label: '高度自适应'
                                    }),
                                    {
                                        name: 'scroll.y',
                                        label: '内容高度',
                                        type: 'button-group-select',
                                        pipeIn: function (v) { return v != null; },
                                        pipeOut: function (v) { return (v ? '' : null); },
                                        options: [
                                            {
                                                label: '适配内容',
                                                value: false
                                            },
                                            {
                                                label: '固定',
                                                value: true
                                            }
                                        ]
                                    },
                                    {
                                        type: 'input-group',
                                        visibleOn: 'data.scroll && data.scroll.y !== null',
                                        label: '高度值',
                                        body: [
                                            {
                                                type: 'input-number',
                                                name: 'scroll.y'
                                            },
                                            {
                                                type: 'tpl',
                                                addOnclassName: 'border-0 bg-none',
                                                tpl: 'px'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'scroll.x',
                                        label: (0, amis_editor_core_1.tipedLabel)('内容宽度', '当列内容过多，超出宽度时，可使用横向滚动方式查看数据。'),
                                        type: 'button-group-select',
                                        pipeIn: function (v) { return v != null; },
                                        pipeOut: function (v) { return (v ? '' : null); },
                                        options: [
                                            {
                                                label: '适配内容',
                                                value: false
                                            },
                                            {
                                                label: '固定',
                                                value: true
                                            }
                                        ]
                                    },
                                    {
                                        type: 'input-group',
                                        visibleOn: 'data.scroll && data.scroll.x !== null',
                                        name: 'scroll.x',
                                        label: '宽度值',
                                        body: [
                                            {
                                                type: 'input-number',
                                                name: 'scroll.x'
                                            },
                                            {
                                                type: 'tpl',
                                                addOnclassName: 'border-0 bg-none',
                                                tpl: 'px'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'indentSize',
                                        visibleOn: 'data.childrenColumnName',
                                        type: 'input-number',
                                        unitOptions: [{ label: 'px', value: 'px' }],
                                        label: (0, amis_editor_core_1.tipedLabel)('缩进尺寸', '嵌套结构展示时，设置子节点的缩进值，单位为px')
                                    },
                                    {
                                        name: 'rowSelection.columnWidth',
                                        visibleOn: 'data.rowSelection',
                                        type: 'input-number',
                                        label: '选择列宽度',
                                        description: '固定选择列的宽度'
                                    },
                                    {
                                        name: 'expandable.columnWidth',
                                        visibleOn: 'data.expandable',
                                        type: 'input-number',
                                        label: '展开列宽度',
                                        description: '固定展开列的宽度'
                                    }
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                                isFormItem: false,
                                schema: [
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        label: '行类名',
                                        name: 'rowClassName'
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                        name: 'rowClassNameExpr',
                                        label: '自定义行样式'
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                        name: 'expandable.expandedRowClassNameExpr',
                                        visibleOn: 'data.expandable',
                                        label: '展开行样式'
                                    })
                                ]
                            })
                        ])
                    ]
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
        _this.dsManager = new DSBuilderManager_1.DSBuilderManager(manager);
        return _this;
    }
    // 为了能够自动注入数据。
    Table2Plugin.prototype.getRendererInfo = function (context) {
        var _a, _b, _c, _d, _e;
        var plugin = this;
        var schema = context.schema, renderer = context.renderer;
        var isCRUD = ['crud', 'crud2'].includes((_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_e = (_d = (_c = context === null || context === void 0 ? void 0 : context.schema) === null || _c === void 0 ? void 0 : _c.$$editor) === null || _d === void 0 ? void 0 : _d.renderer) === null || _e === void 0 ? void 0 : _e.name);
        if (!schema.$$id && isCRUD && renderer.name === 'table2') {
            return tslib_1.__assign(tslib_1.__assign({}, { id: schema.$$editor.id }), { name: plugin.name, regions: plugin.regions, patchContainers: plugin.patchContainers, vRendererConfig: plugin.vRendererConfig, wrapperProps: plugin.wrapperProps, wrapperResolve: plugin.wrapperResolve, filterProps: plugin.filterProps, $schema: plugin.$schema, renderRenderer: plugin.renderRenderer });
        }
        return _super.prototype.getRendererInfo.call(this, context);
    };
    Table2Plugin.prototype.filterProps = function (props) {
        var arr = (0, util_1.resolveArrayDatasource)(props);
        if (!Array.isArray(arr) || !arr.length) {
            var mockedData_1 = {};
            if (Array.isArray(props.columns)) {
                props.columns.forEach(function (column) {
                    if (column.name) {
                        (0, amis_core_1.setVariable)(mockedData_1, column.name, (0, amis_editor_core_1.mockValue)(column));
                    }
                });
            }
            props.value = (0, amis_editor_core_1.repeatArray)(mockedData_1, 10).map(function (item, index) { return (tslib_1.__assign(tslib_1.__assign({}, item), { id: index + 1 })); });
        }
        else {
            // 只取10条预览，否则太多卡顿
            props.value = arr.slice(0, 10);
        }
        // 如果设置了可展开 默认把第一行展开
        if (props.expandable) {
            if (typeof props.expandable === 'boolean') {
                props.expandable = {};
            }
            if (!props.expandable.type) {
                props.expandable.type = 'container';
                props.expandable.body = [
                    {
                        type: 'tpl',
                        tpl: '展开行内容',
                        wrapperComponent: '',
                        inline: false
                    }
                ];
            }
            props.expandable.keyField = 'id';
            props.expandable.expandedRowKeys = [1];
        }
        return props;
    };
    // 自动插入 label
    Table2Plugin.prototype.beforeInsert = function (event) {
        var _a, _b, _c, _d;
        var context = event.context;
        if ((context.info.plugin === this ||
            ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) &&
            context.region === 'columns') {
            context.data = tslib_1.__assign(tslib_1.__assign({}, context.data), { title: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '列名称' });
        }
    };
    Table2Plugin.prototype.buildDataSchemas = function (node, region, trigger) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var itemsSchema, columns, _c, _d, current, schema, _e, _f, _g, e_1_1, cellProperties, isColumnChild, result;
            var e_1, _h;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        itemsSchema = {
                            $id: 'tableRow',
                            type: 'object',
                            properties: {}
                        };
                        columns = node.children.find(function (item) { return item.isRegion && item.region === 'columns'; });
                        if (!columns) return [3 /*break*/, 10];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 8, 9, 10]);
                        _c = tslib_1.__values(columns.children), _d = _c.next();
                        _j.label = 2;
                    case 2:
                        if (!!_d.done) return [3 /*break*/, 7];
                        current = _d.value;
                        schema = current.schema;
                        if (!(schema === null || schema === void 0 ? void 0 : schema.name)) return [3 /*break*/, 6];
                        _e = itemsSchema.properties;
                        _f = schema.name;
                        if (!((_b = (_a = current.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) return [3 /*break*/, 4];
                        return [4 /*yield*/, current.info.plugin.buildDataSchemas(current, region)];
                    case 3:
                        _g = _j.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _g = {
                            type: 'string',
                            title: schema.label || schema.title
                        };
                        _j.label = 5;
                    case 5:
                        _e[_f] = _g;
                        _j.label = 6;
                    case 6:
                        _d = _c.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        cellProperties = {};
                        if (trigger) {
                            isColumnChild = (0, amis_core_1.someTree)(columns === null || columns === void 0 ? void 0 : columns.children, function (item) { return item.id === trigger.id; });
                            isColumnChild && (cellProperties = itemsSchema.properties);
                        }
                        result = {
                            $id: 'table2',
                            type: 'object',
                            properties: tslib_1.__assign(tslib_1.__assign({}, cellProperties), { rows: {
                                    type: 'array',
                                    title: '数据列表',
                                    items: itemsSchema
                                } })
                        };
                        if ((region === null || region === void 0 ? void 0 : region.region) === 'columns') {
                            result.properties = tslib_1.__assign(tslib_1.__assign({}, itemsSchema.properties), result.properties);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Table2Plugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var builder;
            return tslib_1.__generator(this, function (_p) {
                if (((_b = (_a = node === null || node === void 0 ? void 0 : node.info) === null || _a === void 0 ? void 0 : _a.renderer) === null || _b === void 0 ? void 0 : _b.name) &&
                    ['table-cell', 'cell-field'].includes(node.info.renderer.name)) {
                    if (((_c = scopeNode.parent) === null || _c === void 0 ? void 0 : _c.type) === 'crud2' &&
                        ((_e = (_d = scopeNode.parent) === null || _d === void 0 ? void 0 : _d.path) === null || _e === void 0 ? void 0 : _e.endsWith('crud2'))) {
                        return [2 /*return*/, (_g = (_f = scopeNode.parent.info.plugin).getAvailableContextFields) === null || _g === void 0 ? void 0 : _g.call(_f, scopeNode.parent, node, region)];
                    }
                    if (((_h = scopeNode.parent) === null || _h === void 0 ? void 0 : _h.type) === 'service' &&
                        ((_l = (_k = (_j = scopeNode.parent) === null || _j === void 0 ? void 0 : _j.parent) === null || _k === void 0 ? void 0 : _k.path) === null || _l === void 0 ? void 0 : _l.endsWith('service'))) {
                        return [2 /*return*/, (_o = (_m = scopeNode.parent.parent.info.plugin).getAvailableContextFields) === null || _o === void 0 ? void 0 : _o.call(_m, scopeNode.parent.parent, node, region)];
                    }
                }
                builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
                if (builder && scopeNode.schema.api) {
                    return [2 /*return*/, builder.getAvailableContextFields({
                            schema: scopeNode.schema,
                            sourceKey: 'api',
                            feat: 'List'
                        }, node)];
                }
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(Table2Plugin.prototype, "dynamicControls", {
        /** 需要动态控制的控件 */
        get: function () {
            return this._dynamicControls;
        },
        set: function (controls) {
            if (!controls || !(0, amis_core_1.isObject)(controls)) {
                throw new Error('[amis-editor][Table2Plugin] dynamicControls的值必须是一个对象');
            }
            this._dynamicControls = tslib_1.__assign(tslib_1.__assign({}, this._dynamicControls), controls);
        },
        enumerable: false,
        configurable: true
    });
    Table2Plugin.prototype.isCRUDContext = function (context) {
        return context.schema.type === 'crud2' || context.schema.type === 'crud';
    };
    Table2Plugin.id = 'Table2Plugin';
    return Table2Plugin;
}(amis_editor_core_1.BasePlugin));
exports.Table2Plugin = Table2Plugin;
(0, amis_editor_core_1.registerEditorPlugin)(Table2Plugin);
