"use strict";
/**
 * @file API 适配器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiAdaptorEditorDescSchema = exports.adaptorEditorDescSchema = exports.adaptorReturnStruct = exports.validateApiAdaptorDefaultCode = exports.adaptorDefaultCode = exports.adaptorResponseStructTooltip = exports.adaptorResponseStruct = exports.adaptorContextStructTooltip = exports.adaptorApiStructTooltip = exports.adaptorContextStruct = exports.adaptorApiStruct = exports.requestAdaptorDefaultCode = exports.APIAdaptorControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var amis_editor_core_1 = require("amis-editor-core");
var amis_editor_core_2 = require("amis-editor-core");
var amis_1 = require("amis");
var APIAdaptorControl = /** @class */ (function (_super) {
    tslib_1.__extends(APIAdaptorControl, _super);
    function APIAdaptorControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            switch: !!_this.props.value
        };
        return _this;
    }
    APIAdaptorControl.prototype.onChange = function (value) {
        var _a, _b;
        if (value === void 0) { value = ''; }
        (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    // 生成tooltip 的参数
    APIAdaptorControl.prototype.genTooltipProps = function (content, othersProps) {
        var render = this.props.render;
        return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ tooltipTheme: 'light', trigger: 'hover', rootClose: true, placement: 'top', tooltipClassName: 'ae-AdaptorControl-desc-tooltip' }, (typeof content === 'string'
            ? { content: content }
            : {
                content: ' ',
                children: function () {
                    return react_1.default.isValidElement(content)
                        ? content
                        : render('content', content);
                }
            })), (this.props.tooltipProps || {})), (othersProps || {}));
    };
    APIAdaptorControl.prototype.renderEditor = function () {
        var _this = this;
        if (!this.state.switch) {
            return null;
        }
        var _a = this.props, render = _a.render, _b = _a.params, params = _b === void 0 ? [] : _b, allowFullscreen = _a.allowFullscreen, value = _a.value, name = _a.name, editorPlaceholder = _a.editorPlaceholder, editorDesc = _a.editorDesc, mergeParams = _a.mergeParams;
        var lastParams = typeof mergeParams === 'function' ? mergeParams(params) : params;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            render('api-adaptor-control-editor/0', {
                type: 'container',
                className: 'ae-AdaptorControl-func-header',
                body: tslib_1.__spreadArray(tslib_1.__spreadArray([
                    '<span class="mtk6">function&nbsp;</span>',
                    '<span class="mtk1 bracket-highlighting-0">(</span>'
                ], tslib_1.__read(lastParams
                    .map(function (_a, index) {
                    var label = _a.label, tip = _a.tip;
                    return tslib_1.__spreadArray([
                        tslib_1.__assign({ type: 'button', level: 'link', label: label, className: 'ae-AdaptorControl-func-arg' }, (tip ? { tooltip: _this.genTooltipProps(tip) } : {}))
                    ], tslib_1.__read((index === lastParams.length - 1
                        ? []
                        : ['<span class="mtk1">,&nbsp;</span>'])), false);
                })
                    .flat()), false), [
                    '<span class="mtk1 bracket-highlighting-0">)&nbsp;{</span>'
                ], false)
            }),
            render('api-adaptor-control-editor/1', {
                label: '',
                name: '__whatever_name_adpator',
                placeholder: editorPlaceholder || '',
                mode: 'normal',
                type: 'js-editor',
                className: 'ae-AdaptorControl-func-editor',
                allowFullscreen: allowFullscreen
            }, {
                value: value,
                onChange: this.onChange
            }),
            render('api-adaptor-control-editor/2', {
                type: 'container',
                body: '<span class="mtk1 bracket-highlighting-0">}</span>',
                className: 'ae-AdaptorControl-func-footer'
            }),
            render('api-adaptor-control-editor/3', {
                type: 'container',
                className: 'cxd-Form-description',
                body: editorDesc
            })));
    };
    APIAdaptorControl.prototype.renderSwitch = function () {
        var _this = this;
        var _a = this.props, render = _a.render, _b = _a.defaultCode, defaultCode = _b === void 0 ? '' : _b, switchTip = _a.switchTip, name = _a.name, value = _a.value;
        return render('api-adaptor-control-switch', {
            type: 'flex',
            className: 'mb-2',
            alignItems: 'center',
            direction: 'row',
            justify: 'flex-start',
            items: tslib_1.__spreadArray([
                {
                    type: 'switch',
                    label: '',
                    mode: 'inline',
                    name: '__editorSwitch_' + name,
                    key: 'switch',
                    className: 'mb-1',
                    value: this.state.switch,
                    onChange: function (checked) {
                        _this.setState({ switch: checked }, function () {
                            _this.onChange(!checked ? '' : value || defaultCode);
                        });
                    }
                }
            ], tslib_1.__read((switchTip
                ? [
                    react_1.default.createElement(amis_1.TooltipWrapper, { key: "TooltipWrapper", tooltip: this.genTooltipProps(switchTip, {
                            placement: 'right'
                        }) },
                        react_1.default.createElement(amis_1.Icon, { icon: "editor-help", className: "icon", color: "#84868c" }))
                ]
                : [])), false)
        });
    };
    APIAdaptorControl.prototype.render = function () {
        var className = this.props.className;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('ae-ApiAdaptorControl', className) },
            this.renderSwitch(),
            this.renderEditor()));
    };
    APIAdaptorControl.defaultProps = {
        params: []
    };
    tslib_1.__decorate([
        amis_editor_core_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], APIAdaptorControl.prototype, "onChange", null);
    return APIAdaptorControl;
}(react_1.default.Component));
exports.default = APIAdaptorControl;
var APIAdaptorControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(APIAdaptorControlRenderer, _super);
    function APIAdaptorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    APIAdaptorControlRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({
            type: 'ae-apiAdaptorControl'
        })
    ], APIAdaptorControlRenderer);
    return APIAdaptorControlRenderer;
}(APIAdaptorControl));
exports.APIAdaptorControlRenderer = APIAdaptorControlRenderer;
/**
 * 渲染 代码高亮 节点
 * @param code 代码字符串
 * @param size 渲染区域的width, height, 代码区域是异步渲染，tooltip时计算会偏移
 * @returns
 */
