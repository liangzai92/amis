"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablePlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_core_1 = require("amis-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var DSBuilderManager_1 = require("../builder/DSBuilderManager");
var amis_editor_core_4 = require("amis-editor-core");
var amis_editor_core_5 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var util_1 = require("../util");
var mobx_1 = require("mobx");
var TablePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TablePlugin, _super);
    function TablePlugin(manager) {
        var _this = _super.call(this, manager) || this;
        // 关联渲染器名字
        _this.rendererName = 'table';
        _this.$schema = '/schemas/TableSchema.json';
        // 组件名称
        _this.name = '原子表格';
        _this.tags = ['展示'];
        _this.isBaseComponent = true;
        _this.description = '用来展示表格数据，可以配置列信息，然后关联数据便能完成展示。支持嵌套、超级表头、列固定、表头固顶、合并单元格等等。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。';
        _this.docLink = '/amis/zh-CN/components/table';
        _this.icon = 'fa fa-table';
        _this.pluginIcon = 'table-plugin';
        _this.scaffold = {
            type: 'table',
            columns: [
                {
                    label: '列信息',
                    name: 'a'
                }
            ]
        };
        _this.regions = [
            {
                key: 'columns',
                label: '列集合',
                renderMethod: 'renderTableContent',
                preferTag: '展示',
                dndMode: 'position-h'
            }
        ];
        //renderTableContent
        _this.previewSchema = {
            type: 'table',
            className: 'text-left m-b-none',
            affixHeader: false,
            items: [
                { a: 1, b: 2 },
                { a: 3, b: 4 },
                { a: 5, b: 6 }
            ],
            columns: [
                {
                    label: 'A',
                    name: 'a'
                },
                {
                    label: 'B',
                    name: 'b'
                }
            ]
        };
        _this.panelTitle = '表格';
        _this.events = [
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
        _this.actions = [
            {
                actionType: 'select',
                actionLabel: '设置选中项',
                description: '设置表格的选中项',
                innerArgs: ['selected'],
                schema: (0, helper_1.getArgsWrapper)([
                    (0, amis_editor_core_4.getSchemaTpl)('formulaControl', {
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
            },
            {
                actionType: 'initDrag',
                actionLabel: '开启排序',
                description: '开启表格拖拽排序功能'
            }
        ];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isCRUDBody = context.schema.type === 'crud';
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_4.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_4.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    name: 'title',
                                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                    label: '标题'
                                },
                                isCRUDBody
                                    ? null
                                    : (0, amis_editor_core_4.getSchemaTpl)('sourceBindControl', {
                                        label: '数据源'
                                    }),
                                {
                                    name: 'combineNum',
                                    label: (0, amis_editor_core_4.tipedLabel)('自动合并单元格', '设置从左到右多少列内启用自动合并单元格，根据字段值是否相同来决定是否合并。'),
                                    type: 'input-number',
                                    labelAlign: 'left',
                                    horizontal: {
                                        left: 5,
                                        right: 7
                                    },
                                    placeholder: '设置列数'
                                },
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    formType: 'extend',
                                    label: '头部',
                                    name: 'showHeader',
                                    form: {
                                        body: [
                                            {
                                                children: (react_1.default.createElement(amis_1.Button, { level: "primary", size: "sm", block: true, onClick: _this.editHeaderDetail.bind(_this, context.id) }, "\u914D\u7F6E\u5934\u90E8"))
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    formType: 'extend',
                                    label: '底部',
                                    name: 'showFooter',
                                    form: {
                                        body: [
                                            {
                                                children: (react_1.default.createElement(amis_1.Button, { level: "primary", size: "sm", block: true, onClick: _this.editFooterDetail.bind(_this, context.id) }, "\u914D\u7F6E\u5E95\u90E8"))
                                            }
                                        ]
                                    }
                                }
                                // {
                                //   children: (
                                //     <div>
                                //       <Button
                                //         level="info"
                                //         size="sm"
                                //         className="m-b-sm"
                                //         block
                                //         onClick={this.handleAdd}
                                //       >
                                //         新增一列
                                //       </Button>
                                //     </div>
                                //   )
                                // },
                                // {
                                //   children: (
                                //     <div>
                                //       <Button
                                //         level="success"
                                //         size="sm"
                                //         block
                                //         onClick={this.handleColumnsQuickEdit.bind(this)}
                                //       >
                                //         快速编辑列信息
                                //       </Button>
                                //     </div>
                                //   )
                                // }
                            ]
                        },
                        (0, amis_editor_core_4.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_4.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    name: 'columnsTogglable',
                                    label: '展示列显示开关',
                                    type: 'button-group-select',
                                    pipeIn: (0, amis_editor_core_4.defaultValue)('auto'),
                                    size: 'sm',
                                    labelAlign: 'left',
                                    horizontal: {
                                        left: 5,
                                        right: 7
                                    },
                                    options: [
                                        {
                                            label: '自动',
                                            value: 'auto'
                                        },
                                        {
                                            label: '开启',
                                            value: true
                                        },
                                        {
                                            label: '关闭',
                                            value: false
                                        }
                                    ],
                                    description: '自动即列数量大于5个时自动开启'
                                },
                                (0, amis_editor_core_4.getSchemaTpl)('switch', {
                                    name: 'affixHeader',
                                    label: '是否固定表头',
                                    pipeIn: (0, amis_editor_core_4.defaultValue)(true)
                                }),
                                (0, amis_editor_core_4.getSchemaTpl)('switch', {
                                    name: 'footable',
                                    label: (0, amis_editor_core_4.tipedLabel)('是否开启单条底部展示', '如果列太多显示会很臃肿，可以考虑把部分列放在当前行的底部展示'),
                                    pipeIn: function (value) { return !!value; }
                                }),
                                {
                                    name: 'footable.expand',
                                    type: 'button-group-select',
                                    size: 'sm',
                                    visibleOn: 'data.footable',
                                    label: '底部默认展开',
                                    pipeIn: (0, amis_editor_core_4.defaultValue)('none'),
                                    options: [
                                        {
                                            label: '第一条',
                                            value: 'first'
                                        },
                                        {
                                            label: '所有',
                                            value: 'all'
                                        },
                                        {
                                            label: '不展开',
                                            value: 'none'
                                        }
                                    ]
                                },
                                {
                                    name: 'placeholder',
                                    pipeIn: (0, amis_editor_core_4.defaultValue)('暂无数据'),
                                    type: 'input-text',
                                    label: '无数据提示'
                                },
                                {
                                    name: 'rowClassNameExpr',
                                    type: 'input-text',
                                    label: '行高亮规则',
                                    placeholder: "\u652F\u6301\u6A21\u677F\u8BED\u6CD5\uFF0C\u5982 <%= data.id % 2 ? 'bg-success' : '' %>"
                                }
                            ]
                        },
                        {
                            title: 'CSS类名',
                            body: [
                                (0, amis_editor_core_4.getSchemaTpl)('className', {
                                    label: '外层'
                                }),
                                (0, amis_editor_core_4.getSchemaTpl)('className', {
                                    name: 'tableClassName',
                                    label: '表格'
                                }),
                                (0, amis_editor_core_4.getSchemaTpl)('className', {
                                    name: 'headerClassName',
                                    label: '顶部外层'
                                }),
                                (0, amis_editor_core_4.getSchemaTpl)('className', {
                                    name: 'footerClassName',
                                    label: '底部外层'
                                }),
                                (0, amis_editor_core_4.getSchemaTpl)('className', {
                                    name: 'toolbarClassName',
                                    label: '工具栏'
                                })
                            ]
                        }
                    ])
                },
                isCRUDBody
                    ? null
                    : {
                        title: '事件',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_4.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                        ]
                    }
            ]);
        };
        _this.unWatchWidthChange = {};
        _this.dsManager = new DSBuilderManager_1.DSBuilderManager(manager);
        return _this;
    }
    Object.defineProperty(TablePlugin.prototype, "scaffoldForm", {
        get: function () {
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return {
                title: '快速构建表格',
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
                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                name: 'label',
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
                                    // {
                                    //     value: 'datetime',
                                    //     label: '日期时间'
                                    // },
                                    // {
                                    //     value: 'time',
                                    //     label: '时间'
                                    // },
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
                                        value: 'operation',
                                        label: '操作栏'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                canRebuild: true
            };
        },
        enumerable: false,
        configurable: true
    });
    TablePlugin.prototype.filterProps = function (props) {
        var arr = (0, util_1.resolveArrayDatasource)(props);
        if (!Array.isArray(arr) || !arr.length) {
            var mockedData_1 = {};
            if (Array.isArray(props.columns)) {
                props.columns.forEach(function (column) {
                    if (column.name) {
                        (0, amis_core_1.setVariable)(mockedData_1, column.name, (0, amis_editor_core_5.mockValue)(column));
                    }
                });
            }
            props.value = (0, amis_editor_core_2.repeatArray)(mockedData_1, 1).map(function (item, index) { return (tslib_1.__assign(tslib_1.__assign({}, item), { id: index + 1 })); });
        }
        else {
            // 只取10条预览，否则太多卡顿
            props.value = arr.slice(0, 10);
        }
        // 编辑模式，不允许表格调整宽度
        props.resizable = false;
        return props;
    };
    // 为了能够自动注入数据。
    TablePlugin.prototype.getRendererInfo = function (context) {
        var _a;
        var plugin = this;
        var schema = context.schema, renderer = context.renderer;
        if (!schema.$$id &&
            ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' &&
            renderer.name === 'table') {
            return tslib_1.__assign(tslib_1.__assign({}, { id: schema.$$editor.id }), { name: plugin.name, regions: plugin.regions, patchContainers: plugin.patchContainers, vRendererConfig: plugin.vRendererConfig, wrapperProps: plugin.wrapperProps, wrapperResolve: plugin.wrapperResolve, filterProps: plugin.filterProps, $schema: plugin.$schema, renderRenderer: plugin.renderRenderer });
        }
        return _super.prototype.getRendererInfo.call(this, context);
    };
    // 自动插入 label
    TablePlugin.prototype.beforeInsert = function (event) {
        var _a, _b, _c, _d;
        var context = event.context;
        if ((context.info.plugin === this ||
            ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) &&
            context.region === 'columns') {
            context.data = tslib_1.__assign(tslib_1.__assign({}, context.data), { label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '列名称' });
        }
    };
    TablePlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var itemsSchema, columns, parentScopeId, isColumnChild, scopeId, index, cells, cell, items, current, schema, _g, _h, sourceMatch1, sourceMatch2, source_1, scope, rowMembers, scopeId, scope;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        itemsSchema = {
                            $id: "".concat(node.id, "-").concat(node.type, "-tableRows"),
                            type: 'object',
                            properties: {}
                        };
                        columns = node.children.find(function (item) { return item.isRegion && item.region === 'columns'; });
                        parentScopeId = "".concat(parent === null || parent === void 0 ? void 0 : parent.id, "-").concat(parent === null || parent === void 0 ? void 0 : parent.type).concat(((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === 'cell' ? '-currentRow' : '');
                        isColumnChild = false;
                        // 追加当前行scope
                        if (trigger) {
                            isColumnChild = (0, amis_core_1.someTree)(columns === null || columns === void 0 ? void 0 : columns.children, function (item) { return item.id === trigger.id; });
                            if (isColumnChild) {
                                scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                                if (this.manager.dataSchema.getScope(scopeId)) {
                                    this.manager.dataSchema.removeScope(scopeId);
                                }
                                if (this.manager.dataSchema.getScope(parentScopeId)) {
                                    this.manager.dataSchema.switchTo(parentScopeId);
                                }
                                this.manager.dataSchema.addScope([], scopeId);
                                this.manager.dataSchema.current.tag = '当前行记录';
                                this.manager.dataSchema.current.group = '组件上下文';
                            }
                        }
                        index = 0;
                        cells = columns.children.concat();
                        _j.label = 1;
                    case 1:
                        if (!(cells.length > 0 && index < node.schema.columns.length)) return [3 /*break*/, 6];
                        cell = cells.shift();
                        items = cell.children.concat();
                        _j.label = 2;
                    case 2:
                        if (!items.length) return [3 /*break*/, 5];
                        current = items.shift();
                        schema = current.schema;
                        if (!schema.name) return [3 /*break*/, 4];
                        _g = itemsSchema.properties;
                        _h = schema.name;
                        return [4 /*yield*/, ((_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, region, trigger, node))];
                    case 3:
                        _g[_h] =
                            _j.sent();
                        _j.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5:
                        index++;
                        return [3 /*break*/, 1];
                    case 6:
                        // 收集source绑定的列表成员
                        if (node.schema.source) {
                            sourceMatch1 = node.schema.source.match(/\$\{(.*?)\}/);
                            sourceMatch2 = node.schema.source.match(/\$(\w+$)/);
                            source_1 = sourceMatch1
                                ? sourceMatch1[1]
                                : sourceMatch2
                                    ? sourceMatch2[1]
                                    : '';
                            scope = this.manager.dataSchema.getScope("".concat(node.info.id, "-").concat(node.info.type));
                            while (scope) {
                                rowMembers = scope.schemas.find(function (item) { var _a; return (_a = item.properties) === null || _a === void 0 ? void 0 : _a[source_1]; });
                                if (rowMembers) {
                                    itemsSchema = tslib_1.__assign(tslib_1.__assign({}, itemsSchema), { properties: tslib_1.__assign(tslib_1.__assign({}, itemsSchema.properties), (_f = (_e = (_d = rowMembers.properties) === null || _d === void 0 ? void 0 : _d[source_1]) === null || _e === void 0 ? void 0 : _e.items) === null || _f === void 0 ? void 0 : _f.properties) });
                                }
                                scope = rowMembers ? undefined : scope.parent;
                            }
                        }
                        if ((region === null || region === void 0 ? void 0 : region.region) === 'columns') {
                            return [2 /*return*/, itemsSchema];
                        }
                        // 追加当前行数据
                        if (isColumnChild) {
                            scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                            scope = this.manager.dataSchema.getScope(scopeId);
                            scope === null || scope === void 0 ? void 0 : scope.addSchema(itemsSchema);
                        }
                        return [2 /*return*/, {
                                $id: "".concat(node.id, "-").concat(node.type),
                                type: 'object',
                                properties: {
                                    rows: {
                                        type: 'array',
                                        title: '数据列表',
                                        items: itemsSchema
                                    },
                                    selectedItems: {
                                        type: 'array',
                                        title: '已选中行',
                                        items: itemsSchema
                                    },
                                    unSelectedItems: {
                                        type: 'array',
                                        title: '未选中行',
                                        items: itemsSchema
                                    }
                                }
                            }];
                }
            });
        });
    };
    TablePlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var builder;
            return tslib_1.__generator(this, function (_j) {
                if (((_b = (_a = node === null || node === void 0 ? void 0 : node.info) === null || _a === void 0 ? void 0 : _a.renderer) === null || _b === void 0 ? void 0 : _b.name) === 'table-cell') {
                    if (((_c = scopeNode.parent) === null || _c === void 0 ? void 0 : _c.type) === 'service' &&
                        ((_f = (_e = (_d = scopeNode.parent) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.path) === null || _f === void 0 ? void 0 : _f.endsWith('service'))) {
                        return [2 /*return*/, (_h = (_g = scopeNode.parent.parent.info.plugin).getAvailableContextFields) === null || _h === void 0 ? void 0 : _h.call(_g, scopeNode.parent.parent, node, region)];
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
    TablePlugin.prototype.editHeaderDetail = function (id) {
        var _a;
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var defaultHeader = {
            type: 'tpl',
            tpl: '头部',
            wrapperComponent: ''
        };
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置头部',
                value: (0, util_1.schemaToArray)((_a = value.header) !== null && _a !== void 0 ? _a : defaultHeader),
                slot: {
                    type: 'container',
                    body: '$$'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { header: (0, util_1.schemaArrayFormat)(newValue) });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_2.diff)(value, newValue));
                }
            });
    };
    TablePlugin.prototype.editFooterDetail = function (id) {
        var _a;
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var defaultFooter = {
            type: 'tpl',
            tpl: '底部',
            wrapperComponent: ''
        };
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置底部',
                value: (0, util_1.schemaToArray)((_a = value.footer) !== null && _a !== void 0 ? _a : defaultFooter),
                slot: {
                    type: 'container',
                    body: '$$'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { footer: (0, util_1.schemaArrayFormat)(newValue) });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_2.diff)(value, newValue));
                }
            });
    };
    TablePlugin.prototype.componentRef = function (node, ref) {
        var _this = this;
        var _a, _b;
        if (ref) {
            var store_1 = ref.props.store;
            this.unWatchWidthChange[node.id] = (0, mobx_1.reaction)(function () {
                return store_1.columns.map(function (column) { return column.pristine.width; }).join(',');
            }, function () {
                ref.updateTableInfoLazy(function () {
                    _this.manager.store.highlightNodes.forEach(function (node) {
                        return node.calculateHighlightBox();
                    });
                });
            });
        }
        else {
            (_b = (_a = this.unWatchWidthChange)[node.id]) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    };
    TablePlugin.id = 'TablePlugin';
    return TablePlugin;
}(amis_editor_core_3.BasePlugin));
exports.TablePlugin = TablePlugin;
(0, amis_editor_core_2.registerEditorPlugin)(TablePlugin);
