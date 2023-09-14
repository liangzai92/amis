"use strict";
/**
 * @file 开关 + 更多编辑组合控件
 * 使用时需关注所有的配置项是一个object还是整个data中，可使用bulk来区分
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchMoreRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var fromPairs_1 = tslib_1.__importDefault(require("lodash/fromPairs"));
var some_1 = tslib_1.__importDefault(require("lodash/some"));
var SwitchMore = /** @class */ (function (_super) {
    tslib_1.__extends(SwitchMore, _super);
    function SwitchMore(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this.initState();
        return _this;
    }
    SwitchMore.prototype.initState = function () {
        var _a = this.props, data = _a.data, value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, name = _a.name, bulk = _a.bulk, hiddenOnDefault = _a.hiddenOnDefault, isChecked = _a.isChecked;
        var checked = false;
        var show = false;
        if (isChecked && typeof isChecked === 'function') {
            checked = isChecked({ data: data, value: value, name: name, bulk: bulk });
            show = checked;
        }
        // 这个开关 无具体属性对应
        else if (!name) {
            // 子表单项是组件根属性，遍历看是否有值
            if (bulk) {
                var formNames = this.getFormItemNames();
                checked = (0, some_1.default)(formNames, function (key) { return data[key] !== undefined; });
                show = checked;
            }
            else {
                checked = value === trueValue;
            }
        }
        else {
            checked = !!value === trueValue;
        }
        // 开关有属性对应
        return {
            checked: checked,
            show: show
        };
    };
    SwitchMore.prototype.getFormItemNames = function () {
        var form = this.props.form;
        var formNames = form && Array.isArray(form === null || form === void 0 ? void 0 : form.body)
            ? form.body
                .map(function (item) {
                return typeof item === 'string' ? undefined : item === null || item === void 0 ? void 0 : item.name;
            })
                .filter(function (name) { return name; })
            : [];
        return formNames;
    };
    SwitchMore.prototype.overlayRef = function (ref) {
        this.overlay = ref ? (0, react_dom_1.findDOMNode)(ref) : null;
    };
    SwitchMore.prototype.openPopover = function () {
        this.setState({ show: true });
    };
    SwitchMore.prototype.toogleExtend = function () {
        this.setState({ show: !this.state.show });
    };
    SwitchMore.prototype.closePopover = function () {
        this.setState({ show: false });
    };
    SwitchMore.prototype.handleDelete = function (e) {
        var onRemove = this.props.onRemove;
        onRemove && onRemove(e);
    };
    SwitchMore.prototype.handleSwitchChange = function (checked) {
        var _a = this.props, onBulkChange = _a.onBulkChange, onChange = _a.onChange, bulk = _a.bulk, defaultData = _a.defaultData, name = _a.name, trueValue = _a.trueValue, falseValue = _a.falseValue, clearChildValuesOnOff = _a.clearChildValuesOnOff;
        this.setState({ checked: checked });
        // 子表单项是组件根属性，用bulk处理所有属性
        if (bulk) {
            // 选中后，给一个默认 {} 或 配置的默认值
            if (checked) {
                var data = defaultData ? tslib_1.__assign({}, defaultData) : {};
                name && (data[name] = trueValue);
                onBulkChange && onBulkChange(data);
            }
            // 取消选中后，将所有字段重置
            else {
                var values = clearChildValuesOnOff
                    ? (0, fromPairs_1.default)(this.getFormItemNames().map(function (i) { return [i, undefined]; }))
                    : {};
                name && (values[name] = falseValue);
                onBulkChange && onBulkChange(values);
            }
            return;
        }
        onChange(checked ? defaultData || true : undefined);
    };
    SwitchMore.prototype.handleSubmit = function (values) {
        var _a = this.props, onChange = _a.onChange, onBulkChange = _a.onBulkChange, bulk = _a.bulk;
        if (bulk) {
            onBulkChange && onBulkChange(values);
        }
        else {
            onChange && onChange(values);
        }
    };
    SwitchMore.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
        if (throwErrors === void 0) { throwErrors = false; }
        var onClose = this.props.onClose;
        if (action.actionType === 'close') {
            this.setState({ show: false });
            onClose && onClose(e);
        }
    };
    SwitchMore.prototype.renderActions = function () {
        var _a = this.props, render = _a.render, removable = _a.removable, disabled = _a.disabled, form = _a.form, formType = _a.formType, hiddenOnDefault = _a.hiddenOnDefault, bulk = _a.bulk;
        var _b = this.state, checked = _b.checked, show = _b.show;
        if (!form || !checked || disabled) {
            return null;
        }
        var actions = [];
        if (formType === 'dialog') {
            actions.push(render('switch-more-form', this.renderDialogMore(), {
                key: 'edit',
                onSubmit: this.handleSubmit
            }));
        }
        else if (formType === 'pop') {
            actions.push(react_1.default.createElement(amis_1.Button, { key: "edit", level: "link", size: "sm", className: "action-btn", ref: this.overlayRef, onClick: this.openPopover },
                react_1.default.createElement(amis_1.Icon, { icon: "pencil", className: "icon" })));
        }
        else if (bulk && hiddenOnDefault && formType === 'extend') {
            actions.push(react_1.default.createElement("div", { key: "open", "data-tooltip": !show ? '展开更多' : undefined, "data-position": "bottom" },
                react_1.default.createElement(amis_1.Button, { level: "link", size: "sm", className: 'action-btn open-btn' + (show ? ' opening' : ''), onClick: this.toogleExtend },
                    react_1.default.createElement(amis_1.Icon, { icon: "caret", className: "icon" }))));
        }
        if (removable) {
            actions.push(react_1.default.createElement(amis_1.Button, { key: "remove", level: "link", size: "sm", onClick: this.handleDelete },
                react_1.default.createElement(amis_1.Icon, { icon: "delete-btn", className: "icon ae-SwitchMore-icon" })));
        }
        return actions;
    };
    SwitchMore.prototype.renderPopover = function () {
        var _a = this.props, render = _a.render, popOverclassName = _a.popOverclassName, overlay = _a.overlay, offset = _a.offset, target = _a.target, container = _a.container, placement = _a.placement, rootClose = _a.rootClose, style = _a.style, title = _a.title;
        return (react_1.default.createElement(amis_1.Overlay, { show: true, rootClose: rootClose, placement: placement, target: target || this.overlay, container: container },
            react_1.default.createElement(amis_1.PopOver, { className: (0, classnames_1.default)('ae-SwitchMore-popover', popOverclassName), placement: placement, overlay: overlay, offset: offset, style: style },
                react_1.default.createElement("header", null,
                    react_1.default.createElement("p", { className: "ae-SwitchMore-title" }, title || '更多配置'),
                    react_1.default.createElement("a", { onClick: this.closePopover, className: "ae-SwitchMore-close" },
                        react_1.default.createElement(amis_1.Icon, { icon: "close", className: "icon" }))),
                render('switch-more-form', this.renderForm(), {
                    onSubmit: this.handleSubmit
                }))));
    };
    SwitchMore.prototype.renderExtend = function () {
        var _a = this.props, render = _a.render, form = _a.form, bulk = _a.bulk, hiddenOnDefault = _a.hiddenOnDefault;
        var show = this.state.show;
        if (hiddenOnDefault && !show) {
            return null;
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-SwitchMore-content', 'inFormItem') }, render('switch-more-form', this.renderForm(), {
                onSubmit: this.handleSubmit
            }))));
    };
    SwitchMore.prototype.renderDialogMore = function () {
        return {
            type: 'input-sub-form',
            btnLabel: '',
            className: 'inline-block m-0 h-6 bg-white ',
            itemClassName: 'bg-white hover:bg-white m-0 p-0',
            icon: 'fa fa-cog',
            form: tslib_1.__assign({ title: this.props.label }, this.renderForm())
        };
    };
    SwitchMore.prototype.renderForm = function () {
        var _a;
        var _b = this.props, form = _b.form, name = _b.name, formType = _b.formType, ctx = _b.data, bulk = _b.bulk, defaultData = _b.defaultData, autoFocus = _b.autoFocus;
        return tslib_1.__assign({ type: 'form', wrapWithPanel: false, panelClassName: 'border-none shadow-none mb-0', actionsClassName: 'border-none mt-2.5', wrapperComponent: 'div', mode: 'horizontal', horizontal: {
                justify: true,
                left: 4
            }, autoFocus: autoFocus, formLazyChange: true, preventEnterSubmit: true, submitOnChange: ['pop', 'extend'].includes(formType), data: ctx && name && !bulk ? (_a = ctx[name]) !== null && _a !== void 0 ? _a : defaultData : defaultData !== null && defaultData !== void 0 ? defaultData : {} }, form);
    };
    SwitchMore.prototype.renderMoreSection = function () {
        var formType = this.props.formType;
        var _a = this.state, show = _a.show, checked = _a.checked;
        if (!checked) {
            return null;
        }
        if (formType === 'pop') {
            return show ? this.renderPopover() : null;
        }
        else if (formType === 'extend') {
            return this.renderExtend();
        }
        return null;
    };
    SwitchMore.prototype.render = function () {
        var _a;
        var _b = this.props, render = _b.render, disabled = _b.disabled, className = _b.className, body = _b.body, env = _b.env, hidden = _b.hidden, formType = _b.formType, onText = _b.onText, offText = _b.offText;
        if (hidden) {
            return null;
        }
        var _c = this.state, show = _c.show, checked = _c.checked;
        var actions = this.renderActions();
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-SwitchMore', 'ae-SwitchMore-' + formType, className) },
            react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-SwitchMore-switch') },
                body ? render('body', body) : null,
                actions && actions.length ? (react_1.default.createElement("div", { className: "ae-SwitchMore-actions" },
                    actions,
                    checked ? react_1.default.createElement("hr", null) : null)) : null,
                react_1.default.createElement(amis_1.Switch, { value: checked, onChange: this.handleSwitchChange, disabled: disabled, onText: onText, offText: offText })),
            this.renderMoreSection()));
    };
    SwitchMore.defaultProps = {
        // btnIcon: 'pencil',
        // iconPosition: 'right',
        container: document.body,
        autoFocus: true,
        // placement: 'left',
        overlay: true,
        rootClose: false,
        trueValue: true,
        falseValue: false,
        formType: 'pop',
        bulk: true,
        clearChildValuesOnOff: true
        // editable: true
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "overlayRef", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "openPopover", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "toogleExtend", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "closePopover", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "handleDelete", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "handleSwitchChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "handleSubmit", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Boolean, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SwitchMore.prototype, "handleAction", null);
    return SwitchMore;
}(react_1.default.Component));
exports.default = SwitchMore;
var SwitchMoreRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SwitchMoreRenderer, _super);
    function SwitchMoreRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SwitchMoreRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-switch-more'
        })
    ], SwitchMoreRenderer);
    return SwitchMoreRenderer;
}(SwitchMore));
exports.SwitchMoreRenderer = SwitchMoreRenderer;
