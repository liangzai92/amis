"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleTpl = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var kebabCase_1 = tslib_1.__importDefault(require("lodash/kebabCase"));
(0, amis_editor_core_1.setSchemaTpl)('style:formItem', function (_a) {
    var renderer = _a.renderer, schema = _a.schema;
    return {
        title: '表单项',
        key: 'formItem',
        body: [
            (0, amis_editor_core_1.getSchemaTpl)('formItemMode'),
            (0, amis_editor_core_1.getSchemaTpl)('labelHide'),
            (0, amis_editor_core_1.getSchemaTpl)('horizontal'),
            (renderer === null || renderer === void 0 ? void 0 : renderer.sizeMutable) !== false ? (0, amis_editor_core_1.getSchemaTpl)('formItemSize') : null
            // getSchemaTpl('formItemInline')
        ].concat(schema)
    };
});
(0, amis_editor_core_1.setSchemaTpl)('style:classNames', function (config) {
    var _a = config || {}, _b = _a.isFormItem, isFormItem = _b === void 0 ? true : _b, _c = _a.unsupportStatic, unsupportStatic = _c === void 0 ? false : _c, _d = _a.schema, schema = _d === void 0 ? [] : _d;
    return {
        title: 'CSS 类名',
        body: (isFormItem
            ? tslib_1.__spreadArray([
                (0, amis_editor_core_1.getSchemaTpl)('className', {
                    label: '表单项'
                }),
                (0, amis_editor_core_1.getSchemaTpl)('className', {
                    label: '标签',
                    name: 'labelClassName'
                }),
                (0, amis_editor_core_1.getSchemaTpl)('className', {
                    label: '控件',
                    name: 'inputClassName'
                })
            ], tslib_1.__read((unsupportStatic
                ? []
                : [
                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                        label: '静态展示',
                        name: 'staticClassName'
                    })
                ])), false) : [
            (0, amis_editor_core_1.getSchemaTpl)('className', {
                label: '外层'
            })
        ]).concat(schema)
    };
});
(0, amis_editor_core_1.setSchemaTpl)('style:others', function (schemas) {
    if (schemas === void 0) { schemas = []; }
    return ({
        title: '其他项',
        body: tslib_1.__spreadArray([], tslib_1.__read(schemas), false)
    });
});
/**
 * 通用CSS Style控件
 * @param {string | Array<string>} exclude 需要隐藏的配置key
 * @param {string | Array<string>} include 包含的配置key，存在时，优先级高于exclude
 */
