"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateShortCutControlRender = exports.DateShortCutControl = void 0;
var tslib_1 = require("tslib");
/**
 * @file 时间选择器的快捷键
 */
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var sortablejs_1 = tslib_1.__importDefault(require("sortablejs"));
var react_dom_1 = require("react-dom");
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var FormulaControl_1 = require("./FormulaControl");
var DefaultValue = [
    'yesterday',
    '7daysago',
    'thismonth',
    'prevmonth',
    'prevquarter'
];
var CertainPresetShorcut = {
    today: '今天',
    yesterday: '昨天',
    thisweek: '这个周',
    prevweek: '上周',
    thismonth: '这个月',
    prevmonth: '上个月',
    thisquarter: '这个季度',
    prevquarter: '上个季度',
    thisyear: '今年'
};
var ModifyPresetShorcut = {
    $hoursago: '最近n小时',
    $daysago: '最近n天',
    $dayslater: 'n天以内',
    $weeksago: '最近n周',
    $weekslater: 'n周以内',
    $monthsago: '最近n月',
    $monthslater: 'n月以内',
    $quartersago: '最近n季度',
    $quarterslater: 'n季度以内',
    $yearsago: '最近n年',
    $yearslater: 'n年以内'
};
var OptionType;
(function (OptionType) {
    OptionType[OptionType["Custom"] = 1] = "Custom";
    OptionType[OptionType["Certain"] = 2] = "Certain";
    OptionType[OptionType["Modify"] = 3] = "Modify";
})(OptionType || (OptionType = {}));
var ShortCutItemWrap = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("a", { className: klass + 'Item-dragBar' },
            react_1.default.createElement(amis_1.Icon, { icon: "drag-bar", className: "icon" })),
        react_1.default.createElement("span", { className: klass + 'Item-content' }, props.children),
        react_1.default.createElement("span", { className: klass + 'Item-close', onClick: function (e) { return props.handleDelete(props.index, e); } },
            react_1.default.createElement(amis_1.Icon, { icon: "status-close", className: "icon" }))));
};
var klass = 'ae-DateShortCutControl';
var DateShortCutControl = /** @class */ (function (_super) {
    tslib_1.__extends(DateShortCutControl, _super);
    function DateShortCutControl(props) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, props) || this;
        // 初始化下拉选项
        var certainOptions = props.certainOptions, modifyOptions = props.modifyOptions, data = props.data;
        _this.certainDropDownOptions = certainOptions.map(function (key) { return ({
            label: CertainPresetShorcut[key],
            value: key
        }); });
        _this.modifyDropDownOptions = modifyOptions.map(function (key) { return ({
            label: ModifyPresetShorcut[key],
            value: key
        }); });
        // 初始化原始组件配置的快捷键
        /** amis 3.1.0之后ranges属性废弃，此处兼容 */
        var initData = (_b = (_a = data === null || data === void 0 ? void 0 : data.ranges) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.shortcuts) !== null && _b !== void 0 ? _b : DefaultValue;
        initData = Array.isArray(initData) ? initData : initData.split(',');
        _this.state = {
            options: initData
                .map(function (item) {
                if (!item) {
                    return null;
                }
                // 完全自定义的快捷键
                if (typeof item != 'string' &&
                    item.label &&
                    item.startDate &&
                    item.endDate) {
                    return {
                        type: OptionType.Custom,
                        data: item
                    };
                }
                // amis中提供的可灵活配置数字的自定义快捷键
                var arr = item.match(/^([a-zA-Z]*)(\d+)([a-zA-Z]*)$/);
                if (arr) {
                    return {
                        data: {
                            value: arr[2],
                            key: "".concat(arr[1], "$").concat(arr[3])
                        },
                        type: OptionType.Modify
                    };
                }
                // 固定值的快捷键
                return {
                    data: item,
                    type: OptionType.Certain
                };
            })
                .filter(Boolean)
        };
        return _this;
    }
    DateShortCutControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging();
        }
        this.drag = ref;
    };
    /*
     * 滚动到底部
     */
    DateShortCutControl.prototype.scrollToBottom = function () {
        var _a, _b;
        this.drag &&
            ((_b = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            }));
    };
    /**
     * 初始化拖动
     */
    DateShortCutControl.prototype.initDragging = function () {
        var _this = this;
        var dom = (0, react_dom_1.findDOMNode)(this);
        this.sortable = new sortablejs_1.default(dom.querySelector(".".concat(klass, "-content")), {
            group: 'OptionControlGroup',
            animation: 150,
            handle: ".".concat(klass, "Item-dragBar"),
            ghostClass: "".concat(klass, "Item-dragging"),
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
                var options = _this.state.options.concat();
                options[e.oldIndex] = options.splice(e.newIndex, 1, options[e.oldIndex])[0];
                _this.setState({ options: options }, function () { return _this.onChangeOptions(); });
            }
        });
    };
    /**
     * 拖动的销毁
     */
    DateShortCutControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    /**
     * 生成快捷键项的配置
     */
    DateShortCutControl.prototype.renderOption = function (option, index) {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, schema = _b.data;
        if (option.type === OptionType.Certain) {
            return (react_1.default.createElement("span", { className: klass + 'Item-content-label' }, CertainPresetShorcut[option.data]));
        }
        if (option.type === OptionType.Custom) {
            var data = option === null || option === void 0 ? void 0 : option.data;
            return render('inner', {
                type: 'form',
                wrapWithPanel: false,
                body: [
                    {
                        type: 'input-text',
                        mode: 'normal',
                        placeholder: '快捷键名称',
                        name: 'label'
                    },
                    (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                        name: 'startDate',
                        header: '表达式或相对值',
                        DateTimeType: FormulaControl_1.FormulaDateType.IsDate,
                        rendererSchema: tslib_1.__assign(tslib_1.__assign({}, schema), { type: 'input-date' }),
                        placeholder: '开始时间',
                        needDeleteProps: [
                            'ranges',
                            'shortcuts',
                            'maxDate',
                            'id',
                            'minDuration'
                        ],
                        label: false
                    }),
                    (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                        name: 'endDate',
                        header: '表达式或相对值',
                        DateTimeType: FormulaControl_1.FormulaDateType.IsDate,
                        rendererSchema: tslib_1.__assign(tslib_1.__assign({}, schema), { type: 'input-date' }),
                        placeholder: '结束时间',
                        needDeleteProps: [
                            'ranges',
                            'shortcuts',
                            'maxDate',
                            'id',
                            'minDuration'
                        ],
                        label: false
                    })
                ],
                onChange: function (value) {
                    _this.handleOptionChange(value, index);
                }
            }, {
                data: data
            });
        }
        var key = option.data
            .key;
        var label = ((_a = ModifyPresetShorcut[key]) === null || _a === void 0 ? void 0 : _a.split('n')) || [];
        return render('inner', {
            type: 'form',
            wrapWithPanel: false,
            body: [
                {
                    name: 'value',
                    type: 'input-text',
                    prefix: label[0] || undefined,
                    suffix: label[1] || undefined,
                    mode: 'normal',
                    placeholder: 'n'
                }
            ],
            onChange: function (value) {
                return _this.handleOptionChange(value, index);
            }
        }, {
            data: option.data
        });
    };
    /**
     * 生成内容体
     */
    DateShortCutControl.prototype.renderContent = function () {
        var _this = this;
        var options = this.state.options;
        return (react_1.default.createElement("div", { className: klass + '-wrapper' }, options && options.length ? (react_1.default.createElement("ul", { className: klass + '-content', ref: this.dragRef }, options.map(function (option, index) { return (react_1.default.createElement("li", { className: klass + 'Item', key: index },
            react_1.default.createElement(ShortCutItemWrap, { index: index, handleDelete: _this.handleDelete }, _this.renderOption(option, index)))); }))) : (react_1.default.createElement("div", { className: klass + '-content ' + klass + '-empty' }, "\u672A\u914D\u7F6E"))));
    };
    /**
     * 自定义跨度变化
     */
    DateShortCutControl.prototype.handleOptionChange = function (data, index) {
        var _this = this;
        var options = tslib_1.__spreadArray([], tslib_1.__read(this.state.options), false);
        options[index].data = data;
        this.setState({ options: options }, function () { return _this.onChangeOptions(); });
    };
    /**
     * option添加
     */
    DateShortCutControl.prototype.addItem = function (item, type) {
        var _this = this;
        this.setState({
            options: this.state.options.concat({
                type: type,
                data: type === OptionType.Certain
                    ? item.value
                    : type === OptionType.Modify
                        ? { key: item.value, value: undefined }
                        : { label: undefined, startDate: undefined, endDate: undefined }
            })
        }, function () {
            _this.onChangeOptions();
            _this.scrollToBottom();
        });
    };
    /**
     * 删除选项
     */
    DateShortCutControl.prototype.handleDelete = function (index, e) {
        var _this = this;
        var options = this.state.options.concat();
        options.splice(index, 1);
        this.setState({ options: options }, function () { return _this.onChangeOptions(); });
    };
    /**
     * 更新options字段的统一出口
     */
    DateShortCutControl.prototype.onChangeOptions = function () {
        var _a;
        var options = this.state.options;
        var _b = this.props, onBulkChange = _b.onBulkChange, name = _b.name;
        var newRanges = [];
        options.forEach(function (item) {
            if (item.type === OptionType.Certain) {
                newRanges.push(item.data);
            }
            if (item.type === OptionType.Modify) {
                var data = item.data;
                var value = data.value;
                /^\d+$/.test(value) && newRanges.push(data.key.replace('$', value));
            }
            if (item.type === OptionType.Custom) {
                var data = item.data;
                data.label &&
                    data.startDate &&
                    data.endDate &&
                    newRanges.push(tslib_1.__assign({}, data));
            }
        });
        /** amis 3.1.0之后ranges属性废弃 */
        onBulkChange &&
            onBulkChange((_a = {}, _a[name !== null && name !== void 0 ? name : 'shortcuts'] = newRanges, _a.ranges = undefined, _a));
    };
    DateShortCutControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, label = _a.label, render = _a.render;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(klass, className) },
            react_1.default.createElement("header", { className: klass + '-header' },
                react_1.default.createElement("label", null, label)),
            this.renderContent(),
            react_1.default.createElement("div", { className: klass + '-footer' },
                react_1.default.createElement("div", { className: klass + '-footer-btn' }, render('inner', {
                    type: 'dropdown-button',
                    label: '常用跨度',
                    closeOnClick: true,
                    closeOnOutside: true,
                    level: 'enhance',
                    buttons: this.certainDropDownOptions.map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), { type: 'button', onAction: function (e, action) {
                            return _this.addItem(item, OptionType.Certain);
                        } })); })
                }, {
                    popOverContainer: null
                })),
                react_1.default.createElement("div", { className: klass + '-footer-btn' }, render('inner', {
                    type: 'dropdown-button',
                    label: '自定义跨度',
                    closeOnClick: true,
                    closeOnOutside: true,
                    buttons: this.modifyDropDownOptions
                        .map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), { type: 'button', onAction: function (e, action) {
                            return _this.addItem(item, OptionType.Modify);
                        } })); })
                        .concat([
                        {
                            type: 'button',
                            label: '其他',
                            onAction: function (e, action) {
                                return _this.addItem({
                                    value: {
                                        label: undefined,
                                        startDate: undefined,
                                        endData: undefined
                                    }
                                }, OptionType.Custom);
                            }
                        }
                    ])
                }, {
                    popOverContainer: null
                })))));
    };
    DateShortCutControl.defaultProps = {
        label: '快捷键'
    };
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DateShortCutControl.prototype, "dragRef", null);
    tslib_1.__decorate([
        amis_editor_core_2.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DateShortCutControl.prototype, "handleDelete", null);
    return DateShortCutControl;
}(react_1.default.PureComponent));
exports.DateShortCutControl = DateShortCutControl;
var DateShortCutControlRender = /** @class */ (function (_super) {
    tslib_1.__extends(DateShortCutControlRender, _super);
    function DateShortCutControlRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateShortCutControlRender = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: klass,
            renderLabel: false
        })
    ], DateShortCutControlRender);
    return DateShortCutControlRender;
}(DateShortCutControl));
exports.DateShortCutControlRender = DateShortCutControlRender;
