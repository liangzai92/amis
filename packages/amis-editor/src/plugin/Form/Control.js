"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var BaseControl_1 = require("../../component/BaseControl");
var ControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(ControlPlugin, _super);
    function ControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'control';
        _this.$schema = '/schemas/FormControlSchema.json';
        // 组件名称
        _this.name = '表单项容器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-object-group';
        _this.pluginIcon = 'form-group-plugin';
        _this.description = '表单项容器';
        _this.docLink = '/amis/zh-CN/components/form/group';
        _this.tags = ['容器'];
        /**
         * 组件选择面板中隐藏，和Container合并
         */
        _this.disabledRendererPlugin = true;
        _this.scaffold = {
            type: 'control',
            label: '表单项容器',
            body: [
                {
                    type: 'tpl',
                    wrapperComponent: '',
                    tpl: 'a'
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
        // 容器配置
        _this.regions = [
            {
                key: 'body',
                label: '元素集合',
                preferTag: '表单项'
            }
        ];
        _this.panelTitle = '表单项容器';
        _this.panelBodyCreator = function (context) {
            return (0, BaseControl_1.formItemControl)({
                common: {
                    replace: true,
                    body: [
                        {
                            children: (react_1.default.createElement(amis_1.Button, { className: "m-b", onClick: function () { return _this.manager.showRendererPanel('表单项'); }, level: "danger", tooltip: "\u63D2\u5165\u4E00\u4E2A\u65B0\u7684\u5143\u7D20", size: "sm", block: true }, "\u65B0\u589E\u5143\u7D20"))
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                        (0, amis_editor_core_1.getSchemaTpl)('remark'),
                        (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                        (0, amis_editor_core_1.getSchemaTpl)('description')
                    ]
                }
            });
        };
        return _this;
    }
    ControlPlugin.id = 'ControlPlugin';
    return ControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.ControlPlugin = ControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(ControlPlugin);
