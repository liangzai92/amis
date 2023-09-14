"use strict";
/**
 * @file CRUDFiltersControl
 * @desc 搜索控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDFiltersControlRenderer = exports.CRUDFiltersControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var uniq_1 = tslib_1.__importDefault(require("lodash/uniq"));
var amis_1 = require("amis");
var amis_ui_1 = require("amis-ui");
var constants_1 = require("../../builder/constants");
var utils_1 = require("../../builder/utils");
var utils_2 = require("../../plugin/CRUD2/utils");
var CRUDFiltersControl = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDFiltersControl, _super);
    function CRUDFiltersControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            options: [],
            loading: false,
            checked: false
        };
        return _this;
    }
    CRUDFiltersControl.prototype.componentDidMount = function () {
        this.dom = (0, react_dom_1.findDOMNode)(this);
        this.initOptions();
    };
    CRUDFiltersControl.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (prevProps.data.headerToolbar !== this.props.data.headerToolbar ||
            prevProps.data.filter !== this.props.data.filter) {
            this.initOptions();
        }
    };
    CRUDFiltersControl.prototype.transformOption = function (option) {
        var _a, _b;
        if (option.name) {
            return {
                label: typeof option.label === 'string'
                    ? option.label
                    : ((_a = option.label) === null || _a === void 0 ? void 0 : _a.type) === 'tpl' &&
                        typeof option.label.tpl === 'string'
                        ? option.label.tpl /** 处理 SchemaObject 的场景 */
                        : option.name,
                value: (_b = option.name) !== null && _b !== void 0 ? _b : option.key,
                /** 使用id用于定位 */
                nodeId: option.$$id,
                pristine: option
            };
        }
        return false;
    };
    CRUDFiltersControl.prototype.initOptions = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _k, manager, nodeId, feat, builder, store, node, CRUDSchema, filterSchema, targetNodeId, options_1, baseOpitons, fields, fields, CBSchema, fields, fuzzyQuerySchema_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _k = this.props, manager = _k.manager, nodeId = _k.nodeId, feat = _k.feat, builder = _k.builder;
                        store = manager.store;
                        node = store.getNodeById(nodeId);
                        CRUDSchema = node.schema;
                        filterSchema = (CRUDSchema === null || CRUDSchema === void 0 ? void 0 : CRUDSchema.filter)
                            ? Array.isArray(CRUDSchema.filter)
                                ? CRUDSchema.filter.find(function (item) { return item.behavior && Array.isArray(item.behavior); })
                                : ((_a = CRUDSchema.filter) === null || _a === void 0 ? void 0 : _a.type) === 'form'
                                    ? CRUDSchema.filter
                                    : undefined
                            : undefined;
                        targetNodeId = filterSchema ? filterSchema.$$id : '';
                        if (!builder) {
                            options_1 = [];
                            ((_b = filterSchema === null || filterSchema === void 0 ? void 0 : filterSchema.body) !== null && _b !== void 0 ? _b : []).forEach(function (formItem) {
                                if (formItem.type === 'condition-builder' ||
                                    formItem.behavior === 'AdvancedQuery') {
                                    return;
                                }
                                var option = _this.transformOption(formItem);
                                if (option !== false) {
                                    options_1.push(option);
                                }
                            });
                            this.setState({
                                options: options_1,
                                checked: options_1.length > 0,
                                targetNodeId: targetNodeId
                            });
                            return [2 /*return*/];
                        }
                        this.setState({ loading: true });
                        baseOpitons = {
                            feat: feat,
                            renderer: 'crud',
                            schema: node.schema,
                            inScaffold: false,
                            controlSettings: {
                                fieldMapper: this.transformOption.bind(this)
                            }
                        };
                        _l.label = 1;
                    case 1:
                        _l.trys.push([1, 8, , 9]);
                        if (!(feat === constants_1.DSFeatureEnum.SimpleQuery && builder.filterByFeat(feat))) return [3 /*break*/, 3];
                        return [4 /*yield*/, ((_c = builder.getCRUDSimpleQueryFields) === null || _c === void 0 ? void 0 : _c.call(builder, tslib_1.__assign({}, baseOpitons)))];
                    case 2:
                        fields = (_d = (_l.sent())) !== null && _d !== void 0 ? _d : [];
                        this.setState({
                            options: fields,
                            checked: fields.length > 0,
                            targetNodeId: targetNodeId
                        });
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(feat === constants_1.DSFeatureEnum.AdvancedQuery &&
                            builder.filterByFeat(feat))) return [3 /*break*/, 5];
                        return [4 /*yield*/, ((_e = builder === null || builder === void 0 ? void 0 : builder.getCRUDAdvancedQueryFields) === null || _e === void 0 ? void 0 : _e.call(builder, tslib_1.__assign({}, baseOpitons)))];
                    case 4:
                        fields = (_f = (_l.sent())) !== null && _f !== void 0 ? _f : [];
                        CBSchema = ((_g = filterSchema === null || filterSchema === void 0 ? void 0 : filterSchema.body) !== null && _g !== void 0 ? _g : []).find(function (item) {
                            return item.type === 'condition-builder' &&
                                (item.behavior === constants_1.DSFeatureEnum.AdvancedQuery ||
                                    item.name === '__filter');
                        });
                        targetNodeId = CBSchema ? CBSchema.$$id : '';
                        this.setState({
                            options: fields,
                            checked: fields.length > 0,
                            targetNodeId: targetNodeId
                        });
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(feat === constants_1.DSFeatureEnum.FuzzyQuery &&
                            builder.filterByFeat(feat))) return [3 /*break*/, 7];
                        return [4 /*yield*/, ((_h = builder === null || builder === void 0 ? void 0 : builder.getCRUDFuzzyQueryFields) === null || _h === void 0 ? void 0 : _h.call(builder, tslib_1.__assign({}, baseOpitons)))];
                    case 6:
                        fields = (_j = (_l.sent())) !== null && _j !== void 0 ? _j : [];
                        (0, utils_1.traverseSchemaDeep)(CRUDSchema, function (key, value, host) {
                            if (key === 'behavior' &&
                                value === constants_1.DSFeatureEnum.FuzzyQuery &&
                                host.type === 'search-box') {
                                fuzzyQuerySchema_1 = host;
                            }
                            return [key, value];
                        });
                        targetNodeId = fuzzyQuerySchema_1 ? fuzzyQuerySchema_1.$$id : '';
                        this.setState({
                            options: fields,
                            checked: fields.length > 0,
                            targetNodeId: targetNodeId
                        });
                        _l.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _l.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUDFiltersControl.prototype.updateSimpleQuery = function (enable) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _g, manager, nodeId, builder, store, CRUDNode, CRUDSchema, CRUDSchemaID, config, filterSchema, simpleQuerySchema_1, newFilterSchema, targetNode, newFilterSchema, targetNode, simpleQuerySchema, filter, newFilterSchema, isArrayFilter;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _g = this.props, manager = _g.manager, nodeId = _g.nodeId, builder = _g.builder;
                        store = manager.store;
                        CRUDNode = store.getNodeById(nodeId);
                        CRUDSchema = CRUDNode === null || CRUDNode === void 0 ? void 0 : CRUDNode.schema;
                        CRUDSchemaID = (_a = CRUDSchema === null || CRUDSchema === void 0 ? void 0 : CRUDSchema.schema) === null || _a === void 0 ? void 0 : _a.id;
                        return [4 /*yield*/, builder.guessCRUDScaffoldConfig({ schema: CRUDSchema })];
                    case 1:
                        config = _h.sent();
                        filterSchema = (0, cloneDeep_1.default)((CRUDSchema === null || CRUDSchema === void 0 ? void 0 : CRUDSchema.filter)
                            ? Array.isArray(CRUDSchema.filter)
                                ? CRUDSchema.filter.find(function (item) {
                                    return item.behavior &&
                                        Array.isArray(item.behavior) &&
                                        item.type === 'form';
                                })
                                : ((_b = CRUDSchema.filter) === null || _b === void 0 ? void 0 : _b.type) === 'form'
                                    ? CRUDSchema.filter
                                    : undefined
                            : undefined);
                        if (!filterSchema) return [3 /*break*/, 5];
                        if (!enable) return [3 /*break*/, 3];
                        return [4 /*yield*/, ((_c = builder.buildSimpleQueryCollectionSchema) === null || _c === void 0 ? void 0 : _c.call(builder, {
                                renderer: 'crud',
                                schema: CRUDSchema,
                                inScaffold: false,
                                buildSettings: {
                                    useDefaultFields: true
                                }
                            }))];
                    case 2:
                        simpleQuerySchema_1 = (_d = (_h.sent())) !== null && _d !== void 0 ? _d : [];
                        newFilterSchema = (0, utils_1.traverseSchemaDeep)(filterSchema, function (key, value, host) {
                            /** 更新标识符 */
                            if (key === 'behavior' && Array.isArray(value)) {
                                return [
                                    key,
                                    (0, uniq_1.default)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(value), false), [constants_1.DSFeatureEnum.SimpleQuery], false).filter(Boolean))
                                ];
                            }
                            /** 更新内容区 */
                            if (key === 'body' &&
                                Array.isArray(value) &&
                                (host === null || host === void 0 ? void 0 : host.type) === 'form') {
                                return [key, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(value), false), tslib_1.__read(simpleQuerySchema_1), false).filter(Boolean)];
                            }
                            return [key, value];
                        });
                        targetNode = manager.store.getNodeById(filterSchema.$$id);
                        if (targetNode) {
                            targetNode.updateSchema(newFilterSchema);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        newFilterSchema = (0, utils_1.traverseSchemaDeep)(filterSchema, function (key, value, host) {
                            /** 更新标识符 */
                            if (key === 'behavior' && Array.isArray(value)) {
                                return [
                                    key,
                                    value.filter(function (i) { return i !== constants_1.DSFeatureEnum.SimpleQuery; })
                                ];
                            }
                            /** 更新内容区 */
                            if (key === 'body' &&
                                Array.isArray(value) &&
                                (host === null || host === void 0 ? void 0 : host.type) === 'form') {
                                return [
                                    key,
                                    value.filter(function (item) { return (item === null || item === void 0 ? void 0 : item.behavior) !== constants_1.DSFeatureEnum.SimpleQuery; })
                                ];
                            }
                            return [key, value];
                        });
                        targetNode = manager.store.getNodeById(filterSchema.$$id);
                        if (targetNode) {
                            targetNode.updateSchema(newFilterSchema);
                        }
                        _h.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        if (!enable) return [3 /*break*/, 8];
                        return [4 /*yield*/, ((_e = builder.buildSimpleQueryCollectionSchema) === null || _e === void 0 ? void 0 : _e.call(builder, {
                                renderer: 'crud',
                                schema: CRUDSchema,
                                inScaffold: false,
                                buildSettings: {
                                    useDefaultFields: true
                                }
                            }))];
                    case 6:
                        simpleQuerySchema = (_f = (_h.sent())) !== null && _f !== void 0 ? _f : [];
                        return [4 /*yield*/, builder.buildCRUDFilterSchema({
                                renderer: 'crud',
                                inScaffold: false,
                                schema: CRUDSchema,
                                feats: [constants_1.DSFeatureEnum.SimpleQuery],
                                scaffoldConfig: {
                                    dsType: CRUDSchema.dsType,
                                    simpleQueryFields: simpleQuerySchema
                                },
                                buildSettings: {
                                    useDefaultFields: true
                                }
                            })];
                    case 7:
                        filter = _h.sent();
                        newFilterSchema = (0, cloneDeep_1.default)(CRUDNode === null || CRUDNode === void 0 ? void 0 : CRUDNode.schema.filter);
                        isArrayFilter = Array.isArray(newFilterSchema);
                        if (isArrayFilter) {
                            newFilterSchema.push(filter);
                        }
                        CRUDNode.updateSchema(tslib_1.__assign(tslib_1.__assign({}, CRUDSchema), { filter: isArrayFilter ? newFilterSchema : filter }));
                        _h.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CRUDFiltersControl.prototype.updateAdvancedQuery = function (enable) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, manager, nodeId, builder, store, CRUDNode, CRUDSchema, filterSchema, advancedQuerySchema_1, newFilterSchema, targetNode, newFilterSchema, targetNode, filter, newFilterSchema, isArrayFilter;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, manager = _b.manager, nodeId = _b.nodeId, builder = _b.builder;
                        store = manager.store;
                        CRUDNode = store.getNodeById(nodeId);
                        CRUDSchema = CRUDNode === null || CRUDNode === void 0 ? void 0 : CRUDNode.schema;
                        filterSchema = (0, cloneDeep_1.default)(Array.isArray(CRUDSchema.filter)
                            ? CRUDNode === null || CRUDNode === void 0 ? void 0 : CRUDNode.schema.filter.find(function (item) { return item.behavior && Array.isArray(item.behavior); })
                            : CRUDNode === null || CRUDNode === void 0 ? void 0 : CRUDNode.schema.filter);
                        if (!filterSchema) return [3 /*break*/, 4];
                        if (!enable) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = builder.buildAdvancedQuerySchema) === null || _a === void 0 ? void 0 : _a.call(builder, {
                                renderer: 'crud',
                                inScaffold: false,
                                schema: CRUDSchema,
                                buildSettings: {
                                    useDefaultFields: true
                                }
                            }))];
                    case 1:
                        advancedQuerySchema_1 = _c.sent();
                        newFilterSchema = (0, utils_1.traverseSchemaDeep)(filterSchema, function (key, value, host) {
                            /** 更新标识符 */
                            if (key === 'behavior' && Array.isArray(value)) {
                                return [
                                    key,
                                    (0, uniq_1.default)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(value), false), [constants_1.DSFeatureEnum.AdvancedQuery], false).filter(Boolean))
                                ];
                            }
                            /** 更新内容区 */
                            if (key === 'body' &&
                                Array.isArray(value) &&
                                (host === null || host === void 0 ? void 0 : host.type) === 'form') {
                                return [key, tslib_1.__spreadArray([advancedQuerySchema_1], tslib_1.__read(value), false)];
                            }
                            return [key, value];
                        });
                        targetNode = manager.store.getNodeById(filterSchema.$$id);
                        if (targetNode) {
                            targetNode.updateSchema(newFilterSchema);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        newFilterSchema = (0, utils_1.traverseSchemaDeep)(filterSchema, function (key, value, host) {
                            /** 更新标识符 */
                            if (key === 'behavior' && Array.isArray(value)) {
                                return [
                                    key,
                                    value.filter(function (i) { return i !== constants_1.DSFeatureEnum.AdvancedQuery; })
                                ];
                            }
                            /** 更新内容区 */
                            if (key === 'body' &&
                                Array.isArray(value) &&
                                (host === null || host === void 0 ? void 0 : host.type) === 'form') {
                                return [
                                    key,
                                    value.filter(function (item) {
                                        return (item === null || item === void 0 ? void 0 : item.behavior) !== constants_1.DSFeatureEnum.AdvancedQuery &&
                                            item.type !== 'condition-builder';
                                    })
                                ];
                            }
                            return [key, value];
                        });
                        targetNode = manager.store.getNodeById(filterSchema.$$id);
                        if (targetNode) {
                            targetNode.updateSchema(newFilterSchema);
                        }
                        _c.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        if (!enable) return [3 /*break*/, 6];
                        return [4 /*yield*/, builder.buildCRUDFilterSchema({
                                renderer: 'crud',
                                inScaffold: false,
                                schema: CRUDSchema,
                                feats: [constants_1.DSFeatureEnum.AdvancedQuery],
                                buildSettings: {
                                    useDefaultFields: true
                                }
                            })];
                    case 5:
                        filter = _c.sent();
                        newFilterSchema = (0, cloneDeep_1.default)(CRUDNode === null || CRUDNode === void 0 ? void 0 : CRUDNode.schema.filter);
                        isArrayFilter = Array.isArray(newFilterSchema);
                        if (isArrayFilter) {
                            newFilterSchema.push(filter);
                        }
                        CRUDNode.updateSchema(tslib_1.__assign(tslib_1.__assign({}, CRUDSchema), { filter: isArrayFilter ? newFilterSchema : filter }));
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CRUDFiltersControl.prototype.updateFuzzyQuery = function (enable) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _j, manager, nodeId, builder, store, CRUDNode, CRUDSchema, CRUDSchemaID, headerToolbar, _k, _l, _m, fuzzyQueryParent, fuzzyQuerySchema, newFuzzyParent, targetNode, fuzzyQuerySchema, newFlexContainer, container, targetNode, newHeaderToolbar, flexContainer;
            var _o;
            return tslib_1.__generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        _j = this.props, manager = _j.manager, nodeId = _j.nodeId, builder = _j.builder;
                        store = manager.store;
                        CRUDNode = store.getNodeById(nodeId);
                        CRUDSchema = CRUDNode === null || CRUDNode === void 0 ? void 0 : CRUDNode.schema;
                        CRUDSchemaID = (_a = CRUDSchema === null || CRUDSchema === void 0 ? void 0 : CRUDSchema.schema) === null || _a === void 0 ? void 0 : _a.id;
                        headerToolbar = (0, cloneDeep_1.default)(CRUDSchema.headerToolbar);
                        /** 关闭功能且存在定位容器 */
                        if (!enable) {
                            if (headerToolbar) {
                                (0, utils_2.deepRemove)(headerToolbar, function (schema) {
                                    return (schema.behavior === constants_1.DSFeatureEnum.FuzzyQuery &&
                                        schema.type === 'search-box');
                                }, true);
                                CRUDNode.updateSchema(tslib_1.__assign(tslib_1.__assign({}, CRUDSchema), { headerToolbar: headerToolbar }));
                            }
                            return [2 /*return*/];
                        }
                        if (!!headerToolbar) return [3 /*break*/, 2];
                        _l = (_k = CRUDNode).updateSchema;
                        _m = [tslib_1.__assign({}, CRUDSchema)];
                        _o = {};
                        return [4 /*yield*/, ((_b = builder.buildCRUDHeaderToolbar) === null || _b === void 0 ? void 0 : _b.call(builder, {
                                renderer: 'crud',
                                inScaffold: false,
                                schema: CRUDSchema,
                                buildSettings: {
                                    useDefaultFields: true
                                }
                            }, CRUDSchemaID))];
                    case 1:
                        _l.apply(_k, [tslib_1.__assign.apply(void 0, _m.concat([(_o.headerToolbar = _p.sent(), _o)]))]);
                        return [2 /*return*/];
                    case 2:
                        (0, utils_1.traverseSchemaDeep)(CRUDSchema, function (key, value, host) {
                            if (key === 'behavior' &&
                                Array.isArray(value) &&
                                (host === null || host === void 0 ? void 0 : host.behavior.includes('FuzzyQuery')) &&
                                (host === null || host === void 0 ? void 0 : host.type) === 'container' &&
                                Array.isArray(host === null || host === void 0 ? void 0 : host.body)) {
                                fuzzyQueryParent = host;
                            }
                            return [key, value];
                        });
                        if (!fuzzyQueryParent) return [3 /*break*/, 4];
                        return [4 /*yield*/, ((_c = builder.buildFuzzyQuerySchema) === null || _c === void 0 ? void 0 : _c.call(builder, {
                                renderer: 'crud',
                                inScaffold: false,
                                schema: CRUDSchema,
                                buildSettings: {
                                    useDefaultFields: true
                                }
                            }))];
                    case 3:
                        fuzzyQuerySchema = _p.sent();
                        newFuzzyParent = (0, cloneDeep_1.default)(fuzzyQueryParent);
                        newFuzzyParent.body = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(newFuzzyParent.body), false), [fuzzyQuerySchema], false);
                        targetNode = manager.store.getNodeById(fuzzyQueryParent.$$id);
                        if (targetNode) {
                            targetNode.updateSchema(newFuzzyParent);
                        }
                        return [3 /*break*/, 9];
                    case 4: return [4 /*yield*/, ((_d = builder.buildFuzzyQuerySchema) === null || _d === void 0 ? void 0 : _d.call(builder, {
                            renderer: 'crud',
                            inScaffold: false,
                            schema: CRUDSchema,
                            buildSettings: {
                                useDefaultFields: true
                            }
                        }))];
                    case 5:
                        fuzzyQuerySchema = _p.sent();
                        if (!(((_e = headerToolbar === null || headerToolbar === void 0 ? void 0 : headerToolbar[0]) === null || _e === void 0 ? void 0 : _e.type) === 'flex' &&
                            Array.isArray((_f = headerToolbar[0]) === null || _f === void 0 ? void 0 : _f.items))) return [3 /*break*/, 7];
                        newFlexContainer = (0, cloneDeep_1.default)(headerToolbar[0]);
                        return [4 /*yield*/, ((_g = builder.buildFuzzyQuerySchema) === null || _g === void 0 ? void 0 : _g.call(builder, {
                                renderer: 'crud',
                                inScaffold: false,
                                schema: CRUDSchema,
                                buildSettings: {
                                    useDefaultFields: true,
                                    wrapContainer: 'container'
                                }
                            }))];
                    case 6:
                        container = _p.sent();
                        newFlexContainer.items.push(container);
                        targetNode = manager.store.getNodeById(headerToolbar[0].$$id);
                        if (targetNode) {
                            targetNode.updateSchema(newFlexContainer);
                        }
                        return [3 /*break*/, 9];
                    case 7:
                        newHeaderToolbar = (0, cloneDeep_1.default)(headerToolbar);
                        return [4 /*yield*/, ((_h = builder.buildFuzzyQuerySchema) === null || _h === void 0 ? void 0 : _h.call(builder, {
                                renderer: 'crud',
                                inScaffold: false,
                                schema: CRUDSchema,
                                buildSettings: {
                                    useDefaultFields: true,
                                    wrapContainer: 'flex'
                                }
                            }))];
                    case 8:
                        flexContainer = _p.sent();
                        newHeaderToolbar.push(flexContainer);
                        CRUDNode.updateSchema(tslib_1.__assign(tslib_1.__assign({}, CRUDSchema), { headerToolbar: newHeaderToolbar }));
                        _p.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CRUDFiltersControl.prototype.handleToggle = function (checked) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, feat, builder, error_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, feat = _a.feat, builder = _a.builder;
                        this.setState({ loading: true, checked: checked });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        if (!(feat === constants_1.DSFeatureEnum.SimpleQuery && builder.filterByFeat(feat))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateSimpleQuery(checked)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(feat === constants_1.DSFeatureEnum.AdvancedQuery &&
                            builder.filterByFeat(feat))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.updateAdvancedQuery(checked)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!(feat === constants_1.DSFeatureEnum.FuzzyQuery && builder.filterByFeat(feat))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.updateFuzzyQuery(checked)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_2 = _b.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        this.setState({ loading: false, checked: checked });
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUDFiltersControl.prototype.handleEdit = function (item) {
        var manager = this.props.manager;
        var targetNodeId = item ? item === null || item === void 0 ? void 0 : item.nodeId : this.state.targetNodeId;
        if (!targetNodeId) {
            amis_1.toast.warning("\u672A\u627E\u5230\u76EE\u6807\u7EC4\u4EF6");
            return;
        }
        manager.setActiveId(targetNodeId);
    };
    CRUDFiltersControl.prototype.renderOption = function (item, index) {
        var _this = this;
        var _a, _b, _c;
        var _d = this.props, cx = _d.classnames, feat = _d.feat, popOverContainer = _d.popOverContainer, env = _d.env;
        return (react_1.default.createElement("li", { key: index, className: cx('ae-CRUDConfigControl-list-item') },
            react_1.default.createElement(amis_ui_1.TooltipWrapper, { tooltip: {
                    content: item.label,
                    tooltipTheme: 'dark',
                    style: { fontSize: '12px' }
                }, container: popOverContainer || ((_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)), trigger: ['hover'], delay: 150 },
                react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-list-item-info') },
                    react_1.default.createElement("span", null, item.label))),
            react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-list-item-actions') },
                ((_b = item === null || item === void 0 ? void 0 : item.context) === null || _b === void 0 ? void 0 : _b.isCascadingField) ? (react_1.default.createElement(amis_1.Tag, { label: (_c = item === null || item === void 0 ? void 0 : item.context) === null || _c === void 0 ? void 0 : _c.modelLabel, displayMode: "normal", className: cx('ae-CRUDConfigControl-list-item-tag', 'ae-CRUDConfigControl-list-item-tag--cascading') })) : null,
                feat === 'SimpleQuery' ? (react_1.default.createElement(amis_1.Button, { level: "link", size: "sm", tooltip: {
                        content: '去编辑',
                        tooltipTheme: 'dark',
                        style: { fontSize: '12px' }
                    }, onClick: function () { return _this.handleEdit(item); } },
                    react_1.default.createElement(amis_1.Icon, { icon: "column-setting", className: cx('icon') }))) : null)));
    };
    CRUDFiltersControl.prototype.renderHeader = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, cx = _a.classnames, render = _a.render, env = _a.env, label = _a.label, feat = _a.feat;
        var _b = this.state, options = _b.options, checked = _b.checked;
        return (react_1.default.createElement("header", { className: cx('ae-CRUDConfigControl-header', 'mb-2') },
            react_1.default.createElement("span", { className: cx('Form-label') }, label),
            react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-header-actions') },
                react_1.default.createElement(amis_1.Switch, { className: cx('ae-CRUDConfigControl-header-actions-switch'), key: "switch", size: "sm", classPrefix: ns, value: checked, onChange: this.handleToggle }),
                react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-header-actions-divider') }),
                react_1.default.createElement(amis_1.Button, { level: "link", size: "sm", tooltip: {
                        content: '去编辑目标组件',
                        tooltipTheme: 'dark',
                        style: { fontSize: '12px' }
                    }, onClick: function () { return _this.handleEdit(); } },
                    react_1.default.createElement(amis_1.Icon, { icon: "share-link", className: cx('icon'), style: { width: '16px', height: '16px' } })))));
    };
    CRUDFiltersControl.prototype.render = function () {
        var _this = this;
        var cx = this.props.classnames;
        var _a = this.state, options = _a.options, loading = _a.loading;
        return (react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl') },
            this.renderHeader(),
            react_1.default.createElement("ul", { className: cx('ae-CRUDConfigControl-list') }, loading ? (react_1.default.createElement(amis_1.Spinner, { show: true, tip: "\u5B57\u6BB5\u52A0\u8F7D\u4E2D", tipPlacement: "bottom", size: "sm", className: cx('flex') })) : Array.isArray(options) && options.length > 0 ? (options.map(function (item, index) {
                return _this.renderOption(item, index);
            })) : (react_1.default.createElement("p", { className: cx("ae-CRUDConfigControl-placeholder") }, "\u6682\u65E0\u5B57\u6BB5")))));
    };
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Promise)
    ], CRUDFiltersControl.prototype, "initOptions", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CRUDFiltersControl.prototype, "updateAdvancedQuery", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CRUDFiltersControl.prototype, "updateFuzzyQuery", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CRUDFiltersControl.prototype, "handleToggle", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDFiltersControl.prototype, "handleEdit", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDFiltersControl.prototype, "renderOption", null);
    return CRUDFiltersControl;
}(react_1.default.Component));
exports.CRUDFiltersControl = CRUDFiltersControl;
var CRUDFiltersControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDFiltersControlRenderer, _super);
    function CRUDFiltersControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CRUDFiltersControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-crud-filters-control',
            renderLabel: false,
            wrap: false
        })
    ], CRUDFiltersControlRenderer);
    return CRUDFiltersControlRenderer;
}(CRUDFiltersControl));
exports.CRUDFiltersControlRenderer = CRUDFiltersControlRenderer;
