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

require('./chart.scss');

var UnfoldIcon = function (_React$Component) {
    _inherits(UnfoldIcon, _React$Component);

    function UnfoldIcon() {
        _classCallCheck(this, UnfoldIcon);

        return _possibleConstructorReturn(this, (UnfoldIcon.__proto__ || Object.getPrototypeOf(UnfoldIcon)).apply(this, arguments));
    }

    _createClass(UnfoldIcon, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'svg',
                { viewBox: '0 0 1024 1024', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', width: '200', height: '200' },
                _react2.default.createElement('defs', null),
                _react2.default.createElement('path', { d: 'M81.953 717.824c12.288 12.288 31.328 13.024 43.008 2.016l369.984-369.952c15.072-15.872 19.008-15.808 34.817 0l369.952 369.952c11.68 11.039 30.72 10.272 43.008-2.016 12.512-12.512 13.216-32.032 1.6-43.68l-410.944-410.944c-5.056-5.056-11.648-7.328-18.464-7.744h-5.152c-6.816 0.448-13.408 2.72-18.464 7.744l-410.944 410.944c-11.585 11.648-10.88 31.2 1.6 43.68z' })
            );
        }
    }]);

    return UnfoldIcon;
}(_react2.default.Component);

var Chart = function (_React$Component2) {
    _inherits(Chart, _React$Component2);

    function Chart(args) {
        _classCallCheck(this, Chart);

        var _this2 = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, args));

        _this2.option = _this2.props.option || {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: []
        };

        if (_this2.props.theme === 'radio') {
            _this2.option = {
                title: {
                    text: '',
                    textStyle: {
                        color: '#999',
                        fontSize: 12
                    },
                    padding: [0, 0, 0, 0]
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '20px',
                    left: '40px',
                    right: '40px',
                    bottom: '20px',
                    containLabel: true,
                    show: false
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        lineStyle: {}
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#222'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                },
                series: []
            };
        };

        _this2.state = {
            activeIndex: 0,
            isFold: false,
            isHide: false
        };
        _this2.doms = {};
        return _this2;
    }

    _createClass(Chart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.charts = echarts.init(this.doms.chart);
            this.showChart();
        }
    }, {
        key: 'showChart',
        value: function showChart() {
            var data = this.props.dataSource[this.state.activeIndex];
            this.option.xAxis.data = data.xAxis;
            this.option.series = data.series;
            if (this.props.theme === 'radio') {
                this.option.series[0].itemStyle = {
                    normal: {
                        color: '#5c89e7'
                    }
                };
                this.option.series[0].areaStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#69acf9'
                        }, {
                            offset: 1,
                            color: '#fff'
                        }])
                    }
                };
            }
            this.charts.clear();
            this.charts.setOption(this.option);
        }
    }, {
        key: 'getTitleBtn',
        value: function getTitleBtn() {
            var _this3 = this;

            var data = this.props.dataSource;
            return data.map(function (item, index) {
                return _react2.default.createElement(
                    'span',
                    {
                        onClick: _this3.changeTab.bind(_this3, index),
                        className: 'hui-chart-btn ' + (index === _this3.state.activeIndex ? 'active' : ''),
                        key: 'title_' + index },
                    item.name
                );
            });
        }
    }, {
        key: 'changeTab',
        value: function changeTab(index) {
            this.setState({
                activeIndex: index
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.showChart();
        }
    }, {
        key: 'close',
        value: function close() {
            var _this4 = this;

            this.setState({
                isHide: true
            }, function () {
                _this4.props.close && _this4.props.close();
            });
        }
    }, {
        key: 'handleToggleFold',
        value: function handleToggleFold() {
            this.setState({
                isFold: !this.state.isFold
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var theme = this.props.theme || 'default';

            var openButton = null;
            if (this.props.isShowFold === true) {
                openButton = _react2.default.createElement(
                    'div',
                    { className: 'hui-chart-panel-unfold',
                        title: (this.state.isFold ? '展开' : '收起') + "面板",
                        onClick: this.handleToggleFold.bind(this) },
                    _react2.default.createElement(UnfoldIcon, null)
                );
            }

            return _react2.default.createElement(
                'div',
                {
                    className: "hui-chart" + ' theme-' + theme + ' ' + (this.state.isFold ? 'fold' : ''),
                    style: {
                        display: this.state.isHide ? 'none' : ''
                    }
                },
                openButton,
                _react2.default.createElement(
                    'div',
                    { className: 'hui-chart-title' },
                    this.getTitleBtn(),
                    this.props.hideCloseBtn === true ? null : _react2.default.createElement(
                        'svg',
                        {
                            className: 'hui-chart-close', width: '30', height: '30', viewBox: '0 0 1024 1024',
                            onClick: this.close.bind(this) },
                        _react2.default.createElement('path', { d: 'M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'hui-chart-chart',
                        ref: function ref(e) {
                            _this5.doms.chart = e;
                        },
                        style: {
                            height: (this.props.height || 290) - 30 + 'px'
                        } },
                    'x'
                )
            );
        }
    }]);

    return Chart;
}(_react2.default.Component);

exports.default = Chart;