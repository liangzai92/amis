"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var get_1 = tslib_1.__importDefault(require("lodash/get"));
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var react_1 = tslib_1.__importDefault(require("react"));
var helper_1 = require("../renderer/event-control/helper");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var amis_core_1 = require("amis-core");
var mobx_state_tree_1 = require("mobx-state-tree");
var amis_core_2 = require("amis-core");
var isPlainObject_1 = tslib_1.__importDefault(require("lodash/isPlainObject"));
// 将展现控件转成编辑控件
var viewTypeToEditType = function (type) {
    return type === 'tpl'
        ? 'input-text'
        : type === 'status' || type === 'mapping'
            ? 'select'
            : "input-".concat(type);
};
var CRUDPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDPlugin, _super);
    function CRUDPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'crud';
        _this.$schema = '/schemas/CRUDSchema.json';
        _this.order = -800;
        // 组件名称
        _this.name = '增删改查';
        _this.isBaseComponent = true;
        _this.description = '用来实现对数据的增删改查，支持三种模式展示：table、cards和list. 负责数据的拉取，分页，单条操作，批量操作，排序，快速编辑等等功能。集成查询条件。';
        _this.docLink = '/amis/zh-CN/components/crud';
        _this.tags = ['数据容器'];
        _this.icon = 'fa fa-table';
        _this.pluginIcon = 'table-plugin';
        _this.scaffold = {
            type: 'crud',
            syncLocation: false,
            api: '',
            columns: [
                {
                    name: 'id',
                    label: 'ID',
                    type: 'text'
                },
                {
                    name: 'engine',
                    label: '渲染引擎',
                    type: 'text'
                }
            ],
            bulkActions: [],
            itemActions: []
        };
        _this.events = [
            {
                eventName: 'fetchInited',
                eventLabel: '初始化数据接口请求完成',
                description: '远程初始化数据接口请求完成时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    responseData: {
                                        type: 'object',
                                        title: '响应数据'
                                    },
                                    responseStatus: {
                                        type: 'number',
                                        title: '响应状态(0表示成功)'
                                    },
                                    responseMsg: {
                                        type: 'string',
                                        title: '响应消息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
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
                                        title: '已选择行记录'
                                    },
                                    unSelectedItems: {
                                        type: 'array',
                                        title: '未选择行记录'
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
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionLabel: '变量赋值',
                actionType: 'setValue',
                description: '更新列表记录'
            }
        ];
        _this.btnSchemas = {
            create: {
                label: '新增',
                type: 'button',
                actionType: 'dialog',
                level: 'primary',
                dialog: {
                    title: '新增',
                    body: {
                        type: 'form',
                        api: 'xxx/create',
                        body: []
                    }
                }
            },
            update: {
                label: '编辑',
                type: 'button',
                actionType: 'dialog',
                level: 'link',
                dialog: {
                    title: '编辑',
                    body: {
                        type: 'form',
                        api: 'xxx/update',
                        body: []
                    }
                }
            },
            view: {
                label: '查看',
                type: 'button',
                actionType: 'dialog',
                level: 'link',
                dialog: {
                    title: '查看详情',
                    body: {
                        type: 'form',
                        api: 'xxx/update',
                        body: []
                    }
                }
            },
            delete: {
                type: 'button',
                label: '删除',
                actionType: 'ajax',
                level: 'link',
                className: 'text-danger',
                confirmText: '确定要删除？',
                api: 'delete:/xxx/delete'
            },
            bulkDelete: {
                type: 'button',
                level: 'danger',
                label: '批量删除',
                actionType: 'ajax',
                confirmText: '确定要删除？',
                api: '/xxx/batch-delete'
            },
            bulkUpdate: {
                type: 'button',
                label: '批量编辑',
                actionType: 'dialog',
                dialog: {
                    title: '批量编辑',
                    size: 'md',
                    body: {
                        type: 'form',
                        api: '/xxx/bacth-edit',
                        body: [
                            {
                                label: '字段1',
                                text: '字段1',
                                type: 'input-text'
                            }
                        ]
                    }
                }
            },
            // itemDelete: {
            //   type: 'button',
            //   level: 'danger',
            //   label: '删除',
            //   api: '/xxx/delete-one',
            //   actionType: 'ajax',
            //   confirmText: '确定要删除？'
            // },
            filter: {
                title: '查询条件',
                body: [
                    {
                        type: 'input-text',
                        name: 'keywords',
                        label: '关键字'
                    }
                ]
            }
        };
        _this.multifactor = true;
        _this.previewSchema = {
            syncLocation: false,
            type: 'crud',
            className: 'text-left',
            bodyClassName: 'm-b-none',
            affixHeader: false,
            data: {
                items: [
                    { a: 1, b: 2 },
                    { a: 3, b: 4 },
                    { a: 5, b: 6 }
                ]
            },
            source: '${items}',
            columns: [
                {
                    label: 'A',
                    name: 'a'
                },
                {
                    label: 'B',
                    name: 'b'
                },
                {
                    type: 'operation',
                    label: '操作',
                    buttons: [
                        {
                            icon: 'fa fa-eye',
                            type: 'button'
                        },
                        {
                            icon: 'fa fa-edit',
                            type: 'button'
                        }
                    ]
                }
            ]
        };
        _this.panelTitle = '增删改查';
        _this.panelBodyCreator = function (context) {
            var store = _this.manager.store;
            var id = context.id;
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'filter',
                            label: '启用查询条件',
                            visibleOn: 'data.api && data.api.url',
                            pipeIn: function (value) { return !!value; },
                            pipeOut: function (value, originValue) {
                                if (value) {
                                    return (_this.oldFilter ||
                                        (0, amis_editor_core_4.JSONPipeIn)({
                                            title: '查询条件',
                                            body: [
                                                {
                                                    type: 'input-text',
                                                    name: 'keywords',
                                                    label: '关键字'
                                                }
                                            ]
                                        }));
                                }
                                else {
                                    _this.oldFilter = originValue;
                                }
                                return null;
                            }
                        }),
                        {
                            type: 'divider',
                            visibleOn: 'data.api && data.api.url'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                            label: '批量操作',
                            name: 'bulkActions',
                            type: 'combo',
                            hiddenOn: 'data.pickerMode && data.multiple',
                            inputClassName: 'ae-BulkActions-control',
                            multiple: true,
                            draggable: true,
                            draggableTip: '',
                            scaffold: {
                                label: '按钮',
                                type: 'button'
                            },
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '通过此可以管理批量操作按钮，只有设置了批量操作按钮才会出现选择框，可在外观中配置批量操作按钮位置。',
                                placement: 'left'
                            },
                            items: [
                                (0, amis_editor_core_3.getSchemaTpl)('tpl:btnLabel'),
                                {
                                    columnClassName: 'p-t-xs col-edit',
                                    children: function (_a) {
                                        var index = _a.index;
                                        return (react_1.default.createElement("button", { onClick: _this.handleBulkActionEdit.bind(_this, id, index), "data-tooltip": "\u4FEE\u6539", "data-position": "bottom", className: "text-muted" },
                                            react_1.default.createElement("i", { className: "fa fa-pencil" })));
                                    }
                                }
                            ]
                        }),
                        // getSchemaTpl('switch', {
                        //   name: 'defaultChecked',
                        //   label: '默认是否全部勾选',
                        //   visibleOn: 'data.bulkActions && data.bulkActions.length',
                        //   pipeIn: defaultValue(false)
                        // }),
                        {
                            type: 'divider'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                            label: '单条操作',
                            name: 'itemActions',
                            type: 'combo',
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '设置后，当鼠标悬停行数据上，会出现该操作按钮，同时顶部操作栏也会显示该按钮，勾选成员时与批量按钮智能切换。',
                                placement: 'left'
                            },
                            hiddenOn: 'this.mode && this.mode !== "table" || this.pickerMode',
                            inputClassName: 'ae-BulkActions-control',
                            multiple: true,
                            draggable: true,
                            scaffold: {
                                label: '按钮',
                                type: 'button'
                            },
                            items: [
                                (0, amis_editor_core_3.getSchemaTpl)('tpl:btnLabel'),
                                {
                                    type: 'checkbox',
                                    className: 'text-xs',
                                    option: '悬停隐藏',
                                    name: 'hiddenOnHover'
                                },
                                {
                                    columnClassName: 'p-t-xs col-edit',
                                    children: function (_a) {
                                        var index = _a.index;
                                        return (react_1.default.createElement("button", { onClick: _this.handleItemActionEdit.bind(_this, id, index), "data-tooltip": "\u4FEE\u6539", "data-position": "bottom", className: "text-muted" },
                                            react_1.default.createElement("i", { className: "fa fa-pencil" })));
                                    }
                                }
                            ]
                        }),
                        {
                            type: 'divider',
                            hiddenOn: 'this.mode && this.mode !== "table" || this.pickerMode'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'syncLocation',
                            label: '同步地址栏',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(true),
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '开启后会把查询条件数据和分页信息同步到地址栏中，页面中出现多个时，建议只保留一个同步地址栏，否则会相互影响。',
                                placement: 'left'
                            }
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                            label: '默认参数',
                            type: 'input-kv',
                            name: 'defaultParams',
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '可以用来设置默认参数，比如 <code>perPage:20</code>',
                                placement: 'left'
                            }
                        }),
                        {
                            type: 'divider'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'keepItemSelectionOnPageChange',
                            label: '保留条目选择',
                            visbileOn: 'this.bulkActions && this.bulkActions.length || this.itemActions && this.itemActions.length',
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '默认分页、搜索后，用户选择条目会被清空，开启此选项后会保留用户选择，可以实现跨页面批量操作。',
                                placement: 'left'
                            }
                        }),
                        {
                            name: 'labelTpl',
                            type: 'input-text',
                            label: '单条描述模板',
                            visibleOn: 'this.keepItemSelectionOnPageChange',
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '开启【保留条目选择】后会把所有已选择条目列出来，此选项可以用来定制条目展示文案。',
                                placement: 'left'
                            }
                        },
                        {
                            name: 'primaryField',
                            label: '指定主键',
                            type: 'input-text',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('id'),
                            description: '默认<code>id</code>，用于批量操作获取行级数据'
                        }
                    ]
                },
                {
                    title: '接口',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                            label: '数据拉取接口',
                            sampleBuilder: function () {
                                var _a, _b;
                                var data = {
                                    items: [],
                                    total: 0
                                };
                                var columns = (_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.columns) !== null && _b !== void 0 ? _b : [];
                                var row = {};
                                columns.forEach(function (column) {
                                    if (column.name) {
                                        (0, amis_core_1.setVariable)(row, column.name, 'sample');
                                    }
                                });
                                data.items.push(row);
                                return JSON.stringify({
                                    status: 0,
                                    msg: '',
                                    data: data
                                }, null, 2);
                            }
                        }),
                        {
                            name: 'initFetch',
                            type: 'radios',
                            label: '是否初始拉取',
                            pipeIn: function (value) {
                                return (typeof value == 'boolean' && value) ||
                                    (typeof value !== 'boolean' && '');
                            },
                            inline: true,
                            onChange: function () { },
                            options: [
                                {
                                    label: '是',
                                    value: true
                                },
                                {
                                    label: '否',
                                    value: false
                                },
                                {
                                    label: '表达式',
                                    value: ''
                                }
                            ]
                        },
                        {
                            name: 'initFetchOn',
                            autoComplete: false,
                            visibleOn: 'typeof this.initFetch !== "boolean"',
                            type: 'input-text',
                            placeholder: '用 JS 表达式来决定',
                            className: 'm-t-n-sm'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'loadDataOnce',
                            label: '一次性拉取',
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '开启后，数据只会在初始的时候拉取，后续分页、排序不再请求接口，都由前端直接完成。',
                                placement: 'left'
                            }
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            label: '开启定时刷新',
                            name: 'interval',
                            visibleOn: 'data.api',
                            pipeIn: function (value) { return !!value; },
                            pipeOut: function (value) { return (value ? 3000 : undefined); }
                        }),
                        {
                            name: 'interval',
                            type: 'input-number',
                            visibleOn: 'typeof data.interval === "number"',
                            step: 500,
                            className: 'm-t-n-sm',
                            description: '设置后将自动定时刷新，单位 ms'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'silentPolling',
                            label: '静默刷新',
                            visibleOn: '!!data.interval',
                            description: '设置自动定时刷新时是否显示loading'
                        }),
                        {
                            name: 'stopAutoRefreshWhen',
                            label: '停止定时刷新检测表达式',
                            type: 'input-text',
                            visibleOn: '!!data.interval',
                            description: '定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则不刷新了。'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'stopAutoRefreshWhenModalIsOpen',
                            label: '当有弹框时关闭自动刷新',
                            visibleOn: '!!data.interval',
                            description: '弹框打开关闭自动刷新，关闭弹框又恢复'
                        }),
                        {
                            type: 'divider'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'draggable',
                            label: '是否可拖拽排序'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                            label: (0, amis_editor_core_1.tipedLabel)('顺序保存接口', "<p><code>ids</code>: <span>\u7528 id \u6765\u8BB0\u5F55\u65B0\u7684\u987A\u5E8F</span></p>\n              <p><code>rows</code>: <span>\u6570\u7EC4\u683C\u5F0F\uFF0C\u65B0\u7684\u987A\u5E8F\uFF0C\u6570\u7EC4\u91CC\u9762\u5305\u542B\u6240\u6709\u539F\u59CB\u4FE1\u606F</span></p>\n              <p><code>insetAfter</code> / <code>insertBefore</code>: <span>\u8FD9\u662F amis \u751F\u6210\u7684 diff \u4FE1\u606F\uFF0C\u5BF9\u8C61\u683C\u5F0F\uFF0Ckey \u4E3A\u76EE\u6807\u6210\u5458\u7684 primaryField \u503C\uFF0C\u5373 id\uFF0Cvalue \u4E3A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u5B58\u653E\u6210\u5458 primaryField \u503C</span></p>"),
                            name: 'saveOrderApi',
                            visibleOn: 'data.draggable'
                        }),
                        {
                            type: 'divider'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                            label: '快速保存接口',
                            name: 'quickSaveApi',
                            description: '当 column 中设置了快速编辑后将使用此接口批量保存数据。'
                        }),
                        {
                            type: 'divider'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                            label: '快速保存单条接口',
                            name: 'quickSaveItemApi',
                            description: '当 column 中设置了快速编辑且设置了立即保存，将使用此接口保存数据。'
                        }),
                        {
                            type: 'divider'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('loadingConfig', {}, { context: context }),
                        {
                            type: 'divider'
                        },
                        {
                            label: '默认消息提示',
                            type: 'combo',
                            name: 'messages',
                            multiLine: true,
                            description: '覆盖默认消息提示，但如果 api 返回 msg 则会优先使用这个 msg',
                            items: [
                                (0, amis_editor_core_3.getSchemaTpl)('fetchSuccess'),
                                (0, amis_editor_core_3.getSchemaTpl)('fetchFailed'),
                                (0, amis_editor_core_3.getSchemaTpl)('saveOrderSuccess'),
                                (0, amis_editor_core_3.getSchemaTpl)('saveOrderFailed'),
                                (0, amis_editor_core_3.getSchemaTpl)('quickSaveSuccess'),
                                (0, amis_editor_core_3.getSchemaTpl)('quickSaveFailed')
                            ]
                        }
                    ]
                },
                {
                    title: '外观',
                    body: [
                        {
                            label: '内容展示模式',
                            name: 'mode',
                            type: 'button-group-select',
                            size: 'xs',
                            pipeIn: function (value, values) { var _a; return (_a = (value === 'grid' ? 'cards' : value)) !== null && _a !== void 0 ? _a : 'table'; },
                            onChange: function (value, oldValue, model, form) {
                                var _a, _b, _c, _d, _e;
                                var headerHasColumnsToggle = (_b = (_a = form === null || form === void 0 ? void 0 : form.data) === null || _a === void 0 ? void 0 : _a.headerToolbar) === null || _b === void 0 ? void 0 : _b.some(function (item) { return item.type === 'columns-toggler'; });
                                var headerToolbar = (0, cloneDeep_1.default)((_c = form === null || form === void 0 ? void 0 : form.data) === null || _c === void 0 ? void 0 : _c.headerToolbar);
                                var columnsToggler;
                                if (value !== 'table' && oldValue === 'table') {
                                    // 存储table模式是否有 columns-toggler
                                    columnsToggler = (headerToolbar === null || headerToolbar === void 0 ? void 0 : headerToolbar.find(function (item) { return item.type === 'columns-toggler'; })) || {
                                        type: 'columns-toggler',
                                        align: 'right'
                                    };
                                    form.setValues({
                                        __headerHasColumnsToggler: headerHasColumnsToggle
                                    });
                                }
                                headerToolbar =
                                    value === 'table'
                                        ? headerToolbar
                                        : headerToolbar === null || headerToolbar === void 0 ? void 0 : headerToolbar.filter(function (item) { return item.type !== 'columns-toggler'; });
                                if (value === 'table') {
                                    if (((_d = form === null || form === void 0 ? void 0 : form.data) === null || _d === void 0 ? void 0 : _d.__headerHasColumnsToggler) &&
                                        !headerHasColumnsToggle) {
                                        headerToolbar === null || headerToolbar === void 0 ? void 0 : headerToolbar.push(((_e = form === null || form === void 0 ? void 0 : form.data) === null || _e === void 0 ? void 0 : _e.__cacheColumnsToggler) || {
                                            type: 'columns-toggler',
                                            align: 'right'
                                        });
                                    }
                                    form.setValues({
                                        headerToolbar: headerToolbar,
                                        columns: form.data.__columns ||
                                            _this.transformByMode({
                                                from: oldValue,
                                                to: value,
                                                schema: form.data
                                            }),
                                        __headerHasColumnsToggler: headerHasColumnsToggle,
                                        __card: form.data.card || form.data.__card,
                                        __listItem: form.data.listItem || form.data.__listItem
                                    });
                                    form.deleteValueByName('card');
                                    form.deleteValueByName('listItem');
                                }
                                else if (value === 'cards') {
                                    oldValue === 'table' &&
                                        form.setValues({
                                            __cacheColumnsToggler: columnsToggler
                                        });
                                    form.setValues({
                                        headerToolbar: headerToolbar,
                                        card: form.data.__card ||
                                            _this.transformByMode({
                                                from: oldValue,
                                                to: value,
                                                schema: form.data
                                            }),
                                        __columns: form.data.columns || form.data.__columns,
                                        __listItem: form.data.listItem || form.data.__listItem
                                    });
                                    form.deleteValueByName('columns');
                                    form.deleteValueByName('listItem');
                                }
                                else {
                                    oldValue === 'table' &&
                                        form.setValues({
                                            __cacheColumnsToggler: columnsToggler
                                        });
                                    form.setValues({
                                        headerToolbar: headerToolbar,
                                        listItem: form.data.__listItem ||
                                            _this.transformByMode({
                                                from: oldValue,
                                                to: value,
                                                schema: form.data
                                            }),
                                        __columns: form.data.columns || form.data.__columns,
                                        __card: form.data.card || form.data.__card
                                    });
                                    form.deleteValueByName('columns');
                                    form.deleteValueByName('card');
                                }
                            },
                            options: [
                                {
                                    value: 'table',
                                    label: '表格'
                                },
                                {
                                    value: 'cards',
                                    label: '卡片'
                                },
                                {
                                    value: 'list',
                                    label: '列表'
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                            name: 'headerToolbar',
                            type: 'combo',
                            draggable: true,
                            draggableTip: '',
                            descrition: '非内建内容请在预览区选中后编辑',
                            label: '顶部工具栏配置',
                            pipeIn: function (value) {
                                if (!Array.isArray(value)) {
                                    value = value ? [value] : ['bulkActions'];
                                }
                                return value.map(function (item) {
                                    var type = item.type;
                                    if (typeof item === 'string' &&
                                        ~[
                                            'bulkActions',
                                            'bulk-actions',
                                            'pagination',
                                            'statistics',
                                            'switch-per-page',
                                            'filter-toggler',
                                            'load-more',
                                            'export-csv',
                                            'export-excel'
                                        ].indexOf(item)) {
                                        type = item === 'bulkActions' ? 'bulk-actions' : item;
                                        item = { type: type };
                                    }
                                    else if (typeof item === 'string') {
                                        type = 'tpl';
                                        item =
                                            typeof item === 'string'
                                                ? { type: 'tpl', tpl: item, wrapperComponent: '' }
                                                : item;
                                    }
                                    return tslib_1.__assign({ type: type }, item);
                                });
                            },
                            pipeOut: function (value) {
                                if (Array.isArray(value)) {
                                    return value.map(function (item) {
                                        if (item.type === 'button') {
                                            return (0, amis_editor_core_4.JSONPipeIn)(tslib_1.__assign({ label: '按钮', type: 'button' }, item));
                                        }
                                        else if (item.type === 'tpl') {
                                            return (0, amis_editor_core_4.JSONPipeIn)(tslib_1.__assign({ type: 'tpl', tpl: '内容', wrapperComponent: '' }, item));
                                        }
                                        return item;
                                    });
                                }
                                return [];
                            },
                            scaffold: {
                                type: 'tpl',
                                wrapperComponent: '',
                                tpl: '内容'
                            },
                            multiple: true,
                            items: [
                                {
                                    type: 'select',
                                    name: 'type',
                                    columnClassName: 'w-ssm',
                                    options: [
                                        {
                                            value: 'bulk-actions',
                                            label: '操作栏'
                                        },
                                        {
                                            value: 'pagination',
                                            label: '分页'
                                        },
                                        {
                                            value: 'statistics',
                                            label: '统计数据'
                                        },
                                        {
                                            value: 'switch-per-page',
                                            label: '切换页码'
                                        },
                                        {
                                            value: 'load-more',
                                            label: '加载更多'
                                        },
                                        {
                                            value: 'export-csv',
                                            label: '导出 CSV'
                                        },
                                        {
                                            value: 'export-excel',
                                            label: '导出 Excel'
                                        },
                                        {
                                            value: 'columns-toggler',
                                            label: '列选择器',
                                            visibleOn: '!this.mode || this.mode === "table"'
                                        },
                                        {
                                            value: 'filter-toggler',
                                            label: '查询条件切换'
                                        },
                                        {
                                            value: 'drag-toggler',
                                            label: '拖拽切换'
                                        },
                                        {
                                            value: 'check-all',
                                            label: '全选',
                                            hiddenOn: '!this.mode || this.mode === "table"'
                                        },
                                        {
                                            value: 'tpl',
                                            label: '文本'
                                        },
                                        {
                                            value: 'button',
                                            label: '按钮'
                                        }
                                    ]
                                },
                                {
                                    name: 'align',
                                    placeholder: '对齐方式',
                                    type: 'select',
                                    size: 'xs',
                                    options: [
                                        {
                                            label: '左对齐',
                                            value: 'left'
                                        },
                                        {
                                            label: '右对齐',
                                            value: 'right'
                                        }
                                    ]
                                }
                                // {
                                //   type: 'remark',
                                //   content: '详情请在预览区域选中后进行编辑。',
                                //   trigger: ['click'],
                                //   rootClose: true,
                                //   placement: 'left',
                                //   visibleOn:
                                //     '!~["bulkActions", "drag-toggler", "check-all", "bulk-actions", "pagination", "statistics", "switch-per-page", "filter-toggler", "load-more"].indexOf(this.type)',
                                //   columnClassName: 'no-grow w-3x p-t-xs',
                                //   className: 'm-l-none'
                                // }
                            ]
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                            name: 'footerToolbar',
                            type: 'combo',
                            draggable: true,
                            draggableTip: '',
                            descrition: '非内建内容请在预览区选中后编辑',
                            label: '底部工具栏配置',
                            pipeIn: function (value) {
                                if (!Array.isArray(value)) {
                                    value = value ? [value] : ['statistics', 'pagination'];
                                }
                                return value.map(function (item) {
                                    var type = item.type;
                                    if (typeof item === 'string' &&
                                        ~[
                                            'bulkActions',
                                            'bulk-actions',
                                            'pagination',
                                            'statistics',
                                            'switch-per-page',
                                            'filter-toggler',
                                            'load-more',
                                            'export-csv',
                                            'export-excel'
                                        ].indexOf(item)) {
                                        type = item === 'bulkActions' ? 'bulk-actions' : item;
                                        item = { type: type };
                                    }
                                    else if (typeof item === 'string') {
                                        type = 'tpl';
                                        item =
                                            typeof item === 'string'
                                                ? { type: 'tpl', tpl: item, wrapperComponent: '' }
                                                : item;
                                    }
                                    return tslib_1.__assign({ type: type }, item);
                                });
                            },
                            pipeOut: function (value) {
                                if (Array.isArray(value)) {
                                    return value.map(function (item) {
                                        if (item.type === 'button') {
                                            return (0, amis_editor_core_4.JSONPipeIn)(tslib_1.__assign({ label: '按钮', type: 'button' }, item));
                                        }
                                        else if (item.type === 'tpl') {
                                            return (0, amis_editor_core_4.JSONPipeIn)(tslib_1.__assign({ type: 'tpl', tpl: '内容', wrapperComponent: '' }, item));
                                        }
                                        return item;
                                    });
                                }
                                return [];
                            },
                            scaffold: {
                                type: 'tpl',
                                tpl: '内容',
                                wrapperComponent: ''
                            },
                            multiple: true,
                            items: [
                                {
                                    type: 'select',
                                    name: 'type',
                                    columnClassName: 'w-ssm',
                                    options: [
                                        {
                                            value: 'bulk-actions',
                                            label: '操作栏'
                                        },
                                        {
                                            value: 'pagination',
                                            label: '分页'
                                        },
                                        {
                                            value: 'statistics',
                                            label: '统计数据'
                                        },
                                        {
                                            value: 'switch-per-page',
                                            label: '切换页码'
                                        },
                                        {
                                            value: 'load-more',
                                            label: '加载更多'
                                        },
                                        {
                                            value: 'export-csv',
                                            label: '导出 CSV'
                                        },
                                        {
                                            value: 'export-excel',
                                            label: '导出 Excel'
                                        },
                                        {
                                            value: 'columns-toggler',
                                            label: '列选择器',
                                            hiddenOn: '["grid", "cards", "list"].indexOf(this.mode)'
                                        },
                                        {
                                            value: 'filter-toggler',
                                            label: '查询条件切换'
                                        },
                                        {
                                            value: 'drag-toggler',
                                            label: '拖拽切换'
                                        },
                                        {
                                            value: 'check-all',
                                            label: '全选',
                                            hiddenOn: '!this.mode || this.mode === "table"'
                                        },
                                        {
                                            value: 'tpl',
                                            label: '文本'
                                        },
                                        {
                                            value: 'button',
                                            label: '按钮'
                                        }
                                    ]
                                },
                                {
                                    name: 'align',
                                    placeholder: '对齐方式',
                                    size: 'xs',
                                    type: 'select',
                                    options: [
                                        {
                                            label: '左对齐',
                                            value: 'left'
                                        },
                                        {
                                            label: '右对齐',
                                            value: 'right'
                                        }
                                    ]
                                },
                                {
                                    type: 'remark',
                                    content: '详情请在预览区域选中后进行编辑。',
                                    trigger: ['click'],
                                    rootClose: true,
                                    placement: 'left',
                                    visibleOn: '!~["bulkActions", "drag-toggler", "check-all", "bulk-actions", "pagination", "statistics", "switch-per-page", "filter-toggler", "load-more", "export-csv", "export-excel"].indexOf(this.type)',
                                    columnClassName: 'no-grow w-3x p-t-xs',
                                    className: 'm-l-none'
                                }
                            ]
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'filterTogglable',
                            label: '是否可显隐查询条件',
                            visibleOn: 'data.filter'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'filterDefaultVisible',
                            label: '查询条件默认是否可见',
                            visibleOn: 'data.filter && data.filterTogglable',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(true)
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'hideQuickSaveBtn',
                            label: '隐藏顶部快速保存提示'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'alwaysShowPagination',
                            label: '是否总是显示分页'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'autoFillHeight',
                            label: '内容区域自适应高度'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'hideCheckToggler',
                            label: '隐藏选择按钮',
                            visibleOn: 'data.checkOnItemClick'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('className'),
                        (0, amis_editor_core_3.getSchemaTpl)('className', {
                            name: 'bodyClassName',
                            label: '内容 CSS 类名'
                        })
                    ]
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                },
                {
                    title: '其他',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('ref'),
                        {
                            name: 'source',
                            label: '数据源',
                            type: 'input-text',
                            description: '不填写，默认读取接口返回的 items 或者 rows 属性，如果是别的，请在此设置，如： <code>\\${xxxx}</code>'
                        },
                        {
                            name: 'perPage',
                            label: '每页数量',
                            type: 'input-number'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'keepItemSelectionOnPageChange',
                            label: '翻页时保留选择'
                        }),
                        {
                            name: 'maxKeepItemSelectionLength',
                            label: '最大选择数量',
                            type: 'input-number',
                            mode: 'horizontal',
                            horizontal: {
                                justify: true
                            }
                        },
                        {
                            name: 'pageField',
                            label: '页码字段名',
                            type: 'input-text',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('page')
                        },
                        {
                            name: 'perPageField',
                            label: '分页步长字段名',
                            type: 'input-text',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('perPage')
                        },
                        {
                            name: 'orderField',
                            label: '排序权重字段',
                            type: 'input-text',
                            labelRemark: {
                                className: 'm-l-xs',
                                trigger: 'click',
                                rootClose: true,
                                content: '设置用来确定位置的字段名，设置后新的顺序将被赋值到该字段中。',
                                placement: 'left'
                            }
                        },
                        {
                            name: 'perPageAvailable',
                            label: '切换每页数',
                            type: 'input-array',
                            hiddenOn: 'data.loadDataOnce',
                            items: {
                                type: 'input-number',
                                required: true
                            },
                            value: [10]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('name'),
                        {
                            name: 'itemCheckableOn',
                            type: 'input-text',
                            label: '配置单条可选中的表达式',
                            description: '请使用 js 表达式，不设置的话每条都可选中。',
                            visibleOn: 'data.bulkActions && data.bulkActions.length || data.pickerMode'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'checkOnItemClick',
                            label: '开启单条点击整个区域选中',
                            visibleOn: 'data.bulkActions && data.bulkActions.length || data.pickerMode'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'autoJumpToTopOnPagerChange',
                            label: '自动跳顶部',
                            description: '当切分页的时候，是否自动跳顶部'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('switch', {
                            name: 'syncResponse2Query',
                            label: '同步查询条件',
                            description: '查询后将返回的数据同步到查询条件上'
                        })
                    ]
                }
            ]);
        };
        _this.wrapperProps = {
            affixHeader: false
        };
        return _this;
    }
    Object.defineProperty(CRUDPlugin.prototype, "scaffoldForm", {
        get: function () {
            var _this = this;
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return {
                title: '增删改查快速开始-CRUD',
                body: [
                    (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                        label: '接口地址',
                        sampleBuilder: function (schema) {
                            return JSON.stringify({
                                status: 0,
                                msg: '',
                                data: [
                                    { id: 1, name: 'Jack' },
                                    { id: 2, name: 'Rose' }
                                ]
                            }, null, 2);
                        }
                    }),
                    {
                        type: 'button',
                        label: '格式校验并自动生成列配置',
                        className: 'm-t-xs m-b-xs',
                        onClick: function (e, props) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var data, schemaFilter, api, response, result, autoFillKeyValues, items, _a, _b, key;
                            var e_1, _c;
                            var _d;
                            return tslib_1.__generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        data = props.data;
                                        schemaFilter = (0, mobx_state_tree_1.getEnv)(window.editorStore).schemaFilter;
                                        api = data.api;
                                        // 主要是给爱速搭中替换 url
                                        if (schemaFilter) {
                                            api = schemaFilter({
                                                api: data.api
                                            }).api;
                                        }
                                        return [4 /*yield*/, props.env.fetcher(api, data)];
                                    case 1:
                                        response = _e.sent();
                                        result = (0, amis_1.normalizeApiResponseData)(response.data);
                                        autoFillKeyValues = [];
                                        items = (_d = result === null || result === void 0 ? void 0 : result.items) !== null && _d !== void 0 ? _d : result === null || result === void 0 ? void 0 : result.rows;
                                        /** 非标返回，取data中的第一个数组作为返回值，和AMIS中处理逻辑同步 */
                                        if (!Array.isArray(items)) {
                                            try {
                                                for (_a = tslib_1.__values(Object.keys(result)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                                    key = _b.value;
                                                    if (result.hasOwnProperty(key) && Array.isArray(result[key])) {
                                                        items = result[key];
                                                        break;
                                                    }
                                                }
                                            }
                                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                            finally {
                                                try {
                                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                                }
                                                finally { if (e_1) throw e_1.error; }
                                            }
                                        }
                                        if (Array.isArray(items)) {
                                            Object.keys(items[0]).forEach(function (key) {
                                                var value = items[0][key];
                                                autoFillKeyValues.push({
                                                    label: key,
                                                    type: 'text',
                                                    name: key
                                                });
                                            });
                                            props.formStore.setValues({
                                                columns: autoFillKeyValues
                                            });
                                            // 查询条件的字段列表
                                            props.formStore.setValues({
                                                filterSettingSource: autoFillKeyValues.map(function (column) {
                                                    return column.name;
                                                })
                                            });
                                        }
                                        else {
                                            amis_1.toast.warning('API返回格式不正确，请点击接口地址右侧示例查看CRUD数据接口结构要求');
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    },
                    {
                        name: 'features',
                        label: '启用功能',
                        type: 'checkboxes',
                        joinValues: false,
                        extractValue: true,
                        itemClassName: 'max-w-lg',
                        options: [
                            { label: '新增', value: 'create' },
                            { label: '查询', value: 'filter' },
                            { label: '批量删除', value: 'bulkDelete' },
                            { label: '批量修改', value: 'bulkUpdate' },
                            { label: '操作栏-编辑', value: 'update' },
                            { label: '操作栏-查看详情', value: 'view' },
                            { label: '操作栏-删除', value: 'delete' }
                        ]
                    },
                    {
                        type: 'group',
                        body: [
                            {
                                columnRatio: 10,
                                type: 'checkboxes',
                                label: '启用的查询字段',
                                name: 'filterEnabledList',
                                joinValues: false,
                                source: '${filterSettingSource}'
                            },
                            {
                                columnRatio: 2,
                                type: 'input-number',
                                label: '每列显示几个字段',
                                value: 3,
                                name: 'filterColumnCount'
                            }
                        ],
                        visibleOn: 'data.features && data.features.includes("filter")'
                    },
                    {
                        name: 'columns',
                        type: 'input-table',
                        label: false,
                        addable: true,
                        removable: true,
                        needConfirm: false,
                        columns: [
                            {
                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                name: 'label',
                                label: '标题'
                            },
                            {
                                type: 'input-text',
                                name: 'name',
                                label: '绑定字段名'
                            },
                            {
                                type: 'select',
                                name: 'type',
                                label: '类型',
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
                                        value: 'operation',
                                        label: '操作栏'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                pipeOut: function (value) {
                    var valueSchema = (0, cloneDeep_1.default)(value);
                    // 查看/删除 操作，可选择是否使用接口返回值预填充
                    var features = valueSchema.features;
                    var oper = {
                        type: 'operation',
                        label: '操作',
                        buttons: []
                    };
                    var itemBtns = ['update', 'view', 'delete'];
                    var hasFeatures = (0, get_1.default)(features, 'length');
                    valueSchema.bulkActions = [];
                    /** 统一api格式 */
                    valueSchema.api =
                        typeof valueSchema.api === 'string'
                            ? (0, amis_core_2.normalizeApi)(valueSchema.api)
                            : valueSchema.api;
                    hasFeatures &&
                        features.forEach(function (item) {
                            var _a, _b, _c, _d;
                            if (itemBtns.includes(item)) {
                                var schema = void 0;
                                if (item === 'update') {
                                    schema = (0, cloneDeep_1.default)(_this.btnSchemas.update);
                                    schema.dialog.body.body = value.columns
                                        .filter(function (_a) {
                                        var type = _a.type;
                                        return type !== 'progress' && type !== 'operation';
                                    })
                                        .map(function (_a) {
                                        var type = _a.type, rest = tslib_1.__rest(_a, ["type"]);
                                        return (tslib_1.__assign(tslib_1.__assign({}, rest), { type: viewTypeToEditType(type) }));
                                    });
                                }
                                else if (item === 'view') {
                                    schema = (0, cloneDeep_1.default)(_this.btnSchemas.view);
                                    schema.dialog.body.body = value.columns.map(function (_a) {
                                        var type = _a.type, rest = tslib_1.__rest(_a, ["type"]);
                                        return (tslib_1.__assign(tslib_1.__assign({}, rest), { type: 'static' }));
                                    });
                                }
                                else if (item === 'delete') {
                                    schema = (0, cloneDeep_1.default)(_this.btnSchemas.delete);
                                    schema.api = ((_b = (_a = valueSchema.api) === null || _a === void 0 ? void 0 : _a.method) === null || _b === void 0 ? void 0 : _b.match(/^(post|delete)$/i))
                                        ? valueSchema.api
                                        : tslib_1.__assign(tslib_1.__assign({}, valueSchema.api), { method: 'post' });
                                }
                                // 添加操作按钮
                                _this.addItem(oper.buttons, schema);
                            }
                            else {
                                // 批量操作
                                if (item === 'bulkUpdate') {
                                    _this.addItem(valueSchema.bulkActions, (0, cloneDeep_1.default)(_this.btnSchemas.bulkUpdate));
                                }
                                if (item === 'bulkDelete') {
                                    _this.addItem(valueSchema.bulkActions, (0, cloneDeep_1.default)(_this.btnSchemas.bulkDelete));
                                }
                                // 创建
                                if (item === 'create') {
                                    var createSchemaBase = _this.btnSchemas.create;
                                    createSchemaBase.dialog.body = {
                                        type: 'form',
                                        api: ((_d = (_c = valueSchema.api) === null || _c === void 0 ? void 0 : _c.method) === null || _d === void 0 ? void 0 : _d.match(/^(post|put)$/i))
                                            ? valueSchema.api
                                            : tslib_1.__assign(tslib_1.__assign({}, valueSchema.api), { method: 'post' }),
                                        body: valueSchema.columns.map(function (column) {
                                            var type = column.type;
                                            return {
                                                type: viewTypeToEditType(type),
                                                name: column.name,
                                                label: column.label
                                            };
                                        })
                                    };
                                    valueSchema.headerToolbar = [createSchemaBase, 'bulkActions'];
                                }
                                var keysFilter = Object.keys(valueSchema.filter || {});
                                if (item === 'filter' && !keysFilter.length) {
                                    if (valueSchema.filterEnabledList) {
                                        valueSchema.filter = {
                                            title: '查询条件'
                                        };
                                        valueSchema.filter.columnCount = value.filterColumnCount;
                                        valueSchema.filter.mode = 'horizontal';
                                        valueSchema.filter.body = valueSchema.filterEnabledList.map(function (item) {
                                            return {
                                                type: 'input-text',
                                                label: item.label,
                                                name: item.value
                                            };
                                        });
                                    }
                                }
                            }
                        });
                    var hasOperate = valueSchema.columns.find(function (item) { return item.type === 'operation'; });
                    hasFeatures && !hasOperate && valueSchema.columns.push(oper);
                    return valueSchema;
                },
                canRebuild: true
            };
        },
        enumerable: false,
        configurable: true
    });
    CRUDPlugin.prototype.addItem = function (source, target) {
        var canAdd = source.find(function (item) { return item.label === target.label; });
        if (!canAdd) {
            source.push(target);
        }
    };
    CRUDPlugin.prototype.handleBulkActionEdit = function (id, index) {
        var store = this.manager.store;
        var schema = store.getSchema(id);
        var action = schema === null || schema === void 0 ? void 0 : schema.bulkActions[index];
        if (action && action.$$id) {
            store.setActiveId(action.$$id);
        }
    };
    CRUDPlugin.prototype.handleItemActionEdit = function (id, index) {
        var store = this.manager.store;
        var schema = store.getSchema(id);
        var action = schema === null || schema === void 0 ? void 0 : schema.itemActions[index];
        if (action && action.$$id) {
            store.setActiveId(action.$$id);
        }
    };
    /**
     * 默认什么组件都加入的子组件里面，子类里面可以复写这个改变行为。
     * @param context
     * @param renderers
     */
    CRUDPlugin.prototype.buildSubRenderers = function (context, renderers) {
        var plugin = this;
        if (plugin.name && plugin.description) {
            return {
                name: plugin.name,
                icon: plugin.icon,
                pluginIcon: plugin.pluginIcon,
                description: plugin.description,
                previewSchema: plugin.previewSchema,
                tags: plugin.tags,
                docLink: plugin.docLink,
                type: plugin.type,
                scaffold: plugin.scaffold,
                disabledRendererPlugin: plugin.disabledRendererPlugin,
                isBaseComponent: plugin.isBaseComponent,
                scaffoldForm: this.scaffoldForm,
                rendererName: plugin.rendererName
            };
        }
    };
    CRUDPlugin.prototype.getRendererInfo = function (context) {
        var info = _super.prototype.getRendererInfo.call(this, context);
        if (info) {
            info.scaffoldForm = this.scaffoldForm;
        }
        return info;
    };
    CRUDPlugin.prototype.renderEditableComponents = function (props) {
        var render = props.render;
        var bulkActions = props.bulkActions;
        var itemActions = props.itemActions;
        var doms = [];
        if (Array.isArray(bulkActions) && bulkActions.length) {
            doms.push(react_1.default.createElement("div", { key: "bulkActions", className: "ae-EditableRender" },
                react_1.default.createElement("div", { className: "ae-EditableRender-title" }, "\u6279\u91CF\u64CD\u4F5C"),
                react_1.default.createElement("div", { className: "ae-EditableRender-body" }, bulkActions.map(function (action) {
                    return render('bulk-action', tslib_1.__assign({ type: 'button', size: 'sm' }, action), {
                        key: action.$$id
                    });
                }))));
        }
        if (Array.isArray(itemActions) && itemActions.length) {
            doms.push(react_1.default.createElement("div", { key: "itemActions", className: "ae-EditableRender" },
                react_1.default.createElement("div", { className: "ae-EditableRender-title" }, "\u5355\u6761\u64CD\u4F5C"),
                react_1.default.createElement("div", { className: "ae-EditableRender-body" }, itemActions.map(function (action) {
                    return render('bulk-action', tslib_1.__assign({ type: 'button', size: 'sm' }, action), {
                        key: action.$$id
                    });
                }))));
        }
        if (!doms.length) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "ae-EditableRenderers" },
            react_1.default.createElement("div", { className: "ae-EditableRenderers-tip" }, "\u300C\u589E\u5220\u6539\u67E5\u300D\u7F16\u8F91\u8F85\u52A9\u533A"),
            doms));
    };
    CRUDPlugin.prototype.renderRenderer = function (props) {
        var $$editor = props.$$editor, style = props.style, rest = tslib_1.__rest(props, ["$$editor", "style"]);
        var renderer = $$editor.renderer;
        return (react_1.default.createElement("div", { className: "ae-CRUDEditor", style: style },
            this.renderEditableComponents(props),
            react_1.default.createElement(renderer.component, tslib_1.__assign({ "$$editor": $$editor }, rest))));
    };
    CRUDPlugin.prototype.filterProps = function (props) {
        if (props.pickerMode) {
            props.options = props.data.options;
        }
        return props;
    };
    CRUDPlugin.prototype.afterUpdate = function (event) {
        var _this = this;
        var _a;
        var context = event.context;
        // mode 内容形式变化，需要重新构建面板。
        if (context.info.plugin === this &&
            ((_a = context.diff) === null || _a === void 0 ? void 0 : _a.some(function (change) { var _a; return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'mode'; }))) {
            setTimeout(function () {
                _this.manager.buildPanels();
                _this.manager.buildToolbars();
            }, 20);
        }
    };
    CRUDPlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
        var _a, _b, _c, _d, _e, _f, _g;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var child, childSchame, itemsSchema_1, columns, rowsSchema, isColumnChild, scope, menberProps, tmpProperties_1, childScope;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        child = node.children.find(function (item) { return !!~['table', 'table2', 'cards', 'list'].indexOf(item.type); });
                        if (!((_b = (_a = child === null || child === void 0 ? void 0 : child.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, child.info.plugin.buildDataSchemas(child, undefined, trigger, node)];
                    case 1:
                        childSchame = _h.sent();
                        // 兼容table的rows，并自行merged异步数据
                        if (child.type === 'table') {
                            itemsSchema_1 = {};
                            columns = child.children.find(function (item) { return item.isRegion && item.region === 'columns'; });
                            rowsSchema = (_c = childSchame.properties.rows) === null || _c === void 0 ? void 0 : _c.items;
                            if (trigger) {
                                isColumnChild = (0, amis_core_1.someTree)(columns === null || columns === void 0 ? void 0 : columns.children, function (item) { return item.id === trigger.id; });
                                scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
                                menberProps = (_g = (_f = (_e = (_d = scope.getSchemaById('crudFetchInitedData')) === null || _d === void 0 ? void 0 : _d.properties) === null || _e === void 0 ? void 0 : _e.items) === null || _f === void 0 ? void 0 : _f.items) === null || _g === void 0 ? void 0 : _g.properties;
                                tmpProperties_1 = tslib_1.__assign(tslib_1.__assign({}, menberProps), rowsSchema === null || rowsSchema === void 0 ? void 0 : rowsSchema.properties);
                                if (isColumnChild) {
                                    Object.keys(tmpProperties_1).map(function (key) {
                                        itemsSchema_1[key] = tslib_1.__assign({}, tmpProperties_1[key]);
                                    });
                                    childScope = this.manager.dataSchema.getScope("".concat(child.id, "-").concat(child.type, "-currentRow"));
                                    if (childScope) {
                                        childScope === null || childScope === void 0 ? void 0 : childScope.setSchemas([
                                            {
                                                $id: "".concat(child.id, "-").concat(child.type, "-currentRow"),
                                                type: 'object',
                                                properties: itemsSchema_1
                                            }
                                        ]);
                                        childScope.tag = "\u5F53\u524D\u884C\u8BB0\u5F55 : ".concat(node.type);
                                    }
                                }
                            }
                            childSchame = {
                                $id: childSchame.$id,
                                type: childSchame.type,
                                properties: {
                                    items: childSchame.properties.rows,
                                    selectedItems: tslib_1.__assign(tslib_1.__assign({}, childSchame.properties.selectedItems), { items: tslib_1.__assign(tslib_1.__assign({}, childSchame.properties.selectedItems.items), { properties: itemsSchema_1 }) }),
                                    unSelectedItems: tslib_1.__assign(tslib_1.__assign({}, childSchame.properties.unSelectedItems), { items: tslib_1.__assign(tslib_1.__assign({}, childSchame.properties.unSelectedItems.items), { properties: itemsSchema_1 }) }),
                                    count: {
                                        type: 'number',
                                        title: '总行数'
                                    },
                                    page: {
                                        type: 'number',
                                        title: '当前页码'
                                    }
                                }
                            };
                        }
                        return [2 /*return*/, childSchame];
                }
            });
        });
    };
    CRUDPlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
        if (e === 'fetchInited') {
            var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
            var jsonschema = tslib_1.__assign({ $id: 'crudFetchInitedData', type: 'object' }, (0, amis_editor_core_1.jsonToJsonSchema)(data.responseData, function (type, key) {
                if (type === 'array' && key === 'items') {
                    return '数据列表';
                }
                if (type === 'number' && key === 'count') {
                    return '总行数';
                }
                return key;
            }));
            scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
            scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
        }
    };
    /** crud 不同 mode 之间转换时候，主体的转换 */
    CRUDPlugin.prototype.transformByMode = function (_a) {
        var _b, _c;
        var from = _a.from, to = _a.to, schema = _a.schema;
        var fields = [];
        var actions = [];
        if (!from || from === 'table') {
            (schema.columns || []).forEach(function (item) {
                if (!(0, isPlainObject_1.default)(item)) {
                    return;
                }
                else if (item.type === 'operation') {
                    actions.push.apply(actions, tslib_1.__spreadArray([], tslib_1.__read(((item === null || item === void 0 ? void 0 : item.buttons) || [])), false));
                }
                else {
                    fields.push(item);
                }
            });
        }
        else {
            var name_1 = from === 'cards' ? 'card' : 'listItem';
            fields.push.apply(fields, tslib_1.__spreadArray([], tslib_1.__read((((_b = schema === null || schema === void 0 ? void 0 : schema[name_1]) === null || _b === void 0 ? void 0 : _b.body) || [])), false));
            actions.push.apply(actions, tslib_1.__spreadArray([], tslib_1.__read((((_c = schema === null || schema === void 0 ? void 0 : schema[name_1]) === null || _c === void 0 ? void 0 : _c.actions) || [])), false));
        }
        // 保底
        fields.length ||
            fields.concat([
                {
                    name: 'a',
                    label: 'A'
                },
                {
                    name: 'b',
                    label: 'B'
                }
            ]);
        if (to === 'table') {
            return fields.concat({
                type: 'operation',
                label: '操作',
                buttons: actions
            });
        }
        else if (to === 'cards') {
            return {
                type: 'card',
                header: {
                    title: '标题',
                    subTitle: '副标题'
                },
                body: fields,
                actions: actions
            };
        }
        return {
            body: fields,
            actions: actions
        };
    };
    CRUDPlugin.id = 'CRUDPlugin';
    return CRUDPlugin;
}(amis_editor_core_2.BasePlugin));
exports.CRUDPlugin = CRUDPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CRUDPlugin);
