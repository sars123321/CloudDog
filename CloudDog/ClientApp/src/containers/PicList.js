import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import loading from '../asset/loading.svg';
import utils from '../lib/utils';
import { picList } from '../api';

class Item extends Component {
	constructor(props) {
    super(props);
		this.zoom = this.zoom.bind(this);
	}
	zoom() {
    const { url, list } = this.props;
    const _list = list.map(item => {
      return item.url;
    })
		utils.zoom(url, _list);
	}
	render() {
		const { thumb } = this.props;
		return (
			<LazyLoad
				height={300}
				offset={100}
				once
			>
				<img
					alt="哈啤" style={{display: 'block', width: '100%'}} src={thumb}
					onClick={this.zoom}
				/>
			</LazyLoad>
		)
	}
}

class PicList extends Component {
	constructor(props) {
		super(props);
		this.state = {
      pending: false,
      pageIndex: 1,
      totalPage: 2,
			pics: []
    }
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    this.init();
    utils.scrollEnd(this.getList, this);
  }
  init() {
    const { pageIndex } = this.state;
    this.getList(pageIndex);
  }
  async getList(pageIndex) {
    this.setState({pending: true});
    const result = await picList({pageIndex});
    if (result.code === 0) {
      this.setState({
        pageIndex: pageIndex + 1,
        totalPage: result.totalPage,
        pics: result.items,
      })
    } else {
      alert(result.message);
    }
  }
	render() {
		const { pending, pics } = this.state;
		return (
			<div>
				{pics && pics.map((item, i) => (
					<Item thumb={item.thumb} url={item.url} list={pics} key={i} />
				))}
        {pending &&
          <div style={{textAlign: 'center', color: '#b4cdf1', fontSize: '.14rem'}}>
            <img style={{width: '20%', verticalAlign: 'center'}} src={loading} />
            <span style={{verticalAlign: 'center'}}>玩命加载中</span>
          </div>}
			</div>
		)
	}
}

export default PicList;
