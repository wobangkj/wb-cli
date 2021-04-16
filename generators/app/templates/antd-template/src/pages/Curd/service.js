import request from '@/utils/request';

export async function searchRule(params) {
  return request('rule', {
    params,
  });
}

export async function removeRule(id) {
  return request(`rule/${id}`, {
    method: 'DELETE',
  });
}

export async function createRule(data) {
  return request('rule', {
    method: 'POST',
    data,
  });
}
export async function updateRule(data) {
  return request('rule', {
    method: 'PUT',
    data,
  });
}
