"use strict";
/**
 * @file 表格自定义列可视化编辑控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableColumnWidthControlRender = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_core_1 = require("amis-core");
var amis_editor_core_1 = require("amis-editor-core");
var TableColumnWidthControl = /** @class */ (function (_super) {
    tslib_1.__extends(TableColumnWidthControl, _super);
    function TableColumnWidthControl(props) {
        var _this = _super.call(this, props) || this;
        _this.options = [
            {
                label: '自适应',
                value: 'adaptive'
            },
            {
                label: '百分比',
                value: 'percentage'
            },
            {
                label: '固定宽度',
                value: 'fixed'
            }
        ];
        _this.state = {
            activeOption: _this.options[0]
        };
        return _this;
    }
    TableColumnWidthControl.prototype.componentDidMount = function () {
        var value = this.props.value;
        if (value === undefined)
            return;
        if (typeof value === 'number') {
            this.state.activeOption !== this.options[2] &&
                this.setState({
                    activeOption: this.options[2]
                });
        }
        else if (typeof value === 'string' && value.endsWith('%')) {
            this.state.activeOption !== this.options[1] &&
                this.setState({
                    activeOption: this.options[1]
                });
        }
        else {
            this.state.activeOption !== this.options[0] &&
                this.setState({
                    activeOption: this.options[0]
                });
        }
    };
    TableColumnWidthControl.prototype.handleOptionChange = function (item) {
        var _a, _b;
        if (item === this.state.activeOption)
            return;
        this.setState({
            activeOption: item
        });
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, undefined);
    };
    TableColumnWidthControl.prototype.renderHeader = function () {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, formLabel = _b.formLabel, labelRemark = _b.labelRemark, useMobileUI = _b.useMobileUI, env = _b.env, popOverContainer = _b.popOverContainer, data = _b.data;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        var activeOption = this.state.activeOption;
        return (react_1.default.createElement("div", { className: "ae-columnWidthControl-header" },
            react_1.default.createElement("label", { className: (0, classnames_1.default)("".concat(classPrefix, "Form-label")) },
                formLabel || '',
                labelRemark
                    ? render('label-remark', {
                        type: 'remark',
                        icon: labelRemark.icon || 'warning-mark',
                        tooltip: labelRemark,
                        className: (0, classnames_1.default)("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
                        useMobileUI: useMobileUI,
                        container: popOverContainer
                            ? popOverContainer
                            : env && env.getModalContainer
                                ? env.getModalContainer
                                : undefined
                    })
                    : null),
            render('columnWidthControl-options', {
                type: 'dropdown-button',
                level: 'link',
                size: 'sm',
                label: activeOption.label,
                align: 'right',
                closeOnClick: true,
                closeOnOutside: true,
                buttons: this.options.map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), { onClick: function () { return _this.handleOptionChange(item); } })); })
            }, {
                popOverContainer: null
            })));
    };
    TableColumnWidthControl.prototype.handleChange = function (type, val) {
        var onChange = this.props.onChange;
        if (typeof val !== 'number' || isNaN(val))
            return;
        if (val <= 0) {
            onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(type === 'percentage' ? val + '%' : val);
    };
    TableColumnWidthControl.prototype.renderBody = function () {
        var _this = this;
        var _a = this.props, onBulkChange = _a.onBulkChange, render = _a.render, onChange = _a.onChange, value = _a.value;
        var activeOption = this.state.activeOption;
        if (activeOption.value === 'adaptive') {
            return null;
        }
        if (activeOption.value === 'fixed') {
            return render('columnWidthControl-fixed', (0, amis_editor_core_1.getSchemaTpl)('withUnit', {
                label: '固定列宽',
                name: 'interval',
                control: {
                    type: 'input-number',
                    min: 0,
                    value: value
                    // onChange: (val: number) => this.handleChange('fixed', val)
                },
                unit: 'px',
                className: 'mt-3'
            }), {
                onChange: function (val) { return _this.handleChange('fixed', val); }
            });
        }
        return render('columnWidthControl-fixed', {
            type: 'input-range',
            name: 'range',
            min: 0,
            max: 100,
            step: 1,
            label: '百分比列宽',
            value: (0, amis_core_1.toNumber)(value),
            onChange: function (val) {
                return activeOption.value === 'percentage' &&
                    _this.handleChange('percentage', val);
            }
        });
    };
    TableColumnWidthControl.prototype.render = function () {
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-columnWidthControl') },
            this.renderHeader(),
            this.renderBody()));
    };
    return TableColumnWidthControl;
}(react_1.default.Component));
exports.default = TableColumnWidthControl;
var TableColumnWidthControlRender = /** @class */ (function (_super) {
    tslib_1.__extends(TableColumnWidthControlRender, _super);
    function TableColumnWidthControlRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableColumnWidthControlRender = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-columnWidthControl',
            renderLabel: false
        })
    ], TableColumnWidthControlRender);
    return TableColumnWidthControlRender;
}(TableColumnWidthControl));
exports.TableColumnWidthControlRender = TableColumnWidthControlRender;
