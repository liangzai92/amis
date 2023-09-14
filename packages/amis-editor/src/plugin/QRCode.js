"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var QRCodePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(QRCodePlugin, _super);
    function QRCodePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'qrcode';
        _this.$schema = '/schemas/QRCodeSchema.json';
        // 组件名称
        _this.name = '二维码';
        _this.isBaseComponent = true;
        _this.description = '可以用来生成二维码';
        _this.docLink = '/amis/zh-CN/components/qrcode';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-qrcode';
        _this.pluginIcon = 'qrcode-plugin';
        _this.scaffold = {
            type: 'qrcode',
            value: 'https://amis.baidu.com'
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.panelTitle = '二维码';
        _this.panelBody = [
            (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        {
                            name: 'value',
                            type: 'input-text',
                            label: '二维码值',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('https://www.baidu.com'),
                            description: '支持使用 <code>\\${xxx}</code> 来获取变量'
                        },
                        {
                            name: 'level',
                            type: 'select',
                            label: '复杂度',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('L'),
                            options: [
                                {
                                    label: 'L',
                                    value: 'L'
                                },
                                {
                                    label: 'M',
                                    value: 'M'
                                },
                                {
                                    label: 'Q',
                                    value: 'Q'
                                },
                                {
                                    label: 'H',
                                    value: 'H'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '外观',
                    body: [
                        {
                            name: 'codeSize',
                            type: 'input-number',
                            label: '宽高值',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(128)
                        },
                        {
                            name: 'backgroundColor',
                            type: 'input-color',
                            label: '背景色',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('#fff')
                        },
                        {
                            name: 'foregroundColor',
                            type: 'input-color',
                            label: '前景色',
                            pipeIn: (0, amis_editor_core_3.defaultValue)('#000')
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('className')
                    ]
                },
                {
                    title: '显隐',
                    body: [(0, amis_editor_core_3.getSchemaTpl)('ref'), (0, amis_editor_core_3.getSchemaTpl)('visible')]
                }
            ])
        ];
        return _this;
    }
    QRCodePlugin.id = 'QRCodePlugin';
    QRCodePlugin.scene = ['layout'];
    return QRCodePlugin;
}(amis_editor_core_2.BasePlugin));
exports.QRCodePlugin = QRCodePlugin;
(0, amis_editor_core_1.registerEditorPlugin)(QRCodePlugin);
