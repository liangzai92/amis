"use strict";
/**
 * @file BaseCRUD
 * @desc CRUD2 配置面板的基类
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCRUDPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
var flattenDeep_1 = tslib_1.__importDefault(require("lodash/flattenDeep"));
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
var uniqBy_1 = tslib_1.__importDefault(require("lodash/uniqBy"));
var uniq_1 = tslib_1.__importDefault(require("lodash/uniq"));
var sortBy_1 = tslib_1.__importDefault(require("lodash/sortBy"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var builder_1 = require("../../builder");
var helper_1 = require("../../renderer/event-control/helper");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
var BaseCRUDPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(BaseCRUDPlugin, _super);
    function BaseCRUDPlugin(manager, events, actions) {
        var _this = _super.call(this, manager) || this;
        _this.rendererName = 'crud2';
        _this.name = '增删改查';
        _this.panelTitle = '增删改查';
        _this.subPanelTitle = '增删改查';
        _this.icon = 'fa fa-table';
        _this.panelIcon = 'fa fa-table';
        _this.subPanelIcon = 'fa fa-table';
        _this.pluginIcon = 'table-plugin';
        _this.panelJustify = true;
        _this.multifactor = true;
        _this.order = -1000;
        _this.$schema = '/schemas/CRUD2Schema.json';
        _this.docLink = '/amis/zh-CN/components/crud2';
        _this.tags = ['数据容器'];
        _this._dynamicControls = {
            /** 列配置 */
            columns: function (context) { return _this.renderColumnsControl(context); },
            /** 工具栏配置 */
            toolbar: function (context) { return _this.renderToolbarCollapse(context); },
            /** 搜索栏 */
            filters: function (context) { return _this.renderFiltersCollapse(context); },
            /** 主键 */
            primaryField: function (context) { return (0, amis_editor_core_1.getSchemaTpl)('primaryField'); }
        };
        /** CRUD公共配置面板 */
        _this.baseCRUDPanelBody = function (context) {
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                _this.renderPropsTab(context),
                _this.renderStylesTab(context),
                _this.renderEventTab(context)
            ]);
        };
        /** 重新构建 API */
        _this.panelFormPipeOut = function (schema) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var entity, builder, updatedSchema, e_1;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        entity = (_a = schema === null || schema === void 0 ? void 0 : schema.api) === null || _a === void 0 ? void 0 : _a.entity;
                        if (!entity || (schema === null || schema === void 0 ? void 0 : schema.dsType) !== builder_1.ModelDSBuilderKey) {
                            return [2 /*return*/, schema];
                        }
                        builder = this.dsManager.getBuilderBySchema(schema);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, builder.buildApiSchema({
                                schema: schema,
                                renderer: 'crud',
                                sourceKey: 'api'
                            })];
                    case 2:
                        updatedSchema = _b.sent();
                        return [2 /*return*/, updatedSchema];
                    case 3:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, schema];
                }
            });
        }); };
        _this.emptyContainer = function (align, body) {
            if (body === void 0) { body = []; }
            return ({
                type: 'container',
                body: body,
                wrapperBody: false,
                style: tslib_1.__assign({ flexGrow: 1, flex: '1 1 auto', position: 'static', display: 'flex', flexBasis: 'auto', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'stretch' }, (align
                    ? {
                        justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
                    }
                    : {}))
            });
        };
        _this.emptyFlex = function (items) {
            if (items === void 0) { items = []; }
            return ({
                type: 'flex',
                items: items,
                style: {
                    position: 'static'
                },
                direction: 'row',
                justify: 'flex-start',
                alignItems: 'stretch'
            });
        };
        /** 生成预览 Schema */
        _this.generatePreviewSchema = function (mode) {
            var columnSchema = [
                {
                    label: 'Engine',
                    name: 'engine'
                },
                {
                    label: 'Browser',
                    name: 'browser'
                },
                {
                    name: 'version',
                    label: 'Version'
                }
            ];
            var actionSchema = {
                type: 'button',
                level: 'link',
                icon: 'fa fa-eye',
                actionType: 'dialog',
                dialog: {
                    title: '查看详情',
                    body: {
                        type: 'form',
                        body: [
                            {
                                label: 'Engine',
                                name: 'engine',
                                type: 'static'
                            },
                            {
                                name: 'browser',
                                label: 'Browser',
                                type: 'static'
                            },
                            {
                                name: 'version',
                                label: 'Version',
                                type: 'static'
                            }
                        ]
                    }
                }
            };
            var itemSchema = mode === 'cards'
                ? { card: { body: columnSchema, actions: actionSchema } }
                : mode === 'list'
                    ? {
                        listItem: {
                            body: {
                                type: 'hbox',
                                columns: columnSchema
                            }
                        },
                        actions: actionSchema
                    }
                    : {
                        columns: columnSchema.concat([
                            {
                                name: 'operation',
                                title: '操作',
                                buttons: [actionSchema]
                            }
                        ])
                    };
            return tslib_1.__assign({ type: 'crud2', mode: mode, source: '$items', data: {
                    items: [
                        {
                            engine: 'Trident',
                            browser: 'Internet Explorer 4.0',
                            platform: 'Win 95+',
                            version: '4',
                            grade: 'X'
                        }
                    ]
                } }, itemSchema);
        };
        _this.dsManager = new builder_1.DSBuilderManager(manager);
        _this.events = (0, uniqBy_1.default)(tslib_1.__spreadArray([], tslib_1.__read((events || [])), false), 'eventName');
        _this.actions = (0, uniqBy_1.default)(tslib_1.__spreadArray([
            {
                actionType: 'search',
                actionLabel: '数据查询',
                description: '使用指定条件完成列表数据查询',
                descDetail: function (info) {
                    return (react_1.default.createElement("div", null,
                        react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u89E6\u53D1\u6570\u636E\u67E5\u8BE2"));
                },
                schema: (0, helper_1.getArgsWrapper)({
                    name: 'query',
                    label: '查询条件',
                    type: 'ae-formulaControl',
                    variables: '${variables}',
                    size: 'md',
                    mode: 'horizontal'
                })
            },
            {
                actionType: 'loadMore',
                actionLabel: '加载更多',
                description: '加载更多条数据到列表容器',
                descDetail: function (info) {
                    return (react_1.default.createElement("div", null,
                        react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u52A0\u8F7D\u66F4\u591A\u6570\u636E"));
                }
            },
            {
                actionType: 'startAutoRefresh',
                actionLabel: '启动自动刷新',
                description: '启动自动刷新'
            },
            {
                actionType: 'stopAutoRefresh',
                actionLabel: '停止自动刷新',
                description: '停止自动刷新'
            }
        ], tslib_1.__read((actions || [])), false), 'actionType');
        return _this;
    }
    Object.defineProperty(BaseCRUDPlugin.prototype, "scaffoldForm", {
        get: function () {
            var _this = this;
            return {
                title: "".concat(this.name, "\u521B\u5EFA\u5411\u5BFC"),
                mode: {
                    mode: 'horizontal',
                    horizontal: {
                        leftFixed: 'sm'
                    }
                },
                className: 'ae-Scaffold-Modal ae-Scaffold-Modal-content',
                stepsBody: true,
                canSkip: true,
                canRebuild: true,
                body: [
                    {
                        title: '数据配置',
                        body: tslib_1.__spreadArray(tslib_1.__spreadArray([
                            /** 数据源选择 */
                            this.dsManager.getDSSelectorSchema({
                                onChange: function (value, oldValue, model, form) {
                                    if (value !== oldValue) {
                                        var data = form.data;
                                        Object.keys(data).forEach(function (key) {
                                            var _a, _b;
                                            if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) ||
                                                ((_b = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _b === void 0 ? void 0 : _b.endsWith('api'))) {
                                                form.deleteValueByName(key);
                                            }
                                        });
                                        form.deleteValueByName('__fields');
                                        form.deleteValueByName('__relations');
                                    }
                                    return value;
                                }
                            })
                        ], tslib_1.__read(this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                            return {
                                type: 'container',
                                visibleOn: "!data.dsType || data.dsType === '".concat(builderKey, "'"),
                                body: (0, flattenDeep_1.default)([
                                    builder.makeSourceSettingForm({
                                        feat: 'List',
                                        renderer: 'crud',
                                        inScaffold: true,
                                        sourceSettings: {
                                            userOrders: true
                                        }
                                    }),
                                    builder.makeFieldsSettingForm({
                                        feat: 'List',
                                        renderer: 'crud',
                                        inScaffold: true
                                    })
                                ])
                            };
                        })), false), [
                            (0, amis_editor_core_1.getSchemaTpl)('primaryField', {
                                visibleOn: "!data.dsType || data.dsType !== '".concat(builder_1.ModelDSBuilderKey, "'")
                            })
                        ], false)
                    },
                    {
                        title: '功能配置',
                        body: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                            return {
                                type: 'container',
                                visibleOn: "dsType == null || dsType === '".concat(builderKey, "'"),
                                body: [
                                    {
                                        type: 'checkboxes',
                                        label: '工具栏',
                                        name: constants_1.ToolsConfig.groupName,
                                        joinValues: false,
                                        extractValue: true,
                                        multiple: true,
                                        options: constants_1.ToolsConfig.options.filter(function (item) {
                                            return builder.filterByFeat(item.value);
                                        })
                                    },
                                    {
                                        type: 'checkboxes',
                                        label: '条件查询',
                                        name: constants_1.FiltersConfig.groupName,
                                        multiple: true,
                                        joinValues: false,
                                        extractValue: true,
                                        options: constants_1.FiltersConfig.options.filter(function (item) {
                                            return builder.filterByFeat(item.value);
                                        })
                                    },
                                    {
                                        type: 'checkboxes',
                                        label: '数据操作',
                                        name: constants_1.OperatorsConfig.groupName,
                                        multiple: true,
                                        joinValues: false,
                                        extractValue: true,
                                        options: constants_1.OperatorsConfig.options.filter(function (item) {
                                            return builder.filterByFeat(item.value);
                                        })
                                    },
                                    // 占位，最后一个form item没有间距
                                    {
                                        type: 'container'
                                    }
                                ]
                            };
                        })), false), [
                            /** 各场景字段设置 */
                            {
                                type: 'tabs',
                                tabsMode: 'vertical',
                                className: 'ae-Scaffold-Modal-tabs',
                                tabs: this.getScaffoldFeatureTab()
                            }
                        ], false)
                    }
                ],
                /** 用于重新构建的数据回填 */
                pipeIn: function (schema) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var dsType, builder, config;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                dsType = (_a = schema === null || schema === void 0 ? void 0 : schema.dsType) !== null && _a !== void 0 ? _a : this.dsManager.getDefaultBuilderKey();
                                builder = this.dsManager.getBuilderByKey(dsType);
                                if (!builder) {
                                    return [2 /*return*/, { dsType: dsType }];
                                }
                                return [4 /*yield*/, builder.guessCRUDScaffoldConfig({ schema: schema })];
                            case 1:
                                config = _b.sent();
                                return [2 /*return*/, tslib_1.__assign({}, config)];
                        }
                    });
                }); },
                pipeOut: function (config) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var scaffold, builder, schema;
                    var _a, _b, _c;
                    return tslib_1.__generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                scaffold = (0, cloneDeep_1.default)(this.scaffold);
                                builder = this.dsManager.getBuilderByScaffoldSetting(config);
                                if (!builder) {
                                    return [2 /*return*/, scaffold];
                                }
                                return [4 /*yield*/, builder.buildCRUDSchema({
                                        feats: (0, uniq_1.default)(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([
                                            builder_1.DSFeatureEnum.List
                                        ], tslib_1.__read(((_a = config.tools) !== null && _a !== void 0 ? _a : [])), false), tslib_1.__read(((_b = config.filters) !== null && _b !== void 0 ? _b : [])), false), tslib_1.__read(((_c = config.operators) !== null && _c !== void 0 ? _c : [])), false).filter(Boolean)),
                                        renderer: 'crud',
                                        inScaffold: true,
                                        entitySource: config === null || config === void 0 ? void 0 : config.entitySource,
                                        fallbackSchema: scaffold,
                                        scaffoldConfig: config
                                    })];
                            case 1:
                                schema = _d.sent();
                                return [2 /*return*/, schema];
                        }
                    });
                }); },
                validate: function (data, form) {
                    var feat = 'List';
                    var builder = _this.dsManager.getBuilderByScaffoldSetting(data);
                    var featValue = builder === null || builder === void 0 ? void 0 : builder.getFeatValueByKey(feat);
                    var fieldsKey = "".concat(featValue, "Fields");
                    var errors = {};
                    if ((data === null || data === void 0 ? void 0 : data.dsType) === builder_1.ModelDSBuilderKey ||
                        (builder === null || builder === void 0 ? void 0 : builder.key) === builder_1.ModelDSBuilderKey) {
                        return errors;
                    }
                    var fieldErrors = false;
                    // FieldSetting.validator(form.data[fieldsKey]);
                    if (fieldErrors) {
                        errors[fieldsKey] = fieldErrors;
                    }
                    return errors;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    /** 各场景字段设置 Schema */
    BaseCRUDPlugin.prototype.getScaffoldFeatureTab = function () {
        var _this = this;
        var tabs = [];
        [
            {
                groupName: '',
                options: [
                    {
                        label: '列表展示',
                        value: 'List',
                        icon: 'fa fa-list'
                    }
                ]
            },
            constants_1.ToolsConfig,
            constants_1.FiltersConfig,
            constants_1.OperatorsConfig
        ].forEach(function (group) {
            group.options.forEach(function (item, index) {
                _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                    if (!builder.features.includes(item.value)) {
                        return null;
                    }
                    var tabContent = builderKey === builder_1.ModelDSBuilderKey
                        ? tslib_1.__spreadArray([], tslib_1.__read(builder.makeFieldsSettingForm({
                            feat: item.value,
                            renderer: 'crud',
                            inScaffold: true
                        })), false) : tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((item.value === 'Edit'
                        ? /** CRUD的编辑单条需要初始化接口 */ builder.makeSourceSettingForm({
                            feat: item.value,
                            renderer: 'crud',
                            inScaffold: true,
                            sourceKey: 'initApi'
                        })
                        : !['List', 'SimpleQuery'].includes(item.value)
                            ? builder.makeSourceSettingForm({
                                feat: item.value,
                                renderer: 'crud',
                                inScaffold: true
                            })
                            : [])), false), tslib_1.__read(builder.makeFieldsSettingForm({
                        feat: item.value,
                        renderer: 'crud',
                        inScaffold: true,
                        fieldSettings: {
                            renderLabel: false
                        }
                    })), false);
                    if (!tabContent || tabContent.length === 0) {
                        return null;
                    }
                    var groupName = group.groupName;
                    var extraVisibleOn = groupName
                        ? "data[\"".concat(groupName, "\"] && ~data['").concat(groupName, "'].indexOf('").concat(item.value, "')")
                        : true;
                    tabs.push({
                        title: item.label,
                        icon: item.icon,
                        visibleOn: "(!data.dsType || data.dsType === '".concat(builderKey, "') && ").concat(extraVisibleOn),
                        body: tabContent
                            .filter(Boolean)
                            .map(function (formItem) { return (tslib_1.__assign(tslib_1.__assign({}, formItem), { mode: 'normal' })); })
                    });
                    return;
                });
            });
        });
        return tabs;
    };
    Object.defineProperty(BaseCRUDPlugin.prototype, "dynamicControls", {
        /** 需要动态控制的控件 */
        get: function () {
            return this._dynamicControls;
        },
        set: function (controls) {
            if (!controls || !(0, amis_1.isObject)(controls)) {
                throw new Error('[amis-editor][CRUD2Plugin] dynamicControls的值必须是一个对象');
            }
            this._dynamicControls = tslib_1.__assign(tslib_1.__assign({}, this._dynamicControls), controls);
        },
        enumerable: false,
        configurable: true
    });
    /** 拆解一下 CURD 的基础面板配置，方便不同 mode 下模块化组合 */
    /** 属性面板 */
    BaseCRUDPlugin.prototype.renderPropsTab = function (context) {
        /** 动态加载的配置集合 */
        var dc = this.dynamicControls;
        return {
            title: '属性',
            className: 'p-none',
            body: [
                (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                    /** 基本配置类别 */
                    this.renderBasicPropsCollapse(context),
                    /** 列设置类别 */
                    (0, isFunction_1.default)(dc.columns) ? dc.columns(context) : dc.columns,
                    /** 搜索类别 */
                    (0, isFunction_1.default)(dc.filters) ? dc.filters(context) : dc.filters,
                    /** 工具栏类别 */
                    (0, isFunction_1.default)(dc.toolbar) ? dc.toolbar(context) : dc.toolbar,
                    /** 分页类别 */
                    this.renderPaginationCollapse(context),
                    /** 其他类别 */
                    this.renderOthersCollapse(context),
                    /** 状态类别 */
                    {
                        title: '状态',
                        body: [(0, amis_editor_core_1.getSchemaTpl)('hidden'), (0, amis_editor_core_1.getSchemaTpl)('visible')]
                    }
                ].filter(Boolean))
            ]
        };
    };
    /** 基础配置 */
    BaseCRUDPlugin.prototype.renderBasicPropsCollapse = function (context) {
        var _a;
        /** 动态加载的配置集合 */
        var dc = this.dynamicControls;
        return {
            title: '基本',
            order: 1,
            body: tslib_1.__spreadArray(tslib_1.__spreadArray([
                /** 数据源类型 */
                this.dsManager.getDSSelectorSchema({
                    type: 'select',
                    label: '数据源',
                    onChange: function (value, oldValue, model, form) {
                        if (value !== oldValue) {
                            var data = form.data;
                            Object.keys(data).forEach(function (key) {
                                var _a, _b;
                                if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) ||
                                    ((_b = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _b === void 0 ? void 0 : _b.endsWith('api'))) {
                                    form.deleteValueByName(key);
                                }
                            });
                            form.deleteValueByName('__fields');
                            form.deleteValueByName('__relations');
                        }
                        return value;
                    }
                })
            ], tslib_1.__read(this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                return {
                    type: 'container',
                    visibleOn: "data.dsType == null || data.dsType === '".concat(builderKey, "'"),
                    body: builder.makeSourceSettingForm({
                        feat: 'List',
                        renderer: 'crud',
                        inScaffold: false,
                        sourceSettings: {
                            userOrders: true
                        }
                    }),
                    /** 因为会使用 container 包裹，所以加一个 margin-bottom */
                    className: 'mb-3'
                };
            })), false), [
                /** 主键配置，TODO：支持联合主键 */
                (_a = dc === null || dc === void 0 ? void 0 : dc.primaryField) === null || _a === void 0 ? void 0 : _a.call(dc, context),
                {
                    name: 'placeholder',
                    pipeIn: (0, amis_editor_core_1.defaultValue)('暂无数据'),
                    type: 'input-text',
                    label: '占位内容'
                },
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'syncLocation',
                    label: (0, amis_editor_core_1.tipedLabel)('同步地址栏', '开启后会把查询条件数据和分页信息同步到地址栏中，页面中出现多个时，建议只保留一个同步地址栏，否则会相互影响。'),
                    pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                })
            ], false)
        };
    };
    BaseCRUDPlugin.prototype.renderColumnsControl = function (context) {
        var builder = this.dsManager.getBuilderBySchema(context.node.schema);
        return {
            title: '列设置',
            order: 5,
            body: [
                {
                    type: 'ae-crud-column-control',
                    name: 'columns',
                    nodeId: context.id,
                    builder: builder
                }
            ]
        };
    };
    BaseCRUDPlugin.prototype.renderToolbarCollapse = function (context) {
        var builder = this.dsManager.getBuilderBySchema(context.node.schema);
        return {
            order: 20,
            title: '工具栏',
            body: [
                {
                    type: 'ae-crud-toolbar-control',
                    name: 'headerToolbar',
                    nodeId: context.id,
                    builder: builder
                }
            ]
        };
    };
    BaseCRUDPlugin.prototype.renderFiltersCollapse = function (context) {
        var builder = this.dsManager.getBuilderBySchema(context.node.schema);
        var collection = [];
        var order = [
            builder_1.DSFeatureEnum.SimpleQuery,
            builder_1.DSFeatureEnum.AdvancedQuery,
            builder_1.DSFeatureEnum.FuzzyQuery
        ];
        var sortedFeats = (0, sortBy_1.default)(builder.features, [function (feat) { return order.indexOf(feat); }]);
        sortedFeats.forEach(function (feat) {
            if (/Query$/.test(feat)) {
                collection.push({
                    type: 'ae-crud-filters-control',
                    name: feat === builder_1.DSFeatureEnum.SimpleQuery ||
                        feat === builder_1.DSFeatureEnum.AdvancedQuery
                        ? 'filter'
                        : feat === builder_1.DSFeatureEnum.FuzzyQuery
                            ? 'headerToolbar'
                            : undefined,
                    label: feat === builder_1.DSFeatureEnum.SimpleQuery
                        ? '简单查询'
                        : feat === builder_1.DSFeatureEnum.AdvancedQuery
                            ? '高级查询'
                            : '模糊查询',
                    nodeId: context.id,
                    feat: feat,
                    builder: builder
                });
            }
        });
        return collection.length > 0
            ? {
                order: 10,
                title: '搜索设置',
                body: collection
            }
            : undefined;
    };
    /** 分页类别 */
    BaseCRUDPlugin.prototype.renderPaginationCollapse = function (context) {
        var _this = this;
        var isPagination = 'data.loadType === "pagination"';
        var isInfinity = 'data.loadType === "more"';
        return {
            order: 30,
            title: '分页设置',
            body: [
                {
                    label: '分页模式',
                    type: 'select',
                    name: 'loadType',
                    options: [
                        {
                            label: '无',
                            value: ''
                        },
                        {
                            label: '分页',
                            value: 'pagination'
                        },
                        {
                            label: '加载更多',
                            value: 'more'
                        }
                    ],
                    pipeIn: function (data) { return data || ''; },
                    pipeOut: function (data) {
                        return data;
                    },
                    onChange: function (value, oldValue, model, form) {
                        var schema = form.data;
                        if (oldValue) {
                            (0, utils_1.deepRemove)(schema, function (item) {
                                return oldValue === 'more'
                                    ? item.behavior === 'loadMore'
                                    : item.type === 'pagination';
                            });
                        }
                        if (value) {
                            // 新插入的默认放在 footerToolbar 中分栏 的第二栏的最后，没有位置的话向上缺省
                            // oldValue && deepRemove(schema);
                            var newCompSchema = value === 'pagination'
                                ? {
                                    type: 'pagination',
                                    behavior: 'Pagination',
                                    layout: ['total', 'perPage', 'pager'],
                                    perPageAvailable: [10, 20, 50, 100]
                                }
                                : {
                                    type: 'button',
                                    behavior: 'loadMore',
                                    label: '加载更多',
                                    onEvent: {
                                        click: {
                                            actions: [
                                                {
                                                    componentId: schema.id,
                                                    groupType: 'component',
                                                    actionType: 'loadMore'
                                                }
                                            ],
                                            weight: 0
                                        }
                                    }
                                };
                            _this.addFeatToToolbar(schema, newCompSchema, 'footer', 'right');
                        }
                    }
                },
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'loadDataOnce',
                    label: '前端分页',
                    visibleOn: isPagination
                }),
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'loadDataOnceFetchOnFilter',
                    label: (0, amis_editor_core_1.tipedLabel)('过滤时刷新', '在开启前端分页时，表头过滤后是否重新请求初始化 API'),
                    visibleOn: isPagination + ' && data.loadDataOnce'
                }),
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'keepItemSelectionOnPageChange',
                    label: (0, amis_editor_core_1.tipedLabel)('保留选择项', '默认切换页面、搜索后，用户选择项会被清空，开启此功能后会保留用户选择，可以实现跨页面批量操作。'),
                    pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                    visibleOn: isPagination
                }),
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'autoJumpToTopOnPagerChange',
                    label: (0, amis_editor_core_1.tipedLabel)('翻页后回到顶部', '当切分页的时候，是否自动跳顶部'),
                    pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                    visibleOn: isPagination
                }),
                {
                    name: 'perPage',
                    type: 'input-number',
                    label: (0, amis_editor_core_1.tipedLabel)('每页数量', '无限加载时，根据此项设置其每页加载数量，留空即不限制'),
                    clearValueOnEmpty: true,
                    clearable: true,
                    pipeIn: (0, amis_editor_core_1.defaultValue)(10),
                    visibleOn: isInfinity
                },
                {
                    type: 'button',
                    label: '点击编辑分页组件',
                    block: true,
                    className: 'mb-1',
                    level: 'enhance',
                    visibleOn: 'data.loadType === "pagination"',
                    onClick: function () {
                        var _a, _b;
                        var findPage = (0, utils_1.findSchema)((_b = (_a = context === null || context === void 0 ? void 0 : context.node) === null || _a === void 0 ? void 0 : _a.schema) !== null && _b !== void 0 ? _b : {}, function (item) {
                            return item.type === 'pagination' || item.behavior === 'Pagination';
                        }, 'headerToolbar', 'footerToolbar');
                        if (!findPage || !findPage.$$id) {
                            amis_1.toast.error('未找到分页组件');
                            return;
                        }
                        _this.manager.setActiveId(findPage.$$id);
                    }
                }
            ]
        };
    };
    /** 其他类别 */
    BaseCRUDPlugin.prototype.renderOthersCollapse = function (context) {
        return {
            order: 25,
            title: '其他',
            body: [
                {
                    type: 'ae-switch-more',
                    mode: 'normal',
                    formType: 'extend',
                    visibleOn: 'data.api',
                    label: (0, amis_editor_core_1.tipedLabel)('接口轮询', '开启初始化接口轮询，开启后会按照设定的时间间隔轮询调用接口'),
                    autoFocus: false,
                    form: {
                        body: [
                            {
                                type: 'input-number',
                                name: 'interval',
                                label: (0, amis_editor_core_1.tipedLabel)('轮询间隔', '定时刷新间隔，单位 ms'),
                                step: 10,
                                min: 1000
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('tplFormulaControl', {
                                name: 'stopAutoRefreshWhen',
                                label: (0, amis_editor_core_1.tipedLabel)('停止条件', '定时刷新停止表达式，条件满足后则停止定时刷新，否则会持续轮询调用初始化接口。'),
                                visibleOn: '!!data.interval'
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                name: 'stopAutoRefreshWhenModalIsOpen',
                                label: (0, amis_editor_core_1.tipedLabel)('模态窗口期间停止', '当页面中存在弹窗时停止接口轮询，避免中断操作')
                            })
                        ]
                    }
                },
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    name: 'silentPolling',
                    label: (0, amis_editor_core_1.tipedLabel)('静默拉取', '刷新时是否隐藏加载动画'),
                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                })
            ]
        };
    };
    /** 外观面板 */
    BaseCRUDPlugin.prototype.renderStylesTab = function (context) {
        return {
            title: '外观',
            className: 'p-none',
            body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                    isFormItem: false,
                    schema: [
                        (0, amis_editor_core_1.getSchemaTpl)('className', {
                            name: 'bodyClassName',
                            label: '表格区域'
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('className', {
                            name: 'headerToolbarClassName',
                            label: '顶部工具栏'
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('className', {
                            name: 'footerToolbarClassName',
                            label: '底部工具栏'
                        })
                    ]
                })
            ])
        };
    };
    /** 事件面板 */
    BaseCRUDPlugin.prototype.renderEventTab = function (context) {
        return {
            title: '事件',
            className: 'p-none',
            body: [
                (0, amis_editor_core_1.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(this.manager, context)))
            ]
        };
    };
    // headerToolbar 和 footerToolbar 布局换成 flex 包裹 container
    BaseCRUDPlugin.prototype.addFeatToToolbar = function (schema, content, position, align) {
        var region = "".concat(position, "Toolbar");
        if (!schema[region] ||
            (0, isEmpty_1.default)(schema[region]) ||
            !Array.isArray(schema[region])) {
            var isArr = Array.isArray(schema[region]);
            var newSchema = this.emptyFlex([
                this.emptyContainer('left', isArr || !schema[region] ? [] : [schema[region]]),
                this.emptyContainer('right')
            ]);
            (isArr && schema[region].push(newSchema)) ||
                (schema[region] = [newSchema]);
        }
        // 尝试放到左面第一个，否则只能放外头了
        try {
            // 优先判断没有右边列的情况，避免都走到catch里造成嵌套层数过多的问题
            if (align === 'right' && schema[region][0].items.length < 2) {
                schema[region][0].items.push(this.emptyContainer('right'));
            }
            schema[region][0].items[align === 'left' ? 0 : schema[region][0].items.length - 1].body.push(content);
        }
        catch (e) {
            var olds = tslib_1.__spreadArray([], tslib_1.__read(schema[region]), false);
            schema[region].length = 0;
            schema[region].push(this.emptyFlex([
                this.emptyContainer('left', olds),
                this.emptyContainer('right', content)
            ]));
        }
    };
    BaseCRUDPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var child, childDataSchema, items, schema;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        child = node.children.find(function (item) { return !!~['table2', 'cards', 'list'].indexOf(item.type); });
                        if (!((_b = (_a = child === null || child === void 0 ? void 0 : child.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, child.info.plugin.buildDataSchemas(child, region)];
                    case 1:
                        childDataSchema = _f.sent();
                        items = (_d = (_c = childDataSchema === null || childDataSchema === void 0 ? void 0 : childDataSchema.properties) === null || _c === void 0 ? void 0 : _c.rows) !== null && _d !== void 0 ? _d : (_e = childDataSchema === null || childDataSchema === void 0 ? void 0 : childDataSchema.properties) === null || _e === void 0 ? void 0 : _e.items;
                        schema = {
                            $id: 'crud2',
                            type: 'object',
                            properties: tslib_1.__assign(tslib_1.__assign({}, items === null || items === void 0 ? void 0 : items.properties), { items: tslib_1.__assign(tslib_1.__assign({}, items), { title: '全部数据' }), selectedItems: tslib_1.__assign(tslib_1.__assign({}, items), { title: '选中数据' }), unSelectedItems: tslib_1.__assign(tslib_1.__assign({}, items), { title: '未选中数据' }), page: {
                                    type: 'number',
                                    title: '当前页码'
                                }, total: {
                                    type: 'number',
                                    title: '总数据条数'
                                } })
                        };
                        return [2 /*return*/, schema];
                }
            });
        });
    };
    BaseCRUDPlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var builder;
            return tslib_1.__generator(this, function (_c) {
                builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
                if (builder && scopeNode.schema.api) {
                    return [2 /*return*/, builder.getAvailableContextFields({
                            schema: scopeNode.schema,
                            sourceKey: 'api',
                            feat: (_b = (_a = scopeNode.schema) === null || _a === void 0 ? void 0 : _a.feat) !== null && _b !== void 0 ? _b : 'List'
                        }, node)];
                }
                return [2 /*return*/];
            });
        });
    };
    BaseCRUDPlugin.prototype.generateScaffold = function (mode) {
        var schema;
        if (mode === 'table2') {
            schema = {
                type: 'crud2',
                mode: 'table2',
                columns: [
                    {
                        name: 'id',
                        title: 'ID',
                        type: 'container',
                        body: [
                            {
                                type: 'text'
                            }
                        ]
                    },
                    {
                        name: 'engine',
                        title: '示例',
                        type: 'container',
                        body: [
                            {
                                type: 'text'
                            }
                        ]
                    }
                ]
            };
        }
        else if (mode === 'cards') {
            schema = {
                type: 'crud2',
                mode: 'cards',
                card: {
                    type: 'card2',
                    body: [
                        {
                            type: 'container',
                            body: [
                                {
                                    type: 'tpl',
                                    tpl: '标题',
                                    inline: false,
                                    style: {
                                        marginTop: '0',
                                        marginBottom: '0',
                                        paddingTop: '',
                                        paddingBottom: ''
                                    },
                                    wrapperComponent: 'h2'
                                },
                                {
                                    type: 'form',
                                    body: [
                                        {
                                            type: 'static-tpl',
                                            label: '字段',
                                            tpl: '内容'
                                        }
                                    ]
                                },
                                {
                                    type: 'divider'
                                },
                                {
                                    type: 'button-group'
                                }
                                // {
                                //   type: 'tpl',
                                //   tpl: '副标题内容',
                                //   inline: false,
                                //   wrapperComponent: '',
                                //   style: {
                                //     color: '#9b9b9b',
                                //     marginTop: '0',
                                //     marginBottom: '0'
                                //   }
                                // }
                            ]
                            // style: {
                            //   borderStyle: 'solid',
                            //   borderColor: '#ebebeb',
                            //   borderWidth: '1px',
                            //   'borderRadius': '5px',
                            //   'paddingTop': '10px',
                            //   'paddingRight': '10px',
                            //   'paddingBottom': '0',
                            //   'paddingLeft': '10px'
                            // }
                        }
                    ]
                }
            };
        }
        else if (mode === 'list') {
            schema = {
                type: 'crud2',
                mode: 'list',
                listItem: {
                    body: [
                        {
                            type: 'container',
                            body: [
                                {
                                    type: 'tpl',
                                    tpl: '标题',
                                    inline: false,
                                    style: {
                                        marginTop: '0',
                                        marginBottom: '0',
                                        paddingTop: '',
                                        paddingBottom: ''
                                    },
                                    wrapperComponent: 'h2'
                                },
                                {
                                    type: 'tpl',
                                    tpl: '副标题内容',
                                    inline: false,
                                    wrapperComponent: '',
                                    style: {
                                        color: '#9b9b9b',
                                        marginTop: '0',
                                        marginBottom: '0'
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
        }
        return schema;
    };
    var _a, _b, _c;
    BaseCRUDPlugin.id = 'CRUD2Plugin';
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof amis_editor_core_1.BuildPanelEventContext !== "undefined" && amis_editor_core_1.BuildPanelEventContext) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], BaseCRUDPlugin.prototype, "renderColumnsControl", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof amis_editor_core_1.BuildPanelEventContext !== "undefined" && amis_editor_core_1.BuildPanelEventContext) === "function" ? _b : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], BaseCRUDPlugin.prototype, "renderToolbarCollapse", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof amis_editor_core_1.BuildPanelEventContext !== "undefined" && amis_editor_core_1.BuildPanelEventContext) === "function" ? _c : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], BaseCRUDPlugin.prototype, "renderFiltersCollapse", null);
    return BaseCRUDPlugin;
}(amis_editor_core_1.BasePlugin));
exports.BaseCRUDPlugin = BaseCRUDPlugin;
