"use strict";
/**
 * @file transformation.ts
 * @description CSS样式解析和编译
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeBoxShadow = exports.parseBoxShadow = void 0;
var tslib_1 = require("tslib");
var isNumber_1 = tslib_1.__importDefault(require("lodash/isNumber"));
var compact_1 = tslib_1.__importDefault(require("lodash/compact"));
function parseBoxShadow(inputStr) {
    // const VALUES_REG = /,(?![^\(]*\))/;
    var PARTS_REG = /\s(?![^(]*\))/;
    var LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
    var isLength = function (v) { return v === '0' || LENGTH_REG.test(v); };
    var toNum = function (v) {
        if (!v.endsWith('px') && v !== '0') {
            return v;
        }
        var n = parseFloat(v);
        return !isNaN(n) ? n : v;
    };
    var parseValue = function (str) {
        var parts = str.split(PARTS_REG);
        var inset = parts.includes('inset');
        var last = parts.slice(-1)[0];
        var color = !isLength(last) ? last : undefined;
        var nums = parts
            .filter(function (n) { return n !== 'inset'; })
            .filter(function (n) { return n !== color; })
            .map(toNum);
        var _a = tslib_1.__read(nums, 4), x = _a[0], y = _a[1], blur = _a[2], spread = _a[3];
        return {
            inset: inset,
            x: x,
            y: y,
            blur: blur,
            spread: spread,
            color: color
        };
    };
    return parseValue(inputStr);
}
exports.parseBoxShadow = parseBoxShadow;
function normalizeBoxShadow(config) {
    var x = config.x, y = config.y, blur = config.blur, spread = config.spread, color = config.color, inset = config.inset;
    var boxShadow = [];
    if (config === null || config === void 0 ? void 0 : config.inset) {
        boxShadow.push('inset');
    }
    if (x || y || spread || blur) {
        var normalizeUnit = function (props) {
            return (0, isNumber_1.default)(props === null || props === void 0 ? void 0 : props.length) && props.length > 0
                ? Math.round(props === null || props === void 0 ? void 0 : props.length) + (props === null || props === void 0 ? void 0 : props.unit)
                : undefined;
        };
        // x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径
        boxShadow.push((0, compact_1.default)([
            normalizeUnit(x),
            normalizeUnit(y),
            normalizeUnit(blur),
            normalizeUnit(spread)
        ]).join(' '));
    }
    if (color) {
        boxShadow.push(color);
    }
    return boxShadow.length
        ? { boxShadow: boxShadow.join(' ') }
        : { boxShadow: undefined };
}
exports.normalizeBoxShadow = normalizeBoxShadow;
