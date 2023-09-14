"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeCssCodeRenderer = void 0;
var tslib_1 = require("tslib");
/**
 * 类名输入框 + 自定义样式源码编辑器
 */
var react_1 = tslib_1.__importStar(require("react"));
var amis_ui_1 = require("amis-ui");
var amis_core_1 = require("amis-core");
// @ts-ignore
var amis_postcss_1 = require("amis-postcss");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
var isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
var index_1 = require("../../icons/index");
var editorPlaceholder = "\u81EA\u5B9A\u4E49\u6837\u5F0F\u4EC5\u5BF9\u5F53\u524D\u7EC4\u4EF6\u751F\u6548\u3002\u793A\u4F8B\uFF1A\n// \u5F53\u524D\u5C42\u7EA7\nroot {\n  color: #000;\n}\n// \u5B50\u5C42\u7EA7\n.text-color: {\n  color: #fff;\n}\n";
var editorOptions = {
    autoIndent: true,
    formatOnType: true,
    formatOnPaste: true,
    selectOnLineNumbers: true,
    scrollBeyondLastLine: false,
    folding: true,
    minimap: {
        enabled: false
    },
    scrollbar: {
        alwaysConsumeMouseWheel: false
    },
    bracketPairColorization: {
        enabled: true
    },
    automaticLayout: true,
    lineNumbers: 'off',
    glyphMargin: false,
    wordWrap: 'on',
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    overviewRulerBorder: false
};
function ThemeCssCode(props) {
    var data = props.data, onBulkChange = props.onBulkChange;
    var wrapperCustomStyle = data.wrapperCustomStyle;
    var ref = (0, react_1.useRef)(null);
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), showEditor = _a[0], setShowEditor = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), value = _b[0], setValue = _b[1];
    // 前面加上空格
    function getSpaceByDep(dep) {
        var spaces = '';
        for (var i = 0; i < dep; i++) {
            spaces += '  ';
        }
        return spaces;
    }
    function getCssAndSetValue(data, str, dep) {
        if ((0, isEmpty_1.default)(data)) {
            return '';
        }
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if ((0, isObject_1.default)(data[key])) {
                    str += getSpaceByDep(dep) + "".concat(key, " {\n");
                    str += getCssAndSetValue(data[key], '', dep + 1);
                    str += getSpaceByDep(dep) + "}\n";
                    if (dep === 0) {
                        str += '\n';
                    }
                }
                else {
                    str += getSpaceByDep(dep) + "".concat(key, ": ").concat(data[key], ";\n");
                }
            }
        }
        return str;
    }
    (0, react_1.useEffect)(function () {
        setValue(getCssAndSetValue(wrapperCustomStyle, '', 0));
    }, []);
    function handleShowEditor() {
        setShowEditor(true);
    }
    // 递归获取自定义样式
    function getStyle(style, newStyle) {
        if ((0, isEmpty_1.default)(style)) {
            return;
        }
        style.nodes.forEach(function (node) {
            var prop = node.prop, value = node.value, selector = node.selector;
            if (value) {
                newStyle[prop] = value;
            }
            if (node.nodes) {
                !newStyle[selector] && (newStyle[selector] = {});
                getStyle(node, newStyle[selector]);
            }
        });
    }
    var editorChange = (0, debounce_1.default)(function (value) {
        var newStyle = {};
        try {
            var style = (0, amis_postcss_1.parse)(value);
            getStyle(style, newStyle);
            onBulkChange &&
                onBulkChange({
                    wrapperCustomStyle: newStyle
                });
        }
        catch (error) { }
    });
    function handleChange(value) {
        editorChange(value);
        setValue(value);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref, className: "ThemeCssCode" },
            react_1.default.createElement("a", { onClick: handleShowEditor, className: "ThemeCssCode-button ThemeCssCode-icon" },
                react_1.default.createElement(index_1.Icon, { icon: "expand-alt", className: "icon" })),
            react_1.default.createElement("div", { className: "ThemeCssCode-editor-wrap", style: { height: '180px' } },
                react_1.default.createElement(amis_ui_1.Editor, { className: "ThemeCssCode-custom-editor", value: value, placeholder: editorPlaceholder, language: "scss", onChange: handleChange, options: editorOptions }))),
        react_1.default.createElement(amis_ui_1.Overlay, { container: document.body, placement: "left", target: ref.current, show: showEditor, rootClose: false },
            react_1.default.createElement(amis_ui_1.PopOver, { overlay: true, onHide: function () { return setShowEditor(false); } },
                react_1.default.createElement("div", { className: "ThemeCssCode-editor" },
                    react_1.default.createElement("div", { className: "ThemeCssCode-editor-title" }, "\u7F16\u8F91\u6837\u5F0F"),
                    react_1.default.createElement("div", { className: "ThemeCssCode-editor-close" },
                        react_1.default.createElement("a", { onClick: function () { return setShowEditor(false); }, className: "ThemeCssCode-icon" },
                            react_1.default.createElement(index_1.Icon, { icon: "close", className: "icon" }))),
                    react_1.default.createElement("div", { className: "ThemeCssCode-editor-content" },
                        react_1.default.createElement("div", { className: "ThemeCssCode-editor-wrap", style: { height: '460px' } },
                            react_1.default.createElement(amis_ui_1.Editor, { value: value, placeholder: editorPlaceholder, language: "scss", onChange: handleChange, options: editorOptions }))))))));
}
var ThemeCssCodeRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ThemeCssCodeRenderer, _super);
    function ThemeCssCodeRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThemeCssCodeRenderer.prototype.render = function () {
        return react_1.default.createElement(ThemeCssCode, tslib_1.__assign({}, this.props));
    };
    ThemeCssCodeRenderer = tslib_1.__decorate([
        (0, amis_core_1.FormItem)({
            type: 'theme-cssCode',
            strictMode: false
        })
    ], ThemeCssCodeRenderer);
    return ThemeCssCodeRenderer;
}(react_1.default.Component));
exports.ThemeCssCodeRenderer = ThemeCssCodeRenderer;
