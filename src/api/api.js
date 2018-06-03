import axios from 'axios';
import wsInterface from './interface.json';
// 请求时的拦截
axios.interceptors.request.use(function (config) {
  // 发送请求之前做一些处理
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  if (config.method === 'post') {
    config.params = config.data;
  }
  return config;
}, function (error) {
  // 当请求异常时做一些处理
  loadinginstace.close();
  return Promise.reject(error);
});

// 响应时拦截
axios.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  return response;
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error);
});

const root = 'http://localhost:3000';

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// 公共调用方法
function apiAxios(method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  let apiUrl = wsInterface[url]['wsUrl'];
  axios({
    method: method,
    url: apiUrl,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
    .then(function (res) {
      if (res) {
        success(res);
      }
    })
    .catch(function (err) {
      let res = err.response
      if (err) {
        window.alert('api error, HTTP CODE: ' + res.status)
      }
    })
}

// 直接在模板中调用
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}