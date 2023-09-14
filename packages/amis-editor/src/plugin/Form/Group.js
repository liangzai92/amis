"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_1 = require("amis");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_editor_core_4 = require("amis-editor-core");
var GroupControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(GroupControlPlugin, _super);
    function GroupControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'group';
        _this.$schema = '/schemas/GroupControlSchema.json';
        _this.disabledRendererPlugin = true; // 组件面板不显示
        // 组件名称
        _this.name = '表单组';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-id-card-o';
        _this.pluginIcon = 'form-group-plugin';
        _this.description = '水平展示多个表单项';
        _this.docLink = '/amis/zh-CN/components/form/group';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'group',
            body: [
                {
                    type: 'input-text',
                    label: '文本',
                    name: 'var1'
                },
                {
                    type: 'input-text',
                    label: '文本',
                    name: 'var2'
                }
            ],
            label: false
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: [
                tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { mode: 'normal' })
            ]
        };
        // 容器配置
        _this.regions = [
            {
                key: 'body',
                label: '子表单',
                renderMethod: 'renderInput',
                preferTag: '表单项',
                wrapperResolve: function (dom) { return dom; }
            }
        ];
        _this.panelTitle = '表单组';
        _this.panelBody = [
            (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                {
                    title: '常规',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                        (0, amis_editor_core_3.getSchemaTpl)('label'),
                        (0, amis_editor_core_3.getSchemaTpl)('description', {
                            visible: 'this.label'
                        }),
                        {
                            children: (react_1.default.createElement(amis_1.Button, { className: "m-b", onClick: function () {
                                    // this.manager.showInsertPanel('body')
                                    _this.manager.showRendererPanel('表单项', '请从左侧组件面板中点击添加表单项');
                                }, level: "danger", tooltip: "\u63D2\u5165\u4E00\u4E2A\u65B0\u7684\u5143\u7D20", size: "sm", block: true }, "\u65B0\u589E\u5143\u7D20"))
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('remark'),
                        (0, amis_editor_core_3.getSchemaTpl)('labelRemark')
                    ]
                },
                {
                    title: '外观',
                    body: [
                        (0, amis_editor_core_3.getSchemaTpl)('formItemMode'),
                        (0, amis_editor_core_3.getSchemaTpl)('horizontalMode'),
                        (0, amis_editor_core_3.getSchemaTpl)('horizontal', {
                            visibleOn: '(data.$$formMode == "horizontal" || data.mode == "horizontal") && data.label !== false && data.horizontal',
                            pipeIn: function (value, data) {
                                value =
                                    value ||
                                        (data.formHorizontal &&
                                            (0, amis_editor_core_4.makeHorizontalDeeper)(data.formHorizontal, data.body.length));
                                return {
                                    leftRate: value && typeof value.left === 'number'
                                        ? value.left
                                        : value &&
                                            /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(value.left)
                                            ? parseInt(RegExp.$1, 10)
                                            : 2,
                                    leftFixed: (value && value.leftFixed) || ''
                                };
                            }
                        }),
                        (0, amis_editor_core_3.getSchemaTpl)('subFormItemMode'),
                        (0, amis_editor_core_3.getSchemaTpl)('subFormHorizontalMode'),
                        (0, amis_editor_core_3.getSchemaTpl)('subFormHorizontal'),
                        {
                            name: 'body',
                            type: 'combo',
                            label: '列宽度配置',
                            multiple: true,
                            removable: false,
                            addable: false,
                            multiLine: true,
                            visibleOn: 'data.$$formMode != "inline"',
                            items: [
                                {
                                    type: 'button-group-select',
                                    name: 'columnRatio',
                                    label: '宽度设置',
                                    tiled: true,
                                    pipeIn: function (value, data) {
                                        if (typeof value === 'number') {
                                            return 'custom';
                                        }
                                        else if (data.columnClassName &&
                                            /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(data.columnClassName)) {
                                            return 'custom';
                                        }
                                        return value || '';
                                    },
                                    pipeOut: function (value) { return (value === 'custom' ? 2 : value); },
                                    options: [
                                        {
                                            value: '',
                                            label: '适配宽度'
                                        },
                                        {
                                            value: 'auto',
                                            label: '适配内容'
                                        },
                                        {
                                            value: 'custom',
                                            label: '自定义'
                                        }
                                    ]
                                },
                                {
                                    label: '宽度占比',
                                    type: 'input-range',
                                    name: 'columnRatio',
                                    visibleOn: 'typeof this.columnRatio === "number" || this.columnClassName && /\\bcol\\-(?:xs|sm|md|lg)\\-(\\d+)\\b/.test(this.columnClassName)',
                                    pipeIn: function (value, data) {
                                        if (typeof value === 'number') {
                                            return value;
                                        }
                                        if (!data.columnClassName ||
                                            !/\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(data.columnClassName)) {
                                            return 2;
                                        }
                                        return parseInt(RegExp.$1, 10) || 2;
                                    },
                                    min: 1,
                                    max: 12,
                                    step: 1
                                }
                            ]
                        },
                        {
                            type: 'button-group-select',
                            name: 'gap',
                            label: '间隔大小',
                            pipeIn: (0, amis_editor_core_3.defaultValue)(''),
                            size: 'sm',
                            tiled: true,
                            clearable: true,
                            options: [
                                {
                                    value: 'xs',
                                    label: '极小'
                                },
                                {
                                    value: 'sm',
                                    label: '小'
                                },
                                {
                                    value: 'md',
                                    label: '中'
                                },
                                {
                                    value: 'lg',
                                    label: '大'
                                }
                            ]
                        },
                        (0, amis_editor_core_3.getSchemaTpl)('className'),
                        {
                            name: 'body',
                            type: 'combo',
                            label: '列 CSS 类名配置',
                            multiple: true,
                            removable: false,
                            addable: false,
                            items: [
                                {
                                    type: 'input-text',
                                    name: 'columnClassName'
                                }
                            ]
                        }
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
    GroupControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var _this = this;
        var id = _a.id, schema = _a.schema, region = _a.region, selections = _a.selections, info = _a.info;
        if (selections.length ||
            info.plugin !== this ||
            !Array.isArray(schema.body) ||
            schema.body.length < 2) {
            return;
        }
        menus.push({
            label: '变成多行',
            onSelect: function () {
                var store = _this.manager.store;
                var rootSchema = store.schema;
                rootSchema = (0, amis_editor_core_4.JSONUpdate)(rootSchema, id, (0, amis_editor_core_4.JSONPipeIn)(schema.body), true);
                store.traceableSetSchema(rootSchema);
            }
        });
    };
    GroupControlPlugin.id = 'GroupControlPlugin';
    return GroupControlPlugin;
}(amis_editor_core_2.BasePlugin));
exports.GroupControlPlugin = GroupControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(GroupControlPlugin);
