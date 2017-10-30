import ListTable from '../../lib/list/list-table.jsx';
// import List from 'hui-ui/lib/list/list-table.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

class ListDemo extends React.Component {
    render() {
        const dataSource = {
            head: {
                data: [ // head的每个字段，可以是String或者Object或者ReactElement
                    '我是String',
                    <span>我是ReactElement</span>,
                    {
                        style: {
                            width: '80px'
                        },
                        content: '我是Object'
                    },
                    '迁入城市'
                ],
                style: { // head tr 样式
                    borderBottom: '1px solid #ccc',
                    textAlign: 'left',
                    height: '40px'
                }
            },
            body: {
                data: [ // body每行的每个字段
                    [1, '北京', '???', '上海'],
                    [2, '西安', <img width="200px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505719905&di=11cc5dc9ca495b511138389f8ecedc5a&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff9198618367adab4f1eb675d81d4b31c8701e4f1.jpg" />, '上海']
                ],
                style: { // body tr 的样式
                    height: '40px',
                    borderBottom: '1px solid #ddd'
                }
            },
            style: { // table的样式
                background: '#f4f4f4'
            }
        }
        return (
            <ListTable dataSource={dataSource} />
        );
    }
}

ReactDOM.render(<ListDemo />, document.getElementById('content'));
