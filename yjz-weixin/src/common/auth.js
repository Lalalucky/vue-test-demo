// import cookies from '@/utils/cookies.js';
import url from '@/utils/url';
import { setCookies, getCookies, remove } from '@/utils/cookies.js';
const SID_NAME = 'sid';

/**
 * 获取用户登录信息的sid方法
 * 优先从url中获取当前用户的sid 如果不存在 那么就从cookies中获取当前用户的sid
 *
 * 修复问题：  如微信用户登录失效后 cookie中的sid没有失效 那么这时候就会存在时间差的问题，导致永远从cookie中获取sid，而不获取新的sid信息
 * @param {*} _
 */
export const getSid = _ => {
  // 获取url中的sid数据
  let sid = url('?sid');
  // 如果存在就直接使用
  if (sid) {
    setCookies('sid', sid);
  } else {
    sid = getCookies('sid');
  }
  return sid;
};

export function setSid(sid) {
  return setCookies(SID_NAME, sid);
}

export function removeSid() {
  return remove(SID_NAME);
}

/***********************************
 *
 * 对于微信或者小程序来说还有一个重要的概念就是 openId
 *
 */
export const getOpenId = _ => {
  // 获取url中的sid数据
  let openId = url('?openId');
  // 如果存在就直接使用
  if (openId) {
    setCookies(OPENID_NAME, openId);
  } else {
    openId = getCookies(OPENID_NAME);
  }
  return openId;
};

// /**
//  * 将用户的openId保存到cookie中去
//  */
export function setOpenId(openId) {
  return setCookies(OPENID_NAME, openId);
}

export function removeOpenId() {
  return remove(OPENID_NAME);
}
// auth认证

var auth = function () {
  function XHR() {
    var xhr;
    try {
      xhr = new XMLHttpRequest();
    } catch (e) {
      var IEXHRVers = ['Msxml3.XMLHTTP', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
      for (var i = 0, len = IEXHRVers.length; i < len; i++) {
        try {
          xhr = new ActiveXObject(IEXHRVers[i]);
        } catch (e) {
          continue;
        }
      }
    }
    return xhr;
  }
  return new Promise(function (resolve, reject) {
    var xhr = XHR();
    //open方法 创建一个新的http请求，并指定此请求的方法、URL以及验证信息(用户名/密码)
    // var cururl = process.env.AUTH_URL;
    // var cururl='http://www.yjzgo.com';
    // var cururl = 'http://localhost:8769';
    var cururl =process.env.NODE_ENV == 'production'? 'http://www.yjzgo.com':'';
    xhr.open(
      'get',
      cururl + '/yjz-oauth/oauth/token?grant_type=client_credentials&scope=all&client_id=web&client_secret=yjz2016',
      true
    );
    /*第一个参数是请求方式,一般用get与post方法,与form标签的method类似
      第二个参数是请求的URL
      第三个参数是请求是同步进行还是异步进行,true表示异步
      调用了open方法仅仅是传递了参数而已*/
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // xhr.setRequestHeader("sid", requestHeaders.sid)
    xhr.onreadystatechange = function () {
      // alert(xhr.readyState); //FF下会依次是1,2,3,4但最后还会再来个1
      //IE下则是1,1,3,4
      // debugger;
      if (xhr.status === 200 && xhr.readyState === 4 && xhr.response) {
        var response = JSON.parse(xhr.response);
        // response = {};
        if (response.access_token) {
          resolve(xhr.response);
          return;
        }

        // if (authTime >= 3) {
        //     alert('用户认证失败，请稍后再试！');
        //     return;
        // }
        // authTime += 1;
        return auth();
      }
    };
    xhr.send(null); //调用了send方法后才会发出请求
    //并且get方式发送请求时send参数是null
  });
};
auth().then(function (response) {
  return setCookies('AuthorizationPC', 'Bearer ' + JSON.parse(response).access_token);
});
