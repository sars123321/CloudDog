import React, {Component} from 'react';
import './index.css'
import arrow from '../../asset/arrow.png';
import loading from '../../asset/loading.svg';

class PullDownRefresh extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { state } = this.props;
    let imgClass = '', imgSrc = arrow, tipText;
    if (state === 'willRefresh') {
      tipText = '松手刷新页面';
    } else if (state === 'refreshing') {
      tipText = '正在刷新，请稍等';
      imgSrc = loading;
    } else if (state === 'normal') {
      imgClass = 'rotate';
      tipText = '继续下拉，刷新页面';
    }
    return (
      <div className="pulldown">
        <img className={imgClass} src={imgSrc} alt="pullDown" />
        <span>{tipText}</span>
        {state === 'refreshing' && <div className="pulldownMask"></div>}
      </div>
    )
  }
}

export default PullDownRefresh;