"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDataBindingControlRenderer = exports.SimpleDataBindingControl = exports.DataBindingControlRenderer = exports.DataBindingControl = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var amis_core_1 = require("amis-core");
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var match_sorter_1 = require("match-sorter");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var DataBindingControl = /** @class */ (function (_super) {
    tslib_1.__extends(DataBindingControl, _super);
    function DataBindingControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loading: false,
            hint: undefined
        };
        return _this;
    }
    DataBindingControl.prototype.handleConfirm = function (result) {
        var _a, _b;
        var _c = this.props, manager = _c.manager, data = _c.data, onChange = _c.onChange, onBulkChange = _c.onBulkChange, onBindingChange = _c.onBindingChange;
        if (result === null || result === void 0 ? void 0 : result.value) {
            onChange(result.value);
            onBulkChange && (onBindingChange === null || onBindingChange === void 0 ? void 0 : onBindingChange(result, onBulkChange));
            (_b = (_a = manager.config) === null || _a === void 0 ? void 0 : _a.dataBindingChange) === null || _b === void 0 ? void 0 : _b.call(_a, result.value, data, manager);
        }
    };
    DataBindingControl.prototype.handlePickerOpen = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, manager, node, schema, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, manager = _a.manager, node = _a.node;
                        this.setState({
                            loading: true,
                            schema: undefined
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, manager.getAvailableContextFields(node)];
                    case 2:
                        schema = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.setState({
                            loading: false,
                            hint: '加载可用字段失败，请联系管理员！'
                        });
                        return [2 /*return*/];
                    case 4:
                        this.setState({
                            loading: false,
                            hint: schema ? undefined : '暂无可绑定字段',
                            schema: schema !== null && schema !== void 0 ? schema : undefined
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DataBindingControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, cx = _a.classnames, result = _a.value, onChange = _a.onChange, multiple = _a.multiple, disabled = _a.disabled, render = _a.render;
        var _b = this.state, schema = _b.schema, loading = _b.loading, hint = _b.hint;
        return (react_1.default.createElement(amis_1.PickerContainer, { onPickerOpen: this.handlePickerOpen, className: className, title: "\u7ED1\u5B9A\u5B57\u6BB5", bodyRender: function (_a) {
                var value = _a.value, isOpened = _a.isOpened, onChange = _a.onChange;
                if (!isOpened) {
                    return null;
                }
                if (loading) {
                    return (react_1.default.createElement(amis_1.Spinner, { show: true, icon: "reload", spinnerClassName: "ae-DataBindingList-spinner" }));
                }
                if (hint) {
                    return react_1.default.createElement("p", { className: "ae-DataBindingList-hint" }, hint);
                }
                return render('content', schema, {
                    onSelect: onChange,
                    value: value ? value.value : result
                });
            }, value: result, onConfirm: this.handleConfirm }, function (_a) {
            var onClick = _a.onClick;
            return (react_1.default.createElement(amis_1.InputBox, { className: "ae-InputVariable", clearable: false, value: result, onChange: onChange, disabled: disabled },
                react_1.default.createElement("span", { onClick: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            onClick(e);
                            return [2 /*return*/];
                        });
                    }); } },
                    react_1.default.createElement(amis_1.Icon, { icon: "info", className: "icon cursor-pointer" }))));
        }));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DataBindingControl.prototype, "handleConfirm", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Promise)
    ], DataBindingControl.prototype, "handlePickerOpen", null);
    return DataBindingControl;
}(react_1.default.Component));
exports.DataBindingControl = DataBindingControl;
var DataBindingControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DataBindingControlRenderer, _super);
    function DataBindingControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataBindingControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-DataBindingControl'
        })
    ], DataBindingControlRenderer);
    return DataBindingControlRenderer;
}(DataBindingControl));
exports.DataBindingControlRenderer = DataBindingControlRenderer;
var SimpleDataBindingControl = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleDataBindingControl, _super);
    function SimpleDataBindingControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSearchDebounced = (0, debounce_1.default)(_this.handleSearch, 250, {
            trailing: true,
            leading: false
        });
        _this.state = {
            filteredFields: props.fields
        };
        return _this;
    }
    SimpleDataBindingControl.prototype.handleSearch = function (keywords) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.setState({
                    filteredFields: (0, match_sorter_1.matchSorter)(this.props.fields, keywords, {
                        keys: ['label', 'value', 'children']
                    })
                });
                return [2 /*return*/];
            });
        });
    };
    SimpleDataBindingControl.prototype.handleSelect = function () { };
    SimpleDataBindingControl.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, onSelect = _a.onSelect, isSelected = _a.isSelected;
        var filteredFields = this.state.filteredFields;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-DataBindingList', className) },
            react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-DataBindingList-searchBox') },
                react_1.default.createElement(amis_1.SearchBox, { mini: false, placeholder: '输入名称搜索', onSearch: this.handleSearchDebounced })),
            react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-DataBindingList-body') },
                react_1.default.createElement(amis_1.CollapseGroup, { className: (0, classnames_1.default)('ae-DataBindingList-collapseGroup'), defaultActiveKey: filteredFields.map(function (item) { return item.value || item.label; }), expandIcon: react_1.default.createElement(amis_1.Icon, { cx: classnames_1.default, icon: "fa fa-chevron-right expandIcon", className: "Icon" }), expandIconPosition: "right" }, filteredFields.map(function (item, index) { return (react_1.default.createElement(amis_1.Collapse, { className: (0, classnames_1.default)('ae-DataBindingList-collapse'), headingClassName: (0, classnames_1.default)('ae-DataBindingList-collapse-title'), bodyClassName: (0, classnames_1.default)('ae-DataBindingList-collapse-body'), propKey: item.value || item.label, key: item.value || item.label, header: react_1.default.createElement("span", null, item.label) }, Array.isArray(item.children) && item.children.length > 0 ? (item.children.map(function (childItem) {
                    var checked = isSelected
                        ? isSelected(childItem)
                        : childItem.value === value;
                    return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-DataBindingList-item', {
                            'is-active': checked
                        }), onClick: function () { return onSelect(childItem); }, key: childItem.value }, childItem.label));
                })) : (react_1.default.createElement("p", { className: (0, classnames_1.default)('ae-DataBindingList-hint') }, "\u6682\u65E0\u53EF\u7528\u5B57\u6BB5")))); })))));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", Promise)
    ], SimpleDataBindingControl.prototype, "handleSearch", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], SimpleDataBindingControl.prototype, "handleSelect", null);
    return SimpleDataBindingControl;
}(react_1.default.Component));
exports.SimpleDataBindingControl = SimpleDataBindingControl;
var SimpleDataBindingControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleDataBindingControlRenderer, _super);
    function SimpleDataBindingControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleDataBindingControlRenderer = tslib_1.__decorate([
        (0, amis_core_1.Renderer)({
            type: 'ae-SimpleDataBindingPanel'
        })
    ], SimpleDataBindingControlRenderer);
    return SimpleDataBindingControlRenderer;
}(SimpleDataBindingControl));
exports.SimpleDataBindingControlRenderer = SimpleDataBindingControlRenderer;
