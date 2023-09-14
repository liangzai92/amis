"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var validator_1 = require("../../validator");
var tinymceToolbarsDelimiter = ' ';
var tinymceOptions = [
    'advlist',
    'autolink',
    'link',
    'image',
    'lists',
    'charmap',
    'preview',
    'anchor',
    'pagebreak',
    'searchreplace',
    'wordcount',
    'visualblocks',
    'visualchars',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'nonbreaking',
    'table',
    'emoticons',
    'template',
    'help'
];
var tinymceToolbars = [
    'undo',
    'redo',
    'bold',
    'italic',
    'backcolor',
    'alignleft',
    'aligncenter',
    'alignright',
    'alignjustify',
    'bullist',
    'numlist',
    'outdent',
    'indent',
    'removeformat',
    'help',
    'charmap',
    'anchor',
    'pagebreak',
    'searchreplace',
    'wordcount',
    'visualblocks',
    'visualchars',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'nonbreaking',
    'table',
    'tableprops',
    'tabledelete',
    'tablecellprops',
    'tablemergecells',
    'tablesplitcells',
    'tableinsertrowbefore',
    'tableinsertrowafter',
    'tabledeleterow',
    'tablerowprops',
    'tableinsertcolbefore',
    'tableinsertcolafter',
    'tabledeletecol',
    'tablecutrow',
    'tablecopyrow',
    'tablepasterowbefore',
    'tablepasterowafter',
    'tablecutcol',
    'tablecopycol',
    'tablepastecolbefore',
    'tablepastecolafter',
    'tableinsertdialog',
    'tablecellvalign',
    'tablecellborderwidth',
    'tablecellborderstyle',
    'tablecellbackgroundcolor',
    'tablecellbordercolor',
    'tablecaption',
    'tablerowheader',
    'tablecolheader',
    'emoticons',
    'template',
    'link',
    'openlink',
    'unlink',
    'image',
    'preview',
    'alignnone',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'cut',
    'copy',
    'paste',
    'selectall',
    'newdocument',
    'remove',
    'print',
    'hr',
    'blockquote',
    'forecolor',
    'visualaid',
    'lineheight',
    'pastetext'
];
var froalaOptions = [
    'paragraphFormat',
    'quote',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'formatOL',
    'formatUL',
    'align',
    'insertLink',
    'insertImage',
    'insertTable',
    'undo',
    'redo',
    'html'
];
var froalaOptionsPipeOut = function (arr) {
    return froalaOptions.filter(function (item) { return arr.find(function (a) { return a === item; }); });
};
var RichTextControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(RichTextControlPlugin, _super);
    function RichTextControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-rich-text';
        _this.$schema = '/schemas/RichTextControlSchema.json';
        // 组件名称
        _this.name = '富文本编辑器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-newspaper-o';
        _this.pluginIcon = 'input-rich-text-plugin';
        _this.description = '可自定义富文本的配置栏';
        _this.docLink = '/amis/zh-CN/components/form/input-rich-text';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-rich-text',
            label: '富文本',
            name: 'rich-text',
            vendor: 'tinymce'
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
        _this.panelTitle = '富文本';
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var _a;
            // 有设置这个就默认使用 froala
            var hasRichTextToken = !!((_a = _this.manager.env) === null || _a === void 0 ? void 0 : _a.richTextToken);
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                (0, amis_editor_core_1.getSchemaTpl)('valueFormula', {
                                    rendererSchema: tslib_1.__assign(tslib_1.__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'textarea' }),
                                    label: '默认值'
                                }),
                                {
                                    type: 'select',
                                    name: 'vendor',
                                    label: '类型',
                                    value: hasRichTextToken ? 'froala' : 'tinymce',
                                    options: ['tinymce', 'froala'],
                                    onChange: function (value, oldValue, model, form) {
                                        if (value === 'tinymce') {
                                            form.changeValue('options', {
                                                height: 400,
                                                width: undefined,
                                                menubar: true,
                                                quickInsertEnabled: undefined,
                                                charCounterCount: undefined,
                                                toolbarButtons: undefined,
                                                toolbarButtonsMD: undefined,
                                                toolbarButtonsSM: undefined
                                            });
                                        }
                                        else if (value === 'froala') {
                                            form.changeValue('options', {
                                                height: undefined,
                                                width: undefined,
                                                toolbar: undefined,
                                                menubar: undefined,
                                                quickInsertEnabled: true,
                                                charCounterCount: true
                                            });
                                        }
                                    }
                                },
                                // tinymce
                                {
                                    type: 'select',
                                    multiple: true,
                                    label: (0, amis_editor_core_1.tipedLabel)('插件', '查看 https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/ 文档'),
                                    name: 'options.plugins',
                                    visibleOn: 'data.vendor === "tinymce"',
                                    value: tslib_1.__spreadArray([], tslib_1.__read(tinymceOptions), false).join(','),
                                    searchable: true,
                                    maxTagCount: 5,
                                    overflowTagPopover: {
                                        title: '插件',
                                        offset: [0, 5]
                                    },
                                    options: tinymceOptions
                                },
                                {
                                    type: 'select',
                                    name: 'options.toolbar',
                                    multiple: true,
                                    label: '工具栏',
                                    searchable: true,
                                    maxTagCount: 5,
                                    overflowTagPopover: {
                                        title: '插件',
                                        offset: [0, 5]
                                    },
                                    visibleOn: 'data.vendor === "tinymce"',
                                    delimiter: tinymceToolbarsDelimiter,
                                    value: 'undo redo formatselect bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help',
                                    pipeOut: function (value) {
                                        var _a;
                                        var arr = (_a = value === null || value === void 0 ? void 0 : value.split(tinymceToolbarsDelimiter)) !== null && _a !== void 0 ? _a : [];
                                        return tinymceToolbars
                                            .filter(function (item) { return arr.find(function (a) { return a === item; }); })
                                            .join(' ');
                                    },
                                    options: tinymceToolbars
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '显示菜单栏',
                                    value: true,
                                    name: 'options.menubar',
                                    visibleOn: 'data.vendor === "tinymce"'
                                }),
                                // froala
                                {
                                    type: 'select',
                                    name: 'options.toolbarButtons',
                                    multiple: true,
                                    visibleOn: 'data.vendor === "froala"',
                                    maxTagCount: 5,
                                    overflowTagPopover: {
                                        title: '插件',
                                        offset: [0, 5]
                                    },
                                    label: (0, amis_editor_core_1.tipedLabel)('工具栏-大屏', '屏幕宽度≥1200px，参考文档：https://froala.com/wysiwyg-editor/docs/options/'),
                                    value: tslib_1.__spreadArray([], tslib_1.__read(froalaOptions), false),
                                    joinValues: false,
                                    extractValue: true,
                                    options: tslib_1.__spreadArray([], tslib_1.__read(froalaOptions), false),
                                    pipeOut: froalaOptionsPipeOut
                                },
                                {
                                    type: 'select',
                                    name: 'options.toolbarButtonsMD',
                                    multiple: true,
                                    visibleOn: 'data.vendor === "froala"',
                                    maxTagCount: 5,
                                    overflowTagPopover: {
                                        title: '插件',
                                        offset: [0, 5]
                                    },
                                    label: (0, amis_editor_core_1.tipedLabel)('工具栏-中屏', '屏幕宽度≥992px，如果不配置就和大屏设置的工具栏一致，参考文档：https://froala.com/wysiwyg-editor/docs/options/'),
                                    joinValues: false,
                                    extractValue: true,
                                    options: tslib_1.__spreadArray([], tslib_1.__read(froalaOptions), false),
                                    pipeOut: froalaOptionsPipeOut
                                },
                                {
                                    type: 'select',
                                    name: 'options.toolbarButtonsSM',
                                    multiple: true,
                                    visibleOn: 'data.vendor === "froala"',
                                    maxTagCount: 5,
                                    overflowTagPopover: {
                                        title: '插件',
                                        offset: [0, 5]
                                    },
                                    label: (0, amis_editor_core_1.tipedLabel)('工具栏-小屏', '屏幕宽度≥768px，如果不配置就和大屏设置的工具栏一致，参考文档：https://froala.com/wysiwyg-editor/docs/options/'),
                                    joinValues: false,
                                    extractValue: true,
                                    options: tslib_1.__spreadArray([], tslib_1.__read(froalaOptions), false),
                                    pipeOut: froalaOptionsPipeOut
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '快速插入',
                                    value: true,
                                    name: 'options.quickInsertEnabled',
                                    visibleOn: 'data.vendor === "froala"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    label: '字数统计',
                                    value: true,
                                    name: 'options.charCounterCount',
                                    visibleOn: 'data.vendor === "froala"'
                                }),
                                // 公用部分
                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                    mode: 'row',
                                    labelClassName: 'none',
                                    name: 'receiver',
                                    label: '图片接收接口',
                                    visibleOn: '${vendor === "tinymce" && CONTAINS(options.plugins, "image")}'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                    mode: 'row',
                                    labelClassName: 'none',
                                    name: 'receiver',
                                    label: '图片接收接口',
                                    visibleOn: 'data.vendor === "froala"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                    mode: 'row',
                                    labelClassName: 'none',
                                    name: 'videoReceiver',
                                    label: '视频接收接口',
                                    visibleOn: 'data.vendor === "froala"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark'),
                                (0, amis_editor_core_1.getSchemaTpl)('remark'),
                                (0, amis_editor_core_1.getSchemaTpl)('placeholder', {
                                    visibleOn: 'data.vendor !== "tinymce"'
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('description')
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', { tag: validator_1.ValidatorTag.Code })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                            {
                                title: '${vendor === "tinymce" ? "编辑器" : "编辑区域"}',
                                body: [
                                    {
                                        type: 'input-number',
                                        label: '高度',
                                        min: 0,
                                        name: 'options.height',
                                        visibleOn: 'data.vendor === "tinymce"'
                                    },
                                    {
                                        type: 'input-number',
                                        label: '高度',
                                        min: 150,
                                        max: 400,
                                        name: 'options.height',
                                        visibleOn: 'data.vendor === "froala"'
                                    }
                                ]
                            },
                            (0, amis_editor_core_1.getSchemaTpl)('style:formItem', {
                                renderer: context.info.renderer
                            }),
                            (0, amis_editor_core_1.getSchemaTpl)('style:classNames')
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    RichTextControlPlugin.id = 'RichTextControlPlugin';
    return RichTextControlPlugin;
}(amis_editor_core_3.BasePlugin));
exports.RichTextControlPlugin = RichTextControlPlugin;
(0, amis_editor_core_2.registerEditorPlugin)(RichTextControlPlugin);
