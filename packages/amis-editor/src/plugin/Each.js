"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EachPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var util_1 = require("../util");
var lodash_1 = require("lodash");
var EachPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(EachPlugin, _super);
    function EachPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'each';
        _this.$schema = '/schemas/EachSchema.json';
        // 组件名称
        _this.name = '循环 Each';
        _this.isBaseComponent = true;
        _this.isListComponent = true;
        _this.memberImmutable = true;
        _this.description = '功能渲染器，可以基于现有变量循环输出渲染器。';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-repeat';
        _this.pluginIcon = 'each-plugin';
        _this.scaffold = {
            type: 'each',
            name: '',
            items: {
                type: 'container',
                body: [
                    {
                        type: 'container',
                        body: [
                            {
                                type: 'icon',
                                icon: 'fa fa-plane',
                                vendor: '',
                                themeCss: {
                                    className: {
                                        'padding-and-margin:default': {
                                            marginRight: '4px'
                                        },
                                        'font': {
                                            color: '#2856ad',
                                            fontSize: '20px'
                                        }
                                    }
                                }
                            },
                            {
                                type: 'tpl',
                                style: {
                                    fontWeight: 'var(--fonts-weight-3)',
                                    fontSize: '16px',
                                    color: 'var(--colors-brand-6)'
                                },
                                tpl: '回访数量TOP1',
                                inline: true,
                                wrapperComponent: ''
                            }
                        ],
                        style: {
                            position: 'static',
                            display: 'flex',
                            flexWrap: 'nowrap',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: '6px'
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
                                tpl: '北京分公司',
                                inline: true,
                                wrapperComponent: '',
                                style: {
                                    'fontSize': 'var(--fonts-size-4)',
                                    'color': 'var(--colors-neutral-text-2)',
                                    'fontWeight': 'var(--fonts-weight-3)',
                                    'font-family': '-apple-system'
                                }
                            }
                        ],
                        style: {
                            position: 'static',
                            display: 'block'
                        },
                        wrapperBody: false
                    }
                ],
                size: 'none',
                style: {
                    position: 'static',
                    display: 'block',
                    flex: '0 0 150px',
                    marginRight: '20px',
                    paddingTop: '20px',
                    paddingRight: '15px',
                    paddingBottom: '20px',
                    paddingLeft: '15px',
                    flexBasis: '250px',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    boxShadow: ' 0px 0px 8px 0px rgba(3, 3, 3, 0.1)',
                    radius: {
                        'top-left-border-radius': 'var(--borders-radius-3)',
                        'top-right-border-radius': 'var(--borders-radius-3)',
                        'bottom-left-border-radius': 'var(--borders-radius-3)',
                        'bottom-right-border-radius': 'var(--borders-radius-3)'
                    }
                },
                wrapperBody: false,
                isFixedHeight: false
            },
            placeholder: '',
            style: {
                position: 'static',
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '10px',
                marginBottom: '10px'
            },
            isFixedHeight: false,
            isFixedWidth: false,
            size: 'none'
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: ['a', 'b', 'c'] });
        _this.panelTitle = '循环';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
            var isFreeContainer = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.isFreeContainer) || false;
            var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
            var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
            var displayTpl = [
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
            ];
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
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
                                (0, amis_editor_core_3.getSchemaTpl)('formItemName', {
                                    label: '绑定字段名',
                                    paramType: 'output'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('valueFormula', {
                                    rendererSchema: {
                                        type: 'input-number',
                                        min: 1
                                    },
                                    name: 'maxLength',
                                    label: '最大显示个数',
                                    valueType: 'number'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('valueFormula', {
                                    rendererSchema: {
                                        type: 'input-text'
                                    },
                                    name: 'placeholder',
                                    label: '空数据提示'
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([
                        {
                            title: '布局',
                            body: tslib_1.__spreadArray(tslib_1.__spreadArray([
                                (0, amis_editor_core_3.getSchemaTpl)('layout:padding'),
                                (0, amis_editor_core_3.getSchemaTpl)('layout:position', {
                                    visibleOn: '!data.stickyStatus'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition'),
                                (0, amis_editor_core_3.getSchemaTpl)('layout:inset', {
                                    mode: 'vertical'
                                })
                            ], tslib_1.__read((!isFreeContainer ? displayTpl : [])), false), [
                                isFlexItem
                                    ? (0, amis_editor_core_3.getSchemaTpl)('layout:flex', {
                                        isFlexColumnItem: isFlexColumnItem,
                                        label: isFlexColumnItem ? '高度设置' : '宽度设置',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
                                    })
                                    : null,
                                isFlexItem
                                    ? (0, amis_editor_core_3.getSchemaTpl)('layout:flex-grow', {
                                        visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
                                    })
                                    : null,
                                isFlexItem
                                    ? (0, amis_editor_core_3.getSchemaTpl)('layout:flex-basis', {
                                        label: isFlexColumnItem ? '弹性高度' : '弹性宽度',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
                                    })
                                    : null,
                                isFlexItem
                                    ? (0, amis_editor_core_3.getSchemaTpl)('layout:flex-basis', {
                                        label: isFlexColumnItem ? '固定高度' : '固定宽度',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
                                    })
                                    : null,
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
                                !isFlexItem && !isFreeContainer
                                    ? (0, amis_editor_core_3.getSchemaTpl)('layout:textAlign', {
                                        name: 'style.textAlign',
                                        label: '内部对齐方式',
                                        visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
                                    })
                                    : null,
                                (0, amis_editor_core_3.getSchemaTpl)('layout:z-index'),
                                (0, amis_editor_core_3.getSchemaTpl)('layout:sticky', {
                                    visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('layout:stickyPosition')
                            ], false)
                        }
                    ], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('theme:common', { exclude: ['layout'] })), false))
                }
            ]);
        };
        return _this;
    }
    EachPlugin.prototype.filterProps = function (props) {
        var _a;
        // 列表类型内的文本元素显示{{公式}}或者自定义展位，不显示实际值
        props = (0, util_1.escapeFormula)(props);
        // 循环编辑态显示2个元素
        props.value = [{}, {}];
        props.className = "".concat(props.className || '', " ae-Editor-list");
        if (props.items && !((_a = props.items.className) === null || _a === void 0 ? void 0 : _a.includes('listItem'))) {
            props.items.className = "".concat(props.items.className || '', " ae-Editor-eachItem");
        }
        return props;
    };
    EachPlugin.prototype.buildDataSchemas = function (node, region) {
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
            // 循环添加索引方便渲染序号
            (0, lodash_1.set)(dataSchema, 'properties.index', {
                type: 'number',
                title: '索引'
            });
        }
        return dataSchema;
    };
    EachPlugin.id = 'EachPlugin';
    EachPlugin.scene = ['layout'];
    return EachPlugin;
}(amis_editor_core_2.BasePlugin));
exports.EachPlugin = EachPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(EachPlugin);
