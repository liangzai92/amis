"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnToggler = void 0;
var tslib_1 = require("tslib");
var update_1 = tslib_1.__importDefault(require("lodash/update"));
var amis_editor_core_1 = require("amis-editor-core");
var ColumnToggler = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnToggler, _super);
    function ColumnToggler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rendererName = 'column-toggler';
        _this.name = '自定义显示列';
        _this.panelTitle = '自定义显示列';
        _this.icon = 'fa fa-square';
        _this.tags = ['自定义显示列'];
        _this.$schema = '/schemas/ColumnTogglerSchema.json';
        _this.description = '用来展示表格的自定义显示列按钮，你可以配置不同的展示样式。';
        _this.panelJustify = true;
        _this.isBaseComponent = true;
        _this.disabledRendererPlugin = true;
        _this.panelBodyCreator = function (context) {
            var _a, _b, _c, _d;
            var crud = (_a = context === null || context === void 0 ? void 0 : context.node) === null || _a === void 0 ? void 0 : _a.getClosestParentByType('crud2');
            if (crud) {
                _this.crudInfo = {
                    id: crud.id,
                    columns: crud.schema.columns || [],
                    schema: crud.schema
                };
            }
            var columns = ((_d = (_c = (_b = _this.crudInfo) === null || _b === void 0 ? void 0 : _b.schema) === null || _c === void 0 ? void 0 : _c.columns) !== null && _d !== void 0 ? _d : []).map(function (item, index) { return ({
                label: item.title,
                value: index
            }); });
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    label: '按钮文字',
                                    type: 'input-text',
                                    name: 'label'
                                },
                                {
                                    label: '按钮提示',
                                    type: 'input-text',
                                    name: 'tooltip'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'defaultIsOpened',
                                    label: '是否默认展开'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                    label: '按钮图标'
                                })
                            ]
                        },
                        {
                            title: '列默认显示',
                            body: [
                                {
                                    name: "__toggled",
                                    value: '',
                                    type: 'checkboxes',
                                    // className: 'b-a p-sm',
                                    label: false,
                                    inline: false,
                                    joinValues: false,
                                    extractValue: true,
                                    options: columns,
                                    // style: {
                                    //   maxHeight: '200px',
                                    //   overflow: 'auto'
                                    // },
                                    pipeIn: function (value, form) {
                                        var _a, _b, _c;
                                        var showColumnIndex = [];
                                        (_c = (_b = (_a = _this.crudInfo) === null || _a === void 0 ? void 0 : _a.schema) === null || _b === void 0 ? void 0 : _b.columns) === null || _c === void 0 ? void 0 : _c.forEach(function (item, index) {
                                            if (item.toggled !== false) {
                                                showColumnIndex.push(index);
                                            }
                                        });
                                        return showColumnIndex;
                                    },
                                    onChange: function (value) {
                                        if (!_this.crudInfo) {
                                            return;
                                        }
                                        var newColumns = _this.crudInfo.schema.columns;
                                        newColumns = newColumns.map(function (item, index) { return (tslib_1.__assign(tslib_1.__assign({}, item), { toggled: value.includes(index) ? undefined : false })); });
                                        var updatedSchema = (0, update_1.default)(_this.crudInfo.schema, 'columns', function (origin) {
                                            return newColumns;
                                        });
                                        _this.manager.store.changeValueById(_this.crudInfo.id, updatedSchema);
                                        _this.crudInfo.schema = updatedSchema;
                                    }
                                }
                            ]
                        }
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('size', {
                                    label: '按钮尺寸'
                                })
                            ]
                        },
                        {
                            title: 'CSS 类名',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'className',
                                    label: '显示列样式'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'btnClassName',
                                    label: '按钮样式'
                                })
                            ]
                        }
                    ])
                }
            ]);
        };
        return _this;
    }
    /**
     * 如果禁用了没办法编辑
     */
    ColumnToggler.prototype.filterProps = function (props) {
        props.disabled = false;
        return props;
    };
    /**
     * 如果配置里面有 rendererName 自动返回渲染器信息。
     * @param renderer
     */
    ColumnToggler.prototype.getRendererInfo = function (_a) {
        var renderer = _a.renderer, schema = _a.schema;
        var plugin = this;
        if (schema.$$id &&
            plugin.name &&
            plugin.rendererName &&
            plugin.rendererName === renderer.name) {
            // 复制部分信息出去
            return {
                name: schema.label ? schema.label : plugin.name,
                regions: plugin.regions,
                patchContainers: plugin.patchContainers,
                // wrapper: plugin.wrapper,
                vRendererConfig: plugin.vRendererConfig,
                wrapperProps: plugin.wrapperProps,
                wrapperResolve: plugin.wrapperResolve,
                filterProps: plugin.filterProps,
                $schema: plugin.$schema,
                renderRenderer: plugin.renderRenderer
            };
        }
    };
    ColumnToggler.id = 'ColumnToggler';
    return ColumnToggler;
}(amis_editor_core_1.BasePlugin));
exports.ColumnToggler = ColumnToggler;
(0, amis_editor_core_1.registerEditorPlugin)(ColumnToggler);
