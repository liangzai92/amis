"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPlugin = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_editor_core_3 = require("amis-editor-core");
var amis_ui_1 = require("amis-ui");
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var amis_editor_core_4 = require("amis-editor-core");
var StatusPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(StatusPlugin, _super);
    function StatusPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'status';
        _this.$schema = '/schemas/StatusSchema.json';
        // 组件名称
        _this.name = '状态显示';
        _this.isBaseComponent = true;
        _this.description = '用图标更具关联字段来展示状态，比如 1 展示 √、0 展示 x。这块可以自定义配置';
        _this.docLink = '/amis/zh-CN/components/status';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-check-square-o';
        _this.pluginIcon = 'status-plugin';
        _this.scaffold = {
            type: 'status',
            value: 1
        };
        _this.previewSchema = tslib_1.__assign({}, _this.scaffold);
        _this.defaultSource = [
            {
                label: '-',
                value: '0',
                icon: 'fail',
                status: 0
            },
            {
                label: '-',
                value: '1',
                icon: 'success',
                status: 1
            },
            {
                label: '成功',
                value: 'success',
                icon: 'success',
                status: 'success'
            },
            {
                label: '运行中',
                value: 'pending',
                icon: 'rolling',
                status: 'pending'
            },
            {
                label: '排队中',
                value: 'queue',
                icon: 'warning',
                status: 'queue'
            },
            {
                label: '调度中',
                value: 'schedule',
                icon: 'schedule',
                status: 'schedule'
            },
            {
                label: '失败',
                value: 'fail',
                icon: 'fail',
                status: 'fail'
            }
        ];
        _this.panelTitle = '状态';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = (0, amis_editor_core_4.getI18nEnabled)();
            return [
                (0, amis_editor_core_3.getSchemaTpl)('tabs', [
                    {
                        title: '属性',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('layout:originPosition', { value: 'left-top' }),
                                    (0, amis_editor_core_3.getSchemaTpl)('combo-container', {
                                        type: 'combo',
                                        name: '__source',
                                        inputClassName: 'ae-Status-control',
                                        labelClassName: 'ae-Status-label',
                                        label: [
                                            '图标配置',
                                            {
                                                children: (react_1.default.createElement(amis_ui_1.TooltipWrapper, { tooltipClassName: "ae-Status-default-icon-tooltip", trigger: "hover", rootClose: true, placement: "bottom", tooltip: {
                                                        children: function () {
                                                            return (0, amis_1.render)({
                                                                type: 'container',
                                                                body: [
                                                                    {
                                                                        type: 'tpl',
                                                                        tpl: '默认支持如下几种状态，无需配置即可使用。自定义状态会和默认状态合并。',
                                                                        wrapperComponent: 'p',
                                                                        className: 'ae-Status-default-icon-tip'
                                                                    },
                                                                    {
                                                                        type: 'table',
                                                                        data: {
                                                                            items: _this.defaultSource
                                                                        },
                                                                        columns: [
                                                                            {
                                                                                name: 'icon',
                                                                                label: '默认icon值'
                                                                            },
                                                                            {
                                                                                name: 'label',
                                                                                label: '默认label'
                                                                            },
                                                                            {
                                                                                name: 'value',
                                                                                label: '默认value值'
                                                                            },
                                                                            {
                                                                                name: 'status',
                                                                                label: '状态',
                                                                                type: 'mapping',
                                                                                map: {
                                                                                    '*': {
                                                                                        type: 'status'
                                                                                    }
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            });
                                                        }
                                                    } },
                                                    react_1.default.createElement("div", { className: "ae-Status-label-tip-icon" },
                                                        react_1.default.createElement(amis_ui_1.Icon, { icon: "editor-help", className: "icon" }))))
                                            }
                                        ],
                                        mode: 'normal',
                                        multiple: true,
                                        items: [
                                            (0, amis_editor_core_3.getSchemaTpl)('icon', {
                                                label: '',
                                                placeholder: '图标',
                                                onChange: function (value, oldValue, model, form) {
                                                    // 选择图标时自动填充label
                                                    if (value && value.name) {
                                                        form.setValues({
                                                            label: value.name
                                                        });
                                                    }
                                                }
                                            }),
                                            {
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                                name: 'label',
                                                placeholder: 'label'
                                            },
                                            {
                                                type: 'input-text',
                                                name: 'value',
                                                placeholder: 'value',
                                                unique: true,
                                                required: true,
                                                validationErrors: {
                                                    isRequired: '必填项'
                                                }
                                            },
                                            (0, amis_editor_core_3.getSchemaTpl)('theme:colorPicker', {
                                                label: '',
                                                name: 'color'
                                            })
                                        ],
                                        pipeIn: function (value, _a) {
                                            var data = _a.data;
                                            // 首次进入，将schema 转换为 combo的数据
                                            if (value === undefined) {
                                                var map = data.map, labelMap = data.labelMap, source = data.source;
                                                var res_1 = (0, cloneDeep_1.default)(source) || {};
                                                // 兼容旧版
                                                map &&
                                                    Object.entries(map).forEach(function (_a) {
                                                        var _b = tslib_1.__read(_a, 2), value = _b[0], icon = _b[1];
                                                        if (value === '' ||
                                                            value == null ||
                                                            value === '$$id') {
                                                            return;
                                                        }
                                                        if (!res_1[value]) {
                                                            res_1[value] = { icon: icon };
                                                        }
                                                        else {
                                                            res_1[value] = tslib_1.__assign(tslib_1.__assign({}, res_1[value]), { icon: icon });
                                                        }
                                                    });
                                                labelMap &&
                                                    Object.entries(labelMap).forEach(function (_a) {
                                                        var _b = tslib_1.__read(_a, 2), value = _b[0], label = _b[1];
                                                        if (value === '' || value == null) {
                                                            return;
                                                        }
                                                        if (!res_1[value]) {
                                                            res_1[value] = { label: label };
                                                        }
                                                        else {
                                                            res_1[value] = tslib_1.__assign(tslib_1.__assign({}, res_1[value]), { label: label });
                                                        }
                                                    });
                                                Object.keys(res_1).forEach(function (key, index) {
                                                    var item = res_1[key];
                                                    if (!('key' in item)) {
                                                        item.key = key;
                                                    }
                                                    if (!('value' in item)) {
                                                        item.value = key;
                                                    }
                                                });
                                                return Object.values(res_1);
                                            }
                                            else {
                                                // 后续可以直接使用value
                                                return value;
                                            }
                                        },
                                        onChange: function (value, oldValue, model, form) {
                                            var res = {};
                                            value.forEach(function (item) {
                                                if (item.value !== '' && item.value != null) {
                                                    res[item.value] = (0, pick_1.default)(item, [
                                                        'label',
                                                        'color',
                                                        'icon'
                                                    ]);
                                                }
                                            });
                                            form.setValues({
                                                map: undefined,
                                                labelMap: undefined,
                                                source: Object.keys(res).length > 0 ? res : undefined
                                            });
                                        }
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('valueFormula', {
                                        pipeOut: function (value) {
                                            return value == null || value === '' ? undefined : value;
                                        }
                                    }),
                                    (0, amis_editor_core_3.getSchemaTpl)('placeholder', {
                                        label: '占位符',
                                        pipeIn: (0, amis_editor_core_3.defaultValue)('-')
                                    })
                                ]
                            },
                            (0, amis_editor_core_3.getSchemaTpl)('status')
                        ])
                    },
                    {
                        title: '外观',
                        body: (0, amis_editor_core_3.getSchemaTpl)('collapseGroup', [
                            {
                                title: 'CSS类名',
                                body: [
                                    (0, amis_editor_core_3.getSchemaTpl)('className', {
                                        label: '外层'
                                    })
                                ]
                            }
                        ])
                    }
                ])
            ];
        };
        return _this;
    }
    StatusPlugin.id = 'StatusPlugin';
    StatusPlugin.scene = ['layout'];
    return StatusPlugin;
}(amis_editor_core_2.BasePlugin));
exports.StatusPlugin = StatusPlugin;
(0, amis_editor_core_1.registerEditorPlugin)(StatusPlugin);
