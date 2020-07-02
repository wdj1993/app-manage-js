import request from 'umi-request';
import sign from '@/utils/sign';

const api = 'http://api.danews.cc/';

export async function queryFakeList(params) {
  let url = '';
  const data = params;
  switch (params.filt) {
    case 'all':
      url = `${api}circleByAll.json`;
      break;
    case 'friend':
      url = `${api}circleByFriends.json`;
      break;
    case 'mime':
      url = `${api}circleByUser.json`; // type不传，id不传，显示自己的动态
      break;
    case 'myPraise':
      url = `${api}getCircleByOp.json`;  // 我的点赞，不传id，type=1
      data.type = 1;
      break;
    case 'myComment':
      url = `${api}getCircleByOp.json`;  // 我的评论，不传id，type=2
      data.type = 2;
      break;
    default:
      break;
  }
  delete data.filt;
  return request(url, {
    method: 'POST',
    data: sign(data),
  });
}

export async function doPraiseCircle(id) {
  return request(`${api}praise.json`, {
    method: 'POST',
    data: sign({c_id:id}),
  });
}
