import request from './request';

export async function queryArticle(params) {
  return request('article/search', {
    params,
  });
}
export async function infoArticle(params) {
  return request('article/id', {
    method: 'GET',
    params,
  });
}
export async function addContact(data) {
  return request('contact/create', {
    method: 'POST',
    data,
  });
}
