"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var TasksPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TasksPlugin, _super);
    function TasksPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tasks';
        _this.$schema = '/schemas/TasksSchema.json';
        // 组件名称
        _this.name = '异步任务';
        _this.isBaseComponent = true;
        _this.description = '用来做异步任务呈现或者操作。';
        _this.docLink = '/amis/zh-CN/components/tasks';
        _this.tags = ['功能'];
        _this.icon = '';
        _this.pluginIcon = 'tasks-plugin';
        _this.scaffold = {
            type: 'tasks',
            name: 'tasks',
            items: [
                {
                    label: 'hive 任务',
                    key: 'hive',
                    status: 4,
                    remark: '查看详情<a target="_blank" href="http://www.baidu.com">日志</a>。'
                },
                {
                    label: '小流量',
                    key: 'partial',
                    status: 4
                },
                {
                    label: '全量',
                    key: 'full',
                    status: 4
                }
            ]
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '异步任务';
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        {
                            name: 'items',
                            label: '初始任务信息',
                            type: 'combo',
                            multiple: true,
                            multiLine: true,
                            items: [
                                (0, amis_editor_core_3.getSchemaTpl)('label', {
                                    label: '任务名称'
                                }),
                                {
                                    name: 'key',
                                    type: 'input-text',
                                    label: '任务ID'
                                },
                                {
                                    name: 'status',
                                    type: 'input-number',
                                    label: '任务状态'
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('taskRemark')
                            ],
                            addButtonText: '新增任务信息',
                            scaffold: {
                                label: '名称',
                                key: 'key',
                                status: 0,
                                remark: '说明'
                            },
                            description: '可以不设置，如果检测接口返回这些信息的话。'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('api', {
                            name: 'checkApi',
                            label: '状态检测接口'
                        }),
                        {
                            name: 'interval',
                            type: 'input-number',
                            min: 3000,
                            step: 500,
                            visibleOn: 'data.checkApi',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(3000),
                            label: '定时检测间隔'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('api', {
                            name: 'submitApi',
                            label: '提交接口'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('api', {
                            name: 'reSubmitApi',
                            label: '重试接口'
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('loadingConfig', {}, { context: context }),
                        {
                            type: 'divider'
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('taskNameLabel'),
                        (0, amis_editor_core_3.getSchemaTpl)('operationLabel'),
                        (0, amis_editor_core_3.getSchemaTpl)('statusLabel'),
                        (0, amis_editor_core_3.getSchemaTpl)('remarkLabel'),
                        {
                            name: 'btnText',
                            label: '按钮名称',
                            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('上线')
                        },
                        {
                            name: 'retryBtnText',
                            label: '重试按钮名称',
                            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('重试')
                        },
                        {
                            name: 'statusTextMap',
                            pipeIn: (0, amis_editor_core_3.defaultValue)([
                                '未开始',
                                '就绪',
                                '进行中',
                                '出错',
                                '已完成',
                                '出错'
                            ]),
                            type: 'input-array',
                            label: '状态标签文字配置',
                            multiple: true,
                            addable: false,
                            removable: false,
                            items: (0, amis_editor_core_3.getSchemaTpl)('inputArrayItem')
                        },
                        {
                            name: 'initialStatusCode',
                            label: '初始状态码',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(0),
                            type: 'input-number'
                        },
                        {
                            name: 'readyStatusCode',
                            label: '就绪状态码',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(1),
                            type: 'input-number'
                        },
                        {
                            name: 'loadingStatusCode',
                            label: '进行中状态码',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(2),
                            type: 'input-number'
                        },
                        {
                            name: 'errorStatusCode',
                            label: '错误状态码',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(3),
                            type: 'input-number'
                        },
                        {
                            name: 'finishStatusCode',
                            label: '完成状态码',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(4),
                            type: 'input-number'
                        },
                        {
                            name: 'canRetryStatusCode',
                            label: '出错但可重试状态码',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(5),
                            type: 'input-number'
                        }
                    ]
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('className', {
                            pipeIn: (0, amis_editor_core_3.defaultValue)('b-a bg-white table-responsive')
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('className', {
                            name: 'tableClassName',
                            label: '表格 CSS 类名',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('table table-striped m-b-none')
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('className', {
                            name: 'btnClassName',
                            label: '按钮 CSS 类名',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('btn-sm btn-default')
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('className', {
                            name: 'retryBtnClassName',
                            label: '重试按钮 CSS 类名',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('btn-sm btn-danger')
                        }),
                        {
                            name: 'statusLabelMap',
                            pipeIn: (0, amis_editor_core_3.defaultValue)([
                                'label-warning',
                                'label-info',
                                'label-info',
                                'label-danger',
                                'label-success',
                                'label-danger'
                            ]),
                            type: 'input-array',
                            label: '状态标签 CSS 类名配置',
                            multiple: true,
                            addable: false,
                            removable: false,
                            items: {
                                type: 'input-text',
                                placeholder: 'CSS 类名'
                            }
                        }
                    ]
                },
                {
                    title: '显隐',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('visible')]
                }
            ]);
        };
        return _this;
    }
    TasksPlugin.id = 'TasksPlugin';
    return TasksPlugin;
}(amis_editor_core_2.BasePlugin));
exports.TasksPlugin = TasksPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TasksPlugin);
