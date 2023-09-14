"use strict";
/**
 * @file 状态配置组件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusControlRenderer = exports.StatusControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var StatusControl = /** @class */ (function (_super) {
    tslib_1.__extends(StatusControl, _super);
    function StatusControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this.initState();
        return _this;
    }
    StatusControl.prototype.initState = function () {
        var _a = this.props, _b = _a.data, data = _b === void 0 ? {} : _b, noBulkChange = _a.noBulkChange, noBulkChangeData = _a.noBulkChangeData, expressionName = _a.expressionName, name = _a.name, trueValue = _a.trueValue;
        var formData = {
            statusType: 1,
            expression: ''
        };
        var ctx = data;
        if (noBulkChange && noBulkChangeData) {
            ctx = noBulkChangeData;
        }
        if (ctx[expressionName] || ctx[expressionName] === '') {
            formData.statusType = 2;
            formData.expression = ctx[expressionName];
        }
        return {
            checked: ctx[name] == trueValue || typeof ctx[expressionName] === 'string',
            formData: formData
        };
    };
    StatusControl.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextState.checked !== this.state.checked;
    };
    StatusControl.prototype.handleSwitch = function (value) {
        var _this = this;
        var _a = this.props, trueValue = _a.trueValue, falseValue = _a.falseValue;
        var _b = this.state.formData || {}, expression = _b.expression, _c = _b.statusType, statusType = _c === void 0 ? 1 : _c;
        this.setState({ checked: value == trueValue ? true : false }, function () {
            var _a;
            var _b = _this.props, onBulkChange = _b.onBulkChange, noBulkChange = _b.noBulkChange, onDataChange = _b.onDataChange, expressionName = _b.expressionName, name = _b.name;
            var newData = (_a = {},
                _a[name] = value == falseValue ? falseValue : undefined,
                _a[expressionName] = undefined,
                _a);
            if (value == trueValue) {
                switch (statusType) {
                    case 1:
                        newData[name] = trueValue;
                        break;
                    case 2:
                        newData[expressionName] = expression;
                        break;
                }
            }
            !noBulkChange && onBulkChange && onBulkChange(newData);
            onDataChange && onDataChange(newData);
        });
    };
    StatusControl.prototype.handleFormSubmit = function (values) {
        var _a;
        var _b = this.props, onBulkChange = _b.onBulkChange, noBulkChange = _b.noBulkChange, onDataChange = _b.onDataChange, name = _b.name, expressionName = _b.expressionName;
        var data = (_a = {},
            _a[name] = undefined,
            _a[expressionName] = undefined,
            _a);
        this.setState({ formData: values });
        switch (values.statusType) {
            case 1:
                data[name] = true;
                break;
            case 2:
                data[expressionName] = values.expression;
                break;
        }
        !noBulkChange && onBulkChange && onBulkChange(data);
        onDataChange && onDataChange(data);
    };
    StatusControl.prototype.render = function () {
        var _a = this.props, className = _a.className, _b = _a.data, ctx = _b === void 0 ? {} : _b, trueValue = _a.trueValue, falseValue = _a.falseValue, env = _a.env;
        var checked = this.state.checked;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-StatusControl', className) },
            react_1.default.createElement("header", { className: (0, classnames_1.default)('ae-StatusControl-switch') },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(amis_1.Switch, { className: "ae-BaseSwitch", size: "md", trueValue: trueValue, falseValue: falseValue, checked: checked, onChange: this.handleSwitch }))),
            checked ? this.renderContent() : null));
    };
    StatusControl.prototype.renderContent = function () {
        var _a = this.props, render = _a.render, label = _a.label, _b = _a.data, ctx = _b === void 0 ? {} : _b, name = _a.name, expressionName = _a.expressionName, options = _a.options, children = _a.children, messages = _a.messages;
        var formData = this.state.formData;
        return (react_1.default.createElement("div", { className: "ae-StatusControl-content" }, render('status-control-form', {
            type: 'form',
            title: '',
            panelClassName: 'border-none shadow-none mb-0',
            bodyClassName: 'p-none',
            actionsClassName: 'border-none mt-2.5',
            wrapperComponent: 'div',
            submitOnChange: true,
            autoFocus: true,
            formLazyChange: true,
            footerWrapClassName: 'hidden',
            preventEnterSubmit: true,
            messages: messages,
            mode: 'horizontal',
            horizontal: {
                justify: true,
                left: 3
            },
            body: [
                {
                    type: 'select',
                    label: '条件',
                    name: 'statusType',
                    options: options || [
                        {
                            label: '静态',
                            value: 1
                        },
                        {
                            label: '表达式',
                            value: 2
                        }
                    ]
                },
                (0, amis_editor_core_1.getSchemaTpl)('expressionFormulaControl', {
                    evalMode: false,
                    label: '表达式',
                    name: 'expression',
                    placeholder: "\u8BF7\u8F93\u5165".concat(label, "\u6761\u4EF6"),
                    visibleOn: 'this.statusType === 2',
                    onChange: function (value) { }
                })
            ]
        }, {
            data: formData,
            onSubmit: this.handleFormSubmit
        })));
    };
    StatusControl.defaultProps = {
        trueValue: true,
        falseValue: false
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], StatusControl.prototype, "handleSwitch", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], StatusControl.prototype, "handleFormSubmit", null);
    return StatusControl;
}(react_1.default.Component));
exports.StatusControl = StatusControl;
var StatusControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(StatusControlRenderer, _super);
    function StatusControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-statusControl'
        })
    ], StatusControlRenderer);
    return StatusControlRenderer;
}(StatusControl));
exports.StatusControlRenderer = StatusControlRenderer;
