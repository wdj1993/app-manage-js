import { fakeChartData, queryActivities, queryCurrent, queryCount, queryProjectNotice } from './service';

const initState = {
  currentUser: undefined,
  count: undefined,
  projectNotice: [],
  activities: [],
  radarData: [],
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
};

const Model = {
  namespace: 'home',
  state: initState,
  effects: {
    *init(_, { put }) {
      yield put({
        type: 'fetchUserCurrent',
      });
      yield put({
        type: 'fetchCount',
      });
      yield put({
        type: 'fetchProjectNotice',
      });
      yield put({
        type: 'fetchActivitiesList',
      });
      // yield put({
      //   type: 'fetchChart',
      // });
      // yield put({
      //   type: 'fetchSalesData',
      // });
      yield put({
        type: 'fetch',
      });
    },

    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
          salesTypeData: response.salesTypeData,
          salesTypeDataOnline: response.salesTypeDataOnline,
          salesTypeDataOffline: response.salesTypeDataOffline,
          searchData: response.searchData,
          visitData: response.visitData,
          visitData2: response.visitData,
          offlineData: response.offlineData,
          offlineChartData: response.offlineChartData
        },
      });
    },

    // *fetchSalesData(_, { call, put }) {
    //   const response = yield call(fakeChartData);
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       salesData: response.salesData,
    //     },
    //   });
    // },

    *fetchUserCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: {
          currentUser: response.data,
        },
      });
    },

    *fetchCount(_, { call, put }) {
      const response = yield call(queryCount);
      yield put({
        type: 'save',
        payload: {
          count: response.data,
        },
      });
    },

    *fetchProjectNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'save',
        payload: {
          projectNotice: Array.isArray(response) ? response : [],
        },
      });
    },

    *fetchActivitiesList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'save',
        payload: {
          activities: Array.isArray(response.data) ? response.data : [],
        },
      });
    },

    // *fetchChart(_, { call, put }) {
    //   const { radarData } = yield call(fakeChartData);
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       radarData,
    //     },
    //   });
    // },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return initState;
    },
  },
};
export default Model;
