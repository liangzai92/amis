"use strict";
/**
 * @file Background.ts
 * @description 背景设置
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundRenderer = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
var react_1 = tslib_1.__importStar(require("react"));
var amis_1 = require("amis");
var amis_editor_core_1 = require("amis-editor-core");
var Background = function (props) {
    var _a;
    var _b = tslib_1.__read((0, react_1.useState)(0), 2), tabIndex = _b[0], setTabIndex = _b[1];
    var noImage = props.noImage, render = props.render;
    var tabList = noImage
        ? ['pure', 'gradient', 'noset']
        : ['pure', 'gradient', 'image', 'noset'];
    function onChange(key) {
        return function (e) {
            var _a;
            var _b, _c, _d;
            var eventValue = e !== null && typeof e === 'object'
                ? typeof e.target === 'object'
                    ? e.target.value
                    : e.value
                : e;
            var value = props.value, onChange = props.onChange;
            var result = tslib_1.__assign(tslib_1.__assign({}, value), (_a = {}, _a[key] = eventValue, _a));
            // 透明度
            if (key === 'alpha') {
                result.backgroundColor = (_b = result.backgroundColor) === null || _b === void 0 ? void 0 : _b.replace(/,\s(1|0){1}.?[0-9]*\)$/g, ", ".concat(e / 100, ")"));
            }
            // 位置
            if (key === 'backgroundPosition') {
                result.backgroundPosition = e.target.getAttribute('data-pos');
            }
            // 背景大小级平铺模式
            if (key === 'backgroundSize') {
                var bsValue = eventValue !== null && eventValue !== void 0 ? eventValue : '';
                var bsArr = bsValue.split(' ');
                // 0位size 1位平铺方式
                if (bsArr.length > 1) {
                    result.backgroundSize = bsArr[0];
                    result.backgroundRepeat = bsArr[1];
                }
                else {
                    result.backgroundSize = bsValue;
                    result.backgroundRepeat = 'no-repeat';
                }
            }
            // 渐变色角度
            if (key === 'angle') {
                var backgroundImage = (_c = result.backgroundImage) !== null && _c !== void 0 ? _c : '';
                var lineraGradient = backgroundImage.indexOf('linear-gradient') !== -1
                    ? backgroundImage
                    : 'linear-gradient(180deg, transparent, transparent)';
                result.backgroundImage = lineraGradient.replace(/linear-gradient\(\d{1,3}/g, "linear-gradient(".concat(eventValue));
            }
            // 渐变色
            if (key === 'gradientPrev' || key === 'gradientNext') {
                var backgroundImage = (_d = result.backgroundImage) !== null && _d !== void 0 ? _d : '';
                var lineraGradient = backgroundImage.indexOf('linear-gradient') !== -1
                    ? backgroundImage
                    : 'linear-gradient(180deg, transparent, transparent)';
                var tempArr = lineraGradient.split(', ');
                var len = tempArr.length;
                // 前景色
                if (key === 'gradientPrev') {
                    if (len === 3) {
                        tempArr[1] = eventValue;
                    }
                    else if (len === 5 || len === 6) {
                        var startPos = 0;
                        var endPos = 0;
                        for (var i = 0; i < len; i++) {
                            if (tempArr[i].indexOf('rgb') !== -1) {
                                startPos = i;
                            }
                            if (tempArr[i].indexOf(')') !== -1 && endPos === 0) {
                                endPos = i;
                            }
                        }
                        // 后景色是rgb或rgba
                        if (endPos === len - 1) {
                            tempArr.splice(1, 1, eventValue);
                        }
                        else {
                            tempArr.splice(startPos, endPos + 1, eventValue);
                        }
                    }
                    else if (len >= 7) {
                        // 前景色和后景色都是rgb
                        for (var i = 0; i < len; i++) {
                            var pos = tempArr[i].indexOf(')');
                            if (pos !== -1) {
                                tempArr.splice(1, i, eventValue);
                                break;
                            }
                        }
                    }
                }
                // 后景色
                if (key === 'gradientNext') {
                    if (len === 3) {
                        tempArr[2] = eventValue + ')';
                    }
                    else if (len === 5 || len === 6) {
                        var startPos = 0;
                        var endPos = 0;
                        for (var i = 0; i < len; i++) {
                            if (tempArr[i].indexOf('rgb') !== -1) {
                                startPos = i;
                            }
                            if (tempArr[i].indexOf(')') !== -1 && endPos === 0) {
                                endPos = i;
                            }
                        }
                        // 后景色是rgb或rgba
                        if (endPos === len - 1) {
                            tempArr.splice(startPos, endPos + 1, eventValue + ')');
                        }
                        else {
                            tempArr.splice(-1, 1, eventValue + ')');
                        }
                    }
                    else if (len >= 7) {
                        // 前景色和后景色都是rgb
                        var flag = 0;
                        for (var i = 0; i < len; i++) {
                            var pos = tempArr[i].indexOf('rgb');
                            if (pos !== -1) {
                                flag++;
                                if (flag === 2) {
                                    tempArr.splice(i, len - i + 1, eventValue);
                                    break;
                                }
                            }
                        }
                    }
                }
                result.backgroundImage = tempArr.join(', ');
                result = (0, pick_1.default)(result, 'backgroundImage');
            }
            // 删除无用属性
            if (key === 'alpha' || key === 'backgroundColor') {
                result = (0, pick_1.default)(result, 'backgroundColor');
            }
            if (key === 'backgroundImage' ||
                key === 'backgroundPosition' ||
                key === 'backgroundSize') {
                if (/linear-gradient/g.test(result === null || result === void 0 ? void 0 : result.backgroundImage)) {
                    result = (0, pick_1.default)(result, 'backgroundPosition', 'backgroundSize', 'backgroundRepeat');
                }
                else {
                    result = (0, pick_1.default)(result, 'backgroundImage', 'backgroundPosition', 'backgroundSize', 'backgroundRepeat');
                }
            }
            onChange(tslib_1.__assign(tslib_1.__assign({}, (0, omit_1.default)(value, [
                'backgroundColor',
                'backgroundImage',
                'backgroundPosition',
                'backgroundSize',
                'backgroundRepeat',
                'angle',
                'gradientNext',
                'gradientPrev'
            ])), result));
        };
    }
    // 获取渐变颜色
    function getGradient(type) {
        var _a;
        var linearGradient = (_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundImage;
        var prevColor = '';
        var nextColor = '';
        if (/linear-gradient/g.test(linearGradient)) {
            var tempArr = linearGradient.split(', ');
            var len = tempArr.length;
            if (len === 3) {
                // 非rgb颜色
                prevColor = tempArr[1];
                nextColor = tempArr[2].slice(0, -1);
            }
            else if (len === 5 || len === 6) {
                // rgb或rgba颜色
                var startPos = 0;
                var endPos = 0;
                for (var i = 0; i < len; i++) {
                    if (tempArr[i].indexOf('rgb') !== -1) {
                        startPos = i;
                    }
                    if (tempArr[i].indexOf(')') !== -1 && endPos === 0) {
                        endPos = i;
                        if (i !== len - 1) {
                            prevColor = tempArr.slice(startPos, i + 1).join(', ');
                            nextColor = tempArr
                                .slice(i + 1)
                                .join('')
                                .slice(0, -1);
                        }
                        else {
                            prevColor = tempArr.slice(1, startPos).join('');
                            nextColor = tempArr.slice(startPos, len - 1).join(', ');
                        }
                    }
                }
            }
            else if (len >= 7) {
                // 前景色和后景色都是rgb或rgba
                var prevStartPos = 0;
                var prevEndPos = 0;
                var nextStartPos = 0;
                var nextEndPos = 0;
                for (var i = 0; i < len; i++) {
                    if (tempArr[i].indexOf('rgb') !== -1) {
                        if (prevStartPos === 0) {
                            prevStartPos = i;
                        }
                        else if (nextStartPos === 0) {
                            nextStartPos = i;
                        }
                    }
                    if (tempArr[i].indexOf(')') !== -1) {
                        if (prevEndPos === 0) {
                            prevEndPos = i;
                        }
                        else if (nextEndPos === 0) {
                            nextEndPos = i;
                        }
                    }
                }
                prevColor = tempArr.slice(prevStartPos, prevEndPos + 1).join(', ');
                nextColor = tempArr.slice(nextStartPos, nextEndPos).join(', ');
            }
            linearGradient.split('');
        }
        var returnColor = type === 'prev' ? prevColor : nextColor;
        if (returnColor === 'transparent') {
            return '';
        }
        return returnColor;
    }
    // 获取渐变角度
    function getGradientAngle() {
        var _a;
        var linearGradient = (_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundImage;
        var angle = 180;
        var match = /linear-gradient\((\d{1,3})/.exec(String(linearGradient || ''));
        if (match) {
            angle = +match[1];
        }
        return +angle;
    }
    // 背景颜色透明度
    function getAlpha(rgba) {
        var val = rgba.match(/(\d(\.\d+)?)+/g);
        return val ? val[3] * 100 : '';
    }
    // 获取激活的tab
    function setActiveTab() {
        var value = props.value;
        if ((value === null || value === void 0 ? void 0 : value.backgroundColor) || (value === null || value === void 0 ? void 0 : value.alpha)) {
            // 背景色
            setTabIndex(0);
        }
        else if (value === null || value === void 0 ? void 0 : value.backgroundImage) {
            if (/linear-gradient/g.test(value.backgroundImage)) {
                // 渐变色
                setTabIndex(1);
            }
            else {
                // 图片
                setTabIndex(2);
            }
        }
        else if ((value === null || value === void 0 ? void 0 : value.backgroundPosition) || (value === null || value === void 0 ? void 0 : value.backgroundSize)) {
            // 图片
            setTabIndex(2);
        }
        else {
            // 无背景
            setTabIndex(tabList.length - 1);
        }
    }
    // 上传图片
    function uploadImg(e) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, forms, configs, file, result, imgUrl;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = props === null || props === void 0 ? void 0 : props.receiver;
                        if (!url) {
                            console.warn('未配置图片上传地址');
                            return [2 /*return*/];
                        }
                        forms = new FormData();
                        configs = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        file = e.target.files[0];
                        forms.append('file', file);
                        return [4 /*yield*/, axios_1.default.post(url, forms, configs)];
                    case 1:
                        result = _b.sent();
                        if (result.status === 200) {
                            imgUrl = result.data.data.url;
                            onChange('backgroundImage')(imgUrl);
                        }
                        else {
                            alert(((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.message) || '上传失败');
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    // 背景图尺寸设置
    function getbsValue() {
        var _a, _b;
        var backgroundSize = ((_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundSize) || 'auto';
        var backgroundRepeat = (_b = props.value) === null || _b === void 0 ? void 0 : _b.backgroundRepeat;
        var returnVal = backgroundSize || '';
        if (backgroundSize === 'auto' && backgroundRepeat) {
            returnVal = backgroundSize + ' ' + backgroundRepeat;
        }
        return returnVal;
    }
    // 背景图路径设置
    function getbgValue() {
        var _a, _b;
        var backgroundImage = (_b = (_a = props.data) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.backgroundImage;
        return /linear-gradient/g.test(backgroundImage) ? '' : backgroundImage;
    }
    // 清空背景颜色、渐变色、背景图
    function clearValues() {
        var value = props.value, onChange = props.onChange;
        var result = tslib_1.__assign(tslib_1.__assign({}, value), { backgroundSize: '', backgroundPosition: '', backgroundColor: '', backgroundImage: '' });
        onChange(result);
    }
    function tabChange(index, item) {
        if (item === 'noset') {
            clearValues();
        }
        setTabIndex(index);
    }
    function handleChange(key, keyValue) {
        var _a, _b;
        var value = props.value, onChange = props.onChange;
        var result = {};
        if (key === 'backgroundColor') {
            result = tslib_1.__assign(tslib_1.__assign({}, (0, omit_1.default)(value, [
                'backgroundImage',
                'backgroundPosition',
                'backgroundSize',
                'backgroundRepeat',
                'angle'
            ])), (_a = {}, _a[key] = keyValue, _a));
        }
        else if (key === 'angle') {
            keyValue = keyValue || 0;
            var linearGradient = value === null || value === void 0 ? void 0 : value.backgroundImage;
            var backgroundImage = linearGradient === null || linearGradient === void 0 ? void 0 : linearGradient.replace(/(\d{1,})?deg/, "".concat(keyValue, "deg"));
            result = tslib_1.__assign(tslib_1.__assign({}, value), { backgroundImage: backgroundImage });
        }
        else {
            result = tslib_1.__assign(tslib_1.__assign({}, value), (_b = {}, _b[key] = keyValue, _b));
        }
        onChange(result);
    }
    var currentItem = tabList[tabIndex];
    (0, react_1.useEffect)(function () {
        setActiveTab();
    }, []);
    return (react_1.default.createElement("div", { className: "ae-Background" },
        react_1.default.createElement("div", { className: "ae-Background_tabs" },
            react_1.default.createElement("ul", { className: "ae-Background_tabs-nav" }, tabList.map(function (item, index) {
                return (react_1.default.createElement("li", { key: index, className: (0, classnames_1.default)(item, {
                        active: tabIndex === index
                    }), onClick: function () { return tabChange(index, item); } }));
            })),
            react_1.default.createElement("div", { className: "ae-Background_tabs-content" },
                currentItem === 'pure' && (react_1.default.createElement("div", { className: "ae-Background_setting" }, render('backgroundColor', {
                    type: 'input-color',
                    label: '背景色',
                    format: 'rgba',
                    mode: 'normal',
                    value: (_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundColor
                }, {
                    onChange: function (value) {
                        return handleChange('backgroundColor', value);
                    }
                }))),
                currentItem === 'gradient' && (react_1.default.createElement("div", { className: "ae-Background_setting" },
                    react_1.default.createElement("div", { className: "ae-Background_setting-item" },
                        react_1.default.createElement("div", { className: "ae-Background_setting-item_color" }, render('prev', {
                            type: 'input-color',
                            label: '开始颜色',
                            clearable: false,
                            placeholder: '起始色',
                            inputClassName: 'ae-Background-colorpicker',
                            value: getGradient('prev')
                        }, {
                            onChange: onChange('gradientPrev')
                        })),
                        react_1.default.createElement("div", { className: "ae-Background_setting-item_pic" }),
                        react_1.default.createElement("div", { className: "ae-Background_setting-item_color" }, render('next', {
                            type: 'input-color',
                            label: '结束颜色',
                            clearable: false,
                            placeholder: '结束色',
                            inputClassName: 'ae-Background-colorpicker',
                            value: getGradient('next')
                        }, {
                            onChange: onChange('gradientNext')
                        }))),
                    react_1.default.createElement("div", { className: "ae-Background_setting-item" }, render('gradient', {
                        type: 'input-number',
                        label: '渐变角度',
                        mode: 'row',
                        step: 10,
                        min: 0,
                        max: 360,
                        value: getGradientAngle(),
                        description: '* 角度范围0-360度，0度表示从下至上渐变'
                    }, {
                        onChange: function (value) { return handleChange('angle', value); }
                    })))),
                currentItem === 'image' && (react_1.default.createElement("div", { className: "ae-Background_setting" },
                    render('image', {
                        type: 'group',
                        mode: 'horizontal',
                        body: [
                            (0, amis_editor_core_1.getSchemaTpl)('backgroundImageUrl', {
                                name: 'backgroundImage',
                                placeholder: '点击或拖拽图片上传',
                                fixedSize: true,
                                value: getbgValue(),
                                onChange: onChange('backgroundImage'),
                                fixedSizeClassName: 'ae-Background-upload',
                                accept: '.jpg,.png,.svg,.gif',
                                crop: true,
                                columnRatio: 6,
                                horizontal: {
                                    left: 4,
                                    right: 8
                                }
                            }),
                            {
                                type: '',
                                label: '图片位置',
                                name: 'backgroundPosition',
                                asFormItem: true,
                                columnRatio: 6,
                                horizontal: {
                                    left: 4,
                                    right: 8
                                },
                                children: function () { return (react_1.default.createElement("ul", { className: "ae-Background_setting\u2014pos" }, [
                                    '0 0',
                                    '50% 0',
                                    '100% 0',
                                    '0 50%',
                                    '50% 50%',
                                    '100% 50%',
                                    '0 100%',
                                    '50% 100%',
                                    '100% 100%'
                                ].map(function (item) {
                                    var _a;
                                    return (react_1.default.createElement("li", { key: item, "data-pos": item, className: (0, classnames_1.default)('ae-Background_setting—pos_item', {
                                            active: item === ((_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundPosition)
                                        }), onClick: onChange('backgroundPosition') }));
                                }))); }
                            }
                        ]
                    }),
                    render('size', {
                        type: 'select',
                        label: '图片尺寸',
                        name: 'backgroundSize',
                        mode: 'horizontal',
                        placeholder: '图片尺寸',
                        value: getbsValue(),
                        options: [
                            {
                                label: '默认',
                                value: 'auto'
                            },
                            {
                                label: '充满',
                                value: 'cover'
                            },
                            {
                                label: '合适',
                                value: 'contain'
                            },
                            {
                                label: '拉伸',
                                value: '100%'
                            },
                            {
                                label: '平铺',
                                value: 'auto repeat'
                            },
                            {
                                label: '横向平铺',
                                value: 'auto repeat-x'
                            },
                            {
                                label: '纵向平铺',
                                value: 'auto repeat-y'
                            },
                            {
                                label: '原始尺寸',
                                value: 'auto no-repeat'
                            }
                        ]
                    }, {
                        onChange: function (value) {
                            return handleChange('backgroundSize', value);
                        }
                    }))),
                currentItem === 'noset' && (react_1.default.createElement("div", { className: "ae-Background_setting noset" }))))));
};
exports.default = Background;
var BackgroundRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(BackgroundRenderer, _super);
    function BackgroundRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackgroundRenderer.prototype.render = function () {
        return react_1.default.createElement(Background, tslib_1.__assign({}, this.props));
    };
    BackgroundRenderer = tslib_1.__decorate([
        (0, amis_1.FormItem)({ type: 'style-background' })
    ], BackgroundRenderer);
    return BackgroundRenderer;
}(react_1.default.Component));
exports.BackgroundRenderer = BackgroundRenderer;
