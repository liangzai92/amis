"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagePlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var helper_1 = require("../renderer/event-control/helper");
var amis_editor_core_4 = require("amis-editor-core");
var amis_editor_core_5 = require("amis-editor-core");
var PagePlugin = /** @class */ (function (_super) {
    tslib_1.__extends(PagePlugin, _super);
    function PagePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'page';
        _this.$schema = '/schemas/PageSchema.json';
        // 组件名称
        _this.name = '页面';
        _this.isBaseComponent = true;
        // 只有顶级才会用到这个page组件
        _this.disabledRendererPlugin = true;
        _this.description = '页面渲染器，页面的顶级入口。包含多个区域，您可以选择在不同的区域里面放置不同的渲染器。';
        _this.docLink = '/amis/zh-CN/components/page';
        _this.tags = '容器';
        _this.icon = 'fa fa-desktop';
        // pluginIcon = 'page-plugin'; // 暂无新 icon
        _this.scaffold = {
            type: 'page',
            regions: ['body'],
            body: [
                {
                    type: 'tpl',
                    tpl: '内容'
                }
            ]
        };
        _this.previewSchema = {
            type: 'page',
            className: 'text-left b-a',
            asideClassName: 'w-xs',
            title: '标题',
            subTitle: '副标题',
            aside: '边栏',
            body: '内容'
        };
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
                eventName: 'inited',
                eventLabel: '初始化数据接口请求完成',
                description: '远程初始化数据接口请求完成时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    responseData: {
                                        type: 'object',
                                        title: '响应数据'
                                    },
                                    responseStatus: {
                                        type: 'number',
                                        title: '响应状态(0表示成功)'
                                    },
                                    responseMsg: {
                                        type: 'string',
                                        title: '响应消息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'pullRefresh',
                eventLabel: '下拉刷新',
                description: '开启下拉刷新后，下拉释放后触发（仅用于移动端）'
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
        ];
        // 普通容器类渲染器配置
        _this.regions = [
            { key: 'toolbar', label: '工具栏', preferTag: '工具栏内容' },
            { key: 'aside', label: '边栏', placeholder: '边栏内容' },
            { key: 'body', label: '内容区', placeholder: '页面内容' }
        ];
        _this.wrapper = amis_editor_core_1.ContainerWrapper;
        _this.panelTitle = '页面';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        {
                                            type: 'checkboxes',
                                            name: 'regions',
                                            label: '区域展示',
                                            pipeIn: function (value) {
                                                return Array.isArray(value)
                                                    ? value
                                                    : ['body', 'toolbar', 'aside', 'header'];
                                            },
                                            pipeOut: function (value) {
                                                return Array.isArray(value) && value.length
                                                    ? value
                                                    : ['body', 'toolbar', 'aside', 'header'];
                                            },
                                            joinValues: false,
                                            extractValue: true,
                                            inline: false,
                                            options: [
                                                {
                                                    label: '内容区',
                                                    value: 'body'
                                                },
                                                {
                                                    label: '标题栏',
                                                    value: 'header'
                                                },
                                                {
                                                    label: '工具栏',
                                                    value: 'toolbar'
                                                },
                                                {
                                                    label: '边栏',
                                                    value: 'aside'
                                                }
                                            ]
                                        },
                                        (0, amis_editor_core_3.getSchemaTpl)('pageTitle'),
                                        (0, amis_editor_core_3.getSchemaTpl)('pageSubTitle'),
                                        (0, amis_editor_core_3.getSchemaTpl)('remark', {
                                            label: '标题提示',
                                            hiddenOn: 'data.regions && !data.regions.includes("header") || !data.title'
                                        }),
                                        {
                                            type: 'ae-Switch-More',
                                            name: 'asideResizor',
                                            mode: 'normal',
                                            label: '边栏宽度可调节',
                                            hiddenOn: 'data.regions && !data.regions.includes("aside")',
                                            value: false,
                                            hiddenOnDefault: true,
                                            formType: 'extend',
                                            form: {
                                                body: [
                                                    {
                                                        type: 'input-number',
                                                        label: '最小宽度',
                                                        min: 0,
                                                        name: 'asideMinWidth',
                                                        pipeIn: (0, amis_editor_core_3.defaultValue)(160),
                                                        pipeOut: function (value) { return value || 0; }
                                                    },
                                                    {
                                                        type: 'input-number',
                                                        label: '最大宽度',
                                                        min: 0,
                                                        name: 'asideMaxWidth',
                                                        pipeIn: (0, amis_editor_core_3.defaultValue)(350),
                                                        pipeOut: function (value) { return value || 0; }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            type: 'switch',
                                            label: (0, amis_editor_core_4.tipedLabel)('边栏固定', '边栏内容是否固定，即不跟随内容区滚动'),
                                            name: 'asideSticky',
                                            inputClassName: 'is-inline',
                                            pipeIn: (0, amis_editor_core_3.defaultValue)(true),
                                            hiddenOn: 'data.regions && !data.regions.includes("aside")'
                                        }
                                    ]
                                },
                                {
                                    title: '数据',
                                    body: [
                                        // page组件下掉组件静态数据配置项，可通过页面变量来定义页面中的变量
                                        // getSchemaTpl('combo-container', {
                                        //   type: 'input-kv',
                                        //   mode: 'normal',
                                        //   name: 'data',
                                        //   label: '组件静态数据'
                                        // }),
                                        (0, amis_editor_core_3.getSchemaTpl)('apiControl', {
                                            name: 'initApi',
                                            mode: 'row',
                                            labelClassName: 'none',
                                            label: (0, amis_editor_core_4.tipedLabel)('初始化接口', '用来获取初始数据的 api, 返回的数据可以整个 page 级别使用')
                                        })
                                    ]
                                },
                                ,
                                {
                                    title: '移动端',
                                    body: [
                                        {
                                            type: 'combo',
                                            name: 'pullRefresh',
                                            mode: 'normal',
                                            noBorder: true,
                                            items: [
                                                {
                                                    type: 'ae-Switch-More',
                                                    mode: 'normal',
                                                    label: '下拉刷新',
                                                    name: 'disabled',
                                                    formType: 'extend',
                                                    value: true,
                                                    trueValue: false,
                                                    falseValue: true,
                                                    autoFocus: false,
                                                    form: {
                                                        body: [
                                                            {
                                                                name: 'pullingText',
                                                                label: (0, amis_editor_core_4.tipedLabel)('下拉文案', '下拉过程提示文案'),
                                                                type: 'input-text'
                                                            },
                                                            {
                                                                name: 'loosingText',
                                                                label: (0, amis_editor_core_4.tipedLabel)('释放文案', '释放过程提示文案'),
                                                                type: 'input-text'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', tslib_1.__spreadArray([], tslib_1.__read((0, amis_editor_core_3.getSchemaTpl)('theme:common', {
                                exclude: ['layout'],
                                classname: 'baseControlClassName',
                                baseTitle: '基本样式',
                                extra: [
                                    (0, amis_editor_core_3.getSchemaTpl)('theme:base', {
                                        classname: 'bodyControlClassName',
                                        title: '内容区样式',
                                        hiddenOn: 'data.regions && !data.regions.includes("body")'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('theme:base', {
                                        classname: 'headerControlClassName',
                                        title: '标题栏样式',
                                        extra: [
                                            (0, amis_editor_core_3.getSchemaTpl)('theme:font', {
                                                label: '文字',
                                                name: 'font'
                                            })
                                        ],
                                        hiddenOn: 'data.regions && !data.regions.includes("header")'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('theme:base', {
                                        classname: 'toolbarControlClassName',
                                        title: '工具栏样式',
                                        hiddenOn: 'data.regions && !data.regions.includes("toolbar")'
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('theme:base', {
                                        classname: 'asideControlClassName',
                                        title: '边栏样式',
                                        hiddenOn: 'data.regions && !data.regions.includes("aside")'
                                    })
                                ]
                            })), false))
                        ]
                    },
                    {
                        title: '事件',
                        className: 'p-none',
                        body: [
                            (0, amis_editor_core_3.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                        ]
                    }
                    // {
                    //   type: 'combo',
                    //   name: 'definitions',
                    //   multiple: true,
                    //   multiLine: true,
                    //   label: '定义',
                    //   description: '定义类型，定义完成后可被子节点引用。',
                    //   pipeIn: (value: any) =>
                    //     value
                    //       ? Object.keys(value).map(key => ({
                    //           key,
                    //           value: value[key]
                    //         }))
                    //       : [],
                    //   pipeOut: (value: any) =>
                    //     Array.isArray(value)
                    //       ? value.reduce(
                    //           (obj, current) => ({
                    //             ...obj,
                    //             [current.key || '']: current.value
                    //               ? current.value
                    //               : {type: 'tpl', tpl: '内容', wrapperComponent: ''}
                    //           }),
                    //           {}
                    //         )
                    //       : undefined,
                    //   items: [
                    //     {
                    //       type: 'input-text',
                    //       name: 'key',
                    //       label: 'Key',
                    //       required: true
                    //     },
                    //     {
                    //       children: ({index}: any) => (
                    //         <Button
                    //           size="sm"
                    //           level="danger"
                    //           // onClick={this.handleEditDefinitionDetail.bind(
                    //           //   this,
                    //           //   index
                    //           // )}
                    //           block
                    //         >
                    //           配置详情
                    //         </Button>
                    //       )
                    //     }
                    //   ]
                    // }
                    // ]
                    // }
                ])
            ];
        };
        return _this;
    }
    PagePlugin.prototype.buildDataSchemas = function (node, region, trigger) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var jsonschema, pool, current, schema, _e, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        jsonschema = tslib_1.__assign({}, (0, amis_editor_core_5.jsonToJsonSchema)((0, amis_editor_core_1.JSONPipeOut)(node.schema.data)));
                        pool = node.children.concat();
                        _g.label = 1;
                    case 1:
                        if (!pool.length) return [3 /*break*/, 5];
                        current = pool.shift();
                        schema = current.schema;
                        if (!(((_a = current.rendererConfig) === null || _a === void 0 ? void 0 : _a.isFormItem) && (schema === null || schema === void 0 ? void 0 : schema.name))) return [3 /*break*/, 3];
                        _e = jsonschema.properties;
                        _f = schema.name;
                        return [4 /*yield*/, ((_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, undefined, trigger, node))];
                    case 2:
                        _e[_f] =
                            _g.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (!((_d = current.rendererConfig) === null || _d === void 0 ? void 0 : _d.storeType)) {
                            pool.push.apply(pool, tslib_1.__spreadArray([], tslib_1.__read(current.children), false));
                        }
                        _g.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, jsonschema];
                }
            });
        });
    };
    PagePlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
        if (e === 'inited') {
            var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
            var jsonschema = tslib_1.__assign({ $id: 'pageInitedData' }, (0, amis_editor_core_5.jsonToJsonSchema)(data.responseData));
            scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
            scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
        }
    };
    PagePlugin.id = 'PagePlugin';
    return PagePlugin;
}(amis_editor_core_3.BasePlugin));
exports.PagePlugin = PagePlugin;
(0, amis_editor_core_2.registerEditorPlugin)(PagePlugin);
