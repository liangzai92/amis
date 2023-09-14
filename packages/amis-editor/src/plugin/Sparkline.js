"use strict";
/**
 * @file 走势图
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparklinePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var SparklinePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(SparklinePlugin, _super);
    function SparklinePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'sparkline';
        _this.$schema = '/schemas/SparklineSchema.json';
        // 组件名称
        _this.name = '走势图';
        _this.isBaseComponent = true;
        _this.description = '用于内嵌展示简单图表';
        _this.docLink = '/amis/zh-CN/components/sparkline';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-area-chart';
        _this.pluginIcon = 'sparkline-plugin';
        _this.scaffold = {
            type: 'sparkline',
            height: 30,
            value: [3, 5, 2, 4, 1, 8, 3, 7]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '走势图';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                        (0, amis_editor_core_3.getSchemaTpl)('name')
                                    ]
                                },
                                {
                                    title: '宽高设置',
                                    body: [
                                        {
                                            name: 'width',
                                            type: 'input-number',
                                            label: '宽度'
                                        },
                                        {
                                            name: 'height',
                                            type: 'input-number',
                                            label: '高度'
                                        }
                                    ]
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('status')
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('theme:common', { exclude: ['layout'] })), false))
                    }
                ])
            ];
        };
        return _this;
    }
    SparklinePlugin.id = 'SparklinePlugin';
    return SparklinePlugin;
}(amis_editor_core_2.BasePlugin));
exports.SparklinePlugin = SparklinePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(SparklinePlugin);
