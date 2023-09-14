"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_core_1 = require("amis-core");
var amis_editor_core_1 = require("amis-editor-core");
var DSBuilderManager_1 = require("../../builder/DSBuilderManager");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var ComboControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ComboControlPlugin, _super);
    function ComboControlPlugin(manager) {
        var _this = _super.call(this, manager) || this;
        // 关联渲染器名字
        _this.rendererName = 'combo';
        _this.$schema = '/schemas/ComboControlSchema.json';
        // 组件名称
        _this.name = '组合输入';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-group';
        _this.pluginIcon = 'combo-plugin';
        _this.description = '多个表单项的组合，可配置是否增加和删除初始设定的模板';
        _this.docLink = '/amis/zh-CN/components/form/combo';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'combo',
            label: '组合输入',
            name: 'combo',
            multiple: true,
            addable: true,
            removable: true,
            removableMode: 'icon',
            addBtn: {
                label: '新增',
                icon: 'fa fa-plus',
                level: 'primary',
                size: 'sm'
            },
            items: [
                {
                    type: 'input-text',
                    name: 'input-text',
                    placeholder: '文本'
                },
                {
                    type: 'select',
                    name: 'select',
                    placeholder: '选项',
                    options: [
                        {
                            label: 'A',
                            value: 'a'
                        },
                        {
                            label: 'B',
                            value: 'b'
                        }
                    ]
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: [{ text: 'Row 1', select: 'a' }, {}] })
            ]
        };
        // 容器配置
        _this.regions = [
            {
                key: 'items',
                label: '内容区',
                preferTag: '内容区',
                renderMethod: 'renderItems'
            }
        ];
        // 事件定义
        _this.events = [
            {
                eventName: 'add',
                eventLabel: '添加',
                description: '添加组合项时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'delete',
                eventLabel: '删除',
                description: '删除组合项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    key: {
                                        type: 'string',
                                        title: '被删除的索引'
                                    },
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '被删除的项'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'tabsChange',
                eventLabel: '切换tab',
                description: '当设置 tabsMode 为 true 时，切换选项卡时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    key: {
                                        type: 'string',
                                        title: '选项卡索引'
                                    },
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '被激活的项'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清除选中值'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'addItem',
                actionLabel: '添加项',
                description: '添加新的项',
                innerArgs: ['item'],
                schema: (0, helper_1.getArgsWrapper)({
                    type: 'combo',
                    label: '添加项',
                    name: 'item',
                    draggable: false,
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
                            required: true,
                            placeholder: '变量名',
                            source: '${__setValueDs}'
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                            name: 'val',
                            variables: '${variables}',
                            inputMode: 'input-group'
                        })
                    ]
                })
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = '组合输入';
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                className: 'p-none',
                                title: '常用',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                        required: true
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('label'),
                                    (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                        rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'textarea' }),
                                        label: (0, amis_editor_core_1.tipedLabel)('默认值', '支持 <code>now、+1day、-2weeks、+1hours、+2years</code>等这种相对值用法'),
                                        pipeOut: function (value) {
                                            try {
                                                return typeof JSON.parse(value) === 'number'
                                                    ? value
                                                    : JSON.parse(value);
                                            }
                                            catch (err) {
                                                return value;
                                            }
                                        }
                                    }),
                                    // 多选模式和条数绑定了，所以设定了多选，条数开启
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'multiple',
                                        label: '可多选',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(true),
                                        onChange: function (value, oldValue, model, form) {
                                            form.setValueByName('addable', value);
                                            form.setValueByName('removable', value);
                                            !value && form.setValueByName('draggable', false);
                                            form.setValueByName('flat', false);
                                        }
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.multiple',
                                        body: [
                                            {
                                                label: '最多条数',
                                                name: 'maxLength',
                                                type: 'input-number'
                                            },
                                            {
                                                label: '最少条数',
                                                name: 'minLength',
                                                type: 'input-number'
                                            }
                                        ]
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'flat',
                                        label: (0, amis_editor_core_1.tipedLabel)('打平值', '默认数组内的数据结构为对象，如果只有一个表单项，可以配置将值打平，那么数组内放置的就是那个表单项的值'),
                                        visibleOn: 'Array.isArray(data.items) && data.items.length === 1 && data.multiple'
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.multiple && data.flat',
                                        body: [(0, amis_editor_core_1.getSchemaTpl)('joinValues'), (0, amis_editor_core_1.getSchemaTpl)('delimiter')]
                                    },
                                    // 可排序，排序和新增无关，和多选模式有关
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'draggable',
                                        label: '可排序',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                                        visibleOn: 'data.multiple'
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.draggable',
                                        body: [(0, amis_editor_core_1.getSchemaTpl)('draggableTip')]
                                    },
                                    // 可新增
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'addable',
                                        label: (0, amis_editor_core_1.tipedLabel)('可新增', '如需要拓展自定义的新增功能，可通过配置组件-新增项来拓展'),
                                        visibleOn: 'data.multiple',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                                        onChange: function (value, oldValue, model, form) {
                                            if (value) {
                                                form.setValueByName('addBtn', {
                                                    label: '新增',
                                                    icon: 'fa fa-plus',
                                                    level: 'primary',
                                                    size: 'sm'
                                                });
                                            }
                                        }
                                    }),
                                    // 可删除
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        name: 'removable',
                                        label: '可删除',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                                        visibleOn: 'data.multiple',
                                        onChange: function (value, oldValue, model, form) {
                                            if (value) {
                                                form.setValueByName('removableMode', 'icon');
                                                form.setValueByName('deleteIcon', undefined);
                                                form.setValueByName('deleteBtn', undefined);
                                            }
                                        }
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.removable',
                                        body: [
                                            // 自定义删除按钮开关
                                            {
                                                type: 'button-group-select',
                                                name: 'removableMode',
                                                label: '按钮模式',
                                                options: [
                                                    {
                                                        label: '图标',
                                                        value: 'icon'
                                                    },
                                                    {
                                                        label: '按钮',
                                                        value: 'button'
                                                    }
                                                ],
                                                onChange: function (value, oldValue, model, form) {
                                                    if (value === 'icon') {
                                                        form.setValueByName('deleteBtn', undefined);
                                                    }
                                                    else if (value === 'button') {
                                                        form.setValueByName('deleteBtn', {
                                                            label: '删除',
                                                            level: 'default'
                                                        });
                                                    }
                                                }
                                            },
                                            // getSchemaTpl('icon', {
                                            //   name: 'deleteIcon',
                                            //   label: '图标',
                                            //   visibleOn: 'data.removableMode === "icon"'
                                            // }),
                                            {
                                                label: '文案',
                                                name: 'deleteBtn.label',
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                                visibleOn: 'data.removableMode === "button"'
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('buttonLevel', {
                                                label: '样式',
                                                name: 'deleteBtn.level',
                                                visibleOn: 'data.removableMode === "button"'
                                            }),
                                            (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                                name: 'deleteApi',
                                                label: '删除',
                                                renderLabel: false,
                                                mode: 'normal'
                                            }),
                                            (0, amis_editor_core_1.getSchemaTpl)('deleteConfirmText')
                                        ]
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                    (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                    (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                                    (0, amis_editor_core_1.getSchemaTpl)('description')
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('status', {
                                isFormItem: true,
                                readonly: true
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect }),
                            (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                                {
                                    className: 'p-none',
                                    title: '高级',
                                    body: [
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            name: 'canAccessSuperData',
                                            label: '自动填充父级变量',
                                            pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                        }),
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            name: 'strictMode',
                                            label: (0, amis_editor_core_1.tipedLabel)('严格模式', '如果你希望环境变量的值实时透传到 Combo 中，请关闭此选项。'),
                                            value: true
                                        }),
                                        (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
                                            name: 'syncFields',
                                            visibleOn: '!data.strictMode',
                                            label: (0, amis_editor_core_1.tipedLabel)('同步字段', '如果 Combo 层级比较深，底层的获取外层的数据可能不同步。但是给 combo 配置这个属性就能同步下来。'),
                                            type: 'combo',
                                            mode: 'normal',
                                            multiple: true,
                                            canAccessSuperData: true,
                                            items: [
                                                {
                                                    name: 'field',
                                                    type: 'input-text'
                                                }
                                            ],
                                            value: [],
                                            pipeIn: function (value) {
                                                return (value !== null && value !== void 0 ? value : []).map(function (item) { return ({ field: item }); });
                                            },
                                            pipeOut: function (value) {
                                                return (value !== null && value !== void 0 ? value : []).map(function (item) {
                                                    var keys = Object.keys(item);
                                                    return keys.length > 0 ? item.field : '';
                                                });
                                            }
                                        }),
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            name: 'lazyLoad',
                                            label: (0, amis_editor_core_1.tipedLabel)('懒加载', '如果数据比较多，比较卡顿时，可开启此配置项'),
                                            pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                                            visibleOn: 'data.multiple && !data.tabsMode'
                                        })
                                    ]
                                }
                            ])
                        ])
                    ]
                },
                {
                    title: '外观',
                    className: 'p-none',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            visibleOn: 'data.multiple',
                            body: [
                                {
                                    name: 'tabsMode',
                                    label: '展示形式',
                                    type: 'button-group-select',
                                    inputClassName: 'items-center',
                                    size: 'sm',
                                    options: [
                                        { label: '表单', value: false },
                                        { label: '选项卡', value: true }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                                    onChange: function (value, oldValue, model, form) {
                                        if (value) {
                                            form.setValueByName('lazyLoad', undefined);
                                        }
                                    }
                                },
                                {
                                    type: 'container',
                                    className: 'ae-ExtendMore mb-3',
                                    visibleOn: 'data.tabsMode',
                                    body: [
                                        {
                                            type: 'select',
                                            name: 'tabsStyle',
                                            label: '样式',
                                            pipeIn: (0, amis_editor_core_1.defaultValue)(''),
                                            options: [
                                                {
                                                    label: '默认',
                                                    value: ''
                                                },
                                                {
                                                    label: '线型',
                                                    value: 'line'
                                                },
                                                {
                                                    label: '卡片',
                                                    value: 'card'
                                                },
                                                {
                                                    label: '选择器',
                                                    value: 'radio'
                                                }
                                            ]
                                        },
                                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                            label: '标题模版',
                                            name: 'tabsLabelTpl'
                                        })
                                    ]
                                },
                                // 表单多行展示
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'multiLine',
                                    label: '多行展示',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false),
                                    visibleOn: '!data.tabsMode',
                                    onChange: function (value, oldValue, model, form) {
                                        if (!value) {
                                            form.setValueByName('subFormMode', undefined);
                                            form.setValueByName('noBorder', undefined);
                                        }
                                    }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    visibleOn: '!data.tabsMode && data.multiLine',
                                    name: 'noBorder',
                                    label: '去掉边框',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                })
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', {
                            renderer: context.info.renderer,
                            schema: [
                                (0, amis_editor_core_1.getSchemaTpl)('subFormItemMode', {
                                    visibleOn: 'data.multiLine',
                                    type: 'select',
                                    label: '子表单'
                                })
                            ]
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames')
                    ])
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        _this.dsManager = new DSBuilderManager_1.DSBuilderManager(manager);
        return _this;
    }
    ComboControlPlugin.prototype.filterProps = function (props) {
        // 至少显示一个成员，否则啥都不显示。
        if (props.multiple && !props.value && !props.$schema.value && !props.$ref) {
            var mockedData_1 = {};
            if (Array.isArray(props.items) && props.items.length === 0) {
                props.items.forEach(function (control) {
                    control.name &&
                        (0, amis_core_1.setVariable)(mockedData_1, control.name, (0, amis_editor_core_1.mockValue)(control));
                });
            }
            props.value = [mockedData_1];
            return props;
        }
        return props;
    };
    ComboControlPlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var itemsSchema, items, parentScopeId, isColumnChild, scopeId, pool, current, schema, _k, _l, scopeId, scope;
            return tslib_1.__generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        itemsSchema = {
                            $id: "".concat(node.id, "-").concat(node.type, "-tableRows"),
                            type: 'object',
                            properties: {}
                        };
                        items = (_a = node.children) === null || _a === void 0 ? void 0 : _a.find(function (child) { return child.isRegion && child.region === 'items'; });
                        parentScopeId = "".concat(parent === null || parent === void 0 ? void 0 : parent.id, "-").concat(parent === null || parent === void 0 ? void 0 : parent.type).concat(((_b = node.parent) === null || _b === void 0 ? void 0 : _b.type) === 'cell' ? '-currentRow' : '');
                        isColumnChild = false;
                        if (trigger) {
                            isColumnChild = (0, amis_core_1.someTree)(items.children, function (item) { return item.id === (trigger === null || trigger === void 0 ? void 0 : trigger.id); });
                            if (isColumnChild) {
                                scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                                if (this.manager.dataSchema.getScope(scopeId)) {
                                    this.manager.dataSchema.removeScope(scopeId);
                                }
                                if (this.manager.dataSchema.getScope(parentScopeId)) {
                                    this.manager.dataSchema.switchTo(parentScopeId);
                                }
                                this.manager.dataSchema.addScope([], scopeId);
                                this.manager.dataSchema.current.tag = '当前行记录';
                                this.manager.dataSchema.current.group = '组件上下文';
                            }
                        }
                        pool = items.children.concat();
                        _m.label = 1;
                    case 1:
                        if (!pool.length) return [3 /*break*/, 4];
                        current = pool.shift();
                        schema = current.schema;
                        if (!schema.name) return [3 /*break*/, 3];
                        _k = itemsSchema.properties;
                        _l = schema.name;
                        return [4 /*yield*/, ((_d = (_c = current.info.plugin).buildDataSchemas) === null || _d === void 0 ? void 0 : _d.call(_c, current, region, trigger, node))];
                    case 2:
                        _k[_l] =
                            _m.sent();
                        _m.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        if (isColumnChild) {
                            scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                            scope = this.manager.dataSchema.getScope(scopeId);
                            scope === null || scope === void 0 ? void 0 : scope.addSchema(itemsSchema);
                        }
                        if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.multiple) {
                            return [2 /*return*/, {
                                    $id: 'combo',
                                    type: 'array',
                                    title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name),
                                    items: itemsSchema
                                }];
                        }
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, itemsSchema), { title: ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.label) || ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.name) })];
                }
            });
        });
    };
    ComboControlPlugin.prototype.getAvailableContextFields = function (scopeNode, target, region) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scope, builder;
            return tslib_1.__generator(this, function (_c) {
                if (target.type === scopeNode.type ||
                    (target.parent.isRegion && target.parent.region === 'items')) {
                    scope = scopeNode.parent.parent;
                    builder = this.dsManager.getBuilderBySchema(scope.schema);
                }
                if (builder && scope.schema.api) {
                    return [2 /*return*/, builder.getAvailableContextFields({
                            schema: scope.schema,
                            sourceKey: 'api',
                            feat: (_b = (_a = scope.schema) === null || _a === void 0 ? void 0 : _a.feat) !== null && _b !== void 0 ? _b : 'List',
                            scopeNode: scopeNode
                        }, 
                        /** ID相同为本体，否则为子项 */
                        (target === null || target === void 0 ? void 0 : target.id) === (scopeNode === null || scopeNode === void 0 ? void 0 : scopeNode.id) ? scopeNode : target)];
                }
                return [2 /*return*/];
            });
        });
    };
    ComboControlPlugin.id = 'ComboControlPlugin';
    return ComboControlPlugin;
}(amis_editor_core_1.BasePlugin));
exports.ComboControlPlugin = ComboControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ComboControlPlugin);
