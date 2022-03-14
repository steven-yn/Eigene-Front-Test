import { takeLatest, call, put } from 'redux-saga/effects';
import req from '../lib/api/reqNaverAPI';

const INITIALIZE = 'search/INITIALIZE';
const REQUEST_API = 'search/REQUEST_API';
const REQUEST_API_SUCCESS = 'search/REQUEST_API_SUCCESS';
const REQUEST_API_FAILURE = 'search/REQUEST_API_FAILURE';

export const initialize = () => ({ type: INITIALIZE });
export const requestAPI = (payload) => ({
  type: REQUEST_API,
  payload: payload,
});

const requestAPISuccess = (res) => ({
  type: REQUEST_API_SUCCESS,
  payload: res,
});

const requestAPIFailure = (err) => ({
  type: REQUEST_API_FAILURE,
  payload: err,
});

function* requestAPISaga(action) {
  const param = action.payload;

  try {
    const res = yield call(req.post, '/api/naver', param);
    yield put(requestAPISuccess(res.data));
  } catch (err) {
    yield put(requestAPIFailure(err));
  }
}

export function* searchSaga() {
  yield takeLatest(REQUEST_API, requestAPISaga);
}

const initialState = {
  resData: null,
  resDataError: null,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...initialState,
      };
    case REQUEST_API:
      return {
        ...state,
      };
    case REQUEST_API_SUCCESS:
      return {
        ...state,
        resData: action.payload,
      };
    case REQUEST_API_FAILURE:
      return {
        ...state,
        resDataError: action.payload,
      };

    default:
      return state;
  }
}