(0, amis_editor_core_1.setSchemaTpl)('style:common', function (exclude, include) {
    // key统一转换成Kebab case，eg: boxShadow => bos-shadow
    exclude = (exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : []).map(function (key) { return (0, kebabCase_1.default)(key); });
    include = (include ? (Array.isArray(include) ? include : [include]) : []).map(function (key) { return (0, kebabCase_1.default)(key); });
    return [
        {
            header: '布局',
            key: 'layout',
            body: [
                {
                    type: 'style-display',
                    label: false,
                    name: 'style'
                }
            ].filter(function (comp) { return !~exclude.indexOf(comp.type.replace(/^style-/i, '')); })
        },
        {
            header: '文字',
            key: 'font',
            body: [
                {
                    type: 'style-font',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '内外边距',
            key: 'box-model',
            body: [
                {
                    type: 'style-box-model',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '背景',
            key: 'background',
            body: [
                {
                    type: 'style-background',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '边框',
            key: 'border',
            body: [
                {
                    type: 'style-border',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '阴影',
            key: 'box-shadow',
            body: [
                {
                    type: 'style-box-shadow',
                    label: false,
                    name: 'style.boxShadow'
                }
            ]
        },
        {
            header: '其他',
            key: 'other',
            body: [
                {
                    label: '透明度',
                    name: 'style.opacity',
                    min: 0,
                    max: 1,
                    step: 0.05,
                    type: 'input-range',
                    pipeIn: (0, amis_editor_core_1.defaultValue)(1),
                    marks: {
                        '0%': '0',
                        '50%': '0.5',
                        '100%': '1'
                    }
                },
                {
                    label: '光标类型',
                    name: 'style.cursor',
                    type: 'select',
                    mode: 'row',
                    menuTpl: {
                        type: 'html',
                        html: "<span style='cursor:${value};'>${label}</span><code class='ae-Code'>${value}</code>",
                        className: 'ae-selection-code'
                    },
                    pipIn: (0, amis_editor_core_1.defaultValue)('default'),
                    options: [
                        { label: '默认', value: 'default' },
                        { label: '自动', value: 'auto' },
                        { label: '无指针', value: 'none' },
                        { label: '悬浮', value: 'pointer' },
                        { label: '帮助', value: 'help' },
                        { label: '文本', value: 'text' },
                        { label: '单元格', value: 'cell' },
                        { label: '交叉指针', value: 'crosshair' },
                        { label: '可移动', value: 'move' },
                        { label: '禁用', value: 'not-allowed' },
                        { label: '可抓取', value: 'grab' },
                        { label: '放大', value: 'zoom-in' },
                        { label: '缩小', value: 'zoom-out' }
                    ]
                }
            ]
        }
    ].filter(function (item) {
        return include.length ? ~include.indexOf(item.key) : !~exclude.indexOf(item.key);
    });
});
/**
 * 宽高配置控件
 * @param {object | undefined} options witdthSchema(宽度控件配置) heightSchema(高度控件配置)
 */
(0, amis_editor_core_1.setSchemaTpl)('style:widthHeight', function (option) {
    if (option === void 0) { option = {}; }
    var _a = option.widthSchema, widthSchema = _a === void 0 ? {} : _a, _b = option.heightSchema, heightSchema = _b === void 0 ? {} : _b;
    return {
        type: 'container',
        body: [
            tslib_1.__assign({ type: 'input-number', name: 'width', label: '宽度', unitOptions: ['px', '%', 'rem', 'em', 'vw'] }, widthSchema),
            tslib_1.__assign({ type: 'input-number', name: 'height', label: '高度', unitOptions: ['px', '%', 'rem', 'em', 'vh'] }, heightSchema)
        ]
    };
});
/**
 * 样式相关的属性面板，因为预计会比较多所以拆出来
 */
exports.styleTpl = {
    name: 'style',
    type: 'combo',
    label: '',
    noBorder: true,
    multiLine: true,
    items: [
        {
            type: 'fieldSet',
            title: '文字',
            body: [
                {
                    type: 'group',
                    body: [
                        {
                            label: '文字大小',
                            type: 'input-text',
                            name: 'fontSize'
                        },
                        {
                            label: '文字粗细',
                            name: 'fontWeight',
                            type: 'select',
                            options: ['normal', 'bold', 'lighter', 'bolder']
                        }
                    ]
                },
                {
                    type: 'group',
                    body: [
                        {
                            label: '文字颜色',
                            type: 'input-color',
                            name: 'color'
                        },
                        {
                            label: '对齐方式',
                            name: 'textAlign',
                            type: 'select',
                            options: [
                                'left',
                                'right',
                                'center',
                                'justify',
                                'justify-all',
                                'start',
                                'end',
                                'match-parent'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '背景',
            body: [
                {
                    label: '颜色',
                    name: 'backgroundColor',
                    type: 'input-color'
                },
                (0, amis_editor_core_1.getSchemaTpl)('imageUrl', {
                    name: 'backgroundImage'
                })
            ]
        },
        {
            type: 'fieldSet',
            title: '边距',
            body: [
                {
                    type: 'group',
                    label: '外边距',
                    body: [
                        {
                            label: '上',
                            name: 'marginTop',
                            type: 'input-text'
                        },
                        {
                            label: '右',
                            name: 'marginRight',
                            type: 'input-text'
                        },
                        {
                            label: '下',
                            name: 'marginBottom',
                            type: 'input-text'
                        },
                        {
                            label: '左',
                            name: 'marginLeft',
                            type: 'input-text'
                        }
                    ]
                },
                {
                    type: 'group',
                    label: '内边距',
                    body: [
                        {
                            label: '上',
                            name: 'paddingTop',
                            type: 'input-text'
                        },
                        {
                            label: '右',
                            name: 'paddingRight',
                            type: 'input-text'
                        },
                        {
                            label: '下',
                            name: 'paddingBottom',
                            type: 'input-text'
                        },
                        {
                            label: '左',
                            name: 'paddingLeft',
                            type: 'input-text'
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '边框',
            body: [
                {
                    type: 'group',
                    body: [
                        {
                            label: '样式',
                            name: 'borderStyle',
                            type: 'select',
                            options: ['none', 'solid', 'dotted', 'dashed']
                        },
                        {
                            label: '颜色',
                            name: 'borderColor',
                            type: 'input-color'
                        }
                    ]
                },
                {
                    type: 'group',
                    body: [
                        {
                            label: '宽度',
                            name: 'borderWidth',
                            type: 'input-text'
                        },
                        {
                            label: '圆角宽度',
                            name: 'borderRadius',
                            type: 'input-text'
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '特效',
            body: [
                {
                    label: '透明度',
                    name: 'opacity',
                    min: 0,
                    max: 1,
                    step: 0.05,
                    type: 'input-range',
                    pipeIn: (0, amis_editor_core_1.defaultValue)(1)
                },
                {
                    label: '阴影',
                    name: 'boxShadow',
                    type: 'input-text'
                }
            ]
        }
    ]
};
/**
 * 新版主题
 */
// css类名
(0, amis_editor_core_1.setSchemaTpl)('theme:cssCode', function () {
    return {
        title: '自定义样式',
        body: [
            {
                type: 'theme-cssCode',
                label: false
            }
        ]
    };
});
// form label
(0, amis_editor_core_1.setSchemaTpl)('theme:form-label', function () {
    return {
        title: 'Label样式',
        body: [
            (0, amis_editor_core_1.getSchemaTpl)('theme:select', {
                label: '宽度',
                name: 'labelWidth'
            }),
            (0, amis_editor_core_1.getSchemaTpl)('theme:font', {
                label: '文字',
                name: 'themeCss.labelClassName.font:default',
                editorThemePath: 'form.item.default.label.body.font'
            }),
            (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                name: 'themeCss.labelClassName.padding-and-margin:default'
            })
        ]
    };
});
// form description
(0, amis_editor_core_1.setSchemaTpl)('theme:form-description', function () {
    return {
        title: '描述样式',
        visibleOn: 'this.description',
        body: [
            (0, amis_editor_core_1.getSchemaTpl)('theme:font', {
                label: '文字',
                name: 'themeCss.descriptionClassName.font:default',
                editorThemePath: 'form.item.default.description.body.font'
            }),
            (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                name: 'themeCss.descriptionClassName.padding-and-margin:default'
            })
        ]
    };
});
// 带提示的值输入框
(0, amis_editor_core_1.setSchemaTpl)('theme:select', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ mode: 'horizontal', type: 'amis-theme-select', label: '大小', name: "themeCss.className.select:default", options: '${sizesOptions}' }, option);
});
// 文字编辑器
(0, amis_editor_core_1.setSchemaTpl)('theme:font', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ mode: 'default', type: 'amis-theme-font-editor', label: '文字', name: "themeCss.className.font:default", needColorCustom: true }, option);
});
// 颜色选择器
(0, amis_editor_core_1.setSchemaTpl)('theme:colorPicker', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ mode: 'default', type: 'amis-theme-color-picker', label: '颜色', name: "themeCss.className.color:default", needCustom: true }, option);
});
// 边框选择器
(0, amis_editor_core_1.setSchemaTpl)('theme:border', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ mode: 'default', type: 'amis-theme-border', label: '边框', name: "themeCss.className.border:default", needColorCustom: true }, option);
});
// 边距选择器
(0, amis_editor_core_1.setSchemaTpl)('theme:paddingAndMargin', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ mode: 'default', type: 'amis-theme-padding-and-margin', label: '边距', name: "themeCss.className.padding-and-margin:default" }, option);
});
// 圆角选择器
(0, amis_editor_core_1.setSchemaTpl)('theme:radius', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ mode: 'default', type: 'amis-theme-radius', label: '圆角', name: "themeCss.className.radius:default" }, option);
});
// 阴影选择器
(0, amis_editor_core_1.setSchemaTpl)('theme:shadow', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ type: 'amis-theme-shadow-editor', label: false, name: "themeCss.className.boxShadow:default", hasSenior: true }, option);
});
// 尺寸选择器
(0, amis_editor_core_1.setSchemaTpl)('theme:size', function (option) {
    if (option === void 0) { option = {}; }
    return tslib_1.__assign({ mode: 'default', type: 'amis-theme-size-editor', label: false, name: "themeCss.className.size:default", options: '${sizesOptions}', hideMinWidth: true }, option);
});
(0, amis_editor_core_1.setSchemaTpl)('theme:base', function (option) {
    var _a = option.collapsed, collapsed = _a === void 0 ? false : _a, _b = option.extra, extra = _b === void 0 ? [] : _b, _c = option.classname, classname = _c === void 0 ? 'baseControlClassName' : _c, _d = option.title, title = _d === void 0 ? '基本样式' : _d, hiddenOn = option.hiddenOn;
    var styleStateFunc = function (visibleOn, state) {
        return [
            (0, amis_editor_core_1.getSchemaTpl)('theme:border', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".border:").concat(state)
            }),
            (0, amis_editor_core_1.getSchemaTpl)('theme:radius', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".radius:").concat(state)
            }),
            (0, amis_editor_core_1.getSchemaTpl)('theme:paddingAndMargin', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".padding-and-margin:").concat(state)
            }),
            (0, amis_editor_core_1.getSchemaTpl)('theme:colorPicker', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".background:").concat(state),
                label: '背景',
                needCustom: true,
                needGradient: true,
                needImage: true,
                labelMode: 'input'
            }),
            (0, amis_editor_core_1.getSchemaTpl)('theme:shadow', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".boxShadow:").concat(state)
            })
        ].concat(extra.map(function (item) {
            return tslib_1.__assign(tslib_1.__assign({}, item), { visibleOn: visibleOn, name: "themeCss.".concat(classname, ".").concat(item.name, ":").concat(state) });
        }));
    };
    var styles = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([
        {
            type: 'select',
            name: 'editorState',
            label: '状态',
            selectFirst: true,
            options: [
                {
                    label: '常规',
                    value: 'default'
                },
                {
                    label: '悬浮',
                    value: 'hover'
                },
                {
                    label: '点击',
                    value: 'active'
                }
            ]
        }
    ], tslib_1.__read(styleStateFunc("${editorState == 'default' || !editorState}", 'default')), false), tslib_1.__read(styleStateFunc("${editorState == 'hover'}", 'hover')), false), tslib_1.__read(styleStateFunc("${editorState == 'active'}", 'active')), false);
    return {
        title: title,
        collapsed: collapsed,
        body: styles,
        hiddenOn: hiddenOn
    };
});
(0, amis_editor_core_1.setSchemaTpl)('theme:common', function (option) {
    var _a = option || {}, exclude = _a.exclude, collapsed = _a.collapsed, _b = _a.extra, extra = _b === void 0 ? [] : _b, baseExtra = _a.baseExtra, layoutExtra = _a.layoutExtra, classname = _a.classname, baseTitle = _a.baseTitle;
    var curCollapsed = collapsed !== null && collapsed !== void 0 ? collapsed : false; // 默认都展开
    // key统一转换成Kebab case，eg: boxShadow => bos-shadow
    exclude = (exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : []).map(function (key) { return (0, kebabCase_1.default)(key); });
    return tslib_1.__spreadArray(tslib_1.__spreadArray([
        {
            header: '布局',
            key: 'layout',
            collapsed: curCollapsed,
            body: [
                {
                    type: 'style-display',
                    label: false,
                    name: 'style'
                }
            ]
                .filter(function (comp) { return !~exclude.indexOf(comp.type.replace(/^style-/i, '')); })
                .concat(layoutExtra || [])
        },
        (0, amis_editor_core_1.getSchemaTpl)('theme:base', {
            collapsed: curCollapsed,
            extra: baseExtra,
            classname: classname,
            title: baseTitle
        })
    ], tslib_1.__read(extra), false), [
        {
            title: '自定义样式',
            collapsed: curCollapsed,
            body: [
                {
                    type: 'theme-cssCode',
                    label: false
                }
            ]
        }
    ], false).filter(function (item) { return !~exclude.indexOf(item.key || ''); });
});
