import Option from '../../lib/option/option.js';
// import Option from 'hui-ui/lib/Option/Option.jsx';

const React = require('react');
const ReactDOM = require('react-dom');

class OptionDemo extends React.Component {
    render() {
        console.log('xxxxx')
        let dataSource = [{
            value: '123',
            text: 'adfafdas'
        }, {
            value: 'asdf1-231afa',
            text: 'adfafdasasfasdg2134123'
        }]
        return (
            <div>
                <Option
                    dataSource={dataSource}
                    defaultValue={'123'}
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

ReactDOM.render(<OptionDemo />, document.getElementById('content'));
