"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var MarkdownPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(MarkdownPlugin, _super);
    function MarkdownPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'markdown';
        _this.$schema = '/schemas/MarkdownSchema.json';
        // 组件名称
        _this.name = 'Markdown';
        _this.isBaseComponent = true;
        _this.description = '展示 markdown 内容';
        _this.docLink = '/amis/zh-CN/components/markdown';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-file-text';
        _this.pluginIcon = 'markdown-plugin';
        _this.scaffold = {
            type: 'markdown',
            value: '## 这是标题'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = 'MD';
        _this.panelBodyCreator = function (context) {
            var isUnderField = /\/field\/\w+$/.test(context.path);
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '常规',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                            (0, amis_editor_core_3.getSchemaTpl)('markdownBody')
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
                ])
            ];
        };
        return _this;
    }
    MarkdownPlugin.id = 'MarkdownPlugin';
    MarkdownPlugin.scene = ['layout'];
    return MarkdownPlugin;
}(amis_editor_core_2.BasePlugin));
exports.MarkdownPlugin = MarkdownPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(MarkdownPlugin);
