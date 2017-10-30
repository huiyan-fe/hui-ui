'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./option.scss');

var List = function (_React$Component) {
    _inherits(List, _React$Component);

    function List(args) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, args));

        var list = _this.props.dataSource;
        var defaultValue = _this.props.defaultValue || '';

        var value = '';
        list.forEach(function (item) {
            if (item.value === defaultValue) {
                value = item;
            }
        });
        if (!value) value = list[0];
        _this.state = {
            list: list,
            value: value,
            listShow: false
        };
        return _this;
    }

    _createClass(List, [{
        key: 'getList',
        value: function getList() {
            var _this2 = this;

            return this.state.list.map(function (item, index) {
                return _react2.default.createElement(
                    'li',
                    { onClick: _this2.choose.bind(_this2, item), key: index, style: _this2.props.listItemStyle || {} },
                    item.text
                );
            });
        }
    }, {
        key: 'choose',
        value: function choose(value) {
            this.setState({
                value: value,
                listShow: false
            });
            this.props.onChange && this.props.onChange(value);
        }
    }, {
        key: 'toggleList',
        value: function toggleList() {
            this.setState({
                listShow: !this.state.listShow
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.clickEvt = this.click.bind(this);
            window.addEventListener('click', this.clickEvt);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this.clickEvt);
        }
    }, {
        key: 'click',
        value: function click(e) {
            var target = e.target;
            while (target) {
                if (target === this.popDom || target === this.popHandleDom) {
                    return false;
                }
                target = target.parentElement;
            }
            this.setState({
                ctiyBoxShow: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            // listShow
            var listStyle = JSON.parse(JSON.stringify(this.props.listStyle || {}));
            listStyle.display = this.state.listShow ? '' : 'none';
            var shadowStyle = JSON.parse(JSON.stringify(listStyle));
            shadowStyle.display = 'block';
            return _react2.default.createElement(
                'div',
                { className: this.props.className + ' hui-option', style: this.props.style || {}, ref: function ref(e) {
                        return _this3.popDom = e;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'hui-option-box',
                        onClick: this.toggleList.bind(this),
                        style: this.props.boxStyle || {} },
                    _react2.default.createElement(
                        'span',
                        { className: 'hui-option-tips', style: this.props.tipsStyle || {} },
                        _react2.default.createElement(
                            'span',
                            null,
                            this.state.value.text
                        )
                    ),
                    _react2.default.createElement(
                        'svg',
                        { viewBox: '0 0 33.73 18.58', style: this.props.iconStyle || {} },
                        _react2.default.createElement('polyline', {
                            points: '0.36 0.35 17.36 17.85 33.36 0.35' })
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'hui-option-list', style: listStyle },
                    this.getList()
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'hui-option-list-shadow', style: shadowStyle },
                    this.getList()
                )
            );
        }
    }]);

    return List;
}(_react2.default.Component);

exports.default = List;