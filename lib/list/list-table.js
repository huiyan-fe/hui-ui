'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./list.scss');
// yzc

var List = function (_React$Component) {
    _inherits(List, _React$Component);

    function List(args) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, args));

        _this.state = {
            activeIndex: _this.props.activeIndex || null
        };
        return _this;
    }

    _createClass(List, [{
        key: 'getTdContent',
        value: function getTdContent(td, isTh) {
            var tdDom = td;
            var style = {};

            if ((typeof td === 'undefined' ? 'undefined' : _typeof(td)) === 'object' && !_react2.default.isValidElement(td)) {
                tdDom = tdDom.content || '';
                style = td.style || {};
            }

            if (isTh) {
                return _react2.default.createElement(
                    'th',
                    _extends({ key: 'th_' + Math.random(), style: style }, td.attr),
                    tdDom
                );
            } else {
                return _react2.default.createElement(
                    'td',
                    _extends({ key: 'td_' + Math.random(), style: style }, td.attr),
                    tdDom
                );
            }
        }
    }, {
        key: 'getTableHead',
        value: function getTableHead() {
            var _this2 = this;

            var HeadData = this.props.dataSource && this.props.dataSource.head && this.props.dataSource.head.data || [];
            var HeadStyle = this.props.dataSource && this.props.dataSource.head && this.props.dataSource.head.style || {};
            var ths = HeadData.map(function (item) {
                return _this2.getTdContent(item, true);
            });
            return _react2.default.createElement(
                'tr',
                { style: HeadStyle, key: 'tableHead' },
                ths
            );
        }
    }, {
        key: 'getTableList',
        value: function getTableList() {
            var _this3 = this;

            var BodyData = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.data || [];
            var BodyStyle = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.style || [];
            var BodyActiveStyle = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.activeStyle || [];
            var BodyListClass = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.className || '';
            return BodyData.map(function (trs, trindex) {
                var tds = trs.map(function (td) {
                    return _this3.getTdContent(td);
                });
                var isActive = (_this3.props.activeIndex === undefined ? _this3.state.activeIndex : _this3.props.activeIndex) === trindex;
                var style = BodyStyle;
                if (isActive) {
                    var oldStyle = JSON.parse(JSON.stringify(BodyStyle));
                    for (var i in BodyActiveStyle) {
                        oldStyle[i] = BodyActiveStyle[i];
                    }
                    style = oldStyle;
                }
                return _react2.default.createElement(
                    'tr',
                    {
                        className: (isActive ? 'active' : '') + ' ' + BodyListClass,
                        style: style, key: 'tableBody' + trindex,
                        onClick: _this3.click.bind(_this3, trs, trindex),
                        onMouseEnter: _this3.onMouseEnter.bind(_this3, trs, trindex),
                        onMouseLeave: _this3.onMouseLeave.bind(_this3, trs, trindex),
                        onMouseOut: _this3.onMouseOut.bind(_this3, trs, trindex),
                        onMouseMove: _this3.onMouseMove.bind(_this3, trs, trindex)
                    },
                    tds
                );
            });
        }
    }, {
        key: 'showTip',
        value: function showTip(x, y, txt) {
            if (!txt) {
                return false;
            }
            if (!this.tipsDom) {
                var tips = document.querySelector('.hui-ui-tips');
                if (tips) {
                    this.tipsDom = tips;
                } else {
                    this.tipsDom = document.createElement('div');
                    this.tipsDom.className = 'hui-ui-tips';
                    document.body.appendChild(this.tipsDom);
                }
            }
            this.tipsDom.innerText = txt;

            // document.documentElement.clientWidth


            this.tipsDom.style.display = 'block';
            var left = x;
            var top = y;
            if (left + this.tipsDom.offsetWidth > document.documentElement.clientWidth) {
                left = document.documentElement.clientWidth - this.tipsDom.offsetWidth - 10;
            }

            this.tipsDom.style.left = left + 'px';
            this.tipsDom.style.top = y + 'px';
            // console.log(this.tipsDom.offsetWidth);
        }
    }, {
        key: 'hideTip',
        value: function hideTip() {
            this.tipsDom && (this.tipsDom.style.display = 'none');
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(item, index, e) {
            var _this4 = this;

            var clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mousemove;
            clickEvt && clickEvt(item, index);
            clearTimeout(this.tipsTimeout);

            var x = e.pageX;
            var y = e.pageY;
            this.tipsTimeout = setTimeout(function () {
                _this4.showTip(x + 10, y + 10, _this4.props.tips[index]);
            }, 1000);
        }
    }, {
        key: 'onMouseEnter',
        value: function onMouseEnter(item, index) {
            var clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mouseenter;
            clickEvt && clickEvt(item, index);
            this.activeIndex = index;
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(item, index) {
            var clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mouseleave;
            clickEvt && clickEvt(item, index);
            this.activeIndex = null;
            this.hideTip();
            clearTimeout(this.tipsTimeout);
        }
    }, {
        key: 'onMouseOut',
        value: function onMouseOut(item, index) {
            var clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mouseout;
            clickEvt && clickEvt(item, index);
        }
    }, {
        key: 'click',
        value: function click(item, index) {
            var clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.click;
            clickEvt && clickEvt(item, index);
            this.setState({
                activeIndex: this.props.activeIndex || index
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var tableStyle = this.props.dataSource.style || {};
            var defaultStyle = { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' };
            Object.keys(tableStyle).forEach(function (key) {
                defaultStyle[key] = tableStyle[key];
            });
            return _react2.default.createElement(
                'table',
                { style: defaultStyle },
                _react2.default.createElement(
                    'thead',
                    null,
                    this.getTableHead()
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    this.getTableList()
                )
            );
        }
    }]);

    return List;
}(_react2.default.Component);

exports.default = List;