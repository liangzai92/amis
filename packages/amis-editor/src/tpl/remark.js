"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amis_editor_core_1 = require("amis-editor-core");
var BaseControl_1 = require("../component/BaseControl");
(0, amis_editor_core_1.setSchemaTpl)('remark', (0, BaseControl_1.remarkTpl)({
    name: 'remark',
    label: '控件提示',
    labelRemark: '在输入控件旁展示提示，注意控件宽度需设置，否则提示触发图标将自动换行'
}));
(0, amis_editor_core_1.setSchemaTpl)('labelRemark', (0, BaseControl_1.remarkTpl)({
    name: 'labelRemark',
    label: '标题提示',
    labelRemark: '在标题旁展示提示'
}));
