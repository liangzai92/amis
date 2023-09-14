"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventControlRenderer = exports.EventControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var sortablejs_1 = tslib_1.__importDefault(require("sortablejs"));
var amis_1 = require("amis");
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var amis_core_1 = require("amis-core");
var action_config_dialog_1 = tslib_1.__importDefault(require("./action-config-dialog"));
var helper_1 = require("./helper");
tslib_1.__exportStar(require("./helper"), exports);
var i18n_runtime_1 = require("i18n-runtime");
var mobx_1 = require("mobx");
var amis_editor_core_1 = require("amis-editor-core");
var EventControl = /** @class */ (function (_super) {
    tslib_1.__extends(EventControl, _super);
    function EventControl(props) {
        var _this = _super.call(this, props) || this;
        _this.eventPanelSortMap = {};
        var events = props.events, value = props.value, data = props.data;
        var eventPanelActive = {};
        var pluginEvents = events[!data.type || data.type === 'text' ? 'plain' : data.type] || [];
        pluginEvents.forEach(function (event) {
            eventPanelActive[event.eventName] = true;
        });
        _this.state = {
            onEvent: value !== null && value !== void 0 ? value : _this.generateEmptyDefault(pluginEvents),
            events: pluginEvents,
            eventPanelActive: eventPanelActive,
            showAcionDialog: false,
            showEventDialog: false,
            actionData: undefined,
            type: 'add',
            appLocaleState: 0
        };
        return _this;
    }
    EventControl.prototype.componentDidMount = function () {
        var _this = this;
        var editorStore = window.editorStore;
        this.unReaction = (0, mobx_1.reaction)(function () { return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState; }, function () {
            _this.setState({
                appLocaleState: editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState
            });
        });
    };
    EventControl.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    EventControl.prototype.componentDidUpdate = function (prevProps, prevState) {
        var value = this.props.value;
        if (value !== prevProps.value) {
            this.setState({ onEvent: value });
        }
    };
    EventControl.prototype.generateEmptyDefault = function (events) {
        var onEvent = {};
        events.forEach(function (event) {
            if (event.defaultShow) {
                onEvent["".concat(event.eventName)] = {
                    __isBroadcast: !!event.isBroadcast,
                    weight: 0,
                    actions: []
                };
            }
        });
        // Object.keys(onEvent).length && props.onChange && props.onChange(onEvent);
        return Object.keys(onEvent).length ? onEvent : {};
    };
    EventControl.prototype.addEvent = function (event, disabled) {
        var onChange = this.props.onChange;
        var onEvent = tslib_1.__assign({}, this.state.onEvent);
        if (disabled) {
            return;
        }
        onEvent["".concat(event.eventName)] = {
            __isBroadcast: !!event.isBroadcast,
            weight: 0,
            actions: []
        };
        this.setState({
            onEvent: onEvent
        });
        onChange && onChange(onEvent);
    };
    EventControl.prototype.activeEventDialog = function (eventInfo) {
        eventInfo = (0, cloneDeep_1.default)(eventInfo);
        if (!eventInfo.debounce) {
            // 防抖配置的默认值
            eventInfo.debounce = {
                open: false,
                wait: 100
            };
        }
        else {
            eventInfo.debounce = tslib_1.__assign({ open: true }, eventInfo.debounce);
        }
        this.setState({
            eventDialogData: eventInfo,
            showEventDialog: true
        });
    };
    EventControl.prototype.eventDialogSubmit = function (formData) {
        var onChange = this.props.onChange;
        var eventName = formData.eventName, _a = formData.debounce, debounce = _a === void 0 ? {} : _a;
        var onEvent = tslib_1.__assign({}, this.state.onEvent);
        var eventConfig = onEvent["".concat(eventName)];
        if (!debounce.open) {
            delete eventConfig.debounce;
        }
        else {
            eventConfig = tslib_1.__assign(tslib_1.__assign({}, eventConfig), { debounce: {
                    wait: debounce.wait
                } });
        }
        onEvent["".concat(eventName)] = tslib_1.__assign({}, eventConfig);
        this.setState({
            onEvent: onEvent,
            showEventDialog: false
        });
        onChange && onChange(onEvent);
    };
    EventControl.prototype.delEvent = function (event) {
        var onChange = this.props.onChange;
        var onEvent = tslib_1.__assign({}, this.state.onEvent);
        delete onEvent[event];
        this.setState({
            onEvent: onEvent
        });
        onChange && onChange(onEvent);
    };
    EventControl.prototype.addAction = function (event, config) {
        var _a = this.props, addBroadcast = _a.addBroadcast, owner = _a.owner;
        var _b = this.state, onEvent = _b.onEvent, eventPanelActive = _b.eventPanelActive;
        var onEventConfig = tslib_1.__assign({}, onEvent);
        var activeConfig = tslib_1.__assign({}, eventPanelActive);
        if (config.actionType === 'broadcast') {
            typeof addBroadcast === 'function' &&
                addBroadcast({
                    owner: owner,
                    isBroadcast: true,
                    eventName: config.eventName,
                    eventLabel: config.eventLabel,
                    description: config.description
                });
        }
        activeConfig[event] = true;
        if (config.actionType) {
            onEventConfig[event] = tslib_1.__assign(tslib_1.__assign({}, onEventConfig[event]), { actions: onEventConfig[event].actions.concat(config) });
        }
        this.setState({
            onEvent: onEventConfig,
            eventPanelActive: activeConfig
        });
        this.initDragging();
        this.props.onChange && this.props.onChange(onEventConfig);
    };
    EventControl.prototype.updateAction = function (event, index, config) {
        this.updateValue(event, index, config);
    };
    EventControl.prototype.delAction = function (event, action, index) {
        var _a;
        var _b = this.state, onEvent = _b.onEvent, eventPanelActive = _b.eventPanelActive;
        var removeBroadcast = this.props.removeBroadcast;
        var onEventConfig = tslib_1.__assign({}, onEvent);
        var activeConfig = tslib_1.__assign({}, eventPanelActive);
        // 删掉对应广播
        if (action.actionType === 'broadcast') {
            typeof removeBroadcast === 'function' &&
                removeBroadcast(action.eventName);
        }
        onEventConfig[event] = {
            actions: onEventConfig[event].actions.filter(function (item, actionIndex) { return index !== actionIndex; }),
            weight: onEvent[event].weight
        };
        if (onEventConfig[event].actions.length < 1) {
            activeConfig[event] = false;
            this.setState({
                eventPanelActive: activeConfig
            });
            (_a = this.eventPanelSortMap[event]) === null || _a === void 0 ? void 0 : _a.destroy();
        }
        this.setState({
            onEvent: onEventConfig
        });
        this.props.onChange && this.props.onChange(onEventConfig);
    };
    EventControl.prototype.toggleActivePanel = function (eventKey) {
        var _this = this;
        var _a;
        var eventPanelActive = this.state.eventPanelActive;
        eventPanelActive[eventKey] = !eventPanelActive[eventKey];
        if (!eventPanelActive[eventKey]) {
            (_a = this.eventPanelSortMap[eventKey]) === null || _a === void 0 ? void 0 : _a.destroy();
        }
        this.setState({ eventPanelActive: eventPanelActive }, function () {
            _this.initDragging();
        });
    };
    EventControl.prototype.updateWeight = function (event, data) {
        var onEvent = this.state.onEvent;
        var onEventConfig = tslib_1.__assign({}, onEvent);
        onEventConfig[event] = tslib_1.__assign(tslib_1.__assign({}, onEventConfig[event]), { weight: data.weight || 0 });
        this.setState({
            onEvent: onEventConfig
        });
    };
    /**
     * 更新事件配置
     *
     * @param {string} event
     * @param {number} actionIndex
     * @param {*} config
     * @memberof EventControl
     */
    EventControl.prototype.updateValue = function (event, index, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var onEvent, emptyEventAcion, onEventConfig;
            return tslib_1.__generator(this, function (_a) {
                onEvent = this.state.onEvent;
                emptyEventAcion = tslib_1.__assign({}, onEvent);
                onEventConfig = tslib_1.__assign({}, onEvent);
                emptyEventAcion[event] = {
                    actions: onEvent[event].actions.map(function (item, actionIndex) {
                        return actionIndex === index ? { actionType: '' } : item;
                    }),
                    weight: onEvent[event].weight
                };
                onEventConfig[event] = tslib_1.__assign(tslib_1.__assign({}, onEvent[event]), { actions: onEvent[event].actions.map(function (item, actionIndex) {
                        return actionIndex === index
                            ? typeof config === 'string'
                                ? tslib_1.__assign(tslib_1.__assign({}, item), { actionType: config }) : config
                            : item;
                    }) });
                this.setState({
                    onEvent: onEventConfig
                });
                this.props.onChange && this.props.onChange(onEventConfig);
                return [2 /*return*/];
            });
        });
    };
    EventControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging();
        }
        this.drag = ref;
    };
    EventControl.prototype.initDragging = function () {
        var _this = this;
        this.eventPanelSortMap = {};
        var dom = (0, react_dom_1.findDOMNode)(this);
        var _a = this.state, onEvent = _a.onEvent, eventPanelActive = _a.eventPanelActive;
        var eventPanel = Array.prototype.slice.call(dom.getElementsByClassName('item-content'));
        // 找到激活的事件面板
        Object.keys(onEvent)
            .filter(function (key) {
            var _a, _b;
            return ((_b = (_a = onEvent[key]) === null || _a === void 0 ? void 0 : _a.actions) === null || _b === void 0 ? void 0 : _b.length) && eventPanelActive[key];
        })
            .forEach(function (key, index) {
            if (!_this.eventPanelSortMap[key]) {
                _this.eventPanelSortMap[key] = _this.genSortPanel(key, eventPanel[index]);
            }
        });
    };
    EventControl.prototype.genSortPanel = function (eventKey, ele) {
        var _this = this;
        return new sortablejs_1.default(ele, {
            group: 'eventControlGroup',
            animation: 150,
            handle: '.ae-option-control-item-dragBar',
            ghostClass: 'ae-option-control-item--dragging',
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
                var onEventConfig = (0, cloneDeep_1.default)(_this.state.onEvent);
                var newEvent = onEventConfig[eventKey];
                var options = newEvent === null || newEvent === void 0 ? void 0 : newEvent.actions.concat();
                // 从后往前移
                if (e.oldIndex > e.newIndex) {
                    options = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(options.slice(0, e.newIndex)), false), [
                        options[e.oldIndex]
                    ], false), tslib_1.__read(options.slice(e.newIndex, e.oldIndex)), false), tslib_1.__read(options.slice(e.oldIndex + 1, options.length)), false);
                }
                else if (e.oldIndex < e.newIndex) {
                    // 从前往后
                    options = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((e.oldIndex === 0 ? [] : options.slice(0, e.oldIndex))), false), tslib_1.__read(options.slice(e.oldIndex + 1, e.newIndex)), false), [
                        options[e.oldIndex]
                    ], false), tslib_1.__read(options.slice(e.newIndex, options.length)), false);
                }
                onEventConfig[eventKey] = tslib_1.__assign(tslib_1.__assign({}, onEventConfig[eventKey]), { actions: options });
                _this.setState({
                    onEvent: onEventConfig
                });
                _this.props.onChange && _this.props.onChange(onEventConfig);
            }
        });
    };
    EventControl.prototype.destroyDragging = function () {
        var _this = this;
        Object.keys(this.eventPanelSortMap).forEach(function (key) {
            var _a, _b;
            ((_a = _this.eventPanelSortMap[key]) === null || _a === void 0 ? void 0 : _a.el) && ((_b = _this.eventPanelSortMap[key]) === null || _b === void 0 ? void 0 : _b.destroy());
        });
    };
    EventControl.prototype.buildEventDataSchema = function (data, manager) {
        var _a, _b, _c;
        var _d = this.props, actionTree = _d.actionTree, pluginActions = _d.actions, commonActions = _d.commonActions, allComponents = _d.allComponents;
        var _e = this.state, events = _e.events, onEvent = _e.onEvent;
        var eventConfig = events.find(function (item) { return item.eventName === data.actionData.eventKey; });
        // 收集当前事件动作出参
        var actions = onEvent[data.actionData.eventKey].actions;
        // 编辑的时候只能拿到当前动作前面动作的事件变量以及当前动作事件
        if (data.type === 'update') {
            actions = actions.slice(0, data.actionData.actionIndex !== undefined
                ? data.actionData.actionIndex + 1
                : 0);
        }
        var jsonSchema = tslib_1.__assign({}, ((_b = (_a = eventConfig === null || eventConfig === void 0 ? void 0 : eventConfig.dataSchema) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : {}));
        (_c = actions === null || actions === void 0 ? void 0 : actions.filter(function (item) { return item.outputVar; })) === null || _c === void 0 ? void 0 : _c.forEach(function (action, index) {
            var _a;
            var _b, _c, _d;
            if (manager.dataSchema.getScope("action-output-".concat(action.actionType, "_ ").concat(index))) {
                return;
            }
            var actionLabel = (0, helper_1.getPropOfAcion)(action, 'actionLabel', actionTree, pluginActions, commonActions, allComponents);
            var actionSchema = (0, helper_1.getPropOfAcion)(action, 'outputVarDataSchema', actionTree, pluginActions, commonActions, allComponents);
            // const schema: any = {
            //   type: 'object',
            //   $id: 'outputVar',
            //   properties: {
            //     [action.outputVar!]: {
            //       ...actionSchema[0],
            //       title: `${action.outputVar}(${actionLabel})`
            //     }
            //   }
            // };
            jsonSchema = tslib_1.__assign(tslib_1.__assign({}, jsonSchema), { properties: tslib_1.__assign(tslib_1.__assign({}, jsonSchema.properties), { data: tslib_1.__assign(tslib_1.__assign({ type: 'object', title: '数据' }, (_b = jsonSchema.properties) === null || _b === void 0 ? void 0 : _b.data), { properties: tslib_1.__assign(tslib_1.__assign({}, (_d = (_c = jsonSchema.properties) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.properties), (_a = {}, _a[action.outputVar] = tslib_1.__assign(tslib_1.__assign({}, (Array.isArray(actionSchema) && (actionSchema[0] || {}))), { title: "".concat(action.outputVar, "(").concat(actionLabel, "\u52A8\u4F5C\u51FA\u53C2)") }), _a)) }) }) });
            // manager.dataSchema.addScope(
            //   schema,
            //   `action-output-${action.actionType}_${index}`
            // );
            // manager.dataSchema.current.group = '动作出参';
        });
        if (manager.dataSchema.getScope('event-variable')) {
            manager.dataSchema.removeScope('event-variable');
        }
        manager.dataSchema.addScope({
            type: 'object',
            properties: {
                event: tslib_1.__assign(tslib_1.__assign({}, jsonSchema), { title: '事件动作' })
            }
        }, 'event-variable');
    };
    // buildActionDataSchema(
    //   activeData: Pick<
    //     EventControlState,
    //     'showAcionDialog' | 'type' | 'actionData'
    //   >,
    //   manager: EditorManager
    // ) {
    //   const {actionTree, pluginActions, commonActions, allComponents} =
    //     this.props;
    //   const {onEvent} = this.state;
    //   // 收集当前事件已有ajax动作的请求返回结果作为事件变量
    //   let oldActions = onEvent[activeData.actionData!.eventKey].actions;
    //   // 编辑的时候只能拿到当前动作前面动作的事件变量
    //   if (activeData.type === 'update') {
    //     oldActions = oldActions.slice(0, activeData.actionData!.actionIndex);
    //   }
    //   oldActions
    //     ?.filter(item => item.outputVar)
    //     ?.forEach((action: ActionConfig, index: number) => {
    //       if (
    //         manager.dataSchema.getScope(
    //           `action-output-${action.actionType}_ ${index}`
    //         )
    //       ) {
    //         return;
    //       }
    //       const actionLabel = getPropOfAcion(
    //         action,
    //         'actionLabel',
    //         actionTree,
    //         pluginActions,
    //         commonActions,
    //         allComponents
    //       );
    //       const actionSchema = getPropOfAcion(
    //         action,
    //         'outputVarDataSchema',
    //         actionTree,
    //         pluginActions,
    //         commonActions,
    //         allComponents
    //       );
    //       const schema: any = {
    //         type: 'object',
    //         properties: {
    //           [`event.data.${action.outputVar}`]: {
    //             ...actionSchema[0],
    //             title: `${action.outputVar}(${actionLabel})`
    //           }
    //         }
    //       };
    //       manager.dataSchema.addScope(
    //         schema,
    //         `action-output-${action.actionType}_${index}`
    //       );
    //       manager.dataSchema.current.group = '动作出参';
    //     });
    // }
    EventControl.prototype.buildContextSchema = function (data) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, manager, currentNode, variables, appVariables;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, manager = _b.manager, currentNode = _b.node;
                        variables = [];
                        // 获取上下文
                        return [4 /*yield*/, manager.getContextSchemas(currentNode.id)];
                    case 1:
                        // 获取上下文
                        _c.sent();
                        // 追加事件相关
                        // this.buildActionDataSchema(data, manager);
                        this.buildEventDataSchema(data, manager);
                        manager.dataSchema.switchTo('event-variable');
                        variables = manager.dataSchema.getDataPropsAsOptions();
                        appVariables = ((_a = manager === null || manager === void 0 ? void 0 : manager.variableManager) === null || _a === void 0 ? void 0 : _a.getVariableFormulaOptions()) || [];
                        appVariables.forEach(function (item) {
                            if (Array.isArray(item === null || item === void 0 ? void 0 : item.children) && item.children.length) {
                                variables.push(item);
                            }
                        });
                        return [2 /*return*/, (0, amis_editor_core_1.updateComponentContext)(variables)];
                }
            });
        });
    };
    // 唤起动作配置弹窗
    EventControl.prototype.activeActionDialog = function (data) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _f, pluginActions, getContextSchemas, actionConfigInitFormatter, getComponents, actionTree, allComponents, manager, currentNode, variables, action_1, actionConfig, actionNode, hasSubActionNode, supportComponents, node, setValueDs, contextSchema, dataSchema, targetVariables, dialogActionType, definitions, dialogObjMap, dialogObj, dialogRef;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _f = this.props, pluginActions = _f.actions, getContextSchemas = _f.getContextSchemas, actionConfigInitFormatter = _f.actionConfigInitFormatter, getComponents = _f.getComponents, actionTree = _f.actionTree, allComponents = _f.allComponents, manager = _f.manager, currentNode = _f.node;
                        return [4 /*yield*/, this.buildContextSchema(data)];
                    case 1:
                        variables = _g.sent();
                        if (!(data.type === 'update')) return [3 /*break*/, 5];
                        action_1 = data.actionData.action;
                        return [4 /*yield*/, (actionConfigInitFormatter === null || actionConfigInitFormatter === void 0 ? void 0 : actionConfigInitFormatter(action_1))];
                    case 2:
                        actionConfig = _g.sent();
                        actionNode = (0, helper_1.findActionNode)(actionTree, actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType);
                        hasSubActionNode = (0, helper_1.findSubActionNode)(actionTree, action_1.actionType);
                        supportComponents = getComponents(actionNode);
                        node = (0, amis_core_1.findTree)(supportComponents, function (item) { return item.value === action_1.componentId; });
                        setValueDs = null;
                        if (!((actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType) === 'setValue' &&
                            (node === null || node === void 0 ? void 0 : node.id) &&
                            helper_1.SELECT_PROPS_CONTAINER.includes((node === null || node === void 0 ? void 0 : node.type) || ''))) return [3 /*break*/, 4];
                        return [4 /*yield*/, manager.getContextSchemas(node.id, true)];
                    case 3:
                        contextSchema = _g.sent();
                        dataSchema = new amis_1.DataSchema(contextSchema || []);
                        targetVariables = (dataSchema === null || dataSchema === void 0 ? void 0 : dataSchema.getDataPropsAsOptions()) || [];
                        setValueDs = targetVariables === null || targetVariables === void 0 ? void 0 : targetVariables.filter(function (item) { return item.value !== '$$id'; });
                        _g.label = 4;
                    case 4:
                        data.actionData = tslib_1.__assign(tslib_1.__assign({ eventKey: data.actionData.eventKey, actionIndex: data.actionData.actionIndex, variables: variables, pluginActions: pluginActions, getContextSchemas: getContextSchemas }, actionConfig), { groupType: (actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.__actionType) || action_1.actionType, __actionDesc: (_a = actionNode === null || actionNode === void 0 ? void 0 : actionNode.description) !== null && _a !== void 0 ? _a : '', __actionSchema: actionNode.schema, __subActions: hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actions, __cmptTreeSource: supportComponents !== null && supportComponents !== void 0 ? supportComponents : [], __superCmptTreeSource: allComponents, 
                            // __supersCmptTreeSource: '',
                            __setValueDs: setValueDs });
                        // 编辑时准备已选的弹窗来源和标题
                        if ((actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType) == 'openDialog') {
                            dialogActionType = (_b = data.actionData) === null || _b === void 0 ? void 0 : _b.groupType;
                            definitions = manager.store.schema.definitions;
                            dialogObjMap = new Map([
                                ['dialog', 'dialog'],
                                ['drawer', 'drawer'],
                                ['confirmDialog', 'dialog']
                            ]);
                            dialogObj = dialogObjMap.get(dialogActionType);
                            dialogRef = (_c = actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig[dialogObj]) === null || _c === void 0 ? void 0 : _c.$ref;
                            if (dialogRef) {
                                data.actionData.__dialogTitle = definitions[dialogRef].title;
                            }
                            else {
                                data.actionData.__dialogTitle = (_d = actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig[dialogObj]) === null || _d === void 0 ? void 0 : _d.title;
                            }
                            if ((_e = actionConfig.args) === null || _e === void 0 ? void 0 : _e.formCurrentDialog) {
                                data.actionData.__dialogSource = 'current';
                                data.actionData.__selectDialog = definitions[dialogRef];
                            }
                            else {
                                data.actionData.__dialogSource = 'new';
                            }
                        }
                        // 选中项自动滚动至可见位置
                        setTimeout(function () {
                            var _a;
                            return (_a = document
                                .querySelector('.action-tree li .is-checked')) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
                        }, 0);
                        return [3 /*break*/, 6];
                    case 5:
                        data.actionData = {
                            eventKey: data.actionData.eventKey,
                            variables: variables,
                            pluginActions: pluginActions,
                            getContextSchemas: getContextSchemas,
                            __superCmptTreeSource: allComponents
                        };
                        _g.label = 6;
                    case 6:
                        this.setState(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 渲染描述信息
    EventControl.prototype.renderDesc = function (action) {
        var _a = this.props, pluginActions = _a.actions, actionTree = _a.actionTree, commonActions = _a.commonActions, getComponents = _a.getComponents, allComponents = _a.allComponents;
        var desc = (0, helper_1.getPropOfAcion)(action, 'descDetail', actionTree, pluginActions, commonActions, allComponents);
        var info = tslib_1.__assign({}, action);
        // 根据子动作类型获取动作树节点的配置
        var hasSubActionNode = (0, helper_1.findSubActionNode)(actionTree, action.actionType);
        var actionType = (0, helper_1.getActionType)(action, hasSubActionNode);
        var actionNode = actionType && (0, helper_1.findActionNode)(actionTree, actionType);
        if (action.componentId && actionNode) {
            var supportComponents = getComponents(actionNode);
            var node = (0, amis_core_1.findTree)(supportComponents, function (item) { return item.value === action.componentId; });
            if (node) {
                info = tslib_1.__assign(tslib_1.__assign({}, info), { rendererLabel: node.label });
            }
        }
        return typeof desc === 'function' ? (react_1.default.createElement("div", { className: "action-control-content" }, (desc === null || desc === void 0 ? void 0 : desc(info)) || '-')) : null;
    };
    EventControl.prototype.getRefsFromCurrentDialog = function (definitions, action) {
        var dialogMaxIndex = 0;
        var dialogRefsName = '';
        if (definitions) {
            Object.keys(definitions).forEach(function (k) {
                var dialog = definitions[k];
                if (dialog.$$id === action.__selectDialog.$$id) {
                    dialogRefsName = k;
                }
                if (k.includes('dialog-')) {
                    var index = Number(k.split('-')[1]);
                    dialogMaxIndex = Math.max(dialogMaxIndex, index);
                }
            });
        }
        if (!dialogRefsName) {
            dialogRefsName = dialogMaxIndex
                ? "dialog-".concat(dialogMaxIndex + 1)
                : 'dialog-1';
        }
        return dialogRefsName;
    };
    EventControl.prototype.onSubmit = function (type, config) {
        var _a, _b, _c, _d, _e;
        var _f = this.props, actionConfigSubmitFormatter = _f.actionConfigSubmitFormatter, manager = _f.manager;
        var actionData = this.state.actionData;
        var store = manager.store;
        var action = (_a = actionConfigSubmitFormatter === null || actionConfigSubmitFormatter === void 0 ? void 0 : actionConfigSubmitFormatter(config, type, actionData)) !== null && _a !== void 0 ? _a : config;
        delete action.__actionSchema;
        if (type === 'add') {
            if (action.actionType === 'dialog' ||
                action.actionType === 'drawer' ||
                action.actionType === 'confirmDialog') {
                var args = action.actionType === 'dialog'
                    ? 'dialog'
                    : action.actionType === 'drawer'
                        ? 'drawer'
                        : 'dialog';
                if (!(config === null || config === void 0 ? void 0 : config.__dialogSource) || (config === null || config === void 0 ? void 0 : config.__dialogSource) === 'new') {
                    var actionLength = this.state.onEvent[config.eventKey].actions.length;
                    var path = "".concat(store.getSchemaPath(store.activeId), "/onEvent/").concat(config.eventKey, "/actions/").concat(actionLength, "/").concat(args);
                    store.setActiveDialogPath(path);
                }
                else if ((config === null || config === void 0 ? void 0 : config.__dialogSource) === 'current') {
                    var dialogRefsName = this.getRefsFromCurrentDialog(store.schema.definitions, action);
                    var path = "definitions/".concat(dialogRefsName);
                    store.setActiveDialogPath(path);
                }
                (_b = this.addAction) === null || _b === void 0 ? void 0 : _b.call(this, config.eventKey, action);
            }
            else {
                (_c = this.addAction) === null || _c === void 0 ? void 0 : _c.call(this, config.eventKey, action);
            }
        }
        else if (type === 'update') {
            if (action.actionType === 'dialog' ||
                action.actionType === 'drawer' ||
                action.actionType === 'confirmDialog') {
                var args = action.actionType === 'dialog'
                    ? 'dialog'
                    : action.actionType === 'drawer'
                        ? 'drawer'
                        : 'dialog';
                if (config.__dialogSource === 'new') {
                    var path = "".concat(store.getSchemaPath(store.activeId), "/onEvent/").concat(config.eventKey, "/actions/").concat(config.actionIndex, "/").concat(args);
                    store.setActiveDialogPath(path);
                }
                else if (config.__dialogSource === 'current') {
                    var dialogRefsName = this.getRefsFromCurrentDialog(store.schema.definitions, action);
                    var path = "definitions/".concat(dialogRefsName);
                    store.setActiveDialogPath(path);
                }
                (_d = this.updateAction) === null || _d === void 0 ? void 0 : _d.call(this, config.eventKey, config.actionIndex, action);
            }
            else {
                (_e = this.updateAction) === null || _e === void 0 ? void 0 : _e.call(this, config.eventKey, config.actionIndex, action);
            }
        }
        this.removeDataSchema();
        this.setState({ showAcionDialog: false });
        this.setState({ actionData: undefined });
    };
    EventControl.prototype.onClose = function () {
        this.removeDataSchema();
        this.setState({ showAcionDialog: false });
    };
    EventControl.prototype.removeDataSchema = function () {
        var manager = this.props.manager;
        // 删除事件
        if (manager.dataSchema.getScope('event-variable')) {
            manager.dataSchema.removeScope('event-variable');
        }
        // // 删除动作出参
        // Object.keys(manager.dataSchema.idMap)
        //   .filter(key => /^action-output/.test(key))
        //   .map(key => {
        //     if (manager.dataSchema.getScope(key)) {
        //       manager.dataSchema.removeScope(key);
        //     }
        //   });
    };
    EventControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, actionTree = _a.actionTree, pluginActions = _a.actions, commonActions = _a.commonActions, getComponents = _a.getComponents, allComponents = _a.allComponents, render = _a.render;
        var _b = this.state, onEvent = _b.onEvent, events = _b.events, eventPanelActive = _b.eventPanelActive, showAcionDialog = _b.showAcionDialog, showEventDialog = _b.showEventDialog, type = _b.type, actionData = _b.actionData, eventDialogData = _b.eventDialogData;
        var eventSnapshot = tslib_1.__assign({}, onEvent);
        var showOldEntry = this.props.showOldEntry;
        var eventKeys = Object.keys(eventSnapshot);
        return (react_1.default.createElement("div", { className: "ae-event-control" },
            react_1.default.createElement("header", { className: (0, classnames_1.default)({
                    'ae-event-control-header': true,
                    'ae-event-control-header-oldentry': showOldEntry,
                    'no-bd-btm': !eventKeys.length
                }) }, render('dropdown', {
                type: 'dropdown-button',
                level: 'enhance',
                label: '添加事件',
                disabled: false,
                className: 'block w-full add-event-dropdown',
                closeOnClick: true,
                buttons: events.map(function (item) { return ({
                    type: 'button',
                    disabledTip: '您已添加该事件',
                    tooltipPlacement: 'left',
                    disabled: Object.keys(onEvent).includes(item.eventName),
                    actionType: '',
                    label: item.eventLabel,
                    onClick: _this.addEvent.bind(_this, item, Object.keys(onEvent).includes(item.eventName))
                }); })
            }, {
                popOverContainer: null // amis 渲染挂载节点会使用 this.target
            })),
            react_1.default.createElement("ul", { className: (0, classnames_1.default)({
                    'ae-event-control-content': true,
                    'ae-event-control-content-oldentry': showOldEntry
                }), ref: this.dragRef }, eventKeys.length ? (eventKeys.map(function (eventKey, eventIndex) {
                var _a, _b, _c, _d, _e, _f;
                return (react_1.default.createElement("li", { className: "event-item", key: "content_".concat(eventIndex) },
                    react_1.default.createElement("div", { className: (0, classnames_1.default)({
                            'event-item-header': true,
                            'no-bd-btm': !(((_b = (_a = eventSnapshot[eventKey]) === null || _a === void 0 ? void 0 : _a.actions) === null || _b === void 0 ? void 0 : _b.length) &&
                                eventPanelActive[eventKey]) && !(0, helper_1.getEventStrongDesc)(events, eventKey)
                        }) },
                        react_1.default.createElement(amis_1.TooltipWrapper, { tooltipClassName: "event-item-header-tip", trigger: "hover", placement: "top", tooltip: {
                                children: function () { return (react_1.default.createElement("div", null, (0, helper_1.getEventDesc)(events, eventKey) ||
                                    (0, helper_1.getEventStrongDesc)(events, eventKey) ||
                                    eventKey)); }
                            } },
                            react_1.default.createElement("div", null, (0, helper_1.getEventLabel)(events, eventKey) || eventKey)),
                        react_1.default.createElement("div", { className: "event-item-header-toolbar" },
                            react_1.default.createElement("div", { onClick: _this.activeActionDialog.bind(_this, {
                                    showAcionDialog: true,
                                    type: 'add',
                                    actionData: {
                                        eventKey: eventKey
                                    }
                                }) },
                                react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "add-btn" })),
                            react_1.default.createElement("div", { onClick: _this.delEvent.bind(_this, eventKey) },
                                react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "delete-bold-btn" })),
                            react_1.default.createElement("div", { onClick: _this.activeEventDialog.bind(_this, tslib_1.__assign({ eventName: eventKey, eventLabel: (0, helper_1.getEventLabel)(events, eventKey) || eventKey }, eventSnapshot[eventKey])) },
                                react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "event-setting" })),
                            react_1.default.createElement("div", { onClick: _this.toggleActivePanel.bind(_this, eventKey) }, eventPanelActive[eventKey] ? (react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "open-btn-r" })) : (react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "close-btn" }))))),
                    (0, helper_1.getEventStrongDesc)(events, eventKey)
                        ? render('alert', {
                            type: 'alert',
                            body: '温馨提示：' + (0, helper_1.getEventStrongDesc)(events, eventKey),
                            level: 'info',
                            showCloseButton: true,
                            showIcon: true,
                            className: 'event-item-desc'
                        })
                        : null,
                    ((_d = (_c = eventSnapshot[eventKey]) === null || _c === void 0 ? void 0 : _c.actions) === null || _d === void 0 ? void 0 : _d.length) &&
                        eventPanelActive[eventKey] ? (react_1.default.createElement("ul", { className: "item-content" }, (_f = (_e = eventSnapshot[eventKey]) === null || _e === void 0 ? void 0 : _e.actions) === null || _f === void 0 ? void 0 : _f.map(function (action, actionIndex) {
                        return (react_1.default.createElement("li", { className: "ae-option-control-item", key: "item-content_".concat(actionIndex) },
                            react_1.default.createElement("div", { className: "action-control-header" },
                                react_1.default.createElement("div", { className: "action-control-header-left" },
                                    react_1.default.createElement("div", { className: "ae-option-control-item-dragBar" },
                                        react_1.default.createElement(amis_1.Icon, { icon: "drag-six-circle-btn", className: "icon" })),
                                    react_1.default.createElement("div", { className: "action-item-actiontype" }, (0, helper_1.getPropOfAcion)(action, 'actionLabel', actionTree, pluginActions, commonActions, allComponents) || action.actionType)),
                                react_1.default.createElement("div", { className: "action-control-header-right" },
                                    react_1.default.createElement("div", { onClick: _this.activeActionDialog.bind(_this, {
                                            showAcionDialog: true,
                                            type: 'update',
                                            actionData: {
                                                action: action,
                                                eventKey: eventKey,
                                                actionIndex: actionIndex
                                            }
                                        }) },
                                        react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "edit-full-btn" })),
                                    react_1.default.createElement("div", { onClick: _this.delAction.bind(_this, eventKey, action, actionIndex) },
                                        react_1.default.createElement(amis_1.Icon, { className: "icon", icon: "delete-easy-btn" })))),
                            _this.renderDesc(action)));
                    }))) : null));
            })) : (react_1.default.createElement("div", { className: "ae-event-control-placeholder" }, (0, i18n_runtime_1.i18n)('快去添加事件，让你的产品动起来吧')))),
            showEventDialog
                ? (0, amis_1.render)({
                    type: 'dialog',
                    title: "".concat(eventDialogData === null || eventDialogData === void 0 ? void 0 : eventDialogData.eventLabel, "-\u4E8B\u4EF6\u914D\u7F6E"),
                    showCloseButton: false,
                    body: [
                        {
                            type: 'form',
                            title: '表单',
                            data: {
                                '&': '$$'
                            },
                            mode: 'horizontal',
                            horizontal: {
                                left: 3,
                                right: 9
                            },
                            body: [
                                {
                                    label: '事件防重',
                                    type: 'switch',
                                    name: 'debounce.open',
                                    description: '开启事件防重后，防重时间内多次触发事件只会执行最后一次'
                                },
                                {
                                    label: '防重时间',
                                    required: true,
                                    hiddenOn: '!debounce.open',
                                    name: 'debounce.wait',
                                    suffix: 'ms',
                                    max: 10000,
                                    min: 0,
                                    type: 'input-number'
                                }
                            ],
                            onSubmit: this.eventDialogSubmit.bind(this)
                        }
                    ],
                    actions: [
                        {
                            type: 'button',
                            label: '取消',
                            onEvent: {
                                click: {
                                    actions: [
                                        {
                                            actionType: 'custom',
                                            script: function () {
                                                _this.setState({
                                                    showEventDialog: false
                                                });
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            type: 'button',
                            actionType: 'confirm',
                            label: '确认',
                            primary: true
                        }
                    ]
                }, {
                    data: eventDialogData
                })
                : null,
            react_1.default.createElement(action_config_dialog_1.default, { show: showAcionDialog, type: type, actionTree: actionTree, pluginActions: pluginActions, commonActions: commonActions, getComponents: getComponents, data: actionData, onSubmit: this.onSubmit, onClose: this.onClose, render: this.props.render })));
    };
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], EventControl.prototype, "dragRef", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], EventControl.prototype, "onSubmit", null);
    tslib_1.__decorate([
        amis_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], EventControl.prototype, "onClose", null);
    return EventControl;
}(react_1.default.Component));
exports.EventControl = EventControl;
var EventControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(EventControlRenderer, _super);
    function EventControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-eventControl'
        })
    ], EventControlRenderer);
    return EventControlRenderer;
}(EventControl));
exports.EventControlRenderer = EventControlRenderer;
