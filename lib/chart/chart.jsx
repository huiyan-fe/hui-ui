import React from 'react';
require('./chart.scss');

class Chart extends React.Component {
    constructor(args) {
        super(args);

        this.option = {
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

        this.state = {
            activeIndex: 0,
            isHide: false
        }
        this.doms = {};
    }

    componentDidMount() {
        this.charts = echarts.init(this.doms.chart);
        let option = {
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

        this.showChart();
    }

    showChart() {
        let data = this.props.dataSource[this.state.activeIndex];
        this.option.xAxis.data = data.xAxis;
        this.option.series = data.series;
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
        })
    }

    render() {
        var theme = this.props.theme || 'default';
        return (
            <div
                className={"hui-chart" + ' theme-' + theme}
                style={{
                    display: this.state.isHide ? 'none' : ''
                }}
            >
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
