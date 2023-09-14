"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepsPlugin = void 0;
var tslib_1 = require("tslib");
/**
 * @file Steps 步骤条
 */
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var StepsPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(StepsPlugin, _super);
    function StepsPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'steps';
        _this.$schema = '/schemas/StepsSchema.json';
        // 组件名称
        _this.name = '步骤条';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-forward';
        _this.pluginIcon = 'steps-plugin';
        _this.description = 'Steps 步骤条';
        _this.docLink = '/amis/zh-CN/components/steps';
        _this.tags = ['展示'];
        _this.scaffold = {
            type: 'steps',
            value: 1,
            steps: [
                {
                    title: '第一步',
                    subTitle: '副标题',
                    description: '描述'
                },
                {
                    title: '第二步'
                },
                {
                    title: '第三步'
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = 'Steps';
        _this.panelBody = [
            (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                            name: 'steps',
                            label: '步骤列表',
                            type: 'combo',
                            scaffold: {
                                type: 'wrapper',
                                body: '子节点内容'
                            },
                            minLength: 2,
                            multiple: true,
                            draggable: true,
                            items: [
                                (0, amis_editor_core_3.getSchemaTpl)('title', {
                                    label: false,
                                    placeholder: '标题'
                                }),
                                (0, amis_editor_core_3.getSchemaTpl)('stepSubTitle'),
                                (0, amis_editor_core_3.getSchemaTpl)('stepDescription')
                            ]
                        }),
                        {
                            name: 'value',
                            type: 'input-text',
                            label: '当前步骤',
                            description: '以零为头部'
                        },
                        {
                            name: 'status',
                            type: 'select',
                            label: '当前状态',
                            creatable: true,
                            value: 'finish',
                            options: [
                                {
                                    label: '进行中',
                                    value: 'process'
                                },
                                {
                                    label: '等待',
                                    value: 'wait'
                                },
                                {
                                    label: '完成',
                                    value: 'finish'
                                },
                                {
                                    label: '出错',
                                    value: 'error'
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('api', {
                            name: 'source',
                            label: '获取步骤接口'
                        })
                    ]
                },
                {
                    title: '外观',
                    body: [
                        {
                            name: 'mode',
                            type: 'select',
                            label: '模式',
                            value: 'horizontal',
                            options: [
                                {
                                    label: '水平',
                                    value: 'horizontal'
                                },
                                {
                                    label: '竖直',
                                    value: 'vertical'
                                },
                                {
                                    label: '简单',
                                    value: 'simple'
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('className')
                    ]
                },
                {
                    title: '显隐',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('visible')]
                }
            ])
        ];
        return _this;
    }
    StepsPlugin.id = 'StepsPlugin';
    return StepsPlugin;
}(amis_editor_core_2.BasePlugin));
exports.StepsPlugin = StepsPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(StepsPlugin);
