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
  return encodeFn(param, key, encode)
    .toString()
    .substring(1);
};

/**
 *
 * @param param 将对象要转为符串的
 * @param url
 * @return URL参数字符串
 */
export const urlDecode = url =>
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

export const utils = {
  urlEncode,
  urlDecode,
  throttle,
  toHump,
  weappParams,
  objectArrUnique,
};
