"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelinePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var util_1 = require("../util");
var TimelinePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TimelinePlugin, _super);
    function TimelinePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rendererName = 'timeline';
        _this.$schema = '/schemas/TimelineSchema.json';
        _this.name = '时间轴';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-bars';
        _this.description = '用来展示时间轴';
        _this.docLink = '/amis/zh-CN/components/timeline';
        _this.tags = ['展示'];
        _this.scaffold = {
            type: 'timeline',
            label: '时间轴',
            name: 'timeline',
            items: [
                { time: '2012-12-21', title: '节点示例数据' },
                { time: '2012-12-24', title: '节点示例数据' },
                { time: '2012-12-27', title: '节点示例数据' }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '时间轴';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_2.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_2.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_2.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('label'),
                                {
                                    label: '排序',
                                    name: 'reverse',
                                    value: false,
                                    type: 'button-group-select',
                                    inline: false,
                                    size: 'sm',
                                    options: [
                                        { label: '正序', value: false },
                                        { label: '反序', value: true }
                                    ]
                                },
                                {
                                    label: '时间轴方向',
                                    name: 'direction',
                                    value: 'vertical',
                                    type: 'button-group-select',
                                    size: 'sm',
                                    inline: true,
                                    options: [
                                        { label: '垂直', value: 'vertical' },
                                        { label: '水平', value: 'horizontal' }
                                    ]
                                },
                                {
                                    label: (0, amis_editor_core_1.tipedLabel)('文字位置', '文字相对时间轴位置'),
                                    name: 'mode',
                                    value: 'right',
                                    type: 'button-group-select',
                                    visibleOn: 'data.direction === "vertical"',
                                    size: 'sm',
                                    options: [
                                        { label: '左侧', value: 'right' },
                                        { label: '右侧', value: 'left' },
                                        { label: '两侧交替', value: 'alternate' }
                                    ]
                                }
                            ]
                        },
                        {
                            title: '数据',
                            body: [
                                (0, amis_editor_core_2.getSchemaTpl)('timelineItemControl', {
                                    name: 'items',
                                    mode: 'normal'
                                }),
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    label: '自定义标题显示模板',
                                    bulk: false,
                                    name: 'itemTitleSchema',
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                type: 'button',
                                                level: 'primary',
                                                size: 'sm',
                                                block: true,
                                                onClick: _this.editDetail.bind(_this, context),
                                                label: '配置标题显示模板'
                                            }
                                        ]
                                    },
                                    pipeIn: function (value) {
                                        if (typeof value === 'undefined') {
                                            return false;
                                        }
                                        return typeof value !== 'string';
                                    },
                                    pipeOut: function (value) {
                                        if (value === true) {
                                            return {
                                                type: 'tpl',
                                                tpl: '请编辑标题内容'
                                            };
                                        }
                                        return value ? value : undefined;
                                    }
                                }
                            ]
                        },
                        (0, amis_editor_core_2.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_2.getSchemaTpl)('style:classNames', {
                            isFormItem: false,
                            schema: [
                                (0, amis_editor_core_2.getSchemaTpl)('className', {
                                    name: 'timeClassName',
                                    label: '时间区'
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('className', {
                                    name: 'titleClassName',
                                    label: '标题区'
                                }),
                                (0, amis_editor_core_2.getSchemaTpl)('className', {
                                    name: 'detailClassName',
                                    label: '详情区'
                                })
                            ]
                        })
                    ])
                }
            ]);
        };
        return _this;
    }
    TimelinePlugin.prototype.editDetail = function (context) {
        var _a;
        var id = context.id, schema = context.schema;
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var defaultItemSchema = {
            type: 'tpl',
            tpl: '请编辑标题内容'
        };
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置标题显示模板',
                value: (0, util_1.schemaToArray)((_a = value.itemTitleSchema) !== null && _a !== void 0 ? _a : defaultItemSchema),
                slot: {
                    type: 'container',
                    body: '$$'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { itemTitleSchema: (0, util_1.schemaArrayFormat)(newValue) });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_2.diff)(value, newValue));
                },
                data: schema
            });
    };
    TimelinePlugin.id = 'TimelinePlugin';
    return TimelinePlugin;
}(amis_editor_core_3.BasePlugin));
exports.TimelinePlugin = TimelinePlugin;
(0, amis_editor_core_2.registerEditorPlugin)(TimelinePlugin);
