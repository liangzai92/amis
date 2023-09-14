"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KVControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var KVControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(KVControlPlugin, _super);
    function KVControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-kv';
        _this.$schema = '/schemas/KVControlSchema.json';
        // 组件名称
        _this.name = 'KV 键值对';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-eyedropper';
        _this.pluginIcon = 'input-kv-plugin';
        _this.description = '用于编辑键值对类型的数据';
        _this.docLink = '/amis/zh-CN/components/form/input-kv';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-kv',
            label: 'KV',
            name: 'kv'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign({}, _this.scaffold)
            ]
        };
        // 事件定义
        _this.events = [
            {
                eventName: 'add',
                eventLabel: '添加',
                description: '添加组合项时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'delete',
                eventLabel: '删除',
                description: '删除组合项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    key: {
                                        type: 'string',
                                        title: '被删除的索引'
                                    },
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '被删除的项'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清除选中值'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = 'KV 键值对';
        _this.panelBody = [
            (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
            {
                type: 'input-text',
                name: 'valueType',
                label: '值类型',
                pipeIn: (0, amis_editor_core_1.defaultValue)('input-text')
            },
            {
                type: 'input-text',
                name: 'keyPlaceholder',
                label: 'key 的提示信息'
            },
            {
                type: 'input-text',
                name: 'valuePlaceholder',
                label: 'value 的提示信息'
            },
            {
                type: 'switch',
                name: 'draggable',
                label: '是否可排序',
                pipeIn: (0, amis_editor_core_1.defaultValue)(true)
            }
        ];
        return _this;
    }
    KVControlPlugin.id = 'KVControlPlugin';
    KVControlPlugin.scene = ['layout'];
    return KVControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.KVControlPlugin = KVControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(KVControlPlugin);
