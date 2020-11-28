import { getMerchantInfo } from '@/services/adminapi';
import { APPID } from '@/services/index';
/* eslint-disable */

/**
 *
 * @param param 将要转为URL参数字符串的对象
 * @param key URL参数字符串的前缀
 * @param encode 是否进行URL编码,默认为false
 * @return URL参数字符串
 */

export const urlEncode = (param, key, encode) => {
  const encodeFn = (param, key, encode) => {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof param;
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr +=
        '&' + key + '=' + (encode == null || encode ? param + '' : encodeURIComponent(param));
    } else {
      for (var i in param) {
        // var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += encodeFn(param[i], i, encode);
      }
    }
    return paramStr;
  };
  return encodeFn(param, key, encode).toString().substring(1);
};

/**
 *
 * @param param 将对象要转为符串的
 * @param url
 * @return URL参数字符串
 */
export const urlDecode = (url) =>
  url
    .match(/([^?=&]+)(=([^&]*))/g)
    .reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});

/**
 * 节流
 *
 * @param {(e)=>{}} fn
 * @param {number} [interval=100]
 * @returns
 * @memberof Index
 */
export function throttle(fn, interval = 150) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}

/**
 * 获取授权经纬度信息
 */
export function getLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        window.localStorage.setItem(
          'loc',
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
      },
      (error) => {
        console.log(error);
        window.localStorage.setItem('loc', JSON.stringify({}));
      },
    );
  } else {
    window.localStorage.setItem('loc', JSON.stringify({}));
  }
}

/**
 * 判断是否为微信浏览器
 */
export function isWxWeb() {
  const ua = navigator.userAgent.toLowerCase();
  // alert(JSON.stringify(ua));
  if (ua.indexOf('micromessenger') !== -1) {
    return true;
  }
  return false;
}

/**
 * 像素转换
 * @param {Number} px - 750视觉稿像素
 * @return {Number} 屏幕上实际像素
 */
export const px2hd = (px) => {
  const ONE_REM = parseInt(document.documentElement.style.fontSize || '100', 10) || 100;
  // const SCALE = ONE_REM / 100;
  return `${Number(px / ONE_REM)}rem`;
};

/**
 * 回收内存
 *
 * @return URL参数字符串
 */
export const reclaimMemory = () => (target, name, descriptor) => {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      try {
        this.componentDidReceiveProps = null;
        this._createData = null;
        return original.apply(this, args);
      } catch (e) {
        console.error(`Error: ${e}`);
        throw e;
      }
    };
  }
  return descriptor;
};

/**
 * 下划线转驼峰
 * @param {string} name
 */
export function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 简易对象数组去重
 * @param {array} arr 去重对象数组
 * @param {string} key 指定唯一key值
 */
export function objectArrUnique(arr, key) {
  var obj = {};
  return arr.reduce(function (item, next) {
    obj[next[key]] ? '' : (obj[next[key]] = true && item.push(next));
    return item;
  }, []);
}

/**
 * 获取多个转发路径的小程序参数
 * @param {object} scope 作用域
 */
export function weappParams(scope) {
  const params = scope.$router.params;
  let shareData = {};
  if (params.q) {
    // 通过二维码分享进入到此页面
    shareData = urlDecode(decodeURIComponent(params.q));
  } else if (params.query) {
    // 小程序分享到本页面
    shareData = params.query;
  } else {
    // 正常页面跳转到本页面
    shareData = params;
  }
  return shareData;
}

export function adapterAndroid() {
  localStorage.setItem('isAndroid', location.search.indexOf('isAndroid') !== -1);

  if (/(Android)/i.test(navigator.userAgent)) {
    if (localStorage.getItem('isAndroid') === 'true') {
      const timer = setInterval(() => {
        const meta = document.querySelector("meta[name='viewport']");
        if (meta) {
          meta.content =
            '"width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"';
          clearInterval(timer);
        }
      });
    }
  }
}

export const getAuthData = async () => {
  const res = await getMerchantInfo(
    urlEncode({
      appid_type: 1,
      appId: APPID,
    }),
  ).then(function (response) {
    return response.json();
  });
  if (res && res.status === '200') {
    sessionStorage.setItem('mchId', res.result.merchant_info_id);
  }
};

// merchant_info_id

export const utils = {
  urlEncode,
  urlDecode,
  throttle,
  toHump,
  weappParams,
  objectArrUnique,
  adapterAndroid,
  getAuthData,
};
