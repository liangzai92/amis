"use strict";
/**
 * @file 校验项
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var ValidationItem = /** @class */ (function (_super) {
    tslib_1.__extends(ValidationItem, _super);
    function ValidationItem(props) {
        var _this = _super.call(this, props) || this;
        var data = _this.props.data;
        _this.validator = _this.props.validator;
        _this.state = {
            value: data === null || data === void 0 ? void 0 : data.value,
            checked: data.value != null,
            message: (data === null || data === void 0 ? void 0 : data.message) || '',
            isBuiltIn: data === null || data === void 0 ? void 0 : data.isBuiltIn
        };
        return _this;
    }
    ValidationItem.prototype.handleEdit = function (value, action) {
        var _a = this.props, onEdit = _a.onEdit, data = _a.data;
        if ((action === null || action === void 0 ? void 0 : action.type) === 'submit') {
            onEdit &&
                onEdit(tslib_1.__assign({ name: data.name }, value));
        }
    };
    ValidationItem.prototype.handleDelete = function () {
        var _a = this.props, onDelete = _a.onDelete, data = _a.data;
        onDelete && onDelete(data.name);
    };
    ValidationItem.prototype.handleSwitch = function (checked) {
        var _a = this.props, onSwitch = _a.onSwitch, data = _a.data;
        var _b = this.state, value = _b.value, message = _b.message;
        this.setState({
            checked: checked
        });
        if (checked) {
            data.value = this.validator.schema ? value : true;
            data.message = '';
        }
        onSwitch && onSwitch(checked, data);
    };
    ValidationItem.prototype.renderActions = function () {
        var isDefault = this.props.isDefault;
        var actions = [];
        if (!isDefault) {
            actions.push(react_1.default.createElement(amis_1.Button, { className: "ae-ValidationControl-item-action", level: "link", size: "md", key: "delete", onClick: this.handleDelete },
                react_1.default.createElement("i", { className: "fa fa-trash" })));
        }
        return actions.length !== 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "ae-ValidationControl-item-actions" }, actions))) : null;
    };
    ValidationItem.prototype.renderInputControl = function () {
        var _this = this;
        var _a = this.state, value = _a.value, message = _a.message, checked = _a.checked;
        var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
        var control = [];
        if (!checked) {
            return null;
        }
        if (this.validator.schema) {
            control = control.concat(this.validator.schema);
        }
        if (this.validator.message) {
            control.push({
                name: 'message',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                label: (0, amis_editor_core_2.tipedLabel)('错误提示', "\u7CFB\u7EDF\u9ED8\u8BA4\u63D0\u793A\uFF1A".concat(this.validator.message)),
                pipeIn: function (value, data) {
                    // value中 $1 会被运算，导致无法正确回显$1。此处从this.props.data中获取该校验项的错误提示
                    return _this.props.data.message;
                },
                placeholder: '默认使用系统定义提示'
            });
        }
        return control.length !== 0 ? (react_1.default.createElement("section", { className: (0, classnames_1.default)('ae-ValidationControl-item-input', 'ae-ExtendMore') }, (0, amis_1.render)({
            type: 'form',
            className: 'w-full',
            wrapWithPanel: false,
            panelClassName: 'border-none shadow-none mb-0',
            bodyClassName: 'p-none',
            actionsClassName: 'border-none mt-2.5',
            wrapperComponent: 'div',
            mode: 'horizontal',
            horizontal: {
                justify: true,
                left: 4,
                right: 8
            },
            preventEnterSubmit: true,
            submitOnChange: true,
            body: control,
            data: { value: value, message: message }
        }, {
            onSubmit: this.handleEdit
        }))) : null;
    };
    ValidationItem.prototype.render = function () {
        var _a = this.props, classPrefix = _a.classPrefix, data = _a.data, isDefault = _a.isDefault;
        var _b = this.state, checked = _b.checked, isBuiltIn = _b.isBuiltIn;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-ValidationControl-item', {
                'is-active': checked
            }), key: data.name },
            react_1.default.createElement("section", { className: (0, classnames_1.default)('ae-ValidationControl-item-control', {
                    'is-active': checked && data.name !== 'required'
                }) },
                react_1.default.createElement("label", { className: (0, classnames_1.default)("".concat(classPrefix, "Form-label")) }, this.validator.label),
                react_1.default.createElement("div", null,
                    this.renderActions(),
                    react_1.default.createElement(amis_1.Switch, { key: "switch", value: checked, disabled: isBuiltIn, onChange: this.handleSwitch }))),
            this.renderInputControl()));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ValidationItem.prototype, "handleEdit", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ValidationItem.prototype, "handleDelete", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ValidationItem.prototype, "handleSwitch", null);
    return ValidationItem;
}(react_1.default.Component));
exports.default = ValidationItem;
