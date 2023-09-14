"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var FlexPluginBase_1 = require("./FlexPluginBase");
var Layout_fixed_top = /** @class */ (function (_super) {
    tslib_1.__extends(Layout_fixed_top, _super);
    function Layout_fixed_top() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '吸附容器';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'layout-fixed-top';
        _this.description = '吸附容器: 可设置成吸顶或者吸顶展示。';
        _this.order = -1;
        _this.scaffold = {
            type: 'flex',
            isSorptionContainer: true,
            sorptionPosition: 'top',
            className: 'p-1',
            items: [
                (0, FlexPluginBase_1.defaultFlexColumnSchema)(),
                (0, FlexPluginBase_1.defaultFlexColumnSchema)(),
                (0, FlexPluginBase_1.defaultFlexColumnSchema)(),
                (0, FlexPluginBase_1.defaultFlexColumnSchema)()
            ],
            style: {
                position: 'fixed',
                inset: '0 auto auto 0',
                zIndex: 10,
                width: '100%',
                overflowX: 'auto',
                margin: '0',
                overflowY: 'auto'
            },
            isFixedWidth: true,
            isFixedHeight: false,
            originPosition: 'right-bottom'
        };
        _this.panelTitle = '吸附容器';
        return _this;
    }
    Layout_fixed_top.id = 'Layout_fixed_top';
    Layout_fixed_top.scene = ['layout'];
    return Layout_fixed_top;
}(FlexPluginBase_1.FlexPluginBase));
exports.default = Layout_fixed_top;
(0, amis_editor_core_1.registerEditorPlugin)(Layout_fixed_top);
