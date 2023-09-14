"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file 日志组件
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var LogPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(LogPlugin, _super);
    function LogPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'log';
        _this.$schema = '/schemas/LogSchema.json';
        // 组件名称
        _this.name = '日志';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-file-text-o';
        _this.pluginIcon = 'log-plugin';
        _this.description = '用来实时显示日志';
        _this.docLink = '/amis/zh-CN/components/log';
        _this.tags = ['展示'];
        _this.previewSchema = {
            type: 'log',
            height: 120,
            autoScroll: true
        };
        _this.scaffold = {
            type: 'log',
            autoScroll: true,
            height: 500,
            encoding: 'utf-8'
        };
        _this.panelJustify = true;
        _this.panelTitle = '日志';
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                                    required: true,
                                    name: 'source',
                                    renderLabel: true,
                                    label: (0, amis_editor_core_3.tipedLabel)('数据源', "\u8FD4\u56DE\u65E5\u5FD7\u4FE1\u606F\u7684\u670D\u52A1\uFF0C\u540E\u7AEF\u9700\u8981\u901A\u8FC7\u6D41\u7684\u65B9\u5F0F\u8FD4\u56DE\u7ED3\u679C\u3002\n                  \u53EF\u53C2\u8003<a target=\"_blank\" href=\"https://baidu.github.io/amis/zh-CN/components/log#%E5%90%8E%E7%AB%AF%E5%AE%9E%E7%8E%B0%E5%8F%82%E8%80%83\">\u793A\u4F8B</a>")
                                }),
                                {
                                    type: 'input-text',
                                    label: (0, amis_editor_core_3.tipedLabel)('文本编码', '返回内容的字符编码，例如 UTF-8、ISO-8859-2、KOI8-R、GBK等等。默认UTF-8'),
                                    name: 'encoding'
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('placeholder', {
                                    label: '加载提示',
                                    placeholder: '加载中'
                                }),
                                {
                                    type: 'switch',
                                    label: (0, amis_editor_core_3.tipedLabel)('跟随底部', '自动滚动到底部，方便查看最新日志内容'),
                                    name: 'autoScroll',
                                    value: true,
                                    inputClassName: 'is-inline'
                                },
                                {
                                    label: (0, amis_editor_core_3.tipedLabel)('操作', '可在日志顶部添加以下操作按钮'),
                                    type: 'checkboxes',
                                    name: 'operation',
                                    inline: false,
                                    options: [
                                        {
                                            label: '停止',
                                            value: 'stop'
                                        },
                                        {
                                            label: '刷新',
                                            value: 'restart'
                                        },
                                        {
                                            label: '清空',
                                            value: 'clear'
                                        },
                                        {
                                            label: '隐藏行号',
                                            value: 'showLineNumber'
                                        },
                                        {
                                            label: '查询',
                                            value: 'filter'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: '性能优化',
                            body: [
                                {
                                    type: 'input-number',
                                    label: (0, amis_editor_core_3.tipedLabel)('每行高度', "\u8BBE\u7F6E\u6BCF\u884C\u9AD8\u5EA6\uFF0C\u8FD9\u65F6\u5C31\u4F1A\u9ED8\u8BA4\u542F\u7528\u865A\u62DF\u6E32\u67D3\uFF0C\u907F\u514D\u6E32\u67D3\u5361\u987F\u3002\n                    <ul><li>\u4F18\u70B9\uFF1A\u4ECD\u7136\u53EF\u4EE5\u67E5\u770B\u6240\u6709\u65E5\u5FD7</li>\n                    <li>\u7F3A\u70B9\uFF1A\u5982\u679C\u67D0\u4E00\u884C\u65E5\u5FD7\u5F88\u957F\u4E5F\u4E0D\u4F1A\u81EA\u52A8\u6298\u884C\uFF0C\u4F1A\u51FA\u73B0\u6C34\u5E73\u6EDA\u52A8\u6761</li></ul>\n                "),
                                    name: 'rowHeight',
                                    min: 1
                                },
                                {
                                    type: 'input-number',
                                    label: (0, amis_editor_core_3.tipedLabel)('显示行数', "\u9650\u5236\u6700\u5927\u663E\u793A\u884C\u6570\uFF0C\u907F\u514D\u6E32\u67D3\u5361\u987F\uFF0C\u9ED8\u8BA4\u4E0D\u9650\u5236\u3002\n                    <ul><li>\u4F18\u70B9\uFF1A\u67D0\u4E00\u884C\u65E5\u5FD7\u5F88\u957F\u7684\u65F6\u5019\u4F1A\u81EA\u52A8\u6298\u884C</li>\n                    <li>\u7F3A\u70B9\uFF1A\u65E0\u6CD5\u67E5\u770B\u4E4B\u524D\u7684\u65E5\u5FD7</li></ul>\n                "),
                                    name: 'maxLength',
                                    min: 1
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status', { isFormItem: false })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    type: 'input-number',
                                    label: (0, amis_editor_core_3.tipedLabel)('高度', '展示区域高度'),
                                    name: 'height',
                                    min: 1
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('style:classNames', {
                            isFormItem: false
                        })
                    ])
                }
            ]);
        };
        return _this;
    }
    LogPlugin.id = 'LogPlugin';
    return LogPlugin;
}(amis_editor_core_2.BasePlugin));
exports.LogPlugin = LogPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(LogPlugin);
