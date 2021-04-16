import request from '@/utils/request';

export async function updatePass(data) {
  return request('admin/edit', {
    method: 'POST',
    data,
  });
}
