import Vue from 'vue';
import Crypto from 'crypto-js';

let common = {
  iosTouchHack() {
    document.body.addEventListener('touchstart', function () {
    });
  }, // iOS device touch event hack
  googleTransInit() {
    window.googleTranslateElementInit = function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,zh-CN,zh-TW,hr,cs,da,nl,el,iw,hu,ga,it,ja,ko,pt,ro,ru,sr,es,th',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };
  }, // Google Translate
  loadJS(src) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      script.src = src;
      document.getElementsByTagName('body')[0].appendChild(script);
    });
  }, // Load third party JS
  userAgentLocale() {
    const browserLang = navigator.language.toLowerCase();
    let locale = browserLang;
    if (browserLang.indexOf('en') > -1) locale = 'en';
    if (browserLang.indexOf('fr') > -1) locale = 'fr';
    if (browserLang.indexOf('de') > -1) locale = 'de';
    return locale;
  }, // User Agent Language Env
  getURLQuery(name) { // 废弃，不支持欧元等特殊符号
    let reg = `(^|&)${name}=([^&]*)(&|$)`;
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }, // Get URL Query
  deleteURLQuery(name) {
    let local = window.location;
    let baseUrl = local.origin + local.pathname + '?';
    let query = local.search.substr(1);
    if (query.indexOf(name) > -1) {
      let obj = {};
      let arr = query.split('&');
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=');
        obj[arr[i][0]] = arr[i][1];
      }
      delete obj[name];
      return baseUrl + JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '=').replace(/,/g, '&');
    }
  }, // Delete URL Query
  getDomain() {
    if (process.client) {
      const parts = location.hostname.split('.');
      return parts.slice(-2).join('.');
    }
  }, // Domain
  getSubDomain() {
    if (process.client) {
      const h = location.href.split('.')[0];
      return h.split('//')[1];
    }
  }, // Subdomain, secondary domain
  throttle(func, wait, mustRun) {
    let timeout,
      startTime = new Date();

    return function () {
      let context = this,
        args = arguments,
        curTime = new Date();

      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= mustRun) {
        func.apply(context, args);
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(func, wait);
      }
    };
  },
  // 防抖
  debounce(fun, delay) {
    return function (args) {
      let that = this;
      let _args = args;
      clearTimeout(fun.id);
      fun.id = setTimeout(function () {
        fun.call(that, _args);
      }, delay);
    };
  },
  paramSign(paramObj) {
    let msg = JSON.stringify(paramObj);
    let key = '2d7aac17cc6a04c2c7b6a7888fb2c67d4c6d9a3b15ec02cf12afac13407d697b';
    let hash = Crypto.HmacSHA256(msg, key).toString();
    return {
      'sign_version': 1,
      'sign_key': hash,
      'signed_body': paramObj
    };
  },
  checkSupportLocalStorage(type) {
    let storage;
    try {
      storage = window[type];
      let x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  },
  randomNumInt(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
  },
  randomAbTest() {
    const n = 0, m = 1000000;
    const test = Math.floor(Math.random() * (m - n + 1) + n);
    return test > (m / 2);
  },
  accAdd(arg1, arg2) { // 浮点数加法运算
    let r1, r2, m;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  isMobile() {
    if (process.client) {
      const u = navigator.userAgent;
      return !!u.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
  },
  isiOS() {
    if (process.client) {
      const u = navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
  },
  isAndroid() {
    if (process.client) {
      const u = navigator.userAgent;
      return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    }
  },
  isWindows() {
    if (process.client) {
      const u = navigator.userAgent;
      return /Windows|Win32|Win64|WOW64/i.test(u);
    }
  },
  includeStripe(URL, callback) {
    let documentTag = document, tag = 'script',
      object = documentTag.createElement(tag),
      scriptTag = documentTag.getElementsByTagName(tag)[0];
    object.src = '//' + URL;
    if (callback) {
      object.addEventListener('load', function (e) {
        callback(null, e);
      }, false);
    }
    scriptTag.parentNode.insertBefore(object, scriptTag);
  },
  loadIframe(URL, iFrameID, parentID) {
    const iframe = document.createElement('iframe');
    iframe.src = URL;
    iframe.id = iFrameID; // 'stripe-3d-secure'
    iframe.width = '100%';
    iframe.height = '100%';
    document.getElementById(parentID).appendChild(iframe);
  },
  envTest() {
    return window.location.href.split('.')[0].split('//')[1] === 'test'
      || window.location.hostname === 'localhost'
      || window.location.hostname === '192.168.2.17'
      || window.location.hostname === '192.168.6.244';
  },
  numberAbbreviations(num) {
    let numFormatted = 0;

    if (Math.pow(10, 12) <= num && num < Math.pow(10, 15)) {
      numFormatted = (num / Math.pow(10, 12)).toFixed(1) + 'T';
      return numFormatted;
    }
    if (Math.pow(10, 9) <= num && num < Math.pow(10, 12)) {
      numFormatted = (num / Math.pow(10, 9)).toFixed(1) + 'B';
      return numFormatted;
    }
    if (Math.pow(10, 6) <= num && num < Math.pow(10, 9)) {
      numFormatted = (num / Math.pow(10, 6)).toFixed(1) + 'M';
      return numFormatted;
    }
    if (Math.pow(10, 3) <= num && num < Math.pow(10, 6)) {
      numFormatted = (num / Math.pow(10, 3)).toFixed(1) + 'K';
      return numFormatted;
    }
    if (num < Math.pow(10, 3)) {
      numFormatted = num;
      return numFormatted;
    }
  },
  closest(el, selector) {
    let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }
      el = el.parentElement;
    }
    return el;
  },
  headerHeight() {
    return document.getElementById('header').offsetHeight;
  },
  // post请求公共参数
  publicHeader() {
    return {
      origin: 'web',
      channel: '',
      app_version: '',
      device_id: '',
      country_code: ''
    };
  },
  // 检索购买页输入的url地址是否是正确
  fCheckUrl(str) {
    let oRegUrl = new RegExp();
    oRegUrl.compile('^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$');
    return oRegUrl.test(str);
  },
  // 错误提示弹窗文本
  callErrText(type) {
    let obj = {
      bad_video_url:'Please enter valid Channel/Video URL.',//视频地址错误
      bad_request:'The request failed. Please try again later.',//无效的请求，如参数不对、参数签名没验证通过等；
      bad_token:'Login expired. Please log in again.',//token无效；
      bad_payment:'Failed to create the order, please check your information.',//无效的支付类型；
      bad_url:'The URL is not valid. Please copy and paste the right URL.',//url错误
      account_locked:'Your account is disabled.',//账号（邮箱）被冻结，如该账号存在异常操作，服务器将其冻结了；
      bad_account:'Email address is not valid.',//无效账号（邮箱），该邮箱没注册、邮箱格式无效等；
      bad_password:"Wrong password. Try again or click 'Forgot Password?' to reset it.",//密码错误；
      password_format_error:'Password must have 6 or more characters.',//密码格式无效，密码长度不符或包含了不支持的字符，或没有包含必须要求的字符等
      bad_email:'This email address is not valid.',//邮箱格式错误或则是不支持的邮箱；
      email_occupied:'An account with these credentials already exists.',//邮箱被占用；
      exceed_limit:"You've reached the maximum register attempts." //同一个ip超过五次注册新用户 
    }
    return obj[type];
  },
  // 获取产品列表 th-调用对象  url-请求地址  data-请求参数 type-产品类型 callback-回调
  getProductList(th,url,data,type,callback){
    th.$axios.$post(url,data).then((res) => {
      let _data = res.data;
      let list = _data.filter((v) => {
        return v.product_type === type;
      });
      if(typeof(callback) === 'function'){
        callback(list)
      }
    }).catch((err) => {

    });
  },
  MD5(key){
    return Crypto.MD5(key).toString()
  }
};
Vue.prototype.COMMON = common;
