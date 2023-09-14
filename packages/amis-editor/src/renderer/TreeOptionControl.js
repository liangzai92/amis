"use strict";
/**
 * @file 组件选项组件的可视化编辑控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeOptionControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var get_1 = tslib_1.__importDefault(require("lodash/get"));
var set_1 = tslib_1.__importDefault(require("lodash/set"));
var sortablejs_1 = tslib_1.__importDefault(require("sortablejs"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var defaultOption = {
    label: '',
    value: ''
};
var TreeOptionControl = /** @class */ (function (_super) {
    tslib_1.__extends(TreeOptionControl, _super);
    function TreeOptionControl(props) {
        var _this = _super.call(this, props) || this;
        _this.internalProps = ['checked', 'editing'];
        var _a = props.data || {}, source = _a.source, labelField = _a.labelField, valueField = _a.valueField, showIconField = _a.showIconField, iconField = _a.iconField;
        _this.state = {
            options: _this.transformOptions(props),
            api: source,
            labelField: labelField,
            valueField: valueField,
            iconField: showIconField ? iconField : undefined,
            source: source
                ? /\$\{(.*?)\}/g.test(source)
                    ? 'variable'
                    : 'api'
                : 'custom',
            modalVisible: false
        };
        _this.sortables = [];
        return _this;
    }
    TreeOptionControl.prototype.transformOptions = function (props) {
        var options = props.data.options;
        if (!options || !options.length) {
            return [tslib_1.__assign({}, defaultOption)];
        }
        return options;
    };
    /**
     * 处理下未设置value的情况
     */
    TreeOptionControl.prototype.pretreatOptions = function (options) {
        var _this = this;
        if (!Array.isArray(options)) {
            return [];
        }
        return options.map(function (option) {
            if (option.children && option.children.length) {
                option.children = _this.pretreatOptions(option.children);
            }
            option.value =
                option.value == null || option.value === ''
                    ? option.label
                    : option.value;
            return option;
        });
    };
    /**
     * 更新options字段的统一出口
     */
    TreeOptionControl.prototype.onChange = function () {
        var _a = this.state, source = _a.source, api = _a.api, labelField = _a.labelField, valueField = _a.valueField, iconField = _a.iconField;
        var onBulkChange = this.props.onBulkChange;
        var data = {
            source: undefined,
            options: undefined,
            labelField: undefined,
            valueField: undefined,
            iconField: undefined
        };
        if (source === 'custom') {
            var options = this.state.options.concat();
            data.options = this.pretreatOptions(options);
        }
        if (source === 'api' || source === 'apicenter' || source === 'variable') {
            data.source = api;
            data.labelField = labelField || undefined;
            data.valueField = valueField || undefined;
            data.iconField = iconField;
        }
        onBulkChange && onBulkChange(data);
        return;
    };
    /**
     * 切换选项类型
     */
    TreeOptionControl.prototype.handleSourceChange = function (source) {
        this.setState({ api: '', source: source }, this.onChange);
    };
    TreeOptionControl.prototype.renderHeader = function () {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, label = _b.label, labelRemark = _b.labelRemark, useMobileUI = _b.useMobileUI, env = _b.env, popOverContainer = _b.popOverContainer, hasApiCenter = _b.hasApiCenter;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        var source = this.state.source;
        var optionSourceList = tslib_1.__spreadArray(tslib_1.__spreadArray([
            {
                label: '自定义选项',
                value: 'custom'
            },
            {
                label: '外部接口',
                value: 'api'
            }
        ], tslib_1.__read((hasApiCenter ? [{ label: 'API中心', value: 'apicenter' }] : [])), false), [
            {
                label: '上下文变量',
                value: 'variable'
            }
        ], false).map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), { onClick: function () { return _this.handleSourceChange(item.value); } })); });
        return (react_1.default.createElement("header", { className: "ae-TreeOptionControl-header" },
            react_1.default.createElement("label", { className: (0, classnames_1.default)("".concat(classPrefix, "Form-label")) },
                label || '',
                labelRemark
                    ? render('label-remark', {
                        type: 'remark',
                        icon: labelRemark.icon || 'warning-mark',
                        tooltip: labelRemark,
                        className: (0, classnames_1.default)("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
                        useMobileUI: useMobileUI,
                        container: popOverContainer || env.getModalContainer
                    })
                    : null),
            react_1.default.createElement("div", null, render('validation-control-addBtn', {
                type: 'dropdown-button',
                level: 'link',
                size: 'sm',
                label: '${selected}',
                align: 'right',
                closeOnClick: true,
                closeOnOutside: true,
                buttons: optionSourceList
            }, {
                popOverContainer: null,
                data: {
                    selected: optionSourceList.find(function (item) { return item.value === source; })
                        .label
                }
            }))));
    };
    TreeOptionControl.prototype.handleEditLabelOrValue = function (value, path, key) {
        var _this = this;
        var options = (0, cloneDeep_1.default)(this.state.options);
        var nodePath = this.getNodePath(path).path;
        (0, set_1.default)(options, "".concat(nodePath, ".").concat(key), value);
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.handleDelete = function (pathStr, index) {
        var _this = this;
        var _a, _b;
        var options = (0, cloneDeep_1.default)(this.state.options);
        if (options.length === 1) {
            amis_1.toast.warning('至少保留一个节点', { closeButton: true });
            return;
        }
        var path = pathStr.split('-');
        if (path.length === 1) {
            options.splice(index, 1);
        }
        else {
            var parentPath = this.getNodePath(pathStr).parentPath;
            var parentNode = (0, get_1.default)(options, parentPath, {});
            (_a = parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) === null || _a === void 0 ? void 0 : _a.splice(index, 1);
            if (((_b = parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                // 去除僵尸子节点
                delete parentNode.children;
            }
            (0, set_1.default)(options, parentPath, parentNode);
        }
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.getNodePath = function (pathStr) {
        var pathArr = pathStr.split('-');
        if (pathArr.length === 1) {
            return {
                path: pathArr,
                parentPath: ''
            };
        }
        var path = "[".concat(pathArr.join('].children['), "]");
        pathArr = pathArr.slice(0, pathArr.length - 1);
        var parentPath = "[".concat(pathArr.join('].children['), "]");
        return {
            path: path,
            parentPath: parentPath
        };
    };
    TreeOptionControl.prototype.addOption = function (pathStr) {
        var _this = this;
        var _a;
        var options = (0, cloneDeep_1.default)(this.state.options);
        var path = pathStr.split('-');
        if (path.length === 1) {
            options.splice(+path[0] + 1, 0, tslib_1.__assign({}, defaultOption)); // 加在后面一项
        }
        else {
            var index = path[path.length - 1];
            var parentPath = this.getNodePath(pathStr).parentPath;
            var parentNode = (0, get_1.default)(options, parentPath, {});
            (_a = parentNode.children) === null || _a === void 0 ? void 0 : _a.splice(+index + 1, 0, tslib_1.__assign({}, defaultOption));
            (0, set_1.default)(options, parentPath, parentNode);
        }
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.addChildOption = function (pathStr) {
        var _this = this;
        if (pathStr.split('-').length >= 6) {
            amis_1.toast.warning('层级过深，建议使用【接口获取】管理选项', {
                closeButton: true
            });
            return;
        }
        var options = (0, cloneDeep_1.default)(this.state.options);
        var path = this.getNodePath(pathStr).path;
        var node = (0, get_1.default)(options, path) || [];
        if (node.children) {
            node.children.push(tslib_1.__assign({}, defaultOption));
        }
        else {
            node.children = [tslib_1.__assign({}, defaultOption)];
        }
        (0, set_1.default)(options, path, node);
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.hideModal = function (notResetOptions) {
        this.setState({ modalVisible: false });
        if (!notResetOptions) {
            this.setState({ options: this.transformOptions(this.props) });
        }
    };
    TreeOptionControl.prototype.renderOptions = function (option, key, indexes) {
        var _this = this;
        var render = this.props.render;
        var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
        var path = indexes.join('-');
        if (option.children && option.children.length) {
            var parent_1 = (0, cloneDeep_1.default)(option);
            delete parent_1.children;
            return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-TreeOptionControlItem-parent'), key: "parent".concat(path).concat(key).concat(option.label) },
                this.renderOptions(parent_1, key, indexes),
                react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-TreeOptionControlItem-son'), key: "son".concat(path).concat(key).concat(option.label), "data-level": path }, option.children.map(function (option, key) {
                    return _this.renderOptions(option, key, indexes.concat(key));
                }))));
        }
        return (react_1.default.createElement("div", { className: "ae-TreeOptionControlItem", key: "child".concat(path).concat(key).concat(option.label), "data-path": path },
            react_1.default.createElement("a", { className: "ae-TreeOptionControlItem-dragBar" },
                react_1.default.createElement(amis_1.Icon, { icon: "drag-bar", className: "icon" })),
            i18nEnabled ? ((0, amis_1.render)({
                type: 'input-text-i18n',
                className: 'ae-TreeOptionControlItem-input-label',
                value: option.label,
                placeholder: '选项名称',
                clearable: false,
                onBlur: function (event) {
                    _this.handleEditLabelOrValue(event.target.value, path, 'label');
                },
                onI18nChange: function (value) {
                    _this.handleEditLabelOrValue(value, path, 'label');
                }
            })) : (react_1.default.createElement(amis_1.InputBox, { className: "ae-TreeOptionControlItem-input-label", value: option.label, placeholder: "\u9009\u9879\u540D\u79F0", clearable: false, onBlur: function (event) {
                    _this.handleEditLabelOrValue(event.target.value, path, 'label');
                } })),
            react_1.default.createElement(amis_1.InputBox, { className: "ae-TreeOptionControlItem-input-value", value: option.value, placeholder: "\u9009\u9879\u503C", clearable: false, onBlur: function (event) {
                    _this.handleEditLabelOrValue(event.target.value, path, 'value');
                } }),
            react_1.default.createElement("div", { className: "ae-TreeOptionControlItem-btns" },
                render('dropdown', {
                    type: 'dropdown-button',
                    className: 'ae-TreeOptionControlItem-dropdown fa-sm',
                    btnClassName: 'px-2',
                    icon: 'add',
                    hideCaret: true,
                    closeOnClick: true,
                    trigger: 'hover',
                    align: 'right',
                    menuClassName: 'ae-TreeOptionControlItem-ulmenu',
                    buttons: [
                        {
                            type: 'button',
                            className: 'ae-OptionControlItem-action',
                            label: '添加选项',
                            onClick: function () {
                                _this.addOption(path);
                            }
                        },
                        {
                            type: 'button',
                            className: 'ae-OptionControlItem-action',
                            label: '添加子选项',
                            onClick: function () {
                                _this.addChildOption(path);
                            }
                        }
                    ]
                }, {
                    popOverContainer: null // amis 渲染挂载节点会使用 this.target
                }),
                react_1.default.createElement(amis_1.Button, { size: "sm", onClick: function () {
                        _this.handleDelete(path, key);
                    } },
                    react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "delete-bold-btn" })))));
    };
    TreeOptionControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.drag = ref;
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging(true);
        }
    };
    TreeOptionControl.prototype.rereshBindDrag = function () {
        if (this.drag) {
            this.destroyDragging();
            this.initDragging();
        }
    };
    TreeOptionControl.prototype.initDragging = function () {
        var _this = this;
        var _a;
        var rootSortable = new sortablejs_1.default(this.drag, {
            group: 'TreeOptionControlGroup',
            animation: 150,
            handle: '.ae-TreeOptionControlItem-dragBar',
            ghostClass: 'ae-TreeOptionControlItem-dragging',
            onEnd: function (e) {
                var _a;
                var options = (0, cloneDeep_1.default)(_this.state.options);
                var oldIndex = e.oldIndex, newIndex = e.newIndex;
                _a = tslib_1.__read([
                    options[oldIndex],
                    options[newIndex]
                ], 2), options[newIndex] = _a[0], options[oldIndex] = _a[1];
                _this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
            },
            onMove: function (e) {
                var from = e.from, to = e.to;
                // 暂时不支持跨级拖拽
                return from.dataset.level === to.dataset.level;
            }
        });
        this.sortables.push(rootSortable);
        var parents = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.ae-TreeOptionControlItem-son');
        if (!parents) {
            return;
        }
        Array.from(parents).forEach(function (parent) {
            var sortable = new sortablejs_1.default(parent, {
                group: 'TreeOptionControlGroup',
                animation: 150,
                handle: '.ae-TreeOptionControlItem-dragBar',
                ghostClass: 'ae-TreeOptionControlItem-dragging',
                // fallbackOnBody: true,
                onEnd: function (e) {
                    var _a;
                    var item = e.item, oldIndex = e.oldIndex, newIndex = e.newIndex;
                    var options = (0, cloneDeep_1.default)(_this.state.options);
                    var nodePath = item.dataset.path;
                    if (!nodePath) {
                        return;
                    }
                    var parentPath = _this.getNodePath(nodePath).parentPath;
                    var children = (0, get_1.default)(options, "".concat(parentPath, ".children")) || [];
                    if (children) {
                        _a = tslib_1.__read([
                            children[newIndex],
                            children[oldIndex]
                        ], 2), children[oldIndex] = _a[0], children[newIndex] = _a[1];
                        (0, set_1.default)(options, "".concat(parentPath, ".children"), children);
                        _this.setState({ options: options });
                    }
                },
                onMove: function (e) {
                    var from = e.from, to = e.to;
                    // 暂时不支持跨级拖拽
                    return from.dataset.level === to.dataset.level;
                }
            });
            _this.sortables.push(sortable);
        });
    };
    TreeOptionControl.prototype.destroyDragging = function (destroyRoot) {
        this.sortables.forEach(function (sortable) {
            sortable === null || sortable === void 0 ? void 0 : sortable.destroy();
        });
        this.sortables = [];
        destroyRoot && (this.drag = null);
    };
    TreeOptionControl.prototype.renderModal = function () {
        var _this = this;
        var _a = this.state, modalVisible = _a.modalVisible, options = _a.options;
        return (react_1.default.createElement(amis_1.Modal, { className: "ae-TreeOptionControl-Modal", show: modalVisible, onHide: function () {
                _this.hideModal();
            } },
            react_1.default.createElement(amis_1.Modal.Header, { onClose: function () {
                    _this.hideModal();
                } }, "\u9009\u9879\u7BA1\u7406"),
            react_1.default.createElement(amis_1.Modal.Body, null,
                react_1.default.createElement("div", { className: "ae-TreeOptionControl-content", ref: this.dragRef }, options.map(function (option, key) {
                    return _this.renderOptions(option, key, [key]);
                }))),
            react_1.default.createElement(amis_1.Modal.Footer, null,
                react_1.default.createElement(amis_1.Button, { onClick: function () {
                        _this.hideModal();
                    } }, "\u53D6\u6D88"),
                react_1.default.createElement(amis_1.Button, { level: "primary", onClick: function () {
                        _this.onChange();
                        _this.hideModal(true);
                    } }, "\u786E\u8BA4"))));
    };
    TreeOptionControl.prototype.handleAPIChange = function (source) {
        this.setState({ api: source }, this.onChange);
    };
    TreeOptionControl.prototype.handleLableFieldChange = function (labelField) {
        this.setState({ labelField: labelField }, this.onChange);
    };
    TreeOptionControl.prototype.handleValueFieldChange = function (valueField) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
        this.setState({ valueField: valueField }, this.onChange);
    };
    TreeOptionControl.prototype.handleIconFieldChange = function (iconField) {
        this.setState({ iconField: iconField }, this.onChange);
    };
    TreeOptionControl.prototype.renderApiPanel = function () {
        var _a = this.props, render = _a.render, _b = _a.showIconField, showIconField = _b === void 0 ? false : _b;
        var _c = this.state, source = _c.source, api = _c.api, labelField = _c.labelField, valueField = _c.valueField, iconField = _c.iconField;
        return render('api', (0, amis_editor_core_2.getSchemaTpl)('apiControl', {
            label: '接口',
            name: 'source',
            className: 'ae-ExtendMore',
            visibleOn: 'data.autoComplete !== false',
            value: api,
            onChange: this.handleAPIChange,
            sourceType: source,
            footer: [
                {
                    label: (0, amis_editor_core_2.tipedLabel)('显示字段', '选项文本对应的数据字段，多字段合并请通过模板配置'),
                    type: 'input-text',
                    name: 'labelField',
                    value: labelField,
                    placeholder: '选项文本对应的字段',
                    onChange: this.handleLableFieldChange
                },
                {
                    label: '值字段',
                    type: 'input-text',
                    name: 'valueField',
                    value: valueField,
                    placeholder: '值对应的字段',
                    onChange: this.handleValueFieldChange
                },
                {
                    type: 'input-text',
                    label: '图标字段',
                    name: 'iconField',
                    value: iconField,
                    placeholder: '图标对应的字段',
                    visible: showIconField,
                    onChange: this.handleIconFieldChange
                }
            ]
        }));
    };
    TreeOptionControl.prototype.render = function () {
        var _this = this;
        var source = this.state.source;
        var _a = this.props, className = _a.className, render = _a.render;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-TreeOptionControl', className) },
            this.renderHeader(),
            source === 'custom' ? (react_1.default.createElement("div", { className: "ae-TreeOptionControl-wrapper" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(amis_1.Button, { block: true, onClick: function () {
                            _this.setState({
                                modalVisible: true
                            });
                        } }, "\u9009\u9879\u7BA1\u7406"),
                    this.renderModal()))) : null,
            source === 'api' || source === 'apicenter'
                ? this.renderApiPanel()
                : null,
            source === 'variable'
                ? render('variable', (0, amis_editor_core_2.getSchemaTpl)('sourceBindControl', {
                    label: false,
                    className: 'ae-ExtendMore'
                }), {
                    onChange: this.handleAPIChange
                })
                : null));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleSourceChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleDelete", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "getNodePath", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "addOption", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "addChildOption", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "hideModal", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Array]),
        tslib_1.__metadata("design:returntype", Object)
    ], TreeOptionControl.prototype, "renderOptions", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "dragRef", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "destroyDragging", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "renderModal", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleAPIChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleLableFieldChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleValueFieldChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleIconFieldChange", null);
    return TreeOptionControl;
}(react_1.default.Component));
exports.default = TreeOptionControl;
var TreeOptionControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TreeOptionControlRenderer, _super);
    function TreeOptionControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeOptionControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-treeOptionControl',
            renderLabel: false
        })
    ], TreeOptionControlRenderer);
    return TreeOptionControlRenderer;
}(TreeOptionControl));
exports.TreeOptionControlRenderer = TreeOptionControlRenderer;
