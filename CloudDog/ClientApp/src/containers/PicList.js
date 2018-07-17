import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import loading from '../asset/loading.svg';
import utils from '../lib/utils';

class Item extends Component {
	constructor(props) {
		super(props);
		this.zoom = this.zoom.bind(this);
	}
	zoom() {
		const { pic, list } = this.props;
		utils.zoom(pic, list);
	}
	render() {
		const { pic } = this.props;
		return (
			<LazyLoad
				height={300}
				offset={100}
				once
			>
				<img
					alt="哈啤" style={{display: 'block', width: '100%'}} src={pic}
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
			pics: [
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531571417160&di=71f9a6023b7ec5229e302723f7d6b21f&imgtype=0&src=http%3A%2F%2Fpic29.photophoto.cn%2F20131123%2F0035035954111499_b.jpg',
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531571417159&di=a8a99d3f79e8ea53b3706ddb670ca2ba&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Fba98921529b5011247cf3fc9edf811fff75e940d.jpg',
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531571417158&di=6cbb0b57e52294291cc011b486268273&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b4ea59f68cf8a801216a4bdc9aaa.jpg%402o.jpg',
			]
		}
	}
	render() {
		const { pics } = this.state;
		return (
			<div>
				{pics && pics.map((item, i) => (
					<Item pic={item} list={pics} key={i} />
				))}
			</div>
		)
	}
}

export default PicList;
