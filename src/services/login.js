import request from '@/utils/request';
import sign from '@/utils/sign';

const api = 'http://api.danews.cc/';

export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  return request(`${api}login.json`, {
    method: 'POST',
    data: sign(params, false),
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
