"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeViewPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file 代码高亮显示
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var CodeViewPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CodeViewPlugin, _super);
    function CodeViewPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'code';
        _this.$schema = '/schemas/CodeSchema.json';
        // 组件名称
        _this.name = '代码高亮';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-code';
        _this.pluginIcon = 'code-plugin';
        _this.description = '代码高亮';
        _this.docLink = '/amis/zh-CN/components/code';
        _this.tags = ['展示'];
        _this.scaffold = {
            type: 'code',
            language: 'html',
            value: '<div>html</div>'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '代码高亮';
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        {
                            type: 'input-text',
                            label: '名称',
                            name: 'name'
                        },
                        {
                            type: 'editor',
                            label: '固定值',
                            allowFullscreen: true,
                            name: 'value'
                        }
                    ]
                },
                {
                    title: '外观',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('className')]
                },
                {
                    title: '显隐',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('ref'), (0, amis_editor_core_3.getSchemaTpl)('visible')]
                }
            ]);
        };
        return _this;
    }
    CodeViewPlugin.id = 'CodeViewPlugin';
    return CodeViewPlugin;
}(amis_editor_core_2.BasePlugin));
exports.CodeViewPlugin = CodeViewPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CodeViewPlugin);
