/**
 * @author:dereksu
 * @description:http://km.oa.com/group/TGideas/articles/show/243512 
 * @update:2019.01.11
 * @version:v2.12
 * 
 * 用例:
 *  TGMobileShare({
    shareTitle:'demo3分享标题', //不设置或设置为空时，页面有title，则调取title
    shareDesc:'demo3分享详情', //不设置或设置为空时，页面有Description，则调取Description
    shareImgUrl:'https://game.gtimg.cn/images/tgideas/act/a20151127tgmsdemo/share.jpg', //分享图片尺寸200*200，且填写绝对路径
    shareLink:'', //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
    actName:'a20151127tgmsdemo' //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
    });
 **/
var TGMS = (function() {
  var b = {
    isLoadedJs: false,
    isFirstInit: false,
    isReportedNetworkType: false,
    isWX: false,
    isMQQ: false,
    isBrowser: false,
    fileName: '',
    tcssName: '',
    networktypeTcssName: '',
    ostypeTcssName: '',
    networkType: 'unknown',
    osType: 'other',
    isWXFirstLoad: false,
    isQQFirstLoad: false,
    isCfgWxjssdk: false,
    countUrl: window.location.href.toLocaleLowerCase().replace(/\./g, '[tgms]')
  };
  var c = {
    onInitInfo: {
      isWX: false,
      isQQ: false,
      fileName: '',
      tcssName: '',
      osType: '',
      qzoneShare: null,
      sinaWeiboShare: null,
      qqWeiboShare: null
    },
    metaArr: [],
    seoData: {
      title: '',
      description: ''
    },
    tgmData: {
      shareTitle: '',
      shareDesc: '',
      shareImgUrl: '',
      shareLink: '',
      actName: ''
    },
    shareData: {
      shareTitle: '',
      shareDesc: '',
      shareImgUrl: '',
      shareLink: '',
      actName: '',
      timelineTitle: '',
      messageTitle: '',
      messageDesc: '',
      reportTcss: true
    },
    netType: {
      'network_type:wifi': 'wifi',
      'network_type:edge': '4gor3gor2g',
      'network_type:fail': 'unknown',
      'network_type:wwan': '2gor3g',
      'network_type:2g': '2g',
      'network_type:3g+': '3g+'
    }
  };
  var e = {
    slFix: function(f) {
      if (f) {
        if (f.indexOf('http://') == -1 && f.indexOf('https://') == -1 && f.indexOf('//') == 0) {
          return window.location.protocol + f;
        } else {
          return f;
        }
      } else {
        return '';
      }
    },
    strTrim: function(g, f) {
      if (f === 'all') {
        return g.replace(/\s/g, '');
      }
      return g.replace(/(^\s*)|(\s*$)/g, '');
    },
    urlFix: function(f, j) {
      var i = f.indexOf('#'),
        k = f,
        h = '',
        g = '';
      if (i !== -1) {
        k = f.split('#')[0];
        h = f.substr(i);
      }
      k = e.delQueStr(k, 'ADTAG');
      g = k.indexOf('?') === -1 ? k + '?ADTAG=' + j + h : k + '&ADTAG=' + j + h;
      return g;
    },
    checkObjType: function(f) {
      return typeof f == 'object' && f !== null && f.constructor !== Array;
    },
    checkFunType: function(f) {
      return typeof f == 'function';
    },
    tcssCount: function(v) {
      if (c.shareData.reportTcss) {
        if (typeof PTTSendClick === 'function') {
          var s = v.split('.'),
            i = s[1],
            h = s[2],
            g = s[3],
            m = '',
            q = '',
            j = '';
          if (h === 'share') {
            var r = {
              'wx.message_success': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3\u5fae\u4fe1\u597d\u53cb\u6210\u529f',
              'wx.message_cancel': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3\u5fae\u4fe1\u597d\u53cb\u53d6\u6d88',
              'wx.timeline_success': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3\u670b\u53cb\u5708\u6210\u529f',
              'wx.timeline_cancel': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3\u670b\u53cb\u5708\u53d6\u6d88',
              'wx.qq_success': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3QQ\u6210\u529f',
              'wx.qq_cancel': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3QQ\u53d6\u6d88',
              'wx.weibo_success': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3\u5fae\u535a\u6210\u529f',
              'wx.weibo_cancel': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3\u5fae\u535a\u53d6\u6d88',
              'wx.qzone_success': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3QQ\u7a7a\u95f4\u6210\u529f',
              'wx.qzone_cancel': '\u4ece\u5fae\u4fe1\u5206\u4eab\u81f3QQ\u7a7a\u95f4\u53d6\u6d88',
              'qq.qq_success': '\u4eceQQ\u5206\u4eab\u81f3QQ\u597d\u53cb\u6210\u529f',
              'qq.qq_cancel': '\u4eceQQ\u5206\u4eab\u81f3QQ\u597d\u53cb\u53d6\u6d88',
              'qq.qzone_success': '\u4eceQQ\u5206\u4eab\u81f3QQ\u7a7a\u95f4\u6210\u529f',
              'qq.qzone_cancel': '\u4eceQQ\u5206\u4eab\u81f3QQ\u7a7a\u95f4\u53d6\u6d88',
              'qq.message_success': '\u4eceQQ\u5206\u4eab\u81f3\u5fae\u4fe1\u597d\u53cb\u6210\u529f',
              'qq.message_cancel': '\u4eceQQ\u5206\u4eab\u81f3\u5fae\u4fe1\u597d\u53cb\u53d6\u6d88',
              'qq.timeline_success': '\u4eceQQ\u5206\u4eab\u81f3\u670b\u53cb\u5708\u6210\u529f',
              'qq.timeline_cancel': '\u4eceQQ\u5206\u4eab\u81f3\u670b\u53cb\u5708\u53d6\u6d88',
              qzone: '\u4ece\u6d4f\u89c8\u5668\u5206\u4eab\u81f3QQ\u7a7a\u95f4',
              sinaweibo: '\u4ece\u6d4f\u89c8\u5668\u5206\u4eab\u81f3\u65b0\u6d6a\u5fae\u535a',
              qqweibo: '\u4ece\u6d4f\u89c8\u5668\u5206\u4eab\u81f3\u817e\u8baf\u5fae\u535a'
            };
            if (g === 'qzone' || g === 'sinaweibo' || g === 'qqweibo') {
              m = g;
            } else {
              q = i.split('_');
              j = q[q.length - 1];
              m = j + '.' + g;
            }
            if (typeof r[m] !== 'undefined') {
              PTTSendClick('share', g, r[m]);
            }
          }
          e.tcssImgLoader(window.location.hostname, v);
        } else {
          e.tcssImgLoader(window.location.hostname, v);
        }
      }
      var u = v.split('.'),
        p = u[1],
        o = u[2],
        n = u[3],
        f = '',
        l = '',
        k = '',
        t = '';
      if (o === 'share') {
        if (n === 'qzone' || n === 'sinaweibo' || n === 'qqweibo') {
          e.tcssImgLoader('tgideas.qq.com', 'tgmobileshare.share_success.browser_to_' + n + '.' + b.countUrl);
        } else {
          k = p.split('_');
          t = k[k.length - 1];
          f = n.split('_')[0];
          l = n.split('_')[1];
          e.tcssImgLoader('tgideas.qq.com', 'tgmobileshare.share_' + l + '.' + t + '_to_' + f + '.' + b.countUrl);
        }
      } else {
        k = o.split('_');
        t = k[k.length - 1];
        if (p === 'networktype') {
          e.tcssImgLoader('tgideas.qq.com', 'tgmobileshare.networktype.' + n + '.' + t);
        } else {
          if (p === 'ostype') {
            e.tcssImgLoader('tgideas.qq.com', 'tgmobileshare.ostype.' + n + '.' + t);
          }
        }
      }
    },
    jsLoader: function(g, f, i, k) {
      var h = document.createElement('script'),
        j = 'src';
      h.setAttribute(j, g);
      if (typeof k != 'undefined') {
        h.setAttribute('charset', k);
      }
      document.body.appendChild(h);
      h.onload = function() {
        if (e.checkFunType(f)) {
          if (typeof i != 'undefined') {
            f(i);
          } else {
            f();
          }
        }
      };
      h.onerror = function() {};
    },
    tcssImgLoader: function(i, h) {
      var g = document.createElement('img'),
        f =
          'https://pingfore.qq.com/pingd?dm=' +
          i +
          '.hot&url=/&arg=-&hottag=' +
          encodeURIComponent(h) +
          '&hotx=9999&hoty=9999&rand=' +
          Math.random() +
          '&tgmobileshare=1';
      g.setAttribute('src', f);
      g.setAttribute('style', 'display:none;position:fixed;left:-999999px;top:-999999px;width:0;height:0;');
      document.body.appendChild(g);
    },
    phpScriptLoader: (function() {
      var h = document.getElementsByTagName('script')[0];
      var l = h.parentNode;
      var g = /ded|co/;
      var k = 'onload';
      var j = 'onreadystatechange';
      var f = 'readyState';
      var i = function(o, n, p) {
        var m = document.createElement('script');
        m.charset = p;
        m[k] = m[j] = function() {
          if (!this[f] || g.test(this[f])) {
            m[k] = m[j] = null;
            n && n(m);
            m = null;
          }
        };
        m.async = true;
        m.src = o;
        l.insertBefore(m, h);
      };
      return function(n, m, p) {
        p = p || 'gb2312';
        if (typeof n == 'string') {
          i(n, m, p);
        } else {
          var o = n.shift();
          i(
            o,
            function() {
              if (n.length) {
                phpScriptLoader(n, m, p);
              } else {
                m && m();
              }
            },
            p
          );
        }
      };
    })(),
    delQueStr: function(h, l) {
      var m = '';
      if (h.indexOf('?') != -1) {
        m = h.substr(h.indexOf('?') + 1);
      } else {
        return h;
      }
      var f = '';
      var g = '';
      var k = '';
      if (m.indexOf('&') != -1) {
        f = m.split('&');
        for (var j = 0; j < f.length; j++) {
          if ((f[j] + '').split('=')[0] != l) {
            g = g + (f[j] + '').split('=')[0] + '=' + (f[j] + '').split('=')[1] + '&';
          }
        }
        return h.substr(0, h.indexOf('?')) + '?' + g.substr(0, g.length - 1);
      } else {
        f = m.split('=');
        if (f[0] == l) {
          return h.substr(0, h.indexOf('?'));
        } else {
          return h;
        }
      }
    },
    getMetaData: function(g) {
      for (var f = 0; f < c.metaArr.length; f++) {
        if (typeof c.metaArr[f].name != 'undefined' && c.metaArr[f].name == g) {
          return c.metaArr[f].content;
        }
      }
      return '';
    }
  };
  var d = {
    getMetaArr: function() {
      c.metaArr = document.getElementsByTagName('meta');
    },
    getSeoData: function() {
      c.seoData.title = document.getElementsByTagName('title')[0] ? document.getElementsByTagName('title')[0].text : '';
      c.seoData.description = e.getMetaData('Description')
        ? e.getMetaData('Description')
        : e.getMetaData('description');
    },
    getTgmData: function() {
      c.tgmData.shareTitle = e.getMetaData('tgm:shareTitle') ? e.getMetaData('tgm:shareTitle') : c.seoData.title;
      c.tgmData.shareDesc = e.getMetaData('tgm:shareDesc') ? e.getMetaData('tgm:shareDesc') : c.seoData.description;
      c.tgmData.shareImgUrl = e.getMetaData('tgm:shareImgUrl');
      c.tgmData.shareLink = e.getMetaData('tgm:shareLink')
        ? e.getMetaData('tgm:shareLink') == window.location.href
          ? e.delQueStr(window.location.href, 'ADTAG')
          : e.getMetaData('tgm:shareLink')
        : e.delQueStr(window.location.href, 'ADTAG');
      c.tgmData.actName = e.getMetaData('tgm:actName');
    },
    getFileName: function() {
      var g = location.pathname,
        f = '';
      if (g.indexOf('.html') !== -1) {
        f = g.split('.html')[0];
        b.fileName = f.split('/')[f.split('/').length - 1];
      } else {
        if (g.indexOf('.htm') !== -1) {
          f = g.split('.htm')[0];
          b.fileName = f.split('/')[f.split('/').length - 1];
        } else {
          if (g.indexOf('.shtml') !== -1) {
            f = g.split('.shtml')[0];
            b.fileName = f.split('/')[f.split('/').length - 1];
          } else {
            if (g.indexOf('.shtm') !== -1) {
              f = g.split('.shtm')[0];
              b.fileName = f.split('/')[f.split('/').length - 1];
            } else {
              b.fileName = 'index';
            }
          }
        }
      }
    },
    setShareInfo: function(f) {
      if (!e.checkObjType(f)) {
        c.shareData.shareTitle = e.strTrim(c.tgmData.shareTitle);
        c.shareData.shareDesc = e.strTrim(c.tgmData.shareDesc);
        c.shareData.shareImgUrl = e.slFix(e.strTrim(c.tgmData.shareImgUrl, 'all'));
        c.shareData.shareLink = e.slFix(e.strTrim(c.tgmData.shareLink));
        c.shareData.actName = e.strTrim(c.tgmData.actName, 'all');
        if (!c.shareData.shareTitle) {
          alert(
            'TGMobileShareJs\u63d0\u793a\uff1a\n\u5206\u4eab\u6807\u9898\uff1a<meta name="tgm:shareTitle" content="">\u548c<title></title>\u5fc5\u987b\u81f3\u5c11\u6709\u4e00\u4e2a\u662f\u975e\u7a7a\u7684\uff01'
          );
        } else {
          if (!c.shareData.shareDesc) {
            alert(
              'TGMobileShareJs\u63d0\u793a\uff1a\n\u5206\u4eab\u8be6\u60c5\uff1a<meta name="tgm:shareDesc" content="">\u548c<meta name="Description" content=""/>\u5fc5\u987b\u81f3\u5c11\u6709\u4e00\u4e2a\u662f\u975e\u7a7a\u7684\uff01'
            );
          } else {
            if (!c.shareData.shareImgUrl) {
              alert(
                'TGMobileShareJs\u63d0\u793a\uff1a\n\u5206\u4eab\u56fe\u7247\u5730\u5740\uff1a<meta name="tgm:shareImgUrl" content="">\u4e0d\u80fd\u4e3a\u7a7a\uff01'
              );
            } else {
              if (!c.shareData.actName) {
                alert(
                  'TGMobileShareJs\u63d0\u793a\uff1a\n\u70b9\u51fb\u6d41\u547d\u540d\uff1a<meta name="tgm:actName" content="">\u4e0d\u80fd\u4e3a\u7a7a\uff01'
                );
              }
            }
          }
        }
      } else {
        c.shareData.shareTitle = f.shareTitle ? f.shareTitle : c.tgmData.shareTitle;
        c.shareData.shareDesc = f.shareDesc ? f.shareDesc : c.tgmData.shareDesc;
        c.shareData.shareImgUrl = f.shareImgUrl ? f.shareImgUrl : c.tgmData.shareImgUrl;
        c.shareData.shareLink = f.shareLink
          ? f.shareLink == window.location.href
            ? e.delQueStr(window.location.href, 'ADTAG')
            : f.shareLink
          : c.tgmData.shareLink;
        c.shareData.actName = f.actName ? f.actName : c.tgmData.actName;
        c.shareData.shareTitle = e.strTrim(c.shareData.shareTitle);
        c.shareData.shareDesc = e.strTrim(c.shareData.shareDesc);
        c.shareData.shareImgUrl = e.slFix(e.strTrim(c.shareData.shareImgUrl, 'all'));
        c.shareData.shareLink = e.slFix(e.strTrim(c.shareData.shareLink));
        c.shareData.actName = e.strTrim(c.shareData.actName, 'all');
        if (typeof f.timelineTitle !== 'undefined') {
          c.shareData.timelineTitle = e.strTrim(f.timelineTitle);
        }
        if (typeof f.messageTitle !== 'undefined') {
          c.shareData.messageTitle = e.strTrim(f.messageTitle);
        }
        if (typeof f.messageDesc !== 'undefined') {
          c.shareData.messageDesc = e.strTrim(f.messageDesc);
        }
        if (typeof f.reportTcss === 'boolean') {
          c.shareData.reportTcss = f.reportTcss;
        }
        if (!c.shareData.shareTitle) {
          alert(
            'TGMobileShareJs\u63d0\u793a\uff1a\n\u5206\u4eab\u6807\u9898\u4e0d\u80fd\u8bbe\u7f6e\u4e3a\u7a7a\uff01'
          );
        } else {
          if (!c.shareData.shareDesc) {
            alert(
              'TGMobileShareJs\u63d0\u793a\uff1a\n\u5206\u4eab\u8be6\u60c5\u4e0d\u80fd\u8bbe\u7f6e\u4e3a\u7a7a\uff01'
            );
          } else {
            if (!c.shareData.shareImgUrl) {
              alert(
                'TGMobileShareJs\u63d0\u793a\uff1a\n\u5206\u4eab\u56fe\u7247\u5730\u5740\u4e0d\u80fd\u8bbe\u7f6e\u4e3a\u7a7a\uff01'
              );
            } else {
              if (!c.shareData.actName) {
                alert(
                  'TGMobileShareJs\u63d0\u793a\uff1a\n\u70b9\u51fb\u6d41\u547d\u540d\u4e0d\u80fd\u8bbe\u7f6e\u4e3a\u7a7a\uff01'
                );
              }
            }
          }
        }
      }
    },
    getTcssName: function() {
      b.tcssName = c.shareData.actName.replace(/\./g, '_') + '.' + b.fileName.replace(/\./g, '_');
      b.networktypeTcssName = c.shareData.actName.replace(/\./g, '_') + '.networktype';
      b.ostypeTcssName = c.shareData.actName.replace(/\./g, '_') + '.ostype';
      if (b.isFirstInit) {
        var f = '';
        if (b.isWX) {
          f = '_wx';
        } else {
          if (b.isMQQ) {
            f = '_qq';
          } else {
            if (b.isBrowser) {
              f = '_browser';
            }
          }
        }
        b.tcssName += f;
        c.onInitInfo.tcssName = b.tcssName;
        b.networktypeTcssName += '.all' + f;
        b.ostypeTcssName += '.all' + f;
      }
    },
    initWXShare: function(j, n, l) {
      if (n) {
        var g = ['message', 'timeline', 'qq', 'weibo', 'qzone'];
        var h = [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ];
        for (var k = 0; k < g.length; k++) {
          l[h[k]]({
            title:
              h[k] == 'onMenuShareAppMessage' && c.shareData.messageTitle
                ? c.shareData.messageTitle
                : h[k] == 'onMenuShareTimeline' && c.shareData.timelineTitle
                ? c.shareData.timelineTitle
                : c.shareData.shareTitle,
            desc:
              h[k] == 'onMenuShareAppMessage' && c.shareData.messageDesc
                ? c.shareData.messageDesc
                : c.shareData.shareDesc,
            link: e.urlFix(c.shareData.shareLink, 'tgi.wx.share.' + g[k]),
            imgUrl: c.shareData.shareImgUrl,
            shareType: g[k],
            success: function() {
              var i = this;
              setTimeout(function() {
                if (e.checkObjType(j)) {
                  if (e.checkObjType(j.onShare)) {
                    switch (i.shareType) {
                      case 'message':
                        if (e.checkFunType(j.onShare.WXToMessageSuccess)) {
                          j.onShare.WXToMessageSuccess();
                        }
                        break;
                      case 'timeline':
                        if (e.checkFunType(j.onShare.WXToTimelineSuccess)) {
                          j.onShare.WXToTimelineSuccess();
                        }
                        break;
                    }
                  }
                }
              }, 10);
              e.tcssCount(b.tcssName + '.share.' + i.shareType + '_success');
            },
            cancel: function() {
              var i = this;
              setTimeout(function() {
                if (e.checkObjType(j)) {
                  if (e.checkObjType(j.onShare)) {
                    switch (i.shareType) {
                      case 'message':
                        if (e.checkFunType(j.onShare.WXToMessageCancel)) {
                          j.onShare.WXToMessageCancel();
                        }
                        break;
                      case 'timeline':
                        if (e.checkFunType(j.onShare.WXToTimelineCancel)) {
                          j.onShare.WXToTimelineCancel();
                        }
                        break;
                    }
                  }
                }
              }, 10);
              e.tcssCount(b.tcssName + '.share.' + i.shareType + '_cancel');
            }
          });
        }
        if (!b.isReportedNetworkType) {
          l.getNetworkType({
            success: function(i) {
              b.networkType = i.networkType;
              if (!(e.checkObjType(j) && j.reportNetworkType === false)) {
                try {
                  e.tcssCount(b.networktypeTcssName + '.' + b.networkType);
                } catch (o) {}
              }
            }
          });
          b.isReportedNetworkType = true;
        }
        b.isWXFirstLoad = true;
      } else {
        function f() {
          if (typeof WeixinJSBridge == 'object' && e.checkFunType(WeixinJSBridge.invoke)) {
            WeixinJSBridge.on('menu:share:timeline', function(i) {
              WeixinJSBridge.invoke(
                'shareTimeline',
                {
                  img_url: c.shareData.shareImgUrl,
                  img_width: '120',
                  img_height: '120',
                  link: e.urlFix(c.shareData.shareLink, 'tgi.wx.share.timeline'),
                  desc: c.shareData.shareDesc,
                  title: c.shareData.timelineTitle ? c.shareData.timelineTitle : c.shareData.shareTitle
                },
                function(o) {
                  var r = '',
                    q = false,
                    p = false;
                  if (typeof o.err_msg !== 'undefined') {
                    r = o.err_msg;
                  } else {
                    if (typeof o.errMsg !== 'undefined') {
                      r = o.errMsg;
                    }
                  }
                  q = r.indexOf('confirm') != -1 || r.indexOf('ok') != -1;
                  p = r.indexOf('cancel') != -1;
                  if (q) {
                    setTimeout(function() {
                      if (e.checkObjType(j)) {
                        if (e.checkObjType(j.onShare)) {
                          if (e.checkFunType(j.onShare.WXToTimelineSuccess)) {
                            j.onShare.WXToTimelineSuccess();
                          }
                        }
                      }
                    }, 10);
                    e.tcssCount(b.tcssName + '.share.timeline_success');
                  }
                  if (p) {
                    setTimeout(function() {
                      if (e.checkObjType(j)) {
                        if (e.checkObjType(j.onShare)) {
                          if (e.checkFunType(j.onShare.WXToTimelineCancel)) {
                            j.onShare.WXToTimelineCancel();
                          }
                        }
                      }
                    }, 10);
                    e.tcssCount(b.tcssName + '.share.timeline_cancel');
                  }
                }
              );
            });
            WeixinJSBridge.on('menu:share:appmessage', function(i) {
              WeixinJSBridge.invoke(
                'sendAppMessage',
                {
                  img_url: c.shareData.shareImgUrl,
                  img_width: '120',
                  img_height: '120',
                  link: e.urlFix(c.shareData.shareLink, 'tgi.wx.share.message'),
                  desc: c.shareData.messageDesc ? c.shareData.messageDesc : c.shareData.shareDesc,
                  title: c.shareData.messageTitle ? c.shareData.messageTitle : c.shareData.shareTitle
                },
                function(o) {
                  var r = '',
                    q = false,
                    p = false;
                  if (typeof o.err_msg !== 'undefined') {
                    r = o.err_msg;
                  } else {
                    if (typeof o.errMsg !== 'undefined') {
                      r = o.errMsg;
                    }
                  }
                  q = r.indexOf('confirm') != -1 || r.indexOf('ok') != -1;
                  p = r.indexOf('cancel') != -1;
                  if (q) {
                    setTimeout(function() {
                      if (e.checkObjType(j)) {
                        if (e.checkObjType(j.onShare)) {
                          if (e.checkFunType(j.onShare.WXToMessageSuccess)) {
                            j.onShare.WXToMessageSuccess();
                          }
                        }
                      }
                    }, 10);
                    e.tcssCount(b.tcssName + '.share.message_success');
                  }
                  if (p) {
                    setTimeout(function() {
                      if (e.checkObjType(j)) {
                        if (e.checkObjType(j.onShare)) {
                          if (e.checkFunType(j.onShare.WXToMessageCancel)) {
                            j.onShare.WXToMessageCancel();
                          }
                        }
                      }
                    }, 10);
                    e.tcssCount(b.tcssName + '.share.message_cancel');
                  }
                }
              );
            });
            if (!b.isReportedNetworkType) {
              WeixinJSBridge.invoke('getNetworkType', {}, function(i) {
                if (typeof c.netType[i.err_msg] !== 'undefined') {
                  b.networkType = c.netType[i.err_msg];
                }
                if (!(e.checkObjType(j) && j.reportNetworkType === false)) {
                  try {
                    e.tcssCount(b.networktypeTcssName + '.' + b.networkType);
                  } catch (o) {}
                }
              });
              b.isReportedNetworkType = true;
            }
          }
        }
        try {
          f();
          document.addEventListener('WeixinJSBridgeReady', function() {
            f();
          });
        } catch (m) {}
        b.isWXFirstLoad = true;
      }
    },
    initMQQShare: function(f) {
      mqq.device.isMobileQQ(function(h) {
        b.isMQQ = b.isWX ? false : h;
        if (b.isMQQ) {
          if (!b.isFirstInit) {
            b.tcssName += '_qq';
            b.networktypeTcssName += '.all' + '_qq';
            b.ostypeTcssName += '.all' + '_qq';
          }
          try {
            var k = ['qq', 'qzone', 'message', 'timeline'];
            mqq.ui.setOnShareHandler(function(m) {
              mqq.ui.shareMessage(
                {
                  back: true,
                  title: c.shareData.shareTitle,
                  desc: c.shareData.shareDesc,
                  share_url: e.urlFix(c.shareData.shareLink, 'tgi.qq.share.' + k[m]),
                  image_url: c.shareData.shareImgUrl,
                  share_type: m
                },
                function(n) {
                  switch (n.retCode) {
                    case 0:
                      try {
                        setTimeout(function() {
                          if (e.checkObjType(f)) {
                            if (e.checkObjType(f.onShare)) {
                              switch (k[m]) {
                                case 'qq':
                                  if (e.checkFunType(f.onShare.QQToQQSuccess)) {
                                    f.onShare.QQToQQSuccess();
                                  }
                                  break;
                                case 'qzone':
                                  if (e.checkFunType(f.onShare.QQToQzoneSuccess)) {
                                    f.onShare.QQToQzoneSuccess();
                                  }
                                  break;
                                case 'message':
                                  if (e.checkFunType(f.onShare.QQToMessageSuccess)) {
                                    f.onShare.QQToMessageSuccess();
                                  }
                                  break;
                                case 'timeline':
                                  if (e.checkFunType(f.onShare.QQToTimelineSuccess)) {
                                    f.onShare.QQToTimelineSuccess();
                                  }
                                  break;
                              }
                            }
                          }
                        }, 10);
                        e.tcssCount(b.tcssName + '.share.' + k[m] + '_success');
                      } catch (o) {}
                      break;
                    case 1:
                      try {
                        setTimeout(function() {
                          if (e.checkObjType(f)) {
                            if (e.checkObjType(f.onShare)) {
                              switch (k[m]) {
                                case 'qq':
                                  if (e.checkFunType(f.onShare.QQToQQCancel)) {
                                    f.onShare.QQToQQCancel();
                                  }
                                  break;
                                case 'qzone':
                                  if (e.checkFunType(f.onShare.QQToQzoneCancel)) {
                                    f.onShare.QQToQzoneCancel();
                                  }
                                  break;
                                case 'message':
                                  if (e.checkFunType(f.onShare.QQToMessageCancel)) {
                                    f.onShare.QQToMessageCancel();
                                  }
                                  break;
                                case 'timeline':
                                  if (e.checkFunType(f.onShare.QQToTimelineCancel)) {
                                    f.onShare.QQToTimelineCancel();
                                  }
                                  break;
                              }
                            }
                          }
                        }, 10);
                        e.tcssCount(b.tcssName + '.share.' + k[m] + '_cancel');
                      } catch (o) {}
                      break;
                    case -2:
                      try {
                        setTimeout(function() {
                          if (e.checkObjType(f)) {
                            if (e.checkObjType(f.onShare)) {
                              switch (k[m]) {
                                case 'qq':
                                  if (e.checkFunType(f.onShare.QQToQQCancel)) {
                                    f.onShare.QQToQQCancel();
                                  }
                                  break;
                                case 'qzone':
                                  if (e.checkFunType(f.onShare.QQToQzoneCancel)) {
                                    f.onShare.QQToQzoneCancel();
                                  }
                                  break;
                                case 'message':
                                  if (e.checkFunType(f.onShare.QQToMessageCancel)) {
                                    f.onShare.QQToMessageCancel();
                                  }
                                  break;
                                case 'timeline':
                                  if (e.checkFunType(f.onShare.QQToTimelineCancel)) {
                                    f.onShare.QQToTimelineCancel();
                                  }
                                  break;
                              }
                            }
                          }
                        }, 10);
                        e.tcssCount(b.tcssName + '.share.' + k[m] + '_cancel');
                      } catch (o) {}
                      break;
                  }
                }
              );
            });
            if (!b.isReportedNetworkType) {
              mqq.device.getNetworkType(function(m) {
                switch (m) {
                  case 1:
                    b.networkType = 'wifi';
                    break;
                  case 2:
                    b.networkType = '2g';
                    break;
                  case 3:
                    b.networkType = '3g';
                    break;
                  case 4:
                    b.networkType = '4g';
                    break;
                  default:
                    b.networkType = 'unknown';
                    break;
                }
                if (!(e.checkObjType(f) && f.reportNetworkType === false)) {
                  try {
                    e.tcssCount(b.networktypeTcssName + '.' + b.networkType);
                  } catch (n) {}
                }
              });
              b.isReportedNetworkType = true;
            }
          } catch (l) {}
        }
        if (!b.isFirstInit) {
          if (!b.isMQQ && !b.isWX) {
            b.isBrowser = true;
            b.tcssName += '_browser';
            b.networktypeTcssName += '.all' + '_browser';
            b.ostypeTcssName += '.all' + '_browser';
          }
          var j = /android/i.test(navigator.userAgent.toLowerCase());
          var g = /iphone|ios|ipad/i.test(navigator.userAgent.toLowerCase());
          if (j) {
            b.osType = 'android';
          } else {
            if (g) {
              b.osType = 'ios';
            }
          }
          var i = function() {
            setTimeout(function() {
              if (1) {
                setTimeout(function() {
                  try {
                    e.tcssCount(b.ostypeTcssName + '.' + b.osType);
                  } catch (m) {}
                }, 1000);
              } else {
                i();
              }
            }, 50);
          };
          if (!(e.checkObjType(f) && f.reportOSType === false)) {
            i();
          }
          c.onInitInfo.osType = b.osType;
          c.onInitInfo.isWX = b.isWX;
          c.onInitInfo.isQQ = b.isMQQ;
          c.onInitInfo.fileName = b.fileName;
          c.onInitInfo.tcssName = b.tcssName;
          c.onInitInfo.qzoneShare = function() {
            try {
              e.tcssCount(b.tcssName + '.share.qzone');
            } catch (m) {}
            setTimeout(function() {
              window.location.href =
                'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' +
                encodeURIComponent(e.urlFix(c.shareData.shareLink, 'tgi.browser.share.qzone')) +
                '&title=' +
                encodeURIComponent(c.shareData.shareTitle) +
                '&summary=' +
                encodeURIComponent(c.shareData.shareDesc) +
                '&pics=' +
                encodeURIComponent(c.shareData.shareImgUrl) +
                '&desc=%E8%B5%9E%EF%BC%81%EF%BC%81' +
                '&site=' +
                window.location.hostname;
            }, 220);
          };
          c.onInitInfo.sinaWeiboShare = function() {
            try {
              e.tcssCount(b.tcssName + '.share.sinaweibo');
            } catch (m) {}
            setTimeout(function() {
              window.location.href =
                'http://service.weibo.com/share/share.php?url=' +
                encodeURIComponent(e.urlFix(c.shareData.shareLink, 'tgi.browser.share.sinaweibo')) +
                '&title=' +
                encodeURIComponent(c.shareData.shareTitle) +
                '&pic=' +
                encodeURIComponent(c.shareData.shareImgUrl);
            }, 220);
          };
          c.onInitInfo.qqWeiboShare = function() {
            try {
              e.tcssCount(b.tcssName + '.share.qqweibo');
            } catch (m) {}
            setTimeout(function() {
              window.location.href =
                'http://share.v.t.qq.com/index.php?c=share&a=index&url=' +
                encodeURIComponent(e.urlFix(c.shareData.shareLink, 'tgi.browser.share.qqweibo')) +
                '&title=' +
                encodeURIComponent(c.shareData.shareTitle) +
                '&pic=' +
                encodeURIComponent(c.shareData.shareImgUrl);
            }, 220);
          };
          if (e.checkObjType(f)) {
            if (e.checkFunType(f.callback) && e.checkFunType(f.onInit)) {
              f.onInit(c.onInitInfo);
            } else {
              if (e.checkFunType(f.callback)) {
                f.callback(c.onInitInfo);
              } else {
                if (e.checkFunType(f.onInit)) {
                  f.onInit(c.onInitInfo);
                }
              }
            }
          }
          b.isFirstInit = b.isQQFirstLoad = true;
        }
      });
    },
    initWXShareReady: function(f) {
      WXJssdk.init(function(h, g) {
        if (typeof g === 'undefined') {
          b.isCfgWxjssdk = h;
          d.initWXShare(f, true, h);
        } else {
          d.initWXShare(f, false);
          console = console || {
            log: function() {
              return;
            },
            info: function() {
              return;
            }
          };
          console.log(g);
        }
      });
    },
    initWXShareAction: function(f) {
      setTimeout(function() {
        if (typeof TGIDEASDEREKSUWXJSSDKSUCCESS == 'number' && TGIDEASDEREKSUWXJSSDKSUCCESS === 0.91660871) {
          if (typeof TGIDEASDEREKSUTGMOBILESHAREJS == 'number' && TGIDEASDEREKSUTGMOBILESHAREJS === 0.60705616) {
            d.initWXShare(f, false);
          } else {
            d.initWXShare(f, true);
          }
        } else {
          d.initWXShareAction(f);
        }
      }, 50);
    },
    startRun: function(n) {
      if (!b.isLoadedJs) {
        d.setShareInfo(n);
        d.getTcssName();
        b.isWX = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' ? true : false;
        if (b.isWX) {
          b.tcssName += '_wx';
          b.networktypeTcssName += '.all' + '_wx';
          b.ostypeTcssName += '.all' + '_wx';
          var f = window.location.hostname,
            l = f.split('.'),
            i = l.length,
            k = 'https://ossweb-img.qq.com/images/js/jsonp_WXJssdk.js';
          if (l[i - 2] === 'qq' && l[i - 1] === 'com') {
            k = 'https://ossweb-img.qq.com/images/js/WXJssdk.js';
          }
          e.jsLoader(k, d.initWXShareReady, n);
        }
        if (
          typeof mqq == 'object' &&
          typeof mqq.device == 'object' &&
          e.checkFunType(mqq.device.isMobileQQ) &&
          e.checkFunType(mqq.device.getNetworkType) &&
          typeof mqq.ui == 'object' &&
          e.checkFunType(mqq.ui.setOnShareHandler) &&
          e.checkFunType(mqq.ui.shareMessage)
        ) {
          d.initMQQShare(n);
        } else {
          e.jsLoader('https://open.mobile.qq.com/sdk/qqapi.https.js?_bid=2389', d.initMQQShare, n);
        }
        d.printTips(n);
        d.countJsRequest();
        b.isLoadedJs = true;
      } else {
        var g = function(o) {
          if (e.checkObjType(o)) {
            if (e.checkFunType(o.callback) && e.checkFunType(o.onInit)) {
              o.onInit(c.onInitInfo);
            } else {
              if (e.checkFunType(o.callback)) {
                o.callback(c.onInitInfo);
              } else {
                if (e.checkFunType(o.onInit)) {
                  o.onInit(c.onInitInfo);
                }
              }
            }
          }
        };
        if (b.isWX) {
          var m = function(o) {
            setTimeout(function() {
              if (b.isWXFirstLoad && b.isQQFirstLoad) {
                d.setShareInfo(o);
                d.getTcssName();
                b.isCfgWxjssdk ? d.initWXShare(o, true, b.isCfgWxjssdk) : d.initWXShare(o, false);
                d.printTips(o);
                d.countJsRequest();
                g(o);
              } else {
                m(o);
              }
            }, 50);
          };
          m(n);
        } else {
          if (b.isMQQ) {
            var j = function(o) {
              setTimeout(function() {
                if (b.isQQFirstLoad) {
                  d.setShareInfo(o);
                  d.getTcssName();
                  d.initMQQShare(o);
                  d.printTips(o);
                  d.countJsRequest();
                  g(o);
                } else {
                  j(o);
                }
              }, 50);
            };
            j(n);
          } else {
            var h = function(o) {
              setTimeout(function() {
                if (b.isQQFirstLoad) {
                  d.setShareInfo(o);
                  d.getTcssName();
                  d.printTips(o);
                  d.countJsRequest();
                  g(o);
                } else {
                  h(o);
                }
              }, 50);
            };
            h(n);
          }
        }
      }
    },
    printTips: function(f) {
      if (!(e.checkObjType(f) && f.openConsole === false)) {
        console = console || {
          log: function() {
            return;
          },
          info: function() {
            return;
          }
        };
        console.log(
          '%c--------------------SHARE START--------------------\n%cTGMobileShareJS\u63d0\u793a\n%c\u5206\u4eab\u6807\u9898\uff1a%c' +
            c.shareData.shareTitle +
            '\n%c\u5206\u4eab\u8be6\u60c5\uff1a%c' +
            c.shareData.shareDesc +
            '\n%c\u5206\u4eab\u56fe\u7247\uff1a%c' +
            c.shareData.shareImgUrl +
            '\n%c\u5206\u4eab\u94fe\u63a5\uff1a%c' +
            c.shareData.shareLink +
            '\n%c\u70b9\u0020\u51fb\u0020\u6d41\uff1a%c' +
            c.shareData.actName +
            '\n%c\u6587\u0020\u4ef6\u0020\u540d\uff1a%c' +
            b.fileName +
            '\n%c--------------------SHARE END--------------------',
          'color:#989a9d;',
          'font-size:20px;',
          'color:#000;',
          'color:green;',
          'color:#000;',
          'color:green;',
          'color:#000;',
          'color:green;',
          'color:#000;',
          'color:green;',
          'color:#000;',
          'color:green;',
          'color:#000;',
          'color:green;',
          'color:#989a9d;'
        );
      }
    },
    countJsRequest: function() {
      var f = window.location.host.toLocaleLowerCase().replace(/\./g, '_');
      e.tcssImgLoader('tgideas.qq.com', 'tgmobileshare.count.' + f + '.' + b.countUrl);
      if (typeof PTTSendClick === 'function') {
        PTTSendClick('sharepv', 'sharepv', '\u5206\u4eab\u9875\u9762pv');
      }
    }
  };
  var _TGMS = {
    ready: function() {
      d.getMetaArr();
      d.getSeoData();
      d.getTgmData();
      d.getFileName();
    },
    init: function(config) {
      d.startRun(fconfig);
    }
  };
  return _TGMS;
})();
TGMS.ready();
var TGMobileShare = function(config) {
  TGMS.init(config);
};
