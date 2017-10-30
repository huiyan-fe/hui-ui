import List from '../../lib/list/list.js';
// import List from 'hui-ui/lib/list/list.jsx';

const React = require('react');
const ReactDOM = require('react-dom');

class ListDemo extends React.Component {
    render() {
        let dataSource = [{
            username: '李高锋'
        }, {
            username: '赵希'
        }, {
            username: '李丹妮'
        }]
        return (
            <div>
                <List
                    dataSource={dataSource}
                    render={(item, index) => (
                        <div>
                            <p>序号：{index}</p>
                            <p>姓名：{item.username}</p>
                        </div>
                    )} />
            </div>
        );
    }
}

ReactDOM.render(<ListDemo />, document.getElementById('content'));
