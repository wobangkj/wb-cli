import { request } from '../../config';

/**
 * 微信登录
 */
export const loginWx = data =>
  request('wx/login', {
    method: 'POST',
    data,
  });
/**
 * 用户注册
 */
export const creatClient = data =>
  request('client/create', {
    method: 'POST',
    data,
  });
/**
 * 用户更新
 */
export const updateClient = data =>
  request('client/update', {
    method: 'PUT',
    data,
  });
/**
 * 用户信息
 */
export const clientInfo = data =>
  request('client/idc', {
    method: 'GET',
    data,
  });
/**
 * 客户获取token
 */
export const getToken = data =>
  request('client/token', {
    method: 'GET',
    data,
  });
