"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var amis_editor_core_4 = require("amis-editor-core");
var helper_1 = require("../../renderer/event-control/helper");
var ItemPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ItemPlugin, _super);
    function ItemPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // panelTitle = '表单项通配';
        _this.panelTitle = '表单项';
        _this.order = -990;
        _this.pluginIcon = 'form-plugin';
        _this.panelBodyCreator = function (context) {
            var type = context.schema.type || '';
            var supportStatic = helper_1.SUPPORT_STATIC_FORMITEM_CMPTS.includes(type);
            var ignoreName = ~['button', 'submit', 'reset'].indexOf(type);
            var notRequiredName = ~[
                'button-toobar',
                'container',
                'fieldSet',
                'group',
                'grid',
                'hbox',
                'input-group',
                'panel',
                'service',
                'tabs',
                'table',
                'elevator',
                'static'
            ].indexOf(type);
            var hasReadOnly = ~[
                'switch',
                'wizard',
                'diff-editor',
                'editor',
                'input-rating',
                'input-text',
                'textarea'
            ].indexOf(type);
            /** 不支持配置校验属性的组件 */
            var ignoreValidator = !!~['input-group'].indexOf(type);
            var renderer = context.info.renderer;
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '常规',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                            ignoreName
                                ? null
                                : (0, amis_editor_core_3.getSchemaTpl)('formItemName', {
                                    required: notRequiredName ? false : true
                                }),
                            renderer.renderLabel !== false ? (0, amis_editor_core_3.getSchemaTpl)('label') : null,
                            hasReadOnly
                                ? (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    name: 'readOnly',
                                    label: '只读模式'
                                })
                                : null,
                            (0, amis_editor_core_3.getSchemaTpl)('disabled'),
                            ignoreValidator ? null : (0, amis_editor_core_3.getSchemaTpl)('required'),
                            (0, amis_editor_core_3.getSchemaTpl)('description'),
                            (0, amis_editor_core_3.getSchemaTpl)('placeholder'),
                            (0, amis_editor_core_3.getSchemaTpl)('remark', {
                                mode: 'row'
                            }),
                            renderer.renderLabel !== false
                                ? (0, amis_editor_core_3.getSchemaTpl)('labelRemark', {
                                    mode: 'row'
                                })
                                : null
                        ]
                    },
                    {
                        title: '外观',
                        body: tslib_1.__spreadArray([
                            (0, amis_editor_core_3.getSchemaTpl)('formItemMode'),
                            (0, amis_editor_core_3.getSchemaTpl)('horizontalMode'),
                            (0, amis_editor_core_3.getSchemaTpl)('horizontal', {
                                label: '',
                                visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
                            }),
                            renderer.sizeMutable !== false
                                ? (0, amis_editor_core_3.getSchemaTpl)('formItemSize', {
                                    options: [
                                        {
                                            label: '小',
                                            value: 'sm'
                                        },
                                        {
                                            label: '中',
                                            value: 'md'
                                        },
                                        {
                                            label: '大',
                                            value: 'lg'
                                        },
                                        {
                                            label: '默认（占满）',
                                            value: 'full'
                                        }
                                    ]
                                })
                                : null,
                            (0, amis_editor_core_3.getSchemaTpl)('formItemInline'),
                            (0, amis_editor_core_3.getSchemaTpl)('className'),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                label: 'Label CSS 类名',
                                name: 'labelClassName'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                label: '控件 CSS 类名',
                                name: 'inputClassName'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                label: '描述 CSS 类名',
                                name: 'descriptionClassName',
                                visibleOn: 'this.description'
                            })
                        ], tslib_1.__read((!supportStatic
                            ? []
                            : [
                                (0, amis_editor_core_3.getSchemaTpl)('className', {
                                    label: '静态 CSS 类名',
                                    name: 'staticClassName'
                                })
                            ])), false)
                    },
                    {
                        title: '显隐',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('visible'),
                            supportStatic ? (0, amis_editor_core_3.getSchemaTpl)('static') : null,
                            (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                name: 'clearValueOnHidden',
                                label: '隐藏时删除表单项值'
                            })
                        ]
                    },
                    ignoreValidator
                        ? null
                        : {
                            title: '验证',
                            body: [
                                // getSchemaTplByName('ref'),
                                (0, amis_editor_core_3.getSchemaTpl)('validations'),
                                (0, amis_editor_core_3.getSchemaTpl)('validationErrors'),
                                (0, amis_editor_core_3.getSchemaTpl)('validateOnChange'),
                                (0, amis_editor_core_3.getSchemaTpl)('submitOnChange'),
                                (0, amis_editor_core_3.getSchemaTpl)('api', {
                                    name: 'validateApi',
                                    label: '校验接口',
                                    description: '单独校验这个表单项的接口'
                                })
                            ]
                        }
                ])
            ];
        };
        return _this;
        // beforeInsert(event: PluginEvent<InsertEventContext>) {
        //   const context = event.context;
        //   if (
        //     context.region === 'controls' &&
        //     Array.isArray(context.subRenderer?.tags) &&
        //     !~context.subRenderer!.tags!.indexOf('表单项') &&
        //     ~context.subRenderer!.tags!.indexOf('展示')
        //   ) {
        //     context.data = {
        //       ...context.data,
        //       type: `static-${context.data.type}`,
        //       label: context.data.label || context.subRenderer!.name,
        //       name: context.data.name || 'var1'
        //     };
        //   }
        // }
    }
    ItemPlugin.prototype.buildEditorPanel = function (context, panels) {
        var thisPlugin = this;
        var renderer = context.info.renderer;
        var store = this.manager.store;
        if (context.selections.length) {
            return;
        }
        var plugin = context.info.plugin;
        // 如果是表单项
        if (!context.info.hostId &&
            (renderer === null || renderer === void 0 ? void 0 : renderer.isFormItem) &&
            !(plugin === null || plugin === void 0 ? void 0 : plugin.notRenderFormZone)) {
            panels.push({
                key: 'form-item',
                icon: 'fa fa-desktop',
                pluginIcon: thisPlugin.pluginIcon,
                title: this.panelTitle,
                render: this.manager.makeSchemaFormRender({
                    body: this.panelBodyCreator(context),
                    panelById: store.activeId,
                    formKey: 'form-item'
                }),
                order: -200
            });
        }
    };
    ItemPlugin.prototype.afterUpdate = function (event) {
        var _a, _b;
        var context = event.context;
        if (context.info.renderer.isFormItem &&
            ((_a = context.diff) === null || _a === void 0 ? void 0 : _a.some(function (change) { var _a; return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'value'; }))) {
            var change = (0, find_1.default)(context.diff, function (change) { var _a; return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'value'; });
            var component = (_b = this.manager.store
                .getNodeById(context.id)) === null || _b === void 0 ? void 0 : _b.getComponent();
            component === null || component === void 0 ? void 0 : component.props.onChange(change === null || change === void 0 ? void 0 : change.rhs);
        }
    };
    ItemPlugin.prototype.beforeReplace = function (event) {
        var context = event.context;
        if (context.info.renderer.isFormItem &&
            context.data &&
            context.subRenderer &&
            !~context.subRenderer.tags.indexOf('表单项') &&
            ~context.subRenderer.tags.indexOf('展示')) {
            context.data = tslib_1.__assign(tslib_1.__assign({}, context.data), { type: "static-".concat(context.data.type), label: context.data.label || context.schema.label, name: context.data.name || context.schema.name });
        }
        // 替换字段的时候保留 name
        if (context.schema) {
            context.data.name = context.schema.name || context.data.name;
        }
    };
    ItemPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var _this = this;
        var id = _a.id, schema = _a.schema, region = _a.region, selections = _a.selections;
        if (!selections.length || selections.length > 3) {
            // 单选或者超过3个选中态时直接返回
            return;
        }
        var arr = selections.concat();
        var first = arr.shift();
        var parent = first.node.parent;
        // 不在一个父节点，或者当前有非表单项，则直接跳过
        if (arr.some(function (elem) { var _a; return elem.node.parent !== parent || !((_a = elem.info.renderer) === null || _a === void 0 ? void 0 : _a.isFormItem); })) {
            // 备注：isFormItem在amis注册渲染器时生成，所有表单类渲染器isFormItem为true
            return;
        }
        menus.unshift({
            label: '合成一行',
            icon: 'merge-icon',
            onSelect: function () {
                var store = _this.manager.store;
                var arr = selections.concat();
                var first = arr.shift();
                var schema = store.schema;
                var group = [
                    tslib_1.__assign({}, first.schema)
                ];
                // 让后面的 JSONPipeIn 去变一个 id
                // 因为 update 的时候，group 不会变 id
                // 不能两个 id 一样，这样点选就乱了。
                delete group[0].$$id;
                arr.forEach(function (elem) {
                    group.push(elem.node.schema);
                    schema = (0, amis_editor_core_4.JSONDelete)(schema, elem.id);
                });
                var curNewGroup = (0, amis_editor_core_4.JSONPipeIn)({
                    type: 'group',
                    body: group
                });
                schema = (0, amis_editor_core_4.JSONUpdate)(schema, first.id, curNewGroup, true);
                store.traceableSetSchema(schema);
                setTimeout(function () {
                    // 合并成一行后自动选中父元素
                    store.setActiveId(first.id);
                }, 40);
            }
        }, '|');
    };
    ItemPlugin.id = 'ItemPlugin';
    return ItemPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ItemPlugin = ItemPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ItemPlugin);
