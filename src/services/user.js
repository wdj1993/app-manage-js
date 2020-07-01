import request from '@/utils/request';
import sign from '@/utils/sign';

const api = 'http://api.danews.cc/';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  // return request('/api/currentUser');
  return request(`${api}myInfo.json`, {
    method: 'POST',
    data: sign(),
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
