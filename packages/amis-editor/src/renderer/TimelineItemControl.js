"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineItemControlRenderer = void 0;
var tslib_1 = require("tslib");
/**
 * @file Timeline组件节点的可视化编辑控件
 */
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var uniqBy_1 = tslib_1.__importDefault(require("lodash/uniqBy"));
var sortablejs_1 = tslib_1.__importDefault(require("sortablejs"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var TimelineItemControl = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineItemControl, _super);
    function TimelineItemControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            items: props.value,
            api: props.data.source,
            source: props.data.source ? 'api' : 'custom'
        };
        return _this;
    }
    /**
     * 切换选项类型
     */
    TimelineItemControl.prototype.handleSourceChange = function (source) {
        this.setState({ source: source }, this.onChange);
    };
    TimelineItemControl.prototype.handleAPIChange = function (source) {
        this.setState({ api: source }, this.onChange);
    };
    TimelineItemControl.prototype.onChange = function () {
        var source = this.state.source;
        var onBulkChange = this.props.onBulkChange;
        var data = {
            source: undefined,
            items: undefined
        };
        if (source === 'custom') {
            var items = this.state.items;
            data.items = items.map(function (item) { return (tslib_1.__assign({}, item)); });
        }
        if (source === 'api') {
            var _a = this.state, items = _a.items, api = _a.api;
            data.items = items.map(function (item) { return (tslib_1.__assign({}, item)); });
            data.source = api;
        }
        if (source === 'variable') {
            var _b = this.state, items = _b.items, api = _b.api;
            data.items = items.map(function (item) { return (tslib_1.__assign({}, item)); });
            data.source = api;
        }
        onBulkChange && onBulkChange(data);
    };
    TimelineItemControl.prototype.toggleEdit = function (values, index) {
        var items = this.state.items.concat();
        items[index] = values;
        this.setState({ items: items }, this.onChange);
    };
    TimelineItemControl.prototype.toggleCopy = function (index) {
        var items = this.state.items;
        var res = items.concat(items[index]);
        this.setState({ items: res }, this.onChange);
    };
    TimelineItemControl.prototype.toggleDelete = function (index) {
        var items = this.state.items.concat();
        items.splice(index, 1);
        this.setState({ items: items }, this.onChange);
    };
    TimelineItemControl.prototype.handleEditLabel = function (index, value, attr) {
        var _a;
        var _this = this;
        var items = this.state.items.concat();
        items.splice(index, 1, tslib_1.__assign(tslib_1.__assign({}, items[index]), (_a = {}, _a[attr] = value, _a)));
        this.setState({ items: items }, function () { return _this.onChange(); });
    };
    TimelineItemControl.prototype.handleBatchAdd = function (values, action) {
        var _this = this;
        var items = this.state.items.concat();
        var addedOptions = values.batchItems
            .split('\n')
            .map(function (option) {
            var item = option.trim();
            if (~item.indexOf(' ')) {
                var _a = tslib_1.__read(item.split(' '), 2), time = _a[0], title = _a[1];
                return { time: time.trim(), title: title.trim() };
            }
            return { label: item, value: item };
        });
        var newOptions = (0, uniqBy_1.default)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(items), false), tslib_1.__read(addedOptions), false), 'time');
        this.setState({ items: newOptions }, function () { return _this.onChange(); });
    };
    TimelineItemControl.prototype.handleAdd = function (values) {
        var items = this.state.items;
        var itemsTemp = items.concat(tslib_1.__assign({}, values));
        this.setState({ items: itemsTemp }, this.onChange);
    };
    TimelineItemControl.prototype.buildAddOrEditSchema = function (props) {
        var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
        return [
            {
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'time',
                required: true,
                placeholder: '请输入时间',
                label: '时间',
                value: props === null || props === void 0 ? void 0 : props['time']
            },
            {
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'title',
                required: true,
                placeholder: '请输入标题',
                label: '标题',
                value: props === null || props === void 0 ? void 0 : props['title']
            },
            {
                type: 'input-color',
                name: 'color',
                value: props === null || props === void 0 ? void 0 : props['color'],
                placeholder: '请输入',
                label: '颜色'
            },
            (0, amis_editor_core_3.getSchemaTpl)('icon', {
                value: props === null || props === void 0 ? void 0 : props['icon'],
                placeholder: '请输入',
                clearable: true,
                description: '',
                className: 'fix-icon-picker-overflow',
                pipeIn: function (value) { return value === null || value === void 0 ? void 0 : value.icon; },
                pipeOut: function (value) {
                    if (value) {
                        return {
                            type: 'icon',
                            vendor: '',
                            icon: value
                        };
                    }
                    return undefined;
                }
            })
        ];
    };
    TimelineItemControl.prototype.buildBatchAddSchema = function () {
        return {
            type: 'action',
            actionType: 'dialog',
            label: '批量添加',
            dialog: {
                title: '批量添加选项',
                headerClassName: 'font-bold',
                closeOnEsc: true,
                closeOnOutside: false,
                showCloseButton: true,
                body: [
                    {
                        type: 'alert',
                        level: 'warning',
                        body: [
                            {
                                type: 'tpl',
                                tpl: '每个选项单列一行，将所有值不重复的项加为新的选项;<br/>每行可通过空格来分别设置time和title,例："2022-06-23 期末补考"'
                            }
                        ],
                        showIcon: true,
                        className: 'mb-2.5'
                    },
                    {
                        type: 'form',
                        wrapWithPanel: false,
                        mode: 'normal',
                        wrapperComponent: 'div',
                        resetAfterSubmit: true,
                        autoFocus: true,
                        preventEnterSubmit: true,
                        horizontal: {
                            left: 0,
                            right: 12
                        },
                        body: [
                            {
                                name: 'batchItems',
                                type: 'textarea',
                                label: '',
                                placeholder: '请输入选项内容',
                                trimContents: true,
                                minRows: 10,
                                maxRows: 50,
                                required: true
                            }
                        ]
                    }
                ]
            }
        };
    };
    TimelineItemControl.prototype.buildAddSchema = function () {
        return {
            type: 'action',
            actionType: 'dialog',
            label: '添加选项',
            active: true,
            dialog: {
                title: '节点配置',
                headerClassName: 'font-bold',
                closeOnEsc: true,
                closeOnOutside: false,
                showCloseButton: true,
                body: [
                    {
                        type: 'form',
                        wrapWithPanel: false,
                        wrapperComponent: 'div',
                        resetAfterSubmit: true,
                        autoFocus: true,
                        preventEnterSubmit: true,
                        horizontal: {
                            justify: true,
                            left: 3,
                            right: 9
                        },
                        body: this.buildAddOrEditSchema()
                    }
                ]
            }
        };
    };
    TimelineItemControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging();
        }
        this.drag = ref;
    };
    TimelineItemControl.prototype.initDragging = function () {
        var _this = this;
        var dom = (0, react_dom_1.findDOMNode)(this);
        this.sortable = new sortablejs_1.default(dom.querySelector('.ae-TimelineItemControl-content'), {
            group: 'TimelineItemControlGroup',
            animation: 150,
            handle: '.ae-TimelineItemControlItem-dragBar',
            ghostClass: 'ae-TimelineItemControlItem--dragging',
            onEnd: function (e) {
                // 没有移动
                if (e.newIndex === e.oldIndex) {
                    return;
                }
                // 换回来
                var parent = e.to;
                if (e.newIndex < e.oldIndex &&
                    e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
                }
                else if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                var items = _this.state.items.concat();
                items[e.oldIndex] = items.splice(e.newIndex, 1, items[e.oldIndex])[0];
                _this.setState({ items: items }, function () { return _this.onChange(); });
            }
        });
    };
    TimelineItemControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    TimelineItemControl.prototype.renderHeader = function () {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, label = _b.label, labelRemark = _b.labelRemark, useMobileUI = _b.useMobileUI, env = _b.env, popOverContainer = _b.popOverContainer;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        var source = this.state.source;
        var optionSourceList = [
            {
                label: '自定义选项',
                value: 'custom'
            },
            {
                label: '接口获取',
                value: 'api'
            },
            {
                label: '上下文变量',
                value: 'variable'
            }
        ].map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), { onClick: function () { return _this.handleSourceChange(item.value); } })); });
        return (react_1.default.createElement("header", { className: "ae-TimelineItemControl-header" },
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
    TimelineItemControl.prototype.renderOption = function (props) {
        var _this = this;
        var time = props.time, title = props.title, index = props.index;
        var delDisabled = !(this.state.items.length > 2);
        var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
        return (react_1.default.createElement("li", { className: "ae-TimelineItemControlItem", key: index },
            react_1.default.createElement("div", { className: "ae-TimelineItemControlItem-Main" },
                react_1.default.createElement("a", { className: "ae-TimelineItemControlItem-dragBar" },
                    react_1.default.createElement(amis_1.Icon, { icon: "drag-bar", className: "icon" })),
                (0, amis_1.render)({
                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                    className: 'ae-TimelineItemControlItem-input',
                    value: time,
                    placeholder: '请输入显示时间',
                    clearable: false,
                    onChange: function (value) {
                        return _this.handleEditLabel(index, value, 'time');
                    }
                }),
                (0, amis_1.render)({
                    type: 'dropdown-button',
                    className: 'ae-TimelineItemControlItem-dropdown',
                    btnClassName: 'px-2',
                    icon: 'fa fa-ellipsis-h',
                    hideCaret: true,
                    closeOnClick: true,
                    align: 'right',
                    menuClassName: 'ae-TimelineItemControlItem-ulmenu',
                    buttons: [
                        {
                            type: 'action',
                            className: 'ae-TimelineItemControlItem-action',
                            label: '编辑',
                            actionType: 'dialog',
                            dialog: {
                                title: '节点配置',
                                headerClassName: 'font-bold',
                                closeOnEsc: true,
                                closeOnOutside: false,
                                showCloseButton: true,
                                body: [
                                    {
                                        type: 'form',
                                        wrapWithPanel: false,
                                        wrapperComponent: 'div',
                                        resetAfterSubmit: true,
                                        autoFocus: true,
                                        preventEnterSubmit: true,
                                        horizontal: {
                                            justify: true,
                                            left: 3,
                                            right: 9
                                        },
                                        body: this.buildAddOrEditSchema(props),
                                        onSubmit: function (e) { return _this.toggleEdit(e, index); }
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            className: 'ae-TimelineItemControlItem-action',
                            label: '复制',
                            onClick: function () { return _this.toggleCopy(index); }
                        },
                        {
                            type: 'button',
                            className: 'ae-TimelineItemControlItem-action',
                            label: '删除',
                            disabled: delDisabled,
                            onClick: function () { return _this.toggleDelete(index); }
                        }
                    ]
                }, {
                    popOverContainer: null // amis 渲染挂载节点会使用 this.target
                })),
            react_1.default.createElement("div", { className: "ae-TimelineItemControlItem-Main" }, (0, amis_1.render)({
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                className: 'ae-TimelineItemControlItem-input-title',
                value: title,
                clearable: false,
                placeholder: '请输入标题',
                onChange: function (value) {
                    return _this.handleEditLabel(index, value, 'title');
                }
            }))));
    };
    TimelineItemControl.prototype.renderApiPanel = function () {
        var render = this.props.render;
        var _a = this.state, source = _a.source, api = _a.api;
        if (source !== 'api') {
            return null;
        }
        return render('api', (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
            label: '接口',
            name: 'source',
            className: 'ae-ExtendMore',
            visibleOn: 'data.autoComplete !== false',
            value: api,
            onChange: this.handleAPIChange
        }));
    };
    TimelineItemControl.prototype.render = function () {
        var _this = this;
        var _a = this.state, source = _a.source, items = _a.items;
        var _b = this.props, render = _b.render, className = _b.className;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-TimelineItemControl', className) },
            this.renderHeader(),
            source === 'custom' ? (react_1.default.createElement("div", { className: "ae-TimelineItemControl-wrapper" },
                Array.isArray(items) && items.length ? (react_1.default.createElement("ul", { className: "ae-TimelineItemControl-content", ref: this.dragRef }, items.map(function (item, index) {
                    return _this.renderOption(tslib_1.__assign(tslib_1.__assign({}, item), { index: index }));
                }))) : (react_1.default.createElement("div", { className: "ae-TimelineItemControl-placeholder" }, "\u65E0\u9009\u9879")),
                react_1.default.createElement("div", { className: "ae-TimelineItemControl-footer" },
                    (0, amis_1.render)(this.buildAddSchema(), {
                        onSubmit: this.handleAdd
                    }),
                    (0, amis_1.render)(this.buildBatchAddSchema(), {
                        onSubmit: this.handleBatchAdd
                    })))) : null,
            source === 'variable'
                ? render('variable', (0, amis_editor_core_3.getSchemaTpl)('sourceBindControl', {
                    label: false,
                    className: 'ae-ExtendMore'
                }), {
                    onChange: this.handleAPIChange
                })
                : null,
            this.renderApiPanel()));
    };
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimelineItemControl.prototype, "handleSourceChange", null);
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimelineItemControl.prototype, "handleAPIChange", null);
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimelineItemControl.prototype, "toggleEdit", null);
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimelineItemControl.prototype, "handleBatchAdd", null);
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimelineItemControl.prototype, "handleAdd", null);
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TimelineItemControl.prototype, "dragRef", null);
    return TimelineItemControl;
}(react_1.default.Component));
exports.default = TimelineItemControl;
var TimelineItemControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineItemControlRenderer, _super);
    function TimelineItemControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineItemControlRenderer.prototype.render = function () {
        return react_1.default.createElement(TimelineItemControl, tslib_1.__assign({}, this.props));
    };
    TimelineItemControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'ae-timelineItemControl', renderLabel: false })
    ], TimelineItemControlRenderer);
    return TimelineItemControlRenderer;
}(react_1.default.Component));
exports.TimelineItemControlRenderer = TimelineItemControlRenderer;
