"use strict";
/**
 * @file 扩展 codemirror
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaPlugin = exports.editorFactory = void 0;
var tslib_1 = require("tslib");
var amis_ui_1 = require("amis-ui");
function editorFactory(dom, cm, value, config) {
    return cm(dom, tslib_1.__assign({ value: value || '', autofocus: false, lineWrapping: true }, config));
}
exports.editorFactory = editorFactory;
var defaultPluginConfig = {
    showPopover: false,
    showClearIcon: false
};
var FormulaPlugin = /** @class */ (function () {
    function FormulaPlugin(editor, config) {
        var _a, _b;
        this.editor = editor;
        this.config = tslib_1.__assign(tslib_1.__assign({}, defaultPluginConfig), config);
        var value = this.config.getProps().value;
        if (value) {
            this.autoMark();
            this.focus(value);
        }
        this.setValue = this.setValue.bind(this);
        this.insertContent = this.insertContent.bind(this);
        this.autoMark = this.autoMark.bind(this);
        this.focus = this.focus.bind(this);
        this.dispose = this.dispose.bind(this);
        (_b = (_a = this.config).onPluginInit) === null || _b === void 0 ? void 0 : _b.call(_a, this);
    }
    FormulaPlugin.prototype.autoMark = function () {
        var _a, _b;
        var editor = this.editor;
        var lines = editor.lineCount();
        for (var line = 0; line < lines; line++) {
            var content = editor.getLine(line);
            var braces = this.computedBracesPosition(content);
            for (var i = 0; i < braces.length; i++) {
                // 替换每个公式表达式中的内容
                var start = braces[i].begin;
                var end = braces[i].end;
                var expression = content.slice(start, end);
                this.markExpression({
                    line: line,
                    ch: start - 2
                }, {
                    line: line,
                    ch: end + 1
                }, expression);
            }
        }
        (_b = (_a = this.config).customMarkText) === null || _b === void 0 ? void 0 : _b.call(_a, editor);
    };
    // 找到表达式所在的位置
    FormulaPlugin.prototype.getExpressionBrace = function (expression) {
        var editor = this.editor;
        var lines = editor.lineCount();
        for (var line = 0; line < lines; line++) {
            var content = editor.getLine(line);
            var braces = this.computedBracesPosition(content);
            for (var i = 0; i < braces.length; i++) {
                // 替换每个公式表达式中的内容
                var start = braces[i].begin;
                var end = braces[i].end;
                if (expression === content.slice(start, end)) {
                    return [
                        {
                            line: line,
                            ch: start - 2
                        },
                        {
                            line: line,
                            ch: end + 1
                        }
                    ];
                }
            }
        }
        return undefined;
    };
    // 计算 `${`、`}` 括号的位置，如 ${a}+${b}, 结果是 [ { from: 0, to: 3 }, { from: 5, to: 8 } ]
    FormulaPlugin.prototype.computedBracesPosition = function (exp) {
        var braces = [];
        exp === null || exp === void 0 ? void 0 : exp.replace(/\$\{/g, function (val, offset) {
            if (val) {
                var charArr = exp.slice(offset + val.length).split('');
                var cache = ['${'];
                for (var index = 0; index < charArr.length; index++) {
                    var char = charArr[index];
                    if (char === '$' && charArr[index + 1] === '{') {
                        cache.push('${');
                    }
                    else if (char === '}') {
                        cache.pop();
                    }
                    if (cache.length === 0) {
                        braces.push({ begin: offset + 2, end: index + offset + 2 });
                        break;
                    }
                }
            }
            return '';
        });
        return braces;
    };
    // 判断字符串是否在 ${} 中
    FormulaPlugin.prototype.checkStrIsInBraces = function (_a, braces) {
        var _b = tslib_1.__read(_a, 2), from = _b[0], to = _b[1];
        var isIn = false;
        if (braces.length) {
            for (var index = 0; index < braces.length; index++) {
                var brace = braces[index];
                if (from >= brace.begin && to <= brace.end) {
                    isIn = true;
                    break;
                }
            }
        }
        return isIn;
    };
    FormulaPlugin.prototype.insertBraces = function (originFrom, originTo) {
        var str = this.editor.getValue();
        var braces = this.computedBracesPosition(str);
        if (!this.checkStrIsInBraces([originFrom.ch, originTo.ch], braces)) {
            this.editor.setCursor({
                line: originFrom.line,
                ch: originFrom.ch
            });
            this.editor.replaceSelection('${');
            this.editor.setCursor({
                line: originTo.line,
                ch: originTo.ch + 2
            });
            this.editor.replaceSelection('}');
        }
    };
    // 重新赋值
    FormulaPlugin.prototype.setValue = function (value) {
        this.editor.setValue(value);
    };
    FormulaPlugin.prototype.getCorsur = function () {
        return this.editor.getCursor();
    };
    FormulaPlugin.prototype.insertContent = function (content, type, brace) {
        if (type === void 0) { type = 'string'; }
        if (brace) {
            // 替换
            var _a = tslib_1.__read(brace, 2), from = _a[0], to = _a[1];
            if (type === 'expression') {
                this.editor.replaceRange(content, from, to);
                this.autoMark();
            }
            else if (type === 'string') {
                this.editor.replaceRange(content, from, to);
            }
        }
        else {
            // 新增
            if (type === 'expression') {
                this.editor.replaceSelection(content);
                this.autoMark();
            }
            else if (type === 'string') {
                this.editor.replaceSelection(content);
            }
            this.editor.focus();
        }
    };
    FormulaPlugin.prototype.markExpression = function (from, to, expression, className) {
        var _this = this;
        var _a;
        if (expression === void 0) { expression = ''; }
        if (className === void 0) { className = 'cm-expression'; }
        var _b = this.config, onExpressionMouseEnter = _b.onExpressionMouseEnter, getProps = _b.getProps, showPopover = _b.showPopover, showClearIcon = _b.showClearIcon;
        var variables = (_a = getProps()) === null || _a === void 0 ? void 0 : _a.variables;
        var highlightValue = amis_ui_1.FormulaEditor.highlightValue(expression, variables) || {
            html: expression
        };
        var wrap = document.createElement('span');
        wrap.className = className;
        var text = document.createElement('span');
        text.className = "".concat(className, "-text");
        text.innerHTML = highlightValue.html;
        text.setAttribute('data-expression', expression);
        text.onmouseenter = function (e) {
            var brace = _this.getExpressionBrace(expression);
            onExpressionMouseEnter === null || onExpressionMouseEnter === void 0 ? void 0 : onExpressionMouseEnter(e, expression, brace);
        };
        wrap.appendChild(text);
        if (showClearIcon) {
            var closeIcon = document.createElement('i');
            closeIcon.className = 'cm-expression-close iconfont icon-close';
            closeIcon.onclick = function () {
                var brace = _this.getExpressionBrace(expression);
                _this.insertContent('', 'expression', brace);
            };
            wrap.appendChild(closeIcon);
        }
        if (showPopover) {
            // 添加popover
            var popoverEl = document.createElement('div');
            // bca-disable-next-line
            popoverEl.innerHTML = highlightValue.html;
            popoverEl.classList.add('cm-expression-popover');
            var arrow = document.createElement('div');
            arrow.classList.add('cm-expression-popover-arrow');
            popoverEl.appendChild(arrow);
            wrap.appendChild(popoverEl);
        }
        this.editor.markText(from, to, {
            atomic: true,
            replacedWith: wrap
        });
    };
    // 焦点放在最后
    FormulaPlugin.prototype.focus = function (value) {
        this.editor.setCursor({
            line: 0,
            ch: (value === null || value === void 0 ? void 0 : value.length) || 0
        });
    };
    FormulaPlugin.prototype.dispose = function () { };
    FormulaPlugin.prototype.validate = function () { };
    return FormulaPlugin;
}());
exports.FormulaPlugin = FormulaPlugin;
