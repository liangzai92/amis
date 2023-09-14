"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file Flex 布局
 */
var amis_editor_core_1 = require("amis-editor-core");
var FlexPluginBase_1 = require("./Layout/FlexPluginBase");
var FlexPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(FlexPlugin, _super);
    function FlexPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Flex 布局';
        _this.pluginIcon = 'flex-container-plugin';
        _this.description = '布局容器主要用于设计复杂布局的容器组件，基于 CSS Flex 实现的布局效果，比 Grid 和 HBox 对子节点位置的可控性更强，比用 CSS 类的方式更简单易用';
        return _this;
    }
    FlexPlugin.id = 'FlexPlugin';
    FlexPlugin.scene = ['layout'];
    return FlexPlugin;
}(FlexPluginBase_1.FlexPluginBase));
exports.FlexPlugin = FlexPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(FlexPlugin);
