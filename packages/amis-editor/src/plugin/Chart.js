"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var ChartConfigEditor = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (react_1.default.createElement("div", { className: "ae-JsonEditor" },
        react_1.default.createElement(amis_editor_core_1.CodeEditor, { value: value, onChange: onChange })));
};
var DEFAULT_EVENT_PARAMS = [
    {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                title: '数据',
                properties: {
                    componentType: {
                        type: 'string',
                        title: 'componentType'
                    },
                    seriesType: {
                        type: 'string',
                        title: 'seriesType'
                    },
                    seriesIndex: {
                        type: 'number',
                        title: 'seriesIndex'
                    },
                    seriesName: {
                        type: 'string',
                        title: 'seriesName'
                    },
                    name: {
                        type: 'string',
                        title: 'name'
                    },
                    dataIndex: {
                        type: 'number',
                        title: 'dataIndex'
                    },
                    data: {
                        type: 'object',
                        title: 'data'
                    },
                    dataType: {
                        type: 'string',
                        title: 'dataType'
                    },
                    value: {
                        type: 'number',
                        title: 'value'
                    },
                    color: {
                        type: 'string',
                        title: 'color'
                    }
                }
            }
        }
    }
];
var chartDefaultConfig = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }
    ],
    backgroundColor: 'transparent'
};
var ChartPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ChartPlugin, _super);
    function ChartPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'chart';
        _this.$schema = '/schemas/ChartSchema.json';
        // 组件名称
        _this.name = '图表';
        _this.isBaseComponent = true;
        _this.description = '用来渲染图表，基于 echarts 图表库，理论上 echarts 所有图表类型都支持。';
        _this.docLink = '/amis/zh-CN/components/chart';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-pie-chart';
        _this.pluginIcon = 'chart-plugin';
        _this.scaffold = {
            type: 'chart',
            config: chartDefaultConfig,
            replaceChartOption: true
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        // 事件定义
        _this.events = [
            {
                eventName: 'init',
                eventLabel: '初始化',
                description: '组件实例被创建并插入 DOM 中时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'click',
                eventLabel: '鼠标点击',
                description: '鼠标点击时触发',
                dataSchema: DEFAULT_EVENT_PARAMS
            },
            {
                eventName: 'mouseover',
                eventLabel: '鼠标悬停',
                description: '鼠标悬停时触发',
                dataSchema: DEFAULT_EVENT_PARAMS
            },
            {
                eventName: 'legendselectchanged',
                eventLabel: '切换图例选中状态',
                description: '切换图例选中状态时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    name: {
                                        type: 'string',
                                        title: 'name'
                                    },
                                    selected: {
                                        type: 'object',
                                        title: 'selected'
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
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionType: 'setValue',
                actionLabel: '变量赋值',
                description: '触发组件数据更新'
            }
            // 特性动作太多了，这里先不加了，可以通过写代码配置
        ];
        _this.panelTitle = '图表';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: [
                            (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                        (0, amis_editor_core_1.getSchemaTpl)('name')
                                    ]
                                },
                                {
                                    title: '数据设置',
                                    body: [
                                        /*
                                        {
                                          type: 'select',
                                          name: 'chartDataType',
                                          label: '数据获取方式',
                                          value: 'json',
                                          onChange(value: any, oldValue: any, model: any, form: any) {
                                            if (value === 'json') {
                                              form.setValueByName('api', undefined);
                                              form.setValueByName('config', chartDefaultConfig);
                                            } else {
                                              form.setValueByName('config', undefined);
                                            }
                                          },
                                          options: [
                                            {
                                              label: '接口数据',
                                              value: 'dataApi'
                                            },
                                            {
                                              label: '静态JSON数据',
                                              value: 'json'
                                            }
                                          ]
                                        },
                                        */
                                        (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                            label: (0, amis_editor_core_1.tipedLabel)('数据接口', '接口可以返回echart图表完整配置，或者图表数据，建议返回图表数据映射到 Echarts 配置中'),
                                            mode: 'normal'
                                            // visibleOn: 'chartDataType === "dataApi"'
                                        }),
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            label: '初始是否拉取',
                                            name: 'initFetch',
                                            // visibleOn: 'chartDataType === "dataApi" && data.api',
                                            visibleOn: 'data.api.url',
                                            pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                        }),
                                        {
                                            name: 'interval',
                                            label: (0, amis_editor_core_1.tipedLabel)('定时刷新间隔', '设置后将自动定时刷新，最小3000, 单位 ms'),
                                            type: 'input-number',
                                            step: 500,
                                            // visibleOn: 'chartDataType === "dataApi" && data.api',
                                            visibleOn: 'data.api.url',
                                            unitOptions: ['ms']
                                        },
                                        (0, amis_editor_core_1.getSchemaTpl)('expressionFormulaControl', {
                                            evalMode: false,
                                            label: (0, amis_editor_core_1.tipedLabel)('跟踪表达式', '如果这个表达式的值有变化时会更新图表，当 config 中用了数据映射时有用'),
                                            name: 'trackExpression',
                                            placeholder: '\\${xxx}'
                                        }),
                                        {
                                            name: 'config',
                                            asFormItem: true,
                                            // visibleOn: 'chartDataType === "json"',
                                            component: ChartConfigEditor,
                                            mode: 'normal',
                                            // type: 'json-editor',
                                            label: (0, amis_editor_core_1.tipedLabel)('Echarts 配置', '支持数据映射，可将接口返回的数据填充进来')
                                        },
                                        {
                                            name: 'dataFilter',
                                            type: 'js-editor',
                                            allowFullscreen: true,
                                            mode: 'normal',
                                            label: (0, amis_editor_core_1.tipedLabel)('数据映射（dataFilter）', '如果后端没有直接返回 Echart 配置，可以自己写一段函数来包装'),
                                            size: 'lg',
                                            placeholder: "/* \u53C2\u6570\u8BF4\u660E\n    * config \u539F\u59CB\u6570\u636E\n    * echarts echarts \u5BF9\u8C61\n    * data \u5982\u679C\u914D\u7F6E\u4E86\u6570\u636E\u63A5\u53E3\uFF0C\u63A5\u53E3\u8FD4\u56DE\u7684\u6570\u636E\u901A\u8FC7\u6B64\u53D8\u91CF\u4F20\u5165\n    \u793A\u4F8B\n    * debugger; // \u53EF\u4EE5\u6D4F\u89C8\u5668\u4E2D\u65AD\u70B9\u8C03\u8BD5\n    * console.log(config); // \u67E5\u770B\u539F\u59CB\u6570\u636E\n    * return {}; // \u8FD4\u56DE\u65B0\u7684\u7ED3\u679C\n  */\n  (config, echarts, data) => config"
                                        },
                                        (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                            label: (0, amis_editor_core_1.tipedLabel)('Chart 配置完全替换', '默认为追加模式，新的配置会跟旧的配置合并，如果勾选将直接完全覆盖'),
                                            name: 'replaceChartOption'
                                        })
                                    ]
                                },
                                {
                                    title: '图表下钻',
                                    body: [
                                        {
                                            name: 'clickAction',
                                            asFormItem: true,
                                            label: false,
                                            children: function (_a) {
                                                var onChange = _a.onChange, value = _a.value;
                                                return (react_1.default.createElement("div", { className: "m-b" },
                                                    react_1.default.createElement(amis_1.Button, { size: "sm", level: value ? 'danger' : 'info', onClick: _this.editDrillDown.bind(_this, context.id) }, "\u914D\u7F6E DrillDown"),
                                                    value ? (react_1.default.createElement(amis_1.Button, { size: "sm", level: "link", className: "m-l", onClick: function () { return onChange(''); } }, "\u5220\u9664 DrillDown")) : null));
                                            }
                                        }
                                    ]
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('status')
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([
                            {
                                title: '宽高设置',
                                body: [
                                    (0, amis_editor_core_1.getSchemaTpl)('style:widthHeight', {
                                        widthSchema: {
                                            label: (0, amis_editor_core_1.tipedLabel)('宽度', '默认宽度为父容器宽度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                            pipeIn: (0, amis_editor_core_1.defaultValue)('100%')
                                        },
                                        heightSchema: {
                                            label: (0, amis_editor_core_1.tipedLabel)('高度', '默认高度为300px，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                            pipeIn: (0, amis_editor_core_1.defaultValue)('300px')
                                        }
                                    })
                                ]
                            }
                        ], tslib_1.__read((0, amis_editor_core_1.getSchemaTpl)('theme:common', { exclude: ['layout'] })), false))
                    },
                    {
                        title: '事件',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_1.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                        ]
                    }
                ])
            ];
        };
        return _this;
    }
    ChartPlugin.prototype.editDrillDown = function (id) {
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var dialog = (value.clickAction && value.clickAction.dialog) || {
            title: '标题',
            body: ['<p>内容 <code>${value|json}</code></p>']
        };
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置 DrillDown 详情',
                value: tslib_1.__assign({ type: 'container' }, dialog),
                slot: {
                    type: 'container',
                    body: '$$'
                },
                typeMutable: false,
                onChange: function (newValue) {
                    newValue = tslib_1.__assign(tslib_1.__assign({}, value), { clickAction: {
                            actionType: 'dialog',
                            dialog: newValue
                        } });
                    manager.panelChangeValue(newValue, (0, amis_editor_core_1.diff)(value, newValue));
                }
            });
    };
    ChartPlugin.id = 'ChartPlugin';
    return ChartPlugin;
}(amis_editor_core_1.BasePlugin));
exports.ChartPlugin = ChartPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(ChartPlugin);
