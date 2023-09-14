"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_4 = require("amis-editor-core");
var ArrayControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayControlPlugin, _super);
    function ArrayControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-array';
        _this.$schema = '/schemas/ArrayControlSchema.json';
        _this.disabledRendererPlugin = true;
        // 组件名称
        _this.name = '数组输入框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-bars';
        _this.pluginIcon = 'input-array-plugin';
        _this.description = 'Array 数组输入框，可自定义成员输入形式。其实是 Combo 的 flat 值打平的一种用法，可直接用 combo 代替。';
        _this.docLink = '/amis/zh-CN/components/form/input-array';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-array',
            label: '数组输入框',
            name: 'array',
            items: {
                type: 'input-text',
                placeholder: '请输入'
            }
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: ['row1', ''], draggable: true })
            ]
        };
        _this.panelTitle = '数组框';
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                (0, amis_editor_core_3.getSchemaTpl)('switchDefaultValue'),
                {
                    type: 'textarea',
                    name: 'value',
                    label: '默认值',
                    visibleOn: 'typeof this.value !== "undefined"',
                    pipeOut: amis_editor_core_3.valuePipeOut
                },
                {
                    children: (react_1.default.createElement(amis_1.Button, { size: "sm", level: "danger", className: "m-b", block: true, onClick: _this.editDetail.bind(_this, context.id) }, "\u914D\u7F6E\u5B50\u8868\u5355\u9879"))
                },
                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                    label: '是否可新增',
                    name: 'addable',
                    pipeIn: (0, amis_editor_core_3.defaultValue)(true)
                }),
                {
                    label: '新增按钮文字',
                    name: 'addButtonText',
                    type: 'input-text',
                    visibleOn: 'data.addable',
                    pipeIn: (0, amis_editor_core_3.defaultValue)('新增')
                },
                {
                    type: 'textarea',
                    name: 'scaffold',
                    label: '新增初始值',
                    visibleOn: 'this.addable !== false',
                    pipeOut: amis_editor_core_3.valuePipeOut,
                    pipeIn: (0, amis_editor_core_3.defaultValue)('')
                },
                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                    label: '是否可删除',
                    name: 'removable',
                    pipeIn: (0, amis_editor_core_3.defaultValue)(true)
                }),
                (0, amis_editor_core_3.getSchemaTpl)('api', {
                    name: 'deleteApi',
                    label: '删除前的请求',
                    visibleOn: 'data.removable'
                }),
                {
                    label: '删除确认提示',
                    name: 'deleteConfirmText',
                    type: 'input-text',
                    visibleOn: 'data.deleteApi',
                    pipeIn: (0, amis_editor_core_3.defaultValue)('确认要删除')
                },
                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                    name: 'draggable',
                    label: '启用拖拽排序'
                }),
                {
                    name: 'draggableTip',
                    visibleOn: 'data.draggable',
                    type: 'input-text',
                    label: '可拖拽排序提示文字',
                    pipeIn: (0, amis_editor_core_3.defaultValue)('可通过拖动每行中的【交换】按钮进行顺序调整')
                },
                {
                    name: 'addButtonText',
                    type: 'input-text',
                    label: '新增按钮文字',
                    pipeIn: (0, amis_editor_core_3.defaultValue)('新增')
                },
                (0, amis_editor_core_3.getSchemaTpl)('minLength'),
                (0, amis_editor_core_3.getSchemaTpl)('maxLength')
            ];
        };
        return _this;
    }
    ArrayControlPlugin.prototype.filterProps = function (props) {
        props = (0, amis_editor_core_4.JSONPipeOut)(props);
        // 至少显示一个成员，否则啥都不显示。
        if (!props.value) {
            props.value = [''];
        }
        return props;
    };
    ArrayControlPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
        var id = _a.id, info = _a.info;
        if (info.renderer.name === 'input-array') {
            toolbars.push({
                icon: 'fa fa-expand',
                order: 100,
                tooltip: '配置子表单项',
                onClick: this.editDetail.bind(this, id)
            });
        }
    };
    ArrayControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var id = _a.id, schema = _a.schema, region = _a.region, info = _a.info;
        if (info.renderer.name === 'input-array') {
            menus.push('|', {
                label: '配置成员渲染器',
                onSelect: this.editDetail.bind(this, id)
            });
        }
    };
    ArrayControlPlugin.prototype.editDetail = function (id) {
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置子表单项',
                value: value.items,
                slot: {
                    type: 'form',
                    mode: 'normal',
                    body: '$$',
                    wrapWithPanel: false,
                    className: 'wrapper'
                },
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { items: newValue });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_4.diff)(value, newValue));
                }
            });
    };
    ArrayControlPlugin.id = 'ArrayControlPlugin';
    return ArrayControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.ArrayControlPlugin = ArrayControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ArrayControlPlugin);
