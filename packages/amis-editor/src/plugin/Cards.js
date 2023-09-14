"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var set_1 = tslib_1.__importDefault(require("lodash/set"));
var util_1 = require("../util");
var CardsPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CardsPlugin, _super);
    function CardsPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'cards';
        _this.$schema = '/schemas/CardsSchema.json';
        // 组件名称
        _this.name = '卡片列表';
        _this.isBaseComponent = true;
        _this.isListComponent = true;
        _this.memberImmutable = true;
        _this.description = '功能类似于表格，但是用一个个小卡片来展示数据。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。';
        _this.docLink = '/amis/zh-CN/components/cards';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-window-maximize';
        _this.pluginIcon = 'cards-plugin';
        _this.scaffold = {
            type: 'cards',
            columnsCount: 4,
            card: {
                type: 'container',
                body: [
                    {
                        type: 'container',
                        body: [
                            {
                                type: 'container',
                                body: [
                                    {
                                        type: 'icon',
                                        icon: 'fa fa-check',
                                        vendor: '',
                                        themeCss: {
                                            className: {
                                                'font': {
                                                    color: 'var(--colors-brand-6)',
                                                    fontSize: '20px'
                                                },
                                                'padding-and-margin:default': {
                                                    marginRight: '10px'
                                                }
                                            }
                                        }
                                    },
                                    {
                                        type: 'tpl',
                                        tpl: '流水线任务实例 ',
                                        inline: true,
                                        wrapperComponent: '',
                                        editorSetting: {
                                            mock: {}
                                        },
                                        style: {
                                            fontSize: 'var(--fonts-size-6)',
                                            color: 'var(--colors-neutral-text-2)',
                                            fontWeight: 'var(--fonts-weight-3)'
                                        }
                                    }
                                ],
                                style: {
                                    position: 'static',
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    alignItems: 'center',
                                    marginBottom: '15px'
                                },
                                wrapperBody: false,
                                isFixedHeight: false,
                                isFixedWidth: false,
                                size: 'none'
                            },
                            {
                                type: 'flex',
                                className: 'p-1',
                                items: [
                                    {
                                        type: 'container',
                                        body: [
                                            {
                                                type: 'container',
                                                body: [
                                                    {
                                                        type: 'tpl',
                                                        tpl: '12/',
                                                        inline: true,
                                                        wrapperComponent: '',
                                                        style: {
                                                            fontSize: 'var(--fonts-size-6)',
                                                            color: 'var(--colors-neutral-text-2)',
                                                            fontWeight: 'var(--fonts-weight-3)'
                                                        }
                                                    },
                                                    {
                                                        type: 'tpl',
                                                        tpl: '19',
                                                        inline: true,
                                                        wrapperComponent: '',
                                                        style: {
                                                            color: 'var(--colors-neutral-text-6)',
                                                            fontSize: 'var(--fonts-size-6)'
                                                        }
                                                    }
                                                ],
                                                style: {
                                                    position: 'static',
                                                    display: 'block',
                                                    flex: '0 0 auto',
                                                    marginTop: 'var(--sizes-size-0)',
                                                    marginRight: 'var(--sizes-size-0)',
                                                    marginBottom: 'var(--sizes-size-0)',
                                                    marginLeft: 'var(--sizes-size-0)'
                                                },
                                                wrapperBody: false,
                                                isFixedWidth: false,
                                                size: 'none'
                                            },
                                            {
                                                type: 'container',
                                                body: [
                                                    {
                                                        type: 'tpl',
                                                        tpl: '单元测试',
                                                        inline: true,
                                                        wrapperComponent: '',
                                                        style: {
                                                            color: 'var(--colors-neutral-text-5)'
                                                        }
                                                    }
                                                ],
                                                style: {
                                                    position: 'static',
                                                    display: 'flex',
                                                    flexWrap: 'nowrap',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flex: '0 0 auto'
                                                },
                                                wrapperBody: false,
                                                isFixedHeight: false,
                                                isFixedWidth: false,
                                                size: 'none'
                                            }
                                        ],
                                        size: 'xs',
                                        style: {
                                            position: 'static',
                                            display: 'flex',
                                            flex: '1 1 auto',
                                            flexGrow: 1,
                                            flexBasis: 'auto',
                                            flexWrap: 'nowrap',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        },
                                        wrapperBody: false,
                                        isFixedHeight: false,
                                        isFixedWidth: false
                                    },
                                    {
                                        type: 'container',
                                        body: [
                                            {
                                                type: 'tpl',
                                                tpl: '100%',
                                                inline: true,
                                                wrapperComponent: '',
                                                style: {
                                                    fontSize: 'var(--fonts-size-6)',
                                                    color: 'var(--colors-neutral-text-2)',
                                                    fontWeight: 'var(--fonts-weight-3)'
                                                }
                                            },
                                            {
                                                type: 'tpl',
                                                tpl: '通过率',
                                                inline: true,
                                                wrapperComponent: '',
                                                style: {
                                                    color: 'var(--colors-neutral-text-5)'
                                                }
                                            }
                                        ],
                                        size: 'xs',
                                        style: {
                                            position: 'static',
                                            display: 'flex',
                                            flex: '1 1 auto',
                                            flexGrow: 1,
                                            flexBasis: 'auto',
                                            flexWrap: 'nowrap',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        },
                                        wrapperBody: false,
                                        isFixedHeight: false,
                                        isFixedWidth: false
                                    },
                                    {
                                        type: 'container',
                                        body: [
                                            {
                                                type: 'tpl',
                                                tpl: '99.9%',
                                                inline: true,
                                                wrapperComponent: '',
                                                style: {
                                                    fontSize: 'var(--fonts-size-6)',
                                                    color: 'var(--colors-neutral-text-2)',
                                                    fontWeight: 'var(--fonts-weight-3)'
                                                }
                                            },
                                            {
                                                type: 'tpl',
                                                tpl: '任务实例',
                                                inline: true,
                                                wrapperComponent: '',
                                                style: {
                                                    color: 'var(--colors-neutral-text-5)'
                                                }
                                            }
                                        ],
                                        size: 'xs',
                                        style: {
                                            position: 'static',
                                            display: 'flex',
                                            flex: '1 1 auto',
                                            flexGrow: 1,
                                            flexBasis: 'auto',
                                            flexWrap: 'nowrap',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        },
                                        wrapperBody: false,
                                        isFixedHeight: false,
                                        isFixedWidth: false
                                    }
                                ],
                                style: {
                                    position: 'relative'
                                }
                            },
                            {
                                type: 'container',
                                body: [
                                    {
                                        type: 'tpl',
                                        tpl: '报告',
                                        inline: true,
                                        wrapperComponent: '',
                                        style: {
                                            fontSize: '14px',
                                            color: 'var(--colors-neutral-text-5)'
                                        }
                                    },
                                    {
                                        type: 'tpl',
                                        tpl: '2023-01-01 12:00',
                                        inline: true,
                                        wrapperComponent: '',
                                        style: {
                                            fontSize: '12px',
                                            color: 'var(--colors-neutral-text-6)'
                                        }
                                    }
                                ],
                                style: {
                                    position: 'static',
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    justifyContent: 'space-between',
                                    marginTop: '20px'
                                },
                                wrapperBody: false,
                                isFixedHeight: false,
                                isFixedWidth: false
                            }
                        ],
                        size: 'none',
                        style: {
                            'position': 'static',
                            'display': 'block',
                            'paddingTop': '10px',
                            'paddingRight': '10px',
                            'paddingBottom': '10px',
                            'paddingLeft': '10px',
                            'radius': {
                                'top-left-border-radius': '6px',
                                'top-right-border-radius': '6px',
                                'bottom-left-border-radius': '6px',
                                'bottom-right-border-radius': '6px'
                            },
                            'top-border-width': 'var(--borders-width-4)',
                            'left-border-width': 'var(--borders-width-2)',
                            'right-border-width': 'var(--borders-width-2)',
                            'bottom-border-width': 'var(--borders-width-2)',
                            'top-border-style': 'var(--borders-style-2)',
                            'left-border-style': 'var(--borders-style-2)',
                            'right-border-style': 'var(--borders-style-2)',
                            'bottom-border-style': 'var(--borders-style-2)',
                            'top-border-color': 'var(--colors-brand-6)',
                            'left-border-color': 'var(--colors-brand-10)',
                            'right-border-color': 'var(--colors-brand-10)',
                            'bottom-border-color': 'var(--colors-brand-10)',
                            'flex': '0 0 150px',
                            'marginRight': '15px',
                            'flexBasis': '100%'
                        },
                        wrapperBody: false,
                        isFixedHeight: false,
                        isFixedWidth: true,
                        onEvent: {
                            click: {
                                weight: 0,
                                actions: []
                            }
                        }
                    }
                ],
                style: {
                    position: 'static',
                    display: 'flex',
                    width: '1000%',
                    margin: '0',
                    flexWrap: 'nowrap',
                    justifyContent: 'space-between'
                },
                isFixedHeight: false,
                isFixedWidth: true,
                wrapperBody: false
            },
            placeholder: '',
            name: '',
            style: {
                gutterX: 15,
                gutterY: 15
            }
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { className: 'text-left ' });
        _this.panelTitle = '卡片集';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var isCRUDBody = context.schema.type === 'crud';
            var curPosition = (_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.position;
            var isAbsolute = curPosition === 'fixed' || curPosition === 'absolute';
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    {
                                        type: 'input-text',
                                        label: '组件名称',
                                        name: 'editorSetting.displayName'
                                    },
                                    isCRUDBody
                                        ? null
                                        : (0, amis_editor_core_3.getSchemaTpl)('formItemName', {
                                            label: '绑定字段名'
                                        }),
                                    (0, amis_editor_core_3.getSchemaTpl)('cardsPlaceholder')
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('status')
                        ])
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([
                            {
                                title: '组件',
                                body: [
                                    {
                                        name: 'columnsCount',
                                        type: 'input-range',
                                        visibleOn: '!this.leftFixed',
                                        min: 0,
                                        max: 12,
                                        step: 1,
                                        label: '每行个数',
                                        description: '不设置时，由卡片 CSS 类名决定'
                                    },
                                    {
                                        type: 'input-number',
                                        label: '左右间距',
                                        name: 'style.gutterX'
                                    },
                                    {
                                        type: 'input-number',
                                        label: '上下间距',
                                        name: 'style.gutterY'
                                    },
                                    (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                        name: 'masonryLayout',
                                        label: '启用瀑布流'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', {
                                        visibleOn: isAbsolute ? isAbsolute : undefined,
                                        value: 'left-top'
                                    })
                                ]
                            }
                        ], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('theme:common', { exclude: ['layout'] })), false))
                    }
                ])
            ];
        };
        return _this;
    }
    CardsPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var dataSchema = {
            $id: 'cards',
            type: 'object',
            title: '当前列表项',
            properties: {}
        };
        var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
        var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
        var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
        var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
        if ((0, amis_1.isObject)(schema === null || schema === void 0 ? void 0 : schema.items)) {
            dataSchema = tslib_1.__assign(tslib_1.__assign({}, dataSchema), schema.items);
            // 列表添加序号方便处理
            (0, set_1.default)(dataSchema, 'properties.index', {
                type: 'number',
                title: '索引'
            });
        }
        return dataSchema;
    };
    CardsPlugin.prototype.filterProps = function (props) {
        var _a;
        // 编辑时显示两行假数据
        var count = (props.columnsCount || 3) * 2;
        props.value = (0, amis_editor_core_4.repeatArray)({}, count).map(function (item, index) {
            return tslib_1.__assign(tslib_1.__assign({}, item), { id: index + 1 });
        });
        props.className = "".concat(props.className || '', " ae-Editor-list");
        props.itemsClassName = "".concat(props.itemsClassName || '', " cards-items");
        if (props.card && !((_a = props.card.className) === null || _a === void 0 ? void 0 : _a.includes('listItem'))) {
            props.card.className = "".concat(props.card.className || '', " ae-Editor-listItem");
        }
        // 列表类型内的文本元素显示原始公式
        props = (0, util_1.escapeFormula)(props);
        return props;
    };
    CardsPlugin.prototype.getRendererInfo = function (context) {
        var _a;
        var plugin = this;
        var renderer = context.renderer, schema = context.schema;
        if (!schema.$$id &&
            ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' &&
            renderer.name === 'cards') {
            return tslib_1.__assign(tslib_1.__assign({}, { id: schema.$$editor.id }), { name: plugin.name, regions: plugin.regions, patchContainers: plugin.patchContainers, vRendererConfig: plugin.vRendererConfig, wrapperProps: plugin.wrapperProps, wrapperResolve: plugin.wrapperResolve, filterProps: plugin.filterProps, $schema: plugin.$schema, renderRenderer: plugin.renderRenderer, memberImmutable: plugin.memberImmutable });
        }
        return _super.prototype.getRendererInfo.call(this, context);
    };
    CardsPlugin.id = 'CardsPlugin';
    CardsPlugin.scene = ['layout'];
    return CardsPlugin;
}(amis_editor_core_2.BasePlugin));
exports.CardsPlugin = CardsPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CardsPlugin);
