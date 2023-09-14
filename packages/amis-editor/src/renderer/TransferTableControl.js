"use strict";
/**
 * @file Transfer的表格对应选项
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTableControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_editor_core_2 = require("amis-editor-core");
function BaseOptionControl(Cmpt) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.internalProps = ['checked', 'editing'];
            _this.state = {
                api: props.data.source,
                labelField: props.data.labelField,
                valueField: props.data.valueField,
                source: props.data.source
                    ? /\$\{(.*?)\}/g.test(props.data.source)
                        ? 'variable'
                        : 'api'
                    : 'custom'
            };
            _this.handleSourceChange = _this.handleSourceChange.bind(_this);
            _this.handleAPIChange = _this.handleAPIChange.bind(_this);
            _this.handleLableFieldChange = _this.handleLableFieldChange.bind(_this);
            _this.handleValueFieldChange = _this.handleValueFieldChange.bind(_this);
            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }
        /**
         * 更新options字段的统一出口
         */
        class_1.prototype.onChange = function () {
            var source = this.state.source;
            var onBulkChange = this.props.onBulkChange;
            var data = {
                source: undefined,
                options: undefined,
                labelField: undefined,
                valueField: undefined
            };
            if (['api', 'variable'].includes(source)) {
                var _a = this.state, api = _a.api, labelField = _a.labelField, valueField = _a.valueField;
                data.source = api;
                data.labelField = labelField || undefined;
                data.valueField = valueField || undefined;
            }
            onBulkChange && onBulkChange(data);
            return;
        };
        /**
         * 切换选项类型
         */
        class_1.prototype.handleSourceChange = function (source) {
            this.setState({ api: '', source: source }, this.onChange);
        };
        class_1.prototype.handleAPIChange = function (source) {
            this.setState({ api: source }, this.onChange);
        };
        class_1.prototype.handleLableFieldChange = function (labelField) {
            this.setState({ labelField: labelField }, this.onChange);
        };
        class_1.prototype.handleValueFieldChange = function (valueField) {
            this.setState({ valueField: valueField }, this.onChange);
        };
        class_1.prototype.buildBatchAddSchema = function () {
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
                                    tpl: '每个选项单列一行，将所有值不重复的项加为新的选项;<br/>每行可通过空格来分别设置label和value,例："张三 zhangsan"'
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
                                    name: 'batchOption',
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
        class_1.prototype.renderHeader = function () {
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
            return (react_1.default.createElement("header", { className: "ae-OptionControl-header" },
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
                        selected: optionSourceList.find(function (item) { return item.value === source; }).label
                    }
                }))));
        };
        class_1.prototype.renderApiPanel = function () {
            var render = this.props.render;
            var _a = this.state, source = _a.source, api = _a.api, labelField = _a.labelField, valueField = _a.valueField;
            if (source !== 'api') {
                return null;
            }
            return render('api', (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                label: '接口',
                name: 'source',
                className: 'ae-ExtendMore',
                visibleOn: 'data.autoComplete !== false',
                value: api,
                onChange: this.handleAPIChange,
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
                    }
                ]
            }));
        };
        class_1.prototype.render = function () {
            var _a;
            var _b = this.state, source = _b.source, api = _b.api, labelField = _b.labelField, valueField = _b.valueField;
            var _c = this.props, className = _c.className, render = _c.render;
            var cmptProps = tslib_1.__assign(tslib_1.__assign({}, this.props), { data: tslib_1.__assign({ api: api, labelField: labelField, valueField: valueField }, (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) });
            return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-OptionControl', className) },
                this.renderHeader(),
                source === 'custom' ? react_1.default.createElement(Cmpt, tslib_1.__assign({}, cmptProps)) : null,
                source === 'api' ? this.renderApiPanel() : null,
                source === 'variable'
                    ? render('variable', (0, amis_editor_core_1.getSchemaTpl)('sourceBindControl', {
                        label: false,
                        className: 'ae-ExtendMore'
                    }), {
                        onChange: this.handleAPIChange
                    })
                    : null));
        };
        return class_1;
    }(react_1.default.Component));
}
var renderInput = function (name, placeholder, required, unique) {
    if (required === void 0) { required = true; }
    if (unique === void 0) { unique = false; }
    return {
        type: 'input-text',
        name: name,
        placeholder: placeholder,
        required: required,
        unique: unique
    };
};
var TransferTableOption = /** @class */ (function (_super) {
    tslib_1.__extends(TransferTableOption, _super);
    function TransferTableOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferTableOption.prototype.addColumns = function () {
        var _this = this;
        var _a = this.props.data.columns, columns = _a === void 0 ? [{ type: 'text' }] : _a;
        return {
            type: 'action',
            actionType: 'dialog',
            label: '添加表格列',
            level: 'enhance',
            dialog: {
                title: '设置表格列选项',
                headerClassName: 'font-bold',
                closeOnEsc: true,
                closeOnOutside: false,
                showCloseButton: true,
                onConfirm: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _this.handleChange(args[2].columns, 'columns');
                },
                body: [
                    {
                        name: 'columns',
                        type: 'combo',
                        multiple: true,
                        label: false,
                        strictMode: false,
                        addButtonText: '新增一列',
                        draggable: false,
                        value: columns,
                        items: [
                            {
                                type: 'input-text',
                                name: 'label',
                                placeholder: '标题'
                            },
                            {
                                type: 'input-text',
                                name: 'name',
                                placeholder: '绑定字段名'
                            },
                            {
                                type: 'select',
                                name: 'type',
                                placeholder: '类型',
                                value: 'text',
                                options: [
                                    {
                                        value: 'text',
                                        label: '纯文本'
                                    },
                                    {
                                        value: 'tpl',
                                        label: '模板'
                                    },
                                    {
                                        value: 'image',
                                        label: '图片'
                                    },
                                    {
                                        value: 'date',
                                        label: '日期'
                                    },
                                    {
                                        value: 'progress',
                                        label: '进度'
                                    },
                                    {
                                        value: 'status',
                                        label: '状态'
                                    },
                                    {
                                        value: 'mapping',
                                        label: '映射'
                                    },
                                    {
                                        value: 'operation',
                                        label: '操作栏'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
    };
    TransferTableOption.prototype.addRows = function () {
        var _this = this;
        var _a = this.props.data, _b = _a.columns, columns = _b === void 0 ? [] : _b, _c = _a.options, options = _c === void 0 ? [{}] : _c;
        return {
            type: 'tooltip-wrapper',
            tooltip: '需设置表格列后，才能设置表格行',
            tooltipTheme: 'dark',
            placement: 'top',
            tooltipStyle: {
                fontSize: '12px'
            },
            className: 'ae-formItemControl-label-tip',
            body: [
                {
                    type: 'action',
                    actionType: 'dialog',
                    label: '添加表格行',
                    level: 'enhance',
                    disabled: columns && columns.length === 0,
                    block: true,
                    dialog: {
                        title: '设置表格行选项',
                        headerClassName: 'font-bold',
                        closeOnEsc: true,
                        closeOnOutside: false,
                        showCloseButton: true,
                        size: columns.length >= 6 ? 'md' : '',
                        onConfirm: function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return _this.handleChange(args[2].options, 'options');
                        },
                        body: [
                            {
                                type: 'form',
                                wrapWithPanel: false,
                                mode: 'normal',
                                body: [
                                    {
                                        name: 'options',
                                        type: 'combo',
                                        multiple: true,
                                        draggable: true,
                                        addButtonText: '新增',
                                        value: options,
                                        items: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(columns.map(function (item) { var _a; return renderInput(item.name, (_a = item.label) !== null && _a !== void 0 ? _a : '', false); })), false), [
                                            renderInput('value', '值', true, true)
                                        ], false)
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        };
    };
    TransferTableOption.prototype.handleChange = function (value, type) {
        var _a;
        var data = this.props.data;
        var _b = this.props, onBulkChange = _b.onBulkChange, onValueChange = _b.onValueChange;
        data[type] = value;
        if (type === 'columns') {
            var keys_1 = value.map(function (item) { return item.name; });
            data.options = ((_a = data.options) !== null && _a !== void 0 ? _a : []).map(function (item) {
                return tslib_1.__assign({}, keys_1.reduce(function (pv, cv) {
                    pv[cv] = item[cv];
                    return pv;
                }, { value: item.value }));
            });
        }
        onValueChange && onValueChange(type, data, onBulkChange);
    };
    TransferTableOption.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "ae-OptionControl-footer" },
            (0, amis_1.render)(this.addColumns()),
            (0, amis_1.render)(this.addRows())));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TransferTableOption.prototype, "handleChange", null);
    return TransferTableOption;
}(react_1.default.Component));
exports.default = TransferTableOption;
var TransferTableControl = BaseOptionControl(TransferTableOption);
var TransferTableControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TransferTableControlRenderer, _super);
    function TransferTableControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferTableControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-transferTableControl',
            renderLabel: false
        })
    ], TransferTableControlRenderer);
    return TransferTableControlRenderer;
}(TransferTableControl));
exports.TransferTableControlRenderer = TransferTableControlRenderer;
