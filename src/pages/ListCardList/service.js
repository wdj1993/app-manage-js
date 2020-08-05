import request from '@/utils/request';
import sign from '@/utils/sign';

export async function queryFakeList(params) {
  return request('/api/getMyAccount.json', {
    method: 'POST',
    data: sign(params)
  });
}
