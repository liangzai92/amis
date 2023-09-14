"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticControlPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
// 快速编辑
(0, amis_editor_core_1.setSchemaTpl)('quickEdit', function (patch, manager) { return ({
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'quickEdit',
    label: '可快速编辑',
    value: false,
    hiddenOnDefault: true,
    formType: 'extend',
    pipeIn: function (value) { return !!value; },
    form: {
        body: [
            {
                label: '编辑模式',
                name: 'quickEdit.mode',
                type: 'button-group-select',
                inputClassName: 'items-center',
                visibleOn: 'data.quickEdit',
                pipeIn: (0, amis_editor_core_1.defaultValue)('popOver'),
                options: [
                    {
                        label: '下拉',
                        value: 'popOver'
                    },
                    {
                        label: '内嵌',
                        value: 'inline'
                    }
                ]
            },
            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                name: 'quickEdit.saveImmediately',
                label: (0, amis_editor_core_1.tipedLabel)('立即保存', '开启后修改即提交，而不是标记修改批量提交。'),
                visibleOn: 'data.quickEdit',
                pipeIn: function (value) { return !!value; }
            }),
            (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                name: 'quickEdit.saveImmediately.api',
                label: '保存接口',
                mode: 'row',
                description: '单独给立即保存配置接口，如果不配置，则默认使用quickSaveItemApi。',
                visibleOn: 'this.quickEdit && this.quickEdit.saveImmediately'
            }),
            {
                name: 'quickEdit',
                asFormItem: true,
                visibleOn: 'data.quickEdit',
                mode: 'row',
                children: function (_a) {
                    var value = _a.value, onChange = _a.onChange, data = _a.data;
                    if (value === true) {
                        value = {};
                    }
                    var originMode = value.mode;
                    value = tslib_1.__assign({ type: 'input-text', name: data.name }, value);
                    delete value.mode;
                    // todo 多个快速编辑表单模式看来只能代码模式编辑了。
                    return (react_1.default.createElement(amis_1.Button, { block: true, level: "primary", onClick: function () {
                            manager.openSubEditor({
                                title: '配置快速编辑类型',
                                value: value,
                                slot: {
                                    type: 'form',
                                    mode: 'normal',
                                    body: ['$$'],
                                    wrapWithPanel: false
                                },
                                onChange: function (value) {
                                    return onChange(tslib_1.__assign(tslib_1.__assign({}, value), { mode: originMode }), 'quickEdit');
                                }
                            });
                        } }, "\u914D\u7F6E\u5FEB\u901F\u7F16\u8F91"));
                }
            }
        ]
    }
}); });
// 查看更多
(0, amis_editor_core_1.setSchemaTpl)('morePopOver', function (patch, manager) { return ({
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'popOver',
    label: '查看更多展示',
    value: false,
    hiddenOnDefault: true,
    formType: 'extend',
    pipeIn: function (value) { return !!value; },
    form: {
        body: [
            {
                label: '弹出模式',
                name: 'popOver.mode',
                type: 'button-group-select',
                visibleOn: 'data.popOver',
                pipeIn: (0, amis_editor_core_1.defaultValue)('popOver'),
                options: [
                    {
                        label: '浮层',
                        value: 'popOver'
                    },
                    {
                        label: '弹框',
                        value: 'dialog'
                    },
                    {
                        label: '抽屉',
                        value: 'drawer'
                    }
                ]
            },
            {
                name: 'popOver.position',
                label: '浮层位置',
                type: 'select',
                visibleOn: 'data.popOver && (data.popOver.mode === "popOver" || !data.popOver.mode)',
                pipeIn: (0, amis_editor_core_1.defaultValue)('center'),
                options: [
                    {
                        label: '目标左上角',
                        value: 'left-top'
                    },
                    {
                        label: '目标右上角',
                        value: 'right-top'
                    },
                    {
                        label: '目标中部',
                        value: 'center'
                    },
                    {
                        label: '目标左下角',
                        value: 'left-bottom'
                    },
                    {
                        label: '目标右下角',
                        value: 'right-bottom'
                    },
                    {
                        label: '页面左上角',
                        value: 'fixed-left-top'
                    },
                    {
                        label: '页面右上角',
                        value: 'fixed-right-top'
                    },
                    {
                        label: '页面左下角',
                        value: 'fixed-left-bottom'
                    },
                    {
                        label: '页面右下角',
                        value: 'fixed-right-bottom'
                    }
                ]
            },
            {
                visibleOn: 'data.popOver',
                name: 'popOver',
                mode: 'row',
                asFormItem: true,
                children: function (_a) {
                    var value = _a.value, onChange = _a.onChange;
                    value = tslib_1.__assign({ type: 'panel', title: '查看详情', body: '内容详情' }, value);
                    return (react_1.default.createElement(amis_1.Button, { block: true, level: "primary", onClick: function () {
                            manager.openSubEditor({
                                title: '配置查看更多展示内容',
                                value: value,
                                onChange: function (value) { return onChange(value, 'quickEdit'); }
                            });
                        } }, "\u67E5\u770B\u66F4\u591A\u5185\u5BB9\u914D\u7F6E"));
                }
            }
        ]
    }
}); });
// 可复制
(0, amis_editor_core_1.setSchemaTpl)('copyable', {
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'copyable',
    label: '可复制',
    value: false,
    hiddenOnDefault: true,
    formType: 'extend',
    pipeIn: function (value) { return !!value; },
    form: {
        body: [
            {
                label: '复制内容模板',
                name: 'copyable.content',
                type: 'textarea',
                mode: 'row',
                maxRow: 2,
                visibleOn: 'data.copyable',
                description: '默认为当前字段值，可定制。'
            }
        ]
    }
});
var StaticControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(StaticControlPlugin, _super);
    function StaticControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'static';
        _this.$schema = '/schemas/StaticControlSchema.json';
        // 组件名称
        _this.name = '静态展示框';
        _this.isBaseComponent = true;
        _this.disabledRendererPlugin = true;
        _this.icon = 'fa fa-info';
        _this.pluginIcon = 'static-plugin';
        _this.description = '纯用来展示数据，可用来展示 json、date、image、progress 等数据';
        _this.docLink = '/amis/zh-CN/components/form/static';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'static',
            label: '描述'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: '静态值' })
            ]
        };
        _this.multifactor = true;
        _this.notRenderFormZone = true;
        _this.panelTitle = '静态展示';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    type: 'alert',
                                    inline: false,
                                    level: 'warning',
                                    className: 'text-sm',
                                    body: '<p>当前组件已停止维护，建议您使用<a href="/amis/zh-CN/components/form/formitem#%E9%85%8D%E7%BD%AE%E9%9D%99%E6%80%81%E5%B1%95%E7%A4%BA" target="_blank">静态展示</a>新特性实现表单项的静态展示。</p>'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                    required: false
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                // getSchemaTpl('value'),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    name: 'tpl'
                                    // rendererSchema: {
                                    //   ...context?.schema,
                                    //   type: 'textarea', // 改用多行文本编辑
                                    //   value: context?.schema.tpl // 避免默认值丢失
                                    // }
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('quickEdit', {}, _this.manager),
                                (0, amis_editor_core_1.getSchemaTpl)('morePopOver', {}, _this.manager),
                                (0, amis_editor_core_1.getSchemaTpl)('copyable'),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_1.getSchemaTpl)('description')
                                /*{
                                    children: (
                                      <Button
                                        size="sm"
                                        level="info"
                                        className="m-b"
                                        block
                                        onClick={this.exchangeRenderer.bind(this, context.id)}
                                      >
                                        更改渲染器类型
                                      </Button>
                                    )
                                },*/
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', {
                            isFormItem: true,
                            unsupportStatic: true
                        })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: renderer }),
                        {
                            title: '控件',
                            body: [(0, amis_editor_core_1.getSchemaTpl)('borderMode')]
                        },
                        {
                            title: 'CSS类名',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    label: '整体'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    label: '标签',
                                    name: 'labelClassName'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    label: '控件',
                                    name: 'inputClassName'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    label: '描述',
                                    name: 'descriptionClassName',
                                    visibleOn: 'this.description'
                                })
                            ]
                        }
                    ])
                }
            ]);
        };
        return _this;
        /*exchangeRenderer(id: string) {
          this.manager.showReplacePanel(id, '展示');
        }*/
    }
    StaticControlPlugin.prototype.filterProps = function (props, node) {
        props.$$id = node.id;
        if (typeof props.value === 'undefined') {
            props.value = (0, amis_editor_core_4.mockValue)(props);
        }
        return props;
    };
    StaticControlPlugin.id = 'StaticControlPlugin';
    StaticControlPlugin.scene = ['layout'];
    return StaticControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.StaticControlPlugin = StaticControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(StaticControlPlugin);
