"use strict";
/**
 * @file FieldSetting.tsx
 * @desc 脚手架中字段管理
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSetting = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mobx_1 = require("mobx");
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var react_dom_1 = require("react-dom");
var amis_core_1 = require("amis-core");
var amis_ui_1 = require("amis-ui");
var FieldSetting = /** @class */ (function (_super) {
    tslib_1.__extends(FieldSetting, _super);
    function FieldSetting(props) {
        var _this = _super.call(this, props) || this;
        _this.formRef = react_1.default.createRef();
        _this.tableRef = react_1.default.createRef();
        _this.scaffold = {
            label: '',
            name: '',
            displayType: 'tpl',
            inputType: 'input-text'
        };
        _this.state = { loading: false };
        _this.reaction = (0, mobx_1.reaction)(function () {
            var _a;
            var ctx = (_a = props === null || props === void 0 ? void 0 : props.store) === null || _a === void 0 ? void 0 : _a.data;
            var initApi = ctx === null || ctx === void 0 ? void 0 : ctx.initApi;
            var listApi = ctx === null || ctx === void 0 ? void 0 : ctx.listApi;
            return "".concat(initApi).concat(listApi);
        }, function () { return _this.forceUpdate(); });
        return _this;
    }
    FieldSetting.prototype.componentDidMount = function () {
        this.dom = (0, react_dom_1.findDOMNode)(this);
    };
    FieldSetting.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.reaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    FieldSetting.prototype.handleColumnBlur = function () {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.formRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.submit();
    };
    FieldSetting.prototype.handleSubmit = function (data) {
        var _a;
        var value = this.props.value;
        var items = ((_a = data === null || data === void 0 ? void 0 : data.items) !== null && _a !== void 0 ? _a : []).map(function (field) {
            var item = value === null || value === void 0 ? void 0 : value.find(function (f) { return f.name === field.name; });
            return tslib_1.__assign(tslib_1.__assign({}, (0, pick_1.default)(tslib_1.__assign(tslib_1.__assign({}, item), field), ['label', 'name', 'displayType', 'inputType'])), { checked: true });
        });
        this.handleFieldsChange(items);
    };
    FieldSetting.prototype.handleGenerateFields = function (e) {
        var _a, _b, _c, _d, _e, _f, _g;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _h, store, renderer, feat, env, manager, ctx, onAutoGenerateFields, scaffoldData, api, fields, error_1, schemaFilter, result, sampleRow, items, error_2;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _h = this.props, store = _h.store, renderer = _h.renderer, feat = _h.feat, env = _h.env, manager = _h.manager, ctx = _h.data, onAutoGenerateFields = _h.onAutoGenerateFields;
                        scaffoldData = store === null || store === void 0 ? void 0 : store.data;
                        api = renderer === 'form'
                            ? scaffoldData === null || scaffoldData === void 0 ? void 0 : scaffoldData.initApi
                            : renderer === 'crud'
                                ? scaffoldData === null || scaffoldData === void 0 ? void 0 : scaffoldData.listApi
                                : '';
                        if (!api || (renderer === 'form' && feat !== 'Edit')) {
                            return [2 /*return*/];
                        }
                        this.setState({ loading: true });
                        fields = [];
                        if (!(onAutoGenerateFields && typeof onAutoGenerateFields === 'function')) return [3 /*break*/, 5];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, onAutoGenerateFields({
                                api: api,
                                props: this.props,
                                setState: this.setState
                            })];
                    case 2:
                        fields = _j.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _j.sent();
                        amis_ui_1.toast.warning((_a = error_1.message) !== null && _a !== void 0 ? _a : 'API返回格式不正确，请查看接口响应格式要求');
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        schemaFilter = (_b = manager === null || manager === void 0 ? void 0 : manager.store) === null || _b === void 0 ? void 0 : _b.schemaFilter;
                        if (schemaFilter) {
                            api = schemaFilter({
                                api: api
                            }).api;
                        }
                        _j.label = 6;
                    case 6:
                        _j.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, (env === null || env === void 0 ? void 0 : env.fetcher(api, ctx))];
                    case 7:
                        result = _j.sent();
                        if (!result.ok) {
                            amis_ui_1.toast.warning((_d = (_c = result.defaultMsg) !== null && _c !== void 0 ? _c : result.msg) !== null && _d !== void 0 ? _d : 'API返回格式不正确，请查看接口响应格式要求');
                            this.setState({ loading: false });
                            return [2 /*return*/];
                        }
                        sampleRow = void 0;
                        if (feat === 'List') {
                            items = ((_e = result.data) === null || _e === void 0 ? void 0 : _e.rows) || ((_f = result.data) === null || _f === void 0 ? void 0 : _f.items) || result.data;
                            sampleRow = items === null || items === void 0 ? void 0 : items[0];
                        }
                        else {
                            sampleRow = result.data;
                        }
                        if (sampleRow) {
                            Object.entries(sampleRow).forEach(function (_a) {
                                var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
                                fields.push({
                                    label: key,
                                    name: key,
                                    displayType: 'tpl',
                                    inputType: typeof value === 'number' ? 'input-number' : 'input-text',
                                    checked: true
                                });
                            });
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _j.sent();
                        amis_ui_1.toast.warning((_g = error_2.message) !== null && _g !== void 0 ? _g : 'API返回格式不正确，请查看接口响应格式要求');
                        return [3 /*break*/, 9];
                    case 9:
                        if (fields && fields.length > 0) {
                            this.handleFieldsChange(fields);
                        }
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    FieldSetting.prototype.handleFieldsChange = function (fields) {
        var _a = this.props, onChange = _a.onChange, onBulkChange = _a.onBulkChange, submitOnChange = _a.submitOnChange, renderer = _a.renderer, ctx = _a.data;
        var isFirstStep = (ctx === null || ctx === void 0 ? void 0 : ctx.__step) === 0;
        if (renderer === 'form') {
            onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
        }
        else {
            if (isFirstStep) {
                onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
                    listFields: fields,
                    editFields: fields,
                    bulkEditFields: fields,
                    insertFields: fields,
                    viewFields: fields,
                    simpleQueryFields: fields
                }, submitOnChange);
            }
            else {
                onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
            }
        }
    };
    FieldSetting.prototype.renderFooter = function () {
        var _this = this;
        var _a;
        var _b = this.props, renderer = _b.renderer, store = _b.store, ctx = _b.data, feat = _b.feat;
        var scaffoldData = store === null || store === void 0 ? void 0 : store.data;
        var _c = scaffoldData || {}, initApi = _c.initApi, listApi = _c.listApi;
        var loading = this.state.loading;
        var fieldApi = renderer === 'form' ? initApi : renderer === 'crud' ? listApi : '';
        var isApiValid = (0, amis_core_1.isValidApi)((_a = (0, amis_core_1.normalizeApi)(fieldApi)) === null || _a === void 0 ? void 0 : _a.url);
        var showAutoGenBtn = (renderer === 'form' && feat === 'Edit') ||
            (renderer === 'crud' && feat === 'List' && (ctx === null || ctx === void 0 ? void 0 : ctx.__step) === 0);
        return showAutoGenBtn ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(amis_ui_1.Button, { size: "sm", level: "link", loading: loading, disabled: !isApiValid, disabledTip: {
                    content: renderer === 'form' ? '请先填写初始化接口' : '请先填写接口',
                    tooltipTheme: 'dark'
                }, onClick: function (e) { return _this.handleGenerateFields(e); } },
                react_1.default.createElement("span", null, "\u57FA\u4E8E\u63A5\u53E3\u81EA\u52A8\u751F\u6210\u5B57\u6BB5")))) : null;
    };
    FieldSetting.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, cx = _c.classnames, formValue = _c.value, formDefaultValue = _c.defaultValue, env = _c.env, renderer = _c.renderer, config = _c.config, ctx = _c.data, feat = _c.feat;
        var _d = config || {}, showDisplayType = _d.showDisplayType, showInputType = _d.showInputType;
        var isForm = renderer === 'form';
        var defaultValue = Array.isArray(formDefaultValue)
            ? { items: formDefaultValue }
            : { items: [] };
        var value = Array.isArray(formValue) ? { items: formValue } : undefined;
        var popOverContainer = (_b = (_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)) !== null && _b !== void 0 ? _b : this.dom;
        var isFirstStep = (ctx === null || ctx === void 0 ? void 0 : ctx.__step) === 0;
        return (react_1.default.createElement(amis_ui_1.Form, { className: cx('ae-FieldSetting'), defaultValue: defaultValue, value: value, autoSubmit: false, 
            // onChange={this.handleTableChange}
            onSubmit: this.handleSubmit, ref: this.formRef }, function (_a) {
            var control = _a.control;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(amis_ui_1.InputTable, { ref: _this.tableRef, name: "items", label: false, labelAlign: "left", mode: "horizontal", horizontal: { left: 4 }, control: control, scaffold: _this.scaffold, addable: true, removable: true, isRequired: false, rules: {
                        validate: function (values) {
                            return FieldSetting.validator(values, true);
                        }
                    }, addButtonText: "\u6DFB\u52A0\u5B57\u6BB5", addButtonProps: { level: 'link' }, scroll: { y: '315.5px' }, footer: _this.renderFooter, columns: [
                        {
                            title: '序号',
                            tdRender: function (_a, index, rowIndex) {
                                var control = _a.control;
                                return (react_1.default.createElement(amis_ui_1.Controller, { name: "index", control: control, render: function (_a) {
                                        var field = _a.field, fieldState = _a.fieldState;
                                        return (react_1.default.createElement("span", null, rowIndex + 1));
                                    } }));
                            }
                        },
                        {
                            title: '字段名称',
                            tdRender: function (_a) {
                                var control = _a.control;
                                return (react_1.default.createElement(amis_ui_1.Controller, { name: "name", control: control, render: function (renderProps) {
                                        var field = renderProps.field, fieldState = renderProps.fieldState;
                                        return (react_1.default.createElement(amis_ui_1.InputBox, tslib_1.__assign({}, field, { onBlur: function () {
                                                field.onBlur();
                                                _this.handleColumnBlur();
                                            }, hasError: !!fieldState.error, className: cx('ae-FieldSetting-input') })));
                                    } }));
                            }
                        },
                        {
                            title: '标题',
                            tdRender: function (_a) {
                                var control = _a.control;
                                return (react_1.default.createElement(amis_ui_1.Controller, { name: "label", control: control, render: function (renderProps) {
                                        var field = renderProps.field, fieldState = renderProps.fieldState;
                                        return (react_1.default.createElement(amis_ui_1.InputBox, tslib_1.__assign({}, field, { onBlur: function () {
                                                field.onBlur();
                                                _this.handleColumnBlur();
                                            }, hasError: !!fieldState.error, className: cx('ae-FieldSetting-input') })));
                                    } }));
                            }
                        },
                        showInputType &&
                            !(renderer === 'crud' && feat === 'List' && !isFirstStep)
                            ? {
                                title: '输入类型',
                                tdRender: function (_a, index) {
                                    var control = _a.control;
                                    return (react_1.default.createElement(amis_ui_1.Controller, { name: "inputType", control: control, isRequired: true, render: function (_a) {
                                            var field = _a.field, fieldState = _a.fieldState;
                                            return (react_1.default.createElement(amis_ui_1.Select, tslib_1.__assign({}, field, { className: 'w-full', hasError: !!fieldState.error, searchable: true, disabled: false, clearable: false, popOverContainer: popOverContainer, options: [
                                                    {
                                                        label: '单行文本框',
                                                        value: 'input-text'
                                                    },
                                                    {
                                                        label: '多行文本',
                                                        value: 'textarea'
                                                    },
                                                    {
                                                        label: '数字输入',
                                                        value: 'input-number'
                                                    },
                                                    {
                                                        label: '单选框',
                                                        value: 'radios'
                                                    },
                                                    {
                                                        label: '勾选框',
                                                        value: 'checkbox'
                                                    },
                                                    {
                                                        label: '复选框',
                                                        value: 'checkboxes'
                                                    },
                                                    {
                                                        label: '下拉框',
                                                        value: 'select'
                                                    },
                                                    {
                                                        label: '开关',
                                                        value: 'switch'
                                                    },
                                                    {
                                                        label: '日期',
                                                        value: 'input-date'
                                                    },
                                                    {
                                                        label: '表格编辑',
                                                        value: 'input-table'
                                                    },
                                                    {
                                                        label: '组合输入',
                                                        value: 'combo'
                                                    },
                                                    {
                                                        label: '文件上传',
                                                        value: 'input-file'
                                                    },
                                                    {
                                                        label: '图片上传',
                                                        value: 'input-image'
                                                    },
                                                    {
                                                        label: '富文本编辑器',
                                                        value: 'input-rich-text'
                                                    }
                                                ] })));
                                        } }));
                                }
                            }
                            : undefined,
                        showDisplayType
                            ? {
                                title: '展示类型',
                                tdRender: function (_a) {
                                    var control = _a.control;
                                    return (react_1.default.createElement(amis_ui_1.Controller, { name: "displayType", control: control, isRequired: true, render: function (_a) {
                                            var field = _a.field, fieldState = _a.fieldState;
                                            return (react_1.default.createElement(amis_ui_1.Select, tslib_1.__assign({}, field, { className: 'w-full', hasError: !!fieldState.error, searchable: true, disabled: false, clearable: false, popOverContainer: popOverContainer, options: [
                                                    {
                                                        value: 'tpl',
                                                        label: '文本',
                                                        typeKey: 'tpl'
                                                    },
                                                    {
                                                        value: 'image',
                                                        label: '图片',
                                                        typeKey: 'src'
                                                    },
                                                    {
                                                        value: 'date',
                                                        label: '日期',
                                                        typeKey: 'value'
                                                    },
                                                    {
                                                        value: 'progress',
                                                        label: '进度',
                                                        typeKey: 'value'
                                                    },
                                                    {
                                                        value: 'status',
                                                        label: '状态',
                                                        typeKey: 'value'
                                                    },
                                                    {
                                                        value: 'mapping',
                                                        label: '映射',
                                                        typeKey: 'value'
                                                    },
                                                    {
                                                        value: 'list',
                                                        label: '列表',
                                                        typeKey: 'value'
                                                    }
                                                ] })));
                                        } }));
                                }
                            }
                            : undefined
                    ].filter(function (f) { return f != null; }) })));
        }));
    };
    FieldSetting.defaultProps = {
        config: {
            showInputType: true,
            showDisplayType: true
        }
    };
    FieldSetting.validator = function (items, isInternal) {
        var e_1, _a;
        var cache = {};
        var fields = items !== null && items !== void 0 ? items : [];
        var error = false;
        try {
            for (var _b = tslib_1.__values(fields.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = tslib_1.__read(_c.value, 2), index = _d[0], item = _d[1];
                /** 提交时再校验 */
                if (!item.name && isInternal !== true) {
                    error = "\u5E8F\u53F7\u300C".concat(index + 1, "\u300D\u7684\u5B57\u6BB5\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
                    break;
                }
                if (!cache.hasOwnProperty(item.name)) {
                    cache[item.name] = true;
                    continue;
                }
                error = "\u5E8F\u53F7\u300C".concat(index + 1, "\u300D\u7684\u5B57\u6BB5\u540D\u79F0\u300C").concat(item.name, "\u300D\u4E0D\u552F\u4E00");
                break;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return error;
    };
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "handleColumnBlur", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "handleSubmit", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], FieldSetting.prototype, "handleGenerateFields", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "handleFieldsChange", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "renderFooter", null);
    return FieldSetting;
}(react_1.default.Component));
exports.FieldSetting = FieldSetting;
var FieldSettingRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(FieldSettingRenderer, _super);
    function FieldSettingRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldSettingRenderer = tslib_1.__decorate([
        (0, amis_core_1.FormItem)({ type: 'ae-field-setting' })
    ], FieldSettingRenderer);
    return FieldSettingRenderer;
}(FieldSetting));
exports.default = FieldSettingRenderer;
