"use strict";
/**
 * @file 表达式输入框组件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFormulaControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_core_1 = require("amis-core");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_ui_1 = require("amis-ui");
var FormulaControl_1 = require("./FormulaControl");
var mobx_1 = require("mobx");
var amis_editor_core_1 = require("amis-editor-core");
var ExpressionFormulaControl = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionFormulaControl, _super);
    function ExpressionFormulaControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            variables: [],
            formulaPickerValue: ''
        };
        return _this;
    }
    ExpressionFormulaControl.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var editorStore;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.initFormulaPickerValue(this.props.value);
                editorStore = window.editorStore;
                this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
                this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
                this.unReaction = (0, mobx_1.reaction)(function () { return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState; }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
                        this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ExpressionFormulaControl.prototype.componentDidUpdate = function (prevProps) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (prevProps.value !== this.props.value) {
                    this.initFormulaPickerValue(this.props.value);
                }
                return [2 /*return*/];
            });
        });
    };
    ExpressionFormulaControl.prototype.componentWillUnmount = function () {
        var _a;
        this.isUnmount = true;
        (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    ExpressionFormulaControl.prototype.initFormulaPickerValue = function (value) {
        var formulaPickerValue = (value === null || value === void 0 ? void 0 : value.replace(/^\$\{(.*)\}$/, function (match, p1) { return p1; })) || '';
        this.setState({
            formulaPickerValue: formulaPickerValue
        });
    };
    ExpressionFormulaControl.prototype.handleConfirm = function (value) {
        var _a, _b;
        if (value === void 0) { value = ''; }
        var expressionReg = /^\$\{(.*)\}$/;
        value = value.replace(/\r\n|\r|\n/g, ' ');
        if (value && !expressionReg.test(value)) {
            value = "${".concat(value, "}");
        }
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    ExpressionFormulaControl.prototype.handleClearExpression = function (e) {
        var _a, _b;
        e.stopPropagation();
        e.preventDefault();
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, '');
    };
    ExpressionFormulaControl.prototype.handleOnClick = function (e, onClick) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var variablesArr;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, amis_editor_core_1.getVariables)(this)];
                    case 1:
                        variablesArr = _a.sent();
                        this.setState({
                            variables: variablesArr
                        });
                        return [2 /*return*/, onClick === null || onClick === void 0 ? void 0 : onClick(e)];
                }
            });
        });
    };
    ExpressionFormulaControl.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, value = _c.value, className = _c.className, variableMode = _c.variableMode, header = _c.header, size = _c.size, rest = tslib_1.__rest(_c, ["value", "className", "variableMode", "header", "size"]);
        var _d = this.state, formulaPickerValue = _d.formulaPickerValue, variables = _d.variables;
        var highlightValue = amis_ui_1.FormulaEditor.highlightValue(formulaPickerValue, variables) || {
            html: formulaPickerValue
        };
        // 自身字段
        var selfName = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.name;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-ExpressionFormulaControl', className) },
            react_1.default.createElement(amis_1.PickerContainer, { showTitle: false, bodyRender: function (_a) {
                    var value = _a.value, onChange = _a.onChange;
                    return (react_1.default.createElement(amis_ui_1.FormulaEditor, tslib_1.__assign({}, rest, { evalMode: true, variableMode: variableMode, variables: variables, header: header || '表达式', value: formulaPickerValue, onChange: onChange, selfVariableName: selfName })));
                }, value: formulaPickerValue, onConfirm: this.handleConfirm, size: size !== null && size !== void 0 ? size : 'lg' }, function (_a) {
                var onClick = _a.onClick;
                return formulaPickerValue ? (react_1.default.createElement(amis_1.Button, { className: "btn-configured", tooltip: {
                        placement: 'top',
                        tooltipTheme: 'dark',
                        mouseLeaveDelay: 20,
                        content: value,
                        tooltipClassName: 'btn-configured-tooltip',
                        children: function () { return (0, FormulaControl_1.renderFormulaValue)(highlightValue); }
                    }, onClick: function (e) { return _this.handleOnClick(e, onClick); } },
                    (0, FormulaControl_1.renderFormulaValue)(highlightValue),
                    react_1.default.createElement(amis_1.Icon, { icon: "input-clear", className: "icon", onClick: _this.handleClearExpression }))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(amis_1.Button, { className: "btn-set-expression", onClick: function (e) { return _this.handleOnClick(e, onClick); } }, "\u70B9\u51FB\u7F16\u5199\u8868\u8FBE\u5F0F")));
            })));
    };
    ExpressionFormulaControl.defaultProps = {
        variableMode: 'tree',
        requiredDataPropsVariables: false,
        evalMode: true
    };
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ExpressionFormulaControl.prototype, "initFormulaPickerValue", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ExpressionFormulaControl.prototype, "handleConfirm", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ExpressionFormulaControl.prototype, "handleClearExpression", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ExpressionFormulaControl.prototype, "handleOnClick", null);
    return ExpressionFormulaControl;
}(react_1.default.Component));
exports.default = ExpressionFormulaControl;
var ExpressionFormulaControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionFormulaControlRenderer, _super);
    function ExpressionFormulaControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionFormulaControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-expressionFormulaControl'
        })
    ], ExpressionFormulaControlRenderer);
    return ExpressionFormulaControlRenderer;
}(ExpressionFormulaControl));
exports.ExpressionFormulaControlRenderer = ExpressionFormulaControlRenderer;
