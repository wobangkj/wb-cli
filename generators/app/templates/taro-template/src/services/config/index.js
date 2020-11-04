/* eslint-disable */
import Taro from '@tarojs/taro';
import { HTTP_API, ERROR_STATUS, ROOT_API } from '../const';
import { logError, logTitle } from './log';
import { getUserToken } from '../../utils/token';

/**
 *
 * 全局api入口函数
 *
 * @param {string} url
 * @param {{
 *     method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
 *     data?: object;
 *     hideMsg?: boolean;
 *     msg?: string;
 *     prefix?: string;
 *     header?: object;
 *   }} body
 * @returns
 */
export const request = (
  url,
  body = {
    method: '',
    data: {},
    hideMsg: '',
    msg: '',
    prefix: '',
    header: {},
  }
) => {
  // 去除undefined数据数据
  for (const v in body.data) {
    if (body.data[v] === undefined || body.data[v] === 'undefined') {
      delete body.data[v];
    }
  }

  return Taro.request({
    url: ROOT_API + (body.prefix || '/') + url,
    data: body.data,
    header: {
      token: Taro.getStorageSync('token'),
      // 小程序支持cookie
      cookie: Taro.getStorageSync('cookie'),
      'Content-Type': 'application/json',
      ...body.header,
    },
    method: body.method,
    success: res => {
      const { status } = res.data;
      // 日志上传
      // ERROR_STATUS.includes(status) &&
      //   logError(
      //     url,
      //     body.method,
      //     {
      //       data: body.data,
      //       token: Taro.getStorageSync('token'),
      //       cookie: Taro.getStorageSync('cookie'),
      //       'Content-Type': 'application/json',
      //       ...body.header,
      //     },
      //     res
      //   );

      // 小程序支持cookie
      res.header['Set-Cookie'] && Taro.setStorageSync('cookie', res.header['Set-Cookie']);
      // 前端根据version区分体验版本(trail)和线上版本(release)
      if (res.header.version) {
        Taro.setStorageSync('version', res.header.version);
      } else {
        Taro.removeStorageSync('version');
      }
      !body.hideMsg && logTitle(status, res.data.msg, body.msg);
    },
    fail(err) {
      logTitle(404);
      // logError(
      //   url,
      //   body.method,
      //   {
      //     data: body.data,
      //     token: Taro.getStorageSync('token'),
      //     cookie: Taro.getStorageSync('cookie'),
      //     'Content-Type': 'application/json',
      //     ...body.header,
      //   },
      //   err
      // );
    },
    complete: (res) => {
      if (res.data.msg === 'token不合法') {
        getUserToken()
      }
    }
  });
};
