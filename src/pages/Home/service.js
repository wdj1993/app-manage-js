import request from '@/utils/request';
import sign from '@/utils/sign';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}
// export async function queryActivities() {
//   return request('/api/activities');
// }
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
export async function queryCurrent() {
  return request('/api/myInfo.json', {
    method: 'POST',
    data: sign(),
  });
}
export async function queryCount() {
  return request('/api/getTasksCount.json', {
    method: 'POST',
    data: sign(),
  });
}

export async function queryActivities() {
  return request('/api/circleByFriends.json', {
    method: 'POST',
    data: sign(),
  });
}

