"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TplPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
(0, amis_editor_core_3.setSchemaTpl)('tpl:content', (0, amis_editor_core_3.getSchemaTpl)('textareaFormulaControl', {
    label: '文字内容',
    mode: 'normal',
    visibleOn: 'data.wrapperComponent !== undefined',
    pipeIn: function (value, data) { return value || (data && data.html); },
    name: 'tpl'
}));
(0, amis_editor_core_3.setSchemaTpl)('tpl:rich-text', {
    label: '内容',
    type: 'input-rich-text',
    mode: 'normal',
    buttons: [
        'paragraphFormat',
        'quote',
        'textColor',
        'backgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        '|',
        'formatOL',
        'formatUL',
        'align',
        '|',
        'insertLink',
        'insertImage',
        'insertTable',
        '|',
        'undo',
        'redo',
        'fullscreen'
    ],
    minRows: 5,
    language: 'html',
    visibleOn: 'data.wrapperComponent === undefined',
    pipeIn: function (value, data) { return value || (data && data.html); },
    name: 'tpl'
});
(0, amis_editor_core_3.setSchemaTpl)('tpl:wrapperComponent', {
    name: 'wrapperComponent',
    type: 'select',
    pipeIn: function (value) { return (value === undefined ? 'rich-text' : value); },
    pipeOut: function (value) { return (value === 'rich-text' ? undefined : value); },
    label: '文字格式',
    options: [
        {
            label: '普通文字',
            value: ''
        },
        {
            label: '段落',
            value: 'p'
        },
        {
            label: '一级标题',
            value: 'h1'
        },
        {
            label: '二级标题',
            value: 'h2'
        },
        {
            label: '三级标题',
            value: 'h3'
        },
        {
            label: '四级标题',
            value: 'h4'
        },
        {
            label: '五级标题',
            value: 'h5'
        },
        {
            label: '六级标题',
            value: 'h6'
        },
        {
            label: '富文本',
            value: 'rich-text'
        }
    ],
    onChange: function (value, oldValue, model, form) {
        (value === undefined || oldValue === undefined) &&
            form.setValueByName('tpl', '');
    }
});
var TplPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TplPlugin, _super);
    function TplPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tpl';
        _this.$schema = '/schemas/TplSchema.json';
        _this.order = -200;
        // 组件名称
        _this.name = '文字';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-file-o';
        _this.pluginIcon = 'plain-plugin'; // 使用文字 icon
        _this.description = '用来展示文字或者段落，支持模板语法可用来关联动态数据。';
        _this.docLink = '/amis/zh-CN/components/tpl';
        _this.tags = ['展示'];
        _this.previewSchema = {
            type: 'tpl',
            tpl: '这是模板内容当前时间<%- new Date() %>'
        };
        _this.scaffold = {
            type: 'tpl',
            tpl: '请编辑内容',
            inline: true,
            wrapperComponent: ''
        };
        _this.panelTitle = '文字';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'click',
                eventLabel: '点击',
                description: '点击时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseenter',
                eventLabel: '鼠标移入',
                description: '鼠标移入时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseleave',
                eventLabel: '鼠标移出',
                description: '鼠标移出时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [];
        _this.panelBodyCreator = function (context) {
            // 在表格/CRUD/模型列表的一列里边
            var isInTable = /\/cell\/field\/tpl$/.test(context.path);
            return (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                !isInTable ? (0, amis_editor_core_3.getSchemaTpl)('tpl:wrapperComponent') : null,
                                (0, amis_editor_core_3.getSchemaTpl)('switch', {
                                    label: (0, amis_editor_core_4.tipedLabel)('内联模式', '内联模式默认采用 <code>span</code> 标签包裹内容、非内联将默认采用 <code>div</code> 标签作为容器。'),
                                    name: 'inline',
                                    pipeIn: (0, amis_editor_core_3.defaultValue)(true),
                                    hiddenOn: 'data.wrapperComponent !== ""'
                                }),
                                {
                                    type: 'input-number',
                                    label: '最大显示行数',
                                    name: 'maxLine',
                                    min: 0
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('tpl:content'),
                                {
                                    type: 'textarea',
                                    name: 'editorSetting.mock.tpl',
                                    mode: 'vertical',
                                    label: (0, amis_editor_core_4.tipedLabel)('填充假数据', '只在编辑区显示的假数据文本，运行时将显示文本实际内容'),
                                    pipeOut: function (value) { return (value === '' ? undefined : value); }
                                },
                                (0, amis_editor_core_3.getSchemaTpl)('tpl:rich-text')
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('status')
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('theme:common', {
                        exclude: ['layout'],
                        baseExtra: [
                            (0, amis_editor_core_3.getSchemaTpl)('theme:font', {
                                label: '文字',
                                name: 'font'
                            })
                        ]
                    })), false))
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        _this.popOverBody = [
            (0, amis_editor_core_3.getSchemaTpl)('tpl:content'),
            (0, amis_editor_core_3.getSchemaTpl)('tpl:rich-text'),
            (0, amis_editor_core_3.getSchemaTpl)('tpl:wrapperComponent')
        ];
        return _this;
    }
    TplPlugin.id = 'TplPlugin';
    TplPlugin.scene = ['layout'];
    return TplPlugin;
}(amis_editor_core_2.BasePlugin));
exports.TplPlugin = TplPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TplPlugin);
