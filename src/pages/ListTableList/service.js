import request from '@/utils/request';
import sign from '@/utils/sign';

export async function queryRule(params) {
  return request('/api/getMyAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
export async function removeRule(params) {
  return request('/api/delAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
export async function addRule(params) {
  return request('/api/addAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
export async function updateRule(params) {
  return request('/api/editAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
