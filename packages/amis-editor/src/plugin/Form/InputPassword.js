"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var InputText_1 = require("./InputText");
var PasswordControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(PasswordControlPlugin, _super);
    function PasswordControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-password';
        _this.$schema = '/schemas/TextControlSchema.json';
        _this.name = '密码框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-asterisk';
        _this.pluginIcon = 'input-password-plugin';
        _this.description = '验证输入是否符合邮箱的格式';
        _this.scaffold = {
            type: 'input-password',
            label: '密码',
            name: 'password'
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
    PasswordControlPlugin.id = 'PasswordControlPlugin';
    return PasswordControlPlugin;
}(InputText_1.TextControlPlugin));
exports.PasswordControlPlugin = PasswordControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(PasswordControlPlugin);
