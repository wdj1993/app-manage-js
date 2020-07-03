import request from 'umi-request';
import sign from '@/utils/sign';

export async function queryCurrent() {
  return request('/api/myInfo.json', {
    method: 'POST',
    data: sign(),
  });
}
export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
