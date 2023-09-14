"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputText_1 = require("./InputText");
var URLControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(URLControlPlugin, _super);
    function URLControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-url';
        _this.$schema = '/schemas/TextControlSchema.json';
        _this.name = 'URL输入框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-link';
        _this.pluginIcon = 'input-url-plugin';
        _this.description = '验证输入是否为合法的 URL';
        _this.docLink = '/amis/zh-CN/components/form/input-url';
        _this.scaffold = {
            type: 'input-url',
            label: '链接',
            name: 'url'
        };
        _this.disabledRendererPlugin = true;
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: tslib_1.__assign({}, _this.scaffold)
        };
        _this.panelTitle = 'URL';
        return _this;
    }
    URLControlPlugin.id = 'URLControlPlugin';
    return URLControlPlugin;
}(InputText_1.TextControlPlugin));
exports.URLControlPlugin = URLControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(URLControlPlugin);
