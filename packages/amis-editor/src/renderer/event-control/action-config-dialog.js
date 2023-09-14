"use strict";
/**
 * 动作配置面板
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var react_1 = tslib_1.__importDefault(require("react"));
var action_config_panel_1 = tslib_1.__importDefault(require("./action-config-panel"));
var comp_action_select_1 = require("./comp-action-select");
var helper_1 = require("./helper");
var ActionDialog = /** @class */ (function (_super) {
    tslib_1.__extends(ActionDialog, _super);
    function ActionDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取组件树搜索列表
     * @param tree
     * @param keywords
     * @returns
     */
    ActionDialog.prototype.getTreeSearchList = function (tree, keywords) {
        if (!keywords) {
            return tree;
        }
        var result = [];
        var getSearchList = function (result, array, keywords) {
            array.forEach(function (node) {
                if (node.children) {
                    getSearchList(result, node.children, keywords);
                }
                else if (node.actionLabel.includes(keywords)) {
                    result.push(tslib_1.__assign({}, node));
                }
            });
        };
        getSearchList(result, tree, keywords);
        return result;
    };
    /**
     * 获取组件树配置schema
     * @param isSearch 是否是搜索
     * @param actionTree 原数据源
     * @param getComponents
     * @returns
     */
    ActionDialog.prototype.getInputTreeSchema = function (isSearch, actionTree, getComponents) {
        var inputTreeSchema = {
            type: 'input-tree',
            name: 'actionType',
            visibleOn: isSearch ? '__keywords' : '!__keywords',
            disabled: false,
            onlyLeaf: true,
            showIcon: false,
            className: 'action-tree',
            mode: 'normal',
            labelField: 'actionLabel',
            valueField: 'actionType',
            inputClassName: 'no-border action-tree-control',
            placeholder: '未匹配到数据',
            onChange: function (value, oldVal, data, form) {
                var _a;
                // 因为不知道动作都有哪些字段，这里只保留基础配置
                var removeKeys = {};
                var groupType = '';
                Object.keys(form.data).forEach(function (key) {
                    if (!comp_action_select_1.BASE_ACTION_PROPS.includes(key)) {
                        removeKeys[key] = undefined;
                    }
                });
                if (value === 'openDialog' &&
                    !['dialog', 'drawer'].includes(groupType)) {
                    groupType = 'dialog';
                }
                if (value === 'closeDialog' &&
                    !['closeDialog', 'closeDrawer'].includes(groupType)) {
                    groupType = 'closeDialog';
                }
                if (value === 'visibility' &&
                    !['show', 'hidden', 'visibility'].includes(groupType)) {
                    groupType = 'show';
                }
                if (value === 'usability' &&
                    !['enabled', 'disabled', 'usability'].includes(groupType)) {
                    groupType = 'enabled';
                }
                var actionNode = (0, helper_1.findActionNode)(actionTree, value);
                form.setValues(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, removeKeys), { __keywords: form.data.__keywords, __resultActionTree: form.data.__resultActionTree, componentId: form.data.componentId ? '' : undefined }), (form.data.args ? { args: {} } : {})), { // 切换动作时清空args
                    groupType: groupType, __actionDesc: actionNode === null || actionNode === void 0 ? void 0 : actionNode.description, __actionSchema: actionNode === null || actionNode === void 0 ? void 0 : actionNode.schema, __subActions: actionNode === null || actionNode === void 0 ? void 0 : actionNode.actions, __cmptTreeSource: (actionNode === null || actionNode === void 0 ? void 0 : actionNode.supportComponents)
                        ? (_a = getComponents === null || getComponents === void 0 ? void 0 : getComponents(actionNode)) !== null && _a !== void 0 ? _a : []
                        : [], ignoreError: false }));
            }
        };
        if (isSearch) {
            return tslib_1.__assign(tslib_1.__assign({}, inputTreeSchema), { source: '${__resultActionTree}', highlightTxt: '${__keywords}' });
        }
        else {
            return tslib_1.__assign(tslib_1.__assign({}, inputTreeSchema), { options: actionTree });
        }
    };
    ActionDialog.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, data = _b.data, show = _b.show, type = _b.type, actionTree = _b.actionTree, pluginActions = _b.pluginActions, getComponents = _b.getComponents, commonActions = _b.commonActions, onClose = _b.onClose, render = _b.render;
        return render('inner', {
            type: 'dialog',
            title: '动作配置',
            headerClassName: 'font-bold',
            className: 'action-config-dialog',
            bodyClassName: 'action-config-dialog-body',
            closeOnEsc: true,
            closeOnOutside: false,
            show: show,
            showCloseButton: true,
            size: 'md',
            body: [
                {
                    type: 'form',
                    title: '',
                    mode: 'normal',
                    wrapperComponent: 'div',
                    submitText: '保存',
                    autoFocus: true,
                    data: {
                        __keywords: '',
                        __resultActionTree: []
                    },
                    preventEnterSubmit: true,
                    // debug: true,
                    onSubmit: (_a = this.props.onSubmit) === null || _a === void 0 ? void 0 : _a.bind(this, type),
                    body: [
                        {
                            type: 'grid',
                            className: 'h-full',
                            columns: [
                                {
                                    body: [
                                        {
                                            type: 'tpl',
                                            tpl: '执行动作',
                                            className: 'action-panel-title',
                                            inline: false
                                        },
                                        {
                                            type: 'input-text',
                                            name: '__keywords',
                                            className: 'action-tree-search',
                                            inputClassName: 'action-tree-search-input',
                                            placeholder: '请搜索执行动作',
                                            clearable: true,
                                            onChange: function (value, oldVal, data, form) {
                                                if (value) {
                                                    var list = _this.getTreeSearchList(actionTree, value);
                                                    form.setValueByName('__resultActionTree', list);
                                                }
                                                else {
                                                    form.setValueByName('__resultActionTree', actionTree);
                                                }
                                            }
                                        },
                                        // actionTree中包含function及class类型的属性，直接传入form的data中解析会报错
                                        // 故采用两棵树分别使用静态及动态选项组
                                        this.getInputTreeSchema(false, actionTree, getComponents),
                                        this.getInputTreeSchema(true, actionTree, getComponents)
                                    ],
                                    md: 3,
                                    columnClassName: 'left-panel'
                                },
                                {
                                    body: [
                                        {
                                            type: 'tpl',
                                            tpl: '动作说明',
                                            className: 'action-panel-title',
                                            visibleOn: 'data.actionType',
                                            inline: false
                                        },
                                        {
                                            type: 'tpl',
                                            className: 'action-desc',
                                            tpl: '${__actionDesc}',
                                            visibleOn: 'data.actionType'
                                        },
                                        {
                                            type: 'tpl',
                                            tpl: '基础设置',
                                            className: 'action-panel-title',
                                            visibleOn: 'data.actionType',
                                            inline: false
                                        },
                                        {
                                            type: 'container',
                                            className: 'right-panel-container',
                                            body: [
                                                {
                                                    asFormItem: true,
                                                    component: action_config_panel_1.default,
                                                    pluginActions: pluginActions,
                                                    commonActions: commonActions
                                                },
                                                {
                                                    type: 'tpl',
                                                    tpl: '高级设置',
                                                    inline: false,
                                                    className: 'action-panel-title',
                                                    visibleOn: 'data.actionType'
                                                },
                                                {
                                                    type: 'button-group-select',
                                                    name: 'ignoreError',
                                                    visibleOn: 'data.actionType',
                                                    label: (0, amis_editor_core_1.tipedLabel)('错误忽略', '动作发生错误时，是否忽略错误继续执行'),
                                                    mode: 'horizontal',
                                                    pipeIn: function (value, data) {
                                                        return value === true
                                                            ? '1'
                                                            : value === false
                                                                ? '2'
                                                                : '3';
                                                    },
                                                    pipeOut: function (value) {
                                                        return value === '1'
                                                            ? true
                                                            : value === '2'
                                                                ? false
                                                                : undefined;
                                                    },
                                                    options: [
                                                        {
                                                            label: '忽略',
                                                            value: '1'
                                                        },
                                                        {
                                                            label: '不忽略',
                                                            value: '2'
                                                        },
                                                        {
                                                            label: '预设',
                                                            value: '3'
                                                        }
                                                    ],
                                                    description: '<%= data.ignoreError === false ? "找不到组件和动作执行失败都中断" : typeof data.ignoreError === "undefined" ? "找不到组件容忍，动作执行失败才中断" : ""%>'
                                                },
                                                (0, amis_editor_core_1.getSchemaTpl)('expressionFormulaControl', {
                                                    name: 'stopPropagation',
                                                    label: (0, amis_editor_core_1.tipedLabel)('阻断条件', '满足条件时，将会阻断当前事件的后续动作的执行'),
                                                    evalMode: true,
                                                    variables: '${variables}',
                                                    mode: 'horizontal',
                                                    size: 'lg',
                                                    visibleOn: 'data.actionType'
                                                }),
                                                (0, amis_editor_core_1.getSchemaTpl)('expressionFormulaControl', {
                                                    name: 'expression',
                                                    label: '执行条件',
                                                    evalMode: true,
                                                    variables: '${variables}',
                                                    mode: 'horizontal',
                                                    size: 'lg',
                                                    placeholder: '默认执行该动作',
                                                    visibleOn: 'data.actionType'
                                                })
                                            ]
                                        }
                                    ],
                                    columnClassName: 'right-panel'
                                }
                            ]
                        }
                    ],
                    style: {
                        borderStyle: 'solid'
                    },
                    className: 'action-config-panel'
                }
            ],
            onClose: onClose
        }, {
            data: data // 必须这样，不然变量会被当作数据映射处理掉
        });
        //   : null;
    };
    return ActionDialog;
}(react_1.default.Component));
exports.default = ActionDialog;
