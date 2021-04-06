import request from '@/utils/request';

export async function queryProtocol(params) {
  return request('admin/protocol/list', {
    params,
  });
}
export async function removeProtocol(id) {
  return request(`admin/protocol/delete/${id}`, {
    method: 'POST',
  });
}
export async function addProtocol(data) {
  return request('admin/protocol/add', {
    method: 'POST',
    data,
  });
}
export async function updateProtocol(data) {
  return request('admin/protocol/edit', {
    method: 'PUT',
    data,
  });
}
