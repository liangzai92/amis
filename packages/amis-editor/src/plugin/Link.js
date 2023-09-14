"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var LinkPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(LinkPlugin, _super);
    function LinkPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'link';
        _this.$schema = '/schemas/LinkSchema.json';
        // 组件名称
        _this.name = '链接';
        _this.isBaseComponent = true;
        _this.description = '用来展示文字链接';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-link';
        _this.pluginIcon = 'url-plugin';
        _this.scaffold = {
            type: 'link',
            value: 'http://www.baidu.com/'
        };
        _this.previewSchema = tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { label: _this.name });
        _this.panelTitle = '链接';
        _this.panelJustify = true;
        _this.panelBody = [
            (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'href',
                                    label: (0, amis_editor_core_1.tipedLabel)('目标地址', '支持取变量，如果已绑定字段名，可以不用设置'),
                                    rendererSchema: {
                                        type: 'input-text'
                                    }
                                }),
                                {
                                    label: (0, amis_editor_core_1.tipedLabel)('内容', '不填写时，自动使用目标地址值'),
                                    type: 'ae-textareaFormulaControl',
                                    mode: 'normal',
                                    pipeIn: function (value, data) { return value || (data && data.html); },
                                    name: 'body'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'blank',
                                    label: '在新窗口打开'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('iconLink', {
                                    name: 'icon',
                                    label: '左侧图标'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('iconLink', {
                                    name: 'rightIcon',
                                    label: '右侧图标'
                                })
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', {
                            disabled: true
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '高级设置',
                                body: [
                                    {
                                        name: 'htmlTarget',
                                        type: 'input-text',
                                        label: (0, amis_editor_core_1.tipedLabel)('锚点', 'HTML &lt;a&gt; 元素的target属性，该属性指定在何处显示链接的资源')
                                    }
                                ]
                            }
                        ])
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                            isFormItem: false,
                            schema: [
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'iconClassName',
                                    label: '左侧图标',
                                    visibleOn: 'this.icon'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'rightIconClassName',
                                    label: '右侧图标',
                                    visibleOn: 'this.rightIcon'
                                })
                            ]
                        })
                    ])
                }
            ])
        ];
        return _this;
    }
    LinkPlugin.id = 'LinkPlugin';
    LinkPlugin.scene = ['layout'];
    return LinkPlugin;
}(amis_editor_core_1.BasePlugin));
exports.LinkPlugin = LinkPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(LinkPlugin);
