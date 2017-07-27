import Chart from '../../lib/chart/chart.jsx';

const React = require('react');
const ReactDOM = require('react-dom');

class ChartDemo extends React.Component {
    render() {
        let dataSource = [
            {
                name: 'card1',
                xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                series: [
                    {
                        name: '最低气温',
                        type: 'line',
                        data: [1, -2, 2, 5, 3, 2, 0]
                    }
                ]
            },
            {
                name: 'card2',
                xAxis: ['1', '2', '3', '4', '5', '6', '7'],
                series: [{
                    name: '最高气温',
                    type: 'line',
                    data: [11, 11, 15, 13, 12, 13, 10],
                }]
            },
            {
                name: 'card3',
                xAxis: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                series: [
                    {
                        name: '最低气温',
                        type: 'line',
                        data: [1, -2, 2, 5, 3, 2, 0]
                    }
                ]
            }
        ];
        return (
            <div>
                <Chart dataSource={dataSource} />
            </div>
        );
    }
}

ReactDOM.render(<ChartDemo />, document.getElementById('content'));
