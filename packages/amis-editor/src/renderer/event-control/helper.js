"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventControlConfig = exports.getOldActionSchema = exports.getPropOfAcion = exports.hasActionType = exports.getEventStrongDesc = exports.getEventDesc = exports.getEventLabel = exports.getActionType = exports.findSubActionNode = exports.findActionNode = exports.COMMON_ACTION_SCHEMA_MAP = exports.renderCmptActionSelect = exports.renderCmptSelect = exports.ACTION_TYPE_TREE = exports.SUPPORT_DISABLED_CMPTS = exports.SUPPORT_STATIC_FORMITEM_CMPTS = exports.FORMITEM_CMPTS = exports.SHOW_SELECT_PROP = exports.IS_DATA_CONTAINER = exports.SELECT_PROPS_CONTAINER = exports.DATA_CONTAINER = exports.getArgsWrapper = void 0;
var tslib_1 = require("tslib");
/**
 * @file 一些处理方法
 */
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var amis_core_1 = require("amis-core");
var amis_1 = require("amis");
var without_1 = tslib_1.__importDefault(require("lodash/without"));
var comp_action_select_1 = tslib_1.__importDefault(require("./comp-action-select"));
var getArgsWrapper = function (items, multiple, patch) {
    if (multiple === void 0) { multiple = false; }
    if (patch === void 0) { patch = {}; }
    return (tslib_1.__assign(tslib_1.__assign({ type: 'combo', name: 'args', 
        // label: '动作参数',
        multiple: multiple, strictMode: false }, patch), { items: Array.isArray(items) ? items : [items] }));
};
exports.getArgsWrapper = getArgsWrapper;
// 数据容器范围
exports.DATA_CONTAINER = [
    'form',
    'dialog',
    'drawer',
    'wizard',
    'service',
    'crud',
    'page',
    'app',
    'chart'
];
var MSG_TYPES = {
    info: '提示',
    warning: '警告',
    success: '成功',
    error: '错误'
};
// 下拉展示可赋值属性范围
exports.SELECT_PROPS_CONTAINER = ['form'];
// 是否数据容器
exports.IS_DATA_CONTAINER = "".concat(JSON.stringify(exports.DATA_CONTAINER), ".includes(data.__rendererName)");
// 是否下拉展示可赋值属性
exports.SHOW_SELECT_PROP = "".concat(JSON.stringify(exports.SELECT_PROPS_CONTAINER), ".includes(data.__rendererName)");
// 表单项组件
exports.FORMITEM_CMPTS = [
    'button-group-select',
    'button-toolbar',
    'chained-select',
    'chart-radios',
    'checkbox',
    'checkboxes',
    'combo',
    'input-kv',
    'condition-builder',
    'diff-editor',
    'editor',
    'formula',
    'hidden',
    'icon-picker',
    'input-array',
    'input-city',
    'input-color',
    'input-date',
    'input-date-range',
    'input-datetime-range',
    'input-time-range',
    'input-excel',
    'input-file',
    'input-formula',
    'input-group',
    'input-image',
    'input-month-range',
    'input-number',
    'input-quarter-range',
    'input-range',
    'input-rating',
    'input-repeat',
    'input-rich-text',
    'input-sub-form',
    'input-table',
    'input-tag',
    'input-text',
    'input-password',
    'input-email',
    'input-url',
    'native-date',
    'native-time',
    'native-number',
    'input-tree',
    'input-year-range',
    'list-select',
    'location-picker',
    'matrix-checkboxes',
    'nested-select',
    'cascader-select',
    'picker',
    'radios',
    'select',
    'multi-select',
    'switch',
    'tabs-transfer',
    'tabs-transfer-picker',
    'textarea',
    'transfer',
    'transfer-picker',
    'tree-select',
    'uuid'
];
exports.SUPPORT_STATIC_FORMITEM_CMPTS = without_1.default.apply(void 0, tslib_1.__spreadArray([exports.FORMITEM_CMPTS], [
    'button-toolbar',
    'condition-builder',
    'diff-editor',
    'editor',
    'formula',
    'hidden',
    'icon-picker',
    'input-excel',
    'input-file',
    'input-formula',
    'input-image',
    'input-repeat',
    'input-rich-text',
    'input-sub-form',
    'input-table',
    'picker',
    'uuid'
], false));
exports.SUPPORT_DISABLED_CMPTS = [
    'button-group',
    'action',
    'button',
    'submit',
    'reset',
    'collapse',
    'container',
    'dropdown-button',
    'flex',
    'flex-item',
    'grid',
    'grid-2d',
    'link',
    'nav',
    'wizard'
    // 'card2'
];
// 用于变量赋值 页面变量和内存变量的树选择器中，支持展示变量类型
var getCustomNodeTreeSelectSchema = function (opts) { return (tslib_1.__assign({ type: 'tree-select', name: 'path', label: '内存变量', multiple: false, mode: 'horizontal', required: true, placeholder: '请选择变量', showIcon: false, size: 'lg', hideRoot: false, rootLabel: '内存变量', options: [], menuTpl: {
        type: 'flex',
        className: 'p-1',
        items: [
            {
                type: 'container',
                body: [
                    {
                        type: 'tpl',
                        tpl: '${label}',
                        inline: true,
                        wrapperComponent: ''
                    }
                ],
                style: {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    position: 'static',
                    overflowY: 'auto',
                    flex: '0 0 auto'
                },
                wrapperBody: false,
                isFixedHeight: true
            },
            {
                type: 'container',
                body: [
                    {
                        type: 'tpl',
                        tpl: '${type}',
                        inline: true,
                        wrapperComponent: '',
                        style: {
                            background: '#f5f5f5',
                            paddingLeft: '8px',
                            paddingRight: '8px',
                            borderRadius: '4px'
                        }
                    }
                ],
                size: 'xs',
                style: {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    position: 'static',
                    overflowY: 'auto',
                    flex: '0 0 auto'
                },
                wrapperBody: false,
                isFixedHeight: true,
                isFixedWidth: false
            }
        ],
        style: {
            position: 'relative',
            inset: 'auto',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '24px',
            overflowY: 'hidden'
        },
        isFixedHeight: true,
        isFixedWidth: false
    } }, opts)); };
