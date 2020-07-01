import { queryFakeList } from './service';

const Model = {
  namespace: 'listSearchArticles',
  state: {
    list: [],
    current: 1
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload, current: 2 };
    },

    appendList(state, action) {
      return { ...state, list: state.list.concat(action.payload), current: state.current + 1 };
    },
  },
};
export default Model;
