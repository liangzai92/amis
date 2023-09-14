"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGroupControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var validator_1 = require("../../validator");
var InputGroupControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(InputGroupControlPlugin, _super);
    function InputGroupControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-group';
        _this.$schema = '/schemas/InputGroupControlSchema.json';
        // 组件名称
        _this.name = '输入组合';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-object-group';
        _this.pluginIcon = 'input-group-plugin';
        _this.description = '输入组合，支持多种类型的控件组合';
        _this.docLink = '/amis/zh-CN/components/form/input-group';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-group',
            name: 'input-group',
            label: 'input 组合',
            body: [
                {
                    type: 'input-text',
                    inputClassName: 'b-r-none p-r-none',
                    name: 'input-group'
                },
                {
                    type: 'submit',
                    label: '提交',
                    level: 'primary'
                }
            ]
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
        _this.panelTitle = 'Input 组合';
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                preferTag: '内容区',
                renderMethod: 'render',
                matchRegion: function (elem) { return !!elem; }
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('description')
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', {
                                renderer: context.info.renderer,
                                schema: [
                                    (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                        label: '内联模式',
                                        name: 'inline',
                                        pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                    })
                                ]
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames')
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    InputGroupControlPlugin.id = 'InputGroupControlPlugin';
    InputGroupControlPlugin.scene = ['layout'];
    return InputGroupControlPlugin;
}(amis_editor_core_1.BasePlugin));
exports.InputGroupControlPlugin = InputGroupControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(InputGroupControlPlugin);
