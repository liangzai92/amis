"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputText_1 = require("./InputText");
var EmailControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(EmailControlPlugin, _super);
    function EmailControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-email';
        _this.$schema = '/schemas/TextControlSchema.json';
        _this.name = '邮箱框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-envelope-o';
        _this.pluginIcon = 'input-email-plugin';
        _this.description = '验证输入是否符合邮箱的格式';
        _this.scaffold = {
            type: 'input-email',
            label: '邮箱',
            name: 'email'
        };
        _this.disabledRendererPlugin = true;
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: tslib_1.__assign({}, _this.scaffold)
        };
        _this.panelTitle = _this.name;
        return _this;
    }
    EmailControlPlugin.id = 'EmailControlPlugin';
    return EmailControlPlugin;
}(InputText_1.TextControlPlugin));
exports.EmailControlPlugin = EmailControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(EmailControlPlugin);
