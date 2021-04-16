import request from '@/utils/request';

export async function searchProtocol(params) {
  return request('admin/protocol/list', {
    params,
  });
}
export async function removeProtocol(id) {
  return request(`admin/protocol/delete/${id}`, {
    method: 'DELETE',
  });
}
export async function createProtocol(data) {
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
