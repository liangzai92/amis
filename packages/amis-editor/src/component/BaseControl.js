"use strict";
/**
 * @file 基础控件集合
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.remarkTpl = exports.formItemControl = exports.BaseLabelMark = exports.BUTTON_DEFAULT_ACTION = void 0;
var tslib_1 = require("tslib");
var flatten_1 = tslib_1.__importDefault(require("lodash/flatten"));
var helper_1 = require("../renderer/event-control/helper");
var amis_editor_core_1 = require("amis-editor-core");
// 默认动作
exports.BUTTON_DEFAULT_ACTION = {
    onEvent: {
        click: {
            actions: []
        }
    }
};
/**
 * Label提示
 * 支持传入Schema或String，传入String则使用默认配置，如下：
 *
 * @default
 * ```
 * className: 'ae-BaseRemark',
 * icon: 'fa fa-question-circle',
 * trigger: ['hover', 'click'],
 * placement: 'left'
 * ```
 */
var BaseLabelMark = function (schema) {
    var base = {
        className: 'ae-BaseRemark',
        icon: 'fa fa-question-circle',
        trigger: ['hover', 'click'],
        placement: 'left',
        content: ''
    };
    if (!(0, amis_editor_core_1.isObject)(schema) || typeof schema === 'string') {
        return schema ? tslib_1.__assign(tslib_1.__assign({}, base), { content: schema.toString() }) : undefined;
    }
    var className = schema.className, content = schema.content, rest = tslib_1.__rest(schema, ["className", "content"]);
    return content
        ? tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, base), rest), (className
            ? { className: "".concat(base.className, " ").concat(rest.className) }
            : {})), { content: content }) : undefined;
};
exports.BaseLabelMark = BaseLabelMark;
var normalizCollapsedGroup = function (publicProps, body) {
    if (publicProps === void 0) { publicProps = {}; }
    return body
        ? Array.isArray(body)
            ? body
                .filter(function (item) { return item; })
                .map(function (item, index) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, publicProps), { key: item.key || index.toString() }), item), { body: (0, flatten_1.default)(item.body) })); })
            : [
                tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, publicProps), { key: '0' }), body)
            ]
        : [];
};
/**
 * 更新/归一化处理表单项
 *
 * @param defaultBody 默认配置
 * @param body 输入配置
 * @param replace 是否完全替换
 * @returns
 */
var normalizeBodySchema = function (defaultBody, body, replace, reverse, order) {
    if (replace === void 0) { replace = false; }
    if (reverse === void 0) { reverse = false; }
    if (order === void 0) { order = {}; }
    var normalizedBody = body
        ? Array.isArray(body)
            ? body.concat()
            : [body]
        : [];
    var schema = (0, flatten_1.default)(replace
        ? normalizedBody
        : reverse
            ? tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(normalizedBody), false), tslib_1.__read(defaultBody), false) : tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(defaultBody), false), tslib_1.__read(normalizedBody), false));
    return schema;
};
/**
 * 表单项组件面板
 *
 * @param {Object=} panels
 * @param {string=} key
 * `property` 属性
 *     `common` 基本
 *     `status` 状态
 *     `validation` 校验
 * `style` 样式
 * `event` 事件
 * @param {string=} panels.body - 配置面板Schema
 * @param {boolean=} panels.replace - 是否完全替换默认Schema，默认追加
 * @param {Array} panels.validation.validationType - 默认显示的校验类型
 */
