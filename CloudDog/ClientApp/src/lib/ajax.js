import fetch from 'isomorphic-fetch'
import utils from './utils.js'

/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
const obj2String = (obj) => {
  let arr = [];
  for (let x in obj) {
    arr.push(`${x}=${obj[x]}`);
  }
  return arr.join('&');
}

const networkError = () => {
  if (window.throttle) {
    if (new Date() - window.throttle < 3000) {
      return;
    }
  } else {
    window.throttle = new Date();
  }
  return {code: 1, message: '网络异常'}
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, method = 'GET') {
  const searchStr = options instanceof FormData? options: obj2String(options);
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += `?t=${Math.random()}&${searchStr}`;
    initObj = {
      method: method,
      credentials: 'include',
      mode: 'cors'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      //headers: new Headers({
      //  'Accept': 'application/json',
      //  'Content-Type': 'application/x-www-form-urlencoded'
      //}),
      body: searchStr,
      mode: 'cors'
    }
  }
  return fetch(url, initObj);
}

/**
 * 检查请求状态
 * @param response
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = response.errorMsg;
  return error;
}

/**
 * GET请求
 * @param that this指针
 * @param url 请求地址
 * @param options 请求参数
 */
function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
        .then(checkStatus)
        .then((res) => {
          return res.json()
        }).then((res) => {
          return res;
        }).catch((e) => networkError());
}

/**
 * POST请求
 * @param that this指针
 * @param url 请求地址
 * @param options 请求参数
 */
function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
        .then(checkStatus)
        .then((res) => {
          return res.json()
        }).then((res) => {
          return res;
        }).catch((e) => networkError());
}

export {GET, POST}
