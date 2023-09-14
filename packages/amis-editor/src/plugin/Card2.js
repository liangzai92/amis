"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card2Plugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var Card2Plugin = /** @class */ (function (_super) {
    tslib_1.__extends(Card2Plugin, _super);
    function Card2Plugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'card2';
        _this.$schema = '/schemas/Card2Schema.json';
        // 组件名称
        _this.name = '卡片';
        _this.isBaseComponent = true;
        _this.disabledRendererPlugin = true;
        _this.description = '展示单个卡片。';
        _this.tags = ['展示'];
        _this.icon = '';
        _this.scaffold = {
            type: 'card2',
            body: '内容'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                renderMethod: 'renderBody',
                preferTag: '展示'
            }
        ];
        _this.panelTitle = '卡片';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    {
                                        type: 'button-group-select',
                                        label: (0, amis_editor_core_1.tipedLabel)('选择区域', '点击触发选中或取消选中的区域'),
                                        name: 'checkOnItemClick',
                                        options: [
                                            { label: '整个', value: true },
                                            { label: '选框', value: false }
                                        ],
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        label: (0, amis_editor_core_1.tipedLabel)('隐藏选框', '不再显示选择框，可以通过自定义选中态外观实现选中样式'),
                                        name: 'hideCheckToggler',
                                        visibleOn: 'this.checkOnItemClick'
                                    })
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: false })
                        ])
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                                isFormItem: false,
                                schema: [
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        name: 'bodyClassName',
                                        label: '内容区',
                                        visibleOn: 'this.icon'
                                    }),
                                    // TODO
                                    (0, amis_editor_core_1.getSchemaTpl)('className', {
                                        name: 'selectedClassName',
                                        label: '选中态',
                                        visibleOn: 'this.icon'
                                    })
                                ]
                            })
                        ])
                    }
                ])
            ];
        };
        return _this;
    }
    Card2Plugin.id = 'Card2Plugin';
    Card2Plugin.scene = ['layout'];
    return Card2Plugin;
}(amis_editor_core_1.BasePlugin));
exports.Card2Plugin = Card2Plugin;
(0, amis_editor_core_1.registerEditorPlugin)(Card2Plugin);
