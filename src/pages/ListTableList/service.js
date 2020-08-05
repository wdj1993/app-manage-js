import request from '@/utils/request';
import sign from '@/utils/sign';

export async function queryAccount(params) {
  return request('/api/getMyAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
export async function delAccount(params) {
  return request('/api/delAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
export async function addAccount(params) {
  return request('/api/addAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
export async function updateAccount(params) {
  return request('/api/editAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
export async function switchMode(params) {
  return request('/api/openFansModel.json', {
    method: 'POST',
    data: sign(params)
  });
}
