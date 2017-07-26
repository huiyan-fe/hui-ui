import React from 'react';
require('./list.scss');

class List extends React.Component {
    constructor(args) {
        super(args);
        console.log(this.props.dataSource)
    }

    getList() {
        let dataSource = this.props.dataSource;
        let render = this.props.render;
        return dataSource.map((item, index) => {
            return (
                <li key={index}>
                    {render(item, index)}
                </li>
            )
        })
    }

    render() {
        return (
            <ul className="hui-list">
                {this.getList()}
            </ul>
        )
    }
}

export default List;