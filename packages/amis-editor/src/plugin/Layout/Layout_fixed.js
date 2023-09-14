"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var FlexPluginBase_1 = require("./FlexPluginBase");
var Layout_fixed = /** @class */ (function (_super) {
    tslib_1.__extends(Layout_fixed, _super);
    function Layout_fixed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '悬浮容器';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'layout-fixed-plugin';
        _this.description = '悬浮容器: 基于 CSS Flex 实现的特殊布局容器。';
        _this.order = 0;
        _this.scaffold = {
            type: 'container',
            size: 'xs',
            body: [],
            style: {
                position: 'fixed',
                inset: 'auto 50px 50px auto',
                zIndex: 10,
                minWidth: '80px',
                minHeight: '80px',
                display: 'block'
            },
            wrapperBody: false,
            originPosition: 'right-bottom'
        };
        _this.panelTitle = '悬浮容器';
        return _this;
    }
    Layout_fixed.id = 'Layout_fixed';
    Layout_fixed.scene = ['layout'];
    return Layout_fixed;
}(FlexPluginBase_1.FlexPluginBase));
exports.default = Layout_fixed;
(0, amis_editor_core_1.registerEditorPlugin)(Layout_fixed);
