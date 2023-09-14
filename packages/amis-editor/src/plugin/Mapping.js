"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var util_1 = require("../util");
var MappingPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(MappingPlugin, _super);
    function MappingPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'mapping';
        _this.$schema = '/schemas/MappingSchema.json';
        // 组件名称
        _this.name = '映射';
        _this.isBaseComponent = true;
        _this.description = '对现有值做映射展示，比如原始值是：1、2、3...，需要展示成：下线、上线、过期等等。';
        _this.docLink = '/amis/zh-CN/components/mapping';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-exchange';
        _this.pluginIcon = 'mapping-plugin';
        _this.scaffold = {
            type: 'mapping',
            value: 1,
            map: {
                1: '开心',
                2: '愤怒',
                3: '伤心',
                4: '冷漠',
                '*': '一般'
            },
            itemSchema: {
                type: 'tag',
                label: '${item}'
            }
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '映射';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isUnderField = /\/field\/\w+$/.test(context.path);
            return [
                (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    isUnderField
                                        ? {
                                            type: 'tpl',
                                            inline: false,
                                            className: 'text-info text-sm',
                                            tpl: '<p>当前为字段内容节点配置，选择上层还有更多配置</p>'
                                        }
                                        : null,
                                    (0, amis_editor_core_1.getSchemaTpl)('mapSourceControl'),
                                    {
                                        type: 'ae-switch-more',
                                        mode: 'normal',
                                        label: '自定义显示模板',
                                        bulk: false,
                                        name: 'itemSchema',
                                        formType: 'extend',
                                        form: {
                                            body: [
                                                {
                                                    type: 'button',
                                                    level: 'primary',
                                                    size: 'sm',
                                                    block: true,
                                                    onClick: _this.editDetail.bind(_this, context.id),
                                                    label: '配置显示模板'
                                                }
                                            ]
                                        },
                                        pipeIn: function (value) {
                                            return value !== undefined;
                                        },
                                        pipeOut: function (value, originValue, data) {
                                            if (value === true) {
                                                return {
                                                    type: 'tag',
                                                    label: "${".concat(_this.getDisplayField(data), " | default: \"-\"}")
                                                };
                                            }
                                            return value ? value : undefined;
                                        }
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                        pipeOut: function (value) {
                                            return value == null || value === '' ? undefined : value;
                                        }
                                    }),
                                    (0, amis_editor_core_1.getSchemaTpl)('placeholder', {
                                        pipeIn: (0, amis_editor_core_1.defaultValue)('-'),
                                        label: '占位符'
                                    })
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('status')
                        ])
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: 'CSS类名',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        label: '外层'
                                    })
                                ]
                            }
                        ])
                    }
                ])
            ];
        };
        return _this;
    }
    MappingPlugin.prototype.getDisplayField = function (data) {
        var _a;
        if (data.source ||
            (data.map &&
                Array.isArray(data.map) &&
                data.map[0] &&
                Object.keys(data.map[0]).length > 1)) {
            return (_a = data.labelField) !== null && _a !== void 0 ? _a : 'label';
        }
        return 'item';
    };
    MappingPlugin.prototype.filterProps = function (props) {
        // 禁止选中子节点
        props = (0, amis_editor_core_1.JSONPipeOut)(props);
        return props;
    };
    MappingPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
        var id = _a.id, info = _a.info, schema = _a.schema;
        if (info.renderer.name === 'mapping') {
            toolbars.push({
                icon: 'fa fa-expand',
                order: 100,
                tooltip: '配置显示模板',
                onClick: this.editDetail.bind(this, id)
            });
        }
    };
    MappingPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var id = _a.id, schema = _a.schema, region = _a.region, info = _a.info, selections = _a.selections;
        if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
            return;
        }
        if (info.renderer.name === 'mapping') {
            menus.push('|', {
                label: '配置显示模板',
                onSelect: this.editDetail.bind(this, id)
            });
        }
    };
    MappingPlugin.prototype.editDetail = function (id) {
        var _a;
        var _b;
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var defaultItemSchema = {
            type: 'tag',
            label: "${".concat(this.getDisplayField(value), "}")
        };
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置显示模板',
                value: (0, util_1.schemaToArray)((_b = value.itemSchema) !== null && _b !== void 0 ? _b : defaultItemSchema),
                slot: {
                    type: 'container',
                    body: '$$'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { itemSchema: (0, util_1.schemaArrayFormat)(newValue) });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_1.diff)(value, newValue));
                },
                data: (_a = {},
                    _a[value.labelField || 'label'] = '假数据',
                    _a[value.valueField || 'value'] = '假数据',
                    _a.item = '假数据',
                    _a)
            });
    };
    MappingPlugin.id = 'MappingPlugin';
    MappingPlugin.scene = ['layout'];
    return MappingPlugin;
}(amis_editor_core_1.BasePlugin));
exports.MappingPlugin = MappingPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(MappingPlugin);
