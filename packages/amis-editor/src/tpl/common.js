"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var flatten_1 = tslib_1.__importDefault(require("lodash/flatten"));
var InputComponentName_1 = require("../component/InputComponentName");
var FormulaControl_1 = require("../renderer/FormulaControl");
var reduce_1 = tslib_1.__importDefault(require("lodash/reduce"));
var map_1 = tslib_1.__importDefault(require("lodash/map"));
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
var keys_1 = tslib_1.__importDefault(require("lodash/keys"));
/**
 * @deprecated 兼容当前组件的switch
 */
(0, amis_editor_core_1.setSchemaTpl)('switch', {
    type: 'switch',
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline '
});
/**
 * 分割线
 */
(0, amis_editor_core_1.setSchemaTpl)('divider', {
    type: 'divider',
    className: 'mx-0'
});
/**
 * 带单位的控件
 */
(0, amis_editor_core_1.setSchemaTpl)('withUnit', function (config) {
    return {
        type: 'input-group',
        name: config.name,
        label: config.label,
        body: [
            config.control,
            {
                type: 'tpl',
                addOnclassName: 'border-0 bg-none',
                tpl: config.unit
            }
        ]
    };
});
/**
 * 表单项字段name
 */
(0, amis_editor_core_1.setSchemaTpl)('formItemName', {
    label: '字段名',
    name: 'name',
    type: 'ae-DataBindingControl',
    onBindingChange: function (field, onBulkChange) {
        var _a;
        onBulkChange(((_a = field.resolveEditSchema) === null || _a === void 0 ? void 0 : _a.call(field)) || { label: field.label });
    }
    // validations: {
    //     matchRegexp: /^[a-z\$][a-z0-0\-_]*$/i
    // },
    // validationErrors: {
    //     "matchRegexp": "请输入合法的变量名"
    // },
    // validateOnChange: false
});
(0, amis_editor_core_1.setSchemaTpl)('formItemExtraName', (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
    required: false,
    label: '结尾字段名',
    name: 'extraName',
    description: '配置了结尾字段名，该组件将开始和结尾存成两个字段'
}));
(0, amis_editor_core_1.setSchemaTpl)('formItemMode', function (config) {
    var _a;
    return ({
        label: '布局',
        name: 'mode',
        type: 'select',
        pipeIn: (0, amis_editor_core_1.defaultValue)((_a = config === null || config === void 0 ? void 0 : config.defaultValue) !== null && _a !== void 0 ? _a : ''),
        options: [
            {
                label: '内联',
                value: 'inline'
            },
            {
                label: '水平',
                value: 'horizontal'
            },
            {
                label: '垂直',
                value: 'normal'
            },
            (config === null || config === void 0 ? void 0 : config.isForm)
                ? null
                : {
                    label: '继承',
                    value: ''
                }
        ].filter(function (i) { return i; }),
        pipeOut: function (v) { return (v ? v : undefined); }
    });
});
(0, amis_editor_core_1.setSchemaTpl)('formulaControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ type: 'ae-formulaControl', variableMode: 'tree' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('expressionFormulaControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ type: 'ae-expressionFormulaControl', variableMode: 'tree' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('textareaFormulaControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ type: 'ae-textareaFormulaControl', variableMode: 'tree' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('tplFormulaControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ type: 'ae-tplFormulaControl', variableMode: 'tree' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('DataPickerControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ type: 'ae-DataPickerControl' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('formItemInline', {
    type: 'switch',
    label: '表单项内联',
    name: 'inline',
    visibleOn: 'data.mode != "inline"',
    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
    // onChange: (value:any, origin:any, item:any, form:any) => form.getValueByName('size') === "full" && form.setValueByName('')
});
(0, amis_editor_core_1.setSchemaTpl)('formItemSize', {
    name: 'size',
    label: '控件宽度',
    type: 'select',
    pipeIn: (0, amis_editor_core_1.defaultValue)('full'),
    // mode: 'inline',
    // className: 'w-full',
    options: [
        {
            label: '极小',
            value: 'xs'
        },
        {
            label: '小',
            value: 'sm'
        },
        {
            label: '中',
            value: 'md'
        },
        {
            label: '大',
            value: 'lg'
        },
        {
            label: '默认（占满）',
            value: 'full'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('minLength', {
    name: 'minLength',
    type: 'input-number',
    label: '限制最小数量'
});
(0, amis_editor_core_1.setSchemaTpl)('maxLength', {
    name: 'maxLength',
    type: 'input-number',
    label: '限制最大数量'
});
/**
 * 表单项名称label
 */
(0, amis_editor_core_1.setSchemaTpl)('label', {
    label: '标题',
    name: 'label',
    type: 'input-text',
    pipeIn: function (v) {
        return v === false ? '' : v;
    }
});
/** 文件上传按钮名称 btnLabel */
(0, amis_editor_core_1.setSchemaTpl)('btnLabel', {
    type: 'input-text',
    name: 'btnLabel',
    label: '按钮名称',
    value: '文件上传'
});
(0, amis_editor_core_1.setSchemaTpl)('labelHide', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('switch', {
        name: 'label',
        label: (0, amis_editor_core_1.tipedLabel)('隐藏标题', '隐藏后，水平布局时标题宽度为0'),
        pipeIn: function (value) { return value === false; },
        pipeOut: function (value) { return (value === true ? false : ''); },
        visibleOn: 'this.__props__ && this.__props__.formMode === "horizontal" || data.mode === "horizontal" || data.label === false'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('placeholder', {
    label: '占位提示',
    name: 'placeholder',
    type: 'input-text',
    placeholder: '空内容提示占位'
});
(0, amis_editor_core_1.setSchemaTpl)('startPlaceholder', {
    type: 'input-text',
    name: 'startPlaceholder',
    label: '前占位提示',
    pipeIn: (0, amis_editor_core_1.defaultValue)('开始时间')
});
(0, amis_editor_core_1.setSchemaTpl)('endPlaceholder', {
    type: 'input-text',
    name: 'endPlaceholder',
    label: '后占位提示',
    pipeIn: (0, amis_editor_core_1.defaultValue)('结束时间')
});
(0, amis_editor_core_1.setSchemaTpl)('tabs', function (config) {
    return {
        type: 'tabs',
        tabsMode: 'line',
        className: 'editor-prop-config-tabs',
        linksClassName: 'editor-prop-config-tabs-links aa',
        contentClassName: 'no-border editor-prop-config-tabs-cont hoverShowScrollBar',
        tabs: config
            .filter(function (item) { return item; })
            .map(function (item) {
            var _a;
            var newSchema = tslib_1.__assign(tslib_1.__assign({}, item), { body: Array.isArray(item.body) ? (0, flatten_1.default)(item.body) : [item.body] });
            // 新版配置面板空隙在子组件中，兼容一下
            if (((_a = newSchema.body[0]) === null || _a === void 0 ? void 0 : _a.type) === 'collapse-group') {
                newSchema.className = (newSchema.className || '') + ' p-none';
            }
            return newSchema;
        })
    };
});
(0, amis_editor_core_1.setSchemaTpl)('collapse', function (config) {
    return {
        type: 'wrapper',
        className: 'editor-prop-config-collapse',
        body: config
            .filter(function (item) { return item; })
            .map(function (item) { return (tslib_1.__assign(tslib_1.__assign({ type: 'collapse', headingClassName: 'editor-prop-config-head', bodyClassName: 'editor-prop-config-body' }, item), { body: (0, flatten_1.default)(item.body) })); })
    };
});
(0, amis_editor_core_1.setSchemaTpl)('fieldSet', function (config) {
    return tslib_1.__assign(tslib_1.__assign({ collapsable: true, collapsed: false }, config), { type: 'fieldset', title: config.title, body: (0, flatten_1.default)(config.body.filter(function (item) { return item; })) });
});
(0, amis_editor_core_1.setSchemaTpl)('collapseGroup', function (config) {
    var collapseGroupBody = config
        .filter(function (item) { return item && Array.isArray(item === null || item === void 0 ? void 0 : item.body) && (item === null || item === void 0 ? void 0 : item.body.length) > 0; })
        .map(function (item) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({ type: 'collapse', headingClassName: 'ae-formItemControl-header', bodyClassName: 'ae-formItemControl-body' }, item), { collapsed: (_a = item.collapsed) !== null && _a !== void 0 ? _a : false, key: item.title, body: (0, flatten_1.default)(item.body) }));
    });
    return {
        type: 'collapse-group',
        activeKey: collapseGroupBody
            .filter(function (item) { return item && !item.collapsed; })
            .map(function (panel) { return panel.title; }),
        expandIconPosition: 'right',
        expandIcon: {
            type: 'icon',
            icon: 'chevron-right'
        },
        className: 'ae-formItemControl ae-styleControl',
        body: collapseGroupBody
    };
});
(0, amis_editor_core_1.setSchemaTpl)('clearable', {
    type: 'switch',
    label: '可清除',
    name: 'clearable',
    inputClassName: 'is-inline'
});
(0, amis_editor_core_1.setSchemaTpl)('hint', {
    label: '输入框提示',
    type: 'input-text',
    name: 'hint',
    description: '当输入框获得焦点的时候显示，用来提示用户输入内容。'
});
(0, amis_editor_core_1.setSchemaTpl)('icon', {
    label: '图标',
    type: 'icon-picker',
    name: 'icon',
    placeholder: '点击选择图标',
    clearable: true,
    description: ''
});
(0, amis_editor_core_1.setSchemaTpl)('valueFormula', function (config) {
    var _a = config || {}, rendererSchema = _a.rendererSchema, useSelectMode = _a.useSelectMode, mode = _a.mode, visibleOn = _a.visibleOn, label = _a.label, name = _a.name, rendererWrapper = _a.rendererWrapper, needDeleteProps = _a.needDeleteProps, valueType = _a.valueType, header = _a.header, placeholder = _a.placeholder, DateTimeType = _a.DateTimeType, variables = _a.variables, requiredDataPropsVariables = _a.requiredDataPropsVariables, variableMode = _a.variableMode, rest = tslib_1.__rest(_a, ["rendererSchema", "useSelectMode", "mode", "visibleOn", "label", "name", "rendererWrapper", "needDeleteProps", "valueType", "header", "placeholder", "DateTimeType", "variables", "requiredDataPropsVariables", "variableMode"]);
    var curRendererSchema = rendererSchema;
    if (useSelectMode && curRendererSchema && curRendererSchema.options) {
        curRendererSchema = tslib_1.__assign(tslib_1.__assign({}, curRendererSchema), { type: 'select' });
    }
    return {
        type: 'group',
        // 默认左右展示
        // 上下展示，可避免 自定义渲染器 出现挤压
        mode: mode === 'vertical' ? 'vertical' : 'horizontal',
        visibleOn: visibleOn,
        className: config === null || config === void 0 ? void 0 : config.className,
        body: [
            (0, amis_editor_core_1.getSchemaTpl)('formulaControl', tslib_1.__assign({ label: label !== null && label !== void 0 ? label : '默认值', name: name || 'value', rendererWrapper: rendererWrapper, needDeleteProps: needDeleteProps, valueType: valueType, header: header, placeholder: placeholder, rendererSchema: curRendererSchema, variables: variables, requiredDataPropsVariables: requiredDataPropsVariables, variableMode: variableMode, DateTimeType: DateTimeType !== null && DateTimeType !== void 0 ? DateTimeType : FormulaControl_1.FormulaDateType.NotDate }, rest))
        ]
    };
});
(0, amis_editor_core_1.setSchemaTpl)('inputType', {
    label: '输入类型',
    name: 'type',
    type: 'select',
    creatable: false,
    options: [
        {
            label: '文本',
            value: 'input-text'
        },
        {
            label: '密码',
            value: 'input-password'
        },
        {
            label: '邮箱',
            value: 'input-email'
        },
        {
            label: 'URL',
            value: 'input-url'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('selectDateType', {
    label: '日期类型',
    name: 'type',
    type: 'select',
    creatable: false,
    options: [
        {
            label: '日期',
            value: 'input-date'
        },
        {
            label: '日期时间',
            value: 'input-datetime'
        },
        {
            label: '时间',
            value: 'input-time'
        },
        {
            label: '月份',
            value: 'input-month'
        },
        {
            label: '季度',
            value: 'input-quarter'
        },
        {
            label: '年份',
            value: 'input-year'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('selectDateRangeType', {
    label: '日期类型',
    name: 'type',
    type: 'select',
    creatable: false,
    options: [
        {
            label: '日期',
            value: 'input-date-range'
        },
        {
            label: '日期时间',
            value: 'input-datetime-range'
        },
        {
            label: '时间',
            value: 'input-time-range'
        },
        {
            label: '月份',
            value: 'input-month-range'
        },
        {
            label: '季度',
            value: 'input-quarter-range'
        },
        {
            label: '年份',
            value: 'input-year-range'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('optionsMenuTpl', function (config) {
    var manager = config.manager, rest = tslib_1.__rest(config, ["manager"]);
    // 设置 options 中变量集合
    function getOptionVars(that) {
        var schema = manager.store.valueWithoutHiddenProps;
        var children = [];
        if (schema.labelField) {
            children.push({
                label: '显示字段',
                value: schema.labelField,
                tag: typeof schema.labelField
            });
        }
        if (schema.valueField) {
            children.push({
                label: '值字段',
                value: schema.valueField,
                tag: typeof schema.valueField
            });
        }
        if (schema.options) {
            var optionItem_1 = (0, reduce_1.default)(schema.options, function (result, item) {
                return tslib_1.__assign(tslib_1.__assign({}, result), item);
            }, {});
            optionItem_1 === null || optionItem_1 === void 0 ? true : delete optionItem_1.$$id;
            optionItem_1 = (0, omit_1.default)(optionItem_1, (0, map_1.default)(children, function (item) { return item === null || item === void 0 ? void 0 : item.label; }));
            var otherItem = (0, map_1.default)((0, keys_1.default)(optionItem_1), function (item) { return ({
                label: item === 'label' ? '选项文本' : item === 'value' ? '选项值' : item,
                value: item,
                tag: typeof optionItem_1[item]
            }); });
            children.push.apply(children, tslib_1.__spreadArray([], tslib_1.__read(otherItem), false));
        }
        var variablesArr = [
            {
                label: '选项字段',
                children: children
            }
        ];
        return variablesArr;
    }
    return (0, amis_editor_core_1.getSchemaTpl)('textareaFormulaControl', tslib_1.__assign({ mode: 'normal', label: (0, amis_editor_core_1.tipedLabel)('选项模板', '自定义选项渲染模板，支持JSX、数据域变量使用'), name: 'menuTpl', variables: getOptionVars, requiredDataPropsVariables: true }, rest));
});
/**
 * 数据源绑定
 */
(0, amis_editor_core_1.setSchemaTpl)('sourceBindControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return (tslib_1.__assign({ type: 'ae-formulaControl', name: 'source', label: '数据', variableMode: 'tree', inputMode: 'input-group', placeholder: '请输入表达式', requiredDataPropsVariables: true }, schema));
});
(0, amis_editor_core_1.setSchemaTpl)('menuTpl', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('textareaFormulaControl', {
        mode: 'normal',
        label: (0, amis_editor_core_1.tipedLabel)('模板', '自定义选项渲染模板，支持JSX、数据域变量使用'),
        name: 'menuTpl'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('expression', {
    type: 'input-text',
    description: '支持 JS 表达式，如：`this.xxx == 1`'
});
(0, amis_editor_core_1.setSchemaTpl)('size', {
    label: '控件尺寸',
    type: 'button-group-select',
    name: 'size',
    clearable: true,
    options: [
        {
            label: '极小',
            value: 'xs'
        },
        {
            label: '小',
            value: 'sm'
        },
        {
            label: '中',
            value: 'md'
        },
        {
            label: '大',
            value: 'lg'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('name', {
    label: (0, amis_editor_core_1.tipedLabel)('名字', '需要联动时才需要，其他组件可以通过这个名字跟当前组件联动'),
    name: 'name',
    type: 'input-text',
    placeholder: '请输入字母或者数字'
});
(0, amis_editor_core_1.setSchemaTpl)('reload', {
    name: 'reload',
    asFormItem: true,
    // type: 'input-text',
    component: InputComponentName_1.InputComponentName,
    label: (0, amis_editor_core_1.tipedLabel)('刷新目标组件', '可以指定操作完成后刷新目标组件，请填写目标组件的 <code>name</code> 属性，多个组件请用<code>,</code>隔开，如果目标组件为表单项，请先填写表单的名字，再用<code>.</code>连接表单项的名字如：<code>xxForm.xxControl</code>。另外如果刷新目标对象设置为 <code>window</code>，则会刷新整个页面。'),
    placeholder: '请输入组件name',
    mode: 'horizontal',
    horizontal: {
        left: 4,
        justify: true
    }
});
(0, amis_editor_core_1.setSchemaTpl)('className', function (schema) {
    return tslib_1.__assign(tslib_1.__assign({ type: 'ae-classname', name: 'className' }, (schema || {})), { label: (0, amis_editor_core_1.tipedLabel)((schema === null || schema === void 0 ? void 0 : schema.label) || 'CSS 类名', '有哪些辅助类 CSS 类名？请前往 <a href="https://baidu.github.io/amis/docs/concepts/style" target="_blank">样式说明</a>，除此之外你可以添加自定义类名，然后在系统配置中添加自定义样式。') });
});
(0, amis_editor_core_1.setSchemaTpl)('onlyClassNameTab', function (label) {
    if (label === void 0) { label = '外层'; }
    return {
        title: '外观',
        body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
            {
                title: 'CSS类名',
                body: [(0, amis_editor_core_1.getSchemaTpl)('className', { label: label })]
            }
        ])
    };
});
/**
 * combo 组件样式包装调整
 */
(0, amis_editor_core_1.setSchemaTpl)('combo-container', function (config) {
    var _a, _b;
    if ((0, amis_editor_core_1.isObject)(config)) {
        var itemsWrapperClassName = void 0;
        var itemClassName = void 0;
        if (['input-kv', 'combo'].includes(config.type)) {
            itemsWrapperClassName =
                'ae-Combo-items ' + ((_a = config.itemsWrapperClassName) !== null && _a !== void 0 ? _a : '');
            itemClassName = 'ae-Combo-item ' + ((_b = config.itemClassName) !== null && _b !== void 0 ? _b : '');
        }
        return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, config), (itemsWrapperClassName ? { itemsWrapperClassName: itemsWrapperClassName } : {})), (itemClassName ? { itemClassName: itemClassName } : {}));
    }
    return config;
});
/**
 * 所有组件的状态
 */
(0, amis_editor_core_1.setSchemaTpl)('status', function (config) {
    return {
        title: '状态',
        body: [
            (0, amis_editor_core_1.getSchemaTpl)('newVisible'),
            (0, amis_editor_core_1.getSchemaTpl)('hidden'),
            !(config === null || config === void 0 ? void 0 : config.unsupportStatic) && (config === null || config === void 0 ? void 0 : config.isFormItem)
                ? (0, amis_editor_core_1.getSchemaTpl)('static')
                : null,
            (config === null || config === void 0 ? void 0 : config.readonly) ? (0, amis_editor_core_1.getSchemaTpl)('readonly') : null,
            (config === null || config === void 0 ? void 0 : config.disabled) || (config === null || config === void 0 ? void 0 : config.isFormItem)
                ? (0, amis_editor_core_1.getSchemaTpl)('disabled')
                : null,
            (config === null || config === void 0 ? void 0 : config.isFormItem) ? (0, amis_editor_core_1.getSchemaTpl)('clearValueOnHidden') : null
        ].filter(Boolean)
    };
});
(0, amis_editor_core_1.setSchemaTpl)('autoFill', {
    type: 'input-kv',
    name: 'autoFill',
    label: (0, amis_editor_core_1.tipedLabel)('自动填充', '将当前已选中的选项的某个字段的值，自动填充到表单中某个表单项中，支持数据映射')
});
(0, amis_editor_core_1.setSchemaTpl)('autoFillApi', {
    type: 'input-kv',
    name: 'autoFill',
    label: (0, amis_editor_core_1.tipedLabel)('数据录入', '自动填充或参照录入')
});
(0, amis_editor_core_1.setSchemaTpl)('required', {
    type: 'switch',
    name: 'required',
    label: '是否必填',
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline '
});
/**
 * 表单项描述description
 */
(0, amis_editor_core_1.setSchemaTpl)('description', {
    name: 'description',
    type: 'textarea',
    label: (0, amis_editor_core_1.tipedLabel)('描述', '表单项控件下方浅色文字描述'),
    maxRows: 2,
    pipeIn: function (value, data) { return value || data.desc || ''; }
});
(0, amis_editor_core_1.setSchemaTpl)('disabled', {
    type: 'ae-StatusControl',
    label: '禁用',
    mode: 'normal',
    name: 'disabled',
    expressionName: 'disabledOn'
});
(0, amis_editor_core_1.setSchemaTpl)('readonly', {
    type: 'ae-StatusControl',
    label: '只读',
    mode: 'normal',
    name: 'readOnly',
    expressionName: 'readOnlyOn'
});
(0, amis_editor_core_1.setSchemaTpl)('visible', {
    type: 'ae-StatusControl',
    label: '可见',
    mode: 'normal',
    name: 'visible',
    expressionName: 'visibleOn'
});
(0, amis_editor_core_1.setSchemaTpl)('static', {
    type: 'ae-StatusControl',
    label: '静态展示',
    mode: 'normal',
    name: 'static',
    expressionName: 'staticOn'
});
// 新版配置面板兼容 [可见] 状态
(0, amis_editor_core_1.setSchemaTpl)('newVisible', {
    type: 'ae-StatusControl',
    label: '可见',
    mode: 'normal',
    name: 'visible',
    expressionName: 'visibleOn',
    visibleOn: 'data.visible || data.visible === false || data.visibleOn !== undefined'
});
(0, amis_editor_core_1.setSchemaTpl)('hidden', {
    type: 'ae-StatusControl',
    label: '隐藏',
    mode: 'normal',
    name: 'hidden',
    expressionName: 'hiddenOn'
});
(0, amis_editor_core_1.setSchemaTpl)('maximum', {
    type: 'input-number',
    label: '最大值'
});
(0, amis_editor_core_1.setSchemaTpl)('minimum', {
    type: 'input-number',
    label: '最小值'
});
(0, amis_editor_core_1.setSchemaTpl)('switchDefaultValue', {
    type: 'switch',
    label: '默认值设置',
    name: 'value',
    pipeIn: function (value) { return typeof value !== 'undefined'; },
    pipeOut: function (value, origin, data) { return (value ? '' : undefined); },
    labelRemark: {
        trigger: ['hover', 'focus'],
        setting: true,
        title: '',
        content: '不设置时根据 name 获取'
    }
});
(0, amis_editor_core_1.setSchemaTpl)('numberSwitchDefaultValue', {
    type: 'switch',
    label: (0, amis_editor_core_1.tipedLabel)('默认值设置', '不设置时根据 name 获取'),
    name: 'value',
    pipeIn: function (value) { return typeof value !== 'undefined'; },
    pipeOut: function (value, origin, data) { return (value ? '' : undefined); }
});
(0, amis_editor_core_1.setSchemaTpl)('kilobitSeparator', {
    type: 'switch',
    label: '千分符',
    name: 'kilobitSeparator',
    inputClassName: 'is-inline'
});
(0, amis_editor_core_1.setSchemaTpl)('imageUrl', {
    type: 'input-text',
    label: '图片'
});
(0, amis_editor_core_1.setSchemaTpl)('backgroundImageUrl', {
    type: 'input-text',
    label: '图片路径'
});
(0, amis_editor_core_1.setSchemaTpl)('audioUrl', {
    type: 'input-text',
    label: '音频地址',
    name: 'src',
    description: '支持获取变量如：<code>\\${audioSrc}</code>'
});
(0, amis_editor_core_1.setSchemaTpl)('fileUrl', {
    type: 'input-text',
    label: '文件'
});
(0, amis_editor_core_1.setSchemaTpl)('markdownBody', {
    name: 'value',
    type: 'editor',
    language: 'markdown',
    size: 'xxl',
    label: 'Markdown 内容',
    options: {
        lineNumbers: 'off'
    }
});
(0, amis_editor_core_1.setSchemaTpl)('richText', {
    label: '富文本',
    type: 'input-rich-text',
    buttons: [
        'paragraphFormat',
        'quote',
        'textColor',
        'backgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        '|',
        'formatOL',
        'formatUL',
        'align',
        '|',
        'insertLink',
        'insertImage',
        'insertTable',
        '|',
        'undo',
        'redo',
        'fullscreen'
    ],
    name: 'html',
    description: '支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/amis/zh-CN/docs/concepts/template">详情</a>',
    size: 'lg'
});
(0, amis_editor_core_1.setSchemaTpl)('showCounter', {
    type: 'switch',
    label: '计数器',
    name: 'showCounter',
    inputClassName: 'is-inline'
});
(0, amis_editor_core_1.setSchemaTpl)('borderMode', {
    name: 'borderMode',
    label: '边框',
    type: 'button-group-select',
    inputClassName: 'is-inline',
    horizontal: {
        left: 2,
        justify: true
    },
    options: [
        { label: '全边框', value: 'full' },
        { label: '半边框', value: 'half' },
        { label: '无边框', value: 'none' }
    ],
    pipeIn: (0, amis_editor_core_1.defaultValue)('full')
});
(0, amis_editor_core_1.setSchemaTpl)('searchable', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('switch', {
        label: '可检索',
        name: 'searchable'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('sortable', {
    type: 'switch',
    label: '可排序',
    name: 'sortable'
});
(0, amis_editor_core_1.setSchemaTpl)('onlyLeaf', {
    type: 'switch',
    label: (0, amis_editor_core_1.tipedLabel)('必须选到末级', '必须选择到末级，不能选择中间层级'),
    horizontal: {
        left: 5,
        justify: true
    },
    name: 'onlyLeaf',
    value: false,
    inputClassName: 'is-inline'
});
(0, amis_editor_core_1.setSchemaTpl)('clearValueOnHidden', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('switch', {
        type: 'switch',
        horizontal: { left: 8, justify: true },
        label: (0, amis_editor_core_1.tipedLabel)('隐藏时删除字段', '当前表单项隐藏时，表单提交数据中会删除该表单项的值'),
        name: 'clearValueOnHidden'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('utc', {
    type: 'switch',
    label: (0, amis_editor_core_1.tipedLabel)('UTC转换', '开启后，提交数据和展示数据将进行UTC转换；存在跨地域用户的应用建议开启'),
    name: 'utc',
    inputClassName: 'is-inline'
});
(0, amis_editor_core_1.setSchemaTpl)('embed', {
    type: 'switch',
    label: '内嵌模式',
    name: 'embed'
});
(0, amis_editor_core_1.setSchemaTpl)('buttonLevel', {
    label: '按钮样式',
    type: 'select',
    name: 'level',
    menuTpl: '<div class="ae-ButtonLevel-MenuTpl"><button type="button" class="cxd-Button cxd-Button--${value} cxd-Button--size-sm cxd-Button--block">${label}</button></div>',
    options: [
        {
            label: '默认',
            value: 'default',
            level: 'default'
        },
        {
            label: '链接',
            value: 'link',
            level: 'link'
        },
        {
            label: '主色',
            value: 'primary',
            level: 'primary'
        },
        {
            label: '淡色',
            value: 'light',
            level: 'light'
        },
        {
            label: '深色',
            value: 'dark',
            level: 'dark'
        },
        {
            label: '提示',
            value: 'info',
            level: 'info'
        },
        {
            label: '成功',
            value: 'success',
            level: 'success'
        },
        {
            label: '警告',
            value: 'warning',
            level: 'warning'
        },
        {
            label: '严重',
            value: 'danger',
            level: 'danger'
        },
        {
            label: '次要',
            value: 'secondary',
            level: 'secondary'
        },
        {
            label: '加强',
            value: 'enhance',
            level: 'enhance'
        }
    ],
    pipeIn: (0, amis_editor_core_1.defaultValue)('default')
});
(0, amis_editor_core_1.setSchemaTpl)('uploadType', {
    label: '上传方式',
    name: 'uploadType',
    type: 'select',
    value: 'fileReceptor',
    options: [
        {
            label: '文件接收器',
            value: 'fileReceptor'
        },
        {
            label: '对象存储',
            value: 'bos'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('bos', {
    label: '存储仓库',
    type: 'select',
    name: 'bos',
    value: 'default',
    options: [
        {
            label: '平台默认',
            value: 'default'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('badge', {
    label: '角标',
    name: 'badge',
    type: 'ae-badge'
});
(0, amis_editor_core_1.setSchemaTpl)('nav-badge', {
    label: '角标',
    name: 'badge',
    type: 'ae-nav-badge'
});
(0, amis_editor_core_1.setSchemaTpl)('nav-default-active', {
    type: 'ae-nav-default-active'
});
/**
 * 日期范围快捷键组件
 */
(0, amis_editor_core_1.setSchemaTpl)('dateShortCutControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ type: 'ae-DateShortCutControl', name: 'shortcuts' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('eventControl', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ type: 'ae-eventControl', mode: 'normal' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('data', {
    type: 'input-kv',
    name: 'data',
    label: '组件静态数据'
});
(0, amis_editor_core_1.setSchemaTpl)('app-page', {
    type: 'nested-select',
    label: '选择页面',
    name: 'link',
    mode: 'horizontal',
    size: 'lg',
    required: true,
    options: []
});
(0, amis_editor_core_1.setSchemaTpl)('app-page-args', {
    type: 'combo',
    name: 'params',
    label: '页面参数',
    multiple: true,
    removable: true,
    addable: true,
    strictMode: false,
    canAccessSuperData: true,
    size: 'lg',
    mode: 'horizontal',
    items: [
        {
            name: 'key',
            type: 'input-text',
            placeholder: '参数名',
            source: '${__pageInputSchema}',
            labelField: 'label',
            valueField: 'value',
            required: true
        },
        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
            name: 'val',
            variables: '${variables}',
            placeholder: '参数值'
        })
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('iconLink', function (schema) {
    var name = schema.name, visibleOn = schema.visibleOn, label = schema.label;
    return (0, amis_editor_core_1.getSchemaTpl)('icon', {
        name: name,
        visibleOn: visibleOn,
        label: label !== null && label !== void 0 ? label : '图标',
        placeholder: '点击选择图标',
        clearable: true,
        description: ''
    });
});
(0, amis_editor_core_1.setSchemaTpl)('virtualThreshold', {
    name: 'virtualThreshold',
    type: 'input-number',
    min: 1,
    step: 1,
    precision: 0,
    label: (0, amis_editor_core_1.tipedLabel)('虚拟列表阈值', '当选项数量超过阈值后，会开启虚拟列表以优化性能'),
    pipeOut: function (value) { return value || undefined; }
});
(0, amis_editor_core_1.setSchemaTpl)('virtualItemHeight', {
    name: 'itemHeight',
    type: 'input-number',
    min: 1,
    step: 1,
    precision: 0,
    label: (0, amis_editor_core_1.tipedLabel)('选项高度', '开启虚拟列表时每个选项的高度'),
    pipeOut: function (value) { return value || undefined; }
});
(0, amis_editor_core_1.setSchemaTpl)('pageTitle', {
    label: '页面标题',
    name: 'title',
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('pageSubTitle', {
    label: '副标题',
    name: 'subTitle',
    type: 'textarea'
});
(0, amis_editor_core_1.setSchemaTpl)('textareaDefaultValue', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('textareaFormulaControl', {
        label: '默认值',
        name: 'value',
        mode: 'normal'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('prefix', {
    type: 'input-text',
    name: 'prefix',
    label: (0, amis_editor_core_1.tipedLabel)('前缀', '输入内容前展示，不包含在数据值中')
});
(0, amis_editor_core_1.setSchemaTpl)('suffix', {
    type: 'input-text',
    name: 'suffix',
    label: (0, amis_editor_core_1.tipedLabel)('后缀', '输入内容后展示，不包含在数据值中')
});
(0, amis_editor_core_1.setSchemaTpl)('unit', {
    type: 'input-text',
    name: 'unit',
    label: '单位',
    value: ''
});
(0, amis_editor_core_1.setSchemaTpl)('optionsTip', {
    type: 'input-text',
    name: 'optionsTip',
    label: '选项提示',
    value: '最近您使用的标签'
});
(0, amis_editor_core_1.setSchemaTpl)('tableCellRemark', {
    name: 'remark',
    label: '提示',
    type: 'input-text',
    description: '显示一个提示图标，鼠标放上去会提示该内容。'
});
(0, amis_editor_core_1.setSchemaTpl)('tableCellPlaceholder', {
    name: 'placeholder',
    type: 'input-text',
    label: '占位符',
    value: '-',
    description: '当没有值时用这个来替代展示'
});
(0, amis_editor_core_1.setSchemaTpl)('title', {
    type: 'input-text',
    name: 'title',
    label: '标题'
});
(0, amis_editor_core_1.setSchemaTpl)('caption', {
    type: 'input-text',
    name: 'caption',
    label: '标题'
});
(0, amis_editor_core_1.setSchemaTpl)('imageCaption', {
    type: 'input-text',
    name: 'imageCaption',
    label: '图片描述'
});
(0, amis_editor_core_1.setSchemaTpl)('inputBody', {
    type: 'input-text',
    name: 'body',
    label: (0, amis_editor_core_1.tipedLabel)('内容', '不填写时，自动使用目标地址值')
});
(0, amis_editor_core_1.setSchemaTpl)('stepSubTitle', {
    type: 'input-text',
    name: 'subTitle',
    label: false,
    placeholder: '副标题'
});
(0, amis_editor_core_1.setSchemaTpl)('stepDescription', {
    type: 'input-text',
    name: 'description',
    label: false,
    placeholder: '描述'
});
(0, amis_editor_core_1.setSchemaTpl)('taskNameLabel', {
    type: 'input-text',
    name: 'taskNameLabel',
    pipeIn: (0, amis_editor_core_1.defaultValue)('任务名称'),
    label: '任务名称栏标题'
});
(0, amis_editor_core_1.setSchemaTpl)('operationLabel', {
    type: 'input-text',
    name: 'operationLabel',
    pipeIn: (0, amis_editor_core_1.defaultValue)('操作'),
    label: '操作栏标题'
});
(0, amis_editor_core_1.setSchemaTpl)('statusLabel', {
    type: 'input-text',
    name: 'statusLabel',
    pipeIn: (0, amis_editor_core_1.defaultValue)('状态'),
    label: '状态栏标题'
});
(0, amis_editor_core_1.setSchemaTpl)('remarkLabel', {
    type: 'input-text',
    name: 'remarkLabel',
    pipeIn: (0, amis_editor_core_1.defaultValue)('备注说明'),
    label: '备注栏标题'
});
(0, amis_editor_core_1.setSchemaTpl)('inputArrayItem', {
    type: 'input-text',
    placeholder: '名称'
});
(0, amis_editor_core_1.setSchemaTpl)('actionPrevLabel', {
    type: 'input-text',
    name: 'actionPrevLabel',
    label: '上一步按钮名称',
    pipeIn: (0, amis_editor_core_1.defaultValue)('上一步')
});
(0, amis_editor_core_1.setSchemaTpl)('actionNextLabel', {
    type: 'input-text',
    name: 'actionNextLabel',
    label: '下一步按钮名称',
    pipeIn: (0, amis_editor_core_1.defaultValue)('下一步')
});
(0, amis_editor_core_1.setSchemaTpl)('actionNextSaveLabel', {
    type: 'input-text',
    name: 'actionNextSaveLabel',
    label: '保存并下一步按钮名称',
    pipeIn: (0, amis_editor_core_1.defaultValue)('保存并下一步')
});
(0, amis_editor_core_1.setSchemaTpl)('actionFinishLabel', {
    type: 'input-text',
    name: 'actionFinishLabel',
    label: '完成按钮名称',
    pipeIn: (0, amis_editor_core_1.defaultValue)('完成')
});
(0, amis_editor_core_1.setSchemaTpl)('imgCaption', {
    type: 'textarea',
    name: 'caption',
    label: '图片描述'
});
(0, amis_editor_core_1.setSchemaTpl)('taskRemark', {
    type: 'textarea',
    name: 'remark',
    label: '任务说明'
});
(0, amis_editor_core_1.setSchemaTpl)('tooltip', {
    type: 'textarea',
    name: 'tooltip',
    label: '提示内容'
});
(0, amis_editor_core_1.setSchemaTpl)('anchorTitle', {
    type: 'input-text',
    name: 'title',
    required: true,
    placeholder: '请输入锚点标题'
});
(0, amis_editor_core_1.setSchemaTpl)('avatarText', {
    label: '文字',
    name: 'text',
    type: 'input-text',
    pipeOut: function (value) { return (value === '' ? undefined : value); },
    visibleOn: 'data.showtype === "text"'
});
(0, amis_editor_core_1.setSchemaTpl)('cardTitle', {
    name: 'header.title',
    type: 'input-text',
    label: '标题',
    description: '支持模板语法如： <code>\\${xxx}</code>'
});
(0, amis_editor_core_1.setSchemaTpl)('cardSubTitle', {
    name: 'header.subTitle',
    type: 'input-text',
    label: '副标题',
    description: '支持模板语法如： <code>\\${xxx}</code>'
});
(0, amis_editor_core_1.setSchemaTpl)('cardsPlaceholder', {
    name: 'placeholder',
    value: '暂无数据',
    type: 'input-text',
    label: '无数据提示'
});
(0, amis_editor_core_1.setSchemaTpl)('cardDesc', {
    name: 'header.desc',
    type: 'textarea',
    label: '描述',
    description: '支持模板语法如： <code>\\${xxx}</code>'
});
(0, amis_editor_core_1.setSchemaTpl)('imageTitle', {
    type: 'input-text',
    label: '图片标题',
    name: 'title',
    visibleOn: 'this.type == "image"'
});
(0, amis_editor_core_1.setSchemaTpl)('imageDesc', {
    type: 'textarea',
    label: '图片描述',
    name: 'description',
    visibleOn: 'this.type == "image"'
});
(0, amis_editor_core_1.setSchemaTpl)('fetchSuccess', {
    label: '获取成功提示',
    type: 'input-text',
    name: 'fetchSuccess'
});
(0, amis_editor_core_1.setSchemaTpl)('fetchFailed', {
    label: '获取失败提示',
    type: 'input-text',
    name: 'fetchFailed'
});
(0, amis_editor_core_1.setSchemaTpl)('saveOrderSuccess', {
    label: '保存顺序成功提示',
    type: 'input-text',
    name: 'saveOrderSuccess'
});
(0, amis_editor_core_1.setSchemaTpl)('saveOrderFailed', {
    label: '保存顺序失败提示',
    type: 'input-text',
    name: 'saveOrderFailed'
});
(0, amis_editor_core_1.setSchemaTpl)('quickSaveSuccess', {
    label: '快速保存成功提示',
    type: 'input-text',
    name: 'quickSaveSuccess'
});
(0, amis_editor_core_1.setSchemaTpl)('quickSaveFailed', {
    label: '快速保存失败提示',
    type: 'input-text',
    name: 'quickSaveFailed'
});
(0, amis_editor_core_1.setSchemaTpl)('saveSuccess', {
    label: '保存成功提示',
    name: 'saveSuccess',
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('saveFailed', {
    label: '保存失败提示',
    name: 'saveFailed',
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('validateFailed', {
    label: '验证失败提示',
    name: 'validateFailed',
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('tablePlaceholder', {
    name: 'placeholder',
    pipeIn: (0, amis_editor_core_1.defaultValue)('暂无数据'),
    type: 'input-text',
    label: '无数据提示'
});
(0, amis_editor_core_1.setSchemaTpl)('collapseOpenHeader', {
    name: 'collapseHeader',
    label: (0, amis_editor_core_1.tipedLabel)('展开标题', '折叠器处于展开状态时的标题'),
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('matrixColumnLabel', {
    type: 'input-text',
    name: 'label',
    placeholder: '列说明'
});
(0, amis_editor_core_1.setSchemaTpl)('matrixRowLabel', {
    type: 'input-text',
    name: 'label',
    placeholder: '行说明'
});
(0, amis_editor_core_1.setSchemaTpl)('matrixRowTitle', {
    name: 'rowLabel',
    label: '行标题文字',
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('submitText', {
    name: 'submitText',
    label: '提交按钮名称',
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('tpl:btnLabel', {
    type: 'tpl',
    tpl: '<span class="label label-success">${label}</span>',
    columnClassName: 'p-t-xs'
});
(0, amis_editor_core_1.setSchemaTpl)('switchOption', {
    type: 'input-text',
    name: 'option',
    label: '说明'
});
(0, amis_editor_core_1.setSchemaTpl)('addOnLabel', {
    name: 'label',
    label: '文字',
    type: 'input-text'
});
(0, amis_editor_core_1.setSchemaTpl)('onText', {
    name: 'onText',
    type: 'input-text',
    label: '开启时'
});
(0, amis_editor_core_1.setSchemaTpl)('offText', {
    name: 'offText',
    type: 'input-text',
    label: '关闭时'
});
(0, amis_editor_core_1.setSchemaTpl)('propertyTitle', {
    label: '标题',
    type: 'input-text',
    name: 'title'
});
(0, amis_editor_core_1.setSchemaTpl)('propertyLabel', {
    type: 'input-text',
    mode: 'inline',
    size: 'sm',
    label: '属性名',
    name: 'label'
});
(0, amis_editor_core_1.setSchemaTpl)('propertyContent', {
    type: 'input-text',
    mode: 'inline',
    size: 'sm',
    label: '属性值',
    name: 'content'
});
(0, amis_editor_core_1.setSchemaTpl)('draggableTip', {
    type: 'input-text',
    name: 'draggableTip',
    label: (0, amis_editor_core_1.tipedLabel)('提示文字', '拖拽排序的提示文字')
});
(0, amis_editor_core_1.setSchemaTpl)('deleteConfirmText', {
    label: (0, amis_editor_core_1.tipedLabel)('确认文案', '删除确认文案，当配置删除接口生效'),
    name: 'deleteConfirmText',
    type: 'input-text',
    pipeIn: (0, amis_editor_core_1.defaultValue)('确认要删除吗？')
});
(0, amis_editor_core_1.setSchemaTpl)('optionsLabel', {
    type: 'input-text',
    name: 'label',
    placeholder: '名称',
    required: true
});
(0, amis_editor_core_1.setSchemaTpl)('anchorNavTitle', {
    name: 'title',
    label: '标题',
    type: 'input-text',
    required: true
});
(0, amis_editor_core_1.setSchemaTpl)('primaryField', {
    type: 'input-text',
    name: 'primaryField',
    label: (0, amis_editor_core_1.tipedLabel)('主键', '每行记录的唯一标识符，通常用于行选择、批量操作等场景。'),
    pipeIn: (0, amis_editor_core_1.defaultValue)('id')
});
