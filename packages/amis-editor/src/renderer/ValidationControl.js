"use strict";
/**
 * @file 表单项校验配置
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var groupBy_1 = tslib_1.__importDefault(require("lodash/groupBy"));
var remove_1 = tslib_1.__importDefault(require("lodash/remove"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var ValidationItem_1 = tslib_1.__importDefault(require("./ValidationItem"));
var validator_1 = require("../validator");
var ValidationControl = /** @class */ (function (_super) {
    tslib_1.__extends(ValidationControl, _super);
    function ValidationControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            avaliableValids: _this.getAvaliableValids(props)
        };
        return _this;
    }
    ValidationControl.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.data.type !== nextProps.data.type) {
            this.setState({
                avaliableValids: this.getAvaliableValids(nextProps)
            });
            var validators = this.transformValid(this.props.data);
            this.updateValidation(validators);
        }
        // todo 删除不允许配置的值
    };
    ValidationControl.prototype.getAvaliableValids = function (props) {
        var data = props.data, tag = props.tag;
        tag = typeof tag === 'string' ? tag : tag(data);
        return (0, validator_1.getValidatorsByTag)(tag);
    };
    ValidationControl.prototype.transformValid = function (data) {
        var required = data.required, validations = data.validations, validationErrors = data.validationErrors;
        var validators = [];
        if (required) {
            validators.push({
                name: 'required',
                value: true,
                message: validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors.required
            });
        }
        if (validations) {
            Object.keys(validations).forEach(function (name) {
                validators.push({
                    name: name,
                    value: validations[name],
                    message: validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors[name]
                });
            });
        }
        return validators;
    };
    /**
     * 统一更新校验相关字段
     */
    ValidationControl.prototype.updateValidation = function (validators) {
        var onBulkChange = this.props.onBulkChange;
        if (!validators.length) {
            onBulkChange &&
                onBulkChange({
                    required: undefined,
                    validations: undefined,
                    validationErrors: undefined
                });
            return;
        }
        var required = undefined;
        var validations = {};
        var validationErrors = {};
        validators.forEach(function (data) {
            var name = data.name, value = data.value, message = data.message;
            if (name === 'required') {
                required = value;
                return;
            }
            if (value != null) {
                validations[name] = value;
                message && (validationErrors[name] = message);
            }
        });
        onBulkChange &&
            onBulkChange({
                required: required,
                validations: Object.keys(validations).length ? validations : undefined,
                validationErrors: Object.keys(validationErrors).length
                    ? validationErrors
                    : undefined
            });
    };
    /**
     * 添加规则
     *
     * @param {Validator} valid 校验规则配置
     */
    ValidationControl.prototype.handleAddValidator = function (valid) {
        var validators = this.transformValid(this.props.data);
        validators.push({
            name: valid.name,
            value: valid.schema ? '' : true,
            message: ''
        });
        this.updateValidation(validators);
    };
    /**
     * 更新校验规则
     */
    ValidationControl.prototype.handleEditRule = function (data) {
        var validators = this.transformValid(this.props.data);
        var validator = validators.find(function (v) { return v.name === data.name; });
        if (validator) {
            validator.value = data.value;
            validator.message = data.message;
        }
        else {
            /** 预设的校验规则props.data取不到 */
            validators.push(data);
        }
        this.updateValidation(validators);
    };
    /**
     * 删除校验规则
     */
    ValidationControl.prototype.handleRemoveRule = function (valid) {
        var validators = this.transformValid(this.props.data);
        (0, remove_1.default)(validators, function (v) { return v.name === valid; });
        this.updateValidation(validators);
    };
    /**
     * 开关默认规则
     */
    ValidationControl.prototype.handleSwitchRule = function (checked, data) {
        var validators = this.transformValid(this.props.data);
        var valid = validators.find(function (v) { return v.name === data.name; });
        if (!valid) {
            valid = { name: data.name };
            validators.push(valid);
        }
        valid.value = checked ? data.value : undefined;
        valid.message = checked ? data.message : undefined;
        this.updateValidation(validators);
    };
    /**
     * 添加规则下拉框
     */
    ValidationControl.prototype.renderDropdown = function () {
        var _this = this;
        var _a = this.props, render = _a.render, _b = _a.validations, validations = _b === void 0 ? {} : _b;
        var moreValidators = this.state.avaliableValids.moreValidators;
        // 去掉已经选用的
        var validators = Object.values(moreValidators).filter(function (item) { return !validations.hasOwnProperty(item.name); });
        var buttons = Object.entries((0, groupBy_1.default)(validators, 'group')).map(function (_a) {
            var _b = tslib_1.__read(_a, 2), group = _b[0], validations = _b[1];
            return ({
                label: group,
                children: validations.map(function (v) { return ({
                    label: v.label,
                    onClick: function () { return _this.handleAddValidator(v); }
                }); })
            });
        });
        return (react_1.default.createElement("div", { className: "ae-ValidationControl-dropdown" }, render('validation-control-dropdown', {
            type: 'dropdown-button',
            btnClassName: 'ae-ValidationControl-dropdown-btn',
            menuClassName: 'ae-ValidationControl-dropdown-menu',
            level: 'link',
            size: 'md',
            icon: 'fa fa-plus',
            label: '',
            tooltip: '添加校验规则',
            placement: 'left',
            align: 'right',
            tooltipTrigger: 'hover',
            closeOnClick: true,
            closeOnOutside: true,
            hideCaret: true,
            disabled: buttons.length === 0,
            buttons: buttons
        }, {
            key: 'validation-control-dropdown',
            popOverContainer: null
        })));
    };
    /**
     * 规则列表
     */
    ValidationControl.prototype.renderValidaton = function () {
        var _this = this;
        var _a, _b, _c;
        var classPrefix = (_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.env) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.classPrefix;
        var _d = this.state.avaliableValids, defaultValidators = _d.defaultValidators, moreValidators = _d.moreValidators, builtInValidators = _d.builtInValidators;
        var validators = this.transformValid(this.props.data);
        var rules = [];
        validators = validators.concat();
        // 优先渲染默认的顺序
        Object.keys(defaultValidators).forEach(function (validName) {
            var data = (0, remove_1.default)(validators, function (v) { return v.name === validName; });
            rules.push(react_1.default.createElement(ValidationItem_1.default, { key: validName, validator: defaultValidators[validName], data: data.length ? data[0] : { name: validName }, classPrefix: classPrefix, isDefault: defaultValidators.hasOwnProperty(validName), onEdit: _this.handleEditRule, onDelete: _this.handleRemoveRule, onSwitch: _this.handleSwitchRule }));
        });
        Object.keys(builtInValidators).forEach(function (validName) {
            var data = (0, remove_1.default)(validators, function (v) { return v.name === validName; });
            rules.push(react_1.default.createElement(ValidationItem_1.default, { key: validName, validator: builtInValidators[validName], data: data.length
                    ? data[0]
                    : { name: validName, value: true, isBuiltIn: true }, classPrefix: classPrefix, isDefault: builtInValidators.hasOwnProperty(validName), onEdit: _this.handleEditRule, onDelete: _this.handleRemoveRule, onSwitch: _this.handleSwitchRule }));
        });
        // 剩余的按顺序渲染
        if (validators.length) {
            validators.forEach(function (valid) {
                var validator = moreValidators[valid.name] || (0, validator_1.getValidator)(valid.name);
                if (!validator) {
                    return;
                }
                rules.push(react_1.default.createElement(ValidationItem_1.default, { key: valid.name, data: valid, classPrefix: classPrefix, validator: validator, isDefault: defaultValidators.hasOwnProperty(valid.name), onEdit: _this.handleEditRule, onDelete: _this.handleRemoveRule, onSwitch: _this.handleSwitchRule }));
            });
        }
        return (react_1.default.createElement("div", { className: "ae-ValidationControl-rules", key: "rules" },
            rules,
            this.renderValidateApiControl()));
    };
    ValidationControl.prototype.renderValidateApiControl = function () {
        var _a = this.props, onBulkChange = _a.onBulkChange, render = _a.render;
        return (react_1.default.createElement("div", { className: "ae-ValidationControl-item" }, render('validate-api-control', {
            type: 'form',
            wrapWithPanel: false,
            className: 'w-full mb-2',
            bodyClassName: 'p-none',
            wrapperComponent: 'div',
            mode: 'horizontal',
            data: {
                validateApi: this.props.data.validateApi,
                switchStatus: this.props.data.validateApi !== undefined
            },
            preventEnterSubmit: true,
            submitOnChange: true,
            onSubmit: function (_a) {
                var switchStatus = _a.switchStatus, validateApi = _a.validateApi;
                onBulkChange &&
                    onBulkChange({
                        validateApi: !switchStatus ? undefined : validateApi
                    });
            },
            body: [
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    label: (0, amis_editor_core_1.tipedLabel)('接口校验', "\u914D\u7F6E\u6821\u9A8C\u63A5\u53E3\uFF0C\u5BF9\u8868\u5355\u9879\u8FDB\u884C\u8FDC\u7A0B\u6821\u9A8C\uFF0C\u914D\u7F6E\u65B9\u5F0F\u4E0E\u666E\u901A\u63A5\u53E3\u4E00\u81F4<br />\n              1. \u63A5\u53E3\u8FD4\u56DE <span class=\"ae-ValidationControl-label-code\">{status: 0}</span> \u8868\u793A\u6821\u9A8C\u901A\u8FC7<br />\n              2. \u63A5\u53E3\u8FD4\u56DE <span class=\"ae-ValidationControl-label-code\">{status: 422}</span> \u8868\u793A\u6821\u9A8C\u4E0D\u901A\u8FC7<br />\n              3. \u82E5\u6821\u9A8C\u5931\u8D25\u65F6\u9700\u8981\u663E\u793A\u9519\u8BEF\u63D0\u793A\u4FE1\u606F\uFF0C\u8FD8\u9700\u8FD4\u56DE errors \u5B57\u6BB5\uFF0C\u793A\u4F8B<br />\n              <span class=\"ae-ValidationControl-label-code\">{status: 422, errors: '\u9519\u8BEF\u63D0\u793A\u6D88\u606F'}</span>\n              "),
                    name: 'switchStatus'
                }),
                {
                    type: 'container',
                    className: 'ae-ExtendMore ae-ValidationControl-item-input',
                    bodyClassName: 'w-full',
                    visibleOn: 'this.switchStatus',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                            name: 'validateApi',
                            renderLabel: true,
                            label: '',
                            mode: 'normal',
                            className: 'w-full'
                        })
                    ]
                }
            ]
        })));
    };
    ValidationControl.prototype.render = function () {
        var className = this.props.className;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-ValidationControl', className), key: "validation-control" },
            this.renderDropdown(),
            this.renderValidaton()));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ValidationControl.prototype, "handleEditRule", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ValidationControl.prototype, "handleRemoveRule", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ValidationControl.prototype, "handleSwitchRule", null);
    return ValidationControl;
}(react_1.default.Component));
exports.default = ValidationControl;
var ValidationControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ValidationControlRenderer, _super);
    function ValidationControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidationControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-validationControl',
            renderLabel: false
        })
    ], ValidationControlRenderer);
    return ValidationControlRenderer;
}(ValidationControl));
exports.ValidationControlRenderer = ValidationControlRenderer;
