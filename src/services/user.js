import request from '@/utils/request';
import sign from '@/utils/sign';


export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  console.log("=======userInfo========");
  // return request('/api/currentUser');
  return request('/api/myInfo.json', {
    method: 'POST',
    data: sign(),
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
