"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexPluginBase = exports.defaultFlexColumnSchema = void 0;
var tslib_1 = require("tslib");
/**
 * @file Flex 常见布局 1:3
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
// 默认的列容器Schema
var defaultFlexColumnSchema = function (title) {
    return {
        type: 'container',
        body: [],
        size: 'xs',
        style: {
            position: 'static',
            display: 'block',
            flex: '1 1 auto',
            flexGrow: 1,
            flexBasis: 'auto'
        },
        wrapperBody: false,
        isFixedHeight: false,
        isFixedWidth: false
    };
};
exports.defaultFlexColumnSchema = defaultFlexColumnSchema;
// 默认的布局容器Schema
var defaultFlexContainerSchema = {
    type: 'flex',
    className: 'p-1',
    items: [
        (0, exports.defaultFlexColumnSchema)('第一列'),
        (0, exports.defaultFlexColumnSchema)('第二列'),
        (0, exports.defaultFlexColumnSchema)('第三列')
    ],
    style: {
        position: 'relative'
    }
};
var FlexPluginBase = /** @class */ (function (_super) {
    tslib_1.__extends(FlexPluginBase, _super);
    function FlexPluginBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rendererName = 'flex';
        _this.$schema = '/schemas/FlexSchema.json';
        _this.disabledRendererPlugin = false;
        _this.name = '布局容器';
        _this.order = -1200;
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-columns';
        _this.pluginIcon = 'flex-container-plugin';
        _this.description = '布局容器 是基于 CSS Flex 实现的布局效果，它比 Grid 和 HBox 对子节点位置的可控性更强，比用 CSS 类的方式更易用';
        _this.docLink = '/amis/zh-CN/components/flex';
        _this.tags = ['布局容器'];
        _this.scaffold = defaultFlexContainerSchema;
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '布局容器';
        _this.panelJustify = true; // 右侧配置项默认左右展示
        _this.panelBodyCreator = function (context) {
            var _a, _b, _c;
            var curRendererSchema = (context === null || context === void 0 ? void 0 : context.schema) || {};
            var isRowContent = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row' ||
                (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row-reverse';
            var isFlexContainer = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexContainer(context === null || context === void 0 ? void 0 : context.id);
            var isFlexItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
            var isFlexColumnItem = (_c = _this.manager) === null || _c === void 0 ? void 0 : _c.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
            // 判断是否为吸附容器
            var isSorptionContainer = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.isSorptionContainer) || false;
            var positionTpl = [
                (0, amis_editor_core_2.getSchemaTpl)('layout:position', {
                    visibleOn: '!data.stickyStatus'
                }),
                (0, amis_editor_core_2.getSchemaTpl)('layout:originPosition'),
                (0, amis_editor_core_2.getSchemaTpl)('layout:inset', {
                    mode: 'vertical'
                })
            ];
            return [
                (0, amis_editor_core_2.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '布局',
                                    body: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([
                                        isSorptionContainer ? (0, amis_editor_core_2.getSchemaTpl)('layout:sorption') : null
                                    ], tslib_1.__read((isSorptionContainer ? [] : positionTpl)), false), [
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:flex-setting', {
                                            label: '弹性布局设置',
                                            direction: curRendererSchema.direction,
                                            justify: curRendererSchema.justify,
                                            alignItems: curRendererSchema.alignItems
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:flex-wrap')
                                    ], false), tslib_1.__read((isFlexItem
                                        ? [
                                            (0, amis_editor_core_2.getSchemaTpl)('layout:flex', {
                                                isFlexColumnItem: isFlexColumnItem,
                                                label: isFlexColumnItem ? '高度设置' : '宽度设置',
                                                visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
                                            }),
                                            (0, amis_editor_core_2.getSchemaTpl)('layout:flex-grow', {
                                                visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
                                            }),
                                            (0, amis_editor_core_2.getSchemaTpl)('layout:flex-basis', {
                                                label: isFlexColumnItem ? '弹性高度' : '弹性宽度',
                                                visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
                                            }),
                                            (0, amis_editor_core_2.getSchemaTpl)('layout:flex-basis', {
                                                label: isFlexColumnItem ? '固定高度' : '固定宽度',
                                                visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
                                            })
                                        ]
                                        : [])), false), [
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:overflow-x', {
                                            visibleOn: "".concat(isFlexItem && !isFlexColumnItem, " && data.style.flex === '0 0 150px'")
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:isFixedHeight', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem),
                                            onChange: function (value) {
                                                context === null || context === void 0 ? void 0 : context.node.setHeightMutable(value);
                                            }
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:height', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:max-height', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:min-height', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:overflow-y', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem, " && (data.isFixedHeight || data.style && data.style.maxHeight) || (").concat(isFlexItem && isFlexColumnItem, " && data.style.flex === '0 0 150px')")
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:isFixedWidth', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem),
                                            onChange: function (value) {
                                                context === null || context === void 0 ? void 0 : context.node.setWidthMutable(value);
                                            }
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:width', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:max-width', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:min-width', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:overflow-x', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
                                        }),
                                        !isFlexItem ? (0, amis_editor_core_2.getSchemaTpl)('layout:margin-center') : null,
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:z-index'),
                                        !isSorptionContainer &&
                                            (0, amis_editor_core_2.getSchemaTpl)('layout:sticky', {
                                                visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
                                            }),
                                        (0, amis_editor_core_2.getSchemaTpl)('layout:stickyPosition')
                                    ], false)
                                },
                                (0, amis_editor_core_2.getSchemaTpl)('status')
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        className: 'p-none',
                        body: (0, amis_editor_core_2.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([], tslib_1.__read((0, amis_editor_core_2.getSchemaTpl)('theme:common', { exclude: ['layout'] })), false))
                    }
                ])
            ];
        };
        _this.regions = [
            {
                key: 'items',
                label: '子节点集合'
            }
        ];
        return _this;
    }
    FlexPluginBase.prototype.buildEditorToolbar = function (_a, toolbars) {
        var _this = this;
        var _b, _c, _d, _e, _f, _g;
        var id = _a.id, info = _a.info, schema = _a.schema;
        var store = this.manager.store;
        var parent = store.getSchemaParentById(id);
        var draggableContainer = this.manager.draggableContainer(id);
        var isFlexItem = (_b = this.manager) === null || _b === void 0 ? void 0 : _b.isFlexItem(id);
        var isFlexColumnItem = (_c = this.manager) === null || _c === void 0 ? void 0 : _c.isFlexColumnItem(id);
        var newColumnSchema = (0, exports.defaultFlexColumnSchema)('新的一列');
        var canAppendSiblings = (_d = this.manager) === null || _d === void 0 ? void 0 : _d.canAppendSiblings();
        var toolbarsTooltips = {};
        toolbars.forEach(function (toolbar) {
            if (toolbar.tooltip) {
                toolbarsTooltips[toolbar.tooltip] = 1;
            }
        });
        // 列表组件中的直接容器元素不支持上下插入布局元素
        if (parent &&
            (((_e = info.renderer) === null || _e === void 0 ? void 0 : _e.name) === 'flex' || ((_f = info.renderer) === null || _f === void 0 ? void 0 : _f.name) === 'container') &&
            !draggableContainer &&
            !(schema === null || schema === void 0 ? void 0 : schema.isFreeContainer) &&
            canAppendSiblings) {
            // 非特殊布局元素（fixed、absolute）支持前后插入追加布局元素功能icon
            // 备注：如果是列级元素不需要显示
            if (!toolbarsTooltips['上方插入布局容器'] && !isFlexItem) {
                toolbars.push({
                    iconSvg: 'add-btn',
                    tooltip: '上方插入布局容器',
                    level: 'special',
                    placement: 'right',
                    className: 'ae-InsertBefore is-vertical',
                    onClick: function () {
                        return _this.manager.appendSiblingSchema(defaultFlexContainerSchema, true, true);
                    }
                }, {
                    iconSvg: 'add-btn',
                    tooltip: '下方插入布局容器',
                    level: 'special',
                    placement: 'right',
                    className: 'ae-InsertAfter is-vertical',
                    onClick: function () {
                        return _this.manager.appendSiblingSchema(defaultFlexContainerSchema, false, true);
                    }
                });
            }
            // 布局容器 右上角插入子元素
            if (((_g = info.renderer) === null || _g === void 0 ? void 0 : _g.name) === 'flex') {
                if (!toolbarsTooltips['新增列级元素']) {
                    toolbars.push({
                        iconSvg: 'add-btn',
                        tooltip: '新增列级元素',
                        level: 'special',
                        placement: 'bottom',
                        className: 'ae-AppendChild',
                        onClick: function () { return _this.manager.addElem(newColumnSchema); }
                    });
                }
            }
        }
        if (parent &&
            (parent.type === 'flex' || parent.type === 'container') &&
            isFlexItem &&
            !draggableContainer &&
            canAppendSiblings) {
            if (!toolbarsTooltips["".concat(isFlexColumnItem ? '上方' : '左侧', "\u63D2\u5165\u5217\u7EA7\u5BB9\u5668")]) {
                // 布局容器的列级元素 增加左右插入icon
                toolbars.push({
                    iconSvg: 'add-btn',
                    tooltip: "".concat(isFlexColumnItem ? '上方' : '左侧', "\u63D2\u5165\u5217\u7EA7\u5BB9\u5668"),
                    level: 'special',
                    placement: 'right',
                    className: isFlexColumnItem
                        ? 'ae-InsertBefore is-vertical'
                        : 'ae-InsertBefore',
                    onClick: function () {
                        return _this.manager.appendSiblingSchema(newColumnSchema, true, true);
                    }
                }, {
                    iconSvg: 'add-btn',
                    tooltip: "".concat(isFlexColumnItem ? '下方' : '右侧', "\u63D2\u5165\u5217\u7EA7\u5BB9\u5668"),
                    level: 'special',
                    placement: isFlexColumnItem ? 'right' : 'left',
                    className: isFlexColumnItem
                        ? 'ae-InsertAfter is-vertical'
                        : 'ae-InsertAfter',
                    onClick: function () {
                        return _this.manager.appendSiblingSchema(newColumnSchema, false, true);
                    }
                });
            }
        }
    };
    FlexPluginBase.prototype.afterResolveJsonSchema = function (event) {
        var _a, _b;
        var context = event.context;
        var parent = (_a = context.node.parent) === null || _a === void 0 ? void 0 : _a.host;
        if (((_b = parent === null || parent === void 0 ? void 0 : parent.info) === null || _b === void 0 ? void 0 : _b.plugin) === this) {
            event.setData('/schemas/FlexColumn.json');
        }
    };
    FlexPluginBase.id = 'FlexPluginBase';
    return FlexPluginBase;
}(amis_editor_core_1.LayoutBasePlugin));
exports.FlexPluginBase = FlexPluginBase;
