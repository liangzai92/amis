"use strict";
/**
 * @file 长文本公式输入框
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TplFormulaControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var mobx_1 = require("mobx");
var amis_ui_1 = require("amis-ui");
var amis_1 = require("amis");
var amis_core_1 = require("amis-core");
var plugin_1 = require("./textarea-formula/plugin");
var FormulaControl_1 = require("./FormulaControl");
var FormulaPicker_1 = tslib_1.__importDefault(require("./textarea-formula/FormulaPicker"));
var amis_editor_core_1 = require("amis-editor-core");
// 暂时记录输入的字符，用于快捷键判断
var preInputLocation = {
    start: 0,
    end: 0
};
var TplFormulaControl = /** @class */ (function (_super) {
    tslib_1.__extends(TplFormulaControl, _super);
    function TplFormulaControl(props) {
        var _this = _super.call(this, props) || this;
        _this.wrapRef = react_1.default.createRef();
        _this.tooltipRef = react_1.default.createRef();
        _this.state = {
            value: '',
            variables: [],
            formulaPickerOpen: false,
            formulaPickerValue: '',
            tooltipStyle: {
                display: 'none'
            },
            loading: false
        };
        return _this;
    }
    TplFormulaControl.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var editorStore;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                if (this.tooltipRef.current) {
                    this.tooltipRef.current.addEventListener('mouseleave', this.hiddenToolTip);
                }
                if (this.wrapRef.current) {
                    this.wrapRef.current.addEventListener('keydown', this.handleKeyDown, true);
                }
                return [2 /*return*/];
            });
        });
    };
    TplFormulaControl.prototype.componentWillUnmount = function () {
        var _a, _b;
        if (this.tooltipRef.current) {
            this.tooltipRef.current.removeEventListener('mouseleave', this.hiddenToolTip);
        }
        if (this.wrapRef.current) {
            this.wrapRef.current.removeEventListener('keydown', this.handleKeyDown);
        }
        (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this.unReaction) === null || _b === void 0 ? void 0 : _b.call(this);
    };
    TplFormulaControl.prototype.onExpressionMouseEnter = function (e, expression, brace) {
        var _a;
        var wrapperRect = (_a = this.wrapRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var expressionRect = e.target.getBoundingClientRect();
        if (!wrapperRect) {
            return;
        }
        var left = expressionRect.left - wrapperRect.left;
        this.setState({
            tooltipStyle: {
                left: "".concat(left, "px"),
                width: "".concat(expressionRect.width, "px")
            },
            formulaPickerValue: expression,
            expressionBrace: brace
        });
    };
    TplFormulaControl.prototype.hiddenToolTip = function () {
        this.setState({
            tooltipStyle: {
                display: 'none'
            }
        });
    };
    TplFormulaControl.prototype.handleKeyDown = function (e) {
        // 组件禁止回车折行，否则会导致内容超过一行
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    TplFormulaControl.prototype.closeFormulaPicker = function () {
        this.setState({ formulaPickerOpen: false });
    };
    TplFormulaControl.prototype.handleConfirm = function (value) {
        var _a;
        var expressionBrace = this.state.expressionBrace;
        // 去除可能包裹的最外层的${}
        value = value.replace(/^\$\{(.*)\}$/, function (match, p1) { return p1; });
        value = value ? "${".concat(value, "}") : value;
        value = value.replace(/\r\n|\r|\n/g, ' ');
        (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.insertContent(value, 'expression', expressionBrace);
        this.setState({
            formulaPickerOpen: false,
            expressionBrace: undefined
        });
    };
    TplFormulaControl.prototype.handleOnChange = function (value) {
        var _a, _b;
        this.checkOpenFormulaPicker(value);
        (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    // 检测用户输入'${}'自动打开表达式弹窗
    TplFormulaControl.prototype.checkOpenFormulaPicker = function (value) {
        var _a;
        var preLength = ((_a = this.props.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
        // 删除了文本，无需检测
        if (value.length < preLength || value === this.props.value) {
            return;
        }
        var left = 0;
        var right = 0;
        var length = value.length;
        while (left < preLength &&
            value.charAt(left) === this.props.value.charAt(left)) {
            left++;
        }
        while (right < preLength &&
            value.charAt(length - 1 - right) ===
                this.props.value.charAt(preLength - 1 - right)) {
            right++;
        }
        if ((preInputLocation === null || preInputLocation === void 0 ? void 0 : preInputLocation.end) !== left) {
            preInputLocation = null;
        }
        var start = preInputLocation ? preInputLocation.start : left;
        var end = left === length - right ? left + 1 : length - right;
        var inputText = value.substring(start, end);
        if (/\$|\{|\}$/.test(inputText)) {
            if (/\$\{\}/.test(inputText)) {
                var newValue = value.slice(0, start) +
                    inputText.replace('${}', '') +
                    value.slice(end);
                this.props.onChange(newValue);
                var corsur = this.editorPlugin.getCorsur();
                this.setState({
                    formulaPickerOpen: true,
                    formulaPickerValue: '',
                    expressionBrace: [
                        {
                            line: corsur === null || corsur === void 0 ? void 0 : corsur.line,
                            ch: end - 3
                        },
                        {
                            line: corsur === null || corsur === void 0 ? void 0 : corsur.line,
                            ch: end
                        }
                    ]
                });
                preInputLocation = null;
            }
            else {
                preInputLocation = tslib_1.__assign(tslib_1.__assign({ start: left }, preInputLocation), { end: end });
            }
        }
        else {
            preInputLocation = null;
        }
    };
    TplFormulaControl.prototype.handleClear = function () {
        var _a;
        (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.setValue('');
    };
    /**
     * 公式编辑器打开完成一些异步任务的加载
     */
    TplFormulaControl.prototype.beforeFormulaEditorOpen = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, node, manager, data, onFormulaEditorOpen, res, variables, variables, error_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, node = _b.node, manager = _b.manager, data = _b.data;
                        onFormulaEditorOpen = (_a = manager === null || manager === void 0 ? void 0 : manager.config) === null || _a === void 0 ? void 0 : _a.onFormulaEditorOpen;
                        this.setState({ loading: true });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        if (!(manager &&
                            onFormulaEditorOpen &&
                            typeof onFormulaEditorOpen === 'function')) return [3 /*break*/, 5];
                        return [4 /*yield*/, onFormulaEditorOpen(node, manager, data)];
                    case 2:
                        res = _c.sent();
                        if (!(res !== false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, amis_editor_core_1.getVariables)(this)];
                    case 3:
                        variables = _c.sent();
                        this.setState({ variables: variables });
                        _c.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, (0, amis_editor_core_1.getVariables)(this)];
                    case 6:
                        variables = _c.sent();
                        this.setState({ variables: variables });
                        _c.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _c.sent();
                        console.error('[amis-editor] onFormulaEditorOpen failed: ', error_1 === null || error_1 === void 0 ? void 0 : error_1.stack);
                        return [3 /*break*/, 9];
                    case 9:
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    TplFormulaControl.prototype.handleFormulaClick = function (e, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.beforeFormulaEditorOpen()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        this.setState({
                            formulaPickerOpen: true
                        });
                        if (type !== 'update') {
                            this.setState({
                                formulaPickerValue: '',
                                expressionBrace: undefined
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TplFormulaControl.prototype.editorFactory = function (dom, cm) {
        return (0, plugin_1.editorFactory)(dom, cm, this.props.value, {
            lineWrapping: false,
            cursorHeight: 0.85
        });
    };
    TplFormulaControl.prototype.handleEditorMounted = function (cm, editor) {
        var _this = this;
        var variables = this.props.variables || this.state.variables;
        this.editorPlugin = new plugin_1.FormulaPlugin(editor, {
            getProps: function () { return (tslib_1.__assign(tslib_1.__assign({}, _this.props), { variables: variables })); },
            onExpressionMouseEnter: this.onExpressionMouseEnter,
            showPopover: false,
            showClearIcon: true
        });
    };
    TplFormulaControl.prototype.editorAutoMark = function () {
        var _a;
        (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.autoMark();
    };
    TplFormulaControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, header = _a.header, label = _a.label, placeholder = _a.placeholder, customFormulaPicker = _a.customFormulaPicker, clearable = _a.clearable, rest = tslib_1.__rest(_a, ["className", "header", "label", "placeholder", "customFormulaPicker", "clearable"]);
        var _b = this.state, formulaPickerOpen = _b.formulaPickerOpen, formulaPickerValue = _b.formulaPickerValue, variables = _b.variables, tooltipStyle = _b.tooltipStyle, loading = _b.loading;
        var FormulaPickerCmp = customFormulaPicker !== null && customFormulaPicker !== void 0 ? customFormulaPicker : FormulaPicker_1.default;
        var highlightValue = amis_ui_1.FormulaEditor.highlightValue(formulaPickerValue, variables) || {
            html: formulaPickerValue
        };
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-TplFormulaControl', className, {
                clearable: clearable
            }), ref: this.wrapRef },
            react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-TplResultBox') },
                react_1.default.createElement(amis_ui_1.CodeMirrorEditor, { className: "ae-TplResultBox-editor", value: this.props.value, onChange: this.handleOnChange, editorFactory: this.editorFactory, editorDidMount: this.handleEditorMounted, onBlur: this.editorAutoMark }),
                !this.props.value && (react_1.default.createElement("div", { className: "ae-TplFormulaControl-placeholder" }, placeholder)),
                clearable && this.props.value && (react_1.default.createElement(amis_1.Icon, { icon: "input-clear", className: "input-clear-icon", iconContent: "InputText-clear", onClick: this.handleClear }))),
            react_1.default.createElement(amis_1.Button, { className: "ae-TplFormulaControl-button", size: "sm", tooltip: {
                    enterable: false,
                    content: '点击配置表达式',
                    tooltipTheme: 'dark',
                    placement: 'left',
                    mouseLeaveDelay: 0
                }, onClick: this.handleFormulaClick, loading: loading },
                react_1.default.createElement(amis_1.Icon, { icon: "input-add-fx", className: (0, classnames_1.default)('ae-TplFormulaControl-icon', 'icon') })),
            react_1.default.createElement(amis_1.TooltipWrapper, { trigger: "hover", placement: "top", style: { fontSize: '12px' }, tooltip: {
                    tooltipTheme: 'dark',
                    children: function () { return (0, FormulaControl_1.renderFormulaValue)(highlightValue); }
                } },
                react_1.default.createElement("div", { className: "ae-TplFormulaControl-tooltip", style: tooltipStyle, ref: this.tooltipRef, onClick: function (e) { return _this.handleFormulaClick(e, 'update'); } })),
            formulaPickerOpen ? (react_1.default.createElement(FormulaPickerCmp, tslib_1.__assign({}, this.props, { value: formulaPickerValue, initable: true, header: header, variables: variables, variableMode: rest.variableMode, evalMode: true, onClose: this.closeFormulaPicker, onConfirm: this.handleConfirm }))) : null));
    };
    TplFormulaControl.defaultProps = {
        variableMode: 'tree',
        requiredDataPropsVariables: false,
        placeholder: '请输入'
    };
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [MouseEvent, String, Array]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "onExpressionMouseEnter", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "hiddenToolTip", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "handleKeyDown", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "closeFormulaPicker", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "handleConfirm", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "handleOnChange", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "handleClear", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Promise)
    ], TplFormulaControl.prototype, "beforeFormulaEditorOpen", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, String]),
        tslib_1.__metadata("design:returntype", Promise)
    ], TplFormulaControl.prototype, "handleFormulaClick", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [HTMLElement, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "editorFactory", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "handleEditorMounted", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TplFormulaControl.prototype, "editorAutoMark", null);
    return TplFormulaControl;
}(react_1.default.Component));
exports.TplFormulaControl = TplFormulaControl;
var TplFormulaControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TplFormulaControlRenderer, _super);
    function TplFormulaControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TplFormulaControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-tplFormulaControl'
        })
    ], TplFormulaControlRenderer);
    return TplFormulaControlRenderer;
}(TplFormulaControl));
exports.default = TplFormulaControlRenderer;
