"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var amis_editor_core_2 = require("amis-editor-core");
(0, amis_editor_core_1.setSchemaTpl)('horizontal-align', {
    type: 'button-group-select',
    label: '位置',
    options: [
        {
            label: '左边',
            value: 'left',
            icon: 'fa fa-align-left'
        },
        {
            label: '右边',
            value: 'right',
            icon: 'fa fa-align-right'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('leftFixed', {
    name: 'horizontal.leftFixed',
    type: 'button-group-select',
    visibleOn: 'data.horizontal && data.horizontal.leftFixed',
    label: '宽度',
    size: 'xs',
    options: [
        {
            label: '小',
            value: 'sm'
        },
        {
            label: '中',
            value: 'normal'
        },
        {
            label: '大',
            value: 'lg'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('leftRate', {
    name: 'horizontal',
    type: 'input-range',
    visibleOn: 'data.horizontal && !data.horizontal.leftFixed',
    min: 1,
    max: 11,
    step: 1,
    label: (0, amis_editor_core_2.tipedLabel)('比例', '12 等份，标题宽度占比 n/12'),
    pipeIn: function (v) {
        return v.left || 3;
    },
    pipeOut: function (v) {
        return { left: v, right: 12 - v };
    }
});
(0, amis_editor_core_1.setSchemaTpl)('labelAlign', {
    name: 'labelAlign',
    type: 'button-group-select',
    visibleOn: 'data.horizontal && data.horizontal.leftFixed',
    label: '排列方式',
    size: 'xs',
    options: [
        {
            label: '左对齐',
            value: 'left'
        },
        {
            label: '右对齐',
            value: 'right'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('horizontal', function (config) {
    return [
        tslib_1.__assign({ type: 'select', label: '标签宽度', name: 'horizontal', options: [
                { label: '继承', value: 'formHorizontal' },
                { label: '固宽', value: 'leftFixed' },
                { label: '比例', value: 'leftRate' }
            ], pipeIn: function (v) {
                if (!v) {
                    return 'formHorizontal';
                }
                if (v.leftFixed) {
                    return 'leftFixed';
                }
                return 'leftRate';
            }, pipeOut: function (v) {
                var defaultData = {
                    formHorizontal: undefined,
                    leftFixed: { leftFixed: 'normal' },
                    leftRate: { left: 3, right: 9 }
                };
                // @ts-ignore
                return defaultData[v];
            }, visibleOn: 'this.mode == "horizontal" && this.label !== false' }, ((0, isObject_1.default)(config) ? config : {})),
        (0, amis_editor_core_1.getSchemaTpl)('layout:wrapper-contanier', {
            visibleOn: 'this.mode == "horizontal" && this.horizontal && this.label !== false',
            body: [
                (0, amis_editor_core_1.getSchemaTpl)('leftFixed'),
                (0, amis_editor_core_1.getSchemaTpl)('leftRate'),
                (0, amis_editor_core_1.getSchemaTpl)('labelAlign')
            ]
        })
    ];
});
(0, amis_editor_core_1.setSchemaTpl)('subFormItemMode', {
    label: '子表单展示模式',
    name: 'subFormMode',
    type: 'button-group-select',
    size: 'sm',
    option: '继承',
    // mode: 'inline',
    // className: 'w-full',
    pipeIn: (0, amis_editor_core_1.defaultValue)(''),
    options: [
        {
            label: '继承',
            value: ''
        },
        {
            label: '正常',
            value: 'normal'
        },
        {
            label: '内联',
            value: 'inline'
        },
        {
            label: '水平',
            value: 'horizontal'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('subFormHorizontalMode', {
    type: 'switch',
    label: '子表单水平占比设置',
    name: 'subFormHorizontal',
    onText: '继承',
    offText: '自定义',
    inputClassName: 'text-sm',
    visibleOn: 'this.subFormMode == "horizontal"',
    pipeIn: function (value) { return !value; },
    pipeOut: function (value, originValue, data) {
        return value
            ? null
            : data.formHorizontal || {
                leftFixed: 'normal'
            };
    }
});
(0, amis_editor_core_1.setSchemaTpl)('subFormItemMode', {
    label: '子表单展示模式',
    name: 'subFormMode',
    type: 'button-group-select',
    size: 'sm',
    option: '继承',
    // mode: 'inline',
    // className: 'w-full',
    pipeIn: (0, amis_editor_core_1.defaultValue)(''),
    options: [
        {
            label: '继承',
            value: ''
        },
        {
            label: '正常',
            value: 'normal'
        },
        {
            label: '内联',
            value: 'inline'
        },
        {
            label: '水平',
            value: 'horizontal'
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('subFormHorizontalMode', {
    type: 'switch',
    label: '子表单水平占比设置',
    name: 'subFormHorizontal',
    onText: '继承',
    offText: '自定义',
    inputClassName: 'text-sm',
    visibleOn: 'this.subFormMode == "horizontal"',
    pipeIn: function (value) { return !value; },
    pipeOut: function (value, originValue, data) {
        return value
            ? null
            : data.formHorizontal || {
                leftFixed: 'normal'
            };
    }
});
(0, amis_editor_core_1.setSchemaTpl)('subFormHorizontal', {
    type: 'combo',
    syncDefaultValue: false,
    visibleOn: 'data.subFormMode == "horizontal" && data.subFormHorizontal',
    name: 'subFormHorizontal',
    multiLine: true,
    pipeIn: function (value) {
        return {
            leftRate: value && typeof value.left === 'number'
                ? value.left
                : value && /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(value.left)
                    ? parseInt(RegExp.$1, 10)
                    : 2,
            leftFixed: (value && value.leftFixed) || ''
        };
    },
    pipeOut: function (value) {
        var left = Math.min(11, Math.max(1, value.leftRate || 2));
        return {
            leftFixed: value.leftFixed || '',
            left: left,
            right: 12 - left
        };
    },
    inputClassName: 'no-padder',
    items: [
        {
            name: 'leftFixed',
            type: 'button-group-select',
            label: '左侧宽度',
            size: 'xs',
            options: [
                {
                    label: '比率',
                    value: ''
                },
                {
                    label: '小宽度',
                    value: 'sm',
                    visibleOn: 'this.leftFixed'
                },
                {
                    label: '固定宽度',
                    value: 'normal'
                },
                {
                    label: '大宽度',
                    value: 'lg',
                    visibleOn: 'this.leftFixed'
                }
            ]
        },
        {
            name: 'leftRate',
            type: 'input-range',
            visibleOn: '!this.leftFixed',
            min: 1,
            max: 11,
            step: 1,
            label: '左右分布调整(n/12)',
            labelRemark: {
                trigger: 'click',
                className: 'm-l-xs',
                rootClose: true,
                content: '一共 12 等份，这里可以设置左侧宽度占比 n/12。',
                placement: 'left'
            }
        }
    ]
});
