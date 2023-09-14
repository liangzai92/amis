"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var assign_1 = tslib_1.__importDefault(require("lodash/assign"));
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
(0, amis_editor_core_1.setSchemaTpl)('options', function () {
    var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
    return {
        label: '选项 Options',
        name: 'options',
        type: 'combo',
        multiple: true,
        draggable: true,
        addButtonText: '新增选项',
        scaffold: {
            label: '',
            value: ''
        },
        items: [
            {
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'label',
                placeholder: '名称',
                required: true
            },
            {
                type: 'select',
                name: 'value',
                pipeIn: function (value) {
                    if (typeof value === 'string') {
                        return 'text';
                    }
                    if (typeof value === 'boolean') {
                        return 'boolean';
                    }
                    if (typeof value === 'number') {
                        return 'number';
                    }
                    return 'text';
                },
                pipeOut: function (value, oldValue) {
                    if (value === 'text') {
                        return String(oldValue);
                    }
                    if (value === 'number') {
                        var convertTo = Number(oldValue);
                        if (isNaN(convertTo)) {
                            return 0;
                        }
                        return convertTo;
                    }
                    if (value === 'boolean') {
                        return Boolean(oldValue);
                    }
                    return '';
                },
                options: [
                    { label: '文本', value: 'text' },
                    { label: '数字', value: 'number' },
                    { label: '布尔', value: 'boolean' }
                ]
            },
            {
                type: 'input-number',
                name: 'value',
                placeholder: '值',
                visibleOn: 'typeof data.value === "number"',
                unique: true
            },
            {
                type: 'switch',
                name: 'value',
                placeholder: '值',
                visibleOn: 'typeof data.value === "boolean"',
                unique: true
            },
            {
                type: 'input-text',
                name: 'value',
                placeholder: '值',
                visibleOn: 'typeof data.value === "undefined" || typeof data.value === "string"',
                unique: true
            }
        ]
    };
});
(0, amis_editor_core_1.setSchemaTpl)('tree', {
    label: '选项 Options',
    name: 'options',
    type: 'combo',
    multiple: true,
    draggable: true,
    addButtonText: '新增选项',
    description: '静态数据暂不支持多级，请切换到代码模式，或者采用 source 接口获取。',
    scaffold: {
        label: '',
        value: ''
    },
    items: [
        (0, amis_editor_core_1.getSchemaTpl)('optionsLabel'),
        {
            type: 'input-text',
            name: 'value',
            placeholder: '值',
            unique: true
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('multiple', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign(tslib_1.__assign({ type: 'ae-switch-more', mode: 'normal', name: 'multiple', label: '可多选', value: false, hiddenOnDefault: true, clearChildValuesOnOff: false, formType: 'extend' }, (schema.patch || {})), { form: {
            body: schema.replace
                ? schema.body
                : tslib_1.__spreadArray([
                    (0, amis_editor_core_1.getSchemaTpl)('joinValues'),
                    (0, amis_editor_core_1.getSchemaTpl)('delimiter'),
                    (0, amis_editor_core_1.getSchemaTpl)('extractValue')
                ], tslib_1.__read(((schema === null || schema === void 0 ? void 0 : schema.body) || [])), false)
        } });
});
(0, amis_editor_core_1.setSchemaTpl)('strictMode', {
    type: 'switch',
    label: '严格模式',
    name: 'strictMode',
    value: false,
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline ',
    labelRemark: {
        trigger: ['hover', 'focus'],
        setting: true,
        title: '',
        content: '启用严格模式将采用值严格相等比较'
    }
});
(0, amis_editor_core_1.setSchemaTpl)('checkAllLabel', {
    type: 'input-text',
    name: 'checkAllLabel',
    label: '选项文案',
    value: '全选',
    mode: 'row'
});
(0, amis_editor_core_1.setSchemaTpl)('checkAll', function () {
    return [
        (0, amis_editor_core_1.getSchemaTpl)('switch', {
            label: '可全选',
            name: 'checkAll',
            value: false,
            visibleOn: 'data.multiple'
        }),
        {
            type: 'container',
            className: 'ae-ExtendMore mb-2',
            visibleOn: 'data.checkAll && data.multiple',
            body: [
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    label: '默认全选',
                    name: 'defaultCheckAll',
                    value: false
                }),
                (0, amis_editor_core_1.getSchemaTpl)('checkAllLabel')
            ]
        }
    ];
});
(0, amis_editor_core_1.setSchemaTpl)('joinValues', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('switch', {
        label: (0, amis_editor_core_2.tipedLabel)('拼接值', '开启后将选中的选项 value 的值用连接符拼接起来，作为当前表单项的值'),
        name: 'joinValues',
        visibleOn: 'data.multiple',
        value: true
    });
});
(0, amis_editor_core_1.setSchemaTpl)('delimiter', {
    type: 'input-text',
    name: 'delimiter',
    label: (0, amis_editor_core_2.tipedLabel)('拼接符', '将多个值拼接成一个字符串的连接符号'),
    visibleOn: 'data.multiple && data.joinValues',
    pipeIn: (0, amis_editor_core_1.defaultValue)(',')
});
(0, amis_editor_core_1.setSchemaTpl)('extractValue', {
    type: 'switch',
    label: (0, amis_editor_core_2.tipedLabel)('仅提取值', '开启后将选中项的 value 封装为数组，关闭后则将整个选项数据封装为数组。'),
    name: 'extractValue',
    inputClassName: 'is-inline',
    visibleOn: 'data.multiple && data.joinValues === false',
    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
});
(0, amis_editor_core_1.setSchemaTpl)('creatable', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ label: (0, amis_editor_core_2.tipedLabel)('可创建', '配置事件动作可插入或拦截默认交互'), type: 'ae-switch-more', mode: 'normal', name: 'creatable' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('addApi', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
        label: '新增接口',
        name: 'addApi',
        mode: 'row',
        visibleOn: 'data.creatable'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('createBtnLabel', {
    label: '按钮名称',
    name: 'createBtnLabel',
    type: 'input-text',
    placeholder: '新建'
});
(0, amis_editor_core_1.setSchemaTpl)('editable', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ label: (0, amis_editor_core_2.tipedLabel)('可编辑', '配置事件动作可插入或拦截默认交互'), type: 'ae-switch-more', mode: 'normal', name: 'editable' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('editApi', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
        label: '编辑接口',
        name: 'editApi',
        mode: 'row',
        visibleOn: 'data.editable'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('removable', function (schema) {
    if (schema === void 0) { schema = {}; }
    return tslib_1.__assign({ label: (0, amis_editor_core_2.tipedLabel)('可删除', '配置事件动作可插入或拦截默认交互'), type: 'ae-switch-more', mode: 'normal', name: 'removable' }, schema);
});
(0, amis_editor_core_1.setSchemaTpl)('deleteApi', function () {
    return (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
        label: '删除接口',
        name: 'deleteApi',
        mode: 'row',
        visibleOn: 'data.removable'
    });
});
(0, amis_editor_core_1.setSchemaTpl)('ref', function () {
    // {
    //   type: 'input-text',
    //   name: '$ref',
    //   label: '选择定义',
    //   labelRemark: '输入已经在page中设定好的定义'
    // }
    return null;
});
(0, amis_editor_core_1.setSchemaTpl)('selectFirst', {
    type: 'switch',
    label: '默认选择第一项',
    name: 'selectFirst',
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline '
});
(0, amis_editor_core_1.setSchemaTpl)('hideNodePathLabel', {
    type: 'switch',
    label: (0, amis_editor_core_2.tipedLabel)('隐藏路径', '隐藏选中节点的祖先节点文本信息'),
    name: 'hideNodePathLabel',
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline'
});
(0, amis_editor_core_1.setSchemaTpl)('navControl', {
    label: '数据',
    mode: 'normal',
    name: 'source',
    type: 'ae-navSourceControl',
    closeDefaultCheck: true // 关闭默认值设置
});
(0, amis_editor_core_1.setSchemaTpl)('optionControl', {
    label: '数据',
    mode: 'normal',
    name: 'options',
    type: 'ae-optionControl'
});
/**
 * 新版选项控件: 不带设置默认值功能
 * 备注: 表单项组件默认值支持公式需要
 */
(0, amis_editor_core_1.setSchemaTpl)('optionControlV2', {
    label: '数据',
    mode: 'normal',
    name: 'options',
    type: 'ae-optionControl',
    closeDefaultCheck: false // 关闭默认值设置
});
/**
 * mapping组件映射源
 */
(0, amis_editor_core_1.setSchemaTpl)('mapSourceControl', {
    type: 'ae-mapSourceControl',
    label: '映射表',
    mode: 'normal',
    name: 'source'
});
/**
 * 时间轴组件选项控件
 */
(0, amis_editor_core_1.setSchemaTpl)('timelineItemControl', {
    label: '数据',
    model: 'normal',
    type: 'ae-timelineItemControl'
});
(0, amis_editor_core_1.setSchemaTpl)('treeOptionControl', {
    label: '数据',
    mode: 'normal',
    name: 'options',
    type: 'ae-treeOptionControl'
});
(0, amis_editor_core_1.setSchemaTpl)('dataMap', {
    type: 'container',
    body: [
        (0, amis_editor_core_1.getSchemaTpl)('switch', {
            label: (0, amis_editor_core_2.tipedLabel)('数据映射', '<div> 当开启数据映射时，弹框中的数据只会包含设置的部分，请绑定数据。如：{"a": "\\${a}", "b": 2}。</div>' +
                '<div>当值为 __undefined时，表示删除对应的字段，可以结合{"&": "\\$$"}来达到黑名单效果。</div>'),
            name: 'dataMapSwitch',
            pipeIn: (0, amis_editor_core_1.defaultValue)(false),
            onChange: function (value, oldValue, model, form) {
                if (value) {
                    form.setValues({
                        data: {},
                        dataMap: {},
                        withDefaultData: false
                    });
                }
                else {
                    form.deleteValueByName('dataMap');
                    form.deleteValueByName('data');
                }
            }
        }),
        (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
            type: 'container',
            className: 'ae-Combo-items',
            visibleOn: 'this.dataMapSwitch',
            body: [
                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                    label: (0, amis_editor_core_2.tipedLabel)('原始数据打平', '开启后，会将所有原始数据打平设置到 data 中，并在此基础上定制'),
                    name: 'withDefaultData',
                    className: 'mb-0',
                    pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                    onChange: function (value, origin, item, form) {
                        form.setValues({
                            data: value ? { '&': '$$' } : {},
                            dataMap: {}
                        });
                    }
                }),
                {
                    type: 'input-kv',
                    syncDefaultValue: false,
                    name: 'dataMap',
                    className: 'block -mt-5',
                    deleteBtn: {
                        icon: 'fa fa-trash'
                    },
                    itemsWrapperClassName: 'ae-Combo-items',
                    pipeIn: function (e, form) {
                        var _a;
                        var data = (0, cloneDeep_1.default)((_a = form.data) === null || _a === void 0 ? void 0 : _a.data);
                        return data && data['&'] === '$$' ? (0, omit_1.default)(data, '&') : data;
                    },
                    onChange: function (value, oldValue, model, form) {
                        var newData = form.data.withDefaultData
                            ? (0, assign_1.default)({ '&': '$$' }, value)
                            : (0, cloneDeep_1.default)(value);
                        form.setValues({
                            data: newData
                        });
                        return value;
                    }
                }
            ]
        })
    ]
});
