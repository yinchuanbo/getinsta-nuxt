import Crypto from 'crypto-js';

export default {
  iosTouchHack() {
    document.body.addEventListener('touchstart', function () {
    });
  }, // iOS device touch event hack
  googleTransInit() {
    if (process.server) return;
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
  hotjarInit() {
    (function (h, o, t, j, a, r) {
      h.hj = h.hj || function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
      h._hjSettings = { hjid: 58153, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }, // hotjar统计
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
  supportedLocale() {
    return ['en', 'fr', 'de', 'es', 'ar', 'it', 'pt'];
  }, // 目前项目支持的语言
  isSupportedLocale(locale) {
    return this.supportedLocale().indexOf(locale) > -1;
  }, // 是否在目前项目支持的语言列表中
  isSupportedMinorLocale(locale) {
    return this.supportedLocale().indexOf(locale) > -1 && locale !== 'en';
  }, // 是否在目前项目支持的语言列表中
  userAgentLocale() {
    const browserLang = process.client ? navigator.language.toLowerCase().substr(0, 2) : '';
    let locale = '';
    const supportedLocale = this.supportedLocale();
    for (let i = 0; i < supportedLocale.length; i++) {
      if (supportedLocale[i] === browserLang) {
        locale = supportedLocale[i];
        break;
      } else {
        locale = 'en';
      }
    }
    return locale;
  }, // User Agent Language Env (根据'浏览器语言环境'和'supportedLocale'输出最终的语言判定)
  getURLQuery(name) { // 废弃，不支持欧元等特殊符号
    let reg = `(^|&)${name}=([^&]*)(&|$)`;
    let r = process.client ? window.location.search.substr(1).match(reg) : '';
    if (r != null) return unescape(r[2]);
    return null;
  }, // Get URL Query
  getURLQueryWithDecodeURI(name) {
    let reg = `(^|&)${name}=([^&]*)(&|$)`;
    let r = process.client ? decodeURIComponent(window.location.search).substr(1).match(reg) : '';
    if (r != null) return unescape(r[2]);
    return null;
  }, // Get URL Query
  deleteURLQuery(name) {
    if (process.server) return;
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
    if (process.server) return '';
    const parts = location.hostname.split('.');
    return parts.slice(-2).join('.');
  }, // Domain
  getSubDomain() {
    if (process.server) return '';
    const h = location.href.split('.')[0];
    return h.split('//')[1];
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
  paramSign(paramObj) {
    const paramStr = JSON.stringify(paramObj);
    let msg = paramStr;
    let key = 'd4c66a7888fb21c173407d697bc67d92afac1b15ec02d7aaa3cc6a04c2c7b2cf';
    let hash = Crypto['HmacSHA256'](msg, key).toString();
    return {
      'signed_body': hash + '.' + paramStr,
      'sign_version': 1
    };
  },
  checkSupportLocalStorage(type) {
    let storage;
    try {
      storage = process.client ? window[type] : '';
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
  randomProbability(probability) { // probability 参数含义：概率
    const n = 0, m = 1000000;
    const test = Math.floor(Math.random() * (m - n + 1) + n);
    return test <= (m * probability);
  },
  randomProbabilityMulti(probabilityPeriod) { // probabilityPeriod 参数含义：参与分流的条目总数
    const n = 0, m = 1000000;
    const test = Math.floor(Math.random() * (m - n + 1) + n);

    let re = 0;
    for (let i = 0; i < probabilityPeriod; i++) {
      if (test >= m / probabilityPeriod * i && test <= m / probabilityPeriod * (i + 1)) {
        re = i;
        break;
      }
    }

    return re;
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
    const u = process.client ? navigator.userAgent : '';
    return !!u.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  },
  isiOS() {
    const u = process.client ? navigator.userAgent : '';
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  isAndroid() {
    const u = process.client ? navigator.userAgent : '';
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  },
  isWindows() {
    const u = process.client ? navigator.userAgent : '';
    return /Windows|Win32|Win64|WOW64/i.test(u);
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
    if (process.client) {
      return this.getSubDomain() === 'test'
        || this.getSubDomain() === 'www2test'
        || window.location.hostname === 'localhost'
        || window.location.hostname === '192.168.1.41'
        || window.location.hostname === '192.168.1.42';
    } else
      return false;
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
  langCheckIsArabic(text) {
    function langCheckIsArabicAbsolute(temp) {
      let re = /[^\u0600-\u06ff]/;
      return !re.test(temp);
    }

    let cha = 0;
    for (let i = 0; i < text.length; i++) {
      if (langCheckIsArabicAbsolute(text.charAt(i)))
        cha++;
    }
    return cha > 0;
  }
};
