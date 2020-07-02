import { queryFakeList, doPraiseCircle } from './service';

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
    *doPraise({ payload }, { call, put }) {
      const {list,idx,current} = payload;
      const response = yield call(doPraiseCircle, list[idx].id);
      if(response.code === 200){
        if(list[idx].is_praise === 1){
          list[idx].is_praise = 0;
          list[idx].praise -= 1;
        }else{
          list[idx].is_praise = 1;
          list[idx].praise += 1;
        }
        yield put({
          type: 'praiseList',
          payload:  Array.isArray(list) ? list : [],
          current
        });
      }
      yield put({
        type: 'praiseList',
        payload:  Array.isArray(list) ? list : [],
        current
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

    praiseList(state, action) {
      return { ...state, list: action.payload, current: action.current};
    },
  },
};
export default Model;
