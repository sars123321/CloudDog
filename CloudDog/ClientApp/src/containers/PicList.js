import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { PullDownRefresh } from '../components';
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
      pullDownHeight: 0,
      pullDownStart: 0,
      pullDownDisabled: false,
      pullState: 'normal',
      // pics: [
      //   {thumb: 'http://hyncao.com/upload/56d4c2a4cc6d4bf39eaac1de836ab225-A20A09A0-CD14-48B3-A915-A3368339B941_thumb.jpeg'},
      //   {thumb: 'http://hyncao.com/upload/12e1764fe9c045aaab555a031b1fe6c4-C4276E1F-92AF-42A0-985B-DB5C60A0BB27_thumb.jpeg'},
      //   {thumb: 'http://hyncao.com/upload/aa0d0222cd7f43f3b1660ae61df6d942-85D69E69-4F75-49C8-A9DF-9B3B1C93E028_thumb.jpeg'},
      // ]
			pics: [],
    }
    this.getList = this.getList.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
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
    if (!result) return;
    if (result.code === 0) {
      this.setState({
        pullDownHeight: 0,
        pullDownDisabled: false,
        pullState: 'normal',
        totalPage: result.totalPage,
        pics: [...pics, ...result.items],
      })
    } else {
      alert(result.message);
    }
    this.setState({pending: false});
  }
  touchStart(e) {
    const { pullDownDisabled } = this.state;
    if (pullDownDisabled) return;
    const y = e.touches[0].clientY;
    this.setState({pullDownStart: y});
  }
  touchMove(e) {
    const { pullDownStart, pullDownDisabled } = this.state;
    if (pullDownDisabled) return;
    let delta = e.touches[0].clientY - pullDownStart, pullState;
    if (delta < 0) {
      delta = 0;
    } else if (delta > 100) {
      delta = 50;
    } else {
      delta /= 2;
    }
    if (delta > 40) {
      pullState = 'willRefresh';
    } else if (delta < 40) {
      pullState = 'normal';
    }
    this.setState({pullDownHeight: delta, pullState});
  }
  touchEnd() {
    const { pullDownHeight } = this.state;
    let pullState, height, pullDownDisabled = false;
    if (pullDownHeight > 40) {
      pullState = 'refreshing';
      height = 50;
      document.body.classList.add('disabledScroll');
      pullDownDisabled = true;
    } else {
      pullState = 'normal';
      height = 0;
    }
    this.setState({pullDownHeight: height, pullState, pullDownDisabled}, () => {
      const { pullState, totalPage } = this.state;
      if (pullState === 'refreshing') {
        this.setState({
          pageIndex: 1,
          totalPage: totalPage,
          pullDownStart: 0,
        }, () => {this.init()})
      }
    });
  }
	render() {
		const { pageIndex, totalPage, pending, pics, pullDownHeight, pullState } = this.state;
		return (
      <div>
        <PullDownRefresh state={pullState} />
        <div
          onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}
          style={{minHeight: '50px', padding: '0 .2rem', overflow: 'hidden', backgroundColor: '#eee', marginTop: pullDownHeight + 'px'}}
        >
          {pics && pics.map((item, i) => (
            <Item thumb={item.thumb} url={item.url} list={pics} key={i} />
          ))}
          {pending &&
            <div style={{textAlign: 'center', color: '#b4cdf1', fontSize: '.14rem'}}>
              <img style={{width: '20%', verticalAlign: 'center'}} src={loading} alt="loading" />
              <span style={{verticalAlign: 'center'}}>玩命加载中</span>
            </div>
          }
          {pageIndex > totalPage &&
            <div style={{textAlign: 'center', fontSize: '.16rem', lineHeight: '.5rem', color: '#999'}}>没图了，再去上传点吧 =。=</div>
          }
        </div>
      </div>
		)
	}
}

export default PicList;
