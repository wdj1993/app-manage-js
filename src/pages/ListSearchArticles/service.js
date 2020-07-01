import request from 'umi-request';
import sign from '@/utils/sign';

const api = 'http://api.danews.cc/';

export async function queryFakeList(params) {
  return request(`${api}circleByAll.json`, {
    method: 'POST',
    data: sign(params),
  });
}
