"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var Container_1 = require("../Container");
var Layout_free_container = /** @class */ (function (_super) {
    tslib_1.__extends(Layout_free_container, _super);
    function Layout_free_container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '自由容器';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'layout-free-container';
        _this.description = '自由容器: 其直接子元素支持拖拽调整位置。';
        // order = -1;
        _this.tags = ['布局容器'];
        _this.scaffold = {
            type: 'container',
            isFreeContainer: true,
            size: 'xs',
            body: [],
            wrapperBody: false,
            style: {
                position: 'relative',
                minHeight: '200px'
            }
        };
        _this.panelTitle = '自由容器';
        return _this;
    }
    Layout_free_container.id = 'Layout_free_container';
    return Layout_free_container;
}(Container_1.ContainerPlugin));
exports.default = Layout_free_container;
(0, amis_editor_core_1.registerEditorPlugin)(Layout_free_container);
