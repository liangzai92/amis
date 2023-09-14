"use strict";
/**
 * @file mapping 映射源配置
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSourceControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_core_1 = require("amis-core");
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
var MapType;
(function (MapType) {
    MapType["CUSTOM"] = "custom";
    MapType["API"] = "api";
    MapType["VARIABLE"] = "variable";
})(MapType || (MapType = {}));
var MapSourceControl = /** @class */ (function (_super) {
    tslib_1.__extends(MapSourceControl, _super);
    function MapSourceControl(props) {
        var _this = _super.call(this, props) || this;
        _this.debounceMapChange = (0, debounce_1.default)(_this.handleMapChange, 250);
        var mapType = MapType.CUSTOM;
        if (props.data.hasOwnProperty('source') && props.data.source) {
            mapType = /\$\{(.*?)\}/g.test(props.data.source)
                ? MapType.VARIABLE
                : MapType.API;
        }
        _this.state = {
            map: props.data.map,
            source: props.data.source,
            labelField: props.data.labelField,
            valueField: props.data.valueField,
            mapType: mapType
        };
        return _this;
    }
    MapSourceControl.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var _a, _b, _c;
        var isArrayOld = Array.isArray((_a = prevProps.data) === null || _a === void 0 ? void 0 : _a.map);
        var isArrayNew = Array.isArray((_b = this.props.data) === null || _b === void 0 ? void 0 : _b.map);
        // map 类型改变了
        if (isArrayOld !== isArrayNew) {
            this.setState({
                map: (_c = this.props.data) === null || _c === void 0 ? void 0 : _c.map
            });
        }
    };
    /**
     * 更新map字段的统一出口
     */
    MapSourceControl.prototype.onChange = function () {
        var _a = this.state, mapType = _a.mapType, source = _a.source, map = _a.map, labelField = _a.labelField, valueField = _a.valueField;
        var onBulkChange = this.props.onBulkChange;
        labelField = labelField === '' ? undefined : labelField;
        valueField = valueField === '' ? undefined : valueField;
        if (mapType === MapType.CUSTOM) {
            onBulkChange &&
                onBulkChange({
                    map: map,
                    source: undefined,
                    labelField: labelField,
                    valueField: valueField
                });
            return;
        }
        if ([MapType.API, MapType.VARIABLE].includes(mapType)) {
            onBulkChange &&
                onBulkChange({
                    source: source,
                    map: undefined,
                    labelField: labelField,
                    valueField: valueField
                });
            return;
        }
    };
    /**
     * 切换选项类型
     */
    MapSourceControl.prototype.handleMapTypeChange = function (mapType) {
        this.setState({
            mapType: mapType,
            labelField: undefined,
            valueField: undefined
        }, this.onChange);
    };
    MapSourceControl.prototype.renderHeader = function () {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, label = _b.label, labelRemark = _b.labelRemark, useMobileUI = _b.useMobileUI, env = _b.env, popOverContainer = _b.popOverContainer;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        var mapType = this.state.mapType;
        var optionSourceList = [
            {
                label: '自定义选项',
                value: MapType.CUSTOM
            },
            {
                label: '外部接口',
                value: MapType.API
            },
            {
                label: '上下文变量',
                value: MapType.VARIABLE
            }
        ].map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), { onClick: function () { return _this.handleMapTypeChange(item.value); } })); });
        return (react_1.default.createElement("header", { className: "ae-OptionControl-header" },
            react_1.default.createElement("label", { className: (0, classnames_1.default)("".concat(classPrefix, "Form-label")), style: { marginBottom: 0 } },
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
                    selected: optionSourceList.find(function (item) { return item.value === mapType; })
                        .label
                }
            }))));
    };
    MapSourceControl.prototype.handleMapChange = function (map) {
        this.setState({ map: map }, this.onChange);
    };
    MapSourceControl.prototype.handleAPIChange = function (source) {
        this.setState({ source: source }, this.onChange);
    };
    MapSourceControl.prototype.handleLabelFieldChange = function (labelField) {
        this.setState({ labelField: labelField }, this.onChange);
    };
    MapSourceControl.prototype.handleValueFieldChange = function (valueField) {
        this.setState({ valueField: valueField }, this.onChange);
    };
    MapSourceControl.prototype.renderOtherFields = function () {
        return [
            {
                label: (0, amis_editor_core_1.tipedLabel)('值匹配字段', '映射表是数组对象，且对象有多个key时，用来匹配值的字段, 默认为value'),
                type: 'input-text',
                name: 'valueField',
                placeholder: '匹配字段，默认为value',
                onChange: this.handleValueFieldChange
            },
            {
                label: (0, amis_editor_core_1.tipedLabel)('显示字段', '映射表是数组对象时，用作显示的字段，显示多字段请使用自定义显示模板，默认为label'),
                type: 'input-text',
                name: 'labelField',
                placeholder: '显示字段，默认为label',
                onChange: this.handleLabelFieldChange,
                visibleOn: '${!itemSchema}'
            }
        ];
    };
    MapSourceControl.prototype.renderApiPanel = function () {
        var render = this.props.render;
        var _a = this.state, mapType = _a.mapType, source = _a.source, labelField = _a.labelField, valueField = _a.valueField;
        if (mapType === MapType.CUSTOM) {
            return null;
        }
        return render('api', (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
            label: '接口',
            name: 'source',
            mode: 'normal',
            className: 'ae-ExtendMore',
            visibleOn: 'data.autoComplete !== false',
            value: source,
            onChange: this.handleAPIChange,
            sourceType: mapType,
            footer: this.renderOtherFields()
        }));
    };
    MapSourceControl.prototype.renderObjectMap = function () {
        var _this = this;
        var render = this.props.render;
        return render('objectMap', (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
            label: '',
            type: 'combo',
            mode: 'normal',
            scaffold: {
                key: 'key-{index}',
                value: 'value-{index}'
            },
            required: true,
            name: 'map',
            descriptionClassName: 'help-block text-xs m-b-none',
            description: '<p>当值命中左侧 Key 时，展示右侧内容<br />当没有命中时，默认展示 Key 为 <code>*</code>的内容</div><br />(请确保key值唯一)',
            multiple: true,
            pipeIn: function (value) {
                if (!(0, amis_core_1.isObject)(value)) {
                    return [
                        {
                            key: 'key0',
                            value: 'value1'
                        }
                    ];
                }
                var arr = [];
                Object.keys(value).forEach(function (key) {
                    arr.push({
                        key: key || '',
                        value: typeof value[key] === 'string'
                            ? value[key]
                            : JSON.stringify(value[key])
                    });
                });
                return arr;
            },
            pipeOut: function (value) {
                if (!Array.isArray(value)) {
                    return value;
                }
                var obj = {};
                value.forEach(function (item, idx) {
                    var key = item.key || '';
                    var value = item.value;
                    if (key === 'key-{index}' && value === 'value-{index}') {
                        key = key.replace('-{index}', "".concat(idx));
                        value = value.replace('-{index}', "".concat(idx));
                    }
                    try {
                        value = JSON.parse(value);
                    }
                    catch (e) { }
                    obj[key] = value;
                });
                return obj;
            },
            onChange: function (value) {
                _this.handleMapChange(value || { '*': '通配值' });
            },
            items: [
                {
                    placeholder: 'Key',
                    type: 'input-text',
                    unique: true,
                    name: 'key',
                    required: true,
                    columnClassName: 'w-xs'
                },
                {
                    placeholder: '内容',
                    type: 'input-text',
                    name: 'value'
                }
            ]
        }));
    };
    MapSourceControl.prototype.handleMapItemChange = function (index, item) {
        var _a = this.state.map, map = _a === void 0 ? [] : _a;
        var newMap = map.slice();
        try {
            item = JSON.parse(item);
        }
        catch (e) { }
        newMap.splice(index, 1, item);
        this.handleMapChange(newMap);
    };
    MapSourceControl.prototype.renderArrayMap = function () {
        var _this = this;
        var render = this.props.render;
        return (react_1.default.createElement("div", { className: "ae-ExtendMore" }, render('arrayMap', tslib_1.__spreadArray([
            {
                type: 'json-editor',
                name: 'map',
                label: false,
                placeholder: '请保持数组成员结构相同',
                onChange: function (value) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    try {
                        var map = JSON.parse(value);
                        _this.debounceMapChange(map);
                    }
                    catch (e) {
                        console.error();
                    }
                }
            }
        ], tslib_1.__read(this.renderOtherFields()), false))));
    };
    MapSourceControl.prototype.renderMap = function () {
        var map = this.state.map;
        if (map && Array.isArray(map)) {
            return this.renderArrayMap();
        }
        return this.renderObjectMap();
    };
    MapSourceControl.prototype.render = function () {
        var mapType = this.state.mapType;
        var _a = this.props, className = _a.className, render = _a.render;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-OptionControl', className) },
            this.renderHeader(),
            mapType === MapType.CUSTOM ? this.renderMap() : null,
            mapType === MapType.API ? this.renderApiPanel() : null,
            mapType === MapType.VARIABLE
                ? render('variable', (0, amis_editor_core_1.getSchemaTpl)('sourceBindControl', {
                    label: false,
                    className: 'ae-ExtendMore'
                }), {
                    onChange: this.handleAPIChange
                })
                : null));
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MapSourceControl.prototype, "handleMapTypeChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MapSourceControl.prototype, "handleMapChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MapSourceControl.prototype, "handleAPIChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MapSourceControl.prototype, "handleLabelFieldChange", null);
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MapSourceControl.prototype, "handleValueFieldChange", null);
    return MapSourceControl;
}(react_1.default.Component));
exports.default = MapSourceControl;
var MapSourceControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MapSourceControlRenderer, _super);
    function MapSourceControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapSourceControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-mapSourceControl',
            renderLabel: false
        })
    ], MapSourceControlRenderer);
    return MapSourceControlRenderer;
}(MapSourceControl));
exports.MapSourceControlRenderer = MapSourceControlRenderer;
