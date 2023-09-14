"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapperPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var WrapperPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(WrapperPlugin, _super);
    function WrapperPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'wrapper';
        _this.$schema = '/schemas/WrapperSchema.json';
        _this.disabledRendererPlugin = true; // 组件面板不显示
        // 组件名称
        _this.name = '包裹';
        _this.isBaseComponent = true;
        _this.description = '类似于容器，唯一的区别在于会默认会有一层内边距。';
        _this.docLink = '/amis/zh-CN/components/wrapper';
        _this.tags = ['容器'];
        _this.icon = 'fa fa-square-o';
        _this.scaffold = {
            type: 'wrapper',
            body: '内容'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.regions = [
            {
                key: 'body',
                label: '内容区'
            }
        ];
        _this.panelTitle = '包裹';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
            // const isFlexContainer = this.manager?.isFlexContainer(context?.id);
            var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
            var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '布局',
                                    body: tslib_1.__spreadArray(tslib_1.__spreadArray([
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:position', {
                                            visibleOn: '!data.stickyStatus'
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition'),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:inset', {
                                            mode: 'vertical'
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:display'),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:flex-setting', {
                                            visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")',
                                            direction: curRendererSchema.direction,
                                            justify: curRendererSchema.justify,
                                            alignItems: curRendererSchema.alignItems
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:flex-wrap', {
                                            visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")'
                                        })
                                    ], tslib_1.__read((isFlexItem
                                        ? [
                                            (0, amis_editor_core_3.getSchemaTpl)('layout:flex', {
                                                isFlexColumnItem: isFlexColumnItem,
                                                label: isFlexColumnItem ? '高度设置' : '宽度设置',
                                                visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('layout:flex-grow', {
                                                visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('layout:flex-basis', {
                                                label: isFlexColumnItem ? '弹性高度' : '弹性宽度',
                                                visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
                                            }),
                                            (0, amis_editor_core_3.getSchemaTpl)('layout:flex-basis', {
                                                label: isFlexColumnItem ? '固定高度' : '固定宽度',
                                                visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
                                            })
                                        ]
                                        : [])), false), [
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:overflow-x', {
                                            visibleOn: "".concat(isFlexItem && !isFlexColumnItem, " && data.style.flex === '0 0 150px'")
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:isFixedHeight', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem),
                                            onChange: function (value) {
                                                context === null || context === void 0 ? void 0 : context.node.setHeightMutable(value);
                                            }
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:height', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:max-height', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:min-height', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:overflow-y', {
                                            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem, " && (data.isFixedHeight || data.style && data.style.maxHeight) || (").concat(isFlexItem && isFlexColumnItem, " && data.style.flex === '0 0 150px')")
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:isFixedWidth', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem),
                                            onChange: function (value) {
                                                context === null || context === void 0 ? void 0 : context.node.setWidthMutable(value);
                                            }
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:width', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:max-width', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:min-width', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                        }),
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:overflow-x', {
                                            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
                                        }),
                                        !isFlexItem ? (0, amis_editor_core_3.getSchemaTpl)('layout:margin-center') : null,
                                        !isFlexItem
                                            ? (0, amis_editor_core_3.getSchemaTpl)('layout:textAlign', {
                                                name: 'style.textAlign',
                                                label: '内部对齐方式',
                                                visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
                                            })
                                            : null,
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:z-index')
                                    ], false)
                                },
                                {
                                    title: '常用',
                                    body: [(0, amis_editor_core_3.getSchemaTpl)('layout:padding')]
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('status')
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        className: 'p-none',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('style:common', ['layout'])), false), [
                            {
                                title: 'CSS 类名',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                                        description: '设置样式后，大小设置将无效。',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('bg-white')
                                    })
                                ]
                            }
                        ], false))
                    }
                ])
            ];
        };
        return _this;
    }
    WrapperPlugin.id = 'WrapperPlugin';
    WrapperPlugin.scene = ['layout'];
    return WrapperPlugin;
}(amis_editor_core_2.LayoutBasePlugin));
exports.WrapperPlugin = WrapperPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(WrapperPlugin);
