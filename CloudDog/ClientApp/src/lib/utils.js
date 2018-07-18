const utils = {

  dateFormat: date => {
    const t = new Date(date);
    let str = `${t.getFullYear()}-${addZero(t.getMonth())}-${addZero(t.getDate())} ${addZero(t.getHours())}:${addZero(t.getMinutes())}:${addZero(t.getSeconds())}`;
    function addZero(t){
      if (t.toString().length === 1) {
        t = '0'+t;
      }
      return t;
    }
    return str;
  },

  /**
   * 数字格式化
   * @param number：要格式化的数字
   * @param decimals：保留几位小数
   * @param dec_point：小数点符号
   * @param thousands_sep：千分位符号
   * numberFormat(1234567.089, 2, ".", ",");//1,234,567.09
   */
  numberFormat: (number, decimals = 2, dec_point, thousands_sep) => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  },

  getUrlQuery: (name) => {
    if (typeof name !== 'string') {
      console.error('name参数应该为string');
    }
    const url = window.location.href,
          query = url.substring(url.indexOf('?')+1).split('&');
    let result;
    for (let i = 0; i < query.length; i++) {
      if (query[i].indexOf(`${name}=`) > -1) {
        result = query[i].split(`${name}=`)[1];
        break;
      }
    }
    if (result) return result;
    else {
      console.log(`${name} 参数不存在`);
      return '';
    }
  },
  getCookie: (c_name) => {
    var c_start, c_end;
    if (document.cookie.length>0)
    {
    c_start = document.cookie.indexOf(c_name + "=")
    if (c_start !== -1)
      {
      c_start = c_start + c_name.length+1
      c_end = document.cookie.indexOf(";",c_start)
      if (c_end === -1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
      }
    }
    return ""
  },
  setCookie: (cname, cvalue, exdays) => {
   var d = new Date();
   d.setTime(d.getTime() + (exdays||1*24*60*60*1000));
   document.cookie = cname + "=" + cvalue + ";";
  },

  getLS: (key) => {
    var ls = window.localStorage;
    if (ls.getItem(key)) {
      return ls.getItem(key)
    } else {
      console.log('localStorage中无此键：' + key);
      return '';
    }
  },

  setLS: (key, value) => {
    var ls = window.localStorage;
    ls.setItem(key, value);
  },

  removeLS: (key) => {
    var ls = window.localStorage;
    ls.removeItem(key);
  },

  clearLS: () => {
    var ls = window.localStorage;
    ls.clear();
  },

  /**
   * 处理请求结果
   * 处理result.code !== 20000 的请求结果
   * @param result result对象: {"code":10000,"msg":"","data":{},"redirectUrl":null,"etxra":null}
   * @param fn 指定的方法
   */
  handleAjaxResult: function(result, fn = null) {
    if (result.code === 10000) {
      // location.href = `${result.redirectUrl}&originUrl=${location.href}`
    } else if (result.code !== 20000) {
      this.tips(result.msg, 'fail');
    }
  },

  /*
  * 为页面绑定滚动异步分页
  * 在componentDidMount中调用一次即可
  * @param fn 触发fn
  * @param param 触发fn的传入参数
  * @param fix 修正值，即距离底部fix即可触发fn
  * @param target 滚动的容器dom
  */
  scrollEnd: (fn, param, fix = 100, target = window) => {
    target.onscroll = () => {
      const body = document.getElementsByTagName('body')[0];
      if (body.scrollHeight - (document.documentElement.scrollTop ||
        document.body.scrollTop) <= target.innerHeight + fix) {
        fn(param);
      }
    }
  },

  /*
   * 根据rem获取px
   * @param rem Num 单位为rem
   * return Num 单位为px
  */
  getPx: (rem) => {
    const ratio = window.devicePixelRatio;
    return rem * ratio *50
  },

  zoom: (pic, list) => {
    try {
      window.WeixinJSBridge.invoke('imagePreview', {
        'current': pic,
        'urls': list
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default utils
