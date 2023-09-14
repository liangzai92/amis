"use strict";
/**
 * @file 角标控件
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var BadgeControl = /** @class */ (function (_super) {
    tslib_1.__extends(BadgeControl, _super);
    function BadgeControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            checked: !!(0, amis_editor_core_1.isObject)(props === null || props === void 0 ? void 0 : props.value)
        };
        return _this;
    }
    BadgeControl.prototype.transformBadgeValue = function () {
        var _a, _b;
        var ctx = this.props.data;
        var badge = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.badge) !== null && _a !== void 0 ? _a : {};
        // 避免获取到上层的size
        var size = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.badge) === null || _b === void 0 ? void 0 : _b.size;
        var offset = [0, 0];
        // 转换成combo可以识别的格式
        if (Array.isArray(badge === null || badge === void 0 ? void 0 : badge.offset) && (badge === null || badge === void 0 ? void 0 : badge.offset.length) >= 2) {
            offset[0] = badge.offset[0];
            offset[1] = badge.offset[1];
        }
        return tslib_1.__assign(tslib_1.__assign({}, badge), { size: size, offset: offset });
    };
    BadgeControl.prototype.normalizeBadgeValue = function (form) {
        var _a, _b;
        var offset = (0, amis_editor_core_1.isObject)(form === null || form === void 0 ? void 0 : form.offset) && ((_a = form === null || form === void 0 ? void 0 : form.offset) === null || _a === void 0 ? void 0 : _a[0]) && ((_b = form === null || form === void 0 ? void 0 : form.offset) === null || _b === void 0 ? void 0 : _b[1])
            ? { offset: [form.offset[0], form.offset[1]] }
            : {};
        return tslib_1.__assign(tslib_1.__assign({}, form), offset);
    };
    BadgeControl.prototype.handleSwitchChange = function (checked) {
        var _a = this.props, onBulkChange = _a.onBulkChange, data = _a.data;
        this.setState({ checked: checked });
        if (checked) {
            if (data.badge) {
                onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ badge: data.badge });
            }
            else {
                onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ badge: { mode: 'dot' } });
            }
        }
        else {
            onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ badge: undefined });
        }
    };
    BadgeControl.prototype.handleSubmit = function (form, action) {
        form.visibleOn = '${badge}';
        if (form.mode === 'dot') {
            form.text = undefined;
        }
        else {
            form.text = '${badge}';
        }
        var onBulkChange = this.props.onBulkChange;
        if ((action === null || action === void 0 ? void 0 : action.type) === 'submit') {
            onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ badge: this.normalizeBadgeValue(form) });
        }
    };
    BadgeControl.prototype.renderBody = function () {
        var render = this.props.render;
        var data = this.transformBadgeValue();
        var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
        return render('badge-form', {
            type: 'form',
            className: 'ae-BadgeControl-form w-full',
            wrapWithPanel: false,
            panelClassName: 'border-none shadow-none mb-0',
            bodyClassName: 'p-none',
            actionsClassName: 'border-none mt-2.5',
            wrapperComponent: 'div',
            preventEnterSubmit: true,
            submitOnChange: true,
            body: [
                {
                    label: '角标类型',
                    name: 'mode',
                    type: 'button-group-select',
                    size: 'sm',
                    tiled: true,
                    className: 'ae-BadgeControl-buttonGroup',
                    options: [
                        { label: '点', value: 'dot' },
                        { label: '文字', value: 'text' },
                        { label: '缎带', value: 'ribbon' }
                    ],
                    mode: 'horizontal',
                    horizontal: {
                        justify: true,
                        left: 4
                    },
                    pipeIn: (0, amis_editor_core_2.defaultValue)('dot')
                },
                {
                    label: (0, amis_editor_core_2.tipedLabel)('封顶数字', '仅在文本内容为数字下生效'),
                    name: 'overflowCount',
                    type: 'input-number',
                    size: 'sm',
                    visibleOn: "data.mode === 'text'",
                    mode: 'horizontal',
                    horizontal: {
                        justify: true,
                        left: 4
                    }
                },
                {
                    label: '大小',
                    name: 'size',
                    type: 'input-number',
                    size: 'sm',
                    suffix: 'px',
                    mode: 'horizontal',
                    horizontal: {
                        justify: true,
                        left: 4
                    }
                },
                {
                    label: '主题',
                    name: 'level',
                    type: 'select',
                    size: 'sm',
                    mode: 'horizontal',
                    horizontal: {
                        justify: true,
                        left: 4
                    },
                    tiled: true,
                    className: 'input-select',
                    options: [
                        { label: '成功', value: 'success' },
                        { label: '警告', value: 'warning' },
                        { label: '危险', value: 'danger' },
                        { label: '信息', value: 'info' }
                    ],
                    pipeIn: (0, amis_editor_core_2.defaultValue)('danger')
                },
                {
                    label: '位置',
                    name: 'position',
                    type: 'select',
                    size: 'sm',
                    mode: 'horizontal',
                    horizontal: {
                        justify: true,
                        left: 4
                    },
                    tiled: true,
                    className: 'input-select',
                    options: [
                        {
                            label: '左上角',
                            value: 'top-left'
                        },
                        {
                            label: '右上角',
                            value: 'top-right'
                        },
                        {
                            label: '左下角',
                            value: 'bottom-left'
                        },
                        {
                            label: '右下角',
                            value: 'bottom-right'
                        }
                    ],
                    pipeIn: (0, amis_editor_core_2.defaultValue)('top-right')
                },
                {
                    type: 'group',
                    mode: 'horizontal',
                    horizontal: {
                        justify: true,
                        left: 4
                    },
                    label: (0, amis_editor_core_2.tipedLabel)('偏移量', '角标位置相对”水平“、”垂直“的偏移量'),
                    body: [
                        {
                            type: 'input-text',
                            name: 'offset[0]',
                            label: false,
                            addOn: {
                                label: 'X',
                                type: 'text',
                                position: 'left'
                            },
                            validateOnChange: true,
                            validations: {
                                isNumeric: true
                            }
                        },
                        {
                            type: 'input-text',
                            label: false,
                            name: 'offset[1]',
                            addOn: {
                                label: 'Y',
                                type: 'text',
                                position: 'left'
                            },
                            validateOnChange: true,
                            validations: {
                                isNumeric: true
                            }
                        }
                    ]
                }
            ]
        }, {
            data: data,
            onSubmit: this.handleSubmit.bind(this)
        });
    };
    BadgeControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, classPrefix = _a.classPrefix, className = _a.className, labelClassName = _a.labelClassName, label = _a.label, disabled = _a.disabled, render = _a.render;
        var checked = this.state.checked;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-BadgeControl', className) },
            render('', (0, amis_editor_core_2.getSchemaTpl)('switch', {
                label: (0, amis_editor_core_2.tipedLabel)('角标', '此处配置角标样式，需同时在菜单项中配置角标内容后角标生效'),
                name: 'checked',
                mode: 'horizontal',
                value: checked,
                onChange: function (checked) { return _this.handleSwitchChange(checked); }
            })),
            checked ? this.renderBody() : null));
    };
    BadgeControl.defaultProps = {
        mode: 'dot',
        overflowCount: 99,
        position: 'top-right',
        level: 'danger'
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], BadgeControl.prototype, "handleSwitchChange", null);
    return BadgeControl;
}(react_1.default.Component));
exports.default = BadgeControl;
var BadgeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(BadgeControlRenderer, _super);
    function BadgeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BadgeControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'ae-nav-badge', renderLabel: false })
    ], BadgeControlRenderer);
    return BadgeControlRenderer;
}(BadgeControl));
exports.BadgeControlRenderer = BadgeControlRenderer;
