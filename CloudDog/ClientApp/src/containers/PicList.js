import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import loading from '../asset/loading.svg';
import utils from '../lib/utils';
import { globalApiUrl, picList } from '../api';

class Item extends Component {
	constructor(props) {
    super(props);
		this.zoom = this.zoom.bind(this);
	}
	zoom() {
    const { url, list } = this.props;
    const _list = list.map(item => {
      return globalApiUrl + item.url;
    })
		utils.zoom(globalApiUrl + url, _list);
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
					alt="哈啤" style={{display: 'block', width: '100%', margin: '.1rem 0'}} src={thumb}
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
			pics: [],
    }
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    this.init();
  }
  init() {
    this.getList();
    utils.scrollEnd(this.getList);
  }
  async getList() {
    const { pending, pageIndex, totalPage, pics } = this.state;
    if (pending || pageIndex > totalPage) {
      return;
    }
    this.setState({pending: true, pageIndex: pageIndex +1});
    const result = await picList({pageIndex});
    if (result.code === 0) {
      this.setState({
        totalPage: result.totalPage,
        pics: [...pics, result.items],
      })
    } else {
      alert(result.message);
    }
    this.setState({pending: false});
  }
	render() {
		const { pageIndex, totalPage, pending, pics } = this.state;
		return (
			<div style={{padding: '0 .2rem', overflow: 'hidden'}}>
				{pics && pics.map((item, i) => (
					<Item thumb={item.thumb} url={item.url} list={pics} key={i} />
				))}
        {pending &&
          <div style={{textAlign: 'center', color: '#b4cdf1', fontSize: '.14rem'}}>
            <img style={{width: '20%', verticalAlign: 'center'}} src={loading} />
            <span style={{verticalAlign: 'center'}}>玩命加载中</span>
          </div>
        }
        {pageIndex > totalPage &&
          <div style={{textAlign: 'center', fontSize: '.16rem'}}>没图了，再去上传点吧 =。=</div>
        }
			</div>
		)
	}
}

export default PicList;
