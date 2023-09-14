"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelControlPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file input-excel 组件的素项目部
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var BaseControl_1 = require("../../component/BaseControl");
var ExcelControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ExcelControlPlugin, _super);
    function ExcelControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-excel';
        _this.$schema = '/schemas/ExcelControlSchema.json';
        // 组件名称
        _this.name = '上传 Excel';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-eyedropper';
        _this.pluginIcon = 'input-excel-plugin';
        _this.description = '自动解析 Excel';
        _this.docLink = '/amis/zh-CN/components/form/input-excel';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-excel',
            label: 'Excel',
            name: 'excel'
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
        _this.panelTitle = '上传 Excel';
        _this.notRenderFormZone = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: 'excel 上传解析完成后触发',
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
                                        title: 'excel解析后的数据'
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
        _this.panelBodyCreator = function (context) {
            return (0, BaseControl_1.formItemControl)({
                common: {
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        {
                            label: '解析模式',
                            name: 'parseMode',
                            type: 'select',
                            options: [
                                {
                                    label: '对象',
                                    value: 'object'
                                },
                                { label: '数组', value: 'array' }
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                            name: 'allSheets',
                            label: '是否解析所有 Sheet'
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                            name: 'plainText',
                            label: '是否解析为纯文本',
                            pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                        }),
                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                            name: 'includeEmpty',
                            label: '是否包含空内容',
                            visibleOn: 'data.parseMode === "array"'
                        })
                    ]
                }
            }, context);
        };
        return _this;
    }
    ExcelControlPlugin.id = 'ExcelControlPlugin';
    return ExcelControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.ExcelControlPlugin = ExcelControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(ExcelControlPlugin);
