"use strict";
/**
 * @file CRUDTable.tsx
 * @desc 表格模式的 CRUD2
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDTablePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var builder_1 = require("../../builder");
var Table2_1 = require("../Table2");
var BaseCRUD_1 = require("./BaseCRUD");
var CRUDTablePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDTablePlugin, _super);
    function CRUDTablePlugin(manager) {
        var _this = _super.call(this, manager, Table2_1.Table2RenderereEvent, Table2_1.Table2RendererAction) || this;
        _this.panelJustify = true;
        _this.multifactor = true;
        _this.isBaseComponent = true;
        _this.description = '用来实现对数据的增删改查，用来展示表格数据，可以配置列信息，然后关联数据便能完成展示。支持嵌套、超级表头、列固定、表头固顶、合并单元格等等。';
        _this.order = -950;
        _this.$schema = '/schemas/CRUD2TableSchema.json';
        _this.docLink = '/amis/zh-CN/components/crud2';
        _this.previewSchema = _this.generatePreviewSchema('table2');
        _this.scaffold = _this.generateScaffold('table2');
        /** 非实体数据源走默认构建 */
        _this.panelBodyCreator = function (context) {
            return _this.baseCRUDPanelBody(context);
        };
        _this.dsManager = new builder_1.DSBuilderManager(manager);
        return _this;
    }
    CRUDTablePlugin.id = 'TableCRUDPlugin';
    return CRUDTablePlugin;
}(BaseCRUD_1.BaseCRUDPlugin));
exports.CRUDTablePlugin = CRUDTablePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(CRUDTablePlugin);
