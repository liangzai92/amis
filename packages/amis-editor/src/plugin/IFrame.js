"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFramePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var IFramePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(IFramePlugin, _super);
    function IFramePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'iframe';
        _this.$schema = '/schemas/IFrameSchema.json';
        // 组件名称
        _this.name = 'iFrame';
        _this.isBaseComponent = true;
        _this.description = '可以用来嵌入现有页面。';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-window-maximize';
        _this.pluginIcon = 'iframe-plugin';
        _this.scaffold = {
            type: 'iframe',
            src: '//www.baidu.com'
        };
        _this.previewSchema = {
            type: 'tpl',
            tpl: 'iFrame'
        };
        _this.panelTitle = 'iFrame';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_3.getSchemaTpl)('textareaFormulaControl', {
                                    name: 'src',
                                    mode: 'normal',
                                    label: '页面地址'
                                })
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('style:widthHeight', {
                                        widthSchema: {
                                            label: (0, amis_editor_core_2.tipedLabel)('宽度', '默认宽度为父容器宽度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                            pipeIn: (0, amis_editor_core_3.defaultValue)('100%')
                                        },
                                        heightSchema: {
                                            label: (0, amis_editor_core_2.tipedLabel)('高度', '默认高度为父容器高度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                            pipeIn: (0, amis_editor_core_3.defaultValue)('100%')
                                        }
                                    })
                                ]
                            }
                        ], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('theme:common', { exclude: ['layout'] })), false))
                    ]
                }
            ]);
        };
        return _this;
    }
    IFramePlugin.prototype.renderRenderer = function (props) {
        return this.renderPlaceholder("IFrame \u9875\u9762\uFF08".concat(props.src, "\uFF09"), props.key, props.style);
    };
    IFramePlugin.id = 'IFramePlugin';
    return IFramePlugin;
}(amis_editor_core_2.BasePlugin));
exports.IFramePlugin = IFramePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(IFramePlugin);
