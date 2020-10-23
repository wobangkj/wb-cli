import request from '@/utils/request';

export async function editPass(data) {
  return request('admin/edit', {
    method: 'POST',
    data,
  });
}
