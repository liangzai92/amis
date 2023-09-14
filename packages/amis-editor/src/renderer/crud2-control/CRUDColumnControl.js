"use strict";
/**
 * @file CRUDColumnControl
 * @desc 列配置控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDColumnControlRenderer = exports.CRUDColumnControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var sortablejs_1 = tslib_1.__importDefault(require("sortablejs"));
var amis_1 = require("amis");
var amis_ui_1 = require("amis-ui");
var amis_editor_core_1 = require("amis-editor-core");
var AddColumnModal_1 = tslib_1.__importDefault(require("./AddColumnModal"));
var CRUDColumnControl = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDColumnControl, _super);
    function CRUDColumnControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            options: [],
            loading: false,
            showAddModal: false
        };
        return _this;
    }
    CRUDColumnControl.prototype.componentDidMount = function () {
        this.dom = (0, react_dom_1.findDOMNode)(this);
        this.initOptions();
    };
    CRUDColumnControl.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.value !== this.props.value) {
            this.initOptions();
        }
    };
    CRUDColumnControl.prototype.transformOption = function (option) {
        var _a;
        if (option.name || option.type === 'operation') {
            return {
                label: typeof option.title === 'string'
                    ? option.title
                    : option.type === 'tpl' && typeof option.tpl === 'string'
                        ? option.tpl /** 处理 SchemaObject 的场景 */
                        : option.name,
                value: (_a = option.name) !== null && _a !== void 0 ? _a : option.key,
                /** 使用$$id用于定位 */
                nodeId: option.$$id,
                hidden: option.type === 'operation',
                pristine: option
            };
        }
        return false;
    };
    CRUDColumnControl.prototype.initOptions = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, manager, nodeId, builder, ctx, store, node, options, error_1, columns, result_1;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, manager = _b.manager, nodeId = _b.nodeId, builder = _b.builder, ctx = _b.data;
                        store = manager.store;
                        node = store.getNodeById(nodeId);
                        this.setState({ loading: true });
                        if (!(builder && builder.getCRUDListFields)) return [3 /*break*/, 5];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, builder.getCRUDListFields({
                                renderer: 'crud',
                                schema: node.schema,
                                inScaffold: false,
                                controlSettings: {
                                    fieldMapper: this.transformOption.bind(this)
                                }
                            })];
                    case 2:
                        options = _c.sent();
                        this.setState({ options: options });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        columns = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.columns;
                        result_1 = [];
                        columns.forEach(function (col) {
                            var option = _this.transformOption(col);
                            if (option !== false) {
                                result_1.push(option);
                            }
                        });
                        this.setState({ options: result_1 });
                        _c.label = 6;
                    case 6:
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUDColumnControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging();
        }
        this.drag = ref;
    };
    CRUDColumnControl.prototype.initDragging = function () {
        var _this = this;
        var cx = this.props.classnames;
        var dom = (0, react_dom_1.findDOMNode)(this);
        this.sortable = new sortablejs_1.default(dom.querySelector(".".concat(cx('ae-CRUDConfigControl-list'))), {
            group: 'CRUDColumnControlGroup',
            animation: 150,
            handle: ".".concat(cx('ae-CRUDConfigControl-list-item')),
            ghostClass: ".".concat(cx('ae-CRUDConfigControl-list-item--dragging')),
            onEnd: function (e) {
                if (e.newIndex === e.oldIndex ||
                    e.newIndex == null ||
                    e.oldIndex == null) {
                    return;
                }
                var parent = e.to;
                if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                var options = _this.state.options.concat();
                options[e.oldIndex] = options.splice(e.newIndex, 1, options[e.oldIndex])[0];
                _this.setState({ options: options }, function () { return _this.handleSort(); });
            }
        });
    };
    CRUDColumnControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    CRUDColumnControl.prototype.handleSort = function () {
        var onBulkChange = this.props.onBulkChange;
        var options = this.state.options.concat();
        onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ columns: options.map(function (item) { return item.pristine; }) });
    };
    CRUDColumnControl.prototype.handleEdit = function (item) {
        var _a, _b, _c;
        var _d = this.props, manager = _d.manager, node = _d.node;
        var columns = (_b = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.columns) !== null && _b !== void 0 ? _b : [];
        var idx = columns.findIndex(function (c) { return c.id === item.pristine.id; });
        if (!~idx) {
            amis_1.toast.warning("\u672A\u627E\u5230\u5BF9\u5E94\u5217\u300C".concat(item.label, "\u300D"));
            return;
        }
        // FIXME: 理论上用item.nodeId就可以，不知道为何会重新构建一次导致store中node.id更新
        manager.setActiveId((_c = columns[idx]) === null || _c === void 0 ? void 0 : _c.$$id);
    };
    /** 添加列 */
    CRUDColumnControl.prototype.handleAddColumn = function (type) {
        var onBulkChange = this.props.onBulkChange;
        var options = this.state.options.concat();
        var scaffold;
        switch (type) {
            case 'field':
                this.setState({
                    showAddModal: true,
                    addModalData: { colTypeLabel: '字段列', colType: type }
                });
                break;
            case 'empty':
                scaffold = {
                    title: '空列',
                    name: 'empty'
                };
                break;
            case 'container':
                scaffold = {
                    title: '容器',
                    name: 'container',
                    type: 'container',
                    style: {
                        position: 'static',
                        display: 'block'
                    },
                    wrapperBody: false,
                    body: []
                };
                break;
            case 'operation':
                this.setState({
                    showAddModal: true,
                    addModalData: { colTypeLabel: '操作列', colType: type }
                });
                break;
        }
        if (!scaffold) {
            return;
        }
        var columnSchema = (0, amis_editor_core_1.JSONPipeIn)(tslib_1.__assign({}, scaffold));
        options.push({
            label: columnSchema.title,
            value: columnSchema.name,
            nodeId: columnSchema.$$id,
            hidden: type === 'operation',
            pristine: columnSchema
        });
        this.setState({ options: options }, function () {
            onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ columns: options.map(function (item) { return item.pristine; }) });
        });
    };
    CRUDColumnControl.prototype.handleAddModalConfirm = function (scaffold) {
        var onBulkChange = this.props.onBulkChange;
        var options = this.state.options.concat();
        options.push({
            label: typeof scaffold.title === 'string' ? scaffold.title : scaffold.name,
            value: scaffold.name,
            nodeId: scaffold.$$id,
            hidden: scaffold.type === 'operation',
            pristine: scaffold
        });
        this.setState({ options: options }, function () {
            onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ columns: options.map(function (item) { return item.pristine; }) });
        });
    };
    CRUDColumnControl.prototype.handleAddModalClose = function () {
        this.setState({
            showAddModal: false,
            addModalData: undefined
        });
    };
    CRUDColumnControl.prototype.handleDelete = function (item, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, onBulkChange, env, options, confirmed;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onBulkChange = _a.onBulkChange, env = _a.env;
                        options = this.state.options;
                        return [4 /*yield*/, env.confirm("\u786E\u5B9A\u8981\u5220\u9664\u5217\u300C".concat(item.label, "\u300D\u5417\uFF1F"))];
                    case 1:
                        confirmed = _b.sent();
                        if (~index && confirmed) {
                            options.splice(index, 1);
                            this.setState({ options: options }, function () {
                                onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ columns: options.map(function (item) { return item.pristine; }) });
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CRUDColumnControl.prototype.renderOption = function (item, index) {
        var _this = this;
        var _a, _b, _c;
        var _d = this.props, cx = _d.classnames, ctx = _d.data, render = _d.render, popOverContainer = _d.popOverContainer, env = _d.env;
        return (react_1.default.createElement("li", { key: index, className: cx('ae-CRUDConfigControl-list-item', 'is-draggable') },
            react_1.default.createElement(amis_ui_1.TooltipWrapper, { tooltip: {
                    content: item.label,
                    tooltipTheme: 'dark',
                    style: { fontSize: '12px' }
                }, container: popOverContainer || ((_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)), trigger: ['hover'], delay: 150 },
                react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-list-item-info') },
                    react_1.default.createElement("span", null, item.label))),
            react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl-list-item-actions') },
                item.hidden || !((_b = item === null || item === void 0 ? void 0 : item.context) === null || _b === void 0 ? void 0 : _b.isCascadingField) ? null : (react_1.default.createElement(amis_1.Tag, { label: (_c = item === null || item === void 0 ? void 0 : item.context) === null || _c === void 0 ? void 0 : _c.modelLabel, displayMode: "normal", className: cx('ae-CRUDConfigControl-list-item-tag', 'ae-CRUDConfigControl-list-item-tag--cascading') })),
                react_1.default.createElement(amis_1.Button, { level: "link", size: "sm", tooltip: {
                        content: '去编辑',
                        tooltipTheme: 'dark',
                        style: { fontSize: '12px' }
                    }, onClick: function () { return _this.handleEdit(item); } },
                    react_1.default.createElement(amis_1.Icon, { icon: "column-setting", className: "icon" })),
                react_1.default.createElement(amis_1.Button, { level: "link", size: "sm", onClick: function () { return _this.handleDelete(item, index); } },
                    react_1.default.createElement(amis_1.Icon, { icon: "column-delete", className: "icon" })))));
    };
    CRUDColumnControl.prototype.renderHeader = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, cx = _c.classnames, ctx = _c.data, render = _c.render, env = _c.env;
        return (react_1.default.createElement("header", { className: cx('ae-CRUDConfigControl-header') },
            react_1.default.createElement("span", { className: cx('Form-label') }, "\u5217\u914D\u7F6E"),
            render('column-control-dropdown', {
                type: 'dropdown-button',
                closeOnClick: true,
                hideCaret: true,
                level: 'link',
                align: 'right',
                trigger: ['click'],
                popOverContainer: (_b = (_a = env.getModalContainer) !== null && _a !== void 0 ? _a : this.dom) !== null && _b !== void 0 ? _b : document.body,
                icon: 'column-add',
                label: '添加列',
                className: cx('ae-CRUDConfigControl-dropdown'),
                buttons: [
                    {
                        type: 'button',
                        label: '字段列',
                        onClick: function () { return _this.handleAddColumn('field'); }
                    },
                    {
                        type: 'button',
                        label: '空列',
                        onClick: function () { return _this.handleAddColumn('empty'); }
                    },
                    {
                        type: 'button',
                        label: '容器列',
                        onClick: function () { return _this.handleAddColumn('container'); }
                    },
                    {
                        type: 'button',
                        label: '操作列',
                        onClick: function () { return _this.handleAddColumn('operation'); }
                    }
                ]
            })));
    };
    CRUDColumnControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, ctx = _a.data, manager = _a.manager, builder = _a.builder;
        var _b = this.state, options = _b.options, loading = _b.loading, showAddModal = _b.showAddModal, addModalData = _b.addModalData;
        return (react_1.default.createElement("div", { className: cx('ae-CRUDConfigControl') },
            loading ? (react_1.default.createElement(amis_1.Spinner, { show: true, tip: "\u5B57\u6BB5\u52A0\u8F7D\u4E2D", tipPlacement: "bottom", size: "sm", className: cx('flex') })) : Array.isArray(options) && options.length > 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
                this.renderHeader(),
                react_1.default.createElement("ul", { className: cx('ae-CRUDConfigControl-list'), ref: this.dragRef }, options.map(function (item, index) {
                    return _this.renderOption(item, index);
                })))) : (react_1.default.createElement("ul", { className: cx('ae-CRUDConfigControl-list'), ref: this.dragRef },
                react_1.default.createElement("p", { className: cx("ae-CRUDConfigControl-placeholder") }, "\u6682\u65E0\u6570\u636E"))),
            showAddModal ? (react_1.default.createElement(AddColumnModal_1.default, { render: this.props.render, visible: showAddModal, initData: addModalData, ctx: ctx, manager: manager, builder: builder, onConfirm: this.handleAddModalConfirm, onClose: this.handleAddModalClose })) : null));
    };
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDColumnControl.prototype, "dragRef", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDColumnControl.prototype, "handleSort", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDColumnControl.prototype, "handleEdit", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDColumnControl.prototype, "handleAddColumn", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDColumnControl.prototype, "handleAddModalConfirm", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDColumnControl.prototype, "handleAddModalClose", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CRUDColumnControl.prototype, "handleDelete", null);
    tslib_1.__decorate([
        amis_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CRUDColumnControl.prototype, "renderOption", null);
    return CRUDColumnControl;
}(react_1.default.Component));
exports.CRUDColumnControl = CRUDColumnControl;
var CRUDColumnControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDColumnControlRenderer, _super);
    function CRUDColumnControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CRUDColumnControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-crud-column-control',
            renderLabel: false,
            wrap: false
        })
    ], CRUDColumnControlRenderer);
    return CRUDColumnControlRenderer;
}(CRUDColumnControl));
exports.CRUDColumnControlRenderer = CRUDColumnControlRenderer;
