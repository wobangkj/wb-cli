/* eslint-disable */
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { BUSINESS_STATUS, HIDE_BUSINESS_STATUS } from '../const';
// import { createLogError } from '../modules/common-service';
/**
 *
 * @param {string} api
 * @param {string} method 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
 * @param {object} body
 * @param {object} response
 */
export const logError = (api, method, body, response) => {
  const device = Taro.getSystemInfoSync(),
    userInfo = Taro.getStorageSync('currentUser'),
    error = {
      userInfo,
      api,
      method,
      body,
      response,
      device,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
  // 过滤本身的错误日志
  // api !== 'common-service/log/front' && createLogError(error);
};
/**
 *
 * @param {number} status
 * @param {string} msg
 * @param {string} ownMsg
 */
export const logTitle = (status, msg, ownMsg) => {
  (!~HIDE_BUSINESS_STATUS.indexOf(status) || ownMsg) &&
    Taro.showToast({
      title: ownMsg || BUSINESS_STATUS[status] || msg,
      icon: 'none',
      mask: true,
      duration: 2000,
    });
};
