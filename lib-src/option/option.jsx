import React from 'react';
require('./option.scss');

class List extends React.Component {
    constructor(args) {
        super(args);
        const list = this.props.dataSource;
        const defaultValue = this.props.defaultValue || '';

        let value = '';
        list.forEach(item => {
            if (item.value === defaultValue) {
                value = item
            }
        });
        if (!value) value = list[0];
        this.state = {
            list,
            value,
            listShow: false
        }
    }

    getList() {
        return this.state.list.map((item, index) =>
            <li onClick={this.choose.bind(this, item)} key={index} style={this.props.listItemStyle || {}}>{item.text}</li>
        )
    }

    choose(value) {
        this.setState({
            value,
            listShow: false
        });
        this.props.onChange && this.props.onChange(value)
    }

    toggleList() {
        this.setState({
            listShow: !this.state.listShow
        });
    }

    componentDidMount() {
        this.clickEvt = this.click.bind(this);
        window.addEventListener('click', this.clickEvt);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.clickEvt);
    }

    click(e) {
        let target = e.target;
        while (target) {
            if (target === this.popDom || target === this.popHandleDom) {
                return false;
            }
            target = target.parentElement;
        }
        this.setState({
            ctiyBoxShow: false
        });
    }

    render() {
        // listShow
        const listStyle = JSON.parse(JSON.stringify(this.props.listStyle || {}));
        listStyle.display = this.state.listShow ? '' : 'none';
        const shadowStyle = JSON.parse(JSON.stringify(listStyle));
        shadowStyle.display = 'block';
        return (
            <div className={`${this.props.className} hui-option`} style={this.props.style || {}} ref={e => this.popDom = e}>
                <div className="hui-option-box"
                    onClick={this.toggleList.bind(this)}
                    style={this.props.boxStyle || {}}>
                    <span className="hui-option-tips" style={this.props.tipsStyle || {}}>
                        <span>{this.state.value.text}</span>
                    </span>
                    <svg viewBox="0 0 33.73 18.58" style={this.props.iconStyle || {}}>
                        <polyline
                            points="0.36 0.35 17.36 17.85 33.36 0.35" />
                    </svg>
                </div>
                <ul className="hui-option-list" style={listStyle}>{this.getList()}</ul>
                <ul className="hui-option-list-shadow" style={shadowStyle}>{this.getList()}</ul>
            </div >
        )
    }
}

export default List;