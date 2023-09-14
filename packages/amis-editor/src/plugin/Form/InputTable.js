"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableControlPlugin = void 0;
var tslib_1 = require("tslib");
var amis_editor_core_1 = require("amis-editor-core");
var amis_core_1 = require("amis-core");
var DSBuilderManager_1 = require("../../builder/DSBuilderManager");
var validator_1 = require("../../validator");
var helper_1 = require("../../renderer/event-control/helper");
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var util_1 = require("../../util");
var TableControlPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(TableControlPlugin, _super);
    function TableControlPlugin(manager) {
        var _this = _super.call(this, manager) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-table';
        _this.$schema = '/schemas/TableControlSchema.json';
        // 组件名称
        _this.name = '表格编辑框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-table';
        _this.pluginIcon = 'table-plugin';
        _this.description = '可以用来展现数据的,可以用来展示数组类型的数据，比如 multiple  的子 form';
        _this.docLink = '/amis/zh-CN/components/form/input-table';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-table',
            name: 'table',
            label: '表格表单',
            columns: [
                {
                    label: '名称',
                    name: 'name',
                    quickEdit: {
                        type: 'input-text',
                        name: 'name1'
                    }
                },
                {
                    label: '分数',
                    name: 'score',
                    quickEdit: {
                        type: 'input-number',
                        mode: 'inline',
                        name: 'score'
                    }
                },
                {
                    label: '等级',
                    name: 'level',
                    quickEdit: {
                        type: 'select',
                        name: 'level',
                        options: [
                            {
                                label: 'A',
                                value: 'A'
                            },
                            {
                                label: 'B',
                                value: 'B'
                            },
                            {
                                label: 'C',
                                value: 'C'
                            }
                        ]
                    }
                }
            ],
            addable: false,
            footerAddBtn: {
                label: '新增',
                icon: 'fa fa-plus'
            },
            strictMode: true
        };
        _this.regions = [
            {
                key: 'columns',
                label: '列集合',
                renderMethod: 'renderTableContent',
                preferTag: '展示',
                dndMode: 'position-h'
            }
        ];
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: tslib_1.__assign(tslib_1.__assign({}, _this.scaffold), { value: [{ color: 'green', name: '绿色' }] })
        };
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelTitle = '表格编辑';
        _this.events = [
            {
                eventName: 'add',
                eventLabel: '添加行',
                description: '点击左下角添加按钮 或 某一行右侧操作栏添加按钮时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    index: {
                                        type: 'array',
                                        title: '新增索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'addConfirm',
                eventLabel: '确认添加',
                description: '开启”确认模式“，点击添加按钮，填入数据后点击“保存”按钮后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '新增行记录'
                                    },
                                    index: {
                                        type: 'number',
                                        title: '新增索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'addSuccess',
                eventLabel: '添加成功',
                description: '开启”确认模式“并且配置”新增接口“，点击“保存”后成功添加时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '新增行记录'
                                    },
                                    index: {
                                        type: 'number',
                                        title: '新增索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'addFail',
                eventLabel: '添加失败',
                description: '开启”确认模式“并且配置”新增接口“，点击“保存”后调用接口失败时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '新增行记录'
                                    },
                                    index: {
                                        type: 'number',
                                        title: '新增索引'
                                    },
                                    error: {
                                        type: 'object',
                                        title: '请求失败后接口返回的错误信息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'edit',
                eventLabel: '编辑行',
                description: '点击某一行右侧操作栏“编辑”按钮时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '所在行记录'
                                    },
                                    index: {
                                        type: 'number',
                                        title: '所在行记录索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'editConfirm',
                eventLabel: '确认编辑',
                description: '开启”确认模式“，点击“编辑”按钮，填入数据后点击“保存”按钮后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '所在行记录'
                                    },
                                    index: {
                                        type: 'number',
                                        title: '所在行记录索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'editSuccess',
                eventLabel: '编辑成功',
                description: '开启”确认模式“并且配置”编辑接口“，点击“保存”后成功编辑时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '所在行记录'
                                    },
                                    index: {
                                        type: 'number',
                                        title: '所在行记录索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'editFail',
                eventLabel: '编辑失败',
                description: '开启”确认模式“并且配置”编辑接口“，点击“保存”后调用接口失败时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '所在行记录'
                                    },
                                    index: {
                                        type: 'number',
                                        title: '所在行记录索引'
                                    },
                                    error: {
                                        type: 'object',
                                        title: '请求错误后返回的错误信息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'delete',
                eventLabel: '删除行',
                description: '点击某一行右侧操作栏“删除”按钮时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '所在行记录'
                                    },
                                    index: {
                                        type: 'object',
                                        title: '所在行记录索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'deleteSuccess',
                eventLabel: '删除成功',
                description: '配置了“删除接口”，调用接口成功时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '所在行记录'
                                    },
                                    index: {
                                        type: 'object',
                                        title: '所在行记录索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'deleteFail',
                eventLabel: '删除失败',
                description: '配置了“删除接口”，调用接口失败时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '所在行记录'
                                    },
                                    index: {
                                        type: 'object',
                                        title: '所在行记录索引'
                                    },
                                    error: {
                                        type: 'object',
                                        title: '请求失败后接口返回的错误信息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '表格数据发生改变时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '列表记录'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        _this.actions = [
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            },
            {
                actionType: 'addItem',
                actionLabel: '添加行',
                description: '添加行数据',
                innerArgs: ['item', 'index'],
                schema: (0, helper_1.getArgsWrapper)({
                    type: 'container',
                    body: [
                        {
                            type: 'input-number',
                            name: 'index',
                            mode: 'horizontal',
                            horizontal: {
                                leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
                            },
                            label: '插入位置',
                            size: 'lg',
                            placeholder: '请输入行号，为空则在尾部插入'
                        },
                        {
                            type: 'combo',
                            name: 'value',
                            label: '数据设置',
                            multiple: true,
                            removable: true,
                            required: true,
                            addable: true,
                            strictMode: false,
                            canAccessSuperData: true,
                            mode: 'horizontal',
                            size: 'lg',
                            addButtonText: '新增一行',
                            items: [
                                {
                                    type: 'combo',
                                    name: 'item',
                                    label: false,
                                    renderLabel: false,
                                    multiple: true,
                                    removable: true,
                                    required: true,
                                    addable: true,
                                    strictMode: false,
                                    canAccessSuperData: true,
                                    className: 'm-l',
                                    size: 'lg',
                                    mode: 'horizontal',
                                    addButtonText: '新增字段',
                                    items: [
                                        {
                                            name: 'key',
                                            type: 'input-text',
                                            source: '${__setValueDs}',
                                            labelField: 'label',
                                            valueField: 'value',
                                            required: true
                                        },
                                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                                            name: 'val',
                                            variables: '${variables}'
                                        })
                                    ]
                                }
                            ]
                        }
                    ]
                })
            },
            {
                actionType: 'deleteItem',
                actionLabel: '删除行',
                description: '删除某一行数据',
                innerArgs: ['condition', 'index'],
                schema: (0, helper_1.getArgsWrapper)({
                    type: 'container',
                    body: [
                        {
                            type: 'radios',
                            name: '__deleteType',
                            inputClassName: 'event-action-radio',
                            mode: 'horizontal',
                            label: '删除方式',
                            pipeIn: function (value, store) {
                                if (store.data.__deleteType === undefined) {
                                    var deleteType = store.data.condition
                                        ? 'conditionExpression'
                                        : 'rowIndex';
                                    store.updateData({
                                        __deleteType: deleteType
                                    });
                                    return deleteType;
                                }
                                return value;
                            },
                            horizontal: {
                                leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
                            },
                            options: [
                                {
                                    label: '指定行号',
                                    value: 'rowIndex'
                                },
                                {
                                    label: '条件表达式',
                                    value: 'conditionExpression'
                                }
                            ],
                            onChange: function (value, oldVal, data, form) {
                                form.setValueByName('index', undefined);
                                form.setValueByName('condition', undefined);
                            }
                        },
                        {
                            type: 'input-text',
                            name: 'index',
                            mode: 'horizontal',
                            horizontal: {
                                leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
                            },
                            required: true,
                            label: '删除范围',
                            size: 'lg',
                            placeholder: '请输入行号，输入多个则用英文逗号分隔',
                            hiddenOn: 'data.__deleteType !== "rowIndex"'
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('formulaControl', {
                            name: 'condition',
                            variables: '${variables}',
                            label: '删除条件',
                            hiddenOn: 'data.__deleteType !== "conditionExpression"',
                            mode: 'horizontal',
                            required: true,
                            horizontal: {
                                leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
                            },
                            size: 'lg'
                        })
                    ]
                })
            },
            // {
            //   actionType: 'reset',
            //   actionLabel: '重置',
            //   description: '将值重置为resetValue，若没有配置resetValue，则清空'
            // },
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清空组件数据'
            }
        ];
        _this.panelBodyCreator = function (context) {
            var isCRUDBody = context.schema.type === 'crud';
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return (0, amis_editor_core_1.getSchemaTpl)('tabs', [
                {
                    title: '属性',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                (0, amis_editor_core_1.getSchemaTpl)('formItemName', {
                                    required: true
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('label'),
                                {
                                    type: 'ae-switch-more',
                                    name: 'needConfirm',
                                    label: (0, amis_editor_core_1.tipedLabel)('确认模式', '开启时，新增、编辑需要点击表格右侧的“保存”按钮才能变更组件数据。未开启时，新增、编辑、删除操作直接改变组件数据。'),
                                    mode: 'normal',
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [
                                            {
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                                name: 'confirmBtnLabel',
                                                label: '确认按钮名称',
                                                placeholder: '确认按钮名称'
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                                name: 'confirmBtnIcon',
                                                label: '确认按钮图标',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)('check')
                                            }),
                                            {
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                                name: 'cancelBtnLabel',
                                                label: '取消按钮名称',
                                                placeholder: '取消按钮名称'
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                                name: 'cancelBtnIcon',
                                                label: '取消按钮图标',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)('close')
                                            })
                                        ]
                                    },
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(true)
                                },
                                {
                                    type: 'ae-switch-more',
                                    name: 'addable',
                                    label: '可新增',
                                    mode: 'normal',
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [
                                            (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                                label: '新增接口',
                                                name: 'addApi',
                                                mode: 'row'
                                            }),
                                            (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                                name: 'showTableAddBtn',
                                                label: '操作栏新增按钮',
                                                value: true
                                            }),
                                            {
                                                label: '按钮名称',
                                                name: 'addBtnLabel',
                                                visibleOn: 'this.showTableAddBtn',
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                                name: 'addBtnIcon',
                                                label: '按钮图标',
                                                visibleOn: 'this.showTableAddBtn',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)('plus')
                                            })
                                        ]
                                    }
                                },
                                {
                                    type: 'ae-switch-more',
                                    name: 'copyable',
                                    label: '可复制',
                                    mode: 'normal',
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [
                                            {
                                                label: '按钮名称',
                                                name: 'copyBtnLabel',
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                                name: 'copyBtnIcon',
                                                label: '按钮图标',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)('copy')
                                            })
                                        ]
                                    }
                                },
                                {
                                    type: 'ae-switch-more',
                                    name: 'editable',
                                    label: '可编辑',
                                    mode: 'normal',
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [
                                            (0, amis_editor_core_1.getSchemaTpl)('apiControl', {
                                                label: '编辑接口',
                                                name: 'updateApi',
                                                mode: 'row'
                                            }),
                                            {
                                                label: '按钮名称',
                                                name: 'editBtnLabel',
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                                name: 'editBtnIcon',
                                                label: '按钮图标',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)('pencil')
                                            })
                                        ]
                                    }
                                },
                                {
                                    type: 'ae-switch-more',
                                    name: 'removable',
                                    label: '可删除',
                                    mode: 'normal',
                                    formType: 'extend',
                                    hiddenOnDefault: true,
                                    form: {
                                        body: [
                                            (0, amis_editor_core_1.getSchemaTpl)('deleteApi'),
                                            {
                                                label: '按钮名称',
                                                name: 'deleteBtnLabel',
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
                                            },
                                            (0, amis_editor_core_1.getSchemaTpl)('icon', {
                                                name: 'deleteBtnIcon',
                                                label: '按钮图标',
                                                pipeIn: (0, amis_editor_core_1.defaultValue)('minus')
                                            })
                                        ]
                                    }
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'showIndex',
                                    label: '显示序号',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                }),
                                {
                                    type: 'input-number',
                                    name: 'perPage',
                                    label: '每页展示条数',
                                    placeholder: '如果为空则不进行分页'
                                },
                                {
                                    type: 'input-number',
                                    name: 'minLength',
                                    label: '最小行数',
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(0)
                                },
                                {
                                    type: 'input-number',
                                    name: 'maxLength',
                                    label: '最大行数'
                                },
                                (0, amis_editor_core_1.getSchemaTpl)('description'),
                                (0, amis_editor_core_1.getSchemaTpl)('placeholder'),
                                (0, amis_editor_core_1.getSchemaTpl)('labelRemark')
                            ]
                        },
                        {
                            title: '高级',
                            body: [
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'strictMode',
                                    label: (0, amis_editor_core_1.tipedLabel)('严格模式', '为了性能，默认其他表单项项值变化不会让当前表格更新，有时候为了同步获取其他表单项字段，需要开启这个。'),
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                }),
                                (0, amis_editor_core_1.getSchemaTpl)('switch', {
                                    name: 'canAccessSuperData',
                                    label: (0, amis_editor_core_1.tipedLabel)('获取父级数据', '是否可以访问父级数据，也就是表单中的同级数据，通常需要跟 “严格模式”属性搭配使用。'),
                                    pipeIn: (0, amis_editor_core_1.defaultValue)(false)
                                })
                            ]
                        },
                        (0, amis_editor_core_1.getSchemaTpl)('status', { isFormItem: true }),
                        (0, amis_editor_core_1.getSchemaTpl)('validation', {
                            tag: validator_1.ValidatorTag.MultiSelect
                        })
                    ])
                },
                {
                    title: '外观',
                    body: (0, amis_editor_core_1.getSchemaTpl)('collapseGroup', [
                        (0, amis_editor_core_1.getSchemaTpl)('style:formItem', { renderer: context.info.renderer }),
                        (0, amis_editor_core_1.getSchemaTpl)('style:classNames', {
                            schema: [
                                (0, amis_editor_core_1.getSchemaTpl)('className', {
                                    name: 'rowClassName',
                                    label: '行样式'
                                })
                            ]
                        })
                    ])
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        (0, amis_editor_core_1.getSchemaTpl)('eventControl', tslib_1.__assign({ name: 'onEvent' }, (0, helper_1.getEventControlConfig)(_this.manager, context)))
                    ]
                }
            ]);
        };
        _this.dsManager = new DSBuilderManager_1.DSBuilderManager(manager);
        return _this;
    }
    Object.defineProperty(TableControlPlugin.prototype, "scaffoldForm", {
        get: function () {
            var i18nEnabled = (0, amis_editor_core_1.getI18nEnabled)();
            return {
                title: '快速构建表格编辑框',
                body: [
                    {
                        name: 'columns',
                        type: 'input-table',
                        label: false,
                        needConfirm: false,
                        addable: true,
                        removable: true,
                        columns: [
                            {
                                type: 'text',
                                name: 'label',
                                label: '标题',
                                quickEdit: {
                                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                    mode: 'inline'
                                }
                            },
                            {
                                type: 'text',
                                name: 'name',
                                label: '绑定字段名',
                                quickEdit: {
                                    type: 'input-text',
                                    mode: 'inline'
                                }
                            },
                            {
                                type: 'text',
                                name: 'type',
                                label: '展示类型',
                                width: 140,
                                quickEdit: {
                                    type: 'select',
                                    options: [
                                        {
                                            value: 'text',
                                            label: '纯文本'
                                        },
                                        {
                                            value: 'tpl',
                                            label: '模板'
                                        },
                                        {
                                            value: 'container',
                                            label: '容器'
                                        },
                                        {
                                            value: 'image',
                                            label: '图片'
                                        },
                                        {
                                            value: 'date',
                                            label: '日期'
                                        },
                                        {
                                            value: 'datetime',
                                            label: '日期时间'
                                        },
                                        {
                                            value: 'time',
                                            label: '时间'
                                        },
                                        {
                                            value: 'status',
                                            label: '状态'
                                        },
                                        {
                                            value: 'mapping',
                                            label: '映射'
                                        }
                                    ],
                                    pipeIn: (0, amis_editor_core_1.defaultValue)('text')
                                }
                            },
                            {
                                type: 'text',
                                name: 'quickEdit.type',
                                label: '编辑类型',
                                quickEdit: {
                                    type: 'select',
                                    clearable: true,
                                    placeholder: '为空则不支持编辑',
                                    options: [
                                        {
                                            value: 'input-text',
                                            label: '文本框'
                                        },
                                        {
                                            value: 'input-number',
                                            label: '数字框'
                                        },
                                        {
                                            value: 'select',
                                            label: '选择框'
                                        },
                                        {
                                            value: 'input-color',
                                            label: '颜色选择框'
                                        },
                                        {
                                            value: 'checkboxes',
                                            label: '多选框'
                                        },
                                        {
                                            value: 'radios',
                                            label: '单选框'
                                        },
                                        {
                                            value: 'input-date',
                                            label: '日期'
                                        },
                                        {
                                            value: 'input-date-range',
                                            label: '日期范围'
                                        },
                                        {
                                            value: 'switch',
                                            label: '开关'
                                        },
                                        {
                                            value: 'nested-select',
                                            label: '级联选择器'
                                        },
                                        {
                                            value: 'input-city',
                                            label: '城市选择器'
                                        },
                                        {
                                            value: 'input-tree',
                                            label: '树选择框'
                                        }
                                    ]
                                },
                                width: 210
                            }
                        ]
                    }
                ],
                pipeOut: function (schema) {
                    var columns = (0, cloneDeep_1.default)(schema.columns || []);
                    var rawColumns = [];
                    columns.forEach(function (column) {
                        var _a;
                        var rawColumn = tslib_1.__assign(tslib_1.__assign({}, column), { type: column.type, quickEdit: ((_a = column.quickEdit) === null || _a === void 0 ? void 0 : _a.type)
                                ? {
                                    type: column.quickEdit.type,
                                    name: column.name
                                }
                                : false });
                        rawColumns.push(rawColumn);
                    });
                    schema.columns = rawColumns;
                    return tslib_1.__assign({}, schema);
                },
                canRebuild: true
            };
        },
        enumerable: false,
        configurable: true
    });
    TableControlPlugin.prototype.filterProps = function (props) {
        var arr = (0, util_1.resolveArrayDatasource)(props);
        /** 可 */
        if (!Array.isArray(arr) || !arr.length) {
            var mockedData_1 = {};
            if (Array.isArray(props.columns)) {
                props.columns.forEach(function (column) {
                    /** 可编辑状态下不写入 Mock 数据，避免误导用户 */
                    if (column.name && !props.editable) {
                        (0, amis_core_1.setVariable)(mockedData_1, column.name, (0, amis_editor_core_1.mockValue)(column));
                    }
                });
            }
            props.value = (0, amis_editor_core_1.repeatArray)(mockedData_1, 1).map(function (item, index) { return (tslib_1.__assign(tslib_1.__assign({}, item), { id: index + 1 })); });
        }
        else {
            // 只取10条预览，否则太多卡顿
            props.value = arr.slice(0, 10);
        }
        return props;
    };
    // 自动插入 label
    TableControlPlugin.prototype.beforeInsert = function (event) {
        var _a, _b, _c, _d;
        var context = event.context;
        if ((context.info.plugin === this ||
            ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) &&
            context.region === 'columns') {
            context.data = tslib_1.__assign(tslib_1.__assign({}, context.data), { label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '列名称' });
        }
    };
    TableControlPlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var itemsSchema, columns, parentScopeId, isColumnChild, scopeId, cells, cell, items, current, schema, _f, _g, scopeId, scope;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        itemsSchema = {
                            $id: "".concat(node.id, "-").concat(node.type, "-tableRows"),
                            type: 'object',
                            properties: {}
                        };
                        columns = node.children.find(function (item) { return item.isRegion && item.region === 'columns'; });
                        parentScopeId = "".concat(parent === null || parent === void 0 ? void 0 : parent.id, "-").concat(parent === null || parent === void 0 ? void 0 : parent.type).concat(((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === 'cell' ? '-currentRow' : '');
                        isColumnChild = false;
                        // 追加当前行scope
                        if (trigger) {
                            isColumnChild = (0, amis_core_1.someTree)(columns === null || columns === void 0 ? void 0 : columns.children, function (item) { return item.id === trigger.id; });
                            if (isColumnChild) {
                                scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                                if (this.manager.dataSchema.getScope(scopeId)) {
                                    this.manager.dataSchema.removeScope(scopeId);
                                }
                                if (this.manager.dataSchema.getScope(parentScopeId)) {
                                    this.manager.dataSchema.switchTo(parentScopeId);
                                }
                                this.manager.dataSchema.addScope([], scopeId);
                                this.manager.dataSchema.current.tag = '当前行记录';
                                this.manager.dataSchema.current.group = '组件上下文';
                            }
                        }
                        cells = (columns === null || columns === void 0 ? void 0 : columns.children.concat()) || [];
                        _h.label = 1;
                    case 1:
                        if (!(cells.length > 0)) return [3 /*break*/, 6];
                        cell = cells.shift();
                        items = cell.children.concat();
                        _h.label = 2;
                    case 2:
                        if (!items.length) return [3 /*break*/, 5];
                        current = items.shift();
                        schema = current.schema;
                        if (!schema.name) return [3 /*break*/, 4];
                        _f = itemsSchema.properties;
                        _g = schema.name;
                        return [4 /*yield*/, ((_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, region, trigger, node))];
                    case 3:
                        _f[_g] =
                            _h.sent();
                        _h.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        if ((region === null || region === void 0 ? void 0 : region.region) === 'columns') {
                            return [2 /*return*/, itemsSchema];
                        }
                        // 追加当前行数据
                        if (isColumnChild) {
                            scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                            scope = this.manager.dataSchema.getScope(scopeId);
                            scope === null || scope === void 0 ? void 0 : scope.addSchema(itemsSchema);
                        }
                        return [2 /*return*/, {
                                $id: "".concat(node.id, "-").concat(node.type, "-tableData"),
                                type: 'array',
                                title: ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.label) || ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.name),
                                items: itemsSchema
                            }];
                }
            });
        });
    };
    TableControlPlugin.prototype.getAvailableContextFields = function (scopeNode, target, region) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scope, builder;
            return tslib_1.__generator(this, function (_c) {
                if (target.type === scopeNode.type ||
                    (target.parent.isRegion && target.parent.region === 'columns')) {
                    scope = scopeNode.parent.parent;
                    builder = this.dsManager.getBuilderBySchema(scope.schema);
                }
                if (builder && scope.schema.api) {
                    return [2 /*return*/, builder.getAvailableContextFields({
                            schema: scope.schema,
                            sourceKey: 'api',
                            feat: (_b = (_a = scope.schema) === null || _a === void 0 ? void 0 : _a.feat) !== null && _b !== void 0 ? _b : 'List',
                            scopeNode: scopeNode
                        }, 
                        /** ID相同为本体，否则为子项 */
                        (target === null || target === void 0 ? void 0 : target.id) === (scopeNode === null || scopeNode === void 0 ? void 0 : scopeNode.id) ? scopeNode : target)];
                }
                return [2 /*return*/];
            });
        });
    };
    TableControlPlugin.id = 'TableControlPlugin';
    return TableControlPlugin;
}(amis_editor_core_1.BasePlugin));
exports.TableControlPlugin = TableControlPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(TableControlPlugin);
