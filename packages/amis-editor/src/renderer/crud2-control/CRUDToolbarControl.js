"use strict";
/**
 * @file CRUDToolbarControl
 * @desc 顶部工具栏控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDToolbarControlRenderer = exports.CRUDToolbarControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var amis_1 = require("amis");
var amis_ui_1 = require("amis-ui");
var amis_core_1 = require("amis-core");
var amis_editor_core_1 = require("amis-editor-core");
var builder_1 = require("../../builder");
var utils_1 = require("../../plugin/CRUD2/utils");
var CRUDToolbarControl = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDToolbarControl, _super);
    function CRUDToolbarControl(props) {
        var _this = _super.call(this, props) || this;
        /** 可供使用的功能集合 */
        _this.collection = [
            builder_1.DSFeatureEnum.Insert,
            builder_1.DSFeatureEnum.BulkEdit,
            builder_1.DSFeatureEnum.BulkDelete
        ];
        _this.state = {
            options: [],
            loading: false
        };
        return _this;
    }
    CRUDToolbarControl.prototype.componentDidMount = function () {
        this.dom = (0, react_dom_1.findDOMNode)(this);
        var actions = this.getActions(this.props);
        this.initOptions(actions);
    };
    CRUDToolbarControl.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.data.headerToolbar !== this.props.data.headerToolbar) {
            var actions = this.getActions(this.props);
            this.initOptions(actions);
        }
    };
    CRUDToolbarControl.prototype.getActions = function (props) {
        var manager = props.manager, nodeId = props.nodeId;
        var store = manager.store;
        var node = store.getNodeById(nodeId);
        var actions = (0, amis_core_1.findTreeAll)(node.children, function (item) {
            return [
                builder_1.DSFeatureEnum.Insert,
                builder_1.DSFeatureEnum.BulkEdit,
                builder_1.DSFeatureEnum.BulkDelete,
                'custom'
            ].includes(item.schema.behavior);
        });
        return actions;
    };
    CRUDToolbarControl.prototype.initOptions = function (actions) {
        var _this = this;
        if (!actions || !actions.length) {
            this.setState({ options: [] });
            return;
        }
        var options = actions.map(function (node) {
            var schema = node.schema;
            var behavior = schema.behavior;
            return {
                label: _this.getOptionLabel(schema, behavior),
                value: behavior,
                nodeId: schema.$$id,
                node: node,
                pristine: node.schema
            };
        });
        this.setState({ options: options });
    };
    CRUDToolbarControl.prototype.getOptionLabel = function (schema, behavior) {
        return behavior === 'custom' ? schema.label : builder_1.DSFeature[behavior].label;
    };
    CRUDToolbarControl.prototype.handleEdit = function (item) {
        var manager = this.props.manager;
        if (!item.nodeId) {
            amis_1.toast.warning("\u672A\u627E\u5230\u5DE5\u5177\u680F\u4E2D\u5BF9\u5E94\u64CD\u4F5C\u300C".concat(item.label, "\u300D"));
            return;
        }
        manager.setActiveId(item.nodeId);
    };
    /** 添加列 */
    CRUDToolbarControl.prototype.handleAddAction = function (type) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _d, onBulkChange, ctx, nodeId, manager, builder, options, node, CRUDSchemaID, scaffold, _e, headerToolbarSchema, actionSchema;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this.setState({ loading: true });
                        _d = this.props, onBulkChange = _d.onBulkChange, ctx = _d.data, nodeId = _d.nodeId, manager = _d.manager, builder = _d.builder;
                        options = this.state.options.concat();
                        node = manager.store.getNodeById(nodeId);
                        CRUDSchemaID = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.id;
                        _e = type;
                        switch (_e) {
                            case 'Insert': return [3 /*break*/, 1];
                            case 'BulkEdit': return [3 /*break*/, 3];
                            case 'BulkDelete': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, builder.buildInsertSchema({
                            feat: builder_1.DSFeatureEnum.Insert,
                            renderer: 'crud',
                            inScaffold: false,
                            schema: ctx,
                            scaffoldConfig: {
                                insertFields: ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.columns) !== null && _b !== void 0 ? _b : [])
                                    .filter(function (item) { return item.type !== 'operation'; })
                                    .map(function (item) {
                                    var _a;
                                    return ({
                                        inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
                                        name: item.name,
                                        label: item.title
                                    });
                                }),
                                insertApi: ''
                            }
                        }, CRUDSchemaID)];
                    case 2:
                        scaffold = _f.sent();
                        return [3 /*break*/, 8];
                    case 3: return [4 /*yield*/, builder.buildBulkEditSchema({
                            feat: builder_1.DSFeatureEnum.BulkEdit,
                            renderer: 'crud',
                            inScaffold: false,
                            schema: ctx,
                            scaffoldConfig: {
                                bulkEditFields: ((_c = ctx === null || ctx === void 0 ? void 0 : ctx.columns) !== null && _c !== void 0 ? _c : [])
                                    .filter(function (item) { return item.type !== 'operation'; })
                                    .map(function (item) {
                                    var _a;
                                    return ({
                                        inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
                                        name: item.name,
                                        label: item.title
                                    });
                                }),
                                bulkEdit: ''
                            }
                        }, CRUDSchemaID)];
                    case 4:
                        scaffold = _f.sent();
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, builder.buildCRUDBulkDeleteSchema({
                            feat: builder_1.DSFeatureEnum.BulkDelete,
                            renderer: 'crud',
                            inScaffold: false,
                            schema: ctx,
                            scaffoldConfig: {
                                bulkDeleteApi: ''
                            }
                        }, CRUDSchemaID)];
                    case 6:
                        scaffold = _f.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        scaffold = {
                            type: 'button',
                            label: '按钮',
                            behavior: 'custom',
                            className: 'm-r-xs',
                            onEvent: {
                                click: {
                                    actions: []
                                }
                            }
                        };
                        _f.label = 8;
                    case 8:
                        if (!scaffold) {
                            this.setState({ loading: false });
                            return [2 /*return*/];
                        }
                        headerToolbarSchema = (0, cloneDeep_1.default)(ctx.headerToolbar);
                        actionSchema = (0, amis_editor_core_1.JSONPipeIn)(tslib_1.__assign({}, scaffold));
                        options.push({
                            label: this.getOptionLabel(actionSchema, type),
                            value: type,
                            nodeId: actionSchema.$$id,
                            pristine: actionSchema
                        });
                        this.setState({ options: options, loading: false }, function () {
                            var _a, _b, _c;
                            var target = (_c = (_b = (_a = headerToolbarSchema === null || headerToolbarSchema === void 0 ? void 0 : headerToolbarSchema[0]) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.body;
                            if (target && Array.isArray(target)) {
                                target.push(actionSchema);
                            }
                            else {
                                headerToolbarSchema.unshift(actionSchema);
                            }
                            onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ headerToolbar: headerToolbarSchema });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUDToolbarControl.prototype.handleDelete = function (option, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, env, ctx, onBulkChange, options, confirmed, headerToolbarSchema, marked;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, env = _a.env, ctx = _a.data, onBulkChange = _a.onBulkChange;
                        options = this.state.options.concat();
                        return [4 /*yield*/, env.confirm("\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u680F\u4E2D\u300C".concat(option.label, "\u300D\u5417\uFF1F"))];
                    case 1:
                        confirmed = _b.sent();
                        headerToolbarSchema = (0, cloneDeep_1.default)(ctx.headerToolbar);
                        if (confirmed) {
                            marked = (0, utils_1.deepRemove)(headerToolbarSchema, function (item) { return item.behavior === option.value; });
                            if (marked) {
                                options.splice(index, 1);
                                this.setState({ options: options }, function () {
                                    onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ headerToolbar: headerToolbarSchema });
                                });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUDToolbarControl.prototype.renderOption = function (item, index) {
        var _this = this;
        var _a;
        var _b = this.props, cx = _b.classnames, popOverContainer = _b.popOverContainer, env = _b.env;
        return (react_1.default.createElement("li", { key: index, className: cx('ae-CRUDConfigControl-list-item') },
            react_1.default.createElement(amis_ui_1.TooltipWrapper, { tooltip: {
                    content: item.label,
                    tooltipTheme: 'dark',
                    style: { fontSize: '12px' }
                }, container: popOverContainer || ((_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)), trigger: ['hover'], delay: 150 },
                react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-list-item-info') },
                    react_1.default.createElement("span", null, item.label))),
            react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-list-item-actions') },
                react_1.default.createElement(amis_1.Button, { level: "link", size: "sm", tooltip: {
                        content: '去编辑',
                        tooltipTheme: 'dark',
                        style: { fontSize: '12px' }
                    }, onClick: function () { return _this.handleEdit(item); } },
                    react_1.default.createElement(amis_1.Icon, { icon: "column-setting", className: "icon" })),
                react_1.default.createElement(amis_1.Button, { level: "link", size: "sm", onClick: function () { return _this.handleDelete(item, index); } },
                    react_1.default.createElement(amis_1.Icon, { icon: "column-delete", className: "icon" })))));
    };
    CRUDToolbarControl.prototype.renderHeader = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, cx = _c.classnames, render = _c.render, env = _c.env;
        var options = this.state.options;
        var actions = this.collection.concat();
        // options.forEach(item => {
        //   if (actions.includes(item.value)) {
        //     const idx = actions.indexOf(item.value);
        //     if (~idx) {
        //       actions.splice(idx, 1);
        //     }
        //   }
        // });
        var optionValues = options.map(function (item) { return item.value; });
        return (react_1.default.createElement("header", { className: cx('ae-CRUDConfigControl-header') },
            react_1.default.createElement("span", { className: cx('Form-label') }, "\u5DE5\u5177\u680F"),
            render('crud-toolbar-control-dropdown', {
                type: 'dropdown-button',
                closeOnClick: true,
                hideCaret: true,
                level: 'link',
                align: 'right',
                trigger: ['click'],
                popOverContainer: (_b = (_a = env.getModalContainer) !== null && _a !== void 0 ? _a : this.dom) !== null && _b !== void 0 ? _b : document.body,
                icon: 'column-add',
                label: '添加操作',
                className: cx('ae-CRUDConfigControl-dropdown'),
                disabledTip: {
                    content: '暂无可添加操作',
                    tooltipTheme: 'dark'
                },
                buttons: actions
                    .map(function (item) { return ({
                    type: 'button',
                    label: builder_1.DSFeature[item].label,
                    disabled: !!~optionValues.findIndex(function (op) { return op === item; }),
                    onClick: function () { return _this.handleAddAction(item); }
                }); })
                    .concat({
                    type: 'button',
                    label: '自定义按钮',
                    disabled: false,
                    onClick: function () { return _this.handleAddAction('custom'); }
                })
            })));
    };
    CRUDToolbarControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, ctx = _a.data;
        var _b = this.state, options = _b.options, loading = _b.loading;
        return (react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl') }, loading ? (react_1.default.createElement(amis_1.Spinner, { show: true, tip: "\u64CD\u4F5C\u751F\u6210\u4E2D", tipPlacement: "bottom", size: "sm", className: cx('flex') })) : (react_1.default.createElement(react_1.default.Fragment, null,
            this.renderHeader(),
            react_1.default.createElement("ul", { className: cx('ae-CRUDConfigControl-list') }, Array.isArray(options) && options.length > 0 ? (options.map(function (item, index) {
                return _this.renderOption(item, index);
            })) : (react_1.default.createElement("p", { className: cx("ae-CRUDConfigControl-placeholder") }, "\u6682\u65E0\u6570\u636E")))))));
    };
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDToolbarControl.prototype, "handleEdit", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CRUDToolbarControl.prototype, "handleAddAction", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CRUDToolbarControl.prototype, "handleDelete", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDToolbarControl.prototype, "renderOption", null);
    return CRUDToolbarControl;
}(react_1.default.Component));
exports.CRUDToolbarControl = CRUDToolbarControl;
var CRUDToolbarControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDToolbarControlRenderer, _super);
    function CRUDToolbarControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CRUDToolbarControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-crud-toolbar-control',
            renderLabel: false,
            wrap: false
        })
    ], CRUDToolbarControlRenderer);
    return CRUDToolbarControlRenderer;
}(CRUDToolbarControl));
exports.CRUDToolbarControlRenderer = CRUDToolbarControlRenderer;
