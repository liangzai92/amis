"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var sortBy_1 = tslib_1.__importDefault(require("lodash/sortBy"));
var helper_1 = require("../renderer/event-control/helper");
var PaginationPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(PaginationPlugin, _super);
    function PaginationPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'pagination';
        _this.$schema = '/schemas/PaginationSchema.json';
        // 组件名称
        _this.name = '分页组件';
        _this.isBaseComponent = true;
        _this.description = '分页组件，可以对列表进行分页展示，提高页面性能';
        _this.tags = ['容器'];
        _this.icon = 'fa fa-window-minimize';
        _this.lastLayoutSetting = ['pager'];
        _this.layoutOptions = [
            { text: '总数', value: 'total', checked: false },
            { text: '每页条数', value: 'perPage', checked: false },
            { text: '分页', value: 'pager', checked: true },
            { text: '跳转页', value: 'go', checked: false }
        ];
        _this.scaffold = {
            type: 'pagination',
            mode: 'normal',
            layout: ['pager'],
            activePage: 1,
            lastPage: 1,
            total: 1,
            hasNext: false,
            disabled: false,
            perPageAvailable: [10, 20, 50, 100],
            perPage: 10,
            maxButtons: 7
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '分页器';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                {
                                    name: 'mode',
                                    label: '模式',
                                    type: 'button-group-select',
                                    size: 'sm',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('normal'),
                                    options: [
                                        {
                                            label: '默认',
                                            value: 'normal'
                                        },
                                        {
                                            label: '简约',
                                            value: 'simple'
                                        }
                                    ]
                                },
                                // {
                                //   name: 'hasNext',
                                //   label: '是否有下一页',
                                //   mode: 'row',
                                //   inputClassName: 'inline-flex justify-between flex-row-reverse',
                                //   type: 'switch',
                                //   visibleOn: 'data.mode === "simple"'
                                // },
                                // {
                                //   name: 'activePage',
                                //   label: tipedLabel('当前页', '支持使用 \\${xxx} 来获取变量'),
                                //   type: 'input-text'
                                // },
                                // {
                                //   name: 'lastPage',
                                //   label: tipedLabel('最后页码', '支持使用 \\${xxx} 来获取变量'),
                                //   type: 'input-text',
                                //   visibleOn: 'data.mode === "normal"'
                                // },
                                // {
                                //   name: 'total',
                                //   label: tipedLabel('总条数', '支持使用 \\${xxx} 来获取变量'),
                                //   type: 'input-text',
                                //   visibleOn: 'data.mode === "normal"'
                                // },
                                (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
                                    name: 'layout',
                                    type: 'combo',
                                    label: (0, amis_editor_core_1.tipedLabel)('启用功能', '选中表示启用该项，可以拖拽排序调整功能的顺序'),
                                    visibleOn: '!data.mode || data.mode === "normal"',
                                    mode: 'normal',
                                    multiple: true,
                                    multiLine: false,
                                    addable: false,
                                    removable: false,
                                    draggable: true,
                                    editable: false,
                                    minLength: 1,
                                    tabsStyle: 'inline',
                                    formClassName: 'ae-pagination-layout-item',
                                    items: [
                                        {
                                            type: 'checkbox',
                                            name: 'checked',
                                            className: 'm-t-n-xxs',
                                            inputClassName: 'p-t-none'
                                        },
                                        {
                                            type: 'tpl',
                                            name: 'text',
                                            className: 'p-t-xs'
                                        }
                                    ],
                                    pipeIn: function (value) {
                                        if (typeof value === 'string') {
                                            value = value.split(',');
                                        }
                                        else if (!value || !Array.isArray(value)) {
                                            value = _this.lastLayoutSetting;
                                        }
                                        return (0, sortBy_1.default)(_this.layoutOptions.map(function (op) { return (tslib_1.__assign(tslib_1.__assign({}, op), { checked: value.includes(op.value) })); }), [
                                            function (item) {
                                                var idx = value.findIndex(function (v) { return v === item.value; });
                                                return ~idx ? idx : Infinity;
                                            }
                                        ]);
                                        // return this.layoutOptions.map(v => ({
                                        //   ...v,
                                        //   checked: value.includes(v.value)
                                        // }));
                                    },
                                    pipeOut: function (value) {
                                        _this.lastLayoutSetting = value
                                            .filter(function (v) { return v.checked; })
                                            .map(function (v) { return v.value; });
                                        return _this.lastLayoutSetting.concat();
                                    }
                                }),
                                // {
                                //   name: 'showPerPage',
                                //   label: '显示每页条数',
                                //   mode: 'row',
                                //   inputClassName: 'inline-flex justify-between flex-row-reverse',
                                //   type: 'switch',
                                //   visibleOn: 'data.mode === "normal"'
                                // },
                                (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
                                    name: 'perPageAvailable',
                                    type: 'combo',
                                    label: '每页条数选项',
                                    visibleOn: '(!data.mode || data.mode === "normal") && data.layout && data.layout.includes("perPage")',
                                    mode: 'normal',
                                    multiple: true,
                                    multiLine: false,
                                    addable: true,
                                    removable: true,
                                    draggable: true,
                                    editable: true,
                                    minLength: 1,
                                    tabsStyle: 'inline',
                                    addButtonClassName: 'm-b-sm',
                                    items: [
                                        {
                                            type: 'input-number',
                                            name: 'value',
                                            min: 1
                                        }
                                    ],
                                    pipeIn: function (value) {
                                        return (value === null || value === void 0 ? void 0 : value.map(function (v) { return ({ value: v }); })) || [10];
                                    },
                                    pipeOut: function (value) {
                                        var pages = value.map(function (v) { return v.value; });
                                        return pages.map(function (page) { return page || Math.max.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(pages.filter(Boolean)), false)) + 5; });
                                    }
                                }),
                                {
                                    name: 'perPage',
                                    type: 'input-number',
                                    label: '默认每页条数',
                                    visibleOn: '(!data.mode || data.mode === "normal") && data.layout?.includes("perPage")'
                                },
                                {
                                    name: 'maxButtons',
                                    label: (0, amis_editor_core_1.tipedLabel)('最多按钮数', '最多显示多少个分页按钮，最小为5，最大值为20'),
                                    type: 'input-number',
                                    min: 5,
                                    max: 20,
                                    pipeOut: function (value) { return value || 5; },
                                    visibleOn: '!data.mode || data.mode === "normal"'
                                }
                            ]
                        },
                        {
                            title: '状态',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('disabled'),
                                (0, amis_editor_core_1.getSchemaTpl)('hidden'),
                                (0, amis_editor_core_1.getSchemaTpl)('visible')
                            ]
                        }
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames', { isFormItem: false })
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
        _this.regions = [
            {
                key: 'body',
                label: '内容区'
            }
        ];
        return _this;
    }
    PaginationPlugin.id = 'PaginationPlugin';
    return PaginationPlugin;
}(amis_editor_core_1.BasePlugin));
exports.PaginationPlugin = PaginationPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(PaginationPlugin);