var genCodeSchema = function (code, size) { return (tslib_1.__assign(tslib_1.__assign({ type: 'container' }, (!size
    ? {}
    : {
        style: {
            width: size[0],
            height: size[1]
        }
    })), { body: {
        type: 'code',
        language: 'typescript',
        className: 'bg-white text-xs m-0',
        value: code
    } })); };
// 请求适配器 示例代码
exports.requestAdaptorDefaultCode = "api.data.count = api.data.count + 1;\nreturn api;";
// 适配器 适配器 api 参数说明
exports.adaptorApiStruct = "{\n  url: string; // \u5F53\u524D\u63A5\u53E3\u5730\u5740\n  method: 'get' | 'post' | 'put' | 'delete';\n  data?: Object; // \u8BF7\u6C42\u4F53\n  headers?: Object; // \u8BF7\u6C42\u5934\n  ...\n}";
// 适配器 适配器 context 参数说明
exports.adaptorContextStruct = "{\n  // \u4E0A\u4E0B\u6587\u6570\u636E\n  [key: string]: any;\n}";
exports.adaptorApiStructTooltip = genCodeSchema(exports.adaptorApiStruct, [
    '350px',
    '128px'
]);
exports.adaptorContextStructTooltip = genCodeSchema(exports.adaptorContextStruct, [
    '350px',
    '128px'
]);
// 适配器 response 参数说明
exports.adaptorResponseStruct = "{\n  data: Object; // \u63A5\u53E3\u8FD4\u56DE\u6570\u636E,\n  request: XMLHttpRequest;\n  headers?: Object; // \u8BF7\u6C42\u5934\n  status: number; // \u72B6\u6001\u7801 200, 404, 500..\n  statusText: string; // \u72B6\u6001\u4FE1\u606F\n  ...\n}";
exports.adaptorResponseStructTooltip = genCodeSchema(exports.adaptorResponseStruct, ['345px', '144px']);
// 接收适配器 示例代码
exports.adaptorDefaultCode = "// API\u54CD\u5E94\u6216\u81EA\u5B9A\u4E49\u5904\u7406\u540E\u9700\u8981\u7B26\u5408\u4EE5\u4E0B\u683C\u5F0F\nreturn {\n    status: 0, // 0 \u8868\u793A\u8BF7\u6C42\u6210\u529F\uFF0C\u5426\u5219\u6309\u9519\u8BEF\u5904\u7406\n    msg: '\u8BF7\u6C42\u6210\u529F',\n    data: {\n        text: 'world',\n        items: [\n            {label: '\u5F20\u4E09', value: 1}\n        ]\n    }\n}";
exports.validateApiAdaptorDefaultCode = "// \u6821\u9A8C\u6210\u529F\nreturn {\n    status: 0\n};\n\n// \u6821\u9A8C\u5931\u8D25\nreturn {\n  status: 422,\n  errors: '\u5F53\u524D\u7528\u6237\u5DF2\u5B58\u5728'\n}";
// 接收适配器 正确返回格式 示例
exports.adaptorReturnStruct = "{\n  \"status\": 0,\n  \"msg\": \"\",\n  \"data\": {\n    // ...\u5176\u4ED6\u5B57\u6BB5\n  }\n}";
// 接收适配器 正确返回格式说明
exports.adaptorEditorDescSchema = {
    type: 'container',
    className: 'text-xs',
    style: {
        width: '458px',
        height: '315px'
    },
    body: [
        '接口返回数据需要符合以下格式, status、msg、data 为必要字段',
        genCodeSchema(exports.adaptorReturnStruct),
        {
            type: 'table',
            className: 'mt-1 mb-0',
            data: {
                items: [
                    {
                        label: 'status',
                        desc: '返回 0 表示当前接口正确返回，否则按错误请求处理'
                    },
                    {
                        label: 'msg',
                        desc: '返回接口处理信息，主要用于表单提交或请求失败时的 toast 显示'
                    },
                    {
                        label: 'data',
                        desc: '必须返回一个具有 key-value 结构的对象'
                    }
                ]
            },
            columns: [
                {
                    name: 'label',
                    label: '字段'
                },
                {
                    name: 'desc',
                    label: '说明'
                }
            ]
        }
    ]
};
// 表单项校验接收适配器 正确返回格式说明
exports.validateApiAdaptorEditorDescSchema = {
    type: 'container',
    className: 'text-xs',
    body: [
        '校验接口返回格式字段说明：',
        {
            type: 'table',
            className: 'mt-1 mb-0',
            data: {
                items: [
                    {
                        label: 'status',
                        desc: '返回 0 表示校验成功，422 表示校验失败'
                    },
                    {
                        label: 'errors',
                        desc: '返回 status 为 422 时，显示的校验失败信息'
                    }
                ]
            },
            columns: [
                {
                    name: 'label',
                    label: '字段'
                },
                {
                    name: 'desc',
                    label: '说明'
                }
            ]
        }
    ]
};
(0, amis_editor_core_1.setSchemaTpl)('apiRequestAdaptor', {
    label: (0, amis_editor_core_2.tipedLabel)('发送适配器', "\u53EF\u57FA\u4E8E JavaScript \u8BED\u8A00\u76F4\u63A5\u5F55\u5165\u53D1\u9001\u9002\u914D\u5668\u7684\u51FD\u6570\u4F53\uFF0C\u5728\u8BE5\u51FD\u6570\u4F53\u5185\uFF0C\u60A8\u53EF\u4EE5\u5BF9 <span style=\"color: #108CEE\">api</span> \u8FDB\u884C\u5904\u7406\u6216\u8005\u8FD4\u56DE\u65B0\u7684\u5185\u5BB9\uFF0C\u6700\u540E\u9700\u8981 <span style=\"color: #108CEE\">return</span> <span style=\"color: #108CEE\">api</span>\u3002<br><br/>\n    \u51FD\u6570\u4F53\u5185\u53EF\u8BBF\u95EE\u7684\u53D8\u91CF\u5982\u4E0B\uFF1A<br/>\n    &nbsp;1. <span style=\"color: #108CEE\">api</span>\uFF1A\u63A5\u53E3\u7684schema\u914D\u7F6E\u5BF9\u8C61<br/>\n    &nbsp;2. <span style=\"color: #108CEE\">api.data</span>\uFF1A\u8BF7\u6C42\u6570\u636E<br/>\n    &nbsp;3. <span style=\"color: #108CEE\">api.query</span>\uFF1A\u8BF7\u6C42\u67E5\u8BE2\u53C2\u6570<br/>\n    &nbsp;4. <span style=\"color: #108CEE\">api.headers</span>\uFF1A\u8BF7\u6C42\u5934<br/>\n    &nbsp;5. <span style=\"color: #108CEE\">api.url</span>\uFF1A\u8BF7\u6C42\u5730\u5740<br/>"),
    name: 'requestAdaptor',
    type: 'ae-apiAdaptorControl',
    editorDesc: '必须将修改好的 api 对象 return 出去。',
    editorPlaceholder: exports.requestAdaptorDefaultCode,
    params: [
        {
            label: 'api',
            tip: exports.adaptorApiStructTooltip
        },
        {
            label: 'context',
            tip: exports.adaptorContextStructTooltip
        }
    ]
});
(0, amis_editor_core_1.setSchemaTpl)('apiAdaptor', {
    label: (0, amis_editor_core_2.tipedLabel)('返回适配器', "\u53EF\u57FA\u4E8E JavaScript \u8BED\u8A00\u76F4\u63A5\u5F55\u5165\u8FD4\u56DE\u9002\u914D\u5668\u7684\u51FD\u6570\u4F53\uFF0C\u5728\u51FD\u6570\u4F53\u5185\uFF0C\u60A8\u53EF\u4EE5\u5BF9 <span style=\"color: #108CEE\">payload</span> \u8FDB\u884C\u5904\u7406\u6216\u8005\u8FD4\u56DE\u65B0\u7684\u5185\u5BB9\uFF0C\u6700\u540E\u9700\u8981 <span style=\"color: #108CEE\">return</span> \u63A5\u53E3\u6700\u7EC8\u7684\u8FD4\u56DE\u7ED3\u679C\u3002<br><br/>\n    \u51FD\u6570\u4F53\u5185\u53EF\u8BBF\u95EE\u7684\u53D8\u91CF\u5982\u4E0B\uFF1A<br/>\n    &nbsp;1. <span style=\"color: #108CEE\">payload</span>\uFF1A\u63A5\u53E3\u7684\u8FD4\u56DE\u7ED3\u679C<br/>\n    &nbsp;2. <span style=\"color: #108CEE\">response</span>\uFF1A\u63A5\u53E3\u7684response\u5BF9\u8C61<br/>\n    &nbsp;3. <span style=\"color: #108CEE\">api</span>\uFF1A\u63A5\u53E3\u7684schema\u914D\u7F6E\u5BF9\u8C61<br/>"),
    type: 'ae-apiAdaptorControl',
    name: 'adaptor',
    params: [
        {
            label: 'payload',
            tip: '当前请求的响应 payload，即 response.data'
        },
        {
            label: 'response',
            tip: exports.adaptorResponseStructTooltip
        },
        {
            label: 'api',
            tip: exports.adaptorApiStructTooltip
        }
    ],
    editorPlaceholder: exports.adaptorDefaultCode,
    switchTip: exports.adaptorEditorDescSchema
});
(0, amis_editor_core_1.setSchemaTpl)('validateApiAdaptor', tslib_1.__assign(tslib_1.__assign({}, (0, amis_editor_core_1.getSchemaTpl)('apiAdaptor')), { editorPlaceholder: exports.validateApiAdaptorDefaultCode, switchTip: exports.validateApiAdaptorEditorDescSchema }));
