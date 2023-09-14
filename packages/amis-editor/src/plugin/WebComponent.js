"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebComponentPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter");
// 需要一个示例，不然默认的没有高度都无法选中
var WebComponentDemo = /** @class */ (function (_super) {
    tslib_1.__extends(WebComponentDemo, _super);
    function WebComponentDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebComponentDemo.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.textContent = 'web-component-demo';
    };
    return WebComponentDemo;
}(HTMLElement));
try {
    customElements.define('web-component-demo', WebComponentDemo);
}
catch (error) {
    console.log('[amis-editor]', error);
}
var WebComponentPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(WebComponentPlugin, _super);
    function WebComponentPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'web-component';
        _this.$schema = '/schemas/WebComponentSchema.json';
        // 组件名称
        _this.name = 'Web Component';
        _this.isBaseComponent = true;
        _this.description = '用于渲染 Web Component 组件';
        _this.docLink = '/amis/zh-CN/components/web-component';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-square-o';
        _this.pluginIcon = 'web-component-plugin';
        _this.scaffold = {
            type: 'web-component',
            tag: 'web-component-demo'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '包裹';
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                className: 'p-none',
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    {
                                        type: 'input-text',
                                        label: '标签',
                                        name: 'tag'
                                    },
                                    (0, amis_editor_core_1.getSchemaTpl)('combo-container', {
                                        type: 'input-kv',
                                        mode: 'normal',
                                        name: 'props',
                                        label: '属性'
                                    })
                                ]
                            }
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    WebComponentPlugin.id = 'WebComponentPlugin';
    return WebComponentPlugin;
}(amis_editor_core_1.BasePlugin));
exports.WebComponentPlugin = WebComponentPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(WebComponentPlugin);
