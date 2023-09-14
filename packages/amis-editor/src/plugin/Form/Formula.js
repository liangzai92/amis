"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var FormulaControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(FormulaControlPlugin, _super);
    function FormulaControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'formula';
        _this.$schema = '/schemas/FormulaControlSchema.json';
        // 组件名称
        _this.name = '公式';
        _this.isBaseComponent = true;
        _this.disabledRendererPlugin = true;
        _this.icon = 'fa fa-calculator';
        _this.pluginIcon = 'formula-plugin';
        _this.description = '通过公式计算指定的变量值，并将其结果作用到指定的变量中';
        _this.docLink = '/amis/zh-CN/components/form/formula';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'formula',
            name: 'formula'
        };
        _this.previewSchema = {
            type: 'tpl',
            tpl: '计算公式'
        };
        _this.panelTitle = '公式';
        _this.panelBody = [
            (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
            {
                label: '字段名',
                name: 'name',
                type: 'input-text',
                description: '公式计算结果会作用到此字段名对应的变量中。'
            },
            {
                type: 'input-text',
                name: 'value',
                label: '默认值'
            },
            {
                type: 'input-text',
                name: 'formula',
                label: '公式',
                description: '支持 JS 表达式，如： <code>data.var_a + 2</code>，即当表单项 <code>var_a</code> 变化的时候，会自动给当前表单项设置为 <code>var_a + 2</code> 的值。若设置为字符串，则需要加引号'
            },
            {
                type: 'input-text',
                name: 'condition',
                label: '作用条件',
                description: '支持如：<code>\\${xxx}</code>或者<code>data.xxx == "a"</code> 表达式来配置作用条件，当满足该作用条件时，会将计算结果设置到目标变量上。'
            },
            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                name: 'initSet',
                label: '是否初始应用',
                description: '是否初始化的时候运行公式结果，并设置到目标变量上。',
                pipeIn: (0, amis_editor_core_1.defaultValue)(true)
            }),
            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                name: 'autoSet',
                label: '是否自动应用',
                description: '是否自动计算公式结果，有变化时自动设置到目标变量上。<br />关闭后，通过按钮也能触发运算。',
                pipeIn: (0, amis_editor_core_1.defaultValue)(true)
            })
        ];
        return _this;
    }
    FormulaControlPlugin.prototype.renderRenderer = function (props) {
        return this.renderPlaceholder('功能组件（公式）', props.key, props.style);
    };
    FormulaControlPlugin.id = 'FormulaControlPlugin';
    return FormulaControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.FormulaControlPlugin = FormulaControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(FormulaControlPlugin);
