"use strict";
/**
 * @file ApiDsBuilder
 * @desc 外部 API 接口数据源构造器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDSBuilder = void 0;
var tslib_1 = require("tslib");
var sortBy_1 = tslib_1.__importDefault(require("lodash/sortBy"));
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var get_1 = tslib_1.__importDefault(require("lodash/get"));
var uniq_1 = tslib_1.__importDefault(require("lodash/uniq"));
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
var intersection_1 = tslib_1.__importDefault(require("lodash/intersection"));
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
var amis_core_1 = require("amis-core");
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var DSBuilder_1 = require("./DSBuilder");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var ApiDSBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(ApiDSBuilder, _super);
    function ApiDSBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDefault = true;
        _this.name = 'API接口';
        _this.order = 1;
        _this.features = [
            'List',
            'Insert',
            'View',
            'Edit',
            'Delete',
            'BulkEdit',
            'BulkDelete',
            'SimpleQuery'
        ];
        return _this;
    }
    Object.defineProperty(ApiDSBuilder.prototype, "key", {
        /**
         * 获取键值。
         */
        get: function () {
            return this.constructor.key;
        },
        enumerable: false,
        configurable: true
    });
    ApiDSBuilder.prototype.match = function (schema) {
        var apiSchema = schema === null || schema === void 0 ? void 0 : schema.api;
        if ((schema === null || schema === void 0 ? void 0 : schema.dsType) === this.key || (apiSchema === null || apiSchema === void 0 ? void 0 : apiSchema.sourceType) === this.key) {
            return true;
        }
        /**
         * 携带 jsonql 一定不是 API 接口
         * 携带 strategy 为实体接口通过混合构建策略生成
         *  */
        if ((0, amis_core_1.isObject)(apiSchema) &&
            (apiSchema.jsonql != null || apiSchema.strategy != null)) {
            return false;
        }
        if (typeof apiSchema === 'string' &&
            /^(get|post|put|delete|option):/.test(apiSchema)) {
            return true;
        }
        return false;
    };
    ApiDSBuilder.prototype.getContextFields = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    ApiDSBuilder.prototype.getAvailableContextFields = function (options, target) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApiDSBuilder.prototype.getCRUDListFields = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, schema, controlSettings, fieldMapper, columns, result;
            return tslib_1.__generator(this, function (_c) {
                _b = options || {}, schema = _b.schema, controlSettings = _b.controlSettings;
                fieldMapper = (controlSettings || {}).fieldMapper;
                columns = ((_a = schema === null || schema === void 0 ? void 0 : schema.columns) !== null && _a !== void 0 ? _a : []);
                result = [];
                columns.forEach(function (item) {
                    var option = (0, isFunction_1.default)(fieldMapper) ? fieldMapper(item) : false;
                    if (option !== false) {
                        result.push(option);
                    }
                });
                return [2 /*return*/, result];
            });
        });
    };
    ApiDSBuilder.prototype.getCRUDSimpleQueryFields = function (options) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _c, schema, controlSettings, fieldMapper, filterSchema, result;
            return tslib_1.__generator(this, function (_d) {
                _c = options || {}, schema = _c.schema, controlSettings = _c.controlSettings;
                fieldMapper = (controlSettings || {}).fieldMapper;
                filterSchema = (schema === null || schema === void 0 ? void 0 : schema.filter)
                    ? Array.isArray(schema.filter)
                        ? schema.filter.find(function (item) {
                            return item.behavior &&
                                Array.isArray(item.behavior) &&
                                item.type === 'form';
                        })
                        : ((_a = schema.filter) === null || _a === void 0 ? void 0 : _a.type) === 'form'
                            ? schema.filter
                            : undefined
                    : undefined;
                result = [];
                ((_b = filterSchema === null || filterSchema === void 0 ? void 0 : filterSchema.body) !== null && _b !== void 0 ? _b : []).forEach(function (formItem) {
                    if (formItem.type === 'condition-builder' ||
                        formItem.behavior === constants_1.DSFeatureEnum.AdvancedQuery) {
                        return;
                    }
                    var option = (0, isFunction_1.default)(fieldMapper) ? fieldMapper(formItem) : false;
                    if (option !== false) {
                        result.push(option);
                    }
                });
                return [2 /*return*/, result];
            });
        });
    };
    ApiDSBuilder.prototype.makeSourceSettingForm = function (options) {
        var _a = options || {}, feat = _a.feat, renderer = _a.renderer, inScaffold = _a.inScaffold, sourceSettings = _a.sourceSettings, sourceKey = _a.sourceKey;
        if (!feat) {
            return [];
        }
        var _b = sourceSettings || {}, label = _b.label, name = _b.name, renderLabel = _b.renderLabel, labelClassName = _b.labelClassName, mode = _b.mode, horizontalConfig = _b.horizontalConfig, visibleOn = _b.visibleOn;
        var isCRUD = renderer === 'crud';
        /** 处理Label */
        var labelText = label !== null && label !== void 0 ? label : (isCRUD && feat !== 'List'
            ? this.getFeatLabelByKey(feat) + '接口'
            : '接口');
        var normalizedLabel = labelText;
        if (feat === 'Insert') {
            normalizedLabel = (0, amis_editor_core_1.tipedLabel)(labelText, "\u7528\u6765\u4FDD\u5B58\u6570\u636E, \u8868\u5355\u63D0\u4EA4\u540E\u5C06\u6570\u636E\u4F20\u5165\u6B64\u63A5\u53E3\u3002<br/>\n        \u63A5\u53E3\u54CD\u5E94\u4F53\u8981\u6C42(\u5982\u679Cdata\u4E2D\u6709\u6570\u636E\uFF0C\u8BE5\u6570\u636E\u5C06\u88AB\u5408\u5E76\u5230\u8868\u5355\u4E0A\u4E0B\u6587\u4E2D)\uFF1A<br/>\n        <pre>".concat(JSON.stringify({ status: 0, msg: '', data: {} }, null, 2), "</pre>"));
        }
        else if (feat === 'List') {
            normalizedLabel = (0, amis_editor_core_1.tipedLabel)(labelText, "\u63A5\u53E3\u54CD\u5E94\u4F53\u8981\u6C42\uFF1A<br/>\n        <pre>".concat(JSON.stringify({ status: 0, msg: '', items: {}, page: 0, total: 0 }, null, 2), "</pre>"));
        }
        var layoutMode = mode !== null && mode !== void 0 ? mode : 'horizontal';
        var baseApiSchemaConfig = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ renderLabel: renderLabel !== null && renderLabel !== void 0 ? renderLabel : true, label: normalizedLabel, name: name !== null && name !== void 0 ? name : (inScaffold ? this.getFeatValueByKey(feat) + 'Api' : 'api'), mode: layoutMode, labelClassName: labelClassName, inputClassName: 'm-b-none' }, (layoutMode === 'horizontal' ? horizontalConfig !== null && horizontalConfig !== void 0 ? horizontalConfig : {} : {})), (visibleOn && typeof visibleOn === 'string' ? { visibleOn: visibleOn } : {})), { onPickerConfirm: function (value) {
                var transformedValue = value;
                var transform = function (apiObj) { var _a; return "".concat(((_a = apiObj === null || apiObj === void 0 ? void 0 : apiObj.api) === null || _a === void 0 ? void 0 : _a.method) || 'post', ":api://").concat((apiObj === null || apiObj === void 0 ? void 0 : apiObj.key) || ''); };
                if (value) {
                    transformedValue = Array.isArray(value)
                        ? value.map(transform).join(',')
                        : transform(value);
                }
                return transformedValue;
            } });
        return tslib_1.__spreadArray([
            /** 提交接口 */
            (0, amis_editor_core_1.getSchemaTpl)('apiControl', baseApiSchemaConfig),
            /** 表单初始化接口 */
            feat === 'Edit' && (renderer === 'form' || sourceKey === 'initApi')
                ? (0, amis_editor_core_1.getSchemaTpl)('apiControl', tslib_1.__assign(tslib_1.__assign({}, baseApiSchemaConfig), { name: 'initApi', label: (0, amis_editor_core_1.tipedLabel)('初始化接口', "\u63A5\u53E3\u54CD\u5E94\u4F53\u8981\u6C42\uFF1A<br/>\n              <pre>".concat(JSON.stringify({ status: 0, msg: '', data: {} }, null, 2), "</pre>")) }))
                : null
        ], tslib_1.__read((feat === 'List' && renderer === 'crud' && !inScaffold
            ? [
                (0, amis_editor_core_1.getSchemaTpl)('apiControl', tslib_1.__assign(tslib_1.__assign({}, baseApiSchemaConfig), { name: 'quickSaveApi', label: (0, amis_editor_core_1.tipedLabel)('快速保存', '快速编辑后用来批量保存的 API') })),
                (0, amis_editor_core_1.getSchemaTpl)('apiControl', tslib_1.__assign(tslib_1.__assign({}, baseApiSchemaConfig), { name: 'quickSaveItemApi', label: (0, amis_editor_core_1.tipedLabel)('快速保存单条', '即时保存时使用的 API') }))
            ]
            : [])), false).filter(Boolean);
    };
    ApiDSBuilder.prototype.makeFieldsSettingForm = function (options) {
        var _a = options || {}, feat = _a.feat, inScaffold = _a.inScaffold, renderer = _a.renderer, fieldSettings = _a.fieldSettings;
        var renderLabel = (fieldSettings || {}).renderLabel;
        if (!feat ||
            !inScaffold ||
            ['Import', 'Export', 'FuzzyQuery', 'Delete', 'BulkDelete'].includes(feat)) {
            return [];
        }
        var result = [
            {
                type: 'ae-field-setting',
                name: this.getFieldsKey(options),
                label: renderLabel === false ? false : '字段',
                renderer: renderer,
                feat: feat,
                config: {
                    showInputType: renderer === 'form' ||
                        (renderer === 'crud' &&
                            [
                                'Edit',
                                'BulkEdit',
                                'Insert',
                                'View',
                                'SimpleQuery',
                                'List'
                            ].includes(feat)),
                    showDisplayType: renderer === 'crud' && ['List'].includes(feat)
                },
                onAutoGenerateFields: this.autoGenerateFields.bind(this)
            }
        ];
        return result;
    };
    /** 基于接口生成字段 */
    ApiDSBuilder.prototype.autoGenerateFields = function (_a) {
        var _b, _c, _d, _e, _f;
        var api = _a.api, props = _a.props, setState = _a.setState;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var manager, env, ctx, feat, schemaFilter, result, fields, sampleRow, items;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        manager = props.manager, env = props.env, ctx = props.data, feat = props.feat;
                        schemaFilter = (_b = manager === null || manager === void 0 ? void 0 : manager.store) === null || _b === void 0 ? void 0 : _b.schemaFilter;
                        if (schemaFilter) {
                            api = schemaFilter({ api: api }).api;
                        }
                        return [4 /*yield*/, (env === null || env === void 0 ? void 0 : env.fetcher(api, ctx))];
                    case 1:
                        result = _g.sent();
                        if (!result.ok) {
                            amis_1.toast.warning((_d = (_c = result.defaultMsg) !== null && _c !== void 0 ? _c : result.msg) !== null && _d !== void 0 ? _d : 'API返回格式不正确，请查看接口响应格式要求');
                            return [2 /*return*/];
                        }
                        fields = [];
                        if (feat === 'List') {
                            items = ((_e = result.data) === null || _e === void 0 ? void 0 : _e.rows) || ((_f = result.data) === null || _f === void 0 ? void 0 : _f.items) || result.data;
                            sampleRow = items === null || items === void 0 ? void 0 : items[0];
                        }
                        else {
                            sampleRow = result.data;
                        }
                        if (sampleRow) {
                            Object.entries(sampleRow).forEach(function (_a) {
                                var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
                                var inputType = 'input-text';
                                if (Array.isArray(value)) {
                                    inputType = 'select';
                                }
                                else if ((0, amis_core_1.isObject)(value)) {
                                    inputType = 'combo';
                                }
                                else if (typeof value === 'number') {
                                    inputType = 'input-number';
                                }
                                fields.push({
                                    label: key,
                                    name: key,
                                    displayType: 'tpl',
                                    inputType: inputType,
                                    checked: true
                                });
                            });
                        }
                        return [2 /*return*/, fields];
                }
            });
        });
    };
    ApiDSBuilder.prototype.getApiKey = function (options) {
        var feat = (options || {}).feat;
        return feat ? "".concat(this.getFeatValueByKey(feat), "Api") : 'api';
    };
    ApiDSBuilder.prototype.getFieldsKey = function (options) {
        var feat = (options || {}).feat;
        return feat ? "".concat(this.getFeatValueByKey(feat), "Fields") : '';
    };
    ApiDSBuilder.prototype.buildBaseButtonSchema = function (options, schemaPatch) {
        var _a, _b;
        var feat = (options || {}).feat;
        var _c = schemaPatch || {}, buttonSchema = _c.buttonSchema, formSchema = _c.formSchema, dialogSchema = _c.dialogSchema, componentId = _c.componentId;
        if (!feat) {
            return tslib_1.__assign({}, buttonSchema);
        }
        var labelMap = {
            Insert: '新增',
            View: '查看',
            Edit: '编辑',
            BulkEdit: '批量编辑',
            Delete: '删除',
            BulkDelete: '批量删除'
        };
        var titleMap = {
            Insert: '新增数据',
            View: '查看数据',
            Edit: '编辑数据',
            BulkEdit: '批量编辑数据',
            Delete: '删除数据',
            BulkDelete: '批量删除数据'
        };
        var schema = tslib_1.__assign(tslib_1.__assign({ type: 'button', label: (_a = labelMap[feat]) !== null && _a !== void 0 ? _a : '按钮' }, buttonSchema), { behavior: feat, onEvent: {
                click: {
                    actions: [
                        {
                            actionType: 'dialog',
                            dialog: tslib_1.__assign({ body: tslib_1.__assign(tslib_1.__assign({}, formSchema), { onEvent: {
                                        submitSucc: {
                                            actions: [
                                                {
                                                    actionType: 'search',
                                                    groupType: 'component',
                                                    componentId: componentId
                                                }
                                            ]
                                        }
                                    } }), title: (_b = titleMap[feat]) !== null && _b !== void 0 ? _b : '弹窗', size: 'md', actions: [
                                    { type: 'button', actionType: 'cancel', label: '关闭' }
                                ] }, dialogSchema)
                        }
                    ]
                }
            } });
        return schema;
    };
    /** 构建表单按钮操作区 */
    ApiDSBuilder.prototype.buildFormOperators = function (options, componentId) {
        var _a = options || {}, feat = _a.feat, scaffoldConfig = _a.scaffoldConfig;
        var operators = (scaffoldConfig || {}).operators;
        var schema = (0, sortBy_1.default)(operators !== null && operators !== void 0 ? operators : Object.values(constants_1.FormOperatorMap), [
            'order'
        ]).map(function (item) {
            return tslib_1.__assign({ type: 'button', label: item.label, onEvent: {
                    click: {
                        actions: [
                            {
                                actionType: item.value,
                                componentId: componentId
                            }
                        ]
                    }
                } }, item.schema);
        });
        return schema;
    };
    /**
     * 为输入类控件追加的初始化Schema配置，避免某些类型组件渲染报错
     */
    ApiDSBuilder.prototype.appendSchema2InputControl = function (inputType) {
        if (inputType === 'combo') {
            return {
                items: [
                    {
                        type: 'input-text',
                        name: 'input-text',
                        placeholder: '文本'
                    }
                ]
            };
        }
        else {
            return {};
        }
    };
    ApiDSBuilder.prototype.buildBaseFormSchema = function (options, schemaPatch, componentId) {
        var _this = this;
        var _a;
        schemaPatch = schemaPatch || {};
        var _b = options || {}, feat = _b.feat, renderer = _b.renderer, scaffoldConfig = _b.scaffoldConfig;
        if (!feat) {
            return tslib_1.__assign(tslib_1.__assign({}, schemaPatch), (componentId ? { id: componentId } : {}));
        }
        var fieldsKey = this.getFieldsKey(options);
        var apiKey = this.getApiKey(options);
        var fields = (_a = scaffoldConfig === null || scaffoldConfig === void 0 ? void 0 : scaffoldConfig[fieldsKey]) !== null && _a !== void 0 ? _a : [];
        var apiSchema = scaffoldConfig === null || scaffoldConfig === void 0 ? void 0 : scaffoldConfig[apiKey];
        var id = componentId !== null && componentId !== void 0 ? componentId : (0, amis_editor_core_1.generateNodeId)();
        var schema = tslib_1.__assign({ id: id, type: 'form', title: '表单', mode: 'horizontal', dsType: this.key, feat: feat, body: fields.map(function (f) {
                var _a;
                var type = f.inputType
                    ? (_a = (0, utils_1.displayType2inputType)(f.inputType)) !== null && _a !== void 0 ? _a : 'input-text'
                    : 'input-text';
                return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (0, pick_1.default)(f, ['name', 'label'])), { type: type }), _this.appendSchema2InputControl(type));
            }), api: apiSchema }, (renderer === 'form'
            ? {
                actions: this.buildFormOperators(options, id)
            }
            : {}));
        if (['Insert', 'Edit', 'BulkEdit'].includes(feat)) {
            schema.resetAfterSubmit = true;
        }
        if (feat === 'View') {
            schema.static = true;
        }
        return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, schema), schemaPatch), { id: id });
    };
    ApiDSBuilder.prototype.buildInsertSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, renderer, scaffoldConfig, insertApi, formId, formActions, title, formSchema;
            return tslib_1.__generator(this, function (_b) {
                _a = options || {}, renderer = _a.renderer, scaffoldConfig = _a.scaffoldConfig;
                insertApi = (scaffoldConfig || {}).insertApi;
                if (renderer === 'form') {
                    return [2 /*return*/, this.buildBaseFormSchema(tslib_1.__assign({}, options), undefined, componentId)];
                }
                formId = componentId !== null && componentId !== void 0 ? componentId : (0, amis_editor_core_1.generateNodeId)();
                formActions = [
                    {
                        type: 'button',
                        actionType: 'cancel',
                        label: '取消'
                    },
                    {
                        type: 'button',
                        actionType: 'submit',
                        label: '提交',
                        level: 'primary'
                    }
                ];
                title = '新增数据';
                formSchema = this.buildBaseFormSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.Insert }), {
                    id: formId,
                    title: title,
                    api: insertApi,
                    actions: formActions
                });
                return [2 /*return*/, tslib_1.__assign({}, this.buildBaseButtonSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.Insert }), {
                        buttonSchema: {
                            level: 'primary',
                            className: 'm-r-xs'
                        },
                        dialogSchema: {
                            title: title,
                            actions: formActions
                        },
                        formSchema: formSchema,
                        componentId: componentId
                    }))];
            });
        });
    };
    ApiDSBuilder.prototype.buildViewSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, renderer, scaffoldConfig, viewApi, formActions, title, formSchema, buttonSchema;
            return tslib_1.__generator(this, function (_b) {
                _a = options || {}, renderer = _a.renderer, scaffoldConfig = _a.scaffoldConfig;
                viewApi = (scaffoldConfig || {}).viewApi;
                formActions = [
                    {
                        type: 'button',
                        actionType: 'cancel',
                        label: '关闭'
                    }
                ];
                title = '查看数据';
                formSchema = this.buildBaseFormSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.View }), {
                    title: title,
                    initApi: viewApi,
                    actions: formActions
                });
                if (renderer === 'crud') {
                    buttonSchema = tslib_1.__assign({}, this.buildBaseButtonSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.View }), {
                        buttonSchema: {
                            level: 'link'
                        },
                        dialogSchema: {
                            title: title,
                            actions: formActions
                        },
                        formSchema: formSchema,
                        componentId: componentId
                    }));
                    return [2 /*return*/, buttonSchema];
                }
                return [2 /*return*/, formSchema];
            });
        });
    };
    ApiDSBuilder.prototype.buildEditSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, renderer, scaffoldConfig, isForm, _b, editApi, initApi, formId, formActions, title, formSchema;
            return tslib_1.__generator(this, function (_c) {
                _a = options || {}, renderer = _a.renderer, scaffoldConfig = _a.scaffoldConfig;
                isForm = renderer === 'form';
                if (isForm) {
                    return [2 /*return*/, this.buildBaseFormSchema(options, undefined, componentId)];
                }
                _b = scaffoldConfig || {}, editApi = _b.editApi, initApi = _b.initApi;
                formId = (0, amis_editor_core_1.generateNodeId)();
                formActions = [
                    {
                        type: 'button',
                        actionType: 'cancel',
                        label: '取消'
                    },
                    {
                        type: 'button',
                        actionType: 'submit',
                        label: '提交',
                        level: 'primary'
                    }
                ];
                title = '编辑数据';
                formSchema = this.buildBaseFormSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.Edit }), {
                    id: formId,
                    title: title,
                    initApi: initApi,
                    api: editApi,
                    actions: formActions
                });
                return [2 /*return*/, tslib_1.__assign({}, this.buildBaseButtonSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.Edit }), {
                        buttonSchema: {
                            level: 'link'
                        },
                        dialogSchema: {
                            title: title,
                            actions: formActions
                        },
                        formSchema: formSchema,
                        componentId: componentId
                    }))];
            });
        });
    };
    ApiDSBuilder.prototype.buildBulkEditSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var renderer, scaffoldConfig, bulkEditApi, isForm, formId, formActions, title, formSchema;
            return tslib_1.__generator(this, function (_a) {
                renderer = options.renderer, scaffoldConfig = options.scaffoldConfig;
                bulkEditApi = (scaffoldConfig || {}).bulkEditApi;
                isForm = renderer === 'form';
                if (isForm) {
                    return [2 /*return*/, this.buildBaseFormSchema(options, undefined, componentId)];
                }
                formId = (0, amis_editor_core_1.generateNodeId)();
                formActions = [
                    {
                        type: 'button',
                        actionType: 'cancel',
                        label: '取消'
                    },
                    {
                        type: 'button',
                        actionType: 'submit',
                        label: '提交',
                        level: 'primary'
                    }
                ];
                title = '批量编辑';
                formSchema = this.buildBaseFormSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.BulkEdit }), {
                    id: formId,
                    title: title,
                    api: bulkEditApi,
                    actions: formActions
                });
                return [2 /*return*/, tslib_1.__assign({}, this.buildBaseButtonSchema(tslib_1.__assign(tslib_1.__assign({}, options), { feat: constants_1.DSFeatureEnum.BulkEdit }), {
                        buttonSchema: {
                            className: 'm-r-xs',
                            disabledOn: '${selectedItems != null && selectedItems.length < 1}'
                        },
                        dialogSchema: {
                            title: title,
                            actions: formActions
                        },
                        formSchema: formSchema,
                        componentId: componentId
                    }))];
            });
        });
    };
    ApiDSBuilder.prototype.buildCRUDDeleteSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scaffoldConfig, deleteApi;
            return tslib_1.__generator(this, function (_a) {
                scaffoldConfig = (options || {}).scaffoldConfig;
                deleteApi = (scaffoldConfig || {}).deleteApi;
                return [2 /*return*/, {
                        type: 'button',
                        label: '删除',
                        behavior: 'Delete',
                        className: 'm-r-xs text-danger',
                        level: 'link',
                        confirmText: '确认要删除数据',
                        onEvent: {
                            click: {
                                actions: [
                                    {
                                        actionType: 'ajax',
                                        api: deleteApi,
                                        data: {
                                            '&': '$$'
                                        }
                                    },
                                    {
                                        actionType: 'search',
                                        groupType: 'component',
                                        componentId: componentId
                                    }
                                ]
                            }
                        }
                    }];
            });
        });
    };
    ApiDSBuilder.prototype.buildCRUDBulkDeleteSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scaffoldConfig, _a, bulkDeleteApi, _b, primaryField;
            return tslib_1.__generator(this, function (_c) {
                scaffoldConfig = (options || {}).scaffoldConfig;
                _a = scaffoldConfig || {}, bulkDeleteApi = _a.bulkDeleteApi, _b = _a.primaryField, primaryField = _b === void 0 ? 'id' : _b;
                return [2 /*return*/, {
                        type: 'button',
                        label: '批量删除',
                        behavior: 'BulkDelete',
                        level: 'danger',
                        className: 'm-r-xs',
                        confirmText: '确认要批量删除数据' +
                            "\u300C${JOIN(ARRAYMAP(selectedItems, item => item.".concat(primaryField, "), ',')}\u300D"),
                        disabledOn: '${selectedItems != null && selectedItems.length < 1}',
                        onEvent: {
                            click: {
                                actions: [
                                    {
                                        actionType: 'ajax',
                                        api: bulkDeleteApi
                                    },
                                    {
                                        actionType: 'search',
                                        groupType: 'component',
                                        componentId: componentId
                                    }
                                ]
                            }
                        }
                    }];
            });
        });
    };
    ApiDSBuilder.prototype.buildSimpleQueryCollectionSchema = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, renderer, schema, simpleQueryFields, filter;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = options || {}, renderer = _b.renderer, schema = _b.schema;
                        if (renderer !== 'crud') {
                            return [2 /*return*/];
                        }
                        simpleQueryFields = ((_a = schema === null || schema === void 0 ? void 0 : schema.columns) !== null && _a !== void 0 ? _a : [])
                            .filter(function (item) { return item.type !== 'operation'; })
                            .map(function (item) {
                            var _a, _b;
                            var inputType = item.type
                                ? (_a = (0, utils_1.displayType2inputType)(item.type)) !== null && _a !== void 0 ? _a : 'input-text'
                                : 'input-text';
                            return {
                                type: (_b = item.type) !== null && _b !== void 0 ? _b : 'input-text',
                                inputType: inputType,
                                name: item.name,
                                label: item.title,
                                size: 'full',
                                required: false,
                                behavior: 'SimpleQuery'
                            };
                        });
                        return [4 /*yield*/, this.buildCRUDFilterSchema(tslib_1.__assign(tslib_1.__assign({}, options), { scaffoldConfig: {
                                    dsType: this.key,
                                    simpleQueryFields: simpleQueryFields
                                } }), schema === null || schema === void 0 ? void 0 : schema.id)];
                    case 1:
                        filter = _c.sent();
                        return [2 /*return*/, filter.body];
                }
            });
        });
    };
    ApiDSBuilder.prototype.buildCRUDFilterSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scaffoldConfig, simpleQueryFields, fields, formSchema;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                scaffoldConfig = (options || {}).scaffoldConfig;
                simpleQueryFields = (scaffoldConfig || {}).simpleQueryFields;
                fields = simpleQueryFields !== null && simpleQueryFields !== void 0 ? simpleQueryFields : [];
                formSchema = {
                    type: 'form',
                    title: '条件查询',
                    mode: 'inline',
                    columnCount: 3,
                    clearValueOnHidden: true,
                    behavior: ['SimpleQuery'],
                    body: fields.map(function (f) {
                        var _a;
                        var type = (_a = f.inputType) !== null && _a !== void 0 ? _a : 'input-text';
                        return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (0, pick_1.default)(f, ['name', 'label'])), { type: type, size: 'full', required: false, behavior: 'SimpleQuery' }), _this.appendSchema2InputControl(type));
                    }),
                    actions: [
                        { type: 'reset', label: '重置' },
                        { type: 'submit', label: '查询', level: 'primary' }
                    ]
                };
                return [2 /*return*/, formSchema];
            });
        });
    };
    ApiDSBuilder.prototype.buildCRUDOpColumn = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var feats, buttons, _a, _b, _c, _d, _e, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        feats = (options || {}).feats;
                        buttons = [];
                        if (!(feats === null || feats === void 0 ? void 0 : feats.includes('View'))) return [3 /*break*/, 2];
                        _b = (_a = buttons).push;
                        return [4 /*yield*/, this.buildViewSchema(options, componentId)];
                    case 1:
                        _b.apply(_a, [_g.sent()]);
                        _g.label = 2;
                    case 2:
                        if (!(feats === null || feats === void 0 ? void 0 : feats.includes('Edit'))) return [3 /*break*/, 4];
                        _d = (_c = buttons).push;
                        return [4 /*yield*/, this.buildEditSchema(options, componentId)];
                    case 3:
                        _d.apply(_c, [_g.sent()]);
                        _g.label = 4;
                    case 4:
                        if (!(feats === null || feats === void 0 ? void 0 : feats.includes('Delete'))) return [3 /*break*/, 6];
                        _f = (_e = buttons).push;
                        return [4 /*yield*/, this.buildCRUDDeleteSchema(options, componentId)];
                    case 5:
                        _f.apply(_e, [_g.sent()]);
                        _g.label = 6;
                    case 6: return [2 /*return*/, {
                            type: 'operation',
                            title: '操作',
                            buttons: buttons
                        }];
                }
            });
        });
    };
    ApiDSBuilder.prototype.buildCRUDColumn = function (field, options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, {
                        type: field.displayType,
                        title: field.label,
                        name: field.name
                        /** 绑定列值, 似乎不需要 */
                        // [f.typeKey || 'value']: `\${f.key}`
                    }];
            });
        });
    };
    ApiDSBuilder.prototype.buildCRUDColumnsSchema = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scaffoldConfig, listFields, fields, opColumn, columns;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scaffoldConfig = options.scaffoldConfig;
                        listFields = (scaffoldConfig || {}).listFields;
                        fields = listFields !== null && listFields !== void 0 ? listFields : [];
                        return [4 /*yield*/, this.buildCRUDOpColumn(options, componentId)];
                    case 1:
                        opColumn = _a.sent();
                        return [4 /*yield*/, Promise.all(fields.map(function (f) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, this.buildCRUDColumn(f, options, componentId)];
                            }); }); }))];
                    case 2:
                        columns = (_a.sent()).filter(Boolean);
                        return [2 /*return*/, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(columns), false), tslib_1.__read((opColumn.buttons.length !== 0 ? [opColumn] : [])), false)];
                }
            });
        });
    };
    ApiDSBuilder.prototype.buildToolbarContainer = function (align, body, behaviors) {
        if (body === void 0) { body = []; }
        body = Array.isArray(body) ? body : [body];
        return tslib_1.__assign(tslib_1.__assign({ type: 'container', align: align }, (behaviors ? { behavior: behaviors } : {})), { body: Array.isArray(body) ? body : [body], wrapperBody: false, style: tslib_1.__assign({ flexGrow: 1, flex: '1 1 auto', position: 'static', display: 'flex', flexBasis: 'auto', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'stretch' }, (align
                ? {
                    justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
                }
                : {})) });
    };
    ApiDSBuilder.prototype.buildToolbarFlex = function (position, left, right) {
        return [
            {
                type: 'flex',
                direction: 'row',
                justify: 'flex-start',
                alignItems: 'stretch',
                style: {
                    position: 'static'
                },
                items: [
                    this.buildToolbarContainer('left', left, position === 'header'
                        ? [
                            constants_1.DSFeatureEnum.Insert,
                            constants_1.DSFeatureEnum.BulkEdit,
                            constants_1.DSFeatureEnum.BulkDelete
                        ]
                        : undefined),
                    this.buildToolbarContainer('right', right, position === 'header' ? [constants_1.DSFeatureEnum.FuzzyQuery] : undefined)
                ].filter(Boolean)
            }
        ];
    };
    ApiDSBuilder.prototype.buildHeaderToolbar = function (options, componentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var feats, collection, _a, _b, _c, _d, _e, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        feats = (options || {}).feats;
                        collection = [];
                        if (!(feats === null || feats === void 0 ? void 0 : feats.includes('Insert'))) return [3 /*break*/, 2];
                        _b = (_a = collection).push;
                        return [4 /*yield*/, this.buildInsertSchema(options, componentId)];
                    case 1:
                        _b.apply(_a, [_g.sent()]);
                        _g.label = 2;
                    case 2:
                        if (!(feats === null || feats === void 0 ? void 0 : feats.includes('BulkEdit'))) return [3 /*break*/, 4];
                        _d = (_c = collection).push;
                        return [4 /*yield*/, this.buildBulkEditSchema(options, componentId)];
                    case 3:
                        _d.apply(_c, [_g.sent()]);
                        _g.label = 4;
                    case 4:
                        if (!(feats === null || feats === void 0 ? void 0 : feats.includes('BulkDelete'))) return [3 /*break*/, 6];
                        _f = (_e = collection).push;
                        return [4 /*yield*/, this.buildCRUDBulkDeleteSchema(options, componentId)];
                    case 5:
                        _f.apply(_e, [_g.sent()]);
                        _g.label = 6;
                    case 6: return [2 /*return*/, this.buildToolbarFlex('header', collection, [])];
                }
            });
        });
    };
    ApiDSBuilder.prototype.buildFooterToolbar = function (options, componentId) {
        return this.buildToolbarFlex('footer', [], [
            {
                type: 'pagination',
                behavior: 'Pagination',
                layout: ['total', 'perPage', 'pager'],
                perPage: 10,
                perPageAvailable: [10, 20, 50, 100],
                align: 'right'
            }
        ]);
    };
    ApiDSBuilder.prototype.guessFormScaffoldConfig = function (options) {
        var _a, _b;
        var _c, _d;
        var schema = (options || {}).schema;
        var dsType = this.key;
        if (!schema.dsType || schema.dsType !== dsType) {
            return { dsType: dsType };
        }
        var feat = (_c = schema === null || schema === void 0 ? void 0 : schema.feat) !== null && _c !== void 0 ? _c : 'Insert';
        /** 表单操作 */
        var operators = ((_d = schema.actions) !== null && _d !== void 0 ? _d : [])
            .map(function (item) {
            var opValue = (0, get_1.default)(item, 'onEvent.click.actions[0].actionType');
            if (typeof opValue === 'string' &&
                opValue &&
                ['submit', 'reset', 'cancel'].includes(opValue)) {
                return constants_1.FormOperatorMap[opValue];
            }
            return undefined;
        })
            .filter(Boolean);
        var featValue = this.getFeatValueByKey(feat);
        var fieldKey = featValue ? "".concat(featValue, "Fields") : '';
        var apiKey = featValue ? "".concat(featValue, "Api") : '';
        var fields = (Array.isArray(schema === null || schema === void 0 ? void 0 : schema.body) ? schema.body : [schema.body])
            .map(function (item) {
            if (!item) {
                return false;
            }
            return {
                name: item.name,
                label: item.label,
                displayType: 'tpl' /** 对于form这个属性没用 */,
                inputType: item.type
            };
        })
            .filter(function (f) { return f != null; });
        var config = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ feat: feat, dsType: dsType }, (fieldKey ? (_a = {}, _a[fieldKey] = fields, _a) : {})), (apiKey ? (_b = {}, _b[apiKey] = (0, amis_editor_core_1.JSONPipeOut)(schema === null || schema === void 0 ? void 0 : schema.api), _b) : {})), (feat === 'Edit' || schema.initApi != null
            ? { initApi: (0, amis_editor_core_1.JSONPipeOut)(schema === null || schema === void 0 ? void 0 : schema.initApi) }
            : {})), { operators: operators.length < 1
                ? [constants_1.FormOperatorMap['cancel'], constants_1.FormOperatorMap['submit']]
                : operators, __pristineSchema: (0, omit_1.default)((0, amis_editor_core_1.JSONPipeOut)(schema), tslib_1.__spreadArray([], tslib_1.__read(Object.values(constants_1.DSFeature).map(function (item) { return "".concat(item.value, "Fields"); })), false)) });
        return config;
    };
    ApiDSBuilder.prototype.guessCRUDScaffoldConfig = function (options) {
        var _a;
        var schema = (options || {}).schema;
        var dsType = this.key;
        if (!schema.dsType || schema.dsType !== dsType) {
            return { dsType: dsType, primaryField: 'id' };
        }
        var listFields = (Array.isArray(schema === null || schema === void 0 ? void 0 : schema.columns) ? schema.columns : [schema.columns])
            .filter(function (item) { return item.type !== 'operation'; })
            .map(function (item) {
            if (!item) {
                return;
            }
            return {
                name: item.name,
                label: item.title,
                displayType: item.type,
                inputType: 'input-text' /** 对于CRUD这个属性没用 */
            };
        })
            .filter(function (f) { return f != null; });
        var viewFields = [];
        var viewApi;
        var insertFields = [];
        var insertApi;
        var editFields = [];
        var editApi;
        var bulkEditFields = [];
        var bulkEditApi;
        var simpleQueryFields = [];
        var bulkDeleteApi;
        var deleteApi;
        /** 已开启特性 */
        var feats = [];
        var collectFormFields = function (body) {
            return body.map(function (item) {
                var _a;
                return (tslib_1.__assign(tslib_1.__assign({}, (0, pick_1.default)(item, ['name', 'label'])), { inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text', displayType: 'tpl' }));
            });
        };
        (0, utils_1.traverseSchemaDeep)(schema, function (key, value, host) {
            var _a, _b, _c, _d, _e;
            if (key === 'feat') {
                if (value === 'Insert') {
                    feats.push('Insert');
                    insertFields = collectFormFields((_a = host === null || host === void 0 ? void 0 : host.body) !== null && _a !== void 0 ? _a : []);
                    insertApi = host === null || host === void 0 ? void 0 : host.api;
                }
                else if (value === 'Edit') {
                    feats.push('Edit');
                    editFields = collectFormFields((_b = host === null || host === void 0 ? void 0 : host.body) !== null && _b !== void 0 ? _b : []);
                    editApi = host === null || host === void 0 ? void 0 : host.api;
                }
                else if (value === 'BulkEdit') {
                    feats.push('BulkEdit');
                    bulkEditFields = collectFormFields((_c = host === null || host === void 0 ? void 0 : host.body) !== null && _c !== void 0 ? _c : []);
                    bulkEditApi = host === null || host === void 0 ? void 0 : host.api;
                }
                else if (value === 'View') {
                    feats.push('View');
                    viewFields = collectFormFields((_d = host === null || host === void 0 ? void 0 : host.body) !== null && _d !== void 0 ? _d : []);
                    viewApi = host === null || host === void 0 ? void 0 : host.initApi;
                }
            }
            if (key === 'behavior') {
                if (value === 'BulkDelete') {
                    feats.push('BulkDelete');
                    var actions = (0, get_1.default)(host, 'onEvent.click.actions', []);
                    var actionSchema = actions.find(function (action) {
                        var _a;
                        return (action === null || action === void 0 ? void 0 : action.actionType) === 'ajax' &&
                            ((action === null || action === void 0 ? void 0 : action.api) != null || ((_a = action === null || action === void 0 ? void 0 : action.args) === null || _a === void 0 ? void 0 : _a.api) != null);
                    });
                    bulkDeleteApi =
                        (0, get_1.default)(actionSchema, 'api', '') || (0, get_1.default)(actionSchema, 'args.api', '');
                }
                else if (value === 'Delete') {
                    feats.push('Delete');
                    var actions = (0, get_1.default)(host, 'onEvent.click.actions', []);
                    var actionSchema = actions.find(function (action) {
                        var _a;
                        return (action === null || action === void 0 ? void 0 : action.actionType) === 'ajax' &&
                            ((action === null || action === void 0 ? void 0 : action.api) != null || ((_a = action === null || action === void 0 ? void 0 : action.args) === null || _a === void 0 ? void 0 : _a.api) != null);
                    });
                    deleteApi =
                        (0, get_1.default)(actionSchema, 'api', '') || (0, get_1.default)(actionSchema, 'args.api', '');
                }
                else if (Array.isArray(value) && value.includes('SimpleQuery')) {
                    feats.push('SimpleQuery');
                    simpleQueryFields = ((_e = host === null || host === void 0 ? void 0 : host.body) !== null && _e !== void 0 ? _e : []).map(function (item) {
                        var _a;
                        return (tslib_1.__assign(tslib_1.__assign({}, (0, pick_1.default)(item, ['name', 'label'])), { inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text', isplayType: 'tpl' }));
                    });
                }
            }
            return [key, value];
        });
        var finalFeats = (0, uniq_1.default)(feats);
        var config = {
            dsType: dsType,
            tools: (0, intersection_1.default)(finalFeats, [
                constants_1.DSFeatureEnum.Insert,
                constants_1.DSFeatureEnum.BulkDelete,
                constants_1.DSFeatureEnum.BulkEdit
            ]),
            /** 数据操作 */
            operators: (0, intersection_1.default)(finalFeats, [
                constants_1.DSFeatureEnum.View,
                constants_1.DSFeatureEnum.Edit,
                constants_1.DSFeatureEnum.Delete
            ]),
            /** 条件查询 */
            filters: (0, intersection_1.default)(finalFeats, [
                constants_1.DSFeatureEnum.FuzzyQuery,
                constants_1.DSFeatureEnum.SimpleQuery,
                constants_1.DSFeatureEnum.AdvancedQuery
            ]),
            listFields: listFields,
            listApi: (0, amis_editor_core_1.JSONPipeOut)(schema === null || schema === void 0 ? void 0 : schema.api),
            viewFields: viewFields,
            viewApi: (0, amis_editor_core_1.JSONPipeOut)(viewApi),
            insertFields: insertFields,
            insertApi: (0, amis_editor_core_1.JSONPipeOut)(insertApi),
            editFields: editFields,
            editApi: (0, amis_editor_core_1.JSONPipeOut)(editApi),
            bulkEditFields: bulkEditFields,
            bulkEditApi: (0, amis_editor_core_1.JSONPipeOut)(bulkEditApi),
            deleteApi: (0, amis_editor_core_1.JSONPipeOut)(deleteApi),
            bulkDeleteApi: (0, amis_editor_core_1.JSONPipeOut)(bulkDeleteApi),
            simpleQueryFields: simpleQueryFields,
            primaryField: (_a = schema === null || schema === void 0 ? void 0 : schema.primaryField) !== null && _a !== void 0 ? _a : 'id',
            __pristineSchema: (0, omit_1.default)((0, amis_editor_core_1.JSONPipeOut)(schema), tslib_1.__spreadArray([], tslib_1.__read(Object.values(constants_1.DSFeature).map(function (item) { return "".concat(item.value, "Fields"); })), false))
        };
        return config;
    };
    ApiDSBuilder.prototype.buildCRUDSchema = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var feats, scaffoldConfig, _a, _b, primaryField, listApi, editApi, bulkEditApi, simpleQueryFields, enableBulkEdit, enableBulkDelete, enableEdit, multiple, id, _c, _d, _e;
            var _f, _g;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        feats = options.feats, scaffoldConfig = options.scaffoldConfig;
                        _a = scaffoldConfig || {}, _b = _a.primaryField, primaryField = _b === void 0 ? 'id' : _b, listApi = _a.listApi, editApi = _a.editApi, bulkEditApi = _a.bulkEditApi, simpleQueryFields = _a.simpleQueryFields;
                        enableBulkEdit = feats === null || feats === void 0 ? void 0 : feats.includes('BulkEdit');
                        enableBulkDelete = feats === null || feats === void 0 ? void 0 : feats.includes('BulkDelete');
                        enableEdit = feats === null || feats === void 0 ? void 0 : feats.includes('Edit');
                        multiple = enableBulkEdit || enableBulkDelete;
                        id = (0, amis_editor_core_1.generateNodeId)();
                        _c = [tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ id: id, type: 'crud2', mode: 'table2', dsType: this.key, syncLocation: true, multiple: multiple }, (multiple
                                ? {
                                    rowSelection: {
                                        type: 'checkbox',
                                        keyField: primaryField
                                    }
                                }
                                : {})), { loadType: 'pagination', primaryField: primaryField, api: listApi }), (enableBulkEdit ? { quickSaveApi: bulkEditApi } : {})), (enableEdit ? { quickSaveItemApi: editApi } : {}))];
                        if (!(feats === null || feats === void 0 ? void 0 : feats.includes(constants_1.DSFeatureEnum.SimpleQuery))) return [3 /*break*/, 2];
                        _f = {};
                        return [4 /*yield*/, this.buildCRUDFilterSchema(options, id)];
                    case 1:
                        _d = (_f.filter = _h.sent(), _f);
                        return [3 /*break*/, 3];
                    case 2:
                        _d = {};
                        _h.label = 3;
                    case 3:
                        _e = [tslib_1.__assign.apply(void 0, _c.concat([(_d)]))];
                        _g = {};
                        return [4 /*yield*/, this.buildHeaderToolbar(options, id)];
                    case 4:
                        _g.headerToolbar = _h.sent(), _g.footerToolbar = this.buildFooterToolbar(options, id);
                        return [4 /*yield*/, this.buildCRUDColumnsSchema(options, id)];
                    case 5: 
                    /** 暂时不考虑 cards 和 list */
                    return [2 /*return*/, tslib_1.__assign.apply(void 0, _e.concat([(_g.columns = _h.sent(), _g)]))];
                }
            });
        });
    };
    ApiDSBuilder.prototype.buildFormSchema = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var feat, scaffoldConfig, _b, initApi, __pristineSchema, formSchema, id, baseSchema;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        feat = options.feat, scaffoldConfig = options.scaffoldConfig;
                        _b = scaffoldConfig || {}, initApi = _b.initApi, __pristineSchema = _b.__pristineSchema;
                        id = (_a = __pristineSchema === null || __pristineSchema === void 0 ? void 0 : __pristineSchema.id) !== null && _a !== void 0 ? _a : (0, amis_editor_core_1.generateNodeId)();
                        if (!(feat === 'Insert')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.buildInsertSchema(options, id)];
                    case 1:
                        formSchema = _c.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(feat === 'Edit')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.buildEditSchema(options, id)];
                    case 3:
                        formSchema = _c.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.buildBulkEditSchema(options, id)];
                    case 5:
                        formSchema = _c.sent();
                        _c.label = 6;
                    case 6:
                        baseSchema = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, formSchema), (feat === 'Edit' ? { initApi: initApi } : {})), { dsType: this.key });
                        if (__pristineSchema && (0, amis_core_1.isObject)(__pristineSchema)) {
                            return [2 /*return*/, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, __pristineSchema), baseSchema), { id: id })];
                        }
                        return [2 /*return*/, baseSchema];
                }
            });
        });
    };
    ApiDSBuilder.prototype.buildApiSchema = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var schema;
            return tslib_1.__generator(this, function (_a) {
                schema = options.schema;
                return [2 /*return*/, schema];
            });
        });
    };
    ApiDSBuilder.key = 'api';
    return ApiDSBuilder;
}(DSBuilder_1.DSBuilder));
exports.ApiDSBuilder = ApiDSBuilder;
(0, DSBuilder_1.registerDSBuilder)(ApiDSBuilder);
