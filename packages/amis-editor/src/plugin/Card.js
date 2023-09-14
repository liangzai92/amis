"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPlugin = void 0;
var tslib_1 = require("tslib");
var amis_ui_1 = require("amis-ui");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var flatten_1 = tslib_1.__importDefault(require("lodash/flatten"));
var amis_editor_core_4 = require("amis-editor-core");
var CardPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CardPlugin, _super);
    function CardPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'card';
        _this.$schema = '/schemas/CardSchema.json';
        // 组件名称
        _this.name = '卡片';
        _this.isBaseComponent = true;
        _this.description = '展示单个卡片。';
        _this.docLink = '/amis/zh-CN/components/card';
        _this.tags = ['展示'];
        _this.icon = '';
        _this.pluginIcon = 'card-plugin';
        _this.scaffold = {
            type: 'card',
            header: {
                title: '标题',
                subTitle: '副标题'
            },
            body: '内容',
            actions: [
                {
                    type: 'button',
                    label: '按钮',
                    actionType: 'dialog',
                    dialog: {
                        title: '标题',
                        body: '内容'
                    }
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                renderMethod: 'renderBody',
                preferTag: '展示'
            },
            {
                key: 'actions',
                label: '按钮组',
                renderMethod: 'renderActions',
                wrapperResolve: function (dom) { return dom; },
                preferTag: '按钮'
            }
        ];
        _this.panelTitle = '卡片';
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '常规',
                        body: (0, flatten_1.default)([
                            (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                            {
                                children: (react_1.default.createElement(amis_ui_1.Button, { size: "sm", className: "m-b-sm", level: "info", block: true, onClick: function () {
                                        // this.manager.showInsertPanel('actions', context.id)
                                        return _this.manager.showRendererPanel('按钮', '请从左侧组件面板中点击添加按钮元素');
                                    } }, "\u65B0\u589E\u6309\u94AE"))
                            },
                            {
                                children: (react_1.default.createElement("div", null,
                                    react_1.default.createElement(amis_ui_1.Button, { block: true, level: "primary", size: "sm", onClick: function () {
                                            // this.manager.showInsertPanel('body', context.id)
                                            return _this.manager.showRendererPanel('展示', '请从左侧组件面板中点击添加内容元素');
                                        } }, "\u65B0\u589E\u5185\u5BB9")))
                            },
                            {
                                type: 'divider'
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('cardTitle'),
                            (0, amis_editor_core_3.getSchemaTpl)('cardSubTitle'),
                            {
                                name: 'header.avatar',
                                type: 'input-text',
                                label: '图片地址',
                                description: '支持模板语法如： <code>\\${xxx}</code>'
                            },
                            {
                                name: 'href',
                                type: 'input-text',
                                label: '打开外部链接'
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('cardDesc'),
                            {
                                name: 'header.highlight',
                                type: 'input-text',
                                label: '是否高亮表达式',
                                description: '如： <code>this.isOwner</code>'
                            }
                        ])
                    },
                    {
                        title: '外观',
                        body: [
                            {
                                type: 'input-range',
                                name: 'actionsCount',
                                pipeIn: (0, amis_editor_core_3.defaultValue)(4),
                                min: 1,
                                max: 10,
                                step: 1,
                                label: '卡片一行最多能放按钮个数'
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                name: 'titleClassName',
                                label: '标题 CSS 类名'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                name: 'highlightClassName',
                                label: '高亮 CSS 类名'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                name: 'subTitleClassName',
                                label: '副标题 CSS 类名'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                name: 'descClassName',
                                label: '描述 CSS 类名'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                name: 'avatarClassName',
                                label: '图片外层 CSS 类名'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                name: 'imageClassName',
                                label: '图片 CSS 类名'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className', {
                                name: 'bodyClassName',
                                label: '内容区 CSS 类名'
                            }),
                            (0, amis_editor_core_3.getSchemaTpl)('className')
                        ]
                    },
                    {
                        title: '显隐',
                        body: [(0, amis_editor_core_3.getSchemaTpl)('ref'), (0, amis_editor_core_3.getSchemaTpl)('visible')]
                    }
                ])
            ];
        };
        /*exchangeRenderer(id: string) {
          this.manager.showReplacePanel(id, '展示');
        }*/
        _this.fieldWrapperResolve = function (dom) { return dom; };
        _this.overrides = {
            renderFeild: function (region, field, index, props) {
                var dom = this.super(region, field, index, props);
                var info = this.props.$$editor;
                if (!info || !field.$$id) {
                    return dom;
                }
                var plugin = info.plugin;
                var id = field.$$id;
                return (react_1.default.createElement(amis_editor_core_4.VRenderer, { type: info.type, plugin: info.plugin, renderer: info.renderer, multifactor: true, key: id, "$schema": "/schemas/CardBodyField.json", hostId: info.id, memberIndex: index, name: "".concat("\u5B57\u6BB5".concat(index + 1)), id: id, draggable: false, wrapperResolve: plugin.fieldWrapperResolve, schemaPath: "".concat(info.schemaPath, "/body/").concat(index), path: "".concat(this.props.$path, "/").concat(index), data: this.props.data }, dom));
            }
        };
        _this.vRendererConfig = {
            panelTitle: '字段',
            panelBodyCreator: function (context) {
                return [
                    (0, amis_editor_core_3.getSchemaTpl)('label'),
                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                        name: 'labelClassName',
                        label: 'Label CSS 类名',
                        visibleOn: 'this.label'
                    })
                    /*{
                      children: (
                        <Button
                          size="sm"
                          level="info"
                          className="m-b"
                          block
                          onClick={this.exchangeRenderer.bind(this, context.id)}
                        >
                          更改渲染器类型
                        </Button>
                      )
                    }*/
                ];
            }
        };
        return _this;
    }
    // 自动插入 label
    CardPlugin.prototype.beforeInsert = function (event) {
        var _a, _b, _c, _d;
        var context = event.context;
        if ((context.info.plugin === this ||
            ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) &&
            context.region === 'body') {
            context.data = tslib_1.__assign(tslib_1.__assign({}, context.data), { label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '列名称' });
        }
    };
    CardPlugin.id = 'CardPlugin';
    CardPlugin.scene = ['layout'];
    return CardPlugin;
}(amis_editor_core_2.BasePlugin));
exports.CardPlugin = CardPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CardPlugin);
