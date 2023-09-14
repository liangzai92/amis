"use strict";
/**
 * @file DSBuilder.ts
 * @desc 数据源配置构建器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDSBuilder = exports.builderFactory = exports.DSBuilder = void 0;
var utils_1 = require("./utils");
var DSBuilder = /** @class */ (function () {
    function DSBuilder(manager) {
        this.manager = manager;
    }
    Object.defineProperty(DSBuilder.prototype, "key", {
        /** 实例获取数据源的key */
        get: function () {
            return this.constructor.key;
        },
        enumerable: false,
        configurable: true
    });
    /** 获取功能场景的value */
    DSBuilder.prototype.getFeatValueByKey = function (feat) {
        return (0, utils_1.getFeatValueByKey)(feat);
    };
    /** 获取功能场景的label */
    DSBuilder.prototype.getFeatLabelByKey = function (feat) {
        return (0, utils_1.getFeatLabelByKey)(feat);
    };
    DSBuilder.prototype.filterByFeat = function (feat) {
        return feat && this.features.includes(feat);
    };
    return DSBuilder;
}());
exports.DSBuilder = DSBuilder;
exports.builderFactory = new Map();
/** 注册数据源构造器 */
var registerDSBuilder = function (klass) {
    if (exports.builderFactory.has(klass.key)) {
        console.warn("[amis-editor][DSBuilder] duplicate DSBuilder\u300C".concat(klass.key, "\u300D"));
    }
    /** 重名覆盖 */
    exports.builderFactory.set(klass.key, klass);
};
exports.registerDSBuilder = registerDSBuilder;
