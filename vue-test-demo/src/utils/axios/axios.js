import store from '@/store';
import axios from 'axios';
import log from '@/utils/log';
import router from '@/router/index.js';

// SID 即 用户登录信息失效
const LOGIN_SID_INVALID = '10002';
// 通用后台错位
const COMMON_SERVER_ERROR = '1000000';

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000 // 请求超时时间
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { respCode } = dataAxios;
    // 根据 code 进行判断
    if (respCode === '0') {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios;
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (respCode) {
        // [ 示例 ] respCode === "0" 代表没有错误
        case '0':
        case 0:
          return dataAxios.data;
        // 返回状态码 "LOGIN_SID_INVALID" 代表用户没有登录或者 sid失效
        case LOGIN_SID_INVALID:
          router.push('/login');
          break;
        // 表示后台出错
        case COMMON_SERVER_ERROR:
          // [ 示例 ] 其它和后台约定的 code
          errorCreat(`[ code: ${COMMON_SERVER_ERROR} ] ${dataAxios.respMsg}: ${response.config.url}`);
          break;
        default:
          return dataAxios;
          break;
      }
    }
  },
  error => {
    // 这边处理http的错误状态 而不处理返回中的如  respCode 的错误信息
    if (error && error.response) {
      let status = error.response.status;
      switch (status) {
        case 400:
          error.respCode = 400;
          error.respMsg = '请求错误';
          break;
        case 401:
          error.respCode = 401;
          error.respMsg = '未授权，请登录';
          break;
        case 403:
          error.respCode = 403;
          error.respMsg = '拒绝访问';
          break;
        case 404:
          error.respCode = 404;
          error.respMsg = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.respCode = 408;
          error.respMsg = '请求超时';
          break;
        case 500:
          error.respCode = 500;
          error.respMsg = '服务器内部错误';
          break;
        case 501:
          error.respCode = 501;
          error.respMsg = '服务未实现';
          break;
        case 502:
          error.respCode = 502;
          error.respMsg = '网关错误';

          break;
        case 503:
          error.respCode = 503;
          error.respMsg = '服务不可用';
          break;
        case 504:
          error.respCode = 504;
          error.respMsg = '网关超时';
          break;
        case 505:
          error.respCode = 505;
          error.respMsg = 'HTTP版本不受支持';
          break;
        default:
          error.respCode = 10000000;
          error.respMsg = '系统错误';
          break;
      }
    }
    errorLog(error);
    // router.push({
    //   path: '/login'
    // });
    return Promise.reject(error);
  }
);

export default service;

// 创建一个错误
function errorCreat(msg) {
  const err = new Error(msg);
  errorLog(err);
  throw err;
}

// 记录和显示错误
function errorLog(err) {
  // 添加到日志
  store.dispatch('base/log/add', {
    type: 'error',
    err,
    info: '数据请求异常'
  });
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    log.danger('>>>>>> Error >>>>>>');
    console.log(err);
  }
  // 显示提示

  // Notification({
  //   title: '系统错误',
  //   message: err.message,
  //   type: 'error',
  //   duration: 5 * 1000
  // });
}
