"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapseGroupPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var amis_editor_core_5 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var CollapseGroupPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CollapseGroupPlugin, _super);
    function CollapseGroupPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'collapse-group';
        _this.$schema = '/schemas/CollapseGroupSchema.json';
        // 组件名称
        _this.name = '折叠面板';
        _this.isBaseComponent = true;
        _this.description = '折叠面板，当信息量较大且分类较多时，可使用折叠面板进行分类收纳。';
        _this.tags = ['布局容器'];
        _this.icon = 'fa fa-align-justify';
        _this.pluginIcon = 'collapse-plugin';
        _this.scaffold = {
            type: 'collapse-group',
            activeKey: ['1'],
            body: [
                {
                    type: 'collapse',
                    key: '1',
                    active: true,
                    header: '标题1',
                    body: [
                        {
                            type: 'tpl',
                            tpl: '这里是内容1',
                            wrapperComponent: '',
                            inline: false
                        }
                    ]
                },
                {
                    type: 'collapse',
                    key: '2',
                    header: '标题2',
                    body: [
                        {
                            type: 'tpl',
                            tpl: '这里是内容1',
                            wrapperComponent: '',
                            inline: false
                        }
                    ]
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '折叠状态改变',
                description: '折叠面板折叠状态改变时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                title: '数据',
                                type: 'object',
                                properties: {
                                    activeKeys: {
                                        type: 'array',
                                        title: '当前展开的索引列表'
                                    },
                                    collapseId: {
                                        type: 'string',
                                        title: '折叠器索引'
                                    },
                                    collapsed: {
                                        type: 'boolean',
                                        title: '折叠器状态'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        _this.activeKeyData = [];
        _this.panelTitle = '折叠面板';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    {
                                        name: 'expandIconPosition',
                                        label: '图标位置',
                                        type: 'button-group-select',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('left'),
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
                                    },
                                    {
                                        type: 'ae-switch-more',
                                        label: '自定义图标',
                                        bulk: true,
                                        mode: 'normal',
                                        value: false,
                                        formType: 'extend',
                                        autoFocus: false,
                                        form: {
                                            body: [
                                                (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                                    name: 'expandIcon',
                                                    label: '图标',
                                                    pipeIn: function (value) { return value === null || value === void 0 ? void 0 : value.icon; },
                                                    pipeOut: function (value) { return ({
                                                        type: 'icon',
                                                        vendor: '',
                                                        icon: value
                                                    }); }
                                                })
                                            ]
                                        },
                                        pipeIn: function (value) {
                                            if (typeof value === 'string' && value.length) {
                                                return {
                                                    character: value
                                                };
                                            }
                                            return undefined;
                                        },
                                        pipeOut: function (value) {
                                            if (!(0, amis_editor_core_5.isObject)(value)) {
                                                return undefined;
                                            }
                                            return typeof value.character === 'string'
                                                ? value.character
                                                : undefined;
                                        }
                                    },
                                    {
                                        name: 'accordion',
                                        label: (0, amis_editor_core_4.tipedLabel)('手风琴模式', '手风琴模式，只允许单个面板展开'),
                                        mode: 'row',
                                        inputClassName: 'inline-flex justify-between flex-row-reverse',
                                        type: 'switch',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)(false)
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                                        name: 'body',
                                        type: 'combo',
                                        label: '面板管理',
                                        mode: 'normal',
                                        multiple: true,
                                        addable: true,
                                        columnClassName: 'w-20',
                                        addButtonText: '新增折叠器',
                                        minLength: 1,
                                        draggable: true,
                                        draggableTip: '',
                                        placeholder: '请添加折叠器',
                                        items: [
                                            {
                                                type: 'container',
                                                columnClassName: 'flex-none',
                                                body: (0, amis_editor_core_4.tipedLabel)([
                                                    {
                                                        name: 'active',
                                                        type: 'checkbox'
                                                    }
                                                ], '默认展开此面板')
                                            },
                                            (0, amis_editor_core_3.getSchemaTpl)('title', {
                                                name: 'header',
                                                placeholder: '标题'
                                            })
                                        ],
                                        onChange: function (value, oldValue, model, form) {
                                            var activeKey = value.reduce(function (arr, item) {
                                                item.active === true && arr.push(item.key);
                                                return arr;
                                            }, []);
                                            form.setValues({
                                                activeKey: activeKey
                                            });
                                        },
                                        pipeOut: function (value, oldValue, data) {
                                            var keys = value.map(function (item) { return item.key; });
                                            var findMinCanUsedKey = function (keys, max) {
                                                for (var i = 1; i <= max; i++) {
                                                    if (!keys.includes(String(i))) {
                                                        return String(i);
                                                    }
                                                }
                                            };
                                            value.forEach(function (item) {
                                                if (!item.key) {
                                                    var key = findMinCanUsedKey(keys, value.length);
                                                    item.key = key;
                                                    item.header = "\u6807\u9898".concat(key);
                                                }
                                            });
                                            return value;
                                        },
                                        scaffold: {
                                            type: 'collapse',
                                            header: '标题',
                                            body: [
                                                {
                                                    type: 'tpl',
                                                    tpl: '内容',
                                                    wrapperComponent: '',
                                                    inline: false
                                                }
                                            ],
                                            key: ''
                                        }
                                    })
                                ]
                            }
                        ])
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                                isFormItem: false
                            })
                        ])
                    },
                    {
                        title: '事件',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                        ]
                    }
                ])
            ];
        };
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                renderMethod: 'render',
                insertPosition: 'inner'
            }
        ];
        return _this;
    }
    CollapseGroupPlugin.id = 'CollapseGroupPlugin';
    return CollapseGroupPlugin;
}(amis_editor_core_2.BasePlugin));
exports.CollapseGroupPlugin = CollapseGroupPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CollapseGroupPlugin);
