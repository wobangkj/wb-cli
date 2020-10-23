/* eslint-disable no-restricted-syntax */
import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

/**
 *
 * @param param 将要转为URL参数字符串的对象
 * @param key URL参数字符串的前缀
 * @param encode 是否进行URL编码,默认为false
 * @return URL参数字符串
 */

export const urlEncode = (param, key, encode) => {
  let paramStr = '';
  const encodeFn = (_param, _key, _encode) => {
    const t = typeof _param;
    if (param == null) return '';
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += `&${_key}=${_encode == null || _encode ? _param : encodeURIComponent(_param)}`;
    } else {
      // eslint-disable-next-line guard-for-in
      for (const i in _param) {
        paramStr += encodeFn(_param[i], i, _encode);
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
    // eslint-disable-next-line
    .reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});
