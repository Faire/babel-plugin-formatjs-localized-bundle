
var StubLocalizationComponent = function StubLocalizationComponent() {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(LocalMsg, {
        id: "0dBLIo",
        defaultMessage: [{
            "type": 0,
            "value": "Test for localization in shared dependency"
        }]
    }), /*#__PURE__*/_react["default"].createElement(LocalMsg, {
        id: "AtqwNy",
        defaultMessage: [{
            "type": 0,
            "value": "Test for localization in shared dependency "
        }, {
            "type": 1,
            "value": "_var"
        }],
        values: {
            _var: 1
        }
    }));
};

var StubImperativeLocalizationComponent = function StubImperativeLocalizationComponent() {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _localizationWrappers.localize)({
        id: "uohyBB",
        defaultMessage: [{
            "type": 0,
            "value": "[Imperative] Test for localization in shared dependency"
        }]
    }), (0, _localizationWrappers.localize)({
        id: "qXVQAv",
        defaultMessage: [{
            "type": 0,
            "value": "[Imperative] Test for localization in shared dependency "
        }, {
            "type": 1,
            "value": "_var"
        }]
    }, {
        _var: 1
    }));
};