var formItemControl = function (panels, context) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var type = ((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.type) || '';
    var supportStatic = helper_1.SUPPORT_STATIC_FORMITEM_CMPTS.includes(type);
    var collapseProps = {
        type: 'collapse',
        headingClassName: 'ae-formItemControl-header',
        bodyClassName: 'ae-formItemControl-body'
    };
    // 已经配置了的属性
    var propsList = Object.keys((_b = context === null || context === void 0 ? void 0 : context.schema) !== null && _b !== void 0 ? _b : {});
    // 选项面版内容，支持Option的组件才展示该面板
    var optionBody = normalizeBodySchema([], (_c = panels === null || panels === void 0 ? void 0 : panels.option) === null || _c === void 0 ? void 0 : _c.body, (_d = panels === null || panels === void 0 ? void 0 : panels.option) === null || _d === void 0 ? void 0 : _d.replace);
    // 属性面板配置
    var collapseGroupBody = (panels === null || panels === void 0 ? void 0 : panels.property)
        ? normalizCollapsedGroup(collapseProps, panels === null || panels === void 0 ? void 0 : panels.property)
        : tslib_1.__spreadArray(tslib_1.__spreadArray([
            tslib_1.__assign(tslib_1.__assign({}, collapseProps), { header: '基本', key: 'common', body: normalizeBodySchema([
                    (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                        required: true
                    }),
                    (0, amis_editor_core_1.getSchemaTpl)('label'),
                    (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                    (0, amis_editor_core_1.getSchemaTpl)('remark'),
                    (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                    (0, amis_editor_core_1.getSchemaTpl)('description')
                ], (_e = panels === null || panels === void 0 ? void 0 : panels.common) === null || _e === void 0 ? void 0 : _e.body, (_f = panels === null || panels === void 0 ? void 0 : panels.common) === null || _f === void 0 ? void 0 : _f.replace, (_g = panels === null || panels === void 0 ? void 0 : panels.common) === null || _g === void 0 ? void 0 : _g.reverse) })
        ], tslib_1.__read((optionBody.length !== 0
            ? [
                tslib_1.__assign(tslib_1.__assign({}, collapseProps), { header: ((_h = panels === null || panels === void 0 ? void 0 : panels.option) === null || _h === void 0 ? void 0 : _h.title) || '选项', key: 'option', body: optionBody })
            ]
            : [])), false), [
            tslib_1.__assign(tslib_1.__assign({}, collapseProps), { header: '状态', key: 'status', body: normalizeBodySchema([
                    (0, amis_editor_core_1.getSchemaTpl)('hidden'),
                    supportStatic ? (0, amis_editor_core_1.getSchemaTpl)('static') : null,
                    // TODO: 下面的部分表单项才有，是不是判断一下是否是表单项
                    (0, amis_editor_core_1.getSchemaTpl)('disabled'),
                    (0, amis_editor_core_1.getSchemaTpl)('clearValueOnHidden')
                ], (_j = panels === null || panels === void 0 ? void 0 : panels.status) === null || _j === void 0 ? void 0 : _j.body, (_k = panels === null || panels === void 0 ? void 0 : panels.status) === null || _k === void 0 ? void 0 : _k.replace, (_l = panels === null || panels === void 0 ? void 0 : panels.status) === null || _l === void 0 ? void 0 : _l.reverse) })
        ], false);
    return [
        {
            type: 'tabs',
            tabsMode: 'line',
            className: 'editor-prop-config-tabs',
            linksClassName: 'editor-prop-config-tabs-links',
            contentClassName: 'no-border editor-prop-config-tabs-cont',
            tabs: tslib_1.__spreadArray([
                {
                    title: '属性',
                    className: 'p-none',
                    body: [
                        {
                            type: 'collapse-group',
                            expandIconPosition: 'right',
                            expandIcon: {
                                type: 'icon',
                                icon: 'chevron-right'
                            },
                            className: 'ae-formItemControl',
                            activeKey: collapseGroupBody.map(function (group, index) { return group.key; }),
                            body: collapseGroupBody
                        }
                    ]
                },
                {
                    title: '外观',
                    body: normalizeBodySchema(tslib_1.__spreadArray([
                        (0, amis_editor_core_1.getSchemaTpl)('formItemMode'),
                        (0, amis_editor_core_1.getSchemaTpl)('horizontalMode'),
                        (0, amis_editor_core_1.getSchemaTpl)('horizontal', {
                            label: '',
                            visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
                        }),
                        // renderer.sizeMutable !== false
                        //   ? getSchemaTpl('formItemSize')
                        //   : null,
                        (0, amis_editor_core_1.getSchemaTpl)('formItemInline'),
                        (0, amis_editor_core_1.getSchemaTpl)('className'),
                        (0, amis_editor_core_1.getSchemaTpl)('className', {
                            label: 'Label CSS 类名',
                            name: 'labelClassName'
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('className', {
                            label: '控件 CSS 类名',
                            name: 'inputClassName'
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('className', {
                            label: '描述 CSS 类名',
                            name: 'descriptionClassName',
                            visibleOn: 'this.description'
                        })
                    ], tslib_1.__read((!supportStatic
                        ? []
                        : [
                            (0, amis_editor_core_1.getSchemaTpl)('className', {
                                label: '静态 CSS 类名',
                                name: 'staticClassName'
                            })
                        ])), false), (_m = panels === null || panels === void 0 ? void 0 : panels.style) === null || _m === void 0 ? void 0 : _m.body, (_o = panels === null || panels === void 0 ? void 0 : panels.style) === null || _o === void 0 ? void 0 : _o.replace, (_p = panels === null || panels === void 0 ? void 0 : panels.style) === null || _p === void 0 ? void 0 : _p.reverse)
                }
            ], tslib_1.__read(((0, amis_editor_core_1.isObject)(context) && !((_q = panels === null || panels === void 0 ? void 0 : panels.event) === null || _q === void 0 ? void 0 : _q.hidden)
                ? [
                    {
                        title: '事件',
                        className: 'p-none',
                        body: normalizeBodySchema([
                            (0, amis_editor_core_1.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(context.info.plugin.manager, context)))
                        ], (_r = panels === null || panels === void 0 ? void 0 : panels.event) === null || _r === void 0 ? void 0 : _r.body, (_s = panels === null || panels === void 0 ? void 0 : panels.event) === null || _s === void 0 ? void 0 : _s.replace)
                    }
                ]
                : [])), false)
        }
    ];
};
exports.formItemControl = formItemControl;
/**
 * 信息提示组件模版
 */
function remarkTpl(config) {
    return {
        type: 'ae-switch-more',
        formType: 'dialog',
        className: 'ae-switch-more-flex',
        label: config.labelRemark
            ? (0, amis_editor_core_1.tipedLabel)(config.label, config.labelRemark)
            : config.label,
        bulk: false,
        name: config.name,
        pipeIn: function (value) { return !!value; },
        pipeOut: function (value) {
            // 更新内容
            if ((0, amis_editor_core_1.isObject)(value)) {
                return value;
            }
            // 关到开
            if (value) {
                return {
                    icon: 'fa fa-question-circle',
                    trigger: ['hover'],
                    className: 'Remark--warning',
                    placement: 'top'
                };
            }
            // 开到关
            return undefined;
        },
        form: {
            size: 'md',
            className: 'mb-8',
            mode: 'horizontal',
            horizontal: {
                left: 4,
                right: 8,
                justify: true
            },
            body: {
                type: 'grid',
                className: 'pt-4 right-panel-pop',
                gap: 'lg',
                columns: [
                    {
                        md: '6',
                        body: [
                            {
                                name: 'title',
                                type: !config.i18nEnabled ? 'input-text' : 'input-text-i18n',
                                label: '提示标题',
                                placeholder: '请输入提示标题'
                            },
                            {
                                name: 'content',
                                type: !config.i18nEnabled ? 'textarea' : 'textarea-i18n',
                                label: '内容'
                            }
                        ]
                    },
                    {
                        md: '6',
                        body: [
                            {
                                name: 'placement',
                                type: 'button-group-select',
                                size: 'md',
                                label: '弹出位置',
                                options: [
                                    {
                                        label: '上',
                                        value: 'top'
                                    },
                                    {
                                        label: '下',
                                        value: 'bottom'
                                    },
                                    {
                                        label: '左',
                                        value: 'left'
                                    },
                                    {
                                        label: '右',
                                        value: 'right'
                                    }
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('icon'),
                            {
                                name: 'className',
                                label: 'CSS 类名',
                                type: 'input-text',
                                labelRemark: (0, exports.BaseLabelMark)('有哪些辅助类 CSS 类名？请前往 <a href="https://baidu.gitee.io/amis/zh-CN/style/index" target="_blank">样式说明</a>，除此之外你可以添加自定义类名，然后在系统配置中添加自定义样式。')
                            },
                            {
                                name: 'trigger',
                                type: 'select',
                                label: '触发方式',
                                labelRemark: (0, exports.BaseLabelMark)('浮层触发方式默认值为鼠标悬停'),
                                multiple: true,
                                pipeIn: function (value) {
                                    return Array.isArray(value) ? value.join(',') : [];
                                },
                                pipeOut: function (value) {
                                    return value && value.length ? value.split(',') : ['hover'];
                                },
                                options: [
                                    {
                                        label: '鼠标悬停',
                                        value: 'hover'
                                    },
                                    {
                                        label: '点击',
                                        value: 'click'
                                    }
                                ]
                            },
                            {
                                name: 'rootClose',
                                visibleOn: '~this.trigger.indexOf("click")',
                                label: '点击空白关闭',
                                type: 'switch',
                                mode: 'row',
                                inputClassName: 'inline-flex justify-between flex-row-reverse'
                            }
                        ]
                    }
                ]
            }
        }
    };
}
exports.remarkTpl = remarkTpl;
