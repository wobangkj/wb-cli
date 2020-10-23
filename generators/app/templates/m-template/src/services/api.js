import { request } from 'alita';

export async function query() {
  return request('/api/hello');
}

export async function queryList(data) {
  return request('/api/list', {
    method: 'get',
    params: data,
  });
}
