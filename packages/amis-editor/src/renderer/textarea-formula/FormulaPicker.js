"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var amis_1 = require("amis");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Editor_1 = tslib_1.__importDefault(require("amis-ui/lib/components/formula/Editor"));
var FormulaPicker = function (props) {
    var variables = props.variables, variableMode = props.variableMode, _a = props.evalMode, evalMode = _a === void 0 ? true : _a;
    var _b = tslib_1.__read(react_1.default.useState(''), 2), formula = _b[0], setFormula = _b[1];
    (0, react_1.useEffect)(function () {
        var initable = props.initable, value = props.value;
        if (initable && value) {
            setFormula(value);
        }
    }, [props.value]);
    var handleChange = function (data) {
        setFormula(data);
    };
    var handleClose = function () {
        props.onClose && props.onClose();
    };
    var handleConfirm = function () {
        props.onConfirm && props.onConfirm(formula);
    };
    return (react_1.default.createElement(amis_1.Modal, { className: (0, classnames_1.default)('FormulaPicker-Modal'), size: "lg", show: true, onHide: handleClose, closeOnEsc: true },
        react_1.default.createElement(amis_1.Modal.Body, null,
            react_1.default.createElement(Editor_1.default, tslib_1.__assign({}, props, { header: props.header || '表达式', variables: variables, variableMode: variableMode, value: formula, evalMode: evalMode, onChange: handleChange }))),
        react_1.default.createElement(amis_1.Modal.Footer, null,
            react_1.default.createElement(amis_1.Button, { onClick: handleClose }, "\u53D6\u6D88"),
            react_1.default.createElement(amis_1.Button, { onClick: handleConfirm, level: "primary" }, "\u786E\u8BA4"))));
};
exports.default = FormulaPicker;