var ACTION_TYPE_TREE = function (manager) {
    var variableManager = manager === null || manager === void 0 ? void 0 : manager.variableManager;
    /** 变量列表 */
    var variableOptions = (variableManager === null || variableManager === void 0 ? void 0 : variableManager.getVariableOptions()) || [];
    var pageVariableOptions = (variableManager === null || variableManager === void 0 ? void 0 : variableManager.getPageVariablesOptions()) || [];
    // let dialogActions: any[] = [];
    var dialogActions = (0, amis_editor_core_1.getDialogActions)(manager.store.schema, 'source');
    return [
        {
            actionLabel: '页面',
            actionType: 'page',
            children: [
                {
                    actionLabel: '跳转链接',
                    actionType: 'url',
                    description: '跳转至指定链接的页面',
                    innerArgs: ['url', 'params', 'blank'],
                    descDetail: function (info) {
                        var _a;
                        return (react_1.default.createElement("div", null,
                            "\u8DF3\u8F6C\u81F3",
                            react_1.default.createElement("span", { className: "variable-left" }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.url) || '-')));
                    },
                    schema: (0, exports.getArgsWrapper)([
                        {
                            type: 'wrapper',
                            className: 'p-none',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('textareaFormulaControl', {
                                    name: 'url',
                                    label: '页面地址',
                                    variables: '${variables}',
                                    mode: 'horizontal',
                                    // placeholder: 'http://', 长文本暂不支持
                                    size: 'lg',
                                    required: true,
                                    visibleOn: 'data.actionType === "url"'
                                }),
                                {
                                    type: 'combo',
                                    name: 'params',
                                    label: '页面参数',
                                    multiple: true,
                                    mode: 'horizontal',
                                    size: 'lg',
                                    items: [
                                        {
                                            name: 'key',
                                            placeholder: '参数名',
                                            type: 'input-text'
                                        },
                                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                            variables: '${variables}',
                                            name: 'val',
                                            placeholder: '参数值'
                                        })
                                    ]
                                },
                                {
                                    type: 'switch',
                                    name: 'blank',
                                    label: '新窗口打开',
                                    onText: '是',
                                    offText: '否',
                                    mode: 'horizontal',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                }
                            ]
                        }
                    ])
                },
                {
                    actionLabel: '打开页面',
                    actionType: 'link',
                    description: '打开指定页面',
                    innerArgs: ['link', 'params', 'pageName', '__pageInputSchema'],
                    descDetail: function (info) {
                        var _a;
                        return (react_1.default.createElement("div", null,
                            "\u6253\u5F00",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.pageName) || '-'),
                            "\u9875\u9762"));
                    },
                    schema: (0, exports.getArgsWrapper)([
                        {
                            type: 'wrapper',
                            className: 'p-none',
                            body: [(0, amis_editor_core_1.getSchemaTpl)('app-page'), (0, amis_editor_core_1.getSchemaTpl)('app-page-args')]
                        }
                    ])
                },
                {
                    actionLabel: '刷新页面',
                    actionType: 'refresh',
                    description: '触发浏览器刷新页面'
                },
                {
                    actionLabel: '回退页面',
                    actionType: 'goBack',
                    description: '浏览器回退',
                    descDetail: function (info) { return react_1.default.createElement("div", null, "\u8FD4\u56DE\u4E0A\u4E00\u9875"); }
                }
            ]
        },
        {
            actionLabel: '弹窗消息',
            actionType: 'dialogs',
            children: [
                {
                    actionLabel: '打开弹窗',
                    actionType: 'openDialog',
                    description: '打开弹窗，弹窗内支持复杂的交互设计',
                    actions: [
                        {
                            actionType: 'dialog'
                        },
                        {
                            actionType: 'drawer'
                        },
                        {
                            actionType: 'confirmDialog'
                        }
                    ],
                    schema: [
                        {
                            type: 'radios',
                            label: '弹窗来源',
                            name: '__dialogSource',
                            required: true,
                            mode: 'horizontal',
                            inputClassName: 'event-action-radio',
                            value: 'new',
                            options: [
                                {
                                    label: '选择页面内已有弹窗',
                                    value: 'current'
                                },
                                {
                                    label: '新建弹窗',
                                    value: 'new'
                                }
                            ]
                        },
                        {
                            name: '__dialogTitle',
                            type: 'input-text',
                            label: '弹窗标题',
                            placeholder: '请输入弹窗标题',
                            mode: 'horizontal',
                            size: 'lg',
                            visibleOn: '__dialogSource === "new"'
                        },
                        {
                            name: '__selectDialog',
                            type: 'select',
                            label: '选择弹窗',
                            options: dialogActions,
                            mode: 'horizontal',
                            size: 'lg',
                            visibleOn: '__dialogSource === "current"',
                            onChange: function (value, oldValue, model, form) {
                                form.setValueByName('args', {
                                    formCurrentDialog: true
                                });
                            }
                        },
                        {
                            type: 'radios',
                            label: '弹窗类型',
                            name: 'groupType',
                            mode: 'horizontal',
                            value: 'dialog',
                            required: true,
                            pipeIn: (0, amis_editor_core_1.defaultValue)('dialog'),
                            inputClassName: 'event-action-radio',
                            options: [
                                {
                                    label: '弹窗',
                                    value: 'dialog'
                                },
                                {
                                    label: '抽屉',
                                    value: 'drawer'
                                },
                                {
                                    label: '确认对话框',
                                    value: 'confirmDialog'
                                }
                            ],
                            visibleOn: 'data.actionType === "openDialog" && __dialogSource === "new"'
                        }
                    ]
                },
                {
                    actionLabel: '关闭弹窗',
                    actionType: 'closeDialog',
                    description: '关闭当前弹窗' // 或者关闭指定弹窗
                    // schema: getArgsWrapper({
                    //   type: 'wrapper',
                    //   className: 'p-none',
                    //   body: [
                    //     {
                    //       type: 'radios',
                    //       label: '类型',
                    //       name: 'groupType',
                    //       mode: 'horizontal',
                    //       value: 'closeDialog',
                    //       required: true,
                    //       pipeIn: defaultValue('closeDialog'),
                    //       options: [
                    //         {
                    //           label: '弹窗',
                    //           value: 'closeDialog'
                    //         },
                    //         {
                    //           label: '抽屉',
                    //           value: 'closeDrawer'
                    //         }
                    //       ],
                    //       visibleOn: 'data.actionType === "closeDialog"'
                    //     }
                    //   ]
                    // })
                },
                // 暂时下掉，看后面具体设计
                // {
                //   actionLabel: '打开提示对话框',
                //   actionType: 'alert',
                //   description: '弹个提示对话框'
                // },
                // {
                //   actionLabel: '打开确认对话框',
                //   actionType: 'confirm',
                //   description: '弹个确认对话框'
                // },
                {
                    actionLabel: '消息提醒',
                    actionType: 'toast',
                    description: '弹出消息提醒',
                    innerArgs: [
                        'title',
                        'msgType',
                        'msg',
                        'position',
                        'timeout',
                        'closeButton',
                        'showIcon',
                        'className'
                    ],
                    descDetail: function (info) {
                        var _a, _b;
                        return (react_1.default.createElement("div", null,
                            MSG_TYPES[(_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.msgType] || '',
                            "\u6D88\u606F\uFF1A",
                            react_1.default.createElement("span", { className: "variable-left" }, ((_b = info === null || info === void 0 ? void 0 : info.args) === null || _b === void 0 ? void 0 : _b.msg) || '-')));
                    },
                    schema: (0, exports.getArgsWrapper)({
                        type: 'wrapper',
                        className: 'p-none',
                        body: [
                            {
                                type: 'button-group-select',
                                name: 'msgType',
                                label: '消息类型',
                                value: 'info',
                                required: true,
                                mode: 'horizontal',
                                options: Object.keys(MSG_TYPES).map(function (key) { return ({
                                    label: MSG_TYPES[key],
                                    value: key,
                                    level: 'default'
                                }); })
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('textareaFormulaControl', {
                                name: 'msg',
                                label: '消息内容',
                                mode: 'horizontal',
                                variables: '${variables}',
                                size: 'lg',
                                required: true
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('textareaFormulaControl', {
                                name: 'title',
                                label: '标题内容',
                                variables: '${variables}',
                                mode: 'horizontal',
                                size: 'lg'
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                name: 'timeout',
                                label: '持续时间(ms)',
                                rendererSchema: {
                                    type: 'input-number'
                                },
                                valueType: 'number',
                                variables: '${variables}',
                                size: 'lg',
                                mode: 'horizontal'
                            }),
                            {
                                type: 'button-group-select',
                                name: 'position',
                                value: 'top-right',
                                mode: 'horizontal',
                                label: '显示位置',
                                options: [
                                    {
                                        label: '左上',
                                        value: 'top-left'
                                    },
                                    {
                                        label: '中上',
                                        value: 'top-center'
                                    },
                                    {
                                        label: '右上',
                                        value: 'top-right'
                                    },
                                    {
                                        label: '左下',
                                        value: 'bottom-left'
                                    },
                                    {
                                        label: '中下',
                                        value: 'bottom-center'
                                    },
                                    {
                                        label: '右下',
                                        value: 'bottom-right'
                                    }
                                ]
                            },
                            {
                                type: 'switch',
                                name: 'closeButton',
                                value: true,
                                label: '展示关闭按钮',
                                mode: 'horizontal'
                            },
                            {
                                type: 'switch',
                                name: 'showIcon',
                                value: true,
                                label: '展示图标',
                                mode: 'horizontal'
                            }
                        ]
                    })
                }
            ]
        },
        {
            actionLabel: '服务',
            actionType: 'service',
            children: [
                {
                    actionLabel: '发送请求',
                    actionType: 'ajax',
                    description: '配置并发送API请求',
                    // innerArgs: ['api', 'options'],
                    descDetail: function (info) {
                        var _a, _b;
                        var apiInfo = (_a = info === null || info === void 0 ? void 0 : info.api) !== null && _a !== void 0 ? _a : (_b = info === null || info === void 0 ? void 0 : info.args) === null || _b === void 0 ? void 0 : _b.api;
                        if (typeof apiInfo === 'string') {
                            apiInfo = (0, amis_core_1.normalizeApi)(apiInfo);
                        }
                        return (react_1.default.createElement("div", null,
                            "\u53D1\u9001",
                            react_1.default.createElement("span", { className: "variable-right variable-left" }, (apiInfo === null || apiInfo === void 0 ? void 0 : apiInfo.method) || '-'),
                            "\u8BF7\u6C42\uFF1A",
                            react_1.default.createElement("span", { className: "variable-left" }, (apiInfo === null || apiInfo === void 0 ? void 0 : apiInfo.url) || '-')));
                    },
                    schema: {
                        type: 'wrapper',
                        className: 'p-none',
                        body: [
                            // getArgsWrapper(
                            //   [
                            //     getSchemaTpl('apiControl', {
                            //       name: 'api',
                            //       label: '配置请求',
                            //       mode: 'horizontal',
                            //       size: 'lg',
                            //       inputClassName: 'm-b-none',
                            //       renderLabel: true,
                            //       required: true
                            //     }),
                            //     {
                            //       name: 'options',
                            //       type: 'combo',
                            //       label: tipedLabel(
                            //         '静默请求',
                            //         '开启后，服务请求将以静默模式发送，即不会弹出成功或报错提示。'
                            //       ),
                            //       mode: 'horizontal',
                            //       items: [
                            //         {
                            //           type: 'switch',
                            //           name: 'silent',
                            //           label: false,
                            //           onText: '开启',
                            //           offText: '关闭',
                            //           mode: 'horizontal',
                            //           pipeIn: defaultValue(false)
                            //         }
                            //       ]
                            //     }
                            //   ],
                            //   false,
                            //   {
                            //     className: 'action-apiControl'
                            //   }
                            // ),
                            (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                name: 'api',
                                label: '配置请求',
                                mode: 'horizontal',
                                size: 'lg',
                                inputClassName: 'm-b-none',
                                renderLabel: true,
                                required: true
                            }),
                            {
                                name: 'options',
                                type: 'combo',
                                label: (0, amis_editor_core_1.tipedLabel)('静默请求', '开启后，服务请求将以静默模式发送，即不会弹出成功或报错提示。'),
                                mode: 'horizontal',
                                items: [
                                    {
                                        type: 'switch',
                                        name: 'silent',
                                        label: false,
                                        onText: '开启',
                                        offText: '关闭',
                                        mode: 'horizontal',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                    }
                                ]
                            },
                            {
                                name: 'outputVar',
                                type: 'input-text',
                                label: '请求结果',
                                placeholder: '请输入存储请求结果的变量名称',
                                description: '如需执行多次发送请求，可以修改此变量名用于区分不同请求返回的结果',
                                mode: 'horizontal',
                                size: 'lg',
                                value: 'responseResult',
                                required: true
                            }
                        ]
                    },
                    outputVarDataSchema: [
                        {
                            type: 'object',
                            title: 'responseResult',
                            properties: {
                                responseData: {
                                    type: 'object',
                                    title: '响应数据'
                                },
                                responseStatus: {
                                    type: 'number',
                                    title: '状态标识'
                                },
                                responseMsg: {
                                    type: 'string',
                                    title: '提示信息'
                                }
                            }
                        }
                    ]
                },
                {
                    actionLabel: '下载文件',
                    actionType: 'download',
                    description: '触发下载文件',
                    // innerArgs: ['api'],
                    schema: {
                        type: 'wrapper',
                        style: { padding: '0' },
                        body: [
                            // getArgsWrapper(
                            //   getSchemaTpl('apiControl', {
                            //     name: 'api',
                            //     label: '配置请求',
                            //     mode: 'horizontal',
                            //     inputClassName: 'm-b-none',
                            //     size: 'lg',
                            //     renderLabel: true,
                            //     required: true
                            //   }),
                            //   false,
                            //   {
                            //     className: 'action-apiControl'
                            //   }
                            // )
                            (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                name: 'api',
                                label: '配置请求',
                                mode: 'horizontal',
                                inputClassName: 'm-b-none',
                                size: 'lg',
                                renderLabel: true,
                                required: true
                            })
                        ]
                    }
                }
            ]
        },
        {
            actionLabel: '组件',
            actionType: 'cmpt',
            children: [
                {
                    actionLabel: '组件可见性',
                    actionType: 'visibility',
                    description: '控制所选的组件的显示/隐藏',
                    actions: [
                        {
                            actionType: 'show',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    "\u663E\u793A",
                                    react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                                    "\u7EC4\u4EF6"));
                            }
                        },
                        {
                            actionType: 'hidden',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    "\u9690\u85CF",
                                    react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                                    "\u7EC4\u4EF6"));
                            }
                        },
                        {
                            actionType: 'visibility',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    "\u7EC4\u4EF6",
                                    react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                                    "\u8868\u8FBE\u5F0F\u5DF2\u914D\u7F6E"));
                            }
                        }
                    ],
                    supportComponents: '*',
                    schema: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptSelect)('目标组件', true)), false), [
                        {
                            type: 'radios',
                            label: '条件',
                            name: 'groupType',
                            mode: 'horizontal',
                            value: 'static',
                            required: true,
                            inputClassName: 'event-action-radio',
                            options: [
                                {
                                    label: '静态',
                                    value: 'static'
                                },
                                {
                                    label: '表达式',
                                    value: 'visibility'
                                }
                            ]
                        },
                        {
                            type: 'radios',
                            label: '显示/隐藏',
                            name: '__statusType',
                            mode: 'horizontal',
                            value: 'show',
                            required: true,
                            pipeIn: (0, amis_editor_core_1.defaultValue)('show'),
                            inputClassName: 'event-action-radio',
                            visibleOn: "this.groupType === 'static'",
                            options: [
                                {
                                    label: '显示',
                                    value: 'show'
                                },
                                {
                                    label: '隐藏',
                                    value: 'hidden'
                                }
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('expressionFormulaControl', {
                            mode: 'horizontal',
                            label: '表达式',
                            required: true,
                            size: 'lg',
                            variables: '${variables}',
                            evalMode: true,
                            name: '__actionExpression',
                            visibleOn: "this.groupType === 'visibility'"
                        })
                    ], false)
                },
                {
                    actionLabel: '组件可用性',
                    actionType: 'usability',
                    description: '控制所选的组件的启用/禁用',
                    actions: [
                        {
                            actionType: 'enabled',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    "\u542F\u7528",
                                    react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                                    "\u7EC4\u4EF6"));
                            }
                        },
                        {
                            actionType: 'disabled',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    "\u7981\u7528",
                                    react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                                    "\u7EC4\u4EF6"));
                            }
                        },
                        {
                            actionType: 'usability',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    "\u7EC4\u4EF6",
                                    react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                                    "\u8868\u8FBE\u5F0F\u5DF2\u914D\u7F6E"));
                            }
                        }
                    ],
                    supportComponents: tslib_1.__spreadArray(tslib_1.__spreadArray([
                        'form'
                    ], tslib_1.__read(exports.FORMITEM_CMPTS), false), tslib_1.__read(exports.SUPPORT_DISABLED_CMPTS), false),
                    schema: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptSelect)('目标组件', true)), false), [
                        {
                            type: 'radios',
                            label: '条件',
                            name: 'groupType',
                            mode: 'horizontal',
                            inputClassName: 'event-action-radio',
                            value: 'static',
                            required: true,
                            options: [
                                {
                                    label: '静态',
                                    value: 'static'
                                },
                                {
                                    label: '表达式',
                                    value: 'usability'
                                }
                            ]
                        },
                        {
                            type: 'radios',
                            label: '启用/禁用',
                            name: '__statusType',
                            mode: 'horizontal',
                            inputClassName: 'event-action-radio',
                            value: 'enabled',
                            required: true,
                            pipeIn: (0, amis_editor_core_1.defaultValue)('enabled'),
                            visibleOn: "this.groupType === 'static'",
                            options: [
                                {
                                    label: '启用',
                                    value: 'enabled'
                                },
                                {
                                    label: '禁用',
                                    value: 'disabled'
                                }
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('expressionFormulaControl', {
                            mode: 'horizontal',
                            label: '表达式',
                            required: true,
                            size: 'lg',
                            evalMode: true,
                            name: '__actionExpression',
                            visibleOn: "this.groupType === 'usability'"
                        })
                    ], false)
                },
                {
                    actionLabel: '组件展示态',
                    actionType: 'staticStatus',
                    description: '控制所选的组件的输入态/静态',
                    actions: [
                        {
                            actionType: 'static',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                                    "\u7EC4\u4EF6\u5207\u6362\u4E3A\u9759\u6001"));
                            }
                        },
                        {
                            actionType: 'nonstatic',
                            descDetail: function (info) {
                                return (react_1.default.createElement("div", null,
                                    react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                                    "\u7EC4\u4EF6\u5207\u6362\u4E3A\u8F93\u5165\u6001"));
                            }
                        }
                    ],
                    supportComponents: tslib_1.__spreadArray(['form'], tslib_1.__read(exports.SUPPORT_STATIC_FORMITEM_CMPTS), false),
                    schema: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptSelect)('选择组件', true)), false), [
                        {
                            type: 'radios',
                            label: '组件状态',
                            name: 'groupType',
                            mode: 'horizontal',
                            inputClassName: 'event-action-radio',
                            value: 'nonstatic',
                            required: true,
                            pipeIn: (0, amis_editor_core_1.defaultValue)('nonstatic'),
                            options: [
                                {
                                    label: '表单输入',
                                    value: 'nonstatic'
                                },
                                {
                                    label: '表单静态',
                                    value: 'static'
                                }
                            ]
                        }
                    ], false)
                },
                {
                    actionLabel: '重新请求数据',
                    actionType: 'reload',
                    description: '如果开启发送数据，会先发送配置数据到目标组件，然后重新请求数据。',
                    descDetail: function (info) {
                        return (react_1.default.createElement("div", null,
                            "\u5237\u65B0",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                            "\u7EC4\u4EF6"));
                    },
                    supportComponents: 'byComponent',
                    schema: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptSelect)('目标组件', true, function (value, oldVal, data, form) {
                        form.setValueByName('args.resetPage', true);
                        form.setValueByName('__addParam', false);
                        form.setValueByName('__containerType', 'all');
                        form.setValueByName('__reloadParam', []);
                    })), false), [
                        {
                            type: 'switch',
                            name: '__resetPage',
                            label: (0, amis_editor_core_1.tipedLabel)('重置页码', '选择“是”时，将重新请求第一页数据。'),
                            onText: '是',
                            offText: '否',
                            mode: 'horizontal',
                            pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                            visibleOn: "data.actionType === \"reload\" && data.__rendererName === \"crud\""
                        },
                        {
                            type: 'switch',
                            name: '__addParam',
                            label: (0, amis_editor_core_1.tipedLabel)('发送数据', '开启“发送数据”后，所配置的数据将发送给目标组件，这些数据将与目标组件数据域进行合并或覆盖'),
                            onText: '是',
                            offText: '否',
                            mode: 'horizontal',
                            pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                            visibleOn: "data.actionType === \"reload\" &&  data.__isScopeContainer",
                            onChange: function (value, oldVal, data, form) {
                                form.setValueByName('__containerType', 'all');
                            }
                        },
                        {
                            type: 'radios',
                            name: '__containerType',
                            mode: 'horizontal',
                            label: '',
                            pipeIn: (0, amis_editor_core_1.defaultValue)('all'),
                            visibleOn: "data.__addParam && data.actionType === \"reload\" && data.__isScopeContainer",
                            options: [
                                {
                                    label: '直接赋值',
                                    value: 'all'
                                },
                                {
                                    label: '成员赋值',
                                    value: 'appoint'
                                }
                            ],
                            onChange: function (value, oldVal, data, form) {
                                form.setValueByName('__reloadParams', []);
                                form.setValueByName('__valueInput', undefined);
                            }
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                            name: '__valueInput',
                            label: '',
                            variables: '${variables}',
                            size: 'lg',
                            mode: 'horizontal',
                            required: true,
                            visibleOn: "data.__addParam && data.__containerType === \"all\" && data.actionType === \"reload\" && data.__isScopeContainer"
                        }),
                        {
                            type: 'combo',
                            name: '__reloadParams',
                            label: '',
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
                                    labelField: 'label',
                                    valueField: 'value',
                                    required: true
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                    name: 'val',
                                    variables: '${variables}',
                                    placeholder: '参数值'
                                })
                            ],
                            visibleOn: "data.__addParam && data.__containerType === \"appoint\" && data.actionType === \"reload\" && data.__isScopeContainer"
                        },
                        {
                            type: 'radios',
                            name: 'dataMergeMode',
                            mode: 'horizontal',
                            label: (0, amis_editor_core_1.tipedLabel)('数据处理方式', '选择“合并”时，会将数据合并到目标组件的数据域。<br/>选择“覆盖”时，数据会直接覆盖目标组件的数据域。'),
                            pipeIn: (0, amis_editor_core_1.defaultValue)('merge'),
                            visibleOn: "data.__addParam && data.actionType === \"reload\" && data.__isScopeContainer",
                            options: [
                                {
                                    label: '合并',
                                    value: 'merge'
                                },
                                {
                                    label: '覆盖',
                                    value: 'override'
                                }
                            ]
                        }
                    ], false)
                },
                {
                    actionLabel: '变量赋值',
                    actionType: 'setValue',
                    description: '更新目标组件或变量的数据值',
                    innerArgs: [
                        'path',
                        'value',
                        'index',
                        'fromPage',
                        'fromApp',
                        '__valueInput',
                        '__comboType',
                        '__containerType'
                    ],
                    descDetail: function (info) {
                        var _a;
                        return (react_1.default.createElement("div", null, typeof ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.path) === 'string' && !(info === null || info === void 0 ? void 0 : info.componentId) ? (react_1.default.createElement(react_1.default.Fragment, null,
                            "\u8BBE\u7F6E\u53D8\u91CF\u300C",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, variableManager.getNameByPath(info.args.path)),
                            "\u300D\u7684\u6570\u636E")) : (react_1.default.createElement(react_1.default.Fragment, null,
                            "\u8BBE\u7F6E\u7EC4\u4EF6\u300C",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                            "\u300D\u7684\u6570\u636E"))));
                    },
                    supportComponents: 'byComponent',
                    schema: [
                        {
                            name: '__actionSubType',
                            type: 'radios',
                            label: '动作类型',
                            mode: 'horizontal',
                            options: [
                                { label: '组件变量', value: 'cmpt' },
                                { label: '页面变量', value: 'page' },
                                { label: '内存变量', value: 'app' }
                            ],
                            value: '${args.fromApp ? "app" : args.fromPage ? "page" : "cmpt"}',
                            onChange: function (value, oldVal, data, form) {
                                form.setValueByName('__valueInput', undefined);
                                form.setValueByName('args.value', undefined);
                                form.deleteValueByName('args.path');
                                if (value === 'page') {
                                    form.deleteValueByName('args.fromApp');
                                    form.setValueByName('args.fromPage', true);
                                }
                                else if (value === 'app') {
                                    form.deleteValueByName('args.fromPage');
                                    form.setValueByName('args.fromApp', true);
                                }
                            }
                        },
                        // 组件变量
                        {
                            type: 'container',
                            visibleOn: '__actionSubType === "cmpt"',
                            body: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptActionSelect)('目标组件', true, function (value, oldVal, data, form) {
                                form.setValueByName('args.__containerType', 'all');
                                form.setValueByName('args.__comboType', 'all');
                            })), false), [
                                (0, exports.getArgsWrapper)({
                                    type: 'wrapper',
                                    className: 'p-none',
                                    body: [
                                        {
                                            type: 'radios',
                                            name: '__containerType',
                                            mode: 'horizontal',
                                            label: '数据设置',
                                            pipeIn: (0, amis_editor_core_1.defaultValue)('all'),
                                            visibleOn: 'data.__isScopeContainer',
                                            options: [
                                                {
                                                    label: '直接赋值',
                                                    value: 'all'
                                                },
                                                {
                                                    label: '成员赋值',
                                                    value: 'appoint'
                                                }
                                            ],
                                            onChange: function (value, oldVal, data, form) {
                                                form.setValueByName('value', []);
                                                form.setValueByName('__valueInput', undefined);
                                            }
                                        },
                                        {
                                            type: 'radios',
                                            name: '__comboType',
                                            inputClassName: 'event-action-radio',
                                            mode: 'horizontal',
                                            label: '数据设置',
                                            pipeIn: (0, amis_editor_core_1.defaultValue)('all'),
                                            visibleOn: "data.__rendererName === 'combo' || data.__rendererName === 'input-table'",
                                            options: [
                                                {
                                                    label: '全量',
                                                    value: 'all'
                                                },
                                                {
                                                    label: '指定序号',
                                                    value: 'appoint'
                                                }
                                            ],
                                            onChange: function (value, oldVal, data, form) {
                                                form.setValueByName('index', undefined);
                                                form.setValueByName('value', []);
                                                form.setValueByName('__valueInput', undefined);
                                            }
                                        },
                                        {
                                            type: 'input-number',
                                            required: true,
                                            name: 'index',
                                            mode: 'horizontal',
                                            label: '输入序号',
                                            size: 'lg',
                                            placeholder: '请输入待更新序号',
                                            visibleOn: "(data.__rendererName === 'input-table' || data.__rendererName === 'combo')\n                      && data.__comboType === 'appoint'"
                                        },
                                        {
                                            type: 'combo',
                                            name: 'value',
                                            label: '',
                                            multiple: true,
                                            removable: true,
                                            required: true,
                                            addable: true,
                                            strictMode: false,
                                            canAccessSuperData: true,
                                            size: 'lg',
                                            mode: 'horizontal',
                                            items: [
                                                {
                                                    name: 'key',
                                                    type: 'input-text',
                                                    placeholder: '变量名',
                                                    source: '${__setValueDs}',
                                                    labelField: 'label',
                                                    valueField: 'value',
                                                    required: true
                                                },
                                                (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                                    name: 'val',
                                                    variables: '${variables}',
                                                    placeholder: '字段值'
                                                })
                                            ],
                                            visibleOn: "data.__isScopeContainer && data.__containerType === 'appoint' || data.__comboType === 'appoint'"
                                        },
                                        {
                                            type: 'combo',
                                            name: 'value',
                                            label: '',
                                            multiple: true,
                                            removable: true,
                                            required: true,
                                            addable: true,
                                            strictMode: false,
                                            canAccessSuperData: true,
                                            mode: 'horizontal',
                                            size: 'lg',
                                            items: [
                                                {
                                                    type: 'combo',
                                                    name: 'item',
                                                    label: false,
                                                    renderLabel: false,
                                                    multiple: true,
                                                    removable: true,
                                                    required: true,
                                                    addable: true,
                                                    strictMode: false,
                                                    canAccessSuperData: true,
                                                    className: 'm-l',
                                                    size: 'lg',
                                                    mode: 'horizontal',
                                                    items: [
                                                        {
                                                            name: 'key',
                                                            type: 'input-text',
                                                            source: '${__setValueDs}',
                                                            labelField: 'label',
                                                            valueField: 'value',
                                                            required: true,
                                                            visibleOn: "data.__rendererName"
                                                        },
                                                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                                            name: 'val',
                                                            variables: '${variables}'
                                                        })
                                                    ]
                                                }
                                            ],
                                            visibleOn: "(data.__rendererName === 'combo' || data.__rendererName === 'input-table')\n                      && data.__comboType === 'all'"
                                        },
                                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                            name: '__valueInput',
                                            label: '',
                                            variables: '${variables}',
                                            size: 'lg',
                                            mode: 'horizontal',
                                            visibleOn: "(data.__isScopeContainer || ".concat(exports.SHOW_SELECT_PROP, ") && data.__containerType === 'all'"),
                                            required: true
                                        }),
                                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                            name: '__valueInput',
                                            label: '数据设置',
                                            variables: '${variables}',
                                            size: 'lg',
                                            mode: 'horizontal',
                                            visibleOn: "data.__rendererName && !data.__isScopeContainer && data.__rendererName !== 'combo' && data.__rendererName !== 'input-table'",
                                            required: true
                                        })
                                    ]
                                })
                            ], false)
                        },
                        // 页面变量
                        {
                            type: 'container',
                            visibleOn: '__actionSubType === "page"',
                            body: [
                                (0, exports.getArgsWrapper)([
                                    {
                                        type: 'wrapper',
                                        className: 'p-none',
                                        body: [
                                            getCustomNodeTreeSelectSchema({
                                                label: '页面变量',
                                                rootLabel: '页面变量',
                                                options: pageVariableOptions
                                            }),
                                            (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                                name: 'value',
                                                label: '数据设置',
                                                variables: '${variables}',
                                                size: 'lg',
                                                mode: 'horizontal',
                                                required: true,
                                                placeholder: '请输入变量值'
                                            })
                                        ]
                                    }
                                ])
                            ]
                        },
                        // 内存变量
                        {
                            type: 'container',
                            visibleOn: '__actionSubType === "app"',
                            body: [
                                (0, exports.getArgsWrapper)([
                                    {
                                        type: 'wrapper',
                                        className: 'p-none',
                                        body: [
                                            getCustomNodeTreeSelectSchema({
                                                options: variableOptions
                                            }),
                                            (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                                name: 'value',
                                                label: '数据设置',
                                                variables: '${variables}',
                                                size: 'lg',
                                                mode: 'horizontal',
                                                required: true,
                                                placeholder: '请输入变量值'
                                            })
                                        ]
                                    }
                                ])
                            ]
                        }
                    ]
                },
                {
                    actionLabel: '提交表单',
                    actionType: 'submit',
                    description: '触发表单提交',
                    descDetail: function (info) {
                        return (react_1.default.createElement("div", null,
                            "\u63D0\u4EA4",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                            "\u7684\u6570\u636E"));
                    },
                    supportComponents: 'form',
                    schema: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptSelect)('目标组件', true)), false), [
                        {
                            name: 'outputVar',
                            type: 'input-text',
                            label: '提交结果',
                            placeholder: '请输入存储提交结果的变量名称',
                            description: '如需执行多次表单提交，可以修改此变量名用于区分不同的提交结果',
                            mode: 'horizontal',
                            size: 'lg',
                            value: 'submitResult',
                            required: true
                        }
                    ], false),
                    outputVarDataSchema: [
                        {
                            type: 'object',
                            title: 'submitResult',
                            properties: {
                                error: {
                                    type: 'string',
                                    title: '错误信息'
                                },
                                errors: {
                                    type: 'object',
                                    title: '错误详情'
                                },
                                payload: {
                                    type: 'object',
                                    title: '提交的表单数据'
                                },
                                responseData: {
                                    type: 'object',
                                    title: '提交请求的响应数据'
                                }
                            }
                        }
                    ]
                },
                {
                    actionLabel: '清空表单',
                    actionType: 'clear',
                    description: '清空表单数据',
                    descDetail: function (info) {
                        return (react_1.default.createElement("div", null,
                            "\u6E05\u7A7A",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                            "\u7684\u6570\u636E"));
                    },
                    supportComponents: 'form',
                    schema: (0, exports.renderCmptSelect)('目标组件', true)
                },
                {
                    actionLabel: '重置表单',
                    actionType: 'reset',
                    description: '重置表单数据',
                    descDetail: function (info) {
                        return (react_1.default.createElement("div", null,
                            "\u91CD\u7F6E",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                            "\u7684\u6570\u636E"));
                    },
                    supportComponents: 'form',
                    schema: (0, exports.renderCmptSelect)('目标组件', true)
                },
                {
                    actionLabel: '校验表单',
                    actionType: 'validate',
                    description: '校验表单数据',
                    descDetail: function (info) {
                        return (react_1.default.createElement("div", null,
                            "\u6821\u9A8C",
                            react_1.default.createElement("span", { className: "variable-left variable-right" }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'),
                            "\u7684\u6570\u636E"));
                    },
                    supportComponents: 'form',
                    schema: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptSelect)('目标组件', true)), false), [
                        {
                            name: 'outputVar',
                            type: 'input-text',
                            label: '校验结果',
                            placeholder: '请输入存储校验结果的变量名称',
                            description: '如需执行多次表单校验，可以修改此变量名用于区分不同的校验结果',
                            mode: 'horizontal',
                            size: 'lg',
                            value: 'validateResult',
                            required: true
                        }
                    ], false),
                    outputVarDataSchema: [
                        {
                            type: 'object',
                            title: 'validateResult',
                            properties: {
                                error: {
                                    type: 'string',
                                    title: '错误信息'
                                },
                                errors: {
                                    type: 'object',
                                    title: '错误详情'
                                },
                                payload: {
                                    type: 'object',
                                    title: '提交的表单数据'
                                }
                            }
                        }
                    ]
                },
                {
                    actionLabel: '组件特性动作',
                    actionType: 'component',
                    description: '触发所选组件的特性动作',
                    supportComponents: '*',
                    schema: (0, exports.renderCmptActionSelect)('目标组件', true)
                }
            ]
        },
        {
            actionLabel: '其他',
            actionType: 'others',
            children: [
                {
                    actionLabel: '复制内容',
                    actionType: 'copy',
                    description: '复制文本内容至粘贴板',
                    innerArgs: ['content', 'copyFormat'],
                    descDetail: function (info) {
                        var _a;
                        return (react_1.default.createElement("div", null,
                            "\u590D\u5236\u5185\u5BB9\uFF1A",
                            react_1.default.createElement("span", { className: "variable-left" }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.content) || '-')));
                    },
                    schema: (0, exports.getArgsWrapper)({
                        type: 'wrapper',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_1.getSchemaTpl)('textareaFormulaControl', {
                                name: 'content',
                                label: '内容模板',
                                variables: '${variables}',
                                mode: 'horizontal',
                                size: 'lg',
                                visibleOn: 'data.actionType === "copy"',
                                required: true
                            }),
                            {
                                type: 'select',
                                name: 'copyFormat',
                                mode: 'horizontal',
                                value: 'text/plain',
                                size: 'lg',
                                options: [
                                    {
                                        label: '纯文本',
                                        value: 'text/plain'
                                    },
                                    {
                                        label: '富文本',
                                        value: 'text/html'
                                    }
                                ],
                                label: '复制格式'
                            }
                        ]
                    })
                },
                {
                    actionLabel: '自定义JS',
                    actionType: 'custom',
                    description: '通过JavaScript自定义动作逻辑',
                    schema: {
                        type: 'js-editor',
                        allowFullscreen: true,
                        required: true,
                        name: 'script',
                        label: '自定义JS',
                        mode: 'horizontal',
                        options: {
                            automaticLayout: true,
                            lineNumbers: 'off',
                            glyphMargin: false,
                            tabSize: 2,
                            fontSize: '12px',
                            wordWrap: 'on',
                            lineDecorationsWidth: 0,
                            lineNumbersMinChars: 0,
                            selectOnLineNumbers: true,
                            scrollBeyondLastLine: false,
                            folding: true
                        },
                        className: 'ae-event-control-action-js-editor',
                        value: "/* \u81EA\u5B9A\u4E49JS\u4F7F\u7528\u8BF4\u660E\uFF1A\n  * 1.\u52A8\u4F5C\u6267\u884C\u51FD\u6570doAction\uFF0C\u53EF\u4EE5\u6267\u884C\u6240\u6709\u7C7B\u578B\u7684\u52A8\u4F5C\n  * 2.\u901A\u8FC7\u4E0A\u4E0B\u6587\u5BF9\u8C61context\u53EF\u4EE5\u83B7\u53D6\u5F53\u524D\u7EC4\u4EF6\u5B9E\u4F8B\uFF0C\u4F8B\u5982context.props\u53EF\u4EE5\u83B7\u53D6\u8BE5\u7EC4\u4EF6\u76F8\u5173\u5C5E\u6027\n  * 3.\u4E8B\u4EF6\u5BF9\u8C61event\uFF0C\u5728doAction\u4E4B\u540E\u6267\u884Cevent.stopPropagation();\u53EF\u4EE5\u963B\u6B62\u540E\u7EED\u52A8\u4F5C\u6267\u884C\n*/\nconst myMsg = '\u6211\u662F\u81EA\u5B9A\u4E49JS';\ndoAction({\n  actionType: 'toast',\n  args: {\n    msg: myMsg\n  }\n});\n"
                    }
                }
                // {
                //   actionLabel: '广播',
                //   actionType: 'broadcast',
                //   description: '发送广播事件',
                //   schema: {
                //     type: 'wrapper',
                //     className: 'p-none',
                //     body: [
                //       {
                //         type: 'input-text',
                //         name: 'eventName',
                //         label: '广播标识',
                //         mode: 'horizontal',
                //         required: true,
                //         description: '广播事件标识派发出去后，其他组件可以进行监听并作出响应'
                //       },
                //       {
                //         type: 'input-text',
                //         label: '广播名称',
                //         name: 'eventLabel',
                //         mode: 'horizontal',
                //         required: true
                //       },
                //       {
                //         type: 'textarea',
                //         label: '描述',
                //         name: 'description',
                //         mode: 'horizontal',
                //         required: true
                //       }
                //     ]
                //   }
                // }
            ]
        }
    ];
};
exports.ACTION_TYPE_TREE = ACTION_TYPE_TREE;
// 渲染组件选择配置项
var renderCmptSelect = function (componentLabel, required, onChange) {
    return [
        {
            type: 'tree-select',
            name: 'componentId',
            label: componentLabel || '选择组件',
            showIcon: false,
            searchable: true,
            required: required,
            selfDisabledAffectChildren: false,
            size: 'lg',
            source: '${__cmptTreeSource}',
            mode: 'horizontal',
            autoFill: {
                __rendererLabel: '${label}',
                __rendererName: '${type}',
                __nodeId: '${id}',
                __nodeSchema: '${schema}',
                __isScopeContainer: '${isScopeContainer}'
            },
            onChange: function (value, oldVal, data, form) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
                    return [2 /*return*/];
                });
            }); }
        }
    ];
};
exports.renderCmptSelect = renderCmptSelect;
// 渲染组件特性动作配置项
var renderCmptActionSelect = function (componentLabel, required, onChange) {
    return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, exports.renderCmptSelect)(componentLabel || '选择组件', true, function (value, oldVal, data, form) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var contextSchema, dataSchema, variables;
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!form.data.__nodeId) return [3 /*break*/, 3];
                    if (!(form.data.actionType === 'setValue')) return [3 /*break*/, 3];
                    // todo:这里会闪一下，需要从amis查下问题
                    form.setValueByName('args.value', []);
                    form.setValueByName('args.__comboType', undefined);
                    form.setValueByName('args.__valueInput', undefined);
                    form.setValueByName('args.__containerType', undefined);
                    if (!exports.SELECT_PROPS_CONTAINER.includes(form.data.__rendererName)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ((_b = (_a = form.data).getContextSchemas) === null || _b === void 0 ? void 0 : _b.call(_a, form.data.__nodeId, true))];
                case 1:
                    contextSchema = _c.sent();
                    dataSchema = new amis_core_1.DataSchema(contextSchema || []);
                    variables = (dataSchema === null || dataSchema === void 0 ? void 0 : dataSchema.getDataPropsAsOptions()) || [];
                    form.setValueByName('__setValueDs', variables.filter(function (item) { return item.value !== '$$id'; }));
                    return [3 /*break*/, 3];
                case 2:
                    form.setValueByName('__setValueDs', []);
                    _c.label = 3;
                case 3:
                    form.setValueByName('groupType', '');
                    onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
                    return [2 /*return*/];
            }
        });
    }); })), false), [
        {
            asFormItem: true,
            label: '组件动作',
            name: 'groupType',
            mode: 'horizontal',
            required: true,
            visibleOn: 'data.actionType === "component"',
            component: comp_action_select_1.default,
            description: '${__cmptActionDesc}'
        }
    ], false);
};
exports.renderCmptActionSelect = renderCmptActionSelect;
// 动作配置项schema map
exports.COMMON_ACTION_SCHEMA_MAP = {
    setValue: {
        innerArgs: ['value'],
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                "\u8BBE\u7F6E",
                react_1.default.createElement("span", { className: "variable-left variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u7684\u6570\u636E"));
        },
        schema: (0, exports.getArgsWrapper)({
            type: 'wrapper',
            className: 'p-none',
            body: [
                {
                    type: 'combo',
                    name: 'value',
                    label: '变量赋值',
                    multiple: true,
                    removable: true,
                    required: true,
                    addable: true,
                    strictMode: false,
                    canAccessSuperData: true,
                    mode: 'horizontal',
                    items: [
                        {
                            name: 'key',
                            type: 'input-text',
                            placeholder: '变量名',
                            source: '${__setValueDs}',
                            labelField: 'label',
                            valueField: 'value',
                            required: true
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                            name: 'val',
                            variables: '${variables}',
                            placeholder: '变量值'
                        })
                    ],
                    visibleOn: 'data.__isScopeContainer'
                },
                {
                    type: 'combo',
                    name: 'value',
                    label: '变量赋值',
                    multiple: true,
                    removable: true,
                    required: true,
                    addable: true,
                    strictMode: false,
                    canAccessSuperData: true,
                    mode: 'horizontal',
                    items: [
                        {
                            type: 'combo',
                            name: 'item',
                            label: false,
                            renderLabel: false,
                            multiple: true,
                            removable: true,
                            required: true,
                            addable: true,
                            strictMode: false,
                            canAccessSuperData: true,
                            className: 'm-l',
                            mode: 'horizontal',
                            items: [
                                {
                                    name: 'key',
                                    type: 'input-text',
                                    required: true
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                    name: 'val',
                                    variables: '${variables}'
                                })
                            ]
                        }
                    ],
                    visibleOn: "data.__rendererName === 'combo' || data.__rendererName === 'input-table'"
                },
                (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                    name: '__valueInput',
                    label: '变量赋值',
                    variables: '${variables}',
                    size: 'lg',
                    mode: 'horizontal',
                    visibleOn: "!data.__isScopeContainer && data.__rendererName !== 'combo' && data.__rendererName !== 'input-table'",
                    required: true
                })
            ]
        })
    },
    reload: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                "\u5237\u65B0",
                react_1.default.createElement("span", { className: "variable-left variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u7EC4\u4EF6"));
        }
    },
    clear: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                "\u6E05\u7A7A",
                react_1.default.createElement("span", { className: "variable-left variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u7684\u6570\u636E"));
        }
    },
    reset: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                "\u91CD\u7F6E",
                react_1.default.createElement("span", { className: "variable-left variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u7684\u6570\u636E"));
        }
    },
    submit: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                "\u63D0\u4EA4",
                react_1.default.createElement("span", { className: "variable-left variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? '全部数据' : '数据'));
        }
    },
    validate: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                "\u6821\u9A8C",
                react_1.default.createElement("span", { className: "variable-left variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u7684\u6570\u636E"));
        }
    },
    prev: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                (info === null || info === void 0 ? void 0 : info.__rendererName) === 'carousel' ? '滚动至上一张' : null,
                (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? '返回前一步' : null));
        }
    },
    next: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                (info === null || info === void 0 ? void 0 : info.__rendererName) === 'carousel' ? '滚动至下一张' : null,
                (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? '提交当前步骤数据' : null));
        }
    },
    expand: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u5C55\u5F00"));
        }
    },
    collapse: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u6536\u8D77"));
        }
    },
    selectAll: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u9009\u4E2D\u6240\u6709\u9009\u9879"));
        }
    },
    focus: {
        descDetail: function (info) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.rendererLabel),
                "\u83B7\u53D6\u7126\u70B9"));
        }
    },
    refresh: {
        descDetail: function (info) { return react_1.default.createElement("div", null, "\u5237\u65B0\u9875\u9762"); }
    },
    alert: {
        descDetail: function (info) { return react_1.default.createElement("div", null, "\u6253\u5F00\u63D0\u793A\u5BF9\u8BDD\u6846"); }
    },
    confirm: {
        descDetail: function (info) { return react_1.default.createElement("div", null, "\u6253\u5F00\u786E\u8BA4\u5BF9\u8BDD\u6846"); }
    }
};
// 获取动作树中指定的动作
var findActionNode = function (actions, actionType) { return (0, amis_core_1.findTree)(actions, function (node) { return node.actionType === actionType; }); };
exports.findActionNode = findActionNode;
// 获取包含指定子动作的动作
var findSubActionNode = function (actions, actionType) {
    return (0, amis_core_1.findTree)(actions, function (node) {
        var _a;
        return (_a = node.actions) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.actionType === actionType; });
    });
};
exports.findSubActionNode = findSubActionNode;
// 获取真实的动作类型
var getActionType = function (action, hasSubActionNode) {
    return action.groupType === 'component'
        ? 'component'
        : hasSubActionNode
            ? hasSubActionNode.actionType
            : action.actionType;
};
exports.getActionType = getActionType;
// 获取事件Label文案
var getEventLabel = function (events, name) { var _a; return (_a = events.find(function (item) { return item.eventName === name; })) === null || _a === void 0 ? void 0 : _a.eventLabel; };
exports.getEventLabel = getEventLabel;
// 获取事件描述文案
var getEventDesc = function (events, name) { var _a; return (_a = events.find(function (item) { return item.eventName === name; })) === null || _a === void 0 ? void 0 : _a.description; };
exports.getEventDesc = getEventDesc;
var getEventStrongDesc = function (events, name) { var _a; return (_a = events.find(function (item) { return item.eventName === name; })) === null || _a === void 0 ? void 0 : _a.strongDesc; };
exports.getEventStrongDesc = getEventStrongDesc;
// 判断插件动作中是否存在指定动作
var hasActionType = function (actionType, actions) {
    if (!Array.isArray(actions)) {
        return false;
    }
    return !!(actions === null || actions === void 0 ? void 0 : actions.find(function (item) {
        return [item.actionType, 'component'].includes(actionType);
    }));
};
exports.hasActionType = hasActionType;
// 获取动作配置，主要是为了获取config和desc，schema强制捆绑在动作树节点（动作配置可能在插件动作中 > 树节点 or 子动作）
var getPropOfAcion = function (action, propName, actionTree, pluginActions, commonActions, allComponents) {
    var _a, _b, _c, _d, _e, _f, _g;
    var prop = null;
    if (action.componentId) {
        // 优先从组件特性动作中找
        var node = (0, amis_core_1.findTree)(allComponents !== null && allComponents !== void 0 ? allComponents : [], function (item) { return item.value === action.componentId; });
        prop =
            node &&
                ((_b = (_a = pluginActions[node.type]) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.actionType === action.actionType; })) === null || _b === void 0 ? void 0 : _b[propName]);
    }
    if (!prop) {
        prop = (_c = (0, exports.findActionNode)(actionTree, action.actionType)) === null || _c === void 0 ? void 0 : _c[propName];
    }
    if (!prop) {
        var commonActionConfig = tslib_1.__assign(tslib_1.__assign({}, exports.COMMON_ACTION_SCHEMA_MAP), commonActions);
        var hasSubActionNode = (0, exports.findSubActionNode)(actionTree, action.actionType);
        if (propName === 'actionLabel') {
            prop = hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actionLabel;
        }
        else {
            prop =
                (_f = (_e = (_d = hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actions) === null || _d === void 0 ? void 0 : _d.find(function (item) {
                    return item.actionType === action.actionType;
                })) === null || _e === void 0 ? void 0 : _e[propName]) !== null && _f !== void 0 ? _f : (_g = commonActionConfig[action.actionType]) === null || _g === void 0 ? void 0 : _g[propName];
        }
    }
    return prop;
};
exports.getPropOfAcion = getPropOfAcion;
var getOldActionSchema = function (manager, context) {
    var isInDialog = /(?:\/|^)dialog\/.+$/.test(context.path);
    return {
        type: 'tooltip-wrapper',
        className: 'old-action-tooltip-warpper',
        content: '温馨提示：添加下方事件动作后，下方事件动作将先于旧版动作执行，建议统一迁移至事件动作机制，帮助您实现更灵活的交互设计',
        inline: true,
        tooltipTheme: 'dark',
        placement: 'bottom',
        body: [
            {
                type: 'button',
                label: '配置动作(旧版)',
                className: 'block old-action-btn',
                actionType: 'dialog',
                dialog: {
                    type: 'dialog',
                    title: '动作',
                    body: {
                        type: 'form',
                        body: [
                            {
                                label: '按钮行为',
                                type: 'select',
                                name: 'actionType',
                                pipeIn: (0, amis_editor_core_1.defaultValue)(''),
                                options: [
                                    {
                                        label: '默认',
                                        value: ''
                                    },
                                    {
                                        label: '弹框',
                                        value: 'dialog'
                                    },
                                    {
                                        label: '抽出式弹框（Drawer）',
                                        value: 'drawer'
                                    },
                                    {
                                        label: '发送请求',
                                        value: 'ajax'
                                    },
                                    {
                                        label: '下载文件',
                                        value: 'download'
                                    },
                                    {
                                        label: '页面跳转(单页模式)',
                                        value: 'link'
                                    },
                                    {
                                        label: '页面跳转',
                                        value: 'url'
                                    },
                                    {
                                        label: '刷新目标',
                                        value: 'reload'
                                    },
                                    {
                                        label: '复制内容',
                                        value: 'copy'
                                    },
                                    {
                                        label: '提交',
                                        value: 'submit'
                                    },
                                    {
                                        label: '重置',
                                        value: 'reset'
                                    },
                                    {
                                        label: '重置并提交',
                                        value: 'reset-and-submit'
                                    },
                                    {
                                        label: '确认',
                                        value: 'confirm'
                                    },
                                    {
                                        label: '取消',
                                        value: 'cancel'
                                    },
                                    {
                                        label: '跳转下一条',
                                        value: 'next'
                                    },
                                    {
                                        label: '跳转上一条',
                                        value: 'prev'
                                    }
                                ]
                            },
                            {
                                type: 'input-text',
                                name: 'content',
                                visibleOn: 'data.actionType == "copy"',
                                label: '复制内容模板'
                            },
                            {
                                type: 'select',
                                name: 'copyFormat',
                                options: [
                                    {
                                        label: '纯文本',
                                        value: 'text/plain'
                                    },
                                    {
                                        label: '富文本',
                                        value: 'text/html'
                                    }
                                ],
                                visibleOn: 'data.actionType == "copy"',
                                label: '复制格式'
                            },
                            {
                                type: 'input-text',
                                name: 'target',
                                visibleOn: 'data.actionType == "reload"',
                                label: '指定刷新目标',
                                required: true
                            },
                            {
                                name: 'dialog',
                                pipeIn: (0, amis_editor_core_1.defaultValue)({
                                    title: '弹框标题',
                                    body: '对，你刚刚点击了',
                                    showCloseButton: true,
                                    showErrorMsg: true,
                                    showLoading: true
                                }),
                                asFormItem: true,
                                children: function (_a) {
                                    var value = _a.value, onChange = _a.onChange, data = _a.data;
                                    return data.actionType === 'dialog' ? (react_1.default.createElement(amis_1.Button, { size: "sm", level: "danger", className: "m-b", onClick: function () {
                                            return manager.openSubEditor({
                                                title: '配置弹框内容',
                                                value: tslib_1.__assign({ type: 'dialog' }, value),
                                                onChange: function (value) { return onChange(value); }
                                            });
                                        }, block: true }, "\u914D\u7F6E\u5F39\u6846\u5185\u5BB9")) : null;
                                }
                            },
                            {
                                visibleOn: 'data.actionType == "drawer"',
                                name: 'drawer',
                                pipeIn: (0, amis_editor_core_1.defaultValue)({
                                    title: '抽屉标题',
                                    body: '对，你刚刚点击了'
                                }),
                                asFormItem: true,
                                children: function (_a) {
                                    var value = _a.value, onChange = _a.onChange, data = _a.data;
                                    return data.actionType == 'drawer' ? (react_1.default.createElement(amis_1.Button, { size: "sm", level: "danger", className: "m-b", onClick: function () {
                                            return manager.openSubEditor({
                                                title: '配置抽出式弹框内容',
                                                value: tslib_1.__assign({ type: 'drawer' }, value),
                                                onChange: function (value) { return onChange(value); }
                                            });
                                        }, block: true }, "\u914D\u7F6E\u62BD\u51FA\u5F0F\u5F39\u6846\u5185\u5BB9")) : null;
                                }
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('api', {
                                label: '目标API',
                                visibleOn: 'data.actionType == "ajax"'
                            }),
                            {
                                name: 'feedback',
                                pipeIn: (0, amis_editor_core_1.defaultValue)({
                                    title: '弹框标题',
                                    body: '内容'
                                }),
                                asFormItem: true,
                                children: function (_a) {
                                    var onChange = _a.onChange, value = _a.value, data = _a.data;
                                    return data.actionType == 'ajax' ? (react_1.default.createElement("div", { className: "m-b" },
                                        react_1.default.createElement(amis_1.Button, { size: "sm", level: value ? 'danger' : 'info', onClick: function () {
                                                return manager.openSubEditor({
                                                    title: '配置反馈弹框详情',
                                                    value: tslib_1.__assign({ type: 'dialog' }, value),
                                                    onChange: function (value) { return onChange(value); }
                                                });
                                            } }, "\u914D\u7F6E\u53CD\u9988\u5F39\u6846\u5185\u5BB9"),
                                        value ? (react_1.default.createElement(amis_1.Button, { size: "sm", level: "link", className: "m-l", onClick: function () { return onChange(''); } }, "\u6E05\u7A7A\u8BBE\u7F6E")) : null)) : null;
                                }
                            },
                            {
                                name: 'feedback.visibleOn',
                                label: '是否弹出表达式',
                                type: 'input-text',
                                visibleOn: 'this.feedback',
                                autoComplete: false,
                                description: '请使用 JS 表达式如：`this.xxx == 1`'
                            },
                            {
                                name: 'feedback.skipRestOnCancel',
                                label: '弹框取消是否中断后续操作',
                                type: 'switch',
                                mode: 'inline',
                                className: 'block',
                                visibleOn: 'this.feedback'
                            },
                            {
                                name: 'feedback.skipRestOnConfirm',
                                label: '弹框确认是否中断后续操作',
                                type: 'switch',
                                mode: 'inline',
                                className: 'block',
                                visibleOn: 'this.feedback'
                            },
                            {
                                type: 'input-text',
                                label: '目标地址',
                                name: 'link',
                                visibleOn: 'data.actionType == "link"'
                            },
                            {
                                type: 'input-text',
                                label: '目标地址',
                                name: 'url',
                                visibleOn: 'data.actionType == "url"',
                                placeholder: 'http://'
                            },
                            {
                                type: 'switch',
                                name: 'blank',
                                visibleOn: 'data.actionType == "url"',
                                mode: 'inline',
                                className: 'w-full',
                                label: '是否用新窗口打开',
                                pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                            },
                            isInDialog
                                ? {
                                    visibleOn: 'data.actionType == "submit" || data.type == "submit"',
                                    name: 'close',
                                    type: 'switch',
                                    mode: 'inline',
                                    className: 'w-full',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                                    label: '是否关闭当前弹框'
                                }
                                : {},
                            {
                                name: 'confirmText',
                                type: 'textarea',
                                label: '确认文案',
                                description: '点击后会弹出此内容，等用户确认后才进行相应的操作。'
                            },
                            {
                                type: 'input-text',
                                name: 'reload',
                                label: '刷新目标组件',
                                visibleOn: 'data.actionType != "link" && data.actionType != "url"',
                                description: '当前动作完成后，指定目标组件刷新。支持传递数据如：<code>xxx?a=\\${a}&b=\\${b}</code>，多个目标请用英文逗号隔开。'
                            },
                            {
                                type: 'input-text',
                                name: 'target',
                                visibleOn: 'data.actionType != "reload"',
                                label: '指定响应组件',
                                description: '指定动作执行者，默认为当前组件所在的功能性性组件，如果指定则转交给目标组件来处理。'
                            },
                            {
                                type: 'js-editor',
                                allowFullscreen: true,
                                name: 'onClick',
                                label: '自定义点击事件',
                                description: '将会传递 event 和 props 两个参数'
                            },
                            {
                                type: 'input-text',
                                name: 'hotKey',
                                label: '键盘快捷键'
                            }
                        ]
                    },
                    onConfirm: function (values) {
                        manager.panelChangeValue(values[0]);
                    }
                }
            }
        ]
    };
};
exports.getOldActionSchema = getOldActionSchema;
/**
 * 对象转Combo组件对象数组
 * @param obj
 * @returns
 */
var objectToComboArray = function (obj) {
    return Object.entries(obj).map(function (_a) {
        var _b = tslib_1.__read(_a, 2), key = _b[0], val = _b[1];
        return ({
            key: key,
            val: val
        });
    });
};
/**
 * Combo组件对象数组转对象
 * @param arr
 * @returns
 */
var comboArrayToObject = function (arr) {
    var obj = {};
    arr === null || arr === void 0 ? void 0 : arr.forEach(function (item) {
        obj[item.key] = item.val;
    });
    return obj;
};
/**
 * 获取事件动作面板所需属性配置
 */
var getEventControlConfig = function (manager, context) {
    var _a, _b, _c, _d, _e;
    var isSubEditor = manager.store.isSubEditor;
    // 通用动作配置
    var commonActions = (_b = (_a = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _a === void 0 ? void 0 : _a.customActionGetter) === null || _b === void 0 ? void 0 : _b.call(_a, manager);
    // 动作树
    var actionTree = ((_c = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _c === void 0 ? void 0 : _c.actionTreeGetter)
        ? (_d = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _d === void 0 ? void 0 : _d.actionTreeGetter((0, exports.ACTION_TYPE_TREE)(manager))
        : (0, exports.ACTION_TYPE_TREE)(manager);
    var allComponents = (_e = manager === null || manager === void 0 ? void 0 : manager.store) === null || _e === void 0 ? void 0 : _e.getComponentTreeSource();
    var checkComponent = function (node, action) {
        var _a;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var actions = manager === null || manager === void 0 ? void 0 : manager.pluginActions[node.type];
        var haveChild = !!((_a = node.children) === null || _a === void 0 ? void 0 : _a.length);
        var isSupport = false;
        if (typeof action.supportComponents === 'string') {
            isSupport =
                action.supportComponents === '*' ||
                    action.supportComponents === node.type;
            // 内置逻辑
            if (action.supportComponents === 'byComponent' && actionType) {
                isSupport = (0, exports.hasActionType)(actionType, actions);
                node.scoped = isSupport;
            }
        }
        else if (Array.isArray(action.supportComponents)) {
            isSupport = action.supportComponents.includes(node.type);
        }
        node.isScopeContainer = !!manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
        if (actionType === 'component' && !(actions === null || actions === void 0 ? void 0 : actions.length)) {
            node.disabled = true;
        }
        if (isSupport) {
            return true;
        }
        else if (haveChild) {
            return true;
        }
        return false;
    };
    return {
        showOldEntry: !!context.schema.actionType ||
            ['submit', 'reset'].includes(context.schema.type),
        actions: manager === null || manager === void 0 ? void 0 : manager.pluginActions,
        events: manager === null || manager === void 0 ? void 0 : manager.pluginEvents,
        actionTree: actionTree,
        commonActions: commonActions,
        owner: '',
        addBroadcast: manager === null || manager === void 0 ? void 0 : manager.addBroadcast,
        removeBroadcast: manager === null || manager === void 0 ? void 0 : manager.removeBroadcast,
        allComponents: allComponents,
        getContextSchemas: function (id, withoutSuper) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var dataSchema;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manager.getContextSchemas(id !== null && id !== void 0 ? id : context.id, withoutSuper)];
                    case 1:
                        dataSchema = _a.sent();
                        // 存在指定id时，只需要当前层上下文
                        if (id) {
                            return [2 /*return*/, dataSchema];
                        }
                        return [2 /*return*/, manager.dataSchema];
                }
            });
        }); },
        getComponents: function (action) {
            var _a;
            if (!action) {
                return [];
            }
            var components = (_a = manager === null || manager === void 0 ? void 0 : manager.store) === null || _a === void 0 ? void 0 : _a.getComponentTreeSource();
            var finalCmpts = [];
            if (isSubEditor) {
                var editorData = manager.store.getSuperEditorData;
                while (components) {
                    if (editorData === null || editorData === void 0 ? void 0 : editorData.__curCmptTreeWrap) {
                        components = [
                            tslib_1.__assign(tslib_1.__assign({}, editorData.__curCmptTreeWrap), { children: components })
                        ];
                    }
                    finalCmpts = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(finalCmpts), false), tslib_1.__read(components), false);
                    components = editorData === null || editorData === void 0 ? void 0 : editorData.__superCmptTreeSource;
                    editorData = editorData === null || editorData === void 0 ? void 0 : editorData.__super;
                }
            }
            else {
                finalCmpts = components;
            }
            var result = (0, amis_core_1.filterTree)(finalCmpts, function (node) { return checkComponent(node, action); }, 1, true);
            return result;
        },
        actionConfigInitFormatter: function (action) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var config, innerArgs, comboArray, tmpArgs_1, hasSubActionNode;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            return tslib_1.__generator(this, function (_w) {
                config = tslib_1.__assign({}, action);
                config.args = tslib_1.__assign({}, action.args);
                if (['link', 'url'].includes(action.actionType) && ((_a = action.args) === null || _a === void 0 ? void 0 : _a.params)) {
                    config.args = tslib_1.__assign(tslib_1.__assign({}, config.args), { params: objectToComboArray((_b = action.args) === null || _b === void 0 ? void 0 : _b.params) });
                }
                if (['setValue'].includes(action.actionType) && ((_c = action.args) === null || _c === void 0 ? void 0 : _c.value)) {
                    !config.args && (config.args = {});
                    if (Array.isArray((_d = action.args) === null || _d === void 0 ? void 0 : _d.value)) {
                        config.args.value = (_e = action.args) === null || _e === void 0 ? void 0 : _e.value.reduce(function (arr, valueItem, index) {
                            if (!arr[index]) {
                                arr[index] = {};
                            }
                            arr[index].item = objectToComboArray(valueItem);
                            return arr;
                        }, []);
                        // 目前只有给combo赋值会是数组，所以认为是全量的赋值方式
                        config.args['__comboType'] = 'all';
                    }
                    else if (typeof ((_f = action.args) === null || _f === void 0 ? void 0 : _f.value) === 'object') {
                        config.args.value = objectToComboArray((_g = action.args) === null || _g === void 0 ? void 0 : _g.value);
                        config.args['__containerType'] = 'appoint';
                        // 如果有index，认为是给指定序号的combo赋值，所以认为是指定序号的赋值方式
                        if (action.args.index !== undefined) {
                            config.args['__comboType'] = 'appoint';
                        }
                    }
                    else if (action.actionType === 'setValue' &&
                        typeof ((_h = action.args) === null || _h === void 0 ? void 0 : _h.path) === 'string' &&
                        typeof ((_j = action.args) === null || _j === void 0 ? void 0 : _j.value) === 'string') {
                        /** 应用变量赋值 */
                        config.args['__containerType'] = 'all';
                    }
                    else if (action.actionType === 'setValue' &&
                        typeof ((_k = action.args) === null || _k === void 0 ? void 0 : _k.value) === 'string') {
                        config.args['__containerType'] = 'all';
                        config.args['__valueInput'] = config.args['value'];
                        (_l = config.args) === null || _l === void 0 ? true : delete _l.value;
                    }
                }
                if (['show', 'hidden', 'enabled', 'disabled'].includes(action.actionType)) {
                    // 兼容老逻辑，初始化actionType
                    config.__statusType = action.actionType;
                    config.__actionType = 'static';
                }
                if (['usability', 'visibility'].includes(action.actionType)) {
                    // 初始化条件参数
                    config.__actionExpression = (_m = action.args) === null || _m === void 0 ? void 0 : _m.value;
                }
                if (['ajax', 'download'].includes(action.actionType)) {
                    config.api = (_o = action.api) !== null && _o !== void 0 ? _o : (_p = action === null || action === void 0 ? void 0 : action.args) === null || _p === void 0 ? void 0 : _p.api;
                    config.options = (_q = action.options) !== null && _q !== void 0 ? _q : (_r = action === null || action === void 0 ? void 0 : action.args) === null || _r === void 0 ? void 0 : _r.options;
                    if (typeof (action === null || action === void 0 ? void 0 : action.api) === 'string') {
                        config.api = (0, amis_core_1.normalizeApi)(action === null || action === void 0 ? void 0 : action.api);
                    }
                    delete config.args;
                }
                innerArgs = (0, exports.getPropOfAcion)(action, 'innerArgs', actionTree, manager.pluginActions, commonActions);
                // 处理刷新组件动作的追加参数
                if (config.actionType === 'reload') {
                    config.__resetPage = (_s = config.args) === null || _s === void 0 ? void 0 : _s.resetPage;
                    config.__addParam = !!config.data;
                    if ((config.data && typeof config.data === 'object') ||
                        (config.args &&
                            !Object.keys(config.args).length &&
                            config.data === undefined)) {
                        config.__addParam = true;
                        config.__containerType = 'appoint';
                        config.dataMergeMode = 'override';
                    }
                    if (config.__addParam && config.data) {
                        if (typeof config.data === 'string') {
                            config.__containerType = 'all';
                            config.__valueInput = config.data;
                        }
                        else {
                            config.__containerType = 'appoint';
                            config.__reloadParams = objectToComboArray(config.data);
                        }
                    }
                    else if (config.args &&
                        !Object.keys(config.args).length &&
                        config.data === undefined) {
                        config.__reloadParams = objectToComboArray(config.args);
                    }
                }
                delete config.data;
                // 处理下 addItem 的初始化
                if (action.actionType === 'addItem') {
                    if (Array.isArray((_t = action.args) === null || _t === void 0 ? void 0 : _t.item)) {
                        comboArray = (((_u = action.args) === null || _u === void 0 ? void 0 : _u.item) || []).map(function (raw) {
                            return objectToComboArray(raw);
                        });
                        config.args = tslib_1.__assign(tslib_1.__assign({}, config.args), { value: comboArray.map(function (combo) { return ({ item: combo }); }) });
                    }
                    else {
                        config.args = tslib_1.__assign(tslib_1.__assign({}, config.args), { item: objectToComboArray((_v = action.args) === null || _v === void 0 ? void 0 : _v.item) });
                    }
                }
                // 还原args为可视化配置结构(args + addOnArgs)
                if (config.args) {
                    if (innerArgs) {
                        tmpArgs_1 = {};
                        config.addOnArgs = [];
                        Object.keys(config.args).forEach(function (key) {
                            var _a;
                            var _b, _c;
                            // 筛选出附加配置参数
                            if (!innerArgs.includes(key)) {
                                config.addOnArgs = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(config.addOnArgs), false), [
                                    {
                                        key: key,
                                        val: (_b = config.args) === null || _b === void 0 ? void 0 : _b[key]
                                    }
                                ], false);
                            }
                            else {
                                tmpArgs_1 = tslib_1.__assign(tslib_1.__assign({}, tmpArgs_1), (_a = {}, _a[key] = (_c = config.args) === null || _c === void 0 ? void 0 : _c[key], _a));
                            }
                        });
                        config.args = tmpArgs_1;
                    }
                }
                hasSubActionNode = (0, exports.findSubActionNode)(actionTree, action.actionType);
                return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, config), { actionType: (0, exports.getActionType)(action, hasSubActionNode), args: config.args })];
            });
        }); },
        actionConfigSubmitFormatter: function (config, type, actionData) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
            var action = tslib_1.__assign(tslib_1.__assign({}, config), { groupType: undefined });
            action.__title = (_a = (0, exports.findActionNode)(actionTree, config.actionType)) === null || _a === void 0 ? void 0 : _a.actionLabel;
            // 修正动作名称
            if (config.actionType === 'component') {
                action.actionType = config.groupType;
                // 标记一下组件特性动作
                action.groupType = config.actionType;
            }
            var hasSubActionNode = (0, exports.findSubActionNode)(actionTree, config.groupType);
            if (hasSubActionNode) {
                // 修正动作
                action.actionType = config.groupType;
            }
            // 合并附加的动作参数
            if (config.addOnArgs) {
                config.addOnArgs.forEach(function (args) {
                    var _a;
                    var _b;
                    action.args = (_b = action.args) !== null && _b !== void 0 ? _b : {};
                    action.args = tslib_1.__assign(tslib_1.__assign({}, action.args), (_a = {}, _a[args.key] = args.val, _a));
                });
                delete action.addOnArgs;
            }
            if (config.actionType === 'openDialog') {
                // 初始化弹窗schema
                var dialogInitSchema_1 = {
                    type: 'dialog',
                    title: action.__dialogTitle,
                    body: [
                        {
                            type: 'tpl',
                            tpl: '对，你刚刚点击了',
                            wrapperComponent: '',
                            inline: false
                        }
                    ],
                    showCloseButton: true,
                    showErrorMsg: true,
                    showLoading: true,
                    className: 'app-popover',
                    actions: [
                        {
                            type: 'button',
                            actionType: 'cancel',
                            label: '取消'
                        },
                        {
                            type: 'button',
                            actionType: 'confirm',
                            label: '确认',
                            primary: true
                        }
                    ]
                };
                var drawerInitSchema_1 = {
                    type: 'drawer',
                    title: action.__dialogTitle,
                    body: [
                        {
                            type: 'tpl',
                            tpl: '对，你刚刚点击了',
                            wrapperComponent: '',
                            inline: false
                        }
                    ],
                    className: 'app-popover',
                    actions: [
                        {
                            type: 'button',
                            actionType: 'cancel',
                            label: '取消'
                        },
                        {
                            type: 'button',
                            actionType: 'confirm',
                            label: '确认',
                            primary: true
                        }
                    ]
                };
                var confirmDialogInitSchema_1 = {
                    type: 'dialog',
                    title: action.__dialogTitle,
                    body: [
                        {
                            type: 'tpl',
                            tpl: '对，你刚刚点击了',
                            wrapperComponent: '',
                            inline: false
                        }
                    ],
                    dialogType: 'confirm',
                    confirmText: '确认',
                    cancelText: '取消',
                    confirmBtnLevel: 'primary'
                };
                var setInitSchema = function (groupType, action) {
                    if (groupType === 'dialog') {
                        (0, amis_editor_core_1.JsonGenerateID)(dialogInitSchema_1);
                        action.dialog = dialogInitSchema_1;
                    }
                    else if (groupType === 'drawer') {
                        (0, amis_editor_core_1.JsonGenerateID)(drawerInitSchema_1);
                        action.drawer = drawerInitSchema_1;
                    }
                    else if (groupType === 'confirmDialog') {
                        (0, amis_editor_core_1.JsonGenerateID)(confirmDialogInitSchema_1);
                        action.dialog = confirmDialogInitSchema_1;
                    }
                };
                var chooseCurrentDialog = function (action) {
                    var selectDialog = action.__selectDialog;
                    // 选择现有弹窗后为了使之前的弹窗和现有弹窗$$id唯一，这里重新生成一下
                    var dialogCopy = (0, amis_editor_core_1.JSONPipeIn)((0, amis_editor_core_1.JSONPipeOut)(tslib_1.__assign({}, selectDialog)));
                    // 在这里记录一下新dialogId
                    action.__relatedDialogId = dialogCopy.$$id;
                    if (selectDialog === null || selectDialog === void 0 ? void 0 : selectDialog.dialogType) {
                        action.actionType = 'dialog';
                        action.dialog = dialogCopy;
                    }
                    else {
                        action.actionType = selectDialog.type;
                        action[selectDialog.type] = dialogCopy;
                    }
                };
                if (type === 'add') {
                    if (config.__dialogSource === 'new') {
                        setInitSchema(config.groupType, action);
                    }
                    else if (config.__dialogSource === 'current') {
                        chooseCurrentDialog(action);
                    }
                }
                // 编辑
                else if (type === 'update') {
                    if (config.__dialogSource === 'new') {
                        // 如果切换了弹窗类型或切换了弹窗来源，则初始化schema
                        if (config.groupType !== (actionData === null || actionData === void 0 ? void 0 : actionData.groupType) ||
                            (config.__dialogSource === 'new' &&
                                (actionData === null || actionData === void 0 ? void 0 : actionData.__dialogSource) === 'current')) {
                            setInitSchema(config.groupType, action);
                        }
                        else {
                            action[config.groupType] = tslib_1.__assign(tslib_1.__assign({}, actionData[config.groupType]), { title: config.__dialogTitle });
                        }
                    }
                    else if (config.__dialogSource === 'current') {
                        chooseCurrentDialog(action);
                    }
                }
            }
            // 刷新组件时，处理是否追加事件变量
            if (config.actionType === 'reload') {
                action.data = undefined;
                action.dataMergeMode = undefined;
                action.args =
                    action.__rendererName === 'crud'
                        ? tslib_1.__assign(tslib_1.__assign({}, action.args), { resetPage: (_b = config.__resetPage) !== null && _b !== void 0 ? _b : true }) : undefined;
                action.data = undefined;
                if (config.__addParam) {
                    action.dataMergeMode = config.dataMergeMode || 'merge';
                    action.data =
                        config.__containerType === 'all'
                            ? config.__valueInput
                            : comboArrayToObject(config.__reloadParams || []);
                }
            }
            // 转换下格式
            if (['link', 'url'].includes(action.actionType)) {
                var params = (_c = config.args) === null || _c === void 0 ? void 0 : _c.params;
                if (params && params.length) {
                    action.args = tslib_1.__assign(tslib_1.__assign({}, action.args), { params: comboArrayToObject(params) });
                }
            }
            if (action.actionType === 'toast') {
                // 配置一个toast组件默认class
                action.args = tslib_1.__assign(tslib_1.__assign({}, action.args), { className: 'theme-toast-action-scope' });
            }
            // 转换下格式
            if (action.actionType === 'setValue') {
                if ((_d = config.args) === null || _d === void 0 ? void 0 : _d.hasOwnProperty('path')) {
                    /** 应用变量赋值 */
                    action.args = {
                        path: config.args.path,
                        value: (_f = (_e = config.args) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '',
                        fromPage: (_g = action.args) === null || _g === void 0 ? void 0 : _g.fromPage,
                        fromApp: (_h = action.args) === null || _h === void 0 ? void 0 : _h.fromApp
                    };
                    action.hasOwnProperty('componentId') && delete action.componentId;
                    return action;
                }
                else {
                    ((_j = action === null || action === void 0 ? void 0 : action.args) === null || _j === void 0 ? void 0 : _j.hasOwnProperty('path')) && delete action.args.path;
                    if (((_k = config.args) === null || _k === void 0 ? void 0 : _k.__valueInput) !== undefined) {
                        action.args = {
                            value: (_l = config.args) === null || _l === void 0 ? void 0 : _l.__valueInput
                        };
                    }
                    else if (Array.isArray((_m = config.args) === null || _m === void 0 ? void 0 : _m.value)) {
                        action.args = (_o = action.args) !== null && _o !== void 0 ? _o : {};
                        if ((action.__rendererName === 'combo' ||
                            action.__rendererName === 'input-table') &&
                            ((_p = action.args) === null || _p === void 0 ? void 0 : _p.index) === undefined) {
                            // combo、input-table特殊处理
                            var tempArr_1 = [];
                            (_q = config.args) === null || _q === void 0 ? void 0 : _q.value.forEach(function (valueItem, index) {
                                valueItem.item.forEach(function (item) {
                                    if (!tempArr_1[index]) {
                                        tempArr_1[index] = {};
                                    }
                                    tempArr_1[index][item.key] = item.val;
                                });
                            });
                            action.args = tslib_1.__assign(tslib_1.__assign({}, action.args), { value: tempArr_1 });
                        }
                        else {
                            action.args = tslib_1.__assign(tslib_1.__assign({}, action.args), { value: comboArrayToObject((_r = config.args) === null || _r === void 0 ? void 0 : _r.value) });
                        }
                    }
                }
            }
            if (action.actionType === 'addItem' &&
                action.__rendererName === 'combo') {
                action.args = tslib_1.__assign(tslib_1.__assign({}, action.args), { item: comboArrayToObject((_s = config.args) === null || _s === void 0 ? void 0 : _s.item) });
            }
            if (action.actionType === 'addItem' &&
                action.__rendererName === 'input-table') {
                var comboArray = (((_t = config.args) === null || _t === void 0 ? void 0 : _t.value) || []).map(function (combo) { return combo.item || {}; });
                action.args = tslib_1.__assign(tslib_1.__assign({}, action.args), { item: comboArray.map(function (raw) { return comboArrayToObject(raw); }) });
                (_u = action.args) === null || _u === void 0 ? true : delete _u.value;
            }
            // 转换下格式
            if (['visibility', 'usability'].includes(config.actionType)) {
                action.args =
                    action.actionType !== 'static'
                        ? {
                            value: action.__actionExpression
                        }
                        : undefined;
                action.actionType === 'static' &&
                    (action.actionType = config.__statusType);
                delete action.__actionExpression;
                delete action.__statusType;
            }
            delete action.config;
            return action;
        }
    };
};
exports.getEventControlConfig = getEventControlConfig;
