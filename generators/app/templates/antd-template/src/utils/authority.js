import { reloadAuthorized } from './Authorized';

export function getAuthority() {
  const TOKEN = sessionStorage.getItem('_TOKEN');
  const ROLE = sessionStorage.getItem('_ROLE');

  const authority = ['admin', 'user', 'user'];

  if (TOKEN && ROLE !== undefined) {
    // 根据角色类型返回 后端如果默认amdin 则可以直接返回admin
    return authority[ROLE];
  }
  return [];
}
export function setAuthority(authority) {
  if (authority) {
    // 登录成功后需要存储的数据 包括角色类型 用户id token
    sessionStorage.setItem('_TOKEN', authority.token); // auto reload
    sessionStorage.setItem('_USERID', authority.id);
    sessionStorage.setItem('_ROLE', authority.role);
  }
  reloadAuthorized();
}
