import React from 'react';
require('./chart.scss');

class UnfoldIcon extends React.Component {
    render() {
        return (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs></defs>
            <path d="M81.953 717.824c12.288 12.288 31.328 13.024 43.008 2.016l369.984-369.952c15.072-15.872 19.008-15.808 34.817 0l369.952 369.952c11.68 11.039 30.72 10.272 43.008-2.016 12.512-12.512 13.216-32.032 1.6-43.68l-410.944-410.944c-5.056-5.056-11.648-7.328-18.464-7.744h-5.152c-6.816 0.448-13.408 2.72-18.464 7.744l-410.944 410.944c-11.585 11.648-10.88 31.2 1.6 43.68z"></path>
        </svg>);
    }
}

class Chart extends React.Component {
    constructor(args) {
        super(args);

        this.option = this.props.option || {
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
        }

        if (this.props.theme === 'radio') {
            this.option = {
                title: {
                    text: '',
                    textStyle: {
                        color: '#999',
                        fontSize: 12,
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
                        lineStyle: {
                        }
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
            }
        };

        this.state = {
            activeIndex: 0,
            isFold: false,
            isHide: false
        }
        this.doms = {};
    }

    componentDidMount() {
        this.charts = echarts.init(this.doms.chart);
        this.showChart();
    }

    showChart() {
        let data = this.props.dataSource[this.state.activeIndex];
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

    getTitleBtn() {
        let data = this.props.dataSource;
        return data.map((item, index) => (
            <span
                onClick={this.changeTab.bind(this, index)}
                className={`hui-chart-btn ${index === this.state.activeIndex ? 'active' : ''}`}
                key={`title_${index}`}>
                {item.name}
            </span>
        ));
    }

    changeTab(index) {
        this.setState({
            activeIndex: index
        })
    }

    componentDidUpdate() {
        this.showChart();
    }

    close() {
        this.setState({
            isHide: true
        }, () => {
            this.props.close && this.props.close();
        })
    }

    handleToggleFold() {
        this.setState({
            isFold: !this.state.isFold
        });
    }

    render() {
        var theme = this.props.theme || 'default';

        let openButton = null;
        if (this.props.isShowFold === true) {
            openButton = (<div className="hui-chart-panel-unfold"
                title={(this.state.isFold ? '展开' : '收起') + "面板"}
                    onClick={this.handleToggleFold.bind(this)}>
                    <UnfoldIcon/>
            </div>);
        }

        return (
            <div
                className={"hui-chart" + ' theme-' + theme + ' ' + (this.state.isFold ? 'fold' : '')}
                style={{
                    display: this.state.isHide ? 'none' : ''
                }}
            >
                {openButton}
                <div className="hui-chart-title">
                    {this.getTitleBtn()}
                    {this.props.hideCloseBtn === true ? null :
                    <svg
                        className="hui-chart-close" width="30" height="30" viewBox="0 0 1024 1024"
                        onClick={this.close.bind(this)}>
                        <path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"></path>
                    </svg>
                    }
                </div>
                <div
                    className="hui-chart-chart"
                    ref={(e) => { this.doms.chart = e; }}
                    style={{
                        height: (this.props.height || 290) - 30 + 'px'
                    }}>
                    x
                </div>
            </div>
        )
    }
}

export default Chart;
