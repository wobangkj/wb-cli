import request from '@/pages/setting/node_modules/@/utils/request';

export async function editPass(data) {
  return request('admin/edit', {
    method: 'POST',
    data,
  });
}
