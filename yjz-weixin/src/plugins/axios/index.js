import axios from '@/plugins/axios/axios.js';
import { URL } from '@/common/index.js';
// import cookies from '@/utils/cookies';
import { setCookies, getCookies, remove } from '@/utils/cookies.js';
import { getSid } from '@/common/auth';

// 默认的HTTP配置
const DEFAULT_OPTIONS = {
  // 所有请求的前缀
  prefix: process.env.BASE_API,
  // 默认的method
  method: 'POST',
  // 主要用来区分 @RequestBody 和 么有  还是有file类型的数据方式
  dataType: 'json', // 'JSON' - file
  // 接口是否不需要认证
  isAuth: true
};

export default function http(url, params, options) {
  // 配置
  const newOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  let axiosOptions = {
    method: newOptions.method || 'POST',
    url: `${url}`,
    data: params,
    headers: {}
  };

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (newOptions.type === 'formdata') {
      axiosOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.headers
      };
      axiosOptions.transformRequest = [
        function(data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          return ret;
        }
      ];
    } else if (newOptions.type === 'file') {
      axiosOptions.headers = {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers
      };
    } else {
      axiosOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        ...newOptions.headers
      };
    }
  } else if (newOptions.method === 'GET') {
    // GET 类型 传输通过 params 属性
    axiosOptions.params = params;
    axiosOptions.headers = newOptions.headers
      ? {
          ...newOptions.headers
        }
      : {};
  }

  // 是否需要传入认证信息
  // if (newOptions.isAuth) {
  // 在请求发送之前做一些处理
  const sid = getSid();
  // const sid = '52731409-2bd2-4a84-a191-1a3725092d52';
  if (sid && sid !== 'undefined') {
    // 让每个请求携带token-- ['sid']为自定义key 请根据实际情况自行修改
    axiosOptions.headers['sid'] = sid;
  }
  // }
  // debugger;
  let author = getCookies('AuthorizationPC') || '';
  if (author && author !== 'undefined') {
    // 让每个请求携带token-- ['sid']为自定义key 请根据实际情况自行修改
    axiosOptions.headers['Authorization'] = author;
  }
  return axios(axiosOptions);
}
