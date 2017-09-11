import React from 'react';
require('./list.scss');
// yzc
class List extends React.Component {
    constructor(args) {
        super(args);
    }

    getTdContent(td, isTh) {
        let tdDom = td;
        let style = {}

        if (typeof td === 'object' && !React.isValidElement(td)) {
            tdDom = tdDom.content || '';
            style = td.style || {};
        }

        if (isTh) {
            return <th key={`th_${Math.random()}`} style={style}>{tdDom}</th>;
        } else {
            return <td key={`td_${Math.random()}`} style={style}>{tdDom}</td>;
        }

    }

    getTableHead() {
        const HeadData = this.props.dataSource && this.props.dataSource.head && this.props.dataSource.head.data || [];
        const HeadStyle = this.props.dataSource && this.props.dataSource.head && this.props.dataSource.head.style || {};
        const ths = HeadData.map(item => this.getTdContent(item, true));
        return <tr style={HeadStyle} key="tableHead">{ths}</tr>;
    }

    getTableList() {
        const BodyData = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.data || [];
        const BodyStyle = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.style || [];
        return BodyData.map((trs, trindex) => {
            const tds = trs.map(td => this.getTdContent(td));
            return <tr style={BodyStyle} key={`tableBody${trindex}`}>{tds}</tr>;
        })
    }

    render() {
        const tableStyle = this.props.dataSource.style || {};
        const defaultStyle = { width: '100%', borderCollapse: 'collapse' };
        Object.keys(tableStyle).forEach(key => {
            defaultStyle[key] = tableStyle[key];
        });
        return (
            <table style={defaultStyle}>
                <thead >
                    {this.getTableHead()}
                </thead>
                <tbody>
                    {this.getTableList()}
                </tbody>
            </table>
        )
    }
}

export default List;