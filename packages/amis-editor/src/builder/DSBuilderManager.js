"use strict";
/**
 * @file DSBuilderManager
 * @desc 数据源构造管理器
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSBuilderManager = void 0;
var tslib_1 = require("tslib");
var DSBuilder_1 = require("./DSBuilder");
var DSBuilderManager = /** @class */ (function () {
    function DSBuilderManager(manager) {
        var _this = this;
        this.builders = new Map();
        DSBuilder_1.builderFactory.forEach(function (Builder, key) {
            _this.builders.set(key, new Builder(manager));
        });
    }
    Object.defineProperty(DSBuilderManager.prototype, "size", {
        get: function () {
            return this.builders.size;
        },
        enumerable: false,
        configurable: true
    });
    DSBuilderManager.prototype.getBuilderByKey = function (key) {
        return this.builders.get(key);
    };
    DSBuilderManager.prototype.getBuilderByScaffoldSetting = function (scaffoldConfig) {
        return this.builders.get(scaffoldConfig.dsType);
    };
    DSBuilderManager.prototype.getBuilderBySchema = function (schema) {
        var e_1, _a;
        var builder;
        try {
            for (var _b = tslib_1.__values(Array.from(this.builders.entries())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = tslib_1.__read(_c.value, 2), key = _d[0], value = _d[1];
                if (value.match(schema)) {
                    builder = value;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return builder ? builder : this.getDefaultBuilder();
    };
    DSBuilderManager.prototype.getDefaultBuilderKey = function () {
        var _a, _b, _c;
        var collections = Array.from(this.builders.entries()).filter(function (_a) {
            var _b;
            var _c = tslib_1.__read(_a, 2), _ = _c[0], builder = _c[1];
            return ((_b = builder === null || builder === void 0 ? void 0 : builder.disabledOn) === null || _b === void 0 ? void 0 : _b.call(builder)) !== true;
        });
        var _d = tslib_1.__read((_c = (_a = collections.find(function (_a) {
            var _b = tslib_1.__read(_a, 2), _ = _b[0], builder = _b[1];
            return builder.isDefault === true;
        })) !== null && _a !== void 0 ? _a : (_b = collections.sort(function (lhs, rhs) {
            var _a, _b;
            return ((_a = lhs[1].order) !== null && _a !== void 0 ? _a : 0) - ((_b = rhs[1].order) !== null && _b !== void 0 ? _b : 0);
        })) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : [], 2), defaultKey = _d[0], _ = _d[1];
        return defaultKey;
    };
    DSBuilderManager.prototype.getDefaultBuilder = function () {
        var _a, _b, _c;
        var collections = Array.from(this.builders.entries()).filter(function (_a) {
            var _b;
            var _c = tslib_1.__read(_a, 2), _ = _c[0], builder = _c[1];
            return ((_b = builder === null || builder === void 0 ? void 0 : builder.disabledOn) === null || _b === void 0 ? void 0 : _b.call(builder)) !== true;
        });
        var _d = tslib_1.__read((_c = (_a = collections.find(function (_a) {
            var _b = tslib_1.__read(_a, 2), _ = _b[0], builder = _b[1];
            return builder.isDefault === true;
        })) !== null && _a !== void 0 ? _a : (_b = collections.sort(function (lhs, rhs) {
            var _a, _b;
            return ((_a = lhs[1].order) !== null && _a !== void 0 ? _a : 0) - ((_b = rhs[1].order) !== null && _b !== void 0 ? _b : 0);
        })) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : [], 2), _ = _d[0], defaultBuilder = _d[1];
        return defaultBuilder;
    };
    DSBuilderManager.prototype.getAvailableBuilders = function () {
        return Array.from(this.builders.entries())
            .filter(function (_a) {
            var _b;
            var _c = tslib_1.__read(_a, 2), _ = _c[0], builder = _c[1];
            return ((_b = builder === null || builder === void 0 ? void 0 : builder.disabledOn) === null || _b === void 0 ? void 0 : _b.call(builder)) !== true;
        })
            .sort(function (lhs, rhs) {
            var _a, _b;
            return ((_a = lhs[1].order) !== null && _a !== void 0 ? _a : 0) - ((_b = rhs[1].order) !== null && _b !== void 0 ? _b : 0);
        });
    };
    DSBuilderManager.prototype.getDSSelectorSchema = function (patch) {
        var builders = this.getAvailableBuilders();
        var options = builders.map(function (_a) {
            var _b = tslib_1.__read(_a, 2), key = _b[0], builder = _b[1];
            return ({
                label: builder.name,
                value: key
            });
        });
        return tslib_1.__assign({ type: 'radios', label: '数据来源', name: 'dsType', visible: options.length > 0, selectFirst: true, options: options }, patch);
    };
    DSBuilderManager.prototype.buildCollectionFromBuilders = function (callback) {
        var builders = this.getAvailableBuilders();
        var collection = builders
            .map(function (_a, index) {
            var _b = tslib_1.__read(_a, 2), key = _b[0], builder = _b[1];
            return callback(builder, key, index);
        })
            .filter(Boolean);
        return collection;
    };
    return DSBuilderManager;
}());
exports.DSBuilderManager = DSBuilderManager;
