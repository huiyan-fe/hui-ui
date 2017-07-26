import List from '../../lib/list/list.jsx';

const React = require('react');
const ReactDOM = require('react-dom');

class ListDemo extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
        };
    }

    componentDidMount() {
    }
    render() {
        let dataSource = [{
            username: '李高锋'
        }, {
            username: '赵希'
        }]
        return (
            <div>
                <List
                    dataSource={dataSource}
                    render={(item, index) => (
                        <div>{index} - {item.username}</div>
                    )} />
            </div>
        );
    }
}

ReactDOM.render(<ListDemo />, document.getElementById('content'));
