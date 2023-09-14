"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var set_1 = tslib_1.__importDefault(require("lodash/set"));
var util_1 = require("../util");
var ListPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ListPlugin, _super);
    function ListPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'list';
        _this.$schema = '/schemas/ListSchema.json';
        // 组件名称
        _this.name = '列表';
        _this.isBaseComponent = true;
        _this.isListComponent = true;
        _this.disabledRendererPlugin = true;
        _this.memberImmutable = true;
        _this.description = '展示一个列表，可以自定标题、副标题，内容及按钮组部分。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。';
        _this.docLink = '/amis/zh-CN/components/list';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-list';
        _this.pluginIcon = 'list-plugin';
        _this.scaffold = {
            type: 'list',
            listItem: {
                body: [
                    {
                        type: 'tpl',
                        tpl: '简单的展示数据：$a $b',
                        wrapperComponent: ''
                    }
                ],
                actions: [
                    {
                        icon: 'fa fa-eye',
                        type: 'button'
                    }
                ]
            }
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { items: [
                { a: 1, b: 2 },
                { a: 3, b: 4 },
                { a: 5, b: 6 }
            ] });
        _this.panelTitle = '列表';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isCRUDBody = ['crud', 'crud2'].includes(context.schema.type);
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                // {
                                //   children: (
                                //     <Button
                                //       level="primary"
                                //       size="sm"
                                //       block
                                //       onClick={this.editDetail.bind(this, context.id)}
                                //     >
                                //       配置成员详情
                                //     </Button>
                                //   )
                                // },
                                // {
                                //   type: 'divider'
                                // },
                                {
                                    name: 'title',
                                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                    label: '标题'
                                },
                                isCRUDBody
                                    ? null
                                    : (0, amis_editor_core_3.getSchemaTpl)('formItemName', {
                                        label: '绑定字段名'
                                    }),
                                {
                                    name: 'placeholder',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)('没有数据'),
                                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                    label: '无数据提示'
                                },
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    formType: 'extend',
                                    label: '头部',
                                    name: 'showHeader',
                                    form: {
                                        body: [
                                            {
                                                children: (react_1.default.createElement(amis_1.Button, { level: "primary", size: "sm", block: true, onClick: _this.editHeaderDetail.bind(_this, context.id) }, "\u914D\u7F6E\u5934\u90E8"))
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    formType: 'extend',
                                    label: '底部',
                                    name: 'showFooter',
                                    form: {
                                        body: [
                                            {
                                                children: (react_1.default.createElement(amis_1.Button, { level: "primary", size: "sm", block: true, onClick: _this.editFooterDetail.bind(_this, context.id) }, "\u914D\u7F6E\u5E95\u90E8"))
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: 'CSS类名',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('className', {
                                    label: '外层'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('className', {
                                    name: 'itemClassName',
                                    label: 'ListItem'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('className', {
                                    name: 'headerClassName',
                                    label: '头部'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('className', {
                                    name: 'footerClassName',
                                    label: '底部'
                                })
                            ]
                        }
                    ])
                }
            ]);
        };
        return _this;
    }
    ListPlugin.prototype.filterProps = function (props) {
        if (props.isSlot) {
            props.value = [props.data];
            return props;
        }
        var data = tslib_1.__assign(tslib_1.__assign({}, props.defaultData), props.data);
        var arr = (0, util_1.resolveArrayDatasource)({
            value: props.value,
            data: data,
            source: props.source
        });
        if (!Array.isArray(arr) || !arr.length) {
            var mockedData = this.buildMockData();
            props.value = (0, amis_editor_core_4.repeatArray)(mockedData, 1).map(function (item, index) { return (tslib_1.__assign(tslib_1.__assign({}, item), { id: index + 1 })); });
        }
        var $schema = props.$schema, rest = tslib_1.__rest(props, ["$schema"]);
        return tslib_1.__assign(tslib_1.__assign({}, rest), { $schema: $schema });
    };
    ListPlugin.prototype.buildMockData = function () {
        return {
            id: 666,
            title: '假数据',
            description: '假数据',
            a: '假数据',
            b: '假数据'
        };
    };
    ListPlugin.prototype.editHeaderDetail = function (id) {
        var _a;
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var defaultHeader = {
            type: 'tpl',
            tpl: '头部',
            wrapperComponent: ''
        };
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置头部',
                value: (0, util_1.schemaToArray)((_a = value.header) !== null && _a !== void 0 ? _a : defaultHeader),
                slot: {
                    type: 'container',
                    body: '$$'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { header: (0, util_1.schemaArrayFormat)(newValue) });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_4.diff)(value, newValue));
                }
            });
    };
    ListPlugin.prototype.editFooterDetail = function (id) {
        var _a;
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var defaultFooter = {
            type: 'tpl',
            tpl: '底部',
            wrapperComponent: ''
        };
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置底部',
                value: (0, util_1.schemaToArray)((_a = value.footer) !== null && _a !== void 0 ? _a : defaultFooter),
                slot: {
                    type: 'container',
                    body: '$$'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { footer: (0, util_1.schemaArrayFormat)(newValue) });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_4.diff)(value, newValue));
                }
            });
    };
    ListPlugin.prototype.editDetail = function (id) {
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置成员渲染器',
                value: tslib_1.__assign({}, value.listItem),
                slot: {
                    type: 'list',
                    listItem: '$$'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { listItem: newValue });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_4.diff)(value, newValue));
                },
                data: {
                    // TODO  默认数据不对
                    items: [this.buildMockData()]
                }
            });
    };
    ListPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
        var id = _a.id, info = _a.info, schema = _a.schema;
        if (info.renderer.name === 'list' ||
            (info.renderer.name === 'crud' && schema.mode === 'list')) {
            toolbars.push({
                icon: 'fa fa-expand',
                order: 100,
                tooltip: '配置成员渲染器',
                onClick: this.editDetail.bind(this, id)
            });
        }
    };
    ListPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var dataSchema = {
            $id: 'each',
            type: 'object',
            title: '当前循环项',
            properties: {}
        };
        var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
        var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
        var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
        var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
        if ((0, amis_1.isObject)(schema === null || schema === void 0 ? void 0 : schema.items)) {
            dataSchema = tslib_1.__assign(tslib_1.__assign({}, dataSchema), schema.items);
            // 循环添加序号方便处理
            (0, set_1.default)(dataSchema, 'properties.index', {
                type: 'number',
                title: '序号'
            });
        }
        return dataSchema;
    };
    ListPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var id = _a.id, schema = _a.schema, region = _a.region, info = _a.info, selections = _a.selections;
        if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
            return;
        }
        if (info.renderer.name === 'list' ||
            (info.renderer.name === 'crud' && schema.mode === 'list')) {
            menus.push('|', {
                label: '配置成员渲染器',
                onSelect: this.editDetail.bind(this, id)
            });
        }
    };
    // 为了能够自动注入数据。
    ListPlugin.prototype.getRendererInfo = function (context) {
        var _a;
        var plugin = this;
        var renderer = context.renderer, schema = context.schema;
        if (!schema.$$id &&
            ['crud', 'crud2'].includes((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) &&
            renderer.name === 'list') {
            return tslib_1.__assign(tslib_1.__assign({}, { id: schema.$$editor.id }), { name: plugin.name, regions: plugin.regions, patchContainers: plugin.patchContainers, vRendererConfig: plugin.vRendererConfig, wrapperProps: plugin.wrapperProps, wrapperResolve: plugin.wrapperResolve, filterProps: plugin.filterProps, $schema: plugin.$schema, renderRenderer: plugin.renderRenderer, memberImmutable: plugin.memberImmutable });
        }
        return _super.prototype.getRendererInfo.call(this, context);
    };
    ListPlugin.id = 'ListPlugin';
    return ListPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ListPlugin = ListPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ListPlugin);
