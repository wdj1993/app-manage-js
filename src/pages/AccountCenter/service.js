import request from 'umi-request';
import sign from '@/utils/sign';

export async function queryCurrent() {
  // return request('/api/currentUser');
  return request('/api/myInfo.json', {
    method: 'POST',
    data: sign(),
  });
}
export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}
