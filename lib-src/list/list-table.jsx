import React from 'react';
require('./list.scss');
// yzc
class List extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            activeIndex: this.props.activeIndex || null
        }
    }

    getTdContent(td, isTh) {
        let tdDom = td;
        let style = {}

        if (typeof td === 'object' && !React.isValidElement(td)) {
            tdDom = tdDom.content || '';
            style = td.style || {};
        }

        if (isTh) {
            return <th key={`th_${Math.random()}`} style={style} {...td.attr}>{tdDom}</th>;
        } else {
            return <td key={`td_${Math.random()}`} style={style}  {...td.attr}>{tdDom}</td>;
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
        const BodyActiveStyle = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.activeStyle || [];
        const BodyListClass = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.className || '';
        return BodyData.map((trs, trindex) => {
            const tds = trs.map(td => this.getTdContent(td));
            const isActive = (this.props.activeIndex === undefined ? this.state.activeIndex : this.props.activeIndex) === trindex;
            let style = BodyStyle;
            if (isActive) {
                const oldStyle = JSON.parse(JSON.stringify(BodyStyle));
                for (var i in BodyActiveStyle) {
                    oldStyle[i] = BodyActiveStyle[i];
                }
                style = oldStyle;
            }
            return (
                <tr
                    className={`${isActive ? 'active' : ''} ${BodyListClass}`}
                    style={style} key={`tableBody${trindex}`}
                    onClick={this.click.bind(this, trs, trindex)}
                    onMouseEnter={this.onMouseEnter.bind(this, trs, trindex)}
                    onMouseLeave={this.onMouseLeave.bind(this, trs, trindex)}
                    onMouseOut={this.onMouseOut.bind(this, trs, trindex)}
                    onMouseMove={this.onMouseMove.bind(this, trs, trindex)}
                >
                    {tds}
                </tr>
            );
        })
    }

    showTip(x, y, txt) {
        if (!txt) {
            return false;
        }
        if (!this.tipsDom) {
            let tips = document.querySelector('.hui-ui-tips');
            if (tips) {
                this.tipsDom = tips;
            } else {
                this.tipsDom = document.createElement('div');
                this.tipsDom.className = 'hui-ui-tips';
                document.body.appendChild(this.tipsDom);
            }

        }
        this.tipsDom.innerText = txt;

        // document.documentElement.clientWidth


        this.tipsDom.style.display = 'block';
        let left = x;
        let top = y;
        if (left + this.tipsDom.offsetWidth > document.documentElement.clientWidth) {
            left = document.documentElement.clientWidth - this.tipsDom.offsetWidth - 10;
        }

        this.tipsDom.style.left = left + 'px';
        this.tipsDom.style.top = y + 'px';
        // console.log(this.tipsDom.offsetWidth)
    }

    hideTip() {
        this.tipsDom && (this.tipsDom.style.display = 'none');
    };

    onMouseMove(item, index, e) {
        const clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mousemove;
        clickEvt && clickEvt(item, index);
        clearTimeout(this.tipsTimeout);

        const x = e.pageX;
        const y = e.pageY;
        this.tipsTimeout = setTimeout(() => {
            this.showTip(x + 10, y + 10, this.props.tips[index]);
        }, 1000)
    }

    onMouseEnter(item, index) {
        const clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mouseenter;
        clickEvt && clickEvt(item, index);
        this.activeIndex = index;
    }

    onMouseLeave(item, index) {
        const clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mouseleave;
        clickEvt && clickEvt(item, index);
        this.activeIndex = null;
        this.hideTip();
        clearTimeout(this.tipsTimeout);
    }

    onMouseOut(item, index) {
        const clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.mouseout;
        clickEvt && clickEvt(item, index);
    }

    click(item, index) {
        const clickEvt = this.props.dataSource && this.props.dataSource.body && this.props.dataSource.body.click;
        clickEvt && clickEvt(item, index);
        this.setState({
            activeIndex: this.props.activeIndex || index
        })
    }

    render() {
        const tableStyle = this.props.dataSource.style || {};
        const defaultStyle = { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' };
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